import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

const all: BuiltinHandler = async (args) => {
  const promises = (Array.isArray(args[0]) ? args[0] : []) as Promise<any>[];
  return await Promise.all(promises);
};

const allSettled: BuiltinHandler = async (args) => {
  const promises = (Array.isArray(args[0]) ? args[0] : []) as Promise<any>[];
  return await Promise.allSettled(promises);
};

const race: BuiltinHandler = async (args) => {
  const promises = (Array.isArray(args[0]) ? args[0] : []) as Promise<any>[];
  return await Promise.race(promises);
};

const any: BuiltinHandler = async (args) => {
  const promises = (Array.isArray(args[0]) ? args[0] : []) as Promise<any>[];
  return await (Promise as any).any(promises);
};

const timeout: BuiltinHandler = async (args) => {
  const promise = args[0] as Promise<any>;
  const ms = Number(args[1] ?? 5000);
  const message = String(args[2] ?? "Promise timed out");
  const timer = new Promise<never>((_, reject) => setTimeout(() => reject(new Error(message)), ms));
  return await Promise.race([promise, timer]);
};

const delay: BuiltinHandler = async (args) => {
  const ms = Number(args[0] ?? 0);
  const value = args[1];
  return new Promise((resolve: any) => setTimeout(() => resolve(value), ms));
};

const retry: BuiltinHandler = async (args) => {
  const fn = args[0] as () => Promise<any>;
  const maxRetries = Number(args[1] ?? 3);
  const delayMs = Number(args[2] ?? 1000);
  const backoff = args[3] !== false;
  let lastError: any;
  for (let i = 0; i <= maxRetries; i++) {
    try { return await fn(); } catch (err) {
      lastError = err;
      if (i < maxRetries) await new Promise((r: any) => setTimeout(r, backoff ? delayMs * Math.pow(2, i) : delayMs));
    }
  }
  throw lastError;
};

const parallel: BuiltinHandler = async (args) => {
  const fns = (Array.isArray(args[0]) ? args[0] : []) as (() => Promise<any>)[];
  const concurrency = Number(args[1] ?? Infinity);
  const results: any[] = new Array(fns.length);
  let index = 0;
  async function worker() {
    while (index < fns.length) {
      const i = index++;
      results[i] = await fns[i]!();
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, fns.length) }, () => worker());
  await Promise.all(workers);
  return results;
};

const waterfall: BuiltinHandler = async (args) => {
  const fns = (Array.isArray(args[0]) ? args[0] : []) as ((prev: any) => Promise<any>)[];
  let result: any = args[1];
  for (const fn of fns) result = await fn(result);
  return result;
};

const map: BuiltinHandler = async (args) => {
  const items = (Array.isArray(args[0]) ? args[0] : []) as unknown[];
  const fn = args[1] as (item: any, index: number) => Promise<any>;
  const concurrency = Number(args[2] ?? Infinity);
  const results: any[] = new Array(items.length);
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i], i);
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
};

const filter: BuiltinHandler = async (args) => {
  const items = (Array.isArray(args[0]) ? args[0] : []) as unknown[];
  const fn = args[1] as (item: any) => Promise<boolean>;
  const results: any[] = [];
  for (const item of items) if (await fn(item)) results.push(item);
  return results;
};

const each: BuiltinHandler = async (args) => {
  const items = (Array.isArray(args[0]) ? args[0] : []) as unknown[];
  const fn = args[1] as (item: any, index: number) => Promise<void>;
  const concurrency = Number(args[2] ?? 1);
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const i = index++;
      await fn(items[i], i);
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);
  return true;
};

const reduce: BuiltinHandler = async (args) => {
  const items = (Array.isArray(args[0]) ? args[0] : []) as unknown[];
  const fn = args[1] as (acc: any, item: any) => Promise<any>;
  let acc = args[2];
  for (const item of items) acc = await fn(acc, item);
  return acc;
};

const throttle: BuiltinHandler = (args) => {
  const fn = args[0] as (...a: any[]) => unknown;
  const ms = Number(args[1] ?? 1000);
  let last = 0;
  let pending: any = null;
  return (...a: any[]) => {
    const now = Date.now();
    if (now - last >= ms) { last = now; return fn(...a); }
    pending = a;
    return pending;
  };
};

const debounce: BuiltinHandler = (args) => {
  const fn = args[0] as (...a: any[]) => unknown;
  const ms = Number(args[1] ?? 300);
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...a: any[]) => {
    if (timer) clearTimeout(timer);
    return new Promise((resolve: any) => { timer = setTimeout(() => resolve(fn(...a)), ms); });
  };
};

