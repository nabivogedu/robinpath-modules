import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// --- Credential storage ---

interface FirebaseCredentials {
  projectId: string;
  apiKey?: string;
  accessToken?: string;
}

let credentials: FirebaseCredentials | null = null;

function getCredentials(): FirebaseCredentials {
  if (!credentials) throw new Error("Firebase not configured. Call firebase.setCredentials or firebase.setServiceToken first.");
  return credentials;
}

function requireApiKey(): { projectId: string; apiKey: string } {
  const creds = getCredentials();
  if (!creds.apiKey) throw new Error("API key not set. Call firebase.setCredentials with projectId and apiKey.");
  return { projectId: creds.projectId, apiKey: creds.apiKey };
}

function requireAccessToken(): { projectId: string; accessToken: string } {
  const creds = getCredentials();
  if (!creds.accessToken) throw new Error("Access token not set. Call firebase.setServiceToken with projectId and accessToken.");
  return { projectId: creds.projectId, accessToken: creds.accessToken };
}

function getAuthHeader(): Record<string, string> {
  const creds = getCredentials();
  if (creds.accessToken) return { Authorization: `Bearer ${creds.accessToken}` };
  return {};
}

// --- Firestore helpers ---

const FIRESTORE_BASE = "https://firestore.googleapis.com/v1";

function firestoreUrl(projectId: string, path: string): string {
  return `${FIRESTORE_BASE}/projects/${projectId}/databases/(default)/documents/${path}`;
}

function toFirestoreValue(value: unknown): Record<string, unknown> {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") {
    if (Number.isInteger(value)) return { integerValue: String(value) };
    return { doubleValue: value };
  }
  if (typeof value === "string") return { stringValue: value };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(toFirestoreValue) } };
  if (typeof value === "object") {
    const fields: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(value) };
}

function fromFirestoreValue(val: Record<string, unknown>): any {
  if ("nullValue" in val) return null;
  if ("booleanValue" in val) return val.booleanValue;
  if ("integerValue" in val) return Number(val.integerValue);
  if ("doubleValue" in val) return val.doubleValue;
  if ("stringValue" in val) return val.stringValue;
  if ("timestampValue" in val) return val.timestampValue;
  if ("geoPointValue" in val) return val.geoPointValue;
  if ("bytesValue" in val) return val.bytesValue;
  if ("referenceValue" in val) return val.referenceValue;
  if ("arrayValue" in val) {
    const arr = val.arrayValue as { values?: Record<string, unknown>[] };
    return (arr.values ?? []).map(fromFirestoreValue);
  }
  if ("mapValue" in val) {
    const map = val.mapValue as { fields?: Record<string, Record<string, unknown>> };
    return fromFirestoreFields(map.fields ?? {});
  }
  return null;
}

function fromFirestoreFields(fields: Record<string, Record<string, unknown>>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(fields)) {
    result[k] = fromFirestoreValue(v);
  }
  return result;
}

function fromFirestoreDocument(doc: Record<string, unknown>): Record<string, unknown> {
  const name = String(doc.name ?? "");
  const parts = name.split("/");
  const id = parts[parts.length - 1] ?? "";
  const fields = (doc.fields ?? {}) as Record<string, Record<string, unknown>>;
  return {
    _id: id,
    _path: name,
    _createTime: doc.createTime ?? null,
    _updateTime: doc.updateTime ?? null,
    ...fromFirestoreFields(fields),
  };
}

function buildFirestoreFields(data: unknown): Record<string, unknown> {
  const obj = (typeof data === "object" && data !== null ? data : {}) as Record<string, unknown>;
  const fields: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    fields[k] = toFirestoreValue(v);
  }
  return fields;
}

async function firebaseRequest(url: string, options: RequestInit = {}): Promise<Value> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...getAuthHeader(),
    ...(options.headers as Record<string, string> ?? {}),
  };
  const response = await fetch(url, { ...options, headers });
  const text = await response.text();
  let body: unknown;
  try { body = JSON.parse(text); } catch { body = text; }
  if (!response.ok) {
    const errMsg = typeof body === "object" && body !== null && "error" in (body as Record<string, unknown>)
      ? JSON.stringify((body as Record<string, unknown>).error)
      : String(body);
    throw new Error(`Firebase API error (${response.status}): ${errMsg}`);
  }
  return body;
}

// --- Credential functions ---

