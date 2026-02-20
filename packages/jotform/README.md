# @robinpath/jotform

> JotForm module for RobinPath.

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `jotform` module lets you:

- listForms
- getForm
- getFormQuestions
- listSubmissions
- getSubmission

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/jotform
```

## Quick Start

**1. Set up credentials**

```robinpath
jotform.setCredentials "your-credentials"
```

**2. listForms**

```robinpath
jotform.listForms
```

## Available Functions

| Function | Description |
|----------|-------------|
| `jotform.setCredentials` | Configure jotform credentials. |
| `jotform.listForms` | listForms |
| `jotform.getForm` | getForm |
| `jotform.getFormQuestions` | getFormQuestions |
| `jotform.listSubmissions` | listSubmissions |
| `jotform.getSubmission` | getSubmission |
| `jotform.createSubmission` | createSubmission |
| `jotform.deleteSubmission` | deleteSubmission |
| `jotform.getFormReports` | getFormReports |
| `jotform.getFormFiles` | getFormFiles |
| `jotform.listFolders` | listFolders |
| `jotform.getUser` | getUser |
| `jotform.getUsage` | getUsage |
| `jotform.getFormWebhooks` | getFormWebhooks |
| `jotform.createFormWebhook` | createFormWebhook |

## Examples

### listForms

```robinpath
jotform.listForms
```

### getForm

```robinpath
jotform.getForm
```

### getFormQuestions

```robinpath
jotform.getFormQuestions
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/jotform";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  jotform.setCredentials "your-credentials"
  jotform.listForms
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
