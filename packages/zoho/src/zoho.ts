import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Zoho: "${key}" not configured. Call zoho.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://www.zohoapis.com/crm/v2${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Zoho API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("zoho.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Zoho credentials configured.";
};

const listRecords: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listRecords/${id}` : `/listRecords`);
};

const getRecord: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getRecord/${id}` : `/getRecord`);
};

const createRecord: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createRecord`, "POST", typeof data === "object" ? data : { value: data });
};

const updateRecord: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("zoho.updateRecord requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateRecord/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteRecord: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("zoho.deleteRecord requires an ID.");
  return apiCall(`/deleteRecord/${id}`, "DELETE");
};

const searchRecords: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchRecords/${id}` : `/searchRecords`);
};

const upsertRecords: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/upsertRecords`, "POST", typeof data === "object" ? data : { value: data });
};

const listModules: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listModules/${id}` : `/listModules`);
};

const getModuleFields: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getModuleFields/${id}` : `/getModuleFields`);
};

const createLead: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createLead`, "POST", typeof data === "object" ? data : { value: data });
};

const createContact: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createContact`, "POST", typeof data === "object" ? data : { value: data });
};

const createDeal: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createDeal`, "POST", typeof data === "object" ? data : { value: data });
};

const createAccount: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createAccount`, "POST", typeof data === "object" ? data : { value: data });
};

const createTask: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createTask`, "POST", typeof data === "object" ? data : { value: data });
};

const convertLead: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/convertLead`, "POST", typeof data === "object" ? data : { value: data });
};

const addNote: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addNote`, "POST", typeof data === "object" ? data : { value: data });
};

const listNotes: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listNotes/${id}` : `/listNotes`);
};

const getUsers: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUsers/${id}` : `/getUsers`);
};

const getOrganization: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getOrganization/${id}` : `/getOrganization`);
};

const bulkRead: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/bulkRead${id ? `/${id}` : ""}`);
};

export const ZohoFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listRecords, getRecord, createRecord, updateRecord, deleteRecord, searchRecords, upsertRecords, listModules, getModuleFields, createLead, createContact, createDeal, createAccount, createTask, convertLead, addNote, listNotes, getUsers, getOrganization, bulkRead,
};

export const ZohoFunctionMetadata = {
  setCredentials: { description: "Configure zoho credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listRecords: { description: "listRecords", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getRecord: { description: "getRecord", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createRecord: { description: "createRecord", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateRecord: { description: "updateRecord", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteRecord: { description: "deleteRecord", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchRecords: { description: "searchRecords", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  upsertRecords: { description: "upsertRecords", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listModules: { description: "listModules", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getModuleFields: { description: "getModuleFields", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createLead: { description: "createLead", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createContact: { description: "createContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createDeal: { description: "createDeal", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createAccount: { description: "createAccount", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTask: { description: "createTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  convertLead: { description: "convertLead", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addNote: { description: "addNote", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listNotes: { description: "listNotes", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUsers: { description: "getUsers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getOrganization: { description: "getOrganization", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  bulkRead: { description: "bulkRead", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const ZohoModuleMetadata = {
  description: "Zoho CRM — contacts, leads, deals, accounts, tasks, and custom modules.",
  methods: Object.keys(ZohoFunctions),
  category: "crm",
};
