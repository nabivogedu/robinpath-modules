import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";

// ── Internal State ──────────────────────────────────────────────────

interface Store {
  name: string;
  type: "memory" | "file";
  data: Map<string, { value: unknown; expiresAt?: number; createdAt: number; updatedAt: number }>;
  filePath?: string;
}

const stores = new Map<string, Store>();

function getStore(name: string): Store {
  const s = stores.get(name);
  if (!s) throw new Error(`Store "${name}" not found. Create it first.`);
  return s;
}

function cleanExpired(store: Store): void {
  const now = Date.now();
  for (const [key, entry] of store.data) {
    if (entry.expiresAt && entry.expiresAt <= now) {
      store.data.delete(key);
    }
  }
}

function persist(store: Store): void {
  if (store.type !== "file" || !store.filePath) return;
  const dir = dirname(store.filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const obj: Record<string, unknown> = {};
  for (const [key, entry] of store.data) {
    obj[key] = entry;
  }
  writeFileSync(store.filePath, JSON.stringify(obj, null, 2), "utf-8");
}

function loadFromFile(store: Store): void {
  if (store.type !== "file" || !store.filePath || !existsSync(store.filePath)) return;
  try {
    const raw = readFileSync(store.filePath, "utf-8");
    const obj = JSON.parse(raw) as Record<string, { value: unknown; expiresAt?: number; createdAt: number; updatedAt: number }>;
    for (const [key, entry] of Object.entries(obj)) {
      store.data.set(key, entry);
    }
  } catch { /* ignore corrupt files */ }
}

// ── Function Handlers ───────────────────────────────────────────────

const create: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const type = String(opts.type ?? "memory") as "memory" | "file";
  const filePath = opts.path ? String(opts.path) : undefined;

  const store: Store = { name, type, data: new Map(), filePath };
  if (type === "file" && filePath) loadFromFile(store);
  stores.set(name, store);
  return { name, type, size: store.data.size };
};

const set: BuiltinHandler = (args) => {
  const storeName = String(args[0] ?? "default");
  const key = String(args[1] ?? "");
  const value = args[2];
  const ttlMs = args[3] != null ? parseInt(String(args[3]), 10) : undefined;

  const store = getStore(storeName);
  const now = Date.now();
  store.data.set(key, {
    value,
    expiresAt: ttlMs ? now + ttlMs : undefined,
    createdAt: store.data.get(key)?.createdAt ?? now,
    updatedAt: now,
  });
  persist(store);
  return true;
};

const get: BuiltinHandler = (args) => {
  const storeName = String(args[0] ?? "default");
  const key = String(args[1] ?? "");
  const defaultValue = args[2];

  const store = getStore(storeName);
  cleanExpired(store);
  const entry = store.data.get(key);
  if (!entry) return defaultValue ?? null;
  return entry.value;
};

const has: BuiltinHandler = (args) => {
  const storeName = String(args[0] ?? "default");
  const key = String(args[1] ?? "");
  const store = getStore(storeName);
  cleanExpired(store);
  return store.data.has(key);
};

const remove: BuiltinHandler = (args) => {
  const storeName = String(args[0] ?? "default");
  const key = String(args[1] ?? "");
  const store = getStore(storeName);
  const deleted = store.data.delete(key);
  persist(store);
  return deleted;
};

const keys: BuiltinHandler = (args) => {
  const storeName = String(args[0] ?? "default");
  const pattern = args[1] != null ? String(args[1]) : undefined;
  const store = getStore(storeName);
  cleanExpired(store);
  const allKeys = [...store.data.keys()];
  if (!pattern) return allKeys;
  const regex = new RegExp(pattern.replace(/\*/g, ".*"));
  return allKeys.filter((k: any) => regex.test(k));
};

const values: BuiltinHandler = (args) => {
  const storeName = String(args[0] ?? "default");
  const store = getStore(storeName);
  cleanExpired(store);
  return [...store.data.entries()].map(([key, entry]) => ({ key, value: entry.value }));
};

const size: BuiltinHandler = (args) => {
  const storeName = String(args[0] ?? "default");
  const store = getStore(storeName);
  cleanExpired(store);
  return store.data.size;
};

const clear: BuiltinHandler = (args) => {
  const storeName = String(args[0] ?? "default");
  const store = getStore(storeName);
  const count = store.data.size;
  store.data.clear();
  persist(store);
  return { cleared: count };
};

