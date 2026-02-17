import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Intercom: "${key}" not configured. Call intercom.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.intercom.io${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Intercom API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("intercom.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Intercom credentials configured.";
};

const listContacts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listContacts/${id}` : `/listContacts`);
};

const getContact: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getContact/${id}` : `/getContact`);
};

const createContact: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createContact`, "POST", typeof data === "object" ? data : { value: data });
};

const updateContact: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("intercom.updateContact requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateContact/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteContact: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("intercom.deleteContact requires an ID.");
  return apiCall(`/deleteContact/${id}`, "DELETE");
};

const searchContacts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchContacts/${id}` : `/searchContacts`);
};

const listConversations: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listConversations/${id}` : `/listConversations`);
};

const getConversation: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getConversation/${id}` : `/getConversation`);
};

const replyToConversation: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/replyToConversation`, "POST", typeof data === "object" ? data : { value: data });
};

const assignConversation: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/assignConversation`, "POST", typeof data === "object" ? data : { value: data });
};

const closeConversation: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("intercom.closeConversation requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/closeConversation/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listCompanies: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCompanies/${id}` : `/listCompanies`);
};

const getCompany: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCompany/${id}` : `/getCompany`);
};

const createCompany: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createCompany`, "POST", typeof data === "object" ? data : { value: data });
};

const listTags: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTags/${id}` : `/listTags`);
};

const createTag: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createTag`, "POST", typeof data === "object" ? data : { value: data });
};

const tagContact: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/tagContact`, "POST", typeof data === "object" ? data : { value: data });
};

const removeTag: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("intercom.removeTag requires an ID.");
  return apiCall(`/removeTag/${id}`, "DELETE");
};

export const IntercomFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listContacts, getContact, createContact, updateContact, deleteContact, searchContacts, listConversations, getConversation, replyToConversation, assignConversation, closeConversation, listCompanies, getCompany, createCompany, listTags, createTag, tagContact, removeTag,
};

export const IntercomFunctionMetadata = {
  setCredentials: { description: "Configure intercom credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listContacts: { description: "listContacts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getContact: { description: "getContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createContact: { description: "createContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateContact: { description: "updateContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteContact: { description: "deleteContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchContacts: { description: "searchContacts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listConversations: { description: "listConversations", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getConversation: { description: "getConversation", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  replyToConversation: { description: "replyToConversation", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  assignConversation: { description: "assignConversation", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  closeConversation: { description: "closeConversation", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCompanies: { description: "listCompanies", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCompany: { description: "getCompany", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createCompany: { description: "createCompany", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTags: { description: "listTags", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTag: { description: "createTag", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  tagContact: { description: "tagContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  removeTag: { description: "removeTag", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const IntercomModuleMetadata = {
  description: "Intercom — conversations, contacts, companies, articles, tags, and notes.",
  methods: Object.keys(IntercomFunctions),
  category: "support",
};
