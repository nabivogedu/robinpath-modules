# @robinpath/slack

> Slack Web API and Incoming Webhooks client for messaging, channels, reactions, file uploads, and user management

![Category](https://img.shields.io/badge/category-Messaging-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-Bearer%20Token-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `slack` module lets you:

- Send a message to a Slack channel via chat.postMessage
- Send a message via a Slack Incoming Webhook URL (no token needed)
- Reply to a message thread via chat.postMessage with thread_ts
- Add an emoji reaction to a message via reactions.add
- Upload a file to a Slack channel using the new file upload API

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/slack
```

## Quick Start

**1. Set up credentials**

```robinpath
slack.setToken "default" "xoxb-your-token" {"defaultChannel": "general"}
```

**2. Send a message to a Slack channel via chat.postMessage**

```robinpath
slack.send "default" "#general" "Hello from RobinPath!"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `slack.setToken` | Store a Slack Bot User OAuth Token for a workspace |
| `slack.send` | Send a message to a Slack channel via chat.postMessage |
| `slack.sendWebhook` | Send a message via a Slack Incoming Webhook URL (no token needed) |
| `slack.reply` | Reply to a message thread via chat.postMessage with thread_ts |
| `slack.react` | Add an emoji reaction to a message via reactions.add |
| `slack.upload` | Upload a file to a Slack channel using the new file upload API |
| `slack.listChannels` | List Slack channels via conversations.list |
| `slack.getHistory` | Get message history for a channel via conversations.history |
| `slack.setStatus` | Set the authenticated user's status via users.profile.set |
| `slack.userInfo` | Get user information via users.info |
| `slack.createChannel` | Create a new Slack channel via conversations.create |
| `slack.updateMessage` | Update an existing message via chat.update |

## Examples

### Send a message to a Slack channel via chat.postMessage

```robinpath
slack.send "default" "#general" "Hello from RobinPath!"
```

### Send a message via a Slack Incoming Webhook URL (no token needed)

```robinpath
slack.sendWebhook "https://hooks.slack.com/services/T.../B.../xxx" "Deploy complete!"
```

### Reply to a message thread via chat.postMessage with thread_ts

```robinpath
slack.reply "default" "C01234" "1234567890.123456" "Got it, thanks!"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/slack";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  slack.setToken "default" "xoxb-your-token" {"defaultChannel": "general"}
  slack.send "default" "#general" "Hello from RobinPath!"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/discord`](../discord) — Discord module for complementary functionality
- [`@robinpath/teams`](../teams) — Teams module for complementary functionality
- [`@robinpath/telegram`](../telegram) — Telegram module for complementary functionality
- [`@robinpath/whatsapp`](../whatsapp) — WhatsApp module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
