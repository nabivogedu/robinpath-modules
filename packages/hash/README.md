# @robinpath/hash

> Cryptographic hashing utilities: MD5, SHA family, HMAC, CRC32, file hashing, UUID v5 generation, secure random bytes, and content fingerprinting

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-16-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `hash` module lets you:

- Compute MD5 hash of a string
- Compute SHA-1 hash of a string
- Compute SHA-256 hash of a string
- Compute SHA-512 hash of a string
- Compute SHA-3 hash of a string

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/hash
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
hash.sha1
```

## Available Functions

| Function | Description |
|----------|-------------|
| `hash.md5` | Compute MD5 hash of a string |
| `hash.sha1` | Compute SHA-1 hash of a string |
| `hash.sha256` | Compute SHA-256 hash of a string |
| `hash.sha512` | Compute SHA-512 hash of a string |
| `hash.sha3` | Compute SHA-3 hash of a string |
| `hash.hmac` | Compute HMAC of a string with a secret key |
| `hash.hashFile` | Compute the hash of a file's contents |
| `hash.hashStream` | Compute a hash from an array of data chunks (simulates stream hashing) |
| `hash.crc32` | Compute CRC32 checksum of a string |
| `hash.checksum` | Verify that a string matches an expected hash |
| `hash.compare` | Timing-safe comparison of two strings to prevent timing attacks |
| `hash.uuid5` | Generate a deterministic UUID v5 from a name and namespace |
| `hash.randomBytes` | Generate cryptographically secure random bytes |
| `hash.randomHex` | Generate a random hexadecimal string of specified length |
| `hash.randomBase64` | Generate a random Base64-encoded string |
| `hash.fingerprint` | Generate a content fingerprint combining MD5 and SHA-256 hashes |

## Examples

### Compute SHA-1 hash of a string

```robinpath
hash.sha1
```

### Compute SHA-256 hash of a string

```robinpath
hash.sha256
```

### Compute SHA-512 hash of a string

```robinpath
hash.sha512
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/hash";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  hash.sha1
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
