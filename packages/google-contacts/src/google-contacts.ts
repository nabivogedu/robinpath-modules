import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`GoogleContacts: "${key}" not configured. Call google-contacts.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://people.googleapis.com/v1${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`GoogleContacts API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("google-contacts.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "GoogleContacts credentials configured.";
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
  if (!id) throw new Error("google-contacts.updateContact requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateContact/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteContact: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("google-contacts.deleteContact requires an ID.");
  return apiCall(`/deleteContact/${id}`, "DELETE");
};

const searchContacts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchContacts/${id}` : `/searchContacts`);
};

const listContactGroups: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listContactGroups/${id}` : `/listContactGroups`);
};

const getContactGroup: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getContactGroup/${id}` : `/getContactGroup`);
};

const createContactGroup: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createContactGroup`, "POST", typeof data === "object" ? data : { value: data });
};

const updateContactGroup: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("google-contacts.updateContactGroup requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateContactGroup/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteContactGroup: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("google-contacts.deleteContactGroup requires an ID.");
  return apiCall(`/deleteContactGroup/${id}`, "DELETE");
};

const batchGetContacts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/batchGetContacts/${id}` : `/batchGetContacts`);
};

const getOtherContacts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getOtherContacts/${id}` : `/getOtherContacts`);
};

const getProfile: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getProfile/${id}` : `/getProfile`);
};

const listDirectoryPeople: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listDirectoryPeople/${id}` : `/listDirectoryPeople`);
};

const updateContactPhoto: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("google-contacts.updateContactPhoto requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateContactPhoto/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

export const GoogleContactsFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listContacts, getContact, createContact, updateContact, deleteContact, searchContacts, listContactGroups, getContactGroup, createContactGroup, updateContactGroup, deleteContactGroup, batchGetContacts, getOtherContacts, getProfile, listDirectoryPeople, updateContactPhoto,
};

export const GoogleContactsFunctionMetadata = {
  setCredentials: { description: "Configure google-contacts credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listContacts: { description: "listContacts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getContact: { description: "getContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createContact: { description: "createContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateContact: { description: "updateContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteContact: { description: "deleteContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchContacts: { description: "searchContacts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listContactGroups: { description: "listContactGroups", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getContactGroup: { description: "getContactGroup", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createContactGroup: { description: "createContactGroup", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateContactGroup: { description: "updateContactGroup", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteContactGroup: { description: "deleteContactGroup", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  batchGetContacts: { description: "batchGetContacts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getOtherContacts: { description: "getOtherContacts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getProfile: { description: "getProfile", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listDirectoryPeople: { description: "listDirectoryPeople", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateContactPhoto: { description: "updateContactPhoto", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const GoogleContactsModuleMetadata = {
  description: "Manage Google Contacts via the People API — create, update, search, merge, and group contacts.",
  methods: Object.keys(GoogleContactsFunctions),
  category: "productivity",
};
