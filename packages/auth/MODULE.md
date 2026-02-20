---
title: "Auth"
module: "auth"
package: "@robinpath/auth"
description: "API authentication helpers: Basic, Bearer, API key, HMAC signing, and password hashing"
category: "web"
tags: [auth, web, api]
type: "utility"
auth: "none"
functionCount: 12
---

# Auth

> API authentication helpers: Basic, Bearer, API key, HMAC signing, and password hashing

**Package:** `@robinpath/auth` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `auth` module when you need to:

- **Create a Basic authentication header from username and password** -- Use `auth.basic` to perform this operation
- **Parse a Basic auth header to extract username and password** -- Use `auth.parseBasic` to perform this operation
- **Create a Bearer authentication header from a token** -- Use `auth.bearer` to perform this operation
- **Extract the token from a Bearer auth header** -- Use `auth.parseBearer` to perform this operation
- **Create an API key configuration for header or query parameter placement** -- Use `auth.apiKey` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`basic`](#basic) | Create a Basic authentication header from username and password | `Basic auth header string (e.g. 'Basic dXNlcjpwYXNz')` |
| [`parseBasic`](#parsebasic) | Parse a Basic auth header to extract username and password | `{username, password}` |
| [`bearer`](#bearer) | Create a Bearer authentication header from a token | `Bearer auth header string` |
| [`parseBearer`](#parsebearer) | Extract the token from a Bearer auth header | `The extracted token string` |
| [`apiKey`](#apikey) | Create an API key configuration for header or query parameter placement | `{type, name, value} object for use in HTTP requests` |
| [`hmacSign`](#hmacsign) | Create an HMAC signature for a payload | `Hex-encoded HMAC signature` |
| [`hmacVerify`](#hmacverify) | Verify an HMAC signature using timing-safe comparison | `True if the signature is valid` |
| [`generateApiKey`](#generateapikey) | Generate a cryptographically secure random API key | `Random hex API key, optionally prefixed` |
| [`hashPassword`](#hashpassword) | Hash a password using PBKDF2 with a random salt | `Hash string in format salt:iterations:hash` |
| [`verifyPassword`](#verifypassword) | Verify a password against a PBKDF2 hash (timing-safe) | `True if the password matches the hash` |
| [`buildAuthHeader`](#buildauthheader) | Build an Authorization header from a type and credentials | `Complete Authorization header value` |
| [`parseAuthHeader`](#parseauthheader) | Parse any Authorization header into its scheme and credentials | `Object with scheme and decoded credentials` |


## Functions

### basic

Create a Basic authentication header from username and password

**Module:** `auth` | **Returns:** `string` -- Basic auth header string (e.g. 'Basic dXNlcjpwYXNz')

```robinpath
auth.basic "user" "pass"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | `string` | Yes | Username |
| `password` | `string` | Yes | Password |

---

### parseBasic

Parse a Basic auth header to extract username and password

**Module:** `auth` | **Returns:** `object` -- {username, password}

```robinpath
auth.parseBasic "Basic dXNlcjpwYXNz"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `header` | `string` | Yes | The Authorization header value |

---

### bearer

Create a Bearer authentication header from a token

**Module:** `auth` | **Returns:** `string` -- Bearer auth header string

```robinpath
auth.bearer "eyJhbGciOi..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | `string` | Yes | The bearer token |

---

### parseBearer

Extract the token from a Bearer auth header

**Module:** `auth` | **Returns:** `string` -- The extracted token string

```robinpath
auth.parseBearer "Bearer eyJhbGciOi..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `header` | `string` | Yes | The Authorization header value |

---

### apiKey

Create an API key configuration for header or query parameter placement

**Module:** `auth` | **Returns:** `object` -- {type, name, value} object for use in HTTP requests

```robinpath
auth.apiKey "sk-abc123" "header" "Authorization"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | The API key value |
| `placement` | `string` | No | 'header' or 'query' (default: header) |
| `name` | `string` | No | Header or query param name (default: X-API-Key) |

---

### hmacSign

Create an HMAC signature for a payload

**Module:** `auth` | **Returns:** `string` -- Hex-encoded HMAC signature

```robinpath
auth.hmacSign "payload" "secret" "sha256"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `payload` | `string` | Yes | The payload to sign |
| `secret` | `string` | Yes | The secret key |
| `algorithm` | `string` | No | Hash algorithm (default: sha256) |

---

### hmacVerify

Verify an HMAC signature using timing-safe comparison

**Module:** `auth` | **Returns:** `boolean` -- True if the signature is valid

```robinpath
auth.hmacVerify "payload" "secret" "abc123def..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `payload` | `string` | Yes | The original payload |
| `secret` | `string` | Yes | The secret key |
| `signature` | `string` | Yes | The hex signature to verify |
| `algorithm` | `string` | No | Hash algorithm (default: sha256) |

---

### generateApiKey

Generate a cryptographically secure random API key

**Module:** `auth` | **Returns:** `string` -- Random hex API key, optionally prefixed

```robinpath
auth.generateApiKey 32 "sk"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `length` | `number` | No | Key length in bytes (default 32) |
| `prefix` | `string` | No | Optional prefix (e.g. 'sk', 'pk') |

---

### hashPassword

Hash a password using PBKDF2 with a random salt

**Module:** `auth` | **Returns:** `string` -- Hash string in format salt:iterations:hash

```robinpath
auth.hashPassword "my-secret-password"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `password` | `string` | Yes | The password to hash |
| `iterations` | `number` | No | PBKDF2 iterations (default 100000) |

---

### verifyPassword

Verify a password against a PBKDF2 hash (timing-safe)

**Module:** `auth` | **Returns:** `boolean` -- True if the password matches the hash

```robinpath
auth.verifyPassword "my-secret-password" $storedHash
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `password` | `string` | Yes | The password to verify |
| `hash` | `string` | Yes | The stored hash (salt:iterations:hash) |

---

### buildAuthHeader

Build an Authorization header from a type and credentials

**Module:** `auth` | **Returns:** `string` -- Complete Authorization header value

```robinpath
auth.buildAuthHeader "bearer" $token
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `string` | Yes | Auth type: basic, bearer, apikey |
| `value` | `any` | Yes | Token string or {username, password} for basic |

---

### parseAuthHeader

Parse any Authorization header into its scheme and credentials

**Module:** `auth` | **Returns:** `object` -- Object with scheme and decoded credentials

```robinpath
auth.parseAuthHeader $header
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `header` | `string` | Yes | The Authorization header value |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Invalid Basic auth header` | Check the error message for details |
| `Invalid Basic auth credentials` | Check the error message for details |
| `Invalid Bearer auth header` | Check the error message for details |
| `Invalid hash format. Expected salt:iterations:hash` | Check the error message for details |
| `Invalid placement: "...". Use "header" or "query".` | Check the error message for details |

```robinpath
set $result as auth.basic "user" "pass"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Auth workflow

Chain multiple auth operations together.

```robinpath
set $r_basic as auth.basic "user" "pass"
set $r_parseBasic as auth.parseBasic "Basic dXNlcjpwYXNz"
set $r_bearer as auth.bearer "eyJhbGciOi..."
print "All operations complete"
```

### 2. Safe basic with validation

Check results before proceeding.

```robinpath
set $result as auth.basic "user" "pass"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
