---
title: "Slack"
module: "slack"
package: "@robinpath/slack"
description: "Slack Web API and Incoming Webhooks client for messaging, channels, reactions, file uploads, and user management"
category: "messaging"
tags: [slack, messaging, api, webhook]
type: "integration"
auth: "bearer-token"
functionCount: 12
baseUrl: "https://slack.com"
---

# Slack

> Slack Web API and Incoming Webhooks client for messaging, channels, reactions, file uploads, and user management

**Package:** `@robinpath/slack` | **Category:** Messaging | **Type:** Integration


## Authentication

```robinpath
slack.setToken "default" "xoxb-your-token" {"defaultChannel": "general"}
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `slack` module when you need to:

- **Send a message to a Slack channel via chat.postMessage** -- Use `slack.send` to perform this operation
- **Send a message via a Slack Incoming Webhook URL (no token needed)** -- Use `slack.sendWebhook` to perform this operation
- **Reply to a message thread via chat.postMessage with thread_ts** -- Use `slack.reply` to perform this operation
- **Add an emoji reaction to a message via reactions.add** -- Use `slack.react` to perform this operation
- **Upload a file to a Slack channel using the new file upload API** -- Use `slack.upload` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setToken`](#settoken) | Store a Slack Bot User OAuth Token for a workspace | `{workspaceId, defaultChannel}` |
| [`send`](#send) | Send a message to a Slack channel via chat.postMessage | `{ts, channel}` |
| [`sendWebhook`](#sendwebhook) | Send a message via a Slack Incoming Webhook URL (no token needed) | `{ok, status}` |
| [`reply`](#reply) | Reply to a message thread via chat.postMessage with thread_ts | `{ts, channel}` |
| [`react`](#react) | Add an emoji reaction to a message via reactions.add | `{ok, channel, timestamp, emoji}` |
| [`upload`](#upload) | Upload a file to a Slack channel using the new file upload API | `{ok, fileId, files}` |
| [`listChannels`](#listchannels) | List Slack channels via conversations.list | `Array of {id, name, topic}` |
| [`getHistory`](#gethistory) | Get message history for a channel via conversations.history | `Array of message objects` |
| [`setStatus`](#setstatus) | Set the authenticated user's status via users.profile.set | `{ok, profile}` |
| [`userInfo`](#userinfo) | Get user information via users.info | `{id, name, real_name, email, is_admin}` |
| [`createChannel`](#createchannel) | Create a new Slack channel via conversations.create | `{id, name, is_private}` |
| [`updateMessage`](#updatemessage) | Update an existing message via chat.update | `{ts, channel, text}` |


## Functions

### setToken

Store a Slack Bot User OAuth Token for a workspace

**Module:** `slack` | **Returns:** `object` -- {workspaceId, defaultChannel}

```robinpath
slack.setToken "default" "xoxb-your-token" {"defaultChannel": "general"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspaceId` | `string` | Yes | Workspace identifier (e.g. 'default') |
| `token` | `string` | Yes | Bot User OAuth Token (xoxb-...) |
| `options` | `object` | No | {defaultChannel?: string} |

---

### send

Send a message to a Slack channel via chat.postMessage

**Module:** `slack` | **Returns:** `object` -- {ts, channel}

```robinpath
slack.send "default" "#general" "Hello from RobinPath!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspaceId` | `string` | Yes | Workspace identifier |
| `channel` | `string` | Yes | Channel ID or name |
| `text` | `string` | Yes | Message text |
| `options` | `object` | No | {blocks?, unfurlLinks?, threadTs?} |

---

### sendWebhook

Send a message via a Slack Incoming Webhook URL (no token needed)

**Module:** `slack` | **Returns:** `object` -- {ok, status}

```robinpath
slack.sendWebhook "https://hooks.slack.com/services/T.../B.../xxx" "Deploy complete!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `webhookUrl` | `string` | Yes | Incoming Webhook URL |
| `text` | `string` | Yes | Message text |
| `options` | `object` | No | {username?, iconEmoji?, blocks?} |

---

### reply

Reply to a message thread via chat.postMessage with thread_ts

**Module:** `slack` | **Returns:** `object` -- {ts, channel}

```robinpath
slack.reply "default" "C01234" "1234567890.123456" "Got it, thanks!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspaceId` | `string` | Yes | Workspace identifier |
| `channel` | `string` | Yes | Channel ID |
| `threadTs` | `string` | Yes | Parent message timestamp |
| `text` | `string` | Yes | Reply text |
| `options` | `object` | No | {blocks?, unfurlLinks?} |

---

### react

Add an emoji reaction to a message via reactions.add

**Module:** `slack` | **Returns:** `object` -- {ok, channel, timestamp, emoji}

```robinpath
slack.react "default" "C01234" "1234567890.123456" "thumbsup"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspaceId` | `string` | Yes | Workspace identifier |
| `channel` | `string` | Yes | Channel ID |
| `timestamp` | `string` | Yes | Message timestamp |
| `emoji` | `string` | Yes | Emoji name (e.g. 'thumbsup' or ':thumbsup:') |

---

### upload

Upload a file to a Slack channel using the new file upload API

**Module:** `slack` | **Returns:** `object` -- {ok, fileId, files}

```robinpath
slack.upload "default" "C01234" "./report.pdf" {"title": "Report", "initialComment": "Here is the report"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspaceId` | `string` | Yes | Workspace identifier |
| `channel` | `string` | Yes | Channel ID to share the file in |
| `filePath` | `string` | Yes | Local path to the file |
| `options` | `object` | No | {title?, initialComment?} |

---

### listChannels

List Slack channels via conversations.list

**Module:** `slack` | **Returns:** `array` -- Array of {id, name, topic}

```robinpath
slack.listChannels "default" {"limit": 50}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspaceId` | `string` | Yes | Workspace identifier |
| `options` | `object` | No | {types?, limit?}. types: 'public_channel,private_channel' |

---

### getHistory

Get message history for a channel via conversations.history

**Module:** `slack` | **Returns:** `array` -- Array of message objects

```robinpath
slack.getHistory "default" "C01234" {"limit": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspaceId` | `string` | Yes | Workspace identifier |
| `channel` | `string` | Yes | Channel ID |
| `options` | `object` | No | {limit?, oldest?, latest?} |

---

### setStatus

Set the authenticated user's status via users.profile.set

**Module:** `slack` | **Returns:** `object` -- {ok, profile}

```robinpath
slack.setStatus "default" "Working from home" ":house_with_garden:"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspaceId` | `string` | Yes | Workspace identifier |
| `text` | `string` | Yes | Status text |
| `emoji` | `string` | Yes | Status emoji (e.g. ':house_with_garden:') |
| `options` | `object` | No | {expiration?: number} — Unix timestamp when status expires |

---

### userInfo

Get user information via users.info

**Module:** `slack` | **Returns:** `object` -- {id, name, real_name, email, is_admin}

```robinpath
slack.userInfo "default" "U01234ABC"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspaceId` | `string` | Yes | Workspace identifier |
| `userId` | `string` | Yes | Slack user ID (e.g. 'U01234') |

---

### createChannel

Create a new Slack channel via conversations.create

**Module:** `slack` | **Returns:** `object` -- {id, name, is_private}

```robinpath
slack.createChannel "default" "project-updates" {"isPrivate": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspaceId` | `string` | Yes | Workspace identifier |
| `name` | `string` | Yes | Channel name (lowercase, no spaces) |
| `options` | `object` | No | {isPrivate?: boolean} |

---

### updateMessage

Update an existing message via chat.update

**Module:** `slack` | **Returns:** `object` -- {ts, channel, text}

```robinpath
slack.updateMessage "default" "C01234" "1234567890.123456" "Updated message text"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspaceId` | `string` | Yes | Workspace identifier |
| `channel` | `string` | Yes | Channel ID |
| `ts` | `string` | Yes | Timestamp of the message to update |
| `text` | `string` | Yes | New message text |
| `options` | `object` | No | {blocks?} |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Token is required` | Check the error message for details |
| `Channel is required` | Check the error message for details |
| `Webhook URL is required` | Check the error message for details |
| `Webhook request failed (${response.status}): ${errText}` | Check the error message for details |
| `Thread timestamp (threadTs) is required` | Check the error message for details |
| `Message timestamp is required` | Check the error message for details |
| `Emoji name is required` | Check the error message for details |
| `File path is required` | Check the error message for details |

```robinpath
set $result as slack.send "default" "#general" "Hello from RobinPath!"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Channels

Retrieve all items and loop through them.

```robinpath
slack.setToken $token
set $result as slack.listChannels "default" {"limit": 50}
each $item in $result
  print $item
end
```

### 2. Create a new item with send

Create a new resource and capture the result.

```robinpath
slack.setToken $token
set $result as slack.send "default" "#general" "Hello from RobinPath!"
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
slack.setToken $token
set $created as slack.send "default" "#general" "Hello from RobinPath!"
# Update the created item
slack.updateMessage "default" "C01234" "1234567890.123456" "Updated message text"
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
slack.setToken $token
set $existing as slack.listChannels "default" {"limit": 50}
if $existing == null
  slack.send "default" "#general" "Hello from RobinPath!"
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Slack workflow

Chain multiple slack operations together.

```robinpath
slack.setToken $token
set $r_send as slack.send "default" "#general" "Hello from RobinPath!"
set $r_sendWebhook as slack.sendWebhook "https://hooks.slack.com/services/T.../B.../xxx" "Deploy complete!"
set $r_reply as slack.reply "default" "C01234" "1234567890.123456" "Got it, thanks!"
print "All operations complete"
```

### 6. Safe send with validation

Check results before proceeding.

```robinpath
slack.setToken $token
set $result as slack.send "default" "#general" "Hello from RobinPath!"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **discord** -- Discord module for complementary functionality
- **teams** -- Teams module for complementary functionality
- **telegram** -- Telegram module for complementary functionality
- **whatsapp** -- WhatsApp module for complementary functionality
- **json** -- JSON module for complementary functionality
