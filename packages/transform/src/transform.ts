import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

// ── Helpers ─────────────────────────────────────────────────────────

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc != null && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!;
    if (!(key in current) || typeof current[key] !== "object" || current[key] === null) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]!] = value;
}

function deepClone<T>(value: T): T {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(deepClone) as T;
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(value as Record<string, unknown>)) {
    result[key] = deepClone((value as Record<string, unknown>)[key]);
  }
  return result as T;
}

// ── Function Handlers ───────────────────────────────────────────────

const pick: BuiltinHandler = (args) => {
  const obj = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const keys = Array.isArray(args[1]) ? args[1].map(String) : String(args[1] ?? "").split(",").map((k) => k.trim()).filter(Boolean);

  const result: Record<string, unknown> = {};
  for (const key of keys) {
    const value = getNestedValue(obj, key);
    if (value !== undefined) {
      setNestedValue(result, key, value);
    }
  }
  return result;
};

const omit: BuiltinHandler = (args) => {
  const obj = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const keys = Array.isArray(args[1]) ? args[1].map(String) : String(args[1] ?? "").split(",").map((k) => k.trim()).filter(Boolean);

  const result = deepClone(obj);
  for (const key of keys) {
    if (key.includes(".")) {
      const parts = key.split(".");
      const last = parts.pop()!;
      const parent = getNestedValue(result, parts.join("."));
      if (parent && typeof parent === "object") {
        delete (parent as Record<string, unknown>)[last];
      }
    } else {
      delete result[key];
    }
  }
  return result;
};

const rename: BuiltinHandler = (args) => {
  const obj = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const mapping = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, string>;

  const result = deepClone(obj);
  for (const [oldKey, newKey] of Object.entries(mapping)) {
    if (oldKey in result) {
      result[newKey] = result[oldKey];
      delete result[oldKey];
    }
  }
  return result;
};

const mapValues: BuiltinHandler = (args) => {
  const obj = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const mapping = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, string>;

  const result = deepClone(obj);
  for (const [key, expression] of Object.entries(mapping)) {
    const value = getNestedValue(result, key);
    if (typeof expression === "string") {
      // Simple transformations
      switch (expression) {
        case "toString": setNestedValue(result, key, String(value)); break;
        case "toNumber": setNestedValue(result, key, Number(value)); break;
        case "toBoolean": setNestedValue(result, key, Boolean(value)); break;
        case "toUpperCase": setNestedValue(result, key, String(value).toUpperCase()); break;
        case "toLowerCase": setNestedValue(result, key, String(value).toLowerCase()); break;
        case "trim": setNestedValue(result, key, String(value).trim()); break;
        case "toArray": setNestedValue(result, key, Array.isArray(value) ? value : [value]); break;
        case "toJSON": setNestedValue(result, key, JSON.stringify(value)); break;
        case "fromJSON": setNestedValue(result, key, JSON.parse(String(value))); break;
        default: break;
      }
    }
  }
  return result;
};

const coerce: BuiltinHandler = (args) => {
  const value = args[0];
  const targetType = String(args[1] ?? "string");

  switch (targetType) {
    case "string": return String(value ?? "");
    case "number": {
      const n = Number(value);
      if (isNaN(n)) throw new Error(`Cannot coerce "${value}" to number`);
      return n;
    }
    case "boolean": {
      if (value === "true" || value === "1" || value === 1 || value === true) return true;
      if (value === "false" || value === "0" || value === 0 || value === false || value === null || value === undefined || value === "") return false;
      return Boolean(value);
    }
    case "integer": {
      const i = parseInt(String(value), 10);
      if (isNaN(i)) throw new Error(`Cannot coerce "${value}" to integer`);
      return i;
    }
    case "float": {
      const f = parseFloat(String(value));
      if (isNaN(f)) throw new Error(`Cannot coerce "${value}" to float`);
      return f;
    }
    case "array": return Array.isArray(value) ? value : [value];
    case "json": return JSON.stringify(value);
    case "object": {
      if (typeof value === "string") return JSON.parse(value);
      if (typeof value === "object" && value !== null) return value;
      return { value };
    }
    default:
      throw new Error(`Unknown target type: ${targetType}`);
  }
};