const increment: BuiltinHandler = (args) => {
  const storeName = String(args[0] ?? "default");
  const key = String(args[1] ?? "");
  const amount = Number(args[2] ?? 1);
  const store = getStore(storeName);
  cleanExpired(store);
  const entry = store.data.get(key);
  const current = entry ? Number(entry.value ?? 0) : 0;
  const newValue = current + amount;
  const now = Date.now();
  store.data.set(key, { value: newValue, createdAt: entry?.createdAt ?? now, updatedAt: now });
  persist(store);
  return newValue;
};

const decrement: BuiltinHandler = (args) => {
  return increment([args[0], args[1], -(Number(args[2] ?? 1))]);
};

const getAll: BuiltinHandler = (args) => {
  const storeName = String(args[0] ?? "default");
  const store = getStore(storeName);
  cleanExpired(store);
  const result: Record<string, unknown> = {};
  for (const [key, entry] of store.data) {
    result[key] = entry.value;
  }
  return result;
};

const setMany: BuiltinHandler = (args) => {
  const storeName = String(args[0] ?? "default");
  const data = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const ttlMs = args[2] != null ? parseInt(String(args[2]), 10) : undefined;
  const store = getStore(storeName);
  const now = Date.now();

  for (const [key, value] of Object.entries(data)) {
    store.data.set(key, { value, expiresAt: ttlMs ? now + ttlMs : undefined, createdAt: now, updatedAt: now });
  }
  persist(store);
  return { set: Object.keys(data).length };
};

const destroy: BuiltinHandler = (args) => {
  const storeName = String(args[0] ?? "default");
  const store = stores.get(storeName);
  if (store?.type === "file" && store.filePath && existsSync(store.filePath)) {
    try { unlinkSync(store.filePath); } catch { /* ignore */ }
  }
  return stores.delete(storeName);
};

// ── File Storage Helpers ────────────────────────────────────────────

const saveFile: BuiltinHandler = (args) => {
  const dir = String(args[0] ?? "");
  const filename = String(args[1] ?? "");
  const content = args[2];
  if (!dir || !filename) throw new Error("Directory and filename are required");

  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const filePath = join(dir, filename);
  const data = typeof content === "string" ? content : JSON.stringify(content, null, 2);
  writeFileSync(filePath, data, "utf-8");
  return { path: filePath, size: Buffer.byteLength(data) };
};

const loadFile: BuiltinHandler = (args) => {
  const filePath = String(args[0] ?? "");
  const asJson = args[1] === true || args[1] === "json";
  if (!existsSync(filePath)) return null;
  const content = readFileSync(filePath, "utf-8");
  return asJson ? JSON.parse(content) : content;
};

const listFiles: BuiltinHandler = (args) => {
  const dir = String(args[0] ?? "");
  if (!existsSync(dir)) return [];
  return readdirSync(dir).map((name: any) => {
    const full = join(dir, name);
    const stat = statSync(full);
    return { name, path: full, size: stat.size, isDirectory: stat.isDirectory(), modified: stat.mtime.toISOString() };
  });
};

const deleteFile: BuiltinHandler = (args) => {
  const filePath = String(args[0] ?? "");
  if (!existsSync(filePath)) return false;
  unlinkSync(filePath);
  return true;
};

// ── Exports ─────────────────────────────────────────────────────────

export const StorageFunctions: Record<string, BuiltinHandler> = {
  create, set, get, has, remove, keys, values, size, clear, increment, decrement, getAll, setMany, destroy, saveFile, loadFile, listFiles, deleteFile,
};

