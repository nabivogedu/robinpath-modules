# @robinpath/uuid

> UUID generation, parsing, and validation utilities (v4, v5, nil)

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-7-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `uuid` module lets you:

- Generate a random UUID v4
- Generate a deterministic UUID v5 from a name and namespace UUID using SHA-1
- Check whether a string is a valid UUID format
- Extract the version number from a UUID string
- Parse a UUID into its component parts (version, variant, time, bytes)

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/uuid
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
uuid.v5 "hello" "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `uuid.v4` | Generate a random UUID v4 |
| `uuid.v5` | Generate a deterministic UUID v5 from a name and namespace UUID using SHA-1 |
| `uuid.isValid` | Check whether a string is a valid UUID format |
| `uuid.version` | Extract the version number from a UUID string |
| `uuid.parse` | Parse a UUID into its component parts (version, variant, time, bytes) |
| `uuid.generate` | Generate one or more random UUID v4 strings |
| `uuid.nil` | Return the nil UUID (all zeros) |

## Examples

### Generate a deterministic UUID v5 from a name and namespace UUID using SHA-1

```robinpath
uuid.v5 "hello" "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
```

### Check whether a string is a valid UUID format

```robinpath
uuid.isValid "550e8400-e29b-41d4-a716-446655440000"
```

### Extract the version number from a UUID string

```robinpath
uuid.version "550e8400-e29b-41d4-a716-446655440000"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/uuid";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  uuid.v5 "hello" "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
