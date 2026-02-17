import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Jotform: "${key}" not configured. Call jotform.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.jotform.com${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("apiKey")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Jotform API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const apiKey = args[0] as string;
  if (!apiKey) throw new Error("jotform.setCredentials requires apiKey.");
  config.set("apiKey", apiKey);
  return "Jotform credentials configured.";
};

const listForms: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listForms/${id}` : `/listForms`);
};

const getForm: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getForm/${id}` : `/getForm`);
};

const getFormQuestions: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getFormQuestions/${id}` : `/getFormQuestions`);
};

const listSubmissions: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSubmissions/${id}` : `/listSubmissions`);
};

const getSubmission: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSubmission/${id}` : `/getSubmission`);
};

const createSubmission: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createSubmission`, "POST", typeof data === "object" ? data : { value: data });
};

const deleteSubmission: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("jotform.deleteSubmission requires an ID.");
  return apiCall(`/deleteSubmission/${id}`, "DELETE");
};

const getFormReports: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getFormReports/${id}` : `/getFormReports`);
};

const getFormFiles: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getFormFiles/${id}` : `/getFormFiles`);
};

const listFolders: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listFolders/${id}` : `/listFolders`);
};

const getUser: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUser/${id}` : `/getUser`);
};

const getUsage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUsage/${id}` : `/getUsage`);
};

const getFormWebhooks: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getFormWebhooks/${id}` : `/getFormWebhooks`);
};

const createFormWebhook: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createFormWebhook`, "POST", typeof data === "object" ? data : { value: data });
};

export const JotformFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listForms, getForm, getFormQuestions, listSubmissions, getSubmission, createSubmission, deleteSubmission, getFormReports, getFormFiles, listFolders, getUser, getUsage, getFormWebhooks, createFormWebhook,
};

export const JotformFunctionMetadata = {
  setCredentials: { description: "Configure jotform credentials.", parameters: [{ name: "apiKey", dataType: "string", description: "apiKey", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listForms: { description: "listForms", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getForm: { description: "getForm", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getFormQuestions: { description: "getFormQuestions", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listSubmissions: { description: "listSubmissions", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSubmission: { description: "getSubmission", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createSubmission: { description: "createSubmission", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteSubmission: { description: "deleteSubmission", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getFormReports: { description: "getFormReports", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getFormFiles: { description: "getFormFiles", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listFolders: { description: "listFolders", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUser: { description: "getUser", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUsage: { description: "getUsage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getFormWebhooks: { description: "getFormWebhooks", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createFormWebhook: { description: "createFormWebhook", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const JotformModuleMetadata = {
  description: "JotForm — forms, submissions, reports, folders, and webhooks.",
  methods: Object.keys(JotformFunctions),
  category: "forms",
};
