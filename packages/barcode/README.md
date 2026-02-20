# @robinpath/barcode

> QR code generation, EAN/UPC barcode validation, ISBN conversion, and Luhn checksum

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-14-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `barcode` module lets you:

- Generate QR code as data URL
- Generate QR code to file
- Generate QR code as SVG
- Generate QR for terminal
- Validate EAN-13 barcode

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/barcode
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
barcode.qrToFile "https://example.com" "./qr.png"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `barcode.qrGenerate` | Generate QR code as data URL |
| `barcode.qrToFile` | Generate QR code to file |
| `barcode.qrToSvg` | Generate QR code as SVG |
| `barcode.qrToTerminal` | Generate QR for terminal |
| `barcode.ean13Validate` | Validate EAN-13 barcode |
| `barcode.ean13Checksum` | Calculate EAN-13 check digit |
| `barcode.upcValidate` | Validate UPC-A barcode |
| `barcode.upcChecksum` | Calculate UPC-A check digit |
| `barcode.isbn10Validate` | Validate ISBN-10 |
| `barcode.isbn13Validate` | Validate ISBN-13 |
| `barcode.isbn10to13` | Convert ISBN-10 to ISBN-13 |
| `barcode.isbn13to10` | Convert ISBN-13 to ISBN-10 |
| `barcode.luhn` | Validate Luhn checksum |
| `barcode.luhnGenerate` | Generate Luhn check digit |

## Examples

### Generate QR code to file

```robinpath
barcode.qrToFile "https://example.com" "./qr.png"
```

### Generate QR code as SVG

```robinpath
barcode.qrToSvg "hello"
```

### Generate QR for terminal

```robinpath
barcode.qrToTerminal "hello"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/barcode";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  barcode.qrToFile "https://example.com" "./qr.png"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
