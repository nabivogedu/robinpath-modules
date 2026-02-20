# @robinpath/encode

> Encoding and decoding conversions: Base64, Base32, hex, URL encoding, HTML entities, binary, ROT13, percent-encoding, and more

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `encode` module lets you:

- Encode a string or buffer to Base64
- Decode a Base64-encoded string
- Encode a string to URL-safe Base64 (no padding, +/ replaced with -_)
- Decode a URL-safe Base64 string
- Encode a string to hexadecimal representation

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/encode
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
encode.base64Decode
```

## Available Functions

| Function | Description |
|----------|-------------|
| `encode.base64Encode` | Encode a string or buffer to Base64 |
| `encode.base64Decode` | Decode a Base64-encoded string |
| `encode.base64UrlEncode` | Encode a string to URL-safe Base64 (no padding, +/ replaced with -_) |
| `encode.base64UrlDecode` | Decode a URL-safe Base64 string |
| `encode.hexEncode` | Encode a string to hexadecimal representation |
| `encode.hexDecode` | Decode a hexadecimal string back to UTF-8 |
| `encode.base32Encode` | Encode a string to Base32 (RFC 4648) |
| `encode.base32Decode` | Decode a Base32-encoded string |
| `encode.urlEncode` | Encode a string using encodeURIComponent |
| `encode.urlDecode` | Decode a URL-encoded string using decodeURIComponent |
| `encode.htmlEncode` | Encode HTML special characters into entities |
| `encode.htmlDecode` | Decode HTML entities back to characters |
| `encode.utf8Encode` | Encode a string to an array of UTF-8 byte values |
| `encode.utf8Decode` | Decode an array of UTF-8 byte values back to a string |
| `encode.binaryEncode` | Encode a string to its binary (0s and 1s) representation |
| `encode.binaryDecode` | Decode a binary (0s and 1s) string back to text |
| `encode.asciiToChar` | Convert an ASCII code to its character |
| `encode.charToAscii` | Convert a character to its ASCII code |
| `encode.rot13` | Apply ROT13 substitution cipher to a string |
| `encode.percentEncode` | Percent-encode every byte of a string (e.g. 'A' becomes '%41') |
| `encode.percentDecode` | Decode a percent-encoded string |

## Examples

### Decode a Base64-encoded string

```robinpath
encode.base64Decode
```

### Encode a string to URL-safe Base64 (no padding, +/ replaced with -_)

```robinpath
encode.base64UrlEncode
```

### Decode a URL-safe Base64 string

```robinpath
encode.base64UrlDecode
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/encode";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  encode.base64Decode
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
