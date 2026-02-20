# @robinpath/feed

> RSS, Atom, and JSON Feed creation, parsing, manipulation, and auto-detection

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-14-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `feed` module lets you:

- Create RSS 2.0 feed
- Create Atom feed
- Create JSON Feed
- Parse RSS feed
- Parse Atom feed

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/feed
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
feed.createAtom {"title": "My Blog", "link": "https://example.com", "items": [...]}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `feed.createRss` | Create RSS 2.0 feed |
| `feed.createAtom` | Create Atom feed |
| `feed.createJson` | Create JSON Feed |
| `feed.parseRss` | Parse RSS feed |
| `feed.parseAtom` | Parse Atom feed |
| `feed.parseJson` | Parse JSON Feed |
| `feed.detect` | Detect feed format |
| `feed.parse` | Auto-detect and parse any feed |
| `feed.addItem` | Add item to feed config |
| `feed.removeItem` | Remove item by guid |
| `feed.sortItems` | Sort items by date |
| `feed.filterItems` | Filter items by field regex |
| `feed.mergeFeeds` | Merge multiple feeds |
| `feed.fetch` | Fetch and parse feed from URL |

## Examples

### Create Atom feed

```robinpath
feed.createAtom {"title": "My Blog", "link": "https://example.com", "items": [...]}
```

### Create JSON Feed

```robinpath
feed.createJson {"title": "My Blog", "items": [...]}
```

### Parse RSS feed

```robinpath
feed.parseRss $xml
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/feed";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  feed.createAtom {"title": "My Blog", "link": "https://example.com", "items": [...]}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
