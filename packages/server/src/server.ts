import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import * as http from "node:http";
import * as fs from "node:fs";
import * as path from "node:path";

// ---------------------------------------------------------------------------
// Internal state
// ---------------------------------------------------------------------------

interface RouteEntry {
  method: string;
  path: string;
  handler: (req: http.IncomingMessage, res: http.ServerResponse) => void;
}

interface ServerInstance {
  server: http.Server;
  port: number;
  host: string;
  routes: RouteEntry[];
  requestHandlers: Array<(req: http.IncomingMessage, res: http.ServerResponse) => void>;
  errorHandlers: Array<(err: Error) => void>;
  staticDirs: string[];
  corsOptions: { origin: string; methods: string; headers: string } | null;
}

const servers: Map<string, ServerInstance> = new Map();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getServer(id: string): ServerInstance {
  const inst = servers.get(id);
  if (!inst) throw new Error(`Server "${id}" not found`);
  return inst;
}

function mimeType(ext: string): string {
  const types: Record<string, string> = {
    ".html": "text/html", ".htm": "text/html", ".css": "text/css",
    ".js": "application/javascript", ".json": "application/json",
    ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
    ".gif": "image/gif", ".svg": "image/svg+xml", ".ico": "image/x-icon",
    ".txt": "text/plain", ".xml": "application/xml", ".pdf": "application/pdf",
    ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf",
    ".eot": "application/vnd.ms-fontobject", ".mp3": "audio/mpeg",
    ".mp4": "video/mp4", ".webm": "video/webm", ".webp": "image/webp",
    ".wasm": "application/wasm", ".map": "application/json",
  };
  return types[ext] || "application/octet-stream";
}

function matchRoute(routes: RouteEntry[], method: string, url: string): RouteEntry | undefined {
  const pathname = url.split("?")[0];
  for (const route of routes) {
    if (route.method !== "*" && route.method !== method.toUpperCase()) continue;
    if (routeMatches(route.path, pathname)) return route;
  }
  return undefined;
}

function routeMatches(pattern: string, pathname: string): boolean {
  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = pathname.split("/").filter(Boolean);
  if (patternParts.length !== pathParts.length) {
    if (patternParts[patternParts.length - 1] !== "*") return false;
  }
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i] === "*") return true;
    if (patternParts[i].startsWith(":")) continue;
    if (patternParts[i] !== pathParts[i]) return false;
  }
  return patternParts.length === pathParts.length;
}

function extractParams(pattern: string, pathname: string): Record<string, string> {
  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = pathname.split("/").filter(Boolean);
  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(":")) {
      params[patternParts[i].slice(1)] = pathParts[i] || "";
    }
  }
  return params;
}

function tryServeStatic(inst: ServerInstance, req: http.IncomingMessage, res: http.ServerResponse): boolean {
  const pathname = (req.url || "/").split("?")[0];
  for (const dir of inst.staticDirs) {
    const filePath = path.join(dir, pathname);
    // Prevent path traversal
    if (!filePath.startsWith(dir)) continue;
    try {
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        const ext = path.extname(filePath);
        res.setHeader("Content-Type", mimeType(ext));
        res.setHeader("Content-Length", stat.size);
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
        return true;
      }
      // Try index.html for directories
      if (stat.isDirectory()) {
        const indexPath = path.join(filePath, "index.html");
        try {
          const indexStat = fs.statSync(indexPath);
          if (indexStat.isFile()) {
            res.setHeader("Content-Type", "text/html");
            res.setHeader("Content-Length", indexStat.size);
            const stream = fs.createReadStream(indexPath);
            stream.pipe(res);
            return true;
          }
        } catch { /* no index.html */ }
      }
    } catch { /* file not found, try next dir */ }
  }
  return false;
}

function applyCors(inst: ServerInstance, res: http.ServerResponse): void {
  if (!inst.corsOptions) return;
  res.setHeader("Access-Control-Allow-Origin", inst.corsOptions.origin);
  res.setHeader("Access-Control-Allow-Methods", inst.corsOptions.methods);
  res.setHeader("Access-Control-Allow-Headers", inst.corsOptions.headers);
}

