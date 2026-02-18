---
title: "Color"
module: "color"
package: "@robinpath/color"
description: "Terminal ANSI color utilities: red, green, blue, bold, underline, RGB, and more."
category: "utility"
tags: [color, ansi, terminal, formatting, cli]
type: "utility"
auth: "none"
functionCount: 18
---

# Color

> Terminal ANSI color utilities: red, green, blue, bold, underline, RGB, and more.

The `color` module provides ANSI escape code wrappers for terminal text styling. It supports foreground colors, background colors, text decorations (bold, dim, italic, underline, strikethrough), custom RGB colors, and stripping ANSI codes from text. Use it to add visual formatting to CLI output in RobinPath scripts.

**Package:** `@robinpath/color` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `color` module when you need to:

- **Highlight errors and warnings** -- color error messages red, warnings yellow
- **Format CLI output** -- add bold, underline, or italic styling to terminal text
- **Color-code log levels** -- green for success, red for errors, gray for debug
- **Use custom colors** -- apply any RGB color to text with `color.rgb`
- **Strip formatting** -- remove ANSI codes from colored text for plain output


## Quick Reference

| Function | Description | Returns |
|----------|-------------|---------|
| [`red`](#red) | Wrap text in red | `string` |
| [`green`](#green) | Wrap text in green | `string` |
| [`blue`](#blue) | Wrap text in blue | `string` |
| [`yellow`](#yellow) | Wrap text in yellow | `string` |
| [`cyan`](#cyan) | Wrap text in cyan | `string` |
| [`magenta`](#magenta) | Wrap text in magenta | `string` |
| [`white`](#white) | Wrap text in white | `string` |
| [`gray`](#gray) | Wrap text in gray | `string` |
| [`bold`](#bold) | Wrap text in bold | `string` |
| [`dim`](#dim) | Wrap text in dim | `string` |
| [`italic`](#italic) | Wrap text in italic | `string` |
| [`underline`](#underline) | Wrap text with underline | `string` |
| [`strikethrough`](#strikethrough) | Wrap text with strikethrough | `string` |
| [`bgRed`](#bgred) | Wrap text with red background | `string` |
| [`bgGreen`](#bggreen) | Wrap text with green background | `string` |
| [`bgBlue`](#bgblue) | Wrap text with blue background | `string` |
| [`strip`](#strip) | Strip all ANSI escape codes from text | `string` |
| [`rgb`](#rgb) | Wrap text with custom RGB foreground color | `string` |


## Functions

### red

Wrap text in red foreground color.

**Module:** `color` | **Returns:** `string` -- ANSI-colored string

```robinpath
set $msg as color.red "error"
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to colorize |

---

### green

Wrap text in green foreground color.

**Module:** `color` | **Returns:** `string` -- ANSI-colored string

```robinpath
set $msg as color.green "success"
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to colorize |

---

### blue

Wrap text in blue foreground color.

**Module:** `color` | **Returns:** `string` -- ANSI-colored string

```robinpath
set $msg as color.blue "info"
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to colorize |

---

### yellow

Wrap text in yellow foreground color.

**Module:** `color` | **Returns:** `string` -- ANSI-colored string

```robinpath
set $msg as color.yellow "warning"
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to colorize |

---

### cyan

Wrap text in cyan foreground color.

**Module:** `color` | **Returns:** `string` -- ANSI-colored string

```robinpath
set $msg as color.cyan "info"
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to colorize |

---

### magenta

Wrap text in magenta foreground color.

**Module:** `color` | **Returns:** `string` -- ANSI-colored string

```robinpath
set $msg as color.magenta "special"
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to colorize |

---

### white

Wrap text in white foreground color.

**Module:** `color` | **Returns:** `string` -- ANSI-colored string

```robinpath
set $msg as color.white "text"
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to colorize |

---

### gray

Wrap text in gray foreground color.

**Module:** `color` | **Returns:** `string` -- ANSI-colored string

```robinpath
set $msg as color.gray "muted"
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to colorize |

---

### bold

Wrap text in bold style.

**Module:** `color` | **Returns:** `string` -- ANSI-styled string

```robinpath
set $msg as color.bold "important"
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to style |

---

### dim

Wrap text in dim style.

**Module:** `color` | **Returns:** `string` -- ANSI-styled string

```robinpath
set $msg as color.dim "subtle"
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to style |

---

### italic

Wrap text in italic style.

**Module:** `color` | **Returns:** `string` -- ANSI-styled string

```robinpath
set $msg as color.italic "emphasis"
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to style |

---

### underline

Wrap text with underline decoration.

**Module:** `color` | **Returns:** `string` -- ANSI-styled string

```robinpath
set $msg as color.underline "link"
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to style |

---

### strikethrough

Wrap text with strikethrough decoration.

**Module:** `color` | **Returns:** `string` -- ANSI-styled string

```robinpath
set $msg as color.strikethrough "deleted"
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to style |

---

### bgRed

Wrap text with red background color.

**Module:** `color` | **Returns:** `string` -- ANSI-colored string

```robinpath
set $msg as color.bgRed "alert"
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to colorize |

---

### bgGreen

Wrap text with green background color.

**Module:** `color` | **Returns:** `string` -- ANSI-colored string

```robinpath
set $msg as color.bgGreen "pass"
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to colorize |

---

### bgBlue

Wrap text with blue background color.

**Module:** `color` | **Returns:** `string` -- ANSI-colored string

```robinpath
set $msg as color.bgBlue "info"
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to colorize |

---

### strip

Strip all ANSI escape codes from text, returning plain unformatted text.

**Module:** `color` | **Returns:** `string` -- Plain text without ANSI codes

```robinpath
set $colored as color.red "error message"
set $plain as color.strip $colored
print $plain
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text with ANSI codes to strip |

---

### rgb

Wrap text with a custom RGB foreground color (24-bit true color).

**Module:** `color` | **Returns:** `string` -- RGB-colored string

```robinpath
set $msg as color.rgb "custom colored text" 255 128 0
print $msg
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to color |
| `r` | `number` | Yes | Red component (0-255) |
| `g` | `number` | Yes | Green component (0-255) |
| `b` | `number` | Yes | Blue component (0-255) |


## Error Handling

Color functions do not throw errors. If called with no arguments, they return an empty colored string. The `strip` function safely handles text with no ANSI codes.

```robinpath
set $result as color.red "safe to call"
print $result
```


## Recipes

### 1. Color-coded log output

Print messages with different colors based on severity level.

```robinpath
print color.red "[ERROR] Database connection failed"
print color.yellow "[WARN] Cache miss for key: user_123"
print color.green "[OK] Server started on port 3000"
print color.gray "[DEBUG] Request payload: {id: 1}"
```

### 2. Styled headers and sections

Use bold and underline for section headers in CLI output.

```robinpath
print color.bold color.underline "=== Build Report ==="
print color.green "Tests: 42 passed"
print color.yellow "Warnings: 3"
print color.red "Errors: 0"
print color.dim "Generated at 2024-06-20 14:30"
```

### 3. Custom brand colors with RGB

Apply exact brand colors using RGB values.

```robinpath
set $brand as color.rgb "Anthropic" 191 144 0
set $accent as color.rgb "Claude" 100 180 255
print $brand
print $accent
```

### 4. Highlight errors in a list

Loop through items and color-code based on status.

```robinpath
set $items as [{"name": "API", "status": "ok"}, {"name": "DB", "status": "error"}, {"name": "Cache", "status": "warning"}]
each $item in $items
  if $item.status == "ok"
    print color.green $item.name + ": " + $item.status
  end
  if $item.status == "error"
    print color.red $item.name + ": " + $item.status
  end
  if $item.status == "warning"
    print color.yellow $item.name + ": " + $item.status
  end
end
```

### 5. Background highlights for alerts

Use background colors for critical alerts.

```robinpath
print color.bgRed color.bold " CRITICAL: Service down "
print color.bgGreen " RESOLVED: Service restored "
```

### 6. Strip colors for file output

Remove ANSI codes before writing to a file or sending to an API.

```robinpath
set $colored as color.green "Success: 42 tests passed"
print $colored
set $plain as color.strip $colored
# $plain is now "Success: 42 tests passed" without ANSI codes
```


## Related Modules

- **log** -- Structured logging that can use color for formatted output
- **string** -- String manipulation utilities for text processing
- **debug** -- Debug output utilities complemented by color formatting
- **template** -- Template rendering that can include colored placeholders
