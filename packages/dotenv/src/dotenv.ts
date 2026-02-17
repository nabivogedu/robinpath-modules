import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, basename } from "node:path";

// -- Security: validation & protected keys ------------------------------

const VALID_KEY = /^[A-Za-z_][A-Za-z0-9_]*$/;
const PROTECTED_KEYS = new Set([
  "PATH", "HOME", "USER", "SHELL", "TERM", "LANG",
  "NODE_OPTIONS", "NODE_PATH", "LD_PRELOAD", "LD_LIBRARY_PATH",
  "DYLD_INSERT_LIBRARIES", "DYLD_LIBRARY_PATH",
]);

function validateKey(key: string): void {
  if (!key) throw new Error("Key cannot be empty");
  if (!VALID_KEY.test(key)) throw new Error(`Invalid key: "${key}". Must match /^[A-Za-z_][A-Za-z0-9_]*$/`);
}

function validateFilePath(filePath: string): string {
  const resolved = resolve(filePath);
  const base = basename(resolved);
  if (!base.startsWith(".env") && !base.endsWith(".env")) {
    throw new Error(`File path must be a .env file (got: "${base}"). Use files like .env, .env.local, production.env`);
  }
  return resolved;
}

// -- Parsing & serialization --------------------------------------------

function parseDotenv(content: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    if (!VALID_KEY.test(key)) continue;
    let value = trimmed.slice(eqIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    const commentIndex = value.indexOf(" #");
    if (commentIndex !== -1 && !trimmed.slice(eqIndex + 1).trim().startsWith('"')) {
      value = value.slice(0, commentIndex).trim();
    }
    result[key] = value;
  }
  return result;
}

function stringifyDotenv(obj: Record<string, string>): string {
  return Object.entries(obj).map(([key, value]) => {
    if (value.includes(" ") || value.includes('"') || value.includes("'") || value.includes("#")) {
      return `${key}="${value.replace(/"/g, '\\"')}"`;
    }
    return `${key}=${value}`;
  }).join("\n");
}

// -- Handlers -----------------------------------------------------------

const parse: BuiltinHandler = (args) => parseDotenv(String(args[0] ?? ""));

const stringify: BuiltinHandler = (args) => stringifyDotenv(args[0] as Record<string, string>);

const load: BuiltinHandler = (args) => {
  const filePath = validateFilePath(String(args[0] ?? ".env"));
  const override = args[1] === true;
  const content = readFileSync(filePath, "utf-8");
  const vars = parseDotenv(content);
  const loaded: Record<string, string> = {};
  for (const [key, value] of Object.entries(vars)) {
    if (PROTECTED_KEYS.has(key)) continue;
    if (!override && process.env[key] !== undefined) continue;
    process.env[key] = value;
    loaded[key] = value;
  }
  return loaded;
};

const read: BuiltinHandler = (args) => {
  const filePath = validateFilePath(String(args[0] ?? ".env"));
  return parseDotenv(readFileSync(filePath, "utf-8"));
};

const get: BuiltinHandler = (args) => {
  const filePath = validateFilePath(String(args[0] ?? ".env"));
  const key = String(args[1] ?? "");
  validateKey(key);
  const vars = parseDotenv(readFileSync(filePath, "utf-8"));
  return vars[key] ?? null;
};

const set: BuiltinHandler = (args) => {
  const filePath = validateFilePath(String(args[0] ?? ".env"));
  const key = String(args[1] ?? "");
  const value = String(args[2] ?? "");
  validateKey(key);
  let vars: Record<string, string> = {};
  if (existsSync(filePath)) {
    vars = parseDotenv(readFileSync(filePath, "utf-8"));
  }
  vars[key] = value;
  writeFileSync(filePath, stringifyDotenv(vars), "utf-8");
  return true;
};

const remove: BuiltinHandler = (args) => {
  const filePath = validateFilePath(String(args[0] ?? ".env"));
  const key = String(args[1] ?? "");
  validateKey(key);
  if (!existsSync(filePath)) return false;
  const vars = parseDotenv(readFileSync(filePath, "utf-8"));
  delete vars[key];
  writeFileSync(filePath, stringifyDotenv(vars), "utf-8");
  return true;
};

const exists: BuiltinHandler = (args) => existsSync(validateFilePath(String(args[0] ?? ".env")));

const keys: BuiltinHandler = (args) => {
  const filePath = validateFilePath(String(args[0] ?? ".env"));
  return Object.keys(parseDotenv(readFileSync(filePath, "utf-8")));
};

