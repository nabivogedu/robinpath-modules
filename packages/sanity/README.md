# @robinpath/sanity

> Sanity module for RobinPath.

![Category](https://img.shields.io/badge/category-CMS-blue) ![Functions](https://img.shields.io/badge/functions-17-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `sanity` module lets you:

- query
- getDocument
- createDocument
- createOrReplace
- patch

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/sanity
```

## Quick Start

**1. Set up credentials**

```robinpath
sanity.setCredentials "your-credentials"
```

**2. query**

```robinpath
sanity.query
```

## Available Functions

| Function | Description |
|----------|-------------|
| `sanity.setCredentials` | Configure sanity credentials. |
| `sanity.query` | query |
| `sanity.getDocument` | getDocument |
| `sanity.createDocument` | createDocument |
| `sanity.createOrReplace` | createOrReplace |
| `sanity.patch` | patch |
| `sanity.deleteDocument` | deleteDocument |
| `sanity.uploadAsset` | uploadAsset |
| `sanity.getAsset` | getAsset |
| `sanity.listDatasets` | listDatasets |
| `sanity.createDataset` | createDataset |
| `sanity.deleteDataset` | deleteDataset |
| `sanity.mutate` | mutate |
| `sanity.listDocumentsByType` | listDocumentsByType |
| `sanity.getProject` | getProject |
| `sanity.exportDataset` | exportDataset |
| `sanity.importDataset` | importDataset |

## Examples

### query

```robinpath
sanity.query
```

### getDocument

```robinpath
sanity.getDocument
```

### createDocument

```robinpath
sanity.createDocument
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/sanity";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  sanity.setCredentials "your-credentials"
  sanity.query
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
