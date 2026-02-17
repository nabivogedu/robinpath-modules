import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

// -- Cache Store ------------------------------------------------------------

interface CacheEntry {
  value: unknown;
  expiresAt: number | null;
}

const store = new Map<string, CacheEntry>();

// -- Helpers ----------------------------------------------------------------

function isExpired(entry: CacheEntry): boolean {
  return entry.expiresAt !== null && Date.now() > entry.expiresAt;
}

function getNonExpiredKeys(): string[] {
  const result: string[] = [];
  for (const [key, entry] of store) {
    if (isExpired(entry)) {
      store.delete(key);
    } else {
      result.push(key);
    }
  }
  return result;
}

// -- RobinPath Function Handlers --------------------------------------------

const set: BuiltinHandler = (args) => {
  const key = String(args[0] ?? "");
  const value = args[1];
  const ttl = args[2] != null ? Number(args[2]) : null;
  const expiresAt = ttl != null && ttl > 0 ? Date.now() + ttl * 1000 : null;
  store.set(key, { value, expiresAt });
  return true;
};

const get: BuiltinHandler = (args) => {
  const key = String(args[0] ?? "");
  const defaultValue = args[1] !== undefined ? args[1] : null;
  const entry = store.get(key);
  if (!entry) return defaultValue;
  if (isExpired(entry)) {
    store.delete(key);
    return defaultValue;
  }
  return entry.value;
};

const has: BuiltinHandler = (args) => {
  const key = String(args[0] ?? "");
  const entry = store.get(key);
  if (!entry) return false;
  if (isExpired(entry)) {
    store.delete(key);
    return false;
  }
  return true;
};

const del: BuiltinHandler = (args) => {
  const key = String(args[0] ?? "");
  store.delete(key);
  return true;
};

const clear: BuiltinHandler = () => {
  store.clear();
  return true;
};

const keys: BuiltinHandler = () => {
  return getNonExpiredKeys();
};

const values: BuiltinHandler = () => {
  const result: unknown[] = [];
  for (const [key, entry] of store) {
    if (isExpired(entry)) {
      store.delete(key);
    } else {
      result.push(entry.value);
    }
  }
  return result;
};

const size: BuiltinHandler = () => {
  return getNonExpiredKeys().length;
};

const ttl: BuiltinHandler = (args) => {
  const key = String(args[0] ?? "");
  const entry = store.get(key);
  if (!entry) return null;
  if (isExpired(entry)) {
    store.delete(key);
    return null;
  }
  if (entry.expiresAt === null) return -1;
  return Math.max(0, Math.round((entry.expiresAt - Date.now()) / 1000));
};

const setMany: BuiltinHandler = (args) => {
  const pairs = args[0];
  const ttlSeconds = args[1] != null ? Number(args[1]) : null;
  const expiresAt = ttlSeconds != null && ttlSeconds > 0 ? Date.now() + ttlSeconds * 1000 : null;
  if (pairs == null || typeof pairs !== "object" || Array.isArray(pairs)) return 0;
  let count = 0;
  for (const [key, value] of Object.entries(pairs as Record<string, unknown>)) {
    store.set(key, { value, expiresAt });
    count++;
  }
  return count;
};

const getMany: BuiltinHandler = (args) => {
  const keysArr = args[0];
  if (!Array.isArray(keysArr)) return {};
  const result: Record<string, unknown> = {};
  for (const k of keysArr) {
    const key = String(k);
    const entry = store.get(key);
    if (!entry) continue;
    if (isExpired(entry)) {
      store.delete(key);
      continue;
    }
    result[key] = entry.value;
  }
  return result;
};

const deleteMany: BuiltinHandler = (args) => {
  const keysArr = args[0];
  if (!Array.isArray(keysArr)) return 0;
  let count = 0;
  for (const k of keysArr) {
    const key = String(k);
    if (store.has(key)) {
      store.delete(key);
      count++;
    }
  }
  return count;
};

// -- Exports ----------------------------------------------------------------

export const CacheFunctions: Record<string, BuiltinHandler> = {
  set,
  get,
  has,
  "delete": del,
  clear,
  keys,
  values,
  size,
  ttl,
  setMany,
  getMany,
  deleteMany,
};

