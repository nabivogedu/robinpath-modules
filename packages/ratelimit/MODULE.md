---
title: "Ratelimit"
module: "ratelimit"
package: "@robinpath/ratelimit"
description: "Rate limiting with token bucket, sliding window, and fixed window algorithms"
category: "infrastructure"
tags: [ratelimit, infrastructure]
type: "utility"
auth: "none"
functionCount: 8
---

# Ratelimit

> Rate limiting with token bucket, sliding window, and fixed window algorithms

**Package:** `@robinpath/ratelimit` | **Category:** Infrastructure | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `ratelimit` module when you need to:

- **Create a named rate limiter (token-bucket, sliding-window, or fixed-window)** -- Use `ratelimit.create` to perform this operation
- **Try to acquire tokens/slots from a rate limiter** -- Use `ratelimit.acquire` to perform this operation
- **Check if a request would be allowed without consuming a token** -- Use `ratelimit.check` to perform this operation
- **Get the number of remaining tokens/slots** -- Use `ratelimit.remaining` to perform this operation
- **Wait until a token is available, then acquire it** -- Use `ratelimit.wait` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create a named rate limiter (token-bucket, sliding-window, or fixed-window) | `The limiter configuration` |
| [`acquire`](#acquire) | Try to acquire tokens/slots from a rate limiter | `{allowed: boolean, remaining: number, retryAfterMs?: number}` |
| [`check`](#check) | Check if a request would be allowed without consuming a token | `{allowed: boolean, remaining: number}` |
| [`remaining`](#remaining) | Get the number of remaining tokens/slots | `Number of remaining tokens or request slots` |
| [`wait`](#wait) | Wait until a token is available, then acquire it | `{allowed: true, remaining: number} when token is acquired` |
| [`reset`](#reset) | Reset a rate limiter to its initial state | `True if reset successfully` |
| [`status`](#status) | Get detailed status information for a rate limiter | `Object with type-specific status details` |
| [`destroy`](#destroy) | Remove a rate limiter and free its resources | `True if the limiter existed and was destroyed` |


## Functions

### create

Create a named rate limiter (token-bucket, sliding-window, or fixed-window)

**Module:** `ratelimit` | **Returns:** `object` -- The limiter configuration

```robinpath
ratelimit.create "api" "token-bucket" {"maxTokens": 100, "refillRate": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Limiter name |
| `type` | `string` | Yes | Algorithm: token-bucket, sliding-window, or fixed-window |
| `options` | `object` | No | Config: {maxTokens/max, refillRate/rate} or {maxRequests/max, windowMs/window} |

---

### acquire

Try to acquire tokens/slots from a rate limiter

**Module:** `ratelimit` | **Returns:** `object` -- {allowed: boolean, remaining: number, retryAfterMs?: number}

```robinpath
ratelimit.acquire "api"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Limiter name |
| `count` | `number` | No | Number of tokens to acquire (default 1) |

---

### check

Check if a request would be allowed without consuming a token

**Module:** `ratelimit` | **Returns:** `object` -- {allowed: boolean, remaining: number}

```robinpath
ratelimit.check "api"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Limiter name |

---

### remaining

Get the number of remaining tokens/slots

**Module:** `ratelimit` | **Returns:** `number` -- Number of remaining tokens or request slots

```robinpath
ratelimit.remaining "api"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Limiter name |

---

### wait

Wait until a token is available, then acquire it

**Module:** `ratelimit` | **Returns:** `object` -- {allowed: true, remaining: number} when token is acquired

```robinpath
ratelimit.wait "api" 5000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Limiter name |
| `maxWait` | `number` | No | Max wait time in ms (default 30000) |

---

### reset

Reset a rate limiter to its initial state

**Module:** `ratelimit` | **Returns:** `boolean` -- True if reset successfully

```robinpath
ratelimit.reset "api"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Limiter name |

---

### status

Get detailed status information for a rate limiter

**Module:** `ratelimit` | **Returns:** `object` -- Object with type-specific status details

```robinpath
ratelimit.status "api"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Limiter name |

---

### destroy

Remove a rate limiter and free its resources

**Module:** `ratelimit` | **Returns:** `boolean` -- True if the limiter existed and was destroyed

```robinpath
ratelimit.destroy "api"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Limiter name |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Unknown limiter type` | Check the error message for details |
| `Unknown rate limiter type: .... Use "token-bucket", "sliding-window", or "fixed-window".` | Check the error message for details |
| `Rate limiter "..." not found. Create it first.` | Check the error message for details |
| `Rate limiter "..." not found.` | Check the error message for details |
| `Rate limit wait timeout after ...ms for "..."` | Check the error message for details |

```robinpath
set $result as ratelimit.create "api" "token-bucket" {"maxTokens": 100, "refillRate": 10}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as ratelimit.create "api" "token-bucket" {"maxTokens": 100, "refillRate": 10}
print "Created: " + $result
```

### 2. Multi-step Ratelimit workflow

Chain multiple ratelimit operations together.

```robinpath
set $r_create as ratelimit.create "api" "token-bucket" {"maxTokens": 100, "refillRate": 10}
set $r_acquire as ratelimit.acquire "api"
set $r_check as ratelimit.check "api"
print "All operations complete"
```

### 3. Safe create with validation

Check results before proceeding.

```robinpath
set $result as ratelimit.create "api" "token-bucket" {"maxTokens": 100, "refillRate": 10}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
