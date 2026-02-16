import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import * as http from "node:http";
import * as https from "node:https";
import { URL } from "node:url";

interface ProxyInstance {
  server: http.Server;
  target: string;
  port: number;
  rewriteRules: Map<string, string>;
  addHeaders: Map<string, string>;
  removeHeaders: Set<string>;
  requestInterceptors: Array<(req: http.IncomingMessage) => void>;
  responseInterceptors: Array<(proxyRes: http.IncomingMessage, res: http.ServerResponse) => void>;
  targets: string[];
  currentTargetIndex: number;
  stats: { requests: number; errors: number; startedAt: number; bytesTransferred: number };
}

const proxies: Map<string, ProxyInstance> = new Map();

function getProxy(id: string): ProxyInstance {
  const proxy = proxies.get(id);
  if (!proxy) {
    throw new Error(`Proxy "${id}" not found. Call create() first.`);
  }
  return proxy;
}

function selectTarget(proxy: ProxyInstance): string {
  if (proxy.targets.length === 0) {
    return proxy.target;
  }
  const target = proxy.targets[proxy.currentTargetIndex % proxy.targets.length];
  proxy.currentTargetIndex = (proxy.currentTargetIndex + 1) % proxy.targets.length;
  return target;
}

function applyRewriteRules(url: string, rules: Map<string, string>): string {
  let rewritten = url;
  for (const [pattern, replacement] of rules) {
    rewritten = rewritten.replace(new RegExp(pattern), replacement);
  }
  return rewritten;
}

function proxyRequest(
  targetUrl: string,
  req: http.IncomingMessage,
  res: http.ServerResponse,
  proxy: ProxyInstance
): void {
  const parsedTarget = new URL(targetUrl);
  const rewrittenPath = applyRewriteRules(req.url ?? "/", proxy.rewriteRules);

  const isHttps = parsedTarget.protocol === "https:";
  const transport = isHttps ? https : http;

  const options: http.RequestOptions = {
    hostname: parsedTarget.hostname,
    port: parsedTarget.port || (isHttps ? 443 : 80),
    path: rewrittenPath,
    method: req.method,
    headers: { ...req.headers, host: parsedTarget.host },
  };

  for (const interceptor of proxy.requestInterceptors) {
    interceptor(req);
  }

  const proxyReq = transport.request(options, (proxyRes) => {
    for (const interceptor of proxy.responseInterceptors) {
      interceptor(proxyRes, res);
    }

    const headers = { ...proxyRes.headers };

    for (const [key, value] of proxy.addHeaders) {
      headers[key] = value;
    }

    for (const key of proxy.removeHeaders) {
      delete headers[key];
    }

    res.writeHead(proxyRes.statusCode ?? 502, headers);

    proxyRes.on("data", (chunk: Buffer) => {
      proxy.stats.bytesTransferred += chunk.length;
    });

    proxyRes.pipe(res, { end: true });
    proxy.stats.requests++;
  });

  proxyReq.on("error", (err) => {
    proxy.stats.errors++;
    if (!res.headersSent) {
      res.writeHead(502, { "Content-Type": "application/json" });
    }
    res.end(JSON.stringify({ error: "Bad Gateway", message: err.message }));
  });

  req.pipe(proxyReq, { end: true });
}

const forward: BuiltinHandler = (args: unknown[]): unknown => {
  const targetUrl = String(args[0]);
  const method = String(args[1] ?? "GET").toUpperCase();
  const path = String(args[2] ?? "/");
  const headers = (args[3] ?? {}) as Record<string, string>;
  const body = args[4] != null ? String(args[4]) : undefined;

  if (!targetUrl) throw new Error("Target URL is required.");

  const parsedTarget = new URL(targetUrl);
  const isHttps = parsedTarget.protocol === "https:";
  const transport = isHttps ? https : http;

  return new Promise<unknown>((resolve, reject) => {
    const options: http.RequestOptions = {
      hostname: parsedTarget.hostname,
      port: parsedTarget.port || (isHttps ? 443 : 80),
      path,
      method,
      headers: { ...headers, host: parsedTarget.host },
    };

    const req = transport.request(options, (res) => {
      const chunks: Buffer[] = [];

      res.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });

      res.on("end", () => {
        const responseBody = Buffer.concat(chunks).toString("utf-8");
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: responseBody,
        });
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    if (body) {
      req.write(body);
    }

    req.end();
  });
};

