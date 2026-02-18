---
title: "Google Contacts"
module: "google-contacts"
package: "@robinpath/google-contacts"
description: "Google Contacts module for RobinPath."
category: "productivity"
tags: [googlecontacts, productivity]
type: "integration"
auth: "api-key"
functionCount: 17
baseUrl: "https://people.googleapis.com"
---

# Google Contacts

> Google Contacts module for RobinPath.

**Package:** `@robinpath/google-contacts` | **Category:** Productivity | **Type:** Integration


## Authentication

```robinpath
google-contacts.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `google-contacts` module when you need to:

- **listContacts** -- Use `google-contacts.listContacts` to perform this operation
- **getContact** -- Use `google-contacts.getContact` to perform this operation
- **createContact** -- Use `google-contacts.createContact` to perform this operation
- **updateContact** -- Use `google-contacts.updateContact` to perform this operation
- **deleteContact** -- Use `google-contacts.deleteContact` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure google-contacts credentials. | `object` |
| [`listContacts`](#listcontacts) | listContacts | `object` |
| [`getContact`](#getcontact) | getContact | `object` |
| [`createContact`](#createcontact) | createContact | `object` |
| [`updateContact`](#updatecontact) | updateContact | `object` |
| [`deleteContact`](#deletecontact) | deleteContact | `object` |
| [`searchContacts`](#searchcontacts) | searchContacts | `object` |
| [`listContactGroups`](#listcontactgroups) | listContactGroups | `object` |
| [`getContactGroup`](#getcontactgroup) | getContactGroup | `object` |
| [`createContactGroup`](#createcontactgroup) | createContactGroup | `object` |
| [`updateContactGroup`](#updatecontactgroup) | updateContactGroup | `object` |
| [`deleteContactGroup`](#deletecontactgroup) | deleteContactGroup | `object` |
| [`batchGetContacts`](#batchgetcontacts) | batchGetContacts | `object` |
| [`getOtherContacts`](#getothercontacts) | getOtherContacts | `object` |
| [`getProfile`](#getprofile) | getProfile | `object` |
| [`listDirectoryPeople`](#listdirectorypeople) | listDirectoryPeople | `object` |
| [`updateContactPhoto`](#updatecontactphoto) | updateContactPhoto | `object` |


## Functions

### setCredentials

Configure google-contacts credentials.

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### listContacts

listContacts

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.listContacts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getContact

getContact

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.getContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createContact

createContact

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.createContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateContact

updateContact

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.updateContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteContact

deleteContact

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.deleteContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchContacts

searchContacts

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.searchContacts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listContactGroups

listContactGroups

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.listContactGroups
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getContactGroup

getContactGroup

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.getContactGroup
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createContactGroup

createContactGroup

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.createContactGroup
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateContactGroup

updateContactGroup

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.updateContactGroup
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteContactGroup

deleteContactGroup

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.deleteContactGroup
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### batchGetContacts

batchGetContacts

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.batchGetContacts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getOtherContacts

getOtherContacts

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.getOtherContacts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getProfile

getProfile

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.getProfile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listDirectoryPeople

listDirectoryPeople

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.listDirectoryPeople
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateContactPhoto

updateContactPhoto

**Module:** `google-contacts` | **Returns:** `object` -- API response.

```robinpath
google-contacts.updateContactPhoto
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `GoogleContacts API error (${res.status}): ${t}` | Check the error message for details |
| `google-contacts.setCredentials requires accessToken.` | Check the error message for details |
| `google-contacts.updateContact requires an ID.` | Check the error message for details |
| `google-contacts.deleteContact requires an ID.` | Check the error message for details |
| `google-contacts.updateContactGroup requires an ID.` | Check the error message for details |
| `google-contacts.deleteContactGroup requires an ID.` | Check the error message for details |
| `google-contacts.updateContactPhoto requires an ID.` | Check the error message for details |
| `GoogleContacts: "..." not configured. Call google-contacts.setCredentials first.` | Check the error message for details |

```robinpath
set $result as google-contacts.listContacts
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
google-contacts.setCredentials $token
set $result as google-contacts.listContacts
each $item in $result
  print $item
end
```

### 2. Create a new item with createContact

Create a new resource and capture the result.

```robinpath
google-contacts.setCredentials $token
set $result as google-contacts.createContact
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
google-contacts.setCredentials $token
set $created as google-contacts.createContact
# Update the created item
google-contacts.updateContact
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
google-contacts.setCredentials $token
set $existing as google-contacts.listContacts
if $existing == null
  google-contacts.createContact
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Google Contacts workflow

Chain multiple google-contacts operations together.

```robinpath
google-contacts.setCredentials $token
set $r_listContacts as google-contacts.listContacts
set $r_getContact as google-contacts.getContact
set $r_createContact as google-contacts.createContact
print "All operations complete"
```

### 6. Safe listContacts with validation

Check results before proceeding.

```robinpath
google-contacts.setCredentials $token
set $result as google-contacts.listContacts
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **google-sheets** -- Google Sheets module for complementary functionality
- **google-calendar** -- Google Calendar module for complementary functionality
- **google-forms** -- Google Forms module for complementary functionality
- **gmail** -- Gmail module for complementary functionality
- **outlook** -- Outlook module for complementary functionality
