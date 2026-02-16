import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { readFileSync, writeFileSync } from "node:fs";
import { basename } from "node:path";

type Value = string | number | boolean | null | object;

// ── Profile System ──────────────────────────────────────────────────

interface ProfileConfig {
  baseUrl: string;
  headers: Record<string, string>;
  auth: { type: "bearer" | "basic" | "apikey"; token: string; headerName?: string } | null;
  timeout: number;
}

const profiles = new Map<string, ProfileConfig>();

function getProfile(id: string | undefined): ProfileConfig {
  if (id && profiles.has(id)) return profiles.get(id)!;
  return { baseUrl: "", headers: {}, auth: null, timeout: 30000 };
}

// ── Core Request Helper ─────────────────────────────────────────────

async function doRequest(
  method: string,
  url: string,
  body: Value | undefined,
  opts: Record<string, unknown>
): Promise<Value> {
  const profileId = typeof opts.profile === "string" ? opts.profile : undefined;
  const profile = getProfile(profileId);

  // Resolve URL
  let resolvedUrl = url;
  if (!/^https?:\/\//i.test(resolvedUrl) && profile.baseUrl) {
    const base = profile.baseUrl.endsWith("/") ? profile.baseUrl : profile.baseUrl + "/";
    const path = resolvedUrl.startsWith("/") ? resolvedUrl.slice(1) : resolvedUrl;
    resolvedUrl = base + path;
  }

  // Merge headers: profile defaults < opts.headers
  const headers: Record<string, string> = { ...profile.headers };
  if (typeof opts.headers === "object" && opts.headers !== null) {
    for (const [k, v] of Object.entries(opts.headers as Record<string, unknown>)) {
      headers[k] = String(v);
    }
  }

  // Apply auth
  const auth = profile.auth;
  if (auth) {
    switch (auth.type) {
      case "bearer":
        headers["Authorization"] = `Bearer ${auth.token}`;
        break;
      case "basic":
        headers["Authorization"] = `Basic ${Buffer.from(auth.token).toString("base64")}`;
        break;
      case "apikey":
        headers[auth.headerName ?? "X-API-Key"] = auth.token;
        break;
    }
  }

  // Prepare body
  let requestBody: string | undefined;
  if (body !== undefined && body !== null) {
    if (typeof body === "object") {
      if (!headers["Content-Type"]) headers["Content-Type"] = "application/json";
      requestBody = JSON.stringify(body);
    } else {
      requestBody = String(body);
    }
  }

  // Timeout
  const timeout = typeof opts.timeout === "number" ? opts.timeout : profile.timeout;

  // Execute request
  const response = await fetch(resolvedUrl, {
    method: method.toUpperCase(),
    headers,
    body: requestBody,
    signal: AbortSignal.timeout(timeout),
  });

  // Parse response body
  const contentType = response.headers.get("content-type") ?? "";
  let responseBody: Value;
  if (contentType.includes("json")) {
    responseBody = (await response.json()) as Value;
  } else {
    responseBody = await response.text();
  }

  // Full response or body-only
  if (opts.fullResponse === true) {
    return {
      status: response.status,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseBody,
    };
  }

  return responseBody;
}

// ── Function Handlers ───────────────────────────────────────────────

const get: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!url) throw new Error("URL is required");
  return doRequest("GET", url, undefined, opts);
};

const post: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const body = args[1] ?? null;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!url) throw new Error("URL is required");
  return doRequest("POST", url, body, opts);
};

const put: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const body = args[1] ?? null;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!url) throw new Error("URL is required");
  return doRequest("PUT", url, body, opts);
};

const patch: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const body = args[1] ?? null;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!url) throw new Error("URL is required");
  return doRequest("PATCH", url, body, opts);
};

const del: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!url) throw new Error("URL is required");
  return doRequest("DELETE", url, undefined, opts);
};

