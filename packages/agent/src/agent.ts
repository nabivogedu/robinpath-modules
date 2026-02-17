import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { execFileSync } from "child_process";
import { createHash } from "crypto";
import { appendFileSync, readFileSync, existsSync } from "fs";

// ── Types ──────────────────────────────────────────────────────────

type OutputFormat = "TEXT" | "CSV" | "JSON" | "BOOLEAN" | "NUMBER" | "ARRAY" | "MARKDOWN" | "CODE" | "HTML" | "XML" | "YAML";

interface PipelineConfig {
  debug: number;
  retries: number;
  budget: number;
  session: string;
  cache: boolean;
  timeout: number;
  rateLimit: number;
  fallback: string;
  onError: "throw" | "skip" | "fallback";
  dryRun: boolean;
  keepTemp: boolean;
  model: string;
}

interface StepRecord {
  step: string;
  provider: string;
  question: string;
  format: OutputFormat;
  durationMs: number;
  cached: boolean;
  retries: number;
  error: string | null;
}

interface NotifyConfig {
  enabled: boolean;
  onError: boolean;
  onComplete: boolean;
  transport: string;
  to: string;
}

interface ContextMessage {
  role: "user" | "assistant";
  content: string;
}

// ── Internal State ──────────────────────────────────────────────────

let pipelineConfig: PipelineConfig = {
  debug: 0,
  retries: 3,
  budget: 0,
  session: "",
  cache: true,
  timeout: 120_000,
  rateLimit: 0,
  fallback: "",
  onError: "throw",
  dryRun: false,
  keepTemp: false,
  model: "",
};

const stepHistory: StepRecord[] = [];
const responseCache = new Map<string, unknown>();
const contexts = new Map<string, ContextMessage[]>();
let debugLevel = 0;
let logPath = "";
let lastRateLimitTime = 0;

let notifyConfig: NotifyConfig = {
  enabled: false,
  onError: false,
  onComplete: false,
  transport: "",
  to: "",
};

// ── Internal Helpers ────────────────────────────────────────────────

function debugLog(level: number, ...parts: unknown[]): void {
  if (debugLevel >= level) {
    const msg = `[agent:debug:${level}] ${parts.map((p: any) => (typeof p === "object" ? JSON.stringify(p) : String(p))).join(" ")}`;
    console.error(msg);
    if (logPath) {
      try {
        appendFileSync(logPath, msg + "\n");
      } catch { /* ignore log write errors */ }
    }
  }
}

function cacheKey(question: string, attachments?: string[]): string {
  const data = question + (attachments ? attachments.join("|") : "");
  return createHash("sha256").update(data).digest("hex");
}

function stripFences(text: string): string {
  const trimmed = text.trim();
  const match = trimmed.match(/^```(?:\w+)?\s*\n([\s\S]*?)\n\s*```$/);
  if (match) return match[1]!.trim();
  return trimmed;
}

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]!;
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        fields.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
  }
  fields.push(current.trim());
  return fields;
}

function parseResponse(raw: string, format: OutputFormat): any {
  const cleaned = stripFences(raw);

  switch (format) {
    case "TEXT":
    case "MARKDOWN":
    case "CODE":
    case "HTML":
    case "XML":
    case "YAML":
      return cleaned;

    case "NUMBER": {
      // Extract first number-like sequence from the response
      const numMatch = cleaned.match(/-?\d+(?:\.\d+)?/);
      if (!numMatch) throw new Error(`Could not parse NUMBER from response: "${cleaned.slice(0, 100)}"`);
      const num = parseFloat(numMatch[0]);
      if (isNaN(num)) throw new Error(`Could not parse NUMBER from response: "${cleaned.slice(0, 100)}"`);
      return num;
    }

    case "BOOLEAN": {
      const lower = cleaned.toLowerCase().trim();
      if (lower === "true" || lower === "yes" || lower === "1") return true;
      if (lower === "false" || lower === "no" || lower === "0") return false;
      throw new Error(`Could not parse BOOLEAN from response: "${cleaned.slice(0, 100)}"`);
    }

    case "JSON": {
      try {
        return JSON.parse(cleaned);
      } catch {
        // Try to extract JSON object/array from the response
        const jsonMatch = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
        if (jsonMatch) return JSON.parse(jsonMatch[1]!);
        throw new Error(`Could not parse JSON from response: "${cleaned.slice(0, 100)}"`);
      }
    }

    case "ARRAY": {
      try {
        const parsed = JSON.parse(cleaned);
        if (Array.isArray(parsed)) return parsed;
        throw new Error("Parsed value is not an array");
      } catch {
        const arrMatch = cleaned.match(/\[[\s\S]*\]/);
        if (arrMatch) {
          const parsed = JSON.parse(arrMatch[0]);
          if (Array.isArray(parsed)) return parsed;
        }
        throw new Error(`Could not parse ARRAY from response: "${cleaned.slice(0, 100)}"`);
      }
    }

    case "CSV": {
      const lines = cleaned.split("\n").map((l: any) => l.trim()).filter(Boolean);
      return lines.map(parseCsvLine);
    }

    default:
      return cleaned;
  }
}

