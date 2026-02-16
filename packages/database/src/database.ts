import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import Database from "better-sqlite3";
import type { Database as DatabaseType } from "better-sqlite3";

// ── Internal State ──────────────────────────────────────────────────

const connections = new Map<string, DatabaseType>();

function getDb(name: string): DatabaseType {
  const db = connections.get(name);
  if (!db) throw new Error(`Database "${name}" not found. Open it first with database.open.`);
  return db;
}

// ── Function Handlers ───────────────────────────────────────────────

const open: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const path = String(args[1] ?? ":memory:");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  const dbOpts: Record<string, unknown> = {};
  if (opts.readonly) dbOpts.readonly = true;
  if (opts.fileMustExist) dbOpts.fileMustExist = true;

  const db = new Database(path, dbOpts);

  // Enable WAL mode for better concurrency by default
  if (!opts.readonly && path !== ":memory:") {
    db.pragma("journal_mode = WAL");
  }

  // Enable foreign keys
  db.pragma("foreign_keys = ON");

  connections.set(name, db);
  return { name, path, readonly: !!opts.readonly };
};

const close: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const db = connections.get(name);
  if (!db) return false;
  db.close();
  connections.delete(name);
  return true;
};

const query: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const sql = String(args[1] ?? "");
  const params = args.slice(2);
  const db = getDb(name);

  const stmt = db.prepare(sql);
  const flatParams = params.length === 1 && typeof params[0] === "object" && !Array.isArray(params[0]) ? params[0] : params;
  return stmt.all(flatParams as Record<string, unknown>);
};

const queryOne: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const sql = String(args[1] ?? "");
  const params = args.slice(2);
  const db = getDb(name);

  const stmt = db.prepare(sql);
  const flatParams = params.length === 1 && typeof params[0] === "object" && !Array.isArray(params[0]) ? params[0] : params;
  return stmt.get(flatParams as Record<string, unknown>) ?? null;
};

const execute: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const sql = String(args[1] ?? "");
  const params = args.slice(2);
  const db = getDb(name);

  const stmt = db.prepare(sql);
  const flatParams = params.length === 1 && typeof params[0] === "object" && !Array.isArray(params[0]) ? params[0] : params;
  const info = stmt.run(flatParams as Record<string, unknown>);
  return { changes: info.changes, lastInsertRowid: Number(info.lastInsertRowid) };
};

const insert: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const table = String(args[1] ?? "");
  const data = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const db = getDb(name);

  const columns = Object.keys(data);
  if (columns.length === 0) throw new Error("No data to insert");

  const placeholders = columns.map((c) => `@${c}`).join(", ");
  const sql = `INSERT INTO "${table}" (${columns.map((c) => `"${c}"`).join(", ")}) VALUES (${placeholders})`;

  const stmt = db.prepare(sql);
  const info = stmt.run(data);
  return { id: Number(info.lastInsertRowid), changes: info.changes };
};

const insertMany: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const table = String(args[1] ?? "");
  const rows = Array.isArray(args[2]) ? args[2] : [];
  const db = getDb(name);

  if (rows.length === 0) return { inserted: 0 };

  const columns = Object.keys(rows[0] as Record<string, unknown>);
  const placeholders = columns.map((c) => `@${c}`).join(", ");
  const sql = `INSERT INTO "${table}" (${columns.map((c) => `"${c}"`).join(", ")}) VALUES (${placeholders})`;

  const stmt = db.prepare(sql);
  const insertAll = db.transaction((items: Record<string, unknown>[]) => {
    let count = 0;
    for (const item of items) {
      stmt.run(item);
      count++;
    }
    return count;
  });

  const count = insertAll(rows as Record<string, unknown>[]);
  return { inserted: count };
};

const update: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const table = String(args[1] ?? "");
  const data = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const where = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  const db = getDb(name);

  const setClauses = Object.keys(data).map((c) => `"${c}" = @set_${c}`);
  const whereClauses = Object.keys(where).map((c) => `"${c}" = @where_${c}`);

  if (setClauses.length === 0) throw new Error("No data to update");
  if (whereClauses.length === 0) throw new Error("WHERE clause is required for safety");

  const sql = `UPDATE "${table}" SET ${setClauses.join(", ")} WHERE ${whereClauses.join(" AND ")}`;

  const params: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) params[`set_${k}`] = v;
  for (const [k, v] of Object.entries(where)) params[`where_${k}`] = v;

  const stmt = db.prepare(sql);
  const info = stmt.run(params);
  return { changes: info.changes };
};