const head: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!url) throw new Error("URL is required");

  const profileId = typeof opts.profile === "string" ? opts.profile : undefined;
  const profile = getProfile(profileId);

  let resolvedUrl = url;
  if (!/^https?:\/\//i.test(resolvedUrl) && profile.baseUrl) {
    const base = profile.baseUrl.endsWith("/") ? profile.baseUrl : profile.baseUrl + "/";
    const path = resolvedUrl.startsWith("/") ? resolvedUrl.slice(1) : resolvedUrl;
    resolvedUrl = base + path;
  }

  const headers: Record<string, string> = { ...profile.headers };
  if (typeof opts.headers === "object" && opts.headers !== null) {
    for (const [k, v] of Object.entries(opts.headers as Record<string, unknown>)) {
      headers[k] = String(v);
    }
  }

  const auth = profile.auth;
  if (auth) {
    switch (auth.type) {
      case "bearer":
        headers["Authorization"] = `Bearer ${auth.token}`;
        break;
      case "basic":
        headers["Authorization"] = `Basic ${Buffer.from(auth.token).toString("base64")}`;
        break;
      case "apikey":
        headers[auth.headerName ?? "X-API-Key"] = auth.token;
        break;
    }
  }

  const timeout = typeof opts.timeout === "number" ? opts.timeout : profile.timeout;

  const response = await fetch(resolvedUrl, {
    method: "HEAD",
    headers,
    signal: AbortSignal.timeout(timeout),
  });

  return Object.fromEntries(response.headers.entries());
};

