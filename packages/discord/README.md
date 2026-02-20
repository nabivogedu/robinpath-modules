# @robinpath/discord

> Discord module for RobinPath.

![Category](https://img.shields.io/badge/category-Messaging-blue) ![Functions](https://img.shields.io/badge/functions-28-green) ![Auth](https://img.shields.io/badge/auth-Bearer%20Token-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `discord` module lets you:

- Send a message via a Discord webhook URL (no bot token needed)
- Send a message to a Discord channel
- Edit an existing message in a channel
- Delete a message from a channel
- Get information about a channel

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/discord
```

## Quick Start

**1. Set up credentials**

```robinpath
discord.setToken "your-bot-token"
```

**2. Send a message via a Discord webhook URL (no bot token needed)**

```robinpath
discord.sendWebhook "https://discord.com/api/webhooks/..." "Hello!" {"username": "MyBot"}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `discord.setToken` | Store a Discord bot token for subsequent API calls |
| `discord.sendWebhook` | Send a message via a Discord webhook URL (no bot token needed) |
| `discord.sendMessage` | Send a message to a Discord channel |
| `discord.editMessage` | Edit an existing message in a channel |
| `discord.deleteMessage` | Delete a message from a channel |
| `discord.getChannel` | Get information about a channel |
| `discord.listChannels` | List all channels in a guild/server |
| `discord.createChannel` | Create a new channel in a guild (0=text, 2=voice, 4=category, 13=stage, 15=forum) |
| `discord.deleteChannel` | Delete a channel |
| `discord.addReaction` | Add a reaction emoji to a message |
| `discord.removeReaction` | Remove own reaction from a message |
| `discord.pinMessage` | Pin a message in a channel |
| `discord.unpinMessage` | Unpin a message from a channel |
| `discord.getGuild` | Get information about a guild/server |
| `discord.listGuildMembers` | List members of a guild/server |
| `discord.getGuildMember` | Get a specific member of a guild |
| `discord.addRole` | Add a role to a guild member |
| `discord.removeRole` | Remove a role from a guild member |
| `discord.listRoles` | List all roles in a guild/server |
| `discord.createRole` | Create a new role in a guild/server |
| `discord.banMember` | Ban a member from a guild/server |
| `discord.unbanMember` | Remove a ban for a user from a guild/server |
| `discord.kickMember` | Kick a member from a guild/server |
| `discord.createThread` | Create a new thread in a channel |
| `discord.sendEmbed` | Send a rich embed message to a channel |
| `discord.getUser` | Get information about a Discord user |
| `discord.listMessages` | List messages in a channel |
| `discord.createInvite` | Create an invite for a channel |

## Examples

### Send a message via a Discord webhook URL (no bot token needed)

```robinpath
discord.sendWebhook "https://discord.com/api/webhooks/..." "Hello!" {"username": "MyBot"}
```

### Send a message to a Discord channel

```robinpath
discord.sendMessage "123456789" "Hello from RobinPath!"
```

### Edit an existing message in a channel

```robinpath
discord.editMessage "123456789" "987654321" "Updated text"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/discord";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  discord.setToken "your-bot-token"
  discord.sendWebhook "https://discord.com/api/webhooks/..." "Hello!" {"username": "MyBot"}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/slack`](../slack) — Slack module for complementary functionality
- [`@robinpath/teams`](../teams) — Teams module for complementary functionality
- [`@robinpath/telegram`](../telegram) — Telegram module for complementary functionality
- [`@robinpath/whatsapp`](../whatsapp) — WhatsApp module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
