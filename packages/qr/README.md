# @robinpath/qr

> QR Code module for RobinPath.

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-8-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `qr` module lets you:

- generateQrUrl
- generateQrDataUrl
- generateWifiQr
- generateVCardQr
- generateEmailQr

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/qr
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
qr.generateQrDataUrl
```

## Available Functions

| Function | Description |
|----------|-------------|
| `qr.generateQrUrl` | generateQrUrl |
| `qr.generateQrDataUrl` | generateQrDataUrl |
| `qr.generateWifiQr` | generateWifiQr |
| `qr.generateVCardQr` | generateVCardQr |
| `qr.generateEmailQr` | generateEmailQr |
| `qr.generateSmsQr` | generateSmsQr |
| `qr.generateUrlQr` | generateUrlQr |
| `qr.generateTextQr` | generateTextQr |

## Examples

### generateQrDataUrl

```robinpath
qr.generateQrDataUrl
```

### generateWifiQr

```robinpath
qr.generateWifiQr
```

### generateVCardQr

```robinpath
qr.generateVCardQr
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/qr";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  qr.generateQrDataUrl
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
