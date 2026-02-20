# @robinpath/whatsapp

> WhatsApp module for RobinPath.

![Category](https://img.shields.io/badge/category-Messaging-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `whatsapp` module lets you:

- Send a text message.
- Send a pre-approved template message.
- Send an image message.
- Send a document message.
- Send a location message.

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/whatsapp
```

## Quick Start

**1. Set up credentials**

```robinpath
whatsapp.setCredentials "EAABxxx" "1234567890"
```

**2. Send a text message.**

```robinpath
whatsapp.sendText "+1234567890" "Hello from RobinPath!"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `whatsapp.setCredentials` | Set WhatsApp Cloud API credentials. |
| `whatsapp.sendText` | Send a text message. |
| `whatsapp.sendTemplate` | Send a pre-approved template message. |
| `whatsapp.sendImage` | Send an image message. |
| `whatsapp.sendDocument` | Send a document message. |
| `whatsapp.sendLocation` | Send a location message. |
| `whatsapp.sendContact` | Send contact card(s). |
| `whatsapp.markRead` | Mark a message as read. |
| `whatsapp.getProfile` | Get the WhatsApp Business profile. |
| `whatsapp.updateProfile` | Update the WhatsApp Business profile. |

## Examples

### Send a text message.

```robinpath
whatsapp.sendText "+1234567890" "Hello from RobinPath!"
```

### Send a pre-approved template message.

```robinpath
whatsapp.sendTemplate "+1234567890" "hello_world"
```

### Send an image message.

```robinpath
whatsapp.sendImage "+1234567890" "https://example.com/photo.jpg" "Check this out"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/whatsapp";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  whatsapp.setCredentials "EAABxxx" "1234567890"
  whatsapp.sendText "+1234567890" "Hello from RobinPath!"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/slack`](../slack) — Slack module for complementary functionality
- [`@robinpath/discord`](../discord) — Discord module for complementary functionality
- [`@robinpath/teams`](../teams) — Teams module for complementary functionality
- [`@robinpath/telegram`](../telegram) — Telegram module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
