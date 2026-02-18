---
title: "String"
module: "string"
package: "@robinpath/string"
description: "String manipulation utilities: case conversion, slugify, truncate, pad, reverse, and more"
category: "utility"
tags: [string, utility]
type: "utility"
auth: "none"
functionCount: 15
---

# String

> String manipulation utilities: case conversion, slugify, truncate, pad, reverse, and more

**Package:** `@robinpath/string` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `string` module when you need to:

- **Capitalize the first letter of a string** -- Use `string.capitalize` to perform this operation
- **Convert a string to camelCase** -- Use `string.camelCase` to perform this operation
- **Convert a string to snake_case** -- Use `string.snakeCase` to perform this operation
- **Convert a string to kebab-case** -- Use `string.kebabCase` to perform this operation
- **Convert a string to PascalCase** -- Use `string.pascalCase` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`capitalize`](#capitalize) | Capitalize the first letter of a string | `String with first letter capitalized` |
| [`camelCase`](#camelcase) | Convert a string to camelCase | `camelCase string` |
| [`snakeCase`](#snakecase) | Convert a string to snake_case | `snake_case string` |
| [`kebabCase`](#kebabcase) | Convert a string to kebab-case | `kebab-case string` |
| [`pascalCase`](#pascalcase) | Convert a string to PascalCase | `PascalCase string` |
| [`titleCase`](#titlecase) | Capitalize the first letter of each word | `Title Case string` |
| [`slugify`](#slugify) | Convert a string to a URL-friendly slug | `URL-friendly slug` |
| [`truncate`](#truncate) | Truncate a string to a maximum length with a suffix | `Truncated string` |
| [`padStart`](#padstart) | Pad the start of a string to a target length | `Padded string` |
| [`padEnd`](#padend) | Pad the end of a string to a target length | `Padded string` |
| [`reverse`](#reverse) | Reverse a string | `Reversed string` |
| [`wordCount`](#wordcount) | Count the number of words in a string | `Number of words` |
| [`contains`](#contains) | Check if a string contains a substring | `True if the string contains the substring` |
| [`repeat`](#repeat) | Repeat a string N times | `Repeated string` |
| [`replaceAll`](#replaceall) | Replace all occurrences of a search string with a replacement | `String with all occurrences replaced` |


## Functions

### capitalize

Capitalize the first letter of a string

**Module:** `string` | **Returns:** `string` -- String with first letter capitalized

```robinpath
string.capitalize "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | The string to capitalize |

---

### camelCase

Convert a string to camelCase

**Module:** `string` | **Returns:** `string` -- camelCase string

```robinpath
string.camelCase "hello world"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | The string to convert |

---

### snakeCase

Convert a string to snake_case

**Module:** `string` | **Returns:** `string` -- snake_case string

```robinpath
string.snakeCase "helloWorld"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | The string to convert |

---

### kebabCase

Convert a string to kebab-case

**Module:** `string` | **Returns:** `string` -- kebab-case string

```robinpath
string.kebabCase "helloWorld"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | The string to convert |

---

### pascalCase

Convert a string to PascalCase

**Module:** `string` | **Returns:** `string` -- PascalCase string

```robinpath
string.pascalCase "hello world"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | The string to convert |

---

### titleCase

Capitalize the first letter of each word

**Module:** `string` | **Returns:** `string` -- Title Case string

```robinpath
string.titleCase "hello world"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | The string to convert |

---

### slugify

Convert a string to a URL-friendly slug

**Module:** `string` | **Returns:** `string` -- URL-friendly slug

```robinpath
string.slugify "Hello World!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | The string to slugify |

---

### truncate

Truncate a string to a maximum length with a suffix

**Module:** `string` | **Returns:** `string` -- Truncated string

```robinpath
string.truncate "Hello World" 8
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | The string to truncate |
| `maxLength` | `number` | Yes | Maximum length |
| `suffix` | `string` | No | Suffix to append (default: '...') |

---

### padStart

Pad the start of a string to a target length

**Module:** `string` | **Returns:** `string` -- Padded string

```robinpath
string.padStart "5" 3 "0"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | The string to pad |
| `targetLength` | `number` | Yes | Target length |
| `padChar` | `string` | No | Pad character (default: space) |

---

### padEnd

Pad the end of a string to a target length

**Module:** `string` | **Returns:** `string` -- Padded string

```robinpath
string.padEnd "hi" 5 "."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | The string to pad |
| `targetLength` | `number` | Yes | Target length |
| `padChar` | `string` | No | Pad character (default: space) |

---

### reverse

Reverse a string

**Module:** `string` | **Returns:** `string` -- Reversed string

```robinpath
string.reverse "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | The string to reverse |

---

### wordCount

Count the number of words in a string

**Module:** `string` | **Returns:** `number` -- Number of words

```robinpath
string.wordCount "hello world"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | The string to count words in |

---

### contains

Check if a string contains a substring

**Module:** `string` | **Returns:** `boolean` -- True if the string contains the substring

```robinpath
string.contains "hello world" "world"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | The string to search in |
| `substring` | `string` | Yes | The substring to search for |

---

### repeat

Repeat a string N times

**Module:** `string` | **Returns:** `string` -- Repeated string

```robinpath
string.repeat "ab" 3
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | The string to repeat |
| `count` | `number` | Yes | Number of repetitions |

---

### replaceAll

Replace all occurrences of a search string with a replacement

**Module:** `string` | **Returns:** `string` -- String with all occurrences replaced

```robinpath
string.replaceAll "hello world" "o" "0"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | The input string |
| `search` | `string` | Yes | The string to search for |
| `replacement` | `string` | Yes | The replacement string |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as string.capitalize "hello"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step String workflow

Chain multiple string operations together.

```robinpath
set $r_capitalize as string.capitalize "hello"
set $r_camelCase as string.camelCase "hello world"
set $r_snakeCase as string.snakeCase "helloWorld"
print "All operations complete"
```

### 2. Safe capitalize with validation

Check results before proceeding.

```robinpath
set $result as string.capitalize "hello"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
