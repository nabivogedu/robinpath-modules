import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const BASE_URL = "https://api.cloudflare.com/client/v4";

let storedApiToken: string | undefined;
let storedEmail: string | undefined;
let storedApiKey: string | undefined;

function getAuthHeaders(): Record<string, string> {
  if (storedApiToken) {
    return { Authorization: `Bearer ${storedApiToken}`, "Content-Type": "application/json" };
  }
  if (storedEmail && storedApiKey) {
    return { "X-Auth-Email": storedEmail, "X-Auth-Key": storedApiKey, "Content-Type": "application/json" };
  }
  throw new Error("Cloudflare not authenticated. Call cloudflare.setToken or cloudflare.setCredentials first.");
}

async function cfRequest(method: string, path: string, body?: unknown): Promise<Value> {
  const headers = getAuthHeaders();
  const options: RequestInit = { method, headers };
  if (body !== undefined) options.body = JSON.stringify(body);
  const response = await fetch(`${BASE_URL}${path}`, options);
  const data = (await response.json()) as Record<string, unknown>;
  if (!data.success) {
    const errors = data.errors as Array<{ code: number; message: string }> | undefined;
    const msg = errors?.map((e: any) => e.message).join("; ") ?? "Unknown Cloudflare API error";
    throw new Error(`Cloudflare API error: ${msg}`);
  }
  return data.result;
}

async function cfRequestRaw(method: string, path: string): Promise<string> {
  const headers = getAuthHeaders();
  const response = await fetch(`${BASE_URL}${path}`, { method, headers });
  if (!response.ok) throw new Error(`Cloudflare API error: ${response.status} ${response.statusText}`);
  return await response.text();
}

// --- Auth ---

const setToken: BuiltinHandler = (args) => {
  const apiToken = args[0] as string;
  if (!apiToken) throw new Error("API token is required");
  storedApiToken = apiToken;
  storedEmail = undefined;
  storedApiKey = undefined;
  return { success: true, method: "bearer_token" };
};

const setCredentials: BuiltinHandler = (args) => {
  const email = args[0] as string;
  const apiKey = args[1] as string;
  if (!email || !apiKey) throw new Error("Both email and API key are required");
  storedEmail = email;
  storedApiKey = apiKey;
  storedApiToken = undefined;
  return { success: true, method: "global_api_key" };
};

// --- Zones ---

const listZones: BuiltinHandler = async (args) => {
  const options = (args[0] as Record<string, unknown>) ?? {};
  const params = new URLSearchParams();
  if (options.name) params.set("name", String(options.name));
  if (options.status) params.set("status", String(options.status));
  if (options.page) params.set("page", String(options.page));
  if (options.perPage) params.set("per_page", String(options.perPage));
  const query = params.toString();
  return await cfRequest("GET", `/zones${query ? `?${query}` : ""}`);
};

const getZone: BuiltinHandler = async (args) => {
  const zoneId = args[0] as string;
  if (!zoneId) throw new Error("zoneId is required");
  return await cfRequest("GET", `/zones/${zoneId}`);
};

const createZone: BuiltinHandler = async (args) => {
  const name = args[0] as string;
  const options = (args[1] as Record<string, unknown>) ?? {};
  if (!name) throw new Error("Zone name is required");
  const body: Record<string, unknown> = { name };
  if (options.accountId) (body.account as Record<string, unknown>) = { id: options.accountId };
  if (options.jumpStart !== undefined) body.jump_start = options.jumpStart;
  if (options.type) body.type = options.type;
  return await cfRequest("POST", "/zones", body);
};

const deleteZone: BuiltinHandler = async (args) => {
  const zoneId = args[0] as string;
  if (!zoneId) throw new Error("zoneId is required");
  await cfRequest("DELETE", `/zones/${zoneId}`);
  return { success: true, zoneId };
};

