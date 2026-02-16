import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import * as ftp from "basic-ftp";
import SftpClient from "ssh2-sftp-client";

const ftpClients = new Map<string, ftp.Client>();
const sftpClients = new Map<string, SftpClient>();

const connect: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "default");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const protocol = String(opts.protocol ?? "ftp").toLowerCase();

  if (protocol === "sftp") {
    const client = new SftpClient();
    await client.connect({ host: String(opts.host ?? ""), port: Number(opts.port ?? 22), username: String(opts.user ?? opts.username ?? ""), password: String(opts.pass ?? opts.password ?? ""), privateKey: opts.privateKey ? String(opts.privateKey) : undefined });
    sftpClients.set(name, client);
    return { name, protocol: "sftp", connected: true };
  }

  const client = new ftp.Client();
  client.ftp.verbose = Boolean(opts.verbose);
  await client.access({ host: String(opts.host ?? ""), port: Number(opts.port ?? 21), user: String(opts.user ?? opts.username ?? ""), password: String(opts.pass ?? opts.password ?? ""), secure: Boolean(opts.secure ?? opts.tls) });
  ftpClients.set(name, client);
  return { name, protocol: "ftp", connected: true };
};

const upload: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "default");
  const localPath = String(args[1] ?? "");
  const remotePath = String(args[2] ?? "");
  const sftp = sftpClients.get(name);
  if (sftp) { await sftp.put(localPath, remotePath); return { uploaded: remotePath }; }
  const client = ftpClients.get(name);
  if (!client) throw new Error(`Connection "${name}" not found`);
  await client.uploadFrom(localPath, remotePath);
  return { uploaded: remotePath };
};

const download: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "default");
  const remotePath = String(args[1] ?? "");
  const localPath = String(args[2] ?? "");
  const sftp = sftpClients.get(name);
  if (sftp) { await sftp.get(remotePath, localPath); return { downloaded: localPath }; }
  const client = ftpClients.get(name);
  if (!client) throw new Error(`Connection "${name}" not found`);
  await client.downloadTo(localPath, remotePath);
  return { downloaded: localPath };
};

const list: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "default");
  const remotePath = String(args[1] ?? "/");
  const sftp = sftpClients.get(name);
  if (sftp) {
    const items = await sftp.list(remotePath);
    return items.map((i) => ({ name: i.name, type: i.type, size: i.size, modifyTime: i.modifyTime }));
  }
  const client = ftpClients.get(name);
  if (!client) throw new Error(`Connection "${name}" not found`);
  const items = await client.list(remotePath);
  return items.map((i) => ({ name: i.name, type: i.type === 2 ? "d" : "-", size: i.size, date: i.rawModifiedAt }));
};

const mkdir: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "default");
  const remotePath = String(args[1] ?? "");
  const sftp = sftpClients.get(name);
  if (sftp) { await sftp.mkdir(remotePath, true); return true; }
  const client = ftpClients.get(name);
  if (!client) throw new Error(`Connection "${name}" not found`);
  await client.ensureDir(remotePath);
  return true;
};

const remove: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "default");
  const remotePath = String(args[1] ?? "");
  const sftp = sftpClients.get(name);
  if (sftp) { await sftp.delete(remotePath); return true; }
  const client = ftpClients.get(name);
  if (!client) throw new Error(`Connection "${name}" not found`);
  await client.remove(remotePath);
  return true;
};

const rename: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "default");
  const from = String(args[1] ?? "");
  const to = String(args[2] ?? "");
  const sftp = sftpClients.get(name);
  if (sftp) { await sftp.rename(from, to); return true; }
  const client = ftpClients.get(name);
  if (!client) throw new Error(`Connection "${name}" not found`);
  await client.rename(from, to);
  return true;
};

const close: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "default");
  const sftp = sftpClients.get(name);
  if (sftp) { await sftp.end(); sftpClients.delete(name); return true; }
  const client = ftpClients.get(name);
  if (!client) return false;
  client.close();
  ftpClients.delete(name);
  return true;
};

export const FtpFunctions: Record<string, BuiltinHandler> = { connect, upload, download, list, mkdir, remove, rename, close };

export const FtpFunctionMetadata: Record<string, FunctionMetadata> = {
  connect: { description: "Connect to an FTP or SFTP server", parameters: [{ name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{protocol, host, port, user, pass, secure, privateKey}", formInputType: "text", required: true }], returnType: "object", returnDescription: "{name, protocol, connected}", example: 'ftp.connect "server" {"protocol": "sftp", "host": "example.com", "user": "admin", "pass": "..."}' },
  upload: { description: "Upload a local file to remote server", parameters: [{ name: "name", dataType: "string", description: "Connection", formInputType: "text", required: true }, { name: "localPath", dataType: "string", description: "Local file", formInputType: "text", required: true }, { name: "remotePath", dataType: "string", description: "Remote path", formInputType: "text", required: true }], returnType: "object", returnDescription: "{uploaded}", example: 'ftp.upload "server" "./file.txt" "/remote/file.txt"' },
  download: { description: "Download a remote file", parameters: [{ name: "name", dataType: "string", description: "Connection", formInputType: "text", required: true }, { name: "remotePath", dataType: "string", description: "Remote path", formInputType: "text", required: true }, { name: "localPath", dataType: "string", description: "Local path", formInputType: "text", required: true }], returnType: "object", returnDescription: "{downloaded}", example: 'ftp.download "server" "/remote/file.txt" "./file.txt"' },
  list: { description: "List files in a remote directory", parameters: [{ name: "name", dataType: "string", description: "Connection", formInputType: "text", required: true }, { name: "path", dataType: "string", description: "Remote path (default /)", formInputType: "text", required: false }], returnType: "array", returnDescription: "Array of file info", example: 'ftp.list "server" "/uploads"' },
  mkdir: { description: "Create a remote directory", parameters: [{ name: "name", dataType: "string", description: "Connection", formInputType: "text", required: true }, { name: "path", dataType: "string", description: "Remote path", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True", example: 'ftp.mkdir "server" "/uploads/new"' },
  remove: { description: "Delete a remote file", parameters: [{ name: "name", dataType: "string", description: "Connection", formInputType: "text", required: true }, { name: "path", dataType: "string", description: "Remote path", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True", example: 'ftp.remove "server" "/old/file.txt"' },
  rename: { description: "Rename/move a remote file", parameters: [{ name: "name", dataType: "string", description: "Connection", formInputType: "text", required: true }, { name: "from", dataType: "string", description: "Current path", formInputType: "text", required: true }, { name: "to", dataType: "string", description: "New path", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True", example: 'ftp.rename "server" "/old.txt" "/new.txt"' },
  close: { description: "Close an FTP/SFTP connection", parameters: [{ name: "name", dataType: "string", description: "Connection", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True", example: 'ftp.close "server"' },
};

export const FtpModuleMetadata: ModuleMetadata = {
  description: "FTP and SFTP file transfer: connect, upload, download, list, mkdir, rename, and delete",
  methods: ["connect", "upload", "download", "list", "mkdir", "remove", "rename", "close"],
};
