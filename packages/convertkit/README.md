# @robinpath/convertkit

> Convertkit module for RobinPath.

![Category](https://img.shields.io/badge/category-Email-marketing-blue) ![Functions](https://img.shields.io/badge/functions-17-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `convertkit` module lets you:

- listSubscribers
- getSubscriber
- createSubscriber
- updateSubscriber
- unsubscribeSubscriber

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/convertkit
```

## Quick Start

**1. Set up credentials**

```robinpath
convertkit.setCredentials "your-credentials"
```

**2. listSubscribers**

```robinpath
convertkit.listSubscribers
```

## Available Functions

| Function | Description |
|----------|-------------|
| `convertkit.setCredentials` | Configure convertkit credentials. |
| `convertkit.listSubscribers` | listSubscribers |
| `convertkit.getSubscriber` | getSubscriber |
| `convertkit.createSubscriber` | createSubscriber |
| `convertkit.updateSubscriber` | updateSubscriber |
| `convertkit.unsubscribeSubscriber` | unsubscribeSubscriber |
| `convertkit.listTags` | listTags |
| `convertkit.createTag` | createTag |
| `convertkit.tagSubscriber` | tagSubscriber |
| `convertkit.removeTagFromSubscriber` | removeTagFromSubscriber |
| `convertkit.listSequences` | listSequences |
| `convertkit.addSubscriberToSequence` | addSubscriberToSequence |
| `convertkit.listForms` | listForms |
| `convertkit.listBroadcasts` | listBroadcasts |
| `convertkit.createBroadcast` | createBroadcast |
| `convertkit.getAccount` | getAccount |
| `convertkit.listPurchases` | listPurchases |

## Examples

### listSubscribers

```robinpath
convertkit.listSubscribers
```

### getSubscriber

```robinpath
convertkit.getSubscriber
```

### createSubscriber

```robinpath
convertkit.createSubscriber
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/convertkit";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  convertkit.setCredentials "your-credentials"
  convertkit.listSubscribers
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/activecampaign`](../activecampaign) — ActiveCampaign module for complementary functionality
- [`@robinpath/brevo`](../brevo) — Brevo module for complementary functionality
- [`@robinpath/mailchimp`](../mailchimp) — Mailchimp module for complementary functionality
- [`@robinpath/sendgrid`](../sendgrid) — SendGrid module for complementary functionality
- [`@robinpath/lemlist`](../lemlist) — Lemlist module for complementary functionality

## License

MIT
