---
title: "Zlib"
module: "zlib"
package: "@robinpath/zlib"
description: "Gzip, deflate, and brotli compression and decompression"
category: "core"
tags: [zlib, compression, gzip, deflate, brotli, core]
type: "builtin"
auth: "none"
functionCount: 7
---

# Zlib

> Gzip, deflate, and brotli compression and decompression

**Package:** `@robinpath/zlib` | **Category:** Core | **Type:** Built-in

## Authentication

No authentication required. All functions are available immediately.

## Use Cases

Use the `zlib` module when you need to:

- **Compress data with gzip** -- Use `zlib.gzip` for standard gzip compression
- **Decompress gzip data** -- Use `zlib.gunzip` to decompress gzip data
- **Compress with deflate** -- Use `zlib.deflate` for raw deflate compression
- **Decompress deflate data** -- Use `zlib.inflate` to decompress deflate data
- **Use brotli compression** -- Use `zlib.brotliCompress` for brotli format
- **Check compressed size** -- Use `zlib.compressSize` to get size after compression

## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`gzip`](#gzip) | Compress data using gzip | `Buffer` |
| [`gunzip`](#gunzip) | Decompress gzip data | `string` |
| [`deflate`](#deflate) | Compress data using deflate | `Buffer` |
| [`inflate`](#inflate) | Decompress deflate data | `string` |
| [`brotliCompress`](#brotlicompress) | Compress data using brotli | `Buffer` |
| [`brotliDecompress`](#brotlidecompress) | Decompress brotli data | `string` |
| [`compressSize`](#compresssize) | Get compressed size of data | `number` |

## Functions

### gzip

Compress data using gzip compression

**Module:** `zlib` | **Returns:** `Buffer` -- Compressed data

```robinpath
zlib.gzip "Hello, world!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `string` | Yes | Data to compress |

---

### gunzip

Decompress gzip-compressed data

**Module:** `zlib` | **Returns:** `string` -- Decompressed string

```robinpath
zlib.gunzip $compressedData
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `Buffer` | Yes | Gzip-compressed data |

---

### deflate

Compress data using raw deflate compression

**Module:** `zlib` | **Returns:** `Buffer` -- Compressed data

```robinpath
zlib.deflate "Hello, world!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `string` | Yes | Data to compress |

---

### inflate

Decompress raw deflate-compressed data

**Module:** `zlib` | **Returns:** `string` -- Decompressed string

```robinpath
zlib.inflate $compressedData
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `Buffer` | Yes | Deflate-compressed data |

---

### brotliCompress

Compress data using brotli compression

**Module:** `zlib` | **Returns:** `Buffer` -- Compressed data

```robinpath
zlib.brotliCompress "Hello, world!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `string` | Yes | Data to compress |

---

### brotliDecompress

Decompress brotli-compressed data

**Module:** `zlib` | **Returns:** `string` -- Decompressed string

```robinpath
zlib.brotliDecompress $compressedData
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `Buffer` | Yes | Brotli-compressed data |

---

### compressSize

Get the compressed size of data without returning the compressed output

**Module:** `zlib` | **Returns:** `number` -- Compressed size in bytes

```robinpath
zlib.compressSize "Hello, world!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `string` | Yes | Data to measure |

---

## Error Handling

| Error | Cause |
|-------|-------|
| Invalid data | Input is not valid compressed data for the format |
| Buffer too large | Data exceeds maximum compression buffer size |

```robinpath
@desc "Compress and verify"
do
  set $original as "This is test data for compression"
  set $compressed as zlib.gzip $original
  set $decompressed as zlib.gunzip $compressed
  if $decompressed == $original
    print "Compression round-trip successful"
  end
enddo
```

## Recipes

### 1. Compress a file

Read a file, compress it, and save the compressed version.

```robinpath
@desc "Gzip compress a text file"
do
  set $content as file.read "/data/logfile.txt"
  set $compressed as zlib.gzip $content
  file.writeBinary "/data/logfile.txt.gz" $compressed
  set $originalSize as file.size "/data/logfile.txt"
  set $compressedSize as zlib.compressSize $content
  print "Compressed " + $originalSize + " → " + $compressedSize + " bytes"
enddo
```

### 2. Compare compression algorithms

Test different compression methods on the same data.

```robinpath
@desc "Compare gzip vs brotli"
do
  set $data as file.read "/data/sample.txt"
  set $gzipSize as zlib.compressSize $data
  set $original as string.length $data
  print "Original: " + $original + " bytes"
  print "Gzip: " + $gzipSize + " bytes"
  print "Ratio: " + ($gzipSize / $original * 100) + "%"
enddo
```

## Related Modules

- **file** -- Read and write files to compress
- **buffer** -- Binary buffer operations
- **stream** -- Stream-based compression
