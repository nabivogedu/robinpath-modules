# @robinpath/toml

> Parse, stringify, and manipulate TOML configuration files

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-8-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `toml` module lets you:

- Parse a TOML string to object
- Convert object to TOML string
- Read and parse a TOML file
- Write object as TOML to file
- Get nested value by dot path from TOML string

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/toml
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
toml.stringify $config
```

## Available Functions

| Function | Description |
|----------|-------------|
| `toml.parse` | Parse a TOML string to object |
| `toml.stringify` | Convert object to TOML string |
| `toml.parseFile` | Read and parse a TOML file |
| `toml.writeFile` | Write object as TOML to file |
| `toml.get` | Get nested value by dot path from TOML string |
| `toml.isValid` | Check if string is valid TOML |
| `toml.toJSON` | Convert TOML string to JSON string |
| `toml.fromJSON` | Convert JSON string to TOML string |

## Examples

### Convert object to TOML string

```robinpath
toml.stringify $config
```

### Read and parse a TOML file

```robinpath
toml.parseFile "config.toml"
```

### Write object as TOML to file

```robinpath
toml.writeFile "config.toml" $obj
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/toml";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  toml.stringify $config
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