const remove: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const table = String(args[1] ?? "");
  const where = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const db = getDb(name);

  const whereClauses = Object.keys(where).map((c) => `"${c}" = @${c}`);
  if (whereClauses.length === 0) throw new Error("WHERE clause is required for safety. Use database.execute for raw DELETE.");

  const sql = `DELETE FROM "${table}" WHERE ${whereClauses.join(" AND ")}`;
  const stmt = db.prepare(sql);
  const info = stmt.run(where);
  return { changes: info.changes };
};

const createTable: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const table = String(args[1] ?? "");
  const columns = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, string>;
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  const db = getDb(name);

  const colDefs = Object.entries(columns).map(([col, type]) => `"${col}" ${type}`);
  const ifNotExists = opts.ifNotExists !== false ? " IF NOT EXISTS" : "";
  const sql = `CREATE TABLE${ifNotExists} "${table}" (${colDefs.join(", ")})`;

  db.exec(sql);
  return { table, columns: Object.keys(columns) };
};

const dropTable: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const table = String(args[1] ?? "");
  const db = getDb(name);

  db.exec(`DROP TABLE IF EXISTS "${table}"`);
  return true;
};

const listTables: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const db = getDb(name);
  const rows = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all() as { name: string }[];
  return rows.map((r) => r.name);
};

const tableInfo: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const table = String(args[1] ?? "");
  const db = getDb(name);
  return db.prepare(`PRAGMA table_info("${table}")`).all();
};

const count: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const table = String(args[1] ?? "");
  const where = (typeof args[2] === "object" && args[2] !== null ? args[2] : null) as Record<string, unknown> | null;
  const db = getDb(name);

  if (where) {
    const whereClauses = Object.keys(where).map((c) => `"${c}" = @${c}`);
    const sql = `SELECT COUNT(*) as count FROM "${table}" WHERE ${whereClauses.join(" AND ")}`;
    const row = db.prepare(sql).get(where) as { count: number };
    return row.count;
  }

  const row = db.prepare(`SELECT COUNT(*) as count FROM "${table}"`).get() as { count: number };
  return row.count;
};

const transaction: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const statements = Array.isArray(args[1]) ? args[1] : [];
  const db = getDb(name);

  const results: unknown[] = [];

  const runAll = db.transaction(() => {
    for (const stmt of statements) {
      const s = stmt as { sql: string; params?: unknown[] | Record<string, unknown> };
      const prepared = db.prepare(s.sql);
      const params = s.params ?? [];

      if (s.sql.trim().toUpperCase().startsWith("SELECT")) {
        results.push(prepared.all(params));
      } else {
        const info = prepared.run(params);
        results.push({ changes: info.changes, lastInsertRowid: Number(info.lastInsertRowid) });
      }
    }
  });

  runAll();
  return results;
};

const backup: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "default");
  const destPath = String(args[1] ?? "");
  const db = getDb(name);

  if (!destPath) throw new Error("Destination path is required");
  await db.backup(destPath);
  return { backed_up: destPath };
};

// ── Exports ─────────────────────────────────────────────────────────

export const DatabaseFunctions: Record<string, BuiltinHandler> = {
  open, close, query, queryOne, execute, insert, insertMany, update, remove,
  createTable, dropTable, listTables, tableInfo, count, transaction, backup,
};

