---
title: "API"
module: "api"
package: "@robinpath/api"
description: "HTTP client for making requests to external APIs with profiles, auth, download/upload, and auto-JSON parsing"
category: "web"
tags: [api, web]
type: "utility"
auth: "api-key"
functionCount: 12
---

# API

> HTTP client for making requests to external APIs with profiles, auth, download/upload, and auto-JSON parsing

**Package:** `@robinpath/api` | **Category:** Web | **Type:** Utility


## Authentication

```robinpath
api.setAuth "github" "bearer" "ghp_xxxxxxxxxxxx"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `api` module when you need to:

- **Send a GET request to a URL and return the response body (auto-parses JSON)** -- Use `api.get` to perform this operation
- **Send a POST request with a JSON body** -- Use `api.post` to perform this operation
- **Send a PUT request with a JSON body** -- Use `api.put` to perform this operation
- **Send a PATCH request with a partial JSON body** -- Use `api.patch` to perform this operation
- **Send a DELETE request** -- Use `api.delete` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`get`](#get) | Send a GET request to a URL and return the response body (auto-parses JSON) | `Parsed JSON body, text string, or full response object if fullResponse is true` |
| [`post`](#post) | Send a POST request with a JSON body | `Parsed JSON body or text string` |
| [`put`](#put) | Send a PUT request with a JSON body | `Parsed JSON body or text string` |
| [`patch`](#patch) | Send a PATCH request with a partial JSON body | `Parsed JSON body or text string` |
| [`delete`](#delete) | Send a DELETE request | `Parsed JSON body or text string` |
| [`head`](#head) | Send a HEAD request and return response headers only | `Response headers as key-value object` |
| [`download`](#download) | Download a file from a URL and save it to disk | `{path, size, contentType}` |
| [`upload`](#upload) | Upload a file as multipart/form-data | `{status, ok, body}` |
| [`createProfile`](#createprofile) | Create a named API profile with base URL, default headers, and timeout | `The created profile configuration` |
| [`setAuth`](#setauth) | Set authentication on an existing profile | `{profileId, auth}` |
| [`setHeaders`](#setheaders) | Merge additional default headers into an existing profile | `{profileId, headers}` |
| [`request`](#request) | Send a generic HTTP request with an explicit method string | `Parsed JSON body, text string, or full response object` |


## Functions

### get

Send a GET request to a URL and return the response body (auto-parses JSON)

**Module:** `api` | **Returns:** `any` -- Parsed JSON body, text string, or full response object if fullResponse is true

```robinpath
api.get "https://api.example.com/users"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Request URL (absolute, or relative if profile has baseUrl) |
| `options` | `object` | No | {profile, headers, timeout, fullResponse} |

---

### post

Send a POST request with a JSON body

**Module:** `api` | **Returns:** `any` -- Parsed JSON body or text string

