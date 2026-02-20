# @robinpath/telegram

> Telegram Bot API client for sending messages, photos, documents, locations, polls, stickers, and managing chats

![Category](https://img.shields.io/badge/category-Messaging-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-Bearer%20Token-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `telegram` module lets you:

- Get info about the bot (id, first_name, username)
- Send a text message to a chat
- Send a photo from a local file to a chat
- Send a document/file from a local path to a chat
- Send a GPS location to a chat

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/telegram
```

## Quick Start

**1. Set up credentials**

```robinpath
telegram.setToken "default" "123456:ABC-DEF..."
```

**2. Get info about the bot (id, first_name, username)**

```robinpath
telegram.getMe "default"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `telegram.setToken` | Store a Telegram bot token for subsequent API calls |
| `telegram.getMe` | Get info about the bot (id, first_name, username) |
| `telegram.send` | Send a text message to a chat |
| `telegram.sendPhoto` | Send a photo from a local file to a chat |
| `telegram.sendDocument` | Send a document/file from a local path to a chat |
| `telegram.sendLocation` | Send a GPS location to a chat |
| `telegram.sendPoll` | Send a poll to a chat |
| `telegram.editMessage` | Edit the text of an existing message |
| `telegram.deleteMessage` | Delete a message from a chat |
| `telegram.getUpdates` | Receive incoming updates via long polling |
| `telegram.sendSticker` | Send a sticker by file_id to a chat |
| `telegram.getChat` | Get up-to-date information about a chat |

## Examples

### Get info about the bot (id, first_name, username)

```robinpath
telegram.getMe "default"
```

### Send a text message to a chat

```robinpath
telegram.send "default" "-100123456" "Hello from RobinPath!"
```

### Send a photo from a local file to a chat

```robinpath
telegram.sendPhoto "default" "-100123456" "/tmp/photo.jpg" {"caption": "Look at this!"}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/telegram";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  telegram.setToken "default" "123456:ABC-DEF..."
  telegram.getMe "default"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/slack`](../slack) — Slack module for complementary functionality
- [`@robinpath/discord`](../discord) — Discord module for complementary functionality
- [`@robinpath/teams`](../teams) — Teams module for complementary functionality
- [`@robinpath/whatsapp`](../whatsapp) — WhatsApp module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