function buildPrompt(question: string, format: OutputFormat, retryAttempt: number): string {
  let prompt = question;

  const formatInstructions: Record<OutputFormat, string> = {
    TEXT: "",
    CSV: "\n\nRespond ONLY with CSV data. No headers unless asked. No explanation.",
    JSON: "\n\nRespond ONLY with valid JSON. No explanation, no markdown fences.",
    BOOLEAN: "\n\nRespond with exactly one word: true or false. Nothing else.",
    NUMBER: "\n\nRespond with exactly one number. No units, no explanation.",
    ARRAY: "\n\nRespond ONLY with a JSON array. No explanation, no markdown fences.",
    MARKDOWN: "\n\nRespond in Markdown format.",
    CODE: "\n\nRespond ONLY with code. No explanation.",
    HTML: "\n\nRespond ONLY with HTML. No explanation.",
    XML: "\n\nRespond ONLY with XML. No explanation.",
    YAML: "\n\nRespond ONLY with YAML. No explanation, no markdown fences.",
  };

  const instruction = formatInstructions[format];
  if (instruction) prompt += instruction;

  // Stricter instructions on retries
  if (retryAttempt > 0) {
    switch (format) {
      case "JSON":
        prompt += " CRITICAL: Output must be parseable by JSON.parse(). Start with { or [.";
        break;
      case "ARRAY":
        prompt += " CRITICAL: Output must be a JSON array parseable by JSON.parse(). Start with [.";
        break;
      case "BOOLEAN":
        prompt += " CRITICAL: Reply with ONLY the word true or false.";
        break;
      case "NUMBER":
        prompt += " CRITICAL: Reply with ONLY a number like 42 or 3.14.";
        break;
      case "CSV":
        prompt += " CRITICAL: Output raw CSV lines only. No markdown fences.";
        break;
    }
  }

  return prompt;
}

function executeCliCommand(provider: "claude" | "codex", prompt: string, attachments?: string[], modelOverride?: string): string {
  const args: string[] = [];
  const model = modelOverride || pipelineConfig.model;

  if (provider === "claude") {
    args.push("-p", prompt, "--output-format", "text");
    if (model) args.push("--model", model);
    if (attachments) {
      for (const att of attachments) {
        if (existsSync(att)) {
          args.push("--file", att);
        }
      }
    }
  } else {
    // codex: use --quiet and pass prompt as positional
    args.push("--quiet", prompt);
    if (model) args.push("--model", model);
    if (attachments) {
      for (const att of attachments) {
        if (existsSync(att)) {
          args.push("--file", att);
        }
      }
    }
  }

  debugLog(2, `Executing: ${provider}`, model ? `[model:${model}]` : "", args.join(" ").slice(0, 200));

  const result = execFileSync(provider, args, {
    encoding: "utf-8",
    timeout: pipelineConfig.timeout,
    maxBuffer: 10 * 1024 * 1024,
    windowsHide: true,
  });

  return result;
}


function applyRateLimit(): void {
  if (pipelineConfig.rateLimit <= 0) return;
  const now = Date.now();
  const minInterval = pipelineConfig.rateLimit;
  const elapsed = now - lastRateLimitTime;
  if (elapsed < minInterval && lastRateLimitTime > 0) {
    const waitMs = minInterval - elapsed;
    debugLog(2, `Rate limiting: waiting ${waitMs}ms`);
    // Blocking sleep using Atomics
    const buf = new SharedArrayBuffer(4);
    const arr = new Int32Array(buf);
    Atomics.wait(arr, 0, 0, waitMs);
  }
  lastRateLimitTime = Date.now();
}

