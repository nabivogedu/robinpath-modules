# @robinpath/date

> Parse, format, manipulate, and compare dates and times

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `date` module lets you:

- Parse a date string and return its ISO representation
- Format a date using a pattern string
- Add a duration to a date
- Subtract a duration from a date
- Calculate the difference between two dates in a given unit

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/date
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
date.format $date "YYYY-MM-DD"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `date.parse` | Parse a date string and return its ISO representation |
| `date.format` | Format a date using a pattern string |
| `date.add` | Add a duration to a date |
| `date.subtract` | Subtract a duration from a date |
| `date.diff` | Calculate the difference between two dates in a given unit |
| `date.startOf` | Get the start of a time period for a date |
| `date.endOf` | Get the end of a time period for a date |
| `date.isAfter` | Check if the first date is after the second date |
| `date.isBefore` | Check if the first date is before the second date |
| `date.isBetween` | Check if a date falls between two other dates (exclusive) |
| `date.toISO` | Convert a date to an ISO 8601 string |
| `date.toUnix` | Convert a date to a Unix timestamp (seconds since epoch) |
| `date.fromUnix` | Convert a Unix timestamp (seconds) to an ISO date string |
| `date.dayOfWeek` | Get the day of the week for a date (0 = Sunday, 6 = Saturday) |
| `date.daysInMonth` | Get the number of days in the month of a given date |

## Examples

### Format a date using a pattern string

```robinpath
date.format $date "YYYY-MM-DD"
```

### Add a duration to a date

```robinpath
date.add $date 5 "days"
```

### Subtract a duration from a date

```robinpath
date.subtract $date 3 "months"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/date";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  date.format $date "YYYY-MM-DD"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
