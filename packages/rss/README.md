# @robinpath/rss

> Parse RSS and Atom feeds, detect new entries, and get feed metadata

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-6-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `rss` module lets you:

- Parse an RSS/Atom feed from a URL
- Parse RSS/Atom XML from a string
- Get feed items with a limit
- Get only new items since last check or since a date
- Get the most recent item from a feed

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/rss
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
rss.parseString $xmlContent
```

## Available Functions

| Function | Description |
|----------|-------------|
| `rss.parse` | Parse an RSS/Atom feed from a URL |
| `rss.parseString` | Parse RSS/Atom XML from a string |
| `rss.getItems` | Get feed items with a limit |
| `rss.getNew` | Get only new items since last check or since a date |
| `rss.getLatest` | Get the most recent item from a feed |
| `rss.feedInfo` | Get feed metadata without items |

## Examples

### Parse RSS/Atom XML from a string

```robinpath
rss.parseString $xmlContent
```

### Get feed items with a limit

```robinpath
rss.getItems "https://blog.example.com/feed" 5
```

### Get only new items since last check or since a date

```robinpath
rss.getNew "https://blog.example.com/feed" "2025-01-01"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/rss";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  rss.parseString $xmlContent
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
