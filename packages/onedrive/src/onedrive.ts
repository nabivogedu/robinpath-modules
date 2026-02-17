import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Onedrive: "${key}" not configured. Call onedrive.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://graph.microsoft.com/v1.0/me/drive${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Onedrive API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("onedrive.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Onedrive credentials configured.";
};

const listChildren: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listChildren/${id}` : `/listChildren`);
};

const getItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getItem/${id}` : `/getItem`);
};

const getItemByPath: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getItemByPath/${id}` : `/getItemByPath`);
};

const createFolder: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createFolder`, "POST", typeof data === "object" ? data : { value: data });
};

const deleteItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("onedrive.deleteItem requires an ID.");
  return apiCall(`/deleteItem/${id}`, "DELETE");
};

const moveItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("onedrive.moveItem requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/moveItem/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const copyItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("onedrive.copyItem requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/copyItem/${id}`, "PUT", typeof data === "object" ? data : { value: data });
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

const searchFiles: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchFiles/${id}` : `/searchFiles`);
};

const createSharingLink: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createSharingLink`, "POST", typeof data === "object" ? data : { value: data });
};

const listSharedWithMe: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSharedWithMe/${id}` : `/listSharedWithMe`);
};

const getPermissions: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPermissions/${id}` : `/getPermissions`);
};

const getDriveInfo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getDriveInfo/${id}` : `/getDriveInfo`);
};

const listDrives: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listDrives/${id}` : `/listDrives`);
};

const getRecentFiles: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getRecentFiles/${id}` : `/getRecentFiles`);
};

const getThumbnails: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getThumbnails/${id}` : `/getThumbnails`);
};

const uploadLargeFile: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/uploadLargeFile`, "POST", typeof data === "object" ? data : { value: data });
};

export const OnedriveFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listChildren, getItem, getItemByPath, createFolder, deleteItem, moveItem, copyItem, uploadFile, downloadFile, searchFiles, createSharingLink, listSharedWithMe, getPermissions, getDriveInfo, listDrives, getRecentFiles, getThumbnails, uploadLargeFile,
};

export const OnedriveFunctionMetadata = {
  setCredentials: { description: "Configure onedrive credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listChildren: { description: "listChildren", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getItem: { description: "getItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getItemByPath: { description: "getItemByPath", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createFolder: { description: "createFolder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteItem: { description: "deleteItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  moveItem: { description: "moveItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  copyItem: { description: "copyItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  uploadFile: { description: "uploadFile", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  downloadFile: { description: "downloadFile", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchFiles: { description: "searchFiles", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createSharingLink: { description: "createSharingLink", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listSharedWithMe: { description: "listSharedWithMe", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPermissions: { description: "getPermissions", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getDriveInfo: { description: "getDriveInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listDrives: { description: "listDrives", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getRecentFiles: { description: "getRecentFiles", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getThumbnails: { description: "getThumbnails", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  uploadLargeFile: { description: "uploadLargeFile", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const OnedriveModuleMetadata = {
  description: "Microsoft OneDrive — files, folders, sharing, and permissions via Graph API.",
  methods: Object.keys(OnedriveFunctions),
  category: "storage",
};
