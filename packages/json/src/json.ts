import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

function resolvePath(obj: unknown, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

function setPath(obj: unknown, path: string, value: unknown): unknown {
  const clone = JSON.parse(JSON.stringify(obj));
  const keys = path.split(".");
  let current = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!;
    if (current[key] == null || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]!] = value;
  return clone;
}

function deepMerge(target: Record<string, unknown>, ...sources: Record<string, unknown>[]): Record<string, unknown> {
  const result = { ...target };
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      const targetVal = result[key];
      const sourceVal = source[key];
      if (targetVal && sourceVal && typeof targetVal === "object" && typeof sourceVal === "object" && !Array.isArray(targetVal) && !Array.isArray(sourceVal)) {
        result[key] = deepMerge(targetVal as Record<string, unknown>, sourceVal as Record<string, unknown>);
      } else {
        result[key] = sourceVal;
      }
    }
  }
  return result;
}

function flattenObj(obj: unknown, prefix = ""): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  if (obj == null || typeof obj !== "object" || Array.isArray(obj)) return result;
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenObj(value, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

function unflattenObj(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const keys = key.split(".");
    let current: Record<string, unknown> = result;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i]!;
      if (!current[k] || typeof current[k] !== "object") current[k] = {};
      current = current[k] as Record<string, unknown>;
    }
    current[keys[keys.length - 1]!] = value;
  }
  return result;
}

function diffObjects(a: unknown, b: unknown, path = ""): Array<{ path: string; oldValue: unknown; newValue: unknown }> {
  const diffs: Array<{ path: string; oldValue: unknown; newValue: unknown }> = [];
  const aObj = a as Record<string, unknown>;
  const bObj = b as Record<string, unknown>;
  const allKeys = new Set([...Object.keys(aObj ?? {}), ...Object.keys(bObj ?? {})]);
  for (const key of allKeys) {
    const fullPath = path ? `${path}.${key}` : key;
    const aVal = aObj?.[key];
    const bVal = bObj?.[key];
    if (aVal && bVal && typeof aVal === "object" && typeof bVal === "object" && !Array.isArray(aVal) && !Array.isArray(bVal)) {
      diffs.push(...diffObjects(aVal, bVal, fullPath));
    } else if (JSON.stringify(aVal) !== JSON.stringify(bVal)) {
      diffs.push({ path: fullPath, oldValue: aVal, newValue: bVal });
    }
  }
  return diffs;
}

function collectKeys(obj: unknown, prefix = ""): string[] {
  const keys: string[] = [];
  if (obj == null || typeof obj !== "object" || Array.isArray(obj)) return keys;
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    keys.push(fullKey);
    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...collectKeys(value, fullKey));
    }
  }
  return keys;
}

// ── Handlers ────────────────────────────────────────────────────────

const parse: BuiltinHandler = (args) => JSON.parse(String(args[0] ?? ""));

const stringify: BuiltinHandler = (args) => {
  const indent = args[1] != null ? Number(args[1]) : 2;
  return JSON.stringify(args[0], null, indent);
};

const get: BuiltinHandler = (args) => resolvePath(args[0], String(args[1] ?? ""));

const set: BuiltinHandler = (args) => setPath(args[0], String(args[1] ?? ""), args[2]);

const merge: BuiltinHandler = (args) => {
  const objects = args.filter((a) => a && typeof a === "object") as Record<string, unknown>[];
  if (objects.length === 0) return {};
  return objects.reduce((acc, obj) => deepMerge(acc, obj));
};

const flatten: BuiltinHandler = (args) => flattenObj(args[0]);

const unflatten: BuiltinHandler = (args) => unflattenObj(args[0] as Record<string, unknown>);

const diff: BuiltinHandler = (args) => diffObjects(args[0], args[1]);

const clone: BuiltinHandler = (args) => JSON.parse(JSON.stringify(args[0]));

const isValid: BuiltinHandler = (args) => {
  try { JSON.parse(String(args[0] ?? "")); return true; } catch { return false; }
};

const keys: BuiltinHandler = (args) => collectKeys(args[0]);

const pick: BuiltinHandler = (args) => {
  const obj = args[0] as Record<string, unknown>;
  const pickKeys = args[1] as string[];
  if (!obj || !Array.isArray(pickKeys)) return {};
  const result: Record<string, unknown> = {};
  for (const key of pickKeys) { if (key in obj) result[key] = obj[key]; }
  return result;
};

const omit: BuiltinHandler = (args) => {
  const obj = args[0] as Record<string, unknown>;
  const omitKeys = new Set(args[1] as string[]);
  if (!obj || !omitKeys.size) return { ...obj };
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) { if (!omitKeys.has(key)) result[key] = value; }
  return result;
};

