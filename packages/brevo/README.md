# @robinpath/brevo

> Brevo module for RobinPath.

![Category](https://img.shields.io/badge/category-Email-marketing-blue) ![Functions](https://img.shields.io/badge/functions-19-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `brevo` module lets you:

- sendTransactionalEmail
- sendTransactionalSms
- listContacts
- getContact
- createContact

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/brevo
```

## Quick Start

**1. Set up credentials**

```robinpath
brevo.setCredentials "your-credentials"
```

**2. sendTransactionalEmail**

```robinpath
brevo.sendTransactionalEmail
```

## Available Functions

| Function | Description |
|----------|-------------|
| `brevo.setCredentials` | Configure brevo credentials. |
| `brevo.sendTransactionalEmail` | sendTransactionalEmail |
| `brevo.sendTransactionalSms` | sendTransactionalSms |
| `brevo.listContacts` | listContacts |
| `brevo.getContact` | getContact |
| `brevo.createContact` | createContact |
| `brevo.updateContact` | updateContact |
| `brevo.deleteContact` | deleteContact |
| `brevo.listLists` | listLists |
| `brevo.getList` | getList |
| `brevo.createList` | createList |
| `brevo.addContactToList` | addContactToList |
| `brevo.removeContactFromList` | removeContactFromList |
| `brevo.listCampaigns` | listCampaigns |
| `brevo.getCampaign` | getCampaign |
| `brevo.createEmailCampaign` | createEmailCampaign |
| `brevo.sendCampaign` | sendCampaign |
| `brevo.getEmailEvents` | getEmailEvents |
| `brevo.importContacts` | importContacts |

## Examples

### sendTransactionalEmail

```robinpath
brevo.sendTransactionalEmail
```

### sendTransactionalSms

```robinpath
brevo.sendTransactionalSms
```

### listContacts

```robinpath
brevo.listContacts
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/brevo";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  brevo.setCredentials "your-credentials"
  brevo.sendTransactionalEmail
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/activecampaign`](../activecampaign) — ActiveCampaign module for complementary functionality
- [`@robinpath/convertkit`](../convertkit) — Convertkit module for complementary functionality
- [`@robinpath/mailchimp`](../mailchimp) — Mailchimp module for complementary functionality
- [`@robinpath/sendgrid`](../sendgrid) — SendGrid module for complementary functionality
- [`@robinpath/lemlist`](../lemlist) — Lemlist module for complementary functionality

## License

MIT
