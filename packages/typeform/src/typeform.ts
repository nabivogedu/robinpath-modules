import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Typeform: "${key}" not configured. Call typeform.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.typeform.com${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Typeform API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("typeform.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Typeform credentials configured.";
};

const listForms: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listForms/${id}` : `/listForms`);
};

const getForm: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getForm/${id}` : `/getForm`);
};

const createForm: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createForm`, "POST", typeof data === "object" ? data : { value: data });
};

const updateForm: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("typeform.updateForm requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateForm/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteForm: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("typeform.deleteForm requires an ID.");
  return apiCall(`/deleteForm/${id}`, "DELETE");
};

const listResponses: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listResponses/${id}` : `/listResponses`);
};

const getResponse: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getResponse/${id}` : `/getResponse`);
};

const deleteResponse: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("typeform.deleteResponse requires an ID.");
  return apiCall(`/deleteResponse/${id}`, "DELETE");
};

const listWorkspaces: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listWorkspaces/${id}` : `/listWorkspaces`);
};

const getWorkspace: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getWorkspace/${id}` : `/getWorkspace`);
};

const createWorkspace: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createWorkspace`, "POST", typeof data === "object" ? data : { value: data });
};

const listThemes: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listThemes/${id}` : `/listThemes`);
};

const getInsights: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getInsights/${id}` : `/getInsights`);
};

const getFormAnalytics: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getFormAnalytics/${id}` : `/getFormAnalytics`);
};

export const TypeformFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listForms, getForm, createForm, updateForm, deleteForm, listResponses, getResponse, deleteResponse, listWorkspaces, getWorkspace, createWorkspace, listThemes, getInsights, getFormAnalytics,
};

export const TypeformFunctionMetadata = {
  setCredentials: { description: "Configure typeform credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listForms: { description: "listForms", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getForm: { description: "getForm", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createForm: { description: "createForm", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateForm: { description: "updateForm", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteForm: { description: "deleteForm", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listResponses: { description: "listResponses", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getResponse: { description: "getResponse", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteResponse: { description: "deleteResponse", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listWorkspaces: { description: "listWorkspaces", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getWorkspace: { description: "getWorkspace", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createWorkspace: { description: "createWorkspace", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listThemes: { description: "listThemes", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getInsights: { description: "getInsights", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getFormAnalytics: { description: "getFormAnalytics", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const TypeformModuleMetadata = {
  description: "Typeform — forms, responses, workspaces, themes, and logic jumps.",
  methods: Object.keys(TypeformFunctions),
  category: "forms",
};
