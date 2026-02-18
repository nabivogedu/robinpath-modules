---
title: "Google Sheets"
module: "google-sheets"
package: "@robinpath/google-sheets"
description: "Google Sheets module for RobinPath."
category: "productivity"
tags: [googlesheets, productivity]
type: "integration"
auth: "api-key"
functionCount: 10
---

# Google Sheets

> Google Sheets module for RobinPath.

**Package:** `@robinpath/google-sheets` | **Category:** Productivity | **Type:** Integration


## Authentication

```robinpath
googleSheets.setCredentials "ya29.xxx"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `google-sheets` module when you need to:

- **Read values from a spreadsheet range.** -- Use `google-sheets.getValues` to perform this operation
- **Append a row of values to a spreadsheet.** -- Use `google-sheets.appendRow` to perform this operation
- **Clear all values in a spreadsheet range.** -- Use `google-sheets.clearRange` to perform this operation
- **Create a new Google Spreadsheet.** -- Use `google-sheets.create` to perform this operation
- **List all sheets/tabs in a spreadsheet.** -- Use `google-sheets.getSheets` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Set the OAuth2 access token for Google Sheets API. | `Confirmation message.` |
| [`getValues`](#getvalues) | Read values from a spreadsheet range. | `Object containing values array.` |
| [`setValues`](#setvalues) | Write values to a spreadsheet range. | `Update response with updated range info.` |
| [`appendRow`](#appendrow) | Append a row of values to a spreadsheet. | `Append response.` |
| [`clearRange`](#clearrange) | Clear all values in a spreadsheet range. | `Clear response.` |
| [`create`](#create) | Create a new Google Spreadsheet. | `Created spreadsheet object with spreadsheetId.` |
| [`getSheets`](#getsheets) | List all sheets/tabs in a spreadsheet. | `Array of sheet property objects.` |
| [`addSheet`](#addsheet) | Add a new sheet/tab to a spreadsheet. | `Batch update response.` |
| [`deleteSheet`](#deletesheet) | Delete a sheet/tab from a spreadsheet. | `Batch update response.` |
| [`findRows`](#findrows) | Find rows matching a value in a specific column. | `Array of matching rows.` |


## Functions

### setCredentials

Set the OAuth2 access token for Google Sheets API.

**Module:** `google-sheets` | **Returns:** `string` -- Confirmation message.

```robinpath
googleSheets.setCredentials "ya29.xxx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | OAuth2 access token |

---

### getValues

Read values from a spreadsheet range.

**Module:** `google-sheets` | **Returns:** `object` -- Object containing values array.

```robinpath
googleSheets.getValues "spreadsheet_id" "Sheet1!A1:C10"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | The spreadsheet ID |
| `range` | `string` | Yes | A1 notation range (e.g. Sheet1!A1:C10) |

---

### setValues

Write values to a spreadsheet range.

**Module:** `google-sheets` | **Returns:** `object` -- Update response with updated range info.

```robinpath
googleSheets.setValues "spreadsheet_id" "Sheet1!A1:B2" [[1,2],[3,4]]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | The spreadsheet ID |
| `range` | `string` | Yes | A1 notation range |
| `values` | `array` | Yes | 2D array of values |

---

### appendRow

Append a row of values to a spreadsheet.

**Module:** `google-sheets` | **Returns:** `object` -- Append response.

```robinpath
googleSheets.appendRow "spreadsheet_id" "Sheet1!A:C" ["Alice", 25, "alice@example.com"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | The spreadsheet ID |
| `range` | `string` | Yes | A1 notation range to append after |
| `values` | `array` | Yes | Array of values for the new row |

---

### clearRange

Clear all values in a spreadsheet range.

**Module:** `google-sheets` | **Returns:** `object` -- Clear response.

```robinpath
googleSheets.clearRange "spreadsheet_id" "Sheet1!A1:C10"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | The spreadsheet ID |
| `range` | `string` | Yes | A1 notation range to clear |

---

### create

Create a new Google Spreadsheet.

