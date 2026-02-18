---
title: "Telegram"
module: "telegram"
package: "@robinpath/telegram"
description: "Telegram Bot API client for sending messages, photos, documents, locations, polls, stickers, and managing chats"
category: "messaging"
tags: [telegram, messaging, api]
type: "integration"
auth: "bearer-token"
functionCount: 12
baseUrl: "https://api.telegram.org"
---

# Telegram

> Telegram Bot API client for sending messages, photos, documents, locations, polls, stickers, and managing chats

**Package:** `@robinpath/telegram` | **Category:** Messaging | **Type:** Integration


## Authentication

```robinpath
telegram.setToken "default" "123456:ABC-DEF..."
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `telegram` module when you need to:

- **Get info about the bot (id, first_name, username)** -- Use `telegram.getMe` to perform this operation
- **Send a text message to a chat** -- Use `telegram.send` to perform this operation
- **Send a photo from a local file to a chat** -- Use `telegram.sendPhoto` to perform this operation
- **Send a document/file from a local path to a chat** -- Use `telegram.sendDocument` to perform this operation
- **Send a GPS location to a chat** -- Use `telegram.sendLocation` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setToken`](#settoken) | Store a Telegram bot token for subsequent API calls | `{botId, set}` |
| [`getMe`](#getme) | Get info about the bot (id, first_name, username) | `{id, is_bot, first_name, username}` |
| [`send`](#send) | Send a text message to a chat | `Telegram Message object` |
| [`sendPhoto`](#sendphoto) | Send a photo from a local file to a chat | `Telegram Message object` |
| [`sendDocument`](#senddocument) | Send a document/file from a local path to a chat | `Telegram Message object` |
| [`sendLocation`](#sendlocation) | Send a GPS location to a chat | `Telegram Message object` |
| [`sendPoll`](#sendpoll) | Send a poll to a chat | `Telegram Message object with poll` |
| [`editMessage`](#editmessage) | Edit the text of an existing message | `Edited Telegram Message object` |
| [`deleteMessage`](#deletemessage) | Delete a message from a chat | `true on success` |
| [`getUpdates`](#getupdates) | Receive incoming updates via long polling | `Array of Telegram Update objects` |
| [`sendSticker`](#sendsticker) | Send a sticker by file_id to a chat | `Telegram Message object with sticker` |
| [`getChat`](#getchat) | Get up-to-date information about a chat | `Telegram Chat object` |


## Functions

### setToken

Store a Telegram bot token for subsequent API calls

**Module:** `telegram` | **Returns:** `object` -- {botId, set}

```robinpath
telegram.setToken "default" "123456:ABC-DEF..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `botId` | `string` | No | Bot identifier (default: "default") |
| `token` | `string` | Yes | Telegram bot token from @BotFather |

---

### getMe

Get info about the bot (id, first_name, username)

**Module:** `telegram` | **Returns:** `object` -- {id, is_bot, first_name, username}

```robinpath
telegram.getMe "default"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `botId` | `string` | No | Bot identifier (default: "default") |

---

### send

Send a text message to a chat

**Module:** `telegram` | **Returns:** `object` -- Telegram Message object

```robinpath
telegram.send "default" "-100123456" "Hello from RobinPath!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `botId` | `string` | Yes | Bot identifier |
| `chatId` | `string` | Yes | Target chat ID or @username |
| `text` | `string` | Yes | Message text |
| `options` | `object` | No | {parseMode?, disableNotification?, replyToMessageId?} |

---

### sendPhoto

Send a photo from a local file to a chat

**Module:** `telegram` | **Returns:** `object` -- Telegram Message object

```robinpath
telegram.sendPhoto "default" "-100123456" "/tmp/photo.jpg" {"caption": "Look at this!"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `botId` | `string` | Yes | Bot identifier |
| `chatId` | `string` | Yes | Target chat ID or @username |
| `photoPath` | `string` | Yes | Absolute path to image file |
| `options` | `object` | No | {caption?} |

---

### sendDocument

Send a document/file from a local path to a chat

**Module:** `telegram` | **Returns:** `object` -- Telegram Message object

```robinpath
telegram.sendDocument "default" "-100123456" "/tmp/report.pdf" {"caption": "Monthly report"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `botId` | `string` | Yes | Bot identifier |
| `chatId` | `string` | Yes | Target chat ID or @username |
| `filePath` | `string` | Yes | Absolute path to file |
| `options` | `object` | No | {caption?} |

---

### sendLocation

Send a GPS location to a chat

**Module:** `telegram` | **Returns:** `object` -- Telegram Message object

```robinpath
telegram.sendLocation "default" "-100123456" 48.8566 2.3522
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `botId` | `string` | Yes | Bot identifier |
| `chatId` | `string` | Yes | Target chat ID or @username |
| `latitude` | `number` | Yes | Latitude |
| `longitude` | `number` | Yes | Longitude |

---

### sendPoll

Send a poll to a chat

**Module:** `telegram` | **Returns:** `object` -- Telegram Message object with poll

```robinpath
telegram.sendPoll "default" "-100123456" "Best language?" ["TypeScript", "Rust", "Go"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `botId` | `string` | Yes | Bot identifier |
| `chatId` | `string` | Yes | Target chat ID or @username |
| `question` | `string` | Yes | Poll question |
| `options` | `array` | Yes | Array of answer option strings |

---

### editMessage

Edit the text of an existing message

**Module:** `telegram` | **Returns:** `object` -- Edited Telegram Message object

```robinpath
telegram.editMessage "default" "-100123456" 42 "Updated text"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `botId` | `string` | Yes | Bot identifier |
| `chatId` | `string` | Yes | Chat ID where the message is |
| `messageId` | `number` | Yes | ID of the message to edit |
| `text` | `string` | Yes | New message text |
| `options` | `object` | No | {parseMode?} |

---

### deleteMessage

Delete a message from a chat

**Module:** `telegram` | **Returns:** `object` -- true on success

```robinpath
telegram.deleteMessage "default" "-100123456" 42
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `botId` | `string` | Yes | Bot identifier |
| `chatId` | `string` | Yes | Chat ID |
| `messageId` | `number` | Yes | ID of the message to delete |

---

### getUpdates

Receive incoming updates via long polling

**Module:** `telegram` | **Returns:** `array` -- Array of Telegram Update objects

```robinpath
telegram.getUpdates "default" {"offset": 0, "limit": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `botId` | `string` | Yes | Bot identifier |
| `options` | `object` | No | {offset?, limit?, timeout?} |

---

### sendSticker

Send a sticker by file_id to a chat

**Module:** `telegram` | **Returns:** `object` -- Telegram Message object with sticker

```robinpath
telegram.sendSticker "default" "-100123456" "CAACAgIAAxk..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `botId` | `string` | Yes | Bot identifier |
| `chatId` | `string` | Yes | Target chat ID or @username |
| `stickerId` | `string` | Yes | Sticker file_id |

---

### getChat

Get up-to-date information about a chat

**Module:** `telegram` | **Returns:** `object` -- Telegram Chat object

```robinpath
telegram.getChat "default" "-100123456"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `botId` | `string` | Yes | Bot identifier |
| `chatId` | `string` | Yes | Chat ID or @username |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Telegram API error: ${data.description ?? JSON.stringify(data)}` | Check the error message for details |
| `Bot token is required.` | Check the error message for details |
| `chatId is required.` | Check the error message for details |
| `text is required.` | Check the error message for details |
| `photoPath is required.` | Check the error message for details |
| `filePath is required.` | Check the error message for details |
| `question is required.` | Check the error message for details |
| `At least 2 poll options are required.` | Check the error message for details |

```robinpath
set $result as telegram.getMe "default"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Me

Retrieve all items and loop through them.

```robinpath
telegram.setToken $token
set $result as telegram.getMe "default"
each $item in $result
  print $item
end
```

### 2. Create a new item with send

Create a new resource and capture the result.

```robinpath
telegram.setToken $token
set $result as telegram.send "default" "-100123456" "Hello from RobinPath!"
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
telegram.setToken $token
set $created as telegram.send "default" "-100123456" "Hello from RobinPath!"
# Update the created item
telegram.editMessage "default" "-100123456" 42 "Updated text"
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
telegram.setToken $token
set $existing as telegram.getMe "default"
if $existing == null
  telegram.send "default" "-100123456" "Hello from RobinPath!"
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Telegram workflow

Chain multiple telegram operations together.

```robinpath
telegram.setToken $token
set $r_getMe as telegram.getMe "default"
set $r_send as telegram.send "default" "-100123456" "Hello from RobinPath!"
set $r_sendPhoto as telegram.sendPhoto "default" "-100123456" "/tmp/photo.jpg" {"caption": "Look at this!"}
print "All operations complete"
```

### 6. Safe getMe with validation

Check results before proceeding.

```robinpath
telegram.setToken $token
set $result as telegram.getMe "default"
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
- **whatsapp** -- WhatsApp module for complementary functionality
- **json** -- JSON module for complementary functionality
