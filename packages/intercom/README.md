# @robinpath/intercom

> Intercom module for RobinPath.

![Category](https://img.shields.io/badge/category-CRM-blue) ![Functions](https://img.shields.io/badge/functions-19-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `intercom` module lets you:

- listContacts
- getContact
- createContact
- updateContact
- deleteContact

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/intercom
```

## Quick Start

**1. Set up credentials**

```robinpath
intercom.setCredentials "your-credentials"
```

**2. listContacts**

```robinpath
intercom.listContacts
```

## Available Functions

| Function | Description |
|----------|-------------|
| `intercom.setCredentials` | Configure intercom credentials. |
| `intercom.listContacts` | listContacts |
| `intercom.getContact` | getContact |
| `intercom.createContact` | createContact |
| `intercom.updateContact` | updateContact |
| `intercom.deleteContact` | deleteContact |
| `intercom.searchContacts` | searchContacts |
| `intercom.listConversations` | listConversations |
| `intercom.getConversation` | getConversation |
| `intercom.replyToConversation` | replyToConversation |
| `intercom.assignConversation` | assignConversation |
| `intercom.closeConversation` | closeConversation |
| `intercom.listCompanies` | listCompanies |
| `intercom.getCompany` | getCompany |
| `intercom.createCompany` | createCompany |
| `intercom.listTags` | listTags |
| `intercom.createTag` | createTag |
| `intercom.tagContact` | tagContact |
| `intercom.removeTag` | removeTag |

## Examples

### listContacts

```robinpath
intercom.listContacts
```

### getContact

```robinpath
intercom.getContact
```

### createContact

```robinpath
intercom.createContact
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/intercom";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  intercom.setCredentials "your-credentials"
  intercom.listContacts
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/hubspot`](../hubspot) — HubSpot module for complementary functionality
- [`@robinpath/salesforce`](../salesforce) — Salesforce module for complementary functionality
- [`@robinpath/pipedrive`](../pipedrive) — Pipedrive module for complementary functionality
- [`@robinpath/freshdesk`](../freshdesk) — Freshdesk module for complementary functionality
- [`@robinpath/zoho`](../zoho) — Zoho module for complementary functionality

## License

MIT
