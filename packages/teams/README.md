# @robinpath/teams

> Teams module for RobinPath.

![Category](https://img.shields.io/badge/category-Messaging-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-Bearer%20Token-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `teams` module lets you:

- Send a message to a Teams channel.
- Send a message in a 1:1 or group chat.
- Reply to a message in a channel.
- List all teams the user has joined.
- List channels in a team.

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/teams
```

## Quick Start

**1. Set up credentials**

```robinpath
teams.setToken "eyJ0xxx"
```

**2. Send a message to a Teams channel.**

```robinpath
teams.sendChannel "team-id" "channel-id" "Hello team!"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `teams.setToken` | Set the Microsoft Graph API access token. |
| `teams.sendChannel` | Send a message to a Teams channel. |
| `teams.sendChat` | Send a message in a 1:1 or group chat. |
| `teams.replyToMessage` | Reply to a message in a channel. |
| `teams.listTeams` | List all teams the user has joined. |
| `teams.listChannels` | List channels in a team. |
| `teams.getMessages` | Get messages from a channel. |
| `teams.createChannel` | Create a new channel in a team. |
| `teams.listChats` | List all chats for the current user. |
| `teams.sendWebhook` | Send a message via an incoming webhook URL. |

## Examples

### Send a message to a Teams channel.

```robinpath
teams.sendChannel "team-id" "channel-id" "Hello team!"
```

### Send a message in a 1:1 or group chat.

```robinpath
teams.sendChat "chat-id" "Hey there!"
```

### Reply to a message in a channel.

```robinpath
teams.replyToMessage "team-id" "channel-id" "msg-id" "Thanks!"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/teams";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  teams.setToken "eyJ0xxx"
  teams.sendChannel "team-id" "channel-id" "Hello team!"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/slack`](../slack) — Slack module for complementary functionality
- [`@robinpath/discord`](../discord) — Discord module for complementary functionality
- [`@robinpath/telegram`](../telegram) — Telegram module for complementary functionality
- [`@robinpath/whatsapp`](../whatsapp) — WhatsApp module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
