# @robinpath/dotenv

> Secure .env file management with key validation, path restrictions, and protected system variables

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `dotenv` module lets you:

- Parse a .env format string into an object
- Convert an object to .env format string
- Read a .env file and load values into process.env (won't override existing or protected vars by default)
- Read a .env file and return as object without modifying process.env
- Get a value from a .env file by key

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/dotenv
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
dotenv.stringify $vars
```

## Available Functions

| Function | Description |
|----------|-------------|
| `dotenv.parse` | Parse a .env format string into an object |
| `dotenv.stringify` | Convert an object to .env format string |
| `dotenv.load` | Read a .env file and load values into process.env (won't override existing or protected vars by default) |
| `dotenv.read` | Read a .env file and return as object without modifying process.env |
| `dotenv.get` | Get a value from a .env file by key |
| `dotenv.set` | Set a key=value in a .env file |
| `dotenv.remove` | Remove a key from a .env file |
| `dotenv.exists` | Check if a .env file exists |
| `dotenv.keys` | Return all keys from a .env file |
| `dotenv.expand` | Expand variable references like ${VAR} in values (process.env fallback disabled by default) |

## Examples

### Convert an object to .env format string

```robinpath
dotenv.stringify $vars
```

### Read a .env file and load values into process.env (won't override existing or protected vars by default)

```robinpath
dotenv.load ".env"
```

### Read a .env file and return as object without modifying process.env

```robinpath
dotenv.read ".env.local"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/dotenv";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  dotenv.stringify $vars
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
