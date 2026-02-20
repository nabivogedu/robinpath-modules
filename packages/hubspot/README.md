# @robinpath/hubspot

> HubSpot module for RobinPath.

![Category](https://img.shields.io/badge/category-CRM-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-Bearer%20Token-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `hubspot` module lets you:

- Create a new contact in HubSpot.
- Get a contact by ID.
- Update a contact's properties.
- List contacts with pagination.
- Search contacts by query string.

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/hubspot
```

## Quick Start

**1. Set up credentials**

```robinpath
hubspot.setToken "pat-xxx"
```

**2. Create a new contact in HubSpot.**

```robinpath
hubspot.createContact {"email":"john@example.com","firstname":"John","lastname":"Doe"}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `hubspot.setToken` | Set the HubSpot private app access token. |
| `hubspot.createContact` | Create a new contact in HubSpot. |
| `hubspot.getContact` | Get a contact by ID. |
| `hubspot.updateContact` | Update a contact's properties. |
| `hubspot.listContacts` | List contacts with pagination. |
| `hubspot.searchContacts` | Search contacts by query string. |
| `hubspot.createDeal` | Create a new deal in HubSpot. |
| `hubspot.getDeal` | Get a deal by ID. |
| `hubspot.updateDeal` | Update a deal's properties. |
| `hubspot.listDeals` | List deals with pagination. |
| `hubspot.createCompany` | Create a new company in HubSpot. |
| `hubspot.getCompany` | Get a company by ID. |

## Examples

### Create a new contact in HubSpot.

```robinpath
hubspot.createContact {"email":"john@example.com","firstname":"John","lastname":"Doe"}
```

### Get a contact by ID.

```robinpath
hubspot.getContact "123"
```

### Update a contact's properties.

```robinpath
hubspot.updateContact "123" {"phone":"+1234567890"}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/hubspot";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  hubspot.setToken "pat-xxx"
  hubspot.createContact {"email":"john@example.com","firstname":"John","lastname":"Doe"}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/salesforce`](../salesforce) — Salesforce module for complementary functionality
- [`@robinpath/pipedrive`](../pipedrive) — Pipedrive module for complementary functionality
- [`@robinpath/freshdesk`](../freshdesk) — Freshdesk module for complementary functionality
- [`@robinpath/intercom`](../intercom) — Intercom module for complementary functionality
- [`@robinpath/zoho`](../zoho) — Zoho module for complementary functionality

## License

MIT
