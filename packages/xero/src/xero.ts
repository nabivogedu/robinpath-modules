import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Xero: "${key}" not configured. Call xero.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.xero.com/api.xro/2.0${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Xero API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  const tenantId = args[1] as string;
  if (!accessToken || !tenantId) throw new Error("xero.setCredentials requires accessToken, tenantId.");
  config.set("accessToken", accessToken);
  config.set("tenantId", tenantId);
  return "Xero credentials configured.";
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
  if (!id) throw new Error("xero.updateInvoice requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateInvoice/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const sendInvoice: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendInvoice`, "POST", typeof data === "object" ? data : { value: data });
};

const voidInvoice: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("xero.voidInvoice requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/voidInvoice/${id}`, "PUT", typeof data === "object" ? data : { value: data });
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
  if (!id) throw new Error("xero.updateContact requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateContact/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listAccounts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listAccounts/${id}` : `/listAccounts`);
};

const getAccount: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getAccount/${id}` : `/getAccount`);
};

const listBankTransactions: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listBankTransactions/${id}` : `/listBankTransactions`);
};

const createBankTransaction: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createBankTransaction`, "POST", typeof data === "object" ? data : { value: data });
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

const listItems: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listItems/${id}` : `/listItems`);
};

const createItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createItem`, "POST", typeof data === "object" ? data : { value: data });
};

const getOrganization: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getOrganization/${id}` : `/getOrganization`);
};

const getReport: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getReport/${id}` : `/getReport`);
};

export const XeroFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listInvoices, getInvoice, createInvoice, updateInvoice, sendInvoice, voidInvoice, listContacts, getContact, createContact, updateContact, listAccounts, getAccount, listBankTransactions, createBankTransaction, listPayments, createPayment, listItems, createItem, getOrganization, getReport,
};

export const XeroFunctionMetadata = {
  setCredentials: { description: "Configure xero credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }, { name: "tenantId", dataType: "string", description: "tenantId", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listInvoices: { description: "listInvoices", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getInvoice: { description: "getInvoice", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createInvoice: { description: "createInvoice", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateInvoice: { description: "updateInvoice", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendInvoice: { description: "sendInvoice", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  voidInvoice: { description: "voidInvoice", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listContacts: { description: "listContacts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getContact: { description: "getContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createContact: { description: "createContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateContact: { description: "updateContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listAccounts: { description: "listAccounts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getAccount: { description: "getAccount", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listBankTransactions: { description: "listBankTransactions", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createBankTransaction: { description: "createBankTransaction", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPayments: { description: "listPayments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createPayment: { description: "createPayment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listItems: { description: "listItems", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createItem: { description: "createItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getOrganization: { description: "getOrganization", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getReport: { description: "getReport", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const XeroModuleMetadata = {
  description: "Xero — invoices, contacts, bank transactions, bills, and payroll.",
  methods: Object.keys(XeroFunctions),
  category: "accounting",
};
