# @robinpath/excel

> Read, write, and manipulate Excel spreadsheets (.xlsx) with sheets, cells, JSON/CSV conversion

![Category](https://img.shields.io/badge/category-Documents-blue) ![Functions](https://img.shields.io/badge/functions-9-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `excel` module lets you:

- Read an Excel file into an array of row objects
- Write an array of objects to an Excel file
- List all sheet names in an Excel file
- Add a new sheet with data to an existing Excel file
- Convert an Excel file to JSON (shortcut for read().rows)

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/excel
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
excel.write "./output.xlsx" $data {"sheetName": "Users"}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `excel.read` | Read an Excel file into an array of row objects |
| `excel.write` | Write an array of objects to an Excel file |
| `excel.readSheetNames` | List all sheet names in an Excel file |
| `excel.addSheet` | Add a new sheet with data to an existing Excel file |
| `excel.toJson` | Convert an Excel file to JSON (shortcut for read().rows) |
| `excel.fromJson` | Create an Excel file from JSON data |
| `excel.toCsv` | Convert an Excel file to CSV string |
| `excel.getCell` | Get a specific cell value |
| `excel.setCell` | Set a specific cell value |

## Examples

### Write an array of objects to an Excel file

```robinpath
excel.write "./output.xlsx" $data {"sheetName": "Users"}
```

### List all sheet names in an Excel file

```robinpath
excel.readSheetNames "./data.xlsx"
```

### Add a new sheet with data to an existing Excel file

```robinpath
excel.addSheet "./data.xlsx" "Summary" $summaryData
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/excel";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  excel.write "./output.xlsx" $data {"sheetName": "Users"}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/pdf`](../pdf) — PDF module for complementary functionality
- [`@robinpath/office`](../office) — Office module for complementary functionality
- [`@robinpath/docusign`](../docusign) — DocuSign module for complementary functionality
- [`@robinpath/pandadoc`](../pandadoc) — PandaDoc module for complementary functionality
- [`@robinpath/hellosign`](../hellosign) — HelloSign module for complementary functionality

## License

MIT
