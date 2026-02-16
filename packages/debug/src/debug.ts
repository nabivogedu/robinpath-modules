import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { performance } from "node:perf_hooks";

const timers = new Map<string, number>();
const counters = new Map<string, number>();
const logs: { timestamp: string; level: string; message: string; data?: unknown }[] = [];

const inspect: BuiltinHandler = (args) => {
  const value = args[0];
  const type = typeOfValue(value);
  const result: Record<string, unknown> = { type, value };
  if (type === "object" && value !== null) result.keys = Object.keys(value as object);
  if (type === "array") result.length = (value as unknown[]).length;
  if (type === "string") result.length = (value as string).length;
  if (type === "object" && value !== null) result.prototype = Object.getPrototypeOf(value)?.constructor?.name ?? "Object";
  return result;
};

function typeOfValue(v: unknown): string {
  if (v === null) return "null";
  if (v === undefined) return "undefined";
  if (Array.isArray(v)) return "array";
  if (v instanceof Date) return "date";
  if (v instanceof RegExp) return "regexp";
  if (v instanceof Map) return "map";
  if (v instanceof Set) return "set";
  if (v instanceof Promise) return "promise";
  if (v instanceof Error) return "error";
  if (typeof v === "symbol") return "symbol";
  if (typeof v === "bigint") return "bigint";
  return typeof v;
}

const typeOf: BuiltinHandler = (args) => typeOfValue(args[0]);

const timeStart: BuiltinHandler = (args) => {
  const label = String(args[0] ?? "default");
  timers.set(label, performance.now());
  return label;
};

const timeEnd: BuiltinHandler = (args) => {
  const label = String(args[0] ?? "default");
  const start = timers.get(label);
  if (start === undefined) throw new Error(`Timer "${label}" not found`);
  const duration = performance.now() - start;
  timers.delete(label);
  const formatted = duration < 1 ? `${(duration * 1000).toFixed(0)}μs` : duration < 1000 ? `${duration.toFixed(2)}ms` : `${(duration / 1000).toFixed(2)}s`;
  return { label, duration: Math.round(duration * 100) / 100, durationFormatted: formatted };
};

const timeit: BuiltinHandler = (args) => {
  const start = performance.now();
  const result = args[0];
  const durationMs = Math.round((performance.now() - start) * 100) / 100;
  return { result, durationMs };
};

const count: BuiltinHandler = (args) => {
  const label = String(args[0] ?? "default");
  const val = (counters.get(label) ?? 0) + 1;
  counters.set(label, val);
  return val;
};

const countReset: BuiltinHandler = (args) => { counters.delete(String(args[0] ?? "default")); return true; };
const countGet: BuiltinHandler = (args) => counters.get(String(args[0] ?? "default")) ?? 0;

const log: BuiltinHandler = (args) => {
  const message = String(args[0] ?? "");
  const data = args[1];
  const entry = { timestamp: new Date().toISOString(), level: "debug", message, data };
  logs.push(entry);
  if (logs.length > 1000) logs.shift();
  return entry;
};

const getLogs: BuiltinHandler = (args) => {
  const level = args[0] ? String(args[0]) : undefined;
  return level ? logs.filter((l) => l.level === level) : [...logs];
};

const clearLogs: BuiltinHandler = () => { logs.length = 0; return true; };

const assert: BuiltinHandler = (args) => {
  const condition = args[0];
  const message = String(args[1] ?? "Assertion failed");
  if (!condition) throw new Error(message);
  return true;
};

const trace: BuiltinHandler = () => new Error().stack ?? "";

const memory: BuiltinHandler = () => {
  const mem = process.memoryUsage();
  const fmt = (b: number) => `${(b / 1024 / 1024).toFixed(2)} MB`;
  return { rss: fmt(mem.rss), heapTotal: fmt(mem.heapTotal), heapUsed: fmt(mem.heapUsed), external: fmt(mem.external), arrayBuffers: fmt(mem.arrayBuffers) };
};

