# @robinpath/calendly

> Calendly module for RobinPath.

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-13-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `calendly` module lets you:

- getCurrentUser
- listEventTypes
- getEventType
- listScheduledEvents
- getScheduledEvent

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/calendly
```

## Quick Start

**1. Set up credentials**

```robinpath
calendly.setCredentials "your-credentials"
```

**2. getCurrentUser**

```robinpath
calendly.getCurrentUser
```

## Available Functions

| Function | Description |
|----------|-------------|
| `calendly.setCredentials` | Configure calendly credentials. |
| `calendly.getCurrentUser` | getCurrentUser |
| `calendly.listEventTypes` | listEventTypes |
| `calendly.getEventType` | getEventType |
| `calendly.listScheduledEvents` | listScheduledEvents |
| `calendly.getScheduledEvent` | getScheduledEvent |
| `calendly.listEventInvitees` | listEventInvitees |
| `calendly.getEventInvitee` | getEventInvitee |
| `calendly.cancelEvent` | cancelEvent |
| `calendly.listWebhooks` | listWebhooks |
| `calendly.createWebhook` | createWebhook |
| `calendly.deleteWebhook` | deleteWebhook |
| `calendly.getOrganization` | getOrganization |

## Examples

### getCurrentUser

```robinpath
calendly.getCurrentUser
```

### listEventTypes

```robinpath
calendly.listEventTypes
```

### getEventType

```robinpath
calendly.getEventType
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/calendly";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  calendly.setCredentials "your-credentials"
  calendly.getCurrentUser
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
