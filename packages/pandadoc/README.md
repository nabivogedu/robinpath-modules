# @robinpath/pandadoc

> PandaDoc module for RobinPath.

![Category](https://img.shields.io/badge/category-Documents-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `pandadoc` module lets you:

- listDocuments
- getDocument
- createDocument
- createDocumentFromTemplate
- sendDocument

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/pandadoc
```

## Quick Start

**1. Set up credentials**

```robinpath
pandadoc.setCredentials "your-credentials"
```

**2. listDocuments**

```robinpath
pandadoc.listDocuments
```

## Available Functions

| Function | Description |
|----------|-------------|
| `pandadoc.setCredentials` | Configure pandadoc credentials. |
| `pandadoc.listDocuments` | listDocuments |
| `pandadoc.getDocument` | getDocument |
| `pandadoc.createDocument` | createDocument |
| `pandadoc.createDocumentFromTemplate` | createDocumentFromTemplate |
| `pandadoc.sendDocument` | sendDocument |
| `pandadoc.getDocumentStatus` | getDocumentStatus |
| `pandadoc.downloadDocument` | downloadDocument |
| `pandadoc.deleteDocument` | deleteDocument |
| `pandadoc.listTemplates` | listTemplates |
| `pandadoc.getTemplate` | getTemplate |
| `pandadoc.listContacts` | listContacts |
| `pandadoc.createContact` | createContact |
| `pandadoc.getDocumentDetails` | getDocumentDetails |
| `pandadoc.listLinkedObjects` | listLinkedObjects |

## Examples

### listDocuments

```robinpath
pandadoc.listDocuments
```

### getDocument

```robinpath
pandadoc.getDocument
```

### createDocument

```robinpath
pandadoc.createDocument
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/pandadoc";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  pandadoc.setCredentials "your-credentials"
  pandadoc.listDocuments
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/pdf`](../pdf) — PDF module for complementary functionality
- [`@robinpath/excel`](../excel) — Excel module for complementary functionality
- [`@robinpath/office`](../office) — Office module for complementary functionality
- [`@robinpath/docusign`](../docusign) — DocuSign module for complementary functionality
- [`@robinpath/hellosign`](../hellosign) — HelloSign module for complementary functionality

## License

MIT
