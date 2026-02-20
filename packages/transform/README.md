# @robinpath/transform

> Data transformation and mapping utilities: pick, omit, rename, coerce, flatten, merge, pipeline, and more

![Category](https://img.shields.io/badge/category-Other-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `transform` module lets you:

- Pick specific keys from an object (supports nested paths with dot notation)
- Create a copy of an object with specific keys removed
- Rename keys in an object
- Apply transformations to specific values in an object
- Coerce a value to a target type

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/transform
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
transform.omit $data ["password", "secret"]
```

## Available Functions

| Function | Description |
|----------|-------------|
| `transform.pick` | Pick specific keys from an object (supports nested paths with dot notation) |
| `transform.omit` | Create a copy of an object with specific keys removed |
| `transform.rename` | Rename keys in an object |
| `transform.mapValues` | Apply transformations to specific values in an object |
| `transform.coerce` | Coerce a value to a target type |
| `transform.flatten` | Flatten a nested object into a single level with dot-notation keys |
| `transform.unflatten` | Unflatten a dot-notation object back into a nested structure |
| `transform.merge` | Deep merge multiple objects (later objects override earlier ones) |
| `transform.defaults` | Fill in missing/null/undefined keys from default values |
| `transform.template` | Render a template string with {{key}} placeholders replaced by data values |
| `transform.group` | Group an array of objects by a key value |
| `transform.pipeline` | Apply a series of transformation steps to data |
| `transform.mapArray` | Map an array of objects to a new shape by specifying target-to-source key mapping |
| `transform.filter` | Filter an array of objects by matching key-value conditions |
| `transform.sort` | Sort an array of objects by a key |

## Examples

### Create a copy of an object with specific keys removed

```robinpath
transform.omit $data ["password", "secret"]
```

### Rename keys in an object

```robinpath
transform.rename $data {"firstName": "first_name", "lastName": "last_name"}
```

### Apply transformations to specific values in an object

```robinpath
transform.mapValues $data {"age": "toNumber", "name": "trim"}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/transform";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  transform.omit $data ["password", "secret"]
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
