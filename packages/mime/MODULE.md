---
title: "Mime"
module: "mime"
package: "@robinpath/mime"
description: "MIME type detection from extensions and file content, type classification, Content-Type building"
category: "utility"
tags: [mime, utility]
type: "utility"
auth: "none"
functionCount: 12
---

# Mime

> MIME type detection from extensions and file content, type classification, Content-Type building

**Package:** `@robinpath/mime` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `mime` module when you need to:

- **Get MIME type from file extension** -- Use `mime.lookup` to perform this operation
- **Get extension from MIME type** -- Use `mime.extension` to perform this operation
- **Detect MIME type from file content (magic bytes)** -- Use `mime.detect` to perform this operation
- **Get charset for MIME type** -- Use `mime.charset` to perform this operation
- **Check if MIME type is text-based** -- Use `mime.isText` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`lookup`](#lookup) | Get MIME type from file extension | `MIME type or null` |
| [`extension`](#extension) | Get extension from MIME type | `Extension or null` |
| [`detect`](#detect) | Detect MIME type from file content (magic bytes) | `Detected MIME type` |
| [`charset`](#charset) | Get charset for MIME type | `UTF-8 or null` |
| [`isText`](#istext) | Check if MIME type is text-based | `true if text` |
| [`isImage`](#isimage) | Check if MIME type is image | `true if image` |
| [`isAudio`](#isaudio) | Check if MIME type is audio | `true if audio` |
| [`isVideo`](#isvideo) | Check if MIME type is video | `true if video` |
| [`isFont`](#isfont) | Check if MIME type is font | `true if font` |
| [`isArchive`](#isarchive) | Check if MIME type is archive | `true if archive` |
| [`contentType`](#contenttype) | Build Content-Type header with charset | `Content-Type header value` |
| [`allTypes`](#alltypes) | Get all known MIME type mappings | `Extension-to-MIME map` |


## Functions

### lookup

Get MIME type from file extension

**Module:** `mime` | **Returns:** `string` -- MIME type or null

```robinpath
mime.lookup "photo.png"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pathOrExt` | `string` | Yes | File path or extension |

---

### extension

Get extension from MIME type

**Module:** `mime` | **Returns:** `string` -- Extension or null

```robinpath
mime.extension "image/png"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mimeType` | `string` | Yes | MIME type |

---

### detect

Detect MIME type from file content (magic bytes)

**Module:** `mime` | **Returns:** `string` -- Detected MIME type

```robinpath
mime.detect "./unknown_file"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | File path |

---

### charset

Get charset for MIME type

**Module:** `mime` | **Returns:** `string` -- UTF-8 or null

```robinpath
mime.charset "text/html"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mimeType` | `string` | Yes | MIME type |

---

### isText

Check if MIME type is text-based

**Module:** `mime` | **Returns:** `boolean` -- true if text

```robinpath
mime.isText "application/json"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mimeType` | `string` | Yes | MIME type |

---

### isImage

Check if MIME type is image

**Module:** `mime` | **Returns:** `boolean` -- true if image

```robinpath
mime.isImage "image/png"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mimeType` | `string` | Yes | MIME type |

---

### isAudio

Check if MIME type is audio

**Module:** `mime` | **Returns:** `boolean` -- true if audio

```robinpath
mime.isAudio "audio/mpeg"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mimeType` | `string` | Yes | MIME type |

---

### isVideo

Check if MIME type is video

**Module:** `mime` | **Returns:** `boolean` -- true if video

```robinpath
mime.isVideo "video/mp4"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mimeType` | `string` | Yes | MIME type |

---

### isFont

Check if MIME type is font

**Module:** `mime` | **Returns:** `boolean` -- true if font

```robinpath
mime.isFont "font/woff2"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mimeType` | `string` | Yes | MIME type |

---

### isArchive

Check if MIME type is archive

**Module:** `mime` | **Returns:** `boolean` -- true if archive

```robinpath
mime.isArchive "application/zip"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mimeType` | `string` | Yes | MIME type |

---

### contentType

Build Content-Type header with charset

**Module:** `mime` | **Returns:** `string` -- Content-Type header value

```robinpath
mime.contentType "index.html"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pathOrExt` | `string` | Yes | File path or extension |

---

### allTypes

Get all known MIME type mappings

**Module:** `mime` | **Returns:** `object` -- Extension-to-MIME map

```robinpath
mime.allTypes
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as mime.lookup "photo.png"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Mime workflow

Chain multiple mime operations together.

```robinpath
set $r_lookup as mime.lookup "photo.png"
set $r_extension as mime.extension "image/png"
set $r_detect as mime.detect "./unknown_file"
print "All operations complete"
```

### 2. Safe lookup with validation

Check results before proceeding.

```robinpath
set $result as mime.lookup "photo.png"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