const setCredentials: BuiltinHandler = (args) => {
  const projectId = String(args[0] ?? "");
  const apiKey = String(args[1] ?? "");
  if (!projectId) throw new Error("projectId is required");
  if (!apiKey) throw new Error("apiKey is required");
  credentials = { ...credentials, projectId, apiKey };
  return { configured: true, projectId };
};

const setServiceToken: BuiltinHandler = (args) => {
  const projectId = String(args[0] ?? "");
  const accessToken = String(args[1] ?? "");
  if (!projectId) throw new Error("projectId is required");
  if (!accessToken) throw new Error("accessToken is required");
  credentials = { ...credentials, projectId, accessToken };
  return { configured: true, projectId, hasAccessToken: true };
};

// --- Firestore CRUD ---

const getDocument: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const documentId = String(args[1] ?? "");
  if (!collection || !documentId) throw new Error("collection and documentId are required");
  const { projectId } = requireAccessToken();
  const url = firestoreUrl(projectId, `${collection}/${documentId}`);
  const doc = await firebaseRequest(url) as Record<string, unknown>;
  return fromFirestoreDocument(doc);
};

const listDocuments: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  if (!collection) throw new Error("collection is required");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const { projectId } = requireAccessToken();
  const params = new URLSearchParams();
  if (opts.pageSize) params.set("pageSize", String(opts.pageSize));
  if (opts.pageToken) params.set("pageToken", String(opts.pageToken));
  if (opts.orderBy) params.set("orderBy", String(opts.orderBy));
  const qs = params.toString();
  const url = firestoreUrl(projectId, collection) + (qs ? `?${qs}` : "");
  const result = await firebaseRequest(url) as Record<string, unknown>;
  const documents = (result.documents ?? []) as Record<string, unknown>[];
  return {
    documents: documents.map(fromFirestoreDocument),
    nextPageToken: result.nextPageToken ?? null,
  };
};

const createDocument: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const fields = args[1];
  const documentId = args[2] ? String(args[2]) : undefined;
  if (!collection) throw new Error("collection is required");
  const { projectId } = requireAccessToken();
  const params = new URLSearchParams();
  if (documentId) params.set("documentId", documentId);
  const qs = params.toString();
  const url = firestoreUrl(projectId, collection) + (qs ? `?${qs}` : "");
  const body = { fields: buildFirestoreFields(fields) };
  const doc = await firebaseRequest(url, { method: "POST", body: JSON.stringify(body) }) as Record<string, unknown>;
  return fromFirestoreDocument(doc);
};

const updateDocument: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const documentId = String(args[1] ?? "");
  const fields = args[2];
  const updateMask = args[3];
  if (!collection || !documentId) throw new Error("collection and documentId are required");
  const { projectId } = requireAccessToken();
  const params = new URLSearchParams();
  if (updateMask) {
    const maskFields = Array.isArray(updateMask) ? updateMask : [updateMask];
    for (const f of maskFields) params.append("updateMask.fieldPaths", String(f));
  } else {
    const obj = (typeof fields === "object" && fields !== null ? fields : {}) as Record<string, unknown>;
    for (const key of Object.keys(obj)) params.append("updateMask.fieldPaths", key);
  }
  const qs = params.toString();
  const url = firestoreUrl(projectId, `${collection}/${documentId}`) + (qs ? `?${qs}` : "");
  const body = { fields: buildFirestoreFields(fields) };
  const doc = await firebaseRequest(url, { method: "PATCH", body: JSON.stringify(body) }) as Record<string, unknown>;
  return fromFirestoreDocument(doc);
};

const deleteDocument: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const documentId = String(args[1] ?? "");
  if (!collection || !documentId) throw new Error("collection and documentId are required");
  const { projectId } = requireAccessToken();
  const url = firestoreUrl(projectId, `${collection}/${documentId}`);
  await firebaseRequest(url, { method: "DELETE" });
  return { deleted: true, collection, documentId };
};

