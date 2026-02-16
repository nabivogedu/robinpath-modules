import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { spawn as nodeSpawn, exec as execCb, type ChildProcess } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(execCb);
const children = new Map<string, ChildProcess>();

const run: BuiltinHandler = async (args) => {
  const command = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  try {
    const { stdout, stderr } = await execAsync(command, {
      cwd: opts.cwd ? String(opts.cwd) : undefined,
      env: typeof opts.env === "object" && opts.env !== null ? { ...process.env, ...(opts.env as Record<string, string>) } : undefined,
      timeout: opts.timeout ? Number(opts.timeout) : undefined,
      shell: opts.shell ? String(opts.shell) : undefined,
    });
    return { stdout: stdout.trim(), stderr: stderr.trim(), code: 0 };
  } catch (err: unknown) {
    const e = err as { stdout?: string; stderr?: string; code?: number };
    return { stdout: (e.stdout ?? "").trim(), stderr: (e.stderr ?? "").trim(), code: e.code ?? 1 };
  }
};

const exec: BuiltinHandler = async (args) => {
  const command = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const { stdout, stderr } = await execAsync(command, {
    cwd: opts.cwd ? String(opts.cwd) : undefined,
    env: typeof opts.env === "object" && opts.env !== null ? { ...process.env, ...(opts.env as Record<string, string>) } : undefined,
    timeout: opts.timeout ? Number(opts.timeout) : undefined,
    maxBuffer: opts.maxBuffer ? Number(opts.maxBuffer) : undefined,
  });
  return { stdout: stdout.trim(), stderr: stderr.trim() };
};

const spawnProcess: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const command = String(args[1] ?? "");
  const cmdArgs = (Array.isArray(args[2]) ? args[2].map(String) : []) as string[];
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  if (children.has(id)) throw new Error(`Process "${id}" already exists`);

  const child = nodeSpawn(command, cmdArgs, {
    cwd: opts.cwd ? String(opts.cwd) : undefined,
    env: typeof opts.env === "object" && opts.env !== null ? { ...process.env, ...(opts.env as Record<string, string>) } : undefined,
    shell: opts.shell === true || typeof opts.shell === "string" ? opts.shell : false,
    detached: opts.detached === true,
    stdio: "ignore",
  });

  children.set(id, child);
  child.on("exit", () => { /* keep in map until explicitly removed */ });
  return id;
};

const kill: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const signal = String(args[1] ?? "SIGTERM");
  const child = children.get(id);
  if (!child) throw new Error(`Process "${id}" not found`);
  child.kill(signal as NodeJS.Signals);
  children.delete(id);
  return true;
};

const isAlive: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const child = children.get(id);
  if (!child) return false;
  return child.exitCode === null && child.signalCode === null;
};

const list: BuiltinHandler = () => {
  return [...children.entries()].map(([id, child]) => ({
    id,
    pid: child.pid,
    running: child.exitCode === null && child.signalCode === null,
  }));
};

const signal: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const sig = String(args[1] ?? "SIGUSR1");
  const child = children.get(id);
  if (!child) throw new Error(`Process "${id}" not found`);
  child.kill(sig as NodeJS.Signals);
  return true;
};

const pid: BuiltinHandler = () => process.pid;

const uptime: BuiltinHandler = () => process.uptime();

const memoryUsage: BuiltinHandler = () => {
  const mem = process.memoryUsage();
  const toMB = (b: number) => Math.round((b / 1024 / 1024) * 100) / 100;
  return { rss: toMB(mem.rss), heapTotal: toMB(mem.heapTotal), heapUsed: toMB(mem.heapUsed), external: toMB(mem.external) };
};

const cpuUsage: BuiltinHandler = () => {
  const cpu = process.cpuUsage();
  return { user: Math.round(cpu.user / 1000), system: Math.round(cpu.system / 1000) };
};

const cwd: BuiltinHandler = () => process.cwd();