**Module:** `google-sheets` | **Returns:** `object` -- Created spreadsheet object with spreadsheetId.

```robinpath
googleSheets.create "My New Sheet"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | `string` | Yes | Title for the new spreadsheet |

---

### getSheets

List all sheets/tabs in a spreadsheet.

**Module:** `google-sheets` | **Returns:** `array` -- Array of sheet property objects.

```robinpath
googleSheets.getSheets "spreadsheet_id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | The spreadsheet ID |

---

### addSheet

Add a new sheet/tab to a spreadsheet.

**Module:** `google-sheets` | **Returns:** `object` -- Batch update response.

```robinpath
googleSheets.addSheet "spreadsheet_id" "New Tab"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | The spreadsheet ID |
| `title` | `string` | Yes | Title for the new sheet |

---

### deleteSheet

Delete a sheet/tab from a spreadsheet.

**Module:** `google-sheets` | **Returns:** `object` -- Batch update response.

```robinpath
googleSheets.deleteSheet "spreadsheet_id" 123456
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | The spreadsheet ID |
| `sheetId` | `number` | Yes | Numeric ID of the sheet to delete |

---

### findRows

Find rows matching a value in a specific column.

**Module:** `google-sheets` | **Returns:** `array` -- Array of matching rows.

```robinpath
googleSheets.findRows "spreadsheet_id" "Sheet1!A:D" "Alice"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `spreadsheetId` | `string` | Yes | The spreadsheet ID |
| `range` | `string` | Yes | A1 notation range to search |
| `searchValue` | `string` | Yes | Value to search for |
| `column` | `number` | No | Column index to search (0-based, default 0) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Google Sheets API error (${res.status}): ${text}` | Check the error message for details |
| `googleSheets.setCredentials requires an access token.` | Check the error message for details |
| `googleSheets.getValues requires spreadsheetId and range.` | Check the error message for details |
| `googleSheets.setValues requires spreadsheetId, range, and values.` | Check the error message for details |
| `googleSheets.appendRow requires spreadsheetId, range, and values.` | Check the error message for details |
| `googleSheets.clearRange requires spreadsheetId and range.` | Check the error message for details |
| `googleSheets.create requires a title.` | Check the error message for details |
| `googleSheets.getSheets requires spreadsheetId.` | Check the error message for details |

```robinpath
set $result as googleSheets.getValues "spreadsheet_id" "Sheet1!A1:C10"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Values

Retrieve all items and loop through them.

```robinpath
google-sheets.setCredentials $token
set $result as googleSheets.getValues "spreadsheet_id" "Sheet1!A1:C10"
each $item in $result
  print $item
end
```

### 2. Create a new item with create

Create a new resource and capture the result.

```robinpath
google-sheets.setCredentials $token
set $result as googleSheets.create "My New Sheet"
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
google-sheets.setCredentials $token
set $existing as googleSheets.getValues "spreadsheet_id" "Sheet1!A1:C10"
if $existing == null
  googleSheets.create "My New Sheet"
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Google Sheets workflow

Chain multiple google-sheets operations together.

```robinpath
google-sheets.setCredentials $token
set $r_getValues as googleSheets.getValues "spreadsheet_id" "Sheet1!A1:C10"
set $r_appendRow as googleSheets.appendRow "spreadsheet_id" "Sheet1!A:C" ["Alice", 25, "alice@example.com"]
set $r_clearRange as googleSheets.clearRange "spreadsheet_id" "Sheet1!A1:C10"
print "All operations complete"
```

### 5. Safe getValues with validation

Check results before proceeding.

```robinpath
google-sheets.setCredentials $token
set $result as googleSheets.getValues "spreadsheet_id" "Sheet1!A1:C10"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **google-calendar** -- Google Calendar module for complementary functionality
- **google-contacts** -- Google Contacts module for complementary functionality
- **google-forms** -- Google Forms module for complementary functionality
- **gmail** -- Gmail module for complementary functionality
- **outlook** -- Outlook module for complementary functionality
