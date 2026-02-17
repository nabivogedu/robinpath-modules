import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Quickbooks: "${key}" not configured. Call quickbooks.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://quickbooks.api.intuit.com/v3/company${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Quickbooks API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const realmId = args[0] as string;
  const accessToken = args[1] as string;
  if (!realmId || !accessToken) throw new Error("quickbooks.setCredentials requires realmId, accessToken.");
  config.set("realmId", realmId);
  config.set("accessToken", accessToken);
  return "Quickbooks credentials configured.";
};

const query: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/query/${id}` : `/query`);
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

const sendInvoice: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendInvoice`, "POST", typeof data === "object" ? data : { value: data });
};

const voidInvoice: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("quickbooks.voidInvoice requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/voidInvoice/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const getCustomer: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCustomer/${id}` : `/getCustomer`);
};

const createCustomer: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createCustomer`, "POST", typeof data === "object" ? data : { value: data });
};

const updateCustomer: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("quickbooks.updateCustomer requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateCustomer/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listCustomers: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCustomers/${id}` : `/listCustomers`);
};

const getPayment: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPayment/${id}` : `/getPayment`);
};

const createPayment: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createPayment`, "POST", typeof data === "object" ? data : { value: data });
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

const getItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getItem/${id}` : `/getItem`);
};

const createItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createItem`, "POST", typeof data === "object" ? data : { value: data });
};

const listItems: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listItems/${id}` : `/listItems`);
};

const getCompanyInfo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCompanyInfo/${id}` : `/getCompanyInfo`);
};

const getReport: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getReport/${id}` : `/getReport`);
};

const listAccounts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listAccounts/${id}` : `/listAccounts`);
};

const createBill: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createBill`, "POST", typeof data === "object" ? data : { value: data });
};

export const QuickbooksFunctions: Record<string, BuiltinHandler> = {
  setCredentials, query, getInvoice, createInvoice, sendInvoice, voidInvoice, getCustomer, createCustomer, updateCustomer, listCustomers, getPayment, createPayment, getExpense, createExpense, getItem, createItem, listItems, getCompanyInfo, getReport, listAccounts, createBill,
};

export const QuickbooksFunctionMetadata = {
  setCredentials: { description: "Configure quickbooks credentials.", parameters: [{ name: "realmId", dataType: "string", description: "realmId", formInputType: "text", required: true }, { name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  query: { description: "query", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getInvoice: { description: "getInvoice", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createInvoice: { description: "createInvoice", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendInvoice: { description: "sendInvoice", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  voidInvoice: { description: "voidInvoice", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCustomer: { description: "getCustomer", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createCustomer: { description: "createCustomer", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateCustomer: { description: "updateCustomer", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCustomers: { description: "listCustomers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPayment: { description: "getPayment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createPayment: { description: "createPayment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getExpense: { description: "getExpense", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createExpense: { description: "createExpense", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getItem: { description: "getItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createItem: { description: "createItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listItems: { description: "listItems", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCompanyInfo: { description: "getCompanyInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getReport: { description: "getReport", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listAccounts: { description: "listAccounts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createBill: { description: "createBill", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const QuickbooksModuleMetadata = {
  description: "QuickBooks Online — invoices, customers, expenses, payments, and reports.",
  methods: Object.keys(QuickbooksFunctions),
  category: "accounting",
};
