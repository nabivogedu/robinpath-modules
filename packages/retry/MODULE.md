---
title: "Retry"
module: "retry"
package: "@robinpath/retry"
description: "Retry with exponential backoff and circuit breaker patterns for resilient automation workflows"
category: "infrastructure"
tags: [retry, infrastructure]
type: "utility"
auth: "none"
functionCount: 10
---

# Retry

> Retry with exponential backoff and circuit breaker patterns for resilient automation workflows

**Package:** `@robinpath/retry` | **Category:** Infrastructure | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `retry` module when you need to:

- **Execute a function with automatic retry and exponential backoff** -- Use `retry.execute` to perform this operation
- **Calculate the delay for a given retry attempt using exponential backoff** -- Use `retry.withBackoff` to perform this operation
- **Check if an HTTP status code is retryable (408, 429, 500, 502, 503, 504)** -- Use `retry.isRetryable` to perform this operation
- **Wait for a specified number of milliseconds** -- Use `retry.delay` to perform this operation
- **Preview the delay schedule for a series of retry attempts** -- Use `retry.attempts` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`execute`](#execute) | Execute a function with automatic retry and exponential backoff | `The result of the function if it succeeds within the retry limit` |
| [`withBackoff`](#withbackoff) | Calculate the delay for a given retry attempt using exponential backoff | `The delay in milliseconds for the given attempt` |
| [`isRetryable`](#isretryable) | Check if an HTTP status code is retryable (408, 429, 500, 502, 503, 504) | `True if the status code is typically retryable` |
| [`delay`](#delay) | Wait for a specified number of milliseconds | `True when the delay completes` |
| [`attempts`](#attempts) | Preview the delay schedule for a series of retry attempts | `Array of {attempt, delay, totalWait} objects` |
| [`createBreaker`](#createbreaker) | Create a named circuit breaker with a failure threshold and reset timeout | `The circuit breaker configuration` |
| [`breakerState`](#breakerstate) | Get the current state of a named circuit breaker | `Object with state (closed/open/half-open), failures, threshold` |
| [`breakerRecord`](#breakerrecord) | Record a success or failure in a circuit breaker | `Updated circuit breaker state` |
| [`breakerAllow`](#breakerallow) | Check if a circuit breaker allows requests through | `True if requests are allowed, false if circuit is open` |
| [`breakerReset`](#breakerreset) | Reset a circuit breaker to closed state | `True if reset successfully` |


## Functions

### execute

Execute a function with automatic retry and exponential backoff

**Module:** `retry` | **Returns:** `any` -- The result of the function if it succeeds within the retry limit

```robinpath
retry.execute $myFunction {"maxAttempts": 5, "initialDelay": 2000}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fn` | `string` | Yes | The async function to execute |
| `options` | `object` | No | Retry options: maxAttempts, initialDelay, maxDelay, backoffFactor, retryOn, jitter |

---

### withBackoff

Calculate the delay for a given retry attempt using exponential backoff

**Module:** `retry` | **Returns:** `number` -- The delay in milliseconds for the given attempt

```robinpath
retry.withBackoff 3 1000 2 30000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `attempt` | `number` | Yes | The current attempt number (0-based) |
| `initialDelay` | `number` | No | Base delay in ms (default 1000) |
| `factor` | `number` | No | Backoff multiplier (default 2) |
| `maxDelay` | `number` | No | Maximum delay in ms (default 30000) |
| `jitter` | `boolean` | No | Add random jitter (default true) |

---

### isRetryable

Check if an HTTP status code is retryable (408, 429, 500, 502, 503, 504)

**Module:** `retry` | **Returns:** `boolean` -- True if the status code is typically retryable

```robinpath
retry.isRetryable 503
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `statusCode` | `number` | Yes | The HTTP status code to check |

---

### delay

Wait for a specified number of milliseconds

**Module:** `retry` | **Returns:** `boolean` -- True when the delay completes

```robinpath
retry.delay 2000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ms` | `number` | Yes | Milliseconds to wait |

---

### attempts

Preview the delay schedule for a series of retry attempts

**Module:** `retry` | **Returns:** `array` -- Array of {attempt, delay, totalWait} objects

```robinpath
retry.attempts 5 1000 2
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `maxAttempts` | `number` | No | Number of attempts (default 3) |
| `initialDelay` | `number` | No | Base delay in ms (default 1000) |
| `factor` | `number` | No | Backoff multiplier (default 2) |

---

### createBreaker

Create a named circuit breaker with a failure threshold and reset timeout

**Module:** `retry` | **Returns:** `object` -- The circuit breaker configuration

```robinpath
retry.createBreaker "api-service" 3 30000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Circuit breaker name |
| `threshold` | `number` | No | Number of failures before opening (default 5) |
| `resetTimeout` | `number` | No | Time in ms before transitioning to half-open (default 60000) |

---

### breakerState

Get the current state of a named circuit breaker

**Module:** `retry` | **Returns:** `object` -- Object with state (closed/open/half-open), failures, threshold

```robinpath
retry.breakerState "api-service"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Circuit breaker name |

---

### breakerRecord

Record a success or failure in a circuit breaker

**Module:** `retry` | **Returns:** `object` -- Updated circuit breaker state

```robinpath
retry.breakerRecord "api-service" false
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Circuit breaker name |
| `success` | `boolean` | Yes | True for success, false or 'failure' for failure |

---

### breakerAllow

Check if a circuit breaker allows requests through

**Module:** `retry` | **Returns:** `boolean` -- True if requests are allowed, false if circuit is open

```robinpath
retry.breakerAllow "api-service"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Circuit breaker name |

---

### breakerReset

Reset a circuit breaker to closed state

**Module:** `retry` | **Returns:** `boolean` -- True if reset successfully

```robinpath
retry.breakerReset "api-service"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Circuit breaker name |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `First argument must be a callable function` | Check the error message for details |
| `Circuit breaker "..." not found. Create it first.` | Check the error message for details |

```robinpath
set $result as retry.execute $myFunction {"maxAttempts": 5, "initialDelay": 2000}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with createBreaker

Create a new resource and capture the result.

```robinpath
set $result as retry.createBreaker "api-service" 3 30000
print "Created: " + $result
```

### 2. Multi-step Retry workflow

Chain multiple retry operations together.

```robinpath
set $r_execute as retry.execute $myFunction {"maxAttempts": 5, "initialDelay": 2000}
set $r_withBackoff as retry.withBackoff 3 1000 2 30000
set $r_isRetryable as retry.isRetryable 503
print "All operations complete"
```

### 3. Safe execute with validation

Check results before proceeding.

```robinpath
set $result as retry.execute $myFunction {"maxAttempts": 5, "initialDelay": 2000}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