const argv: BuiltinHandler = () => process.argv;

const env: BuiltinHandler = () => ({ ...process.env });

const exit: BuiltinHandler = (args) => {
  const code = Number(args[0] ?? 0);
  return { exitCode: code, note: "Exit requested (not executed for safety)" };
};

export const ProcessFunctions: Record<string, BuiltinHandler> = {
  run, exec, spawn: spawnProcess, kill, isAlive, list, signal, pid, uptime, memoryUsage, cpuUsage, cwd, argv, env, exit,
};

export const ProcessFunctionMetadata: Record<string, FunctionMetadata> = {
  run: { description: "Run command and wait for result", parameters: [{ name: "command", dataType: "string", description: "Shell command", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{cwd, env, timeout, shell}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{stdout, stderr, code}", example: 'process.run "ls -la"' },
  exec: { description: "Execute command in shell", parameters: [{ name: "command", dataType: "string", description: "Shell command", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{cwd, env, timeout, maxBuffer}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{stdout, stderr}", example: 'process.exec "echo hello"' },
  spawn: { description: "Spawn long-running process", parameters: [{ name: "id", dataType: "string", description: "Process identifier", formInputType: "text", required: true }, { name: "command", dataType: "string", description: "Command to run", formInputType: "text", required: true }, { name: "args", dataType: "array", description: "Command arguments", formInputType: "text", required: false }, { name: "options", dataType: "object", description: "{cwd, env, shell, detached}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Process id", example: 'process.spawn "server" "node" ["app.js"]' },
  kill: { description: "Kill a spawned process", parameters: [{ name: "id", dataType: "string", description: "Process id", formInputType: "text", required: true }, { name: "signal", dataType: "string", description: "Signal (default SIGTERM)", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'process.kill "server"' },
  isAlive: { description: "Check if process is running", parameters: [{ name: "id", dataType: "string", description: "Process id", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if running", example: 'process.isAlive "server"' },
  list: { description: "List all managed processes", parameters: [], returnType: "array", returnDescription: "Array of {id, pid, running}", example: "process.list" },
  signal: { description: "Send signal to process", parameters: [{ name: "id", dataType: "string", description: "Process id", formInputType: "text", required: true }, { name: "signal", dataType: "string", description: "Signal name", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true", example: 'process.signal "server" "SIGUSR1"' },
  pid: { description: "Get current process PID", parameters: [], returnType: "number", returnDescription: "PID", example: "process.pid" },
  uptime: { description: "Get process uptime in seconds", parameters: [], returnType: "number", returnDescription: "Uptime seconds", example: "process.uptime" },
  memoryUsage: { description: "Get memory usage in MB", parameters: [], returnType: "object", returnDescription: "{rss, heapTotal, heapUsed, external}", example: "process.memoryUsage" },
  cpuUsage: { description: "Get CPU usage in ms", parameters: [], returnType: "object", returnDescription: "{user, system}", example: "process.cpuUsage" },
  cwd: { description: "Get working directory", parameters: [], returnType: "string", returnDescription: "Current directory path", example: "process.cwd" },
  argv: { description: "Get process arguments", parameters: [], returnType: "array", returnDescription: "Argument strings", example: "process.argv" },
  env: { description: "Get environment variables", parameters: [], returnType: "object", returnDescription: "All env vars", example: "process.env" },
  exit: { description: "Request process exit (safe, does not actually exit)", parameters: [{ name: "code", dataType: "number", description: "Exit code (default 0)", formInputType: "text", required: false }], returnType: "object", returnDescription: "{exitCode, note}", example: "process.exit 0" },
};

export const ProcessModuleMetadata: ModuleMetadata = {
  description: "Child process management: run commands, spawn long-running processes, get system info",
  methods: ["run", "exec", "spawn", "kill", "isAlive", "list", "signal", "pid", "uptime", "memoryUsage", "cpuUsage", "cwd", "argv", "env", "exit"],
};
