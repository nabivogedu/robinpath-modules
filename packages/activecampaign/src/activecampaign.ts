import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Activecampaign: "${key}" not configured. Call activecampaign.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://${getConfig("accountName")}.api-us1.com/api/3${path}`, {
    method,
    headers: { "Api-Token": getConfig("apiToken"), "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Activecampaign API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accountName = args[0] as string;
  const apiToken = args[1] as string;
  if (!accountName || !apiToken) throw new Error("activecampaign.setCredentials requires accountName, apiToken.");
  config.set("accountName", accountName);
  config.set("apiToken", apiToken);
  return "Activecampaign credentials configured.";
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
  if (!id) throw new Error("activecampaign.updateContact requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateContact/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteContact: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("activecampaign.deleteContact requires an ID.");
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
  if (!id) throw new Error("activecampaign.removeContactFromList requires an ID.");
  return apiCall(`/removeContactFromList/${id}`, "DELETE");
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

const addTagToContact: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addTagToContact`, "POST", typeof data === "object" ? data : { value: data });
};

const removeTagFromContact: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("activecampaign.removeTagFromContact requires an ID.");
  return apiCall(`/removeTagFromContact/${id}`, "DELETE");
};

const listAutomations: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listAutomations/${id}` : `/listAutomations`);
};

const addContactToAutomation: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addContactToAutomation`, "POST", typeof data === "object" ? data : { value: data });
};

const listDeals: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listDeals/${id}` : `/listDeals`);
};

const createDeal: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createDeal`, "POST", typeof data === "object" ? data : { value: data });
};

const updateDeal: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("activecampaign.updateDeal requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateDeal/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listCampaigns: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCampaigns/${id}` : `/listCampaigns`);
};

export const ActivecampaignFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listContacts, getContact, createContact, updateContact, deleteContact, listLists, getList, createList, addContactToList, removeContactFromList, listTags, createTag, addTagToContact, removeTagFromContact, listAutomations, addContactToAutomation, listDeals, createDeal, updateDeal, listCampaigns,
};

export const ActivecampaignFunctionMetadata = {
  setCredentials: { description: "Configure activecampaign credentials.", parameters: [{ name: "accountName", dataType: "string", description: "accountName", formInputType: "text", required: true }, { name: "apiToken", dataType: "string", description: "apiToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
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
  listTags: { description: "listTags", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTag: { description: "createTag", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addTagToContact: { description: "addTagToContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  removeTagFromContact: { description: "removeTagFromContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listAutomations: { description: "listAutomations", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addContactToAutomation: { description: "addContactToAutomation", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listDeals: { description: "listDeals", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createDeal: { description: "createDeal", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateDeal: { description: "updateDeal", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCampaigns: { description: "listCampaigns", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const ActivecampaignModuleMetadata = {
  description: "ActiveCampaign — contacts, automations, campaigns, deals, lists, and tags.",
  methods: Object.keys(ActivecampaignFunctions),
  category: "email-marketing",
};
