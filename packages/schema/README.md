# @robinpath/schema

> Lightweight schema validation: validate data against type schemas with constraints

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `schema` module lets you:

- Validate data against a schema
- Check if data matches schema (boolean)
- Create a string schema
- Create a number schema
- Create a boolean schema

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/schema
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
schema.isValid $data $schema
```

## Available Functions

| Function | Description |
|----------|-------------|
| `schema.validate` | Validate data against a schema |
| `schema.isValid` | Check if data matches schema (boolean) |
| `schema.string` | Create a string schema |
| `schema.number` | Create a number schema |
| `schema.boolean` | Create a boolean schema |
| `schema.array` | Create an array schema |
| `schema.object` | Create an object schema |
| `schema.nullable` | Make a schema also accept null |
| `schema.oneOf` | Create a schema matching one of several schemas |
| `schema.getErrors` | Validate and return only the errors array |

## Examples

### Check if data matches schema (boolean)

```robinpath
schema.isValid $data $schema
```

### Create a string schema

```robinpath
schema.string {"minLength": 1}
```

### Create a number schema

```robinpath
schema.number {"min": 0, "max": 100}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/schema";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  schema.isValid $data $schema
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