export const StorageFunctionMetadata = {
  create: { description: "Create a named key-value store (memory or file-backed)", parameters: [{ name: "name", dataType: "string", description: "Store name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{type: 'memory'|'file', path: string}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{name, type, size}", example: 'storage.create "workflow-state" {"type": "file", "path": "./data/state.json"}' },
  set: { description: "Set a key-value pair with optional TTL", parameters: [{ name: "store", dataType: "string", description: "Store name", formInputType: "text", required: true }, { name: "key", dataType: "string", description: "Key", formInputType: "text", required: true }, { name: "value", dataType: "any", description: "Value", formInputType: "text", required: true }, { name: "ttlMs", dataType: "number", description: "TTL in ms (optional)", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "True", example: 'storage.set "state" "lastRun" $timestamp' },
  get: { description: "Get a value by key", parameters: [{ name: "store", dataType: "string", description: "Store name", formInputType: "text", required: true }, { name: "key", dataType: "string", description: "Key", formInputType: "text", required: true }, { name: "default", dataType: "any", description: "Default if not found", formInputType: "text", required: false }], returnType: "any", returnDescription: "Stored value or default", example: 'storage.get "state" "lastRun"' },
  has: { description: "Check if a key exists", parameters: [{ name: "store", dataType: "string", description: "Store name", formInputType: "text", required: true }, { name: "key", dataType: "string", description: "Key", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if key exists", example: 'storage.has "state" "lastRun"' },
  remove: { description: "Remove a key", parameters: [{ name: "store", dataType: "string", description: "Store name", formInputType: "text", required: true }, { name: "key", dataType: "string", description: "Key", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if removed", example: 'storage.remove "state" "lastRun"' },
  keys: { description: "List all keys, optionally filtered by pattern", parameters: [{ name: "store", dataType: "string", description: "Store name", formInputType: "text", required: true }, { name: "pattern", dataType: "string", description: "Glob pattern (optional)", formInputType: "text", required: false }], returnType: "array", returnDescription: "Array of key strings", example: 'storage.keys "state" "user:*"' },
  values: { description: "Get all key-value pairs", parameters: [{ name: "store", dataType: "string", description: "Store name", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of {key, value}", example: 'storage.values "state"' },
  size: { description: "Get number of entries", parameters: [{ name: "store", dataType: "string", description: "Store name", formInputType: "text", required: true }], returnType: "number", returnDescription: "Count", example: 'storage.size "state"' },
  clear: { description: "Remove all entries", parameters: [{ name: "store", dataType: "string", description: "Store name", formInputType: "text", required: true }], returnType: "object", returnDescription: "{cleared: count}", example: 'storage.clear "state"' },
  increment: { description: "Increment a numeric value", parameters: [{ name: "store", dataType: "string", description: "Store name", formInputType: "text", required: true }, { name: "key", dataType: "string", description: "Key", formInputType: "text", required: true }, { name: "amount", dataType: "number", description: "Increment (default 1)", formInputType: "text", required: false }], returnType: "number", returnDescription: "New value", example: 'storage.increment "state" "runCount"' },
  decrement: { description: "Decrement a numeric value", parameters: [{ name: "store", dataType: "string", description: "Store name", formInputType: "text", required: true }, { name: "key", dataType: "string", description: "Key", formInputType: "text", required: true }, { name: "amount", dataType: "number", description: "Decrement (default 1)", formInputType: "text", required: false }], returnType: "number", returnDescription: "New value", example: 'storage.decrement "state" "credits"' },
  getAll: { description: "Get all data as a plain object", parameters: [{ name: "store", dataType: "string", description: "Store name", formInputType: "text", required: true }], returnType: "object", returnDescription: "Key-value object", example: 'storage.getAll "state"' },
  setMany: { description: "Set multiple key-value pairs at once", parameters: [{ name: "store", dataType: "string", description: "Store name", formInputType: "text", required: true }, { name: "data", dataType: "object", description: "Key-value pairs", formInputType: "text", required: true }, { name: "ttlMs", dataType: "number", description: "Optional TTL for all", formInputType: "text", required: false }], returnType: "object", returnDescription: "{set: count}", example: 'storage.setMany "state" {"user": "Alice", "role": "admin"}' },
  destroy: { description: "Destroy a store and delete its file if file-backed", parameters: [{ name: "store", dataType: "string", description: "Store name", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if destroyed", example: 'storage.destroy "state"' },
  saveFile: { description: "Save content to a file on disk", parameters: [{ name: "dir", dataType: "string", description: "Directory path", formInputType: "text", required: true }, { name: "filename", dataType: "string", description: "File name", formInputType: "text", required: true }, { name: "content", dataType: "any", description: "String or JSON content", formInputType: "text", required: true }], returnType: "object", returnDescription: "{path, size}", example: 'storage.saveFile "./output" "report.json" $data' },
  loadFile: { description: "Load a file from disk", parameters: [{ name: "path", dataType: "string", description: "File path", formInputType: "text", required: true }, { name: "asJson", dataType: "boolean", description: "Parse as JSON (default false)", formInputType: "text", required: false }], returnType: "any", returnDescription: "File content or null", example: 'storage.loadFile "./data/config.json" true' },
  listFiles: { description: "List files in a directory", parameters: [{ name: "dir", dataType: "string", description: "Directory path", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of file info objects", example: 'storage.listFiles "./output"' },
  deleteFile: { description: "Delete a file from disk", parameters: [{ name: "path", dataType: "string", description: "File path", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if deleted", example: 'storage.deleteFile "./output/old.json"' },
};

export const StorageModuleMetadata = {
  description: "Persistent key-value storage (memory or file-backed) with TTL, counters, and file operations",
  methods: ["create", "set", "get", "has", "remove", "keys", "values", "size", "clear", "increment", "decrement", "getAll", "setMany", "destroy", "saveFile", "loadFile", "listFiles", "deleteFile"],
};
