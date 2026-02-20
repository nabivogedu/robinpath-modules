---
title: "Encrypt"
module: "encrypt"
package: "@robinpath/encrypt"
description: "AES-256-GCM and RSA encryption/decryption with key generation, password-based key derivation, and hashing"
category: "utility"
tags: [encrypt, utility]
type: "utility"
auth: "none"
functionCount: 10
---

# Encrypt

> AES-256-GCM and RSA encryption/decryption with key generation, password-based key derivation, and hashing

**Package:** `@robinpath/encrypt` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `encrypt` module when you need to:

- **Encrypt text with AES using a password (auto-generates salt/IV)** -- Use `encrypt.aesEncrypt` to perform this operation
- **Decrypt AES-encrypted data using a password** -- Use `encrypt.aesDecrypt` to perform this operation
- **Encrypt text with a raw hex key (for advanced use)** -- Use `encrypt.aesEncryptRaw` to perform this operation
- **Generate a cryptographically secure random key** -- Use `encrypt.generateKey` to perform this operation
- **Generate an RSA key pair** -- Use `encrypt.rsaGenerateKeys` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`aesEncrypt`](#aesencrypt) | Encrypt text with AES using a password (auto-generates salt/IV) | `{encrypted, iv, salt, algorithm, tag}` |
| [`aesDecrypt`](#aesdecrypt) | Decrypt AES-encrypted data using a password | `Decrypted plaintext` |
| [`aesEncryptRaw`](#aesencryptraw) | Encrypt text with a raw hex key (for advanced use) | `{encrypted, iv, algorithm, tag}` |
| [`generateKey`](#generatekey) | Generate a cryptographically secure random key | `Hex-encoded random key` |
| [`rsaGenerateKeys`](#rsageneratekeys) | Generate an RSA key pair | `{publicKey, privateKey} in PEM format` |
| [`rsaEncrypt`](#rsaencrypt) | Encrypt text with an RSA public key | `Base64-encoded ciphertext` |
| [`rsaDecrypt`](#rsadecrypt) | Decrypt RSA-encrypted text with a private key | `Decrypted plaintext` |
| [`hash`](#hash) | Hash a string (sha256, sha512, md5, etc.) | `Hex digest` |
| [`deriveKey`](#derivekey) | Derive an encryption key from a password using scrypt | `{key, salt}` |
| [`randomIv`](#randomiv) | Generate a random initialization vector | `Hex-encoded IV` |


## Functions

### aesEncrypt

Encrypt text with AES using a password (auto-generates salt/IV)

**Module:** `encrypt` | **Returns:** `object` -- {encrypted, iv, salt, algorithm, tag}

```robinpath
encrypt.aesEncrypt "secret data" "my-password"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `plaintext` | `string` | Yes | Text to encrypt |
| `password` | `string` | Yes | Encryption password |
| `algorithm` | `string` | No | AES algorithm (default aes-256-gcm) |

---

### aesDecrypt

Decrypt AES-encrypted data using a password

**Module:** `encrypt` | **Returns:** `string` -- Decrypted plaintext

```robinpath
encrypt.aesDecrypt $encryptedData "my-password"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | Yes | Encrypted data object from aesEncrypt |
| `password` | `string` | Yes | Decryption password |

---

### aesEncryptRaw

Encrypt text with a raw hex key (for advanced use)

**Module:** `encrypt` | **Returns:** `object` -- {encrypted, iv, algorithm, tag}

```robinpath
encrypt.aesEncryptRaw "data" $hexKey
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `plaintext` | `string` | Yes | Text to encrypt |
| `key` | `string` | Yes | Hex-encoded key (32 bytes for AES-256) |
| `algorithm` | `string` | No | AES algorithm |

---

### generateKey

Generate a cryptographically secure random key

**Module:** `encrypt` | **Returns:** `string` -- Hex-encoded random key

```robinpath
encrypt.generateKey 256
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bits` | `number` | No | Key size in bits (128, 192, 256) |

---

### rsaGenerateKeys

Generate an RSA key pair

**Module:** `encrypt` | **Returns:** `object` -- {publicKey, privateKey} in PEM format

```robinpath
encrypt.rsaGenerateKeys 4096
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bits` | `number` | No | Key size (2048, 4096) |

---

### rsaEncrypt

Encrypt text with an RSA public key

**Module:** `encrypt` | **Returns:** `string` -- Base64-encoded ciphertext

```robinpath
encrypt.rsaEncrypt "secret" $publicKey
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `plaintext` | `string` | Yes | Text to encrypt |
| `publicKey` | `string` | Yes | PEM-encoded public key |

---

### rsaDecrypt

Decrypt RSA-encrypted text with a private key

**Module:** `encrypt` | **Returns:** `string` -- Decrypted plaintext

```robinpath
encrypt.rsaDecrypt $encrypted $privateKey
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ciphertext` | `string` | Yes | Base64-encoded ciphertext |
| `privateKey` | `string` | Yes | PEM-encoded private key |

---

### hash

Hash a string (sha256, sha512, md5, etc.)

**Module:** `encrypt` | **Returns:** `string` -- Hex digest

```robinpath
encrypt.hash "my data" "sha512"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `string` | Yes | Data to hash |
| `algorithm` | `string` | No | Hash algorithm (default sha256) |

---

### deriveKey

Derive an encryption key from a password using scrypt

**Module:** `encrypt` | **Returns:** `object` -- {key, salt}

```robinpath
encrypt.deriveKey "my-password"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `password` | `string` | Yes | Password |
| `salt` | `string` | No | Salt (auto-generated if omitted) |
| `keyLength` | `number` | No | Key length in bytes (default 32) |

---

### randomIv

Generate a random initialization vector

**Module:** `encrypt` | **Returns:** `string` -- Hex-encoded IV

```robinpath
encrypt.randomIv 12
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bytes` | `number` | No | IV size in bytes (default 16) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as encrypt.aesEncrypt "secret data" "my-password"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Encrypt workflow

Chain multiple encrypt operations together.

```robinpath
set $r_aesEncrypt as encrypt.aesEncrypt "secret data" "my-password"
set $r_aesDecrypt as encrypt.aesDecrypt $encryptedData "my-password"
set $r_aesEncryptRaw as encrypt.aesEncryptRaw "data" $hexKey
print "All operations complete"
```

### 2. Safe aesEncrypt with validation

Check results before proceeding.

```robinpath
set $result as encrypt.aesEncrypt "secret data" "my-password"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
