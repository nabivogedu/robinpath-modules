---
title: "Log"
module: "log"
package: "@robinpath/log"
description: "Structured logging with levels, file output, JSON format, timers, and grouping"
category: "other"
tags: [log, other]
type: "utility"
auth: "none"
functionCount: 15
---

# Log

> Structured logging with levels, file output, JSON format, timers, and grouping

**Package:** `@robinpath/log` | **Category:** Other | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `log` module when you need to:

- **Log a message at DEBUG level to stdout** -- Use `log.debug` to perform this operation
- **Log a message at INFO level to stdout** -- Use `log.info` to perform this operation
- **Log a message at WARN level to stderr** -- Use `log.warn` to perform this operation
- **Log a message at ERROR level to stderr** -- Use `log.error` to perform this operation
- **Log a message at FATAL level to stderr** -- Use `log.fatal` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`debug`](#debug) | Log a message at DEBUG level to stdout | `True after logging` |
| [`info`](#info) | Log a message at INFO level to stdout | `True after logging` |
| [`warn`](#warn) | Log a message at WARN level to stderr | `True after logging` |
| [`error`](#error) | Log a message at ERROR level to stderr | `True after logging` |
| [`fatal`](#fatal) | Log a message at FATAL level to stderr | `True after logging` |
| [`setLevel`](#setlevel) | Set the minimum log level; messages below this level are suppressed | `True after setting the level` |
| [`getLevel`](#getlevel) | Get the current minimum log level as a string | `Current log level name (debug, info, warn, error, fatal, or silent)` |
| [`setFile`](#setfile) | Set a file path to append log output to in addition to stdout/stderr | `True after setting the file` |
| [`setFormat`](#setformat) | Set the output format for log messages | `True after setting the format` |
| [`clear`](#clear) | Reset all log settings to defaults (info level, no file, text format) | `True after resetting` |
| [`table`](#table) | Pretty-print an array of objects as a table to stdout | `True after printing the table` |
| [`group`](#group) | Print a group header and increase indentation for subsequent log messages | `True after opening the group` |
| [`groupEnd`](#groupend) | End the current group and decrease indentation | `True after closing the group` |
| [`time`](#time) | Start a named timer | `True after starting the timer` |
| [`timeEnd`](#timeend) | Stop a named timer and log the elapsed time in milliseconds | `Elapsed time in milliseconds` |


## Functions

### debug

Log a message at DEBUG level to stdout

**Module:** `log` | **Returns:** `boolean` -- True after logging

```robinpath
log.debug "variable x =" $x
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messages` | `string` | Yes | One or more messages to log |

---

### info

Log a message at INFO level to stdout

**Module:** `log` | **Returns:** `boolean` -- True after logging

```robinpath
log.info "Server started on port" $port
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messages` | `string` | Yes | One or more messages to log |

---

### warn

Log a message at WARN level to stderr

**Module:** `log` | **Returns:** `boolean` -- True after logging

```robinpath
log.warn "Deprecated function called"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messages` | `string` | Yes | One or more messages to log |

---

### error

Log a message at ERROR level to stderr

**Module:** `log` | **Returns:** `boolean` -- True after logging

```robinpath
log.error "Failed to connect:" $err
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messages` | `string` | Yes | One or more messages to log |

---

### fatal

Log a message at FATAL level to stderr

**Module:** `log` | **Returns:** `boolean` -- True after logging

```robinpath
log.fatal "Unrecoverable error, shutting down"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messages` | `string` | Yes | One or more messages to log |

---

### setLevel

Set the minimum log level; messages below this level are suppressed

**Module:** `log` | **Returns:** `boolean` -- True after setting the level

```robinpath
log.setLevel "warn"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `level` | `string` | Yes | Log level: debug, info, warn, error, fatal, or silent |

---

### getLevel

Get the current minimum log level as a string

**Module:** `log` | **Returns:** `string` -- Current log level name (debug, info, warn, error, fatal, or silent)

```robinpath
log.getLevel
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### setFile

Set a file path to append log output to in addition to stdout/stderr

**Module:** `log` | **Returns:** `boolean` -- True after setting the file

```robinpath
log.setFile "/tmp/app.log"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to the log file |

---

### setFormat

Set the output format for log messages

**Module:** `log` | **Returns:** `boolean` -- True after setting the format

```robinpath
log.setFormat "json"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `format` | `string` | Yes | Format: text (default) or json |

---

### clear

Reset all log settings to defaults (info level, no file, text format)

**Module:** `log` | **Returns:** `boolean` -- True after resetting

```robinpath
log.clear
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### table

Pretty-print an array of objects as a table to stdout

**Module:** `log` | **Returns:** `boolean` -- True after printing the table

```robinpath
log.table $rows
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `array` | Yes | Array of objects to display as a table |

---

### group

Print a group header and increase indentation for subsequent log messages

**Module:** `log` | **Returns:** `boolean` -- True after opening the group

```robinpath
log.group "Request handling"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `label` | `string` | Yes | Label for the group |

---

### groupEnd

End the current group and decrease indentation

**Module:** `log` | **Returns:** `boolean` -- True after closing the group

```robinpath
log.groupEnd
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### time

Start a named timer

**Module:** `log` | **Returns:** `boolean` -- True after starting the timer

```robinpath
log.time "db-query"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `label` | `string` | Yes | Label for the timer |

---

### timeEnd

Stop a named timer and log the elapsed time in milliseconds

**Module:** `log` | **Returns:** `number` -- Elapsed time in milliseconds

```robinpath
log.timeEnd "db-query"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `label` | `string` | Yes | Label of the timer to stop |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Invalid format: ${fmt}. Valid formats: text, json` | Check the error message for details |
| `Invalid log level: .... Valid levels: ...` | Check the error message for details |
| `Timer "..." does not exist` | Check the error message for details |

```robinpath
set $result as log.debug "variable x =" $x
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Level

Retrieve all items and loop through them.

```robinpath
set $result as log.getLevel
each $item in $result
  print $item
end
```

### 2. Multi-step Log workflow

Chain multiple log operations together.

```robinpath
set $r_debug as log.debug "variable x =" $x
set $r_info as log.info "Server started on port" $port
set $r_warn as log.warn "Deprecated function called"
print "All operations complete"
```

### 3. Safe debug with validation

Check results before proceeding.

```robinpath
set $result as log.debug "variable x =" $x
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
