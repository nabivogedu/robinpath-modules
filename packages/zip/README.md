# @robinpath/zip

> Compression utilities: gzip, deflate, Brotli for strings and files

![Category](https://img.shields.io/badge/category-Other-blue) ![Functions](https://img.shields.io/badge/functions-9-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `zip` module lets you:

- Compress a string with gzip, return base64
- Decompress a gzip base64 string to text
- Compress a string with deflate, return base64
- Decompress deflate base64 data to text
- Compress a file with gzip

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/zip
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
zip.gunzip $compressed
```

## Available Functions

| Function | Description |
|----------|-------------|
| `zip.gzip` | Compress a string with gzip, return base64 |
| `zip.gunzip` | Decompress a gzip base64 string to text |
| `zip.deflate` | Compress a string with deflate, return base64 |
| `zip.inflate` | Decompress deflate base64 data to text |
| `zip.gzipFile` | Compress a file with gzip |
| `zip.gunzipFile` | Decompress a .gz file |
| `zip.brotliCompress` | Compress a string with Brotli, return base64 |
| `zip.brotliDecompress` | Decompress Brotli base64 data to text |
| `zip.isGzipped` | Check if a base64 string is gzip-compressed |

## Examples

### Decompress a gzip base64 string to text

```robinpath
zip.gunzip $compressed
```

### Compress a string with deflate, return base64

```robinpath
zip.deflate "hello"
```

### Decompress deflate base64 data to text

```robinpath
zip.inflate $compressed
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/zip";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  zip.gunzip $compressed
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
