---
title: "Hash"
module: "hash"
package: "@robinpath/hash"
description: "Cryptographic hashing utilities: MD5, SHA family, HMAC, CRC32, file hashing, UUID v5 generation, secure random bytes, and content fingerprinting"
category: "utility"
tags: [hash, utility]
type: "utility"
auth: "none"
functionCount: 16
---

# Hash

> Cryptographic hashing utilities: MD5, SHA family, HMAC, CRC32, file hashing, UUID v5 generation, secure random bytes, and content fingerprinting

**Package:** `@robinpath/hash` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `hash` module when you need to:

- **Compute MD5 hash of a string** -- Use `hash.md5` to perform this operation
- **Compute SHA-1 hash of a string** -- Use `hash.sha1` to perform this operation
- **Compute SHA-256 hash of a string** -- Use `hash.sha256` to perform this operation
- **Compute SHA-512 hash of a string** -- Use `hash.sha512` to perform this operation
- **Compute SHA-3 hash of a string** -- Use `hash.sha3` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`md5`](#md5) | Compute MD5 hash of a string | `object` |
| [`sha1`](#sha1) | Compute SHA-1 hash of a string | `object` |
| [`sha256`](#sha256) | Compute SHA-256 hash of a string | `object` |
| [`sha512`](#sha512) | Compute SHA-512 hash of a string | `object` |
| [`sha3`](#sha3) | Compute SHA-3 hash of a string | `object` |
| [`hmac`](#hmac) | Compute HMAC of a string with a secret key | `object` |
| [`hashFile`](#hashfile) | Compute the hash of a file's contents | `object` |
| [`hashStream`](#hashstream) | Compute a hash from an array of data chunks (simulates stream hashing) | `object` |
| [`crc32`](#crc32) | Compute CRC32 checksum of a string | `object` |
| [`checksum`](#checksum) | Verify that a string matches an expected hash | `object` |
| [`compare`](#compare) | Timing-safe comparison of two strings to prevent timing attacks | `object` |
| [`uuid5`](#uuid5) | Generate a deterministic UUID v5 from a name and namespace | `object` |
| [`randomBytes`](#randombytes) | Generate cryptographically secure random bytes | `object` |
| [`randomHex`](#randomhex) | Generate a random hexadecimal string of specified length | `object` |
| [`randomBase64`](#randombase64) | Generate a random Base64-encoded string | `object` |
| [`fingerprint`](#fingerprint) | Generate a content fingerprint combining MD5 and SHA-256 hashes | `object` |


## Functions

### md5

Compute MD5 hash of a string

**Module:** `hash` | **Returns:** `object` -- API response.

```robinpath
hash.md5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to hash |
| `encoding` | `string` | No | Output encoding: 'hex' (default) or 'base64' |

---

### sha1

Compute SHA-1 hash of a string

**Module:** `hash` | **Returns:** `object` -- API response.

```robinpath
hash.sha1
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to hash |
| `encoding` | `string` | No | Output encoding: 'hex' (default) or 'base64' |

---

### sha256

Compute SHA-256 hash of a string

**Module:** `hash` | **Returns:** `object` -- API response.

```robinpath
hash.sha256
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to hash |
| `encoding` | `string` | No | Output encoding: 'hex' (default) or 'base64' |

---

### sha512

Compute SHA-512 hash of a string

**Module:** `hash` | **Returns:** `object` -- API response.

```robinpath
hash.sha512
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to hash |
| `encoding` | `string` | No | Output encoding: 'hex' (default) or 'base64' |

---

### sha3

Compute SHA-3 hash of a string

**Module:** `hash` | **Returns:** `object` -- API response.

```robinpath
hash.sha3
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to hash |
| `bits` | `number` | No | Hash bit length: 224, 256 (default), 384, or 512 |
| `encoding` | `string` | No | Output encoding: 'hex' (default) or 'base64' |

---

### hmac

Compute HMAC of a string with a secret key

**Module:** `hash` | **Returns:** `object` -- API response.

```robinpath
hash.hmac
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to hash |
| `key` | `string` | Yes | The secret key |
| `algorithm` | `string` | No | Hash algorithm (default: 'sha256') |
| `encoding` | `string` | No | Output encoding: 'hex' (default) or 'base64' |

---

### hashFile

Compute the hash of a file's contents

**Module:** `hash` | **Returns:** `object` -- API response.

```robinpath
hash.hashFile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Absolute path to the file |
| `algorithm` | `string` | No | Hash algorithm (default: 'sha256') |
| `encoding` | `string` | No | Output encoding: 'hex' (default) or 'base64' |

---

### hashStream

Compute a hash from an array of data chunks (simulates stream hashing)

**Module:** `hash` | **Returns:** `object` -- API response.

```robinpath
hash.hashStream
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `chunks` | `array` | Yes | Array of strings or buffers to hash |
| `algorithm` | `string` | No | Hash algorithm (default: 'sha256') |
| `encoding` | `string` | No | Output encoding: 'hex' (default) or 'base64' |

---

### crc32

Compute CRC32 checksum of a string

**Module:** `hash` | **Returns:** `object` -- API response.

```robinpath
hash.crc32
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to checksum |
| `asHex` | `boolean` | No | Return as hex string instead of number (default: false) |

---

### checksum

Verify that a string matches an expected hash

**Module:** `hash` | **Returns:** `object` -- API response.

```robinpath
hash.checksum
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to verify |
| `expectedHash` | `string` | Yes | The expected hash value |
| `algorithm` | `string` | No | Hash algorithm (default: 'sha256') |

---

### compare

Timing-safe comparison of two strings to prevent timing attacks

**Module:** `hash` | **Returns:** `object` -- API response.

```robinpath
hash.compare
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `a` | `string` | Yes | First string |
| `b` | `string` | Yes | Second string |

---

### uuid5

Generate a deterministic UUID v5 from a name and namespace

**Module:** `hash` | **Returns:** `object` -- API response.

```robinpath
hash.uuid5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | The name to generate UUID from |
| `namespace` | `string` | No | Namespace UUID (default: DNS namespace) |

---

### randomBytes

Generate cryptographically secure random bytes

**Module:** `hash` | **Returns:** `object` -- API response.

```robinpath
hash.randomBytes
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `size` | `number` | No | Number of bytes (default: 32) |
| `encoding` | `string` | No | Output encoding: 'hex' (default), 'base64', 'buffer' |

---

### randomHex

Generate a random hexadecimal string of specified length

**Module:** `hash` | **Returns:** `object` -- API response.

```robinpath
hash.randomHex
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `length` | `number` | No | Length of hex string (default: 32) |

---

### randomBase64

Generate a random Base64-encoded string

**Module:** `hash` | **Returns:** `object` -- API response.

```robinpath
hash.randomBase64
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `byteCount` | `number` | No | Number of random bytes (default: 32) |
| `urlSafe` | `boolean` | No | Use URL-safe Base64 (default: false) |

---

### fingerprint

Generate a content fingerprint combining MD5 and SHA-256 hashes

**Module:** `hash` | **Returns:** `object` -- API response.

```robinpath
hash.fingerprint
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The content to fingerprint |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as hash.md5
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Hash workflow

Chain multiple hash operations together.

```robinpath
set $r_md5 as hash.md5
set $r_sha1 as hash.sha1
set $r_sha256 as hash.sha256
print "All operations complete"
```

### 2. Safe md5 with validation

Check results before proceeding.

```robinpath
set $result as hash.md5
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
