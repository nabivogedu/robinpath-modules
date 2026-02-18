---
title: "Google Calendar"
module: "google-calendar"
package: "@robinpath/google-calendar"
description: "Google Calendar module for RobinPath."
category: "productivity"
tags: [googlecalendar, productivity]
type: "integration"
auth: "api-key"
functionCount: 10
baseUrl: "https://www.googleapis.com"
---

# Google Calendar

> Google Calendar module for RobinPath.

**Package:** `@robinpath/google-calendar` | **Category:** Productivity | **Type:** Integration


## Authentication

```robinpath
googleCalendar.setCredentials "ya29.xxx"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `google-calendar` module when you need to:

- **List events from a calendar.** -- Use `google-calendar.listEvents` to perform this operation
- **Get a single event by ID.** -- Use `google-calendar.getEvent` to perform this operation
- **Create a new calendar event.** -- Use `google-calendar.createEvent` to perform this operation
- **Update an existing event.** -- Use `google-calendar.updateEvent` to perform this operation
- **Delete a calendar event.** -- Use `google-calendar.deleteEvent` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Set the OAuth2 access token for Google Calendar API. | `Confirmation message.` |
| [`listEvents`](#listevents) | List events from a calendar. | `Object with items array of event objects.` |
| [`getEvent`](#getevent) | Get a single event by ID. | `Event object.` |
| [`createEvent`](#createevent) | Create a new calendar event. | `Created event object.` |
| [`updateEvent`](#updateevent) | Update an existing event. | `Updated event object.` |
| [`deleteEvent`](#deleteevent) | Delete a calendar event. | `Confirmation message.` |
| [`listCalendars`](#listcalendars) | List all calendars for the authenticated user. | `Object with items array of calendar objects.` |
| [`createCalendar`](#createcalendar) | Create a new calendar. | `Created calendar object.` |
| [`quickAdd`](#quickadd) | Create an event from a natural-language text string. | `Created event object.` |
| [`freeBusy`](#freebusy) | Check free/busy status for calendars. | `Free/busy response with busy intervals.` |


## Functions

### setCredentials

Set the OAuth2 access token for Google Calendar API.

**Module:** `google-calendar` | **Returns:** `string` -- Confirmation message.

```robinpath
googleCalendar.setCredentials "ya29.xxx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | OAuth2 access token |

---

### listEvents

List events from a calendar.

**Module:** `google-calendar` | **Returns:** `object` -- Object with items array of event objects.

```robinpath
googleCalendar.listEvents "primary" {"timeMin":"2025-01-01T00:00:00Z","maxResults":10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `calendarId` | `string` | No | Calendar ID (default: 'primary') |
| `options` | `object` | No | Options: timeMin, timeMax (ISO 8601), maxResults, q (search) |

---

### getEvent

Get a single event by ID.

**Module:** `google-calendar` | **Returns:** `object` -- Event object.

```robinpath
googleCalendar.getEvent "primary" "event-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `calendarId` | `string` | No | Calendar ID (default: 'primary') |
| `eventId` | `string` | Yes | Event ID |

---

### createEvent

Create a new calendar event.

**Module:** `google-calendar` | **Returns:** `object` -- Created event object.

