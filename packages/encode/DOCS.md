---
title: "Encode"
module: "encode"
package: "@robinpath/encode"
description: "Encoding and decoding conversions: Base64, Base32, hex, URL encoding, HTML entities, binary, ROT13, percent-encoding, and more"
category: "utility"
tags: [encode, utility]
type: "utility"
auth: "none"
functionCount: 21
---

# Encode

> Encoding and decoding conversions: Base64, Base32, hex, URL encoding, HTML entities, binary, ROT13, percent-encoding, and more

**Package:** `@robinpath/encode` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `encode` module when you need to:

- **Encode a string or buffer to Base64** -- Use `encode.base64Encode` to perform this operation
- **Decode a Base64-encoded string** -- Use `encode.base64Decode` to perform this operation
- **Encode a string to URL-safe Base64 (no padding, +/ replaced with -_)** -- Use `encode.base64UrlEncode` to perform this operation
- **Decode a URL-safe Base64 string** -- Use `encode.base64UrlDecode` to perform this operation
- **Encode a string to hexadecimal representation** -- Use `encode.hexEncode` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`base64Encode`](#base64encode) | Encode a string or buffer to Base64 | `object` |
| [`base64Decode`](#base64decode) | Decode a Base64-encoded string | `object` |
| [`base64UrlEncode`](#base64urlencode) | Encode a string to URL-safe Base64 (no padding, +/ replaced with -_) | `object` |
| [`base64UrlDecode`](#base64urldecode) | Decode a URL-safe Base64 string | `object` |
| [`hexEncode`](#hexencode) | Encode a string to hexadecimal representation | `object` |
| [`hexDecode`](#hexdecode) | Decode a hexadecimal string back to UTF-8 | `object` |
| [`base32Encode`](#base32encode) | Encode a string to Base32 (RFC 4648) | `object` |
| [`base32Decode`](#base32decode) | Decode a Base32-encoded string | `object` |
| [`urlEncode`](#urlencode) | Encode a string using encodeURIComponent | `object` |
| [`urlDecode`](#urldecode) | Decode a URL-encoded string using decodeURIComponent | `object` |
| [`htmlEncode`](#htmlencode) | Encode HTML special characters into entities | `object` |
| [`htmlDecode`](#htmldecode) | Decode HTML entities back to characters | `object` |
| [`utf8Encode`](#utf8encode) | Encode a string to an array of UTF-8 byte values | `object` |
| [`utf8Decode`](#utf8decode) | Decode an array of UTF-8 byte values back to a string | `object` |
| [`binaryEncode`](#binaryencode) | Encode a string to its binary (0s and 1s) representation | `object` |
| [`binaryDecode`](#binarydecode) | Decode a binary (0s and 1s) string back to text | `object` |
| [`asciiToChar`](#asciitochar) | Convert an ASCII code to its character | `object` |
| [`charToAscii`](#chartoascii) | Convert a character to its ASCII code | `object` |
| [`rot13`](#rot13) | Apply ROT13 substitution cipher to a string | `object` |
| [`percentEncode`](#percentencode) | Percent-encode every byte of a string (e.g. 'A' becomes '%41') | `object` |
| [`percentDecode`](#percentdecode) | Decode a percent-encoded string | `object` |


## Functions

### base64Encode

Encode a string or buffer to Base64

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.base64Encode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The data to encode |

---

### base64Decode

Decode a Base64-encoded string

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.base64Decode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The Base64 string to decode |

---

### base64UrlEncode

Encode a string to URL-safe Base64 (no padding, +/ replaced with -_)

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.base64UrlEncode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The data to encode |

---

### base64UrlDecode

Decode a URL-safe Base64 string

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.base64UrlDecode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The URL-safe Base64 string to decode |

---

### hexEncode

Encode a string to hexadecimal representation

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.hexEncode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The data to encode |

---

### hexDecode

Decode a hexadecimal string back to UTF-8

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.hexDecode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The hex string to decode |

---

### base32Encode

Encode a string to Base32 (RFC 4648)

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.base32Encode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The data to encode |

---

### base32Decode

Decode a Base32-encoded string

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.base32Decode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The Base32 string to decode |

---

### urlEncode

Encode a string using encodeURIComponent

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.urlEncode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to URL-encode |

---

### urlDecode

Decode a URL-encoded string using decodeURIComponent

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.urlDecode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The URL-encoded string to decode |

---

### htmlEncode

Encode HTML special characters into entities

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.htmlEncode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to encode |

---

### htmlDecode

Decode HTML entities back to characters

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.htmlDecode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The HTML-encoded string to decode |

---

### utf8Encode

Encode a string to an array of UTF-8 byte values

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.utf8Encode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to encode |

---

### utf8Decode

Decode an array of UTF-8 byte values back to a string

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.utf8Decode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `array` | Yes | Array of byte values |

---

### binaryEncode

Encode a string to its binary (0s and 1s) representation

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.binaryEncode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to encode |
| `separator` | `string` | No | Separator between bytes (default: ' ') |

---

### binaryDecode

Decode a binary (0s and 1s) string back to text

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.binaryDecode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The binary string to decode |

---

### asciiToChar

Convert an ASCII code to its character

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.asciiToChar
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | `number` | Yes | ASCII code (0-127) |

---

### charToAscii

Convert a character to its ASCII code

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.charToAscii
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `char` | `string` | Yes | A single character |

---

### rot13

Apply ROT13 substitution cipher to a string

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.rot13
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to transform |

---

### percentEncode

Percent-encode every byte of a string (e.g. 'A' becomes '%41')

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.percentEncode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to encode |

---

### percentDecode

Decode a percent-encoded string

**Module:** `encode` | **Returns:** `object` -- API response.

```robinpath
encode.percentDecode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The percent-encoded string to decode |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as encode.base64Encode
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Encode workflow

Chain multiple encode operations together.

```robinpath
set $r_base64Encode as encode.base64Encode
set $r_base64Decode as encode.base64Decode
set $r_base64UrlEncode as encode.base64UrlEncode
print "All operations complete"
```

### 2. Safe base64Encode with validation

Check results before proceeding.

```robinpath
set $result as encode.base64Encode
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