const queryDocuments: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const query = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!collection) throw new Error("collection is required");
  const { projectId } = requireAccessToken();
  const url = `${FIRESTORE_BASE}/projects/${projectId}/databases/(default)/documents:runQuery`;

  const structuredQuery: Record<string, unknown> = {
    from: [{ collectionId: collection }],
  };

  if (query.where) {
    const where = query.where as Record<string, unknown>;
    const filters: Record<string, unknown>[] = [];
    for (const [field, condition] of Object.entries(where)) {
      if (typeof condition === "object" && condition !== null) {
        for (const [op, val] of Object.entries(condition as Record<string, unknown>)) {
          const opMap: Record<string, string> = {
            "==": "EQUAL", "!=": "NOT_EQUAL",
            "<": "LESS_THAN", "<=": "LESS_THAN_OR_EQUAL",
            ">": "GREATER_THAN", ">=": "GREATER_THAN_OR_EQUAL",
            "in": "IN", "not-in": "NOT_IN",
            "array-contains": "ARRAY_CONTAINS",
            "array-contains-any": "ARRAY_CONTAINS_ANY",
          };
          const firestoreOp = opMap[op] ?? "EQUAL";

          if (firestoreOp === "IN" || firestoreOp === "NOT_IN" || firestoreOp === "ARRAY_CONTAINS_ANY") {
            const values = Array.isArray(val) ? val : [val];
            filters.push({
              fieldFilter: {
                field: { fieldPath: field },
                op: firestoreOp,
                value: { arrayValue: { values: values.map(toFirestoreValue) } },
              },
            });
          } else {
            filters.push({
              fieldFilter: {
                field: { fieldPath: field },
                op: firestoreOp,
                value: toFirestoreValue(val),
              },
            });
          }
        }
      } else {
        filters.push({
          fieldFilter: {
            field: { fieldPath: field },
            op: "EQUAL",
            value: toFirestoreValue(condition),
          },
        });
      }
    }
    if (filters.length === 1) {
      structuredQuery.where = filters[0];
    } else if (filters.length > 1) {
      structuredQuery.where = { compositeFilter: { op: "AND", filters } };
    }
  }

  if (query.orderBy) {
    const orderBy = Array.isArray(query.orderBy) ? query.orderBy : [query.orderBy];
    structuredQuery.orderBy = orderBy.map((o: unknown) => {
      if (typeof o === "string") return { field: { fieldPath: o }, direction: "ASCENDING" };
      const obj = o as Record<string, unknown>;
      return { field: { fieldPath: String(obj.field ?? "") }, direction: String(obj.direction ?? "ASCENDING").toUpperCase() };
    });
  }

  if (query.limit) structuredQuery.limit = Number(query.limit);
  if (query.offset) structuredQuery.offset = Number(query.offset);

  const body = { structuredQuery };
  const results = await firebaseRequest(url, { method: "POST", body: JSON.stringify(body) }) as Record<string, unknown>[];
  return results
    .filter((r: any) => r.document)
    .map((r: any) => fromFirestoreDocument(r.document as Record<string, unknown>));
};

const batchGet: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const documentIds = (Array.isArray(args[1]) ? args[1] : []).map(String);
  if (!collection || documentIds.length === 0) throw new Error("collection and documentIds array are required");
  const { projectId } = requireAccessToken();
  const url = `${FIRESTORE_BASE}/projects/${projectId}/databases/(default)/documents:batchGet`;
  const documents = documentIds.map(
    (id: any) => `projects/${projectId}/databases/(default)/documents/${collection}/${id}`
  );
  const body = { documents };
  const results = await firebaseRequest(url, { method: "POST", body: JSON.stringify(body) }) as Record<string, unknown>[];
  return results.map((r: any) => {
    if (r.found) return fromFirestoreDocument(r.found as Record<string, unknown>);
    if (r.missing) return { _missing: true, _path: r.missing };
    return null;
  });
};

// --- Auth operations ---

const AUTH_BASE = "https://identitytoolkit.googleapis.com/v1";

