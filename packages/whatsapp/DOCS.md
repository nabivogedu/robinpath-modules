---
title: "WhatsApp"
module: "whatsapp"
package: "@robinpath/whatsapp"
description: "WhatsApp module for RobinPath."
category: "messaging"
tags: [whatsapp, messaging]
type: "integration"
auth: "api-key"
functionCount: 10
baseUrl: "https://graph.facebook.com"
---

# WhatsApp

> WhatsApp module for RobinPath.

**Package:** `@robinpath/whatsapp` | **Category:** Messaging | **Type:** Integration


## Authentication

```robinpath
whatsapp.setCredentials "EAABxxx" "1234567890"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `whatsapp` module when you need to:

- **Send a text message.** -- Use `whatsapp.sendText` to perform this operation
- **Send a pre-approved template message.** -- Use `whatsapp.sendTemplate` to perform this operation
- **Send an image message.** -- Use `whatsapp.sendImage` to perform this operation
- **Send a document message.** -- Use `whatsapp.sendDocument` to perform this operation
- **Send a location message.** -- Use `whatsapp.sendLocation` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Set WhatsApp Cloud API credentials. | `Confirmation message.` |
| [`sendText`](#sendtext) | Send a text message. | `Message send response.` |
| [`sendTemplate`](#sendtemplate) | Send a pre-approved template message. | `Message send response.` |
| [`sendImage`](#sendimage) | Send an image message. | `Message send response.` |
| [`sendDocument`](#senddocument) | Send a document message. | `Message send response.` |
| [`sendLocation`](#sendlocation) | Send a location message. | `Message send response.` |
| [`sendContact`](#sendcontact) | Send contact card(s). | `Message send response.` |
| [`markRead`](#markread) | Mark a message as read. | `Status response.` |
| [`getProfile`](#getprofile) | Get the WhatsApp Business profile. | `Business profile data.` |
| [`updateProfile`](#updateprofile) | Update the WhatsApp Business profile. | `Update response.` |


## Functions

### setCredentials

Set WhatsApp Cloud API credentials.

**Module:** `whatsapp` | **Returns:** `string` -- Confirmation message.

```robinpath
whatsapp.setCredentials "EAABxxx" "1234567890"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | Permanent or temporary access token |
| `phoneNumberId` | `string` | Yes | WhatsApp Business phone number ID |

---

### sendText

Send a text message.

**Module:** `whatsapp` | **Returns:** `object` -- Message send response.

```robinpath
whatsapp.sendText "+1234567890" "Hello from RobinPath!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | `string` | Yes | Recipient phone number (international format) |
| `message` | `string` | Yes | Message text |

---

### sendTemplate

Send a pre-approved template message.

**Module:** `whatsapp` | **Returns:** `object` -- Message send response.

```robinpath
whatsapp.sendTemplate "+1234567890" "hello_world"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | `string` | Yes | Recipient phone number |
| `templateName` | `string` | Yes | Template name |
| `languageCode` | `string` | No | Language code (default: en_US) |
| `components` | `array` | No | Template component parameters |

---

### sendImage

Send an image message.

**Module:** `whatsapp` | **Returns:** `object` -- Message send response.

