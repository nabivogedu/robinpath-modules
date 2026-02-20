# @robinpath/sms

> SMS sending via Twilio and Vonage with validation, formatting, lookup, and cost estimation

![Category](https://img.shields.io/badge/category-Messaging-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `sms` module lets you:

- Send an SMS message
- Send SMS to multiple recipients
- Validate E.164 phone format
- Format phone to E.164
- Lookup phone info via Twilio

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/sms
```

## Quick Start

**1. Set up credentials**

```robinpath
sms.configure "main" {"provider": "twilio", "accountSid": "AC...", "authToken": "..."}
```

**2. Send an SMS message**

```robinpath
sms.send "main" "+15559876543" "Your code is 1234"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `sms.configure` | Configure SMS provider (Twilio or Vonage) |
| `sms.send` | Send an SMS message |
| `sms.sendBulk` | Send SMS to multiple recipients |
| `sms.validate` | Validate E.164 phone format |
| `sms.format` | Format phone to E.164 |
| `sms.lookup` | Lookup phone info via Twilio |
| `sms.status` | Check message delivery status |
| `sms.estimateCost` | Estimate SMS cost |
| `sms.isGsm` | Check if message uses GSM-7 encoding |
| `sms.segmentCount` | Count SMS segments |

## Examples

### Send an SMS message

```robinpath
sms.send "main" "+15559876543" "Your code is 1234"
```

### Send SMS to multiple recipients

```robinpath
sms.sendBulk "main" ["+155511111", "+155522222"] "Hello!"
```

### Validate E.164 phone format

```robinpath
sms.validate "+15551234567"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/sms";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  sms.configure "main" {"provider": "twilio", "accountSid": "AC...", "authToken": "..."}
  sms.send "main" "+15559876543" "Your code is 1234"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/slack`](../slack) — Slack module for complementary functionality
- [`@robinpath/discord`](../discord) — Discord module for complementary functionality
- [`@robinpath/teams`](../teams) — Teams module for complementary functionality
- [`@robinpath/telegram`](../telegram) — Telegram module for complementary functionality
- [`@robinpath/whatsapp`](../whatsapp) — WhatsApp module for complementary functionality

## License

MIT
