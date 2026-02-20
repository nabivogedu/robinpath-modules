---
title: "JSON"
module: "json"
package: "@robinpath/json"
description: "JSON manipulation: parse, stringify, deep merge, flatten, unflatten, diff, query by path, pick, and omit"
category: "utility"
tags: [json, utility]
type: "utility"
auth: "none"
functionCount: 13
---

# JSON

> JSON manipulation: parse, stringify, deep merge, flatten, unflatten, diff, query by path, pick, and omit

**Package:** `@robinpath/json` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `json` module when you need to:

- **Parse a JSON string into an object** -- Use `json.parse` to perform this operation
- **Convert a value to a JSON string** -- Use `json.stringify` to perform this operation
- **Get a nested value by dot-separated path** -- Use `json.get` to perform this operation
- **Deep merge two or more objects** -- Use `json.merge` to perform this operation
- **Flatten a nested object to dot-notation keys** -- Use `json.flatten` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`parse`](#parse) | Parse a JSON string into an object | `Parsed JavaScript value` |
| [`stringify`](#stringify) | Convert a value to a JSON string | `JSON string` |
| [`get`](#get) | Get a nested value by dot-separated path | `Value at the path` |
| [`set`](#set) | Set a nested value by dot-separated path, returning a new object | `New object with the value set` |
| [`merge`](#merge) | Deep merge two or more objects | `Merged object` |
| [`flatten`](#flatten) | Flatten a nested object to dot-notation keys | `Flat object with dot-notation keys` |
| [`unflatten`](#unflatten) | Unflatten dot-notation keys back to a nested object | `Nested object` |
| [`diff`](#diff) | Compare two objects and return differences | `Array of {path, oldValue, newValue}` |
| [`clone`](#clone) | Deep clone an object | `Deep cloned value` |
| [`isValid`](#isvalid) | Check if a string is valid JSON | `True if valid JSON` |
| [`keys`](#keys) | Get all keys including nested paths with dot notation | `Array of all key paths` |
| [`pick`](#pick) | Pick specific keys from an object | `Object with only picked keys` |
| [`omit`](#omit) | Omit specific keys from an object | `Object without omitted keys` |


## Functions

### parse

Parse a JSON string into an object

**Module:** `json` | **Returns:** `object` -- Parsed JavaScript value

```robinpath
json.parse '{"name":"Alice"}'
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `jsonString` | `string` | Yes | JSON string to parse |

---

### stringify

Convert a value to a JSON string

**Module:** `json` | **Returns:** `string` -- JSON string

```robinpath
json.stringify $obj
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to stringify |
| `indent` | `number` | No | Indentation spaces (default: 2) |

---

### get

Get a nested value by dot-separated path

**Module:** `json` | **Returns:** `any` -- Value at the path

```robinpath
json.get $obj "user.name"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `object` | Yes | Source object |
| `path` | `string` | Yes | Dot-separated path (e.g. user.name) |

---

### set

Set a nested value by dot-separated path, returning a new object

**Module:** `json` | **Returns:** `object` -- New object with the value set

```robinpath
json.set $obj "user.name" "Bob"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `object` | Yes | Source object |
| `path` | `string` | Yes | Dot-separated path |
| `value` | `any` | Yes | Value to set |

---

### merge

Deep merge two or more objects

**Module:** `json` | **Returns:** `object` -- Merged object

```robinpath
json.merge $obj1 $obj2
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `objects` | `object` | Yes | Objects to merge (pass multiple args) |

---

### flatten

Flatten a nested object to dot-notation keys

**Module:** `json` | **Returns:** `object` -- Flat object with dot-notation keys

```robinpath
json.flatten $obj
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `object` | Yes | Object to flatten |

---

### unflatten

Unflatten dot-notation keys back to a nested object

**Module:** `json` | **Returns:** `object` -- Nested object

```robinpath
json.unflatten $flat
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `object` | Yes | Flat object with dot-notation keys |

---

### diff

Compare two objects and return differences

**Module:** `json` | **Returns:** `array` -- Array of {path, oldValue, newValue}

```robinpath
json.diff $obj1 $obj2
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `a` | `object` | Yes | First object |
| `b` | `object` | Yes | Second object |

---

### clone

Deep clone an object

**Module:** `json` | **Returns:** `any` -- Deep cloned value

```robinpath
json.clone $obj
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `any` | Yes | Value to clone |

---

### isValid

Check if a string is valid JSON

**Module:** `json` | **Returns:** `boolean` -- True if valid JSON

```robinpath
json.isValid '{"a":1}'
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | String to check |

---

### keys

Get all keys including nested paths with dot notation

**Module:** `json` | **Returns:** `array` -- Array of all key paths

```robinpath
json.keys $obj
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `object` | Yes | Source object |

---

### pick

Pick specific keys from an object

**Module:** `json` | **Returns:** `object` -- Object with only picked keys

```robinpath
json.pick $obj ["name", "age"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `object` | Yes | Source object |
| `keys` | `array` | Yes | Array of keys to pick |

---

### omit

Omit specific keys from an object

**Module:** `json` | **Returns:** `object` -- Object without omitted keys

```robinpath
json.omit $obj ["password"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `object` | Yes | Source object |
| `keys` | `array` | Yes | Array of keys to omit |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as json.parse '{"name":"Alice"}'
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
set $result as json.get $obj "user.name"
each $item in $result
  print $item
end
```

### 2. Multi-step JSON workflow

Chain multiple json operations together.

```robinpath
set $r_parse as json.parse '{"name":"Alice"}'
set $r_stringify as json.stringify $obj
set $r_get as json.get $obj "user.name"
print "All operations complete"
```

### 3. Safe parse with validation

Check results before proceeding.

```robinpath
set $result as json.parse '{"name":"Alice"}'
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

