---
title: "Ini"
module: "ini"
package: "@robinpath/ini"
description: "Parse, stringify, read, and write INI configuration files"
category: "utility"
tags: [ini, utility]
type: "utility"
auth: "none"
functionCount: 10
---

# Ini

> Parse, stringify, read, and write INI configuration files

**Package:** `@robinpath/ini` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `ini` module when you need to:

- **Parse an INI string to object** -- Use `ini.parse` to perform this operation
- **Convert object to INI string** -- Use `ini.stringify` to perform this operation
- **Read and parse an INI file** -- Use `ini.parseFile` to perform this operation
- **Write object as INI to file** -- Use `ini.writeFile` to perform this operation
- **Get value by section and key from INI string** -- Use `ini.get` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`parse`](#parse) | Parse an INI string to object | `Nested object with sections` |
| [`stringify`](#stringify) | Convert object to INI string | `INI format string` |
| [`parseFile`](#parsefile) | Read and parse an INI file | `Parsed INI object` |
| [`writeFile`](#writefile) | Write object as INI to file | `True on success` |
| [`get`](#get) | Get value by section and key from INI string | `Value or null` |
| [`set`](#set) | Set value by section and key, return updated INI | `Updated INI string` |
| [`getSections`](#getsections) | Get all section names | `Array of section names` |
| [`getKeys`](#getkeys) | Get all keys in a section | `Array of keys` |
| [`removeSection`](#removesection) | Remove a section from INI string | `Updated INI string` |
| [`removeKey`](#removekey) | Remove a key from a section | `Updated INI string` |


## Functions

### parse

Parse an INI string to object

**Module:** `ini` | **Returns:** `object` -- Nested object with sections

```robinpath
ini.parse "[db]\nhost=localhost"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `iniString` | `string` | Yes | INI format string |

---

### stringify

Convert object to INI string

**Module:** `ini` | **Returns:** `string` -- INI format string

```robinpath
ini.stringify $config
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `object` | Yes | Object with sections |

---

### parseFile

Read and parse an INI file

**Module:** `ini` | **Returns:** `object` -- Parsed INI object

```robinpath
ini.parseFile "config.ini"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to INI file |

---

### writeFile

Write object as INI to file

**Module:** `ini` | **Returns:** `boolean` -- True on success

```robinpath
ini.writeFile "config.ini" $obj
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Output file path |
| `obj` | `object` | Yes | Object to write |

---

### get

Get value by section and key from INI string

**Module:** `ini` | **Returns:** `string` -- Value or null

```robinpath
ini.get $ini "database" "host"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `iniString` | `string` | Yes | INI string |
| `section` | `string` | Yes | Section name |
| `key` | `string` | Yes | Key name |

---

### set

Set value by section and key, return updated INI

**Module:** `ini` | **Returns:** `string` -- Updated INI string

```robinpath
ini.set $ini "database" "port" "5432"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `iniString` | `string` | Yes | INI string |
| `section` | `string` | Yes | Section name |
| `key` | `string` | Yes | Key name |
| `value` | `string` | Yes | Value |

---

### getSections

Get all section names

**Module:** `ini` | **Returns:** `array` -- Array of section names

```robinpath
ini.getSections $ini
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `iniString` | `string` | Yes | INI string |

---

### getKeys

Get all keys in a section

**Module:** `ini` | **Returns:** `array` -- Array of keys

```robinpath
ini.getKeys $ini "database"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `iniString` | `string` | Yes | INI string |
| `section` | `string` | Yes | Section name |

---

### removeSection

Remove a section from INI string

**Module:** `ini` | **Returns:** `string` -- Updated INI string

```robinpath
ini.removeSection $ini "old_section"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `iniString` | `string` | Yes | INI string |
| `section` | `string` | Yes | Section to remove |

---

### removeKey

Remove a key from a section

**Module:** `ini` | **Returns:** `string` -- Updated INI string

```robinpath
ini.removeKey $ini "database" "old_key"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `iniString` | `string` | Yes | INI string |
| `section` | `string` | Yes | Section name |
| `key` | `string` | Yes | Key to remove |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as ini.parse "[db]\nhost=localhost"
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
set $result as ini.get $ini "database" "host"
each $item in $result
  print $item
end
```

### 2. Multi-step Ini workflow

Chain multiple ini operations together.

```robinpath
set $r_parse as ini.parse "[db]\nhost=localhost"
set $r_stringify as ini.stringify $config
set $r_parseFile as ini.parseFile "config.ini"
print "All operations complete"
```

### 3. Safe parse with validation

Check results before proceeding.

```robinpath
set $result as ini.parse "[db]\nhost=localhost"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
