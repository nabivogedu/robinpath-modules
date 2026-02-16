import type { BuiltinHandler } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getToken(): string {
  const token = config.get("accessToken");
  if (!token) throw new Error('Google Drive: token not configured. Call googleDrive.setCredentials first.');
  return token;
}

async function driveApi(path: string, method = "GET", body?: unknown, isUpload = false): Promise<unknown> {
  const token = getToken();
  const base = isUpload ? "https://www.googleapis.com/upload/drive/v3" : "https://www.googleapis.com/drive/v3";
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };
  if (!isUpload) headers["Content-Type"] = "application/json";
  const res = await fetch(`${base}${path}`, {
    method,
    headers,
    body: body ? (isUpload ? (body as BodyInit) : JSON.stringify(body)) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google Drive API error (${res.status}): ${text}`);
  }
  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) return res.json();
  return res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("googleDrive.setCredentials requires an access token.");
  config.set("accessToken", accessToken);
  return "Google Drive credentials configured.";
};

const listFiles: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const params = new URLSearchParams();
  if (opts.q) params.set("q", String(opts.q));
  if (opts.pageSize) params.set("pageSize", String(opts.pageSize));
  if (opts.pageToken) params.set("pageToken", String(opts.pageToken));
  if (opts.orderBy) params.set("orderBy", String(opts.orderBy));
  params.set("fields", "nextPageToken,files(id,name,mimeType,size,modifiedTime,parents)");
  return driveApi(`/files?${params.toString()}`);
};

const getFile: BuiltinHandler = async (args) => {
  const fileId = args[0] as string;
  if (!fileId) throw new Error("googleDrive.getFile requires a fileId.");
  return driveApi(`/files/${fileId}?fields=id,name,mimeType,size,modifiedTime,parents,webViewLink,webContentLink`);
};

const downloadFile: BuiltinHandler = async (args) => {
  const fileId = args[0] as string;
  if (!fileId) throw new Error("googleDrive.downloadFile requires a fileId.");
  const token = getToken();
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google Drive download error (${res.status}): ${text}`);
  }
  return res.text();
};

const uploadFile: BuiltinHandler = async (args) => {
  const name = args[0] as string;
  const content = args[1] as string;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!name || content === undefined) throw new Error("googleDrive.uploadFile requires name and content.");
  const mimeType = (opts.mimeType as string) ?? "text/plain";
  const folderId = opts.folderId as string | undefined;
  const metadata: Record<string, unknown> = { name, mimeType };
  if (folderId) metadata.parents = [folderId];
  const boundary = "robinpath_boundary";
  const body =
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n${content}\r\n--${boundary}--`;
  const token = getToken();
  const res = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
    },
    body,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google Drive upload error (${res.status}): ${text}`);
  }
  return res.json();
};

const createFolder: BuiltinHandler = async (args) => {
  const name = args[0] as string;
  const parentId = args[1] as string | undefined;
  if (!name) throw new Error("googleDrive.createFolder requires a name.");
  const metadata: Record<string, unknown> = { name, mimeType: "application/vnd.google-apps.folder" };
  if (parentId) metadata.parents = [parentId];
  return driveApi("/files", "POST", metadata);
};

