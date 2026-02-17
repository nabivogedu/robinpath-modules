// @ts-nocheck
import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

// ---------------------------------------------------------------------------
// Internal state
// ---------------------------------------------------------------------------

interface RouteEntry {
  method: string;
  path: string;
  handler: unknown;
  middlewares: Array<(ctx: unknown) => unknown>;
}

interface RouterInstance {
  id: string;
  prefix: string;
  routes: RouteEntry[];
  middlewares: Array<(ctx: unknown) => unknown>;
}

const routers: Map<string, RouterInstance> = new Map();

// ---------------------------------------------------------------------------
// Pattern matching helpers
// ---------------------------------------------------------------------------

function normalizePath(p: string): string {
  if (!p) return "/";
  // Collapse multiple slashes, ensure leading slash, strip trailing slash
  let normalized = ("/" + p).replace(/\/+/g, "/");
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}

function patternToSegments(pattern: string): string[] {
  return normalizePath(pattern).split("/").filter(Boolean);
}

function pathToSegments(p: string): string[] {
  return normalizePath(p).split("/").filter(Boolean);
}

function segmentsMatch(patternSegs: string[], pathSegs: string[]): boolean {
  for (let i = 0; i < patternSegs.length; i++) {
    const seg = patternSegs[i];
    if (seg === "*") return true; // wildcard matches rest
    if (i >= pathSegs.length) return false;
    if (seg.startsWith(":")) continue; // param matches anything
    if (seg !== pathSegs[i]) return false;
  }
  return patternSegs.length === pathSegs.length;
}

function extractPathParams(pattern: string, pathname: string): Record<string, string> {
  const patternSegs = patternToSegments(pattern);
  const pathSegs = pathToSegments(pathname);
  const params: Record<string, string> = {};

  for (let i = 0; i < patternSegs.length; i++) {
    if (patternSegs[i] === "*") {
      params["*"] = pathSegs.slice(i).join("/");
      break;
    }
    if (patternSegs[i].startsWith(":")) {
      params[patternSegs[i].slice(1)] = pathSegs[i] || "";
    }
  }
  return params;
}

function getRouter(id: string): RouterInstance {
  const inst = routers.get(id);
  if (!inst) throw new Error(`Router "${id}" not found`);
  return inst;
}

// ---------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------

const create: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const id = (opts.id ?? opts.name ?? `router_${routers.size + 1}`) as string;
  const prefix = (opts.prefix ?? "") as string;

  if (routers.has(id)) throw new Error(`Router "${id}" already exists`);

  const inst: RouterInstance = {
    id,
    prefix: prefix ? normalizePath(prefix) : "",
    routes: [],
    middlewares: [],
  };

  routers.set(id, inst);
  return { id, prefix: inst.prefix };
};

const add: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const id = opts.id as string;
  const method = ((opts.method ?? "GET") as string).toUpperCase();
  const routePath = opts.path as string;
  const handler = opts.handler;

  if (!id) throw new Error("Router id is required");
  if (!routePath) throw new Error("path is required");

  const inst = getRouter(id);
  const fullPath = inst.prefix ? normalizePath(inst.prefix + "/" + routePath) : normalizePath(routePath);

  const entry: RouteEntry = {
    method,
    path: fullPath,
    handler,
    middlewares: [],
  };

  inst.routes.push(entry);
  return { id, method, path: fullPath, routeCount: inst.routes.length };
};

const match: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const id = opts.id as string;
  const method = ((opts.method ?? "GET") as string).toUpperCase();
  const url = opts.url as string;

  if (!id) throw new Error("Router id is required");
  if (!url) throw new Error("url is required");

  const inst = getRouter(id);
  const pathname = normalizePath(url.split("?")[0]);
  const pathSegs = pathToSegments(pathname);

  for (const route of inst.routes) {
    if (route.method !== "*" && route.method !== method) continue;
    const patternSegs = patternToSegments(route.path);
    if (segmentsMatch(patternSegs, pathSegs)) {
      const params = extractPathParams(route.path, pathname);
      return {
        matched: true,
        method: route.method,
        path: route.path,
        handler: route.handler,
        params,
      };
    }
  }

  return { matched: false, method, url: pathname, handler: null, params: {} };
};

