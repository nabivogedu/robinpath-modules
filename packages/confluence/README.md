# @robinpath/confluence

> Confluence module for RobinPath.

![Category](https://img.shields.io/badge/category-Productivity-blue) ![Functions](https://img.shields.io/badge/functions-19-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `confluence` module lets you:

- listSpaces
- getSpace
- createSpace
- listPages
- getPage

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/confluence
```

## Quick Start

**1. Set up credentials**

```robinpath
confluence.setCredentials "your-credentials"
```

**2. listSpaces**

```robinpath
confluence.listSpaces
```

## Available Functions

| Function | Description |
|----------|-------------|
| `confluence.setCredentials` | Configure confluence credentials. |
| `confluence.listSpaces` | listSpaces |
| `confluence.getSpace` | getSpace |
| `confluence.createSpace` | createSpace |
| `confluence.listPages` | listPages |
| `confluence.getPage` | getPage |
| `confluence.createPage` | createPage |
| `confluence.updatePage` | updatePage |
| `confluence.deletePage` | deletePage |
| `confluence.listPageChildren` | listPageChildren |
| `confluence.getPageByTitle` | getPageByTitle |
| `confluence.searchContent` | searchContent |
| `confluence.listComments` | listComments |
| `confluence.addComment` | addComment |
| `confluence.listAttachments` | listAttachments |
| `confluence.getLabels` | getLabels |
| `confluence.addLabel` | addLabel |
| `confluence.removeLabel` | removeLabel |
| `confluence.getPageHistory` | getPageHistory |

## Examples

### listSpaces

```robinpath
confluence.listSpaces
```

### getSpace

```robinpath
confluence.getSpace
```

### createSpace

```robinpath
confluence.createSpace
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/confluence";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  confluence.setCredentials "your-credentials"
  confluence.listSpaces
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
