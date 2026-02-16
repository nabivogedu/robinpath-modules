import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import pg from "pg";

const pools = new Map<string, pg.Pool>();

function getPool(name: string): pg.Pool {
  const pool = pools.get(name);
  if (!pool) throw new Error(`PostgreSQL connection "${name}" not found. Call postgres.connect first.`);
  return pool;
}

const connect: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const name = String(opts.name ?? "default");
  const pool = new pg.Pool({
    host: String(opts.host ?? "localhost"),
    port: Number(opts.port ?? 5432),
    user: String(opts.user ?? "postgres"),
    password: opts.password ? String(opts.password) : undefined,
    database: opts.database ? String(opts.database) : undefined,
    max: Number(opts.max ?? 10),
    ssl: opts.ssl === true ? { rejectUnauthorized: false } : undefined,
  });
  pools.set(name, pool);
  return { name, connected: true };
};

const query: BuiltinHandler = async (args) => {
  const sql = String(args[0] ?? "");
  const params = Array.isArray(args[1]) ? args[1] : [];
  const name = String(args[2] ?? "default");
  const result = await getPool(name).query(sql, params);
  return result.rows;
};

const queryOne: BuiltinHandler = async (args) => {
  const sql = String(args[0] ?? "");
  const params = Array.isArray(args[1]) ? args[1] : [];
  const name = String(args[2] ?? "default");
  const result = await getPool(name).query(sql, params);
  return result.rows[0] ?? null;
};

