import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import os from "node:os";

const hostname: BuiltinHandler = () => os.hostname();
const platform: BuiltinHandler = () => os.platform();
const arch: BuiltinHandler = () => os.arch();
const cpus: BuiltinHandler = () => os.cpus().map((c: any) => ({ model: c.model, speed: c.speed }));
const cpuCount: BuiltinHandler = () => os.cpus().length;
const totalMemory: BuiltinHandler = () => os.totalmem();
const freeMemory: BuiltinHandler = () => os.freemem();
const uptime: BuiltinHandler = () => os.uptime();
const homeDir: BuiltinHandler = () => os.homedir();
const tempDir: BuiltinHandler = () => os.tmpdir();
const userInfo: BuiltinHandler = () => {
  const info = os.userInfo();
  return { username: info.username, homedir: info.homedir, shell: info.shell };
};
const networkInterfaces: BuiltinHandler = () => {
  const ifaces = os.networkInterfaces();
  const result: Record<string, unknown[]> = {};
  for (const [name, addrs] of Object.entries(ifaces)) {
    if (addrs) result[name] = addrs.map((a: any) => ({ address: a.address, family: a.family, internal: a.internal }));
  }
  return result;
};
const type: BuiltinHandler = () => os.type();
const release: BuiltinHandler = () => os.release();
const eol: BuiltinHandler = () => os.EOL;

export const OsFunctions: Record<string, BuiltinHandler> = {
  hostname, platform, arch, cpus, cpuCount, totalMemory, freeMemory, uptime, homeDir, tempDir, userInfo, networkInterfaces, type, release, eol,
};

export const OsFunctionMetadata = {
  hostname: { description: "Get the system hostname", parameters: [], returnType: "string", returnDescription: "Hostname", example: "os.hostname" },
  platform: { description: "Get the OS platform (linux, darwin, win32)", parameters: [], returnType: "string", returnDescription: "Platform string", example: "os.platform" },
  arch: { description: "Get the CPU architecture", parameters: [], returnType: "string", returnDescription: "Architecture (x64, arm64, etc.)", example: "os.arch" },
  cpus: { description: "Get CPU information", parameters: [], returnType: "array", returnDescription: "Array of {model, speed} objects", example: "os.cpus" },
  cpuCount: { description: "Get the number of CPU cores", parameters: [], returnType: "number", returnDescription: "Number of CPUs", example: "os.cpuCount" },
  totalMemory: { description: "Get total system memory in bytes", parameters: [], returnType: "number", returnDescription: "Total memory in bytes", example: "os.totalMemory" },
  freeMemory: { description: "Get free system memory in bytes", parameters: [], returnType: "number", returnDescription: "Free memory in bytes", example: "os.freeMemory" },
  uptime: { description: "Get system uptime in seconds", parameters: [], returnType: "number", returnDescription: "Uptime in seconds", example: "os.uptime" },
  homeDir: { description: "Get the user home directory", parameters: [], returnType: "string", returnDescription: "Home directory path", example: "os.homeDir" },
  tempDir: { description: "Get the OS temp directory", parameters: [], returnType: "string", returnDescription: "Temp directory path", example: "os.tempDir" },
  userInfo: { description: "Get current user information", parameters: [], returnType: "object", returnDescription: "{username, homedir, shell}", example: "os.userInfo" },
  networkInterfaces: { description: "Get network interface information", parameters: [], returnType: "object", returnDescription: "Object of interface arrays", example: "os.networkInterfaces" },
  type: { description: "Get the OS type (Linux, Darwin, Windows_NT)", parameters: [], returnType: "string", returnDescription: "OS type string", example: "os.type" },
  release: { description: "Get the OS release version", parameters: [], returnType: "string", returnDescription: "OS release string", example: "os.release" },
  eol: { description: "Get the OS end-of-line marker", parameters: [], returnType: "string", returnDescription: "EOL string (\\n or \\r\\n)", example: "os.eol" },
};

export const OsModuleMetadata = {
  description: "System information: hostname, platform, architecture, CPU, memory, network, and more",
  methods: ["hostname", "platform", "arch", "cpus", "cpuCount", "totalMemory", "freeMemory", "uptime", "homeDir", "tempDir", "userInfo", "networkInterfaces", "type", "release", "eol"],
};
