# @robinpath/hellosign

> HelloSign module for RobinPath.

![Category](https://img.shields.io/badge/category-Documents-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `hellosign` module lets you:

- getSignatureRequest
- listSignatureRequests
- sendSignatureRequest
- sendWithTemplate
- cancelSignatureRequest

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/hellosign
```

## Quick Start

**1. Set up credentials**

```robinpath
hellosign.setCredentials "your-credentials"
```

**2. getSignatureRequest**

```robinpath
hellosign.getSignatureRequest
```

## Available Functions

| Function | Description |
|----------|-------------|
| `hellosign.setCredentials` | Configure hellosign credentials. |
| `hellosign.getSignatureRequest` | getSignatureRequest |
| `hellosign.listSignatureRequests` | listSignatureRequests |
| `hellosign.sendSignatureRequest` | sendSignatureRequest |
| `hellosign.sendWithTemplate` | sendWithTemplate |
| `hellosign.cancelSignatureRequest` | cancelSignatureRequest |
| `hellosign.downloadSignatureRequest` | downloadSignatureRequest |
| `hellosign.remindSignatureRequest` | remindSignatureRequest |
| `hellosign.listTemplates` | listTemplates |
| `hellosign.getTemplate` | getTemplate |
| `hellosign.deleteTemplate` | deleteTemplate |
| `hellosign.createEmbeddedSignatureRequest` | createEmbeddedSignatureRequest |
| `hellosign.getAccount` | getAccount |
| `hellosign.updateAccount` | updateAccount |
| `hellosign.listTeamMembers` | listTeamMembers |

## Examples

### getSignatureRequest

```robinpath
hellosign.getSignatureRequest
```

### listSignatureRequests

```robinpath
hellosign.listSignatureRequests
```

### sendSignatureRequest

```robinpath
hellosign.sendSignatureRequest
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/hellosign";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  hellosign.setCredentials "your-credentials"
  hellosign.getSignatureRequest
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/pdf`](../pdf) — PDF module for complementary functionality
- [`@robinpath/excel`](../excel) — Excel module for complementary functionality
- [`@robinpath/office`](../office) — Office module for complementary functionality
- [`@robinpath/docusign`](../docusign) — DocuSign module for complementary functionality
- [`@robinpath/pandadoc`](../pandadoc) — PandaDoc module for complementary functionality

## License

MIT