async function authRequest(endpoint: string, body: Record<string, unknown>): Promise<Value> {
  const { apiKey } = requireApiKey();
  const url = `${AUTH_BASE}/${endpoint}?key=${apiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  let data: unknown;
  try { data = JSON.parse(text); } catch { data = text; }
  if (!response.ok) {
    const errMsg = typeof data === "object" && data !== null && "error" in (data as Record<string, unknown>)
      ? JSON.stringify((data as Record<string, unknown>).error)
      : String(data);
    throw new Error(`Firebase Auth error (${response.status}): ${errMsg}`);
  }
  return data;
}

const signUp: BuiltinHandler = async (args) => {
  const email = String(args[0] ?? "");
  const password = String(args[1] ?? "");
  if (!email || !password) throw new Error("email and password are required");
  const result = await authRequest("accounts:signUp", { email, password, returnSecureToken: true }) as Record<string, unknown>;
  return { idToken: result.idToken, email: result.email, localId: result.localId, refreshToken: result.refreshToken, expiresIn: result.expiresIn };
};

const signIn: BuiltinHandler = async (args) => {
  const email = String(args[0] ?? "");
  const password = String(args[1] ?? "");
  if (!email || !password) throw new Error("email and password are required");
  const result = await authRequest("accounts:signInWithPassword", { email, password, returnSecureToken: true }) as Record<string, unknown>;
  return { idToken: result.idToken, email: result.email, localId: result.localId, refreshToken: result.refreshToken, expiresIn: result.expiresIn, registered: result.registered };
};

const signInAnonymously: BuiltinHandler = async () => {
  const result = await authRequest("accounts:signUp", { returnSecureToken: true }) as Record<string, unknown>;
  return { idToken: result.idToken, localId: result.localId, refreshToken: result.refreshToken, expiresIn: result.expiresIn };
};

const sendPasswordReset: BuiltinHandler = async (args) => {
  const email = String(args[0] ?? "");
  if (!email) throw new Error("email is required");
  const result = await authRequest("accounts:sendOobCode", { requestType: "PASSWORD_RESET", email }) as Record<string, unknown>;
  return { email: result.email, sent: true };
};

const verifyEmail: BuiltinHandler = async (args) => {
  const idToken = String(args[0] ?? "");
  if (!idToken) throw new Error("idToken is required");
  const result = await authRequest("accounts:sendOobCode", { requestType: "VERIFY_EMAIL", idToken }) as Record<string, unknown>;
  return { email: result.email, sent: true };
};

const getUserByToken: BuiltinHandler = async (args) => {
  const idToken = String(args[0] ?? "");
  if (!idToken) throw new Error("idToken is required");
  const result = await authRequest("accounts:lookup", { idToken }) as Record<string, unknown>;
  const users = (result.users ?? []) as Record<string, unknown>[];
  if (users.length === 0) throw new Error("No user found for the provided idToken");
  const user = users[0]!;
  return {
    localId: user.localId, email: user.email, emailVerified: user.emailVerified,
    displayName: user.displayName ?? null, photoUrl: user.photoUrl ?? null,
    createdAt: user.createdAt ?? null, lastLoginAt: user.lastLoginAt ?? null,
    providerUserInfo: user.providerUserInfo ?? [],
  };
};

const deleteAccount: BuiltinHandler = async (args) => {
  const idToken = String(args[0] ?? "");
  if (!idToken) throw new Error("idToken is required");
  await authRequest("accounts:delete", { idToken });
  return { deleted: true };
};

// --- Realtime Database ---

function rtdbUrl(projectId: string, path: string, token?: string): string {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  const base = `https://${projectId}-default-rtdb.firebaseio.com/${cleanPath}.json`;
  if (token) return `${base}?auth=${token}`;
  return base;
}

function getRtdbAuth(): { projectId: string; token?: string } {
  const creds = getCredentials();
  return { projectId: creds.projectId, token: creds.accessToken ?? creds.apiKey };
}

const rtdbGet: BuiltinHandler = async (args) => {
  const rtdbPath = String(args[0] ?? "");
  const { projectId, token } = getRtdbAuth();
  const url = rtdbUrl(projectId, rtdbPath, token);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`RTDB error (${response.status}): ${await response.text()}`);
  return await response.json();
};