export const JsonFunctions: Record<string, BuiltinHandler> = {
  parse, stringify, get, set, merge, flatten, unflatten, diff, clone, isValid, keys, pick, omit,
};

export const JsonFunctionMetadata: Record<string, FunctionMetadata> = {
  parse: { description: "Parse a JSON string into an object", parameters: [{ name: "jsonString", dataType: "string", description: "JSON string to parse", formInputType: "textarea", required: true }], returnType: "object", returnDescription: "Parsed JavaScript value", example: 'json.parse \'{"name":"Alice"}\'' },
  stringify: { description: "Convert a value to a JSON string", parameters: [{ name: "value", dataType: "any", description: "Value to stringify", formInputType: "json", required: true }, { name: "indent", dataType: "number", description: "Indentation spaces (default: 2)", formInputType: "number", required: false, defaultValue: "2" }], returnType: "string", returnDescription: "JSON string", example: "json.stringify $obj" },
  get: { description: "Get a nested value by dot-separated path", parameters: [{ name: "obj", dataType: "object", description: "Source object", formInputType: "json", required: true }, { name: "path", dataType: "string", description: "Dot-separated path (e.g. user.name)", formInputType: "text", required: true }], returnType: "any", returnDescription: "Value at the path", example: 'json.get $obj "user.name"' },
  set: { description: "Set a nested value by dot-separated path, returning a new object", parameters: [{ name: "obj", dataType: "object", description: "Source object", formInputType: "json", required: true }, { name: "path", dataType: "string", description: "Dot-separated path", formInputType: "text", required: true }, { name: "value", dataType: "any", description: "Value to set", formInputType: "text", required: true }], returnType: "object", returnDescription: "New object with the value set", example: 'json.set $obj "user.name" "Bob"' },
  merge: { description: "Deep merge two or more objects", parameters: [{ name: "objects", dataType: "object", description: "Objects to merge (pass multiple args)", formInputType: "json", required: true }], returnType: "object", returnDescription: "Merged object", example: "json.merge $obj1 $obj2" },
  flatten: { description: "Flatten a nested object to dot-notation keys", parameters: [{ name: "obj", dataType: "object", description: "Object to flatten", formInputType: "json", required: true }], returnType: "object", returnDescription: "Flat object with dot-notation keys", example: "json.flatten $obj" },
  unflatten: { description: "Unflatten dot-notation keys back to a nested object", parameters: [{ name: "obj", dataType: "object", description: "Flat object with dot-notation keys", formInputType: "json", required: true }], returnType: "object", returnDescription: "Nested object", example: "json.unflatten $flat" },
  diff: { description: "Compare two objects and return differences", parameters: [{ name: "a", dataType: "object", description: "First object", formInputType: "json", required: true }, { name: "b", dataType: "object", description: "Second object", formInputType: "json", required: true }], returnType: "array", returnDescription: "Array of {path, oldValue, newValue}", example: "json.diff $obj1 $obj2" },
  clone: { description: "Deep clone an object", parameters: [{ name: "obj", dataType: "any", description: "Value to clone", formInputType: "json", required: true }], returnType: "any", returnDescription: "Deep cloned value", example: "json.clone $obj" },
  isValid: { description: "Check if a string is valid JSON", parameters: [{ name: "str", dataType: "string", description: "String to check", formInputType: "textarea", required: true }], returnType: "boolean", returnDescription: "True if valid JSON", example: 'json.isValid \'{"a":1}\'' },
  keys: { description: "Get all keys including nested paths with dot notation", parameters: [{ name: "obj", dataType: "object", description: "Source object", formInputType: "json", required: true }], returnType: "array", returnDescription: "Array of all key paths", example: "json.keys $obj" },
  pick: { description: "Pick specific keys from an object", parameters: [{ name: "obj", dataType: "object", description: "Source object", formInputType: "json", required: true }, { name: "keys", dataType: "array", description: "Array of keys to pick", formInputType: "json", required: true }], returnType: "object", returnDescription: "Object with only picked keys", example: 'json.pick $obj ["name", "age"]' },
  omit: { description: "Omit specific keys from an object", parameters: [{ name: "obj", dataType: "object", description: "Source object", formInputType: "json", required: true }, { name: "keys", dataType: "array", description: "Array of keys to omit", formInputType: "json", required: true }], returnType: "object", returnDescription: "Object without omitted keys", example: 'json.omit $obj ["password"]' },
};

export const JsonModuleMetadata: ModuleMetadata = {
  description: "JSON manipulation: parse, stringify, deep merge, flatten, unflatten, diff, query by path, pick, and omit",
  methods: ["parse", "stringify", "get", "set", "merge", "flatten", "unflatten", "diff", "clone", "isValid", "keys", "pick", "omit"],
};