const deleteFile: BuiltinHandler = async (args) => {
  const fileId = args[0] as string;
  if (!fileId) throw new Error("googleDrive.deleteFile requires a fileId.");
  const token = getToken();
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google Drive delete error (${res.status}): ${text}`);
  }
  return "File deleted.";
};

const moveFile: BuiltinHandler = async (args) => {
  const fileId = args[0] as string;
  const newFolderId = args[1] as string;
  if (!fileId || !newFolderId) throw new Error("googleDrive.moveFile requires fileId and newFolderId.");
  const file = (await driveApi(`/files/${fileId}?fields=parents`)) as { parents?: string[] };
  const removeParents = (file.parents ?? []).join(",");
  return driveApi(`/files/${fileId}?addParents=${newFolderId}&removeParents=${removeParents}&fields=id,name,parents`, "PATCH");
};

const copyFile: BuiltinHandler = async (args) => {
  const fileId = args[0] as string;
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!fileId) throw new Error("googleDrive.copyFile requires a fileId.");
  const body: Record<string, unknown> = {};
  if (opts.name) body.name = opts.name;
  if (opts.folderId) body.parents = [opts.folderId];
  return driveApi(`/files/${fileId}/copy?fields=id,name,mimeType,size`, "POST", body);
};

const shareFile: BuiltinHandler = async (args) => {
  const fileId = args[0] as string;
  const email = args[1] as string;
  const role = (args[2] as string) ?? "reader";
  if (!fileId || !email) throw new Error("googleDrive.shareFile requires fileId and email.");
  return driveApi(`/files/${fileId}/permissions`, "POST", {
    type: "user",
    role,
    emailAddress: email,
  });
};

export const GoogleDriveFunctions: Record<string, BuiltinHandler> = {
  setCredentials,
  listFiles,
  getFile,
  downloadFile,
  uploadFile,
  createFolder,
  deleteFile,
  moveFile,
  copyFile,
  shareFile,
};

export const GoogleDriveFunctionMetadata: Record<string, object> = {
  setCredentials: {
    description: "Set the OAuth2 access token for Google Drive API.",
    parameters: [
      { name: "accessToken", dataType: "string", description: "OAuth2 access token", formInputType: "password", required: true },
    ],
    returnType: "string",
    returnDescription: "Confirmation message.",
    example: 'googleDrive.setCredentials "ya29.xxx"',
  },
  listFiles: {
    description: "List files in Google Drive with optional query filter.",
    parameters: [
      { name: "options", dataType: "object", description: "Options: q (query), pageSize, pageToken, orderBy", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Object with files array and nextPageToken.",
    example: 'googleDrive.listFiles {"q":"mimeType=\'application/pdf\'","pageSize":10}',
  },
  getFile: {
    description: "Get file metadata by ID.",
    parameters: [
      { name: "fileId", dataType: "string", description: "The file ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "File metadata object.",
    example: 'googleDrive.getFile "file-id"',
  },
  downloadFile: {
    description: "Download file content as text.",
    parameters: [
      { name: "fileId", dataType: "string", description: "The file ID to download", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "File content as text.",
    example: 'googleDrive.downloadFile "file-id"',
  },
  uploadFile: {
    description: "Upload a file to Google Drive.",
    parameters: [
      { name: "name", dataType: "string", description: "File name", formInputType: "text", required: true },
      { name: "content", dataType: "string", description: "File content", formInputType: "textarea", required: true },
      { name: "options", dataType: "object", description: "Options: mimeType, folderId", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Uploaded file metadata.",
    example: 'googleDrive.uploadFile "report.txt" "Hello world" {"folderId":"folder-id"}',
  },
  createFolder: {
    description: "Create a new folder in Google Drive.",
    parameters: [
      { name: "name", dataType: "string", description: "Folder name", formInputType: "text", required: true },
      { name: "parentId", dataType: "string", description: "Parent folder ID (optional)", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Created folder metadata.",
    example: 'googleDrive.createFolder "My Folder"',
  },
  deleteFile: {
    description: "Permanently delete a file or folder.",
    parameters: [
      { name: "fileId", dataType: "string", description: "The file/folder ID to delete", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Confirmation message.",
    example: 'googleDrive.deleteFile "file-id"',
  },
  moveFile: {
    description: "Move a file to a different folder.",
    parameters: [
      { name: "fileId", dataType: "string", description: "The file ID to move", formInputType: "text", required: true },
      { name: "newFolderId", dataType: "string", description: "Destination folder ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated file metadata.",
    example: 'googleDrive.moveFile "file-id" "folder-id"',
  },
  copyFile: {
    description: "Copy a file, optionally with a new name or destination.",
    parameters: [
      { name: "fileId", dataType: "string", description: "The file ID to copy", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: name, folderId", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Copied file metadata.",
    example: 'googleDrive.copyFile "file-id" {"name":"Copy of Report"}',
  },
  shareFile: {
    description: "Share a file with a user by email.",
    parameters: [
      { name: "fileId", dataType: "string", description: "The file ID to share", formInputType: "text", required: true },
      { name: "email", dataType: "string", description: "Email of the user to share with", formInputType: "text", required: true },
      { name: "role", dataType: "string", description: "Permission role: reader, writer, commenter (default: reader)", formInputType: "select", required: false },
    ],
    returnType: "object",
    returnDescription: "Permission object.",
    example: 'googleDrive.shareFile "file-id" "user@example.com" "writer"',
  },
};

export const GoogleDriveModuleMetadata = {
  name: "googleDrive",
  description: "List, upload, download, move, copy, and share files in Google Drive via the Google Drive API v3.",
  icon: "hard-drive",
  category: "storage",
};
