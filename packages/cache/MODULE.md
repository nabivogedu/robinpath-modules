---
title: "Cache"
module: "cache"
package: "@robinpath/cache"
description: "In-memory key-value cache with optional TTL expiration for temporary data storage"
category: "infrastructure"
tags: [cache, infrastructure]
type: "utility"
auth: "none"
functionCount: 12
---

# Cache

> In-memory key-value cache with optional TTL expiration for temporary data storage

**Package:** `@robinpath/cache` | **Category:** Infrastructure | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `cache` module when you need to:

- **Retrieve a value from the cache by key** -- Use `cache.get` to perform this operation
- **Check if a non-expired key exists in the cache** -- Use `cache.has` to perform this operation
- **Remove a key from the cache** -- Use `cache.delete` to perform this operation
- **Remove all entries from the cache** -- Use `cache.clear` to perform this operation
- **Get all non-expired keys in the cache** -- Use `cache.keys` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`set`](#set) | Store a value in the cache with an optional TTL | `True if the value was stored` |
| [`get`](#get) | Retrieve a value from the cache by key | `The cached value, the default value, or null if not found` |
| [`has`](#has) | Check if a non-expired key exists in the cache | `True if the key exists and has not expired` |
| [`delete`](#delete) | Remove a key from the cache | `True if the key was deleted` |
| [`clear`](#clear) | Remove all entries from the cache | `True if the cache was cleared` |
| [`keys`](#keys) | Get all non-expired keys in the cache | `Array of all non-expired cache keys` |
| [`values`](#values) | Get all non-expired values in the cache | `Array of all non-expired cache values` |
| [`size`](#size) | Get the number of non-expired entries in the cache | `Count of non-expired cache entries` |
| [`ttl`](#ttl) | Get the remaining time-to-live for a cache key | `Remaining TTL in seconds, -1 if no expiry, or null if key does not exist` |
| [`setMany`](#setmany) | Store multiple key-value pairs in the cache at once | `Number of entries that were stored` |
| [`getMany`](#getmany) | Retrieve multiple values from the cache by keys | `Object of key-value pairs for found non-expired keys` |
| [`deleteMany`](#deletemany) | Remove multiple keys from the cache at once | `Number of entries that were deleted` |


## Functions

### set

Store a value in the cache with an optional TTL

**Module:** `cache` | **Returns:** `boolean` -- True if the value was stored

```robinpath
cache.set "user:1" "Alice" 60
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Cache key to store the value under |
| `value` | `any` | Yes | Value to store in the cache |
| `ttl` | `number` | No | Time-to-live in seconds (omit or null for no expiry) |

---

### get

Retrieve a value from the cache by key

**Module:** `cache` | **Returns:** `any` -- The cached value, the default value, or null if not found

```robinpath
cache.get "user:1" "unknown"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Cache key to look up |
| `defaultValue` | `any` | No | Value to return if the key is not found or expired |

---

### has

Check if a non-expired key exists in the cache

**Module:** `cache` | **Returns:** `boolean` -- True if the key exists and has not expired

```robinpath
cache.has "user:1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Cache key to check |

---

### delete

Remove a key from the cache

**Module:** `cache` | **Returns:** `boolean` -- True if the key was deleted

```robinpath
cache.delete "user:1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Cache key to delete |

---

### clear

Remove all entries from the cache

**Module:** `cache` | **Returns:** `boolean` -- True if the cache was cleared

```robinpath
cache.clear
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### keys

Get all non-expired keys in the cache

**Module:** `cache` | **Returns:** `array` -- Array of all non-expired cache keys

```robinpath
cache.keys
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### values

Get all non-expired values in the cache

**Module:** `cache` | **Returns:** `array` -- Array of all non-expired cache values

```robinpath
cache.values
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### size

Get the number of non-expired entries in the cache

**Module:** `cache` | **Returns:** `number` -- Count of non-expired cache entries

```robinpath
cache.size
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### ttl

Get the remaining time-to-live for a cache key

**Module:** `cache` | **Returns:** `number` -- Remaining TTL in seconds, -1 if no expiry, or null if key does not exist

```robinpath
cache.ttl "user:1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Cache key to check TTL for |

---

### setMany

Store multiple key-value pairs in the cache at once

**Module:** `cache` | **Returns:** `number` -- Number of entries that were stored

```robinpath
cache.setMany {"a": 1, "b": 2} 120
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `entries` | `object` | Yes | Object of key-value pairs to store |
| `ttl` | `number` | No | Time-to-live in seconds for all entries (omit or null for no expiry) |

---

### getMany

Retrieve multiple values from the cache by keys

**Module:** `cache` | **Returns:** `object` -- Object of key-value pairs for found non-expired keys

```robinpath
cache.getMany ["a", "b", "c"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `keys` | `array` | Yes | Array of cache keys to look up |

---

### deleteMany

Remove multiple keys from the cache at once

**Module:** `cache` | **Returns:** `number` -- Number of entries that were deleted

```robinpath
cache.deleteMany ["a", "b"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `keys` | `array` | Yes | Array of cache keys to delete |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as cache.get "user:1" "unknown"
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
set $result as cache.get "user:1" "unknown"
each $item in $result
  print $item
end
```

### 2. Multi-step Cache workflow

Chain multiple cache operations together.

```robinpath
set $r_get as cache.get "user:1" "unknown"
set $r_has as cache.has "user:1"
set $r_delete as cache.delete "user:1"
print "All operations complete"
```

### 3. Safe get with validation

Check results before proceeding.

```robinpath
set $result as cache.get "user:1" "unknown"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
