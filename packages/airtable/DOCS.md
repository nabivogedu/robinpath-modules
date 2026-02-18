---
title: "Airtable"
module: "airtable"
package: "@robinpath/airtable"
description: "Airtable module for RobinPath."
category: "productivity"
tags: [airtable, productivity]
type: "integration"
auth: "bearer-token"
functionCount: 16
baseUrl: "https://api.airtable.com/v0"
---

# Airtable

> Airtable module for RobinPath.

**Package:** `@robinpath/airtable` | **Category:** Productivity | **Type:** Integration


## Authentication

```robinpath
airtable.setToken "default" "patXXXXXXXXXXXXXX"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `airtable` module when you need to:

- **List all bases accessible by the configured token** -- Use `airtable.listBases` to perform this operation
- **Get the schema (tables and fields) for a base** -- Use `airtable.getBaseSchema` to perform this operation
- **List records from a table with optional filtering, sorting, and pagination** -- Use `airtable.listRecords` to perform this operation
- **Get a single record by ID** -- Use `airtable.getRecord` to perform this operation
- **Create a single record in a table** -- Use `airtable.createRecord` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setToken`](#settoken) | Store an Airtable personal access token for authentication | `{key, configured}` |
| [`listBases`](#listbases) | List all bases accessible by the configured token | `{bases, offset}` |
| [`getBaseSchema`](#getbaseschema) | Get the schema (tables and fields) for a base | `{tables} with field definitions` |
| [`listRecords`](#listrecords) | List records from a table with optional filtering, sorting, and pagination | `{records, offset}` |
| [`getRecord`](#getrecord) | Get a single record by ID | `Record object with id, fields, createdTime` |
| [`createRecord`](#createrecord) | Create a single record in a table | `Created record with id, fields, createdTime` |
| [`createRecords`](#createrecords) | Bulk create up to 10 records in a table | `{records} array of created records` |
| [`updateRecord`](#updaterecord) | Update a single record (PATCH - only updates specified fields) | `Updated record` |
| [`updateRecords`](#updaterecords) | Bulk update up to 10 records (PATCH) | `{records} array of updated records` |
| [`replaceRecord`](#replacerecord) | Replace a single record (PUT - clears unspecified fields) | `Replaced record` |
| [`deleteRecord`](#deleterecord) | Delete a single record by ID | `{id, deleted: true}` |
| [`deleteRecords`](#deleterecords) | Bulk delete up to 10 records by ID | `{records} array of {id, deleted}` |
| [`createTable`](#createtable) | Create a new table in a base with field definitions | `Created table object with id, name, fields` |
| [`updateTable`](#updatetable) | Update a table's name or description | `Updated table object` |
| [`createField`](#createfield) | Create a new field in a table | `Created field object with id, name, type` |
| [`updateField`](#updatefield) | Update a field's name or description | `Updated field object` |


## Functions

### setToken

Store an Airtable personal access token for authentication

**Module:** `airtable` | **Returns:** `object` -- {key, configured}

```robinpath
airtable.setToken "default" "patXXXXXXXXXXXXXX"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Token identifier (e.g. 'default') |
| `apiToken` | `string` | Yes | Airtable personal access token |

---

### listBases

List all bases accessible by the configured token

**Module:** `airtable` | **Returns:** `object` -- {bases, offset}

```robinpath
airtable.listBases "default"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Token identifier |
| `options` | `object` | No | {offset?} for pagination |

---

### getBaseSchema

Get the schema (tables and fields) for a base

**Module:** `airtable` | **Returns:** `object` -- {tables} with field definitions

```robinpath
airtable.getBaseSchema "default" "appABC123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Token identifier |
| `baseId` | `string` | Yes | Airtable base ID (e.g. 'appXXXXXXXXXXXXXX') |

---

### listRecords

List records from a table with optional filtering, sorting, and pagination

**Module:** `airtable` | **Returns:** `object` -- {records, offset}

```robinpath
airtable.listRecords "default" "appABC123" "Tasks" {"filterByFormula": "{Status}='Done'", "maxRecords": 50}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Token identifier |
| `baseId` | `string` | Yes | Base ID |
| `tableIdOrName` | `string` | Yes | Table ID or name |
| `options` | `object` | No | {filterByFormula?, sort?, fields?, maxRecords?, pageSize?, offset?, view?} |

---

### getRecord

Get a single record by ID

**Module:** `airtable` | **Returns:** `object` -- Record object with id, fields, createdTime

```robinpath
airtable.getRecord "default" "appABC123" "Tasks" "recDEF456"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Token identifier |
| `baseId` | `string` | Yes | Base ID |
| `tableIdOrName` | `string` | Yes | Table ID or name |
| `recordId` | `string` | Yes | Record ID (e.g. 'recXXXXXXXXXXXXXX') |

---

### createRecord

Create a single record in a table

**Module:** `airtable` | **Returns:** `object` -- Created record with id, fields, createdTime

```robinpath
airtable.createRecord "default" "appABC123" "Tasks" {"Name": "New task", "Status": "Todo"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Token identifier |
| `baseId` | `string` | Yes | Base ID |
| `tableIdOrName` | `string` | Yes | Table ID or name |
| `fields` | `object` | Yes | Field name-value pairs |

---

### createRecords

Bulk create up to 10 records in a table

**Module:** `airtable` | **Returns:** `object` -- {records} array of created records

```robinpath
airtable.createRecords "default" "appABC123" "Tasks" [{"fields": {"Name": "Task A"}}, {"fields": {"Name": "Task B"}}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Token identifier |
| `baseId` | `string` | Yes | Base ID |
| `tableIdOrName` | `string` | Yes | Table ID or name |
| `records` | `array` | Yes | Array of {fields: {...}} objects (max 10) |

---

### updateRecord

Update a single record (PATCH - only updates specified fields)

**Module:** `airtable` | **Returns:** `object` -- Updated record

```robinpath
airtable.updateRecord "default" "appABC123" "Tasks" "recDEF456" {"Status": "Done"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Token identifier |
| `baseId` | `string` | Yes | Base ID |
| `tableIdOrName` | `string` | Yes | Table ID or name |
| `recordId` | `string` | Yes | Record ID |
| `fields` | `object` | Yes | Field name-value pairs to update |

---

### updateRecords

Bulk update up to 10 records (PATCH)

**Module:** `airtable` | **Returns:** `object` -- {records} array of updated records

```robinpath
airtable.updateRecords "default" "appABC123" "Tasks" [{"id": "recDEF456", "fields": {"Status": "Done"}}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Token identifier |
| `baseId` | `string` | Yes | Base ID |
| `tableIdOrName` | `string` | Yes | Table ID or name |
| `records` | `array` | Yes | Array of {id, fields} objects (max 10) |

---

### replaceRecord

Replace a single record (PUT - clears unspecified fields)

**Module:** `airtable` | **Returns:** `object` -- Replaced record

```robinpath
airtable.replaceRecord "default" "appABC123" "Tasks" "recDEF456" {"Name": "Replaced", "Status": "New"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Token identifier |
| `baseId` | `string` | Yes | Base ID |
| `tableIdOrName` | `string` | Yes | Table ID or name |
| `recordId` | `string` | Yes | Record ID |
| `fields` | `object` | Yes | Complete field name-value pairs |

---

### deleteRecord

Delete a single record by ID

**Module:** `airtable` | **Returns:** `object` -- {id, deleted: true}

```robinpath
airtable.deleteRecord "default" "appABC123" "Tasks" "recDEF456"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Token identifier |
| `baseId` | `string` | Yes | Base ID |
| `tableIdOrName` | `string` | Yes | Table ID or name |
| `recordId` | `string` | Yes | Record ID |

---

### deleteRecords

Bulk delete up to 10 records by ID

**Module:** `airtable` | **Returns:** `object` -- {records} array of {id, deleted}

```robinpath
airtable.deleteRecords "default" "appABC123" "Tasks" ["recDEF456", "recGHI789"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Token identifier |
| `baseId` | `string` | Yes | Base ID |
| `tableIdOrName` | `string` | Yes | Table ID or name |
| `recordIds` | `array` | Yes | Array of record IDs (max 10) |

---

### createTable

Create a new table in a base with field definitions

**Module:** `airtable` | **Returns:** `object` -- Created table object with id, name, fields

```robinpath
airtable.createTable "default" "appABC123" "Projects" [{"name": "Name", "type": "singleLineText"}, {"name": "Status", "type": "singleSelect", "options": {"choices": [{"name": "Active"}, {"name": "Done"}]}}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Token identifier |
| `baseId` | `string` | Yes | Base ID |
| `name` | `string` | Yes | Table name |
| `fields` | `array` | Yes | Array of field definitions [{name, type, options?}] |

---

### updateTable

Update a table's name or description

**Module:** `airtable` | **Returns:** `object` -- Updated table object

```robinpath
airtable.updateTable "default" "appABC123" "tblXYZ" {"name": "Renamed Table", "description": "Updated description"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Token identifier |
| `baseId` | `string` | Yes | Base ID |
| `tableId` | `string` | Yes | Table ID |
| `options` | `object` | Yes | {name?, description?} |

---

### createField

Create a new field in a table

**Module:** `airtable` | **Returns:** `object` -- Created field object with id, name, type

```robinpath
airtable.createField "default" "appABC123" "tblXYZ" "Priority" "singleSelect" {"options": {"choices": [{"name": "High"}, {"name": "Low"}]}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Token identifier |
| `baseId` | `string` | Yes | Base ID |
| `tableId` | `string` | Yes | Table ID |
| `name` | `string` | Yes | Field name |
| `type` | `string` | Yes | Field type (e.g. singleLineText, number, singleSelect) |
| `options` | `object` | No | {description?, options?} field-type-specific options |

---

### updateField

Update a field's name or description

**Module:** `airtable` | **Returns:** `object` -- Updated field object

```robinpath
airtable.updateField "default" "appABC123" "tblXYZ" "fldABC" {"name": "Renamed Field", "description": "Updated desc"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Token identifier |
| `baseId` | `string` | Yes | Base ID |
| `tableId` | `string` | Yes | Table ID |
| `fieldId` | `string` | Yes | Field ID |
| `options` | `object` | Yes | {name?, description?} |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Airtable API ${method} ${path} failed (${response.status}): ${message}` | Check the error message for details |
| `API token is required` | Check the error message for details |
| `Base ID is required` | Check the error message for details |
| `Table ID or name is required` | Check the error message for details |
| `Record ID is required` | Check the error message for details |
| `Records must be an array` | Check the error message for details |
| `Bulk create supports up to 10 records at a time` | Check the error message for details |
| `Bulk update supports up to 10 records at a time` | Check the error message for details |

```robinpath
set $result as airtable.listBases "default"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Bases

Retrieve all items and loop through them.

```robinpath
airtable.setToken $token
set $result as airtable.listBases "default"
each $item in $result
  print $item
end
```

### 2. Create a new item with createRecord

Create a new resource and capture the result.

```robinpath
airtable.setToken $token
set $result as airtable.createRecord "default" "appABC123" "Tasks" {"Name": "New task", "Status": "Todo"}
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
airtable.setToken $token
set $created as airtable.createRecord "default" "appABC123" "Tasks" {"Name": "New task", "Status": "Todo"}
# Update the created item
airtable.updateRecord "default" "appABC123" "Tasks" "recDEF456" {"Status": "Done"}
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
airtable.setToken $token
set $existing as airtable.listBases "default"
if $existing == null
  airtable.createRecord "default" "appABC123" "Tasks" {"Name": "New task", "Status": "Todo"}
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Airtable workflow

Chain multiple airtable operations together.

```robinpath
airtable.setToken $token
set $r_listBases as airtable.listBases "default"
set $r_getBaseSchema as airtable.getBaseSchema "default" "appABC123"
set $r_listRecords as airtable.listRecords "default" "appABC123" "Tasks" {"filterByFormula": "{Status}='Done'", "maxRecords": 50}
print "All operations complete"
```

### 6. Safe listBases with validation

Check results before proceeding.

```robinpath
airtable.setToken $token
set $result as airtable.listBases "default"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **google-sheets** -- Google Sheets module for complementary functionality
- **google-calendar** -- Google Calendar module for complementary functionality
- **google-contacts** -- Google Contacts module for complementary functionality
- **google-forms** -- Google Forms module for complementary functionality
- **gmail** -- Gmail module for complementary functionality