const create: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const target = String(args[1]);
  const port = Number(args[2] ?? 8080);

  if (!target) throw new Error("Target URL is required.");

  if (proxies.has(id)) {
    throw new Error(`Proxy "${id}" already exists. Stop it first or use a different id.`);
  }

  const proxyInstance: ProxyInstance = {
    server: null as unknown as http.Server,
    target,
    port,
    rewriteRules: new Map(),
    addHeaders: new Map(),
    removeHeaders: new Set(),
    requestInterceptors: [],
    responseInterceptors: [],
    targets: [],
    currentTargetIndex: 0,
    stats: { requests: 0, errors: 0, startedAt: 0, bytesTransferred: 0 },
  };

  const server = http.createServer((req, res) => {
    const selectedTarget = selectTarget(proxyInstance);
    proxyRequest(selectedTarget, req, res, proxyInstance);
  });

  proxyInstance.server = server;
  proxies.set(id, proxyInstance);

  return { id, target, port, status: "created" };
};

const start: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const proxy = getProxy(id);

  return new Promise<unknown>((resolve, reject) => {
    proxy.server.listen(proxy.port, () => {
      proxy.stats.startedAt = Date.now();
      resolve({ id, port: proxy.port, target: proxy.target, status: "listening" });
    });

    proxy.server.on("error", (err) => {
      reject(err);
    });
  });
};

const stop: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const proxy = getProxy(id);

  return new Promise<unknown>((resolve, reject) => {
    proxy.server.close((err) => {
      if (err) reject(err);
      else {
        proxies.delete(id);
        resolve({ id, status: "stopped" });
      }
    });
  });
};

const rewrite: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const pattern = String(args[1]);
  const replacement = String(args[2]);

  if (!pattern) throw new Error("Pattern is required.");
  if (replacement === undefined) throw new Error("Replacement is required.");

  const proxy = getProxy(id);
  proxy.rewriteRules.set(pattern, replacement);

  return { id, pattern, replacement, status: "rule_added", totalRules: proxy.rewriteRules.size };
};

const addHeader: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const name = String(args[1]);
  const value = String(args[2]);

  if (!name) throw new Error("Header name is required.");
  if (!value) throw new Error("Header value is required.");

  const proxy = getProxy(id);
  proxy.addHeaders.set(name.toLowerCase(), value);

  return { id, header: name, value, status: "header_added" };
};

const removeHeader: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const name = String(args[1]);

  if (!name) throw new Error("Header name is required.");

  const proxy = getProxy(id);
  proxy.removeHeaders.add(name.toLowerCase());

  return { id, header: name, status: "header_will_be_removed" };
};

const onRequest: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const callback = args[1] as ((req: http.IncomingMessage) => void) | undefined;

  if (!callback || typeof callback !== "function") {
    throw new Error("A callback function is required.");
  }

  const proxy = getProxy(id);
  proxy.requestInterceptors.push(callback);

  return { id, status: "request_interceptor_added", totalInterceptors: proxy.requestInterceptors.length };
};

const onResponse: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const callback = args[1] as ((proxyRes: http.IncomingMessage, res: http.ServerResponse) => void) | undefined;

  if (!callback || typeof callback !== "function") {
    throw new Error("A callback function is required.");
  }

  const proxy = getProxy(id);
  proxy.responseInterceptors.push(callback);

  return { id, status: "response_interceptor_added", totalInterceptors: proxy.responseInterceptors.length };
};