const params: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const pattern = opts.pattern as string;
  const url = opts.url as string;

  if (!pattern) throw new Error("pattern is required");
  if (!url) throw new Error("url is required");

  const pathname = normalizePath(url.split("?")[0]);
  return extractPathParams(pattern, pathname);
};

const parse: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const url = opts.url as string;

  if (!url) throw new Error("url is required");

  const questionIdx = url.indexOf("?");
  const pathname = questionIdx >= 0 ? url.slice(0, questionIdx) : url;
  const queryString = questionIdx >= 0 ? url.slice(questionIdx + 1) : "";

  const segments = pathToSegments(pathname);

  const query: Record<string, string> = {};
  if (queryString) {
    for (const pair of queryString.split("&")) {
      const eqIdx = pair.indexOf("=");
      if (eqIdx >= 0) {
        const key = decodeURIComponent(pair.slice(0, eqIdx));
        const value = decodeURIComponent(pair.slice(eqIdx + 1));
        query[key] = value;
      } else {
        query[decodeURIComponent(pair)] = "";
      }
    }
  }

  return { pathname: normalizePath(pathname), segments, query };
};

const build: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const pattern = opts.pattern as string;
  const paramValues = (opts.params ?? {}) as Record<string, string>;
  const queryValues = (opts.query ?? null) as Record<string, string> | null;

  if (!pattern) throw new Error("pattern is required");

  const segments = patternToSegments(pattern);
  const builtSegments: string[] = [];

  for (const seg of segments) {
    if (seg.startsWith(":")) {
      const paramName = seg.slice(1);
      if (!(paramName in paramValues)) throw new Error(`Missing param "${paramName}"`);
      builtSegments.push(encodeURIComponent(paramValues[paramName]));
    } else if (seg === "*") {
      if ("*" in paramValues) {
        builtSegments.push(paramValues["*"]);
      }
      break;
    } else {
      builtSegments.push(seg);
    }
  }

  let url = "/" + builtSegments.join("/");

  if (queryValues && Object.keys(queryValues).length > 0) {
    const qs = Object.entries(queryValues)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");
    url += "?" + qs;
  }

  return url;
};

const normalize: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const p = (opts.path ?? opts.url ?? "") as string;
  return normalizePath(p);
};

const isMatch: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const pattern = opts.pattern as string;
  const url = opts.url as string;

  if (!pattern) throw new Error("pattern is required");
  if (!url) throw new Error("url is required");

  const pathname = normalizePath(url.split("?")[0]);
  const patternSegs = patternToSegments(pattern);
  const pathSegs = pathToSegments(pathname);
  return segmentsMatch(patternSegs, pathSegs);
};

const group: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const id = opts.id as string;
  const prefix = opts.prefix as string;
  const routes = (opts.routes ?? []) as Array<Record<string, unknown>>;

  if (!id) throw new Error("Router id is required");
  if (!prefix) throw new Error("prefix is required");

  const inst = getRouter(id);
  const added: Array<{ method: string; path: string }> = [];

  for (const r of routes) {
    const method = ((r.method ?? "GET") as string).toUpperCase();
    const routePath = r.path as string;
    const handler = r.handler;

    if (!routePath) throw new Error("Each route in the group must have a path");

    const fullPath = normalizePath(
      (inst.prefix ? inst.prefix : "") + "/" + prefix + "/" + routePath
    );

    inst.routes.push({ method, path: fullPath, handler, middlewares: [] });
    added.push({ method, path: fullPath });
  }

  return { id, prefix: normalizePath(prefix), added, routeCount: inst.routes.length };
};

const list: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const id = opts.id as string;

  if (!id) throw new Error("Router id is required");
  const inst = getRouter(id);

  return inst.routes.map((r: any) => ({
    method: r.method,
    path: r.path,
  }));
};