function executeAgentStep(
  provider: "claude" | "codex",
  stepName: string,
  opts: Record<string, unknown>,
): any {
  const question = String(opts.question ?? "");
  const format = (String(opts.expectedOutput ?? "TEXT").toUpperCase()) as OutputFormat;
  const condition = opts.condition;
  const attachments = Array.isArray(opts.attachments)
    ? (opts.attachments as string[]).map(String)
    : opts.attachment
      ? [String(opts.attachment)]
      : undefined;
  const maxRetries = opts.retries != null ? Number(opts.retries) : pipelineConfig.retries;
  const stepModel = opts.model ? String(opts.model) : undefined;

  // Condition check
  if (condition !== undefined && condition !== null && condition !== true && condition !== "true" && condition !== 1) {
    debugLog(1, `Step "${stepName}" skipped: condition is falsy`);
    return null;
  }

  if (!question) throw new Error(`agent.${provider}: "question" is required`);

  // Context: prepend conversation history
  const contextId = opts.context ? String(opts.context) : undefined;
  let contextPrefix = "";
  if (contextId && contexts.has(contextId)) {
    const messages = contexts.get(contextId)!;
    contextPrefix = messages.map((m: any) => m.role === "user" ? `User: ${m.content}` : `Assistant: ${m.content}`
    ).join("\n\n") + "\n\nUser: ";
  }

  // Dry run
  if (pipelineConfig.dryRun) {
    debugLog(1, `[DRY RUN] Step "${stepName}": ${provider} prompt="${question.slice(0, 80)}..." format=${format}`);
    return `[DRY_RUN:${format}]`;
  }

  // Cache check
  const key = cacheKey(question, attachments);
  if (pipelineConfig.cache && responseCache.has(key)) {
    debugLog(1, `Cache hit for step "${stepName}"`);
    const cached = responseCache.get(key)!;
    stepHistory.push({
      step: stepName, provider, question, format,
      durationMs: 0, cached: true, retries: 0, error: null,
    });
    return cached;
  }

  // Rate limit
  applyRateLimit();

  // Execute with retries
  let lastError: Error | null = null;
  const startTime = Date.now();

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        const backoff = Math.pow(2, attempt - 1) * 1000;
        debugLog(1, `Retry ${attempt}/${maxRetries} for step "${stepName}" (backoff: ${backoff}ms)`);
        const buf = new SharedArrayBuffer(4);
        const arr = new Int32Array(buf);
        Atomics.wait(arr, 0, 0, backoff);
      }

      const basePrompt = buildPrompt(question, format, attempt);
      const prompt = contextPrefix ? contextPrefix + basePrompt : basePrompt;
      const raw = executeCliCommand(provider, prompt, attachments, stepModel);
      debugLog(3, `Raw response: ${raw.slice(0, 500)}`);

      const parsed = parseResponse(raw, format);
      const durationMs = Date.now() - startTime;

      // Record in context
      if (contextId) {
        if (!contexts.has(contextId)) contexts.set(contextId, []);
        const msgs = contexts.get(contextId)!;
        msgs.push({ role: "user", content: question });
        msgs.push({ role: "assistant", content: raw.trim() });
      }

      // Cache result
      if (pipelineConfig.cache) {
        responseCache.set(key, parsed);
      }

      stepHistory.push({
        step: stepName, provider, question, format,
        durationMs, cached: false, retries: attempt, error: null,
      });

      debugLog(1, `Step "${stepName}" completed in ${durationMs}ms (${attempt} retries)`);
      return parsed;
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err));
      debugLog(1, `Step "${stepName}" attempt ${attempt} failed: ${lastError.message}`);
    }
  }

  // All retries exhausted — handle error based on onError config
  const durationMs = Date.now() - startTime;
  const errorMsg = lastError?.message ?? "Unknown error";

  stepHistory.push({
    step: stepName, provider, question, format,
    durationMs, cached: false, retries: maxRetries, error: errorMsg,
  });

  const errorMode = (opts.onError as string) ?? pipelineConfig.onError;

  if (errorMode === "fallback" || (errorMode === "throw" && pipelineConfig.fallback)) {
    const fallbackProvider = pipelineConfig.fallback as "claude" | "codex";
    if (fallbackProvider && fallbackProvider !== provider) {
      debugLog(1, `Falling back to ${fallbackProvider} for step "${stepName}"`);
      try {
        return executeAgentStep(fallbackProvider, stepName + ":fallback", {
          ...opts,
          onError: "throw", // Don't recurse fallback
        });
      } catch (fbErr: unknown) {
        debugLog(1, `Fallback also failed: ${fbErr instanceof Error ? fbErr.message : String(fbErr)}`);
      }
    }
  }

  if (errorMode === "skip") {
    debugLog(1, `Step "${stepName}" failed, skipping (onError=skip)`);
    return "__SKIPPED__";
  }

  throw new Error(`agent.${provider} step "${stepName}" failed after ${maxRetries + 1} attempts: ${errorMsg}`);
}

