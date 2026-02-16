import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { MongoClient, Db, ObjectId } from "mongodb";

const clients = new Map<string, { client: MongoClient; db: Db }>();

function getDb(name: string): Db {
  const entry = clients.get(name);
  if (!entry) throw new Error(`MongoDB connection "${name}" not found. Call mongo.connect first.`);
  return entry.db;
}

const connect: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const name = String(opts.name ?? "default");
  const uri = String(opts.uri ?? opts.url ?? "mongodb://localhost:27017");
  const database = String(opts.database ?? "test");
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(database);
  clients.set(name, { client, db });
  return { name, connected: true, database };
};

const find: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const filter = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const name = String(args[3] ?? "default");
  let cursor = getDb(name).collection(collection).find(filter);
  if (opts.sort) cursor = cursor.sort(opts.sort as Record<string, 1 | -1>);
  if (opts.limit) cursor = cursor.limit(Number(opts.limit));
  if (opts.skip) cursor = cursor.skip(Number(opts.skip));
  if (opts.projection) cursor = cursor.project(opts.projection as Record<string, 0 | 1>);
  return await cursor.toArray();
};

const findOne: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const filter = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const name = String(args[2] ?? "default");
  return await getDb(name).collection(collection).findOne(filter);
};

const insertOne: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const doc = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const name = String(args[2] ?? "default");
  const result = await getDb(name).collection(collection).insertOne(doc);
  return { insertedId: result.insertedId.toString(), acknowledged: result.acknowledged };
};

const insertManyDocs: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const docs = (Array.isArray(args[1]) ? args[1] : []) as Record<string, unknown>[];
  const name = String(args[2] ?? "default");
  const result = await getDb(name).collection(collection).insertMany(docs);
  return { insertedCount: result.insertedCount, insertedIds: Object.values(result.insertedIds).map(String) };
};

const updateOne: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const filter = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const update = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const name = String(args[3] ?? "default");
  const op = update.$set || update.$unset || update.$inc ? update : { $set: update };
  const result = await getDb(name).collection(collection).updateOne(filter, op);
  return { matchedCount: result.matchedCount, modifiedCount: result.modifiedCount };
};

const updateMany: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const filter = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const update = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const name = String(args[3] ?? "default");
  const op = update.$set || update.$unset || update.$inc ? update : { $set: update };
  const result = await getDb(name).collection(collection).updateMany(filter, op);
  return { matchedCount: result.matchedCount, modifiedCount: result.modifiedCount };
};

const deleteOne: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const filter = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const name = String(args[2] ?? "default");
  const result = await getDb(name).collection(collection).deleteOne(filter);
  return { deletedCount: result.deletedCount };
};

const deleteManyDocs: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const filter = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const name = String(args[2] ?? "default");
  const result = await getDb(name).collection(collection).deleteMany(filter);
  return { deletedCount: result.deletedCount };
};

const aggregate: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const pipeline = (Array.isArray(args[1]) ? args[1] : []) as Record<string, unknown>[];
  const name = String(args[2] ?? "default");
  return await getDb(name).collection(collection).aggregate(pipeline).toArray();
};

const countDocs: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const filter = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const name = String(args[2] ?? "default");
  return await getDb(name).collection(collection).countDocuments(filter);
};

const distinct: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const field = String(args[1] ?? "");
  const filter = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const name = String(args[3] ?? "default");
  return await getDb(name).collection(collection).distinct(field, filter);
};

const collections: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "default");
  const colls = await getDb(name).listCollections().toArray();
  return colls.map((c) => c.name);
};

const createIndex: BuiltinHandler = async (args) => {
  const collection = String(args[0] ?? "");
  const keys = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, 1 | -1>;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const name = String(args[3] ?? "default");
  return await getDb(name).collection(collection).createIndex(keys, opts);
};

const objectId: BuiltinHandler = (args) => args[0] ? new ObjectId(String(args[0])).toString() : new ObjectId().toString();

const close: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "default");
  const entry = clients.get(name);
  if (entry) { await entry.client.close(); clients.delete(name); }
  return true;
};

const closeAll: BuiltinHandler = async () => {
  for (const [name, entry] of clients) { await entry.client.close(); clients.delete(name); }
  return true;
};

export const MongoFunctions: Record<string, BuiltinHandler> = { connect, find, findOne, insertOne, insertMany: insertManyDocs, updateOne, updateMany, deleteOne, deleteMany: deleteManyDocs, aggregate, count: countDocs, distinct, collections, createIndex, objectId, close, closeAll };

