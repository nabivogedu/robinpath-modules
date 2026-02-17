import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// ── Internal State ──────────────────────────────────────────────────

interface ProviderConfig {
  name: string;
  provider: "openai" | "anthropic" | "custom";
  apiKey: string;
  baseUrl: string;
  defaultModel: string;
  defaultMaxTokens: number;
}

const providers = new Map<string, ProviderConfig>();

const PROVIDER_DEFAULTS: Record<string, { baseUrl: string; model: string }> = {
  openai: { baseUrl: "https://api.openai.com/v1", model: "gpt-4o" },
  anthropic: { baseUrl: "https://api.anthropic.com/v1", model: "claude-sonnet-4-5-20250929" },
};

// ── Function Handlers ───────────────────────────────────────────────

const configure: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const provider = String(opts.provider ?? "openai") as ProviderConfig["provider"];
  const defaults = PROVIDER_DEFAULTS[provider] ?? { baseUrl: "", model: "" };

  const config: ProviderConfig = {
    name,
    provider,
    apiKey: String(opts.apiKey ?? opts.key ?? ""),
    baseUrl: String(opts.baseUrl ?? defaults.baseUrl),
    defaultModel: String(opts.model ?? defaults.model),
    defaultMaxTokens: Number(opts.maxTokens ?? 4096),
  };

  providers.set(name, config);
  return { name, provider, model: config.defaultModel };
};

const chat: BuiltinHandler = async (args) => {
  const providerName = String(args[0] ?? "default");
  const messages = args[1];
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  const config = providers.get(providerName);
  if (!config) throw new Error(`AI provider "${providerName}" not configured. Use ai.configure first.`);

  const model = String(opts.model ?? config.defaultModel);
  const maxTokens = Number(opts.maxTokens ?? config.defaultMaxTokens);
  const temperature = opts.temperature != null ? Number(opts.temperature) : undefined;
  const systemPrompt = opts.system ? String(opts.system) : undefined;

  // Normalize messages
  let msgArray: { role: string; content: string }[];
  if (typeof messages === "string") {
    msgArray = [{ role: "user", content: messages }];
  } else if (Array.isArray(messages)) {
    msgArray = messages as { role: string; content: string }[];
  } else {
    msgArray = [{ role: "user", content: String(messages) }];
  }

  if (config.provider === "anthropic") {
    return await callAnthropic(config, msgArray, model, maxTokens, temperature, systemPrompt);
  }

  // OpenAI-compatible (also works for custom endpoints)
  return await callOpenAI(config, msgArray, model, maxTokens, temperature, systemPrompt);
};

async function callOpenAI(config: ProviderConfig, messages: { role: string; content: string }[], model: string, maxTokens: number, temperature?: number, system?: string) {
  const allMessages = system ? [{ role: "system", content: system }, ...messages] : messages;

  const body: Record<string, unknown> = { model, messages: allMessages, max_tokens: maxTokens };
  if (temperature !== undefined) body.temperature = temperature;

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${config.apiKey}` },
    body: JSON.stringify(body),
  });

  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) throw new Error(`OpenAI API error: ${JSON.stringify(data.error ?? data)}`);

  const choices = data.choices as { message: { content: string; role: string } }[];
  const usage = data.usage as { prompt_tokens: number; completion_tokens: number; total_tokens: number } | undefined;

  return {
    content: choices?.[0]?.message?.content ?? "",
    role: "assistant",
    model: data.model,
    usage: usage ? { promptTokens: usage.prompt_tokens, completionTokens: usage.completion_tokens, totalTokens: usage.total_tokens } : undefined,
  };
}

async function callAnthropic(config: ProviderConfig, messages: { role: string; content: string }[], model: string, maxTokens: number, temperature?: number, system?: string) {
  const body: Record<string, unknown> = { model, messages, max_tokens: maxTokens };
  if (system) body.system = system;
  if (temperature !== undefined) body.temperature = temperature;

  const response = await fetch(`${config.baseUrl}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) throw new Error(`Anthropic API error: ${JSON.stringify(data.error ?? data)}`);

  const content = (data.content as { type: string; text: string }[])?.[0]?.text ?? "";
  const usage = data.usage as { input_tokens: number; output_tokens: number } | undefined;

  return {
    content,
    role: "assistant",
    model: data.model,
    usage: usage ? { promptTokens: usage.input_tokens, completionTokens: usage.output_tokens, totalTokens: (usage.input_tokens ?? 0) + (usage.output_tokens ?? 0) } : undefined,
    stopReason: data.stop_reason,
  };
}

