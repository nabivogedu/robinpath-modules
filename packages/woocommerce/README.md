# @robinpath/woocommerce

> WooCommerce module for RobinPath.

![Category](https://img.shields.io/badge/category-E-Commerce-blue) ![Functions](https://img.shields.io/badge/functions-23-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `woocommerce` module lets you:

- listProducts
- getProduct
- createProduct
- updateProduct
- deleteProduct

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/woocommerce
```

## Quick Start

**1. Set up credentials**

```robinpath
woocommerce.setCredentials "your-credentials"
```

**2. listProducts**

```robinpath
woocommerce.listProducts
```

## Available Functions

| Function | Description |
|----------|-------------|
| `woocommerce.setCredentials` | Configure woocommerce credentials. |
| `woocommerce.listProducts` | listProducts |
| `woocommerce.getProduct` | getProduct |
| `woocommerce.createProduct` | createProduct |
| `woocommerce.updateProduct` | updateProduct |
| `woocommerce.deleteProduct` | deleteProduct |
| `woocommerce.listOrders` | listOrders |
| `woocommerce.getOrder` | getOrder |
| `woocommerce.createOrder` | createOrder |
| `woocommerce.updateOrder` | updateOrder |
| `woocommerce.deleteOrder` | deleteOrder |
| `woocommerce.listCustomers` | listCustomers |
| `woocommerce.getCustomer` | getCustomer |
| `woocommerce.createCustomer` | createCustomer |
| `woocommerce.updateCustomer` | updateCustomer |
| `woocommerce.listCategories` | listCategories |
| `woocommerce.createCategory` | createCategory |
| `woocommerce.listCoupons` | listCoupons |
| `woocommerce.createCoupon` | createCoupon |
| `woocommerce.getOrderNotes` | getOrderNotes |
| `woocommerce.createOrderNote` | createOrderNote |
| `woocommerce.getReport` | getReport |
| `woocommerce.listShipping` | listShipping |

## Examples

### listProducts

```robinpath
woocommerce.listProducts
```

### getProduct

```robinpath
woocommerce.getProduct
```

### createProduct

```robinpath
woocommerce.createProduct
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/woocommerce";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  woocommerce.setCredentials "your-credentials"
  woocommerce.listProducts
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/shopify`](../shopify) — Shopify module for complementary functionality
- [`@robinpath/bigcommerce`](../bigcommerce) — BigCommerce module for complementary functionality
- [`@robinpath/square`](../square) — Square module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
