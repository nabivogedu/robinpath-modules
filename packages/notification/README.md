# @robinpath/notification

> Unified notifications to Slack, Discord, Telegram, and Microsoft Teams via webhooks

![Category](https://img.shields.io/badge/category-Messaging-blue) ![Functions](https://img.shields.io/badge/functions-8-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `notification` module lets you:

- Send a message to Slack via webhook
- Send a rich Slack message with blocks (title, fields, images)
- Send a message to Discord via webhook
- Send a rich Discord embed message
- Send a message via Telegram Bot API

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/notification
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
notification.slackRich $url {"title": "Deploy", "text": "v1.2.3 deployed"}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `notification.slack` | Send a message to Slack via webhook |
| `notification.slackRich` | Send a rich Slack message with blocks (title, fields, images) |
| `notification.discord` | Send a message to Discord via webhook |
| `notification.discordEmbed` | Send a rich Discord embed message |
| `notification.telegram` | Send a message via Telegram Bot API |
| `notification.teams` | Send a message to Microsoft Teams via webhook |
| `notification.teamsCard` | Send a rich MessageCard to Microsoft Teams |
| `notification.sendAll` | Send a message to multiple channels at once |

## Examples

### Send a rich Slack message with blocks (title, fields, images)

```robinpath
notification.slackRich $url {"title": "Deploy", "text": "v1.2.3 deployed"}
```

### Send a message to Discord via webhook

```robinpath
notification.discord $webhookUrl "Build passed!"
```

### Send a rich Discord embed message

```robinpath
notification.discordEmbed $url {"title": "Alert", "description": "CPU > 90%", "color": "#FF0000"}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/notification";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  notification.slackRich $url {"title": "Deploy", "text": "v1.2.3 deployed"}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/slack`](../slack) — Slack module for complementary functionality
- [`@robinpath/discord`](../discord) — Discord module for complementary functionality
- [`@robinpath/teams`](../teams) — Teams module for complementary functionality
- [`@robinpath/telegram`](../telegram) — Telegram module for complementary functionality
- [`@robinpath/whatsapp`](../whatsapp) — WhatsApp module for complementary functionality

## License

MIT
