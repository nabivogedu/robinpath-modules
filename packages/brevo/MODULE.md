---
title: "Brevo"
module: "brevo"
package: "@robinpath/brevo"
description: "Brevo module for RobinPath."
category: "email-marketing"
tags: [brevo, email marketing]
type: "integration"
auth: "api-key"
functionCount: 19
baseUrl: "https://api.brevo.com"
---

# Brevo

> Brevo module for RobinPath.

**Package:** `@robinpath/brevo` | **Category:** Email Marketing | **Type:** Integration


## Authentication

```robinpath
brevo.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `brevo` module when you need to:

- **sendTransactionalEmail** -- Use `brevo.sendTransactionalEmail` to perform this operation
- **sendTransactionalSms** -- Use `brevo.sendTransactionalSms` to perform this operation
- **listContacts** -- Use `brevo.listContacts` to perform this operation
- **getContact** -- Use `brevo.getContact` to perform this operation
- **createContact** -- Use `brevo.createContact` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure brevo credentials. | `object` |
| [`sendTransactionalEmail`](#sendtransactionalemail) | sendTransactionalEmail | `object` |
| [`sendTransactionalSms`](#sendtransactionalsms) | sendTransactionalSms | `object` |
| [`listContacts`](#listcontacts) | listContacts | `object` |
| [`getContact`](#getcontact) | getContact | `object` |
| [`createContact`](#createcontact) | createContact | `object` |
| [`updateContact`](#updatecontact) | updateContact | `object` |
| [`deleteContact`](#deletecontact) | deleteContact | `object` |
| [`listLists`](#listlists) | listLists | `object` |
| [`getList`](#getlist) | getList | `object` |
| [`createList`](#createlist) | createList | `object` |
| [`addContactToList`](#addcontacttolist) | addContactToList | `object` |
| [`removeContactFromList`](#removecontactfromlist) | removeContactFromList | `object` |
| [`listCampaigns`](#listcampaigns) | listCampaigns | `object` |
| [`getCampaign`](#getcampaign) | getCampaign | `object` |
| [`createEmailCampaign`](#createemailcampaign) | createEmailCampaign | `object` |
| [`sendCampaign`](#sendcampaign) | sendCampaign | `object` |
| [`getEmailEvents`](#getemailevents) | getEmailEvents | `object` |
| [`importContacts`](#importcontacts) | importContacts | `object` |


## Functions

### setCredentials

Configure brevo credentials.

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | Yes | apiKey |

---

### sendTransactionalEmail

sendTransactionalEmail

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.sendTransactionalEmail
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendTransactionalSms

sendTransactionalSms

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.sendTransactionalSms
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listContacts

listContacts

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.listContacts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getContact

getContact

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.getContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createContact

createContact

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.createContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateContact

updateContact

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.updateContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteContact

deleteContact

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.deleteContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listLists

listLists

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.listLists
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getList

getList

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.getList
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createList

createList

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.createList
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addContactToList

addContactToList

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.addContactToList
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### removeContactFromList

removeContactFromList

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.removeContactFromList
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCampaigns

listCampaigns

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.listCampaigns
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCampaign

getCampaign

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.getCampaign
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createEmailCampaign

createEmailCampaign

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.createEmailCampaign
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendCampaign

sendCampaign

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.sendCampaign
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getEmailEvents

getEmailEvents

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.getEmailEvents
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### importContacts

importContacts

**Module:** `brevo` | **Returns:** `object` -- API response.

```robinpath
brevo.importContacts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Brevo API error (${res.status}): ${t}` | Check the error message for details |
| `brevo.setCredentials requires apiKey.` | Check the error message for details |
| `brevo.updateContact requires an ID.` | Check the error message for details |
| `brevo.deleteContact requires an ID.` | Check the error message for details |
| `brevo.removeContactFromList requires an ID.` | Check the error message for details |
| `Brevo: "..." not configured. Call brevo.setCredentials first.` | Check the error message for details |

```robinpath
set $result as brevo.sendTransactionalEmail
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
brevo.setCredentials $token
set $result as brevo.listContacts
each $item in $result
  print $item
end
```

### 2. Create a new item with sendTransactionalEmail

Create a new resource and capture the result.

```robinpath
brevo.setCredentials $token
set $result as brevo.sendTransactionalEmail
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
brevo.setCredentials $token
set $created as brevo.sendTransactionalEmail
# Update the created item
brevo.updateContact
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
brevo.setCredentials $token
set $existing as brevo.listContacts
if $existing == null
  brevo.sendTransactionalEmail
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Brevo workflow

Chain multiple brevo operations together.

```robinpath
brevo.setCredentials $token
set $r_sendTransactionalEmail as brevo.sendTransactionalEmail
set $r_sendTransactionalSms as brevo.sendTransactionalSms
set $r_listContacts as brevo.listContacts
print "All operations complete"
```

### 6. Safe sendTransactionalEmail with validation

Check results before proceeding.

```robinpath
brevo.setCredentials $token
set $result as brevo.sendTransactionalEmail
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **activecampaign** -- ActiveCampaign module for complementary functionality
- **convertkit** -- Convertkit module for complementary functionality
- **mailchimp** -- Mailchimp module for complementary functionality
- **sendgrid** -- SendGrid module for complementary functionality
- **lemlist** -- Lemlist module for complementary functionality
