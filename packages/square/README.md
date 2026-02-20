# @robinpath/square

> Square module for RobinPath.

![Category](https://img.shields.io/badge/category-E-Commerce-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `square` module lets you:

- listCatalogItems
- getCatalogItem
- upsertCatalogObject
- deleteCatalogObject
- searchCatalog

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/square
```

## Quick Start

**1. Set up credentials**

```robinpath
square.setCredentials "your-credentials"
```

**2. listCatalogItems**

```robinpath
square.listCatalogItems
```

## Available Functions

| Function | Description |
|----------|-------------|
| `square.setCredentials` | Configure square credentials. |
| `square.listCatalogItems` | listCatalogItems |
| `square.getCatalogItem` | getCatalogItem |
| `square.upsertCatalogObject` | upsertCatalogObject |
| `square.deleteCatalogObject` | deleteCatalogObject |
| `square.searchCatalog` | searchCatalog |
| `square.listCustomers` | listCustomers |
| `square.getCustomer` | getCustomer |
| `square.createCustomer` | createCustomer |
| `square.updateCustomer` | updateCustomer |
| `square.deleteCustomer` | deleteCustomer |
| `square.listOrders` | listOrders |
| `square.getOrder` | getOrder |
| `square.createOrder` | createOrder |
| `square.listLocations` | listLocations |
| `square.getLocation` | getLocation |
| `square.listInventory` | listInventory |
| `square.adjustInventory` | adjustInventory |
| `square.retrieveInventoryCount` | retrieveInventoryCount |
| `square.getMerchant` | getMerchant |
| `square.listPayments` | listPayments |

## Examples

### listCatalogItems

```robinpath
square.listCatalogItems
```

### getCatalogItem

```robinpath
square.getCatalogItem
```

### upsertCatalogObject

```robinpath
square.upsertCatalogObject
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/square";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  square.setCredentials "your-credentials"
  square.listCatalogItems
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/shopify`](../shopify) — Shopify module for complementary functionality
- [`@robinpath/woocommerce`](../woocommerce) — WooCommerce module for complementary functionality
- [`@robinpath/bigcommerce`](../bigcommerce) — BigCommerce module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
