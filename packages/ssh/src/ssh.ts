// @ts-nocheck
import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
// @ts-ignore
import { Client } from "ssh2";
import { readFileSync } from "node:fs";

const connections = new Map<string, Client>();

// ── Helpers ──────────────────────────────────────────────────────────

function getConnection(id: string): any {
  const client = connections.get(id);
  if (!client) throw new Error(`SSH connection "${id}" not found`);
  return client;
}

function getSftp(client: any): Promise<import("ssh2").SFTPWrapper> {
  return new Promise((resolve: any, reject: any) => {
    client.sftp((err: any, sftp: any) => {
      if (err) return reject(err);
      resolve(sftp);
    });
  });
}

// ── connect ──────────────────────────────────────────────────────────

const connect: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "default");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  return new Promise<string>((resolve: any, reject: any) => {
    const client = new (Client as any)();

    let privateKey: Buffer | string | undefined;
    if (opts.privateKeyPath) {
      privateKey = readFileSync(String(opts.privateKeyPath));
    } else if (opts.privateKey) {
      privateKey = String(opts.privateKey);
    }

    client
      .on("ready", () => {
        connections.set(id, client);
        resolve(id);
      })
      .on("error", (err: any) => reject(err))
      .connect({
        host: String(opts.host ?? ""),
        port: Number(opts.port ?? 22),
        username: String(opts.username ?? ""),
        password: opts.password ? String(opts.password) : undefined,
        privateKey,
        passphrase: opts.passphrase ? String(opts.passphrase) : undefined,
      });
  });
};

// ── exec ─────────────────────────────────────────────────────────────

const exec: BuiltinHandler = async (args) => {
  const client = getConnection(String(args[0] ?? "default"));
  const command = String(args[1] ?? "");

  return new Promise<{ stdout: string; stderr: string; code: number }>((resolve: any, reject: any) => {
    client.exec(command, (err: any, stream: any) => {
      if (err) return reject(err);
      let stdout = "";
      let stderr = "";
      stream
        .on("close", (code: number) => {
          resolve({ stdout, stderr, code: code ?? 0 });
        })
        .on("data", (data: Buffer) => {
          stdout += data.toString();
        })
        .stderr.on("data", (data: Buffer) => {
          stderr += data.toString();
        });
    });
  });
};

// ── upload ───────────────────────────────────────────────────────────

const upload: BuiltinHandler = async (args) => {
  const client = getConnection(String(args[0] ?? "default"));
  const localPath = String(args[1] ?? "");
  const remotePath = String(args[2] ?? "");
  const sftp = await getSftp(client);

  return new Promise<{ uploaded: string }>((resolve: any, reject: any) => {
    sftp.fastPut(localPath, remotePath, (err: any) => {
      if (err) return reject(err);
      resolve({ uploaded: remotePath });
    });
  });
};

// ── download ─────────────────────────────────────────────────────────

const download: BuiltinHandler = async (args) => {
  const client = getConnection(String(args[0] ?? "default"));
  const remotePath = String(args[1] ?? "");
  const localPath = String(args[2] ?? "");
  const sftp = await getSftp(client);

  return new Promise<{ downloaded: string }>((resolve: any, reject: any) => {
    sftp.fastGet(remotePath, localPath, (err: any) => {
      if (err) return reject(err);
      resolve({ downloaded: localPath });
    });
  });
};

// ── mkdir ────────────────────────────────────────────────────────────

