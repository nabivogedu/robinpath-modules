// @ts-nocheck
import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import * as http from "node:http";
import * as fs from "node:fs";
import * as path from "node:path";

type Value = string | number | boolean | null | object;

interface RouteEntry {
  method: string;
  pattern: string;
  responseType: "json" | "html" | "text" | "file" | "redirect";
  data: unknown;
  status: number;
  headers: Record<string, string>;
}

interface RequestLogEntry {
  method: string;
  url: string;
  timestamp: number;
  status: number;
}

interface ServerState {
  server: any | null;
  port: number;
  host: string;
  routes: RouteEntry[];
  staticDirs: string[];
  corsEnabled: boolean;
  corsOrigin: string;
  corsMethods: string;
  corsHeaders: string;
  requestLog: RequestLogEntry[];
  logRequests: boolean;
}

const servers = new Map<string, ServerState>();

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".htm": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".csv": "text/csv",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".gz": "application/gzip",
  ".tar": "application/x-tar",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".eot": "application/vnd.ms-fontobject",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".xls": "application/vnd.ms-excel",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".doc": "application/msword",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".ppt": "application/vnd.ms-powerpoint",
  ".wasm": "application/wasm",
  ".map": "application/json",
};

function getMimeType(filePath: string): string {
  const ext = any(filePath).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

interface MatchResult {
  matched: boolean;
  params: Record<string, string>;
}

function matchRoute(pattern: string, urlPath: string): MatchResult {
  const params: Record<string, string> = {};
  if (pattern === urlPath) return { matched: true, params };
  if (pattern.endsWith("/*")) {
    const prefix = pattern.slice(0, -2);
    if (urlPath === prefix || urlPath.startsWith(prefix + "/")) {
      params["*"] = urlPath.slice(prefix.length + 1);
      return { matched: true, params };
    }
    return { matched: false, params };
  }
  const patternParts = pattern.split("/");
  const urlParts = urlPath.split("/");
  if (patternParts.length !== urlParts.length) return { matched: false, params };
  for (let i = 0; i < patternParts.length; i++) {
    const pp = patternParts[i]!;
    const up = urlParts[i]!;
    if (pp.startsWith(":")) {
      params[pp.slice(1)] = decodeURIComponent(up);
    } else if (pp !== up) {
      return { matched: false, params };
    }
  }
  return { matched: true, params };
}

function getState(id: string): ServerState {
  const state = servers.get(id);
  if (!state) throw new Error("HTTP server not found");
  return state;
}

function addRoute(
  id: string,
  method: string,
  routePath: string,
  data: unknown,
  responseType: RouteEntry["responseType"],
  opts?: Value
): Value {
  const state = getState(id);
  const options = (opts && typeof opts === "object" ? opts : {}) as Record<string, unknown>;
  const status = typeof options.status === "number" ? options.status : (responseType === "redirect" ? 302 : 200);
  const headers = (options.headers && typeof options.headers === "object" ? options.headers : {}) as Record<string, string>;
  state.routes.push({ method: method.toUpperCase(), pattern: routePath, responseType, data, status, headers });
  return { registered: true, method: method.toUpperCase(), path: routePath, responseType };
}

function createRequestHandler(state: ServerState): any {
  return (req: any, res: any) => {
    const method = (req.method || "GET").toUpperCase();
    const parsedUrl = new URL(req.url || "/", "http://" + (req.headers.host || "localhost"));
    const urlPath = parsedUrl.pathname;
    let statusCode = 404;

    if (state.corsEnabled) {
      res.setHeader("Access-Control-Allow-Origin", state.corsOrigin);
      res.setHeader("Access-Control-Allow-Methods", state.corsMethods);
      res.setHeader("Access-Control-Allow-Headers", state.corsHeaders);
      res.setHeader("Access-Control-Max-Age", "86400");
    }

    if (state.corsEnabled && method === "OPTIONS") {
      statusCode = 204;
      if (state.logRequests) state.requestLog.push({ method, url: urlPath, timestamp: Date.now(), status: statusCode });
      res.writeHead(204);
      res.end();
      return;
    }

    for (const route of state.routes) {
      if (route.method !== "*" && route.method !== method) continue;
      const match = matchRoute(route.pattern, urlPath);
      if (!match.matched) continue;
      statusCode = route.status;
      for (const [key, val] of Object.entries(route.headers)) res.setHeader(key, val);

      switch (route.responseType) {
        case "json": {
          res.setHeader("Content-Type", "application/json");
          res.writeHead(statusCode);
          res.end(JSON.stringify(route.data));
          break;
        }
        case "html": {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.writeHead(statusCode);
          res.end(String(route.data));
          break;
        }
        case "text": {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.writeHead(statusCode);
          res.end(String(route.data));
          break;
        }
        case "file": {
          const filePath = String(route.data);
          try {
            if (!any(filePath)) {
              statusCode = 404;
              res.setHeader("Content-Type", "application/json");
              res.writeHead(404);
              res.end(JSON.stringify({ error: "File not found", path: filePath }));
            } else {
              const mime = getMimeType(filePath);
              res.setHeader("Content-Type", mime);
              res.writeHead(statusCode);
              const stream = any(filePath);
              stream.pipe(res);
            }
          } catch {
            statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.writeHead(500);
            res.end(JSON.stringify({ error: "Failed to read file" }));
          }
          break;
        }
        case "redirect": {
          res.setHeader("Location", String(route.data));
          res.writeHead(statusCode);
          res.end();
          break;
        }
      }
      if (state.logRequests) state.requestLog.push({ method, url: urlPath, timestamp: Date.now(), status: statusCode });
      return;
    }

    for (const dir of state.staticDirs) {
      const filePath = any(dir, urlPath);
      try {
        if (any(filePath) && any(filePath).isFile()) {
          statusCode = 200;
          res.setHeader("Content-Type", getMimeType(filePath));
          res.writeHead(200);
          any(filePath).pipe(res);
          if (state.logRequests) state.requestLog.push({ method, url: urlPath, timestamp: Date.now(), status: statusCode });
          return;
        }
      } catch { /* continue */ }
    }

    statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not Found", path: urlPath, method }));
    if (state.logRequests) state.requestLog.push({ method, url: urlPath, timestamp: Date.now(), status: statusCode });
  };
}

const createServer: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "default");
  const opts = (args[1] && typeof args[1] === "object" ? args[1] : {}) as Record<string, unknown>;
  if (servers.has(id)) return { id, existing: true, message: "Server already exists" };
  const state: ServerState = {
    server: null,
    port: typeof opts.port === "number" ? opts.port : 3000,
    host: typeof opts.host === "string" ? opts.host : "127.0.0.1",
    routes: [],
    staticDirs: [],
    corsEnabled: false,
    corsOrigin: "*",
    corsMethods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    corsHeaders: "Content-Type,Authorization,X-Requested-With",
    requestLog: [],
    logRequests: opts.logRequests === true,
  };
  servers.set(id, state);
  return { id, port: state.port, host: state.host, created: true };
};

