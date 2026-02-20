---
title: "Zip"
module: "zip"
package: "@robinpath/zip"
description: "Compression utilities: gzip, deflate, Brotli for strings and files"
category: "other"
tags: [zip, other]
type: "utility"
auth: "none"
functionCount: 9
---

# Zip

> Compression utilities: gzip, deflate, Brotli for strings and files

**Package:** `@robinpath/zip` | **Category:** Other | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `zip` module when you need to:

- **Compress a string with gzip, return base64** -- Use `zip.gzip` to perform this operation
- **Decompress a gzip base64 string to text** -- Use `zip.gunzip` to perform this operation
- **Compress a string with deflate, return base64** -- Use `zip.deflate` to perform this operation
- **Decompress deflate base64 data to text** -- Use `zip.inflate` to perform this operation
- **Compress a file with gzip** -- Use `zip.gzipFile` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`gzip`](#gzip) | Compress a string with gzip, return base64 | `Base64-encoded gzip data` |
| [`gunzip`](#gunzip) | Decompress a gzip base64 string to text | `Decompressed string` |
| [`deflate`](#deflate) | Compress a string with deflate, return base64 | `Base64-encoded deflate data` |
| [`inflate`](#inflate) | Decompress deflate base64 data to text | `Decompressed string` |
| [`gzipFile`](#gzipfile) | Compress a file with gzip | `Output file path` |
| [`gunzipFile`](#gunzipfile) | Decompress a .gz file | `Output file path` |
| [`brotliCompress`](#brotlicompress) | Compress a string with Brotli, return base64 | `Base64-encoded Brotli data` |
| [`brotliDecompress`](#brotlidecompress) | Decompress Brotli base64 data to text | `Decompressed string` |
| [`isGzipped`](#isgzipped) | Check if a base64 string is gzip-compressed | `True if gzipped` |


## Functions

### gzip

Compress a string with gzip, return base64

**Module:** `zip` | **Returns:** `string` -- Base64-encoded gzip data

```robinpath
zip.gzip "hello world"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | String to compress |

---

### gunzip

Decompress a gzip base64 string to text

**Module:** `zip` | **Returns:** `string` -- Decompressed string

```robinpath
zip.gunzip $compressed
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `base64` | `string` | Yes | Base64 gzip data |

---

### deflate

Compress a string with deflate, return base64

**Module:** `zip` | **Returns:** `string` -- Base64-encoded deflate data

```robinpath
zip.deflate "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | String to compress |

---

### inflate

Decompress deflate base64 data to text

**Module:** `zip` | **Returns:** `string` -- Decompressed string

```robinpath
zip.inflate $compressed
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `base64` | `string` | Yes | Base64 deflate data |

---

### gzipFile

Compress a file with gzip

**Module:** `zip` | **Returns:** `string` -- Output file path

```robinpath
zip.gzipFile "data.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `inputPath` | `string` | Yes | Path to input file |
| `outputPath` | `string` | No | Path for output .gz file |

---

### gunzipFile

Decompress a .gz file

**Module:** `zip` | **Returns:** `string` -- Output file path

```robinpath
zip.gunzipFile "data.txt.gz"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `inputPath` | `string` | Yes | Path to .gz file |
| `outputPath` | `string` | No | Path for output file |

---

### brotliCompress

Compress a string with Brotli, return base64

**Module:** `zip` | **Returns:** `string` -- Base64-encoded Brotli data

```robinpath
zip.brotliCompress "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | String to compress |

---

### brotliDecompress

Decompress Brotli base64 data to text

**Module:** `zip` | **Returns:** `string` -- Decompressed string

```robinpath
zip.brotliDecompress $compressed
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `base64` | `string` | Yes | Base64 Brotli data |

---

### isGzipped

Check if a base64 string is gzip-compressed

**Module:** `zip` | **Returns:** `boolean` -- True if gzipped

```robinpath
zip.isGzipped $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `base64` | `string` | Yes | Base64 string to check |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as zip.gzip "hello world"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Zip workflow

Chain multiple zip operations together.

```robinpath
set $r_gzip as zip.gzip "hello world"
set $r_gunzip as zip.gunzip $compressed
set $r_deflate as zip.deflate "hello"
print "All operations complete"
```

### 2. Safe gzip with validation

Check results before proceeding.

```robinpath
set $result as zip.gzip "hello world"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