// ── Function Handlers ───────────────────────────────────────────────

const pipeline: BuiltinHandler = (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;

  if (opts.debug !== undefined) pipelineConfig.debug = Number(opts.debug);
  if (opts.retries !== undefined) pipelineConfig.retries = Number(opts.retries);
  if (opts.budget !== undefined) pipelineConfig.budget = Number(opts.budget);
  if (opts.session !== undefined) pipelineConfig.session = String(opts.session);
  if (opts.cache !== undefined) pipelineConfig.cache = Boolean(opts.cache);
  if (opts.timeout !== undefined) pipelineConfig.timeout = Number(opts.timeout);
  if (opts.rateLimit !== undefined) pipelineConfig.rateLimit = Number(opts.rateLimit);
  if (opts.fallback !== undefined) pipelineConfig.fallback = String(opts.fallback);
  if (opts.onError !== undefined) pipelineConfig.onError = String(opts.onError) as PipelineConfig["onError"];
  if (opts.dryRun !== undefined) pipelineConfig.dryRun = Boolean(opts.dryRun);
  if (opts.keepTemp !== undefined) pipelineConfig.keepTemp = Boolean(opts.keepTemp);
  if (opts.model !== undefined) pipelineConfig.model = String(opts.model);

  // Sync debug level
  if (opts.debug !== undefined) debugLevel = pipelineConfig.debug;

  debugLog(1, "Pipeline configured:", pipelineConfig);
  return { ...pipelineConfig };
};

const claude: BuiltinHandler = (args) => {
  const stepName = String(args[0] ?? "unnamed");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  return executeAgentStep("claude", stepName, opts) as Value;
};

const codex: BuiltinHandler = (args) => {
  const stepName = String(args[0] ?? "unnamed");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  return executeAgentStep("codex", stepName, opts) as Value;
};

const debug: BuiltinHandler = (args) => {
  const level = Number(args[0] ?? 0);
  debugLevel = Math.max(0, Math.min(3, level));
  pipelineConfig.debug = debugLevel;
  return debugLevel;
};

const log: BuiltinHandler = (args) => {
  const path = String(args[0] ?? "");
  logPath = path;
  debugLog(1, `Log file set to: ${path}`);
  return path;
};

const cost: BuiltinHandler = () => {
  const totalMs = stepHistory.reduce((sum, s) => sum + s.durationMs, 0);
  const totalRetries = stepHistory.reduce((sum, s) => sum + s.retries, 0);
  const cacheHits = stepHistory.filter((s: any) => s.cached).length;
  const errors = stepHistory.filter((s: any) => s.error !== null).length;

  return {
    steps: stepHistory.length,
    totalMs,
    totalRetries,
    cacheHits,
    errors,
    history: stepHistory.map((s: any) => ({
      step: s.step,
      provider: s.provider,
      format: s.format,
      durationMs: s.durationMs,
      cached: s.cached,
      retries: s.retries,
      error: s.error,
    })),
  };
};

const notify: BuiltinHandler = (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;

  if (opts.enabled !== undefined) notifyConfig.enabled = Boolean(opts.enabled);
  if (opts.onError !== undefined) notifyConfig.onError = Boolean(opts.onError);
  if (opts.onComplete !== undefined) notifyConfig.onComplete = Boolean(opts.onComplete);
  if (opts.transport !== undefined) notifyConfig.transport = String(opts.transport);
  if (opts.to !== undefined) notifyConfig.to = String(opts.to);

  debugLog(1, "Notification configured:", notifyConfig);
  return { ...notifyConfig };
};

// ── Model Selection ─────────────────────────────────────────────────

const model: BuiltinHandler = (args) => {
  const modelName = String(args[0] ?? "");
  if (!modelName) return pipelineConfig.model || "default";
  pipelineConfig.model = modelName;
  debugLog(1, `Default model set to: ${modelName}`);
  return modelName;
};

// ── Prompt Loading ──────────────────────────────────────────────────

const prompt: BuiltinHandler = (args) => {
  const filePath = String(args[0] ?? "");
  const vars = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!filePath) throw new Error('agent.prompt: file path is required');
  if (!existsSync(filePath)) throw new Error(`agent.prompt: file not found: "${filePath}"`);

  let content = readFileSync(filePath, "utf-8");

  // Replace {{varName}} placeholders with values
  for (const [key, val] of Object.entries(vars)) {
    const placeholder = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g");
    content = content.replace(placeholder, typeof val === "object" ? JSON.stringify(val) : String(val));
  }

  debugLog(2, `Loaded prompt from "${filePath}" (${content.length} chars, ${Object.keys(vars).length} vars)`);
  return content;
};