export const DatabaseFunctionMetadata: Record<string, FunctionMetadata> = {
  open: {
    description: "Open a SQLite database (file or in-memory)",
    parameters: [
      { name: "name", dataType: "string", description: "Connection name (default: 'default')", formInputType: "text", required: false },
      { name: "path", dataType: "string", description: "File path or ':memory:' (default)", formInputType: "text", required: false },
      { name: "options", dataType: "object", description: "{readonly, fileMustExist}", formInputType: "text", required: false },
    ],
    returnType: "object", returnDescription: "{name, path, readonly}", example: 'database.open "mydb" "./data.db"',
  },
  close: {
    description: "Close a database connection",
    parameters: [{ name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true }],
    returnType: "boolean", returnDescription: "True if closed", example: 'database.close "mydb"',
  },
  query: {
    description: "Run a SELECT query and return all matching rows",
    parameters: [
      { name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true },
      { name: "sql", dataType: "string", description: "SQL SELECT statement", formInputType: "text", required: true },
      { name: "params", dataType: "any", description: "Bind parameters (positional or named object)", formInputType: "text", required: false },
    ],
    returnType: "array", returnDescription: "Array of row objects", example: 'database.query "mydb" "SELECT * FROM users WHERE age > ?" 18',
  },
  queryOne: {
    description: "Run a SELECT query and return only the first row",
    parameters: [
      { name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true },
      { name: "sql", dataType: "string", description: "SQL SELECT statement", formInputType: "text", required: true },
      { name: "params", dataType: "any", description: "Bind parameters", formInputType: "text", required: false },
    ],
    returnType: "object", returnDescription: "First matching row or null", example: 'database.queryOne "mydb" "SELECT * FROM users WHERE id = ?" 1',
  },
  execute: {
    description: "Execute an INSERT, UPDATE, DELETE, or DDL statement",
    parameters: [
      { name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true },
      { name: "sql", dataType: "string", description: "SQL statement", formInputType: "text", required: true },
      { name: "params", dataType: "any", description: "Bind parameters", formInputType: "text", required: false },
    ],
    returnType: "object", returnDescription: "{changes, lastInsertRowid}", example: 'database.execute "mydb" "UPDATE users SET name = ? WHERE id = ?" "Alice" 1',
  },
  insert: {
    description: "Insert a row using an object of column-value pairs",
    parameters: [
      { name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true },
      { name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true },
      { name: "data", dataType: "object", description: "Object with column names as keys", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{id, changes}", example: 'database.insert "mydb" "users" {"name": "Alice", "age": 30}',
  },
  insertMany: {
    description: "Insert multiple rows in a single transaction",
    parameters: [
      { name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true },
      { name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true },
      { name: "rows", dataType: "array", description: "Array of row objects", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{inserted: number}", example: 'database.insertMany "mydb" "users" $rows',
  },
  update: {
    description: "Update rows matching a WHERE clause",
    parameters: [
      { name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true },
      { name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true },
      { name: "data", dataType: "object", description: "Columns to update", formInputType: "text", required: true },
      { name: "where", dataType: "object", description: "WHERE conditions (AND)", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{changes}", example: 'database.update "mydb" "users" {"name": "Bob"} {"id": 1}',
  },
  remove: {
    description: "Delete rows matching a WHERE clause",
    parameters: [
      { name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true },
      { name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true },
      { name: "where", dataType: "object", description: "WHERE conditions (required for safety)", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{changes}", example: 'database.remove "mydb" "users" {"id": 1}',
  },
  createTable: {
    description: "Create a new table with column definitions",
    parameters: [
      { name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true },
      { name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true },
      { name: "columns", dataType: "object", description: "Column definitions {name: 'type'}", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{ifNotExists: boolean}", formInputType: "text", required: false },
    ],
    returnType: "object", returnDescription: "{table, columns}", example: 'database.createTable "mydb" "users" {"id": "INTEGER PRIMARY KEY", "name": "TEXT NOT NULL", "age": "INTEGER"}',
  },
  dropTable: {
    description: "Drop a table if it exists",
    parameters: [
      { name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true },
      { name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true },
    ],
    returnType: "boolean", returnDescription: "True", example: 'database.dropTable "mydb" "users"',
  },
  listTables: {
    description: "List all tables in the database",
    parameters: [{ name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true }],
    returnType: "array", returnDescription: "Array of table name strings", example: 'database.listTables "mydb"',
  },
  tableInfo: {
    description: "Get column information for a table",
    parameters: [
      { name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true },
      { name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true },
    ],
    returnType: "array", returnDescription: "Array of column info objects", example: 'database.tableInfo "mydb" "users"',
  },
  count: {
    description: "Count rows in a table with optional WHERE conditions",
    parameters: [
      { name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true },
      { name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true },
      { name: "where", dataType: "object", description: "Optional WHERE conditions", formInputType: "text", required: false },
    ],
    returnType: "number", returnDescription: "Row count", example: 'database.count "mydb" "users" {"active": 1}',
  },
  transaction: {
    description: "Run multiple SQL statements in a single atomic transaction",
    parameters: [
      { name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true },
      { name: "statements", dataType: "array", description: "Array of {sql, params} objects", formInputType: "text", required: true },
    ],
    returnType: "array", returnDescription: "Array of results for each statement", example: 'database.transaction "mydb" [{"sql": "INSERT INTO users (name) VALUES (?)", "params": ["Alice"]}, {"sql": "SELECT * FROM users"}]',
  },
  backup: {
    description: "Backup the database to a file",
    parameters: [
      { name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true },
      { name: "destPath", dataType: "string", description: "Destination file path", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{backed_up: path}", example: 'database.backup "mydb" "./backup.db"',
  },
};

export const DatabaseModuleMetadata: ModuleMetadata = {
  description: "SQLite database with query builder, transactions, bulk insert, table management, and backup",
  methods: ["open", "close", "query", "queryOne", "execute", "insert", "insertMany", "update", "remove", "createTable", "dropTable", "listTables", "tableInfo", "count", "transaction", "backup"],
};
