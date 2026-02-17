// @ts-nocheck
import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import * as http from "node:http";
import * as https from "node:https";
import { URL } from "node:url";

interface ProxyInstance {
  server: any;
  target: string;
  port: number;
  rewriteRules: Map<string, string>;
  addHeaders: Map<string, string>;
  removeHeaders: Set<string>;
  requestInterceptors: Array<(req: any) => void>;
  responseInterceptors: Array<(proxyRes: any, res: any) => void>;
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
  req: any,
  res: any,
  proxy: ProxyInstance
): void {
  const parsedTarget = new URL(targetUrl);
  const rewrittenPath = applyRewriteRules(req.url ?? "/", proxy.rewriteRules);

  const isHttps = parsedTarget.protocol === "https:";
  const transport = isHttps ? https : http;

  const options: any = {
    hostname: parsedTarget.hostname,
    port: parsedTarget.port || (isHttps ? 443 : 80),
    path: rewrittenPath,
    method: req.method,
    headers: { ...req.headers, host: parsedTarget.host },
  };

  for (const interceptor of proxy.requestInterceptors) {
    interceptor(req);
  }

  const proxyReq = transport.request(options, (proxyRes: any) => {
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

  proxyReq.on("error", (err: any) => {
    proxy.stats.errors++;
    if (!res.headersSent) {
      res.writeHead(502, { "Content-Type": "application/json" });
    }
    res.end(JSON.stringify({ error: "Bad Gateway", message: err.message }));
  });

  req.pipe(proxyReq, { end: true });
}

const forward: BuiltinHandler = (args: Value[]): unknown => {
  const targetUrl = String(args[0]);
  const method = String(args[1] ?? "GET").toUpperCase();
  const path = String(args[2] ?? "/");
  const headers = (args[3] ?? {}) as Record<string, string>;
  const body = args[4] != null ? String(args[4]) : undefined;

  if (!targetUrl) throw new Error("Target URL is required.");

  const parsedTarget = new URL(targetUrl);
  const isHttps = parsedTarget.protocol === "https:";
  const transport = isHttps ? https : http;

  return new Promise<any>((resolve: any, reject: any) => {
    const options: any = {
      hostname: parsedTarget.hostname,
      port: parsedTarget.port || (isHttps ? 443 : 80),
      path,
      method,
      headers: { ...headers, host: parsedTarget.host },
    };

    const req = transport.request(options, (res: any) => {
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

    req.on("error", (err: any) => {
      reject(err);
    });

    if (body) {
      req.write(body);
    }

    req.end();
  });
};

const create: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const target = String(args[1]);
  const port = Number(args[2] ?? 8080);

  if (!target) throw new Error("Target URL is required.");

  if (proxies.has(id)) {
    throw new Error(`Proxy "${id}" already exists. Stop it first or use a different id.`);
  }

  const proxyInstance: ProxyInstance = {
    server: null as unknown as any,
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

  const server = any((req: any, res: any) => {
    const selectedTarget = selectTarget(proxyInstance);
    proxyRequest(selectedTarget, req, res, proxyInstance);
  });

  proxyInstance.server = server;
  proxies.set(id, proxyInstance);

  return { id, target, port, status: "created" };
};

const start: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const proxy = getProxy(id);

  return new Promise<any>((resolve: any, reject: any) => {
    proxy.server.listen(proxy.port, () => {
      proxy.stats.startedAt = Date.now();
      resolve({ id, port: proxy.port, target: proxy.target, status: "listening" });
    });

    proxy.server.on("error", (err: any) => {
      reject(err);
    });
  });
};

const stop: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const proxy = getProxy(id);

  return new Promise<any>((resolve: any, reject: any) => {
    proxy.server.close((err: any) => {
      if (err) reject(err);
      else {
        proxies.delete(id);
        resolve({ id, status: "stopped" });
      }
    });
  });
};

const rewrite: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const pattern = String(args[1]);
  const replacement = String(args[2]);

  if (!pattern) throw new Error("Pattern is required.");
  if (replacement === undefined) throw new Error("Replacement is required.");

  const proxy = getProxy(id);
  proxy.rewriteRules.set(pattern, replacement);

  return { id, pattern, replacement, status: "rule_added", totalRules: proxy.rewriteRules.size };
};

const addHeader: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const name = String(args[1]);
  const value = String(args[2]);

  if (!name) throw new Error("Header name is required.");
  if (!value) throw new Error("Header value is required.");

  const proxy = getProxy(id);
  proxy.addHeaders.set(name.toLowerCase(), value);

  return { id, header: name, value, status: "header_added" };
};

const removeHeader: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const name = String(args[1]);

  if (!name) throw new Error("Header name is required.");

  const proxy = getProxy(id);
  proxy.removeHeaders.add(name.toLowerCase());

  return { id, header: name, status: "header_will_be_removed" };
};

const onRequest: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const callback = args[1] as ((req: any) => void) | undefined;

  if (!callback || typeof callback !== "function") {
    throw new Error("A callback function is required.");
  }

  const proxy = getProxy(id);
  proxy.requestInterceptors.push(callback);

  return { id, status: "request_interceptor_added", totalInterceptors: proxy.requestInterceptors.length };
};

