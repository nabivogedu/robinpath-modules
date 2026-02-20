# @robinpath/freshbooks

> FreshBooks module for RobinPath.

![Category](https://img.shields.io/badge/category-Finance-blue) ![Functions](https://img.shields.io/badge/functions-19-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `freshbooks` module lets you:

- listClients
- getClient
- createClient
- updateClient
- listInvoices

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/freshbooks
```

## Quick Start

**1. Set up credentials**

```robinpath
freshbooks.setCredentials "your-credentials"
```

**2. listClients**

```robinpath
freshbooks.listClients
```

## Available Functions

| Function | Description |
|----------|-------------|
| `freshbooks.setCredentials` | Configure freshbooks credentials. |
| `freshbooks.listClients` | listClients |
| `freshbooks.getClient` | getClient |
| `freshbooks.createClient` | createClient |
| `freshbooks.updateClient` | updateClient |
| `freshbooks.listInvoices` | listInvoices |
| `freshbooks.getInvoice` | getInvoice |
| `freshbooks.createInvoice` | createInvoice |
| `freshbooks.updateInvoice` | updateInvoice |
| `freshbooks.sendInvoice` | sendInvoice |
| `freshbooks.listExpenses` | listExpenses |
| `freshbooks.getExpense` | getExpense |
| `freshbooks.createExpense` | createExpense |
| `freshbooks.listTimeEntries` | listTimeEntries |
| `freshbooks.createTimeEntry` | createTimeEntry |
| `freshbooks.listPayments` | listPayments |
| `freshbooks.createPayment` | createPayment |
| `freshbooks.getUser` | getUser |
| `freshbooks.getAccount` | getAccount |

## Examples

### listClients

```robinpath
freshbooks.listClients
```

### getClient

```robinpath
freshbooks.getClient
```

### createClient

```robinpath
freshbooks.createClient
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/freshbooks";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  freshbooks.setCredentials "your-credentials"
  freshbooks.listClients
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/quickbooks`](../quickbooks) — QuickBooks module for complementary functionality
- [`@robinpath/xero`](../xero) — Xero module for complementary functionality
- [`@robinpath/invoice`](../invoice) — Invoice module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
