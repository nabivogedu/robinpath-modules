import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Translate: "${key}" not configured. Call translate.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.mymemory.translated.net${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Translate API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const translateText: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/translateText${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const translateBatch: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/translateBatch${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const detectLanguage: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/detectLanguage${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const listLanguages: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/listLanguages${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const getSupportedLanguagePairs: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/getSupportedLanguagePairs${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const translateHtml: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/translateHtml${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const suggestTranslation: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/suggestTranslation${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const getTranslationMemory: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/getTranslationMemory${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const autoTranslate: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/autoTranslate${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const setProvider: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/setProvider${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

export const TranslateFunctions: Record<string, BuiltinHandler> = {
  translateText, translateBatch, detectLanguage, listLanguages, getSupportedLanguagePairs, translateHtml, suggestTranslation, getTranslationMemory, autoTranslate, setProvider,
};

export const TranslateFunctionMetadata = {
  translateText: { description: "translateText", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  translateBatch: { description: "translateBatch", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  detectLanguage: { description: "detectLanguage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listLanguages: { description: "listLanguages", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSupportedLanguagePairs: { description: "getSupportedLanguagePairs", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  translateHtml: { description: "translateHtml", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  suggestTranslation: { description: "suggestTranslation", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTranslationMemory: { description: "getTranslationMemory", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  autoTranslate: { description: "autoTranslate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  setProvider: { description: "setProvider", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const TranslateModuleMetadata = {
  description: "Multi-provider translation — LibreTranslate, MyMemory, and more.",
  methods: Object.keys(TranslateFunctions),
  category: "utility",
};