const balance: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const targets = args[1] as string[];

  if (!targets || !Array.isArray(targets) || targets.length === 0) {
    throw new Error("An array of target URLs is required.");
  }

  const proxy = getProxy(id);
  proxy.targets = targets.map(String);
  proxy.currentTargetIndex = 0;

  return { id, targets: proxy.targets, strategy: "round-robin", status: "configured" };
};

const health: BuiltinHandler = (args: unknown[]): unknown => {
  const targetUrl = String(args[0]);
  const timeoutMs = Number(args[1] ?? 5000);

  if (!targetUrl) throw new Error("Target URL is required.");

  const parsedTarget = new URL(targetUrl);
  const isHttps = parsedTarget.protocol === "https:";
  const transport = isHttps ? https : http;

  return new Promise<unknown>((resolve) => {
    const startTime = Date.now();

    const req = transport.request(
      {
        hostname: parsedTarget.hostname,
        port: parsedTarget.port || (isHttps ? 443 : 80),
        path: "/",
        method: "HEAD",
        timeout: timeoutMs,
      },
      (res) => {
        const latency = Date.now() - startTime;
        resolve({
          target: targetUrl,
          healthy: (res.statusCode ?? 500) < 500,
          statusCode: res.statusCode,
          latency,
        });
      }
    );

    req.on("error", (err) => {
      const latency = Date.now() - startTime;
      resolve({
        target: targetUrl,
        healthy: false,
        error: err.message,
        latency,
      });
    });

    req.on("timeout", () => {
      req.destroy();
      const latency = Date.now() - startTime;
      resolve({
        target: targetUrl,
        healthy: false,
        error: "Timeout",
        latency,
      });
    });

    req.end();
  });
};

const list: BuiltinHandler = (_args: unknown[]): unknown => {
  const result: Record<string, unknown>[] = [];

  for (const [id, proxy] of proxies) {
    result.push({
      id,
      target: proxy.target,
      port: proxy.port,
      targets: proxy.targets,
      rewriteRules: proxy.rewriteRules.size,
      addHeaders: proxy.addHeaders.size,
      removeHeaders: proxy.removeHeaders.size,
      requestInterceptors: proxy.requestInterceptors.length,
      responseInterceptors: proxy.responseInterceptors.length,
      listening: proxy.server.listening,
    });
  }

  return { proxies: result, count: result.length };
};

const stats: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const proxy = getProxy(id);

  const uptime = proxy.stats.startedAt > 0 ? Date.now() - proxy.stats.startedAt : 0;

  return {
    id,
    requests: proxy.stats.requests,
    errors: proxy.stats.errors,
    bytesTransferred: proxy.stats.bytesTransferred,
    uptime,
    errorRate: proxy.stats.requests > 0 ? proxy.stats.errors / proxy.stats.requests : 0,
    listening: proxy.server.listening,
  };
};

export const ProxyFunctions: Record<string, BuiltinHandler> = {
  forward,
  create,
  start,
  stop,
  rewrite,
  addHeader,
  removeHeader,
  onRequest,
  onResponse,
  balance,
  health,
  list,
  stats,
};

