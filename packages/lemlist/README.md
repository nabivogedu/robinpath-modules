# @robinpath/lemlist

> Lemlist module for RobinPath.

![Category](https://img.shields.io/badge/category-Email-marketing-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `lemlist` module lets you:

- listCampaigns
- getCampaign
- listCampaignLeads
- addLeadToCampaign
- deleteLeadFromCampaign

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/lemlist
```

## Quick Start

**1. Set up credentials**

```robinpath
lemlist.setCredentials "your-credentials"
```

**2. listCampaigns**

```robinpath
lemlist.listCampaigns
```

## Available Functions

| Function | Description |
|----------|-------------|
| `lemlist.setCredentials` | Configure lemlist credentials. |
| `lemlist.listCampaigns` | listCampaigns |
| `lemlist.getCampaign` | getCampaign |
| `lemlist.listCampaignLeads` | listCampaignLeads |
| `lemlist.addLeadToCampaign` | addLeadToCampaign |
| `lemlist.deleteLeadFromCampaign` | deleteLeadFromCampaign |
| `lemlist.pauseLeadInCampaign` | pauseLeadInCampaign |
| `lemlist.resumeLeadInCampaign` | resumeLeadInCampaign |
| `lemlist.markLeadAsInterested` | markLeadAsInterested |
| `lemlist.unsubscribeLead` | unsubscribeLead |
| `lemlist.listActivities` | listActivities |
| `lemlist.getLeadByEmail` | getLeadByEmail |
| `lemlist.listUnsubscribes` | listUnsubscribes |
| `lemlist.exportCampaignStats` | exportCampaignStats |
| `lemlist.getCampaignStats` | getCampaignStats |

## Examples

### listCampaigns

```robinpath
lemlist.listCampaigns
```

### getCampaign

```robinpath
lemlist.getCampaign
```

### listCampaignLeads

```robinpath
lemlist.listCampaignLeads
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/lemlist";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  lemlist.setCredentials "your-credentials"
  lemlist.listCampaigns
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/activecampaign`](../activecampaign) — ActiveCampaign module for complementary functionality
- [`@robinpath/brevo`](../brevo) — Brevo module for complementary functionality
- [`@robinpath/convertkit`](../convertkit) — Convertkit module for complementary functionality
- [`@robinpath/mailchimp`](../mailchimp) — Mailchimp module for complementary functionality
- [`@robinpath/sendgrid`](../sendgrid) — SendGrid module for complementary functionality

## License

MIT