export const CacheFunctionMetadata = {
  set: {
    description: "Store a value in the cache with an optional TTL",
    parameters: [
      {
        name: "key",
        dataType: "string",
        description: "Cache key to store the value under",
        formInputType: "text",
        required: true,
      },
      {
        name: "value",
        dataType: "any",
        description: "Value to store in the cache",
        formInputType: "text",
        required: true,
      },
      {
        name: "ttl",
        dataType: "number",
        description: "Time-to-live in seconds (omit or null for no expiry)",
        formInputType: "number",
        required: false,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the value was stored",
    example: 'cache.set "user:1" "Alice" 60',
  },
  get: {
    description: "Retrieve a value from the cache by key",
    parameters: [
      {
        name: "key",
        dataType: "string",
        description: "Cache key to look up",
        formInputType: "text",
        required: true,
      },
      {
        name: "defaultValue",
        dataType: "any",
        description: "Value to return if the key is not found or expired",
        formInputType: "text",
        required: false,
      },
    ],
    returnType: "any",
    returnDescription: "The cached value, the default value, or null if not found",
    example: 'cache.get "user:1" "unknown"',
  },
  has: {
    description: "Check if a non-expired key exists in the cache",
    parameters: [
      {
        name: "key",
        dataType: "string",
        description: "Cache key to check",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the key exists and has not expired",
    example: 'cache.has "user:1"',
  },
  delete: {
    description: "Remove a key from the cache",
    parameters: [
      {
        name: "key",
        dataType: "string",
        description: "Cache key to delete",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the key was deleted",
    example: 'cache.delete "user:1"',
  },
  clear: {
    description: "Remove all entries from the cache",
    parameters: [],
    returnType: "boolean",
    returnDescription: "True if the cache was cleared",
    example: "cache.clear",
  },
  keys: {
    description: "Get all non-expired keys in the cache",
    parameters: [],
    returnType: "array",
    returnDescription: "Array of all non-expired cache keys",
    example: "cache.keys",
  },
  values: {
    description: "Get all non-expired values in the cache",
    parameters: [],
    returnType: "array",
    returnDescription: "Array of all non-expired cache values",
    example: "cache.values",
  },
  size: {
    description: "Get the number of non-expired entries in the cache",
    parameters: [],
    returnType: "number",
    returnDescription: "Count of non-expired cache entries",
    example: "cache.size",
  },
  ttl: {
    description: "Get the remaining time-to-live for a cache key",
    parameters: [
      {
        name: "key",
        dataType: "string",
        description: "Cache key to check TTL for",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "Remaining TTL in seconds, -1 if no expiry, or null if key does not exist",
    example: 'cache.ttl "user:1"',
  },
  setMany: {
    description: "Store multiple key-value pairs in the cache at once",
    parameters: [
      {
        name: "entries",
        dataType: "object",
        description: "Object of key-value pairs to store",
        formInputType: "json",
        required: true,
      },
      {
        name: "ttl",
        dataType: "number",
        description: "Time-to-live in seconds for all entries (omit or null for no expiry)",
        formInputType: "number",
        required: false,
      },
    ],
    returnType: "number",
    returnDescription: "Number of entries that were stored",
    example: 'cache.setMany {"a": 1, "b": 2} 120',
  },
  getMany: {
    description: "Retrieve multiple values from the cache by keys",
    parameters: [
      {
        name: "keys",
        dataType: "array",
        description: "Array of cache keys to look up",
        formInputType: "json",
        required: true,
      },
    ],
    returnType: "object",
    returnDescription: "Object of key-value pairs for found non-expired keys",
    example: 'cache.getMany ["a", "b", "c"]',
  },
  deleteMany: {
    description: "Remove multiple keys from the cache at once",
    parameters: [
      {
        name: "keys",
        dataType: "array",
        description: "Array of cache keys to delete",
        formInputType: "json",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "Number of entries that were deleted",
    example: 'cache.deleteMany ["a", "b"]',
  },
};

export const CacheModuleMetadata = {
  description: "In-memory key-value cache with optional TTL expiration for temporary data storage",
  methods: [
    "set",
    "get",
    "has",
    "delete",
    "clear",
    "keys",
    "values",
    "size",
    "ttl",
    "setMany",
    "getMany",
    "deleteMany",
  ],
};
