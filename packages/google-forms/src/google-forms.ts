import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`GoogleForms: "${key}" not configured. Call google-forms.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://forms.googleapis.com/v1/forms${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`GoogleForms API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("google-forms.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "GoogleForms credentials configured.";
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
  if (!id) throw new Error("google-forms.updateForm requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateForm/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listResponses: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listResponses/${id}` : `/listResponses`);
};

const getResponse: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getResponse/${id}` : `/getResponse`);
};

const addQuestion: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addQuestion`, "POST", typeof data === "object" ? data : { value: data });
};

const updateQuestion: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("google-forms.updateQuestion requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateQuestion/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteQuestion: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("google-forms.deleteQuestion requires an ID.");
  return apiCall(`/deleteQuestion/${id}`, "DELETE");
};

const addSection: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addSection`, "POST", typeof data === "object" ? data : { value: data });
};

const getFormInfo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getFormInfo/${id}` : `/getFormInfo`);
};

const batchUpdate: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/batchUpdate/${id}` : `/batchUpdate`);
};

const convertToQuiz: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/convertToQuiz`, "POST", typeof data === "object" ? data : { value: data });
};

export const GoogleFormsFunctions: Record<string, BuiltinHandler> = {
  setCredentials, getForm, createForm, updateForm, listResponses, getResponse, addQuestion, updateQuestion, deleteQuestion, addSection, getFormInfo, batchUpdate, convertToQuiz,
};

export const GoogleFormsFunctionMetadata = {
  setCredentials: { description: "Configure google-forms credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  getForm: { description: "getForm", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createForm: { description: "createForm", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateForm: { description: "updateForm", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listResponses: { description: "listResponses", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getResponse: { description: "getResponse", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addQuestion: { description: "addQuestion", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateQuestion: { description: "updateQuestion", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteQuestion: { description: "deleteQuestion", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addSection: { description: "addSection", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getFormInfo: { description: "getFormInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  batchUpdate: { description: "batchUpdate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  convertToQuiz: { description: "convertToQuiz", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const GoogleFormsModuleMetadata = {
  description: "Google Forms — create forms, manage questions, and read responses.",
  methods: Object.keys(GoogleFormsFunctions),
  category: "forms",
};
