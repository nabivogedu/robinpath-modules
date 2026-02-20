# @robinpath/twilio

> Twilio module for RobinPath.

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-19-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `twilio` module lets you:

- sendSms
- sendMms
- listMessages
- getMessage
- makeCall

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/twilio
```

## Quick Start

**1. Set up credentials**

```robinpath
twilio.setCredentials "your-credentials"
```

**2. sendSms**

```robinpath
twilio.sendSms
```

## Available Functions

| Function | Description |
|----------|-------------|
| `twilio.setCredentials` | Configure twilio credentials. |
| `twilio.sendSms` | sendSms |
| `twilio.sendMms` | sendMms |
| `twilio.listMessages` | listMessages |
| `twilio.getMessage` | getMessage |
| `twilio.makeCall` | makeCall |
| `twilio.listCalls` | listCalls |
| `twilio.getCall` | getCall |
| `twilio.listPhoneNumbers` | listPhoneNumbers |
| `twilio.lookupPhoneNumber` | lookupPhoneNumber |
| `twilio.createVerifyService` | createVerifyService |
| `twilio.sendVerification` | sendVerification |
| `twilio.checkVerification` | checkVerification |
| `twilio.listConversations` | listConversations |
| `twilio.createConversation` | createConversation |
| `twilio.addParticipant` | addParticipant |
| `twilio.sendConversationMessage` | sendConversationMessage |
| `twilio.getAccountInfo` | getAccountInfo |
| `twilio.deleteMessage` | deleteMessage |

## Examples

### sendSms

```robinpath
twilio.sendSms
```

### sendMms

```robinpath
twilio.sendMms
```

### listMessages

```robinpath
twilio.listMessages
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/twilio";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  twilio.setCredentials "your-credentials"
  twilio.sendSms
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
