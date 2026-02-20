# @robinpath/sendgrid

> SendGrid module for RobinPath.

![Category](https://img.shields.io/badge/category-Email-marketing-blue) ![Functions](https://img.shields.io/badge/functions-20-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `sendgrid` module lets you:

- Send an email with text/html content, cc, bcc, replyTo, and attachments
- Send an email using a SendGrid dynamic template
- Add or update a single contact in SendGrid Marketing
- Bulk add or update contacts in SendGrid Marketing
- Delete a contact by ID from SendGrid Marketing

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/sendgrid
```

## Quick Start

**1. Set up credentials**

```robinpath
sendgrid.setApiKey "SG.xxxxxxxxxxxxxxxxxxxxxxxx"
```

**2. Send an email with text/html content, cc, bcc, replyTo, and attachments**

```robinpath
sendgrid.sendEmail "bob@example.com" "noreply@myapp.com" "Welcome!" {"html": "<h1>Hello!</h1>"}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `sendgrid.setApiKey` | Store the SendGrid API key for authentication |
| `sendgrid.sendEmail` | Send an email with text/html content, cc, bcc, replyTo, and attachments |
| `sendgrid.sendTemplate` | Send an email using a SendGrid dynamic template |
| `sendgrid.addContact` | Add or update a single contact in SendGrid Marketing |
| `sendgrid.addContacts` | Bulk add or update contacts in SendGrid Marketing |
| `sendgrid.removeContact` | Delete a contact by ID from SendGrid Marketing |
| `sendgrid.searchContacts` | Search contacts using SendGrid Segmentation Query Language (SGQL) |
| `sendgrid.listContacts` | List all contacts with optional pagination |
| `sendgrid.createList` | Create a new contact list in SendGrid Marketing |
| `sendgrid.listLists` | List all contact lists in SendGrid Marketing |
| `sendgrid.deleteList` | Delete a contact list by ID |
| `sendgrid.addToList` | Add contacts to a contact list by their IDs |
| `sendgrid.removeFromList` | Remove contacts from a contact list by their IDs |
| `sendgrid.getSingleSend` | Get details of a Single Send campaign by ID |
| `sendgrid.listSingleSends` | List all Single Send campaigns |
| `sendgrid.createSingleSend` | Create a new Single Send campaign |
| `sendgrid.sendSingleSend` | Send or schedule a Single Send campaign immediately |
| `sendgrid.getStats` | Get global email statistics (requests, deliveries, opens, clicks, etc.) |
| `sendgrid.getTemplates` | List all email templates with optional generation filter |
| `sendgrid.getTemplate` | Get details of a specific email template by ID |

## Examples

### Send an email with text/html content, cc, bcc, replyTo, and attachments

```robinpath
sendgrid.sendEmail "bob@example.com" "noreply@myapp.com" "Welcome!" {"html": "<h1>Hello!</h1>"}
```

### Send an email using a SendGrid dynamic template

```robinpath
sendgrid.sendTemplate "bob@example.com" "noreply@myapp.com" "d-abc123" {"name": "Bob", "orderId": "12345"}
```

### Add or update a single contact in SendGrid Marketing

```robinpath
sendgrid.addContact "bob@example.com" {"firstName": "Bob", "lastName": "Smith"}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/sendgrid";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  sendgrid.setApiKey "SG.xxxxxxxxxxxxxxxxxxxxxxxx"
  sendgrid.sendEmail "bob@example.com" "noreply@myapp.com" "Welcome!" {"html": "<h1>Hello!</h1>"}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/activecampaign`](../activecampaign) — ActiveCampaign module for complementary functionality
- [`@robinpath/brevo`](../brevo) — Brevo module for complementary functionality
- [`@robinpath/convertkit`](../convertkit) — Convertkit module for complementary functionality
- [`@robinpath/mailchimp`](../mailchimp) — Mailchimp module for complementary functionality
- [`@robinpath/lemlist`](../lemlist) — Lemlist module for complementary functionality

## License

MIT
