import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { createHmac, timingSafeEqual } from "node:crypto";

// ── Function Handlers ───────────────────────────────────────────────

const send: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const payload = args[1];
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (!url) throw new Error("URL is required");

  const secret = opts.secret != null ? String(opts.secret) : undefined;
  const method = String(opts.method ?? "POST").toUpperCase();
  const contentType = String(opts.contentType ?? "application/json");
  const headers: Record<string, string> = {
    "Content-Type": contentType,
    "User-Agent": "RobinPath-Webhook/1.0",
  };

  // Merge custom headers
  if (typeof opts.headers === "object" && opts.headers !== null) {
    for (const [k, v] of Object.entries(opts.headers as Record<string, unknown>)) {
      headers[k] = String(v);
    }
  }

  const body = contentType.includes("json") ? JSON.stringify(payload) : String(payload);

  // Sign the payload if secret is provided
  if (secret) {
    const algorithm = String(opts.algorithm ?? "sha256");
    const signature = createHmac(algorithm, secret).update(body).digest("hex");
    const headerName = String(opts.signatureHeader ?? "X-Webhook-Signature");
    headers[headerName] = `${algorithm}=${signature}`;
  }

  // Add timestamp
  const timestamp = Date.now().toString();
  headers["X-Webhook-Timestamp"] = timestamp;

  // Add custom event type
  if (opts.event) {
    headers["X-Webhook-Event"] = String(opts.event);
  }

  const response = await fetch(url, { method, headers, body });

  return {
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
    headers: Object.fromEntries(response.headers.entries()),
    body: response.headers.get("content-type")?.includes("json")
      ? await response.json()
      : await response.text(),
  };
};

const sign: BuiltinHandler = (args) => {
  const payload = typeof args[0] === "string" ? args[0] : JSON.stringify(args[0]);
  const secret = String(args[1] ?? "");
  const algorithm = String(args[2] ?? "sha256");

  const signature = createHmac(algorithm, secret).update(payload).digest("hex");
  return `${algorithm}=${signature}`;
};

const verify: BuiltinHandler = (args) => {
  const payload = typeof args[0] === "string" ? args[0] : JSON.stringify(args[0]);
  const secret = String(args[1] ?? "");
  const signature = String(args[2] ?? "");
  const algorithm = String(args[3] ?? "sha256");

  // Parse the signature format "algorithm=hex"
  let expectedAlgo = algorithm;
  let sigHex = signature;
  if (signature.includes("=")) {
    const parts = signature.split("=");
    expectedAlgo = parts[0]!;
    sigHex = parts.slice(1).join("=");
  }

  const expected = createHmac(expectedAlgo, secret).update(payload).digest("hex");

  if (expected.length !== sigHex.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(sigHex));
  } catch {
    return false;
  }
};

const verifyTimestamp: BuiltinHandler = (args) => {
  const timestamp = parseInt(String(args[0] ?? "0"), 10);
  const toleranceMs = parseInt(String(args[1] ?? "300000"), 10); // default 5 minutes
  const now = Date.now();
  const diff = Math.abs(now - timestamp);
  return {
    valid: diff <= toleranceMs,
    ageMs: diff,
    toleranceMs,
  };
};

const parsePayload: BuiltinHandler = (args) => {
  const body = args[0];
  const contentType = String(args[1] ?? "application/json");

  if (contentType.includes("json")) {
    if (typeof body === "string") return JSON.parse(body);
    return body;
  }

  if (contentType.includes("x-www-form-urlencoded")) {
    const params = new URLSearchParams(String(body));
    const result: Record<string, string> = {};
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    return result;
  }

  return String(body);
};