const flatten: BuiltinHandler = (args) => {
  const obj = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const separator = String(args[1] ?? ".");

  const result: Record<string, unknown> = {};

  function recurse(current: unknown, prefix: string): void {
    if (current === null || current === undefined) {
      result[prefix] = current;
      return;
    }
    if (Array.isArray(current)) {
      for (let i = 0; i < current.length; i++) {
        recurse(current[i], prefix ? `${prefix}${separator}${i}` : String(i));
      }
      if (current.length === 0) result[prefix] = [];
      return;
    }
    if (typeof current === "object") {
      const keys = Object.keys(current as Record<string, unknown>);
      for (const key of keys) {
        recurse((current as Record<string, unknown>)[key], prefix ? `${prefix}${separator}${key}` : key);
      }
      if (keys.length === 0) result[prefix] = {};
      return;
    }
    result[prefix] = current;
  }

  recurse(obj, "");
  return result;
};

const unflatten: BuiltinHandler = (args) => {
  const obj = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const separator = String(args[1] ?? ".");

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    setNestedValue(result, key.split(separator).join("."), value);
  }
  return result;
};

const merge: BuiltinHandler = (args) => {
  const objects = args.filter((a) => typeof a === "object" && a !== null) as Record<string, unknown>[];
  if (objects.length === 0) return {};

  function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
    const result = { ...target };
    for (const [key, value] of Object.entries(source)) {
      if (value && typeof value === "object" && !Array.isArray(value) && typeof result[key] === "object" && result[key] !== null && !Array.isArray(result[key])) {
        result[key] = deepMerge(result[key] as Record<string, unknown>, value as Record<string, unknown>);
      } else {
        result[key] = deepClone(value);
      }
    }
    return result;
  }

  return objects.reduce((acc, obj) => deepMerge(acc, obj));
};

const defaults: BuiltinHandler = (args) => {
  const obj = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const defaultValues = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const result = deepClone(obj);
  for (const [key, value] of Object.entries(defaultValues)) {
    if (!(key in result) || result[key] === undefined || result[key] === null) {
      result[key] = deepClone(value);
    }
  }
  return result;
};

const template: BuiltinHandler = (args) => {
  const templateStr = String(args[0] ?? "");
  const data = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  return templateStr.replace(/\{\{([^}]+)\}\}/g, (_, path: string) => {
    const value = getNestedValue(data, path.trim());
    return value != null ? String(value) : "";
  });
};

const group: BuiltinHandler = (args) => {
  const arr = Array.isArray(args[0]) ? args[0] : [];
  const key = String(args[1] ?? "");

  const result: Record<string, unknown[]> = {};
  for (const item of arr) {
    const value = typeof item === "object" && item !== null ? String((item as Record<string, unknown>)[key] ?? "undefined") : "undefined";
    if (!result[value]) result[value] = [];
    result[value].push(item);
  }
  return result;
};

const pipeline: BuiltinHandler = (args) => {
  let data = args[0];
  const steps = Array.isArray(args[1]) ? args[1] : [];

  for (const step of steps) {
    if (typeof step === "object" && step !== null) {
      const s = step as Record<string, unknown>;
      const action = String(s.action ?? "");
      const params = s.params;

      switch (action) {
        case "pick": data = pick([data, params]); break;
        case "omit": data = omit([data, params]); break;
        case "rename": data = rename([data, params]); break;
        case "flatten": data = flatten([data, params]); break;
        case "unflatten": data = unflatten([data, params]); break;
        case "merge": data = merge([data, params]); break;
        case "defaults": data = defaults([data, params]); break;
        case "coerce": {
          const p = params as Record<string, string>;
          if (p && typeof p === "object") {
            const obj = data as Record<string, unknown>;
            for (const [k, type] of Object.entries(p)) {
              if (k in obj) obj[k] = coerce([obj[k], type]);
            }
          }
          break;
        }
        default: break;
      }
    }
  }
  return data;
};

