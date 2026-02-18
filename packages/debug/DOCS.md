---
title: "Debug"
module: "debug"
package: "@robinpath/debug"
description: "Debugging utilities: inspect, timing, counters, logging, memory profiling, value comparison, ASCII tables"
category: "other"
tags: [debug, other]
type: "utility"
auth: "none"
functionCount: 20
---

# Debug

> Debugging utilities: inspect, timing, counters, logging, memory profiling, value comparison, ASCII tables

**Package:** `@robinpath/debug` | **Category:** Other | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `debug` module when you need to:

- **Deep inspect a value** -- Use `debug.inspect` to perform this operation
- **Get detailed type** -- Use `debug.typeOf` to perform this operation
- **Start a timer** -- Use `debug.timeStart` to perform this operation
- **End timer and get duration** -- Use `debug.timeEnd` to perform this operation
- **Pass value through with timing** -- Use `debug.timeit` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`inspect`](#inspect) | Deep inspect a value | `{type, value, keys, length}` |
| [`typeOf`](#typeof) | Get detailed type | `Type name` |
| [`timeStart`](#timestart) | Start a timer | `Label` |
| [`timeEnd`](#timeend) | End timer and get duration | `{label, duration, durationFormatted}` |
| [`timeit`](#timeit) | Pass value through with timing | `{result, durationMs}` |
| [`count`](#count) | Increment counter | `Current count` |
| [`countReset`](#countreset) | Reset counter | `true` |
| [`countGet`](#countget) | Get counter value | `Count` |
| [`log`](#log) | Add debug log entry | `Log entry` |
| [`getLogs`](#getlogs) | Get debug logs | `Log entries` |
| [`clearLogs`](#clearlogs) | Clear debug logs | `true` |
| [`assert`](#assert) | Assert condition | `true if passed` |
| [`trace`](#trace) | Get stack trace | `Stack trace` |
| [`memory`](#memory) | Get memory usage | `Memory stats in MB` |
| [`sizeof`](#sizeof) | Estimate value memory size | `{bytes, formatted}` |
| [`diff`](#diff) | Compare two values | `{equal, type, differences}` |
| [`freeze`](#freeze) | Deep freeze object | `Frozen copy` |
| [`clone`](#clone) | Deep clone value | `Cloned value` |
| [`table`](#table) | Format as ASCII table | `Formatted table` |
| [`dump`](#dump) | Pretty-print value | `Formatted string` |


## Functions

### inspect

Deep inspect a value

**Module:** `debug` | **Returns:** `object` -- {type, value, keys, length}

```robinpath
debug.inspect $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to inspect |

---

### typeOf

Get detailed type

**Module:** `debug` | **Returns:** `string` -- Type name

```robinpath
debug.typeOf $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value |

---

### timeStart

Start a timer

**Module:** `debug` | **Returns:** `string` -- Label

```robinpath
debug.timeStart "fetch"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `label` | `string` | Yes | Timer label |

---

### timeEnd

End timer and get duration

**Module:** `debug` | **Returns:** `object` -- {label, duration, durationFormatted}

```robinpath
debug.timeEnd "fetch"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `label` | `string` | Yes | Timer label |

---

### timeit

Pass value through with timing

**Module:** `debug` | **Returns:** `object` -- {result, durationMs}

```robinpath
debug.timeit $result
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to pass through |

---

### count

Increment counter

**Module:** `debug` | **Returns:** `number` -- Current count

```robinpath
debug.count "iterations"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `label` | `string` | Yes | Counter name |

---

### countReset

Reset counter

**Module:** `debug` | **Returns:** `boolean` -- true

```robinpath
debug.countReset "iterations"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `label` | `string` | Yes | Counter name |

---

### countGet

Get counter value

**Module:** `debug` | **Returns:** `number` -- Count

```robinpath
debug.countGet "iterations"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `label` | `string` | Yes | Counter name |

---

### log

Add debug log entry

**Module:** `debug` | **Returns:** `object` -- Log entry

```robinpath
debug.log "Processing item" $item
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message` | `string` | Yes | Log message |
| `data` | `any` | No | Extra data |

---

### getLogs

Get debug logs

**Module:** `debug` | **Returns:** `array` -- Log entries

```robinpath
debug.getLogs
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `level` | `string` | No | Filter by level |

---

### clearLogs

Clear debug logs

**Module:** `debug` | **Returns:** `boolean` -- true

```robinpath
debug.clearLogs
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### assert

Assert condition

**Module:** `debug` | **Returns:** `boolean` -- true if passed

```robinpath
debug.assert $valid "Should be valid"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `condition` | `any` | Yes | Condition |
| `message` | `string` | No | Error message |

---

### trace

Get stack trace

**Module:** `debug` | **Returns:** `string` -- Stack trace

```robinpath
debug.trace
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### memory

Get memory usage

**Module:** `debug` | **Returns:** `object` -- Memory stats in MB

```robinpath
debug.memory
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### sizeof

Estimate value memory size

**Module:** `debug` | **Returns:** `object` -- {bytes, formatted}

```robinpath
debug.sizeof $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value |

---

### diff

Compare two values

**Module:** `debug` | **Returns:** `object` -- {equal, type, differences}

```robinpath
debug.diff $old $new
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `a` | `any` | Yes | First value |
| `b` | `any` | Yes | Second value |

---

### freeze

Deep freeze object

**Module:** `debug` | **Returns:** `object` -- Frozen copy

```robinpath
debug.freeze $config
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `any` | Yes | Object to freeze |

---

### clone

Deep clone value

**Module:** `debug` | **Returns:** `any` -- Cloned value

```robinpath
debug.clone $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to clone |

---

### table

Format as ASCII table

**Module:** `debug` | **Returns:** `string` -- Formatted table

```robinpath
debug.table $users
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `array` | Yes | Array of objects |
| `columns` | `array` | No | Column names |

---

### dump

Pretty-print value

**Module:** `debug` | **Returns:** `string` -- Formatted string

```robinpath
debug.dump $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value |
| `options` | `object` | No | {depth} |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Timer "..." not found` | Check the error message for details |

```robinpath
set $result as debug.inspect $data
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Logs

Retrieve all items and loop through them.

```robinpath
set $result as debug.getLogs
each $item in $result
  print $item
end
```

### 2. Multi-step Debug workflow

Chain multiple debug operations together.

```robinpath
set $r_inspect as debug.inspect $data
set $r_typeOf as debug.typeOf $data
set $r_timeStart as debug.timeStart "fetch"
print "All operations complete"
```

### 3. Safe inspect with validation

Check results before proceeding.

```robinpath
set $result as debug.inspect $data
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
