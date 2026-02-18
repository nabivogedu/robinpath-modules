---
title: "Toml"
module: "toml"
package: "@robinpath/toml"
description: "Parse, stringify, and manipulate TOML configuration files"
category: "utility"
tags: [toml, utility]
type: "utility"
auth: "none"
functionCount: 8
---

# Toml

> Parse, stringify, and manipulate TOML configuration files

**Package:** `@robinpath/toml` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `toml` module when you need to:

- **Parse a TOML string to object** -- Use `toml.parse` to perform this operation
- **Convert object to TOML string** -- Use `toml.stringify` to perform this operation
- **Read and parse a TOML file** -- Use `toml.parseFile` to perform this operation
- **Write object as TOML to file** -- Use `toml.writeFile` to perform this operation
- **Get nested value by dot path from TOML string** -- Use `toml.get` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`parse`](#parse) | Parse a TOML string to object | `Parsed object` |
| [`stringify`](#stringify) | Convert object to TOML string | `TOML string` |
| [`parseFile`](#parsefile) | Read and parse a TOML file | `Parsed object` |
| [`writeFile`](#writefile) | Write object as TOML to file | `True on success` |
| [`get`](#get) | Get nested value by dot path from TOML string | `Value at path` |
| [`isValid`](#isvalid) | Check if string is valid TOML | `True if valid TOML` |
| [`toJSON`](#tojson) | Convert TOML string to JSON string | `JSON string` |
| [`fromJSON`](#fromjson) | Convert JSON string to TOML string | `TOML string` |


## Functions

### parse

Parse a TOML string to object

**Module:** `toml` | **Returns:** `object` -- Parsed object

```robinpath
toml.parse "title = \"My App\""
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tomlString` | `string` | Yes | TOML string |

---

### stringify

Convert object to TOML string

**Module:** `toml` | **Returns:** `string` -- TOML string

```robinpath
toml.stringify $config
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `object` | Yes | Object to convert |

---

### parseFile

Read and parse a TOML file

**Module:** `toml` | **Returns:** `object` -- Parsed object

```robinpath
toml.parseFile "config.toml"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to TOML file |

---

### writeFile

Write object as TOML to file

**Module:** `toml` | **Returns:** `boolean` -- True on success

```robinpath
toml.writeFile "config.toml" $obj
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Output file path |
| `obj` | `object` | Yes | Object to write |

---

### get

Get nested value by dot path from TOML string

**Module:** `toml` | **Returns:** `any` -- Value at path

```robinpath
toml.get $toml "database.host"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tomlString` | `string` | Yes | TOML string |
| `path` | `string` | Yes | Dot-separated path |

---

### isValid

Check if string is valid TOML

**Module:** `toml` | **Returns:** `boolean` -- True if valid TOML

```robinpath
toml.isValid "key = 1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | String to check |

---

### toJSON

Convert TOML string to JSON string

**Module:** `toml` | **Returns:** `string` -- JSON string

```robinpath
toml.toJSON $toml
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tomlString` | `string` | Yes | TOML string |

---

### fromJSON

Convert JSON string to TOML string

**Module:** `toml` | **Returns:** `string` -- TOML string

```robinpath
toml.fromJSON $json
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `jsonString` | `string` | Yes | JSON string |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as toml.parse "title = \"My App\""
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
set $result as toml.get $toml "database.host"
each $item in $result
  print $item
end
```

### 2. Multi-step Toml workflow

Chain multiple toml operations together.

```robinpath
set $r_parse as toml.parse "title = \"My App\""
set $r_stringify as toml.stringify $config
set $r_parseFile as toml.parseFile "config.toml"
print "All operations complete"
```

### 3. Safe parse with validation

Check results before proceeding.

```robinpath
set $result as toml.parse "title = \"My App\""
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