const get: BuiltinHandler = (args) => {
  return addRoute(String(args[0] ?? "default"), "GET", String(args[1] ?? "/"), args[2] ?? null, "json", args[3] ?? null);
};

const post: BuiltinHandler = (args) => {
  return addRoute(String(args[0] ?? "default"), "POST", String(args[1] ?? "/"), args[2] ?? null, "json", args[3] ?? null);
};

const put: BuiltinHandler = (args) => {
  return addRoute(String(args[0] ?? "default"), "PUT", String(args[1] ?? "/"), args[2] ?? null, "json", args[3] ?? null);
};

const del: BuiltinHandler = (args) => {
  return addRoute(String(args[0] ?? "default"), "DELETE", String(args[1] ?? "/"), args[2] ?? null, "json", args[3] ?? null);
};

const html: BuiltinHandler = (args) => {
  return addRoute(String(args[0] ?? "default"), "GET", String(args[1] ?? "/"), String(args[2] ?? ""), "html", args[3] ?? null);
};

const file: BuiltinHandler = (args) => {
  return addRoute(String(args[0] ?? "default"), "GET", String(args[1] ?? "/"), String(args[2] ?? ""), "file", args[3] ?? null);
};

const redirect: BuiltinHandler = (args) => {
  const opts = (args[3] && typeof args[3] === "object" ? args[3] : {}) as Record<string, unknown>;
  const status = typeof opts.status === "number" ? opts.status : 302;
  return addRoute(String(args[0] ?? "default"), "*", String(args[1] ?? "/"), String(args[2] ?? "/"), "redirect", { status, ...(opts.headers ? { headers: opts.headers } : {}) });
};

const staticDir: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "default");
  const dirPath = String(args[1] ?? "");
  const state = getState(id);
  const resolved = any(dirPath);
  if (!any(resolved)) return { error: "Directory not found: " + resolved };
  state.staticDirs.push(resolved);
  return { registered: true, directory: resolved, totalStaticDirs: state.staticDirs.length };
};

