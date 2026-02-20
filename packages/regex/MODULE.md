---
title: "Regex"
module: "regex"
package: "@robinpath/regex"
description: "Regular expression operations for pattern matching, searching, and replacing"
category: "utility"
tags: [regex, utility]
type: "utility"
auth: "none"
functionCount: 7
---

# Regex

> Regular expression operations for pattern matching, searching, and replacing

**Package:** `@robinpath/regex` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `regex` module when you need to:

- **Test if a string matches a regular expression pattern** -- Use `regex.test` to perform this operation
- **Find the first match of a pattern in a string** -- Use `regex.match` to perform this operation
- **Find all matches of a pattern in a string** -- Use `regex.matchAll` to perform this operation
- **Replace matches of a pattern in a string** -- Use `regex.replace` to perform this operation
- **Split a string by a regular expression pattern** -- Use `regex.split` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`test`](#test) | Test if a string matches a regular expression pattern | `True if the string matches the pattern, false otherwise` |
| [`match`](#match) | Find the first match of a pattern in a string | `The first matching substring, or null if no match` |
| [`matchAll`](#matchall) | Find all matches of a pattern in a string | `Array of all matching substrings` |
| [`replace`](#replace) | Replace matches of a pattern in a string | `The string with matches replaced` |
| [`split`](#split) | Split a string by a regular expression pattern | `Array of substrings split by the pattern` |
| [`capture`](#capture) | Extract capture groups from the first match of a pattern | `Array of captured group strings, or null if no match` |
| [`escape`](#escape) | Escape special regular expression characters in a string | `The string with special regex characters escaped` |


## Functions

### test

Test if a string matches a regular expression pattern

**Module:** `regex` | **Returns:** `boolean` -- True if the string matches the pattern, false otherwise

```robinpath
regex.test "hello world" "^hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `string` | `string` | Yes | The string to test against the pattern |
| `pattern` | `string` | Yes | The regular expression pattern |
| `flags` | `string` | No | Regex flags (e.g. "i" for case-insensitive, "m" for multiline) |

---

### match

Find the first match of a pattern in a string

**Module:** `regex` | **Returns:** `string` -- The first matching substring, or null if no match

```robinpath
regex.match "abc 123 def 456" "\d+"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `string` | `string` | Yes | The string to search |
| `pattern` | `string` | Yes | The regular expression pattern |
| `flags` | `string` | No | Regex flags (e.g. "i" for case-insensitive, "m" for multiline) |

---

### matchAll

Find all matches of a pattern in a string

**Module:** `regex` | **Returns:** `array` -- Array of all matching substrings

```robinpath
regex.matchAll "abc 123 def 456" "\d+"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `string` | `string` | Yes | The string to search |
| `pattern` | `string` | Yes | The regular expression pattern |
| `flags` | `string` | No | Regex flags (e.g. "i" for case-insensitive, "m" for multiline). The "g" flag is automatically added. |

---

### replace

Replace matches of a pattern in a string

**Module:** `regex` | **Returns:** `string` -- The string with matches replaced

```robinpath
regex.replace "abc 123 def 456" "\d+" "X"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `string` | `string` | Yes | The string to perform replacements on |
| `pattern` | `string` | Yes | The regular expression pattern to match |
| `replacement` | `string` | Yes | The replacement string |
| `flags` | `string` | No | Regex flags (default: "g" for global replace) |

---

### split

Split a string by a regular expression pattern

**Module:** `regex` | **Returns:** `array` -- Array of substrings split by the pattern

```robinpath
regex.split "hello   world  foo" "\s+"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `string` | `string` | Yes | The string to split |
| `pattern` | `string` | Yes | The regular expression pattern to split on |
| `flags` | `string` | No | Regex flags (e.g. "i" for case-insensitive) |

---

### capture

Extract capture groups from the first match of a pattern

**Module:** `regex` | **Returns:** `array` -- Array of captured group strings, or null if no match

```robinpath
regex.capture "2024-01-15" "(\d{4})-(\d{2})-(\d{2})"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `string` | `string` | Yes | The string to search |
| `pattern` | `string` | Yes | The regular expression pattern with capture groups |
| `flags` | `string` | No | Regex flags (e.g. "i" for case-insensitive) |

---

### escape

Escape special regular expression characters in a string

**Module:** `regex` | **Returns:** `string` -- The string with special regex characters escaped

```robinpath
regex.escape "price is $9.99 (USD)"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `string` | `string` | Yes | The string to escape |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as regex.test "hello world" "^hello"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Regex workflow

Chain multiple regex operations together.

```robinpath
set $r_test as regex.test "hello world" "^hello"
set $r_match as regex.match "abc 123 def 456" "\d+"
set $r_matchAll as regex.matchAll "abc 123 def 456" "\d+"
print "All operations complete"
```

### 2. Safe test with validation

Check results before proceeding.

```robinpath
set $result as regex.test "hello world" "^hello"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
