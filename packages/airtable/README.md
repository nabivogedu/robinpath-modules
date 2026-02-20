# @robinpath/airtable

> Airtable module for RobinPath.

![Category](https://img.shields.io/badge/category-Productivity-blue) ![Functions](https://img.shields.io/badge/functions-16-green) ![Auth](https://img.shields.io/badge/auth-Bearer%20Token-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `airtable` module lets you:

- List all bases accessible by the configured token
- Get the schema (tables and fields) for a base
- List records from a table with optional filtering, sorting, and pagination
- Get a single record by ID
- Create a single record in a table

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/airtable
```

## Quick Start

**1. Set up credentials**

```robinpath
airtable.setToken "default" "patXXXXXXXXXXXXXX"
```

**2. List all bases accessible by the configured token**

```robinpath
airtable.listBases "default"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `airtable.setToken` | Store an Airtable personal access token for authentication |
| `airtable.listBases` | List all bases accessible by the configured token |
| `airtable.getBaseSchema` | Get the schema (tables and fields) for a base |
| `airtable.listRecords` | List records from a table with optional filtering, sorting, and pagination |
| `airtable.getRecord` | Get a single record by ID |
| `airtable.createRecord` | Create a single record in a table |
| `airtable.createRecords` | Bulk create up to 10 records in a table |
| `airtable.updateRecord` | Update a single record (PATCH - only updates specified fields) |
| `airtable.updateRecords` | Bulk update up to 10 records (PATCH) |
| `airtable.replaceRecord` | Replace a single record (PUT - clears unspecified fields) |
| `airtable.deleteRecord` | Delete a single record by ID |
| `airtable.deleteRecords` | Bulk delete up to 10 records by ID |
| `airtable.createTable` | Create a new table in a base with field definitions |
| `airtable.updateTable` | Update a table's name or description |
| `airtable.createField` | Create a new field in a table |
| `airtable.updateField` | Update a field's name or description |

## Examples

### List all bases accessible by the configured token

```robinpath
airtable.listBases "default"
```

### Get the schema (tables and fields) for a base

```robinpath
airtable.getBaseSchema "default" "appABC123"
```

### List records from a table with optional filtering, sorting, and pagination

```robinpath
airtable.listRecords "default" "appABC123" "Tasks" {"filterByFormula": "{Status}='Done'", "maxRecords": 50}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/airtable";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  airtable.setToken "default" "patXXXXXXXXXXXXXX"
  airtable.listBases "default"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/google-sheets`](../google-sheets) — Google Sheets module for complementary functionality
- [`@robinpath/google-calendar`](../google-calendar) — Google Calendar module for complementary functionality
- [`@robinpath/google-contacts`](../google-contacts) — Google Contacts module for complementary functionality
- [`@robinpath/google-forms`](../google-forms) — Google Forms module for complementary functionality
- [`@robinpath/gmail`](../gmail) — Gmail module for complementary functionality

## License

MIT