const complete: BuiltinHandler = async (args) => {
  const providerName = String(args[0] ?? "default");
  const prompt = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  const result = await chat([providerName, prompt, opts]) as { content: string; usage?: unknown };
  return result.content;
};

const summarize: BuiltinHandler = async (args) => {
  const providerName = String(args[0] ?? "default");
  const text = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  const maxLength = opts.maxLength ? `in ${opts.maxLength} words or less` : "concisely";
  const prompt = `Summarize the following text ${maxLength}:\n\n${text}`;
  return await complete([providerName, prompt, opts]);
};

const extract: BuiltinHandler = async (args) => {
  const providerName = String(args[0] ?? "default");
  const text = String(args[1] ?? "");
  const fields = Array.isArray(args[2]) ? args[2] : String(args[2] ?? "").split(",").map((s: any) => s.trim());
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  const prompt = `Extract the following fields from the text below and return ONLY a valid JSON object with these keys: ${fields.join(", ")}.\n\nText:\n${text}\n\nJSON:`;
  const result = await complete([providerName, prompt, { ...opts, temperature: 0 }]) as string;

  try {
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : result;
  } catch {
    return result;
  }
};

const classify: BuiltinHandler = async (args) => {
  const providerName = String(args[0] ?? "default");
  const text = String(args[1] ?? "");
  const categories = Array.isArray(args[2]) ? args[2] : String(args[2] ?? "").split(",").map((s: any) => s.trim());
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  const prompt = `Classify the following text into exactly one of these categories: ${categories.join(", ")}.\n\nText: ${text}\n\nRespond with ONLY the category name, nothing else.`;
  const result = await complete([providerName, prompt, { ...opts, temperature: 0 }]) as string;
  return result.trim();
};

const translate: BuiltinHandler = async (args) => {
  const providerName = String(args[0] ?? "default");
  const text = String(args[1] ?? "");
  const targetLang = String(args[2] ?? "English");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  const prompt = `Translate the following text to ${targetLang}. Return ONLY the translation, nothing else.\n\n${text}`;
  return await complete([providerName, prompt, opts]);
};

const sentiment: BuiltinHandler = async (args) => {
  const providerName = String(args[0] ?? "default");
  const text = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  const prompt = `Analyze the sentiment of the following text. Respond with ONLY a JSON object: {"sentiment": "positive"|"negative"|"neutral", "score": 0.0-1.0, "confidence": 0.0-1.0}\n\nText: ${text}\n\nJSON:`;
  const result = await complete([providerName, prompt, { ...opts, temperature: 0 }]) as string;

  try {
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { sentiment: "neutral", score: 0.5 };
  } catch {
    return { sentiment: "neutral", score: 0.5, raw: result };
  }
};

const generateJson: BuiltinHandler = async (args) => {
  const providerName = String(args[0] ?? "default");
  const prompt = String(args[1] ?? "");
  const schema = args[2];
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  let fullPrompt = `${prompt}\n\nRespond with ONLY a valid JSON object`;
  if (schema) fullPrompt += ` matching this structure: ${JSON.stringify(schema)}`;
  fullPrompt += ". No explanations, no markdown, just JSON.";

  const result = await complete([providerName, fullPrompt, { ...opts, temperature: 0 }]) as string;
  try {
    const jsonMatch = result.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : result;
  } catch {
    return result;
  }
};

