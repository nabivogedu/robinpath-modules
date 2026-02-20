# @robinpath/webhook

> Send webhooks with HMAC signatures, verify incoming webhook payloads, and prevent replay attacks

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-8-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `webhook` module lets you:

- Send a webhook POST request with optional HMAC signature
- Create an HMAC signature for a webhook payload
- Verify a webhook HMAC signature using timing-safe comparison
- Verify a webhook timestamp is within acceptable tolerance to prevent replay attacks
- Parse a raw webhook body based on content type

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/webhook
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
webhook.sign $payload "whsec_abc"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `webhook.send` | Send a webhook POST request with optional HMAC signature |
| `webhook.sign` | Create an HMAC signature for a webhook payload |
| `webhook.verify` | Verify a webhook HMAC signature using timing-safe comparison |
| `webhook.verifyTimestamp` | Verify a webhook timestamp is within acceptable tolerance to prevent replay attacks |
| `webhook.parsePayload` | Parse a raw webhook body based on content type |
| `webhook.buildPayload` | Build a standardized webhook payload with event name, data, timestamp, and ID |
| `webhook.headers` | Build webhook headers including signature and timestamp |
| `webhook.isValidUrl` | Check if a string is a valid HTTP/HTTPS webhook URL |

## Examples

### Create an HMAC signature for a webhook payload

```robinpath
webhook.sign $payload "whsec_abc"
```

### Verify a webhook HMAC signature using timing-safe comparison

```robinpath
webhook.verify $body "whsec_abc" $signatureHeader
```

### Verify a webhook timestamp is within acceptable tolerance to prevent replay attacks

```robinpath
webhook.verifyTimestamp $timestamp 60000
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/webhook";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  webhook.sign $payload "whsec_abc"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
