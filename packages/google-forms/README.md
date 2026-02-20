# @robinpath/google-forms

> Google Forms module for RobinPath.

![Category](https://img.shields.io/badge/category-Productivity-blue) ![Functions](https://img.shields.io/badge/functions-13-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `google-forms` module lets you:

- getForm
- createForm
- updateForm
- listResponses
- getResponse

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/google-forms
```

## Quick Start

**1. Set up credentials**

```robinpath
google-forms.setCredentials "your-credentials"
```

**2. getForm**

```robinpath
google-forms.getForm
```

## Available Functions

| Function | Description |
|----------|-------------|
| `google-forms.setCredentials` | Configure google-forms credentials. |
| `google-forms.getForm` | getForm |
| `google-forms.createForm` | createForm |
| `google-forms.updateForm` | updateForm |
| `google-forms.listResponses` | listResponses |
| `google-forms.getResponse` | getResponse |
| `google-forms.addQuestion` | addQuestion |
| `google-forms.updateQuestion` | updateQuestion |
| `google-forms.deleteQuestion` | deleteQuestion |
| `google-forms.addSection` | addSection |
| `google-forms.getFormInfo` | getFormInfo |
| `google-forms.batchUpdate` | batchUpdate |
| `google-forms.convertToQuiz` | convertToQuiz |

## Examples

### getForm

```robinpath
google-forms.getForm
```

### createForm

```robinpath
google-forms.createForm
```

### updateForm

```robinpath
google-forms.updateForm
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/google-forms";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  google-forms.setCredentials "your-credentials"
  google-forms.getForm
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/google-sheets`](../google-sheets) — Google Sheets module for complementary functionality
- [`@robinpath/google-calendar`](../google-calendar) — Google Calendar module for complementary functionality
- [`@robinpath/google-contacts`](../google-contacts) — Google Contacts module for complementary functionality
- [`@robinpath/gmail`](../gmail) — Gmail module for complementary functionality
- [`@robinpath/outlook`](../outlook) — Outlook module for complementary functionality

## License

MIT
