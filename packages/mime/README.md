# @robinpath/mime

> MIME type detection from extensions and file content, type classification, Content-Type building

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `mime` module lets you:

- Get MIME type from file extension
- Get extension from MIME type
- Detect MIME type from file content (magic bytes)
- Get charset for MIME type
- Check if MIME type is text-based

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/mime
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
mime.extension "image/png"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `mime.lookup` | Get MIME type from file extension |
| `mime.extension` | Get extension from MIME type |
| `mime.detect` | Detect MIME type from file content (magic bytes) |
| `mime.charset` | Get charset for MIME type |
| `mime.isText` | Check if MIME type is text-based |
| `mime.isImage` | Check if MIME type is image |
| `mime.isAudio` | Check if MIME type is audio |
| `mime.isVideo` | Check if MIME type is video |
| `mime.isFont` | Check if MIME type is font |
| `mime.isArchive` | Check if MIME type is archive |
| `mime.contentType` | Build Content-Type header with charset |
| `mime.allTypes` | Get all known MIME type mappings |

## Examples

### Get extension from MIME type

```robinpath
mime.extension "image/png"
```

### Detect MIME type from file content (magic bytes)

```robinpath
mime.detect "./unknown_file"
```

### Get charset for MIME type

```robinpath
mime.charset "text/html"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/mime";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  mime.extension "image/png"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
