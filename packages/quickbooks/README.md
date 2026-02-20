# @robinpath/quickbooks

> QuickBooks module for RobinPath.

![Category](https://img.shields.io/badge/category-Finance-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `quickbooks` module lets you:

- query
- getInvoice
- createInvoice
- sendInvoice
- voidInvoice

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/quickbooks
```

## Quick Start

**1. Set up credentials**

```robinpath
quickbooks.setCredentials "your-credentials"
```

**2. query**

```robinpath
quickbooks.query
```

## Available Functions

| Function | Description |
|----------|-------------|
| `quickbooks.setCredentials` | Configure quickbooks credentials. |
| `quickbooks.query` | query |
| `quickbooks.getInvoice` | getInvoice |
| `quickbooks.createInvoice` | createInvoice |
| `quickbooks.sendInvoice` | sendInvoice |
| `quickbooks.voidInvoice` | voidInvoice |
| `quickbooks.getCustomer` | getCustomer |
| `quickbooks.createCustomer` | createCustomer |
| `quickbooks.updateCustomer` | updateCustomer |
| `quickbooks.listCustomers` | listCustomers |
| `quickbooks.getPayment` | getPayment |
| `quickbooks.createPayment` | createPayment |
| `quickbooks.getExpense` | getExpense |
| `quickbooks.createExpense` | createExpense |
| `quickbooks.getItem` | getItem |
| `quickbooks.createItem` | createItem |
| `quickbooks.listItems` | listItems |
| `quickbooks.getCompanyInfo` | getCompanyInfo |
| `quickbooks.getReport` | getReport |
| `quickbooks.listAccounts` | listAccounts |
| `quickbooks.createBill` | createBill |

## Examples

### query

```robinpath
quickbooks.query
```

### getInvoice

```robinpath
quickbooks.getInvoice
```

### createInvoice

```robinpath
quickbooks.createInvoice
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/quickbooks";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  quickbooks.setCredentials "your-credentials"
  quickbooks.query
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/xero`](../xero) — Xero module for complementary functionality
- [`@robinpath/freshbooks`](../freshbooks) — FreshBooks module for complementary functionality
- [`@robinpath/invoice`](../invoice) — Invoice module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
