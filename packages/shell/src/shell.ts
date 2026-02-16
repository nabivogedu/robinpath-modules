import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { exec as execCb, execFile as execFileCb } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(execCb);
const execFileAsync = promisify(execFileCb);

// -- RobinPath Function Handlers ----------------------------------------

const execHandler: BuiltinHandler = async (args) => {
  const command = String(args[0] ?? "");
  try {
    const { stdout, stderr } = await execAsync(command);
    return { stdout, stderr, exitCode: 0 };
  } catch (err: unknown) {
    const e = err as { stdout?: string; stderr?: string; code?: number };
    return {
      stdout: e.stdout ?? "",
      stderr: e.stderr ?? "",
      exitCode: e.code ?? 1,
    };
  }
};

const run: BuiltinHandler = async (args) => {
  const command = String(args[0] ?? "");
  const { stdout } = await execAsync(command);
  return stdout.trim();
};

const execFileHandler: BuiltinHandler = async (args) => {
  const file = String(args[0] ?? "");
  const fileArgs: string[] = Array.isArray(args[1])
    ? (args[1] as unknown[]).map(String)
    : [];
  try {
    const { stdout, stderr } = await execFileAsync(file, fileArgs);
    return { stdout, stderr, exitCode: 0 };
  } catch (err: unknown) {
    const e = err as { stdout?: string; stderr?: string; code?: number };
    return {
      stdout: e.stdout ?? "",
      stderr: e.stderr ?? "",
      exitCode: e.code ?? 1,
    };
  }
};

const which: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "");
  const command = process.platform === "win32" ? `where ${name}` : `which ${name}`;
  try {
    const { stdout } = await execAsync(command);
    return stdout.trim().split(/\r?\n/)[0] ?? null;
  } catch {
    return null;
  }
};

const env: BuiltinHandler = () => {
  return { ...process.env } as Record<string, string>;
};

const cwd: BuiltinHandler = () => {
  return process.cwd();
};

const exit: BuiltinHandler = (args) => {
  const code = args[0] !== undefined ? Number(args[0]) : 0;
  process.exit(code);
};

const pid: BuiltinHandler = () => {
  return process.pid;
};

const platform: BuiltinHandler = () => {
  return process.platform;
};

const uptime: BuiltinHandler = () => {
  return process.uptime();
};

// -- Exports ------------------------------------------------------------

export const ShellFunctions: Record<string, BuiltinHandler> = {
  exec: execHandler,
  run,
  execFile: execFileHandler,
  which,
  env,
  cwd,
  exit,
  pid,
  platform,
  uptime,
};

export const ShellFunctionMetadata: Record<string, FunctionMetadata> = {
  exec: {
    description: "Execute a command string in the system shell and return stdout, stderr, and exitCode",
    parameters: [
      {
        name: "command",
        dataType: "string",
        description: "The shell command to execute",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "object",
    returnDescription: "Object with stdout, stderr, and exitCode properties",
    example: 'shell.exec "ls -la"',
  },
  run: {
    description: "Execute a command string in the system shell and return trimmed stdout. Throws on non-zero exit",
    parameters: [
      {
        name: "command",
        dataType: "string",
        description: "The shell command to execute",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The trimmed stdout output of the command",
    example: 'shell.run "echo hello"',
  },
  execFile: {
    description: "Execute a file directly without a shell and return stdout, stderr, and exitCode",
    parameters: [
      {
        name: "file",
        dataType: "string",
        description: "Path to the executable file",
        formInputType: "text",
        required: true,
      },
      {
        name: "args",
        dataType: "array",
        description: "Array of string arguments to pass to the executable",
        formInputType: "text",
        required: false,
      },
    ],
    returnType: "object",
    returnDescription: "Object with stdout, stderr, and exitCode properties",
    example: 'shell.execFile "/usr/bin/node" ["--version"]',
  },
  which: {
    description: "Find the full path of a command using which (or where on Windows)",
    parameters: [
      {
        name: "command",
        dataType: "string",
        description: "Name of the command to locate",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The absolute path to the executable, or null if not found",
    example: 'shell.which "node"',
  },
  env: {
    description: "Get a copy of all current environment variables",
    parameters: [],
    returnType: "object",
    returnDescription: "A plain object containing all environment variable key-value pairs",
    example: "shell.env",
  },
  cwd: {
    description: "Get the current working directory",
    parameters: [],
    returnType: "string",
    returnDescription: "The absolute path of the current working directory",
    example: "shell.cwd",
  },
  exit: {
    description: "Exit the current process with a given exit code",
    parameters: [
      {
        name: "code",
        dataType: "number",
        description: "Exit code (default: 0)",
        formInputType: "text",
        required: false,
        defaultValue: 0,
      },
    ],
    returnType: "void",
    returnDescription: "Does not return; the process exits immediately",
    example: "shell.exit 0",
  },
  pid: {
    description: "Get the process ID of the current process",
    parameters: [],
    returnType: "number",
    returnDescription: "The numeric process ID",
    example: "shell.pid",
  },
  platform: {
    description: "Get the operating system platform identifier",
    parameters: [],
    returnType: "string",
    returnDescription: "The platform string (e.g. 'win32', 'linux', 'darwin')",
    example: "shell.platform",
  },
  uptime: {
    description: "Get the number of seconds the current process has been running",
    parameters: [],
    returnType: "number",
    returnDescription: "Process uptime in seconds",
    example: "shell.uptime",
  },
};

export const ShellModuleMetadata: ModuleMetadata = {
  description: "Execute shell commands, inspect the process environment, and query system information",
  methods: ["exec", "run", "execFile", "which", "env", "cwd", "exit", "pid", "platform", "uptime"],
};
