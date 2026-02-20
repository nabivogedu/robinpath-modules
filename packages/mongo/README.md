# @robinpath/mongo

> MongoDB client with find, insert, update, delete, aggregation pipeline, indexing, and connection management

![Category](https://img.shields.io/badge/category-Database-blue) ![Functions](https://img.shields.io/badge/functions-17-green) ![Auth](https://img.shields.io/badge/auth-connection-string-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `mongo` module lets you:

- Find documents
- Find one document
- Insert one document
- Insert multiple documents
- Update one document

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/mongo
```

## Quick Start

**1. Set up credentials**

```robinpath
mongo.connect {"uri": "mongodb://localhost:27017", "database": "mydb"}
```

**2. Find documents**

```robinpath
mongo.find "users" {"age": {"$gt": 18}} {"limit": 10}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `mongo.connect` | Connect to MongoDB |
| `mongo.find` | Find documents |
| `mongo.findOne` | Find one document |
| `mongo.insertOne` | Insert one document |
| `mongo.insertMany` | Insert multiple documents |
| `mongo.updateOne` | Update one document |
| `mongo.updateMany` | Update many documents |
| `mongo.deleteOne` | Delete one document |
| `mongo.deleteMany` | Delete many documents |
| `mongo.aggregate` | Run aggregation pipeline |
| `mongo.count` | Count documents |
| `mongo.distinct` | Get distinct values |
| `mongo.collections` | List collections |
| `mongo.createIndex` | Create index |
| `mongo.objectId` | Generate or parse ObjectId |
| `mongo.close` | Close connection |
| `mongo.closeAll` | Close all connections |

## Examples

### Find documents

```robinpath
mongo.find "users" {"age": {"$gt": 18}} {"limit": 10}
```

### Find one document

```robinpath
mongo.findOne "users" {"email": "alice@example.com"}
```

### Insert one document

```robinpath
mongo.insertOne "users" {"name": "Alice", "age": 30}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/mongo";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  mongo.connect {"uri": "mongodb://localhost:27017", "database": "mydb"}
  mongo.find "users" {"age": {"$gt": 18}} {"limit": 10}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/mysql`](../mysql) — MySQL module for complementary functionality
- [`@robinpath/postgres`](../postgres) — PostgreSQL module for complementary functionality
- [`@robinpath/redis`](../redis) — Redis module for complementary functionality
- [`@robinpath/supabase`](../supabase) — Supabase module for complementary functionality
- [`@robinpath/firebase`](../firebase) — Firebase module for complementary functionality

## License

MIT
