# @robinpath/contentful

> Contentful module for RobinPath.

![Category](https://img.shields.io/badge/category-CMS-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `contentful` module lets you:

- listEntries
- getEntry
- createEntry
- updateEntry
- deleteEntry

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/contentful
```

## Quick Start

**1. Set up credentials**

```robinpath
contentful.setCredentials "your-credentials"
```

**2. listEntries**

```robinpath
contentful.listEntries
```

## Available Functions

| Function | Description |
|----------|-------------|
| `contentful.setCredentials` | Configure contentful credentials. |
| `contentful.listEntries` | listEntries |
| `contentful.getEntry` | getEntry |
| `contentful.createEntry` | createEntry |
| `contentful.updateEntry` | updateEntry |
| `contentful.deleteEntry` | deleteEntry |
| `contentful.publishEntry` | publishEntry |
| `contentful.unpublishEntry` | unpublishEntry |
| `contentful.listAssets` | listAssets |
| `contentful.getAsset` | getAsset |
| `contentful.createAsset` | createAsset |
| `contentful.publishAsset` | publishAsset |
| `contentful.listContentTypes` | listContentTypes |
| `contentful.getContentType` | getContentType |
| `contentful.createContentType` | createContentType |
| `contentful.listEnvironments` | listEnvironments |
| `contentful.getSpace` | getSpace |
| `contentful.searchEntries` | searchEntries |
| `contentful.listLocales` | listLocales |
| `contentful.getWebhooks` | getWebhooks |
| `contentful.archiveEntry` | archiveEntry |

## Examples

### listEntries

```robinpath
contentful.listEntries
```

### getEntry

```robinpath
contentful.getEntry
```

### createEntry

```robinpath
contentful.createEntry
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/contentful";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  contentful.setCredentials "your-credentials"
  contentful.listEntries
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
