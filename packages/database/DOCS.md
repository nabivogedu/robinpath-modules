---
title: "Database"
module: "database"
package: "@robinpath/database"
description: "SQLite database with query builder, transactions, bulk insert, table management, and backup"
category: "utility"
tags: [database, utility]
type: "utility"
auth: "none"
functionCount: 16
---

# Database

> SQLite database with query builder, transactions, bulk insert, table management, and backup

**Package:** `@robinpath/database` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `database` module when you need to:

- **Open a SQLite database (file or in-memory)** -- Use `database.open` to perform this operation
- **Close a database connection** -- Use `database.close` to perform this operation
- **Run a SELECT query and return all matching rows** -- Use `database.query` to perform this operation
- **Run a SELECT query and return only the first row** -- Use `database.queryOne` to perform this operation
- **Execute an INSERT, UPDATE, DELETE, or DDL statement** -- Use `database.execute` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`open`](#open) | Open a SQLite database (file or in-memory) | `{name, path, readonly}` |
| [`close`](#close) | Close a database connection | `True if closed` |
| [`query`](#query) | Run a SELECT query and return all matching rows | `Array of row objects` |
| [`queryOne`](#queryone) | Run a SELECT query and return only the first row | `First matching row or null` |
| [`execute`](#execute) | Execute an INSERT, UPDATE, DELETE, or DDL statement | `{changes, lastInsertRowid}` |
| [`insert`](#insert) | Insert a row using an object of column-value pairs | `{id, changes}` |
| [`insertMany`](#insertmany) | Insert multiple rows in a single transaction | `{inserted: number}` |
| [`update`](#update) | Update rows matching a WHERE clause | `{changes}` |
| [`remove`](#remove) | Delete rows matching a WHERE clause | `{changes}` |
| [`createTable`](#createtable) | Create a new table with column definitions | `{table, columns}` |
| [`dropTable`](#droptable) | Drop a table if it exists | `True` |
| [`listTables`](#listtables) | List all tables in the database | `Array of table name strings` |
| [`tableInfo`](#tableinfo) | Get column information for a table | `Array of column info objects` |
| [`count`](#count) | Count rows in a table with optional WHERE conditions | `Row count` |
| [`transaction`](#transaction) | Run multiple SQL statements in a single atomic transaction | `Array of results for each statement` |
| [`backup`](#backup) | Backup the database to a file | `{backed_up: path}` |


## Functions

### open

Open a SQLite database (file or in-memory)

**Module:** `database` | **Returns:** `object` -- {name, path, readonly}

```robinpath
database.open "mydb" "./data.db"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | No | Connection name (default: 'default') |
| `path` | `string` | No | File path or ':memory:' (default) |
| `options` | `object` | No | {readonly, fileMustExist} |

---

### close

Close a database connection

**Module:** `database` | **Returns:** `boolean` -- True if closed

```robinpath
database.close "mydb"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |

---

### query

Run a SELECT query and return all matching rows

**Module:** `database` | **Returns:** `array` -- Array of row objects

```robinpath
database.query "mydb" "SELECT * FROM users WHERE age > ?" 18
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `sql` | `string` | Yes | SQL SELECT statement |
| `params` | `any` | No | Bind parameters (positional or named object) |

---

### queryOne

Run a SELECT query and return only the first row

**Module:** `database` | **Returns:** `object` -- First matching row or null

```robinpath
database.queryOne "mydb" "SELECT * FROM users WHERE id = ?" 1
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `sql` | `string` | Yes | SQL SELECT statement |
| `params` | `any` | No | Bind parameters |

---

### execute

Execute an INSERT, UPDATE, DELETE, or DDL statement

**Module:** `database` | **Returns:** `object` -- {changes, lastInsertRowid}

```robinpath
database.execute "mydb" "UPDATE users SET name = ? WHERE id = ?" "Alice" 1
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `sql` | `string` | Yes | SQL statement |
| `params` | `any` | No | Bind parameters |

---

### insert

Insert a row using an object of column-value pairs

**Module:** `database` | **Returns:** `object` -- {id, changes}

```robinpath
database.insert "mydb" "users" {"name": "Alice", "age": 30}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `table` | `string` | Yes | Table name |
| `data` | `object` | Yes | Object with column names as keys |

---

### insertMany

Insert multiple rows in a single transaction

**Module:** `database` | **Returns:** `object` -- {inserted: number}

```robinpath
database.insertMany "mydb" "users" $rows
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `table` | `string` | Yes | Table name |
| `rows` | `array` | Yes | Array of row objects |

---

### update

Update rows matching a WHERE clause

**Module:** `database` | **Returns:** `object` -- {changes}

```robinpath
database.update "mydb" "users" {"name": "Bob"} {"id": 1}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `table` | `string` | Yes | Table name |
| `data` | `object` | Yes | Columns to update |
| `where` | `object` | Yes | WHERE conditions (AND) |

---

### remove

Delete rows matching a WHERE clause

**Module:** `database` | **Returns:** `object` -- {changes}

```robinpath
database.remove "mydb" "users" {"id": 1}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `table` | `string` | Yes | Table name |
| `where` | `object` | Yes | WHERE conditions (required for safety) |

---

### createTable

Create a new table with column definitions

**Module:** `database` | **Returns:** `object` -- {table, columns}

```robinpath
database.createTable "mydb" "users" {"id": "INTEGER PRIMARY KEY", "name": "TEXT NOT NULL", "age": "INTEGER"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `table` | `string` | Yes | Table name |
| `columns` | `object` | Yes | Column definitions {name: 'type'} |
| `options` | `object` | No | {ifNotExists: boolean} |

---

### dropTable

Drop a table if it exists

**Module:** `database` | **Returns:** `boolean` -- True

```robinpath
database.dropTable "mydb" "users"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `table` | `string` | Yes | Table name |

---

### listTables

List all tables in the database

**Module:** `database` | **Returns:** `array` -- Array of table name strings

```robinpath
database.listTables "mydb"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |

---

### tableInfo

Get column information for a table

**Module:** `database` | **Returns:** `array` -- Array of column info objects

```robinpath
database.tableInfo "mydb" "users"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `table` | `string` | Yes | Table name |

---

### count

Count rows in a table with optional WHERE conditions

**Module:** `database` | **Returns:** `number` -- Row count

```robinpath
database.count "mydb" "users" {"active": 1}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `table` | `string` | Yes | Table name |
| `where` | `object` | No | Optional WHERE conditions |

---

### transaction

Run multiple SQL statements in a single atomic transaction

**Module:** `database` | **Returns:** `array` -- Array of results for each statement

```robinpath
database.transaction "mydb" [{"sql": "INSERT INTO users (name) VALUES (?)", "params": ["Alice"]}, {"sql": "SELECT * FROM users"}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `statements` | `array` | Yes | Array of {sql, params} objects |

---

### backup

Backup the database to a file

**Module:** `database` | **Returns:** `object` -- {backed_up: path}

```robinpath
database.backup "mydb" "./backup.db"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `destPath` | `string` | Yes | Destination file path |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `No data to insert` | Check the error message for details |
| `No data to update` | Check the error message for details |
| `WHERE clause is required for safety` | Check the error message for details |
| `WHERE clause is required for safety. Use database.execute for raw DELETE.` | Check the error message for details |
| `Destination path is required` | Check the error message for details |
| `Database "..." not found. Open it first with database.open.` | Check the error message for details |

```robinpath
set $result as database.open "mydb" "./data.db"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Tables

Retrieve all items and loop through them.

```robinpath
set $result as database.listTables "mydb"
each $item in $result
  print $item
end
```

### 2. Create a new item with createTable

Create a new resource and capture the result.

```robinpath
set $result as database.createTable "mydb" "users" {"id": "INTEGER PRIMARY KEY", "name": "TEXT NOT NULL", "age": "INTEGER"}
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
set $created as database.createTable "mydb" "users" {"id": "INTEGER PRIMARY KEY", "name": "TEXT NOT NULL", "age": "INTEGER"}
# Update the created item
database.update "mydb" "users" {"name": "Bob"} {"id": 1}
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as database.listTables "mydb"
if $existing == null
  database.createTable "mydb" "users" {"id": "INTEGER PRIMARY KEY", "name": "TEXT NOT NULL", "age": "INTEGER"}
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Database workflow

Chain multiple database operations together.

```robinpath
set $r_open as database.open "mydb" "./data.db"
set $r_close as database.close "mydb"
set $r_query as database.query "mydb" "SELECT * FROM users WHERE age > ?" 18
print "All operations complete"
```

### 6. Safe open with validation

Check results before proceeding.

```robinpath
set $result as database.open "mydb" "./data.db"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
