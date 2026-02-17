import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Freshbooks: "${key}" not configured. Call freshbooks.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.freshbooks.com${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Freshbooks API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  const accountId = args[1] as string;
  if (!accessToken || !accountId) throw new Error("freshbooks.setCredentials requires accessToken, accountId.");
  config.set("accessToken", accessToken);
  config.set("accountId", accountId);
  return "Freshbooks credentials configured.";
};

const listClients: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listClients/${id}` : `/listClients`);
};

const getClient: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getClient/${id}` : `/getClient`);
};

const createClient: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createClient`, "POST", typeof data === "object" ? data : { value: data });
};

const updateClient: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("freshbooks.updateClient requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateClient/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listInvoices: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listInvoices/${id}` : `/listInvoices`);
};

const getInvoice: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getInvoice/${id}` : `/getInvoice`);
};

const createInvoice: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createInvoice`, "POST", typeof data === "object" ? data : { value: data });
};

const updateInvoice: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("freshbooks.updateInvoice requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateInvoice/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const sendInvoice: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendInvoice`, "POST", typeof data === "object" ? data : { value: data });
};

const listExpenses: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listExpenses/${id}` : `/listExpenses`);
};

const getExpense: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getExpense/${id}` : `/getExpense`);
};

const createExpense: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createExpense`, "POST", typeof data === "object" ? data : { value: data });
};

const listTimeEntries: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTimeEntries/${id}` : `/listTimeEntries`);
};

const createTimeEntry: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createTimeEntry`, "POST", typeof data === "object" ? data : { value: data });
};

const listPayments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPayments/${id}` : `/listPayments`);
};

const createPayment: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createPayment`, "POST", typeof data === "object" ? data : { value: data });
};

const getUser: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUser/${id}` : `/getUser`);
};

const getAccount: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getAccount/${id}` : `/getAccount`);
};

export const FreshbooksFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listClients, getClient, createClient, updateClient, listInvoices, getInvoice, createInvoice, updateInvoice, sendInvoice, listExpenses, getExpense, createExpense, listTimeEntries, createTimeEntry, listPayments, createPayment, getUser, getAccount,
};

export const FreshbooksFunctionMetadata = {
  setCredentials: { description: "Configure freshbooks credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }, { name: "accountId", dataType: "string", description: "accountId", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listClients: { description: "listClients", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getClient: { description: "getClient", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createClient: { description: "createClient", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateClient: { description: "updateClient", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listInvoices: { description: "listInvoices", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getInvoice: { description: "getInvoice", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createInvoice: { description: "createInvoice", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateInvoice: { description: "updateInvoice", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendInvoice: { description: "sendInvoice", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listExpenses: { description: "listExpenses", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getExpense: { description: "getExpense", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createExpense: { description: "createExpense", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTimeEntries: { description: "listTimeEntries", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTimeEntry: { description: "createTimeEntry", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPayments: { description: "listPayments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createPayment: { description: "createPayment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUser: { description: "getUser", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getAccount: { description: "getAccount", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const FreshbooksModuleMetadata = {
  description: "FreshBooks — invoices, clients, expenses, time entries, and payments.",
  methods: Object.keys(FreshbooksFunctions),
  category: "accounting",
};
