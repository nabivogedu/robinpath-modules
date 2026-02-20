---
title: "Redis"
module: "redis"
package: "@robinpath/redis"
description: "Redis client with strings, hashes, lists, sets, pub/sub, TTL, and connection management"
category: "database"
tags: [redis, database]
type: "utility"
auth: "connection-string"
functionCount: 28
---

# Redis

> Redis client with strings, hashes, lists, sets, pub/sub, TTL, and connection management

**Package:** `@robinpath/redis` | **Category:** Database | **Type:** Utility


## Authentication

```robinpath
redis.connect {"host": "localhost"}
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `redis` module when you need to:

- **Get value by key** -- Use `redis.get` to perform this operation
- **Delete key(s)** -- Use `redis.del` to perform this operation
- **Check key exists** -- Use `redis.exists` to perform this operation
- **Find keys by pattern** -- Use `redis.keys` to perform this operation
- **Get key TTL** -- Use `redis.ttl` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`connect`](#connect) | Connect to Redis | `{name, connected}` |
| [`get`](#get) | Get value by key | `Value or null` |
| [`set`](#set) | Set key-value | `true` |
| [`del`](#del) | Delete key(s) | `Keys deleted` |
| [`exists`](#exists) | Check key exists | `true if exists` |
| [`keys`](#keys) | Find keys by pattern | `Matching keys` |
| [`ttl`](#ttl) | Get key TTL | `TTL in seconds` |
| [`expire`](#expire) | Set key expiration | `true if set` |
| [`incr`](#incr) | Increment value | `New value` |
| [`decr`](#decr) | Decrement value | `New value` |
| [`hget`](#hget) | Get hash field | `Value` |
| [`hset`](#hset) | Set hash fields | `true` |
| [`hgetall`](#hgetall) | Get all hash fields | `All fields` |
| [`hdel`](#hdel) | Delete hash fields | `Fields removed` |
| [`lpush`](#lpush) | Push to list head | `List length` |
| [`rpush`](#rpush) | Push to list tail | `List length` |
| [`lpop`](#lpop) | Pop from list head | `Value or null` |
| [`rpop`](#rpop) | Pop from list tail | `Value or null` |
| [`lrange`](#lrange) | Get list range | `Values` |
| [`llen`](#llen) | Get list length | `Length` |
| [`sadd`](#sadd) | Add to set | `Members added` |
| [`smembers`](#smembers) | Get set members | `Members` |
| [`sismember`](#sismember) | Check set membership | `true if member` |
| [`srem`](#srem) | Remove from set | `Members removed` |
| [`publish`](#publish) | Publish message to channel | `Subscribers received` |
| [`flushdb`](#flushdb) | Flush current database | `true` |
| [`close`](#close) | Close connection | `true` |
| [`closeAll`](#closeall) | Close all connections | `true` |


## Functions

### connect

Connect to Redis

**Module:** `redis` | **Returns:** `object` -- {name, connected}

```robinpath
redis.connect {"host": "localhost"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | Yes | {host, port, password, db, prefix, name} |

---

### get

Get value by key

**Module:** `redis` | **Returns:** `any` -- Value or null

```robinpath
redis.get "user:1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Key |
| `connection` | `string` | No | Connection name |

---

### set

Set key-value

**Module:** `redis` | **Returns:** `boolean` -- true

```robinpath
redis.set "user:1" {"name": "Alice"} 3600
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Key |
| `value` | `any` | Yes | Value |
| `ttl` | `number` | No | TTL in seconds |
| `connection` | `string` | No | Connection name |

---

### del

Delete key(s)

**Module:** `redis` | **Returns:** `number` -- Keys deleted

```robinpath
redis.del "user:1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `keys` | `string` | Yes | Key or array of keys |
| `connection` | `string` | No | Connection name |

---

### exists

Check key exists

**Module:** `redis` | **Returns:** `boolean` -- true if exists

```robinpath
redis.exists "user:1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Key |
| `connection` | `string` | No | Connection name |

---

### keys

Find keys by pattern

**Module:** `redis` | **Returns:** `array` -- Matching keys

```robinpath
redis.keys "user:*"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pattern` | `string` | Yes | Glob pattern |
| `connection` | `string` | No | Connection name |

---

### ttl

Get key TTL

**Module:** `redis` | **Returns:** `number` -- TTL in seconds

```robinpath
redis.ttl "session:abc"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Key |
| `connection` | `string` | No | Connection name |

---

### expire

Set key expiration

**Module:** `redis` | **Returns:** `boolean` -- true if set

```robinpath
redis.expire "session:abc" 3600
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Key |
| `seconds` | `number` | Yes | TTL |
| `connection` | `string` | No | Connection name |

---

### incr

Increment value

**Module:** `redis` | **Returns:** `number` -- New value

```robinpath
redis.incr "counter"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Key |
| `amount` | `number` | No | Amount (default 1) |

---

### decr

Decrement value

**Module:** `redis` | **Returns:** `number` -- New value

```robinpath
redis.decr "counter"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Key |
| `amount` | `number` | No | Amount (default 1) |

---

### hget

Get hash field

**Module:** `redis` | **Returns:** `any` -- Value

```robinpath
redis.hget "user:1" "name"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Hash key |
| `field` | `string` | Yes | Field |
| `connection` | `string` | No | Connection name |

---

### hset

Set hash fields

**Module:** `redis` | **Returns:** `boolean` -- true

```robinpath
redis.hset "user:1" {"name": "Alice", "age": 30}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Hash key |
| `fields` | `object` | Yes | Field-value pairs |
| `connection` | `string` | No | Connection name |

---

### hgetall

Get all hash fields

**Module:** `redis` | **Returns:** `object` -- All fields

```robinpath
redis.hgetall "user:1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Hash key |
| `connection` | `string` | No | Connection name |

---

### hdel

Delete hash fields

**Module:** `redis` | **Returns:** `number` -- Fields removed

```robinpath
redis.hdel "user:1" "age"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Hash key |
| `fields` | `string` | Yes | Field(s) |
| `connection` | `string` | No | Connection name |

---

### lpush

Push to list head

**Module:** `redis` | **Returns:** `number` -- List length

```robinpath
redis.lpush "queue" "task1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | List key |
| `values` | `any` | Yes | Value(s) |
| `connection` | `string` | No | Connection name |

---

### rpush

Push to list tail

**Module:** `redis` | **Returns:** `number` -- List length

```robinpath
redis.rpush "queue" "task1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | List key |
| `values` | `any` | Yes | Value(s) |
| `connection` | `string` | No | Connection name |

---

### lpop

Pop from list head

**Module:** `redis` | **Returns:** `string` -- Value or null

```robinpath
redis.lpop "queue"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | List key |
| `connection` | `string` | No | Connection name |

---

### rpop

Pop from list tail

**Module:** `redis` | **Returns:** `string` -- Value or null

```robinpath
redis.rpop "queue"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | List key |
| `connection` | `string` | No | Connection name |

---

### lrange

Get list range

**Module:** `redis` | **Returns:** `array` -- Values

```robinpath
redis.lrange "queue" 0 -1
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | List key |
| `start` | `number` | No | Start index |
| `stop` | `number` | No | Stop index |
| `connection` | `string` | No | Connection name |

---

### llen

Get list length

**Module:** `redis` | **Returns:** `number` -- Length

```robinpath
redis.llen "queue"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | List key |
| `connection` | `string` | No | Connection name |

---

### sadd

Add to set

**Module:** `redis` | **Returns:** `number` -- Members added

```robinpath
redis.sadd "tags" ["js", "ts"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Set key |
| `members` | `any` | Yes | Member(s) |
| `connection` | `string` | No | Connection name |

---

### smembers

Get set members

**Module:** `redis` | **Returns:** `array` -- Members

```robinpath
redis.smembers "tags"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Set key |
| `connection` | `string` | No | Connection name |

---

### sismember

Check set membership

**Module:** `redis` | **Returns:** `boolean` -- true if member

```robinpath
redis.sismember "tags" "js"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Set key |
| `member` | `string` | Yes | Member |
| `connection` | `string` | No | Connection name |

---

### srem

Remove from set

**Module:** `redis` | **Returns:** `number` -- Members removed

```robinpath
redis.srem "tags" "old"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Set key |
| `members` | `any` | Yes | Member(s) |
| `connection` | `string` | No | Connection name |

---

### publish

Publish message to channel

**Module:** `redis` | **Returns:** `number` -- Subscribers received

```robinpath
redis.publish "events" "user.created"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `channel` | `string` | Yes | Channel |
| `message` | `string` | Yes | Message |
| `connection` | `string` | No | Connection name |

---

### flushdb

Flush current database

**Module:** `redis` | **Returns:** `boolean` -- true

```robinpath
redis.flushdb
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `string` | No | Connection name |

---

### close

Close connection

**Module:** `redis` | **Returns:** `boolean` -- true

```robinpath
redis.close
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connection` | `string` | No | Connection name |

---

### closeAll

Close all connections

**Module:** `redis` | **Returns:** `boolean` -- true

```robinpath
redis.closeAll
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Redis connection "..." not found. Call redis.connect first.` | Check the error message for details |

```robinpath
set $result as redis.get "user:1"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate 

Retrieve all items and loop through them.

```robinpath
set $result as redis.get "user:1"
each $item in $result
  print $item
end
```

### 2. Multi-step Redis workflow

Chain multiple redis operations together.

```robinpath
set $r_connect as redis.connect {"host": "localhost"}
set $r_get as redis.get "user:1"
set $r_del as redis.del "user:1"
print "All operations complete"
```

### 3. Safe connect with validation

Check results before proceeding.

```robinpath
set $result as redis.connect {"host": "localhost"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **mysql** -- MySQL module for complementary functionality
- **postgres** -- PostgreSQL module for complementary functionality
- **mongo** -- Mongo module for complementary functionality
- **supabase** -- Supabase module for complementary functionality
- **firebase** -- Firebase module for complementary functionality