const rtdbSet: BuiltinHandler = async (args) => {
  const rtdbPath = String(args[0] ?? "");
  const data = args[1];
  const { projectId, token } = getRtdbAuth();
  const url = rtdbUrl(projectId, rtdbPath, token);
  const response = await fetch(url, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (!response.ok) throw new Error(`RTDB error (${response.status}): ${await response.text()}`);
  return await response.json();
};

const rtdbUpdate: BuiltinHandler = async (args) => {
  const rtdbPath = String(args[0] ?? "");
  const data = args[1];
  const { projectId, token } = getRtdbAuth();
  const url = rtdbUrl(projectId, rtdbPath, token);
  const response = await fetch(url, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (!response.ok) throw new Error(`RTDB error (${response.status}): ${await response.text()}`);
  return await response.json();
};

const rtdbPush: BuiltinHandler = async (args) => {
  const rtdbPath = String(args[0] ?? "");
  const data = args[1];
  const { projectId, token } = getRtdbAuth();
  const url = rtdbUrl(projectId, rtdbPath, token);
  const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (!response.ok) throw new Error(`RTDB error (${response.status}): ${await response.text()}`);
  return await response.json();
};

const rtdbDelete: BuiltinHandler = async (args) => {
  const rtdbPath = String(args[0] ?? "");
  const { projectId, token } = getRtdbAuth();
  const url = rtdbUrl(projectId, rtdbPath, token);
  const response = await fetch(url, { method: "DELETE" });
  if (!response.ok) throw new Error(`RTDB error (${response.status}): ${await response.text()}`);
  return { deleted: true, path: rtdbPath };
};

// --- Exports ---

export const FirebaseFunctions: Record<string, BuiltinHandler> = {
  setCredentials, setServiceToken,
  getDocument, listDocuments, createDocument, updateDocument, deleteDocument, queryDocuments, batchGet,
  signUp, signIn, signInAnonymously, sendPasswordReset, verifyEmail, getUserByToken, deleteAccount,
  rtdbGet, rtdbSet, rtdbUpdate, rtdbPush, rtdbDelete,
};

export const FirebaseFunctionMetadata = {
  setCredentials: {
    description: "Set Firebase project ID and API key for client-side REST operations",
    parameters: [
      { name: "projectId", dataType: "string", description: "Firebase project ID", formInputType: "text", required: true },
      { name: "apiKey", dataType: "string", description: "Firebase Web API key", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{configured, projectId}",
    example: 'firebase.setCredentials "my-project-id" "AIzaSy..."',
  },
  setServiceToken: {
    description: "Set Firebase project ID and OAuth2 access token for admin operations",
    parameters: [
      { name: "projectId", dataType: "string", description: "Firebase project ID", formInputType: "text", required: true },
      { name: "accessToken", dataType: "string", description: "OAuth2 access token", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{configured, projectId, hasAccessToken}",
    example: 'firebase.setServiceToken "my-project-id" "ya29.a0..."',
  },
  getDocument: {
    description: "Get a Firestore document by collection and document ID",
    parameters: [
      { name: "collection", dataType: "string", description: "Collection name", formInputType: "text", required: true },
      { name: "documentId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Document with _id, _path, and fields",
    example: 'firebase.getDocument "users" "user123"',
  },
  listDocuments: {
    description: "List Firestore documents in a collection",
    parameters: [
      { name: "collection", dataType: "string", description: "Collection name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{pageSize, pageToken, orderBy}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "{documents, nextPageToken}",
    example: 'firebase.listDocuments "users" {"pageSize": 10}',
  },
  createDocument: {
    description: "Create a Firestore document with auto or specified ID",
    parameters: [
      { name: "collection", dataType: "string", description: "Collection name", formInputType: "text", required: true },
      { name: "fields", dataType: "object", description: "Document fields", formInputType: "json", required: true },
      { name: "documentId", dataType: "string", description: "Optional document ID (auto-generated if omitted)", formInputType: "text", required: false },
    ],
    returnType: "object", returnDescription: "Created document with _id and fields",
    example: 'firebase.createDocument "users" {"name": "Alice", "age": 30}',
  },
  updateDocument: {
    description: "Update a Firestore document's fields",
    parameters: [
      { name: "collection", dataType: "string", description: "Collection name", formInputType: "text", required: true },
      { name: "documentId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
      { name: "fields", dataType: "object", description: "Fields to update", formInputType: "json", required: true },
      { name: "updateMask", dataType: "array", description: "Specific field paths to update (optional)", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Updated document",
    example: 'firebase.updateDocument "users" "user123" {"name": "Bob"}',
  },
  deleteDocument: {
    description: "Delete a Firestore document",
    parameters: [
      { name: "collection", dataType: "string", description: "Collection name", formInputType: "text", required: true },
      { name: "documentId", dataType: "string", description: "Document ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{deleted, collection, documentId}",
    example: 'firebase.deleteDocument "users" "user123"',
  },
  queryDocuments: {
    description: "Query Firestore documents with structured query (where, orderBy, limit)",
    parameters: [
      { name: "collection", dataType: "string", description: "Collection name", formInputType: "text", required: true },
      { name: "query", dataType: "object", description: "{where, orderBy, limit, offset}", formInputType: "json", required: true },
    ],
    returnType: "array", returnDescription: "Array of matching documents",
    example: 'firebase.queryDocuments "users" {"where": {"age": {">=": 18}}, "limit": 10}',
  },
  batchGet: {
    description: "Get multiple Firestore documents by IDs",
    parameters: [
      { name: "collection", dataType: "string", description: "Collection name", formInputType: "text", required: true },
      { name: "documentIds", dataType: "array", description: "Array of document IDs", formInputType: "json", required: true },
    ],
    returnType: "array", returnDescription: "Array of documents (or {_missing: true} for not found)",
    example: 'firebase.batchGet "users" ["user1", "user2", "user3"]',
  },
  signUp: {
    description: "Create a new user with email and password",
    parameters: [
      { name: "email", dataType: "string", description: "User email", formInputType: "text", required: true },
      { name: "password", dataType: "string", description: "User password", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{idToken, email, localId, refreshToken, expiresIn}",
    example: 'firebase.signUp "user@example.com" "securePass123"',
  },
  signIn: {
    description: "Sign in a user with email and password",
    parameters: [
      { name: "email", dataType: "string", description: "User email", formInputType: "text", required: true },
      { name: "password", dataType: "string", description: "User password", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{idToken, email, localId, refreshToken, expiresIn, registered}",
    example: 'firebase.signIn "user@example.com" "securePass123"',
  },
  signInAnonymously: {
    description: "Sign in anonymously",
    parameters: [],
    returnType: "object", returnDescription: "{idToken, localId, refreshToken, expiresIn}",
    example: "firebase.signInAnonymously",
  },
  sendPasswordReset: {
    description: "Send a password reset email",
    parameters: [
      { name: "email", dataType: "string", description: "User email", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{email, sent}",
    example: 'firebase.sendPasswordReset "user@example.com"',
  },
  verifyEmail: {
    description: "Send an email verification to the user",
    parameters: [
      { name: "idToken", dataType: "string", description: "User ID token from sign in", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{email, sent}",
    example: 'firebase.verifyEmail "eyJhbGciOi..."',
  },
  getUserByToken: {
    description: "Get user data from an ID token",
    parameters: [
      { name: "idToken", dataType: "string", description: "User ID token from sign in", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{localId, email, emailVerified, displayName, ...}",
    example: 'firebase.getUserByToken "eyJhbGciOi..."',
  },
  deleteAccount: {
    description: "Delete a user account",
    parameters: [
      { name: "idToken", dataType: "string", description: "User ID token from sign in", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{deleted}",
    example: 'firebase.deleteAccount "eyJhbGciOi..."',
  },
  rtdbGet: {
    description: "Read data from Realtime Database at a path",
    parameters: [
      { name: "path", dataType: "string", description: "Database path", formInputType: "text", required: true },
    ],
    returnType: "any", returnDescription: "Data at the path",
    example: 'firebase.rtdbGet "users/user123"',
  },
  rtdbSet: {
    description: "Write data to Realtime Database at a path (overwrites)",
    parameters: [
      { name: "path", dataType: "string", description: "Database path", formInputType: "text", required: true },
      { name: "data", dataType: "any", description: "Data to write", formInputType: "json", required: true },
    ],
    returnType: "any", returnDescription: "Written data",
    example: 'firebase.rtdbSet "users/user123" {"name": "Alice", "age": 30}',
  },
  rtdbUpdate: {
    description: "Update data at a Realtime Database path (merge)",
    parameters: [
      { name: "path", dataType: "string", description: "Database path", formInputType: "text", required: true },
      { name: "data", dataType: "object", description: "Fields to update", formInputType: "json", required: true },
    ],
    returnType: "any", returnDescription: "Updated data",
    example: 'firebase.rtdbUpdate "users/user123" {"age": 31}',
  },
  rtdbPush: {
    description: "Push a new child to a Realtime Database path",
    parameters: [
      { name: "path", dataType: "string", description: "Database path", formInputType: "text", required: true },
      { name: "data", dataType: "any", description: "Data for the new child", formInputType: "json", required: true },
    ],
    returnType: "object", returnDescription: "{name} with the generated key",
    example: 'firebase.rtdbPush "messages" {"text": "Hello", "sender": "Alice"}',
  },
  rtdbDelete: {
    description: "Delete data at a Realtime Database path",
    parameters: [
      { name: "path", dataType: "string", description: "Database path", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{deleted, path}",
    example: 'firebase.rtdbDelete "users/user123"',
  },
};

export const FirebaseModuleMetadata = {
  description: "Firebase REST API client for Firestore, Authentication, and Realtime Database operations",
  methods: Object.keys(FirebaseFunctions),
  category: "cloud",
};
