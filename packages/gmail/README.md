# @robinpath/gmail

> Gmail module for RobinPath.

![Category](https://img.shields.io/badge/category-Productivity-blue) ![Functions](https://img.shields.io/badge/functions-17-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `gmail` module lets you:

- List/search messages
- Get message details
- Send a plain text email
- Move message to trash
- Remove from trash

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/gmail
```

## Quick Start

**1. Set up credentials**

```robinpath
gmail.setCredentials "your-credentials"
```

**2. List/search messages**

```robinpath
gmail.listMessages
```

## Available Functions

| Function | Description |
|----------|-------------|
| `gmail.setCredentials` | Configure Gmail OAuth2 credentials. |
| `gmail.listMessages` | List/search messages |
| `gmail.getMessage` | Get message details |
| `gmail.sendEmail` | Send a plain text email |
| `gmail.trashMessage` | Move message to trash |
| `gmail.untrashMessage` | Remove from trash |
| `gmail.deleteMessage` | Permanently delete message |
| `gmail.modifyLabels` | Add/remove labels |
| `gmail.markAsRead` | Mark as read |
| `gmail.markAsUnread` | Mark as unread |
| `gmail.listLabels` | List all labels |
| `gmail.createLabel` | Create a label |
| `gmail.createDraft` | Create a draft |
| `gmail.listDrafts` | List drafts |
| `gmail.sendDraft` | Send a draft |
| `gmail.deleteDraft` | Delete a draft |
| `gmail.getProfile` | Get user profile |

## Examples

### List/search messages

```robinpath
gmail.listMessages
```

### Get message details

```robinpath
gmail.getMessage
```

### Send a plain text email

```robinpath
gmail.sendEmail
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/gmail";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  gmail.setCredentials "your-credentials"
  gmail.listMessages
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/google-sheets`](../google-sheets) — Google Sheets module for complementary functionality
- [`@robinpath/google-calendar`](../google-calendar) — Google Calendar module for complementary functionality
- [`@robinpath/google-contacts`](../google-contacts) — Google Contacts module for complementary functionality
- [`@robinpath/google-forms`](../google-forms) — Google Forms module for complementary functionality
- [`@robinpath/outlook`](../outlook) — Outlook module for complementary functionality

## License

MIT
