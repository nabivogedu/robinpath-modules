import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { readFileSync } from "node:fs";

// -- Security: Sensitive key tracking & validation ----------------------

const sensitiveKeys = new Set<string>();
const SENSITIVE_PATTERNS = [
  /KEY$/i, /SECRET$/i, /PASSWORD$/i, /PASS$/i, /TOKEN$/i, /AUTH$/i,
  /CREDENTIAL/i, /PRIVATE/i, /API_KEY/i, /ACCESS_KEY/i, /SESSION/i,
];
const PROTECTED_KEYS = new Set([
  "PATH", "HOME", "USER", "SHELL", "TERM", "LANG",
  "NODE_OPTIONS", "NODE_PATH", "LD_PRELOAD", "LD_LIBRARY_PATH",
  "DYLD_INSERT_LIBRARIES", "DYLD_LIBRARY_PATH",
]);
const VALID_KEY = /^[A-Za-z_][A-Za-z0-9_]*$/;
const REDACTED = "***";

function isSensitive(key: string): boolean {
  if (sensitiveKeys.has(key)) return true;
  return SENSITIVE_PATTERNS.some((p) => p.test(key));
}

function validateKey(key: string): void {
  if (!key) throw new Error("Environment variable name cannot be empty");
  if (!VALID_KEY.test(key)) throw new Error(`Invalid environment variable name: "${key}". Must match /^[A-Za-z_][A-Za-z0-9_]*$/`);
}

// -- RobinPath Function Handlers ----------------------------------------

const get: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "");
  validateKey(name);
  const defaultValue = args[1] !== undefined ? String(args[1]) : null;
  const value = process.env[name];
  if (value === undefined) return defaultValue;
  return value;
};

const set: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "");
  const value = String(args[1] ?? "");
  validateKey(name);
  if (PROTECTED_KEYS.has(name)) throw new Error(`Cannot overwrite protected system variable: "${name}"`);
  process.env[name] = value;
  return true;
};

const has: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "");
  validateKey(name);
  return name in process.env && process.env[name] !== undefined;
};

const all: BuiltinHandler = (args) => {
  const showSensitive = args[0] === true;
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value === undefined) continue;
    result[key] = (!showSensitive && isSensitive(key)) ? REDACTED : value;
  }
  return result;
};

const del: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "");
  validateKey(name);
  if (PROTECTED_KEYS.has(name)) throw new Error(`Cannot delete protected system variable: "${name}"`);
  delete process.env[name];
  return true;
};

const secret: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "");
  validateKey(name);
  sensitiveKeys.add(name);
  return true;
};

const load: BuiltinHandler = (args) => {
  const filePath = String(args[0] ?? ".env");
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split(/\r?\n/);
  let count = 0;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (trimmed === "" || trimmed.startsWith("#")) continue;

    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    if (key === "" || !VALID_KEY.test(key)) continue;

    let value = trimmed.slice(eqIndex + 1);

    if (
      (value.startsWith('"') && value.includes('"', 1)) ||
      (value.startsWith("'") && value.includes("'", 1))
    ) {
      const quote = value[0]!;
      const closingIndex = value.indexOf(quote, 1);
      if (closingIndex !== -1) {
        value = value.slice(1, closingIndex);
      }
    } else {
      const commentIndex = value.indexOf(" #");
      if (commentIndex !== -1) {
        value = value.slice(0, commentIndex);
      }
      value = value.trim();
    }

    // Don't override existing env vars, and protect system vars
    if (process.env[key] === undefined && !PROTECTED_KEYS.has(key)) {
      process.env[key] = value;
      count++;
    }
  }

  return count;
};

// -- Exports ------------------------------------------------------------

export const EnvFunctions: Record<string, BuiltinHandler> = {
  get,
  set,
  has,
  all,
  delete: del,
  secret,
  load,
};

export const EnvFunctionMetadata: Record<string, FunctionMetadata> = {
  get: {
    description: "Get the value of an environment variable",
    parameters: [
      {
        name: "name",
        dataType: "string",
        description: "Name of the environment variable",
        formInputType: "text",
        required: true,
      },
      {
        name: "defaultValue",
        dataType: "string",
        description: "Default value if the variable is not set",
        formInputType: "text",
        required: false,
      },
    ],
    returnType: "string",
    returnDescription: "The environment variable value, the default value, or null if not set",
    example: 'env.get "NODE_ENV"',
  },
  set: {
    description: "Set an environment variable (protected system vars cannot be overwritten)",
    parameters: [
      {
        name: "name",
        dataType: "string",
        description: "Name of the environment variable (must match [A-Za-z_][A-Za-z0-9_]*)",
        formInputType: "text",
        required: true,
      },
      {
        name: "value",
        dataType: "string",
        description: "Value to set",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the variable was set",
    example: 'env.set "API_URL" "https://api.example.com"',
  },
  has: {
    description: "Check if an environment variable exists",
    parameters: [
      {
        name: "name",
        dataType: "string",
        description: "Name of the environment variable",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the variable exists, false otherwise",
    example: 'env.has "NODE_ENV"',
  },
  all: {
    description: "Get all environment variables (sensitive values are redacted by default)",
    parameters: [
      {
        name: "showSensitive",
        dataType: "boolean",
        description: "Pass true to show sensitive values unredacted (default: false)",
        formInputType: "text",
        required: false,
      },
    ],
    returnType: "object",
    returnDescription: "Object with all environment variable key-value pairs (secrets shown as ***)",
    example: "env.all",
  },
  delete: {
    description: "Delete an environment variable (protected system vars cannot be deleted)",
    parameters: [
      {
        name: "name",
        dataType: "string",
        description: "Name of the environment variable to delete",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the variable was deleted",
    example: 'env.delete "OLD_KEY"',
  },
  secret: {
    description: "Mark an environment variable as sensitive (will be redacted in env.all output)",
    parameters: [
      {
        name: "name",
        dataType: "string",
        description: "Name of the environment variable to mark as sensitive",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if marked",
    example: 'env.secret "SMTP_PASS"',
  },
  load: {
    description: "Load environment variables from a .env file (won't override existing or protected vars)",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "Path to the .env file",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "Number of new variables loaded",
    example: 'env.load ".env"',
  },
};

export const EnvModuleMetadata: ModuleMetadata = {
  description: "Secure environment variable management with sensitive value redaction and protected system vars",
  methods: ["get", "set", "has", "all", "delete", "secret", "load"],
};
