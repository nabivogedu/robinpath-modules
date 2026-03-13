---
title: "TTY"
module: "tty"
package: "@robinpath/tty"
description: "Terminal detection, size, color support, and cursor control"
category: "core"
tags: [tty, terminal, console, cursor, core]
type: "builtin"
auth: "none"
functionCount: 14
---

# TTY

> Terminal detection, size, color support, and cursor control

**Package:** `@robinpath/tty` | **Category:** Core | **Type:** Built-in

## Authentication

No authentication required. All functions are available immediately.

## Use Cases

Use the `tty` module when you need to:

- **Check if running in a terminal** -- Use `tty.isatty`, `tty.isStdinTTY`, `tty.isStdoutTTY`
- **Get terminal dimensions** -- Use `tty.columns`, `tty.rows`, or `tty.size`
- **Check color support** -- Use `tty.hasColors`, `tty.colorDepth`, `tty.supportsColor`
- **Control the cursor** -- Use `tty.cursorTo`, `tty.moveCursor`, `tty.clearLine`

## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`isatty`](#isatty) | Check if a file descriptor is a TTY | `boolean` |
| [`isStdinTTY`](#isstdintty) | Check if stdin is a TTY | `boolean` |
| [`isStdoutTTY`](#isstdouttty) | Check if stdout is a TTY | `boolean` |
| [`isStderrTTY`](#isstderrtty) | Check if stderr is a TTY | `boolean` |
| [`columns`](#columns) | Get terminal width in columns | `number` |
| [`rows`](#rows) | Get terminal height in rows | `number` |
| [`size`](#size) | Get terminal dimensions as [columns, rows] | `Array` |
| [`hasColors`](#hascolors) | Check if terminal supports a color count | `boolean` |
| [`colorDepth`](#colordepth) | Get the color depth of the terminal | `number` |
| [`supportsColor`](#supportscolor) | Check if terminal supports color | `boolean` |
| [`getWindowSize`](#getwindowsize) | Get window size as [width, height] | `Array` |
| [`clearLine`](#clearline) | Clear the current terminal line | `boolean` |
| [`cursorTo`](#cursorto) | Move cursor to absolute position | `boolean` |
| [`moveCursor`](#movecursor) | Move cursor relative to current position | `boolean` |

## Functions

### isatty

Check if a file descriptor is connected to a TTY terminal

**Module:** `tty` | **Returns:** `boolean` -- True if TTY

```robinpath
tty.isatty 1
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fd` | `number` | Yes | File descriptor (0=stdin, 1=stdout, 2=stderr) |

---

### isStdinTTY

Check if stdin is connected to a TTY

**Module:** `tty` | **Returns:** `boolean` -- True if stdin is a TTY

```robinpath
tty.isStdinTTY
```

No parameters required.

---

### isStdoutTTY

Check if stdout is connected to a TTY

**Module:** `tty` | **Returns:** `boolean` -- True if stdout is a TTY

```robinpath
tty.isStdoutTTY
```

No parameters required.

---

### isStderrTTY

Check if stderr is connected to a TTY

**Module:** `tty` | **Returns:** `boolean` -- True if stderr is a TTY

```robinpath
tty.isStderrTTY
```

No parameters required.

---

### columns

Get the terminal width in columns

**Module:** `tty` | **Returns:** `number` -- Number of columns

```robinpath
tty.columns
```

No parameters required.

---

### rows

Get the terminal height in rows

**Module:** `tty` | **Returns:** `number` -- Number of rows

```robinpath
tty.rows
```

No parameters required.

---

### size

Get terminal dimensions as an array [columns, rows]

**Module:** `tty` | **Returns:** `Array` -- [columns, rows]

```robinpath
tty.size
```

No parameters required.

---

### hasColors

Check if the terminal supports a given number of colors

**Module:** `tty` | **Returns:** `boolean` -- True if color count is supported

```robinpath
tty.hasColors 256
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `count` | `number` | No | Number of colors to check (default: 16) |

---

### colorDepth

Get the color depth of the terminal (1, 4, 8, or 24 bits)

**Module:** `tty` | **Returns:** `number` -- Color depth in bits

```robinpath
tty.colorDepth
```

No parameters required.

---

### supportsColor

Check if the terminal supports any color output

**Module:** `tty` | **Returns:** `boolean` -- True if color is supported

```robinpath
tty.supportsColor
```

No parameters required.

---

### getWindowSize

Get the window size as [width, height] in characters

**Module:** `tty` | **Returns:** `Array` -- [width, height]

```robinpath
tty.getWindowSize
```

No parameters required.

---

### clearLine

Clear the current line in the terminal

**Module:** `tty` | **Returns:** `boolean` -- True if line was cleared

```robinpath
tty.clearLine 0
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `direction` | `number` | No | -1 left, 0 entire, 1 right (default: 0) |

---

### cursorTo

Move cursor to an absolute position in the terminal

**Module:** `tty` | **Returns:** `boolean` -- True if cursor was moved

```robinpath
tty.cursorTo 0 5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `x` | `number` | Yes | Column position |
| `y` | `number` | No | Row position |

---

### moveCursor

Move cursor relative to its current position

**Module:** `tty` | **Returns:** `boolean` -- True if cursor was moved

```robinpath
tty.moveCursor 1 -1
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dx` | `number` | Yes | Columns to move (negative = left) |
| `dy` | `number` | No | Rows to move (negative = up) |

---

## Error Handling

| Error | Cause |
|-------|-------|
| Not a TTY | Operation requires a terminal but none is connected |

```robinpath
@desc "Check terminal before using TTY features"
do
  if tty.isStdoutTTY
    print "Running in terminal"
    set $dims as tty.size
    print "Size: " + $dims[0] + "x" + $dims[1]
  else
    print "Not running in a terminal"
  end
enddo
```

## Recipes

### 1. Adaptive output based on terminal

Adjust output based on terminal capabilities.

```robinpath
@desc "Format output for terminal"
do
  if tty.isStdoutTTY
    set $width as tty.columns
    if tty.supportsColor
      print "Color terminal, " + $width + " columns wide"
    else
      print "No color support"
    end
  else
    print "Piped output, no formatting"
  end
enddo
```

### 2. Simple progress indicator

Use cursor control for a progress display.

```robinpath
@desc "Show progress"
do
  set $total as 10
  each $i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    tty.cursorTo 0
    tty.clearLine 0
    print "Progress: " + $i + "/" + $total
    timer.sleep 500
  endeach
  print "\nDone!"
enddo
```

## Related Modules

- **process** -- Process stdin/stdout/stderr
- **util** -- Formatting utilities
