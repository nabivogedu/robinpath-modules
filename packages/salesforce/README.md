# @robinpath/salesforce

> Salesforce module for RobinPath.

![Category](https://img.shields.io/badge/category-CRM-blue) ![Functions](https://img.shields.io/badge/functions-25-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `salesforce` module lets you:

- query
- getRecord
- createRecord
- updateRecord
- deleteRecord

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/salesforce
```

## Quick Start

**1. Set up credentials**

```robinpath
salesforce.setCredentials "your-credentials"
```

**2. query**

```robinpath
salesforce.query
```

## Available Functions

| Function | Description |
|----------|-------------|
| `salesforce.setCredentials` | Configure salesforce credentials. |
| `salesforce.query` | query |
| `salesforce.getRecord` | getRecord |
| `salesforce.createRecord` | createRecord |
| `salesforce.updateRecord` | updateRecord |
| `salesforce.deleteRecord` | deleteRecord |
| `salesforce.upsertRecord` | upsertRecord |
| `salesforce.describeObject` | describeObject |
| `salesforce.listObjects` | listObjects |
| `salesforce.search` | search |
| `salesforce.createLead` | createLead |
| `salesforce.createContact` | createContact |
| `salesforce.createOpportunity` | createOpportunity |
| `salesforce.createAccount` | createAccount |
| `salesforce.createTask` | createTask |
| `salesforce.createCase` | createCase |
| `salesforce.getReport` | getReport |
| `salesforce.listReports` | listReports |
| `salesforce.bulkQuery` | bulkQuery |
| `salesforce.getUser` | getUser |
| `salesforce.listUsers` | listUsers |
| `salesforce.getOrganization` | getOrganization |
| `salesforce.runApex` | runApex |
| `salesforce.getRecentRecords` | getRecentRecords |
| `salesforce.searchRecords` | searchRecords |

## Examples

### query

```robinpath
salesforce.query
```

### getRecord

```robinpath
salesforce.getRecord
```

### createRecord

```robinpath
salesforce.createRecord
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/salesforce";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  salesforce.setCredentials "your-credentials"
  salesforce.query
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/hubspot`](../hubspot) — HubSpot module for complementary functionality
- [`@robinpath/pipedrive`](../pipedrive) — Pipedrive module for complementary functionality
- [`@robinpath/freshdesk`](../freshdesk) — Freshdesk module for complementary functionality
- [`@robinpath/intercom`](../intercom) — Intercom module for complementary functionality
- [`@robinpath/zoho`](../zoho) — Zoho module for complementary functionality

## License

MIT
