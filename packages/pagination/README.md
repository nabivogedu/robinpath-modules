# @robinpath/pagination

> Auto-paginate APIs with offset, cursor, page-number, and Link-header strategies

![Category](https://img.shields.io/badge/category-Other-blue) ![Functions](https://img.shields.io/badge/functions-4-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `pagination` module lets you:

- Auto-paginate an API and collect all items
- Fetch a single page of results
- Parse a Link header into rel-url pairs
- Build a paginated URL with page/limit parameters

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/pagination
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
pagination.fetchPage "https://api.example.com/users" 2 {"pageSize": 20}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `pagination.fetchAll` | Auto-paginate an API and collect all items |
| `pagination.fetchPage` | Fetch a single page of results |
| `pagination.parseLinkHeader` | Parse a Link header into rel-url pairs |
| `pagination.buildPageUrl` | Build a paginated URL with page/limit parameters |

## Examples

### Fetch a single page of results

```robinpath
pagination.fetchPage "https://api.example.com/users" 2 {"pageSize": 20}
```

### Parse a Link header into rel-url pairs

```robinpath
pagination.parseLinkHeader $linkHeader
```

### Build a paginated URL with page/limit parameters

```robinpath
pagination.buildPageUrl "https://api.example.com/users" 3 {"limit": 50}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/pagination";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  pagination.fetchPage "https://api.example.com/users" 2 {"pageSize": 20}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
