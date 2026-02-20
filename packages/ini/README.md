# @robinpath/ini

> Parse, stringify, read, and write INI configuration files

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `ini` module lets you:

- Parse an INI string to object
- Convert object to INI string
- Read and parse an INI file
- Write object as INI to file
- Get value by section and key from INI string

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/ini
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
ini.stringify $config
```

## Available Functions

| Function | Description |
|----------|-------------|
| `ini.parse` | Parse an INI string to object |
| `ini.stringify` | Convert object to INI string |
| `ini.parseFile` | Read and parse an INI file |
| `ini.writeFile` | Write object as INI to file |
| `ini.get` | Get value by section and key from INI string |
| `ini.set` | Set value by section and key, return updated INI |
| `ini.getSections` | Get all section names |
| `ini.getKeys` | Get all keys in a section |
| `ini.removeSection` | Remove a section from INI string |
| `ini.removeKey` | Remove a key from a section |

## Examples

### Convert object to INI string

```robinpath
ini.stringify $config
```

### Read and parse an INI file

```robinpath
ini.parseFile "config.ini"
```

### Write object as INI to file

```robinpath
ini.writeFile "config.ini" $obj
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/ini";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  ini.stringify $config
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
