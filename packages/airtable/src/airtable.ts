import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

type Value = string | number | boolean | null | object;

// ── Internal State ──────────────────────────────────────────────────

const API_BASE = "https://api.airtable.com/v0";

const tokens = new Map<string, string>();

// ── Helper ──────────────────────────────────────────────────────────

function getToken(key: string): string {
  const token = tokens.get(key);
  if (!token) {
    throw new Error(
      `Airtable token "${key}" not configured. Call airtable.setToken first.`,
    );
  }
  return token;
}

async function airtableRequest(
  tokenKey: string,
  path: string,
  method: string = "GET",
  body?: unknown,
): Promise<Value> {
  const token = getToken(tokenKey);

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const opts: RequestInit = { method, headers };
  if (body !== undefined) {
    opts.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${path}`, opts);

  if (!response.ok) {
    const errBody = await response.text();
    let message: string;
    try {
      const parsed = JSON.parse(errBody) as Record<string, unknown>;
      const err = parsed.error as Record<string, unknown> | undefined;
      message = err ? `${String(err.type ?? "UNKNOWN")}: ${String(err.message ?? errBody)}` : errBody;
    } catch {
      message = errBody;
    }
    throw new Error(`Airtable API ${method} ${path} failed (${response.status}): ${message}`);
  }

  // DELETE with 200 may return empty body
  const text = await response.text();
  if (!text) return { ok: true };
  return JSON.parse(text) as Value;
}

// ── Function Handlers ───────────────────────────────────────────────

const setToken: BuiltinHandler = (args) => {
  const key = String(args[0] ?? "default");
  const token = String(args[1] ?? "");
  if (!token) throw new Error("API token is required");
  tokens.set(key, token);
  return { key, configured: true };
};

const listBases: BuiltinHandler = async (args) => {
  const key = String(args[0] ?? "default");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  let path = "/meta/bases";
  const params: string[] = [];
  if (opts.offset) params.push(`offset=${encodeURIComponent(String(opts.offset))}`);
  if (params.length) path += `?${params.join("&")}`;

  const result = (await airtableRequest(key, path)) as Record<string, unknown>;
  return { bases: result.bases, offset: result.offset ?? null };
};

const getBaseSchema: BuiltinHandler = async (args) => {
  const key = String(args[0] ?? "default");
  const baseId = String(args[1] ?? "");
  if (!baseId) throw new Error("Base ID is required");

  const result = (await airtableRequest(key, `/meta/bases/${encodeURIComponent(baseId)}/tables`)) as Record<string, unknown>;
  return { tables: result.tables };
};

const listRecords: BuiltinHandler = async (args) => {
  const key = String(args[0] ?? "default");
  const baseId = String(args[1] ?? "");
  const tableIdOrName = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  if (!baseId) throw new Error("Base ID is required");
  if (!tableIdOrName) throw new Error("Table ID or name is required");

  const params: string[] = [];
  if (opts.filterByFormula) params.push(`filterByFormula=${encodeURIComponent(String(opts.filterByFormula))}`);
  if (opts.maxRecords) params.push(`maxRecords=${encodeURIComponent(String(opts.maxRecords))}`);
  if (opts.pageSize) params.push(`pageSize=${encodeURIComponent(String(opts.pageSize))}`);
  if (opts.offset) params.push(`offset=${encodeURIComponent(String(opts.offset))}`);
  if (opts.view) params.push(`view=${encodeURIComponent(String(opts.view))}`);
  if (opts.cellFormat) params.push(`cellFormat=${encodeURIComponent(String(opts.cellFormat))}`);
  if (opts.timeZone) params.push(`timeZone=${encodeURIComponent(String(opts.timeZone))}`);
  if (opts.userLocale) params.push(`userLocale=${encodeURIComponent(String(opts.userLocale))}`);

  if (Array.isArray(opts.fields)) {
    for (const f of opts.fields) {
      params.push(`fields[]=${encodeURIComponent(String(f))}`);
    }
  }

  if (Array.isArray(opts.sort)) {
    const sortArr = opts.sort as Array<Record<string, unknown>>;
    for (let i = 0; i < sortArr.length; i++) {
      const s = sortArr[i]!;
      if (s.field) params.push(`sort[${i}][field]=${encodeURIComponent(String(s.field))}`);
      if (s.direction) params.push(`sort[${i}][direction]=${encodeURIComponent(String(s.direction))}`);
    }
  }

  let path = `/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}`;
  if (params.length) path += `?${params.join("&")}`;

  const result = (await airtableRequest(key, path)) as Record<string, unknown>;
  return { records: result.records, offset: result.offset ?? null };
};

const getRecord: BuiltinHandler = async (args) => {
  const key = String(args[0] ?? "default");
  const baseId = String(args[1] ?? "");
  const tableIdOrName = String(args[2] ?? "");
  const recordId = String(args[3] ?? "");

  if (!baseId) throw new Error("Base ID is required");
  if (!tableIdOrName) throw new Error("Table ID or name is required");
  if (!recordId) throw new Error("Record ID is required");

  const path = `/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}/${encodeURIComponent(recordId)}`;
  return (await airtableRequest(key, path)) as Value;
};

const createRecord: BuiltinHandler = async (args) => {
  const key = String(args[0] ?? "default");
  const baseId = String(args[1] ?? "");
  const tableIdOrName = String(args[2] ?? "");
  const fields = args[3] ?? {};

  if (!baseId) throw new Error("Base ID is required");
  if (!tableIdOrName) throw new Error("Table ID or name is required");

  const path = `/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}`;
  return (await airtableRequest(key, path, "POST", { fields })) as Value;
};

const createRecords: BuiltinHandler = async (args) => {
  const key = String(args[0] ?? "default");
  const baseId = String(args[1] ?? "");
  const tableIdOrName = String(args[2] ?? "");
  const records = args[3];

  if (!baseId) throw new Error("Base ID is required");
  if (!tableIdOrName) throw new Error("Table ID or name is required");
  if (!Array.isArray(records)) throw new Error("Records must be an array");
  if (records.length > 10) throw new Error("Bulk create supports up to 10 records at a time");

  const payload = records.map((r: any) => {
    if (typeof r === "object" && r !== null && "fields" in (r as Record<string, unknown>)) return r;
    return { fields: r };
  });

  const path = `/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}`;
  return (await airtableRequest(key, path, "POST", { records: payload })) as Value;
};

const updateRecord: BuiltinHandler = async (args) => {
  const key = String(args[0] ?? "default");
  const baseId = String(args[1] ?? "");
  const tableIdOrName = String(args[2] ?? "");
  const recordId = String(args[3] ?? "");
  const fields = args[4] ?? {};

  if (!baseId) throw new Error("Base ID is required");
  if (!tableIdOrName) throw new Error("Table ID or name is required");
  if (!recordId) throw new Error("Record ID is required");

  const path = `/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}/${encodeURIComponent(recordId)}`;
  return (await airtableRequest(key, path, "PATCH", { fields })) as Value;
};

const updateRecords: BuiltinHandler = async (args) => {
  const key = String(args[0] ?? "default");
  const baseId = String(args[1] ?? "");
  const tableIdOrName = String(args[2] ?? "");
  const records = args[3];

  if (!baseId) throw new Error("Base ID is required");
  if (!tableIdOrName) throw new Error("Table ID or name is required");
  if (!Array.isArray(records)) throw new Error("Records must be an array");
  if (records.length > 10) throw new Error("Bulk update supports up to 10 records at a time");

  const path = `/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}`;
  return (await airtableRequest(key, path, "PATCH", { records })) as Value;
};

const replaceRecord: BuiltinHandler = async (args) => {
  const key = String(args[0] ?? "default");
  const baseId = String(args[1] ?? "");
  const tableIdOrName = String(args[2] ?? "");
  const recordId = String(args[3] ?? "");
  const fields = args[4] ?? {};

  if (!baseId) throw new Error("Base ID is required");
  if (!tableIdOrName) throw new Error("Table ID or name is required");
  if (!recordId) throw new Error("Record ID is required");

  const path = `/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}/${encodeURIComponent(recordId)}`;
  return (await airtableRequest(key, path, "PUT", { fields })) as Value;
};

const deleteRecord: BuiltinHandler = async (args) => {
  const key = String(args[0] ?? "default");
  const baseId = String(args[1] ?? "");
  const tableIdOrName = String(args[2] ?? "");
  const recordId = String(args[3] ?? "");

  if (!baseId) throw new Error("Base ID is required");
  if (!tableIdOrName) throw new Error("Table ID or name is required");
  if (!recordId) throw new Error("Record ID is required");

  const path = `/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}/${encodeURIComponent(recordId)}`;
  return (await airtableRequest(key, path, "DELETE")) as Value;
};

const deleteRecords: BuiltinHandler = async (args) => {
  const key = String(args[0] ?? "default");
  const baseId = String(args[1] ?? "");
  const tableIdOrName = String(args[2] ?? "");
  const recordIds = args[3];

  if (!baseId) throw new Error("Base ID is required");
  if (!tableIdOrName) throw new Error("Table ID or name is required");
  if (!Array.isArray(recordIds)) throw new Error("Record IDs must be an array");
  if (recordIds.length > 10) throw new Error("Bulk delete supports up to 10 records at a time");

  const params = recordIds.map((id: any) => `records[]=${encodeURIComponent(String(id))}`).join("&");
  const path = `/${encodeURIComponent(baseId)}/${encodeURIComponent(tableIdOrName)}?${params}`;
  return (await airtableRequest(key, path, "DELETE")) as Value;
};

const createTable: BuiltinHandler = async (args) => {
  const key = String(args[0] ?? "default");
  const baseId = String(args[1] ?? "");
  const name = String(args[2] ?? "");
  const fields = args[3];

  if (!baseId) throw new Error("Base ID is required");
  if (!name) throw new Error("Table name is required");
  if (!Array.isArray(fields)) throw new Error("Fields must be an array of field definitions");

  const body: Record<string, unknown> = { name, fields };
  const path = `/meta/bases/${encodeURIComponent(baseId)}/tables`;
  return (await airtableRequest(key, path, "POST", body)) as Value;
};

const updateTable: BuiltinHandler = async (args) => {
  const key = String(args[0] ?? "default");
  const baseId = String(args[1] ?? "");
  const tableId = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  if (!baseId) throw new Error("Base ID is required");
  if (!tableId) throw new Error("Table ID is required");

  const body: Record<string, unknown> = {};
  if (opts.name !== undefined) body.name = String(opts.name);
  if (opts.description !== undefined) body.description = String(opts.description);

  const path = `/meta/bases/${encodeURIComponent(baseId)}/tables/${encodeURIComponent(tableId)}`;
  return (await airtableRequest(key, path, "PATCH", body)) as Value;
};

const createField: BuiltinHandler = async (args) => {
  const key = String(args[0] ?? "default");
  const baseId = String(args[1] ?? "");
  const tableId = String(args[2] ?? "");
  const name = String(args[3] ?? "");
  const type = String(args[4] ?? "");
  const opts = (typeof args[5] === "object" && args[5] !== null ? args[5] : {}) as Record<string, unknown>;

  if (!baseId) throw new Error("Base ID is required");
  if (!tableId) throw new Error("Table ID is required");
  if (!name) throw new Error("Field name is required");
  if (!type) throw new Error("Field type is required");

  const body: Record<string, unknown> = { name, type };
  if (opts.description !== undefined) body.description = String(opts.description);
  if (opts.options !== undefined) body.options = opts.options;

  const path = `/meta/bases/${encodeURIComponent(baseId)}/tables/${encodeURIComponent(tableId)}/fields`;
  return (await airtableRequest(key, path, "POST", body)) as Value;
};

const updateField: BuiltinHandler = async (args) => {
  const key = String(args[0] ?? "default");
  const baseId = String(args[1] ?? "");
  const tableId = String(args[2] ?? "");
  const fieldId = String(args[3] ?? "");
  const opts = (typeof args[4] === "object" && args[4] !== null ? args[4] : {}) as Record<string, unknown>;

  if (!baseId) throw new Error("Base ID is required");
  if (!tableId) throw new Error("Table ID is required");
  if (!fieldId) throw new Error("Field ID is required");

  const body: Record<string, unknown> = {};
  if (opts.name !== undefined) body.name = String(opts.name);
  if (opts.description !== undefined) body.description = String(opts.description);

  const path = `/meta/bases/${encodeURIComponent(baseId)}/tables/${encodeURIComponent(tableId)}/fields/${encodeURIComponent(fieldId)}`;
  return (await airtableRequest(key, path, "PATCH", body)) as Value;
};

// ── Exports ─────────────────────────────────────────────────────────

export const AirtableFunctions: Record<string, BuiltinHandler> = {
  setToken,
  listBases,
  getBaseSchema,
  listRecords,
  getRecord,
  createRecord,
  createRecords,
  updateRecord,
  updateRecords,
  replaceRecord,
  deleteRecord,
  deleteRecords,
  createTable,
  updateTable,
  createField,
  updateField,
};

export const AirtableFunctionMetadata = {
  setToken: {
    description: "Store an Airtable personal access token for authentication",
    parameters: [
      { name: "key", dataType: "string", description: "Token identifier (e.g. 'default')", formInputType: "text", required: true },
      { name: "apiToken", dataType: "string", description: "Airtable personal access token", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{key, configured}",
    example: 'airtable.setToken "default" "patXXXXXXXXXXXXXX"',
  },
  listBases: {
    description: "List all bases accessible by the configured token",
    parameters: [
      { name: "key", dataType: "string", description: "Token identifier", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{offset?} for pagination", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{bases, offset}",
    example: 'airtable.listBases "default"',
  },
  getBaseSchema: {
    description: "Get the schema (tables and fields) for a base",
    parameters: [
      { name: "key", dataType: "string", description: "Token identifier", formInputType: "text", required: true },
      { name: "baseId", dataType: "string", description: "Airtable base ID (e.g. 'appXXXXXXXXXXXXXX')", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{tables} with field definitions",
    example: 'airtable.getBaseSchema "default" "appABC123"',
  },
  listRecords: {
    description: "List records from a table with optional filtering, sorting, and pagination",
    parameters: [
      { name: "key", dataType: "string", description: "Token identifier", formInputType: "text", required: true },
      { name: "baseId", dataType: "string", description: "Base ID", formInputType: "text", required: true },
      { name: "tableIdOrName", dataType: "string", description: "Table ID or name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{filterByFormula?, sort?, fields?, maxRecords?, pageSize?, offset?, view?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{records, offset}",
    example: 'airtable.listRecords "default" "appABC123" "Tasks" {"filterByFormula": "{Status}=\'Done\'", "maxRecords": 50}',
  },
  getRecord: {
    description: "Get a single record by ID",
    parameters: [
      { name: "key", dataType: "string", description: "Token identifier", formInputType: "text", required: true },
      { name: "baseId", dataType: "string", description: "Base ID", formInputType: "text", required: true },
      { name: "tableIdOrName", dataType: "string", description: "Table ID or name", formInputType: "text", required: true },
      { name: "recordId", dataType: "string", description: "Record ID (e.g. 'recXXXXXXXXXXXXXX')", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Record object with id, fields, createdTime",
    example: 'airtable.getRecord "default" "appABC123" "Tasks" "recDEF456"',
  },
  createRecord: {
    description: "Create a single record in a table",
    parameters: [
      { name: "key", dataType: "string", description: "Token identifier", formInputType: "text", required: true },
      { name: "baseId", dataType: "string", description: "Base ID", formInputType: "text", required: true },
      { name: "tableIdOrName", dataType: "string", description: "Table ID or name", formInputType: "text", required: true },
      { name: "fields", dataType: "object", description: "Field name-value pairs", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Created record with id, fields, createdTime",
    example: 'airtable.createRecord "default" "appABC123" "Tasks" {"Name": "New task", "Status": "Todo"}',
  },
  createRecords: {
    description: "Bulk create up to 10 records in a table",
    parameters: [
      { name: "key", dataType: "string", description: "Token identifier", formInputType: "text", required: true },
      { name: "baseId", dataType: "string", description: "Base ID", formInputType: "text", required: true },
      { name: "tableIdOrName", dataType: "string", description: "Table ID or name", formInputType: "text", required: true },
      { name: "records", dataType: "array", description: "Array of {fields: {...}} objects (max 10)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "{records} array of created records",
    example: 'airtable.createRecords "default" "appABC123" "Tasks" [{"fields": {"Name": "Task A"}}, {"fields": {"Name": "Task B"}}]',
  },
  updateRecord: {
    description: "Update a single record (PATCH - only updates specified fields)",
    parameters: [
      { name: "key", dataType: "string", description: "Token identifier", formInputType: "text", required: true },
      { name: "baseId", dataType: "string", description: "Base ID", formInputType: "text", required: true },
      { name: "tableIdOrName", dataType: "string", description: "Table ID or name", formInputType: "text", required: true },
      { name: "recordId", dataType: "string", description: "Record ID", formInputType: "text", required: true },
      { name: "fields", dataType: "object", description: "Field name-value pairs to update", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated record",
    example: 'airtable.updateRecord "default" "appABC123" "Tasks" "recDEF456" {"Status": "Done"}',
  },
  updateRecords: {
    description: "Bulk update up to 10 records (PATCH)",
    parameters: [
      { name: "key", dataType: "string", description: "Token identifier", formInputType: "text", required: true },
      { name: "baseId", dataType: "string", description: "Base ID", formInputType: "text", required: true },
      { name: "tableIdOrName", dataType: "string", description: "Table ID or name", formInputType: "text", required: true },
      { name: "records", dataType: "array", description: "Array of {id, fields} objects (max 10)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "{records} array of updated records",
    example: 'airtable.updateRecords "default" "appABC123" "Tasks" [{"id": "recDEF456", "fields": {"Status": "Done"}}]',
  },
  replaceRecord: {
    description: "Replace a single record (PUT - clears unspecified fields)",
    parameters: [
      { name: "key", dataType: "string", description: "Token identifier", formInputType: "text", required: true },
      { name: "baseId", dataType: "string", description: "Base ID", formInputType: "text", required: true },
      { name: "tableIdOrName", dataType: "string", description: "Table ID or name", formInputType: "text", required: true },
      { name: "recordId", dataType: "string", description: "Record ID", formInputType: "text", required: true },
      { name: "fields", dataType: "object", description: "Complete field name-value pairs", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Replaced record",
    example: 'airtable.replaceRecord "default" "appABC123" "Tasks" "recDEF456" {"Name": "Replaced", "Status": "New"}',
  },
  deleteRecord: {
    description: "Delete a single record by ID",
    parameters: [
      { name: "key", dataType: "string", description: "Token identifier", formInputType: "text", required: true },
      { name: "baseId", dataType: "string", description: "Base ID", formInputType: "text", required: true },
      { name: "tableIdOrName", dataType: "string", description: "Table ID or name", formInputType: "text", required: true },
      { name: "recordId", dataType: "string", description: "Record ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{id, deleted: true}",
    example: 'airtable.deleteRecord "default" "appABC123" "Tasks" "recDEF456"',
  },
  deleteRecords: {
    description: "Bulk delete up to 10 records by ID",
    parameters: [
      { name: "key", dataType: "string", description: "Token identifier", formInputType: "text", required: true },
      { name: "baseId", dataType: "string", description: "Base ID", formInputType: "text", required: true },
      { name: "tableIdOrName", dataType: "string", description: "Table ID or name", formInputType: "text", required: true },
      { name: "recordIds", dataType: "array", description: "Array of record IDs (max 10)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "{records} array of {id, deleted}",
    example: 'airtable.deleteRecords "default" "appABC123" "Tasks" ["recDEF456", "recGHI789"]',
  },
  createTable: {
    description: "Create a new table in a base with field definitions",
    parameters: [
      { name: "key", dataType: "string", description: "Token identifier", formInputType: "text", required: true },
      { name: "baseId", dataType: "string", description: "Base ID", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "Table name", formInputType: "text", required: true },
      { name: "fields", dataType: "array", description: "Array of field definitions [{name, type, options?}]", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Created table object with id, name, fields",
    example: 'airtable.createTable "default" "appABC123" "Projects" [{"name": "Name", "type": "singleLineText"}, {"name": "Status", "type": "singleSelect", "options": {"choices": [{"name": "Active"}, {"name": "Done"}]}}]',
  },
  updateTable: {
    description: "Update a table's name or description",
    parameters: [
      { name: "key", dataType: "string", description: "Token identifier", formInputType: "text", required: true },
      { name: "baseId", dataType: "string", description: "Base ID", formInputType: "text", required: true },
      { name: "tableId", dataType: "string", description: "Table ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{name?, description?}", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated table object",
    example: 'airtable.updateTable "default" "appABC123" "tblXYZ" {"name": "Renamed Table", "description": "Updated description"}',
  },
  createField: {
    description: "Create a new field in a table",
    parameters: [
      { name: "key", dataType: "string", description: "Token identifier", formInputType: "text", required: true },
      { name: "baseId", dataType: "string", description: "Base ID", formInputType: "text", required: true },
      { name: "tableId", dataType: "string", description: "Table ID", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "Field name", formInputType: "text", required: true },
      { name: "type", dataType: "string", description: "Field type (e.g. singleLineText, number, singleSelect)", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{description?, options?} field-type-specific options", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created field object with id, name, type",
    example: 'airtable.createField "default" "appABC123" "tblXYZ" "Priority" "singleSelect" {"options": {"choices": [{"name": "High"}, {"name": "Low"}]}}',
  },
  updateField: {
    description: "Update a field's name or description",
    parameters: [
      { name: "key", dataType: "string", description: "Token identifier", formInputType: "text", required: true },
      { name: "baseId", dataType: "string", description: "Base ID", formInputType: "text", required: true },
      { name: "tableId", dataType: "string", description: "Table ID", formInputType: "text", required: true },
      { name: "fieldId", dataType: "string", description: "Field ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{name?, description?}", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated field object",
    example: 'airtable.updateField "default" "appABC123" "tblXYZ" "fldABC" {"name": "Renamed Field", "description": "Updated desc"}',
  },
};

export const AirtableModuleMetadata = {
  description: "Airtable REST API client for managing bases, tables, fields, and records with full CRUD support",
  methods: Object.keys(AirtableFunctions),
  category: "database",
};
