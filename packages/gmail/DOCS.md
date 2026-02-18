---
title: "Gmail"
module: "gmail"
package: "@robinpath/gmail"
description: "Gmail module for RobinPath."
category: "productivity"
tags: [gmail, productivity]
type: "integration"
auth: "api-key"
functionCount: 17
baseUrl: "https://gmail.googleapis.com"
---

# Gmail

> Gmail module for RobinPath.

**Package:** `@robinpath/gmail` | **Category:** Productivity | **Type:** Integration


## Authentication

```robinpath
gmail.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `gmail` module when you need to:

- **List/search messages** -- Use `gmail.listMessages` to perform this operation
- **Get message details** -- Use `gmail.getMessage` to perform this operation
- **Send a plain text email** -- Use `gmail.sendEmail` to perform this operation
- **Move message to trash** -- Use `gmail.trashMessage` to perform this operation
- **Remove from trash** -- Use `gmail.untrashMessage` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure Gmail OAuth2 credentials. | `object` |
| [`listMessages`](#listmessages) | List/search messages | `object` |
| [`getMessage`](#getmessage) | Get message details | `object` |
| [`sendEmail`](#sendemail) | Send a plain text email | `object` |
| [`trashMessage`](#trashmessage) | Move message to trash | `object` |
| [`untrashMessage`](#untrashmessage) | Remove from trash | `object` |
| [`deleteMessage`](#deletemessage) | Permanently delete message | `object` |
| [`modifyLabels`](#modifylabels) | Add/remove labels | `object` |
| [`markAsRead`](#markasread) | Mark as read | `object` |
| [`markAsUnread`](#markasunread) | Mark as unread | `object` |
| [`listLabels`](#listlabels) | List all labels | `object` |
| [`createLabel`](#createlabel) | Create a label | `object` |
| [`createDraft`](#createdraft) | Create a draft | `object` |
| [`listDrafts`](#listdrafts) | List drafts | `object` |
| [`sendDraft`](#senddraft) | Send a draft | `object` |
| [`deleteDraft`](#deletedraft) | Delete a draft | `object` |
| [`getProfile`](#getprofile) | Get user profile | `object` |


## Functions

### setCredentials

Configure Gmail OAuth2 credentials.

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | OAuth2 access token |

---

### listMessages

List/search messages

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.listMessages
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | No | Search query |
| `maxResults` | `number` | No | Max results |

---

### getMessage

Get message details

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.getMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messageId` | `string` | Yes | Message ID |

---

### sendEmail

Send a plain text email

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.sendEmail
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | `string` | Yes | Recipient |
| `subject` | `string` | Yes | Subject |
| `body` | `string` | Yes | Body |

---

### trashMessage

Move message to trash

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.trashMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messageId` | `string` | Yes | Message ID |

---

### untrashMessage

Remove from trash

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.untrashMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messageId` | `string` | Yes | Message ID |

---

### deleteMessage

Permanently delete message

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.deleteMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messageId` | `string` | Yes | Message ID |

---

### modifyLabels

Add/remove labels

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.modifyLabels
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messageId` | `string` | Yes | Message ID |
| `addLabels` | `object` | No | Labels to add |
| `removeLabels` | `object` | No | Labels to remove |

---

### markAsRead

Mark as read

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.markAsRead
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messageId` | `string` | Yes | Message ID |

---

### markAsUnread

Mark as unread

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.markAsUnread
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messageId` | `string` | Yes | Message ID |

---

### listLabels

List all labels

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.listLabels
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### createLabel

Create a label

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.createLabel
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Label name |

---

### createDraft

Create a draft

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.createDraft
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | `string` | Yes | Recipient |
| `subject` | `string` | Yes | Subject |
| `body` | `string` | Yes | Body |

---

### listDrafts

List drafts

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.listDrafts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `maxResults` | `number` | No | Max results |

---

### sendDraft

Send a draft

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.sendDraft
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `draftId` | `string` | Yes | Draft ID |

---

### deleteDraft

Delete a draft

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.deleteDraft
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `draftId` | `string` | Yes | Draft ID |

---

### getProfile

Get user profile

**Module:** `gmail` | **Returns:** `object` -- API response.

```robinpath
gmail.getProfile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Gmail API error (${res.status}): ${t}` | Check the error message for details |
| `gmail.setCredentials requires accessToken.` | Check the error message for details |
| `getMessage requires messageId` | Check the error message for details |
| `sendEmail requires to, subject, body` | Check the error message for details |
| `trashMessage requires messageId` | Check the error message for details |
| `untrashMessage requires messageId` | Check the error message for details |
| `deleteMessage requires messageId` | Check the error message for details |
| `modifyLabels requires messageId` | Check the error message for details |

```robinpath
set $result as gmail.listMessages
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
gmail.setCredentials $token
set $result as gmail.listMessages
each $item in $result
  print $item
end
```

### 2. Create a new item with sendEmail

Create a new resource and capture the result.

```robinpath
gmail.setCredentials $token
set $result as gmail.sendEmail
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
gmail.setCredentials $token
set $created as gmail.sendEmail
# Update the created item
gmail.modifyLabels
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
gmail.setCredentials $token
set $existing as gmail.listMessages
if $existing == null
  gmail.sendEmail
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Gmail workflow

Chain multiple gmail operations together.

```robinpath
gmail.setCredentials $token
set $r_listMessages as gmail.listMessages
set $r_getMessage as gmail.getMessage
set $r_sendEmail as gmail.sendEmail
print "All operations complete"
```

### 6. Safe listMessages with validation

Check results before proceeding.

```robinpath
gmail.setCredentials $token
set $result as gmail.listMessages
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
- **outlook** -- Outlook module for complementary functionality
