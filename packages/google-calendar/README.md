# @robinpath/google-calendar

> Google Calendar module for RobinPath.

![Category](https://img.shields.io/badge/category-Productivity-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `google-calendar` module lets you:

- List events from a calendar.
- Get a single event by ID.
- Create a new calendar event.
- Update an existing event.
- Delete a calendar event.

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/google-calendar
```

## Quick Start

**1. Set up credentials**

```robinpath
googleCalendar.setCredentials "ya29.xxx"
```

**2. List events from a calendar.**

```robinpath
googleCalendar.listEvents "primary" {"timeMin":"2025-01-01T00:00:00Z","maxResults":10}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `google-calendar.setCredentials` | Set the OAuth2 access token for Google Calendar API. |
| `google-calendar.listEvents` | List events from a calendar. |
| `google-calendar.getEvent` | Get a single event by ID. |
| `google-calendar.createEvent` | Create a new calendar event. |
| `google-calendar.updateEvent` | Update an existing event. |
| `google-calendar.deleteEvent` | Delete a calendar event. |
| `google-calendar.listCalendars` | List all calendars for the authenticated user. |
| `google-calendar.createCalendar` | Create a new calendar. |
| `google-calendar.quickAdd` | Create an event from a natural-language text string. |
| `google-calendar.freeBusy` | Check free/busy status for calendars. |

## Examples

### List events from a calendar.

```robinpath
googleCalendar.listEvents "primary" {"timeMin":"2025-01-01T00:00:00Z","maxResults":10}
```

### Get a single event by ID.

```robinpath
googleCalendar.getEvent "primary" "event-id"
```

### Create a new calendar event.

```robinpath
googleCalendar.createEvent "primary" {"summary":"Meeting","start":{"dateTime":"2025-06-01T10:00:00Z"},"end":{"dateTime":"2025-06-01T11:00:00Z"}}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/google-calendar";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  googleCalendar.setCredentials "ya29.xxx"
  googleCalendar.listEvents "primary" {"timeMin":"2025-01-01T00:00:00Z","maxResults":10}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/google-sheets`](../google-sheets) — Google Sheets module for complementary functionality
- [`@robinpath/google-contacts`](../google-contacts) — Google Contacts module for complementary functionality
- [`@robinpath/google-forms`](../google-forms) — Google Forms module for complementary functionality
- [`@robinpath/gmail`](../gmail) — Gmail module for complementary functionality
- [`@robinpath/outlook`](../outlook) — Outlook module for complementary functionality

## License

MIT