const embedding: BuiltinHandler = async (args) => {
  const providerName = String(args[0] ?? "default");
  const input = args[1];
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  const config = providers.get(providerName);
  if (!config) throw new Error(`AI provider "${providerName}" not configured.`);

  const model = String(opts.model ?? "text-embedding-3-small");
  const texts = Array.isArray(input) ? input.map(String) : [String(input)];

  const response = await fetch(`${config.baseUrl}/embeddings`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${config.apiKey}` },
    body: JSON.stringify({ model, input: texts }),
  });

  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) throw new Error(`Embeddings error: ${JSON.stringify(data.error ?? data)}`);

  const embeddings = (data.data as { embedding: number[]; index: number }[])?.map((d: any) => d.embedding) ?? [];
  return texts.length === 1 ? embeddings[0] : embeddings;
};

// ── Exports ─────────────────────────────────────────────────────────

export const AiFunctions: Record<string, BuiltinHandler> = {
  configure, chat, complete, summarize, extract, classify, translate, sentiment, generateJson, embedding,
};

export const AiFunctionMetadata = {
  configure: { description: "Configure an AI provider (OpenAI, Anthropic, or custom)", parameters: [{ name: "name", dataType: "string", description: "Provider name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{provider, apiKey, baseUrl, model, maxTokens}", formInputType: "text", required: true }], returnType: "object", returnDescription: "{name, provider, model}", example: 'ai.configure "openai" {"provider": "openai", "apiKey": $key}' },
  chat: { description: "Send a chat message and get a response", parameters: [{ name: "provider", dataType: "string", description: "Provider name", formInputType: "text", required: true }, { name: "messages", dataType: "any", description: "String or array of {role, content}", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{model, maxTokens, temperature, system}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{content, role, model, usage}", example: 'ai.chat "openai" "Explain quantum computing" {"system": "You are a teacher"}' },
  complete: { description: "Get a simple text completion (returns just the text)", parameters: [{ name: "provider", dataType: "string", description: "Provider name", formInputType: "text", required: true }, { name: "prompt", dataType: "string", description: "Prompt text", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{model, maxTokens, temperature}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Generated text", example: 'ai.complete "openai" "Write a haiku about automation"' },
  summarize: { description: "Summarize text using AI", parameters: [{ name: "provider", dataType: "string", description: "Provider name", formInputType: "text", required: true }, { name: "text", dataType: "string", description: "Text to summarize", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{maxLength}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Summary text", example: 'ai.summarize "openai" $longText {"maxLength": 100}' },
  extract: { description: "Extract structured data from text using AI", parameters: [{ name: "provider", dataType: "string", description: "Provider name", formInputType: "text", required: true }, { name: "text", dataType: "string", description: "Source text", formInputType: "text", required: true }, { name: "fields", dataType: "array", description: "Fields to extract", formInputType: "text", required: true }], returnType: "object", returnDescription: "Extracted key-value object", example: 'ai.extract "openai" "John Smith, age 30, from NYC" ["name", "age", "city"]' },
  classify: { description: "Classify text into one of given categories", parameters: [{ name: "provider", dataType: "string", description: "Provider name", formInputType: "text", required: true }, { name: "text", dataType: "string", description: "Text to classify", formInputType: "text", required: true }, { name: "categories", dataType: "array", description: "Possible categories", formInputType: "text", required: true }], returnType: "string", returnDescription: "Selected category", example: 'ai.classify "openai" "I love this product!" ["positive", "negative", "neutral"]' },
  translate: { description: "Translate text to a target language", parameters: [{ name: "provider", dataType: "string", description: "Provider name", formInputType: "text", required: true }, { name: "text", dataType: "string", description: "Text to translate", formInputType: "text", required: true }, { name: "targetLang", dataType: "string", description: "Target language", formInputType: "text", required: true }], returnType: "string", returnDescription: "Translated text", example: 'ai.translate "openai" "Hello world" "Spanish"' },
  sentiment: { description: "Analyze the sentiment of text", parameters: [{ name: "provider", dataType: "string", description: "Provider name", formInputType: "text", required: true }, { name: "text", dataType: "string", description: "Text to analyze", formInputType: "text", required: true }], returnType: "object", returnDescription: "{sentiment, score, confidence}", example: 'ai.sentiment "openai" "This product is amazing!"' },
  generateJson: { description: "Generate structured JSON from a prompt", parameters: [{ name: "provider", dataType: "string", description: "Provider name", formInputType: "text", required: true }, { name: "prompt", dataType: "string", description: "Prompt describing what to generate", formInputType: "text", required: true }, { name: "schema", dataType: "object", description: "Optional JSON schema/structure", formInputType: "text", required: false }], returnType: "object", returnDescription: "Generated JSON object", example: 'ai.generateJson "openai" "Generate 3 fake users" {"name": "string", "email": "string"}' },
  embedding: { description: "Generate text embeddings (OpenAI only)", parameters: [{ name: "provider", dataType: "string", description: "Provider name", formInputType: "text", required: true }, { name: "input", dataType: "any", description: "String or array of strings", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{model}", formInputType: "text", required: false }], returnType: "array", returnDescription: "Embedding vector(s)", example: 'ai.embedding "openai" "Hello world"' },
};

export const AiModuleMetadata = {
  description: "LLM integration: chat, complete, summarize, extract, classify, translate, sentiment analysis, and embeddings",
  methods: ["configure", "chat", "complete", "summarize", "extract", "classify", "translate", "sentiment", "generateJson", "embedding"],
};
