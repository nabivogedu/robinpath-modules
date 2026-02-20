# @robinpath/sitemap

> XML sitemap generation, parsing, validation, and manipulation with image/video/alternate support

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-13-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `sitemap` module lets you:

- Create XML sitemap
- Create sitemap index
- Parse XML sitemap
- Parse sitemap index
- Add URL to sitemap XML

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/sitemap
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
sitemap.createIndex [{"loc": "https://example.com/sitemap1.xml"}]
```

## Available Functions

| Function | Description |
|----------|-------------|
| `sitemap.create` | Create XML sitemap |
| `sitemap.createIndex` | Create sitemap index |
| `sitemap.parse` | Parse XML sitemap |
| `sitemap.parseIndex` | Parse sitemap index |
| `sitemap.addUrl` | Add URL to sitemap XML |
| `sitemap.removeUrl` | Remove URL from sitemap XML |
| `sitemap.filterByChangefreq` | Filter URLs by change frequency |
| `sitemap.filterByPriority` | Filter URLs by priority range |
| `sitemap.sortByPriority` | Sort URLs by priority |
| `sitemap.sortByLastmod` | Sort URLs by last modified |
| `sitemap.count` | Count URLs in sitemap |
| `sitemap.extractLocs` | Extract all loc URLs |
| `sitemap.validate` | Validate sitemap XML |

## Examples

### Create sitemap index

```robinpath
sitemap.createIndex [{"loc": "https://example.com/sitemap1.xml"}]
```

### Parse XML sitemap

```robinpath
sitemap.parse $xml
```

### Parse sitemap index

```robinpath
sitemap.parseIndex $xml
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/sitemap";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  sitemap.createIndex [{"loc": "https://example.com/sitemap1.xml"}]
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