const insert: BuiltinHandler = async (args) => {
  const table = String(args[0] ?? "");
  const data = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const name = String(args[2] ?? "default");
  const keys = Object.keys(data);
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
  const sql = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders}) RETURNING *`;
  const result = await getPool(name).query(sql, Object.values(data));
  return result.rows[0];
};

const insertMany: BuiltinHandler = async (args) => {
  const table = String(args[0] ?? "");
  const rows = (Array.isArray(args[1]) ? args[1] : []) as Record<string, unknown>[];
  const name = String(args[2] ?? "default");
  if (rows.length === 0) return [];
  const keys = Object.keys(rows[0]!);
  const values: unknown[] = [];
  const placeholderRows = rows.map((row, ri) => {
    const ph = keys.map((k, ki) => { values.push(row[k]); return `$${ri * keys.length + ki + 1}`; });
    return `(${ph.join(", ")})`;
  });
  const sql = `INSERT INTO ${table} (${keys.join(", ")}) VALUES ${placeholderRows.join(", ")} RETURNING *`;
  const result = await getPool(name).query(sql, values);
  return result.rows;
};

const update: BuiltinHandler = async (args) => {
  const table = String(args[0] ?? "");
  const data = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const where = String(args[2] ?? "1=0");
  const whereParams = Array.isArray(args[3]) ? args[3] : [];
  const name = String(args[4] ?? "default");
  const keys = Object.keys(data);
  const vals = Object.values(data);
  const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
  const adjustedWhere = where.replace(/\$(\d+)/g, (_, n) => `$${Number(n) + keys.length}`);
  const sql = `UPDATE ${table} SET ${sets} WHERE ${adjustedWhere} RETURNING *`;
  const result = await getPool(name).query(sql, [...vals, ...whereParams]);
  return { affectedRows: result.rowCount, rows: result.rows };
};

const remove: BuiltinHandler = async (args) => {
  const table = String(args[0] ?? "");
  const where = String(args[1] ?? "1=0");
  const params = Array.isArray(args[2]) ? args[2] : [];
  const name = String(args[3] ?? "default");
  const sql = `DELETE FROM ${table} WHERE ${where} RETURNING *`;
  const result = await getPool(name).query(sql, params);
  return { affectedRows: result.rowCount, rows: result.rows };
};

const transaction: BuiltinHandler = async (args) => {
  const queries = (Array.isArray(args[0]) ? args[0] : []) as { sql: string; params?: unknown[] }[];
  const name = String(args[1] ?? "default");
  const client = await getPool(name).connect();
  try {
    await client.query("BEGIN");
    const results: unknown[] = [];
    for (const q of queries) {
      const res = await client.query(q.sql, q.params ?? []);
      results.push(res.rows);
    }
    await client.query("COMMIT");
    return { success: true, results };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const tables: BuiltinHandler = async (args) => {
  const schema = String(args[0] ?? "public");
  const name = String(args[1] ?? "default");
  const result = await getPool(name).query("SELECT table_name FROM information_schema.tables WHERE table_schema = $1 ORDER BY table_name", [schema]);
  return result.rows.map((r: Record<string, string>) => r.table_name);
};

const describe: BuiltinHandler = async (args) => {
  const table = String(args[0] ?? "");
  const name = String(args[1] ?? "default");
  const result = await getPool(name).query("SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = $1 ORDER BY ordinal_position", [table]);
  return result.rows;
};

const count: BuiltinHandler = async (args) => {
  const table = String(args[0] ?? "");
  const where = args[1] ? `WHERE ${String(args[1])}` : "";
  const params = Array.isArray(args[2]) ? args[2] : [];
  const name = String(args[3] ?? "default");
  const result = await getPool(name).query(`SELECT COUNT(*)::int as count FROM ${table} ${where}`, params);
  return result.rows[0]?.count ?? 0;
};

const listen: BuiltinHandler = async (args) => {
  const channel = String(args[0] ?? "");
  const name = String(args[1] ?? "default");
  const client = await getPool(name).connect();
  await client.query(`LISTEN ${channel}`);
  return { channel, listening: true };
};

const close: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "default");
  const pool = pools.get(name);
  if (pool) { await pool.end(); pools.delete(name); }
  return true;
};

const closeAll: BuiltinHandler = async () => {
  for (const [name, pool] of pools) { await pool.end(); pools.delete(name); }
  return true;
};

export const PostgresFunctions: Record<string, BuiltinHandler> = { connect, query, queryOne, insert, insertMany, update, remove, transaction, tables, describe, count, listen, close, closeAll };

export const PostgresFunctionMetadata: Record<string, FunctionMetadata> = {
  connect: { description: "Connect to PostgreSQL", parameters: [{ name: "options", dataType: "object", description: "{host, port, user, password, database, name, max, ssl}", formInputType: "text", required: true }], returnType: "object", returnDescription: "{name, connected}", example: 'postgres.connect {"host": "localhost", "user": "postgres", "database": "mydb"}' },
  query: { description: "Execute SQL query", parameters: [{ name: "sql", dataType: "string", description: "SQL with $1 params", formInputType: "text", required: true }, { name: "params", dataType: "array", description: "Parameters", formInputType: "text", required: false }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Result rows", example: 'postgres.query "SELECT * FROM users WHERE id = $1" [1]' },
  queryOne: { description: "Execute query returning single row", parameters: [{ name: "sql", dataType: "string", description: "SQL", formInputType: "text", required: true }, { name: "params", dataType: "array", description: "Parameters", formInputType: "text", required: false }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "Single row or null", example: 'postgres.queryOne "SELECT * FROM users WHERE id = $1" [1]' },
  insert: { description: "Insert row with RETURNING", parameters: [{ name: "table", dataType: "string", description: "Table", formInputType: "text", required: true }, { name: "data", dataType: "object", description: "Column values", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "Inserted row", example: 'postgres.insert "users" {"name": "Alice"}' },
  insertMany: { description: "Insert multiple rows", parameters: [{ name: "table", dataType: "string", description: "Table", formInputType: "text", required: true }, { name: "rows", dataType: "array", description: "Row objects", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Inserted rows", example: 'postgres.insertMany "users" [{"name": "Alice"}, {"name": "Bob"}]' },
  update: { description: "Update rows with RETURNING", parameters: [{ name: "table", dataType: "string", description: "Table", formInputType: "text", required: true }, { name: "data", dataType: "object", description: "Columns to update", formInputType: "text", required: true }, { name: "where", dataType: "string", description: "WHERE clause", formInputType: "text", required: true }, { name: "params", dataType: "array", description: "WHERE params", formInputType: "text", required: false }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{affectedRows, rows}", example: 'postgres.update "users" {"name": "Bob"} "id = $1" [1]' },
  remove: { description: "Delete rows with RETURNING", parameters: [{ name: "table", dataType: "string", description: "Table", formInputType: "text", required: true }, { name: "where", dataType: "string", description: "WHERE clause", formInputType: "text", required: true }, { name: "params", dataType: "array", description: "WHERE params", formInputType: "text", required: false }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{affectedRows, rows}", example: 'postgres.remove "users" "id = $1" [1]' },
  transaction: { description: "Execute in transaction", parameters: [{ name: "queries", dataType: "array", description: "Array of {sql, params}", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{success, results}", example: 'postgres.transaction [{"sql": "INSERT INTO users (name) VALUES ($1)", "params": ["Alice"]}]' },
  tables: { description: "List tables in schema", parameters: [{ name: "schema", dataType: "string", description: "Schema (default public)", formInputType: "text", required: false }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Table names", example: 'postgres.tables "public"' },
  describe: { description: "Describe table columns", parameters: [{ name: "table", dataType: "string", description: "Table", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Column definitions", example: 'postgres.describe "users"' },
  count: { description: "Count rows", parameters: [{ name: "table", dataType: "string", description: "Table", formInputType: "text", required: true }, { name: "where", dataType: "string", description: "WHERE clause", formInputType: "text", required: false }, { name: "params", dataType: "array", description: "WHERE params", formInputType: "text", required: false }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "number", returnDescription: "Count", example: 'postgres.count "users"' },
  listen: { description: "Listen for NOTIFY events", parameters: [{ name: "channel", dataType: "string", description: "Channel name", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{channel, listening}", example: 'postgres.listen "events"' },
  close: { description: "Close connection pool", parameters: [{ name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'postgres.close' },
  closeAll: { description: "Close all pools", parameters: [], returnType: "boolean", returnDescription: "true", example: 'postgres.closeAll' },
};

export const PostgresModuleMetadata: ModuleMetadata = {
  description: "PostgreSQL client with connection pooling, parameterized queries, transactions, RETURNING, and LISTEN/NOTIFY",
  methods: ["connect", "query", "queryOne", "insert", "insertMany", "update", "remove", "transaction", "tables", "describe", "count", "listen", "close", "closeAll"],
};
