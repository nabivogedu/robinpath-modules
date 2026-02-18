---
title: "HTTP"
module: "http"
package: "@robinpath/http"
description: "HTTP server for RobinPath scripts. Register routes with static responses (JSON, HTML, files), enable CORS, serve static directories. No callbacks needed."
category: "web"
tags: [http, web]
type: "utility"
auth: "none"
functionCount: 14
---

# HTTP

> HTTP server for RobinPath scripts. Register routes with static responses (JSON, HTML, files), enable CORS, serve static directories. No callbacks needed.

**Package:** `@robinpath/http` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `http` module when you need to:

- **Create a new HTTP server instance (does not start listening yet)** -- Use `http.createServer` to perform this operation
- **Register a GET route that returns static JSON data** -- Use `http.get` to perform this operation
- **Register a POST route that returns static JSON data** -- Use `http.post` to perform this operation
- **Register a PUT route that returns static JSON data** -- Use `http.put` to perform this operation
- **Register a DELETE route that returns static JSON data** -- Use `http.delete` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`createServer`](#createserver) | Create a new HTTP server instance (does not start listening yet) | `Server creation info` |
| [`get`](#get) | Register a GET route that returns static JSON data | `Route registration info` |
| [`post`](#post) | Register a POST route that returns static JSON data | `Route registration info` |
| [`put`](#put) | Register a PUT route that returns static JSON data | `Route registration info` |
| [`delete`](#delete) | Register a DELETE route that returns static JSON data | `Route registration info` |
| [`html`](#html) | Register a GET route that serves an HTML string | `Route registration info` |
| [`file`](#file) | Register a GET route that serves a file from disk | `Route registration info` |
| [`redirect`](#redirect) | Register a route that redirects to another URL | `Route registration info` |
| [`static`](#static) | Register a directory to serve static files from | `Static directory registration info` |
| [`cors`](#cors) | Enable CORS on the server | `CORS configuration info` |
| [`listen`](#listen) | Start the HTTP server listening for requests | `Server listening info with URL` |
| [`stop`](#stop) | Stop the HTTP server gracefully | `Server stop confirmation` |
| [`status`](#status) | Get server status: port, routes, listening state, request count | `Server status info` |
| [`logs`](#logs) | Get the request log for a server | `Array of request log entries` |


## Functions

### createServer

Create a new HTTP server instance (does not start listening yet)

**Module:** `http` | **Returns:** `object` -- Server creation info

```robinpath
any "myapi" {"port": 8080}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Unique server identifier |
| `opts` | `object` | No | Options: {port?, host?, logRequests?} |

---

### get

Register a GET route that returns static JSON data

**Module:** `http` | **Returns:** `object` -- Route registration info

```robinpath
any "myapi" "/api/products" [{"id": 1}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Server ID |
| `path` | `string` | Yes | URL path pattern |
| `data` | `any` | Yes | JSON data to return |
| `opts` | `object` | No | Options: {status?, headers?} |

---

### post

Register a POST route that returns static JSON data

**Module:** `http` | **Returns:** `object` -- Route registration info

```robinpath
any "myapi" "/api/products" {"created": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Server ID |
| `path` | `string` | Yes | URL path pattern |
| `data` | `any` | Yes | JSON data to return |
| `opts` | `object` | No | Options: {status?, headers?} |

---

### put

Register a PUT route that returns static JSON data

**Module:** `http` | **Returns:** `object` -- Route registration info

```robinpath
any "myapi" "/api/products/:id" {"updated": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Server ID |
| `path` | `string` | Yes | URL path pattern |
| `data` | `any` | Yes | JSON data to return |
| `opts` | `object` | No | Options: {status?, headers?} |

---

### delete

Register a DELETE route that returns static JSON data

**Module:** `http` | **Returns:** `object` -- Route registration info

```robinpath
any "myapi" "/api/products/:id" {"deleted": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Server ID |
| `path` | `string` | Yes | URL path pattern |
| `data` | `any` | Yes | JSON data to return |
| `opts` | `object` | No | Options: {status?, headers?} |

---

### html

Register a GET route that serves an HTML string

**Module:** `http` | **Returns:** `object` -- Route registration info

```robinpath
any "myapi" "/" "Hello World"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Server ID |
| `path` | `string` | Yes | URL path |
| `content` | `string` | Yes | HTML string to serve |
| `opts` | `object` | No | Options: {status?, headers?} |

---

### file

Register a GET route that serves a file from disk

**Module:** `http` | **Returns:** `object` -- Route registration info

```robinpath
any "myapi" "/report" "C:/reports/report.pdf"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Server ID |
| `path` | `string` | Yes | URL path |
| `filePath` | `string` | Yes | Absolute file path on disk |
| `opts` | `object` | No | Options: {status?, headers?} |

---

### redirect

Register a route that redirects to another URL

**Module:** `http` | **Returns:** `object` -- Route registration info

```robinpath
any "myapi" "/old" "/new" {"status": 301}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Server ID |
| `fromPath` | `string` | Yes | URL path to redirect from |
| `toUrl` | `string` | Yes | Target URL to redirect to |
| `opts` | `object` | No | Options: {status? (301 or 302)} |

---

### static

Register a directory to serve static files from

**Module:** `http` | **Returns:** `object` -- Static directory registration info

```robinpath
any "myapi" "C:/mysite/public"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Server ID |
| `dirPath` | `string` | Yes | Absolute directory path |
| `opts` | `object` | No | Options (reserved) |

---

### cors

Enable CORS on the server

**Module:** `http` | **Returns:** `object` -- CORS configuration info

```robinpath
any "myapi" {"origin": "http://localhost:5173"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Server ID |
| `opts` | `object` | No | Options: {origin?, methods?, headers?} |

---

### listen

Start the HTTP server listening for requests

**Module:** `http` | **Returns:** `object` -- Server listening info with URL

```robinpath
any "myapi" 8080
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Server ID |
| `port` | `number` | No | Port number (default 3000) |
| `opts` | `object` | No | Options: {host?} |

---

### stop

Stop the HTTP server gracefully

**Module:** `http` | **Returns:** `object` -- Server stop confirmation

```robinpath
any "myapi"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Server ID |

---

### status

Get server status: port, routes, listening state, request count

**Module:** `http` | **Returns:** `object` -- Server status info

```robinpath
any "myapi"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Server ID |

---

### logs

Get the request log for a server

**Module:** `http` | **Returns:** `array` -- Array of request log entries

```robinpath
any "myapi" {"limit": 10, "method": "GET"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Server ID |
| `opts` | `object` | No | Filter options: {limit?, method?, path?} |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `HTTP server not found` | Check the error message for details |

```robinpath
set $result as any "myapi" {"port": 8080}
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
set $result as any "myapi" "/api/products" [{"id": 1}]
each $item in $result
  print $item
end
```

### 2. Create a new item with createServer

Create a new resource and capture the result.

```robinpath
set $result as any "myapi" {"port": 8080}
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as any "myapi" "/api/products" [{"id": 1}]
if $existing == null
  any "myapi" {"port": 8080}
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step HTTP workflow

Chain multiple http operations together.

```robinpath
set $r_createServer as any "myapi" {"port": 8080}
set $r_get as any "myapi" "/api/products" [{"id": 1}]
set $r_post as any "myapi" "/api/products" {"created": true}
print "All operations complete"
```

### 5. Safe createServer with validation

Check results before proceeding.

```robinpath
set $result as any "myapi" {"port": 8080}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
