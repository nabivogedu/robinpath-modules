import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Deepl: "${key}" not configured. Call deepl.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api-free.deepl.com/v2${path}`, {
    method,
    headers: { "Authorization": `DeepL-Auth-Key ${getConfig("authKey")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Deepl API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const authKey = args[0] as string;
  if (!authKey) throw new Error("deepl.setCredentials requires authKey.");
  config.set("authKey", authKey);
  return "Deepl credentials configured.";
};

const translateText: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/translateText`, "POST", typeof data === "object" ? data : { value: data });
};

const translateBatch: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/translateBatch`, "POST", typeof data === "object" ? data : { value: data });
};

const getUsage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUsage/${id}` : `/getUsage`);
};

const listSourceLanguages: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSourceLanguages/${id}` : `/listSourceLanguages`);
};

const listTargetLanguages: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTargetLanguages/${id}` : `/listTargetLanguages`);
};

const listGlossaryLanguagePairs: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listGlossaryLanguagePairs/${id}` : `/listGlossaryLanguagePairs`);
};

const createGlossary: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createGlossary`, "POST", typeof data === "object" ? data : { value: data });
};

const getGlossary: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getGlossary/${id}` : `/getGlossary`);
};

const listGlossaries: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listGlossaries/${id}` : `/listGlossaries`);
};

const deleteGlossary: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("deepl.deleteGlossary requires an ID.");
  return apiCall(`/deleteGlossary/${id}`, "DELETE");
};

const getGlossaryEntries: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getGlossaryEntries/${id}` : `/getGlossaryEntries`);
};

const translateDocument: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/translateDocument`, "POST", typeof data === "object" ? data : { value: data });
};

export const DeeplFunctions: Record<string, BuiltinHandler> = {
  setCredentials, translateText, translateBatch, getUsage, listSourceLanguages, listTargetLanguages, listGlossaryLanguagePairs, createGlossary, getGlossary, listGlossaries, deleteGlossary, getGlossaryEntries, translateDocument,
};

export const DeeplFunctionMetadata = {
  setCredentials: { description: "Configure deepl credentials.", parameters: [{ name: "authKey", dataType: "string", description: "authKey", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  translateText: { description: "translateText", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  translateBatch: { description: "translateBatch", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUsage: { description: "getUsage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listSourceLanguages: { description: "listSourceLanguages", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTargetLanguages: { description: "listTargetLanguages", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listGlossaryLanguagePairs: { description: "listGlossaryLanguagePairs", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createGlossary: { description: "createGlossary", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getGlossary: { description: "getGlossary", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listGlossaries: { description: "listGlossaries", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteGlossary: { description: "deleteGlossary", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getGlossaryEntries: { description: "getGlossaryEntries", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  translateDocument: { description: "translateDocument", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const DeeplModuleMetadata = {
  description: "DeepL — professional translation, glossaries, and document translation.",
  methods: Object.keys(DeeplFunctions),
  category: "translation",
};
