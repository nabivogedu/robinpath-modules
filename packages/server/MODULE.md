---
title: "Server"
module: "server"
package: "@robinpath/server"
description: "HTTP server creation and management using Node.js built-in http module. Supports routing, static file serving, CORS, and common response helpers."
category: "web"
tags: [server, web]
type: "utility"
auth: "none"
functionCount: 15
---

# Server

> HTTP server creation and management using Node.js built-in http module. Supports routing, static file serving, CORS, and common response helpers.

**Package:** `@robinpath/server` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `server` module when you need to:

- **Create a new HTTP server instance** -- Use `server.create` to perform this operation
- **Start listening for incoming connections** -- Use `server.start` to perform this operation
- **Stop the server and close all connections** -- Use `server.stop` to perform this operation
- **Register a handler for all incoming requests** -- Use `server.onRequest` to perform this operation
- **Register an error handler for the server** -- Use `server.onError` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create a new HTTP server instance | `object` |
| [`start`](#start) | Start listening for incoming connections | `object` |
| [`stop`](#stop) | Stop the server and close all connections | `object` |
| [`onRequest`](#onrequest) | Register a handler for all incoming requests | `object` |
| [`onError`](#onerror) | Register an error handler for the server | `object` |
| [`route`](#route) | Add a route with method, path pattern, and handler | `object` |
| [`static`](#static) | Serve static files from a directory | `object` |
| [`sendJson`](#sendjson) | Send a JSON response | `object` |
| [`sendHtml`](#sendhtml) | Send an HTML response | `object` |
| [`sendFile`](#sendfile) | Send a file as the response | `object` |
| [`sendRedirect`](#sendredirect) | Send an HTTP redirect response | `object` |
| [`status`](#status) | Send a response with a specific status code | `object` |
| [`cors`](#cors) | Enable and configure CORS headers for a server | `object` |
| [`getServers`](#getservers) | List all active server instances | `object` |
| [`getRoutes`](#getroutes) | List all routes registered on a server | `object` |


## Functions

### create

Create a new HTTP server instance

**Module:** `server` | **Returns:** `object` -- API response.

```robinpath
server.create
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Unique server identifier |
| `port` | `number` | No | Port to listen on (default 3000) |
| `host` | `string` | No | Host to bind to (default 0.0.0.0) |

---

### start

Start listening for incoming connections

**Module:** `server` | **Returns:** `object` -- API response.

```robinpath
server.start
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Server identifier |

---

### stop

Stop the server and close all connections

**Module:** `server` | **Returns:** `object` -- API response.

```robinpath
server.stop
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Server identifier |

---

### onRequest

Register a handler for all incoming requests

**Module:** `server` | **Returns:** `object` -- API response.

```robinpath
server.onRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Server identifier |
| `handler` | `string` | No | Request handler function (req, res) |

---

### onError

Register an error handler for the server

**Module:** `server` | **Returns:** `object` -- API response.

```robinpath
server.onError
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Server identifier |
| `handler` | `string` | No | Error handler function (err) |

---

### route

Add a route with method, path pattern, and handler

**Module:** `server` | **Returns:** `object` -- API response.

```robinpath
server.route
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Server identifier |
| `method` | `string` | No | HTTP method (GET, POST, etc.) |
| `path` | `string` | No | Route path pattern (supports :param and *) |
| `handler` | `string` | No | Route handler function (req, res) |

---

### static

Serve static files from a directory

**Module:** `server` | **Returns:** `object` -- API response.

```robinpath
server.static
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Server identifier |
| `dir` | `string` | No | Directory path to serve files from |

---

### sendJson

Send a JSON response

**Module:** `server` | **Returns:** `object` -- API response.

```robinpath
server.sendJson
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `res` | `object` | No | HTTP response object |
| `data` | `any` | No | Data to serialize as JSON |
| `status` | `number` | No | HTTP status code (default 200) |

---

### sendHtml

Send an HTML response

**Module:** `server` | **Returns:** `object` -- API response.

```robinpath
server.sendHtml
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `res` | `object` | No | HTTP response object |
| `html` | `string` | No | HTML content |
| `status` | `number` | No | HTTP status code (default 200) |

---

### sendFile

Send a file as the response

**Module:** `server` | **Returns:** `object` -- API response.

```robinpath
server.sendFile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `res` | `object` | No | HTTP response object |
| `path` | `string` | No | Path to the file |
| `status` | `number` | No | HTTP status code (default 200) |

---

### sendRedirect

Send an HTTP redirect response

**Module:** `server` | **Returns:** `object` -- API response.

```robinpath
server.sendRedirect
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `res` | `object` | No | HTTP response object |
| `url` | `string` | No | URL to redirect to |
| `status` | `number` | No | HTTP status code (default 302) |

---

### status

Send a response with a specific status code

**Module:** `server` | **Returns:** `object` -- API response.

```robinpath
server.status
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `res` | `object` | No | HTTP response object |
| `code` | `number` | No | HTTP status code |
| `body` | `string` | No | Response body text |

---

### cors

Enable and configure CORS headers for a server

**Module:** `server` | **Returns:** `object` -- API response.

```robinpath
server.cors
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Server identifier |
| `origin` | `string` | No | Allowed origin (default *) |
| `methods` | `string` | No | Allowed methods |
| `headers` | `string` | No | Allowed headers |

---

### getServers

List all active server instances

**Module:** `server` | **Returns:** `object` -- API response.

```robinpath
server.getServers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### getRoutes

List all routes registered on a server

**Module:** `server` | **Returns:** `object` -- API response.

```robinpath
server.getRoutes
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Server identifier |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Server id is required` | Check the error message for details |
| `handler must be a function` | Check the error message for details |
| `path is required` | Check the error message for details |
| `dir is required` | Check the error message for details |
| `res is required` | Check the error message for details |
| `html must be a string` | Check the error message for details |
| `path is not a file` | Check the error message for details |
| `url is required` | Check the error message for details |

```robinpath
set $result as server.create
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Servers

Retrieve all items and loop through them.

```robinpath
set $result as server.getServers
each $item in $result
  print $item
end
```

### 2. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as server.create
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as server.getServers
if $existing == null
  server.create
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Server workflow

Chain multiple server operations together.

```robinpath
set $r_create as server.create
set $r_start as server.start
set $r_stop as server.stop
print "All operations complete"
```

### 5. Safe create with validation

Check results before proceeding.

```robinpath
set $result as server.create
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
