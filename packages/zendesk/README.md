# @robinpath/zendesk

> Zendesk module for RobinPath.

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-23-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `zendesk` module lets you:

- listTickets
- getTicket
- createTicket
- updateTicket
- deleteTicket

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/zendesk
```

## Quick Start

**1. Set up credentials**

```robinpath
zendesk.setCredentials "your-credentials"
```

**2. listTickets**

```robinpath
zendesk.listTickets
```

## Available Functions

| Function | Description |
|----------|-------------|
| `zendesk.setCredentials` | Configure zendesk credentials. |
| `zendesk.listTickets` | listTickets |
| `zendesk.getTicket` | getTicket |
| `zendesk.createTicket` | createTicket |
| `zendesk.updateTicket` | updateTicket |
| `zendesk.deleteTicket` | deleteTicket |
| `zendesk.listTicketComments` | listTicketComments |
| `zendesk.addTicketComment` | addTicketComment |
| `zendesk.listUsers` | listUsers |
| `zendesk.getUser` | getUser |
| `zendesk.createUser` | createUser |
| `zendesk.updateUser` | updateUser |
| `zendesk.searchTickets` | searchTickets |
| `zendesk.listOrganizations` | listOrganizations |
| `zendesk.getOrganization` | getOrganization |
| `zendesk.createOrganization` | createOrganization |
| `zendesk.listGroups` | listGroups |
| `zendesk.assignTicket` | assignTicket |
| `zendesk.listViews` | listViews |
| `zendesk.listMacros` | listMacros |
| `zendesk.getSatisfactionRatings` | getSatisfactionRatings |
| `zendesk.getTicketMetrics` | getTicketMetrics |
| `zendesk.mergeTickets` | mergeTickets |

## Examples

### listTickets

```robinpath
zendesk.listTickets
```

### getTicket

```robinpath
zendesk.getTicket
```

### createTicket

```robinpath
zendesk.createTicket
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/zendesk";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  zendesk.setCredentials "your-credentials"
  zendesk.listTickets
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
