# @robinpath/notion

> Notion module for RobinPath.

![Category](https://img.shields.io/badge/category-Productivity-blue) ![Functions](https://img.shields.io/badge/functions-11-green) ![Auth](https://img.shields.io/badge/auth-Bearer%20Token-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `notion` module lets you:

- Retrieve a Notion page by ID.
- Create a new page in a database or as a child of another page.
- Update properties of an existing page.
- Archive (soft-delete) a Notion page.
- Query a Notion database with optional filters and sorts.

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/notion
```

## Quick Start

**1. Set up credentials**

```robinpath
notion.setToken "ntn_xxx"
```

**2. Retrieve a Notion page by ID.**

```robinpath
notion.getPage "page-id-here"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `notion.setToken` | Set the Notion integration token. |
| `notion.getPage` | Retrieve a Notion page by ID. |
| `notion.createPage` | Create a new page in a database or as a child of another page. |
| `notion.updatePage` | Update properties of an existing page. |
| `notion.archivePage` | Archive (soft-delete) a Notion page. |
| `notion.queryDatabase` | Query a Notion database with optional filters and sorts. |
| `notion.getDatabase` | Retrieve a Notion database schema. |
| `notion.getBlocks` | Get child blocks of a page or block. |
| `notion.appendBlocks` | Append child blocks to a page or block. |
| `notion.deleteBlock` | Delete a block by ID. |
| `notion.search` | Search across all pages and databases the integration has access to. |

## Examples

### Retrieve a Notion page by ID.

```robinpath
notion.getPage "page-id-here"
```

### Create a new page in a database or as a child of another page.

```robinpath
notion.createPage "db-id" {"Name":{"title":[{"text":{"content":"New Page"}}]}}
```

### Update properties of an existing page.

```robinpath
notion.updatePage "page-id" {"Status":{"select":{"name":"Done"}}}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/notion";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  notion.setToken "ntn_xxx"
  notion.getPage "page-id-here"
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
