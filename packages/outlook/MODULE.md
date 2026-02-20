---
title: "Outlook"
module: "outlook"
package: "@robinpath/outlook"
description: "Outlook module for RobinPath."
category: "productivity"
tags: [outlook, productivity]
type: "integration"
auth: "api-key"
functionCount: 21
baseUrl: "https://graph.microsoft.com"
---

# Outlook

> Outlook module for RobinPath.

**Package:** `@robinpath/outlook` | **Category:** Productivity | **Type:** Integration


## Authentication

```robinpath
outlook.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `outlook` module when you need to:

- **listMessages** -- Use `outlook.listMessages` to perform this operation
- **getMessage** -- Use `outlook.getMessage` to perform this operation
- **sendEmail** -- Use `outlook.sendEmail` to perform this operation
- **replyToEmail** -- Use `outlook.replyToEmail` to perform this operation
- **forwardEmail** -- Use `outlook.forwardEmail` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure outlook credentials. | `object` |
| [`listMessages`](#listmessages) | listMessages | `object` |
| [`getMessage`](#getmessage) | getMessage | `object` |
| [`sendEmail`](#sendemail) | sendEmail | `object` |
| [`replyToEmail`](#replytoemail) | replyToEmail | `object` |
| [`forwardEmail`](#forwardemail) | forwardEmail | `object` |
| [`createDraft`](#createdraft) | createDraft | `object` |
| [`sendDraft`](#senddraft) | sendDraft | `object` |
| [`listDrafts`](#listdrafts) | listDrafts | `object` |
| [`deleteMessage`](#deletemessage) | deleteMessage | `object` |
| [`moveMessage`](#movemessage) | moveMessage | `object` |
| [`copyMessage`](#copymessage) | copyMessage | `object` |
| [`listFolders`](#listfolders) | listFolders | `object` |
| [`createFolder`](#createfolder) | createFolder | `object` |
| [`listAttachments`](#listattachments) | listAttachments | `object` |
| [`getAttachment`](#getattachment) | getAttachment | `object` |
| [`createRule`](#createrule) | createRule | `object` |
| [`getProfile`](#getprofile) | getProfile | `object` |
| [`searchMessages`](#searchmessages) | searchMessages | `object` |
| [`flagMessage`](#flagmessage) | flagMessage | `object` |
| [`listCategories`](#listcategories) | listCategories | `object` |


## Functions

### setCredentials

Configure outlook credentials.

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### listMessages

listMessages

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.listMessages
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getMessage

getMessage

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.getMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendEmail

sendEmail

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.sendEmail
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### replyToEmail

replyToEmail

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.replyToEmail
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### forwardEmail

forwardEmail

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.forwardEmail
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createDraft

createDraft

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.createDraft
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendDraft

sendDraft

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.sendDraft
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listDrafts

listDrafts

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.listDrafts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteMessage

deleteMessage

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.deleteMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### moveMessage

moveMessage

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.moveMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### copyMessage

copyMessage

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.copyMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listFolders

listFolders

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.listFolders
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createFolder

createFolder

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.createFolder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listAttachments

listAttachments

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.listAttachments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getAttachment

getAttachment

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.getAttachment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createRule

createRule

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.createRule
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getProfile

getProfile

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.getProfile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchMessages

searchMessages

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.searchMessages
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### flagMessage

flagMessage

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.flagMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCategories

listCategories

**Module:** `outlook` | **Returns:** `object` -- API response.

```robinpath
outlook.listCategories
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Outlook API error (${res.status}): ${t}` | Check the error message for details |
| `outlook.setCredentials requires accessToken.` | Check the error message for details |
| `outlook.deleteMessage requires an ID.` | Check the error message for details |
| `outlook.moveMessage requires an ID.` | Check the error message for details |
| `outlook.copyMessage requires an ID.` | Check the error message for details |
| `Outlook: "..." not configured. Call outlook.setCredentials first.` | Check the error message for details |

```robinpath
set $result as outlook.listMessages
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Messages

Retrieve all items and loop through them.

```robinpath
outlook.setCredentials $token
set $result as outlook.listMessages
each $item in $result
  print $item
end
```

### 2. Create a new item with sendEmail

Create a new resource and capture the result.

```robinpath
outlook.setCredentials $token
set $result as outlook.sendEmail
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
outlook.setCredentials $token
set $existing as outlook.listMessages
if $existing == null
  outlook.sendEmail
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Outlook workflow

Chain multiple outlook operations together.

```robinpath
outlook.setCredentials $token
set $r_listMessages as outlook.listMessages
set $r_getMessage as outlook.getMessage
set $r_sendEmail as outlook.sendEmail
print "All operations complete"
```

### 5. Safe listMessages with validation

Check results before proceeding.

```robinpath
outlook.setCredentials $token
set $result as outlook.listMessages
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
