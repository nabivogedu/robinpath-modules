# @robinpath/database

> SQLite database with query builder, transactions, bulk insert, table management, and backup

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-16-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `database` module lets you:

- Open a SQLite database (file or in-memory)
- Close a database connection
- Run a SELECT query and return all matching rows
- Run a SELECT query and return only the first row
- Execute an INSERT, UPDATE, DELETE, or DDL statement

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/database
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
database.close "mydb"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `database.open` | Open a SQLite database (file or in-memory) |
| `database.close` | Close a database connection |
| `database.query` | Run a SELECT query and return all matching rows |
| `database.queryOne` | Run a SELECT query and return only the first row |
| `database.execute` | Execute an INSERT, UPDATE, DELETE, or DDL statement |
| `database.insert` | Insert a row using an object of column-value pairs |
| `database.insertMany` | Insert multiple rows in a single transaction |
| `database.update` | Update rows matching a WHERE clause |
| `database.remove` | Delete rows matching a WHERE clause |
| `database.createTable` | Create a new table with column definitions |
| `database.dropTable` | Drop a table if it exists |
| `database.listTables` | List all tables in the database |
| `database.tableInfo` | Get column information for a table |
| `database.count` | Count rows in a table with optional WHERE conditions |
| `database.transaction` | Run multiple SQL statements in a single atomic transaction |
| `database.backup` | Backup the database to a file |

## Examples

### Close a database connection

```robinpath
database.close "mydb"
```

### Run a SELECT query and return all matching rows

```robinpath
database.query "mydb" "SELECT * FROM users WHERE age > ?" 18
```

### Run a SELECT query and return only the first row

```robinpath
database.queryOne "mydb" "SELECT * FROM users WHERE id = ?" 1
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/database";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  database.close "mydb"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
