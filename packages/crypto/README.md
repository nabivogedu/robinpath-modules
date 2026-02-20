# @robinpath/crypto

> Hashing, HMAC, and encoding/decoding utilities (MD5, SHA, Base64, Hex, URL)

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-11-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `crypto` module lets you:

- Compute the MD5 hash of a string
- Compute the SHA-1 hash of a string
- Compute the SHA-256 hash of a string
- Compute the SHA-512 hash of a string
- Compute an HMAC digest using the specified algorithm and secret key

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/crypto
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
crypto.sha1 "hello"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `crypto.md5` | Compute the MD5 hash of a string |
| `crypto.sha1` | Compute the SHA-1 hash of a string |
| `crypto.sha256` | Compute the SHA-256 hash of a string |
| `crypto.sha512` | Compute the SHA-512 hash of a string |
| `crypto.hmac` | Compute an HMAC digest using the specified algorithm and secret key |
| `crypto.base64Encode` | Encode a string to Base64 |
| `crypto.base64Decode` | Decode a Base64 string back to plain text |
| `crypto.hexEncode` | Encode a string to its hexadecimal representation |
| `crypto.hexDecode` | Decode a hexadecimal string back to plain text |
| `crypto.urlEncode` | Percent-encode a string for use in a URL |
| `crypto.urlDecode` | Decode a percent-encoded URL string back to plain text |

## Examples

### Compute the SHA-1 hash of a string

```robinpath
crypto.sha1 "hello"
```

### Compute the SHA-256 hash of a string

```robinpath
crypto.sha256 "hello"
```

### Compute the SHA-512 hash of a string

```robinpath
crypto.sha512 "hello"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/crypto";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  crypto.sha1 "hello"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
