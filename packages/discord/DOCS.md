---
title: "Discord"
module: "discord"
package: "@robinpath/discord"
description: "Discord module for RobinPath."
category: "messaging"
tags: [discord, messaging]
type: "integration"
auth: "bearer-token"
functionCount: 28
baseUrl: "https://discord.com/api/v10"
---

# Discord

> Discord module for RobinPath.

**Package:** `@robinpath/discord` | **Category:** Messaging | **Type:** Integration


## Authentication

```robinpath
discord.setToken "your-bot-token"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `discord` module when you need to:

- **Send a message via a Discord webhook URL (no bot token needed)** -- Use `discord.sendWebhook` to perform this operation
- **Send a message to a Discord channel** -- Use `discord.sendMessage` to perform this operation
- **Edit an existing message in a channel** -- Use `discord.editMessage` to perform this operation
- **Delete a message from a channel** -- Use `discord.deleteMessage` to perform this operation
- **Get information about a channel** -- Use `discord.getChannel` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setToken`](#settoken) | Store a Discord bot token for subsequent API calls | `{ok: true}` |
| [`sendWebhook`](#sendwebhook) | Send a message via a Discord webhook URL (no bot token needed) | `Webhook response or {ok: true}` |
| [`sendMessage`](#sendmessage) | Send a message to a Discord channel | `Discord Message object` |
| [`editMessage`](#editmessage) | Edit an existing message in a channel | `Updated Discord Message object` |
| [`deleteMessage`](#deletemessage) | Delete a message from a channel | `{ok: true}` |
| [`getChannel`](#getchannel) | Get information about a channel | `Discord Channel object` |
| [`listChannels`](#listchannels) | List all channels in a guild/server | `Array of Discord Channel objects` |
| [`createChannel`](#createchannel) | Create a new channel in a guild (0=text, 2=voice, 4=category, 13=stage, 15=forum) | `Created Discord Channel object` |
| [`deleteChannel`](#deletechannel) | Delete a channel | `Deleted Channel object` |
| [`addReaction`](#addreaction) | Add a reaction emoji to a message | `{ok: true}` |
| [`removeReaction`](#removereaction) | Remove own reaction from a message | `{ok: true}` |
| [`pinMessage`](#pinmessage) | Pin a message in a channel | `{ok: true}` |
| [`unpinMessage`](#unpinmessage) | Unpin a message from a channel | `{ok: true}` |
| [`getGuild`](#getguild) | Get information about a guild/server | `Discord Guild object` |
| [`listGuildMembers`](#listguildmembers) | List members of a guild/server | `Array of Guild Member objects` |
| [`getGuildMember`](#getguildmember) | Get a specific member of a guild | `Guild Member object` |
| [`addRole`](#addrole) | Add a role to a guild member | `{ok: true}` |
| [`removeRole`](#removerole) | Remove a role from a guild member | `{ok: true}` |
| [`listRoles`](#listroles) | List all roles in a guild/server | `Array of Role objects` |
| [`createRole`](#createrole) | Create a new role in a guild/server | `Created Role object` |
| [`banMember`](#banmember) | Ban a member from a guild/server | `{ok: true}` |
| [`unbanMember`](#unbanmember) | Remove a ban for a user from a guild/server | `{ok: true}` |
| [`kickMember`](#kickmember) | Kick a member from a guild/server | `{ok: true}` |
| [`createThread`](#createthread) | Create a new thread in a channel | `Created Thread Channel object` |
| [`sendEmbed`](#sendembed) | Send a rich embed message to a channel | `Discord Message object with embed` |
| [`getUser`](#getuser) | Get information about a Discord user | `Discord User object` |
| [`listMessages`](#listmessages) | List messages in a channel | `Array of Discord Message objects` |
| [`createInvite`](#createinvite) | Create an invite for a channel | `Discord Invite object with code` |


## Functions

### setToken

Store a Discord bot token for subsequent API calls

**Module:** `discord` | **Returns:** `object` -- {ok: true}

```robinpath
discord.setToken "your-bot-token"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `botToken` | `string` | Yes | Discord bot token |

---

### sendWebhook

Send a message via a Discord webhook URL (no bot token needed)

**Module:** `discord` | **Returns:** `object` -- Webhook response or {ok: true}

```robinpath
discord.sendWebhook "https://discord.com/api/webhooks/..." "Hello!" {"username": "MyBot"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `webhookUrl` | `string` | Yes | Discord webhook URL |
| `content` | `string` | No | Message text content |
| `options` | `object` | No | {embeds?, username?, avatarUrl?} |

---

### sendMessage

Send a message to a Discord channel

**Module:** `discord` | **Returns:** `object` -- Discord Message object

```robinpath
discord.sendMessage "123456789" "Hello from RobinPath!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `channelId` | `string` | Yes | Channel ID |
| `content` | `string` | No | Message text content |
| `options` | `object` | No | {embeds?, components?} |

---

### editMessage

Edit an existing message in a channel

**Module:** `discord` | **Returns:** `object` -- Updated Discord Message object

```robinpath
discord.editMessage "123456789" "987654321" "Updated text"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `channelId` | `string` | Yes | Channel ID |
| `messageId` | `string` | Yes | Message ID to edit |
| `content` | `string` | No | New message text content |
| `options` | `object` | No | {embeds?, components?} |

---

### deleteMessage

Delete a message from a channel

**Module:** `discord` | **Returns:** `object` -- {ok: true}

```robinpath
discord.deleteMessage "123456789" "987654321"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `channelId` | `string` | Yes | Channel ID |
| `messageId` | `string` | Yes | Message ID to delete |

---

### getChannel

Get information about a channel

**Module:** `discord` | **Returns:** `object` -- Discord Channel object

```robinpath
discord.getChannel "123456789"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `channelId` | `string` | Yes | Channel ID |

---

### listChannels

List all channels in a guild/server

**Module:** `discord` | **Returns:** `array` -- Array of Discord Channel objects

```robinpath
discord.listChannels "123456789"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `guildId` | `string` | Yes | Guild/server ID |

---

### createChannel

Create a new channel in a guild (0=text, 2=voice, 4=category, 13=stage, 15=forum)

**Module:** `discord` | **Returns:** `object` -- Created Discord Channel object

```robinpath
discord.createChannel "123456789" "general-chat" 0 {"topic": "General discussion"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `guildId` | `string` | Yes | Guild/server ID |
| `name` | `string` | Yes | Channel name |
| `type` | `number` | No | Channel type (0=text, 2=voice). Default: 0 |
| `options` | `object` | No | {topic?, parentId?, nsfw?, rateLimitPerUser?, bitrate?, userLimit?} |

---

### deleteChannel

Delete a channel

**Module:** `discord` | **Returns:** `object` -- Deleted Channel object

```robinpath
discord.deleteChannel "123456789"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `channelId` | `string` | Yes | Channel ID to delete |

---

### addReaction

Add a reaction emoji to a message

**Module:** `discord` | **Returns:** `object` -- {ok: true}

```robinpath
discord.addReaction "123456789" "987654321" "👍"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `channelId` | `string` | Yes | Channel ID |
| `messageId` | `string` | Yes | Message ID |
| `emoji` | `string` | Yes | Emoji (Unicode or custom format name:id) |

---

### removeReaction

Remove own reaction from a message

**Module:** `discord` | **Returns:** `object` -- {ok: true}

```robinpath
discord.removeReaction "123456789" "987654321" "👍"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `channelId` | `string` | Yes | Channel ID |
| `messageId` | `string` | Yes | Message ID |
| `emoji` | `string` | Yes | Emoji (Unicode or custom format name:id) |

---

### pinMessage

Pin a message in a channel

**Module:** `discord` | **Returns:** `object` -- {ok: true}

```robinpath
discord.pinMessage "123456789" "987654321"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `channelId` | `string` | Yes | Channel ID |
| `messageId` | `string` | Yes | Message ID to pin |

---

### unpinMessage

Unpin a message from a channel

**Module:** `discord` | **Returns:** `object` -- {ok: true}

```robinpath
discord.unpinMessage "123456789" "987654321"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `channelId` | `string` | Yes | Channel ID |
| `messageId` | `string` | Yes | Message ID to unpin |

---

### getGuild

Get information about a guild/server

**Module:** `discord` | **Returns:** `object` -- Discord Guild object

```robinpath
discord.getGuild "123456789"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `guildId` | `string` | Yes | Guild/server ID |

---

### listGuildMembers

List members of a guild/server

**Module:** `discord` | **Returns:** `array` -- Array of Guild Member objects

```robinpath
discord.listGuildMembers "123456789" {"limit": 100}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `guildId` | `string` | Yes | Guild/server ID |
| `options` | `object` | No | {limit?, after?} |

---

### getGuildMember

Get a specific member of a guild

**Module:** `discord` | **Returns:** `object` -- Guild Member object

```robinpath
discord.getGuildMember "123456789" "987654321"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `guildId` | `string` | Yes | Guild/server ID |
| `userId` | `string` | Yes | User ID |

---

### addRole

Add a role to a guild member

**Module:** `discord` | **Returns:** `object` -- {ok: true}

```robinpath
discord.addRole "123456789" "987654321" "111222333"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `guildId` | `string` | Yes | Guild/server ID |
| `userId` | `string` | Yes | User ID |
| `roleId` | `string` | Yes | Role ID to add |

---

### removeRole

Remove a role from a guild member

**Module:** `discord` | **Returns:** `object` -- {ok: true}

```robinpath
discord.removeRole "123456789" "987654321" "111222333"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `guildId` | `string` | Yes | Guild/server ID |
| `userId` | `string` | Yes | User ID |
| `roleId` | `string` | Yes | Role ID to remove |

---

### listRoles

List all roles in a guild/server

**Module:** `discord` | **Returns:** `array` -- Array of Role objects

```robinpath
discord.listRoles "123456789"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `guildId` | `string` | Yes | Guild/server ID |

---

### createRole

Create a new role in a guild/server

**Module:** `discord` | **Returns:** `object` -- Created Role object

```robinpath
discord.createRole "123456789" "Moderator" {"color": 3447003, "hoist": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `guildId` | `string` | Yes | Guild/server ID |
| `name` | `string` | Yes | Role name |
| `options` | `object` | No | {color?, permissions?, hoist?, mentionable?} |

---

### banMember

Ban a member from a guild/server

**Module:** `discord` | **Returns:** `object` -- {ok: true}

```robinpath
discord.banMember "123456789" "987654321" "Spam"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `guildId` | `string` | Yes | Guild/server ID |
| `userId` | `string` | Yes | User ID to ban |
| `reason` | `string` | No | Reason for the ban (appears in audit log) |

---

### unbanMember

Remove a ban for a user from a guild/server

**Module:** `discord` | **Returns:** `object` -- {ok: true}

```robinpath
discord.unbanMember "123456789" "987654321"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `guildId` | `string` | Yes | Guild/server ID |
| `userId` | `string` | Yes | User ID to unban |

---

### kickMember

Kick a member from a guild/server

**Module:** `discord` | **Returns:** `object` -- {ok: true}

```robinpath
discord.kickMember "123456789" "987654321" "Inactive"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `guildId` | `string` | Yes | Guild/server ID |
| `userId` | `string` | Yes | User ID to kick |
| `reason` | `string` | No | Reason for the kick (appears in audit log) |

---

### createThread

Create a new thread in a channel

**Module:** `discord` | **Returns:** `object` -- Created Thread Channel object

```robinpath
discord.createThread "123456789" "Discussion" {"autoArchiveDuration": 1440}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `channelId` | `string` | Yes | Channel ID |
| `name` | `string` | Yes | Thread name |
| `options` | `object` | No | {autoArchiveDuration?, messageId?, type?, invitable?} |

---

### sendEmbed

Send a rich embed message to a channel

**Module:** `discord` | **Returns:** `object` -- Discord Message object with embed

```robinpath
discord.sendEmbed "123456789" {"title": "Status", "description": "All systems operational", "color": 5763719}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `channelId` | `string` | Yes | Channel ID |
| `embed` | `object` | Yes | Embed object with title, description, color, fields, footer, etc. |

---

### getUser

Get information about a Discord user

**Module:** `discord` | **Returns:** `object` -- Discord User object

```robinpath
discord.getUser "987654321"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | `string` | Yes | User ID |

---

### listMessages

List messages in a channel

**Module:** `discord` | **Returns:** `array` -- Array of Discord Message objects

```robinpath
discord.listMessages "123456789" {"limit": 50}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `channelId` | `string` | Yes | Channel ID |
| `options` | `object` | No | {limit?, before?, after?, around?} |

---

### createInvite

Create an invite for a channel

**Module:** `discord` | **Returns:** `object` -- Discord Invite object with code

```robinpath
discord.createInvite "123456789" {"maxAge": 86400, "maxUses": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `channelId` | `string` | Yes | Channel ID |
| `options` | `object` | No | {maxAge?, maxUses?, temporary?, unique?} |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Bot token not set. Call discord.setToken first.` | Check the error message for details |
| `Discord API error (${response.status}): ${msg}` | Check the error message for details |
| `Bot token is required.` | Check the error message for details |
| `Webhook URL is required.` | Check the error message for details |
| `Discord webhook failed (${response.status}): ${errText}` | Check the error message for details |
| `channelId is required.` | Check the error message for details |
| `messageId is required.` | Check the error message for details |
| `guildId is required.` | Check the error message for details |

```robinpath
set $result as discord.sendWebhook "https://discord.com/api/webhooks/..." "Hello!" {"username": "MyBot"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Channel

Retrieve all items and loop through them.

```robinpath
discord.setToken $token
set $result as discord.getChannel "123456789"
each $item in $result
  print $item
end
```

### 2. Create a new item with sendWebhook

Create a new resource and capture the result.

```robinpath
discord.setToken $token
set $result as discord.sendWebhook "https://discord.com/api/webhooks/..." "Hello!" {"username": "MyBot"}
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
discord.setToken $token
set $created as discord.sendWebhook "https://discord.com/api/webhooks/..." "Hello!" {"username": "MyBot"}
# Update the created item
discord.editMessage "123456789" "987654321" "Updated text"
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
discord.setToken $token
set $existing as discord.getChannel "123456789"
if $existing == null
  discord.sendWebhook "https://discord.com/api/webhooks/..." "Hello!" {"username": "MyBot"}
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Discord workflow

Chain multiple discord operations together.

```robinpath
discord.setToken $token
set $r_sendWebhook as discord.sendWebhook "https://discord.com/api/webhooks/..." "Hello!" {"username": "MyBot"}
set $r_sendMessage as discord.sendMessage "123456789" "Hello from RobinPath!"
set $r_editMessage as discord.editMessage "123456789" "987654321" "Updated text"
print "All operations complete"
```

### 6. Safe sendWebhook with validation

Check results before proceeding.

```robinpath
discord.setToken $token
set $result as discord.sendWebhook "https://discord.com/api/webhooks/..." "Hello!" {"username": "MyBot"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **slack** -- Slack module for complementary functionality
- **teams** -- Teams module for complementary functionality
- **telegram** -- Telegram module for complementary functionality
- **whatsapp** -- WhatsApp module for complementary functionality
- **json** -- JSON module for complementary functionality
