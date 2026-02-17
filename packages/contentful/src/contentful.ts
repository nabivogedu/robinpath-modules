import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Contentful: "${key}" not configured. Call contentful.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.contentful.com${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Contentful API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  const spaceId = args[1] as string;
  if (!accessToken || !spaceId) throw new Error("contentful.setCredentials requires accessToken, spaceId.");
  config.set("accessToken", accessToken);
  config.set("spaceId", spaceId);
  return "Contentful credentials configured.";
};

const listEntries: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listEntries/${id}` : `/listEntries`);
};

const getEntry: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getEntry/${id}` : `/getEntry`);
};

const createEntry: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createEntry`, "POST", typeof data === "object" ? data : { value: data });
};

const updateEntry: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("contentful.updateEntry requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateEntry/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteEntry: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("contentful.deleteEntry requires an ID.");
  return apiCall(`/deleteEntry/${id}`, "DELETE");
};

const publishEntry: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("contentful.publishEntry requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/publishEntry/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const unpublishEntry: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("contentful.unpublishEntry requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/unpublishEntry/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listAssets: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listAssets/${id}` : `/listAssets`);
};

const getAsset: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getAsset/${id}` : `/getAsset`);
};

const createAsset: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createAsset`, "POST", typeof data === "object" ? data : { value: data });
};

const publishAsset: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("contentful.publishAsset requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/publishAsset/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listContentTypes: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listContentTypes/${id}` : `/listContentTypes`);
};

const getContentType: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getContentType/${id}` : `/getContentType`);
};

const createContentType: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createContentType`, "POST", typeof data === "object" ? data : { value: data });
};

const listEnvironments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listEnvironments/${id}` : `/listEnvironments`);
};

const getSpace: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSpace/${id}` : `/getSpace`);
};

const searchEntries: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchEntries/${id}` : `/searchEntries`);
};

const listLocales: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listLocales/${id}` : `/listLocales`);
};

const getWebhooks: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getWebhooks/${id}` : `/getWebhooks`);
};

const archiveEntry: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("contentful.archiveEntry requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/archiveEntry/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

export const ContentfulFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listEntries, getEntry, createEntry, updateEntry, deleteEntry, publishEntry, unpublishEntry, listAssets, getAsset, createAsset, publishAsset, listContentTypes, getContentType, createContentType, listEnvironments, getSpace, searchEntries, listLocales, getWebhooks, archiveEntry,
};

export const ContentfulFunctionMetadata = {
  setCredentials: { description: "Configure contentful credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }, { name: "spaceId", dataType: "string", description: "spaceId", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listEntries: { description: "listEntries", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getEntry: { description: "getEntry", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createEntry: { description: "createEntry", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateEntry: { description: "updateEntry", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteEntry: { description: "deleteEntry", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  publishEntry: { description: "publishEntry", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  unpublishEntry: { description: "unpublishEntry", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listAssets: { description: "listAssets", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getAsset: { description: "getAsset", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createAsset: { description: "createAsset", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  publishAsset: { description: "publishAsset", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listContentTypes: { description: "listContentTypes", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getContentType: { description: "getContentType", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createContentType: { description: "createContentType", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listEnvironments: { description: "listEnvironments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSpace: { description: "getSpace", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchEntries: { description: "searchEntries", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listLocales: { description: "listLocales", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getWebhooks: { description: "getWebhooks", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  archiveEntry: { description: "archiveEntry", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const ContentfulModuleMetadata = {
  description: "Contentful — entries, assets, content types, spaces, and environments.",
  methods: Object.keys(ContentfulFunctions),
  category: "cms",
};
