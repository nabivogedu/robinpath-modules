---
title: "Apollo"
module: "apollo"
package: "@robinpath/apollo"
description: "Apollo module for RobinPath."
category: "utility"
tags: [apollo, utility]
type: "utility"
auth: "api-key"
functionCount: 19
baseUrl: "https://api.apollo.io"
---

# Apollo

> Apollo module for RobinPath.

**Package:** `@robinpath/apollo` | **Category:** Utility | **Type:** Utility


## Authentication

```robinpath
apollo.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `apollo` module when you need to:

- **searchPeople** -- Use `apollo.searchPeople` to perform this operation
- **getPerson** -- Use `apollo.getPerson` to perform this operation
- **enrichPerson** -- Use `apollo.enrichPerson` to perform this operation
- **searchOrganizations** -- Use `apollo.searchOrganizations` to perform this operation
- **getOrganization** -- Use `apollo.getOrganization` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure apollo credentials. | `object` |
| [`searchPeople`](#searchpeople) | searchPeople | `object` |
| [`getPerson`](#getperson) | getPerson | `object` |
| [`enrichPerson`](#enrichperson) | enrichPerson | `object` |
| [`searchOrganizations`](#searchorganizations) | searchOrganizations | `object` |
| [`getOrganization`](#getorganization) | getOrganization | `object` |
| [`enrichOrganization`](#enrichorganization) | enrichOrganization | `object` |
| [`listSequences`](#listsequences) | listSequences | `object` |
| [`getSequence`](#getsequence) | getSequence | `object` |
| [`addToSequence`](#addtosequence) | addToSequence | `object` |
| [`listEmailAccounts`](#listemailaccounts) | listEmailAccounts | `object` |
| [`searchContacts`](#searchcontacts) | searchContacts | `object` |
| [`createContact`](#createcontact) | createContact | `object` |
| [`updateContact`](#updatecontact) | updateContact | `object` |
| [`listLists`](#listlists) | listLists | `object` |
| [`addToList`](#addtolist) | addToList | `object` |
| [`listTasks`](#listtasks) | listTasks | `object` |
| [`createTask`](#createtask) | createTask | `object` |
| [`getAccount`](#getaccount) | getAccount | `object` |


## Functions

### setCredentials

Configure apollo credentials.

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | Yes | apiKey |

---

### searchPeople

searchPeople

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.searchPeople
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPerson

getPerson

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.getPerson
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### enrichPerson

enrichPerson

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.enrichPerson
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchOrganizations

searchOrganizations

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.searchOrganizations
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getOrganization

getOrganization

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.getOrganization
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### enrichOrganization

enrichOrganization

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.enrichOrganization
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listSequences

listSequences

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.listSequences
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSequence

getSequence

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.getSequence
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addToSequence

addToSequence

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.addToSequence
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listEmailAccounts

listEmailAccounts

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.listEmailAccounts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchContacts

searchContacts

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.searchContacts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createContact

createContact

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.createContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateContact

updateContact

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.updateContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listLists

listLists

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.listLists
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addToList

addToList

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.addToList
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTasks

listTasks

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.listTasks
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createTask

createTask

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.createTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getAccount

getAccount

**Module:** `apollo` | **Returns:** `object` -- API response.

```robinpath
apollo.getAccount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Apollo API error (${res.status}): ${t}` | Check the error message for details |
| `apollo.setCredentials requires apiKey.` | Check the error message for details |
| `apollo.updateContact requires an ID.` | Check the error message for details |
| `Apollo: "..." not configured. Call apollo.setCredentials first.` | Check the error message for details |

```robinpath
set $result as apollo.searchPeople
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Person

Retrieve all items and loop through them.

```robinpath
apollo.setCredentials $token
set $result as apollo.getPerson
each $item in $result
  print $item
end
```

### 2. Create a new item with addToSequence

Create a new resource and capture the result.

```robinpath
apollo.setCredentials $token
set $result as apollo.addToSequence
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
apollo.setCredentials $token
set $created as apollo.addToSequence
# Update the created item
apollo.updateContact
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
apollo.setCredentials $token
set $existing as apollo.getPerson
if $existing == null
  apollo.addToSequence
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Apollo workflow

Chain multiple apollo operations together.

```robinpath
apollo.setCredentials $token
set $r_searchPeople as apollo.searchPeople
set $r_getPerson as apollo.getPerson
set $r_enrichPerson as apollo.enrichPerson
print "All operations complete"
```

### 6. Safe searchPeople with validation

Check results before proceeding.

```robinpath
apollo.setCredentials $token
set $result as apollo.searchPeople
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
