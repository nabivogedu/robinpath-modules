---
title: "Buffer"
module: "buffer"
package: "@robinpath/buffer"
description: "Buffer and encoding utilities: base64, base64url, hex, byte operations"
category: "utility"
tags: [buffer, utility]
type: "utility"
auth: "none"
functionCount: 12
---

# Buffer

> Buffer and encoding utilities: base64, base64url, hex, byte operations

**Package:** `@robinpath/buffer` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `buffer` module when you need to:

- **Create a base64 buffer from a string** -- Use `buffer.fromString` to perform this operation
- **Convert a base64 buffer to string** -- Use `buffer.toString` to perform this operation
- **Create base64 from hex string** -- Use `buffer.fromHex` to perform this operation
- **Convert base64 to hex string** -- Use `buffer.toHex` to perform this operation
- **Encode string to base64** -- Use `buffer.toBase64` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`fromString`](#fromstring) | Create a base64 buffer from a string | `Base64-encoded buffer` |
| [`toString`](#tostring) | Convert a base64 buffer to string | `Decoded string` |
| [`fromHex`](#fromhex) | Create base64 from hex string | `Base64 string` |
| [`toHex`](#tohex) | Convert base64 to hex string | `Hex string` |
| [`toBase64`](#tobase64) | Encode string to base64 | `Base64 string` |
| [`fromBase64`](#frombase64) | Decode base64 to string | `Decoded string` |
| [`toBase64Url`](#tobase64url) | Encode string to URL-safe base64 | `Base64url string` |
| [`fromBase64Url`](#frombase64url) | Decode URL-safe base64 to string | `Decoded string` |
| [`byteLength`](#bytelength) | Get the byte length of a string | `Byte length` |
| [`concat`](#concat) | Concatenate multiple base64 buffers | `Concatenated base64 string` |
| [`compare`](#compare) | Compare two base64 buffers | `-1, 0, or 1` |
| [`isBase64`](#isbase64) | Check if a string is valid base64 | `True if valid base64` |


## Functions

### fromString

Create a base64 buffer from a string

**Module:** `buffer` | **Returns:** `string` -- Base64-encoded buffer

```robinpath
buffer.fromString "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | Input string |
| `encoding` | `string` | No | String encoding (default: utf-8) |

---

### toString

Convert a base64 buffer to string

**Module:** `buffer` | **Returns:** `string` -- Decoded string

```robinpath
buffer.toString "aGVsbG8="
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `base64` | `string` | Yes | Base64 string |
| `encoding` | `string` | No | Output encoding (default: utf-8) |

---

### fromHex

Create base64 from hex string

**Module:** `buffer` | **Returns:** `string` -- Base64 string

```robinpath
buffer.fromHex "48656c6c6f"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hex` | `string` | Yes | Hex string |

---

### toHex

Convert base64 to hex string

**Module:** `buffer` | **Returns:** `string` -- Hex string

```robinpath
buffer.toHex "aGVsbG8="
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `base64` | `string` | Yes | Base64 string |

---

### toBase64

Encode string to base64

**Module:** `buffer` | **Returns:** `string` -- Base64 string

```robinpath
buffer.toBase64 "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | Input string |

---

### fromBase64

Decode base64 to string

**Module:** `buffer` | **Returns:** `string` -- Decoded string

```robinpath
buffer.fromBase64 "aGVsbG8="
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `base64` | `string` | Yes | Base64 string |

---

### toBase64Url

Encode string to URL-safe base64

**Module:** `buffer` | **Returns:** `string` -- Base64url string

```robinpath
buffer.toBase64Url "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | Input string |

---

### fromBase64Url

Decode URL-safe base64 to string

**Module:** `buffer` | **Returns:** `string` -- Decoded string

```robinpath
buffer.fromBase64Url "aGVsbG8"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `base64url` | `string` | Yes | Base64url string |

---

### byteLength

Get the byte length of a string

**Module:** `buffer` | **Returns:** `number` -- Byte length

```robinpath
buffer.byteLength "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | Input string |

---

### concat

Concatenate multiple base64 buffers

**Module:** `buffer` | **Returns:** `string` -- Concatenated base64 string

```robinpath
buffer.concat "aGVs" "bG8="
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `buffers` | `string` | Yes | Base64 strings to concatenate |

---

### compare

Compare two base64 buffers

**Module:** `buffer` | **Returns:** `number` -- -1, 0, or 1

```robinpath
buffer.compare "YQ==" "Yg=="
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `a` | `string` | Yes | First base64 string |
| `b` | `string` | Yes | Second base64 string |

---

### isBase64

Check if a string is valid base64

**Module:** `buffer` | **Returns:** `boolean` -- True if valid base64

```robinpath
buffer.isBase64 "aGVsbG8="
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | String to check |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as buffer.fromString "hello"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Buffer workflow

Chain multiple buffer operations together.

```robinpath
set $r_fromString as buffer.fromString "hello"
set $r_toString as buffer.toString "aGVsbG8="
set $r_fromHex as buffer.fromHex "48656c6c6f"
print "All operations complete"
```

### 2. Safe fromString with validation

Check results before proceeding.

```robinpath
set $result as buffer.fromString "hello"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
