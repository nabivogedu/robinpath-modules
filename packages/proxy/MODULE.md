---
title: "Proxy"
module: "proxy"
package: "@robinpath/proxy"
description: "HTTP proxy and request forwarding module using Node.js built-in http module. Supports creating proxy servers, URL rewriting, header manipulation, request and response interception, round-robin load balancing, and health checking. No external dependencies required."
category: "web"
tags: [proxy, web]
type: "utility"
auth: "none"
functionCount: 13
---

# Proxy

> HTTP proxy and request forwarding module using Node.js built-in http module. Supports creating proxy servers, URL rewriting, header manipulation, request and response interception, round-robin load balancing, and health checking. No external dependencies required.

**Package:** `@robinpath/proxy` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `proxy` module when you need to:

- **Forward a single HTTP request to a target server and return the response** -- Use `proxy.forward` to perform this operation
- **Create a new HTTP proxy server instance** -- Use `proxy.create` to perform this operation
- **Start a proxy server and begin listening for requests** -- Use `proxy.start` to perform this operation
- **Stop a running proxy server and clean up resources** -- Use `proxy.stop` to perform this operation
- **Add a URL rewrite rule to transform incoming request paths** -- Use `proxy.rewrite` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`forward`](#forward) | Forward a single HTTP request to a target server and return the response | `object` |
| [`create`](#create) | Create a new HTTP proxy server instance | `object` |
| [`start`](#start) | Start a proxy server and begin listening for requests | `object` |
| [`stop`](#stop) | Stop a running proxy server and clean up resources | `object` |
| [`rewrite`](#rewrite) | Add a URL rewrite rule to transform incoming request paths | `object` |
| [`addHeader`](#addheader) | Add a header to all proxied responses | `object` |
| [`removeHeader`](#removeheader) | Remove a header from all proxied responses | `object` |
| [`onRequest`](#onrequest) | Register an interceptor function for incoming requests | `object` |
| [`onResponse`](#onresponse) | Register an interceptor function for proxy responses | `object` |
| [`balance`](#balance) | Configure round-robin load balancing across multiple target servers | `object` |
| [`health`](#health) | Check the health of a target server by sending a HEAD request | `object` |
| [`list`](#list) | List all active proxy server instances and their configurations | `object` |
| [`stats`](#stats) | Get statistics for a proxy server including request count, errors, and uptime | `object` |


## Functions

### forward

Forward a single HTTP request to a target server and return the response

**Module:** `proxy` | **Returns:** `object` -- API response.

```robinpath
proxy.forward
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `targetUrl` | `string` | No | Target server URL to forward to |
| `method` | `string` | No | HTTP method (GET, POST, etc.) |
| `path` | `string` | No | Request path (default: /) |
| `headers` | `object` | No | Request headers |
| `body` | `string` | No | Request body |

---

### create

Create a new HTTP proxy server instance

**Module:** `proxy` | **Returns:** `object` -- API response.

```robinpath
proxy.create
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Proxy identifier |
| `target` | `string` | No | Default target URL to proxy requests to |
| `port` | `number` | No | Port to listen on (default: 8080) |

---

### start

Start a proxy server and begin listening for requests

**Module:** `proxy` | **Returns:** `object` -- API response.

```robinpath
proxy.start
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Proxy identifier |

---

### stop

Stop a running proxy server and clean up resources

**Module:** `proxy` | **Returns:** `object` -- API response.

```robinpath
proxy.stop
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Proxy identifier |

---

### rewrite

Add a URL rewrite rule to transform incoming request paths

**Module:** `proxy` | **Returns:** `object` -- API response.

```robinpath
proxy.rewrite
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Proxy identifier |
| `pattern` | `string` | No | Regex pattern to match in the URL |
| `replacement` | `string` | No | Replacement string |

---

### addHeader

Add a header to all proxied responses

**Module:** `proxy` | **Returns:** `object` -- API response.

```robinpath
proxy.addHeader
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Proxy identifier |
| `name` | `string` | No | Header name |
| `value` | `string` | No | Header value |

---

### removeHeader

Remove a header from all proxied responses

**Module:** `proxy` | **Returns:** `object` -- API response.

```robinpath
proxy.removeHeader
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Proxy identifier |
| `name` | `string` | No | Header name to remove |

---

### onRequest

Register an interceptor function for incoming requests

**Module:** `proxy` | **Returns:** `object` -- API response.

```robinpath
proxy.onRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Proxy identifier |
| `callback` | `string` | No | Interceptor function receiving (req) |

---

### onResponse

Register an interceptor function for proxy responses

**Module:** `proxy` | **Returns:** `object` -- API response.

```robinpath
proxy.onResponse
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Proxy identifier |
| `callback` | `string` | No | Interceptor function receiving (proxyRes, res) |

---

### balance

Configure round-robin load balancing across multiple target servers

**Module:** `proxy` | **Returns:** `object` -- API response.

```robinpath
proxy.balance
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Proxy identifier |
| `targets` | `array` | No | Array of target URLs for load balancing |

---

### health

Check the health of a target server by sending a HEAD request

**Module:** `proxy` | **Returns:** `object` -- API response.

```robinpath
proxy.health
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `targetUrl` | `string` | No | Target URL to check |
| `timeout` | `number` | No | Timeout in milliseconds (default: 5000) |

---

### list

List all active proxy server instances and their configurations

**Module:** `proxy` | **Returns:** `object` -- API response.

```robinpath
proxy.list
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### stats

Get statistics for a proxy server including request count, errors, and uptime

**Module:** `proxy` | **Returns:** `object` -- API response.

```robinpath
proxy.stats
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Proxy identifier |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Target URL is required.` | Check the error message for details |
| `Pattern is required.` | Check the error message for details |
| `Replacement is required.` | Check the error message for details |
| `Header name is required.` | Check the error message for details |
| `Header value is required.` | Check the error message for details |
| `A callback function is required.` | Check the error message for details |
| `An array of target URLs is required.` | Check the error message for details |
| `Proxy "..." not found. Call create() first.` | Check the error message for details |

```robinpath
set $result as proxy.forward
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
set $result as proxy.list
each $item in $result
  print $item
end
```

### 2. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as proxy.create
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as proxy.list
if $existing == null
  proxy.create
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Proxy workflow

Chain multiple proxy operations together.

```robinpath
set $r_forward as proxy.forward
set $r_create as proxy.create
set $r_start as proxy.start
print "All operations complete"
```

### 5. Safe forward with validation

Check results before proceeding.

```robinpath
set $result as proxy.forward
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