```robinpath
googleCalendar.createEvent "primary" {"summary":"Meeting","start":{"dateTime":"2025-06-01T10:00:00Z"},"end":{"dateTime":"2025-06-01T11:00:00Z"}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `calendarId` | `string` | No | Calendar ID (default: 'primary') |
| `event` | `object` | Yes | Event object (summary, start, end, description, location, attendees) |

---

### updateEvent

Update an existing event.

**Module:** `google-calendar` | **Returns:** `object` -- Updated event object.

```robinpath
googleCalendar.updateEvent "primary" "event-id" {"summary":"Updated Meeting"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `calendarId` | `string` | No | Calendar ID (default: 'primary') |
| `eventId` | `string` | Yes | Event ID |
| `event` | `object` | Yes | Fields to update |

---

### deleteEvent

Delete a calendar event.

**Module:** `google-calendar` | **Returns:** `string` -- Confirmation message.

```robinpath
googleCalendar.deleteEvent "primary" "event-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `calendarId` | `string` | No | Calendar ID (default: 'primary') |
| `eventId` | `string` | Yes | Event ID to delete |

---

### listCalendars

List all calendars for the authenticated user.

**Module:** `google-calendar` | **Returns:** `object` -- Object with items array of calendar objects.

```robinpath
googleCalendar.listCalendars
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### createCalendar

Create a new calendar.

**Module:** `google-calendar` | **Returns:** `object` -- Created calendar object.

```robinpath
googleCalendar.createCalendar "Work Events" {"timeZone":"America/New_York"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `summary` | `string` | Yes | Calendar name |
| `options` | `object` | No | Options: description, timeZone |

---

### quickAdd

Create an event from a natural-language text string.

**Module:** `google-calendar` | **Returns:** `object` -- Created event object.

```robinpath
googleCalendar.quickAdd "primary" "Meeting with John at 3pm tomorrow"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `calendarId` | `string` | No | Calendar ID (default: 'primary') |
| `text` | `string` | Yes | Natural-language event description |

---

### freeBusy

Check free/busy status for calendars.

**Module:** `google-calendar` | **Returns:** `object` -- Free/busy response with busy intervals.

```robinpath
googleCalendar.freeBusy "2025-06-01T00:00:00Z" "2025-06-02T00:00:00Z"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `timeMin` | `string` | Yes | Start of time range (ISO 8601) |
| `timeMax` | `string` | Yes | End of time range (ISO 8601) |
| `calendars` | `array` | No | Array of calendar IDs (default: ['primary']) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Google Calendar: token not configured. Call googleCalendar.setCredentials first.` | Check the error message for details |
| `Google Calendar API error (${res.status}): ${text}` | Check the error message for details |
| `googleCalendar.setCredentials requires an access token.` | Check the error message for details |
| `googleCalendar.getEvent requires an eventId.` | Check the error message for details |
| `googleCalendar.createEvent requires an event object.` | Check the error message for details |
| `googleCalendar.updateEvent requires eventId and event object.` | Check the error message for details |
| `googleCalendar.deleteEvent requires an eventId.` | Check the error message for details |
| `Google Calendar delete error (${res.status}): ${text}` | Check the error message for details |

```robinpath
set $result as googleCalendar.listEvents "primary" {"timeMin":"2025-01-01T00:00:00Z","maxResults":10}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Events

Retrieve all items and loop through them.

```robinpath
google-calendar.setCredentials $token
set $result as googleCalendar.listEvents "primary" {"timeMin":"2025-01-01T00:00:00Z","maxResults":10}
each $item in $result
  print $item
end
```

### 2. Create a new item with createEvent

Create a new resource and capture the result.

```robinpath
google-calendar.setCredentials $token
set $result as googleCalendar.createEvent "primary" {"summary":"Meeting","start":{"dateTime":"2025-06-01T10:00:00Z"},"end":{"dateTime":"2025-06-01T11:00:00Z"}}
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
google-calendar.setCredentials $token
set $created as googleCalendar.createEvent "primary" {"summary":"Meeting","start":{"dateTime":"2025-06-01T10:00:00Z"},"end":{"dateTime":"2025-06-01T11:00:00Z"}}
# Update the created item
googleCalendar.updateEvent "primary" "event-id" {"summary":"Updated Meeting"}
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
google-calendar.setCredentials $token
set $existing as googleCalendar.listEvents "primary" {"timeMin":"2025-01-01T00:00:00Z","maxResults":10}
if $existing == null
  googleCalendar.createEvent "primary" {"summary":"Meeting","start":{"dateTime":"2025-06-01T10:00:00Z"},"end":{"dateTime":"2025-06-01T11:00:00Z"}}
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Google Calendar workflow

Chain multiple google-calendar operations together.

```robinpath
google-calendar.setCredentials $token
set $r_listEvents as googleCalendar.listEvents "primary" {"timeMin":"2025-01-01T00:00:00Z","maxResults":10}
set $r_getEvent as googleCalendar.getEvent "primary" "event-id"
set $r_createEvent as googleCalendar.createEvent "primary" {"summary":"Meeting","start":{"dateTime":"2025-06-01T10:00:00Z"},"end":{"dateTime":"2025-06-01T11:00:00Z"}}
print "All operations complete"
```

### 6. Safe listEvents with validation

Check results before proceeding.

```robinpath
google-calendar.setCredentials $token
set $result as googleCalendar.listEvents "primary" {"timeMin":"2025-01-01T00:00:00Z","maxResults":10}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **google-sheets** -- Google Sheets module for complementary functionality
- **google-contacts** -- Google Contacts module for complementary functionality
- **google-forms** -- Google Forms module for complementary functionality
- **gmail** -- Gmail module for complementary functionality
- **outlook** -- Outlook module for complementary functionality
