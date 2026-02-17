import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Apollo: "${key}" not configured. Call apollo.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.apollo.io/v1${path}`, {
    method,
    headers: { "x-api-key": getConfig("apiKey"), "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Apollo API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const apiKey = args[0] as string;
  if (!apiKey) throw new Error("apollo.setCredentials requires apiKey.");
  config.set("apiKey", apiKey);
  return "Apollo credentials configured.";
};

const searchPeople: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchPeople/${id}` : `/searchPeople`);
};

const getPerson: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPerson/${id}` : `/getPerson`);
};

const enrichPerson: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/enrichPerson/${id}` : `/enrichPerson`);
};

const searchOrganizations: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchOrganizations/${id}` : `/searchOrganizations`);
};

const getOrganization: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getOrganization/${id}` : `/getOrganization`);
};

const enrichOrganization: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/enrichOrganization/${id}` : `/enrichOrganization`);
};

const listSequences: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSequences/${id}` : `/listSequences`);
};

const getSequence: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSequence/${id}` : `/getSequence`);
};

const addToSequence: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addToSequence`, "POST", typeof data === "object" ? data : { value: data });
};

const listEmailAccounts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listEmailAccounts/${id}` : `/listEmailAccounts`);
};

const searchContacts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchContacts/${id}` : `/searchContacts`);
};

const createContact: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createContact`, "POST", typeof data === "object" ? data : { value: data });
};

const updateContact: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("apollo.updateContact requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateContact/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listLists: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listLists/${id}` : `/listLists`);
};

const addToList: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addToList`, "POST", typeof data === "object" ? data : { value: data });
};

const listTasks: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTasks/${id}` : `/listTasks`);
};

const createTask: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createTask`, "POST", typeof data === "object" ? data : { value: data });
};

const getAccount: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getAccount/${id}` : `/getAccount`);
};

export const ApolloFunctions: Record<string, BuiltinHandler> = {
  setCredentials, searchPeople, getPerson, enrichPerson, searchOrganizations, getOrganization, enrichOrganization, listSequences, getSequence, addToSequence, listEmailAccounts, searchContacts, createContact, updateContact, listLists, addToList, listTasks, createTask, getAccount,
};

export const ApolloFunctionMetadata = {
  setCredentials: { description: "Configure apollo credentials.", parameters: [{ name: "apiKey", dataType: "string", description: "apiKey", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  searchPeople: { description: "searchPeople", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPerson: { description: "getPerson", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  enrichPerson: { description: "enrichPerson", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchOrganizations: { description: "searchOrganizations", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getOrganization: { description: "getOrganization", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  enrichOrganization: { description: "enrichOrganization", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listSequences: { description: "listSequences", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSequence: { description: "getSequence", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addToSequence: { description: "addToSequence", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listEmailAccounts: { description: "listEmailAccounts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchContacts: { description: "searchContacts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createContact: { description: "createContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateContact: { description: "updateContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listLists: { description: "listLists", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addToList: { description: "addToList", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTasks: { description: "listTasks", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTask: { description: "createTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getAccount: { description: "getAccount", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const ApolloModuleMetadata = {
  description: "Apollo.io — people search, company enrichment, sequences, and outreach management.",
  methods: Object.keys(ApolloFunctions),
  category: "sales",
};
