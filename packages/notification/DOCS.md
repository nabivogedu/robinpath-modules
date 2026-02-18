---
title: "Notification"
module: "notification"
package: "@robinpath/notification"
description: "Unified notifications to Slack, Discord, Telegram, and Microsoft Teams via webhooks"
category: "messaging"
tags: [notification, messaging, webhook]
type: "integration"
auth: "none"
functionCount: 8
baseUrl: "https://api.telegram.org"
---

# Notification

> Unified notifications to Slack, Discord, Telegram, and Microsoft Teams via webhooks

**Package:** `@robinpath/notification` | **Category:** Messaging | **Type:** Integration


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `notification` module when you need to:

- **Send a message to Slack via webhook** -- Use `notification.slack` to perform this operation
- **Send a rich Slack message with blocks (title, fields, images)** -- Use `notification.slackRich` to perform this operation
- **Send a message to Discord via webhook** -- Use `notification.discord` to perform this operation
- **Send a rich Discord embed message** -- Use `notification.discordEmbed` to perform this operation
- **Send a message via Telegram Bot API** -- Use `notification.telegram` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`slack`](#slack) | Send a message to Slack via webhook | `{ok, status}` |
| [`slackRich`](#slackrich) | Send a rich Slack message with blocks (title, fields, images) | `{ok, status}` |
| [`discord`](#discord) | Send a message to Discord via webhook | `{ok, status}` |
| [`discordEmbed`](#discordembed) | Send a rich Discord embed message | `{ok, status}` |
| [`telegram`](#telegram) | Send a message via Telegram Bot API | `{ok, messageId}` |
| [`teams`](#teams) | Send a message to Microsoft Teams via webhook | `{ok, status}` |
| [`teamsCard`](#teamscard) | Send a rich MessageCard to Microsoft Teams | `{ok, status}` |
| [`sendAll`](#sendall) | Send a message to multiple channels at once | `Array of {channel, ok, error?}` |


## Functions

### slack

Send a message to Slack via webhook

**Module:** `notification` | **Returns:** `object` -- {ok, status}

```robinpath
notification.slack $webhookUrl "Deploy complete!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `webhookUrl` | `string` | Yes | Slack incoming webhook URL |
| `message` | `any` | Yes | String or Slack message object |

---

### slackRich

Send a rich Slack message with blocks (title, fields, images)

**Module:** `notification` | **Returns:** `object` -- {ok, status}

```robinpath
notification.slackRich $url {"title": "Deploy", "text": "v1.2.3 deployed"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `webhookUrl` | `string` | Yes | Slack webhook URL |
| `options` | `object` | Yes | {title, text, fields, imageUrl, channel, username, iconEmoji} |

---

### discord

Send a message to Discord via webhook

**Module:** `notification` | **Returns:** `object` -- {ok, status}

```robinpath
notification.discord $webhookUrl "Build passed!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `webhookUrl` | `string` | Yes | Discord webhook URL |
| `message` | `any` | Yes | String or Discord message object |

---

### discordEmbed

Send a rich Discord embed message

**Module:** `notification` | **Returns:** `object` -- {ok, status}

```robinpath
notification.discordEmbed $url {"title": "Alert", "description": "CPU > 90%", "color": "#FF0000"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `webhookUrl` | `string` | Yes | Discord webhook URL |
| `options` | `object` | Yes | {title, description, color, fields, thumbnail, image, footer, timestamp} |

---

### telegram

Send a message via Telegram Bot API

**Module:** `notification` | **Returns:** `object` -- {ok, messageId}

```robinpath
notification.telegram $token $chatId "<b>Alert:</b> Server down"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `botToken` | `string` | Yes | Telegram bot token |
| `chatId` | `string` | Yes | Chat/group ID |
| `message` | `string` | Yes | Message text (HTML or Markdown) |
| `options` | `object` | No | {parseMode, disablePreview, silent} |

---

### teams

Send a message to Microsoft Teams via webhook

**Module:** `notification` | **Returns:** `object` -- {ok, status}

```robinpath
notification.teams $webhookUrl "Task completed"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `webhookUrl` | `string` | Yes | Teams webhook URL |
| `message` | `any` | Yes | String or Teams message object |

---

### teamsCard

Send a rich MessageCard to Microsoft Teams

**Module:** `notification` | **Returns:** `object` -- {ok, status}

```robinpath
notification.teamsCard $url {"title": "Release", "text": "v2.0 deployed", "color": "00FF00"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `webhookUrl` | `string` | Yes | Teams webhook URL |
| `options` | `object` | Yes | {title, text, color, sections, actions} |

---

### sendAll

Send a message to multiple channels at once

**Module:** `notification` | **Returns:** `array` -- Array of {channel, ok, error?}

```robinpath
notification.sendAll $channels "System alert: disk 90%"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `channels` | `array` | Yes | Array of {type, url/token, chatId} |
| `message` | `string` | Yes | Message text |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Slack webhook URL is required` | Check the error message for details |
| `Discord webhook URL is required` | Check the error message for details |
| `Bot token and chat ID are required` | Check the error message for details |
| `Teams webhook URL is required` | Check the error message for details |

```robinpath
set $result as notification.slack $webhookUrl "Deploy complete!"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with sendAll

Create a new resource and capture the result.

```robinpath
set $result as notification.sendAll $channels "System alert: disk 90%"
print "Created: " + $result
```

### 2. Multi-step Notification workflow

Chain multiple notification operations together.

```robinpath
set $r_slack as notification.slack $webhookUrl "Deploy complete!"
set $r_slackRich as notification.slackRich $url {"title": "Deploy", "text": "v1.2.3 deployed"}
set $r_discord as notification.discord $webhookUrl "Build passed!"
print "All operations complete"
```

### 3. Safe slack with validation

Check results before proceeding.

```robinpath
set $result as notification.slack $webhookUrl "Deploy complete!"
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
- **whatsapp** -- WhatsApp module for complementary functionality
