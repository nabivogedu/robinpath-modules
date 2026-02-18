---
title: "Screen"
module: "screen"
package: "@robinpath/screen"
description: "Screen capture and OCR: take screenshots (full, region, window), extract text from images with tesseract.js, list displays, and compare images"
category: "web"
tags: [screen, web]
type: "utility"
auth: "none"
functionCount: 8
---

# Screen

> Screen capture and OCR: take screenshots (full, region, window), extract text from images with tesseract.js, list displays, and compare images

**Package:** `@robinpath/screen` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `screen` module when you need to:

- **Take a full screenshot and save to file** -- Use `screen.capture` to perform this operation
- **Capture a specific rectangular region of the screen** -- Use `screen.captureRegion` to perform this operation
- **Capture a specific window by its title (falls back to full screen if not found)** -- Use `screen.captureWindow` to perform this operation
- **Extract text from an image using OCR (tesseract.js)** -- Use `screen.ocr` to perform this operation
- **Extract text from a rectangular region of an image** -- Use `screen.ocrRegion` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`capture`](#capture) | Take a full screenshot and save to file | `{path, size}` |
| [`captureRegion`](#captureregion) | Capture a specific rectangular region of the screen | `{path, size, region: {x, y, width, height}}` |
| [`captureWindow`](#capturewindow) | Capture a specific window by its title (falls back to full screen if not found) | `{path, size, window, fallback}` |
| [`ocr`](#ocr) | Extract text from an image using OCR (tesseract.js) | `{text, confidence, language}` |
| [`ocrRegion`](#ocrregion) | Extract text from a rectangular region of an image | `{text, confidence, region: {x, y, width, height}}` |
| [`setLanguage`](#setlanguage) | Set the default OCR language (eng, rus, deu, fra, spa, chi_sim, jpn, kor, ron, etc.) | `{language, previous}` |
| [`listDisplays`](#listdisplays) | List all available displays/monitors | `Array of {id, name, width, height, primary}` |
| [`compare`](#compare) | Compare two images byte-by-byte to check if they are identical | `{identical, image1Size, image2Size, sameSize}` |


## Functions

### capture

Take a full screenshot and save to file

**Module:** `screen` | **Returns:** `object` -- {path, size}

```robinpath
screen.capture "./screenshot.png"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Output file path |
| `options` | `object` | No | {format?: 'png'|'jpg'} |

---

### captureRegion

Capture a specific rectangular region of the screen

**Module:** `screen` | **Returns:** `object` -- {path, size, region: {x, y, width, height}}

```robinpath
screen.captureRegion "./region.png" 100 100 400 300
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Output file path |
| `x` | `number` | Yes | Left position in pixels |
| `y` | `number` | Yes | Top position in pixels |
| `width` | `number` | Yes | Region width in pixels |
| `height` | `number` | Yes | Region height in pixels |

---

### captureWindow

Capture a specific window by its title (falls back to full screen if not found)

**Module:** `screen` | **Returns:** `object` -- {path, size, window, fallback}

```robinpath
screen.captureWindow "./notepad.png" "Untitled - Notepad"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Output file path |
| `windowTitle` | `string` | Yes | Exact window title to capture |

---

### ocr

Extract text from an image using OCR (tesseract.js)

**Module:** `screen` | **Returns:** `object` -- {text, confidence, language}

```robinpath
screen.ocr "./screenshot.png"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `imagePath` | `string` | Yes | Path to the image file |
| `options` | `object` | No | {language?: string} e.g. 'eng', 'rus', 'deu' |

---

### ocrRegion

Extract text from a rectangular region of an image

**Module:** `screen` | **Returns:** `object` -- {text, confidence, region: {x, y, width, height}}

```robinpath
screen.ocrRegion "./screenshot.png" 50 50 200 100
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `imagePath` | `string` | Yes | Path to the image file |
| `x` | `number` | Yes | Left position in pixels |
| `y` | `number` | Yes | Top position in pixels |
| `width` | `number` | Yes | Region width in pixels |
| `height` | `number` | Yes | Region height in pixels |
| `options` | `object` | No | {language?: string} |

---

### setLanguage

Set the default OCR language (eng, rus, deu, fra, spa, chi_sim, jpn, kor, ron, etc.)

**Module:** `screen` | **Returns:** `object` -- {language, previous}

```robinpath
screen.setLanguage "deu"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `language` | `string` | Yes | Tesseract language code |

---

### listDisplays

List all available displays/monitors

**Module:** `screen` | **Returns:** `object` -- Array of {id, name, width, height, primary}

```robinpath
screen.listDisplays
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### compare

Compare two images byte-by-byte to check if they are identical

**Module:** `screen` | **Returns:** `object` -- {identical, image1Size, image2Size, sameSize}

```robinpath
screen.compare "./before.png" "./after.png"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `image1Path` | `string` | Yes | Path to first image |
| `image2Path` | `string` | Yes | Path to second image |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as screen.capture "./screenshot.png"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Displays

Retrieve all items and loop through them.

```robinpath
set $result as screen.listDisplays
each $item in $result
  print $item
end
```

### 2. Multi-step Screen workflow

Chain multiple screen operations together.

```robinpath
set $r_capture as screen.capture "./screenshot.png"
set $r_captureRegion as screen.captureRegion "./region.png" 100 100 400 300
set $r_captureWindow as screen.captureWindow "./notepad.png" "Untitled - Notepad"
print "All operations complete"
```

### 3. Safe capture with validation

Check results before proceeding.

```robinpath
set $result as screen.capture "./screenshot.png"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
