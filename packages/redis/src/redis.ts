// @ts-nocheck
import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import Redis from "ioredis";

const connections = new Map<string, Redis>();

function getConn(name: string): any {
  const conn = connections.get(name);
  if (!conn) throw new Error(`Redis connection "${name}" not found. Call redis.connect first.`);
  return conn;
}

const connect: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const name = String(opts.name ?? "default");
  const redis = new Redis({ host: String(opts.host ?? "localhost"), port: Number(opts.port ?? 6379), password: opts.password ? String(opts.password) : undefined, db: Number(opts.db ?? 0), keyPrefix: opts.prefix ? String(opts.prefix) : undefined });
  connections.set(name, redis);
  return { name, connected: true };
};

const get: BuiltinHandler = async (args) => { const v = await getConn(String(args[1] ?? "default")).get(String(args[0] ?? "")); try { return v ? JSON.parse(v) : null; } catch { return v; } };
const set: BuiltinHandler = async (args) => { const val = typeof args[1] === "string" ? args[1] : JSON.stringify(args[1]); const ttl = args[2] ? Number(args[2]) : undefined; if (ttl) await getConn(String(args[3] ?? "default")).set(String(args[0] ?? ""), val, "EX", ttl); else await getConn(String(args[3] ?? "default")).set(String(args[0] ?? ""), val); return true; };
const del: BuiltinHandler = async (args) => { const keys = Array.isArray(args[0]) ? args[0].map(String) : [String(args[0] ?? "")]; return await getConn(String(args[1] ?? "default")).del(...keys); };
const exists: BuiltinHandler = async (args) => (await getConn(String(args[1] ?? "default")).exists(String(args[0] ?? ""))) === 1;
const keys: BuiltinHandler = async (args) => await getConn(String(args[1] ?? "default")).keys(String(args[0] ?? "*"));
const ttl: BuiltinHandler = async (args) => await getConn(String(args[1] ?? "default")).ttl(String(args[0] ?? ""));
const expire: BuiltinHandler = async (args) => (await getConn(String(args[2] ?? "default")).expire(String(args[0] ?? ""), Number(args[1] ?? 0))) === 1;
const incr: BuiltinHandler = async (args) => await getConn(String(args[1] ?? "default")).incrby(String(args[0] ?? ""), Number(args[1] ?? 1));
const decr: BuiltinHandler = async (args) => await getConn(String(args[1] ?? "default")).decrby(String(args[0] ?? ""), Number(args[1] ?? 1));

const hget: BuiltinHandler = async (args) => { const v = await getConn(String(args[2] ?? "default")).hget(String(args[0] ?? ""), String(args[1] ?? "")); try { return v ? JSON.parse(v) : null; } catch { return v; } };
const hset: BuiltinHandler = async (args) => { const data = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>; const flat: string[] = []; for (const [k, v] of Object.entries(data)) flat.push(k, typeof v === "string" ? v : JSON.stringify(v)); await getConn(String(args[2] ?? "default")).hset(String(args[0] ?? ""), ...flat); return true; };
const hgetall: BuiltinHandler = async (args) => await getConn(String(args[1] ?? "default")).hgetall(String(args[0] ?? ""));
const hdel: BuiltinHandler = async (args) => { const fields = Array.isArray(args[1]) ? args[1].map(String) : [String(args[1] ?? "")]; return await getConn(String(args[2] ?? "default")).hdel(String(args[0] ?? ""), ...fields); };

const lpush: BuiltinHandler = async (args) => { const vals = Array.isArray(args[1]) ? args[1].map(String) : [String(args[1] ?? "")]; return await getConn(String(args[2] ?? "default")).lpush(String(args[0] ?? ""), ...vals); };
const rpush: BuiltinHandler = async (args) => { const vals = Array.isArray(args[1]) ? args[1].map(String) : [String(args[1] ?? "")]; return await getConn(String(args[2] ?? "default")).rpush(String(args[0] ?? ""), ...vals); };
const lpop: BuiltinHandler = async (args) => await getConn(String(args[1] ?? "default")).lpop(String(args[0] ?? ""));
const rpop: BuiltinHandler = async (args) => await getConn(String(args[1] ?? "default")).rpop(String(args[0] ?? ""));
const lrange: BuiltinHandler = async (args) => await getConn(String(args[3] ?? "default")).lrange(String(args[0] ?? ""), Number(args[1] ?? 0), Number(args[2] ?? -1));
const llen: BuiltinHandler = async (args) => await getConn(String(args[1] ?? "default")).llen(String(args[0] ?? ""));