const download: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const filePath = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!url) throw new Error("URL is required");
  if (!filePath) throw new Error("File path is required");

  const profileId = typeof opts.profile === "string" ? opts.profile : undefined;
  const profile = getProfile(profileId);

  let resolvedUrl = url;
  if (!/^https?:\/\//i.test(resolvedUrl) && profile.baseUrl) {
    const base = profile.baseUrl.endsWith("/") ? profile.baseUrl : profile.baseUrl + "/";
    const path = resolvedUrl.startsWith("/") ? resolvedUrl.slice(1) : resolvedUrl;
    resolvedUrl = base + path;
  }

  const headers: Record<string, string> = { ...profile.headers };
  if (typeof opts.headers === "object" && opts.headers !== null) {
    for (const [k, v] of Object.entries(opts.headers as Record<string, unknown>)) {
      headers[k] = String(v);
    }
  }

  const auth = profile.auth;
  if (auth) {
    switch (auth.type) {
      case "bearer":
        headers["Authorization"] = `Bearer ${auth.token}`;
        break;
      case "basic":
        headers["Authorization"] = `Basic ${Buffer.from(auth.token).toString("base64")}`;
        break;
      case "apikey":
        headers[auth.headerName ?? "X-API-Key"] = auth.token;
        break;
    }
  }

  const timeout = typeof opts.timeout === "number" ? opts.timeout : profile.timeout;

  const response = await fetch(resolvedUrl, {
    method: "GET",
    headers,
    signal: AbortSignal.timeout(timeout),
  });

  if (!response.ok) {
    throw new Error(`Download failed: ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  writeFileSync(filePath, buffer);

  return {
    path: filePath,
    size: buffer.length,
    contentType: response.headers.get("content-type") ?? "application/octet-stream",
  };
};

const upload: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const filePath = String(args[1] ?? "");
  const fieldName = typeof args[2] === "string" ? args[2] : "file";
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  if (!url) throw new Error("URL is required");
  if (!filePath) throw new Error("File path is required");

  const profileId = typeof opts.profile === "string" ? opts.profile : undefined;
  const profile = getProfile(profileId);

  let resolvedUrl = url;
  if (!/^https?:\/\//i.test(resolvedUrl) && profile.baseUrl) {
    const base = profile.baseUrl.endsWith("/") ? profile.baseUrl : profile.baseUrl + "/";
    const path = resolvedUrl.startsWith("/") ? resolvedUrl.slice(1) : resolvedUrl;
    resolvedUrl = base + path;
  }

  const headers: Record<string, string> = { ...profile.headers };
  if (typeof opts.headers === "object" && opts.headers !== null) {
    for (const [k, v] of Object.entries(opts.headers as Record<string, unknown>)) {
      headers[k] = String(v);
    }
  }

  const auth = profile.auth;
  if (auth) {
    switch (auth.type) {
      case "bearer":
        headers["Authorization"] = `Bearer ${auth.token}`;
        break;
      case "basic":
        headers["Authorization"] = `Basic ${Buffer.from(auth.token).toString("base64")}`;
        break;
      case "apikey":
        headers[auth.headerName ?? "X-API-Key"] = auth.token;
        break;
    }
  }

  const timeout = typeof opts.timeout === "number" ? opts.timeout : profile.timeout;

  // Read file and create FormData
  const fileBuffer = readFileSync(filePath);
  const fileName = basename(filePath);
  const blob = new Blob([fileBuffer]);
  const formData = new FormData();
  formData.append(fieldName, blob, fileName);

  // Append extra fields if provided
  if (typeof opts.fields === "object" && opts.fields !== null) {
    for (const [k, v] of Object.entries(opts.fields as Record<string, unknown>)) {
      formData.append(k, String(v));
    }
  }

  // Do NOT set Content-Type — fetch sets multipart boundary automatically
  delete headers["Content-Type"];

  const response = await fetch(resolvedUrl, {
    method: "POST",
    headers,
    body: formData,
    signal: AbortSignal.timeout(timeout),
  });

  const contentType = response.headers.get("content-type") ?? "";
  let responseBody: Value;
  if (contentType.includes("json")) {
    responseBody = (await response.json()) as Value;
  } else {
    responseBody = await response.text();
  }

  return {
    status: response.status,
    ok: response.ok,
    body: responseBody,
  };
};

const createProfile: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!id) throw new Error("Profile ID is required");

  const config: ProfileConfig = {
    baseUrl: typeof opts.baseUrl === "string" ? opts.baseUrl : "",
    headers: (typeof opts.headers === "object" && opts.headers !== null
      ? Object.fromEntries(Object.entries(opts.headers as Record<string, unknown>).map(([k, v]) => [k, String(v)]))
      : {}),
    auth: null,
    timeout: typeof opts.timeout === "number" ? opts.timeout : 30000,
  };

  profiles.set(id, config);
  return { id, ...config };
};

const setAuth: BuiltinHandler = (args) => {
  const profileId = String(args[0] ?? "");
  const type = String(args[1] ?? "") as "bearer" | "basic" | "apikey";
  const token = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  if (!profileId) throw new Error("Profile ID is required");
  if (!type) throw new Error("Auth type is required");
  if (!token) throw new Error("Token is required");
  if (!["bearer", "basic", "apikey"].includes(type)) {
    throw new Error(`Invalid auth type "${type}". Must be "bearer", "basic", or "apikey".`);
  }

  const profile = profiles.get(profileId);
  if (!profile) throw new Error(`Profile "${profileId}" not found. Create it first with api.createProfile.`);

  profile.auth = {
    type,
    token,
    ...(type === "apikey" && typeof opts.headerName === "string" ? { headerName: opts.headerName } : {}),
  };

  return { profileId, auth: profile.auth };
};

const setHeaders: BuiltinHandler = (args) => {
  const profileId = String(args[0] ?? "");
  const newHeaders = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!profileId) throw new Error("Profile ID is required");

  const profile = profiles.get(profileId);
  if (!profile) throw new Error(`Profile "${profileId}" not found. Create it first with api.createProfile.`);

  for (const [k, v] of Object.entries(newHeaders)) {
    profile.headers[k] = String(v);
  }

  return { profileId, headers: profile.headers };
};

const request: BuiltinHandler = async (args) => {
  const method = String(args[0] ?? "GET").toUpperCase();
  const url = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!url) throw new Error("URL is required");

  const body = opts.body as Value | undefined;
  return doRequest(method, url, body, opts);
};

// ── Exports ─────────────────────────────────────────────────────────

export const ApiFunctions: Record<string, BuiltinHandler> = {
  get,
  post,
  put,
  patch,
  delete: del,
  head,
  download,
  upload,
  createProfile,
  setAuth,
  setHeaders,
  request,
};

export const ApiFunctionMetadata: Record<string, FunctionMetadata> = {
  get: {
    description: "Send a GET request to a URL and return the response body (auto-parses JSON)",
    parameters: [
      { name: "url", dataType: "string", description: "Request URL (absolute, or relative if profile has baseUrl)", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{profile, headers, timeout, fullResponse}", formInputType: "json", required: false },
    ],
    returnType: "any",
    returnDescription: "Parsed JSON body, text string, or full response object if fullResponse is true",
    example: 'api.get "https://api.example.com/users"',
  },
  post: {
    description: "Send a POST request with a JSON body",
    parameters: [
      { name: "url", dataType: "string", description: "Request URL", formInputType: "text", required: true },
      { name: "body", dataType: "any", description: "Request body (objects auto-serialized to JSON)", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{profile, headers, timeout, fullResponse}", formInputType: "json", required: false },
    ],
    returnType: "any",
    returnDescription: "Parsed JSON body or text string",
    example: 'api.post "https://api.example.com/users" {"name": "Alice", "email": "alice@example.com"}',
  },
  put: {
    description: "Send a PUT request with a JSON body",
    parameters: [
      { name: "url", dataType: "string", description: "Request URL", formInputType: "text", required: true },
      { name: "body", dataType: "any", description: "Request body (objects auto-serialized to JSON)", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{profile, headers, timeout, fullResponse}", formInputType: "json", required: false },
    ],
    returnType: "any",
    returnDescription: "Parsed JSON body or text string",
    example: 'api.put "https://api.example.com/users/1" {"name": "Bob"}',
  },
  patch: {
    description: "Send a PATCH request with a partial JSON body",
    parameters: [
      { name: "url", dataType: "string", description: "Request URL", formInputType: "text", required: true },
      { name: "body", dataType: "any", description: "Partial update body", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{profile, headers, timeout, fullResponse}", formInputType: "json", required: false },
    ],
    returnType: "any",
    returnDescription: "Parsed JSON body or text string",
    example: 'api.patch "https://api.example.com/users/1" {"email": "new@example.com"}',
  },
  delete: {
    description: "Send a DELETE request",
    parameters: [
      { name: "url", dataType: "string", description: "Request URL", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{profile, headers, timeout, fullResponse}", formInputType: "json", required: false },
    ],
    returnType: "any",
    returnDescription: "Parsed JSON body or text string",
    example: 'api.delete "https://api.example.com/users/1"',
  },
  head: {
    description: "Send a HEAD request and return response headers only",
    parameters: [
      { name: "url", dataType: "string", description: "Request URL", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{profile, headers, timeout}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Response headers as key-value object",
    example: 'api.head "https://api.example.com/files/doc.pdf"',
  },
  download: {
    description: "Download a file from a URL and save it to disk",
    parameters: [
      { name: "url", dataType: "string", description: "URL of the file to download", formInputType: "text", required: true },
      { name: "filePath", dataType: "string", description: "Local path to save the file", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{profile, headers, timeout}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{path, size, contentType}",
    example: 'api.download "https://example.com/report.pdf" "./report.pdf"',
  },
  upload: {
    description: "Upload a file as multipart/form-data",
    parameters: [
      { name: "url", dataType: "string", description: "Upload endpoint URL", formInputType: "text", required: true },
      { name: "filePath", dataType: "string", description: "Local path of the file to upload", formInputType: "text", required: true },
      { name: "fieldName", dataType: "string", description: "Form field name (default: 'file')", formInputType: "text", required: false },
      { name: "options", dataType: "object", description: "{profile, headers, timeout, fields}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{status, ok, body}",
    example: 'api.upload "https://api.example.com/upload" "./photo.jpg" "image"',
  },
  createProfile: {
    description: "Create a named API profile with base URL, default headers, and timeout",
    parameters: [
      { name: "id", dataType: "string", description: "Unique profile identifier", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{baseUrl, headers, timeout}", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "The created profile configuration",
    example: 'api.createProfile "github" {"baseUrl": "https://api.github.com", "headers": {"Accept": "application/vnd.github.v3+json"}}',
  },
  setAuth: {
    description: "Set authentication on an existing profile",
    parameters: [
      { name: "profileId", dataType: "string", description: "Profile ID to configure", formInputType: "text", required: true },
      { name: "type", dataType: "string", description: "Auth type: 'bearer', 'basic', or 'apikey'", formInputType: "text", required: true },
      { name: "token", dataType: "string", description: "Auth token or credentials (for basic: 'user:pass')", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{headerName} — custom header name for apikey auth", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{profileId, auth}",
    example: 'api.setAuth "github" "bearer" "ghp_xxxxxxxxxxxx"',
  },
  setHeaders: {
    description: "Merge additional default headers into an existing profile",
    parameters: [
      { name: "profileId", dataType: "string", description: "Profile ID to update", formInputType: "text", required: true },
      { name: "headers", dataType: "object", description: "Headers to merge into profile defaults", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "{profileId, headers}",
    example: 'api.setHeaders "github" {"X-Custom": "value"}',
  },
  request: {
    description: "Send a generic HTTP request with an explicit method string",
    parameters: [
      { name: "method", dataType: "string", description: "HTTP method (GET, POST, PUT, PATCH, DELETE, etc.)", formInputType: "text", required: true },
      { name: "url", dataType: "string", description: "Request URL", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{body, profile, headers, timeout, fullResponse}", formInputType: "json", required: false },
    ],
    returnType: "any",
    returnDescription: "Parsed JSON body, text string, or full response object",
    example: 'api.request "OPTIONS" "https://api.example.com/resource"',
  },
};

export const ApiModuleMetadata: ModuleMetadata = {
  description: "HTTP client for making requests to external APIs with profiles, auth, download/upload, and auto-JSON parsing",
  methods: [
    "get", "post", "put", "patch", "delete", "head",
    "download", "upload",
    "createProfile", "setAuth", "setHeaders",
    "request",
  ],
};
