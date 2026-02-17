import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Box: "${key}" not configured. Call box.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.box.com/2.0${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Box API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("box.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Box credentials configured.";
};

const listFolderItems: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listFolderItems/${id}` : `/listFolderItems`);
};

const getFolderInfo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getFolderInfo/${id}` : `/getFolderInfo`);
};

const createFolder: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createFolder`, "POST", typeof data === "object" ? data : { value: data });
};

const deleteFolder: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("box.deleteFolder requires an ID.");
  return apiCall(`/deleteFolder/${id}`, "DELETE");
};

const getFileInfo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getFileInfo/${id}` : `/getFileInfo`);
};

const downloadFile: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/downloadFile/${id}` : `/downloadFile`);
};

const deleteFile: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("box.deleteFile requires an ID.");
  return apiCall(`/deleteFile/${id}`, "DELETE");
};

const copyFile: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("box.copyFile requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/copyFile/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const moveFile: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("box.moveFile requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/moveFile/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const uploadFile: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/uploadFile`, "POST", typeof data === "object" ? data : { value: data });
};

const searchContent: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchContent/${id}` : `/searchContent`);
};

const createSharedLink: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createSharedLink`, "POST", typeof data === "object" ? data : { value: data });
};

const getSharedLink: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSharedLink/${id}` : `/getSharedLink`);
};

const listCollaborations: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCollaborations/${id}` : `/listCollaborations`);
};

const addCollaboration: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addCollaboration`, "POST", typeof data === "object" ? data : { value: data });
};

const getUser: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUser/${id}` : `/getUser`);
};

const updateFileInfo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("box.updateFileInfo requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateFileInfo/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const lockFile: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("box.lockFile requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/lockFile/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

export const BoxFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listFolderItems, getFolderInfo, createFolder, deleteFolder, getFileInfo, downloadFile, deleteFile, copyFile, moveFile, uploadFile, searchContent, createSharedLink, getSharedLink, listCollaborations, addCollaboration, getUser, updateFileInfo, lockFile,
};

export const BoxFunctionMetadata = {
  setCredentials: { description: "Configure box credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listFolderItems: { description: "listFolderItems", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getFolderInfo: { description: "getFolderInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createFolder: { description: "createFolder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteFolder: { description: "deleteFolder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getFileInfo: { description: "getFileInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  downloadFile: { description: "downloadFile", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteFile: { description: "deleteFile", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  copyFile: { description: "copyFile", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  moveFile: { description: "moveFile", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  uploadFile: { description: "uploadFile", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchContent: { description: "searchContent", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createSharedLink: { description: "createSharedLink", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSharedLink: { description: "getSharedLink", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCollaborations: { description: "listCollaborations", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addCollaboration: { description: "addCollaboration", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUser: { description: "getUser", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateFileInfo: { description: "updateFileInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  lockFile: { description: "lockFile", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const BoxModuleMetadata = {
  description: "Box — files, folders, collaborations, metadata, and retention.",
  methods: Object.keys(BoxFunctions),
  category: "storage",
};