const sizeof: BuiltinHandler = (args) => {
  const value = args[0];
  let bytes: number;
  try { bytes = new TextEncoder().encode(JSON.stringify(value)).length; } catch { bytes = 0; }
  const formatted = bytes < 1024 ? `${bytes} B` : bytes < 1048576 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1048576).toFixed(1)} MB`;
  return { bytes, formatted };
};

const diff: BuiltinHandler = (args) => {
  const a = args[0], b = args[1];
  if (a === b) return { equal: true, type: typeOfValue(a), differences: [] };
  const diffs: string[] = [];
  const typeA = typeOfValue(a), typeB = typeOfValue(b);
  if (typeA !== typeB) { diffs.push(`Type mismatch: ${typeA} vs ${typeB}`); return { equal: false, type: "mixed", differences: diffs }; }
  if (typeA === "object" && a !== null && b !== null) {
    const keysA = new Set(Object.keys(a as object)), keysB = new Set(Object.keys(b as object));
    for (const k of keysA) if (!keysB.has(k)) diffs.push(`Key "${k}" only in first`);
    for (const k of keysB) if (!keysA.has(k)) diffs.push(`Key "${k}" only in second`);
    for (const k of keysA) if (keysB.has(k) && JSON.stringify((a as Record<string, unknown>)[k]) !== JSON.stringify((b as Record<string, unknown>)[k])) diffs.push(`Key "${k}" differs`);
  } else if (typeA === "array") {
    const arrA = a as unknown[], arrB = b as unknown[];
    if (arrA.length !== arrB.length) diffs.push(`Length: ${arrA.length} vs ${arrB.length}`);
    for (let i = 0; i < Math.max(arrA.length, arrB.length); i++) if (JSON.stringify(arrA[i]) !== JSON.stringify(arrB[i])) diffs.push(`Index ${i} differs`);
  } else { diffs.push(`Values differ: ${JSON.stringify(a)} vs ${JSON.stringify(b)}`); }
  return { equal: false, type: typeA, differences: diffs };
};

const freeze: BuiltinHandler = (args) => {
  const obj = args[0];
  if (typeof obj !== "object" || obj === null) return obj;
  const cloned = JSON.parse(JSON.stringify(obj));
  const deepFreeze = (o: unknown): unknown => { if (typeof o === "object" && o !== null) { Object.freeze(o); for (const v of Object.values(o as object)) deepFreeze(v); } return o; };
  return deepFreeze(cloned);
};

const clone: BuiltinHandler = (args) => {
  try { return structuredClone(args[0]); } catch { return JSON.parse(JSON.stringify(args[0])); }
};

const table: BuiltinHandler = (args) => {
  const data = (Array.isArray(args[0]) ? args[0] : []) as Record<string, unknown>[];
  if (!data.length) return "(empty table)";
  const cols = (Array.isArray(args[1]) ? args[1].map(String) : Object.keys(data[0]!)) as string[];
  const widths = cols.map((c) => Math.max(c.length, ...data.map((r) => String(r[c] ?? "").length)));
  const sep = widths.map((w) => "-".repeat(w + 2)).join("+");
  const header = cols.map((c, i) => ` ${c.padEnd(widths[i]!)} `).join("|");
  const rows = data.map((r) => cols.map((c, i) => ` ${String(r[c] ?? "").padEnd(widths[i]!)} `).join("|"));
  return [header, sep, ...rows].join("\n");
};

const dump: BuiltinHandler = (args) => {
  const value = args[0];
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const depth = Number(opts.depth ?? 4);
  return JSON.stringify(value, null, 2)?.substring(0, depth * 10000) ?? String(value);
};

export const DebugFunctions: Record<string, BuiltinHandler> = { inspect, typeOf, timeStart, timeEnd, timeit, count, countReset, countGet, log, getLogs, clearLogs, assert, trace, memory, sizeof, diff, freeze, clone, table, dump };

export const DebugFunctionMetadata: Record<string, FunctionMetadata> = {
  inspect: { description: "Deep inspect a value", parameters: [{ name: "value", dataType: "any", description: "Value to inspect", formInputType: "text", required: true }], returnType: "object", returnDescription: "{type, value, keys, length}", example: 'debug.inspect $data' },
  typeOf: { description: "Get detailed type", parameters: [{ name: "value", dataType: "any", description: "Value", formInputType: "text", required: true }], returnType: "string", returnDescription: "Type name", example: 'debug.typeOf $data' },
  timeStart: { description: "Start a timer", parameters: [{ name: "label", dataType: "string", description: "Timer label", formInputType: "text", required: true }], returnType: "string", returnDescription: "Label", example: 'debug.timeStart "fetch"' },
  timeEnd: { description: "End timer and get duration", parameters: [{ name: "label", dataType: "string", description: "Timer label", formInputType: "text", required: true }], returnType: "object", returnDescription: "{label, duration, durationFormatted}", example: 'debug.timeEnd "fetch"' },
  timeit: { description: "Pass value through with timing", parameters: [{ name: "value", dataType: "any", description: "Value to pass through", formInputType: "text", required: true }], returnType: "object", returnDescription: "{result, durationMs}", example: 'debug.timeit $result' },
  count: { description: "Increment counter", parameters: [{ name: "label", dataType: "string", description: "Counter name", formInputType: "text", required: true }], returnType: "number", returnDescription: "Current count", example: 'debug.count "iterations"' },
  countReset: { description: "Reset counter", parameters: [{ name: "label", dataType: "string", description: "Counter name", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true", example: 'debug.countReset "iterations"' },
  countGet: { description: "Get counter value", parameters: [{ name: "label", dataType: "string", description: "Counter name", formInputType: "text", required: true }], returnType: "number", returnDescription: "Count", example: 'debug.countGet "iterations"' },
  log: { description: "Add debug log entry", parameters: [{ name: "message", dataType: "string", description: "Log message", formInputType: "text", required: true }, { name: "data", dataType: "any", description: "Extra data", formInputType: "text", required: false }], returnType: "object", returnDescription: "Log entry", example: 'debug.log "Processing item" $item' },
  getLogs: { description: "Get debug logs", parameters: [{ name: "level", dataType: "string", description: "Filter by level", formInputType: "text", required: false }], returnType: "array", returnDescription: "Log entries", example: "debug.getLogs" },
  clearLogs: { description: "Clear debug logs", parameters: [], returnType: "boolean", returnDescription: "true", example: "debug.clearLogs" },
  assert: { description: "Assert condition", parameters: [{ name: "condition", dataType: "any", description: "Condition", formInputType: "text", required: true }, { name: "message", dataType: "string", description: "Error message", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if passed", example: 'debug.assert $valid "Should be valid"' },
  trace: { description: "Get stack trace", parameters: [], returnType: "string", returnDescription: "Stack trace", example: "debug.trace" },
  memory: { description: "Get memory usage", parameters: [], returnType: "object", returnDescription: "Memory stats in MB", example: "debug.memory" },
  sizeof: { description: "Estimate value memory size", parameters: [{ name: "value", dataType: "any", description: "Value", formInputType: "text", required: true }], returnType: "object", returnDescription: "{bytes, formatted}", example: 'debug.sizeof $data' },
  diff: { description: "Compare two values", parameters: [{ name: "a", dataType: "any", description: "First value", formInputType: "text", required: true }, { name: "b", dataType: "any", description: "Second value", formInputType: "text", required: true }], returnType: "object", returnDescription: "{equal, type, differences}", example: 'debug.diff $old $new' },
  freeze: { description: "Deep freeze object", parameters: [{ name: "obj", dataType: "any", description: "Object to freeze", formInputType: "text", required: true }], returnType: "object", returnDescription: "Frozen copy", example: 'debug.freeze $config' },
  clone: { description: "Deep clone value", parameters: [{ name: "value", dataType: "any", description: "Value to clone", formInputType: "text", required: true }], returnType: "any", returnDescription: "Cloned value", example: 'debug.clone $data' },
  table: { description: "Format as ASCII table", parameters: [{ name: "data", dataType: "array", description: "Array of objects", formInputType: "text", required: true }, { name: "columns", dataType: "array", description: "Column names", formInputType: "text", required: false }], returnType: "string", returnDescription: "Formatted table", example: 'debug.table $users' },
  dump: { description: "Pretty-print value", parameters: [{ name: "value", dataType: "any", description: "Value", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{depth}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Formatted string", example: 'debug.dump $data' },
};

export const DebugModuleMetadata: ModuleMetadata = {
  description: "Debugging utilities: inspect, timing, counters, logging, memory profiling, value comparison, ASCII tables",
  methods: ["inspect", "typeOf", "timeStart", "timeEnd", "timeit", "count", "countReset", "countGet", "log", "getLogs", "clearLogs", "assert", "trace", "memory", "sizeof", "diff", "freeze", "clone", "table", "dump"],
};
