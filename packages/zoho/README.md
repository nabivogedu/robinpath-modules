# @robinpath/zoho

> Zoho module for RobinPath.

![Category](https://img.shields.io/badge/category-CRM-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `zoho` module lets you:

- listRecords
- getRecord
- createRecord
- updateRecord
- deleteRecord

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/zoho
```

## Quick Start

**1. Set up credentials**

```robinpath
zoho.setCredentials "your-credentials"
```

**2. listRecords**

```robinpath
zoho.listRecords
```

## Available Functions

| Function | Description |
|----------|-------------|
| `zoho.setCredentials` | Configure zoho credentials. |
| `zoho.listRecords` | listRecords |
| `zoho.getRecord` | getRecord |
| `zoho.createRecord` | createRecord |
| `zoho.updateRecord` | updateRecord |
| `zoho.deleteRecord` | deleteRecord |
| `zoho.searchRecords` | searchRecords |
| `zoho.upsertRecords` | upsertRecords |
| `zoho.listModules` | listModules |
| `zoho.getModuleFields` | getModuleFields |
| `zoho.createLead` | createLead |
| `zoho.createContact` | createContact |
| `zoho.createDeal` | createDeal |
| `zoho.createAccount` | createAccount |
| `zoho.createTask` | createTask |
| `zoho.convertLead` | convertLead |
| `zoho.addNote` | addNote |
| `zoho.listNotes` | listNotes |
| `zoho.getUsers` | getUsers |
| `zoho.getOrganization` | getOrganization |
| `zoho.bulkRead` | bulkRead |

## Examples

### listRecords

```robinpath
zoho.listRecords
```

### getRecord

```robinpath
zoho.getRecord
```

### createRecord

```robinpath
zoho.createRecord
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/zoho";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  zoho.setCredentials "your-credentials"
  zoho.listRecords
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/hubspot`](../hubspot) — HubSpot module for complementary functionality
- [`@robinpath/salesforce`](../salesforce) — Salesforce module for complementary functionality
- [`@robinpath/pipedrive`](../pipedrive) — Pipedrive module for complementary functionality
- [`@robinpath/freshdesk`](../freshdesk) — Freshdesk module for complementary functionality
- [`@robinpath/intercom`](../intercom) — Intercom module for complementary functionality

## License

MIT
