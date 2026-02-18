---
title: "OAuth"
module: "oauth"
package: "@robinpath/oauth"
description: "OAuth 2.0 authorization flows: auth URL, code exchange, refresh, client credentials, PKCE, token management"
category: "web"
tags: [oauth, web]
type: "utility"
auth: "oauth"
functionCount: 11
---

# OAuth

> OAuth 2.0 authorization flows: auth URL, code exchange, refresh, client credentials, PKCE, token management

**Package:** `@robinpath/oauth` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `oauth` module when you need to:

- **Build an OAuth 2.0 authorization URL with required parameters** -- Use `oauth.authUrl` to perform this operation
- **Exchange an authorization code for access and refresh tokens** -- Use `oauth.exchangeCode` to perform this operation
- **Refresh an expired access token using a refresh token** -- Use `oauth.refreshToken` to perform this operation
- **Get an access token using the client credentials grant (machine-to-machine)** -- Use `oauth.clientCredentials` to perform this operation
- **Generate a cryptographically random PKCE code verifier** -- Use `oauth.pkceVerifier` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`authUrl`](#authurl) | Build an OAuth 2.0 authorization URL with required parameters | `Complete authorization URL` |
| [`exchangeCode`](#exchangecode) | Exchange an authorization code for access and refresh tokens | `{accessToken, refreshToken, tokenType, expiresIn, scope}` |
| [`refreshToken`](#refreshtoken) | Refresh an expired access token using a refresh token | `{accessToken, refreshToken, tokenType, expiresIn}` |
| [`clientCredentials`](#clientcredentials) | Get an access token using the client credentials grant (machine-to-machine) | `{accessToken, tokenType, expiresIn, scope}` |
| [`pkceVerifier`](#pkceverifier) | Generate a cryptographically random PKCE code verifier | `URL-safe base64 encoded verifier string` |
| [`pkceChallenge`](#pkcechallenge) | Generate a PKCE code challenge from a verifier | `{challenge, method}` |
| [`getToken`](#gettoken) | Retrieve a stored OAuth token by name | `{accessToken, refreshToken, tokenType, expired, expiresAt, scope} or null` |
| [`isExpired`](#isexpired) | Check if a stored token is expired (with buffer time) | `True if token is expired or will expire within buffer` |
| [`generateState`](#generatestate) | Generate a cryptographically random state parameter for CSRF protection | `Random hex string` |
| [`revokeToken`](#revoketoken) | Revoke an OAuth token at the provider's revocation endpoint | `{revoked: boolean, status: number}` |
| [`clearTokens`](#cleartokens) | Clear stored tokens by name or all tokens | `True if cleared` |


## Functions

### authUrl

Build an OAuth 2.0 authorization URL with required parameters

**Module:** `oauth` | **Returns:** `string` -- Complete authorization URL

```robinpath
oauth.authUrl "https://accounts.google.com/o/oauth2/v2/auth" {"clientId": "...", "scope": "email profile"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `baseUrl` | `string` | Yes | Authorization endpoint URL |
| `options` | `object` | Yes | {clientId, redirectUri, scope, state, responseType, codeChallenge, codeChallengeMethod, accessType, prompt} |

---

### exchangeCode

Exchange an authorization code for access and refresh tokens

**Module:** `oauth` | **Returns:** `object` -- {accessToken, refreshToken, tokenType, expiresIn, scope}

```robinpath
oauth.exchangeCode "https://oauth2.googleapis.com/token" {"code": "...", "clientId": "..."}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tokenUrl` | `string` | Yes | Token endpoint URL |
| `options` | `object` | Yes | {code, clientId, clientSecret, redirectUri, codeVerifier, name} |

---

### refreshToken

Refresh an expired access token using a refresh token

**Module:** `oauth` | **Returns:** `object` -- {accessToken, refreshToken, tokenType, expiresIn}

```robinpath
oauth.refreshToken "https://oauth2.googleapis.com/token" {"name": "google", "clientId": "..."}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tokenUrl` | `string` | Yes | Token endpoint URL |
| `options` | `object` | Yes | {refreshToken, clientId, clientSecret, scope, name} |

---

### clientCredentials

Get an access token using the client credentials grant (machine-to-machine)

**Module:** `oauth` | **Returns:** `object` -- {accessToken, tokenType, expiresIn, scope}

```robinpath
oauth.clientCredentials "https://api.example.com/oauth/token" {"clientId": "...", "clientSecret": "..."}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tokenUrl` | `string` | Yes | Token endpoint URL |
| `options` | `object` | Yes | {clientId, clientSecret, scope, name} |

---

### pkceVerifier

Generate a cryptographically random PKCE code verifier

**Module:** `oauth` | **Returns:** `string` -- URL-safe base64 encoded verifier string

```robinpath
oauth.pkceVerifier 64
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `length` | `number` | No | Verifier length 43-128 (default 64) |

---

### pkceChallenge

Generate a PKCE code challenge from a verifier

**Module:** `oauth` | **Returns:** `object` -- {challenge, method}

```robinpath
oauth.pkceChallenge $verifier "S256"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `verifier` | `string` | Yes | The code verifier |
| `method` | `string` | No | 'S256' or 'plain' (default S256) |

---

### getToken

Retrieve a stored OAuth token by name

**Module:** `oauth` | **Returns:** `object` -- {accessToken, refreshToken, tokenType, expired, expiresAt, scope} or null

```robinpath
oauth.getToken "google"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Token store name |

---

### isExpired

Check if a stored token is expired (with buffer time)

**Module:** `oauth` | **Returns:** `boolean` -- True if token is expired or will expire within buffer

```robinpath
oauth.isExpired "google" 120000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Token store name |
| `bufferMs` | `number` | No | Buffer time in ms before expiry (default 60000) |

---

### generateState

Generate a cryptographically random state parameter for CSRF protection

**Module:** `oauth` | **Returns:** `string` -- Random hex string

```robinpath
oauth.generateState
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `length` | `number` | No | State length in bytes (default 32) |

---

### revokeToken

Revoke an OAuth token at the provider's revocation endpoint

**Module:** `oauth` | **Returns:** `object` -- {revoked: boolean, status: number}

```robinpath
oauth.revokeToken "https://oauth2.googleapis.com/revoke" {"name": "google"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `revokeUrl` | `string` | Yes | Revocation endpoint URL |
| `options` | `object` | Yes | {token, name, tokenTypeHint, clientId, clientSecret} |

---

### clearTokens

Clear stored tokens by name or all tokens

**Module:** `oauth` | **Returns:** `boolean` -- True if cleared

```robinpath
oauth.clearTokens "google"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | No | Token name to clear (omit to clear all) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Authorization URL is required` | Check the error message for details |
| `Token URL is required` | Check the error message for details |
| `Refresh token is required` | Check the error message for details |
| `OAuth refresh failed: ${data.error ?? response.statusText}` | Check the error message for details |
| `OAuth client credentials failed: ${data.error ?? response.statusText}` | Check the error message for details |
| `Revoke URL is required` | Check the error message for details |
| `Token is required` | Check the error message for details |
| `OAuth token exchange failed: ... - ...` | Check the error message for details |

```robinpath
set $result as oauth.authUrl "https://accounts.google.com/o/oauth2/v2/auth" {"clientId": "...", "scope": "email profile"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Token

Retrieve all items and loop through them.

```robinpath
set $result as oauth.getToken "google"
each $item in $result
  print $item
end
```

### 2. Multi-step OAuth workflow

Chain multiple oauth operations together.

```robinpath
set $r_authUrl as oauth.authUrl "https://accounts.google.com/o/oauth2/v2/auth" {"clientId": "...", "scope": "email profile"}
set $r_exchangeCode as oauth.exchangeCode "https://oauth2.googleapis.com/token" {"code": "...", "clientId": "..."}
set $r_refreshToken as oauth.refreshToken "https://oauth2.googleapis.com/token" {"name": "google", "clientId": "..."}
print "All operations complete"
```

### 3. Safe authUrl with validation

Check results before proceeding.

```robinpath
set $result as oauth.authUrl "https://accounts.google.com/o/oauth2/v2/auth" {"clientId": "...", "scope": "email profile"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