const purgeCache: BuiltinHandler = async (args) => {
  const zoneId = args[0] as string;
  const options = (args[1] as Record<string, unknown>) ?? {};
  if (!zoneId) throw new Error("zoneId is required");
  const body: Record<string, unknown> = {};
  if (options.purgeEverything) {
    body.purge_everything = true;
  } else {
    if (options.files) body.files = options.files;
    if (options.tags) body.tags = options.tags;
    if (options.hosts) body.hosts = options.hosts;
    if (options.prefixes) body.prefixes = options.prefixes;
  }
  return await cfRequest("POST", `/zones/${zoneId}/purge_cache`, body);
};

// --- DNS ---

const listDnsRecords: BuiltinHandler = async (args) => {
  const zoneId = args[0] as string;
  const options = (args[1] as Record<string, unknown>) ?? {};
  if (!zoneId) throw new Error("zoneId is required");
  const params = new URLSearchParams();
  if (options.type) params.set("type", String(options.type));
  if (options.name) params.set("name", String(options.name));
  if (options.content) params.set("content", String(options.content));
  if (options.page) params.set("page", String(options.page));
  if (options.perPage) params.set("per_page", String(options.perPage));
  const query = params.toString();
  return await cfRequest("GET", `/zones/${zoneId}/dns_records${query ? `?${query}` : ""}`);
};

const getDnsRecord: BuiltinHandler = async (args) => {
  const zoneId = args[0] as string;
  const recordId = args[1] as string;
  if (!zoneId || !recordId) throw new Error("zoneId and recordId are required");
  return await cfRequest("GET", `/zones/${zoneId}/dns_records/${recordId}`);
};

const createDnsRecord: BuiltinHandler = async (args) => {
  const zoneId = args[0] as string;
  const type = args[1] as string;
  const name = args[2] as string;
  const content = args[3] as string;
  const options = (args[4] as Record<string, unknown>) ?? {};
  if (!zoneId || !type || !name || !content) throw new Error("zoneId, type, name, and content are required");
  const body: Record<string, unknown> = { type, name, content };
  if (options.ttl !== undefined) body.ttl = Number(options.ttl);
  if (options.proxied !== undefined) body.proxied = Boolean(options.proxied);
  if (options.priority !== undefined) body.priority = Number(options.priority);
  return await cfRequest("POST", `/zones/${zoneId}/dns_records`, body);
};

const updateDnsRecord: BuiltinHandler = async (args) => {
  const zoneId = args[0] as string;
  const recordId = args[1] as string;
  const type = args[2] as string;
  const name = args[3] as string;
  const content = args[4] as string;
  const options = (args[5] as Record<string, unknown>) ?? {};
  if (!zoneId || !recordId || !type || !name || !content) throw new Error("zoneId, recordId, type, name, and content are required");
  const body: Record<string, unknown> = { type, name, content };
  if (options.ttl !== undefined) body.ttl = Number(options.ttl);
  if (options.proxied !== undefined) body.proxied = Boolean(options.proxied);
  if (options.priority !== undefined) body.priority = Number(options.priority);
  return await cfRequest("PUT", `/zones/${zoneId}/dns_records/${recordId}`, body);
};

const deleteDnsRecord: BuiltinHandler = async (args) => {
  const zoneId = args[0] as string;
  const recordId = args[1] as string;
  if (!zoneId || !recordId) throw new Error("zoneId and recordId are required");
  await cfRequest("DELETE", `/zones/${zoneId}/dns_records/${recordId}`);
  return { success: true, zoneId, recordId };
};

// --- Workers ---

const listWorkers: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  if (!accountId) throw new Error("accountId is required");
  return await cfRequest("GET", `/accounts/${accountId}/workers/scripts`);
};

const getWorkerScript: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  const scriptName = args[1] as string;
  if (!accountId || !scriptName) throw new Error("accountId and scriptName are required");
  return await cfRequestRaw("GET", `/accounts/${accountId}/workers/scripts/${scriptName}`);
};

