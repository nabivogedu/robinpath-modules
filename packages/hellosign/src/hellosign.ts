import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Hellosign: "${key}" not configured. Call hellosign.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.hellosign.com/v3${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("apiKey")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Hellosign API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const apiKey = args[0] as string;
  if (!apiKey) throw new Error("hellosign.setCredentials requires apiKey.");
  config.set("apiKey", apiKey);
  return "Hellosign credentials configured.";
};

const getSignatureRequest: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSignatureRequest/${id}` : `/getSignatureRequest`);
};

const listSignatureRequests: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSignatureRequests/${id}` : `/listSignatureRequests`);
};

const sendSignatureRequest: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendSignatureRequest`, "POST", typeof data === "object" ? data : { value: data });
};

const sendWithTemplate: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendWithTemplate`, "POST", typeof data === "object" ? data : { value: data });
};

const cancelSignatureRequest: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("hellosign.cancelSignatureRequest requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/cancelSignatureRequest/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const downloadSignatureRequest: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/downloadSignatureRequest/${id}` : `/downloadSignatureRequest`);
};

const remindSignatureRequest: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("hellosign.remindSignatureRequest requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/remindSignatureRequest/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listTemplates: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTemplates/${id}` : `/listTemplates`);
};

const getTemplate: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getTemplate/${id}` : `/getTemplate`);
};

const deleteTemplate: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("hellosign.deleteTemplate requires an ID.");
  return apiCall(`/deleteTemplate/${id}`, "DELETE");
};

const createEmbeddedSignatureRequest: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createEmbeddedSignatureRequest`, "POST", typeof data === "object" ? data : { value: data });
};

const getAccount: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getAccount/${id}` : `/getAccount`);
};

const updateAccount: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("hellosign.updateAccount requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateAccount/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listTeamMembers: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTeamMembers/${id}` : `/listTeamMembers`);
};

export const HellosignFunctions: Record<string, BuiltinHandler> = {
  setCredentials, getSignatureRequest, listSignatureRequests, sendSignatureRequest, sendWithTemplate, cancelSignatureRequest, downloadSignatureRequest, remindSignatureRequest, listTemplates, getTemplate, deleteTemplate, createEmbeddedSignatureRequest, getAccount, updateAccount, listTeamMembers,
};

export const HellosignFunctionMetadata = {
  setCredentials: { description: "Configure hellosign credentials.", parameters: [{ name: "apiKey", dataType: "string", description: "apiKey", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  getSignatureRequest: { description: "getSignatureRequest", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listSignatureRequests: { description: "listSignatureRequests", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendSignatureRequest: { description: "sendSignatureRequest", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendWithTemplate: { description: "sendWithTemplate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  cancelSignatureRequest: { description: "cancelSignatureRequest", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  downloadSignatureRequest: { description: "downloadSignatureRequest", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  remindSignatureRequest: { description: "remindSignatureRequest", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTemplates: { description: "listTemplates", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTemplate: { description: "getTemplate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteTemplate: { description: "deleteTemplate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createEmbeddedSignatureRequest: { description: "createEmbeddedSignatureRequest", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getAccount: { description: "getAccount", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateAccount: { description: "updateAccount", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTeamMembers: { description: "listTeamMembers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const HellosignModuleMetadata = {
  description: "Dropbox Sign (HelloSign) — signature requests, templates, and team management.",
  methods: Object.keys(HellosignFunctions),
  category: "documents",
};
