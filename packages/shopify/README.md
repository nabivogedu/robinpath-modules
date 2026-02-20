# @robinpath/shopify

> Shopify module for RobinPath.

![Category](https://img.shields.io/badge/category-E-Commerce-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `shopify` module lets you:

- List products in the store.
- Get a product by ID.
- Create a new product.
- Update an existing product.
- List orders with optional filters.

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/shopify
```

## Quick Start

**1. Set up credentials**

```robinpath
shopify.setCredentials "my-store" "shpat_xxx"
```

**2. List products in the store.**

```robinpath
shopify.listProducts {"limit":10}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `shopify.setCredentials` | Set Shopify store credentials. |
| `shopify.listProducts` | List products in the store. |
| `shopify.getProduct` | Get a product by ID. |
| `shopify.createProduct` | Create a new product. |
| `shopify.updateProduct` | Update an existing product. |
| `shopify.listOrders` | List orders with optional filters. |
| `shopify.getOrder` | Get an order by ID. |
| `shopify.listCustomers` | List customers. |
| `shopify.getCustomer` | Get a customer by ID. |
| `shopify.getInventory` | Get inventory levels for an item. |
| `shopify.countProducts` | Get total product count. |
| `shopify.countOrders` | Get total order count with optional status filter. |

## Examples

### List products in the store.

```robinpath
shopify.listProducts {"limit":10}
```

### Get a product by ID.

```robinpath
shopify.getProduct "123456789"
```

### Create a new product.

```robinpath
shopify.createProduct {"title":"New Product","body_html":"<p>Description</p>","vendor":"My Brand"}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/shopify";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  shopify.setCredentials "my-store" "shpat_xxx"
  shopify.listProducts {"limit":10}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/woocommerce`](../woocommerce) — WooCommerce module for complementary functionality
- [`@robinpath/bigcommerce`](../bigcommerce) — BigCommerce module for complementary functionality
- [`@robinpath/square`](../square) — Square module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