// ── Context Management ──────────────────────────────────────────────

const context: BuiltinHandler = (args) => {
  const action = String(args[0] ?? "create");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  switch (action) {
    case "create":
    case "start": {
      const id = opts.id ? String(opts.id) : `ctx_${Date.now()}`;
      const messages: ContextMessage[] = [];

      // System prompt becomes first "user" message as context framing
      if (opts.system) {
        messages.push({ role: "user", content: `System instructions: ${String(opts.system)}` });
        messages.push({ role: "assistant", content: "Understood. I will follow these instructions." });
      }

      contexts.set(id, messages);
      debugLog(1, `Context "${id}" created (${messages.length} initial messages)`);
      return id;
    }

    case "clear": {
      const id = String(opts.id ?? args[1] ?? "");
      if (contexts.has(id)) {
        contexts.get(id)!.length = 0;
        debugLog(1, `Context "${id}" cleared`);
      }
      return true;
    }

    case "delete": {
      const id = String(opts.id ?? args[1] ?? "");
      contexts.delete(id);
      debugLog(1, `Context "${id}" deleted`);
      return true;
    }

    case "get": {
      const id = String(opts.id ?? args[1] ?? "");
      const msgs = contexts.get(id);
      if (!msgs) return null;
      return { id, messages: msgs.length, history: msgs };
    }

    case "list": {
      const result: Record<string, number> = {};
      for (const [id, msgs] of contexts) {
        result[id] = msgs.length;
      }
      return result;
    }

    default:
      throw new Error(`agent.context: unknown action "${action}". Use: create, clear, delete, get, list`);
  }
};

// ── Batch Processing ────────────────────────────────────────────────

const batch: BuiltinHandler = (args) => {
  const stepName = String(args[0] ?? "batch");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const items = Array.isArray(opts.items) ? opts.items : [];
  const questionTemplate = String(opts.question ?? "");
  const format = (String(opts.expectedOutput ?? "TEXT").toUpperCase()) as OutputFormat;
  const provider = (String(opts.provider ?? "claude")) as "claude" | "codex";
  const stepModel = opts.model ? String(opts.model) : undefined;
  const maxRetries = opts.retries != null ? Number(opts.retries) : pipelineConfig.retries;

  if (!questionTemplate) throw new Error('agent.batch: "question" template is required');
  if (items.length === 0) return [];

  debugLog(1, `Batch "${stepName}": ${items.length} items, format=${format}`);

  const results: unknown[] = [];

  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    const itemStr = typeof item === "object" ? JSON.stringify(item) : String(item);

    // Replace {{item}} and {{index}} in the template
    let question = questionTemplate
      .replace(/\{\{\s*item\s*\}\}/g, itemStr)
      .replace(/\{\{\s*index\s*\}\}/g, String(index));

    // Also replace {{item.field}} for object items
    if (typeof item === "object" && item !== null) {
      const obj = item as Record<string, unknown>;
      for (const [key, val] of Object.entries(obj)) {
        const ph = new RegExp(`\\{\\{\\s*item\\.${key}\\s*\\}\\}`, "g");
        question = question.replace(ph, typeof val === "object" ? JSON.stringify(val) : String(val));
      }
    }

    const batchStepName = `${stepName}[${index}]`;

    if (pipelineConfig.dryRun) {
      results.push(`[DRY_RUN:${format}]`);
      continue;
    }

    // Cache check
    const key = cacheKey(question);
    if (pipelineConfig.cache && responseCache.has(key)) {
      debugLog(2, `Batch "${batchStepName}" cache hit`);
      results.push(responseCache.get(key)!);
      stepHistory.push({
        step: batchStepName, provider, question, format,
        durationMs: 0, cached: true, retries: 0, error: null,
      });
      continue;
    }

    // Rate limit
    applyRateLimit();

    const startTime = Date.now();
    let lastError: Error | null = null;
    let success = false;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          const backoff = Math.pow(2, attempt - 1) * 1000;
          const buf = new SharedArrayBuffer(4);
          const arr = new Int32Array(buf);
          Atomics.wait(arr, 0, 0, backoff);
        }

        const fullPrompt = buildPrompt(question, format, attempt);
        const raw = executeCliCommand(provider, fullPrompt, undefined, stepModel);
        const parsed = parseResponse(raw, format);

        if (pipelineConfig.cache) responseCache.set(key, parsed);

        results.push(parsed);
        const durationMs = Date.now() - startTime;

        stepHistory.push({
          step: batchStepName, provider, question, format,
          durationMs, cached: false, retries: attempt, error: null,
        });

        debugLog(2, `Batch "${batchStepName}" completed (${index + 1}/${items.length})`);
        success = true;
        break;
      } catch (err: unknown) {
        lastError = err instanceof Error ? err : new Error(String(err));
      }
    }

    if (!success) {
      const errorMsg = lastError?.message ?? "Unknown error";
      stepHistory.push({
        step: batchStepName, provider, question, format,
        durationMs: Date.now() - startTime, cached: false, retries: maxRetries, error: errorMsg,
      });

      const errorMode = (opts.onError as string) ?? pipelineConfig.onError;
      if (errorMode === "skip") {
        results.push("__SKIPPED__");
      } else {
        throw new Error(`agent.batch step "${batchStepName}" failed: ${errorMsg}`);
      }
    }
  }

  debugLog(1, `Batch "${stepName}" complete: ${results.length}/${items.length} items`);
  return results as Value;
};