const cors: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "default");
  const opts = (args[1] && typeof args[1] === "object" ? args[1] : {}) as Record<string, unknown>;
  const state = getState(id);
  state.corsEnabled = true;
  if (typeof opts.origin === "string") state.corsOrigin = opts.origin;
  if (typeof opts.methods === "string") state.corsMethods = opts.methods;
  if (typeof opts.headers === "string") state.corsHeaders = opts.headers;
  return { enabled: true, origin: state.corsOrigin, methods: state.corsMethods, headers: state.corsHeaders };
};

const listen: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "default");
  const portArg = args[1];
  const opts = (args[2] && typeof args[2] === "object" ? args[2] : {}) as Record<string, unknown>;
  const state = getState(id);
  if (state.server && state.server.listening) return { id, listening: true, port: state.port, host: state.host, message: "Already listening" };
  if (typeof portArg === "number") state.port = portArg;
  else if (typeof opts.port === "number") state.port = opts.port;
  if (typeof opts.host === "string") state.host = opts.host;
  const server = any(createRequestHandler(state));
  state.server = server;
  return new Promise<Value>((resolve: any, reject: any) => {
    server.on("error", (err: Error) => reject(new Error("Failed to start server: " + err.message)));
    server.listen(state.port, state.host, () => {
      resolve({ id, listening: true, port: state.port, host: state.host, url: "http://" + state.host + ":" + state.port });
    });
  });
};

const stop: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "default");
  const state = getState(id);
  if (!state.server) return { id, stopped: true, message: "No server to stop" };
  return new Promise<Value>((resolve: any) => {
    state.server!.close(() => { state.server = null; resolve({ id, stopped: true }); });
    setTimeout(() => { if (state.server) { state.server = null; resolve({ id, stopped: true, forced: true }); } }, 3000);
  });
};

const status: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "default");
  const state = getState(id);
  return {
    id, port: state.port, host: state.host,
    listening: state.server?.listening ?? false,
    routeCount: state.routes.length,
    staticDirCount: state.staticDirs.length,
    corsEnabled: state.corsEnabled,
    requestCount: state.requestLog.length,
    logRequests: state.logRequests,
  };
};

const logs: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "default");
  const opts = (args[1] && typeof args[1] === "object" ? args[1] : {}) as Record<string, unknown>;
  const state = getState(id);
  let entries = [...state.requestLog];
  if (typeof opts.method === "string") { const m = opts.method.toUpperCase(); entries = entries.filter((e: any) => e.method === m); }
  if (typeof opts.path === "string") { const p = opts.path; entries = entries.filter((e: any) => e.url.startsWith(p)); }
  if (typeof opts.limit === "number" && opts.limit > 0) entries = entries.slice(-opts.limit);
  return entries;
};

export const HttpFunctions: Record<string, BuiltinHandler> = {
  createServer, get, post, put, delete: del, html, file, redirect, static: staticDir, cors, listen, stop, status, logs,
};