const deployWorker: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  const scriptName = args[1] as string;
  const script = args[2] as string;
  const options = (args[3] as Record<string, unknown>) ?? {};
  if (!accountId || !scriptName || !script) throw new Error("accountId, scriptName, and script are required");
  const headers = getAuthHeaders();
  const metadata: Record<string, unknown> = {
    main_module: options.mainModule ?? "worker.js",
    compatibility_date: options.compatibilityDate ?? new Date().toISOString().split("T")[0],
  };
  if (options.bindings) metadata.bindings = options.bindings;
  const boundary = `----CloudflareWorkerBoundary${Date.now()}`;
  const body = [
    `--${boundary}`,
    'Content-Disposition: form-data; name="metadata"; filename="metadata.json"',
    "Content-Type: application/json",
    "",
    JSON.stringify(metadata),
    `--${boundary}`,
    `Content-Disposition: form-data; name="script"; filename="${options.mainModule ?? "worker.js"}"`,
    "Content-Type: application/javascript",
    "",
    script,
    `--${boundary}--`,
  ].join("\r\n");
  delete headers["Content-Type"];
  headers["Content-Type"] = `multipart/form-data; boundary=${boundary}`;
  const response = await fetch(`${BASE_URL}/accounts/${accountId}/workers/scripts/${scriptName}`, {
    method: "PUT",
    headers,
    body,
  });
  const data = (await response.json()) as Record<string, unknown>;
  if (!data.success) {
    const errors = data.errors as Array<{ code: number; message: string }> | undefined;
    const msg = errors?.map((e: any) => e.message).join("; ") ?? "Unknown Cloudflare API error";
    throw new Error(`Cloudflare API error: ${msg}`);
  }
  return data.result;
};

const deleteWorker: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  const scriptName = args[1] as string;
  if (!accountId || !scriptName) throw new Error("accountId and scriptName are required");
  await cfRequest("DELETE", `/accounts/${accountId}/workers/scripts/${scriptName}`);
  return { success: true, accountId, scriptName };
};

// --- KV ---

const listKvNamespaces: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  const options = (args[1] as Record<string, unknown>) ?? {};
  if (!accountId) throw new Error("accountId is required");
  const params = new URLSearchParams();
  if (options.page) params.set("page", String(options.page));
  if (options.perPage) params.set("per_page", String(options.perPage));
  const query = params.toString();
  return await cfRequest("GET", `/accounts/${accountId}/storage/kv/namespaces${query ? `?${query}` : ""}`);
};

const createKvNamespace: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  const title = args[1] as string;
  if (!accountId || !title) throw new Error("accountId and title are required");
  return await cfRequest("POST", `/accounts/${accountId}/storage/kv/namespaces`, { title });
};

const deleteKvNamespace: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  const namespaceId = args[1] as string;
  if (!accountId || !namespaceId) throw new Error("accountId and namespaceId are required");
  await cfRequest("DELETE", `/accounts/${accountId}/storage/kv/namespaces/${namespaceId}`);
  return { success: true, accountId, namespaceId };
};

