---
title: "Promise"
module: "promise"
package: "@robinpath/promise"
description: "Async utilities: parallel, race, waterfall, map, retry, throttle, debounce, timeout, and concurrency control"
category: "infrastructure"
tags: [promise, infrastructure]
type: "utility"
auth: "none"
functionCount: 17
---

# Promise

> Async utilities: parallel, race, waterfall, map, retry, throttle, debounce, timeout, and concurrency control

**Package:** `@robinpath/promise` | **Category:** Infrastructure | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `promise` module when you need to:

- **Wait for all promises** -- Use `promise.all` to perform this operation
- **Wait for all promises (no throw)** -- Use `promise.allSettled` to perform this operation
- **First promise to settle** -- Use `promise.race` to perform this operation
- **First promise to fulfill** -- Use `promise.any` to perform this operation
- **Add timeout to promise** -- Use `promise.timeout` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`all`](#all) | Wait for all promises | `Resolved values` |
| [`allSettled`](#allsettled) | Wait for all promises (no throw) | `Settlement results` |
| [`race`](#race) | First promise to settle | `First result` |
| [`any`](#any) | First promise to fulfill | `First successful result` |
| [`timeout`](#timeout) | Add timeout to promise | `Result or timeout error` |
| [`delay`](#delay) | Resolve after delay | `Value after delay` |
| [`retry`](#retry) | Retry function with backoff | `Result` |
| [`parallel`](#parallel) | Run functions with concurrency limit | `Results` |
| [`waterfall`](#waterfall) | Run functions in sequence, passing results | `Final result` |
| [`map`](#map) | Map items with async function | `Mapped results` |
| [`filter`](#filter) | Filter items with async predicate | `Filtered items` |
| [`each`](#each) | Iterate with async function | `true when done` |
| [`reduce`](#reduce) | Reduce with async function | `Reduced result` |
| [`throttle`](#throttle) | Throttle function calls | `Throttled function` |
| [`debounce`](#debounce) | Debounce function calls | `Debounced function` |
| [`deferred`](#deferred) | Create deferred promise | `{promise, resolve, reject}` |
| [`sleep`](#sleep) | Sleep for milliseconds | `true` |


## Functions

### all

Wait for all promises

**Module:** `promise` | **Returns:** `array` -- Resolved values

```robinpath
promise.all [$p1, $p2, $p3]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `promises` | `array` | Yes | Array of promises |

---

### allSettled

Wait for all promises (no throw)

**Module:** `promise` | **Returns:** `array` -- Settlement results

```robinpath
promise.allSettled [$p1, $p2]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `promises` | `array` | Yes | Array of promises |

---

### race

First promise to settle

**Module:** `promise` | **Returns:** `any` -- First result

```robinpath
promise.race [$p1, $p2]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `promises` | `array` | Yes | Array of promises |

---

### any

First promise to fulfill

**Module:** `promise` | **Returns:** `any` -- First successful result

```robinpath
promise.any [$p1, $p2]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `promises` | `array` | Yes | Array of promises |

---

### timeout

Add timeout to promise

**Module:** `promise` | **Returns:** `any` -- Result or timeout error

```robinpath
promise.timeout $fetch 5000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `promise` | `any` | Yes | Promise |
| `ms` | `number` | Yes | Timeout ms |
| `message` | `string` | No | Error message |

---

### delay

Resolve after delay

**Module:** `promise` | **Returns:** `any` -- Value after delay

```robinpath
promise.delay 1000 "done"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ms` | `number` | Yes | Delay ms |
| `value` | `any` | No | Resolved value |

---

### retry

Retry function with backoff

**Module:** `promise` | **Returns:** `any` -- Result

```robinpath
promise.retry $fn 3 1000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fn` | `string` | Yes | Async function |
| `maxRetries` | `number` | No | Max retries (default 3) |
| `delayMs` | `number` | No | Base delay ms |
| `backoff` | `boolean` | No | Exponential backoff |

---

### parallel

Run functions with concurrency limit

**Module:** `promise` | **Returns:** `array` -- Results

```robinpath
promise.parallel $tasks 5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fns` | `array` | Yes | Async functions |
| `concurrency` | `number` | No | Max concurrent |

---

### waterfall

Run functions in sequence, passing results

**Module:** `promise` | **Returns:** `any` -- Final result

```robinpath
promise.waterfall [$step1, $step2]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fns` | `array` | Yes | Functions (prev: any) => result |
| `initial` | `any` | No | Initial value |

---

### map

Map items with async function

**Module:** `promise` | **Returns:** `array` -- Mapped results

```robinpath
promise.map $urls $fetchFn 5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `items` | `array` | Yes | Items |
| `fn` | `string` | Yes | Async mapper |
| `concurrency` | `number` | No | Max concurrent |

---

### filter

Filter items with async predicate

**Module:** `promise` | **Returns:** `array` -- Filtered items

```robinpath
promise.filter $items $isValid
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `items` | `array` | Yes | Items |
| `fn` | `string` | Yes | Async predicate |

---

### each

Iterate with async function

**Module:** `promise` | **Returns:** `boolean` -- true when done

```robinpath
promise.each $items $process 3
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `items` | `array` | Yes | Items |
| `fn` | `string` | Yes | Async function |
| `concurrency` | `number` | No | Max concurrent |

---

### reduce

Reduce with async function

**Module:** `promise` | **Returns:** `any` -- Reduced result

```robinpath
promise.reduce $items $sum 0
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `items` | `array` | Yes | Items |
| `fn` | `string` | Yes | Async reducer |
| `initial` | `any` | No | Initial value |

---

### throttle

Throttle function calls

**Module:** `promise` | **Returns:** `function` -- Throttled function

```robinpath
promise.throttle $fn 1000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fn` | `string` | Yes | Function |
| `ms` | `number` | Yes | Min interval ms |

---

### debounce

Debounce function calls

**Module:** `promise` | **Returns:** `function` -- Debounced function

```robinpath
promise.debounce $fn 300
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fn` | `string` | Yes | Function |
| `ms` | `number` | Yes | Debounce delay ms |

---

### deferred

Create deferred promise

**Module:** `promise` | **Returns:** `object` -- {promise, resolve, reject}

```robinpath
promise.deferred
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### sleep

Sleep for milliseconds

**Module:** `promise` | **Returns:** `boolean` -- true

```robinpath
promise.sleep 1000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ms` | `number` | Yes | Duration ms |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as promise.all [$p1, $p2, $p3]
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Promise workflow

Chain multiple promise operations together.

```robinpath
set $r_all as promise.all [$p1, $p2, $p3]
set $r_allSettled as promise.allSettled [$p1, $p2]
set $r_race as promise.race [$p1, $p2]
print "All operations complete"
```

### 2. Safe all with validation

Check results before proceeding.

```robinpath
set $result as promise.all [$p1, $p2, $p3]
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
