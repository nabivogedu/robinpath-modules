# @robinpath/encrypt

> AES-256-GCM and RSA encryption/decryption with key generation, password-based key derivation, and hashing

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `encrypt` module lets you:

- Encrypt text with AES using a password (auto-generates salt/IV)
- Decrypt AES-encrypted data using a password
- Encrypt text with a raw hex key (for advanced use)
- Generate a cryptographically secure random key
- Generate an RSA key pair

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/encrypt
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
encrypt.aesDecrypt $encryptedData "my-password"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `encrypt.aesEncrypt` | Encrypt text with AES using a password (auto-generates salt/IV) |
| `encrypt.aesDecrypt` | Decrypt AES-encrypted data using a password |
| `encrypt.aesEncryptRaw` | Encrypt text with a raw hex key (for advanced use) |
| `encrypt.generateKey` | Generate a cryptographically secure random key |
| `encrypt.rsaGenerateKeys` | Generate an RSA key pair |
| `encrypt.rsaEncrypt` | Encrypt text with an RSA public key |
| `encrypt.rsaDecrypt` | Decrypt RSA-encrypted text with a private key |
| `encrypt.hash` | Hash a string (sha256, sha512, md5, etc.) |
| `encrypt.deriveKey` | Derive an encryption key from a password using scrypt |
| `encrypt.randomIv` | Generate a random initialization vector |

## Examples

### Decrypt AES-encrypted data using a password

```robinpath
encrypt.aesDecrypt $encryptedData "my-password"
```

### Encrypt text with a raw hex key (for advanced use)

```robinpath
encrypt.aesEncryptRaw "data" $hexKey
```

### Generate a cryptographically secure random key

```robinpath
encrypt.generateKey 256
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/encrypt";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  encrypt.aesDecrypt $encryptedData "my-password"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
