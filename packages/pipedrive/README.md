# @robinpath/pipedrive

> Pipedrive module for RobinPath.

![Category](https://img.shields.io/badge/category-CRM-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `pipedrive` module lets you:

- listDeals
- getDeal
- createDeal
- updateDeal
- deleteDeal

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/pipedrive
```

## Quick Start

**1. Set up credentials**

```robinpath
pipedrive.setCredentials "your-credentials"
```

**2. listDeals**

```robinpath
pipedrive.listDeals
```

## Available Functions

| Function | Description |
|----------|-------------|
| `pipedrive.setCredentials` | Configure pipedrive credentials. |
| `pipedrive.listDeals` | listDeals |
| `pipedrive.getDeal` | getDeal |
| `pipedrive.createDeal` | createDeal |
| `pipedrive.updateDeal` | updateDeal |
| `pipedrive.deleteDeal` | deleteDeal |
| `pipedrive.listPersons` | listPersons |
| `pipedrive.getPerson` | getPerson |
| `pipedrive.createPerson` | createPerson |
| `pipedrive.updatePerson` | updatePerson |
| `pipedrive.deletePerson` | deletePerson |
| `pipedrive.listOrganizations` | listOrganizations |
| `pipedrive.getOrganization` | getOrganization |
| `pipedrive.createOrganization` | createOrganization |
| `pipedrive.updateOrganization` | updateOrganization |
| `pipedrive.listActivities` | listActivities |
| `pipedrive.createActivity` | createActivity |
| `pipedrive.updateActivity` | updateActivity |
| `pipedrive.listPipelines` | listPipelines |
| `pipedrive.listStages` | listStages |
| `pipedrive.searchDeals` | searchDeals |

## Examples

### listDeals

```robinpath
pipedrive.listDeals
```

### getDeal

```robinpath
pipedrive.getDeal
```

### createDeal

```robinpath
pipedrive.createDeal
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/pipedrive";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  pipedrive.setCredentials "your-credentials"
  pipedrive.listDeals
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/hubspot`](../hubspot) — HubSpot module for complementary functionality
- [`@robinpath/salesforce`](../salesforce) — Salesforce module for complementary functionality
- [`@robinpath/freshdesk`](../freshdesk) — Freshdesk module for complementary functionality
- [`@robinpath/intercom`](../intercom) — Intercom module for complementary functionality
- [`@robinpath/zoho`](../zoho) — Zoho module for complementary functionality

## License

MIT