const onResponse: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const callback = args[1] as ((proxyRes: any, res: any) => void) | undefined;

  if (!callback || typeof callback !== "function") {
    throw new Error("A callback function is required.");
  }

  const proxy = getProxy(id);
  proxy.responseInterceptors.push(callback);

  return { id, status: "response_interceptor_added", totalInterceptors: proxy.responseInterceptors.length };
};

const balance: BuiltinHandler = (args: Value[]): unknown => {
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

const health: BuiltinHandler = (args: Value[]): unknown => {
  const targetUrl = String(args[0]);
  const timeoutMs = Number(args[1] ?? 5000);

  if (!targetUrl) throw new Error("Target URL is required.");

  const parsedTarget = new URL(targetUrl);
  const isHttps = parsedTarget.protocol === "https:";
  const transport = isHttps ? https : http;

  return new Promise<any>((resolve: any) => {
    const startTime = Date.now();

    const req = transport.request(
      {
        hostname: parsedTarget.hostname,
        port: parsedTarget.port || (isHttps ? 443 : 80),
        path: "/",
        method: "HEAD",
        timeout: timeoutMs,
      },
      (res: any) => {
        const latency = Date.now() - startTime;
        resolve({
          target: targetUrl,
          healthy: (res.statusCode ?? 500) < 500,
          statusCode: res.statusCode,
          latency,
        });
      }
    );

    req.on("error", (err: any) => {
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

const list: BuiltinHandler = (_args: Value[]): unknown => {
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

const stats: BuiltinHandler = (args: Value[]): unknown => {
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

export const ProxyFunctions = {
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

export const ProxyFunctionMetadata = {
  forward: {
    description: "Forward a single HTTP request to a target server and return the response",
    parameters: [
      { name: "targetUrl", dataType: "string", description: "Target server URL to forward to", optional: false },
      { name: "method", dataType: "string", description: "HTTP method (GET, POST, etc.)", optional: true },
      { name: "path", dataType: "string", description: "Request path (default: /)", optional: true },
      { name: "headers", dataType: "object", description: "Request headers", optional: true },
      { name: "body", dataType: "string", description: "Request body", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  create: {
    description: "Create a new HTTP proxy server instance",
    parameters: [
      { name: "id", dataType: "string", description: "Proxy identifier", optional: true },
      { name: "target", dataType: "string", description: "Default target URL to proxy requests to", optional: false },
      { name: "port", dataType: "number", description: "Port to listen on (default: 8080)", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  start: {
    description: "Start a proxy server and begin listening for requests",
    parameters: [
      { name: "id", dataType: "string", description: "Proxy identifier", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  stop: {
    description: "Stop a running proxy server and clean up resources",
    parameters: [
      { name: "id", dataType: "string", description: "Proxy identifier", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  rewrite: {
    description: "Add a URL rewrite rule to transform incoming request paths",
    parameters: [
      { name: "id", dataType: "string", description: "Proxy identifier", optional: true },
      { name: "pattern", dataType: "string", description: "Regex pattern to match in the URL", optional: false },
      { name: "replacement", dataType: "string", description: "Replacement string", optional: false },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  addHeader: {
    description: "Add a header to all proxied responses",
    parameters: [
      { name: "id", dataType: "string", description: "Proxy identifier", optional: true },
      { name: "name", dataType: "string", description: "Header name", optional: false },
      { name: "value", dataType: "string", description: "Header value", optional: false },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  removeHeader: {
    description: "Remove a header from all proxied responses",
    parameters: [
      { name: "id", dataType: "string", description: "Proxy identifier", optional: true },
      { name: "name", dataType: "string", description: "Header name to remove", optional: false },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  onRequest: {
    description: "Register an interceptor function for incoming requests",
    parameters: [
      { name: "id", dataType: "string", description: "Proxy identifier", optional: true },
      { name: "callback", dataType: "string", description: "Interceptor function receiving (req)", optional: false },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  onResponse: {
    description: "Register an interceptor function for proxy responses",
    parameters: [
      { name: "id", dataType: "string", description: "Proxy identifier", optional: true },
      { name: "callback", dataType: "string", description: "Interceptor function receiving (proxyRes, res)", optional: false },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  balance: {
    description: "Configure round-robin load balancing across multiple target servers",
    parameters: [
      { name: "id", dataType: "string", description: "Proxy identifier", optional: true },
      { name: "targets", dataType: "array", description: "Array of target URLs for load balancing", optional: false },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  health: {
    description: "Check the health of a target server by sending a HEAD request",
    parameters: [
      { name: "targetUrl", dataType: "string", description: "Target URL to check", optional: false },
      { name: "timeout", dataType: "number", description: "Timeout in milliseconds (default: 5000)", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  list: {
    description: "List all active proxy server instances and their configurations",
    parameters: [],

    returnType: "object",
    returnDescription: "API response.",
  },
  stats: {
    description: "Get statistics for a proxy server including request count, errors, and uptime",
    parameters: [
      { name: "id", dataType: "string", description: "Proxy identifier", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
};

export const ProxyModuleMetadata = {
  description: "HTTP proxy and request forwarding module using Node.js built-in http module. Supports creating proxy servers, URL rewriting, header manipulation, request and response interception, round-robin load balancing, and health checking. No external dependencies required.",
  version: "1.0.0",
};