const buildPayload: BuiltinHandler = (args) => {
  const event = String(args[0] ?? "");
  const data = args[1];
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  return {
    event,
    data,
    timestamp: new Date().toISOString(),
    id: opts.id ?? `wh_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    ...(opts.metadata ? { metadata: opts.metadata } : {}),
  };
};

const headers: BuiltinHandler = (args) => {
  const secret = String(args[0] ?? "");
  const payload = typeof args[1] === "string" ? args[1] : JSON.stringify(args[1]);
  const event = args[2] != null ? String(args[2]) : undefined;
  const algorithm = String(args[3] ?? "sha256");

  const timestamp = Date.now().toString();
  const result: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "RobinPath-Webhook/1.0",
    "X-Webhook-Timestamp": timestamp,
  };

  if (secret) {
    const signature = createHmac(algorithm, secret).update(payload).digest("hex");
    result["X-Webhook-Signature"] = `${algorithm}=${signature}`;
  }

  if (event) {
    result["X-Webhook-Event"] = event;
  }

  return result;
};

const isValidUrl: BuiltinHandler = (args) => {
  const url = String(args[0] ?? "");
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
};

// ── Exports ─────────────────────────────────────────────────────────

export const WebhookFunctions: Record<string, BuiltinHandler> = {
  send, sign, verify, verifyTimestamp, parsePayload, buildPayload, headers, isValidUrl,
};

export const WebhookFunctionMetadata = {
  send: {
    description: "Send a webhook POST request with optional HMAC signature",
    parameters: [
      { name: "url", dataType: "string", description: "Target webhook URL", formInputType: "text", required: true },
      { name: "payload", dataType: "any", description: "Data to send", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{secret, method, contentType, headers, algorithm, signatureHeader, event}", formInputType: "text", required: false },
    ],
    returnType: "object", returnDescription: "{status, statusText, ok, headers, body}", example: 'webhook.send "https://example.com/hook" $data {"secret": "whsec_abc"}',
  },
  sign: {
    description: "Create an HMAC signature for a webhook payload",
    parameters: [
      { name: "payload", dataType: "any", description: "The payload to sign (string or object)", formInputType: "text", required: true },
      { name: "secret", dataType: "string", description: "The webhook secret", formInputType: "text", required: true },
      { name: "algorithm", dataType: "string", description: "Hash algorithm (default: sha256)", formInputType: "text", required: false },
    ],
    returnType: "string", returnDescription: "Signature in format 'algorithm=hex'", example: 'webhook.sign $payload "whsec_abc"',
  },
  verify: {
    description: "Verify a webhook HMAC signature using timing-safe comparison",
    parameters: [
      { name: "payload", dataType: "any", description: "The received payload", formInputType: "text", required: true },
      { name: "secret", dataType: "string", description: "The webhook secret", formInputType: "text", required: true },
      { name: "signature", dataType: "string", description: "The received signature", formInputType: "text", required: true },
      { name: "algorithm", dataType: "string", description: "Hash algorithm (default: sha256)", formInputType: "text", required: false },
    ],
    returnType: "boolean", returnDescription: "True if signature is valid", example: 'webhook.verify $body "whsec_abc" $signatureHeader',
  },
  verifyTimestamp: {
    description: "Verify a webhook timestamp is within acceptable tolerance to prevent replay attacks",
    parameters: [
      { name: "timestamp", dataType: "number", description: "Timestamp in milliseconds", formInputType: "text", required: true },
      { name: "toleranceMs", dataType: "number", description: "Tolerance in ms (default 300000 = 5min)", formInputType: "text", required: false },
    ],
    returnType: "object", returnDescription: "{valid, ageMs, toleranceMs}", example: 'webhook.verifyTimestamp $timestamp 60000',
  },
  parsePayload: {
    description: "Parse a raw webhook body based on content type",
    parameters: [
      { name: "body", dataType: "any", description: "Raw request body", formInputType: "text", required: true },
      { name: "contentType", dataType: "string", description: "Content-Type header (default: application/json)", formInputType: "text", required: false },
    ],
    returnType: "any", returnDescription: "Parsed payload", example: 'webhook.parsePayload $rawBody "application/json"',
  },
  buildPayload: {
    description: "Build a standardized webhook payload with event name, data, timestamp, and ID",
    parameters: [
      { name: "event", dataType: "string", description: "Event type name", formInputType: "text", required: true },
      { name: "data", dataType: "any", description: "Event data", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{id, metadata}", formInputType: "text", required: false },
    ],
    returnType: "object", returnDescription: "{event, data, timestamp, id}", example: 'webhook.buildPayload "order.created" $orderData',
  },
  headers: {
    description: "Build webhook headers including signature and timestamp",
    parameters: [
      { name: "secret", dataType: "string", description: "Webhook secret for signing", formInputType: "text", required: true },
      { name: "payload", dataType: "any", description: "The payload being sent", formInputType: "text", required: true },
      { name: "event", dataType: "string", description: "Event type header (optional)", formInputType: "text", required: false },
    ],
    returnType: "object", returnDescription: "Headers object ready for HTTP request", example: 'webhook.headers "whsec_abc" $payload "order.created"',
  },
  isValidUrl: {
    description: "Check if a string is a valid HTTP/HTTPS webhook URL",
    parameters: [
      { name: "url", dataType: "string", description: "URL to validate", formInputType: "text", required: true },
    ],
    returnType: "boolean", returnDescription: "True if valid HTTP(S) URL", example: 'webhook.isValidUrl "https://example.com/hook"',
  },
};

export const WebhookModuleMetadata = {
  description: "Send webhooks with HMAC signatures, verify incoming webhook payloads, and prevent replay attacks",
  methods: ["send", "sign", "verify", "verifyTimestamp", "parsePayload", "buildPayload", "headers", "isValidUrl"],
};
