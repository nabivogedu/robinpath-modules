# @robinpath/xero

> Xero module for RobinPath.

![Category](https://img.shields.io/badge/category-Finance-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `xero` module lets you:

- listInvoices
- getInvoice
- createInvoice
- updateInvoice
- sendInvoice

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/xero
```

## Quick Start

**1. Set up credentials**

```robinpath
xero.setCredentials "your-credentials"
```

**2. listInvoices**

```robinpath
xero.listInvoices
```

## Available Functions

| Function | Description |
|----------|-------------|
| `xero.setCredentials` | Configure xero credentials. |
| `xero.listInvoices` | listInvoices |
| `xero.getInvoice` | getInvoice |
| `xero.createInvoice` | createInvoice |
| `xero.updateInvoice` | updateInvoice |
| `xero.sendInvoice` | sendInvoice |
| `xero.voidInvoice` | voidInvoice |
| `xero.listContacts` | listContacts |
| `xero.getContact` | getContact |
| `xero.createContact` | createContact |
| `xero.updateContact` | updateContact |
| `xero.listAccounts` | listAccounts |
| `xero.getAccount` | getAccount |
| `xero.listBankTransactions` | listBankTransactions |
| `xero.createBankTransaction` | createBankTransaction |
| `xero.listPayments` | listPayments |
| `xero.createPayment` | createPayment |
| `xero.listItems` | listItems |
| `xero.createItem` | createItem |
| `xero.getOrganization` | getOrganization |
| `xero.getReport` | getReport |

## Examples

### listInvoices

```robinpath
xero.listInvoices
```

### getInvoice

```robinpath
xero.getInvoice
```

### createInvoice

```robinpath
xero.createInvoice
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/xero";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  xero.setCredentials "your-credentials"
  xero.listInvoices
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/quickbooks`](../quickbooks) — QuickBooks module for complementary functionality
- [`@robinpath/freshbooks`](../freshbooks) — FreshBooks module for complementary functionality
- [`@robinpath/invoice`](../invoice) — Invoice module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
