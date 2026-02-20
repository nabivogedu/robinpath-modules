---
title: "Zoho"
module: "zoho"
package: "@robinpath/zoho"
description: "Zoho module for RobinPath."
category: "crm"
tags: [zoho, crm]
type: "integration"
auth: "api-key"
functionCount: 21
baseUrl: "https://www.zohoapis.com"
---

# Zoho

> Zoho module for RobinPath.

**Package:** `@robinpath/zoho` | **Category:** Crm | **Type:** Integration


## Authentication

```robinpath
zoho.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `zoho` module when you need to:

- **listRecords** -- Use `zoho.listRecords` to perform this operation
- **getRecord** -- Use `zoho.getRecord` to perform this operation
- **createRecord** -- Use `zoho.createRecord` to perform this operation
- **updateRecord** -- Use `zoho.updateRecord` to perform this operation
- **deleteRecord** -- Use `zoho.deleteRecord` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure zoho credentials. | `object` |
| [`listRecords`](#listrecords) | listRecords | `object` |
| [`getRecord`](#getrecord) | getRecord | `object` |
| [`createRecord`](#createrecord) | createRecord | `object` |
| [`updateRecord`](#updaterecord) | updateRecord | `object` |
| [`deleteRecord`](#deleterecord) | deleteRecord | `object` |
| [`searchRecords`](#searchrecords) | searchRecords | `object` |
| [`upsertRecords`](#upsertrecords) | upsertRecords | `object` |
| [`listModules`](#listmodules) | listModules | `object` |
| [`getModuleFields`](#getmodulefields) | getModuleFields | `object` |
| [`createLead`](#createlead) | createLead | `object` |
| [`createContact`](#createcontact) | createContact | `object` |
| [`createDeal`](#createdeal) | createDeal | `object` |
| [`createAccount`](#createaccount) | createAccount | `object` |
| [`createTask`](#createtask) | createTask | `object` |
| [`convertLead`](#convertlead) | convertLead | `object` |
| [`addNote`](#addnote) | addNote | `object` |
| [`listNotes`](#listnotes) | listNotes | `object` |
| [`getUsers`](#getusers) | getUsers | `object` |
| [`getOrganization`](#getorganization) | getOrganization | `object` |
| [`bulkRead`](#bulkread) | bulkRead | `object` |


## Functions

### setCredentials

Configure zoho credentials.

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### listRecords

listRecords

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.listRecords
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getRecord

getRecord

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.getRecord
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createRecord

createRecord

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.createRecord
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateRecord

updateRecord

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.updateRecord
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteRecord

deleteRecord

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.deleteRecord
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchRecords

searchRecords

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.searchRecords
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### upsertRecords

upsertRecords

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.upsertRecords
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listModules

listModules

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.listModules
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getModuleFields

getModuleFields

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.getModuleFields
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createLead

createLead

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.createLead
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createContact

createContact

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.createContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createDeal

createDeal

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.createDeal
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createAccount

createAccount

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.createAccount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createTask

createTask

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.createTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### convertLead

convertLead

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.convertLead
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addNote

addNote

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.addNote
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listNotes

listNotes

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.listNotes
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUsers

getUsers

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.getUsers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getOrganization

getOrganization

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.getOrganization
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### bulkRead

bulkRead

**Module:** `zoho` | **Returns:** `object` -- API response.

```robinpath
zoho.bulkRead
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Zoho API error (${res.status}): ${t}` | Check the error message for details |
| `zoho.setCredentials requires accessToken.` | Check the error message for details |
| `zoho.updateRecord requires an ID.` | Check the error message for details |
| `zoho.deleteRecord requires an ID.` | Check the error message for details |
| `Zoho: "..." not configured. Call zoho.setCredentials first.` | Check the error message for details |

```robinpath
set $result as zoho.listRecords
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Records

Retrieve all items and loop through them.

```robinpath
zoho.setCredentials $token
set $result as zoho.listRecords
each $item in $result
  print $item
end
```

### 2. Create a new item with createRecord

Create a new resource and capture the result.

```robinpath
zoho.setCredentials $token
set $result as zoho.createRecord
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
zoho.setCredentials $token
set $created as zoho.createRecord
# Update the created item
zoho.updateRecord
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
zoho.setCredentials $token
set $existing as zoho.listRecords
if $existing == null
  zoho.createRecord
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Zoho workflow

Chain multiple zoho operations together.

```robinpath
zoho.setCredentials $token
set $r_listRecords as zoho.listRecords
set $r_getRecord as zoho.getRecord
set $r_createRecord as zoho.createRecord
print "All operations complete"
```

### 6. Safe listRecords with validation

Check results before proceeding.

```robinpath
zoho.setCredentials $token
set $result as zoho.listRecords
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **hubspot** -- HubSpot module for complementary functionality
- **salesforce** -- Salesforce module for complementary functionality
- **pipedrive** -- Pipedrive module for complementary functionality
- **freshdesk** -- Freshdesk module for complementary functionality
- **intercom** -- Intercom module for complementary functionality
