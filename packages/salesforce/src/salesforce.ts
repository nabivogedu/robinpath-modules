import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Salesforce: "${key}" not configured. Call salesforce.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`${getConfig("instanceUrl")}/services/data/v59.0${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Salesforce API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const instanceUrl = args[0] as string;
  const accessToken = args[1] as string;
  if (!instanceUrl || !accessToken) throw new Error("salesforce.setCredentials requires instanceUrl, accessToken.");
  config.set("instanceUrl", instanceUrl);
  config.set("accessToken", accessToken);
  return "Salesforce credentials configured.";
};

const query: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/query/${id}` : `/query`);
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
  if (!id) throw new Error("salesforce.updateRecord requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateRecord/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteRecord: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("salesforce.deleteRecord requires an ID.");
  return apiCall(`/deleteRecord/${id}`, "DELETE");
};

const upsertRecord: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/upsertRecord`, "POST", typeof data === "object" ? data : { value: data });
};

const describeObject: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/describeObject/${id}` : `/describeObject`);
};

const listObjects: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listObjects/${id}` : `/listObjects`);
};

const search: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/search/${id}` : `/search`);
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

const createOpportunity: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createOpportunity`, "POST", typeof data === "object" ? data : { value: data });
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

const createCase: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createCase`, "POST", typeof data === "object" ? data : { value: data });
};

const getReport: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getReport/${id}` : `/getReport`);
};

const listReports: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listReports/${id}` : `/listReports`);
};

const bulkQuery: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/bulkQuery${id ? `/${id}` : ""}`);
};

const getUser: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUser/${id}` : `/getUser`);
};

const listUsers: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listUsers/${id}` : `/listUsers`);
};

const getOrganization: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getOrganization/${id}` : `/getOrganization`);
};

const runApex: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/runApex/${id}` : `/runApex`);
};

const getRecentRecords: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getRecentRecords/${id}` : `/getRecentRecords`);
};

const searchRecords: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchRecords/${id}` : `/searchRecords`);
};

export const SalesforceFunctions: Record<string, BuiltinHandler> = {
  setCredentials, query, getRecord, createRecord, updateRecord, deleteRecord, upsertRecord, describeObject, listObjects, search, createLead, createContact, createOpportunity, createAccount, createTask, createCase, getReport, listReports, bulkQuery, getUser, listUsers, getOrganization, runApex, getRecentRecords, searchRecords,
};

export const SalesforceFunctionMetadata = {
  setCredentials: { description: "Configure salesforce credentials.", parameters: [{ name: "instanceUrl", dataType: "string", description: "instanceUrl", formInputType: "text", required: true }, { name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  query: { description: "query", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getRecord: { description: "getRecord", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createRecord: { description: "createRecord", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateRecord: { description: "updateRecord", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteRecord: { description: "deleteRecord", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  upsertRecord: { description: "upsertRecord", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  describeObject: { description: "describeObject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listObjects: { description: "listObjects", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  search: { description: "search", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createLead: { description: "createLead", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createContact: { description: "createContact", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createOpportunity: { description: "createOpportunity", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createAccount: { description: "createAccount", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTask: { description: "createTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createCase: { description: "createCase", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getReport: { description: "getReport", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listReports: { description: "listReports", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  bulkQuery: { description: "bulkQuery", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUser: { description: "getUser", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listUsers: { description: "listUsers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getOrganization: { description: "getOrganization", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  runApex: { description: "runApex", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getRecentRecords: { description: "getRecentRecords", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchRecords: { description: "searchRecords", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const SalesforceModuleMetadata = {
  description: "Salesforce CRM — leads, contacts, opportunities, accounts, reports, and SOQL queries.",
  methods: Object.keys(SalesforceFunctions),
  category: "crm",
};