```robinpath
whatsapp.sendImage "+1234567890" "https://example.com/photo.jpg" "Check this out"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | `string` | Yes | Recipient phone number |
| `imageUrl` | `string` | Yes | Public URL of the image |
| `caption` | `string` | No | Optional image caption |

---

### sendDocument

Send a document message.

**Module:** `whatsapp` | **Returns:** `object` -- Message send response.

```robinpath
whatsapp.sendDocument "+1234567890" "https://example.com/report.pdf" {"filename":"report.pdf"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | `string` | Yes | Recipient phone number |
| `documentUrl` | `string` | Yes | Public URL of the document |
| `options` | `object` | No | Options: filename, caption |

---

### sendLocation

Send a location message.

**Module:** `whatsapp` | **Returns:** `object` -- Message send response.

```robinpath
whatsapp.sendLocation "+1234567890" 37.7749 -122.4194 {"name":"San Francisco"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | `string` | Yes | Recipient phone number |
| `latitude` | `number` | Yes | Latitude |
| `longitude` | `number` | Yes | Longitude |
| `options` | `object` | No | Options: name, address |

---

### sendContact

Send contact card(s).

**Module:** `whatsapp` | **Returns:** `object` -- Message send response.

```robinpath
whatsapp.sendContact "+1234567890" [{"name":{"formatted_name":"John Doe"},"phones":[{"phone":"+0987654321"}]}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | `string` | Yes | Recipient phone number |
| `contacts` | `array` | Yes | Array of contact objects |

---

### markRead

Mark a message as read.

**Module:** `whatsapp` | **Returns:** `object` -- Status response.

```robinpath
whatsapp.markRead "wamid.xxx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messageId` | `string` | Yes | Message ID to mark as read |

---

### getProfile

Get the WhatsApp Business profile.

**Module:** `whatsapp` | **Returns:** `object` -- Business profile data.

```robinpath
whatsapp.getProfile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### updateProfile

Update the WhatsApp Business profile.

**Module:** `whatsapp` | **Returns:** `object` -- Update response.

```robinpath
whatsapp.updateProfile {"about":"We are a business","description":"Our business description"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `profile` | `object` | Yes | Profile fields to update (about, address, description, email, websites, vertical) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `WhatsApp API error (${res.status}): ${text}` | Check the error message for details |
| `whatsapp.setCredentials requires accessToken and phoneNumberId.` | Check the error message for details |
| `whatsapp.sendText requires to and message.` | Check the error message for details |
| `whatsapp.sendTemplate requires to and templateName.` | Check the error message for details |
| `whatsapp.sendImage requires to and imageUrl.` | Check the error message for details |
| `whatsapp.sendDocument requires to and documentUrl.` | Check the error message for details |
| `whatsapp.sendLocation requires to, latitude, and longitude.` | Check the error message for details |
| `whatsapp.sendContact requires to and contacts array.` | Check the error message for details |

```robinpath
set $result as whatsapp.sendText "+1234567890" "Hello from RobinPath!"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Profile

Retrieve all items and loop through them.

```robinpath
whatsapp.setCredentials $token
set $result as whatsapp.getProfile
each $item in $result
  print $item
end
```

### 2. Create a new item with sendText

Create a new resource and capture the result.

```robinpath
whatsapp.setCredentials $token
set $result as whatsapp.sendText "+1234567890" "Hello from RobinPath!"
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
whatsapp.setCredentials $token
set $created as whatsapp.sendText "+1234567890" "Hello from RobinPath!"
# Update the created item
whatsapp.updateProfile {"about":"We are a business","description":"Our business description"}
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
whatsapp.setCredentials $token
set $existing as whatsapp.getProfile
if $existing == null
  whatsapp.sendText "+1234567890" "Hello from RobinPath!"
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step WhatsApp workflow

Chain multiple whatsapp operations together.

```robinpath
whatsapp.setCredentials $token
set $r_sendText as whatsapp.sendText "+1234567890" "Hello from RobinPath!"
set $r_sendTemplate as whatsapp.sendTemplate "+1234567890" "hello_world"
set $r_sendImage as whatsapp.sendImage "+1234567890" "https://example.com/photo.jpg" "Check this out"
print "All operations complete"
```

### 6. Safe sendText with validation

Check results before proceeding.

```robinpath
whatsapp.setCredentials $token
set $result as whatsapp.sendText "+1234567890" "Hello from RobinPath!"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **slack** -- Slack module for complementary functionality
- **discord** -- Discord module for complementary functionality
- **teams** -- Teams module for complementary functionality
- **telegram** -- Telegram module for complementary functionality
- **json** -- JSON module for complementary functionality
