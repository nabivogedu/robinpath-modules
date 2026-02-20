---
title: "PostgreSQL"
module: "postgres"
package: "@robinpath/postgres"
description: "PostgreSQL client with connection pooling, parameterized queries, transactions, RETURNING, and LISTEN/NOTIFY"
category: "database"
tags: [postgres, database]
type: "utility"
auth: "connection-string"
functionCount: 14
---

# PostgreSQL

> PostgreSQL client with connection pooling, parameterized queries, transactions, RETURNING, and LISTEN/NOTIFY

**Package:** `@robinpath/postgres` | **Category:** Database | **Type:** Utility


## Authentication

```robinpath
postgres.connect {"host": "localhost", "user": "postgres", "database": "mydb"}
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `postgres` module when you need to:

- **Execute SQL query** -- Use `postgres.query` to perform this operation
- **Execute query returning single row** -- Use `postgres.queryOne` to perform this operation
- **Insert row with RETURNING** -- Use `postgres.insert` to perform this operation
- **Insert multiple rows** -- Use `postgres.insertMany` to perform this operation
- **Update rows with RETURNING** -- Use `postgres.update` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`connect`](#connect) | Connect to PostgreSQL | `{name, connected}` |
| [`query`](#query) | Execute SQL query | `Result rows` |
| [`queryOne`](#queryone) | Execute query returning single row | `Single row or null` |
| [`insert`](#insert) | Insert row with RETURNING | `Inserted row` |
| [`insertMany`](#insertmany) | Insert multiple rows | `Inserted rows` |
| [`update`](#update) | Update rows with RETURNING | `{affectedRows, rows}` |
| [`remove`](#remove) | Delete rows with RETURNING | `{affectedRows, rows}` |
| [`transaction`](#transaction) | Execute in transaction | `{success, results}` |
| [`tables`](#tables) | List tables in schema | `Table names` |
| [`describe`](#describe) | Describe table columns | `Column definitions` |
| [`count`](#count) | Count rows | `Count` |
| [`listen`](#listen) | Listen for NOTIFY events | `{channel, listening}` |
| [`close`](#close) | Close connection pool | `true` |
| [`closeAll`](#closeall) | Close all pools | `true` |


## Functions

### connect

Connect to PostgreSQL

**Module:** `postgres` | **Returns:** `object` -- {name, connected}

```robinpath
postgres.connect {"host": "localhost", "user": "postgres", "database": "mydb"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | Yes | {host, port, user, password, database, name, max, ssl} |

---

### query

Execute SQL query

**Module:** `postgres` | **Returns:** `array` -- Result rows

```robinpath
postgres.query "SELECT * FROM users WHERE id = $1" [1]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sql` | `string` | Yes | SQL with $1 params |
| `params` | `array` | No | Parameters |
| `connection` | `string` | No | Connection name |

---

### queryOne

Execute query returning single row

**Module:** `postgres` | **Returns:** `object` -- Single row or null

```robinpath
postgres.queryOne "SELECT * FROM users WHERE id = $1" [1]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sql` | `string` | Yes | SQL |
| `params` | `array` | No | Parameters |
| `connection` | `string` | No | Connection name |

---

### insert

Insert row with RETURNING

**Module:** `postgres` | **Returns:** `object` -- Inserted row

```robinpath
postgres.insert "users" {"name": "Alice"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table |
| `data` | `object` | Yes | Column values |
| `connection` | `string` | No | Connection name |

---

### insertMany

Insert multiple rows

**Module:** `postgres` | **Returns:** `array` -- Inserted rows

```robinpath
postgres.insertMany "users" [{"name": "Alice"}, {"name": "Bob"}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table |
| `rows` | `array` | Yes | Row objects |
| `connection` | `string` | No | Connection name |

---

### update

Update rows with RETURNING

**Module:** `postgres` | **Returns:** `object` -- {affectedRows, rows}

```robinpath
postgres.update "users" {"name": "Bob"} "id = $1" [1]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table |
| `data` | `object` | Yes | Columns to update |
| `where` | `string` | Yes | WHERE clause |
| `params` | `array` | No | WHERE params |
| `connection` | `string` | No | Connection name |

---

### remove

Delete rows with RETURNING

**Module:** `postgres` | **Returns:** `object` -- {affectedRows, rows}

```robinpath
postgres.remove "users" "id = $1" [1]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table |
| `where` | `string` | Yes | WHERE clause |
| `params` | `array` | No | WHERE params |
| `connection` | `string` | No | Connection name |

---

### transaction

Execute in transaction

**Module:** `postgres` | **Returns:** `object` -- {success, results}

```robinpath
postgres.transaction [{"sql": "INSERT INTO users (name) VALUES ($1)", "params": ["Alice"]}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `queries` | `array` | Yes | Array of {sql, params} |
| `connection` | `string` | No | Connection name |

---

### tables

List tables in schema

**Module:** `postgres` | **Returns:** `array` -- Table names

```robinpath
postgres.tables "public"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `schema` | `string` | No | Schema (default public) |
| `connection` | `string` | No | Connection name |

---

### describe

Describe table columns

**Module:** `postgres` | **Returns:** `array` -- Column definitions

```robinpath
postgres.describe "users"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table |
| `connection` | `string` | No | Connection name |

---

### count

Count rows

**Module:** `postgres` | **Returns:** `number` -- Count

```robinpath
postgres.count "users"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table |
| `where` | `string` | No | WHERE clause |
| `params` | `array` | No | WHERE params |
| `connection` | `string` | No | Connection name |

---

### listen

Listen for NOTIFY events

**Module:** `postgres` | **Returns:** `object` -- {channel, listening}

```robinpath
postgres.listen "events"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `channel` | `string` | Yes | Channel name |
| `connection` | `string` | No | Connection name |

---

### close

Close connection pool

**Module:** `postgres` | **Returns:** `boolean` -- true

```robinpath
postgres.close
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `string` | No | Connection name |

---

### closeAll

Close all pools

**Module:** `postgres` | **Returns:** `boolean` -- true

```robinpath
postgres.closeAll
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `PostgreSQL connection "..." not found. Call postgres.connect first.` | Check the error message for details |

```robinpath
set $result as postgres.query "SELECT * FROM users WHERE id = $1" [1]
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate en

Retrieve all items and loop through them.

```robinpath
set $result as postgres.listen "events"
each $item in $result
  print $item
end
```

### 2. Multi-step PostgreSQL workflow

Chain multiple postgres operations together.

```robinpath
set $r_connect as postgres.connect {"host": "localhost", "user": "postgres", "database": "mydb"}
set $r_query as postgres.query "SELECT * FROM users WHERE id = $1" [1]
set $r_queryOne as postgres.queryOne "SELECT * FROM users WHERE id = $1" [1]
print "All operations complete"
```

### 3. Safe connect with validation

Check results before proceeding.

```robinpath
set $result as postgres.connect {"host": "localhost", "user": "postgres", "database": "mydb"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **mysql** -- MySQL module for complementary functionality
- **mongo** -- Mongo module for complementary functionality
- **redis** -- Redis module for complementary functionality
- **supabase** -- Supabase module for complementary functionality
- **firebase** -- Firebase module for complementary functionality
