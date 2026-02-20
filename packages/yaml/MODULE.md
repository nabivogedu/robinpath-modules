---
title: "YAML"
module: "yaml"
package: "@robinpath/yaml"
description: "Parse, stringify, and manipulate YAML data"
category: "utility"
tags: [yaml, utility]
type: "utility"
auth: "none"
functionCount: 9
---

# YAML

> Parse, stringify, and manipulate YAML data

**Package:** `@robinpath/yaml` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `yaml` module when you need to:

- **Parse a YAML string into a JavaScript object, array, or value** -- Use `yaml.parse` to perform this operation
- **Convert a JavaScript value into a YAML string** -- Use `yaml.stringify` to perform this operation
- **Read and parse a YAML file from disk** -- Use `yaml.parseFile` to perform this operation
- **Write a value as YAML to a file on disk** -- Use `yaml.writeFile` to perform this operation
- **Parse a multi-document YAML string into an array of documents** -- Use `yaml.parseAll` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`parse`](#parse) | Parse a YAML string into a JavaScript object, array, or value | `Parsed JavaScript value (object, array, string, number, etc.)` |
| [`stringify`](#stringify) | Convert a JavaScript value into a YAML string | `YAML formatted string` |
| [`parseFile`](#parsefile) | Read and parse a YAML file from disk | `Parsed JavaScript value from the YAML file` |
| [`writeFile`](#writefile) | Write a value as YAML to a file on disk | `true on successful write` |
| [`parseAll`](#parseall) | Parse a multi-document YAML string into an array of documents | `Array of parsed documents` |
| [`isValid`](#isvalid) | Check whether a string is valid YAML | `true if the string is valid YAML, false otherwise` |
| [`get`](#get) | Parse YAML and retrieve a nested value by dot-path | `The value at the specified path, or undefined if not found` |
| [`toJSON`](#tojson) | Convert a YAML string to a JSON string | `JSON string representation of the YAML data` |
| [`fromJSON`](#fromjson) | Convert a JSON string to a YAML string | `YAML string representation of the JSON data` |


## Functions

### parse

Parse a YAML string into a JavaScript object, array, or value

**Module:** `yaml` | **Returns:** `any` -- Parsed JavaScript value (object, array, string, number, etc.)

```robinpath
yaml.parse "name: Alice\nage: 30"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `yamlString` | `string` | Yes | The YAML string to parse |

---

### stringify

Convert a JavaScript value into a YAML string

**Module:** `yaml` | **Returns:** `string` -- YAML formatted string

```robinpath
yaml.stringify $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | The value to convert to YAML |
| `indent` | `number` | No | Number of spaces for indentation (default: 2) |

---

### parseFile

Read and parse a YAML file from disk

**Module:** `yaml` | **Returns:** `any` -- Parsed JavaScript value from the YAML file

```robinpath
yaml.parseFile "config.yaml"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to the YAML file to read |

---

### writeFile

Write a value as YAML to a file on disk

**Module:** `yaml` | **Returns:** `boolean` -- true on successful write

```robinpath
yaml.writeFile "output.yaml" $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to the file to write |
| `value` | `any` | Yes | The value to serialize as YAML |
| `indent` | `number` | No | Number of spaces for indentation (default: 2) |

---

### parseAll

Parse a multi-document YAML string into an array of documents

**Module:** `yaml` | **Returns:** `array` -- Array of parsed documents

```robinpath
yaml.parseAll "---\nname: Alice\n---\nname: Bob"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `yamlString` | `string` | Yes | Multi-document YAML string (documents separated by ---) |

---

### isValid

Check whether a string is valid YAML

**Module:** `yaml` | **Returns:** `boolean` -- true if the string is valid YAML, false otherwise

```robinpath
yaml.isValid "key: value"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `yamlString` | `string` | Yes | The YAML string to validate |

---

### get

Parse YAML and retrieve a nested value by dot-path

**Module:** `yaml` | **Returns:** `any` -- The value at the specified path, or undefined if not found

```robinpath
yaml.get "database:\n  host: localhost" "database.host"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `yamlString` | `string` | Yes | The YAML string to parse |
| `dotPath` | `string` | Yes | Dot-separated path to the desired value (e.g. "database.host") |

---

### toJSON

Convert a YAML string to a JSON string

**Module:** `yaml` | **Returns:** `string` -- JSON string representation of the YAML data

```robinpath
yaml.toJSON "name: Alice\nage: 30"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `yamlString` | `string` | Yes | The YAML string to convert |

---

### fromJSON

Convert a JSON string to a YAML string

**Module:** `yaml` | **Returns:** `string` -- YAML string representation of the JSON data

```robinpath
yaml.fromJSON '{"name":"Alice","age":30}'
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `jsonString` | `string` | Yes | The JSON string to convert |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as yaml.parse "name: Alice\nage: 30"
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
set $result as yaml.get "database:\n  host: localhost" "database.host"
each $item in $result
  print $item
end
```

### 2. Multi-step YAML workflow

Chain multiple yaml operations together.

```robinpath
set $r_parse as yaml.parse "name: Alice\nage: 30"
set $r_stringify as yaml.stringify $data
set $r_parseFile as yaml.parseFile "config.yaml"
print "All operations complete"
```

### 3. Safe parse with validation

Check results before proceeding.

```robinpath
set $result as yaml.parse "name: Alice\nage: 30"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