const remove: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const id = opts.id as string;
  const method = opts.method ? ((opts.method as string).toUpperCase()) : undefined;
  const routePath = opts.path as string | undefined;

  if (!id) throw new Error("Router id is required");
  const inst = getRouter(id);

  const before = inst.routes.length;
  inst.routes = inst.routes.filter((r: any) => {
    if (method && routePath) return !(r.method === method && r.path === normalizePath(routePath));
    if (routePath) return r.path !== normalizePath(routePath);
    if (method) return r.method !== method;
    return true;
  });

  return { id, removed: before - inst.routes.length, routeCount: inst.routes.length };
};

const middlewareFn: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const id = opts.id as string;
  const fn = opts.handler as (ctx: unknown) => unknown;

  if (!id) throw new Error("Router id is required");
  if (typeof fn !== "function") throw new Error("handler must be a function");

  const inst = getRouter(id);
  inst.middlewares.push(fn);
  return { id, middlewareCount: inst.middlewares.length };
};

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const RouterFunctions = {
  create,
  add,
  match,
  params,
  parse,
  build,
  normalize,
  isMatch,
  group,
  list,
  remove,
  middleware: middlewareFn,
};

export const RouterFunctionMetadata = {
  create: {
    description: "Create a new router instance",
    parameters: [
      { name: "id", dataType: "string", description: "Unique router identifier", optional: true },
      { name: "prefix", dataType: "string", description: "Base prefix for all routes", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  add: {
    description: "Add a route with method, path pattern, and handler",
    parameters: [
      { name: "id", dataType: "string", description: "Router identifier" },
      { name: "method", dataType: "string", description: "HTTP method (default GET)", optional: true },
      { name: "path", dataType: "string", description: "Route path pattern (supports :param and *)" },
      { name: "handler", dataType: "any", description: "Route handler" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  match: {
    description: "Match a URL against registered routes and return the matching route",
    parameters: [
      { name: "id", dataType: "string", description: "Router identifier" },
      { name: "method", dataType: "string", description: "HTTP method", optional: true },
      { name: "url", dataType: "string", description: "URL to match" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  params: {
    description: "Extract path parameters from a URL using a pattern",
    parameters: [
      { name: "pattern", dataType: "string", description: "Route pattern with :param placeholders" },
      { name: "url", dataType: "string", description: "URL to extract params from" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  parse: {
    description: "Parse a URL into pathname, segments, and query parameters",
    parameters: [
      { name: "url", dataType: "string", description: "URL to parse" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  build: {
    description: "Build a URL from a pattern and parameter values",
    parameters: [
      { name: "pattern", dataType: "string", description: "Route pattern with :param placeholders" },
      { name: "params", dataType: "object", description: "Parameter values to substitute" },
      { name: "query", dataType: "object", description: "Query parameters to append", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  normalize: {
    description: "Normalize a URL path (collapse slashes, ensure leading slash, strip trailing slash)",
    parameters: [
      { name: "path", dataType: "string", description: "Path to normalize" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  isMatch: {
    description: "Test if a URL path matches a route pattern",
    parameters: [
      { name: "pattern", dataType: "string", description: "Route pattern" },
      { name: "url", dataType: "string", description: "URL to test" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  group: {
    description: "Create a route group with a shared prefix",
    parameters: [
      { name: "id", dataType: "string", description: "Router identifier" },
      { name: "prefix", dataType: "string", description: "Prefix for all routes in the group" },
      { name: "routes", dataType: "array", description: "Array of route definitions { method, path, handler }" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  list: {
    description: "List all routes registered in a router",
    parameters: [
      { name: "id", dataType: "string", description: "Router identifier" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  remove: {
    description: "Remove routes by method and/or path",
    parameters: [
      { name: "id", dataType: "string", description: "Router identifier" },
      { name: "method", dataType: "string", description: "HTTP method to filter", optional: true },
      { name: "path", dataType: "string", description: "Route path to filter", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  middleware: {
    description: "Add a middleware function to the router",
    parameters: [
      { name: "id", dataType: "string", description: "Router identifier" },
      { name: "handler", dataType: "string", description: "Middleware function (ctx: any) => ctx" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
};

export const RouterModuleMetadata = {
  description: "URL routing and pattern matching with support for path parameters (:param), wildcards (*), route groups, and middleware. No external dependencies.",
  version: "1.0.0",
};
