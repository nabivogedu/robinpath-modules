import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { readFileSync, existsSync } from "node:fs";

const configs = new Map<string, Record<string, unknown>>();

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (value !== null && typeof value === "object" && !Array.isArray(value) && typeof result[key] === "object" && result[key] !== null && !Array.isArray(result[key])) {
      result[key] = deepMerge(result[key] as Record<string, unknown>, value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }
  return result;
}

function getByPath(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

function setByPath(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const parts = path.split(".");
  const result = { ...obj };
  let current: Record<string, unknown> = result;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]!;
    if (typeof current[part] !== "object" || current[part] === null) current[part] = {};
    current[part] = { ...(current[part] as Record<string, unknown>) };
    current = current[part] as Record<string, unknown>;
  }
  current[parts[parts.length - 1]!] = value;
  return result;
}

const create: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const defaults = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  configs.set(name, { ...defaults });
  return configs.get(name)!;
};

const load: BuiltinHandler = (args) => {
  const filePath = String(args[0] ?? "");
  const name = String(args[1] ?? "default");
  if (!existsSync(filePath)) return null;
  const content = readFileSync(filePath, "utf-8").trim();
  let data: Record<string, unknown>;
  if (filePath.endsWith(".json")) {
    data = JSON.parse(content);
  } else if (filePath.endsWith(".env")) {
    data = {};
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 0) continue;
      const key = trimmed.substring(0, eq).trim();
      let val = trimmed.substring(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
      data[key] = val;
    }
  } else {
    data = JSON.parse(content);
  }
  const existing = configs.get(name) ?? {};
  configs.set(name, deepMerge(existing, data));
  return configs.get(name)!;
};

const loadEnv: BuiltinHandler = (args) => {
  const prefix = String(args[0] ?? "");
  const name = String(args[1] ?? "default");
  const existing = configs.get(name) ?? {};
  const envVars: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (prefix && !key.startsWith(prefix)) continue;
    const configKey = prefix ? key.substring(prefix.length) : key;
    if (value !== undefined) envVars[configKey.toLowerCase().replace(/__/g, ".").replace(/_/g, "")] = value;
  }
  configs.set(name, deepMerge(existing, envVars));
  return configs.get(name)!;
};

const get: BuiltinHandler = (args) => {
  const path = String(args[0] ?? "");
  const defaultValue = args[1];
  const name = String(args[2] ?? "default");
  const config = configs.get(name);
  if (!config) return defaultValue ?? null;
  const value = getByPath(config, path);
  return value !== undefined ? value : (defaultValue ?? null);
};

const set: BuiltinHandler = (args) => {
  const path = String(args[0] ?? "");
  const value = args[1];
  const name = String(args[2] ?? "default");
  const config = configs.get(name) ?? {};
  configs.set(name, setByPath(config, path, value));
  return true;
};

const getAll: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  return configs.get(name) ?? {};
};

const merge: BuiltinHandler = (args) => {
  const data = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const name = String(args[1] ?? "default");
  const existing = configs.get(name) ?? {};
  configs.set(name, deepMerge(existing, data));
  return configs.get(name)!;
};

const has: BuiltinHandler = (args) => {
  const path = String(args[0] ?? "");
  const name = String(args[1] ?? "default");
  const config = configs.get(name);
  if (!config) return false;
  return getByPath(config, path) !== undefined;
};

const remove: BuiltinHandler = (args) => {
  const path = String(args[0] ?? "");
  const name = String(args[1] ?? "default");
  const config = configs.get(name);
  if (!config) return false;
  const parts = path.split(".");
  let current: Record<string, unknown> = config;
  for (let i = 0; i < parts.length - 1; i++) {
    const next = current[parts[i]!];
    if (typeof next !== "object" || next === null) return false;
    current = next as Record<string, unknown>;
  }
  delete current[parts[parts.length - 1]!];
  return true;
};

const clear: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  configs.delete(name);
  return true;
};

const listConfigs: BuiltinHandler = () => Array.from(configs.keys());

const validate: BuiltinHandler = (args) => {
  const required = (Array.isArray(args[0]) ? args[0] : []) as string[];
  const name = String(args[1] ?? "default");
  const config = configs.get(name) ?? {};
  const missing = required.filter((key) => getByPath(config, key) === undefined);
  return { valid: missing.length === 0, missing };
};

const freeze: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const config = configs.get(name);
  if (config) Object.freeze(config);
  return true;
};

