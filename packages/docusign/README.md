# @robinpath/docusign

> DocuSign module for RobinPath.

![Category](https://img.shields.io/badge/category-Documents-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `docusign` module lets you:

- listEnvelopes
- getEnvelope
- createEnvelope
- sendEnvelope
- voidEnvelope

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/docusign
```

## Quick Start

**1. Set up credentials**

```robinpath
docusign.setCredentials "your-credentials"
```

**2. listEnvelopes**

```robinpath
docusign.listEnvelopes
```

## Available Functions

| Function | Description |
|----------|-------------|
| `docusign.setCredentials` | Configure docusign credentials. |
| `docusign.listEnvelopes` | listEnvelopes |
| `docusign.getEnvelope` | getEnvelope |
| `docusign.createEnvelope` | createEnvelope |
| `docusign.sendEnvelope` | sendEnvelope |
| `docusign.voidEnvelope` | voidEnvelope |
| `docusign.getEnvelopeDocuments` | getEnvelopeDocuments |
| `docusign.downloadDocument` | downloadDocument |
| `docusign.listRecipients` | listRecipients |
| `docusign.getRecipientStatus` | getRecipientStatus |
| `docusign.listTemplates` | listTemplates |
| `docusign.getTemplate` | getTemplate |
| `docusign.createEnvelopeFromTemplate` | createEnvelopeFromTemplate |
| `docusign.getUserInfo` | getUserInfo |
| `docusign.getAccount` | getAccount |

## Examples

### listEnvelopes

```robinpath
docusign.listEnvelopes
```

### getEnvelope

```robinpath
docusign.getEnvelope
```

### createEnvelope

```robinpath
docusign.createEnvelope
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/docusign";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  docusign.setCredentials "your-credentials"
  docusign.listEnvelopes
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/pdf`](../pdf) — PDF module for complementary functionality
- [`@robinpath/excel`](../excel) — Excel module for complementary functionality
- [`@robinpath/office`](../office) — Office module for complementary functionality
- [`@robinpath/pandadoc`](../pandadoc) — PandaDoc module for complementary functionality
- [`@robinpath/hellosign`](../hellosign) — HelloSign module for complementary functionality

## License

MIT
