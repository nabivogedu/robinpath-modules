import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Outlook: "${key}" not configured. Call outlook.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://graph.microsoft.com/v1.0/me${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Outlook API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("outlook.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Outlook credentials configured.";
};

const listMessages: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listMessages/${id}` : `/listMessages`);
};

const getMessage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getMessage/${id}` : `/getMessage`);
};

const sendEmail: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendEmail`, "POST", typeof data === "object" ? data : { value: data });
};

const replyToEmail: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/replyToEmail`, "POST", typeof data === "object" ? data : { value: data });
};

const forwardEmail: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/forwardEmail${id ? `/${id}` : ""}`);
};

const createDraft: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createDraft`, "POST", typeof data === "object" ? data : { value: data });
};

const sendDraft: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendDraft`, "POST", typeof data === "object" ? data : { value: data });
};

const listDrafts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listDrafts/${id}` : `/listDrafts`);
};

const deleteMessage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("outlook.deleteMessage requires an ID.");
  return apiCall(`/deleteMessage/${id}`, "DELETE");
};

const moveMessage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("outlook.moveMessage requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/moveMessage/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const copyMessage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("outlook.copyMessage requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/copyMessage/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listFolders: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listFolders/${id}` : `/listFolders`);
};

const createFolder: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createFolder`, "POST", typeof data === "object" ? data : { value: data });
};

const listAttachments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listAttachments/${id}` : `/listAttachments`);
};

const getAttachment: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getAttachment/${id}` : `/getAttachment`);
};

const createRule: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createRule`, "POST", typeof data === "object" ? data : { value: data });
};

const getProfile: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getProfile/${id}` : `/getProfile`);
};

const searchMessages: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchMessages/${id}` : `/searchMessages`);
};

const flagMessage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/flagMessage`, "POST", typeof data === "object" ? data : { value: data });
};

const listCategories: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCategories/${id}` : `/listCategories`);
};

export const OutlookFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listMessages, getMessage, sendEmail, replyToEmail, forwardEmail, createDraft, sendDraft, listDrafts, deleteMessage, moveMessage, copyMessage, listFolders, createFolder, listAttachments, getAttachment, createRule, getProfile, searchMessages, flagMessage, listCategories,
};

export const OutlookFunctionMetadata = {
  setCredentials: { description: "Configure outlook credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listMessages: { description: "listMessages", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getMessage: { description: "getMessage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendEmail: { description: "sendEmail", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  replyToEmail: { description: "replyToEmail", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  forwardEmail: { description: "forwardEmail", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createDraft: { description: "createDraft", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendDraft: { description: "sendDraft", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listDrafts: { description: "listDrafts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteMessage: { description: "deleteMessage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  moveMessage: { description: "moveMessage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  copyMessage: { description: "copyMessage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listFolders: { description: "listFolders", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createFolder: { description: "createFolder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listAttachments: { description: "listAttachments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getAttachment: { description: "getAttachment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createRule: { description: "createRule", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getProfile: { description: "getProfile", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchMessages: { description: "searchMessages", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  flagMessage: { description: "flagMessage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCategories: { description: "listCategories", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const OutlookModuleMetadata = {
  description: "Microsoft 365 email via Microsoft Graph API — read, send, folders, rules, and calendar.",
  methods: Object.keys(OutlookFunctions),
  category: "email",
};