const expand: BuiltinHandler = (args) => {
  const vars = args[0] as Record<string, string>;
  const useProcessEnv = args[1] === true;
  const result: Record<string, string> = { ...vars };
  for (const [key, value] of Object.entries(result)) {
    result[key] = value.replace(/\$\{(\w+)\}/g, (_: any, ref: any) => {
      return result[ref] ?? (useProcessEnv ? (process.env[ref] ?? "") : "");
    });
  }
  return result;
};

// -- Exports ------------------------------------------------------------

export const DotenvFunctions: Record<string, BuiltinHandler> = {
  parse, stringify, load, read, get, set, remove, exists, keys, expand,
};

export const DotenvFunctionMetadata = {
  parse: { description: "Parse a .env format string into an object", parameters: [{ name: "content", dataType: "string", description: ".env format string", formInputType: "textarea", required: true }], returnType: "object", returnDescription: "Key-value object", example: 'dotenv.parse "KEY=value"' },
  stringify: { description: "Convert an object to .env format string", parameters: [{ name: "obj", dataType: "object", description: "Key-value object", formInputType: "json", required: true }], returnType: "string", returnDescription: ".env format string", example: "dotenv.stringify $vars" },
  load: { description: "Read a .env file and load values into process.env (won't override existing or protected vars by default)", parameters: [{ name: "filePath", dataType: "string", description: "Path to .env file (must be a .env file)", formInputType: "text", required: false, defaultValue: ".env" }, { name: "override", dataType: "boolean", description: "Set true to override existing vars (default: false)", formInputType: "text", required: false }], returnType: "object", returnDescription: "Actually loaded key-value pairs", example: 'dotenv.load ".env"' },
  read: { description: "Read a .env file and return as object without modifying process.env", parameters: [{ name: "filePath", dataType: "string", description: "Path to .env file", formInputType: "text", required: false, defaultValue: ".env" }], returnType: "object", returnDescription: "Key-value object", example: 'dotenv.read ".env.local"' },
  get: { description: "Get a value from a .env file by key", parameters: [{ name: "filePath", dataType: "string", description: "Path to .env file", formInputType: "text", required: true }, { name: "key", dataType: "string", description: "Key to look up", formInputType: "text", required: true }], returnType: "string", returnDescription: "Value or null", example: 'dotenv.get ".env" "DATABASE_URL"' },
  set: { description: "Set a key=value in a .env file", parameters: [{ name: "filePath", dataType: "string", description: "Path to .env file", formInputType: "text", required: true }, { name: "key", dataType: "string", description: "Key to set (must match [A-Za-z_][A-Za-z0-9_]*)", formInputType: "text", required: true }, { name: "value", dataType: "string", description: "Value to set", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True on success", example: 'dotenv.set ".env" "PORT" "3000"' },
  remove: { description: "Remove a key from a .env file", parameters: [{ name: "filePath", dataType: "string", description: "Path to .env file", formInputType: "text", required: true }, { name: "key", dataType: "string", description: "Key to remove", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True on success", example: 'dotenv.remove ".env" "OLD_KEY"' },
  exists: { description: "Check if a .env file exists", parameters: [{ name: "filePath", dataType: "string", description: "Path to check (must be a .env file)", formInputType: "text", required: false, defaultValue: ".env" }], returnType: "boolean", returnDescription: "True if exists", example: 'dotenv.exists ".env.local"' },
  keys: { description: "Return all keys from a .env file", parameters: [{ name: "filePath", dataType: "string", description: "Path to .env file", formInputType: "text", required: false, defaultValue: ".env" }], returnType: "array", returnDescription: "Array of key strings", example: 'dotenv.keys ".env"' },
  expand: { description: "Expand variable references like ${VAR} in values (process.env fallback disabled by default)", parameters: [{ name: "vars", dataType: "object", description: "Key-value object with variable references", formInputType: "json", required: true }, { name: "useProcessEnv", dataType: "boolean", description: "Allow fallback to process.env for unresolved vars (default: false)", formInputType: "text", required: false }], returnType: "object", returnDescription: "Object with expanded values", example: "dotenv.expand $vars" },
};

export const DotenvModuleMetadata = {
  description: "Secure .env file management with key validation, path restrictions, and protected system variables",
  methods: ["parse", "stringify", "load", "read", "get", "set", "remove", "exists", "keys", "expand"],
};
