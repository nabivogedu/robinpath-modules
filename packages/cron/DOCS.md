---
title: "Cron"
module: "cron"
package: "@robinpath/cron"
description: "Cron expression parsing, validation, scheduling, and human-readable descriptions"
category: "infrastructure"
tags: [cron, infrastructure]
type: "utility"
auth: "none"
functionCount: 8
---

# Cron

> Cron expression parsing, validation, scheduling, and human-readable descriptions

**Package:** `@robinpath/cron` | **Category:** Infrastructure | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `cron` module when you need to:

- **Validate a cron expression** -- Use `cron.isValid` to perform this operation
- **Parse cron expression into expanded fields** -- Use `cron.parse` to perform this operation
- **Get next occurrence after a date** -- Use `cron.next` to perform this operation
- **Get next N occurrences** -- Use `cron.nextN` to perform this operation
- **Get previous occurrence before a date** -- Use `cron.prev` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`isValid`](#isvalid) | Validate a cron expression | `True if valid` |
| [`parse`](#parse) | Parse cron expression into expanded fields | `{minute[], hour[], dayOfMonth[], month[], dayOfWeek[]}` |
| [`next`](#next) | Get next occurrence after a date | `ISO date string` |
| [`nextN`](#nextn) | Get next N occurrences | `Array of ISO date strings` |
| [`prev`](#prev) | Get previous occurrence before a date | `ISO date string` |
| [`matches`](#matches) | Check if a date matches a cron expression | `True if matches` |
| [`describe`](#describe) | Human-readable description of a cron expression | `Description string` |
| [`between`](#between) | Get all occurrences between two dates | `Array of ISO date strings` |


## Functions

### isValid

Validate a cron expression

**Module:** `cron` | **Returns:** `boolean` -- True if valid

```robinpath
cron.isValid "*/5 * * * *"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `expression` | `string` | Yes | Cron expression (5 fields) |

---

### parse

Parse cron expression into expanded fields

**Module:** `cron` | **Returns:** `object` -- {minute[], hour[], dayOfMonth[], month[], dayOfWeek[]}

```robinpath
cron.parse "0 9 * * 1-5"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `expression` | `string` | Yes | Cron expression |

---

### next

Get next occurrence after a date

**Module:** `cron` | **Returns:** `string` -- ISO date string

```robinpath
cron.next "*/5 * * * *"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `expression` | `string` | Yes | Cron expression |
| `from` | `string` | No | From date (default: now) |

---

### nextN

Get next N occurrences

**Module:** `cron` | **Returns:** `array` -- Array of ISO date strings

```robinpath
cron.nextN "0 * * * *" 10
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `expression` | `string` | Yes | Cron expression |
| `count` | `number` | No | Number of occurrences (default: 5) |
| `from` | `string` | No | From date (default: now) |

---

### prev

Get previous occurrence before a date

**Module:** `cron` | **Returns:** `string` -- ISO date string

```robinpath
cron.prev "0 9 * * *"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `expression` | `string` | Yes | Cron expression |
| `from` | `string` | No | From date (default: now) |

---

### matches

Check if a date matches a cron expression

**Module:** `cron` | **Returns:** `boolean` -- True if matches

```robinpath
cron.matches "0 9 * * *" "2024-01-15T09:00:00"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `expression` | `string` | Yes | Cron expression |
| `date` | `string` | No | Date to check (default: now) |

---

### describe

Human-readable description of a cron expression

**Module:** `cron` | **Returns:** `string` -- Description string

```robinpath
cron.describe "*/5 * * * *"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `expression` | `string` | Yes | Cron expression |

---

### between

Get all occurrences between two dates

**Module:** `cron` | **Returns:** `array` -- Array of ISO date strings

```robinpath
cron.between "0 * * * *" "2024-01-01" "2024-01-02"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `expression` | `string` | Yes | Cron expression |
| `start` | `string` | Yes | Start date |
| `end` | `string` | Yes | End date |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `No matching date found within 1 year` | Check the error message for details |
| `Invalid cron expression` | Check the error message for details |

```robinpath
set $result as cron.isValid "*/5 * * * *"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Cron workflow

Chain multiple cron operations together.

```robinpath
set $r_isValid as cron.isValid "*/5 * * * *"
set $r_parse as cron.parse "0 9 * * 1-5"
set $r_next as cron.next "*/5 * * * *"
print "All operations complete"
```

### 2. Safe isValid with validation

Check results before proceeding.

```robinpath
set $result as cron.isValid "*/5 * * * *"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
