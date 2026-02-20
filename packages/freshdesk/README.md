# @robinpath/freshdesk

> Freshdesk module for RobinPath.

![Category](https://img.shields.io/badge/category-CRM-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `freshdesk` module lets you:

- listTickets
- getTicket
- createTicket
- updateTicket
- deleteTicket

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/freshdesk
```

## Quick Start

**1. Set up credentials**

```robinpath
freshdesk.setCredentials "your-credentials"
```

**2. listTickets**

```robinpath
freshdesk.listTickets
```

## Available Functions

| Function | Description |
|----------|-------------|
| `freshdesk.setCredentials` | Configure freshdesk credentials. |
| `freshdesk.listTickets` | listTickets |
| `freshdesk.getTicket` | getTicket |
| `freshdesk.createTicket` | createTicket |
| `freshdesk.updateTicket` | updateTicket |
| `freshdesk.deleteTicket` | deleteTicket |
| `freshdesk.listTicketConversations` | listTicketConversations |
| `freshdesk.replyToTicket` | replyToTicket |
| `freshdesk.addNoteToTicket` | addNoteToTicket |
| `freshdesk.listContacts` | listContacts |
| `freshdesk.getContact` | getContact |
| `freshdesk.createContact` | createContact |
| `freshdesk.updateContact` | updateContact |
| `freshdesk.deleteContact` | deleteContact |
| `freshdesk.listAgents` | listAgents |
| `freshdesk.getAgent` | getAgent |
| `freshdesk.listGroups` | listGroups |
| `freshdesk.listCompanies` | listCompanies |
| `freshdesk.createCompany` | createCompany |
| `freshdesk.searchTickets` | searchTickets |
| `freshdesk.filterTickets` | filterTickets |

## Examples

### listTickets

```robinpath
freshdesk.listTickets
```

### getTicket

```robinpath
freshdesk.getTicket
```

### createTicket

```robinpath
freshdesk.createTicket
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/freshdesk";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  freshdesk.setCredentials "your-credentials"
  freshdesk.listTickets
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/hubspot`](../hubspot) — HubSpot module for complementary functionality
- [`@robinpath/salesforce`](../salesforce) — Salesforce module for complementary functionality
- [`@robinpath/pipedrive`](../pipedrive) — Pipedrive module for complementary functionality
- [`@robinpath/intercom`](../intercom) — Intercom module for complementary functionality
- [`@robinpath/zoho`](../zoho) — Zoho module for complementary functionality

## License

MIT