const sadd: BuiltinHandler = async (args) => { const members = Array.isArray(args[1]) ? args[1].map(String) : [String(args[1] ?? "")]; return await getConn(String(args[2] ?? "default")).sadd(String(args[0] ?? ""), ...members); };
const smembers: BuiltinHandler = async (args) => await getConn(String(args[1] ?? "default")).smembers(String(args[0] ?? ""));
const sismember: BuiltinHandler = async (args) => (await getConn(String(args[2] ?? "default")).sismember(String(args[0] ?? ""), String(args[1] ?? ""))) === 1;
const srem: BuiltinHandler = async (args) => { const members = Array.isArray(args[1]) ? args[1].map(String) : [String(args[1] ?? "")]; return await getConn(String(args[2] ?? "default")).srem(String(args[0] ?? ""), ...members); };

const publish: BuiltinHandler = async (args) => await getConn(String(args[2] ?? "default")).publish(String(args[0] ?? ""), String(args[1] ?? ""));
const flushdb: BuiltinHandler = async (args) => { await getConn(String(args[0] ?? "default")).flushdb(); return true; };

const close: BuiltinHandler = async (args) => { const name = String(args[0] ?? "default"); const c = connections.get(name); if (c) { c.disconnect(); connections.delete(name); } return true; };
const closeAll: BuiltinHandler = async () => { for (const [n, c] of connections) { c.disconnect(); connections.delete(n); } return true; };

export const RedisFunctions: Record<string, BuiltinHandler> = { connect, get, set, del, exists, keys, ttl, expire, incr, decr, hget, hset, hgetall, hdel, lpush, rpush, lpop, rpop, lrange, llen, sadd, smembers, sismember, srem, publish, flushdb, close, closeAll };

