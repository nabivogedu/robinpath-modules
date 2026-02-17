// @ts-nocheck
import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import mysql from "mysql2/promise";

const pools = new Map<string, mysql.Pool>();

function getPool(name: string): any {
  const pool = pools.get(name);
  if (!pool) throw new Error(`MySQL connection "${name}" not found. Call mysql.connect first.`);
  return pool;
}

const connect: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const name = String(opts.name ?? "default");
  const pool = mysql.createPool({
    host: String(opts.host ?? "localhost"),
    port: Number(opts.port ?? 3306),
    user: String(opts.user ?? "root"),
    password: opts.password ? String(opts.password) : undefined,
    database: opts.database ? String(opts.database) : undefined,
    waitForConnections: true,
    connectionLimit: Number(opts.connectionLimit ?? 10),
    charset: opts.charset ? String(opts.charset) : undefined,
  });
  pools.set(name, pool);
  return { name, connected: true };
};

const query: BuiltinHandler = async (args) => {
  const sql = String(args[0] ?? "");
  const params = Array.isArray(args[1]) ? args[1] : [];
  const name = String(args[2] ?? "default");
  const [rows] = await getPool(name).execute(sql, params);
  return rows;
};

const insert: BuiltinHandler = async (args) => {
  const table = String(args[0] ?? "");
  const data = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const name = String(args[2] ?? "default");
  const keys = Object.keys(data);
  const placeholders = keys.map(() => "?").join(", ");
  const sql = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders})`;
  const [result] = await getPool(name).execute(sql, Object.values(data));
  return { insertId: (result as mysql.ResultSetHeader).insertId, affectedRows: (result as mysql.ResultSetHeader).affectedRows };
};

const insertMany: BuiltinHandler = async (args) => {
  const table = String(args[0] ?? "");
  const rows = (Array.isArray(args[1]) ? args[1] : []) as Record<string, unknown>[];
  const name = String(args[2] ?? "default");
  if (rows.length === 0) return { affectedRows: 0 };
  const keys = Object.keys(rows[0]!);
  const placeholders = rows.map(() => `(${keys.map(() => "?").join(", ")})`).join(", ");
  const values = rows.flatMap((r: any) => keys.map((k: any) => r[k]));
  const sql = `INSERT INTO ${table} (${keys.join(", ")}) VALUES ${placeholders}`;
  const [result] = await getPool(name).execute(sql, values);
  return { affectedRows: (result as mysql.ResultSetHeader).affectedRows };
};

const update: BuiltinHandler = async (args) => {
  const table = String(args[0] ?? "");
  const data = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const where = String(args[2] ?? "1=0");
  const params = Array.isArray(args[3]) ? args[3] : [];
  const name = String(args[4] ?? "default");
  const sets = Object.keys(data).map((k: any) => `${k} = ?`).join(", ");
  const sql = `UPDATE ${table} SET ${sets} WHERE ${where}`;
  const [result] = await getPool(name).execute(sql, [...Object.values(data), ...params]);
  return { affectedRows: (result as mysql.ResultSetHeader).affectedRows };
};

const remove: BuiltinHandler = async (args) => {
  const table = String(args[0] ?? "");
  const where = String(args[1] ?? "1=0");
  const params = Array.isArray(args[2]) ? args[2] : [];
  const name = String(args[3] ?? "default");
  const sql = `DELETE FROM ${table} WHERE ${where}`;
  const [result] = await getPool(name).execute(sql, params);
  return { affectedRows: (result as mysql.ResultSetHeader).affectedRows };
};

const transaction: BuiltinHandler = async (args) => {
  const queries = (Array.isArray(args[0]) ? args[0] : []) as { sql: string; params?: unknown[] }[];
  const name = String(args[1] ?? "default");
  const conn = await getPool(name).getConnection();
  try {
    await conn.beginTransaction();
    const results: unknown[] = [];
    for (const q of queries) {
      const [rows] = await conn.execute(q.sql, q.params ?? []);
      results.push(rows);
    }
    await conn.commit();
    return { success: true, results };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

const tables: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "default");
  const [rows] = await getPool(name).execute("SHOW TABLES");
  return (rows as Record<string, string>[]).map((r: any) => Object.values(r)[0]);
};

const describe: BuiltinHandler = async (args) => {
  const table = String(args[0] ?? "");
  const name = String(args[1] ?? "default");
  const [rows] = await getPool(name).execute(`DESCRIBE ${table}`);
  return rows;
};

const count: BuiltinHandler = async (args) => {
  const table = String(args[0] ?? "");
  const where = args[1] ? `WHERE ${String(args[1])}` : "";
  const params = Array.isArray(args[2]) ? args[2] : [];
  const name = String(args[3] ?? "default");
  const [rows] = await getPool(name).execute(`SELECT COUNT(*) as count FROM ${table} ${where}`, params);
  return (rows as Record<string, unknown>[])[0]?.count ?? 0;
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

export const MysqlFunctions: Record<string, BuiltinHandler> = { connect, query, insert, insertMany, update, remove, transaction, tables, describe, count, close, closeAll };

export const MysqlFunctionMetadata = {
  connect: { description: "Connect to MySQL database", parameters: [{ name: "options", dataType: "object", description: "{host, port, user, password, database, name, connectionLimit}", formInputType: "text", required: true }], returnType: "object", returnDescription: "{name, connected}", example: 'mysql.connect {"host": "localhost", "user": "root", "database": "mydb"}' },
  query: { description: "Execute SQL query", parameters: [{ name: "sql", dataType: "string", description: "SQL query", formInputType: "text", required: true }, { name: "params", dataType: "array", description: "Query parameters", formInputType: "text", required: false }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Query results", example: 'mysql.query "SELECT * FROM users WHERE id = ?" [1]' },
  insert: { description: "Insert a row", parameters: [{ name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true }, { name: "data", dataType: "object", description: "Column values", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{insertId, affectedRows}", example: 'mysql.insert "users" {"name": "Alice", "email": "alice@example.com"}' },
  insertMany: { description: "Insert multiple rows", parameters: [{ name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true }, { name: "rows", dataType: "array", description: "Array of row objects", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{affectedRows}", example: 'mysql.insertMany "users" [{"name": "Alice"}, {"name": "Bob"}]' },
  update: { description: "Update rows", parameters: [{ name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true }, { name: "data", dataType: "object", description: "Columns to update", formInputType: "text", required: true }, { name: "where", dataType: "string", description: "WHERE clause", formInputType: "text", required: true }, { name: "params", dataType: "array", description: "WHERE params", formInputType: "text", required: false }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{affectedRows}", example: 'mysql.update "users" {"name": "Bob"} "id = ?" [1]' },
  remove: { description: "Delete rows", parameters: [{ name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true }, { name: "where", dataType: "string", description: "WHERE clause", formInputType: "text", required: true }, { name: "params", dataType: "array", description: "WHERE params", formInputType: "text", required: false }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{affectedRows}", example: 'mysql.remove "users" "id = ?" [1]' },
  transaction: { description: "Execute queries in transaction", parameters: [{ name: "queries", dataType: "array", description: "Array of {sql, params}", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{success, results}", example: 'mysql.transaction [{"sql": "INSERT INTO users (name) VALUES (?)", "params": ["Alice"]}]' },
  tables: { description: "List all tables", parameters: [{ name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Table names", example: 'mysql.tables' },
  describe: { description: "Describe table structure", parameters: [{ name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Column definitions", example: 'mysql.describe "users"' },
  count: { description: "Count rows", parameters: [{ name: "table", dataType: "string", description: "Table name", formInputType: "text", required: true }, { name: "where", dataType: "string", description: "WHERE clause", formInputType: "text", required: false }, { name: "params", dataType: "array", description: "WHERE params", formInputType: "text", required: false }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "number", returnDescription: "Row count", example: 'mysql.count "users" "active = ?" [true]' },
  close: { description: "Close connection pool", parameters: [{ name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'mysql.close' },
  closeAll: { description: "Close all connection pools", parameters: [], returnType: "boolean", returnDescription: "true", example: 'mysql.closeAll' },
};

export const MysqlModuleMetadata = {
  description: "MySQL/MariaDB client with connection pooling, parameterized queries, transactions, and CRUD operations",
  methods: ["connect", "query", "insert", "insertMany", "update", "remove", "transaction", "tables", "describe", "count", "close", "closeAll"],
};