export const HttpFunctionMetadata = {
  createServer: {
    description: "Create a new HTTP server instance (does not start listening yet)",
    parameters: [
      { name: "id", dataType: "string", description: "Unique server identifier", formInputType: "text", required: true },
      { name: "opts", dataType: "object", description: "Options: {port?, host?, logRequests?}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Server creation info",
    example: 'any "myapi" {"port": 8080}',
  },
  get: {
    description: "Register a GET route that returns static JSON data",
    parameters: [
      { name: "id", dataType: "string", description: "Server ID", formInputType: "text", required: true },
      { name: "path", dataType: "string", description: "URL path pattern", formInputType: "text", required: true },
      { name: "data", dataType: "any", description: "JSON data to return", formInputType: "json", required: true },
      { name: "opts", dataType: "object", description: "Options: {status?, headers?}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Route registration info",
    example: 'any "myapi" "/api/products" [{"id": 1}]',
  },
  post: {
    description: "Register a POST route that returns static JSON data",
    parameters: [
      { name: "id", dataType: "string", description: "Server ID", formInputType: "text", required: true },
      { name: "path", dataType: "string", description: "URL path pattern", formInputType: "text", required: true },
      { name: "data", dataType: "any", description: "JSON data to return", formInputType: "json", required: true },
      { name: "opts", dataType: "object", description: "Options: {status?, headers?}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Route registration info",
    example: 'any "myapi" "/api/products" {"created": true}',
  },
  put: {
    description: "Register a PUT route that returns static JSON data",
    parameters: [
      { name: "id", dataType: "string", description: "Server ID", formInputType: "text", required: true },
      { name: "path", dataType: "string", description: "URL path pattern", formInputType: "text", required: true },
      { name: "data", dataType: "any", description: "JSON data to return", formInputType: "json", required: true },
      { name: "opts", dataType: "object", description: "Options: {status?, headers?}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Route registration info",
    example: 'any "myapi" "/api/products/:id" {"updated": true}',
  },
  delete: {
    description: "Register a DELETE route that returns static JSON data",
    parameters: [
      { name: "id", dataType: "string", description: "Server ID", formInputType: "text", required: true },
      { name: "path", dataType: "string", description: "URL path pattern", formInputType: "text", required: true },
      { name: "data", dataType: "any", description: "JSON data to return", formInputType: "json", required: true },
      { name: "opts", dataType: "object", description: "Options: {status?, headers?}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Route registration info",
    example: 'any "myapi" "/api/products/:id" {"deleted": true}',
  },
  html: {
    description: "Register a GET route that serves an HTML string",
    parameters: [
      { name: "id", dataType: "string", description: "Server ID", formInputType: "text", required: true },
      { name: "path", dataType: "string", description: "URL path", formInputType: "text", required: true },
      { name: "content", dataType: "string", description: "HTML string to serve", formInputType: "textarea", required: true },
      { name: "opts", dataType: "object", description: "Options: {status?, headers?}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Route registration info",
    example: 'any "myapi" "/" "Hello World"',
  },
  file: {
    description: "Register a GET route that serves a file from disk",
    parameters: [
      { name: "id", dataType: "string", description: "Server ID", formInputType: "text", required: true },
      { name: "path", dataType: "string", description: "URL path", formInputType: "text", required: true },
      { name: "filePath", dataType: "string", description: "Absolute file path on disk", formInputType: "text", required: true },
      { name: "opts", dataType: "object", description: "Options: {status?, headers?}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Route registration info",
    example: 'any "myapi" "/report" "C:/reports/report.pdf"',
  },
  redirect: {
    description: "Register a route that redirects to another URL",
    parameters: [
      { name: "id", dataType: "string", description: "Server ID", formInputType: "text", required: true },
      { name: "fromPath", dataType: "string", description: "URL path to redirect from", formInputType: "text", required: true },
      { name: "toUrl", dataType: "string", description: "Target URL to redirect to", formInputType: "text", required: true },
      { name: "opts", dataType: "object", description: "Options: {status? (301 or 302)}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Route registration info",
    example: 'any "myapi" "/old" "/new" {"status": 301}',
  },
  static: {
    description: "Register a directory to serve static files from",
    parameters: [
      { name: "id", dataType: "string", description: "Server ID", formInputType: "text", required: true },
      { name: "dirPath", dataType: "string", description: "Absolute directory path", formInputType: "text", required: true },
      { name: "opts", dataType: "object", description: "Options (reserved)", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Static directory registration info",
    example: 'any "myapi" "C:/mysite/public"',
  },
  cors: {
    description: "Enable CORS on the server",
    parameters: [
      { name: "id", dataType: "string", description: "Server ID", formInputType: "text", required: true },
      { name: "opts", dataType: "object", description: "Options: {origin?, methods?, headers?}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "CORS configuration info",
    example: 'any "myapi" {"origin": "http://localhost:5173"}',
  },
  listen: {
    description: "Start the HTTP server listening for requests",
    parameters: [
      { name: "id", dataType: "string", description: "Server ID", formInputType: "text", required: true },
      { name: "port", dataType: "number", description: "Port number (default 3000)", formInputType: "text", required: false },
      { name: "opts", dataType: "object", description: "Options: {host?}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Server listening info with URL",
    example: 'any "myapi" 8080',
  },
  stop: {
    description: "Stop the HTTP server gracefully",
    parameters: [
      { name: "id", dataType: "string", description: "Server ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Server stop confirmation",
    example: 'any "myapi"',
  },
  status: {
    description: "Get server status: port, routes, listening state, request count",
    parameters: [
      { name: "id", dataType: "string", description: "Server ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Server status info",
    example: 'any "myapi"',
  },
  logs: {
    description: "Get the request log for a server",
    parameters: [
      { name: "id", dataType: "string", description: "Server ID", formInputType: "text", required: true },
      { name: "opts", dataType: "object", description: "Filter options: {limit?, method?, path?}", formInputType: "json", required: false },
    ],
    returnType: "array", returnDescription: "Array of request log entries",
    example: 'any "myapi" {"limit": 10, "method": "GET"}',
  },
};

export const HttpModuleMetadata = {
  description: "HTTP server for RobinPath scripts. Register routes with static responses (JSON, HTML, files), enable CORS, serve static directories. No callbacks needed.",
  methods: ["createServer", "get", "post", "put", "delete", "html", "file", "redirect", "static", "cors", "listen", "stop", "status", "logs"],
};
