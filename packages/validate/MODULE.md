---
title: "Validate"
module: "validate"
package: "@robinpath/validate"
description: "Validate strings, numbers, and data formats (email, URL, IP, UUID, JSON, etc.)"
category: "utility"
tags: [validate, utility, email]
type: "utility"
auth: "none"
functionCount: 14
---

# Validate

> Validate strings, numbers, and data formats (email, URL, IP, UUID, JSON, etc.)

**Package:** `@robinpath/validate` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `validate` module when you need to:

- **Validate email format** -- Use `validate.isEmail` to perform this operation
- **Validate URL format** -- Use `validate.isUrl` to perform this operation
- **Validate IPv4 address format** -- Use `validate.isIP` to perform this operation
- **Validate UUID format** -- Use `validate.isUUID` to perform this operation
- **Check if a string is a valid date** -- Use `validate.isDate` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`isEmail`](#isemail) | Validate email format | `True if the string is a valid email format` |
| [`isUrl`](#isurl) | Validate URL format | `True if the string is a valid URL` |
| [`isIP`](#isip) | Validate IPv4 address format | `True if the string is a valid IPv4 address` |
| [`isUUID`](#isuuid) | Validate UUID format | `True if the string is a valid UUID` |
| [`isDate`](#isdate) | Check if a string is a valid date | `True if the string can be parsed as a valid date` |
| [`isNumeric`](#isnumeric) | Check if a string is numeric | `True if the string represents a valid number` |
| [`isAlpha`](#isalpha) | Check if a string contains only letters | `True if the string contains only alphabetic characters` |
| [`isAlphanumeric`](#isalphanumeric) | Check if a string contains only letters and digits | `True if the string contains only alphanumeric characters` |
| [`matches`](#matches) | Test a string against a regular expression pattern | `True if the string matches the pattern` |
| [`minLength`](#minlength) | Check if a string meets a minimum length | `True if the string length is >= min` |
| [`maxLength`](#maxlength) | Check if a string does not exceed a maximum length | `True if the string length is <= max` |
| [`inRange`](#inrange) | Check if a number is within a range (inclusive) | `True if value >= min and value <= max` |
| [`isJSON`](#isjson) | Check if a string is valid JSON | `True if the string can be parsed as valid JSON` |
| [`isEmpty`](#isempty) | Check if a value is empty (null, undefined, empty string, empty array, or empty object) | `True if the value is considered empty` |


## Functions

### isEmail

Validate email format

**Module:** `validate` | **Returns:** `boolean` -- True if the string is a valid email format

```robinpath
validate.isEmail "user@example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | The string to validate as an email address |

---

### isUrl

Validate URL format

**Module:** `validate` | **Returns:** `boolean` -- True if the string is a valid URL

```robinpath
validate.isUrl "https://example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | The string to validate as a URL |

---

### isIP

Validate IPv4 address format

**Module:** `validate` | **Returns:** `boolean` -- True if the string is a valid IPv4 address

```robinpath
validate.isIP "192.168.1.1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | The string to validate as an IPv4 address |

---

### isUUID

Validate UUID format

**Module:** `validate` | **Returns:** `boolean` -- True if the string is a valid UUID

```robinpath
validate.isUUID "550e8400-e29b-41d4-a716-446655440000"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | The string to validate as a UUID |

---

### isDate

Check if a string is a valid date

**Module:** `validate` | **Returns:** `boolean` -- True if the string can be parsed as a valid date

```robinpath
validate.isDate "2024-01-15"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | The string to validate as a date |

---

### isNumeric

Check if a string is numeric

**Module:** `validate` | **Returns:** `boolean` -- True if the string represents a valid number

```robinpath
validate.isNumeric "123.45"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | The string to check |

---

### isAlpha

Check if a string contains only letters

**Module:** `validate` | **Returns:** `boolean` -- True if the string contains only alphabetic characters

```robinpath
validate.isAlpha "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | The string to check |

---

### isAlphanumeric

Check if a string contains only letters and digits

**Module:** `validate` | **Returns:** `boolean` -- True if the string contains only alphanumeric characters

```robinpath
validate.isAlphanumeric "hello123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | The string to check |

---

### matches

Test a string against a regular expression pattern

**Module:** `validate` | **Returns:** `boolean` -- True if the string matches the pattern

```robinpath
validate.matches $str "^\\d{3}$"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | The string to test |
| `pattern` | `string` | Yes | The regular expression pattern |
| `flags` | `string` | No | Optional regex flags (e.g. "i" for case-insensitive) |

---

### minLength

Check if a string meets a minimum length

**Module:** `validate` | **Returns:** `boolean` -- True if the string length is >= min

```robinpath
validate.minLength "hello" 3
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | The string to check |
| `min` | `number` | Yes | The minimum required length |

---

### maxLength

Check if a string does not exceed a maximum length

**Module:** `validate` | **Returns:** `boolean` -- True if the string length is <= max

```robinpath
validate.maxLength "hi" 5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | The string to check |
| `max` | `number` | Yes | The maximum allowed length |

---

### inRange

Check if a number is within a range (inclusive)

**Module:** `validate` | **Returns:** `boolean` -- True if value >= min and value <= max

```robinpath
validate.inRange 5 1 10
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `number` | Yes | The number to check |
| `min` | `number` | Yes | The minimum value (inclusive) |
| `max` | `number` | Yes | The maximum value (inclusive) |

---

### isJSON

Check if a string is valid JSON

**Module:** `validate` | **Returns:** `boolean` -- True if the string can be parsed as valid JSON

```robinpath
validate.isJSON '{"a":1}'
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | The string to check |

---

### isEmpty

Check if a value is empty (null, undefined, empty string, empty array, or empty object)

**Module:** `validate` | **Returns:** `boolean` -- True if the value is considered empty

```robinpath
validate.isEmpty ""
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | The value to check |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as validate.isEmail "user@example.com"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Validate workflow

Chain multiple validate operations together.

```robinpath
set $r_isEmail as validate.isEmail "user@example.com"
set $r_isUrl as validate.isUrl "https://example.com"
set $r_isIP as validate.isIP "192.168.1.1"
print "All operations complete"
```

### 2. Safe isEmail with validation

Check results before proceeding.

```robinpath
set $result as validate.isEmail "user@example.com"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