function handleRequest(inst: ServerInstance, req: http.IncomingMessage, res: http.ServerResponse): void {
  applyCors(inst, res);

  // Handle CORS preflight
  if (req.method === "OPTIONS" && inst.corsOptions) {
    res.writeHead(204);
    res.end();
    return;
  }

  // Try custom request handlers first
  for (const handler of inst.requestHandlers) {
    handler(req, res);
    if (res.writableEnded) return;
  }

  // Try route matching
  const method = (req.method || "GET").toUpperCase();
  const url = req.url || "/";
  const route = matchRoute(inst.routes, method, url);
  if (route) {
    const pathname = url.split("?")[0];
    const params = extractParams(route.path, pathname);
    (req as any).params = params;
    route.handler(req, res);
    if (res.writableEnded) return;
    return;
  }

  // Try static files
  if (tryServeStatic(inst, req, res)) return;

  // 404
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
}

// ---------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------

const create: BuiltinHandler = (args: unknown[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const id = (opts.id ?? opts.name ?? `server_${servers.size + 1}`) as string;
  const port = (opts.port ?? 3000) as number;
  const host = (opts.host ?? "0.0.0.0") as string;

  if (servers.has(id)) throw new Error(`Server "${id}" already exists`);

  const inst: ServerInstance = {
    server: null!,
    port,
    host,
    routes: [],
    requestHandlers: [],
    errorHandlers: [],
    staticDirs: [],
    corsOptions: null,
  };

  const httpServer = http.createServer((req, res) => {
    try {
      handleRequest(inst, req, res);
    } catch (err) {
      for (const handler of inst.errorHandlers) {
        handler(err as Error);
      }
      if (!res.writableEnded) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      }
    }
  });

  httpServer.on("error", (err) => {
    for (const handler of inst.errorHandlers) {
      handler(err);
    }
  });

  inst.server = httpServer;
  servers.set(id, inst);
  return { id, port, host };
};

