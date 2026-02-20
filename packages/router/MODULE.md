---
title: "Router"
module: "router"
package: "@robinpath/router"
description: "URL routing and pattern matching with support for path parameters (:param), wildcards (*), route groups, and middleware. No external dependencies."
category: "web"
tags: [router, web]
type: "utility"
auth: "none"
functionCount: 12
---

# Router

> URL routing and pattern matching with support for path parameters (:param), wildcards (*), route groups, and middleware. No external dependencies.

**Package:** `@robinpath/router` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `router` module when you need to:

- **Create a new router instance** -- Use `router.create` to perform this operation
- **Add a route with method, path pattern, and handler** -- Use `router.add` to perform this operation
- **Match a URL against registered routes and return the matching route** -- Use `router.match` to perform this operation
- **Extract path parameters from a URL using a pattern** -- Use `router.params` to perform this operation
- **Parse a URL into pathname, segments, and query parameters** -- Use `router.parse` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create a new router instance | `object` |
| [`add`](#add) | Add a route with method, path pattern, and handler | `object` |
| [`match`](#match) | Match a URL against registered routes and return the matching route | `object` |
| [`params`](#params) | Extract path parameters from a URL using a pattern | `object` |
| [`parse`](#parse) | Parse a URL into pathname, segments, and query parameters | `object` |
| [`build`](#build) | Build a URL from a pattern and parameter values | `object` |
| [`normalize`](#normalize) | Normalize a URL path (collapse slashes, ensure leading slash, strip trailing slash) | `object` |
| [`isMatch`](#ismatch) | Test if a URL path matches a route pattern | `object` |
| [`group`](#group) | Create a route group with a shared prefix | `object` |
| [`list`](#list) | List all routes registered in a router | `object` |
| [`remove`](#remove) | Remove routes by method and/or path | `object` |
| [`middleware`](#middleware) | Add a middleware function to the router | `object` |


## Functions

### create

Create a new router instance

**Module:** `router` | **Returns:** `object` -- API response.

```robinpath
router.create
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Unique router identifier |
| `prefix` | `string` | No | Base prefix for all routes |

---

### add

Add a route with method, path pattern, and handler

**Module:** `router` | **Returns:** `object` -- API response.

```robinpath
router.add
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Router identifier |
| `method` | `string` | No | HTTP method (default GET) |
| `path` | `string` | No | Route path pattern (supports :param and *) |
| `handler` | `any` | No | Route handler |

---

### match

Match a URL against registered routes and return the matching route

**Module:** `router` | **Returns:** `object` -- API response.

```robinpath
router.match
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Router identifier |
| `method` | `string` | No | HTTP method |
| `url` | `string` | No | URL to match |

---

### params

Extract path parameters from a URL using a pattern

**Module:** `router` | **Returns:** `object` -- API response.

```robinpath
router.params
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pattern` | `string` | No | Route pattern with :param placeholders |
| `url` | `string` | No | URL to extract params from |

---

### parse

Parse a URL into pathname, segments, and query parameters

**Module:** `router` | **Returns:** `object` -- API response.

```robinpath
router.parse
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | No | URL to parse |

---

### build

Build a URL from a pattern and parameter values

**Module:** `router` | **Returns:** `object` -- API response.

```robinpath
router.build
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pattern` | `string` | No | Route pattern with :param placeholders |
| `params` | `object` | No | Parameter values to substitute |
| `query` | `object` | No | Query parameters to append |

---

### normalize

Normalize a URL path (collapse slashes, ensure leading slash, strip trailing slash)

**Module:** `router` | **Returns:** `object` -- API response.

```robinpath
router.normalize
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | No | Path to normalize |

---

### isMatch

Test if a URL path matches a route pattern

**Module:** `router` | **Returns:** `object` -- API response.

```robinpath
router.isMatch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pattern` | `string` | No | Route pattern |
| `url` | `string` | No | URL to test |

---

### group

Create a route group with a shared prefix

**Module:** `router` | **Returns:** `object` -- API response.

```robinpath
router.group
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Router identifier |
| `prefix` | `string` | No | Prefix for all routes in the group |
| `routes` | `array` | No | Array of route definitions { method, path, handler } |

---

### list

List all routes registered in a router

**Module:** `router` | **Returns:** `object` -- API response.

```robinpath
router.list
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Router identifier |

---

### remove

Remove routes by method and/or path

**Module:** `router` | **Returns:** `object` -- API response.

```robinpath
router.remove
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Router identifier |
| `method` | `string` | No | HTTP method to filter |
| `path` | `string` | No | Route path to filter |

---

### middleware

Add a middleware function to the router

**Module:** `router` | **Returns:** `object` -- API response.

```robinpath
router.middleware
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Router identifier |
| `handler` | `string` | No | Middleware function (ctx: any) => ctx |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Router id is required` | Check the error message for details |
| `path is required` | Check the error message for details |
| `url is required` | Check the error message for details |
| `pattern is required` | Check the error message for details |
| `prefix is required` | Check the error message for details |
| `Each route in the group must have a path` | Check the error message for details |
| `handler must be a function` | Check the error message for details |
| `Router "..." not found` | Check the error message for details |

```robinpath
set $result as router.create
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
set $result as router.list
each $item in $result
  print $item
end
```

### 2. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as router.create
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as router.list
if $existing == null
  router.create
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Router workflow

Chain multiple router operations together.

```robinpath
set $r_create as router.create
set $r_add as router.add
set $r_match as router.match
print "All operations complete"
```

### 5. Safe create with validation

Check results before proceeding.

```robinpath
set $result as router.create
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