export const ProxyFunctionMetadata: Record<string, FunctionMetadata> = {
  forward: {
    description: "Forward a single HTTP request to a target server and return the response",
    parameters: [
      { name: "targetUrl", type: "string", description: "Target server URL to forward to", optional: false },
      { name: "method", type: "string", description: "HTTP method (GET, POST, etc.)", optional: true },
      { name: "path", type: "string", description: "Request path (default: /)", optional: true },
      { name: "headers", type: "object", description: "Request headers", optional: true },
      { name: "body", type: "string", description: "Request body", optional: true },
    ],
    returns: { type: "object", description: "Response with statusCode, headers, and body" },
  },
  create: {
    description: "Create a new HTTP proxy server instance",
    parameters: [
      { name: "id", type: "string", description: "Proxy identifier", optional: true },
      { name: "target", type: "string", description: "Default target URL to proxy requests to", optional: false },
      { name: "port", type: "number", description: "Port to listen on (default: 8080)", optional: true },
    ],
    returns: { type: "object", description: "Proxy creation confirmation" },
  },
  start: {
    description: "Start a proxy server and begin listening for requests",
    parameters: [
      { name: "id", type: "string", description: "Proxy identifier", optional: true },
    ],
    returns: { type: "object", description: "Start confirmation with port and target" },
  },
  stop: {
    description: "Stop a running proxy server and clean up resources",
    parameters: [
      { name: "id", type: "string", description: "Proxy identifier", optional: true },
    ],
    returns: { type: "object", description: "Stop confirmation" },
  },
  rewrite: {
    description: "Add a URL rewrite rule to transform incoming request paths",
    parameters: [
      { name: "id", type: "string", description: "Proxy identifier", optional: true },
      { name: "pattern", type: "string", description: "Regex pattern to match in the URL", optional: false },
      { name: "replacement", type: "string", description: "Replacement string", optional: false },
    ],
    returns: { type: "object", description: "Rewrite rule confirmation" },
  },
  addHeader: {
    description: "Add a header to all proxied responses",
    parameters: [
      { name: "id", type: "string", description: "Proxy identifier", optional: true },
      { name: "name", type: "string", description: "Header name", optional: false },
      { name: "value", type: "string", description: "Header value", optional: false },
    ],
    returns: { type: "object", description: "Header addition confirmation" },
  },
  removeHeader: {
    description: "Remove a header from all proxied responses",
    parameters: [
      { name: "id", type: "string", description: "Proxy identifier", optional: true },
      { name: "name", type: "string", description: "Header name to remove", optional: false },
    ],
    returns: { type: "object", description: "Header removal confirmation" },
  },
  onRequest: {
    description: "Register an interceptor function for incoming requests",
    parameters: [
      { name: "id", type: "string", description: "Proxy identifier", optional: true },
      { name: "callback", type: "function", description: "Interceptor function receiving (req)", optional: false },
    ],
    returns: { type: "object", description: "Interceptor registration confirmation" },
  },
  onResponse: {
    description: "Register an interceptor function for proxy responses",
    parameters: [
      { name: "id", type: "string", description: "Proxy identifier", optional: true },
      { name: "callback", type: "function", description: "Interceptor function receiving (proxyRes, res)", optional: false },
    ],
    returns: { type: "object", description: "Interceptor registration confirmation" },
  },
  balance: {
    description: "Configure round-robin load balancing across multiple target servers",
    parameters: [
      { name: "id", type: "string", description: "Proxy identifier", optional: true },
      { name: "targets", type: "array", description: "Array of target URLs for load balancing", optional: false },
    ],
    returns: { type: "object", description: "Load balancing configuration confirmation" },
  },
  health: {
    description: "Check the health of a target server by sending a HEAD request",
    parameters: [
      { name: "targetUrl", type: "string", description: "Target URL to check", optional: false },
      { name: "timeout", type: "number", description: "Timeout in milliseconds (default: 5000)", optional: true },
    ],
    returns: { type: "object", description: "Health check result with healthy boolean, statusCode, and latency" },
  },
  list: {
    description: "List all active proxy server instances and their configurations",
    parameters: [],
    returns: { type: "object", description: "Array of proxy instances with their settings" },
  },
  stats: {
    description: "Get statistics for a proxy server including request count, errors, and uptime",
    parameters: [
      { name: "id", type: "string", description: "Proxy identifier", optional: true },
    ],
    returns: { type: "object", description: "Proxy statistics with requests, errors, bytes, uptime, and error rate" },
  },
};

export const ProxyModuleMetadata: ModuleMetadata = {
  name: "proxy",
  description: "HTTP proxy and request forwarding module using Node.js built-in http module. Supports creating proxy servers, URL rewriting, header manipulation, request and response interception, round-robin load balancing, and health checking. No external dependencies required.",
  version: "1.0.0",
};
