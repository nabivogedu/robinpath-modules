---
title: "Salesforce"
module: "salesforce"
package: "@robinpath/salesforce"
description: "Salesforce module for RobinPath."
category: "crm"
tags: [salesforce, crm]
type: "integration"
auth: "api-key"
functionCount: 25
---

# Salesforce

> Salesforce module for RobinPath.

**Package:** `@robinpath/salesforce` | **Category:** Crm | **Type:** Integration


## Authentication

```robinpath
salesforce.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `salesforce` module when you need to:

- **query** -- Use `salesforce.query` to perform this operation
- **getRecord** -- Use `salesforce.getRecord` to perform this operation
- **createRecord** -- Use `salesforce.createRecord` to perform this operation
- **updateRecord** -- Use `salesforce.updateRecord` to perform this operation
- **deleteRecord** -- Use `salesforce.deleteRecord` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure salesforce credentials. | `object` |
| [`query`](#query) | query | `object` |
| [`getRecord`](#getrecord) | getRecord | `object` |
| [`createRecord`](#createrecord) | createRecord | `object` |
| [`updateRecord`](#updaterecord) | updateRecord | `object` |
| [`deleteRecord`](#deleterecord) | deleteRecord | `object` |
| [`upsertRecord`](#upsertrecord) | upsertRecord | `object` |
| [`describeObject`](#describeobject) | describeObject | `object` |
| [`listObjects`](#listobjects) | listObjects | `object` |
| [`search`](#search) | search | `object` |
| [`createLead`](#createlead) | createLead | `object` |
| [`createContact`](#createcontact) | createContact | `object` |
| [`createOpportunity`](#createopportunity) | createOpportunity | `object` |
| [`createAccount`](#createaccount) | createAccount | `object` |
| [`createTask`](#createtask) | createTask | `object` |
| [`createCase`](#createcase) | createCase | `object` |
| [`getReport`](#getreport) | getReport | `object` |
| [`listReports`](#listreports) | listReports | `object` |
| [`bulkQuery`](#bulkquery) | bulkQuery | `object` |
| [`getUser`](#getuser) | getUser | `object` |
| [`listUsers`](#listusers) | listUsers | `object` |
| [`getOrganization`](#getorganization) | getOrganization | `object` |
| [`runApex`](#runapex) | runApex | `object` |
| [`getRecentRecords`](#getrecentrecords) | getRecentRecords | `object` |
| [`searchRecords`](#searchrecords) | searchRecords | `object` |


## Functions

### setCredentials

Configure salesforce credentials.

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `instanceUrl` | `string` | Yes | instanceUrl |
| `accessToken` | `string` | Yes | accessToken |

---

### query

query

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.query
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getRecord

getRecord

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.getRecord
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createRecord

createRecord

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.createRecord
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateRecord

updateRecord

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.updateRecord
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteRecord

deleteRecord

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.deleteRecord
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### upsertRecord

upsertRecord

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.upsertRecord
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### describeObject

describeObject

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.describeObject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listObjects

listObjects

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.listObjects
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### search

search

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.search
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createLead

createLead

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.createLead
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createContact

createContact

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.createContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createOpportunity

createOpportunity

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.createOpportunity
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createAccount

createAccount

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.createAccount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createTask

createTask

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.createTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createCase

createCase

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.createCase
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getReport

getReport

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.getReport
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listReports

listReports

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.listReports
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### bulkQuery

bulkQuery

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.bulkQuery
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUser

getUser

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.getUser
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listUsers

listUsers

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.listUsers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getOrganization

getOrganization

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.getOrganization
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### runApex

runApex

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.runApex
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getRecentRecords

getRecentRecords

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.getRecentRecords
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchRecords

searchRecords

**Module:** `salesforce` | **Returns:** `object` -- API response.

```robinpath
salesforce.searchRecords
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Salesforce API error (${res.status}): ${t}` | Check the error message for details |
| `salesforce.setCredentials requires instanceUrl, accessToken.` | Check the error message for details |
| `salesforce.updateRecord requires an ID.` | Check the error message for details |
| `salesforce.deleteRecord requires an ID.` | Check the error message for details |
| `Salesforce: "..." not configured. Call salesforce.setCredentials first.` | Check the error message for details |

```robinpath
set $result as salesforce.query
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Record

Retrieve all items and loop through them.

```robinpath
salesforce.setCredentials $token
set $result as salesforce.getRecord
each $item in $result
  print $item
end
```

### 2. Create a new item with createRecord

Create a new resource and capture the result.

```robinpath
salesforce.setCredentials $token
set $result as salesforce.createRecord
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
salesforce.setCredentials $token
set $created as salesforce.createRecord
# Update the created item
salesforce.updateRecord
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
salesforce.setCredentials $token
set $existing as salesforce.getRecord
if $existing == null
  salesforce.createRecord
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Salesforce workflow

Chain multiple salesforce operations together.

```robinpath
salesforce.setCredentials $token
set $r_query as salesforce.query
set $r_getRecord as salesforce.getRecord
set $r_createRecord as salesforce.createRecord
print "All operations complete"
```

### 6. Safe query with validation

Check results before proceeding.

```robinpath
salesforce.setCredentials $token
set $result as salesforce.query
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **hubspot** -- HubSpot module for complementary functionality
- **pipedrive** -- Pipedrive module for complementary functionality
- **freshdesk** -- Freshdesk module for complementary functionality
- **intercom** -- Intercom module for complementary functionality
- **zoho** -- Zoho module for complementary functionality