const mapArray: BuiltinHandler = (args) => {
  const arr = Array.isArray(args[0]) ? args[0] : [];
  const mapping = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, string>;

  return arr.map((item) => {
    if (typeof item !== "object" || item === null) return item;
    const obj = item as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    for (const [targetKey, sourceKey] of Object.entries(mapping)) {
      result[targetKey] = getNestedValue(obj, sourceKey);
    }
    return result;
  });
};

const filter: BuiltinHandler = (args) => {
  const arr = Array.isArray(args[0]) ? args[0] : [];
  const conditions = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  return arr.filter((item) => {
    if (typeof item !== "object" || item === null) return false;
    const obj = item as Record<string, unknown>;
    for (const [key, expected] of Object.entries(conditions)) {
      const actual = getNestedValue(obj, key);
      if (actual !== expected) return false;
    }
    return true;
  });
};

const sort: BuiltinHandler = (args) => {
  const arr = Array.isArray(args[0]) ? [...args[0]] : [];
  const key = String(args[1] ?? "");
  const order = String(args[2] ?? "asc");

  return arr.sort((a, b) => {
    const aVal = typeof a === "object" && a !== null ? getNestedValue(a as Record<string, unknown>, key) : a;
    const bVal = typeof b === "object" && b !== null ? getNestedValue(b as Record<string, unknown>, key) : b;

    let cmp = 0;
    if (typeof aVal === "number" && typeof bVal === "number") {
      cmp = aVal - bVal;
    } else {
      cmp = String(aVal ?? "").localeCompare(String(bVal ?? ""));
    }
    return order === "desc" ? -cmp : cmp;
  });
};

// ── Exports ─────────────────────────────────────────────────────────

export const TransformFunctions: Record<string, BuiltinHandler> = {
  pick, omit, rename, mapValues, coerce, flatten, unflatten, merge, defaults, template, group, pipeline, mapArray, filter, sort,
};

