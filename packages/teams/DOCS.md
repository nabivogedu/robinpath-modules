---
title: "Teams"
module: "teams"
package: "@robinpath/teams"
description: "Teams module for RobinPath."
category: "messaging"
tags: [teams, messaging]
type: "integration"
auth: "bearer-token"
functionCount: 10
baseUrl: "https://graph.microsoft.com"
---

# Teams

> Teams module for RobinPath.

**Package:** `@robinpath/teams` | **Category:** Messaging | **Type:** Integration


## Authentication

```robinpath
teams.setToken "eyJ0xxx"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `teams` module when you need to:

- **Send a message to a Teams channel.** -- Use `teams.sendChannel` to perform this operation
- **Send a message in a 1:1 or group chat.** -- Use `teams.sendChat` to perform this operation
- **Reply to a message in a channel.** -- Use `teams.replyToMessage` to perform this operation
- **List all teams the user has joined.** -- Use `teams.listTeams` to perform this operation
- **List channels in a team.** -- Use `teams.listChannels` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setToken`](#settoken) | Set the Microsoft Graph API access token. | `Confirmation message.` |
| [`sendChannel`](#sendchannel) | Send a message to a Teams channel. | `Created message object.` |
| [`sendChat`](#sendchat) | Send a message in a 1:1 or group chat. | `Created message object.` |
| [`replyToMessage`](#replytomessage) | Reply to a message in a channel. | `Created reply message.` |
| [`listTeams`](#listteams) | List all teams the user has joined. | `Object with value array of teams.` |
| [`listChannels`](#listchannels) | List channels in a team. | `Object with value array of channels.` |
| [`getMessages`](#getmessages) | Get messages from a channel. | `Object with value array of messages.` |
| [`createChannel`](#createchannel) | Create a new channel in a team. | `Created channel object.` |
| [`listChats`](#listchats) | List all chats for the current user. | `Object with value array of chats.` |
| [`sendWebhook`](#sendwebhook) | Send a message via an incoming webhook URL. | `Confirmation message.` |


## Functions

### setToken

Set the Microsoft Graph API access token.

**Module:** `teams` | **Returns:** `string` -- Confirmation message.

```robinpath
teams.setToken "eyJ0xxx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | `string` | Yes | OAuth2 access token with Teams permissions |

---

### sendChannel

Send a message to a Teams channel.

**Module:** `teams` | **Returns:** `object` -- Created message object.

```robinpath
teams.sendChannel "team-id" "channel-id" "Hello team!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `teamId` | `string` | Yes | Team ID |
| `channelId` | `string` | Yes | Channel ID |
| `message` | `string` | Yes | Message content (supports HTML) |

---

### sendChat

Send a message in a 1:1 or group chat.

**Module:** `teams` | **Returns:** `object` -- Created message object.

```robinpath
teams.sendChat "chat-id" "Hey there!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `chatId` | `string` | Yes | Chat ID |
| `message` | `string` | Yes | Message content (supports HTML) |

---

### replyToMessage

Reply to a message in a channel.

**Module:** `teams` | **Returns:** `object` -- Created reply message.

```robinpath
teams.replyToMessage "team-id" "channel-id" "msg-id" "Thanks!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `teamId` | `string` | Yes | Team ID |
| `channelId` | `string` | Yes | Channel ID |
| `messageId` | `string` | Yes | Message ID to reply to |
| `reply` | `string` | Yes | Reply content |

---

### listTeams

List all teams the user has joined.

**Module:** `teams` | **Returns:** `object` -- Object with value array of teams.

```robinpath
teams.listTeams
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### listChannels

List channels in a team.

**Module:** `teams` | **Returns:** `object` -- Object with value array of channels.

```robinpath
teams.listChannels "team-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `teamId` | `string` | Yes | Team ID |

---

### getMessages

Get messages from a channel.

**Module:** `teams` | **Returns:** `object` -- Object with value array of messages.

```robinpath
teams.getMessages "team-id" "channel-id" {"top":20}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `teamId` | `string` | Yes | Team ID |
| `channelId` | `string` | Yes | Channel ID |
| `options` | `object` | No | Options: top (number of messages) |

---

### createChannel

Create a new channel in a team.

**Module:** `teams` | **Returns:** `object` -- Created channel object.

```robinpath
teams.createChannel "team-id" "New Channel" {"description":"A new channel"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `teamId` | `string` | Yes | Team ID |
| `displayName` | `string` | Yes | Channel name |
| `options` | `object` | No | Options: description, membershipType (standard|private|shared) |

---

### listChats

List all chats for the current user.

**Module:** `teams` | **Returns:** `object` -- Object with value array of chats.

```robinpath
teams.listChats
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### sendWebhook

Send a message via an incoming webhook URL.

**Module:** `teams` | **Returns:** `string` -- Confirmation message.

```robinpath
teams.sendWebhook "https://outlook.office.com/webhook/xxx" "Alert: Build passed!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `webhookUrl` | `string` | Yes | Incoming webhook URL |
| `message` | `string` | Yes | Message text |
| `options` | `object` | No | Options: title, themeColor, sections |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Teams: token not configured. Call teams.setToken first.` | Check the error message for details |
| `Microsoft Graph API error (${res.status}): ${text}` | Check the error message for details |
| `teams.setToken requires a token.` | Check the error message for details |
| `teams.sendChannel requires teamId, channelId, and message.` | Check the error message for details |
| `teams.sendChat requires chatId and message.` | Check the error message for details |
| `teams.replyToMessage requires teamId, channelId, messageId, and reply.` | Check the error message for details |
| `teams.listChannels requires a teamId.` | Check the error message for details |
| `teams.getMessages requires teamId and channelId.` | Check the error message for details |

```robinpath
set $result as teams.sendChannel "team-id" "channel-id" "Hello team!"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Teams

Retrieve all items and loop through them.

```robinpath
teams.setToken $token
set $result as teams.listTeams
each $item in $result
  print $item
end
```

### 2. Create a new item with sendChannel

Create a new resource and capture the result.

```robinpath
teams.setToken $token
set $result as teams.sendChannel "team-id" "channel-id" "Hello team!"
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
teams.setToken $token
set $existing as teams.listTeams
if $existing == null
  teams.sendChannel "team-id" "channel-id" "Hello team!"
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Teams workflow

Chain multiple teams operations together.

```robinpath
teams.setToken $token
set $r_sendChannel as teams.sendChannel "team-id" "channel-id" "Hello team!"
set $r_sendChat as teams.sendChat "chat-id" "Hey there!"
set $r_replyToMessage as teams.replyToMessage "team-id" "channel-id" "msg-id" "Thanks!"
print "All operations complete"
```

### 5. Safe sendChannel with validation

Check results before proceeding.

```robinpath
teams.setToken $token
set $result as teams.sendChannel "team-id" "channel-id" "Hello team!"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **slack** -- Slack module for complementary functionality
- **discord** -- Discord module for complementary functionality
- **telegram** -- Telegram module for complementary functionality
- **whatsapp** -- WhatsApp module for complementary functionality
- **json** -- JSON module for complementary functionality
