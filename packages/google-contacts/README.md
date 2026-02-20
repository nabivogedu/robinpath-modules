# @robinpath/google-contacts

> Google Contacts module for RobinPath.

![Category](https://img.shields.io/badge/category-Productivity-blue) ![Functions](https://img.shields.io/badge/functions-17-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `google-contacts` module lets you:

- listContacts
- getContact
- createContact
- updateContact
- deleteContact

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/google-contacts
```

## Quick Start

**1. Set up credentials**

```robinpath
google-contacts.setCredentials "your-credentials"
```

**2. listContacts**

```robinpath
google-contacts.listContacts
```

## Available Functions

| Function | Description |
|----------|-------------|
| `google-contacts.setCredentials` | Configure google-contacts credentials. |
| `google-contacts.listContacts` | listContacts |
| `google-contacts.getContact` | getContact |
| `google-contacts.createContact` | createContact |
| `google-contacts.updateContact` | updateContact |
| `google-contacts.deleteContact` | deleteContact |
| `google-contacts.searchContacts` | searchContacts |
| `google-contacts.listContactGroups` | listContactGroups |
| `google-contacts.getContactGroup` | getContactGroup |
| `google-contacts.createContactGroup` | createContactGroup |
| `google-contacts.updateContactGroup` | updateContactGroup |
| `google-contacts.deleteContactGroup` | deleteContactGroup |
| `google-contacts.batchGetContacts` | batchGetContacts |
| `google-contacts.getOtherContacts` | getOtherContacts |
| `google-contacts.getProfile` | getProfile |
| `google-contacts.listDirectoryPeople` | listDirectoryPeople |
| `google-contacts.updateContactPhoto` | updateContactPhoto |

## Examples

### listContacts

```robinpath
google-contacts.listContacts
```

### getContact

```robinpath
google-contacts.getContact
```

### createContact

```robinpath
google-contacts.createContact
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/google-contacts";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  google-contacts.setCredentials "your-credentials"
  google-contacts.listContacts
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/google-sheets`](../google-sheets) — Google Sheets module for complementary functionality
- [`@robinpath/google-calendar`](../google-calendar) — Google Calendar module for complementary functionality
- [`@robinpath/google-forms`](../google-forms) — Google Forms module for complementary functionality
- [`@robinpath/gmail`](../gmail) — Gmail module for complementary functionality
- [`@robinpath/outlook`](../outlook) — Outlook module for complementary functionality

## License

MIT