const deferred: BuiltinHandler = () => {
  let resolve!: (value: any) => void;
  let reject!: (reason: any) => void;
  const promise = new Promise((res: any, rej: any) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
};

const sleep: BuiltinHandler = async (args) => {
  const ms = Number(args[0] ?? 0);
  await new Promise((r: any) => setTimeout(r, ms));
  return true;
};

export const PromiseFunctions: Record<string, BuiltinHandler> = { all, allSettled, race, any, timeout, delay, retry, parallel, waterfall, map, filter, each, reduce, throttle, debounce, deferred, sleep };

export const PromiseFunctionMetadata = {
  all: { description: "Wait for all promises", parameters: [{ name: "promises", dataType: "array", description: "Array of promises", formInputType: "text", required: true }], returnType: "array", returnDescription: "Resolved values", example: 'promise.all [$p1, $p2, $p3]' },
  allSettled: { description: "Wait for all promises (no throw)", parameters: [{ name: "promises", dataType: "array", description: "Array of promises", formInputType: "text", required: true }], returnType: "array", returnDescription: "Settlement results", example: 'promise.allSettled [$p1, $p2]' },
  race: { description: "First promise to settle", parameters: [{ name: "promises", dataType: "array", description: "Array of promises", formInputType: "text", required: true }], returnType: "any", returnDescription: "First result", example: 'promise.race [$p1, $p2]' },
  any: { description: "First promise to fulfill", parameters: [{ name: "promises", dataType: "array", description: "Array of promises", formInputType: "text", required: true }], returnType: "any", returnDescription: "First successful result", example: 'promise.any [$p1, $p2]' },
  timeout: { description: "Add timeout to promise", parameters: [{ name: "promise", dataType: "any", description: "Promise", formInputType: "text", required: true }, { name: "ms", dataType: "number", description: "Timeout ms", formInputType: "text", required: true }, { name: "message", dataType: "string", description: "Error message", formInputType: "text", required: false }], returnType: "any", returnDescription: "Result or timeout error", example: 'promise.timeout $fetch 5000' },
  delay: { description: "Resolve after delay", parameters: [{ name: "ms", dataType: "number", description: "Delay ms", formInputType: "text", required: true }, { name: "value", dataType: "any", description: "Resolved value", formInputType: "text", required: false }], returnType: "any", returnDescription: "Value after delay", example: 'promise.delay 1000 "done"' },
  retry: { description: "Retry function with backoff", parameters: [{ name: "fn", dataType: "string", description: "Async function", formInputType: "text", required: true }, { name: "maxRetries", dataType: "number", description: "Max retries (default 3)", formInputType: "text", required: false }, { name: "delayMs", dataType: "number", description: "Base delay ms", formInputType: "text", required: false }, { name: "backoff", dataType: "boolean", description: "Exponential backoff", formInputType: "text", required: false }], returnType: "any", returnDescription: "Result", example: 'promise.retry $fn 3 1000' },
  parallel: { description: "Run functions with concurrency limit", parameters: [{ name: "fns", dataType: "array", description: "Async functions", formInputType: "text", required: true }, { name: "concurrency", dataType: "number", description: "Max concurrent", formInputType: "text", required: false }], returnType: "array", returnDescription: "Results", example: 'promise.parallel $tasks 5' },
  waterfall: { description: "Run functions in sequence, passing results", parameters: [{ name: "fns", dataType: "array", description: "Functions (prev: any) => result", formInputType: "text", required: true }, { name: "initial", dataType: "any", description: "Initial value", formInputType: "text", required: false }], returnType: "any", returnDescription: "Final result", example: 'promise.waterfall [$step1, $step2]' },
  map: { description: "Map items with async function", parameters: [{ name: "items", dataType: "array", description: "Items", formInputType: "text", required: true }, { name: "fn", dataType: "string", description: "Async mapper", formInputType: "text", required: true }, { name: "concurrency", dataType: "number", description: "Max concurrent", formInputType: "text", required: false }], returnType: "array", returnDescription: "Mapped results", example: 'promise.map $urls $fetchFn 5' },
  filter: { description: "Filter items with async predicate", parameters: [{ name: "items", dataType: "array", description: "Items", formInputType: "text", required: true }, { name: "fn", dataType: "string", description: "Async predicate", formInputType: "text", required: true }], returnType: "array", returnDescription: "Filtered items", example: 'promise.filter $items $isValid' },
  each: { description: "Iterate with async function", parameters: [{ name: "items", dataType: "array", description: "Items", formInputType: "text", required: true }, { name: "fn", dataType: "string", description: "Async function", formInputType: "text", required: true }, { name: "concurrency", dataType: "number", description: "Max concurrent", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true when done", example: 'promise.each $items $process 3' },
  reduce: { description: "Reduce with async function", parameters: [{ name: "items", dataType: "array", description: "Items", formInputType: "text", required: true }, { name: "fn", dataType: "string", description: "Async reducer", formInputType: "text", required: true }, { name: "initial", dataType: "any", description: "Initial value", formInputType: "text", required: false }], returnType: "any", returnDescription: "Reduced result", example: 'promise.reduce $items $sum 0' },
  throttle: { description: "Throttle function calls", parameters: [{ name: "fn", dataType: "string", description: "Function", formInputType: "text", required: true }, { name: "ms", dataType: "number", description: "Min interval ms", formInputType: "text", required: true }], returnType: "function", returnDescription: "Throttled function", example: 'promise.throttle $fn 1000' },
  debounce: { description: "Debounce function calls", parameters: [{ name: "fn", dataType: "string", description: "Function", formInputType: "text", required: true }, { name: "ms", dataType: "number", description: "Debounce delay ms", formInputType: "text", required: true }], returnType: "function", returnDescription: "Debounced function", example: 'promise.debounce $fn 300' },
  deferred: { description: "Create deferred promise", parameters: [], returnType: "object", returnDescription: "{promise, resolve, reject}", example: 'promise.deferred' },
  sleep: { description: "Sleep for milliseconds", parameters: [{ name: "ms", dataType: "number", description: "Duration ms", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true", example: 'promise.sleep 1000' },
};

export const PromiseModuleMetadata = {
  description: "Async utilities: parallel, race, waterfall, map, retry, throttle, debounce, timeout, and concurrency control",
  methods: ["all", "allSettled", "race", "any", "timeout", "delay", "retry", "parallel", "waterfall", "map", "filter", "each", "reduce", "throttle", "debounce", "deferred", "sleep"],
};
