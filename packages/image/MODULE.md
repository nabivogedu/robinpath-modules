---
title: "Image"
module: "image"
package: "@robinpath/image"
description: "Image processing with Sharp: resize, crop, convert, rotate, flip, grayscale, blur, composite/watermark, and thumbnails"
category: "other"
tags: [image, other]
type: "utility"
auth: "none"
functionCount: 10
---

# Image

> Image processing with Sharp: resize, crop, convert, rotate, flip, grayscale, blur, composite/watermark, and thumbnails

**Package:** `@robinpath/image` | **Category:** Other | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `image` module when you need to:

- **Resize an image** -- Use `image.resize` to perform this operation
- **Crop a region from an image** -- Use `image.crop` to perform this operation
- **Convert image format (png, jpeg, webp, avif)** -- Use `image.convert` to perform this operation
- **Get image metadata** -- Use `image.metadata` to perform this operation
- **Rotate an image** -- Use `image.rotate` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`resize`](#resize) | Resize an image | `{path, width, height}` |
| [`crop`](#crop) | Crop a region from an image | `{path}` |
| [`convert`](#convert) | Convert image format (png, jpeg, webp, avif) | `{path, format}` |
| [`metadata`](#metadata) | Get image metadata | `{width, height, format, channels, size, hasAlpha}` |
| [`rotate`](#rotate) | Rotate an image | `{path, angle}` |
| [`flip`](#flip) | Flip an image vertically or horizontally | `{path}` |
| [`grayscale`](#grayscale) | Convert to grayscale | `{path}` |
| [`blur`](#blur) | Apply Gaussian blur | `{path}` |
| [`composite`](#composite) | Overlay one image on top of another (watermark) | `{path}` |
| [`thumbnail`](#thumbnail) | Generate a square thumbnail | `{path, size}` |


## Functions

### resize

Resize an image

**Module:** `image` | **Returns:** `object` -- {path, width, height}

```robinpath
image.resize "./photo.jpg" "./thumb.jpg" {"width": 300, "height": 200}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | Input path |
| `output` | `string` | Yes | Output path |
| `options` | `object` | Yes | {width, height, fit} |

---

### crop

Crop a region from an image

**Module:** `image` | **Returns:** `object` -- {path}

```robinpath
image.crop "./photo.jpg" "./cropped.jpg" {"left": 10, "top": 10, "width": 200, "height": 200}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | Input path |
| `output` | `string` | Yes | Output path |
| `options` | `object` | Yes | {left, top, width, height} |

---

### convert

Convert image format (png, jpeg, webp, avif)

**Module:** `image` | **Returns:** `object` -- {path, format}

```robinpath
image.convert "./photo.png" "./photo.webp" "webp" 85
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | Input path |
| `output` | `string` | Yes | Output path |
| `format` | `string` | Yes | Target format |
| `quality` | `number` | No | Quality 1-100 (optional) |

---

### metadata

Get image metadata

**Module:** `image` | **Returns:** `object` -- {width, height, format, channels, size, hasAlpha}

```robinpath
image.metadata "./photo.jpg"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | Input path |

---

### rotate

Rotate an image

**Module:** `image` | **Returns:** `object` -- {path, angle}

```robinpath
image.rotate "./photo.jpg" "./rotated.jpg" 90
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | Input path |
| `output` | `string` | Yes | Output path |
| `angle` | `number` | Yes | Rotation angle in degrees |

---

### flip

Flip an image vertically or horizontally

**Module:** `image` | **Returns:** `object` -- {path}

```robinpath
image.flip "./photo.jpg" "./flipped.jpg" "horizontal"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | Input path |
| `output` | `string` | Yes | Output path |
| `direction` | `string` | No | 'vertical' or 'horizontal' |

---

### grayscale

Convert to grayscale

**Module:** `image` | **Returns:** `object` -- {path}

```robinpath
image.grayscale "./photo.jpg" "./bw.jpg"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | Input path |
| `output` | `string` | Yes | Output path |

---

### blur

Apply Gaussian blur

**Module:** `image` | **Returns:** `object` -- {path}

```robinpath
image.blur "./photo.jpg" "./blurred.jpg" 5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | Input path |
| `output` | `string` | Yes | Output path |
| `sigma` | `number` | No | Blur sigma (default 3) |

---

### composite

Overlay one image on top of another (watermark)

**Module:** `image` | **Returns:** `object` -- {path}

```robinpath
image.composite "./photo.jpg" "./watermark.png" "./result.jpg" {"gravity": "southeast"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `base` | `string` | Yes | Base image path |
| `overlay` | `string` | Yes | Overlay image path |
| `output` | `string` | Yes | Output path |
| `options` | `object` | No | {top, left, gravity} |

---

### thumbnail

Generate a square thumbnail

**Module:** `image` | **Returns:** `object` -- {path, size}

```robinpath
image.thumbnail "./photo.jpg" "./thumb.jpg" 150
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | Input path |
| `output` | `string` | Yes | Output path |
| `size` | `number` | No | Size in pixels (default 200) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as image.resize "./photo.jpg" "./thumb.jpg" {"width": 300, "height": 200}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Image workflow

Chain multiple image operations together.

```robinpath
set $r_resize as image.resize "./photo.jpg" "./thumb.jpg" {"width": 300, "height": 200}
set $r_crop as image.crop "./photo.jpg" "./cropped.jpg" {"left": 10, "top": 10, "width": 200, "height": 200}
set $r_convert as image.convert "./photo.png" "./photo.webp" "webp" 85
print "All operations complete"
```

### 2. Safe resize with validation

Check results before proceeding.

```robinpath
set $result as image.resize "./photo.jpg" "./thumb.jpg" {"width": 300, "height": 200}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