export const RedisFunctionMetadata = {
  connect: { description: "Connect to Redis", parameters: [{ name: "options", dataType: "object", description: "{host, port, password, db, prefix, name}", formInputType: "text", required: true }], returnType: "object", returnDescription: "{name, connected}", example: 'redis.connect {"host": "localhost"}' },
  get: { description: "Get value by key", parameters: [{ name: "key", dataType: "string", description: "Key", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "any", returnDescription: "Value or null", example: 'redis.get "user:1"' },
  set: { description: "Set key-value", parameters: [{ name: "key", dataType: "string", description: "Key", formInputType: "text", required: true }, { name: "value", dataType: "any", description: "Value", formInputType: "text", required: true }, { name: "ttl", dataType: "number", description: "TTL in seconds", formInputType: "text", required: false }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'redis.set "user:1" {"name": "Alice"} 3600' },
  del: { description: "Delete key(s)", parameters: [{ name: "keys", dataType: "string", description: "Key or array of keys", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "number", returnDescription: "Keys deleted", example: 'redis.del "user:1"' },
  exists: { description: "Check key exists", parameters: [{ name: "key", dataType: "string", description: "Key", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if exists", example: 'redis.exists "user:1"' },
  keys: { description: "Find keys by pattern", parameters: [{ name: "pattern", dataType: "string", description: "Glob pattern", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Matching keys", example: 'redis.keys "user:*"' },
  ttl: { description: "Get key TTL", parameters: [{ name: "key", dataType: "string", description: "Key", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "number", returnDescription: "TTL in seconds", example: 'redis.ttl "session:abc"' },
  expire: { description: "Set key expiration", parameters: [{ name: "key", dataType: "string", description: "Key", formInputType: "text", required: true }, { name: "seconds", dataType: "number", description: "TTL", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if set", example: 'redis.expire "session:abc" 3600' },
  incr: { description: "Increment value", parameters: [{ name: "key", dataType: "string", description: "Key", formInputType: "text", required: true }, { name: "amount", dataType: "number", description: "Amount (default 1)", formInputType: "text", required: false }], returnType: "number", returnDescription: "New value", example: 'redis.incr "counter"' },
  decr: { description: "Decrement value", parameters: [{ name: "key", dataType: "string", description: "Key", formInputType: "text", required: true }, { name: "amount", dataType: "number", description: "Amount (default 1)", formInputType: "text", required: false }], returnType: "number", returnDescription: "New value", example: 'redis.decr "counter"' },
  hget: { description: "Get hash field", parameters: [{ name: "key", dataType: "string", description: "Hash key", formInputType: "text", required: true }, { name: "field", dataType: "string", description: "Field", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "any", returnDescription: "Value", example: 'redis.hget "user:1" "name"' },
  hset: { description: "Set hash fields", parameters: [{ name: "key", dataType: "string", description: "Hash key", formInputType: "text", required: true }, { name: "fields", dataType: "object", description: "Field-value pairs", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'redis.hset "user:1" {"name": "Alice", "age": 30}' },
  hgetall: { description: "Get all hash fields", parameters: [{ name: "key", dataType: "string", description: "Hash key", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "All fields", example: 'redis.hgetall "user:1"' },
  hdel: { description: "Delete hash fields", parameters: [{ name: "key", dataType: "string", description: "Hash key", formInputType: "text", required: true }, { name: "fields", dataType: "string", description: "Field(s)", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "number", returnDescription: "Fields removed", example: 'redis.hdel "user:1" "age"' },
  lpush: { description: "Push to list head", parameters: [{ name: "key", dataType: "string", description: "List key", formInputType: "text", required: true }, { name: "values", dataType: "any", description: "Value(s)", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "number", returnDescription: "List length", example: 'redis.lpush "queue" "task1"' },
  rpush: { description: "Push to list tail", parameters: [{ name: "key", dataType: "string", description: "List key", formInputType: "text", required: true }, { name: "values", dataType: "any", description: "Value(s)", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "number", returnDescription: "List length", example: 'redis.rpush "queue" "task1"' },
  lpop: { description: "Pop from list head", parameters: [{ name: "key", dataType: "string", description: "List key", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "string", returnDescription: "Value or null", example: 'redis.lpop "queue"' },
  rpop: { description: "Pop from list tail", parameters: [{ name: "key", dataType: "string", description: "List key", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "string", returnDescription: "Value or null", example: 'redis.rpop "queue"' },
  lrange: { description: "Get list range", parameters: [{ name: "key", dataType: "string", description: "List key", formInputType: "text", required: true }, { name: "start", dataType: "number", description: "Start index", formInputType: "text", required: false }, { name: "stop", dataType: "number", description: "Stop index", formInputType: "text", required: false }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Values", example: 'redis.lrange "queue" 0 -1' },
  llen: { description: "Get list length", parameters: [{ name: "key", dataType: "string", description: "List key", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "number", returnDescription: "Length", example: 'redis.llen "queue"' },
  sadd: { description: "Add to set", parameters: [{ name: "key", dataType: "string", description: "Set key", formInputType: "text", required: true }, { name: "members", dataType: "any", description: "Member(s)", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "number", returnDescription: "Members added", example: 'redis.sadd "tags" ["js", "ts"]' },
  smembers: { description: "Get set members", parameters: [{ name: "key", dataType: "string", description: "Set key", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Members", example: 'redis.smembers "tags"' },
  sismember: { description: "Check set membership", parameters: [{ name: "key", dataType: "string", description: "Set key", formInputType: "text", required: true }, { name: "member", dataType: "string", description: "Member", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if member", example: 'redis.sismember "tags" "js"' },
  srem: { description: "Remove from set", parameters: [{ name: "key", dataType: "string", description: "Set key", formInputType: "text", required: true }, { name: "members", dataType: "any", description: "Member(s)", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "number", returnDescription: "Members removed", example: 'redis.srem "tags" "old"' },
  publish: { description: "Publish message to channel", parameters: [{ name: "channel", dataType: "string", description: "Channel", formInputType: "text", required: true }, { name: "message", dataType: "string", description: "Message", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "number", returnDescription: "Subscribers received", example: 'redis.publish "events" "user.created"' },
  flushdb: { description: "Flush current database", parameters: [{ name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'redis.flushdb' },
  close: { description: "Close connection", parameters: [{ name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'redis.close' },
  closeAll: { description: "Close all connections", parameters: [], returnType: "boolean", returnDescription: "true", example: 'redis.closeAll' },
};

export const RedisModuleMetadata = {
  description: "Redis client with strings, hashes, lists, sets, pub/sub, TTL, and connection management",
  methods: ["connect", "get", "set", "del", "exists", "keys", "ttl", "expire", "incr", "decr", "hget", "hset", "hgetall", "hdel", "lpush", "rpush", "lpop", "rpop", "lrange", "llen", "sadd", "smembers", "sismember", "srem", "publish", "flushdb", "close", "closeAll"],
};
