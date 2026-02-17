import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Anthropic: "${key}" not configured. Call anthropic.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.anthropic.com/v1${path}`, {
    method,
    headers: { "x-api-key": getConfig("apiKey"), "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Anthropic API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const apiKey = args[0] as string;
  if (!apiKey) throw new Error("anthropic.setCredentials requires apiKey.");
  config.set("apiKey", apiKey);
  return "Anthropic credentials configured.";
};

const createMessage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createMessage`, "POST", typeof data === "object" ? data : { value: data });
};

const chat: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/chat${id ? `/${id}` : ""}`);
};

const summarize: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/summarize${id ? `/${id}` : ""}`);
};

const translate: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/translate`, "POST", typeof data === "object" ? data : { value: data });
};

const extract: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/extract${id ? `/${id}` : ""}`);
};

const classify: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/classify${id ? `/${id}` : ""}`);
};

const analyzeImage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/analyzeImage${id ? `/${id}` : ""}`);
};

const countTokens: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/countTokens${id ? `/${id}` : ""}`);
};

const listModels: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listModels/${id}` : `/listModels`);
};

const createBatch: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createBatch`, "POST", typeof data === "object" ? data : { value: data });
};

const getBatch: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getBatch/${id}` : `/getBatch`);
};

const listBatches: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listBatches/${id}` : `/listBatches`);
};

const cancelBatch: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("anthropic.cancelBatch requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/cancelBatch/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const getBatchResults: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getBatchResults/${id}` : `/getBatchResults`);
};

const complete: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("anthropic.complete requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/complete/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const generateCode: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/generateCode${id ? `/${id}` : ""}`);
};

export const AnthropicFunctions: Record<string, BuiltinHandler> = {
  setCredentials, createMessage, chat, summarize, translate, extract, classify, analyzeImage, countTokens, listModels, createBatch, getBatch, listBatches, cancelBatch, getBatchResults, complete, generateCode,
};

export const AnthropicFunctionMetadata = {
  setCredentials: { description: "Configure anthropic credentials.", parameters: [{ name: "apiKey", dataType: "string", description: "apiKey", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  createMessage: { description: "createMessage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  chat: { description: "chat", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  summarize: { description: "summarize", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  translate: { description: "translate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  extract: { description: "extract", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  classify: { description: "classify", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  analyzeImage: { description: "analyzeImage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  countTokens: { description: "countTokens", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listModels: { description: "listModels", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createBatch: { description: "createBatch", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getBatch: { description: "getBatch", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listBatches: { description: "listBatches", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  cancelBatch: { description: "cancelBatch", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getBatchResults: { description: "getBatchResults", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  complete: { description: "complete", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  generateCode: { description: "generateCode", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const AnthropicModuleMetadata = {
  description: "Anthropic Claude API — messages, streaming, tools, vision, and batches.",
  methods: Object.keys(AnthropicFunctions),
  category: "ai",
};
