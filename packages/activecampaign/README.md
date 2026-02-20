# @robinpath/activecampaign

> ActiveCampaign -- contacts, automations, campaigns, deals, lists, and tags via the ActiveCampaign REST API v3.

![Category](https://img.shields.io/badge/category-Email-marketing-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

Use the `activecampaign` module to integrate email-marketing capabilities into your RobinPath scripts.

## Installation

```bash
npm install @robinpath/activecampaign
```

## Quick Start

**1. Set up credentials**

```robinpath
activecampaign.setCredentials "mycompany" "your-api-token-here"
```

**2. Retrieve a paginated list of all contacts in your account.**

```robinpath
set $result as activecampaign.listContacts
set $contacts as $result.contacts
```

## Available Functions

| Function | Description |
|----------|-------------|
| `activecampaign.setCredentials` | Configure API credentials (account name + token) |
| `activecampaign.listContacts` | List all contacts, optionally filtered |
| `activecampaign.getContact` | Get a single contact by ID |
| `activecampaign.createContact` | Create a new contact |
| `activecampaign.updateContact` | Update an existing contact by ID |
| `activecampaign.deleteContact` | Delete a contact by ID |
| `activecampaign.listLists` | List all mailing lists |
| `activecampaign.getList` | Get a mailing list by ID |
| `activecampaign.createList` | Create a new mailing list |
| `activecampaign.addContactToList` | Subscribe a contact to a list |
| `activecampaign.removeContactFromList` | Unsubscribe a contact from a list |
| `activecampaign.listTags` | List all tags |
| `activecampaign.createTag` | Create a new tag |
| `activecampaign.addTagToContact` | Apply a tag to a contact |
| `activecampaign.removeTagFromContact` | Remove a tag from a contact |
| `activecampaign.listAutomations` | List all automations |
| `activecampaign.addContactToAutomation` | Enroll a contact into an automation |
| `activecampaign.listDeals` | List all deals in the CRM |
| `activecampaign.createDeal` | Create a new deal |
| `activecampaign.updateDeal` | Update an existing deal by ID |
| `activecampaign.listCampaigns` | List all email campaigns |

## Examples

### Retrieve a paginated list of all contacts in your account.

```robinpath
set $result as activecampaign.listContacts
set $contacts as $result.contacts
```

### Retrieve a single contact by their ID.

```robinpath
set $result as activecampaign.getContact "42"
set $email as $result.contact.email
set $name as $result.contact.firstName
```

### Create a new contact in ActiveCampaign.

```robinpath
set $result as activecampaign.createContact {"email": "jane@example.com", "firstName": "Jane", "lastName": "Doe", "phone": "+1234567890"}
set $newId as $result.contact.id
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/activecampaign";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  activecampaign.setCredentials "mycompany" "your-api-token-here"
  set $result as activecampaign.listContacts
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/hubspot`](../hubspot) — Full CRM with marketing, sales, and service hubs; alternative CRM integration
- [`@robinpath/brevo`](../brevo) — Alternative email marketing and transactional email platform
- [`@robinpath/mailchimp`](../mailchimp) — Email marketing with audience management and campaign analytics
- [`@robinpath/slack`](../slack) — Send notifications to Slack channels when contacts are created or deals close
- [`@robinpath/google-sheets`](../google-sheets) — Export contact lists or deal pipelines to spreadsheets for reporting
- [`@robinpath/json`](../json) — Parse and construct the data objects required by ActiveCampaign functions

## License

MIT
