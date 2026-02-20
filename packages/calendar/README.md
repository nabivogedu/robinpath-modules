# @robinpath/calendar

> iCal (.ics) calendar parsing, generation, event management, and date range queries

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-13-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `calendar` module lets you:

- Create an iCal event object
- Create iCal string from events
- Parse iCal string
- Parse .ics file
- Write iCal to file

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/calendar
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
calendar.createCalendar [$event1, $event2] {"name": "My Calendar"}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `calendar.createEvent` | Create an iCal event object |
| `calendar.createCalendar` | Create iCal string from events |
| `calendar.parse` | Parse iCal string |
| `calendar.parseFile` | Parse .ics file |
| `calendar.writeFile` | Write iCal to file |
| `calendar.addEvent` | Add event to iCal string |
| `calendar.removeEvent` | Remove event by UID |
| `calendar.findEvents` | Find events in date range |
| `calendar.today` | Get today's events |
| `calendar.upcoming` | Get upcoming events |
| `calendar.toJson` | Convert iCal to JSON |
| `calendar.formatDate` | Format ISO to iCal date |
| `calendar.parseDate` | Parse iCal date to ISO |

## Examples

### Create iCal string from events

```robinpath
calendar.createCalendar [$event1, $event2] {"name": "My Calendar"}
```

### Parse iCal string

```robinpath
calendar.parse $icsContent
```

### Parse .ics file

```robinpath
calendar.parseFile "./events.ics"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/calendar";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  calendar.createCalendar [$event1, $event2] {"name": "My Calendar"}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
