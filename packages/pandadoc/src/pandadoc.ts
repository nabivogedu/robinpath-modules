import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Pandadoc: "${key}" not configured. Call pandadoc.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.pandadoc.com/public/v1${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("apiKey")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Pandadoc API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const apiKey = args[0] as string;
  if (!apiKey) throw new Error("pandadoc.setCredentials requires apiKey.");
  config.set("apiKey", apiKey);
  return "Pandadoc credentials configured.";
};

const listDocuments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listDocuments/${id}` : `/listDocuments`);
};

const getDocument: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getDocument/${id}` : `/getDocument`);
};

const createDocument: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createDocument`, "POST", typeof data === "object" ? data : { value: data });
};

const createDocumentFromTemplate: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createDocumentFromTemplate`, "POST", typeof data === "object" ? data : { value: data });
};

const sendDocument: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendDocument`, "POST", typeof data === "object" ? data : { value: data });
};

const getDocumentStatus: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getDocumentStatus/${id}` : `/getDocumentStatus`);
};

const downloadDocument: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/downloadDocument/${id}` : `/downloadDocument`);
};

const deleteDocument: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("pandadoc.deleteDocument requires an ID.");
  return apiCall(`/deleteDocument/${id}`, "DELETE");
};

const listTemplates: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTemplates/${id}` : `/listTemplates`);
};

const getTemplate: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getTemplate/${id}` : `/getTemplate`);
};

const listContacts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listContacts/${id}` : `/listContacts`);
};

const createContact: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createContact`, "POST", typeof data === "object" ? data : { value: data });
};

const getDocumentDetails: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getDocumentDetails/${id}` : `/getDocumentDetails`);
};

const listLinkedObjects: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listLinkedObjects/${id}` : `/listLinkedObjects`);
};

export const PandadocFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listDocuments, getDocument, createDocument, createDocumentFromTemplate, sendDocument, getDocumentStatus, downloadDocument, deleteDocument, listTemplates, getTemplate, listContacts, createContact, getDocumentDetails, listLinkedObjects,
};

export const PandadocFunctionMetadata = {
  setCredentials: { description: "Configure pandadoc credentials.", parameters: [{ name: "apiKey", dataType: "string", description: "apiKey", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listDocuments: { description: "listDocuments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getDocument: { description: "getDocument", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createDocument: { description: "createDocument", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createDocumentFromTemplate: { description: "createDocumentFromTemplate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendDocument: { description: "sendDocument", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getDocumentStatus: { description: "getDocumentStatus", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  downloadDocument: { description: "downloadDocument", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteDocument: { description: "deleteDocument", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTemplates: { description: "listTemplates", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTemplate: { description: "getTemplate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listContacts: { description: "listContacts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createContact: { description: "createContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getDocumentDetails: { description: "getDocumentDetails", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listLinkedObjects: { description: "listLinkedObjects", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const PandadocModuleMetadata = {
  description: "PandaDoc — documents, templates, contacts, pricing tables, and analytics.",
  methods: Object.keys(PandadocFunctions),
  category: "documents",
};