const kvGet: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  const namespaceId = args[1] as string;
  const key = args[2] as string;
  if (!accountId || !namespaceId || !key) throw new Error("accountId, namespaceId, and key are required");
  const headers = getAuthHeaders();
  const response = await fetch(
    `${BASE_URL}/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${encodeURIComponent(key)}`,
    { method: "GET", headers },
  );
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Cloudflare API error: ${response.status} ${response.statusText}`);
  }
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const kvPut: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  const namespaceId = args[1] as string;
  const key = args[2] as string;
  const value = args[3];
  const options = (args[4] as Record<string, unknown>) ?? {};
  if (!accountId || !namespaceId || !key) throw new Error("accountId, namespaceId, and key are required");
  const params = new URLSearchParams();
  if (options.expiration) params.set("expiration", String(options.expiration));
  if (options.expirationTtl) params.set("expiration_ttl", String(options.expirationTtl));
  const query = params.toString();
  const headers = getAuthHeaders();
  headers["Content-Type"] = "text/plain";
  const body = typeof value === "string" ? value : JSON.stringify(value);
  const response = await fetch(
    `${BASE_URL}/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${encodeURIComponent(key)}${query ? `?${query}` : ""}`,
    { method: "PUT", headers, body },
  );
  const data = (await response.json()) as Record<string, unknown>;
  if (!data.success) {
    const errors = data.errors as Array<{ code: number; message: string }> | undefined;
    const msg = errors?.map((e: any) => e.message).join("; ") ?? "Unknown Cloudflare API error";
    throw new Error(`Cloudflare API error: ${msg}`);
  }
  return { success: true, key };
};

const kvDelete: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  const namespaceId = args[1] as string;
  const key = args[2] as string;
  if (!accountId || !namespaceId || !key) throw new Error("accountId, namespaceId, and key are required");
  await cfRequest("DELETE", `/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${encodeURIComponent(key)}`);
  return { success: true, key };
};

const kvListKeys: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  const namespaceId = args[1] as string;
  const options = (args[2] as Record<string, unknown>) ?? {};
  if (!accountId || !namespaceId) throw new Error("accountId and namespaceId are required");
  const params = new URLSearchParams();
  if (options.prefix) params.set("prefix", String(options.prefix));
  if (options.limit) params.set("limit", String(options.limit));
  if (options.cursor) params.set("cursor", String(options.cursor));
  const query = params.toString();
  return await cfRequest("GET", `/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/keys${query ? `?${query}` : ""}`);
};

// --- R2 ---

const listR2Buckets: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  if (!accountId) throw new Error("accountId is required");
  return await cfRequest("GET", `/accounts/${accountId}/r2/buckets`);
};

const createR2Bucket: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  const name = args[1] as string;
  if (!accountId || !name) throw new Error("accountId and name are required");
  return await cfRequest("POST", `/accounts/${accountId}/r2/buckets`, { name });
};

const deleteR2Bucket: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  const bucketName = args[1] as string;
  if (!accountId || !bucketName) throw new Error("accountId and bucketName are required");
  await cfRequest("DELETE", `/accounts/${accountId}/r2/buckets/${bucketName}`);
  return { success: true, accountId, bucketName };
};

// --- Pages ---

const listPages: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  if (!accountId) throw new Error("accountId is required");
  return await cfRequest("GET", `/accounts/${accountId}/pages/projects`);
};

const getPageProject: BuiltinHandler = async (args) => {
  const accountId = args[0] as string;
  const projectName = args[1] as string;
  if (!accountId || !projectName) throw new Error("accountId and projectName are required");
  return await cfRequest("GET", `/accounts/${accountId}/pages/projects/${projectName}`);
};

// --- Analytics ---

const getZoneAnalytics: BuiltinHandler = async (args) => {
  const zoneId = args[0] as string;
  const options = (args[1] as Record<string, unknown>) ?? {};
  if (!zoneId) throw new Error("zoneId is required");
  const params = new URLSearchParams();
  if (options.since) params.set("since", String(options.since));
  if (options.until) params.set("until", String(options.until));
  const query = params.toString();
  return await cfRequest("GET", `/zones/${zoneId}/analytics/dashboard${query ? `?${query}` : ""}`);
};

// --- Exports ---

export const CloudflareFunctions: Record<string, BuiltinHandler> = {
  setToken,
  setCredentials,
  listZones,
  getZone,
  createZone,
  deleteZone,
  purgeCache,
  listDnsRecords,
  getDnsRecord,
  createDnsRecord,
  updateDnsRecord,
  deleteDnsRecord,
  listWorkers,
  getWorkerScript,
  deployWorker,
  deleteWorker,
  listKvNamespaces,
  createKvNamespace,
  deleteKvNamespace,
  kvGet,
  kvPut,
  kvDelete,
  kvListKeys,
  listR2Buckets,
  createR2Bucket,
  deleteR2Bucket,
  listPages,
  getPageProject,
  getZoneAnalytics,
};

export const CloudflareFunctionMetadata = {
  setToken: {
    description: "Set Cloudflare API token for authentication",
    parameters: [
      { name: "apiToken", dataType: "string", description: "Cloudflare API token", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ success, method }",
    example: 'cloudflare.setToken "your-api-token"',
  },
  setCredentials: {
    description: "Set Cloudflare global API key credentials",
    parameters: [
      { name: "email", dataType: "string", description: "Cloudflare account email", formInputType: "text", required: true },
      { name: "apiKey", dataType: "string", description: "Cloudflare global API key", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ success, method }",
    example: 'cloudflare.setCredentials "user@example.com" "your-global-api-key"',
  },
  listZones: {
    description: "List Cloudflare zones",
    parameters: [
      { name: "options", dataType: "object", description: "Filter options: name, status, page, perPage", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of zone objects",
    example: 'cloudflare.listZones {"name": "example.com"}',
  },
  getZone: {
    description: "Get details of a specific zone",
    parameters: [
      { name: "zoneId", dataType: "string", description: "Zone ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Zone details object",
    example: 'cloudflare.getZone "zone-id-here"',
  },
  createZone: {
    description: "Create a new Cloudflare zone",
    parameters: [
      { name: "name", dataType: "string", description: "Domain name for the zone", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: accountId, jumpStart, type", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created zone object",
    example: 'cloudflare.createZone "example.com" {"accountId": "abc123"}',
  },
  deleteZone: {
    description: "Delete a Cloudflare zone",
    parameters: [
      { name: "zoneId", dataType: "string", description: "Zone ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ success, zoneId }",
    example: 'cloudflare.deleteZone "zone-id-here"',
  },
  purgeCache: {
    description: "Purge cache for a zone (all or selective by URLs/tags/hosts/prefixes)",
    parameters: [
      { name: "zoneId", dataType: "string", description: "Zone ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: purgeEverything, files, tags, hosts, prefixes", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Purge result object",
    example: 'cloudflare.purgeCache "zone-id" {"purgeEverything": true}',
  },
  listDnsRecords: {
    description: "List DNS records for a zone",
    parameters: [
      { name: "zoneId", dataType: "string", description: "Zone ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Filter options: type, name, content, page, perPage", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of DNS record objects",
    example: 'cloudflare.listDnsRecords "zone-id" {"type": "A"}',
  },
  getDnsRecord: {
    description: "Get a specific DNS record",
    parameters: [
      { name: "zoneId", dataType: "string", description: "Zone ID", formInputType: "text", required: true },
      { name: "recordId", dataType: "string", description: "DNS record ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "DNS record object",
    example: 'cloudflare.getDnsRecord "zone-id" "record-id"',
  },
  createDnsRecord: {
    description: "Create a DNS record in a zone",
    parameters: [
      { name: "zoneId", dataType: "string", description: "Zone ID", formInputType: "text", required: true },
      { name: "type", dataType: "string", description: "Record type (A, AAAA, CNAME, MX, TXT, etc.)", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "DNS record name", formInputType: "text", required: true },
      { name: "content", dataType: "string", description: "DNS record content/value", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: ttl, proxied, priority", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created DNS record object",
    example: 'cloudflare.createDnsRecord "zone-id" "A" "example.com" "1.2.3.4" {"proxied": true}',
  },
  updateDnsRecord: {
    description: "Update an existing DNS record",
    parameters: [
      { name: "zoneId", dataType: "string", description: "Zone ID", formInputType: "text", required: true },
      { name: "recordId", dataType: "string", description: "DNS record ID", formInputType: "text", required: true },
      { name: "type", dataType: "string", description: "Record type (A, AAAA, CNAME, MX, TXT, etc.)", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "DNS record name", formInputType: "text", required: true },
      { name: "content", dataType: "string", description: "DNS record content/value", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: ttl, proxied, priority", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Updated DNS record object",
    example: 'cloudflare.updateDnsRecord "zone-id" "record-id" "A" "example.com" "5.6.7.8" {"proxied": true}',
  },
  deleteDnsRecord: {
    description: "Delete a DNS record from a zone",
    parameters: [
      { name: "zoneId", dataType: "string", description: "Zone ID", formInputType: "text", required: true },
      { name: "recordId", dataType: "string", description: "DNS record ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ success, zoneId, recordId }",
    example: 'cloudflare.deleteDnsRecord "zone-id" "record-id"',
  },
  listWorkers: {
    description: "List Workers scripts for an account",
    parameters: [
      { name: "accountId", dataType: "string", description: "Cloudflare account ID", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of Worker script objects",
    example: 'cloudflare.listWorkers "account-id"',
  },
  getWorkerScript: {
    description: "Get the content of a Worker script",
    parameters: [
      { name: "accountId", dataType: "string", description: "Cloudflare account ID", formInputType: "text", required: true },
      { name: "scriptName", dataType: "string", description: "Worker script name", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Worker script source code",
    example: 'cloudflare.getWorkerScript "account-id" "my-worker"',
  },
  deployWorker: {
    description: "Deploy a Worker script",
    parameters: [
      { name: "accountId", dataType: "string", description: "Cloudflare account ID", formInputType: "text", required: true },
      { name: "scriptName", dataType: "string", description: "Worker script name", formInputType: "text", required: true },
      { name: "script", dataType: "string", description: "Worker script source code", formInputType: "code", required: true },
      { name: "options", dataType: "object", description: "Options: mainModule, compatibilityDate, bindings", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Deployed Worker result object",
    example: 'cloudflare.deployWorker "account-id" "my-worker" "export default { fetch() { return new Response(\'Hello\') } }"',
  },
  deleteWorker: {
    description: "Delete a Worker script",
    parameters: [
      { name: "accountId", dataType: "string", description: "Cloudflare account ID", formInputType: "text", required: true },
      { name: "scriptName", dataType: "string", description: "Worker script name", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ success, accountId, scriptName }",
    example: 'cloudflare.deleteWorker "account-id" "my-worker"',
  },
  listKvNamespaces: {
    description: "List KV namespaces for an account",
    parameters: [
      { name: "accountId", dataType: "string", description: "Cloudflare account ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: page, perPage", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of KV namespace objects",
    example: 'cloudflare.listKvNamespaces "account-id"',
  },
  createKvNamespace: {
    description: "Create a KV namespace",
    parameters: [
      { name: "accountId", dataType: "string", description: "Cloudflare account ID", formInputType: "text", required: true },
      { name: "title", dataType: "string", description: "Namespace title", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Created KV namespace object",
    example: 'cloudflare.createKvNamespace "account-id" "my-kv-store"',
  },
  deleteKvNamespace: {
    description: "Delete a KV namespace",
    parameters: [
      { name: "accountId", dataType: "string", description: "Cloudflare account ID", formInputType: "text", required: true },
      { name: "namespaceId", dataType: "string", description: "KV namespace ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ success, accountId, namespaceId }",
    example: 'cloudflare.deleteKvNamespace "account-id" "namespace-id"',
  },
  kvGet: {
    description: "Read a value from KV storage",
    parameters: [
      { name: "accountId", dataType: "string", description: "Cloudflare account ID", formInputType: "text", required: true },
      { name: "namespaceId", dataType: "string", description: "KV namespace ID", formInputType: "text", required: true },
      { name: "key", dataType: "string", description: "Key to read", formInputType: "text", required: true },
    ],
    returnType: "any",
    returnDescription: "Value stored at the key, or null if not found",
    example: 'cloudflare.kvGet "account-id" "namespace-id" "my-key"',
  },
  kvPut: {
    description: "Write a value to KV storage",
    parameters: [
      { name: "accountId", dataType: "string", description: "Cloudflare account ID", formInputType: "text", required: true },
      { name: "namespaceId", dataType: "string", description: "KV namespace ID", formInputType: "text", required: true },
      { name: "key", dataType: "string", description: "Key to write", formInputType: "text", required: true },
      { name: "value", dataType: "any", description: "Value to store", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: expiration (unix timestamp), expirationTtl (seconds)", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{ success, key }",
    example: 'cloudflare.kvPut "account-id" "namespace-id" "my-key" "my-value" {"expirationTtl": 3600}',
  },
  kvDelete: {
    description: "Delete a key from KV storage",
    parameters: [
      { name: "accountId", dataType: "string", description: "Cloudflare account ID", formInputType: "text", required: true },
      { name: "namespaceId", dataType: "string", description: "KV namespace ID", formInputType: "text", required: true },
      { name: "key", dataType: "string", description: "Key to delete", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ success, key }",
    example: 'cloudflare.kvDelete "account-id" "namespace-id" "my-key"',
  },
  kvListKeys: {
    description: "List keys in a KV namespace",
    parameters: [
      { name: "accountId", dataType: "string", description: "Cloudflare account ID", formInputType: "text", required: true },
      { name: "namespaceId", dataType: "string", description: "KV namespace ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: prefix, limit, cursor", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of key objects",
    example: 'cloudflare.kvListKeys "account-id" "namespace-id" {"prefix": "user:"}',
  },
  listR2Buckets: {
    description: "List R2 buckets for an account",
    parameters: [
      { name: "accountId", dataType: "string", description: "Cloudflare account ID", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of R2 bucket objects",
    example: 'cloudflare.listR2Buckets "account-id"',
  },
  createR2Bucket: {
    description: "Create an R2 bucket",
    parameters: [
      { name: "accountId", dataType: "string", description: "Cloudflare account ID", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "Bucket name", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Created R2 bucket object",
    example: 'cloudflare.createR2Bucket "account-id" "my-bucket"',
  },
  deleteR2Bucket: {
    description: "Delete an R2 bucket",
    parameters: [
      { name: "accountId", dataType: "string", description: "Cloudflare account ID", formInputType: "text", required: true },
      { name: "bucketName", dataType: "string", description: "Bucket name", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ success, accountId, bucketName }",
    example: 'cloudflare.deleteR2Bucket "account-id" "my-bucket"',
  },
  listPages: {
    description: "List Cloudflare Pages projects",
    parameters: [
      { name: "accountId", dataType: "string", description: "Cloudflare account ID", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of Pages project objects",
    example: 'cloudflare.listPages "account-id"',
  },
  getPageProject: {
    description: "Get details of a Cloudflare Pages project",
    parameters: [
      { name: "accountId", dataType: "string", description: "Cloudflare account ID", formInputType: "text", required: true },
      { name: "projectName", dataType: "string", description: "Pages project name", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Pages project details object",
    example: 'cloudflare.getPageProject "account-id" "my-site"',
  },
  getZoneAnalytics: {
    description: "Get analytics data for a zone",
    parameters: [
      { name: "zoneId", dataType: "string", description: "Zone ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: since (ISO date or negative minutes), until (ISO date or negative minutes)", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Zone analytics dashboard data",
    example: 'cloudflare.getZoneAnalytics "zone-id" {"since": "-10080", "until": "0"}',
  },
};

export const CloudflareModuleMetadata = {
  description: "Cloudflare API v4 client for managing zones, DNS, Workers, KV, R2, Pages, and analytics",
  methods: Object.keys(CloudflareFunctions),
  category: "cloud",
};
