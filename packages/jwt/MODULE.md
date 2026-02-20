---
title: "JWT"
module: "jwt"
package: "@robinpath/jwt"
description: "JWT (JSON Web Token) creation, signing, verification, and decoding using HMAC (HS256, HS384, HS512)"
category: "web"
tags: [jwt, web]
type: "utility"
auth: "none"
functionCount: 7
---

# JWT

> JWT (JSON Web Token) creation, signing, verification, and decoding using HMAC (HS256, HS384, HS512)

**Package:** `@robinpath/jwt` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `jwt` module when you need to:

- **Create a signed JWT token from a payload object using HMAC (HS256, HS384, or HS512)** -- Use `jwt.sign` to perform this operation
- **Verify a JWT token signature and expiration, returning the decoded payload** -- Use `jwt.verify` to perform this operation
- **Decode a JWT token WITHOUT verifying its signature (unsafe — use for inspection only)** -- Use `jwt.decode` to perform this operation
- **Extract and decode the header from a JWT token (no verification)** -- Use `jwt.getHeader` to perform this operation
- **Extract and decode the payload from a JWT token without verification** -- Use `jwt.getPayload` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`sign`](#sign) | Create a signed JWT token from a payload object using HMAC (HS256, HS384, or HS512) | `The signed JWT token string (header.payload.signature)` |
| [`verify`](#verify) | Verify a JWT token signature and expiration, returning the decoded payload | `The decoded payload object if the token is valid` |
| [`decode`](#decode) | Decode a JWT token WITHOUT verifying its signature (unsafe — use for inspection only) | `An object containing { header, payload, signature }` |
| [`getHeader`](#getheader) | Extract and decode the header from a JWT token (no verification) | `The decoded header object (e.g. { alg: "HS256", typ: "JWT" })` |
| [`getPayload`](#getpayload) | Extract and decode the payload from a JWT token without verification | `The decoded payload object with all claims` |
| [`isExpired`](#isexpired) | Check whether a JWT token has expired based on its exp claim | `True if the token is expired, false if it is still valid or has no exp claim` |
| [`getExpiration`](#getexpiration) | Get the expiration timestamp (exp claim) from a JWT token | `The exp timestamp as a number (Unix epoch seconds), or null if not set` |


## Functions

### sign

Create a signed JWT token from a payload object using HMAC (HS256, HS384, or HS512)

**Module:** `jwt` | **Returns:** `string` -- The signed JWT token string (header.payload.signature)

```robinpath
jwt.sign {"sub":"1234","name":"Alice"} "my-secret" {"expiresIn":3600}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `payload` | `object` | Yes | The claims object to encode in the JWT |
| `secret` | `string` | Yes | The HMAC secret key used to sign the token |
| `options` | `object` | No | Optional settings: { algorithm: "HS256"|"HS384"|"HS512", expiresIn: seconds } |

---

### verify

Verify a JWT token signature and expiration, returning the decoded payload

**Module:** `jwt` | **Returns:** `object` -- The decoded payload object if the token is valid

```robinpath
jwt.verify "eyJhbGciOiJIUzI1NiJ9..." "my-secret"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | `string` | Yes | The JWT token string to verify |
| `secret` | `string` | Yes | The HMAC secret key used to verify the token signature |
| `options` | `object` | No | Optional settings: { algorithms: ["HS256","HS384","HS512"] } |

---

### decode

Decode a JWT token WITHOUT verifying its signature (unsafe — use for inspection only)

**Module:** `jwt` | **Returns:** `object` -- An object containing { header, payload, signature }

```robinpath
jwt.decode "eyJhbGciOiJIUzI1NiJ9..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | `string` | Yes | The JWT token string to decode |

---

### getHeader

Extract and decode the header from a JWT token (no verification)

**Module:** `jwt` | **Returns:** `object` -- The decoded header object (e.g. { alg: "HS256", typ: "JWT" })

```robinpath
jwt.getHeader "eyJhbGciOiJIUzI1NiJ9..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | `string` | Yes | The JWT token string |

---

### getPayload

Extract and decode the payload from a JWT token without verification

**Module:** `jwt` | **Returns:** `object` -- The decoded payload object with all claims

```robinpath
jwt.getPayload "eyJhbGciOiJIUzI1NiJ9..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | `string` | Yes | The JWT token string |

---

### isExpired

Check whether a JWT token has expired based on its exp claim

**Module:** `jwt` | **Returns:** `boolean` -- True if the token is expired, false if it is still valid or has no exp claim

```robinpath
jwt.isExpired "eyJhbGciOiJIUzI1NiJ9..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | `string` | Yes | The JWT token string |

---

### getExpiration

Get the expiration timestamp (exp claim) from a JWT token

**Module:** `jwt` | **Returns:** `number` -- The exp timestamp as a number (Unix epoch seconds), or null if not set

```robinpath
jwt.getExpiration "eyJhbGciOiJIUzI1NiJ9..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | `string` | Yes | The JWT token string |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Unsupported algorithm: ${algorithm}` | Check the error message for details |
| `Invalid JWT: token must have three parts separated by dots` | Check the error message for details |
| `jwt.sign: first argument must be a payload object` | Check the error message for details |
| `jwt.sign: second argument must be a non-empty secret string` | Check the error message for details |
| `jwt.verify: first argument must be a JWT token string` | Check the error message for details |
| `jwt.verify: second argument must be a non-empty secret string` | Check the error message for details |
| `jwt.verify: invalid JWT — token must have three parts` | Check the error message for details |
| `jwt.verify: invalid signature` | Check the error message for details |

```robinpath
set $result as jwt.sign {"sub":"1234","name":"Alice"} "my-secret" {"expiresIn":3600}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Header

Retrieve all items and loop through them.

```robinpath
set $result as jwt.getHeader "eyJhbGciOiJIUzI1NiJ9..."
each $item in $result
  print $item
end
```

### 2. Multi-step JWT workflow

Chain multiple jwt operations together.

```robinpath
set $r_sign as jwt.sign {"sub":"1234","name":"Alice"} "my-secret" {"expiresIn":3600}
set $r_verify as jwt.verify "eyJhbGciOiJIUzI1NiJ9..." "my-secret"
set $r_decode as jwt.decode "eyJhbGciOiJIUzI1NiJ9..."
print "All operations complete"
```

### 3. Safe sign with validation

Check results before proceeding.

```robinpath
set $result as jwt.sign {"sub":"1234","name":"Alice"} "my-secret" {"expiresIn":3600}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
