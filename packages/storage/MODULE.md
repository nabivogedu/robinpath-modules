---
title: "Storage"
module: "storage"
package: "@robinpath/storage"
description: "Persistent key-value storage (memory or file-backed) with TTL, counters, and file operations"
category: "infrastructure"
tags: [storage, infrastructure]
type: "utility"
auth: "none"
functionCount: 18
---

# Storage

> Persistent key-value storage (memory or file-backed) with TTL, counters, and file operations

**Package:** `@robinpath/storage` | **Category:** Infrastructure | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `storage` module when you need to:

- **Create a named key-value store (memory or file-backed)** -- Use `storage.create` to perform this operation
- **Get a value by key** -- Use `storage.get` to perform this operation
- **Check if a key exists** -- Use `storage.has` to perform this operation
- **Remove a key** -- Use `storage.remove` to perform this operation
- **List all keys, optionally filtered by pattern** -- Use `storage.keys` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create a named key-value store (memory or file-backed) | `{name, type, size}` |
| [`set`](#set) | Set a key-value pair with optional TTL | `True` |
| [`get`](#get) | Get a value by key | `Stored value or default` |
| [`has`](#has) | Check if a key exists | `True if key exists` |
| [`remove`](#remove) | Remove a key | `True if removed` |
| [`keys`](#keys) | List all keys, optionally filtered by pattern | `Array of key strings` |
| [`values`](#values) | Get all key-value pairs | `Array of {key, value}` |
| [`size`](#size) | Get number of entries | `Count` |
| [`clear`](#clear) | Remove all entries | `{cleared: count}` |
| [`increment`](#increment) | Increment a numeric value | `New value` |
| [`decrement`](#decrement) | Decrement a numeric value | `New value` |
| [`getAll`](#getall) | Get all data as a plain object | `Key-value object` |
| [`setMany`](#setmany) | Set multiple key-value pairs at once | `{set: count}` |
| [`destroy`](#destroy) | Destroy a store and delete its file if file-backed | `True if destroyed` |
| [`saveFile`](#savefile) | Save content to a file on disk | `{path, size}` |
| [`loadFile`](#loadfile) | Load a file from disk | `File content or null` |
| [`listFiles`](#listfiles) | List files in a directory | `Array of file info objects` |
| [`deleteFile`](#deletefile) | Delete a file from disk | `True if deleted` |


## Functions

### create

Create a named key-value store (memory or file-backed)

**Module:** `storage` | **Returns:** `object` -- {name, type, size}

```robinpath
storage.create "workflow-state" {"type": "file", "path": "./data/state.json"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Store name |
| `options` | `object` | No | {type: 'memory'|'file', path: string} |

---

### set

Set a key-value pair with optional TTL

**Module:** `storage` | **Returns:** `boolean` -- True

```robinpath
storage.set "state" "lastRun" $timestamp
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `store` | `string` | Yes | Store name |
| `key` | `string` | Yes | Key |
| `value` | `any` | Yes | Value |
| `ttlMs` | `number` | No | TTL in ms (optional) |

---

### get

Get a value by key

**Module:** `storage` | **Returns:** `any` -- Stored value or default

```robinpath
storage.get "state" "lastRun"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `store` | `string` | Yes | Store name |
| `key` | `string` | Yes | Key |
| `default` | `any` | No | Default if not found |

---

### has

Check if a key exists

**Module:** `storage` | **Returns:** `boolean` -- True if key exists

```robinpath
storage.has "state" "lastRun"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `store` | `string` | Yes | Store name |
| `key` | `string` | Yes | Key |

---

### remove

Remove a key

**Module:** `storage` | **Returns:** `boolean` -- True if removed

```robinpath
storage.remove "state" "lastRun"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `store` | `string` | Yes | Store name |
| `key` | `string` | Yes | Key |

---

### keys

List all keys, optionally filtered by pattern

**Module:** `storage` | **Returns:** `array` -- Array of key strings

```robinpath
storage.keys "state" "user:*"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `store` | `string` | Yes | Store name |
| `pattern` | `string` | No | Glob pattern (optional) |

---

### values

Get all key-value pairs

**Module:** `storage` | **Returns:** `array` -- Array of {key, value}

```robinpath
storage.values "state"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `store` | `string` | Yes | Store name |

---

### size

Get number of entries

**Module:** `storage` | **Returns:** `number` -- Count

```robinpath
storage.size "state"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `store` | `string` | Yes | Store name |

---

### clear

Remove all entries

**Module:** `storage` | **Returns:** `object` -- {cleared: count}

```robinpath
storage.clear "state"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `store` | `string` | Yes | Store name |

---

### increment

Increment a numeric value

**Module:** `storage` | **Returns:** `number` -- New value

```robinpath
storage.increment "state" "runCount"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `store` | `string` | Yes | Store name |
| `key` | `string` | Yes | Key |
| `amount` | `number` | No | Increment (default 1) |

---

### decrement

Decrement a numeric value

**Module:** `storage` | **Returns:** `number` -- New value

```robinpath
storage.decrement "state" "credits"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `store` | `string` | Yes | Store name |
| `key` | `string` | Yes | Key |
| `amount` | `number` | No | Decrement (default 1) |

---

### getAll

Get all data as a plain object

**Module:** `storage` | **Returns:** `object` -- Key-value object

```robinpath
storage.getAll "state"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `store` | `string` | Yes | Store name |

---

### setMany

Set multiple key-value pairs at once

**Module:** `storage` | **Returns:** `object` -- {set: count}

```robinpath
storage.setMany "state" {"user": "Alice", "role": "admin"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `store` | `string` | Yes | Store name |
| `data` | `object` | Yes | Key-value pairs |
| `ttlMs` | `number` | No | Optional TTL for all |

---

### destroy

Destroy a store and delete its file if file-backed

**Module:** `storage` | **Returns:** `boolean` -- True if destroyed

```robinpath
storage.destroy "state"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `store` | `string` | Yes | Store name |

---

### saveFile

Save content to a file on disk

**Module:** `storage` | **Returns:** `object` -- {path, size}

```robinpath
storage.saveFile "./output" "report.json" $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dir` | `string` | Yes | Directory path |
| `filename` | `string` | Yes | File name |
| `content` | `any` | Yes | String or JSON content |

---

### loadFile

Load a file from disk

**Module:** `storage` | **Returns:** `any` -- File content or null

```robinpath
storage.loadFile "./data/config.json" true
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | File path |
| `asJson` | `boolean` | No | Parse as JSON (default false) |

---

### listFiles

List files in a directory

**Module:** `storage` | **Returns:** `array` -- Array of file info objects

```robinpath
storage.listFiles "./output"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dir` | `string` | Yes | Directory path |

---

### deleteFile

Delete a file from disk

**Module:** `storage` | **Returns:** `boolean` -- True if deleted

```robinpath
storage.deleteFile "./output/old.json"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | File path |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Directory and filename are required` | Check the error message for details |
| `Store "..." not found. Create it first.` | Check the error message for details |

```robinpath
set $result as storage.create "workflow-state" {"type": "file", "path": "./data/state.json"}
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
set $result as storage.get "state" "lastRun"
each $item in $result
  print $item
end
```

### 2. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as storage.create "workflow-state" {"type": "file", "path": "./data/state.json"}
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as storage.get "state" "lastRun"
if $existing == null
  storage.create "workflow-state" {"type": "file", "path": "./data/state.json"}
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Storage workflow

Chain multiple storage operations together.

```robinpath
set $r_create as storage.create "workflow-state" {"type": "file", "path": "./data/state.json"}
set $r_get as storage.get "state" "lastRun"
set $r_has as storage.has "state" "lastRun"
print "All operations complete"
```

### 5. Safe create with validation

Check results before proceeding.

```robinpath
set $result as storage.create "workflow-state" {"type": "file", "path": "./data/state.json"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
