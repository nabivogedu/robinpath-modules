# @robinpath/invoice

> Invoice module for RobinPath.

![Category](https://img.shields.io/badge/category-Finance-blue) ![Functions](https://img.shields.io/badge/functions-14-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `invoice` module lets you:

- createInvoice
- addLineItem
- removeLineItem
- calculateTotals
- addDiscount

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/invoice
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
invoice.addLineItem
```

## Available Functions

| Function | Description |
|----------|-------------|
| `invoice.createInvoice` | createInvoice |
| `invoice.addLineItem` | addLineItem |
| `invoice.removeLineItem` | removeLineItem |
| `invoice.setCompanyInfo` | setCompanyInfo |
| `invoice.setClientInfo` | setClientInfo |
| `invoice.calculateTotals` | calculateTotals |
| `invoice.addDiscount` | addDiscount |
| `invoice.addNote` | addNote |
| `invoice.setPaymentTerms` | setPaymentTerms |
| `invoice.setCurrency` | setCurrency |
| `invoice.formatInvoice` | formatInvoice |
| `invoice.duplicateInvoice` | duplicateInvoice |
| `invoice.markAsPaid` | markAsPaid |
| `invoice.generateInvoiceNumber` | generateInvoiceNumber |

## Examples

### addLineItem

```robinpath
invoice.addLineItem
```

### removeLineItem

```robinpath
invoice.removeLineItem
```

### setCompanyInfo

```robinpath
invoice.setCompanyInfo
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/invoice";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  invoice.addLineItem
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/quickbooks`](../quickbooks) — QuickBooks module for complementary functionality
- [`@robinpath/xero`](../xero) — Xero module for complementary functionality
- [`@robinpath/freshbooks`](../freshbooks) — FreshBooks module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
