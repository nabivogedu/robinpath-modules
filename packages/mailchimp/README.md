# @robinpath/mailchimp

> Mailchimp module for RobinPath.

![Category](https://img.shields.io/badge/category-Email-marketing-blue) ![Functions](https://img.shields.io/badge/functions-25-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `mailchimp` module lets you:

- Get all audiences/lists in the account
- Get details for a specific audience/list
- Create a new audience/list with contact info and campaign defaults
- Delete an audience/list
- Get members of an audience/list with optional filtering

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/mailchimp
```

## Quick Start

**1. Set up credentials**

```robinpath
mailchimp.setCredentials "abc123-us21" "us21"
```

**2. Get all audiences/lists in the account**

```robinpath
mailchimp.getLists
```

## Available Functions

| Function | Description |
|----------|-------------|
| `mailchimp.setCredentials` | Store Mailchimp API key and server prefix for authentication |
| `mailchimp.getLists` | Get all audiences/lists in the account |
| `mailchimp.getList` | Get details for a specific audience/list |
| `mailchimp.createList` | Create a new audience/list with contact info and campaign defaults |
| `mailchimp.deleteList` | Delete an audience/list |
| `mailchimp.getMembers` | Get members of an audience/list with optional filtering |
| `mailchimp.getMember` | Get a specific member by email address |
| `mailchimp.addMember` | Add a new member to an audience/list |
| `mailchimp.updateMember` | Update an existing member's information |
| `mailchimp.removeMember` | Archive/remove a member from an audience/list |
| `mailchimp.addTag` | Add tags to a member in an audience/list |
| `mailchimp.removeTag` | Remove tags from a member in an audience/list |
| `mailchimp.getCampaigns` | List campaigns with optional filtering |
| `mailchimp.getCampaign` | Get details for a specific campaign |
| `mailchimp.createCampaign` | Create a new campaign (regular, plaintext, or absplit) |
| `mailchimp.updateCampaign` | Update campaign settings |
| `mailchimp.deleteCampaign` | Delete a campaign |
| `mailchimp.sendCampaign` | Send a campaign immediately |
| `mailchimp.scheduleCampaign` | Schedule a campaign for future delivery |
| `mailchimp.getCampaignContent` | Get the content of a campaign |
| `mailchimp.setCampaignContent` | Set the content of a campaign with HTML or a template |
| `mailchimp.getTemplates` | List available email templates |
| `mailchimp.getTemplate` | Get details for a specific template |
| `mailchimp.searchMembers` | Search for members across all lists or a specific list |
| `mailchimp.getListActivity` | Get recent activity stats for an audience/list |

## Examples

### Get all audiences/lists in the account

```robinpath
mailchimp.getLists
```

### Get details for a specific audience/list

```robinpath
mailchimp.getList "abc123"
```

### Create a new audience/list with contact info and campaign defaults

```robinpath
mailchimp.createList "My Newsletter" {"company": "Acme", "fromEmail": "news@acme.com", "fromName": "Acme News"}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/mailchimp";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  mailchimp.setCredentials "abc123-us21" "us21"
  mailchimp.getLists
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/activecampaign`](../activecampaign) — ActiveCampaign module for complementary functionality
- [`@robinpath/brevo`](../brevo) — Brevo module for complementary functionality
- [`@robinpath/convertkit`](../convertkit) — Convertkit module for complementary functionality
- [`@robinpath/sendgrid`](../sendgrid) — SendGrid module for complementary functionality
- [`@robinpath/lemlist`](../lemlist) — Lemlist module for complementary functionality

## License

MIT
