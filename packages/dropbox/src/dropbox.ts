import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Dropbox: "${key}" not configured. Call dropbox.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.dropboxapi.com/2${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Dropbox API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("dropbox.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Dropbox credentials configured.";
};

const listFolder: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listFolder/${id}` : `/listFolder`);
};

const getMetadata: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getMetadata/${id}` : `/getMetadata`);
};

const createFolder: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createFolder`, "POST", typeof data === "object" ? data : { value: data });
};

const deleteEntry: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("dropbox.deleteEntry requires an ID.");
  return apiCall(`/deleteEntry/${id}`, "DELETE");
};

const moveEntry: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("dropbox.moveEntry requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/moveEntry/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const copyEntry: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("dropbox.copyEntry requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/copyEntry/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const uploadFile: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/uploadFile`, "POST", typeof data === "object" ? data : { value: data });
};

const downloadFile: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/downloadFile/${id}` : `/downloadFile`);
};

const getTemporaryLink: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getTemporaryLink/${id}` : `/getTemporaryLink`);
};

const searchFiles: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchFiles/${id}` : `/searchFiles`);
};

const listRevisions: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listRevisions/${id}` : `/listRevisions`);
};

const restoreFile: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("dropbox.restoreFile requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/restoreFile/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const createSharedLink: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createSharedLink`, "POST", typeof data === "object" ? data : { value: data });
};

const listSharedLinks: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSharedLinks/${id}` : `/listSharedLinks`);
};

const revokeSharedLink: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("dropbox.revokeSharedLink requires an ID.");
  return apiCall(`/revokeSharedLink/${id}`, "DELETE");
};

const getSpaceUsage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSpaceUsage/${id}` : `/getSpaceUsage`);
};

const getCurrentAccount: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCurrentAccount/${id}` : `/getCurrentAccount`);
};

const getPreview: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPreview/${id}` : `/getPreview`);
};

export const DropboxFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listFolder, getMetadata, createFolder, deleteEntry, moveEntry, copyEntry, uploadFile, downloadFile, getTemporaryLink, searchFiles, listRevisions, restoreFile, createSharedLink, listSharedLinks, revokeSharedLink, getSpaceUsage, getCurrentAccount, getPreview,
};

export const DropboxFunctionMetadata = {
  setCredentials: { description: "Configure dropbox credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listFolder: { description: "listFolder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getMetadata: { description: "getMetadata", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createFolder: { description: "createFolder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteEntry: { description: "deleteEntry", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  moveEntry: { description: "moveEntry", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  copyEntry: { description: "copyEntry", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  uploadFile: { description: "uploadFile", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  downloadFile: { description: "downloadFile", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTemporaryLink: { description: "getTemporaryLink", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchFiles: { description: "searchFiles", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listRevisions: { description: "listRevisions", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  restoreFile: { description: "restoreFile", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createSharedLink: { description: "createSharedLink", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listSharedLinks: { description: "listSharedLinks", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  revokeSharedLink: { description: "revokeSharedLink", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSpaceUsage: { description: "getSpaceUsage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCurrentAccount: { description: "getCurrentAccount", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPreview: { description: "getPreview", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const DropboxModuleMetadata = {
  description: "Dropbox — files, folders, sharing, search, paper docs, and revisions.",
  methods: Object.keys(DropboxFunctions),
  category: "storage",
};
