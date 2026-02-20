# @robinpath/bigcommerce

> BigCommerce module for RobinPath.

![Category](https://img.shields.io/badge/category-E-Commerce-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `bigcommerce` module lets you:

- listProducts
- getProduct
- createProduct
- updateProduct
- deleteProduct

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/bigcommerce
```

## Quick Start

**1. Set up credentials**

```robinpath
bigcommerce.setCredentials "your-credentials"
```

**2. listProducts**

```robinpath
bigcommerce.listProducts
```

## Available Functions

| Function | Description |
|----------|-------------|
| `bigcommerce.setCredentials` | Configure bigcommerce credentials. |
| `bigcommerce.listProducts` | listProducts |
| `bigcommerce.getProduct` | getProduct |
| `bigcommerce.createProduct` | createProduct |
| `bigcommerce.updateProduct` | updateProduct |
| `bigcommerce.deleteProduct` | deleteProduct |
| `bigcommerce.listOrders` | listOrders |
| `bigcommerce.getOrder` | getOrder |
| `bigcommerce.updateOrder` | updateOrder |
| `bigcommerce.listCustomers` | listCustomers |
| `bigcommerce.getCustomer` | getCustomer |
| `bigcommerce.createCustomer` | createCustomer |
| `bigcommerce.updateCustomer` | updateCustomer |
| `bigcommerce.listCategories` | listCategories |
| `bigcommerce.createCategory` | createCategory |
| `bigcommerce.listBrands` | listBrands |
| `bigcommerce.createBrand` | createBrand |
| `bigcommerce.getOrderProducts` | getOrderProducts |
| `bigcommerce.getStoreInfo` | getStoreInfo |
| `bigcommerce.listChannels` | listChannels |
| `bigcommerce.getOrderShipments` | getOrderShipments |

## Examples

### listProducts

```robinpath
bigcommerce.listProducts
```

### getProduct

```robinpath
bigcommerce.getProduct
```

### createProduct

```robinpath
bigcommerce.createProduct
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/bigcommerce";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  bigcommerce.setCredentials "your-credentials"
  bigcommerce.listProducts
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/shopify`](../shopify) — Shopify module for complementary functionality
- [`@robinpath/woocommerce`](../woocommerce) — WooCommerce module for complementary functionality
- [`@robinpath/square`](../square) — Square module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
