# @robinpath/apollo

> Apollo module for RobinPath.

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-19-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `apollo` module lets you:

- searchPeople
- getPerson
- enrichPerson
- searchOrganizations
- getOrganization

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/apollo
```

## Quick Start

**1. Set up credentials**

```robinpath
apollo.setCredentials "your-credentials"
```

**2. searchPeople**

```robinpath
apollo.searchPeople
```

## Available Functions

| Function | Description |
|----------|-------------|
| `apollo.setCredentials` | Configure apollo credentials. |
| `apollo.searchPeople` | searchPeople |
| `apollo.getPerson` | getPerson |
| `apollo.enrichPerson` | enrichPerson |
| `apollo.searchOrganizations` | searchOrganizations |
| `apollo.getOrganization` | getOrganization |
| `apollo.enrichOrganization` | enrichOrganization |
| `apollo.listSequences` | listSequences |
| `apollo.getSequence` | getSequence |
| `apollo.addToSequence` | addToSequence |
| `apollo.listEmailAccounts` | listEmailAccounts |
| `apollo.searchContacts` | searchContacts |
| `apollo.createContact` | createContact |
| `apollo.updateContact` | updateContact |
| `apollo.listLists` | listLists |
| `apollo.addToList` | addToList |
| `apollo.listTasks` | listTasks |
| `apollo.createTask` | createTask |
| `apollo.getAccount` | getAccount |

## Examples

### searchPeople

```robinpath
apollo.searchPeople
```

### getPerson

```robinpath
apollo.getPerson
```

### enrichPerson

```robinpath
apollo.enrichPerson
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/apollo";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  apollo.setCredentials "your-credentials"
  apollo.searchPeople
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
