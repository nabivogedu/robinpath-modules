---
title: "Timer"
module: "timer"
package: "@robinpath/timer"
description: "Sleep, delay, intervals, timeouts, and performance measurement"
category: "core"
tags: [timer, sleep, delay, interval, core]
type: "builtin"
auth: "none"
functionCount: 11
---

# Timer

> Sleep, delay, intervals, timeouts, and performance measurement

**Package:** `@robinpath/timer` | **Category:** Core | **Type:** Built-in

## Authentication

No authentication required. All functions are available immediately.

## Use Cases

Use the `timer` module when you need to:

- **Pause execution for a duration** -- Use `timer.sleep` to wait for milliseconds
- **Delay a function call** -- Use `timer.delay` or `timer.setTimeout` for deferred execution
- **Run something at intervals** -- Use `timer.setInterval` for repeated execution
- **Measure execution time** -- Use `timer.measure` to benchmark code
- **Get current timestamp** -- Use `timer.timestamp` or `timer.now`
- **Cancel timers** -- Use `timer.clearTimeout`, `timer.clearInterval`, or `timer.clearAll`

## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`sleep`](#sleep) | Pause execution for specified milliseconds | `void` |
| [`delay`](#delay) | Delay execution for specified milliseconds | `void` |
| [`setTimeout`](#settimeout) | Execute after a delay | `Object` |
| [`setInterval`](#setinterval) | Execute repeatedly at intervals | `Object` |
| [`clearTimeout`](#cleartimeout) | Cancel a timeout | `boolean` |
| [`clearInterval`](#clearinterval) | Cancel an interval | `boolean` |
| [`clearAll`](#clearall) | Cancel all active timers | `boolean` |
| [`active`](#active) | Get count of active timers | `number` |
| [`measure`](#measure) | Measure elapsed time in milliseconds | `number` |
| [`timestamp`](#timestamp) | Get current Unix timestamp in seconds | `number` |
| [`now`](#now) | Get current time in milliseconds | `number` |

## Functions

### sleep

Pause execution for specified number of milliseconds

**Module:** `timer` | **Returns:** `void`

```robinpath
timer.sleep 1000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ms` | `number` | Yes | Milliseconds to sleep |

---

### delay

Delay execution for specified number of milliseconds (alias for sleep)

**Module:** `timer` | **Returns:** `void`

```robinpath
timer.delay 500
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ms` | `number` | Yes | Milliseconds to delay |

---

### setTimeout

Execute a callback after a specified delay

**Module:** `timer` | **Returns:** `Object` -- Timer handle for cancellation

```robinpath
timer.setTimeout 3000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ms` | `number` | Yes | Delay in milliseconds |

---

### setInterval

Execute a callback repeatedly at specified intervals

**Module:** `timer` | **Returns:** `Object` -- Timer handle for cancellation

```robinpath
timer.setInterval 1000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ms` | `number` | Yes | Interval in milliseconds |

---

### clearTimeout

Cancel a previously set timeout

**Module:** `timer` | **Returns:** `boolean` -- True if timeout was cleared

```robinpath
timer.clearTimeout $timerHandle
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `handle` | `Object` | Yes | Timer handle from setTimeout |

---

### clearInterval

Cancel a previously set interval

**Module:** `timer` | **Returns:** `boolean` -- True if interval was cleared

```robinpath
timer.clearInterval $intervalHandle
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `handle` | `Object` | Yes | Timer handle from setInterval |

---

### clearAll

Cancel all active timers (both timeouts and intervals)

**Module:** `timer` | **Returns:** `boolean` -- True if timers were cleared

```robinpath
timer.clearAll
```

No parameters required.

---

### active

Get the count of currently active timers

**Module:** `timer` | **Returns:** `number` -- Number of active timers

```robinpath
timer.active
```

No parameters required.

---

### measure

Measure elapsed time since a start timestamp in milliseconds

**Module:** `timer` | **Returns:** `number` -- Elapsed milliseconds

```robinpath
timer.measure $startTime
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `start` | `number` | Yes | Start timestamp from timer.now |

---

### timestamp

Get the current Unix timestamp in seconds

**Module:** `timer` | **Returns:** `number` -- Unix timestamp in seconds

```robinpath
timer.timestamp
```

No parameters required.

---

### now

Get the current time in milliseconds (high resolution)

**Module:** `timer` | **Returns:** `number` -- Current time in milliseconds

```robinpath
timer.now
```

No parameters required.

---

## Error Handling

| Error | Cause |
|-------|-------|
| Invalid duration | Negative or non-numeric milliseconds value |

```robinpath
@desc "Safe sleep with validation"
do
  set $ms as 2000
  if $ms > 0
    timer.sleep $ms
    print "Waited " + $ms + "ms"
  end
enddo
```

## Recipes

### 1. Benchmark an operation

Measure how long an operation takes.

```robinpath
@desc "Measure file read performance"
do
  set $start as timer.now
  set $data as file.read "/large-file.txt"
  set $elapsed as timer.measure $start
  print "File read took " + $elapsed + "ms"
enddo
```

### 2. Retry with delay

Retry an operation with a pause between attempts.

```robinpath
@desc "Retry HTTP request with backoff"
do
  set $attempts as 0
  set $maxRetries as 3
  set $success as false
  repeat $maxRetries
    set $attempts as $attempts + 1
    set $response as http.get "https://api.example.com/health"
    if $response.status == 200
      set $success as true
      print "Success on attempt " + $attempts
      break
    end
    print "Attempt " + $attempts + " failed, retrying..."
    timer.sleep 1000 * $attempts
  endrepeat
  if $success == false
    print "All retries failed"
  end
enddo
```

### 3. Polling with interval

Check status periodically.

```robinpath
@desc "Poll for job completion"
do
  set $start as timer.now
  set $done as false
  repeat 10
    set $status as http.get "https://api.example.com/job/123"
    if $status.body.complete == true
      set $done as true
      break
    end
    timer.sleep 2000
  endrepeat
  set $elapsed as timer.measure $start
  print "Job finished in " + $elapsed + "ms"
enddo
```

## Related Modules

- **process** -- Process uptime and hrtime
- **http** -- HTTP requests to poll or retry
