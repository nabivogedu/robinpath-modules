import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Freshdesk: "${key}" not configured. Call freshdesk.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://${getConfig("domain")}${path}`, {
    method,
    headers: { "Authorization": "Basic " + btoa(`${getConfig("domain")}:${getConfig("apiKey")}`), "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Freshdesk API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const domain = args[0] as string;
  const apiKey = args[1] as string;
  if (!domain || !apiKey) throw new Error("freshdesk.setCredentials requires domain, apiKey.");
  config.set("domain", domain);
  config.set("apiKey", apiKey);
  return "Freshdesk credentials configured.";
};

const listTickets: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTickets/${id}` : `/listTickets`);
};

const getTicket: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getTicket/${id}` : `/getTicket`);
};

const createTicket: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createTicket`, "POST", typeof data === "object" ? data : { value: data });
};

const updateTicket: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("freshdesk.updateTicket requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateTicket/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteTicket: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("freshdesk.deleteTicket requires an ID.");
  return apiCall(`/deleteTicket/${id}`, "DELETE");
};

const listTicketConversations: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTicketConversations/${id}` : `/listTicketConversations`);
};

const replyToTicket: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/replyToTicket`, "POST", typeof data === "object" ? data : { value: data });
};

const addNoteToTicket: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addNoteToTicket`, "POST", typeof data === "object" ? data : { value: data });
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
  if (!id) throw new Error("freshdesk.updateContact requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateContact/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteContact: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("freshdesk.deleteContact requires an ID.");
  return apiCall(`/deleteContact/${id}`, "DELETE");
};

const listAgents: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listAgents/${id}` : `/listAgents`);
};

const getAgent: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getAgent/${id}` : `/getAgent`);
};

const listGroups: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listGroups/${id}` : `/listGroups`);
};

const listCompanies: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCompanies/${id}` : `/listCompanies`);
};

const createCompany: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createCompany`, "POST", typeof data === "object" ? data : { value: data });
};

const searchTickets: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchTickets/${id}` : `/searchTickets`);
};

const filterTickets: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/filterTickets${id ? `/${id}` : ""}`);
};

export const FreshdeskFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listTickets, getTicket, createTicket, updateTicket, deleteTicket, listTicketConversations, replyToTicket, addNoteToTicket, listContacts, getContact, createContact, updateContact, deleteContact, listAgents, getAgent, listGroups, listCompanies, createCompany, searchTickets, filterTickets,
};

export const FreshdeskFunctionMetadata = {
  setCredentials: { description: "Configure freshdesk credentials.", parameters: [{ name: "domain", dataType: "string", description: "domain", formInputType: "text", required: true }, { name: "apiKey", dataType: "string", description: "apiKey", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listTickets: { description: "listTickets", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTicket: { description: "getTicket", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTicket: { description: "createTicket", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateTicket: { description: "updateTicket", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteTicket: { description: "deleteTicket", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTicketConversations: { description: "listTicketConversations", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  replyToTicket: { description: "replyToTicket", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addNoteToTicket: { description: "addNoteToTicket", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listContacts: { description: "listContacts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getContact: { description: "getContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createContact: { description: "createContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateContact: { description: "updateContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteContact: { description: "deleteContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listAgents: { description: "listAgents", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getAgent: { description: "getAgent", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listGroups: { description: "listGroups", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCompanies: { description: "listCompanies", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createCompany: { description: "createCompany", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchTickets: { description: "searchTickets", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  filterTickets: { description: "filterTickets", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const FreshdeskModuleMetadata = {
  description: "Freshdesk — tickets, contacts, agents, companies, and knowledge base.",
  methods: Object.keys(FreshdeskFunctions),
  category: "support",
};
