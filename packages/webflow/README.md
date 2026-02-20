# @robinpath/webflow

> Webflow module for RobinPath.

![Category](https://img.shields.io/badge/category-CMS-blue) ![Functions](https://img.shields.io/badge/functions-19-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `webflow` module lets you:

- listSites
- getSite
- publishSite
- listCollections
- getCollection

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/webflow
```

## Quick Start

**1. Set up credentials**

```robinpath
webflow.setCredentials "your-credentials"
```

**2. listSites**

```robinpath
webflow.listSites
```

## Available Functions

| Function | Description |
|----------|-------------|
| `webflow.setCredentials` | Configure webflow credentials. |
| `webflow.listSites` | listSites |
| `webflow.getSite` | getSite |
| `webflow.publishSite` | publishSite |
| `webflow.listCollections` | listCollections |
| `webflow.getCollection` | getCollection |
| `webflow.listCollectionItems` | listCollectionItems |
| `webflow.getCollectionItem` | getCollectionItem |
| `webflow.createCollectionItem` | createCollectionItem |
| `webflow.updateCollectionItem` | updateCollectionItem |
| `webflow.deleteCollectionItem` | deleteCollectionItem |
| `webflow.publishCollectionItems` | publishCollectionItems |
| `webflow.listFormSubmissions` | listFormSubmissions |
| `webflow.listDomains` | listDomains |
| `webflow.getUser` | getUser |
| `webflow.listUsers` | listUsers |
| `webflow.listOrders` | listOrders |
| `webflow.getOrder` | getOrder |
| `webflow.updateOrder` | updateOrder |

## Examples

### listSites

```robinpath
webflow.listSites
```

### getSite

```robinpath
webflow.getSite
```

### publishSite

```robinpath
webflow.publishSite
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/webflow";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  webflow.setCredentials "your-credentials"
  webflow.listSites
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
