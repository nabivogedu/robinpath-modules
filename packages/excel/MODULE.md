---
title: "Excel"
module: "excel"
package: "@robinpath/excel"
description: "Read, write, and manipulate Excel spreadsheets (.xlsx) with sheets, cells, JSON/CSV conversion"
category: "documents"
tags: [excel, documents]
type: "integration"
auth: "none"
functionCount: 9
---

# Excel

> Read, write, and manipulate Excel spreadsheets (.xlsx) with sheets, cells, JSON/CSV conversion

**Package:** `@robinpath/excel` | **Category:** Documents | **Type:** Integration


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `excel` module when you need to:

- **Read an Excel file into an array of row objects** -- Use `excel.read` to perform this operation
- **Write an array of objects to an Excel file** -- Use `excel.write` to perform this operation
- **List all sheet names in an Excel file** -- Use `excel.readSheetNames` to perform this operation
- **Add a new sheet with data to an existing Excel file** -- Use `excel.addSheet` to perform this operation
- **Convert an Excel file to JSON (shortcut for read().rows)** -- Use `excel.toJson` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`read`](#read) | Read an Excel file into an array of row objects | `{rows, headers, sheetName, rowCount}` |
| [`write`](#write) | Write an array of objects to an Excel file | `{path, rows, columns}` |
| [`readSheetNames`](#readsheetnames) | List all sheet names in an Excel file | `Array of sheet name strings` |
| [`addSheet`](#addsheet) | Add a new sheet with data to an existing Excel file | `{path, sheet, rows}` |
| [`toJson`](#tojson) | Convert an Excel file to JSON (shortcut for read().rows) | `Array of row objects` |
| [`fromJson`](#fromjson) | Create an Excel file from JSON data | `{path, rows, columns}` |
| [`toCsv`](#tocsv) | Convert an Excel file to CSV string | `CSV string` |
| [`getCell`](#getcell) | Get a specific cell value | `{value, formula, type}` |
| [`setCell`](#setcell) | Set a specific cell value | `True` |


## Functions

### read

Read an Excel file into an array of row objects

**Module:** `excel` | **Returns:** `object` -- {rows, headers, sheetName, rowCount}

```robinpath
excel.read "./data.xlsx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to .xlsx file |
| `options` | `object` | No | {sheet, headers} |

---

### write

Write an array of objects to an Excel file

**Module:** `excel` | **Returns:** `object` -- {path, rows, columns}

```robinpath
excel.write "./output.xlsx" $data {"sheetName": "Users"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Output path |
| `data` | `array` | Yes | Array of row objects |
| `options` | `object` | No | {sheetName, colWidth, headerColor, autoFilter} |

---

### readSheetNames

List all sheet names in an Excel file

**Module:** `excel` | **Returns:** `array` -- Array of sheet name strings

```robinpath
excel.readSheetNames "./data.xlsx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to .xlsx file |

---

### addSheet

Add a new sheet with data to an existing Excel file

**Module:** `excel` | **Returns:** `object` -- {path, sheet, rows}

```robinpath
excel.addSheet "./data.xlsx" "Summary" $summaryData
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to .xlsx file |
| `sheetName` | `string` | Yes | New sheet name |
| `data` | `array` | No | Row data |

---

### toJson

Convert an Excel file to JSON (shortcut for read().rows)

**Module:** `excel` | **Returns:** `array` -- Array of row objects

```robinpath
excel.toJson "./data.xlsx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to .xlsx file |

---

### fromJson

Create an Excel file from JSON data

**Module:** `excel` | **Returns:** `object` -- {path, rows, columns}

```robinpath
excel.fromJson "./output.xlsx" $jsonData
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Output path |
| `data` | `any` | Yes | JSON array or string |

---

### toCsv

Convert an Excel file to CSV string

**Module:** `excel` | **Returns:** `string` -- CSV string

```robinpath
excel.toCsv "./data.xlsx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to .xlsx file |

---

### getCell

Get a specific cell value

**Module:** `excel` | **Returns:** `object` -- {value, formula, type}

```robinpath
excel.getCell "./data.xlsx" "B2"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to .xlsx file |
| `cell` | `string` | Yes | Cell reference (e.g. 'A1') |
| `sheet` | `string` | No | Sheet name (optional) |

---

### setCell

Set a specific cell value

**Module:** `excel` | **Returns:** `boolean` -- True

```robinpath
excel.setCell "./data.xlsx" "A1" "Hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to .xlsx file |
| `cell` | `string` | Yes | Cell reference |
| `value` | `any` | Yes | Cell value |
| `sheet` | `string` | No | Sheet name (optional) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Sheet "..." not found` | Check the error message for details |

```robinpath
set $result as excel.read "./data.xlsx"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Cell

Retrieve all items and loop through them.

```robinpath
set $result as excel.getCell "./data.xlsx" "B2"
each $item in $result
  print $item
end
```

### 2. Create a new item with addSheet

Create a new resource and capture the result.

```robinpath
set $result as excel.addSheet "./data.xlsx" "Summary" $summaryData
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as excel.getCell "./data.xlsx" "B2"
if $existing == null
  excel.addSheet "./data.xlsx" "Summary" $summaryData
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Excel workflow

Chain multiple excel operations together.

```robinpath
set $r_read as excel.read "./data.xlsx"
set $r_write as excel.write "./output.xlsx" $data {"sheetName": "Users"}
set $r_readSheetNames as excel.readSheetNames "./data.xlsx"
print "All operations complete"
```

### 5. Safe read with validation

Check results before proceeding.

```robinpath
set $result as excel.read "./data.xlsx"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **pdf** -- PDF module for complementary functionality
- **office** -- Office module for complementary functionality
- **docusign** -- DocuSign module for complementary functionality
- **pandadoc** -- PandaDoc module for complementary functionality
- **hellosign** -- HelloSign module for complementary functionality
