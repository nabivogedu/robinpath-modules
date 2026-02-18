---
title: "Calendar"
module: "calendar"
package: "@robinpath/calendar"
description: "iCal (.ics) calendar parsing, generation, event management, and date range queries"
category: "utility"
tags: [calendar, utility]
type: "utility"
auth: "none"
functionCount: 13
---

# Calendar

> iCal (.ics) calendar parsing, generation, event management, and date range queries

**Package:** `@robinpath/calendar` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `calendar` module when you need to:

- **Create an iCal event object** -- Use `calendar.createEvent` to perform this operation
- **Create iCal string from events** -- Use `calendar.createCalendar` to perform this operation
- **Parse iCal string** -- Use `calendar.parse` to perform this operation
- **Parse .ics file** -- Use `calendar.parseFile` to perform this operation
- **Write iCal to file** -- Use `calendar.writeFile` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`createEvent`](#createevent) | Create an iCal event object | `Event object` |
| [`createCalendar`](#createcalendar) | Create iCal string from events | `iCal string` |
| [`parse`](#parse) | Parse iCal string | `{name, events[]}` |
| [`parseFile`](#parsefile) | Parse .ics file | `{name, events[]}` |
| [`writeFile`](#writefile) | Write iCal to file | `true` |
| [`addEvent`](#addevent) | Add event to iCal string | `Updated iCal` |
| [`removeEvent`](#removeevent) | Remove event by UID | `Updated iCal` |
| [`findEvents`](#findevents) | Find events in date range | `Matching events` |
| [`today`](#today) | Get today's events | `Today's events` |
| [`upcoming`](#upcoming) | Get upcoming events | `Upcoming events` |
| [`toJson`](#tojson) | Convert iCal to JSON | `Parsed object` |
| [`formatDate`](#formatdate) | Format ISO to iCal date | `iCal date` |
| [`parseDate`](#parsedate) | Parse iCal date to ISO | `ISO date` |


## Functions

### createEvent

Create an iCal event object

**Module:** `calendar` | **Returns:** `object` -- Event object

```robinpath
calendar.createEvent {"summary": "Meeting", "start": "2024-01-15T10:00:00Z", "end": "2024-01-15T11:00:00Z"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | Yes | {summary, description, location, start, end, allDay, organizer, attendees, url, uid} |

---

### createCalendar

Create iCal string from events

**Module:** `calendar` | **Returns:** `string` -- iCal string

```robinpath
calendar.createCalendar [$event1, $event2] {"name": "My Calendar"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `events` | `array` | Yes | Event objects |
| `options` | `object` | No | {name, timezone} |

---

### parse

Parse iCal string

**Module:** `calendar` | **Returns:** `object` -- {name, events[]}

```robinpath
calendar.parse $icsContent
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `icsString` | `string` | Yes | iCal content |

---

### parseFile

Parse .ics file

**Module:** `calendar` | **Returns:** `object` -- {name, events[]}

```robinpath
calendar.parseFile "./events.ics"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | File path |

---

### writeFile

Write iCal to file

**Module:** `calendar` | **Returns:** `boolean` -- true

```robinpath
calendar.writeFile "./events.ics" $ics
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | File path |
| `icsString` | `string` | Yes | iCal content |

---

### addEvent

Add event to iCal string

**Module:** `calendar` | **Returns:** `string` -- Updated iCal

```robinpath
calendar.addEvent $ics $event
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `icsString` | `string` | Yes | Existing iCal |
| `event` | `object` | Yes | Event object |

---

### removeEvent

Remove event by UID

**Module:** `calendar` | **Returns:** `string` -- Updated iCal

```robinpath
calendar.removeEvent $ics "abc-123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `icsString` | `string` | Yes | Existing iCal |
| `uid` | `string` | Yes | Event UID |

---

### findEvents

Find events in date range

**Module:** `calendar` | **Returns:** `array` -- Matching events

```robinpath
calendar.findEvents $events "2024-01-01" "2024-01-31"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `events` | `array` | Yes | Event array |
| `start` | `string` | Yes | Start date ISO |
| `end` | `string` | Yes | End date ISO |

---

### today

Get today's events

**Module:** `calendar` | **Returns:** `array` -- Today's events

```robinpath
calendar.today $events
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `events` | `array` | Yes | Event array |

---

### upcoming

Get upcoming events

**Module:** `calendar` | **Returns:** `array` -- Upcoming events

```robinpath
calendar.upcoming $events 14
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `events` | `array` | Yes | Event array |
| `days` | `number` | No | Days ahead (default 7) |

---

### toJson

Convert iCal to JSON

**Module:** `calendar` | **Returns:** `object` -- Parsed object

```robinpath
calendar.toJson $ics
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `icsString` | `string` | Yes | iCal content |

---

### formatDate

Format ISO to iCal date

**Module:** `calendar` | **Returns:** `string` -- iCal date

```robinpath
calendar.formatDate "2024-01-15T10:00:00Z"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isoDate` | `string` | Yes | ISO date |

---

### parseDate

Parse iCal date to ISO

**Module:** `calendar` | **Returns:** `string` -- ISO date

```robinpath
calendar.parseDate "20240115T100000Z"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `icalDate` | `string` | Yes | iCal date |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as calendar.createEvent {"summary": "Meeting", "start": "2024-01-15T10:00:00Z", "end": "2024-01-15T11:00:00Z"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with createEvent

Create a new resource and capture the result.

```robinpath
set $result as calendar.createEvent {"summary": "Meeting", "start": "2024-01-15T10:00:00Z", "end": "2024-01-15T11:00:00Z"}
print "Created: " + $result
```

### 2. Multi-step Calendar workflow

Chain multiple calendar operations together.

```robinpath
set $r_createEvent as calendar.createEvent {"summary": "Meeting", "start": "2024-01-15T10:00:00Z", "end": "2024-01-15T11:00:00Z"}
set $r_createCalendar as calendar.createCalendar [$event1, $event2] {"name": "My Calendar"}
set $r_parse as calendar.parse $icsContent
print "All operations complete"
```

### 3. Safe createEvent with validation

Check results before proceeding.

```robinpath
set $result as calendar.createEvent {"summary": "Meeting", "start": "2024-01-15T10:00:00Z", "end": "2024-01-15T11:00:00Z"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