const toEnv: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const prefix = String(args[1] ?? "");
  const config = configs.get(name) ?? {};
  function flatten(obj: Record<string, unknown>, path: string): string[] {
    const lines: string[] = [];
    for (const [k, v] of Object.entries(obj)) {
      const key = path ? `${path}_${k.toUpperCase()}` : k.toUpperCase();
      if (typeof v === "object" && v !== null && !Array.isArray(v)) lines.push(...flatten(v as Record<string, unknown>, key));
      else lines.push(`${prefix}${key}=${String(v)}`);
    }
    return lines;
  }
  return flatten(config, "").join("\n");
};

export const ConfigFunctions: Record<string, BuiltinHandler> = { create, load, loadEnv, get, set, getAll, merge, has, remove, clear, list: listConfigs, validate, freeze, toEnv };

export const ConfigFunctionMetadata: Record<string, FunctionMetadata> = {
  create: { description: "Create config with defaults", parameters: [{ name: "name", dataType: "string", description: "Config name", formInputType: "text", required: false }, { name: "defaults", dataType: "object", description: "Default values", formInputType: "text", required: false }], returnType: "object", returnDescription: "Config object", example: 'config.create "app" {"port": 3000, "debug": false}' },
  load: { description: "Load config from file (.json, .env)", parameters: [{ name: "filePath", dataType: "string", description: "Config file path", formInputType: "text", required: true }, { name: "name", dataType: "string", description: "Config name", formInputType: "text", required: false }], returnType: "object", returnDescription: "Merged config", example: 'config.load "./config.json"' },
  loadEnv: { description: "Load from environment variables", parameters: [{ name: "prefix", dataType: "string", description: "Env var prefix filter", formInputType: "text", required: false }, { name: "name", dataType: "string", description: "Config name", formInputType: "text", required: false }], returnType: "object", returnDescription: "Merged config", example: 'config.loadEnv "APP_"' },
  get: { description: "Get config value by dot path", parameters: [{ name: "path", dataType: "string", description: "Dot-separated path", formInputType: "text", required: true }, { name: "default", dataType: "any", description: "Default value", formInputType: "text", required: false }, { name: "name", dataType: "string", description: "Config name", formInputType: "text", required: false }], returnType: "any", returnDescription: "Config value", example: 'config.get "database.host" "localhost"' },
  set: { description: "Set config value by dot path", parameters: [{ name: "path", dataType: "string", description: "Dot-separated path", formInputType: "text", required: true }, { name: "value", dataType: "any", description: "Value", formInputType: "text", required: true }, { name: "name", dataType: "string", description: "Config name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'config.set "database.port" 5432' },
  getAll: { description: "Get entire config", parameters: [{ name: "name", dataType: "string", description: "Config name", formInputType: "text", required: false }], returnType: "object", returnDescription: "Full config", example: 'config.getAll' },
  merge: { description: "Deep merge into config", parameters: [{ name: "data", dataType: "object", description: "Data to merge", formInputType: "text", required: true }, { name: "name", dataType: "string", description: "Config name", formInputType: "text", required: false }], returnType: "object", returnDescription: "Merged config", example: 'config.merge {"database": {"port": 5432}}' },
  has: { description: "Check if path exists", parameters: [{ name: "path", dataType: "string", description: "Dot-separated path", formInputType: "text", required: true }, { name: "name", dataType: "string", description: "Config name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if exists", example: 'config.has "database.host"' },
  remove: { description: "Remove config key", parameters: [{ name: "path", dataType: "string", description: "Dot-separated path", formInputType: "text", required: true }, { name: "name", dataType: "string", description: "Config name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if removed", example: 'config.remove "debug"' },
  clear: { description: "Clear entire config", parameters: [{ name: "name", dataType: "string", description: "Config name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'config.clear' },
  list: { description: "List all config names", parameters: [], returnType: "array", returnDescription: "Config names", example: 'config.list' },
  validate: { description: "Validate required keys exist", parameters: [{ name: "required", dataType: "array", description: "Required dot paths", formInputType: "text", required: true }, { name: "name", dataType: "string", description: "Config name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{valid, missing}", example: 'config.validate ["database.host", "database.port"]' },
  freeze: { description: "Freeze config (immutable)", parameters: [{ name: "name", dataType: "string", description: "Config name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'config.freeze' },
  toEnv: { description: "Convert config to env format", parameters: [{ name: "name", dataType: "string", description: "Config name", formInputType: "text", required: false }, { name: "prefix", dataType: "string", description: "Key prefix", formInputType: "text", required: false }], returnType: "string", returnDescription: "Env-format string", example: 'config.toEnv "app" "APP_"' },
};

export const ConfigModuleMetadata: ModuleMetadata = {
  description: "Multi-source configuration management with deep merge, dot-path access, env loading, and validation",
  methods: ["create", "load", "loadEnv", "get", "set", "getAll", "merge", "has", "remove", "clear", "list", "validate", "freeze", "toEnv"],
};
