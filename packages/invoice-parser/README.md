# @robinpath/invoice-parser

> Invoice Parser module for RobinPath.

![Category](https://img.shields.io/badge/category-Finance-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `invoice-parser` module lets you:

- parseInvoiceText
- extractTotal
- extractDate
- extractInvoiceNumber
- extractLineItems

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/invoice-parser
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
invoice-parser.extractTotal
```

## Available Functions

| Function | Description |
|----------|-------------|
| `invoice-parser.parseInvoiceText` | parseInvoiceText |
| `invoice-parser.extractTotal` | extractTotal |
| `invoice-parser.extractDate` | extractDate |
| `invoice-parser.extractInvoiceNumber` | extractInvoiceNumber |
| `invoice-parser.extractLineItems` | extractLineItems |
| `invoice-parser.extractVendorInfo` | extractVendorInfo |
| `invoice-parser.extractTaxAmount` | extractTaxAmount |
| `invoice-parser.extractCurrency` | extractCurrency |
| `invoice-parser.extractEmails` | extractEmails |
| `invoice-parser.extractPhoneNumbers` | extractPhoneNumbers |
| `invoice-parser.extractAddresses` | extractAddresses |
| `invoice-parser.categorizeExpense` | categorizeExpense |

## Examples

### extractTotal

```robinpath
invoice-parser.extractTotal
```

### extractDate

```robinpath
invoice-parser.extractDate
```

### extractInvoiceNumber

```robinpath
invoice-parser.extractInvoiceNumber
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/invoice-parser";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  invoice-parser.extractTotal
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/quickbooks`](../quickbooks) — QuickBooks module for complementary functionality
- [`@robinpath/xero`](../xero) — Xero module for complementary functionality
- [`@robinpath/freshbooks`](../freshbooks) — FreshBooks module for complementary functionality
- [`@robinpath/invoice`](../invoice) — Invoice module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
