---
title: "Mongo"
module: "mongo"
package: "@robinpath/mongo"
description: "MongoDB client with find, insert, update, delete, aggregation pipeline, indexing, and connection management"
category: "database"
tags: [mongo, database]
type: "utility"
auth: "connection-string"
functionCount: 17
---

# Mongo

> MongoDB client with find, insert, update, delete, aggregation pipeline, indexing, and connection management

**Package:** `@robinpath/mongo` | **Category:** Database | **Type:** Utility


## Authentication

```robinpath
mongo.connect {"uri": "mongodb://localhost:27017", "database": "mydb"}
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `mongo` module when you need to:

- **Find documents** -- Use `mongo.find` to perform this operation
- **Find one document** -- Use `mongo.findOne` to perform this operation
- **Insert one document** -- Use `mongo.insertOne` to perform this operation
- **Insert multiple documents** -- Use `mongo.insertMany` to perform this operation
- **Update one document** -- Use `mongo.updateOne` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`connect`](#connect) | Connect to MongoDB | `{name, connected, database}` |
| [`find`](#find) | Find documents | `Documents` |
| [`findOne`](#findone) | Find one document | `Document or null` |
| [`insertOne`](#insertone) | Insert one document | `{insertedId, acknowledged}` |
| [`insertMany`](#insertmany) | Insert multiple documents | `{insertedCount, insertedIds}` |
| [`updateOne`](#updateone) | Update one document | `{matchedCount, modifiedCount}` |
| [`updateMany`](#updatemany) | Update many documents | `{matchedCount, modifiedCount}` |
| [`deleteOne`](#deleteone) | Delete one document | `{deletedCount}` |
| [`deleteMany`](#deletemany) | Delete many documents | `{deletedCount}` |
| [`aggregate`](#aggregate) | Run aggregation pipeline | `Results` |
| [`count`](#count) | Count documents | `Count` |
| [`distinct`](#distinct) | Get distinct values | `Distinct values` |
| [`collections`](#collections) | List collections | `Collection names` |
| [`createIndex`](#createindex) | Create index | `Index name` |
| [`objectId`](#objectid) | Generate or parse ObjectId | `ObjectId string` |
| [`close`](#close) | Close connection | `true` |
| [`closeAll`](#closeall) | Close all connections | `true` |


## Functions

### connect

Connect to MongoDB

**Module:** `mongo` | **Returns:** `object` -- {name, connected, database}

```robinpath
mongo.connect {"uri": "mongodb://localhost:27017", "database": "mydb"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | Yes | {uri, database, name} |

---

### find

Find documents

**Module:** `mongo` | **Returns:** `array` -- Documents

```robinpath
mongo.find "users" {"age": {"$gt": 18}} {"limit": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection |
| `filter` | `object` | No | Query filter |
| `options` | `object` | No | {sort, limit, skip, projection} |
| `connection` | `string` | No | Connection name |

---

### findOne

Find one document

**Module:** `mongo` | **Returns:** `object` -- Document or null

```robinpath
mongo.findOne "users" {"email": "alice@example.com"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection |
| `filter` | `object` | Yes | Query filter |
| `connection` | `string` | No | Connection name |

---

### insertOne

Insert one document

**Module:** `mongo` | **Returns:** `object` -- {insertedId, acknowledged}

```robinpath
mongo.insertOne "users" {"name": "Alice", "age": 30}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection |
| `document` | `object` | Yes | Document |
| `connection` | `string` | No | Connection name |

---

### insertMany

Insert multiple documents

**Module:** `mongo` | **Returns:** `object` -- {insertedCount, insertedIds}

```robinpath
mongo.insertMany "users" [{"name": "Alice"}, {"name": "Bob"}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection |
| `documents` | `array` | Yes | Documents |
| `connection` | `string` | No | Connection name |

---

### updateOne

Update one document

**Module:** `mongo` | **Returns:** `object` -- {matchedCount, modifiedCount}

```robinpath
mongo.updateOne "users" {"_id": "..."} {"name": "Bob"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection |
| `filter` | `object` | Yes | Query filter |
| `update` | `object` | Yes | Update ops or fields |
| `connection` | `string` | No | Connection name |

---

### updateMany

Update many documents

**Module:** `mongo` | **Returns:** `object` -- {matchedCount, modifiedCount}

```robinpath
mongo.updateMany "users" {"active": false} {"$set": {"archived": true}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection |
| `filter` | `object` | Yes | Query filter |
| `update` | `object` | Yes | Update ops |
| `connection` | `string` | No | Connection name |

---

### deleteOne

Delete one document

**Module:** `mongo` | **Returns:** `object` -- {deletedCount}

```robinpath
mongo.deleteOne "users" {"_id": "..."}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection |
| `filter` | `object` | Yes | Query filter |
| `connection` | `string` | No | Connection name |

---

### deleteMany

Delete many documents

**Module:** `mongo` | **Returns:** `object` -- {deletedCount}

```robinpath
mongo.deleteMany "users" {"archived": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection |
| `filter` | `object` | Yes | Query filter |
| `connection` | `string` | No | Connection name |

---

### aggregate

Run aggregation pipeline

**Module:** `mongo` | **Returns:** `array` -- Results

```robinpath
mongo.aggregate "orders" [{"$group": {"_id": "$status", "count": {"$sum": 1}}}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection |
| `pipeline` | `array` | Yes | Pipeline stages |
| `connection` | `string` | No | Connection name |

---

### count

Count documents

**Module:** `mongo` | **Returns:** `number` -- Count

```robinpath
mongo.count "users" {"active": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection |
| `filter` | `object` | No | Query filter |
| `connection` | `string` | No | Connection name |

---

### distinct

Get distinct values

**Module:** `mongo` | **Returns:** `array` -- Distinct values

```robinpath
mongo.distinct "users" "country"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection |
| `field` | `string` | Yes | Field name |
| `filter` | `object` | No | Query filter |
| `connection` | `string` | No | Connection name |

---

### collections

List collections

**Module:** `mongo` | **Returns:** `array` -- Collection names

```robinpath
mongo.collections
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `string` | No | Connection name |

---

### createIndex

Create index

**Module:** `mongo` | **Returns:** `string` -- Index name

```robinpath
mongo.createIndex "users" {"email": 1} {"unique": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection |
| `keys` | `object` | Yes | Index keys {field: 1|-1} |
| `options` | `object` | No | {unique, sparse, ...} |
| `connection` | `string` | No | Connection name |

---

### objectId

Generate or parse ObjectId

**Module:** `mongo` | **Returns:** `string` -- ObjectId string

```robinpath
mongo.objectId
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Existing ID string or omit for new |

---

### close

Close connection

**Module:** `mongo` | **Returns:** `boolean` -- true

```robinpath
mongo.close
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `string` | No | Connection name |

---

### closeAll

Close all connections

**Module:** `mongo` | **Returns:** `boolean` -- true

```robinpath
mongo.closeAll
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `MongoDB connection "..." not found. Call mongo.connect first.` | Check the error message for details |

```robinpath
set $result as mongo.find "users" {"age": {"$gt": 18}} {"limit": 10}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with createIndex

Create a new resource and capture the result.

```robinpath
set $result as mongo.createIndex "users" {"email": 1} {"unique": true}
print "Created: " + $result
```

### 2. Create and update workflow

Create an item and then update it.

```robinpath
set $created as mongo.createIndex "users" {"email": 1} {"unique": true}
# Update the created item
mongo.updateOne "users" {"_id": "..."} {"name": "Bob"}
```

### 3. Multi-step Mongo workflow

Chain multiple mongo operations together.

```robinpath
set $r_connect as mongo.connect {"uri": "mongodb://localhost:27017", "database": "mydb"}
set $r_find as mongo.find "users" {"age": {"$gt": 18}} {"limit": 10}
set $r_findOne as mongo.findOne "users" {"email": "alice@example.com"}
print "All operations complete"
```

### 4. Safe connect with validation

Check results before proceeding.

```robinpath
set $result as mongo.connect {"uri": "mongodb://localhost:27017", "database": "mydb"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **mysql** -- MySQL module for complementary functionality
- **postgres** -- PostgreSQL module for complementary functionality
- **redis** -- Redis module for complementary functionality
- **supabase** -- Supabase module for complementary functionality
- **firebase** -- Firebase module for complementary functionality
