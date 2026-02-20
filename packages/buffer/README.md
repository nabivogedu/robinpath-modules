# @robinpath/buffer

> Buffer and encoding utilities: base64, base64url, hex, byte operations

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `buffer` module lets you:

- Create a base64 buffer from a string
- Convert a base64 buffer to string
- Create base64 from hex string
- Convert base64 to hex string
- Encode string to base64

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/buffer
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
buffer.toString "aGVsbG8="
```

## Available Functions

| Function | Description |
|----------|-------------|
| `buffer.fromString` | Create a base64 buffer from a string |
| `buffer.toString` | Convert a base64 buffer to string |
| `buffer.fromHex` | Create base64 from hex string |
| `buffer.toHex` | Convert base64 to hex string |
| `buffer.toBase64` | Encode string to base64 |
| `buffer.fromBase64` | Decode base64 to string |
| `buffer.toBase64Url` | Encode string to URL-safe base64 |
| `buffer.fromBase64Url` | Decode URL-safe base64 to string |
| `buffer.byteLength` | Get the byte length of a string |
| `buffer.concat` | Concatenate multiple base64 buffers |
| `buffer.compare` | Compare two base64 buffers |
| `buffer.isBase64` | Check if a string is valid base64 |

## Examples

### Convert a base64 buffer to string

```robinpath
buffer.toString "aGVsbG8="
```

### Create base64 from hex string

```robinpath
buffer.fromHex "48656c6c6f"
```

### Convert base64 to hex string

```robinpath
buffer.toHex "aGVsbG8="
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/buffer";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  buffer.toString "aGVsbG8="
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
