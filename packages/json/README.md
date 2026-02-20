# @robinpath/json

> JSON manipulation: parse, stringify, deep merge, flatten, unflatten, diff, query by path, pick, and omit

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-13-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `json` module lets you:

- Parse a JSON string into an object
- Convert a value to a JSON string
- Get a nested value by dot-separated path
- Deep merge two or more objects
- Flatten a nested object to dot-notation keys

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/json
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
json.stringify $obj
```

## Available Functions

| Function | Description |
|----------|-------------|
| `json.parse` | Parse a JSON string into an object |
| `json.stringify` | Convert a value to a JSON string |
| `json.get` | Get a nested value by dot-separated path |
| `json.set` | Set a nested value by dot-separated path, returning a new object |
| `json.merge` | Deep merge two or more objects |
| `json.flatten` | Flatten a nested object to dot-notation keys |
| `json.unflatten` | Unflatten dot-notation keys back to a nested object |
| `json.diff` | Compare two objects and return differences |
| `json.clone` | Deep clone an object |
| `json.isValid` | Check if a string is valid JSON |
| `json.keys` | Get all keys including nested paths with dot notation |
| `json.pick` | Pick specific keys from an object |
| `json.omit` | Omit specific keys from an object |

## Examples

### Convert a value to a JSON string

```robinpath
json.stringify $obj
```

### Get a nested value by dot-separated path

```robinpath
json.get $obj "user.name"
```

### Set a nested value by dot-separated path, returning a new object

```robinpath
json.set $obj "user.name" "Bob"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/json";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  json.stringify $obj
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## License

MIT
