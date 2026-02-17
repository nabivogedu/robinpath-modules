import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Docusign: "${key}" not configured. Call docusign.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://demo.docusign.net/restapi/v2.1${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Docusign API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  const accountId = args[1] as string;
  if (!accessToken || !accountId) throw new Error("docusign.setCredentials requires accessToken, accountId.");
  config.set("accessToken", accessToken);
  config.set("accountId", accountId);
  return "Docusign credentials configured.";
};

const listEnvelopes: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listEnvelopes/${id}` : `/listEnvelopes`);
};

const getEnvelope: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getEnvelope/${id}` : `/getEnvelope`);
};

const createEnvelope: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createEnvelope`, "POST", typeof data === "object" ? data : { value: data });
};

const sendEnvelope: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendEnvelope`, "POST", typeof data === "object" ? data : { value: data });
};

const voidEnvelope: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("docusign.voidEnvelope requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/voidEnvelope/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const getEnvelopeDocuments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getEnvelopeDocuments/${id}` : `/getEnvelopeDocuments`);
};

const downloadDocument: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/downloadDocument/${id}` : `/downloadDocument`);
};

const listRecipients: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listRecipients/${id}` : `/listRecipients`);
};

const getRecipientStatus: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getRecipientStatus/${id}` : `/getRecipientStatus`);
};

const listTemplates: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTemplates/${id}` : `/listTemplates`);
};

const getTemplate: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getTemplate/${id}` : `/getTemplate`);
};

const createEnvelopeFromTemplate: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createEnvelopeFromTemplate`, "POST", typeof data === "object" ? data : { value: data });
};

const getUserInfo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUserInfo/${id}` : `/getUserInfo`);
};

const getAccount: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getAccount/${id}` : `/getAccount`);
};

export const DocusignFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listEnvelopes, getEnvelope, createEnvelope, sendEnvelope, voidEnvelope, getEnvelopeDocuments, downloadDocument, listRecipients, getRecipientStatus, listTemplates, getTemplate, createEnvelopeFromTemplate, getUserInfo, getAccount,
};

export const DocusignFunctionMetadata = {
  setCredentials: { description: "Configure docusign credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }, { name: "accountId", dataType: "string", description: "accountId", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listEnvelopes: { description: "listEnvelopes", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getEnvelope: { description: "getEnvelope", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createEnvelope: { description: "createEnvelope", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendEnvelope: { description: "sendEnvelope", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  voidEnvelope: { description: "voidEnvelope", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getEnvelopeDocuments: { description: "getEnvelopeDocuments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  downloadDocument: { description: "downloadDocument", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listRecipients: { description: "listRecipients", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getRecipientStatus: { description: "getRecipientStatus", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTemplates: { description: "listTemplates", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTemplate: { description: "getTemplate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createEnvelopeFromTemplate: { description: "createEnvelopeFromTemplate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUserInfo: { description: "getUserInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getAccount: { description: "getAccount", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const DocusignModuleMetadata = {
  description: "DocuSign — envelopes, templates, signing, recipients, and status tracking.",
  methods: Object.keys(DocusignFunctions),
  category: "documents",
};