// ── Classify (sugar) ────────────────────────────────────────────────

const classify: BuiltinHandler = (args) => {
  const stepName = String(args[0] ?? "classify");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const text = String(opts.text ?? "");
  const categories = Array.isArray(opts.categories) ? opts.categories.map(String) : [];
  const provider = (String(opts.provider ?? "claude")) as "claude" | "codex";

  if (!text) throw new Error('agent.classify: "text" is required');
  if (categories.length < 2) throw new Error('agent.classify: at least 2 "categories" required');

  const question = `Classify the following text into exactly one of these categories: ${categories.join(", ")}.\n\nText: ${text}\n\nRespond with ONLY the category name. Nothing else.`;

  const result = executeAgentStep(provider, stepName, {
    question,
    expectedOutput: "TEXT",
    model: opts.model,
    context: opts.context,
  });

  // Fuzzy match to nearest category
  const raw = String(result).trim().toLowerCase();
  for (const cat of categories) {
    if (raw === cat.toLowerCase() || raw.includes(cat.toLowerCase())) {
      return cat;
    }
  }

  // If no exact match, return raw (best effort)
  debugLog(1, `Classify "${stepName}": no exact category match for "${raw}", returning raw`);
  return String(result).trim();
};

// ── Extract (sugar) ─────────────────────────────────────────────────

const extract: BuiltinHandler = (args) => {
  const stepName = String(args[0] ?? "extract");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const text = String(opts.text ?? "");
  const fields = Array.isArray(opts.fields) ? opts.fields.map(String) : [];
  const provider = (String(opts.provider ?? "claude")) as "claude" | "codex";

  if (!text) throw new Error('agent.extract: "text" is required');
  if (fields.length === 0) throw new Error('agent.extract: at least one "fields" entry required');

  const fieldList = fields.map((f: any) => `"${f}"`).join(", ");
  const question = `Extract the following fields from the text: ${fieldList}.\n\nText: ${text}\n\nRespond with a JSON object containing only these keys: ${fieldList}. If a field is not found, use null.`;

  return executeAgentStep(provider, stepName, {
    question,
    expectedOutput: "JSON",
    model: opts.model,
    context: opts.context,
  }) as Value;
};

// ── Guard (validate AI output) ──────────────────────────────────────

