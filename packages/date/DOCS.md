---
title: "Date"
module: "date"
package: "@robinpath/date"
description: "Parse, format, manipulate, and compare dates and times"
category: "utility"
tags: [date, utility]
type: "utility"
auth: "none"
functionCount: 15
---

# Date

> Parse, format, manipulate, and compare dates and times

**Package:** `@robinpath/date` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `date` module when you need to:

- **Parse a date string and return its ISO representation** -- Use `date.parse` to perform this operation
- **Format a date using a pattern string** -- Use `date.format` to perform this operation
- **Add a duration to a date** -- Use `date.add` to perform this operation
- **Subtract a duration from a date** -- Use `date.subtract` to perform this operation
- **Calculate the difference between two dates in a given unit** -- Use `date.diff` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`parse`](#parse) | Parse a date string and return its ISO representation | `The date as an ISO 8601 string` |
| [`format`](#format) | Format a date using a pattern string | `The formatted date string` |
| [`add`](#add) | Add a duration to a date | `The resulting date as an ISO 8601 string` |
| [`subtract`](#subtract) | Subtract a duration from a date | `The resulting date as an ISO 8601 string` |
| [`diff`](#diff) | Calculate the difference between two dates in a given unit | `The difference as a whole number (date1 - date2)` |
| [`startOf`](#startof) | Get the start of a time period for a date | `The start of the period as an ISO 8601 string` |
| [`endOf`](#endof) | Get the end of a time period for a date | `The end of the period as an ISO 8601 string` |
| [`isAfter`](#isafter) | Check if the first date is after the second date | `True if date1 is after date2` |
| [`isBefore`](#isbefore) | Check if the first date is before the second date | `True if date1 is before date2` |
| [`isBetween`](#isbetween) | Check if a date falls between two other dates (exclusive) | `True if date is between start and end (exclusive)` |
| [`toISO`](#toiso) | Convert a date to an ISO 8601 string | `The date as an ISO 8601 string` |
| [`toUnix`](#tounix) | Convert a date to a Unix timestamp (seconds since epoch) | `Unix timestamp in seconds` |
| [`fromUnix`](#fromunix) | Convert a Unix timestamp (seconds) to an ISO date string | `The date as an ISO 8601 string` |
| [`dayOfWeek`](#dayofweek) | Get the day of the week for a date (0 = Sunday, 6 = Saturday) | `Day of week (0 = Sunday through 6 = Saturday)` |
| [`daysInMonth`](#daysinmonth) | Get the number of days in the month of a given date | `Number of days in the month (28, 29, 30, or 31)` |


## Functions

### parse

Parse a date string and return its ISO representation

**Module:** `date` | **Returns:** `string` -- The date as an ISO 8601 string

```robinpath
date.parse "2024-01-15"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dateString` | `string` | Yes | The date string to parse (e.g. "2024-01-15", ISO 8601, etc.) |

---

### format

Format a date using a pattern string

**Module:** `date` | **Returns:** `string` -- The formatted date string

```robinpath
date.format $date "YYYY-MM-DD"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `string` | Yes | The date string to format |
| `pattern` | `string` | Yes | Format pattern (tokens: YYYY, MM, DD, HH, mm, ss, ddd, MMM, MMMM) |

---

### add

Add a duration to a date

**Module:** `date` | **Returns:** `string` -- The resulting date as an ISO 8601 string

```robinpath
date.add $date 5 "days"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `string` | Yes | The base date string |
| `amount` | `number` | Yes | The amount to add |
| `unit` | `string` | Yes | The unit: years, months, days, hours, minutes, or seconds |

---

### subtract

Subtract a duration from a date

**Module:** `date` | **Returns:** `string` -- The resulting date as an ISO 8601 string

```robinpath
date.subtract $date 3 "months"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `string` | Yes | The base date string |
| `amount` | `number` | Yes | The amount to subtract |
| `unit` | `string` | Yes | The unit: years, months, days, hours, minutes, or seconds |

---

### diff

Calculate the difference between two dates in a given unit

**Module:** `date` | **Returns:** `number` -- The difference as a whole number (date1 - date2)

```robinpath
date.diff $date1 $date2 "days"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date1` | `string` | Yes | The first date string |
| `date2` | `string` | Yes | The second date string |
| `unit` | `string` | Yes | The unit: years, months, days, hours, minutes, or seconds |

---

### startOf

Get the start of a time period for a date

**Module:** `date` | **Returns:** `string` -- The start of the period as an ISO 8601 string

```robinpath
date.startOf $date "month"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `string` | Yes | The date string |
| `unit` | `string` | Yes | The period: year, month, day, hour, or minute |

---

### endOf

Get the end of a time period for a date

**Module:** `date` | **Returns:** `string` -- The end of the period as an ISO 8601 string

```robinpath
date.endOf $date "month"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `string` | Yes | The date string |
| `unit` | `string` | Yes | The period: year, month, day, hour, or minute |

---

### isAfter

Check if the first date is after the second date

**Module:** `date` | **Returns:** `boolean` -- True if date1 is after date2

```robinpath
date.isAfter $date1 $date2
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date1` | `string` | Yes | The first date string |
| `date2` | `string` | Yes | The second date string |

---

### isBefore

Check if the first date is before the second date

**Module:** `date` | **Returns:** `boolean` -- True if date1 is before date2

```robinpath
date.isBefore $date1 $date2
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date1` | `string` | Yes | The first date string |
| `date2` | `string` | Yes | The second date string |

---

### isBetween

Check if a date falls between two other dates (exclusive)

**Module:** `date` | **Returns:** `boolean` -- True if date is between start and end (exclusive)

```robinpath
date.isBetween $date $start $end
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `string` | Yes | The date to check |
| `start` | `string` | Yes | The start of the range |
| `end` | `string` | Yes | The end of the range |

---

### toISO

Convert a date to an ISO 8601 string

**Module:** `date` | **Returns:** `string` -- The date as an ISO 8601 string

```robinpath
date.toISO $date
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `string` | Yes | The date string to convert |

---

### toUnix

Convert a date to a Unix timestamp (seconds since epoch)

**Module:** `date` | **Returns:** `number` -- Unix timestamp in seconds

```robinpath
date.toUnix $date
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `string` | Yes | The date string to convert |

---

### fromUnix

Convert a Unix timestamp (seconds) to an ISO date string

**Module:** `date` | **Returns:** `string` -- The date as an ISO 8601 string

```robinpath
date.fromUnix 1705276800
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `timestamp` | `number` | Yes | Unix timestamp in seconds |

---

### dayOfWeek

Get the day of the week for a date (0 = Sunday, 6 = Saturday)

**Module:** `date` | **Returns:** `number` -- Day of week (0 = Sunday through 6 = Saturday)

```robinpath
date.dayOfWeek $date
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `string` | Yes | The date string |

---

### daysInMonth

Get the number of days in the month of a given date

**Module:** `date` | **Returns:** `number` -- Number of days in the month (28, 29, 30, or 31)

```robinpath
date.daysInMonth $date
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `string` | Yes | The date string |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Invalid date: ${s}` | Check the error message for details |
| `Unknown unit: ${unit}` | Check the error message for details |

```robinpath
set $result as date.parse "2024-01-15"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with add

Create a new resource and capture the result.

```robinpath
set $result as date.add $date 5 "days"
print "Created: " + $result
```

### 2. Multi-step Date workflow

Chain multiple date operations together.

```robinpath
set $r_parse as date.parse "2024-01-15"
set $r_format as date.format $date "YYYY-MM-DD"
set $r_add as date.add $date 5 "days"
print "All operations complete"
```

### 3. Safe parse with validation

Check results before proceeding.

```robinpath
set $result as date.parse "2024-01-15"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
