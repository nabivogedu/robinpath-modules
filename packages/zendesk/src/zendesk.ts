import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Zendesk: "${key}" not configured. Call zendesk.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://${getConfig("subdomain")}.zendesk.com/api/v2${path}`, {
    method,
    headers: { "Authorization": "Basic " + btoa(`${getConfig("subdomain")}:${getConfig("email")}`), "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Zendesk API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const subdomain = args[0] as string;
  const email = args[1] as string;
  const apiToken = args[2] as string;
  if (!subdomain || !email || !apiToken) throw new Error("zendesk.setCredentials requires subdomain, email, apiToken.");
  config.set("subdomain", subdomain);
  config.set("email", email);
  config.set("apiToken", apiToken);
  return "Zendesk credentials configured.";
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
  if (!id) throw new Error("zendesk.updateTicket requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateTicket/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteTicket: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("zendesk.deleteTicket requires an ID.");
  return apiCall(`/deleteTicket/${id}`, "DELETE");
};

const listTicketComments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTicketComments/${id}` : `/listTicketComments`);
};

const addTicketComment: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addTicketComment`, "POST", typeof data === "object" ? data : { value: data });
};

const listUsers: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listUsers/${id}` : `/listUsers`);
};

const getUser: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUser/${id}` : `/getUser`);
};

const createUser: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createUser`, "POST", typeof data === "object" ? data : { value: data });
};

const updateUser: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("zendesk.updateUser requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateUser/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const searchTickets: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchTickets/${id}` : `/searchTickets`);
};

const listOrganizations: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listOrganizations/${id}` : `/listOrganizations`);
};

const getOrganization: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getOrganization/${id}` : `/getOrganization`);
};

const createOrganization: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createOrganization`, "POST", typeof data === "object" ? data : { value: data });
};

const listGroups: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listGroups/${id}` : `/listGroups`);
};

const assignTicket: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/assignTicket`, "POST", typeof data === "object" ? data : { value: data });
};

const listViews: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listViews/${id}` : `/listViews`);
};

const listMacros: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listMacros/${id}` : `/listMacros`);
};

const getSatisfactionRatings: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSatisfactionRatings/${id}` : `/getSatisfactionRatings`);
};

const getTicketMetrics: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getTicketMetrics/${id}` : `/getTicketMetrics`);
};

const mergeTickets: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("zendesk.mergeTickets requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/mergeTickets/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

export const ZendeskFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listTickets, getTicket, createTicket, updateTicket, deleteTicket, listTicketComments, addTicketComment, listUsers, getUser, createUser, updateUser, searchTickets, listOrganizations, getOrganization, createOrganization, listGroups, assignTicket, listViews, listMacros, getSatisfactionRatings, getTicketMetrics, mergeTickets,
};

export const ZendeskFunctionMetadata = {
  setCredentials: { description: "Configure zendesk credentials.", parameters: [{ name: "subdomain", dataType: "string", description: "subdomain", formInputType: "text", required: true }, { name: "email", dataType: "string", description: "email", formInputType: "text", required: true }, { name: "apiToken", dataType: "string", description: "apiToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listTickets: { description: "listTickets", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTicket: { description: "getTicket", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTicket: { description: "createTicket", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateTicket: { description: "updateTicket", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteTicket: { description: "deleteTicket", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTicketComments: { description: "listTicketComments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addTicketComment: { description: "addTicketComment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listUsers: { description: "listUsers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUser: { description: "getUser", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createUser: { description: "createUser", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateUser: { description: "updateUser", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchTickets: { description: "searchTickets", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listOrganizations: { description: "listOrganizations", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getOrganization: { description: "getOrganization", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createOrganization: { description: "createOrganization", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listGroups: { description: "listGroups", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  assignTicket: { description: "assignTicket", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listViews: { description: "listViews", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listMacros: { description: "listMacros", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSatisfactionRatings: { description: "getSatisfactionRatings", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTicketMetrics: { description: "getTicketMetrics", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  mergeTickets: { description: "mergeTickets", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const ZendeskModuleMetadata = {
  description: "Zendesk — support tickets, users, organizations, groups, and satisfaction ratings.",
  methods: Object.keys(ZendeskFunctions),
  category: "support",
};