const guard: BuiltinHandler = (args) => {
  const value = args[0];
  const rules = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const errors: string[] = [];

  // Type check
  if (rules.type) {
    const expectedType = String(rules.type);
    if (expectedType === "array") {
      if (!Array.isArray(value)) errors.push(`Expected array, got ${typeof value}`);
    } else if (expectedType === "object") {
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        errors.push(`Expected object, got ${Array.isArray(value) ? "array" : typeof value}`);
      }
    } else if (typeof value !== expectedType) {
      errors.push(`Expected ${expectedType}, got ${typeof value}`);
    }
  }

  // Number range
  if (rules.min !== undefined && typeof value === "number") {
    if (value < Number(rules.min)) errors.push(`Value ${value} is below minimum ${rules.min}`);
  }
  if (rules.max !== undefined && typeof value === "number") {
    if (value > Number(rules.max)) errors.push(`Value ${value} is above maximum ${rules.max}`);
  }

  // String length
  if (rules.minLength !== undefined && typeof value === "string") {
    if (value.length < Number(rules.minLength)) errors.push(`String length ${value.length} is below minimum ${rules.minLength}`);
  }
  if (rules.maxLength !== undefined && typeof value === "string") {
    if (value.length > Number(rules.maxLength)) errors.push(`String length ${value.length} is above maximum ${rules.maxLength}`);
  }

  // Pattern match
  if (rules.pattern && typeof value === "string") {
    const regex = new RegExp(String(rules.pattern));
    if (!regex.test(value)) errors.push(`Value does not match pattern: ${rules.pattern}`);
  }

  // Enum check
  if (Array.isArray(rules.enum)) {
    const allowed = rules.enum.map(String);
    if (!allowed.includes(String(value))) {
      errors.push(`Value "${value}" is not in allowed values: ${allowed.join(", ")}`);
    }
  }

  // Required fields (for objects)
  if (Array.isArray(rules.required) && typeof value === "object" && value !== null && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>;
    for (const field of rules.required) {
      const key = String(field);
      if (obj[key] === undefined || obj[key] === null) {
        errors.push(`Missing required field: "${key}"`);
      }
    }
  }

  // Not empty
  if (rules.notEmpty) {
    if (value === null || value === undefined || value === "" ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" && value !== null && Object.keys(value).length === 0)) {
      errors.push("Value is empty");
    }
  }

  if (errors.length > 0) {
    const mode = String(rules.onFail ?? "throw");
    const errorMsg = `Guard failed: ${errors.join("; ")}`;
    debugLog(1, errorMsg);

    if (mode === "default" && rules.defaultValue !== undefined) {
      return rules.defaultValue as Value;
    }
    if (mode === "null") return null;
    throw new Error(errorMsg);
  }

  return value;
};

// ── Exports ─────────────────────────────────────────────────────────

export const AgentFunctions: Record<string, BuiltinHandler> = {
  pipeline, claude, codex, debug, log, cost, notify,
  model, prompt, context, batch, classify, extract, guard,
};

