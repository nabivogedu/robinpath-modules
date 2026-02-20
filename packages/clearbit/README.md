# @robinpath/clearbit

> Clearbit module for RobinPath.

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `clearbit` module lets you:

- enrichPerson
- enrichCompany
- findPerson
- findCompany
- revealVisitor

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/clearbit
```

## Quick Start

**1. Set up credentials**

```robinpath
clearbit.setCredentials "your-credentials"
```

**2. enrichPerson**

```robinpath
clearbit.enrichPerson
```

## Available Functions

| Function | Description |
|----------|-------------|
| `clearbit.setCredentials` | Configure clearbit credentials. |
| `clearbit.enrichPerson` | enrichPerson |
| `clearbit.enrichCompany` | enrichCompany |
| `clearbit.findPerson` | findPerson |
| `clearbit.findCompany` | findCompany |
| `clearbit.revealVisitor` | revealVisitor |
| `clearbit.lookupEmail` | lookupEmail |
| `clearbit.lookupDomain` | lookupDomain |
| `clearbit.autocompleteCompany` | autocompleteCompany |
| `clearbit.getPersonFlag` | getPersonFlag |
| `clearbit.getCompanyFlag` | getCompanyFlag |
| `clearbit.prospectorSearch` | prospectorSearch |
| `clearbit.nameToEmail` | nameToEmail |
| `clearbit.listTags` | listTags |
| `clearbit.combined` | combined |

## Examples

### enrichPerson

```robinpath
clearbit.enrichPerson
```

### enrichCompany

```robinpath
clearbit.enrichCompany
```

### findPerson

```robinpath
clearbit.findPerson
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/clearbit";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  clearbit.setCredentials "your-credentials"
  clearbit.enrichPerson
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