```robinpath
api.post "https://api.example.com/users" {"name": "Alice", "email": "alice@example.com"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Request URL |
| `body` | `any` | Yes | Request body (objects auto-serialized to JSON) |
| `options` | `object` | No | {profile, headers, timeout, fullResponse} |

---

### put

Send a PUT request with a JSON body

**Module:** `api` | **Returns:** `any` -- Parsed JSON body or text string

```robinpath
api.put "https://api.example.com/users/1" {"name": "Bob"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Request URL |
| `body` | `any` | Yes | Request body (objects auto-serialized to JSON) |
| `options` | `object` | No | {profile, headers, timeout, fullResponse} |

---

### patch

Send a PATCH request with a partial JSON body

**Module:** `api` | **Returns:** `any` -- Parsed JSON body or text string

```robinpath
api.patch "https://api.example.com/users/1" {"email": "new@example.com"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Request URL |
| `body` | `any` | Yes | Partial update body |
| `options` | `object` | No | {profile, headers, timeout, fullResponse} |

---

### delete

Send a DELETE request

**Module:** `api` | **Returns:** `any` -- Parsed JSON body or text string

```robinpath
api.delete "https://api.example.com/users/1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Request URL |
| `options` | `object` | No | {profile, headers, timeout, fullResponse} |

---

### head

Send a HEAD request and return response headers only

**Module:** `api` | **Returns:** `object` -- Response headers as key-value object

```robinpath
api.head "https://api.example.com/files/doc.pdf"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Request URL |
| `options` | `object` | No | {profile, headers, timeout} |

---

### download

Download a file from a URL and save it to disk

**Module:** `api` | **Returns:** `object` -- {path, size, contentType}

```robinpath
api.download "https://example.com/report.pdf" "./report.pdf"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | URL of the file to download |
| `filePath` | `string` | Yes | Local path to save the file |
| `options` | `object` | No | {profile, headers, timeout} |

---

### upload

Upload a file as multipart/form-data

**Module:** `api` | **Returns:** `object` -- {status, ok, body}

```robinpath
api.upload "https://api.example.com/upload" "./photo.jpg" "image"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Upload endpoint URL |
| `filePath` | `string` | Yes | Local path of the file to upload |
| `fieldName` | `string` | No | Form field name (default: 'file') |
| `options` | `object` | No | {profile, headers, timeout, fields} |

---

### createProfile

Create a named API profile with base URL, default headers, and timeout

**Module:** `api` | **Returns:** `object` -- The created profile configuration

```robinpath
api.createProfile "github" {"baseUrl": "https://api.github.com", "headers": {"Accept": "application/vnd.github.v3+json"}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Unique profile identifier |
| `options` | `object` | Yes | {baseUrl, headers, timeout} |

---

### setAuth

Set authentication on an existing profile

**Module:** `api` | **Returns:** `object` -- {profileId, auth}

```robinpath
api.setAuth "github" "bearer" "ghp_xxxxxxxxxxxx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `profileId` | `string` | Yes | Profile ID to configure |
| `type` | `string` | Yes | Auth type: 'bearer', 'basic', or 'apikey' |
| `token` | `string` | Yes | Auth token or credentials (for basic: 'user:pass') |
| `options` | `object` | No | {headerName} — custom header name for apikey auth |

---

### setHeaders

Merge additional default headers into an existing profile

**Module:** `api` | **Returns:** `object` -- {profileId, headers}

```robinpath
api.setHeaders "github" {"X-Custom": "value"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `profileId` | `string` | Yes | Profile ID to update |
| `headers` | `object` | Yes | Headers to merge into profile defaults |

---

### request

Send a generic HTTP request with an explicit method string

**Module:** `api` | **Returns:** `any` -- Parsed JSON body, text string, or full response object

```robinpath
api.request "OPTIONS" "https://api.example.com/resource"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `method` | `string` | Yes | HTTP method (GET, POST, PUT, PATCH, DELETE, etc.) |
| `url` | `string` | Yes | Request URL |
| `options` | `object` | No | {body, profile, headers, timeout, fullResponse} |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `URL is required` | Check the error message for details |
| `File path is required` | Check the error message for details |
| `Download failed: ${response.status} ${response.statusText}` | Check the error message for details |
| `Profile ID is required` | Check the error message for details |
| `Auth type is required` | Check the error message for details |
| `Token is required` | Check the error message for details |
| `Invalid auth type "...". Must be "bearer", "basic", or "apikey".` | Check the error message for details |
| `Profile "..." not found. Create it first with api.createProfile.` | Check the error message for details |

```robinpath
set $result as api.get "https://api.example.com/users"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate 

Retrieve all items and loop through them.

```robinpath
api.setAuth $token
set $result as api.get "https://api.example.com/users"
each $item in $result
  print $item
end
```

### 2. Create a new item with post

Create a new resource and capture the result.

```robinpath
api.setAuth $token
set $result as api.post "https://api.example.com/users" {"name": "Alice", "email": "alice@example.com"}
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
api.setAuth $token
set $existing as api.get "https://api.example.com/users"
if $existing == null
  api.post "https://api.example.com/users" {"name": "Alice", "email": "alice@example.com"}
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step API workflow

Chain multiple api operations together.

```robinpath
api.setAuth $token
set $r_get as api.get "https://api.example.com/users"
set $r_post as api.post "https://api.example.com/users" {"name": "Alice", "email": "alice@example.com"}
set $r_put as api.put "https://api.example.com/users/1" {"name": "Bob"}
print "All operations complete"
```

### 5. Safe get with validation

Check results before proceeding.

```robinpath
api.setAuth $token
set $result as api.get "https://api.example.com/users"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
