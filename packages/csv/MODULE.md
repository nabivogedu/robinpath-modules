---
title: "CSV"
module: "csv"
package: "@robinpath/csv"
description: "Parse and stringify CSV data"
category: "utility"
tags: [csv, utility]
type: "utility"
auth: "none"
functionCount: 5
---

# CSV

> Parse and stringify CSV data

**Package:** `@robinpath/csv` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `csv` module when you need to:

- **Parse a CSV string into an array of objects (first row = headers)** -- Use `csv.parse` to perform this operation
- **Convert an array of objects into a CSV string** -- Use `csv.stringify` to perform this operation
- **Extract header names from a CSV string** -- Use `csv.headers` to perform this operation
- **Extract all values from a specific column** -- Use `csv.column` to perform this operation
- **Parse a CSV string into an array of arrays (raw, no header mapping)** -- Use `csv.rows` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`parse`](#parse) | Parse a CSV string into an array of objects (first row = headers) | `Array of objects where keys are header names` |
| [`stringify`](#stringify) | Convert an array of objects into a CSV string | `CSV formatted string` |
| [`headers`](#headers) | Extract header names from a CSV string | `Array of header name strings` |
| [`column`](#column) | Extract all values from a specific column | `Array of values from the specified column` |
| [`rows`](#rows) | Parse a CSV string into an array of arrays (raw, no header mapping) | `Array of arrays (each inner array is a row of strings)` |


## Functions

### parse

Parse a CSV string into an array of objects (first row = headers)

**Module:** `csv` | **Returns:** `array` -- Array of objects where keys are header names

```robinpath
csv.parse "name,age\nAlice,30\nBob,25"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `csvString` | `string` | Yes | The CSV string to parse |
| `delimiter` | `string` | No | Column delimiter (default: comma) |

---

### stringify

Convert an array of objects into a CSV string

**Module:** `csv` | **Returns:** `string` -- CSV formatted string

```robinpath
csv.stringify $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `array` | Yes | Array of objects to convert |
| `delimiter` | `string` | No | Column delimiter (default: comma) |

---

### headers

Extract header names from a CSV string

**Module:** `csv` | **Returns:** `array` -- Array of header name strings

```robinpath
csv.headers "name,age\nAlice,30"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `csvString` | `string` | Yes | The CSV string |

---

### column

Extract all values from a specific column

**Module:** `csv` | **Returns:** `array` -- Array of values from the specified column

```robinpath
csv.column "name,age\nAlice,30" "name"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `csvString` | `string` | Yes | The CSV string |
| `columnName` | `string` | Yes | Name of the column to extract |

---

### rows

Parse a CSV string into an array of arrays (raw, no header mapping)

**Module:** `csv` | **Returns:** `array` -- Array of arrays (each inner array is a row of strings)

```robinpath
csv.rows "name,age\nAlice,30"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `csvString` | `string` | Yes | The CSV string to parse |
| `delimiter` | `string` | No | Column delimiter (default: comma) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as csv.parse "name,age\nAlice,30\nBob,25"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step CSV workflow

Chain multiple csv operations together.

```robinpath
set $r_parse as csv.parse "name,age\nAlice,30\nBob,25"
set $r_stringify as csv.stringify $data
set $r_headers as csv.headers "name,age\nAlice,30"
print "All operations complete"
```

### 2. Safe parse with validation

Check results before proceeding.

```robinpath
set $result as csv.parse "name,age\nAlice,30\nBob,25"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
