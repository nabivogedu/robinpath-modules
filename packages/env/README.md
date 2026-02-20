# @robinpath/env

> Secure environment variable management with sensitive value redaction and protected system vars

![Category](https://img.shields.io/badge/category-Other-blue) ![Functions](https://img.shields.io/badge/functions-7-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `env` module lets you:

- Get the value of an environment variable
- Check if an environment variable exists
- Get all environment variables (sensitive values are redacted by default)
- Delete an environment variable (protected system vars cannot be deleted)
- Mark an environment variable as sensitive (will be redacted in env.all output)

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/env
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
env.set "API_URL" "https://api.example.com"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `env.get` | Get the value of an environment variable |
| `env.set` | Set an environment variable (protected system vars cannot be overwritten) |
| `env.has` | Check if an environment variable exists |
| `env.all` | Get all environment variables (sensitive values are redacted by default) |
| `env.delete` | Delete an environment variable (protected system vars cannot be deleted) |
| `env.secret` | Mark an environment variable as sensitive (will be redacted in env.all output) |
| `env.load` | Load environment variables from a .env file (won't override existing or protected vars) |

## Examples

### Set an environment variable (protected system vars cannot be overwritten)

```robinpath
env.set "API_URL" "https://api.example.com"
```

### Check if an environment variable exists

```robinpath
env.has "NODE_ENV"
```

### Get all environment variables (sensitive values are redacted by default)

```robinpath
env.all
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/env";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  env.set "API_URL" "https://api.example.com"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
