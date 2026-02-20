# @robinpath/email

> SMTP email sending with transports, attachments, address parsing, and Ethereal test accounts

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `email` module lets you:

- Create a named SMTP transport for sending emails
- Send an email with full options (to, subject, body, attachments, etc.)
- Send a simple email with just to, subject, and body
- Verify SMTP connection to the mail server
- Validate an email address format

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/email
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
email.send "gmail" {"to": "bob@example.com", "subject": "Hello", "text": "Hi there"}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `email.createTransport` | Create a named SMTP transport for sending emails |
| `email.send` | Send an email with full options (to, subject, body, attachments, etc.) |
| `email.sendQuick` | Send a simple email with just to, subject, and body |
| `email.verify` | Verify SMTP connection to the mail server |
| `email.isValid` | Validate an email address format |
| `email.parseAddress` | Parse an email address string into name and address parts |
| `email.parseAddressList` | Parse a comma-separated list of email addresses |
| `email.extractDomain` | Extract the domain part from an email address |
| `email.buildAddress` | Build a formatted email address from name and email |
| `email.close` | Close a transport connection |
| `email.createTestAccount` | Create an Ethereal test account for development (no real emails sent) |
| `email.getTestUrl` | Get the Ethereal preview URL for a test email |

## Examples

### Send an email with full options (to, subject, body, attachments, etc.)

```robinpath
email.send "gmail" {"to": "bob@example.com", "subject": "Hello", "text": "Hi there"}
```

### Send a simple email with just to, subject, and body

```robinpath
email.sendQuick "gmail" "bob@example.com" "Hello" "Hi Bob!"
```

### Verify SMTP connection to the mail server

```robinpath
email.verify "gmail"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/email";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  email.send "gmail" {"to": "bob@example.com", "subject": "Hello", "text": "Hi there"}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
