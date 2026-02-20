# @robinpath/notify

> Notify module for RobinPath.

![Category](https://img.shields.io/badge/category-Messaging-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `notify` module lets you:

- send
- sendUrgent
- sendSilent
- beep
- say

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/notify
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
notify.sendUrgent
```

## Available Functions

| Function | Description |
|----------|-------------|
| `notify.send` | send |
| `notify.sendUrgent` | sendUrgent |
| `notify.sendSilent` | sendSilent |
| `notify.beep` | beep |
| `notify.say` | say |
| `notify.alert` | alert |
| `notify.confirm` | confirm |
| `notify.prompt` | prompt |
| `notify.clipboard` | clipboard |
| `notify.getClipboard` | getClipboard |

## Examples

### sendUrgent

```robinpath
notify.sendUrgent
```

### sendSilent

```robinpath
notify.sendSilent
```

### beep

```robinpath
notify.beep
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/notify";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  notify.sendUrgent
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