const mkdir: BuiltinHandler = async (args) => {
  const client = getConnection(String(args[0] ?? "default"));
  const remotePath = String(args[1] ?? "");
  const sftp = await getSftp(client);

  return new Promise<boolean>((resolve: any, reject: any) => {
    sftp.mkdir(remotePath, (err: any) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};

// ── ls ───────────────────────────────────────────────────────────────

const ls: BuiltinHandler = async (args) => {
  const client = getConnection(String(args[0] ?? "default"));
  const remotePath = String(args[1] ?? "/");
  const sftp = await getSftp(client);

  return new Promise<{ name: string; size: number; modifyTime: number; isDirectory: boolean }[]>((resolve: any, reject: any) => {
    sftp.readdir(remotePath, (err: any, list: any) => {
      if (err) return reject(err);
      resolve(
        list.map((item: any) => ({
          name: item.filename,
          size: item.attrs.size,
          modifyTime: item.attrs.mtime * 1000,
          isDirectory: (item.attrs.mode & 0o40000) !== 0,
        })),
      );
    });
  });
};

// ── rm ───────────────────────────────────────────────────────────────

const rm: BuiltinHandler = async (args) => {
  const client = getConnection(String(args[0] ?? "default"));
  const remotePath = String(args[1] ?? "");
  const sftp = await getSftp(client);

  return new Promise<boolean>((resolve: any, reject: any) => {
    sftp.unlink(remotePath, (err: any) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};

// ── rmdir ────────────────────────────────────────────────────────────

const rmdir: BuiltinHandler = async (args) => {
  const client = getConnection(String(args[0] ?? "default"));
  const remotePath = String(args[1] ?? "");
  const sftp = await getSftp(client);

  return new Promise<boolean>((resolve: any, reject: any) => {
    sftp.rmdir(remotePath, (err: any) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};

// ── stat ─────────────────────────────────────────────────────────────

const stat: BuiltinHandler = async (args) => {
  const client = getConnection(String(args[0] ?? "default"));
  const remotePath = String(args[1] ?? "");
  const sftp = await getSftp(client);

  return new Promise<{ size: number; modifyTime: number; accessTime: number; isDirectory: boolean; isFile: boolean }>((resolve: any, reject: any) => {
    sftp.stat(remotePath, (err: any, stats: any) => {
      if (err) return reject(err);
      const isDirectory = (stats.mode & 0o40000) !== 0;
      resolve({
        size: stats.size,
        modifyTime: stats.mtime * 1000,
        accessTime: stats.atime * 1000,
        isDirectory,
        isFile: !isDirectory,
      });
    });
  });
};

// ── readFile ─────────────────────────────────────────────────────────

const readFile: BuiltinHandler = async (args) => {
  const client = getConnection(String(args[0] ?? "default"));
  const remotePath = String(args[1] ?? "");
  const sftp = await getSftp(client);

  return new Promise<string>((resolve: any, reject: any) => {
    const chunks: Buffer[] = [];
    const stream = sftp.createReadStream(remotePath);
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    stream.on("error", (err: any) => reject(err));
  });
};

// ── writeFile ────────────────────────────────────────────────────────

const writeFile: BuiltinHandler = async (args) => {
  const client = getConnection(String(args[0] ?? "default"));
  const remotePath = String(args[1] ?? "");
  const content = String(args[2] ?? "");
  const sftp = await getSftp(client);

  return new Promise<boolean>((resolve: any, reject: any) => {
    const stream = sftp.createWriteStream(remotePath);
    stream.on("close", () => resolve(true));
    stream.on("error", (err: any) => reject(err));
    stream.end(content, "utf8");
  });
};

// ── close ────────────────────────────────────────────────────────────

const close: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "default");
  const client = connections.get(id);
  if (!client) return false;
  client.end();
  connections.delete(id);
  return true;
};

// ── isConnected ──────────────────────────────────────────────────────

const isConnected: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "default");
  const client = connections.get(id);
  return client !== undefined;
};

// ── Exports ──────────────────────────────────────────────────────────

export const SshFunctions: Record<string, BuiltinHandler> = {
  connect, exec, upload, download, mkdir, ls, rm, rmdir, stat, readFile, writeFile, close, isConnected,
};

export const SshFunctionMetadata = {
  connect: { description: "Connect to an SSH server", parameters: [{ name: "id", dataType: "string", description: "Connection identifier", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{host, port, username, password, privateKey, privateKeyPath, passphrase}", formInputType: "text", required: true }], returnType: "string", returnDescription: "Connection id", example: 'ssh.connect "server" {"host": "example.com", "username": "admin", "password": "..."}' },
  exec: { description: "Execute a command on the remote server", parameters: [{ name: "connectionId", dataType: "string", description: "Connection identifier", formInputType: "text", required: true }, { name: "command", dataType: "string", description: "Shell command to execute", formInputType: "text", required: true }], returnType: "object", returnDescription: "{stdout, stderr, code}", example: 'ssh.exec "server" "ls -la /var/log"' },
  upload: { description: "Upload a local file to the remote server via SFTP", parameters: [{ name: "connectionId", dataType: "string", description: "Connection identifier", formInputType: "text", required: true }, { name: "localPath", dataType: "string", description: "Local file path", formInputType: "text", required: true }, { name: "remotePath", dataType: "string", description: "Remote destination path", formInputType: "text", required: true }], returnType: "object", returnDescription: "{uploaded}", example: 'ssh.upload "server" "./deploy.tar.gz" "/opt/app/deploy.tar.gz"' },
  download: { description: "Download a remote file to local filesystem via SFTP", parameters: [{ name: "connectionId", dataType: "string", description: "Connection identifier", formInputType: "text", required: true }, { name: "remotePath", dataType: "string", description: "Remote file path", formInputType: "text", required: true }, { name: "localPath", dataType: "string", description: "Local destination path", formInputType: "text", required: true }], returnType: "object", returnDescription: "{downloaded}", example: 'ssh.download "server" "/var/log/app.log" "./app.log"' },
  mkdir: { description: "Create a directory on the remote server", parameters: [{ name: "connectionId", dataType: "string", description: "Connection identifier", formInputType: "text", required: true }, { name: "remotePath", dataType: "string", description: "Remote directory path", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True on success", example: 'ssh.mkdir "server" "/opt/app/logs"' },
  ls: { description: "List files in a remote directory", parameters: [{ name: "connectionId", dataType: "string", description: "Connection identifier", formInputType: "text", required: true }, { name: "remotePath", dataType: "string", description: "Remote directory path (default /)", formInputType: "text", required: false }], returnType: "array", returnDescription: "Array of {name, size, modifyTime, isDirectory}", example: 'ssh.ls "server" "/var/log"' },
  rm: { description: "Remove a file on the remote server", parameters: [{ name: "connectionId", dataType: "string", description: "Connection identifier", formInputType: "text", required: true }, { name: "remotePath", dataType: "string", description: "Remote file path", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True on success", example: 'ssh.rm "server" "/tmp/old-file.txt"' },
  rmdir: { description: "Remove a directory on the remote server", parameters: [{ name: "connectionId", dataType: "string", description: "Connection identifier", formInputType: "text", required: true }, { name: "remotePath", dataType: "string", description: "Remote directory path", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True on success", example: 'ssh.rmdir "server" "/tmp/old-dir"' },
  stat: { description: "Get file or directory stats from the remote server", parameters: [{ name: "connectionId", dataType: "string", description: "Connection identifier", formInputType: "text", required: true }, { name: "remotePath", dataType: "string", description: "Remote path", formInputType: "text", required: true }], returnType: "object", returnDescription: "{size, modifyTime, accessTime, isDirectory, isFile}", example: 'ssh.stat "server" "/var/log/app.log"' },
  readFile: { description: "Read the contents of a remote file as a string", parameters: [{ name: "connectionId", dataType: "string", description: "Connection identifier", formInputType: "text", required: true }, { name: "remotePath", dataType: "string", description: "Remote file path", formInputType: "text", required: true }], returnType: "string", returnDescription: "File content as UTF-8 string", example: 'ssh.readFile "server" "/etc/hostname"' },
  writeFile: { description: "Write string content to a remote file", parameters: [{ name: "connectionId", dataType: "string", description: "Connection identifier", formInputType: "text", required: true }, { name: "remotePath", dataType: "string", description: "Remote file path", formInputType: "text", required: true }, { name: "content", dataType: "string", description: "Content to write", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True on success", example: 'ssh.writeFile "server" "/tmp/config.txt" "key=value"' },
  close: { description: "Close an SSH connection", parameters: [{ name: "connectionId", dataType: "string", description: "Connection identifier", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if closed, false if not found", example: 'ssh.close "server"' },
  isConnected: { description: "Check if an SSH connection is alive", parameters: [{ name: "connectionId", dataType: "string", description: "Connection identifier", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if connected", example: 'ssh.isConnected "server"' },
};

export const SshModuleMetadata = {
  description: "Remote server command execution and file management via SSH and SFTP",
  methods: ["connect", "exec", "upload", "download", "mkdir", "ls", "rm", "rmdir", "stat", "readFile", "writeFile", "close", "isConnected"],
};
