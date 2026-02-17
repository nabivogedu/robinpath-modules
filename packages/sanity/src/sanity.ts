import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Sanity: "${key}" not configured. Call sanity.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://${getConfig("projectId")}.api.sanity.io/v2023-08-01${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("dataset")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Sanity API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const projectId = args[0] as string;
  const dataset = args[1] as string;
  const token = args[2] as string;
  if (!projectId || !dataset || !token) throw new Error("sanity.setCredentials requires projectId, dataset, token.");
  config.set("projectId", projectId);
  config.set("dataset", dataset);
  config.set("token", token);
  return "Sanity credentials configured.";
};

const query: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/query/${id}` : `/query`);
};

const getDocument: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getDocument/${id}` : `/getDocument`);
};

const createDocument: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createDocument`, "POST", typeof data === "object" ? data : { value: data });
};

const createOrReplace: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createOrReplace`, "POST", typeof data === "object" ? data : { value: data });
};

const patch: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("sanity.patch requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/patch/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteDocument: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("sanity.deleteDocument requires an ID.");
  return apiCall(`/deleteDocument/${id}`, "DELETE");
};

const uploadAsset: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/uploadAsset`, "POST", typeof data === "object" ? data : { value: data });
};

const getAsset: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getAsset/${id}` : `/getAsset`);
};

const listDatasets: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listDatasets/${id}` : `/listDatasets`);
};

const createDataset: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createDataset`, "POST", typeof data === "object" ? data : { value: data });
};

const deleteDataset: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("sanity.deleteDataset requires an ID.");
  return apiCall(`/deleteDataset/${id}`, "DELETE");
};

const mutate: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/mutate${id ? `/${id}` : ""}`);
};

const listDocumentsByType: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listDocumentsByType/${id}` : `/listDocumentsByType`);
};

const getProject: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getProject/${id}` : `/getProject`);
};

const exportDataset: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/exportDataset/${id}` : `/exportDataset`);
};

const importDataset: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/importDataset`, "POST", typeof data === "object" ? data : { value: data });
};

export const SanityFunctions: Record<string, BuiltinHandler> = {
  setCredentials, query, getDocument, createDocument, createOrReplace, patch, deleteDocument, uploadAsset, getAsset, listDatasets, createDataset, deleteDataset, mutate, listDocumentsByType, getProject, exportDataset, importDataset,
};

export const SanityFunctionMetadata = {
  setCredentials: { description: "Configure sanity credentials.", parameters: [{ name: "projectId", dataType: "string", description: "projectId", formInputType: "text", required: true }, { name: "dataset", dataType: "string", description: "dataset", formInputType: "text", required: true }, { name: "token", dataType: "string", description: "token", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  query: { description: "query", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getDocument: { description: "getDocument", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createDocument: { description: "createDocument", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createOrReplace: { description: "createOrReplace", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  patch: { description: "patch", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteDocument: { description: "deleteDocument", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  uploadAsset: { description: "uploadAsset", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getAsset: { description: "getAsset", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listDatasets: { description: "listDatasets", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createDataset: { description: "createDataset", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteDataset: { description: "deleteDataset", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  mutate: { description: "mutate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listDocumentsByType: { description: "listDocumentsByType", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getProject: { description: "getProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  exportDataset: { description: "exportDataset", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  importDataset: { description: "importDataset", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const SanityModuleMetadata = {
  description: "Sanity — documents, datasets, assets, and GROQ queries.",
  methods: Object.keys(SanityFunctions),
  category: "cms",
};
