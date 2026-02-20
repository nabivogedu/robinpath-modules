# @robinpath/config

> Multi-source configuration management with deep merge, dot-path access, env loading, and validation

![Category](https://img.shields.io/badge/category-Other-blue) ![Functions](https://img.shields.io/badge/functions-14-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `config` module lets you:

- Create config with defaults
- Load config from file (.json, .env)
- Load from environment variables
- Get config value by dot path
- Get entire config

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/config
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
config.load "./config.json"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `config.create` | Create config with defaults |
| `config.load` | Load config from file (.json, .env) |
| `config.loadEnv` | Load from environment variables |
| `config.get` | Get config value by dot path |
| `config.set` | Set config value by dot path |
| `config.getAll` | Get entire config |
| `config.merge` | Deep merge into config |
| `config.has` | Check if path exists |
| `config.remove` | Remove config key |
| `config.clear` | Clear entire config |
| `config.list` | List all config names |
| `config.validate` | Validate required keys exist |
| `config.freeze` | Freeze config (immutable) |
| `config.toEnv` | Convert config to env format |

## Examples

### Load config from file (.json, .env)

```robinpath
config.load "./config.json"
```

### Load from environment variables

```robinpath
config.loadEnv "APP_"
```

### Get config value by dot path

```robinpath
config.get "database.host" "localhost"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/config";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  config.load "./config.json"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
