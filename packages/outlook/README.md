# @robinpath/outlook

> Outlook module for RobinPath.

![Category](https://img.shields.io/badge/category-Productivity-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `outlook` module lets you:

- listMessages
- getMessage
- sendEmail
- replyToEmail
- forwardEmail

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/outlook
```

## Quick Start

**1. Set up credentials**

```robinpath
outlook.setCredentials "your-credentials"
```

**2. listMessages**

```robinpath
outlook.listMessages
```

## Available Functions

| Function | Description |
|----------|-------------|
| `outlook.setCredentials` | Configure outlook credentials. |
| `outlook.listMessages` | listMessages |
| `outlook.getMessage` | getMessage |
| `outlook.sendEmail` | sendEmail |
| `outlook.replyToEmail` | replyToEmail |
| `outlook.forwardEmail` | forwardEmail |
| `outlook.createDraft` | createDraft |
| `outlook.sendDraft` | sendDraft |
| `outlook.listDrafts` | listDrafts |
| `outlook.deleteMessage` | deleteMessage |
| `outlook.moveMessage` | moveMessage |
| `outlook.copyMessage` | copyMessage |
| `outlook.listFolders` | listFolders |
| `outlook.createFolder` | createFolder |
| `outlook.listAttachments` | listAttachments |
| `outlook.getAttachment` | getAttachment |
| `outlook.createRule` | createRule |
| `outlook.getProfile` | getProfile |
| `outlook.searchMessages` | searchMessages |
| `outlook.flagMessage` | flagMessage |
| `outlook.listCategories` | listCategories |

## Examples

### listMessages

```robinpath
outlook.listMessages
```

### getMessage

```robinpath
outlook.getMessage
```

### sendEmail

```robinpath
outlook.sendEmail
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/outlook";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  outlook.setCredentials "your-credentials"
  outlook.listMessages
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/google-sheets`](../google-sheets) — Google Sheets module for complementary functionality
- [`@robinpath/google-calendar`](../google-calendar) — Google Calendar module for complementary functionality
- [`@robinpath/google-contacts`](../google-contacts) — Google Contacts module for complementary functionality
- [`@robinpath/google-forms`](../google-forms) — Google Forms module for complementary functionality
- [`@robinpath/gmail`](../gmail) — Gmail module for complementary functionality

## License

MIT
