# @robinpath/typeform

> Typeform module for RobinPath.

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `typeform` module lets you:

- listForms
- getForm
- createForm
- updateForm
- deleteForm

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/typeform
```

## Quick Start

**1. Set up credentials**

```robinpath
typeform.setCredentials "your-credentials"
```

**2. listForms**

```robinpath
typeform.listForms
```

## Available Functions

| Function | Description |
|----------|-------------|
| `typeform.setCredentials` | Configure typeform credentials. |
| `typeform.listForms` | listForms |
| `typeform.getForm` | getForm |
| `typeform.createForm` | createForm |
| `typeform.updateForm` | updateForm |
| `typeform.deleteForm` | deleteForm |
| `typeform.listResponses` | listResponses |
| `typeform.getResponse` | getResponse |
| `typeform.deleteResponse` | deleteResponse |
| `typeform.listWorkspaces` | listWorkspaces |
| `typeform.getWorkspace` | getWorkspace |
| `typeform.createWorkspace` | createWorkspace |
| `typeform.listThemes` | listThemes |
| `typeform.getInsights` | getInsights |
| `typeform.getFormAnalytics` | getFormAnalytics |

## Examples

### listForms

```robinpath
typeform.listForms
```

### getForm

```robinpath
typeform.getForm
```

### createForm

```robinpath
typeform.createForm
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/typeform";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  typeform.setCredentials "your-credentials"
  typeform.listForms
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