export const MongoFunctionMetadata: Record<string, FunctionMetadata> = {
  connect: { description: "Connect to MongoDB", parameters: [{ name: "options", dataType: "object", description: "{uri, database, name}", formInputType: "text", required: true }], returnType: "object", returnDescription: "{name, connected, database}", example: 'mongo.connect {"uri": "mongodb://localhost:27017", "database": "mydb"}' },
  find: { description: "Find documents", parameters: [{ name: "collection", dataType: "string", description: "Collection", formInputType: "text", required: true }, { name: "filter", dataType: "object", description: "Query filter", formInputType: "text", required: false }, { name: "options", dataType: "object", description: "{sort, limit, skip, projection}", formInputType: "text", required: false }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Documents", example: 'mongo.find "users" {"age": {"$gt": 18}} {"limit": 10}' },
  findOne: { description: "Find one document", parameters: [{ name: "collection", dataType: "string", description: "Collection", formInputType: "text", required: true }, { name: "filter", dataType: "object", description: "Query filter", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "Document or null", example: 'mongo.findOne "users" {"email": "alice@example.com"}' },
  insertOne: { description: "Insert one document", parameters: [{ name: "collection", dataType: "string", description: "Collection", formInputType: "text", required: true }, { name: "document", dataType: "object", description: "Document", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{insertedId, acknowledged}", example: 'mongo.insertOne "users" {"name": "Alice", "age": 30}' },
  insertMany: { description: "Insert multiple documents", parameters: [{ name: "collection", dataType: "string", description: "Collection", formInputType: "text", required: true }, { name: "documents", dataType: "array", description: "Documents", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{insertedCount, insertedIds}", example: 'mongo.insertMany "users" [{"name": "Alice"}, {"name": "Bob"}]' },
  updateOne: { description: "Update one document", parameters: [{ name: "collection", dataType: "string", description: "Collection", formInputType: "text", required: true }, { name: "filter", dataType: "object", description: "Query filter", formInputType: "text", required: true }, { name: "update", dataType: "object", description: "Update ops or fields", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{matchedCount, modifiedCount}", example: 'mongo.updateOne "users" {"_id": "..."} {"name": "Bob"}' },
  updateMany: { description: "Update many documents", parameters: [{ name: "collection", dataType: "string", description: "Collection", formInputType: "text", required: true }, { name: "filter", dataType: "object", description: "Query filter", formInputType: "text", required: true }, { name: "update", dataType: "object", description: "Update ops", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{matchedCount, modifiedCount}", example: 'mongo.updateMany "users" {"active": false} {"$set": {"archived": true}}' },
  deleteOne: { description: "Delete one document", parameters: [{ name: "collection", dataType: "string", description: "Collection", formInputType: "text", required: true }, { name: "filter", dataType: "object", description: "Query filter", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{deletedCount}", example: 'mongo.deleteOne "users" {"_id": "..."}' },
  deleteMany: { description: "Delete many documents", parameters: [{ name: "collection", dataType: "string", description: "Collection", formInputType: "text", required: true }, { name: "filter", dataType: "object", description: "Query filter", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{deletedCount}", example: 'mongo.deleteMany "users" {"archived": true}' },
  aggregate: { description: "Run aggregation pipeline", parameters: [{ name: "collection", dataType: "string", description: "Collection", formInputType: "text", required: true }, { name: "pipeline", dataType: "array", description: "Pipeline stages", formInputType: "text", required: true }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Results", example: 'mongo.aggregate "orders" [{"$group": {"_id": "$status", "count": {"$sum": 1}}}]' },
  count: { description: "Count documents", parameters: [{ name: "collection", dataType: "string", description: "Collection", formInputType: "text", required: true }, { name: "filter", dataType: "object", description: "Query filter", formInputType: "text", required: false }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "number", returnDescription: "Count", example: 'mongo.count "users" {"active": true}' },
  distinct: { description: "Get distinct values", parameters: [{ name: "collection", dataType: "string", description: "Collection", formInputType: "text", required: true }, { name: "field", dataType: "string", description: "Field name", formInputType: "text", required: true }, { name: "filter", dataType: "object", description: "Query filter", formInputType: "text", required: false }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Distinct values", example: 'mongo.distinct "users" "country"' },
  collections: { description: "List collections", parameters: [{ name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Collection names", example: 'mongo.collections' },
  createIndex: { description: "Create index", parameters: [{ name: "collection", dataType: "string", description: "Collection", formInputType: "text", required: true }, { name: "keys", dataType: "object", description: "Index keys {field: 1|-1}", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{unique, sparse, ...}", formInputType: "text", required: false }, { name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "string", returnDescription: "Index name", example: 'mongo.createIndex "users" {"email": 1} {"unique": true}' },
  objectId: { description: "Generate or parse ObjectId", parameters: [{ name: "id", dataType: "string", description: "Existing ID string or omit for new", formInputType: "text", required: false }], returnType: "string", returnDescription: "ObjectId string", example: 'mongo.objectId' },
  close: { description: "Close connection", parameters: [{ name: "connection", dataType: "string", description: "Connection name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'mongo.close' },
  closeAll: { description: "Close all connections", parameters: [], returnType: "boolean", returnDescription: "true", example: 'mongo.closeAll' },
};

export const MongoModuleMetadata: ModuleMetadata = {
  description: "MongoDB client with find, insert, update, delete, aggregation pipeline, indexing, and connection management",
  methods: ["connect", "find", "findOne", "insertOne", "insertMany", "updateOne", "updateMany", "deleteOne", "deleteMany", "aggregate", "count", "distinct", "collections", "createIndex", "objectId", "close", "closeAll"],
};
