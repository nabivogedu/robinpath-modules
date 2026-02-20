# @robinpath/google-sheets

> Google Sheets module for RobinPath.

![Category](https://img.shields.io/badge/category-Productivity-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `google-sheets` module lets you:

- Read values from a spreadsheet range.
- Append a row of values to a spreadsheet.
- Clear all values in a spreadsheet range.
- Create a new Google Spreadsheet.
- List all sheets/tabs in a spreadsheet.

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/google-sheets
```

## Quick Start

**1. Set up credentials**

```robinpath
googleSheets.setCredentials "ya29.xxx"
```

**2. Read values from a spreadsheet range.**

```robinpath
googleSheets.getValues "spreadsheet_id" "Sheet1!A1:C10"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `google-sheets.setCredentials` | Set the OAuth2 access token for Google Sheets API. |
| `google-sheets.getValues` | Read values from a spreadsheet range. |
| `google-sheets.setValues` | Write values to a spreadsheet range. |
| `google-sheets.appendRow` | Append a row of values to a spreadsheet. |
| `google-sheets.clearRange` | Clear all values in a spreadsheet range. |
| `google-sheets.create` | Create a new Google Spreadsheet. |
| `google-sheets.getSheets` | List all sheets/tabs in a spreadsheet. |
| `google-sheets.addSheet` | Add a new sheet/tab to a spreadsheet. |
| `google-sheets.deleteSheet` | Delete a sheet/tab from a spreadsheet. |
| `google-sheets.findRows` | Find rows matching a value in a specific column. |

## Examples

### Read values from a spreadsheet range.

```robinpath
googleSheets.getValues "spreadsheet_id" "Sheet1!A1:C10"
```

### Write values to a spreadsheet range.

```robinpath
googleSheets.setValues "spreadsheet_id" "Sheet1!A1:B2" [[1,2],[3,4]]
```

### Append a row of values to a spreadsheet.

```robinpath
googleSheets.appendRow "spreadsheet_id" "Sheet1!A:C" ["Alice", 25, "alice@example.com"]
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/google-sheets";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  googleSheets.setCredentials "ya29.xxx"
  googleSheets.getValues "spreadsheet_id" "Sheet1!A1:C10"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/google-calendar`](../google-calendar) — Google Calendar module for complementary functionality
- [`@robinpath/google-contacts`](../google-contacts) — Google Contacts module for complementary functionality
- [`@robinpath/google-forms`](../google-forms) — Google Forms module for complementary functionality
- [`@robinpath/gmail`](../gmail) — Gmail module for complementary functionality
- [`@robinpath/outlook`](../outlook) — Outlook module for complementary functionality

## License

MIT
