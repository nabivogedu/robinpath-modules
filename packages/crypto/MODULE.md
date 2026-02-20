---
title: "Crypto"
module: "crypto"
package: "@robinpath/crypto"
description: "Hashing, HMAC, and encoding/decoding utilities (MD5, SHA, Base64, Hex, URL)"
category: "utility"
tags: [crypto, utility]
type: "utility"
auth: "none"
functionCount: 11
---

# Crypto

> Hashing, HMAC, and encoding/decoding utilities (MD5, SHA, Base64, Hex, URL)

**Package:** `@robinpath/crypto` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `crypto` module when you need to:

- **Compute the MD5 hash of a string** -- Use `crypto.md5` to perform this operation
- **Compute the SHA-1 hash of a string** -- Use `crypto.sha1` to perform this operation
- **Compute the SHA-256 hash of a string** -- Use `crypto.sha256` to perform this operation
- **Compute the SHA-512 hash of a string** -- Use `crypto.sha512` to perform this operation
- **Compute an HMAC digest using the specified algorithm and secret key** -- Use `crypto.hmac` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`md5`](#md5) | Compute the MD5 hash of a string | `The MD5 hex digest` |
| [`sha1`](#sha1) | Compute the SHA-1 hash of a string | `The SHA-1 hex digest` |
| [`sha256`](#sha256) | Compute the SHA-256 hash of a string | `The SHA-256 hex digest` |
| [`sha512`](#sha512) | Compute the SHA-512 hash of a string | `The SHA-512 hex digest` |
| [`hmac`](#hmac) | Compute an HMAC digest using the specified algorithm and secret key | `The HMAC hex digest` |
| [`base64Encode`](#base64encode) | Encode a string to Base64 | `The Base64-encoded string` |
| [`base64Decode`](#base64decode) | Decode a Base64 string back to plain text | `The decoded plain-text string` |
| [`hexEncode`](#hexencode) | Encode a string to its hexadecimal representation | `The hex-encoded string` |
| [`hexDecode`](#hexdecode) | Decode a hexadecimal string back to plain text | `The decoded plain-text string` |
| [`urlEncode`](#urlencode) | Percent-encode a string for use in a URL | `The URL-encoded string` |
| [`urlDecode`](#urldecode) | Decode a percent-encoded URL string back to plain text | `The decoded plain-text string` |


## Functions

### md5

Compute the MD5 hash of a string

**Module:** `crypto` | **Returns:** `string` -- The MD5 hex digest

```robinpath
crypto.md5 "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to hash |

---

### sha1

Compute the SHA-1 hash of a string

**Module:** `crypto` | **Returns:** `string` -- The SHA-1 hex digest

```robinpath
crypto.sha1 "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to hash |

---

### sha256

Compute the SHA-256 hash of a string

**Module:** `crypto` | **Returns:** `string` -- The SHA-256 hex digest

```robinpath
crypto.sha256 "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to hash |

---

### sha512

Compute the SHA-512 hash of a string

**Module:** `crypto` | **Returns:** `string` -- The SHA-512 hex digest

```robinpath
crypto.sha512 "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to hash |

---

### hmac

Compute an HMAC digest using the specified algorithm and secret key

**Module:** `crypto` | **Returns:** `string` -- The HMAC hex digest

```robinpath
crypto.hmac "sha256" "message" "secret"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `algorithm` | `string` | Yes | Hash algorithm to use (e.g. sha256, sha512, md5) |
| `message` | `string` | Yes | The message to authenticate |
| `key` | `string` | Yes | The secret key |

---

### base64Encode

Encode a string to Base64

**Module:** `crypto` | **Returns:** `string` -- The Base64-encoded string

```robinpath
crypto.base64Encode "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to encode |

---

### base64Decode

Decode a Base64 string back to plain text

**Module:** `crypto` | **Returns:** `string` -- The decoded plain-text string

```robinpath
crypto.base64Decode "aGVsbG8="
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The Base64-encoded string to decode |

---

### hexEncode

Encode a string to its hexadecimal representation

**Module:** `crypto` | **Returns:** `string` -- The hex-encoded string

```robinpath
crypto.hexEncode "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to encode |

---

### hexDecode

Decode a hexadecimal string back to plain text

**Module:** `crypto` | **Returns:** `string` -- The decoded plain-text string

```robinpath
crypto.hexDecode "68656c6c6f"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The hex-encoded string to decode |

---

### urlEncode

Percent-encode a string for use in a URL

**Module:** `crypto` | **Returns:** `string` -- The URL-encoded string

```robinpath
crypto.urlEncode "hello world"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to URL-encode |

---

### urlDecode

Decode a percent-encoded URL string back to plain text

**Module:** `crypto` | **Returns:** `string` -- The decoded plain-text string

```robinpath
crypto.urlDecode "hello%20world"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The URL-encoded string to decode |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as crypto.md5 "hello"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Crypto workflow

Chain multiple crypto operations together.

```robinpath
set $r_md5 as crypto.md5 "hello"
set $r_sha1 as crypto.sha1 "hello"
set $r_sha256 as crypto.sha256 "hello"
print "All operations complete"
```

### 2. Safe md5 with validation

Check results before proceeding.

```robinpath
set $result as crypto.md5 "hello"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
