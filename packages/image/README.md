# @robinpath/image

> Image processing with Sharp: resize, crop, convert, rotate, flip, grayscale, blur, composite/watermark, and thumbnails

![Category](https://img.shields.io/badge/category-Other-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `image` module lets you:

- Resize an image
- Crop a region from an image
- Convert image format (png, jpeg, webp, avif)
- Get image metadata
- Rotate an image

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/image
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
image.crop "./photo.jpg" "./cropped.jpg" {"left": 10, "top": 10, "width": 200, "height": 200}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `image.resize` | Resize an image |
| `image.crop` | Crop a region from an image |
| `image.convert` | Convert image format (png, jpeg, webp, avif) |
| `image.metadata` | Get image metadata |
| `image.rotate` | Rotate an image |
| `image.flip` | Flip an image vertically or horizontally |
| `image.grayscale` | Convert to grayscale |
| `image.blur` | Apply Gaussian blur |
| `image.composite` | Overlay one image on top of another (watermark) |
| `image.thumbnail` | Generate a square thumbnail |

## Examples

### Crop a region from an image

```robinpath
image.crop "./photo.jpg" "./cropped.jpg" {"left": 10, "top": 10, "width": 200, "height": 200}
```

### Convert image format (png, jpeg, webp, avif)

```robinpath
image.convert "./photo.png" "./photo.webp" "webp" 85
```

### Get image metadata

```robinpath
image.metadata "./photo.jpg"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/image";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  image.crop "./photo.jpg" "./cropped.jpg" {"left": 10, "top": 10, "width": 200, "height": 200}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
