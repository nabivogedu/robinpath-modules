---
title: "MySQL"
module: "mysql"
package: "@robinpath/mysql"
description: "MySQL/MariaDB client with connection pooling, parameterized queries, transactions, and CRUD operations"
category: "database"
tags: [mysql, database]
type: "utility"
auth: "connection-string"
functionCount: 12
---

# MySQL

> MySQL/MariaDB client with connection pooling, parameterized queries, transactions, and CRUD operations

**Package:** `@robinpath/mysql` | **Category:** Database | **Type:** Utility


## Authentication

```robinpath
mysql.connect {"host": "localhost", "user": "root", "database": "mydb"}
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `mysql` module when you need to:

- **Execute SQL query** -- Use `mysql.query` to perform this operation
- **Insert a row** -- Use `mysql.insert` to perform this operation
- **Insert multiple rows** -- Use `mysql.insertMany` to perform this operation
- **Update rows** -- Use `mysql.update` to perform this operation
- **Delete rows** -- Use `mysql.remove` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`connect`](#connect) | Connect to MySQL database | `{name, connected}` |
| [`query`](#query) | Execute SQL query | `Query results` |
| [`insert`](#insert) | Insert a row | `{insertId, affectedRows}` |
| [`insertMany`](#insertmany) | Insert multiple rows | `{affectedRows}` |
| [`update`](#update) | Update rows | `{affectedRows}` |
| [`remove`](#remove) | Delete rows | `{affectedRows}` |
| [`transaction`](#transaction) | Execute queries in transaction | `{success, results}` |
| [`tables`](#tables) | List all tables | `Table names` |
| [`describe`](#describe) | Describe table structure | `Column definitions` |
| [`count`](#count) | Count rows | `Row count` |
| [`close`](#close) | Close connection pool | `true` |
| [`closeAll`](#closeall) | Close all connection pools | `true` |


## Functions

### connect

Connect to MySQL database

**Module:** `mysql` | **Returns:** `object` -- {name, connected}

```robinpath
mysql.connect {"host": "localhost", "user": "root", "database": "mydb"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | Yes | {host, port, user, password, database, name, connectionLimit} |

---

### query

Execute SQL query

**Module:** `mysql` | **Returns:** `array` -- Query results

```robinpath
mysql.query "SELECT * FROM users WHERE id = ?" [1]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sql` | `string` | Yes | SQL query |
| `params` | `array` | No | Query parameters |
| `connection` | `string` | No | Connection name |

---

### insert

Insert a row

**Module:** `mysql` | **Returns:** `object` -- {insertId, affectedRows}

```robinpath
mysql.insert "users" {"name": "Alice", "email": "alice@example.com"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table name |
| `data` | `object` | Yes | Column values |
| `connection` | `string` | No | Connection name |

---

### insertMany

Insert multiple rows

**Module:** `mysql` | **Returns:** `object` -- {affectedRows}

```robinpath
mysql.insertMany "users" [{"name": "Alice"}, {"name": "Bob"}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table name |
| `rows` | `array` | Yes | Array of row objects |
| `connection` | `string` | No | Connection name |

---

### update

Update rows

**Module:** `mysql` | **Returns:** `object` -- {affectedRows}

```robinpath
mysql.update "users" {"name": "Bob"} "id = ?" [1]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table name |
| `data` | `object` | Yes | Columns to update |
| `where` | `string` | Yes | WHERE clause |
| `params` | `array` | No | WHERE params |
| `connection` | `string` | No | Connection name |

---

### remove

Delete rows

**Module:** `mysql` | **Returns:** `object` -- {affectedRows}

```robinpath
mysql.remove "users" "id = ?" [1]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table name |
| `where` | `string` | Yes | WHERE clause |
| `params` | `array` | No | WHERE params |
| `connection` | `string` | No | Connection name |

---

### transaction

Execute queries in transaction

**Module:** `mysql` | **Returns:** `object` -- {success, results}

```robinpath
mysql.transaction [{"sql": "INSERT INTO users (name) VALUES (?)", "params": ["Alice"]}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `queries` | `array` | Yes | Array of {sql, params} |
| `connection` | `string` | No | Connection name |

---

### tables

List all tables

**Module:** `mysql` | **Returns:** `array` -- Table names

```robinpath
mysql.tables
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `string` | No | Connection name |

---

### describe

Describe table structure

**Module:** `mysql` | **Returns:** `array` -- Column definitions

```robinpath
mysql.describe "users"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table name |
| `connection` | `string` | No | Connection name |

---

### count

Count rows

**Module:** `mysql` | **Returns:** `number` -- Row count

```robinpath
mysql.count "users" "active = ?" [true]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table name |
| `where` | `string` | No | WHERE clause |
| `params` | `array` | No | WHERE params |
| `connection` | `string` | No | Connection name |

---

### close

Close connection pool

**Module:** `mysql` | **Returns:** `boolean` -- true

```robinpath
mysql.close
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `string` | No | Connection name |

---

### closeAll

Close all connection pools

**Module:** `mysql` | **Returns:** `boolean` -- true

```robinpath
mysql.closeAll
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `MySQL connection "..." not found. Call mysql.connect first.` | Check the error message for details |

```robinpath
set $result as mysql.query "SELECT * FROM users WHERE id = ?" [1]
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step MySQL workflow

Chain multiple mysql operations together.

```robinpath
set $r_connect as mysql.connect {"host": "localhost", "user": "root", "database": "mydb"}
set $r_query as mysql.query "SELECT * FROM users WHERE id = ?" [1]
set $r_insert as mysql.insert "users" {"name": "Alice", "email": "alice@example.com"}
print "All operations complete"
```

### 2. Safe connect with validation

Check results before proceeding.

```robinpath
set $result as mysql.connect {"host": "localhost", "user": "root", "database": "mydb"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **postgres** -- PostgreSQL module for complementary functionality
- **mongo** -- Mongo module for complementary functionality
- **redis** -- Redis module for complementary functionality
- **supabase** -- Supabase module for complementary functionality
- **firebase** -- Firebase module for complementary functionality
