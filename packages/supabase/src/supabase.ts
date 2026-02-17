import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// ── credential store ────────────────────────────────────────────────────────
interface SupabaseCredentials {
  projectUrl: string;
  apiKey: string;
  serviceKey?: string;
}

const credentials = new Map<string, SupabaseCredentials>();

function getCreds(profile?: string): SupabaseCredentials {
  const key = profile ?? "__default__";
  const c = credentials.get(key);
  if (!c) throw new Error(`Supabase not configured. Call setCredentials() first${profile ? ` for profile "${profile}"` : ""}.`);
  return c;
}

function baseHeaders(apiKey: string, accessToken?: string): Record<string, string> {
  return {
    apikey: apiKey,
    Authorization: `Bearer ${accessToken ?? apiKey}`,
    "Content-Type": "application/json",
  };
}

async function supaFetch(url: string, init: RequestInit): Promise<Value> {
  const res = await fetch(url, init);
  const text = await res.text();
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  if (!res.ok) {
    const msg = typeof body === "object" && body !== null && "message" in body
      ? (body as Record<string, unknown>).message
      : typeof body === "object" && body !== null && "error_description" in body
        ? (body as Record<string, unknown>).error_description
        : text;
    throw new Error(`Supabase ${res.status}: ${msg}`);
  }
  return body;
}

// ── helpers ─────────────────────────────────────────────────────────────────

function buildPostgrestQuery(baseUrl: string, table: string, options?: Record<string, unknown>): string {
  let url = `${baseUrl}/rest/v1/${encodeURIComponent(table)}`;
  if (!options) return url;
  const params: string[] = [];

  // columns
  if (options.columns) params.push(`select=${encodeURIComponent(String(options.columns))}`);

  // filters: eq, neq, gt, lt, gte, lte, like, ilike, in, is
  const filterOps = ["eq", "neq", "gt", "lt", "gte", "lte", "like", "ilike", "in", "is"] as const;
  for (const op of filterOps) {
    if (options[op] && typeof options[op] === "object") {
      const filters = options[op] as Record<string, unknown>;
      for (const [col, val] of Object.entries(filters)) {
        if (op === "in") {
          const arr = Array.isArray(val) ? val : [val];
          params.push(`${encodeURIComponent(col)}=in.(${arr.map((v: any) => encodeURIComponent(String(v))).join(",")})`);
        } else {
          params.push(`${encodeURIComponent(col)}=${op}.${encodeURIComponent(String(val))}`);
        }
      }
    }
  }

  // order
  if (options.order) {
    if (typeof options.order === "string") {
      params.push(`order=${encodeURIComponent(options.order)}`);
    } else if (typeof options.order === "object" && !Array.isArray(options.order)) {
      const o = options.order as Record<string, unknown>;
      const col = o.column ?? o.col;
      const dir = o.ascending === false || o.desc === true ? "desc" : "asc";
      const nulls = o.nullsFirst ? ".nullsfirst" : "";
      params.push(`order=${encodeURIComponent(String(col))}.${dir}${nulls}`);
    }
  }

  // limit & offset
  if (options.limit !== undefined) params.push(`limit=${Number(options.limit)}`);
  if (options.offset !== undefined) params.push(`offset=${Number(options.offset)}`);

  if (params.length > 0) url += `?${params.join("&")}`;

  return url;
}

function buildMatchParams(match: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const [col, val] of Object.entries(match)) {
    parts.push(`${encodeURIComponent(col)}=eq.${encodeURIComponent(String(val))}`);
  }
  return parts.join("&");
}

// ── functions ───────────────────────────────────────────────────────────────