export const TransformFunctionMetadata: Record<string, FunctionMetadata> = {
  pick: {
    description: "Pick specific keys from an object (supports nested paths with dot notation)",
    parameters: [
      { name: "object", dataType: "object", description: "Source object", formInputType: "text", required: true },
      { name: "keys", dataType: "array", description: "Array of key names or comma-separated string", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "New object with only the specified keys",
    example: 'transform.pick $data ["name", "email", "address.city"]',
  },
  omit: {
    description: "Create a copy of an object with specific keys removed",
    parameters: [
      { name: "object", dataType: "object", description: "Source object", formInputType: "text", required: true },
      { name: "keys", dataType: "array", description: "Array of key names to remove", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "New object without the specified keys",
    example: 'transform.omit $data ["password", "secret"]',
  },
  rename: {
    description: "Rename keys in an object",
    parameters: [
      { name: "object", dataType: "object", description: "Source object", formInputType: "text", required: true },
      { name: "mapping", dataType: "object", description: "Old-to-new key name mapping", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Object with renamed keys",
    example: 'transform.rename $data {"firstName": "first_name", "lastName": "last_name"}',
  },
  mapValues: {
    description: "Apply transformations to specific values in an object",
    parameters: [
      { name: "object", dataType: "object", description: "Source object", formInputType: "text", required: true },
      { name: "mapping", dataType: "object", description: "Key-to-transform mapping (toString, toNumber, toBoolean, toUpperCase, toLowerCase, trim, toArray, toJSON, fromJSON)", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Object with transformed values",
    example: 'transform.mapValues $data {"age": "toNumber", "name": "trim"}',
  },
  coerce: {
    description: "Coerce a value to a target type",
    parameters: [
      { name: "value", dataType: "any", description: "Value to coerce", formInputType: "text", required: true },
      { name: "type", dataType: "string", description: "Target type: string, number, boolean, integer, float, array, json, object", formInputType: "text", required: true },
    ],
    returnType: "any",
    returnDescription: "The coerced value",
    example: 'transform.coerce "42" "number"',
  },
  flatten: {
    description: "Flatten a nested object into a single level with dot-notation keys",
    parameters: [
      { name: "object", dataType: "object", description: "Nested object", formInputType: "text", required: true },
      { name: "separator", dataType: "string", description: "Key separator (default '.')", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Flat object with concatenated key paths",
    example: 'transform.flatten $nestedData "."',
  },
  unflatten: {
    description: "Unflatten a dot-notation object back into a nested structure",
    parameters: [
      { name: "object", dataType: "object", description: "Flat object with dot-notation keys", formInputType: "text", required: true },
      { name: "separator", dataType: "string", description: "Key separator (default '.')", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Nested object",
    example: 'transform.unflatten {"user.name": "Alice", "user.age": 30}',
  },
  merge: {
    description: "Deep merge multiple objects (later objects override earlier ones)",
    parameters: [
      { name: "objects", dataType: "any", description: "Two or more objects to merge", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Deep-merged result",
    example: "transform.merge $defaults $userConfig $overrides",
  },
  defaults: {
    description: "Fill in missing/null/undefined keys from default values",
    parameters: [
      { name: "object", dataType: "object", description: "Source object", formInputType: "text", required: true },
      { name: "defaults", dataType: "object", description: "Default values to fill in", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Object with defaults applied for missing keys",
    example: 'transform.defaults $config {"port": 3000, "host": "localhost"}',
  },
  template: {
    description: "Render a template string with {{key}} placeholders replaced by data values",
    parameters: [
      { name: "template", dataType: "string", description: "Template with {{key}} placeholders", formInputType: "text", required: true },
      { name: "data", dataType: "object", description: "Data object for placeholder values", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Rendered string with placeholders replaced",
    example: 'transform.template "Hello {{name}}, you have {{count}} items" $data',
  },
  group: {
    description: "Group an array of objects by a key value",
    parameters: [
      { name: "array", dataType: "array", description: "Array of objects", formInputType: "text", required: true },
      { name: "key", dataType: "string", description: "Key to group by", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Object where keys are group values and values are arrays of matching items",
    example: 'transform.group $users "role"',
  },
  pipeline: {
    description: "Apply a series of transformation steps to data",
    parameters: [
      { name: "data", dataType: "any", description: "Input data", formInputType: "text", required: true },
      { name: "steps", dataType: "array", description: "Array of {action, params} step objects", formInputType: "text", required: true },
    ],
    returnType: "any",
    returnDescription: "The transformed data after all steps",
    example: 'transform.pipeline $data [{"action": "pick", "params": ["name","email"]}, {"action": "rename", "params": {"name": "fullName"}}]',
  },
  mapArray: {
    description: "Map an array of objects to a new shape by specifying target-to-source key mapping",
    parameters: [
      { name: "array", dataType: "array", description: "Array of source objects", formInputType: "text", required: true },
      { name: "mapping", dataType: "object", description: "Target key to source key mapping", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of reshaped objects",
    example: 'transform.mapArray $users {"fullName": "name", "mail": "email"}',
  },
  filter: {
    description: "Filter an array of objects by matching key-value conditions",
    parameters: [
      { name: "array", dataType: "array", description: "Array of objects", formInputType: "text", required: true },
      { name: "conditions", dataType: "object", description: "Key-value pairs that must match", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Filtered array of matching objects",
    example: 'transform.filter $users {"role": "admin", "active": true}',
  },
  sort: {
    description: "Sort an array of objects by a key",
    parameters: [
      { name: "array", dataType: "array", description: "Array of objects", formInputType: "text", required: true },
      { name: "key", dataType: "string", description: "Key to sort by", formInputType: "text", required: true },
      { name: "order", dataType: "string", description: "'asc' or 'desc' (default 'asc')", formInputType: "text", required: false },
    ],
    returnType: "array",
    returnDescription: "Sorted array",
    example: 'transform.sort $users "name" "asc"',
  },
};

export const TransformModuleMetadata: ModuleMetadata = {
  description: "Data transformation and mapping utilities: pick, omit, rename, coerce, flatten, merge, pipeline, and more",
  methods: ["pick", "omit", "rename", "mapValues", "coerce", "flatten", "unflatten", "merge", "defaults", "template", "group", "pipeline", "mapArray", "filter", "sort"],
};
