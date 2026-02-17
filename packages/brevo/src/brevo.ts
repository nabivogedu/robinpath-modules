import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Brevo: "${key}" not configured. Call brevo.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.brevo.com/v3${path}`, {
    method,
    headers: { "api-key": getConfig("apiKey"), "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Brevo API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const apiKey = args[0] as string;
  if (!apiKey) throw new Error("brevo.setCredentials requires apiKey.");
  config.set("apiKey", apiKey);
  return "Brevo credentials configured.";
};

const sendTransactionalEmail: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendTransactionalEmail`, "POST", typeof data === "object" ? data : { value: data });
};

const sendTransactionalSms: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendTransactionalSms`, "POST", typeof data === "object" ? data : { value: data });
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
  if (!id) throw new Error("brevo.updateContact requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateContact/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteContact: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("brevo.deleteContact requires an ID.");
  return apiCall(`/deleteContact/${id}`, "DELETE");
};

const listLists: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listLists/${id}` : `/listLists`);
};

const getList: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getList/${id}` : `/getList`);
};

const createList: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createList`, "POST", typeof data === "object" ? data : { value: data });
};

const addContactToList: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addContactToList`, "POST", typeof data === "object" ? data : { value: data });
};

const removeContactFromList: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("brevo.removeContactFromList requires an ID.");
  return apiCall(`/removeContactFromList/${id}`, "DELETE");
};

const listCampaigns: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCampaigns/${id}` : `/listCampaigns`);
};

const getCampaign: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCampaign/${id}` : `/getCampaign`);
};

const createEmailCampaign: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createEmailCampaign`, "POST", typeof data === "object" ? data : { value: data });
};

const sendCampaign: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendCampaign`, "POST", typeof data === "object" ? data : { value: data });
};

const getEmailEvents: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getEmailEvents/${id}` : `/getEmailEvents`);
};

const importContacts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/importContacts`, "POST", typeof data === "object" ? data : { value: data });
};

export const BrevoFunctions: Record<string, BuiltinHandler> = {
  setCredentials, sendTransactionalEmail, sendTransactionalSms, listContacts, getContact, createContact, updateContact, deleteContact, listLists, getList, createList, addContactToList, removeContactFromList, listCampaigns, getCampaign, createEmailCampaign, sendCampaign, getEmailEvents, importContacts,
};

export const BrevoFunctionMetadata = {
  setCredentials: { description: "Configure brevo credentials.", parameters: [{ name: "apiKey", dataType: "string", description: "apiKey", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  sendTransactionalEmail: { description: "sendTransactionalEmail", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendTransactionalSms: { description: "sendTransactionalSms", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listContacts: { description: "listContacts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getContact: { description: "getContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createContact: { description: "createContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateContact: { description: "updateContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteContact: { description: "deleteContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listLists: { description: "listLists", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getList: { description: "getList", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createList: { description: "createList", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addContactToList: { description: "addContactToList", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  removeContactFromList: { description: "removeContactFromList", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCampaigns: { description: "listCampaigns", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCampaign: { description: "getCampaign", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createEmailCampaign: { description: "createEmailCampaign", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendCampaign: { description: "sendCampaign", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getEmailEvents: { description: "getEmailEvents", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  importContacts: { description: "importContacts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const BrevoModuleMetadata = {
  description: "Brevo (Sendinblue) transactional and marketing email, SMS, and contact management.",
  methods: Object.keys(BrevoFunctions),
  category: "email",
};