export const SupabaseFunctions: Record<string, BuiltinHandler> = {

  // ── credentials ─────────────────────────────────────────────────────────
  setCredentials: (args: Value[]) => {
    const projectUrl = String(args[0]);
    const apiKey = String(args[1]);
    const profile = args[2] != null ? String(args[2]) : "__default__";
    const url = projectUrl.replace(/\/+$/, "");
    credentials.set(profile, { projectUrl: url, apiKey });
    return { success: true, profile };
  },

  setServiceKey: (args: Value[]) => {
    const projectUrl = String(args[0]);
    const serviceKey = String(args[1]);
    const profile = args[2] != null ? String(args[2]) : "__default__";
    const url = projectUrl.replace(/\/+$/, "");
    const existing = credentials.get(profile);
    if (existing) {
      existing.serviceKey = serviceKey;
      existing.projectUrl = url;
    } else {
      credentials.set(profile, { projectUrl: url, apiKey: serviceKey, serviceKey });
    }
    return { success: true, profile };
  },

  // ── PostgREST (database) ───────────────────────────────────────────────

  select: async (args: Value[]) => {
    const table = String(args[0]);
    const columns = args[1] != null ? String(args[1]) : undefined;
    const options = (args[2] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const opts = { ...options };
    if (columns) opts.columns = columns;

    const url = buildPostgrestQuery(creds.projectUrl, table, opts);
    const headers: Record<string, string> = baseHeaders(creds.apiKey);

    // range header
    if (options.range && typeof options.range === "string") {
      headers["Range"] = options.range;
      headers["Range-Unit"] = "items";
    }

    return supaFetch(url, { method: "GET", headers });
  },

  insert: async (args: Value[]) => {
    const table = String(args[0]);
    const data = args[1];
    const options = (args[2] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    let url = `${creds.projectUrl}/rest/v1/${encodeURIComponent(table)}`;
    if (options.columns) url += `?columns=${encodeURIComponent(String(options.columns))}`;

    const headers: Record<string, string> = baseHeaders(creds.apiKey);
    if (options.returning !== false) headers["Prefer"] = "return=representation";
    if (options.onConflict) {
      headers["Prefer"] = `return=representation,resolution=merge-duplicates`;
      url += `${url.includes("?") ? "&" : "?"}on_conflict=${encodeURIComponent(String(options.onConflict))}`;
    }

    return supaFetch(url, { method: "POST", headers, body: JSON.stringify(data) });
  },

  update: async (args: Value[]) => {
    const table = String(args[0]);
    const data = args[1] as Record<string, unknown>;
    const match = (args[2] as Record<string, unknown>) ?? {};
    const options = (args[3] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const matchStr = buildMatchParams(match);
    let url = `${creds.projectUrl}/rest/v1/${encodeURIComponent(table)}?${matchStr}`;

    const headers: Record<string, string> = baseHeaders(creds.apiKey);
    headers["Prefer"] = "return=representation";

    return supaFetch(url, { method: "PATCH", headers, body: JSON.stringify(data) });
  },

  upsert: async (args: Value[]) => {
    const table = String(args[0]);
    const data = args[1];
    const options = (args[2] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    let url = `${creds.projectUrl}/rest/v1/${encodeURIComponent(table)}`;
    const headers: Record<string, string> = baseHeaders(creds.apiKey);
    headers["Prefer"] = "return=representation,resolution=merge-duplicates";
    if (options.onConflict) {
      url += `?on_conflict=${encodeURIComponent(String(options.onConflict))}`;
    }

    return supaFetch(url, { method: "POST", headers, body: JSON.stringify(data) });
  },

  delete: async (args: Value[]) => {
    const table = String(args[0]);
    const match = (args[1] as Record<string, unknown>) ?? {};
    const options = (args[2] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const matchStr = buildMatchParams(match);
    let url = `${creds.projectUrl}/rest/v1/${encodeURIComponent(table)}?${matchStr}`;

    const headers: Record<string, string> = baseHeaders(creds.apiKey);
    headers["Prefer"] = "return=representation";

    return supaFetch(url, { method: "DELETE", headers });
  },

  rpc: async (args: Value[]) => {
    const functionName = String(args[0]);
    const params = args[1] ?? {};
    const options = (args[2] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/rest/v1/rpc/${encodeURIComponent(functionName)}`;
    const headers: Record<string, string> = baseHeaders(creds.apiKey);

    return supaFetch(url, { method: "POST", headers, body: JSON.stringify(params) });
  },

  // ── Auth ────────────────────────────────────────────────────────────────

  signUp: async (args: Value[]) => {
    const email = String(args[0]);
    const password = String(args[1]);
    const options = (args[2] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/auth/v1/signup`;
    const headers: Record<string, string> = baseHeaders(creds.apiKey);

    const payload: Record<string, unknown> = { email, password };
    if (options.data) payload.data = options.data;
    if (options.emailRedirectTo) payload.gotrue_meta_security = { captcha_token: undefined };

    return supaFetch(url, { method: "POST", headers, body: JSON.stringify(payload) });
  },

  signIn: async (args: Value[]) => {
    const email = String(args[0]);
    const password = String(args[1]);
    const options = (args[2] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/auth/v1/token?grant_type=password`;
    const headers: Record<string, string> = baseHeaders(creds.apiKey);

    return supaFetch(url, { method: "POST", headers, body: JSON.stringify({ email, password }) });
  },

  signInWithOtp: async (args: Value[]) => {
    const email = String(args[0]);
    const options = (args[1] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/auth/v1/otp`;
    const headers: Record<string, string> = baseHeaders(creds.apiKey);

    const payload: Record<string, unknown> = { email };
    if (options.emailRedirectTo) payload.gotrue_meta_security = { captcha_token: undefined };

    return supaFetch(url, { method: "POST", headers, body: JSON.stringify(payload) });
  },

  signOut: async (args: Value[]) => {
    const accessToken = String(args[0]);
    const options = (args[1] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/auth/v1/logout`;
    const headers: Record<string, string> = baseHeaders(creds.apiKey, accessToken);

    return supaFetch(url, { method: "POST", headers });
  },

  getUser: async (args: Value[]) => {
    const accessToken = String(args[0]);
    const options = (args[1] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/auth/v1/user`;
    const headers: Record<string, string> = baseHeaders(creds.apiKey, accessToken);

    return supaFetch(url, { method: "GET", headers });
  },

  updateUser: async (args: Value[]) => {
    const accessToken = String(args[0]);
    const attributes = args[1] as Record<string, unknown>;
    const options = (args[2] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/auth/v1/user`;
    const headers: Record<string, string> = baseHeaders(creds.apiKey, accessToken);

    return supaFetch(url, { method: "PUT", headers, body: JSON.stringify(attributes) });
  },

  listUsers: async (args: Value[]) => {
    const options = (args[0] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);
    const serviceKey = creds.serviceKey ?? creds.apiKey;

    const params: string[] = [];
    if (options.page !== undefined) params.push(`page=${Number(options.page)}`);
    if (options.perPage !== undefined) params.push(`per_page=${Number(options.perPage)}`);
    const qs = params.length > 0 ? `?${params.join("&")}` : "";

    const url = `${creds.projectUrl}/auth/v1/admin/users${qs}`;
    const headers: Record<string, string> = baseHeaders(serviceKey);

    return supaFetch(url, { method: "GET", headers });
  },

  deleteUser: async (args: Value[]) => {
    const userId = String(args[0]);
    const options = (args[1] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);
    const serviceKey = creds.serviceKey ?? creds.apiKey;

    const url = `${creds.projectUrl}/auth/v1/admin/users/${encodeURIComponent(userId)}`;
    const headers: Record<string, string> = baseHeaders(serviceKey);

    return supaFetch(url, { method: "DELETE", headers });
  },

  inviteUser: async (args: Value[]) => {
    const email = String(args[0]);
    const options = (args[1] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);
    const serviceKey = creds.serviceKey ?? creds.apiKey;

    const url = `${creds.projectUrl}/auth/v1/invite`;
    const headers: Record<string, string> = baseHeaders(serviceKey);

    return supaFetch(url, { method: "POST", headers, body: JSON.stringify({ email }) });
  },

  // ── Storage ─────────────────────────────────────────────────────────────

  listBuckets: async (args: Value[]) => {
    const options = (args[0] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/storage/v1/bucket`;
    const headers: Record<string, string> = baseHeaders(creds.apiKey);

    return supaFetch(url, { method: "GET", headers });
  },

  createBucket: async (args: Value[]) => {
    const name = String(args[0]);
    const options = (args[1] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/storage/v1/bucket`;
    const headers: Record<string, string> = baseHeaders(creds.apiKey);

    const payload: Record<string, unknown> = { name, id: name };
    if (options.public !== undefined) payload.public = Boolean(options.public);
    if (options.fileSizeLimit !== undefined) payload.file_size_limit = Number(options.fileSizeLimit);
    if (options.allowedMimeTypes) payload.allowed_mime_types = options.allowedMimeTypes;

    return supaFetch(url, { method: "POST", headers, body: JSON.stringify(payload) });
  },

  deleteBucket: async (args: Value[]) => {
    const bucketId = String(args[0]);
    const options = (args[1] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/storage/v1/bucket/${encodeURIComponent(bucketId)}`;
    const headers: Record<string, string> = baseHeaders(creds.apiKey);

    return supaFetch(url, { method: "DELETE", headers });
  },

  emptyBucket: async (args: Value[]) => {
    const bucketId = String(args[0]);
    const options = (args[1] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/storage/v1/bucket/${encodeURIComponent(bucketId)}/empty`;
    const headers: Record<string, string> = baseHeaders(creds.apiKey);

    return supaFetch(url, { method: "POST", headers });
  },

  listFiles: async (args: Value[]) => {
    const bucketId = String(args[0]);
    const folderPath = args[1] != null ? String(args[1]) : "";
    const options = (args[2] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/storage/v1/object/list/${encodeURIComponent(bucketId)}`;
    const headers: Record<string, string> = baseHeaders(creds.apiKey);

    const payload: Record<string, unknown> = { prefix: folderPath };
    if (options.limit !== undefined) payload.limit = Number(options.limit);
    if (options.offset !== undefined) payload.offset = Number(options.offset);
    if (options.sortBy) payload.sortBy = options.sortBy;
    if (options.search) payload.search = String(options.search);

    return supaFetch(url, { method: "POST", headers, body: JSON.stringify(payload) });
  },

  uploadFile: async (args: Value[]) => {
    const bucketId = String(args[0]);
    const filePath = String(args[1]);
    const content = args[2];
    const options = (args[3] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/storage/v1/object/${encodeURIComponent(bucketId)}/${filePath}`;
    const headers: Record<string, string> = {
      apikey: creds.apiKey,
      Authorization: `Bearer ${creds.apiKey}`,
    };

    if (options.contentType) {
      headers["Content-Type"] = String(options.contentType);
    } else {
      headers["Content-Type"] = "application/octet-stream";
    }
    if (options.upsert) {
      headers["x-upsert"] = "true";
    }

    const body = typeof content === "string" ? content : JSON.stringify(content);

    return supaFetch(url, { method: "POST", headers, body });
  },

  downloadFile: async (args: Value[]) => {
    const bucketId = String(args[0]);
    const filePath = String(args[1]);
    const options = (args[2] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/storage/v1/object/${encodeURIComponent(bucketId)}/${filePath}`;
    const headers: Record<string, string> = {
      apikey: creds.apiKey,
      Authorization: `Bearer ${creds.apiKey}`,
    };

    const res = await fetch(url, { method: "GET", headers });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Supabase ${res.status}: ${text}`);
    }
    return await res.text();
  },

  deleteFile: async (args: Value[]) => {
    const bucketId = String(args[0]);
    const paths = args[1] as string[];
    const options = (args[2] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/storage/v1/object/${encodeURIComponent(bucketId)}`;
    const headers: Record<string, string> = baseHeaders(creds.apiKey);

    return supaFetch(url, { method: "DELETE", headers, body: JSON.stringify({ prefixes: paths }) });
  },

  getPublicUrl: (args: Value[]) => {
    const bucketId = String(args[0]);
    const filePath = String(args[1]);
    const options = (args[2] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/storage/v1/object/public/${encodeURIComponent(bucketId)}/${filePath}`;
    return { publicUrl: url };
  },

  createSignedUrl: async (args: Value[]) => {
    const bucketId = String(args[0]);
    const filePath = String(args[1]);
    const expiresIn = Number(args[2]);
    const options = (args[3] as Record<string, unknown>) ?? {};
    const creds = getCreds(options.profile as string);

    const url = `${creds.projectUrl}/storage/v1/object/sign/${encodeURIComponent(bucketId)}/${filePath}`;
    const headers: Record<string, string> = baseHeaders(creds.apiKey);

    const result = await supaFetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ expiresIn }),
    }) as Record<string, unknown>;

    const signedURL = result.signedURL ?? result.signedUrl ?? result.signed_url;
    return {
      signedUrl: signedURL ? `${creds.projectUrl}/storage/v1${signedURL}` : null,
      expiresIn,
    };
  },
};

// ── function metadata ───────────────────────────────────────────────────────

export const SupabaseFunctionMetadata = {

  // ── credentials ─────────────────────────────────────────────────────────
  setCredentials: {
    description: "Store Supabase project URL and anon/service API key",
    parameters: [
      { name: "projectUrl", dataType: "string", description: "Supabase project URL (e.g. https://xyz.supabase.co)", formInputType: "text", required: true },
      { name: "apiKey", dataType: "string", description: "Supabase anon or service_role key", formInputType: "text", required: true },
      { name: "profile", dataType: "string", description: "Optional credential profile name", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{ success, profile }",
    example: 'supabase.setCredentials "https://xyz.supabase.co" "eyJhbGc..."',
  },

  setServiceKey: {
    description: "Store a service role key for admin operations (Auth admin, etc.)",
    parameters: [
      { name: "projectUrl", dataType: "string", description: "Supabase project URL", formInputType: "text", required: true },
      { name: "serviceKey", dataType: "string", description: "Supabase service_role key", formInputType: "text", required: true },
      { name: "profile", dataType: "string", description: "Optional credential profile name", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{ success, profile }",
    example: 'supabase.setServiceKey "https://xyz.supabase.co" "eyJhbGc..."',
  },

  // ── PostgREST (database) ───────────────────────────────────────────────

  select: {
    description: "Select rows from a table with optional filters, ordering, and pagination",
    parameters: [
      { name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true },
      { name: "columns", dataType: "string", description: "Comma-separated column names or * (default *)", formInputType: "text", required: false },
      { name: "options", dataType: "object", description: "Filters (eq, neq, gt, lt, gte, lte, like, ilike, in, is), order, limit, offset, range, profile", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of matching rows",
    example: 'supabase.select "users" "*" {"eq": {"status": "active"}, "limit": 10}',
  },

  insert: {
    description: "Insert one or more rows into a table",
    parameters: [
      { name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true },
      { name: "data", dataType: "object", description: "Row object or array of row objects", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "Options: returning, onConflict (for upsert), columns, profile", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of inserted rows (if returning enabled)",
    example: 'supabase.insert "users" {"name": "Alice", "email": "alice@example.com"}',
  },

  update: {
    description: "Update rows matching filters",
    parameters: [
      { name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true },
      { name: "data", dataType: "object", description: "Fields to update", formInputType: "json", required: true },
      { name: "match", dataType: "object", description: "Filter conditions to match rows (eq filters)", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of updated rows",
    example: 'supabase.update "users" {"status": "inactive"} {"id": 42}',
  },

  upsert: {
    description: "Insert or update rows (merge on conflict)",
    parameters: [
      { name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true },
      { name: "data", dataType: "object", description: "Row object or array of row objects", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "Options: onConflict (conflict column), profile", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of upserted rows",
    example: 'supabase.upsert "users" {"id": 1, "name": "Alice"} {"onConflict": "id"}',
  },

  delete: {
    description: "Delete rows matching filters",
    parameters: [
      { name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true },
      { name: "match", dataType: "object", description: "Filter conditions to match rows for deletion", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of deleted rows",
    example: 'supabase.delete "users" {"id": 42}',
  },

  rpc: {
    description: "Call a Postgres function via RPC",
    parameters: [
      { name: "functionName", dataType: "string", description: "Name of the Postgres function", formInputType: "text", required: true },
      { name: "params", dataType: "object", description: "Parameters to pass to the function", formInputType: "json", required: false },
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "any",
    returnDescription: "Function return value",
    example: 'supabase.rpc "get_total_users" {"status": "active"}',
  },

  // ── Auth ────────────────────────────────────────────────────────────────

  signUp: {
    description: "Sign up a new user with email and password",
    parameters: [
      { name: "email", dataType: "string", description: "User email address", formInputType: "text", required: true },
      { name: "password", dataType: "string", description: "User password", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: data (user metadata), profile", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Sign up response with user and session",
    example: 'supabase.signUp "user@example.com" "securePassword123"',
  },

  signIn: {
    description: "Sign in a user with email and password",
    parameters: [
      { name: "email", dataType: "string", description: "User email address", formInputType: "text", required: true },
      { name: "password", dataType: "string", description: "User password", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Auth token response with access_token, refresh_token, user",
    example: 'supabase.signIn "user@example.com" "securePassword123"',
  },

  signInWithOtp: {
    description: "Send a magic link to the user's email for passwordless sign in",
    parameters: [
      { name: "email", dataType: "string", description: "User email address", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "OTP send confirmation",
    example: 'supabase.signInWithOtp "user@example.com"',
  },

  signOut: {
    description: "Sign out a user by invalidating their access token",
    parameters: [
      { name: "accessToken", dataType: "string", description: "User's access token", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Sign out confirmation",
    example: 'supabase.signOut "eyJhbGc..."',
  },

  getUser: {
    description: "Get the user object from a JWT access token",
    parameters: [
      { name: "accessToken", dataType: "string", description: "User's access token", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "User object with id, email, metadata, etc.",
    example: 'supabase.getUser "eyJhbGc..."',
  },

  updateUser: {
    description: "Update user attributes (email, password, metadata)",
    parameters: [
      { name: "accessToken", dataType: "string", description: "User's access token", formInputType: "text", required: true },
      { name: "attributes", dataType: "object", description: "Attributes to update: email, password, data (metadata)", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Updated user object",
    example: 'supabase.updateUser "eyJhbGc..." {"data": {"name": "New Name"}}',
  },

  listUsers: {
    description: "Admin: List all users (requires service role key)",
    parameters: [
      { name: "options", dataType: "object", description: "Options: page, perPage, profile", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Paginated list of users",
    example: 'supabase.listUsers {"page": 1, "perPage": 50}',
  },

  deleteUser: {
    description: "Admin: Delete a user by ID (requires service role key)",
    parameters: [
      { name: "userId", dataType: "string", description: "UUID of the user to delete", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Deletion confirmation",
    example: 'supabase.deleteUser "uuid-of-user"',
  },

  inviteUser: {
    description: "Admin: Invite a user by email (requires service role key)",
    parameters: [
      { name: "email", dataType: "string", description: "Email address to invite", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Invite confirmation",
    example: 'supabase.inviteUser "newuser@example.com"',
  },

  // ── Storage ─────────────────────────────────────────────────────────────

  listBuckets: {
    description: "List all storage buckets",
    parameters: [
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of bucket objects",
    example: 'supabase.listBuckets',
  },

  createBucket: {
    description: "Create a new storage bucket",
    parameters: [
      { name: "name", dataType: "string", description: "Bucket name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: public, fileSizeLimit, allowedMimeTypes, profile", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created bucket info",
    example: 'supabase.createBucket "avatars" {"public": true}',
  },

  deleteBucket: {
    description: "Delete a storage bucket (must be empty first)",
    parameters: [
      { name: "bucketId", dataType: "string", description: "Bucket ID/name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Deletion confirmation",
    example: 'supabase.deleteBucket "avatars"',
  },

  emptyBucket: {
    description: "Remove all files from a storage bucket",
    parameters: [
      { name: "bucketId", dataType: "string", description: "Bucket ID/name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Empty confirmation",
    example: 'supabase.emptyBucket "avatars"',
  },

  listFiles: {
    description: "List files in a storage bucket/folder",
    parameters: [
      { name: "bucketId", dataType: "string", description: "Bucket ID/name", formInputType: "text", required: true },
      { name: "path", dataType: "string", description: "Folder path within bucket (default root)", formInputType: "text", required: false },
      { name: "options", dataType: "object", description: "Options: limit, offset, sortBy, search, profile", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of file/folder objects",
    example: 'supabase.listFiles "avatars" "users/"',
  },

  uploadFile: {
    description: "Upload a file to a storage bucket",
    parameters: [
      { name: "bucketId", dataType: "string", description: "Bucket ID/name", formInputType: "text", required: true },
      { name: "path", dataType: "string", description: "File path within bucket", formInputType: "text", required: true },
      { name: "content", dataType: "string", description: "File content (string or Buffer)", formInputType: "textarea", required: true },
      { name: "options", dataType: "object", description: "Options: contentType, upsert, profile", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Upload result with key",
    example: 'supabase.uploadFile "avatars" "user1.png" $fileContent {"contentType": "image/png"}',
  },

  downloadFile: {
    description: "Download a file from a storage bucket",
    parameters: [
      { name: "bucketId", dataType: "string", description: "Bucket ID/name", formInputType: "text", required: true },
      { name: "path", dataType: "string", description: "File path within bucket", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "string",
    returnDescription: "File content as string",
    example: 'supabase.downloadFile "documents" "report.txt"',
  },

  deleteFile: {
    description: "Delete one or more files from a storage bucket",
    parameters: [
      { name: "bucketId", dataType: "string", description: "Bucket ID/name", formInputType: "text", required: true },
      { name: "paths", dataType: "array", description: "Array of file paths to delete", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Deletion result",
    example: 'supabase.deleteFile "avatars" ["user1.png", "user2.png"]',
  },

  getPublicUrl: {
    description: "Get the public URL for a file in a public bucket",
    parameters: [
      { name: "bucketId", dataType: "string", description: "Bucket ID/name", formInputType: "text", required: true },
      { name: "path", dataType: "string", description: "File path within bucket", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{ publicUrl }",
    example: 'supabase.getPublicUrl "avatars" "user1.png"',
  },

  createSignedUrl: {
    description: "Create a signed URL for temporary access to a private file",
    parameters: [
      { name: "bucketId", dataType: "string", description: "Bucket ID/name", formInputType: "text", required: true },
      { name: "path", dataType: "string", description: "File path within bucket", formInputType: "text", required: true },
      { name: "expiresIn", dataType: "number", description: "Expiry time in seconds", formInputType: "number", required: true },
      { name: "options", dataType: "object", description: "Options: profile", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{ signedUrl, expiresIn }",
    example: 'supabase.createSignedUrl "documents" "report.pdf" 3600',
  },
};

// ── module metadata ─────────────────────────────────────────────────────────

export const SupabaseModuleMetadata = {
  description: "Supabase REST API client for PostgREST (database), Auth, and Storage operations.",
  methods: Object.keys(SupabaseFunctions),
  category: "cloud",
};
