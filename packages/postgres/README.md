# @robinpath/postgres

> PostgreSQL client with connection pooling, parameterized queries, transactions, RETURNING, and LISTEN/NOTIFY

![Category](https://img.shields.io/badge/category-Database-blue) ![Functions](https://img.shields.io/badge/functions-14-green) ![Auth](https://img.shields.io/badge/auth-connection-string-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `postgres` module lets you:

- Execute SQL query
- Execute query returning single row
- Insert row with RETURNING
- Insert multiple rows
- Update rows with RETURNING

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/postgres
```

## Quick Start

**1. Set up credentials**

```robinpath
postgres.connect {"host": "localhost", "user": "postgres", "database": "mydb"}
```

**2. Execute SQL query**

```robinpath
postgres.query "SELECT * FROM users WHERE id = $1" [1]
```

## Available Functions

| Function | Description |
|----------|-------------|
| `postgres.connect` | Connect to PostgreSQL |
| `postgres.query` | Execute SQL query |
| `postgres.queryOne` | Execute query returning single row |
| `postgres.insert` | Insert row with RETURNING |
| `postgres.insertMany` | Insert multiple rows |
| `postgres.update` | Update rows with RETURNING |
| `postgres.remove` | Delete rows with RETURNING |
| `postgres.transaction` | Execute in transaction |
| `postgres.tables` | List tables in schema |
| `postgres.describe` | Describe table columns |
| `postgres.count` | Count rows |
| `postgres.listen` | Listen for NOTIFY events |
| `postgres.close` | Close connection pool |
| `postgres.closeAll` | Close all pools |

## Examples

### Execute SQL query

```robinpath
postgres.query "SELECT * FROM users WHERE id = $1" [1]
```

### Execute query returning single row

```robinpath
postgres.queryOne "SELECT * FROM users WHERE id = $1" [1]
```

### Insert row with RETURNING

```robinpath
postgres.insert "users" {"name": "Alice"}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/postgres";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  postgres.connect {"host": "localhost", "user": "postgres", "database": "mydb"}
  postgres.query "SELECT * FROM users WHERE id = $1" [1]
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/mysql`](../mysql) — MySQL module for complementary functionality
- [`@robinpath/mongo`](../mongo) — Mongo module for complementary functionality
- [`@robinpath/redis`](../redis) — Redis module for complementary functionality
- [`@robinpath/supabase`](../supabase) — Supabase module for complementary functionality
- [`@robinpath/firebase`](../firebase) — Firebase module for complementary functionality

## License

MIT
