---
title: "Intercom"
module: "intercom"
package: "@robinpath/intercom"
description: "Intercom module for RobinPath."
category: "crm"
tags: [intercom, crm]
type: "integration"
auth: "api-key"
functionCount: 19
baseUrl: "https://api.intercom.io"
---

# Intercom

> Intercom module for RobinPath.

**Package:** `@robinpath/intercom` | **Category:** Crm | **Type:** Integration


## Authentication

```robinpath
intercom.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `intercom` module when you need to:

- **listContacts** -- Use `intercom.listContacts` to perform this operation
- **getContact** -- Use `intercom.getContact` to perform this operation
- **createContact** -- Use `intercom.createContact` to perform this operation
- **updateContact** -- Use `intercom.updateContact` to perform this operation
- **deleteContact** -- Use `intercom.deleteContact` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure intercom credentials. | `object` |
| [`listContacts`](#listcontacts) | listContacts | `object` |
| [`getContact`](#getcontact) | getContact | `object` |
| [`createContact`](#createcontact) | createContact | `object` |
| [`updateContact`](#updatecontact) | updateContact | `object` |
| [`deleteContact`](#deletecontact) | deleteContact | `object` |
| [`searchContacts`](#searchcontacts) | searchContacts | `object` |
| [`listConversations`](#listconversations) | listConversations | `object` |
| [`getConversation`](#getconversation) | getConversation | `object` |
| [`replyToConversation`](#replytoconversation) | replyToConversation | `object` |
| [`assignConversation`](#assignconversation) | assignConversation | `object` |
| [`closeConversation`](#closeconversation) | closeConversation | `object` |
| [`listCompanies`](#listcompanies) | listCompanies | `object` |
| [`getCompany`](#getcompany) | getCompany | `object` |
| [`createCompany`](#createcompany) | createCompany | `object` |
| [`listTags`](#listtags) | listTags | `object` |
| [`createTag`](#createtag) | createTag | `object` |
| [`tagContact`](#tagcontact) | tagContact | `object` |
| [`removeTag`](#removetag) | removeTag | `object` |


## Functions

### setCredentials

Configure intercom credentials.

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### listContacts

listContacts

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.listContacts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getContact

getContact

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.getContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createContact

createContact

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.createContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateContact

updateContact

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.updateContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteContact

deleteContact

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.deleteContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchContacts

searchContacts

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.searchContacts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listConversations

listConversations

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.listConversations
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getConversation

getConversation

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.getConversation
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### replyToConversation

replyToConversation

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.replyToConversation
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### assignConversation

assignConversation

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.assignConversation
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### closeConversation

closeConversation

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.closeConversation
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCompanies

listCompanies

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.listCompanies
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCompany

getCompany

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.getCompany
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createCompany

createCompany

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.createCompany
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTags

listTags

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.listTags
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createTag

createTag

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.createTag
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### tagContact

tagContact

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.tagContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### removeTag

removeTag

**Module:** `intercom` | **Returns:** `object` -- API response.

```robinpath
intercom.removeTag
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Intercom API error (${res.status}): ${t}` | Check the error message for details |
| `intercom.setCredentials requires accessToken.` | Check the error message for details |
| `intercom.updateContact requires an ID.` | Check the error message for details |
| `intercom.deleteContact requires an ID.` | Check the error message for details |
| `intercom.closeConversation requires an ID.` | Check the error message for details |
| `intercom.removeTag requires an ID.` | Check the error message for details |
| `Intercom: "..." not configured. Call intercom.setCredentials first.` | Check the error message for details |

```robinpath
set $result as intercom.listContacts
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Contacts

Retrieve all items and loop through them.

```robinpath
intercom.setCredentials $token
set $result as intercom.listContacts
each $item in $result
  print $item
end
```

### 2. Create a new item with createContact

Create a new resource and capture the result.

```robinpath
intercom.setCredentials $token
set $result as intercom.createContact
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
intercom.setCredentials $token
set $created as intercom.createContact
# Update the created item
intercom.updateContact
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
intercom.setCredentials $token
set $existing as intercom.listContacts
if $existing == null
  intercom.createContact
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Intercom workflow

Chain multiple intercom operations together.

```robinpath
intercom.setCredentials $token
set $r_listContacts as intercom.listContacts
set $r_getContact as intercom.getContact
set $r_createContact as intercom.createContact
print "All operations complete"
```

### 6. Safe listContacts with validation

Check results before proceeding.

```robinpath
intercom.setCredentials $token
set $result as intercom.listContacts
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
- **zoho** -- Zoho module for complementary functionality
