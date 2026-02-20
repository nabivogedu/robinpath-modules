# @robinpath/mysql

> MySQL/MariaDB client with connection pooling, parameterized queries, transactions, and CRUD operations

![Category](https://img.shields.io/badge/category-Database-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-connection-string-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `mysql` module lets you:

- Execute SQL query
- Insert a row
- Insert multiple rows
- Update rows
- Delete rows

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/mysql
```

## Quick Start

**1. Set up credentials**

```robinpath
mysql.connect {"host": "localhost", "user": "root", "database": "mydb"}
```

**2. Execute SQL query**

```robinpath
mysql.query "SELECT * FROM users WHERE id = ?" [1]
```

## Available Functions

| Function | Description |
|----------|-------------|
| `mysql.connect` | Connect to MySQL database |
| `mysql.query` | Execute SQL query |
| `mysql.insert` | Insert a row |
| `mysql.insertMany` | Insert multiple rows |
| `mysql.update` | Update rows |
| `mysql.remove` | Delete rows |
| `mysql.transaction` | Execute queries in transaction |
| `mysql.tables` | List all tables |
| `mysql.describe` | Describe table structure |
| `mysql.count` | Count rows |
| `mysql.close` | Close connection pool |
| `mysql.closeAll` | Close all connection pools |

## Examples

### Execute SQL query

```robinpath
mysql.query "SELECT * FROM users WHERE id = ?" [1]
```

### Insert a row

```robinpath
mysql.insert "users" {"name": "Alice", "email": "alice@example.com"}
```

### Insert multiple rows

```robinpath
mysql.insertMany "users" [{"name": "Alice"}, {"name": "Bob"}]
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/mysql";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  mysql.connect {"host": "localhost", "user": "root", "database": "mydb"}
  mysql.query "SELECT * FROM users WHERE id = ?" [1]
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/postgres`](../postgres) — PostgreSQL module for complementary functionality
- [`@robinpath/mongo`](../mongo) — Mongo module for complementary functionality
- [`@robinpath/redis`](../redis) — Redis module for complementary functionality
- [`@robinpath/supabase`](../supabase) — Supabase module for complementary functionality
- [`@robinpath/firebase`](../firebase) — Firebase module for complementary functionality

## License

MIT
