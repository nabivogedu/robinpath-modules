---
title: "Dotenv"
module: "dotenv"
package: "@robinpath/dotenv"
description: "Secure .env file management with key validation, path restrictions, and protected system variables"
category: "utility"
tags: [dotenv, utility]
type: "utility"
auth: "none"
functionCount: 10
---

# Dotenv

> Secure .env file management with key validation, path restrictions, and protected system variables

**Package:** `@robinpath/dotenv` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `dotenv` module when you need to:

- **Parse a .env format string into an object** -- Use `dotenv.parse` to perform this operation
- **Convert an object to .env format string** -- Use `dotenv.stringify` to perform this operation
- **Read a .env file and load values into process.env (won't override existing or protected vars by default)** -- Use `dotenv.load` to perform this operation
- **Read a .env file and return as object without modifying process.env** -- Use `dotenv.read` to perform this operation
- **Get a value from a .env file by key** -- Use `dotenv.get` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`parse`](#parse) | Parse a .env format string into an object | `Key-value object` |
| [`stringify`](#stringify) | Convert an object to .env format string | `.env format string` |
| [`load`](#load) | Read a .env file and load values into process.env (won't override existing or protected vars by default) | `Actually loaded key-value pairs` |
| [`read`](#read) | Read a .env file and return as object without modifying process.env | `Key-value object` |
| [`get`](#get) | Get a value from a .env file by key | `Value or null` |
| [`set`](#set) | Set a key=value in a .env file | `True on success` |
| [`remove`](#remove) | Remove a key from a .env file | `True on success` |
| [`exists`](#exists) | Check if a .env file exists | `True if exists` |
| [`keys`](#keys) | Return all keys from a .env file | `Array of key strings` |
| [`expand`](#expand) | Expand variable references like ${VAR} in values (process.env fallback disabled by default) | `Object with expanded values` |


## Functions

### parse

Parse a .env format string into an object

**Module:** `dotenv` | **Returns:** `object` -- Key-value object

```robinpath
dotenv.parse "KEY=value"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `content` | `string` | Yes | .env format string |

---

### stringify

Convert an object to .env format string

**Module:** `dotenv` | **Returns:** `string` -- .env format string

```robinpath
dotenv.stringify $vars
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `object` | Yes | Key-value object |

---

### load

Read a .env file and load values into process.env (won't override existing or protected vars by default)

**Module:** `dotenv` | **Returns:** `object` -- Actually loaded key-value pairs

```robinpath
dotenv.load ".env"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | No | Path to .env file (must be a .env file) |
| `override` | `boolean` | No | Set true to override existing vars (default: false) |

---

### read

Read a .env file and return as object without modifying process.env

**Module:** `dotenv` | **Returns:** `object` -- Key-value object

```robinpath
dotenv.read ".env.local"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | No | Path to .env file |

---

### get

Get a value from a .env file by key

**Module:** `dotenv` | **Returns:** `string` -- Value or null

```robinpath
dotenv.get ".env" "DATABASE_URL"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to .env file |
| `key` | `string` | Yes | Key to look up |

---

### set

Set a key=value in a .env file

**Module:** `dotenv` | **Returns:** `boolean` -- True on success

```robinpath
dotenv.set ".env" "PORT" "3000"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to .env file |
| `key` | `string` | Yes | Key to set (must match [A-Za-z_][A-Za-z0-9_]*) |
| `value` | `string` | Yes | Value to set |

---

### remove

Remove a key from a .env file

**Module:** `dotenv` | **Returns:** `boolean` -- True on success

```robinpath
dotenv.remove ".env" "OLD_KEY"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to .env file |
| `key` | `string` | Yes | Key to remove |

---

### exists

Check if a .env file exists

**Module:** `dotenv` | **Returns:** `boolean` -- True if exists

```robinpath
dotenv.exists ".env.local"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | No | Path to check (must be a .env file) |

---

### keys

Return all keys from a .env file

**Module:** `dotenv` | **Returns:** `array` -- Array of key strings

```robinpath
dotenv.keys ".env"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | No | Path to .env file |

---

### expand

Expand variable references like ${VAR} in values (process.env fallback disabled by default)

**Module:** `dotenv` | **Returns:** `object` -- Object with expanded values

```robinpath
dotenv.expand $vars
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `vars` | `object` | Yes | Key-value object with variable references |
| `useProcessEnv` | `boolean` | No | Allow fallback to process.env for unresolved vars (default: false) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Key cannot be empty` | Check the error message for details |
| `Invalid key: "...". Must match /^[A-Za-z_][A-Za-z0-9_]*$/` | Check the error message for details |
| `File path must be a .env file (got: "..."). Use files like .env, .env.local, production.env` | Check the error message for details |

```robinpath
set $result as dotenv.parse "KEY=value"
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
set $result as dotenv.get ".env" "DATABASE_URL"
each $item in $result
  print $item
end
```

### 2. Multi-step Dotenv workflow

Chain multiple dotenv operations together.

```robinpath
set $r_parse as dotenv.parse "KEY=value"
set $r_stringify as dotenv.stringify $vars
set $r_load as dotenv.load ".env"
print "All operations complete"
```

### 3. Safe parse with validation

Check results before proceeding.

```robinpath
set $result as dotenv.parse "KEY=value"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