const start: BuiltinHandler = (args: unknown[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const id = (opts.id ?? opts.name) as string;
  if (!id) throw new Error("Server id is required");
  const inst = getServer(id);

  return new Promise<unknown>((resolve, reject) => {
    inst.server.listen(inst.port, inst.host, () => {
      resolve({ id, port: inst.port, host: inst.host, listening: true });
    });
    inst.server.once("error", reject);
  });
};

const stop: BuiltinHandler = (args: unknown[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const id = (opts.id ?? opts.name) as string;
  if (!id) throw new Error("Server id is required");
  const inst = getServer(id);

  return new Promise<unknown>((resolve, reject) => {
    inst.server.close((err) => {
      if (err) reject(err);
      else {
        servers.delete(id);
        resolve({ id, stopped: true });
      }
    });
  });
};

const onRequest: BuiltinHandler = (args: unknown[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const id = (opts.id ?? opts.name) as string;
  const handler = opts.handler as (req: http.IncomingMessage, res: http.ServerResponse) => void;
  if (!id) throw new Error("Server id is required");
  if (typeof handler !== "function") throw new Error("handler must be a function");
  const inst = getServer(id);
  inst.requestHandlers.push(handler);
  return { id, handlerCount: inst.requestHandlers.length };
};

const onError: BuiltinHandler = (args: unknown[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const id = (opts.id ?? opts.name) as string;
  const handler = opts.handler as (err: Error) => void;
  if (!id) throw new Error("Server id is required");
  if (typeof handler !== "function") throw new Error("handler must be a function");
  const inst = getServer(id);
  inst.errorHandlers.push(handler);
  return { id, errorHandlerCount: inst.errorHandlers.length };
};

const route: BuiltinHandler = (args: unknown[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const id = (opts.id ?? opts.name) as string;
  const method = ((opts.method ?? "GET") as string).toUpperCase();
  const routePath = opts.path as string;
  const handler = opts.handler as (req: http.IncomingMessage, res: http.ServerResponse) => void;

  if (!id) throw new Error("Server id is required");
  if (!routePath) throw new Error("path is required");
  if (typeof handler !== "function") throw new Error("handler must be a function");

  const inst = getServer(id);
  inst.routes.push({ method, path: routePath, handler });
  return { id, method, path: routePath, routeCount: inst.routes.length };
};

const staticServe: BuiltinHandler = (args: unknown[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const id = (opts.id ?? opts.name) as string;
  const dir = opts.dir as string;

  if (!id) throw new Error("Server id is required");
  if (!dir) throw new Error("dir is required");

  const resolvedDir = path.resolve(dir);
  const inst = getServer(id);
  inst.staticDirs.push(resolvedDir);
  return { id, dir: resolvedDir, staticDirCount: inst.staticDirs.length };
};

const sendJson: BuiltinHandler = (args: unknown[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const res = opts.res as http.ServerResponse;
  const data = opts.data;
  const statusCode = (opts.status ?? 200) as number;

  if (!res) throw new Error("res is required");

  const body = JSON.stringify(data);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
  return { sent: true, status: statusCode, contentType: "application/json" };
};

const sendHtml: BuiltinHandler = (args: unknown[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const res = opts.res as http.ServerResponse;
  const html = opts.html as string;
  const statusCode = (opts.status ?? 200) as number;

  if (!res) throw new Error("res is required");
  if (typeof html !== "string") throw new Error("html must be a string");

  res.writeHead(statusCode, {
    "Content-Type": "text/html",
    "Content-Length": Buffer.byteLength(html),
  });
  res.end(html);
  return { sent: true, status: statusCode, contentType: "text/html" };
};

const sendFile: BuiltinHandler = (args: unknown[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const res = opts.res as http.ServerResponse;
  const filePath = opts.path as string;
  const statusCode = (opts.status ?? 200) as number;

  if (!res) throw new Error("res is required");
  if (!filePath) throw new Error("path is required");

  const resolvedPath = path.resolve(filePath);
  try {
    const stat = fs.statSync(resolvedPath);
    if (!stat.isFile()) throw new Error("path is not a file");
    const ext = path.extname(resolvedPath);
    res.writeHead(statusCode, {
      "Content-Type": mimeType(ext),
      "Content-Length": stat.size,
    });
    const stream = fs.createReadStream(resolvedPath);
    stream.pipe(res);
    return { sent: true, status: statusCode, path: resolvedPath };
  } catch (err) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("File Not Found");
    return { sent: false, error: (err as Error).message };
  }
};

const sendRedirect: BuiltinHandler = (args: unknown[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const res = opts.res as http.ServerResponse;
  const url = opts.url as string;
  const statusCode = (opts.status ?? 302) as number;

  if (!res) throw new Error("res is required");
  if (!url) throw new Error("url is required");

  res.writeHead(statusCode, { Location: url });
  res.end();
  return { sent: true, status: statusCode, location: url };
};

const statusFn: BuiltinHandler = (args: unknown[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const res = opts.res as http.ServerResponse;
  const code = opts.code as number;
  const body = (opts.body ?? "") as string;

  if (!res) throw new Error("res is required");
  if (typeof code !== "number") throw new Error("code must be a number");

  res.writeHead(code, { "Content-Type": "text/plain" });
  res.end(body);
  return { sent: true, status: code };
};

const cors: BuiltinHandler = (args: unknown[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const id = (opts.id ?? opts.name) as string;
  const origin = (opts.origin ?? "*") as string;
  const methods = (opts.methods ?? "GET,HEAD,PUT,PATCH,POST,DELETE") as string;
  const headers = (opts.headers ?? "Content-Type,Authorization") as string;

  if (!id) throw new Error("Server id is required");
  const inst = getServer(id);
  inst.corsOptions = { origin, methods, headers };
  return { id, cors: inst.corsOptions };
};

const getServersFn: BuiltinHandler = (_args: unknown[]): unknown => {
  const result: Array<{ id: string; port: number; host: string; listening: boolean; routeCount: number }> = [];
  for (const [id, inst] of servers) {
    result.push({
      id,
      port: inst.port,
      host: inst.host,
      listening: inst.server.listening,
      routeCount: inst.routes.length,
    });
  }
  return result;
};

const getRoutesFn: BuiltinHandler = (args: unknown[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const id = (opts.id ?? opts.name) as string;
  if (!id) throw new Error("Server id is required");
  const inst = getServer(id);
  return inst.routes.map((r) => ({ method: r.method, path: r.path }));
};

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const ServerFunctions: Record<string, BuiltinHandler> = {
  create,
  start,
  stop,
  onRequest,
  onError,
  route,
  static: staticServe,
  sendJson,
  sendHtml,
  sendFile,
  sendRedirect,
  status: statusFn,
  cors,
  getServers: getServersFn,
  getRoutes: getRoutesFn,
};

export const ServerFunctionMetadata: Record<string, FunctionMetadata> = {
  create: {
    description: "Create a new HTTP server instance",
    parameters: [
      { name: "id", type: "string", description: "Unique server identifier", optional: true },
      { name: "port", type: "number", description: "Port to listen on (default 3000)", optional: true },
      { name: "host", type: "string", description: "Host to bind to (default 0.0.0.0)", optional: true },
    ],
    returns: { type: "object", description: "Server descriptor with id, port, host" },
  },
  start: {
    description: "Start listening for incoming connections",
    parameters: [
      { name: "id", type: "string", description: "Server identifier" },
    ],
    returns: { type: "object", description: "Server status with listening flag" },
  },
  stop: {
    description: "Stop the server and close all connections",
    parameters: [
      { name: "id", type: "string", description: "Server identifier" },
    ],
    returns: { type: "object", description: "Server stopped confirmation" },
  },
  onRequest: {
    description: "Register a handler for all incoming requests",
    parameters: [
      { name: "id", type: "string", description: "Server identifier" },
      { name: "handler", type: "function", description: "Request handler function (req, res)" },
    ],
    returns: { type: "object", description: "Handler registration result" },
  },
  onError: {
    description: "Register an error handler for the server",
    parameters: [
      { name: "id", type: "string", description: "Server identifier" },
      { name: "handler", type: "function", description: "Error handler function (err)" },
    ],
    returns: { type: "object", description: "Error handler registration result" },
  },
  route: {
    description: "Add a route with method, path pattern, and handler",
    parameters: [
      { name: "id", type: "string", description: "Server identifier" },
      { name: "method", type: "string", description: "HTTP method (GET, POST, etc.)", optional: true },
      { name: "path", type: "string", description: "Route path pattern (supports :param and *)" },
      { name: "handler", type: "function", description: "Route handler function (req, res)" },
    ],
    returns: { type: "object", description: "Route registration result" },
  },
  static: {
    description: "Serve static files from a directory",
    parameters: [
      { name: "id", type: "string", description: "Server identifier" },
      { name: "dir", type: "string", description: "Directory path to serve files from" },
    ],
    returns: { type: "object", description: "Static directory registration result" },
  },
  sendJson: {
    description: "Send a JSON response",
    parameters: [
      { name: "res", type: "object", description: "HTTP response object" },
      { name: "data", type: "any", description: "Data to serialize as JSON" },
      { name: "status", type: "number", description: "HTTP status code (default 200)", optional: true },
    ],
    returns: { type: "object", description: "Send result" },
  },
  sendHtml: {
    description: "Send an HTML response",
    parameters: [
      { name: "res", type: "object", description: "HTTP response object" },
      { name: "html", type: "string", description: "HTML content" },
      { name: "status", type: "number", description: "HTTP status code (default 200)", optional: true },
    ],
    returns: { type: "object", description: "Send result" },
  },
  sendFile: {
    description: "Send a file as the response",
    parameters: [
      { name: "res", type: "object", description: "HTTP response object" },
      { name: "path", type: "string", description: "Path to the file" },
      { name: "status", type: "number", description: "HTTP status code (default 200)", optional: true },
    ],
    returns: { type: "object", description: "Send result" },
  },
  sendRedirect: {
    description: "Send an HTTP redirect response",
    parameters: [
      { name: "res", type: "object", description: "HTTP response object" },
      { name: "url", type: "string", description: "URL to redirect to" },
      { name: "status", type: "number", description: "HTTP status code (default 302)", optional: true },
    ],
    returns: { type: "object", description: "Redirect result" },
  },
  status: {
    description: "Send a response with a specific status code",
    parameters: [
      { name: "res", type: "object", description: "HTTP response object" },
      { name: "code", type: "number", description: "HTTP status code" },
      { name: "body", type: "string", description: "Response body text", optional: true },
    ],
    returns: { type: "object", description: "Status send result" },
  },
  cors: {
    description: "Enable and configure CORS headers for a server",
    parameters: [
      { name: "id", type: "string", description: "Server identifier" },
      { name: "origin", type: "string", description: "Allowed origin (default *)", optional: true },
      { name: "methods", type: "string", description: "Allowed methods", optional: true },
      { name: "headers", type: "string", description: "Allowed headers", optional: true },
    ],
    returns: { type: "object", description: "CORS configuration result" },
  },
  getServers: {
    description: "List all active server instances",
    parameters: [],
    returns: { type: "array", description: "Array of server descriptors" },
  },
  getRoutes: {
    description: "List all routes registered on a server",
    parameters: [
      { name: "id", type: "string", description: "Server identifier" },
    ],
    returns: { type: "array", description: "Array of route descriptors" },
  },
};

export const ServerModuleMetadata: ModuleMetadata = {
  name: "server",
  description: "HTTP server creation and management using Node.js built-in http module. Supports routing, static file serving, CORS, and common response helpers.",
  version: "1.0.0",
};
