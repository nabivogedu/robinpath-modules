# @robinpath/screen

> Screen capture and OCR: take screenshots (full, region, window), extract text from images with tesseract.js, list displays, and compare images

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-8-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `screen` module lets you:

- Take a full screenshot and save to file
- Capture a specific rectangular region of the screen
- Capture a specific window by its title (falls back to full screen if not found)
- Extract text from an image using OCR (tesseract.js)
- Extract text from a rectangular region of an image

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/screen
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
screen.captureRegion "./region.png" 100 100 400 300
```

## Available Functions

| Function | Description |
|----------|-------------|
| `screen.capture` | Take a full screenshot and save to file |
| `screen.captureRegion` | Capture a specific rectangular region of the screen |
| `screen.captureWindow` | Capture a specific window by its title (falls back to full screen if not found) |
| `screen.ocr` | Extract text from an image using OCR (tesseract.js) |
| `screen.ocrRegion` | Extract text from a rectangular region of an image |
| `screen.setLanguage` | Set the default OCR language (eng, rus, deu, fra, spa, chi_sim, jpn, kor, ron, etc.) |
| `screen.listDisplays` | List all available displays/monitors |
| `screen.compare` | Compare two images byte-by-byte to check if they are identical |

## Examples

### Capture a specific rectangular region of the screen

```robinpath
screen.captureRegion "./region.png" 100 100 400 300
```

### Capture a specific window by its title (falls back to full screen if not found)

```robinpath
screen.captureWindow "./notepad.png" "Untitled - Notepad"
```

### Extract text from an image using OCR (tesseract.js)

```robinpath
screen.ocr "./screenshot.png"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/screen";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  screen.captureRegion "./region.png" 100 100 400 300
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
