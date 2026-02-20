# @robinpath/cron

> Cron expression parsing, validation, scheduling, and human-readable descriptions

![Category](https://img.shields.io/badge/category-Infrastructure-blue) ![Functions](https://img.shields.io/badge/functions-8-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `cron` module lets you:

- Validate a cron expression
- Parse cron expression into expanded fields
- Get next occurrence after a date
- Get next N occurrences
- Get previous occurrence before a date

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/cron
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
cron.parse "0 9 * * 1-5"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `cron.isValid` | Validate a cron expression |
| `cron.parse` | Parse cron expression into expanded fields |
| `cron.next` | Get next occurrence after a date |
| `cron.nextN` | Get next N occurrences |
| `cron.prev` | Get previous occurrence before a date |
| `cron.matches` | Check if a date matches a cron expression |
| `cron.describe` | Human-readable description of a cron expression |
| `cron.between` | Get all occurrences between two dates |

## Examples

### Parse cron expression into expanded fields

```robinpath
cron.parse "0 9 * * 1-5"
```

### Get next occurrence after a date

```robinpath
cron.next "*/5 * * * *"
```

### Get next N occurrences

```robinpath
cron.nextN "0 * * * *" 10
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/cron";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  cron.parse "0 9 * * 1-5"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