export const AgentFunctionMetadata = {
  pipeline: {
    description: "Configure pipeline settings for AI agent execution",
    parameters: [
      {
        name: "options", dataType: "object",
        description: "{debug, retries, budget, session, cache, timeout, rateLimit, fallback, onError, dryRun, keepTemp, model}",
        formInputType: "json", required: true,
      },
    ],
    returnType: "object", returnDescription: "Current pipeline configuration",
    example: 'agent.pipeline {"retries": 3, "cache": true, "model": "claude-haiku-4-5-20251001"}',
  },
  claude: {
    description: "Send a prompt to Claude Code CLI and parse the structured response",
    parameters: [
      { name: "step", dataType: "string", description: "Step name for tracking", formInputType: "text", required: true },
      {
        name: "options", dataType: "object",
        description: "{question, expectedOutput, model, attachments, condition, retries, onError, context}",
        formInputType: "json", required: true,
      },
    ],
    returnType: "any", returnDescription: "Parsed response in the requested format",
    example: 'agent.claude "analyze" {"question": "What is 2+2?", "expectedOutput": "NUMBER"} into $answer',
  },
  codex: {
    description: "Send a prompt to OpenAI Codex CLI and parse the structured response",
    parameters: [
      { name: "step", dataType: "string", description: "Step name for tracking", formInputType: "text", required: true },
      {
        name: "options", dataType: "object",
        description: "{question, expectedOutput, model, attachments, condition, retries, onError, context}",
        formInputType: "json", required: true,
      },
    ],
    returnType: "any", returnDescription: "Parsed response in the requested format",
    example: 'agent.codex "generate" {"question": "Write a hello world in Python", "expectedOutput": "CODE"} into $code',
  },
  debug: {
    description: "Set global debug verbosity level (0=off, 1=info, 2=verbose, 3=trace)",
    parameters: [
      { name: "level", dataType: "number", description: "Debug level 0-3", formInputType: "number", required: true },
    ],
    returnType: "number", returnDescription: "Current debug level",
    example: "agent.debug 1",
  },
  log: {
    description: "Set the log file path for debug output",
    parameters: [
      { name: "path", dataType: "string", description: "File path for log output", formInputType: "text", required: true },
    ],
    returnType: "string", returnDescription: "Log file path",
    example: 'agent.log "pipeline.log"',
  },
  cost: {
    description: "Get pipeline cost and timing report for all executed steps",
    parameters: [],
    returnType: "object", returnDescription: "{steps, totalMs, totalRetries, cacheHits, errors, history}",
    example: "agent.cost into $report",
  },
  notify: {
    description: "Configure notification settings for pipeline events",
    parameters: [
      {
        name: "options", dataType: "object",
        description: "{enabled, onError, onComplete, transport, to}",
        formInputType: "json", required: true,
      },
    ],
    returnType: "object", returnDescription: "Current notification configuration",
    example: 'agent.notify {"enabled": true, "onError": true, "transport": "gmail", "to": "admin@example.com"}',
  },
  model: {
    description: "Set or get the default AI model for all subsequent steps",
    parameters: [
      { name: "modelName", dataType: "string", description: "Model identifier (e.g. claude-haiku-4-5-20251001, claude-sonnet-4-5-20250929)", formInputType: "text", required: false },
    ],
    returnType: "string", returnDescription: "Current model name",
    example: 'agent.model "claude-haiku-4-5-20251001"',
  },
  prompt: {
    description: "Load a prompt template from a file with {{variable}} substitution",
    parameters: [
      { name: "filePath", dataType: "string", description: "Path to prompt template file", formInputType: "text", required: true },
      { name: "variables", dataType: "object", description: "Variables to substitute in the template", formInputType: "json", required: false },
    ],
    returnType: "string", returnDescription: "Rendered prompt string",
    example: 'agent.prompt "./prompts/analyze.md" {"data": $csvData, "format": "table"} into $q',
  },
  context: {
    description: "Manage conversation contexts for multi-turn AI interactions",
    parameters: [
      { name: "action", dataType: "string", description: "Action: create, clear, delete, get, list", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{id, system} — id for naming, system for system prompt", formInputType: "json", required: false },
    ],
    returnType: "any", returnDescription: "Context ID (create), boolean (clear/delete), object (get), or list (list)",
    example: 'agent.context "create" {"system": "You are a data analyst"} into $ctx',
  },
  batch: {
    description: "Process an array of items through an AI prompt with concurrency control",
    parameters: [
      { name: "step", dataType: "string", description: "Batch step name", formInputType: "text", required: true },
      {
        name: "options", dataType: "object",
        description: "{items, question (with {{item}}/{{index}} placeholders), expectedOutput, concurrency, provider, model, retries, onError}",
        formInputType: "json", required: true,
      },
    ],
    returnType: "array", returnDescription: "Array of parsed results, one per item",
    example: 'agent.batch "classify-tickets" {"items": $tickets, "question": "Classify: {{item}}", "expectedOutput": "JSON", "concurrency": 3} into $results',
  },
  classify: {
    description: "Classify text into one of the given categories (sugar for common AI task)",
    parameters: [
      { name: "step", dataType: "string", description: "Step name", formInputType: "text", required: true },
      {
        name: "options", dataType: "object",
        description: "{text, categories (array of strings), provider, model, context}",
        formInputType: "json", required: true,
      },
    ],
    returnType: "string", returnDescription: "The matching category name",
    example: 'agent.classify "route" {"text": $email, "categories": ["billing", "support", "sales", "spam"]} into $category',
  },
  extract: {
    description: "Extract structured fields from unstructured text as a JSON object",
    parameters: [
      { name: "step", dataType: "string", description: "Step name", formInputType: "text", required: true },
      {
        name: "options", dataType: "object",
        description: "{text, fields (array of field names), provider, model, context}",
        formInputType: "json", required: true,
      },
    ],
    returnType: "object", returnDescription: "JSON object with extracted field values (null if not found)",
    example: 'agent.extract "parse-resume" {"text": $resume, "fields": ["name", "email", "experience_years"]} into $data',
  },
  guard: {
    description: "Validate AI output against rules before passing it forward in the pipeline",
    parameters: [
      { name: "value", dataType: "any", description: "The value to validate", formInputType: "text", required: true },
      {
        name: "rules", dataType: "object",
        description: "{type, min, max, minLength, maxLength, pattern, enum, required, notEmpty, onFail (throw|default|null), defaultValue}",
        formInputType: "json", required: true,
      },
    ],
    returnType: "any", returnDescription: "The original value if valid, or default/null based on onFail mode",
    example: 'agent.guard $score {"type": "number", "min": 0, "max": 100}',
  },
};

export const AgentModuleMetadata = {
  description: "AI agent integration for Claude Code and OpenAI Codex — prompts, parsing, caching, retries, batch processing, classification, extraction, guards, and context management",
  methods: ["pipeline", "claude", "codex", "debug", "log", "cost", "notify", "model", "prompt", "context", "batch", "classify", "extract", "guard"],
};
