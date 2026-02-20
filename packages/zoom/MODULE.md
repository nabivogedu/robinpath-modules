---
title: "Zoom"
module: "zoom"
package: "@robinpath/zoom"
description: "Zoom module for RobinPath."
category: "utility"
tags: [zoom, utility]
type: "utility"
auth: "api-key"
functionCount: 19
baseUrl: "https://api.zoom.us"
---

# Zoom

> Zoom module for RobinPath.

**Package:** `@robinpath/zoom` | **Category:** Utility | **Type:** Utility


## Authentication

```robinpath
zoom.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `zoom` module when you need to:

- **listMeetings** -- Use `zoom.listMeetings` to perform this operation
- **getMeeting** -- Use `zoom.getMeeting` to perform this operation
- **createMeeting** -- Use `zoom.createMeeting` to perform this operation
- **updateMeeting** -- Use `zoom.updateMeeting` to perform this operation
- **deleteMeeting** -- Use `zoom.deleteMeeting` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure zoom credentials. | `object` |
| [`listMeetings`](#listmeetings) | listMeetings | `object` |
| [`getMeeting`](#getmeeting) | getMeeting | `object` |
| [`createMeeting`](#createmeeting) | createMeeting | `object` |
| [`updateMeeting`](#updatemeeting) | updateMeeting | `object` |
| [`deleteMeeting`](#deletemeeting) | deleteMeeting | `object` |
| [`endMeeting`](#endmeeting) | endMeeting | `object` |
| [`listMeetingRegistrants`](#listmeetingregistrants) | listMeetingRegistrants | `object` |
| [`addMeetingRegistrant`](#addmeetingregistrant) | addMeetingRegistrant | `object` |
| [`listRecordings`](#listrecordings) | listRecordings | `object` |
| [`getRecording`](#getrecording) | getRecording | `object` |
| [`deleteRecording`](#deleterecording) | deleteRecording | `object` |
| [`listUsers`](#listusers) | listUsers | `object` |
| [`getUser`](#getuser) | getUser | `object` |
| [`listWebinars`](#listwebinars) | listWebinars | `object` |
| [`createWebinar`](#createwebinar) | createWebinar | `object` |
| [`getMeetingParticipants`](#getmeetingparticipants) | getMeetingParticipants | `object` |
| [`sendChatMessage`](#sendchatmessage) | sendChatMessage | `object` |
| [`listChannels`](#listchannels) | listChannels | `object` |


## Functions

### setCredentials

Configure zoom credentials.

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### listMeetings

listMeetings

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.listMeetings
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getMeeting

getMeeting

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.getMeeting
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createMeeting

createMeeting

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.createMeeting
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateMeeting

updateMeeting

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.updateMeeting
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteMeeting

deleteMeeting

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.deleteMeeting
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### endMeeting

endMeeting

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.endMeeting
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listMeetingRegistrants

listMeetingRegistrants

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.listMeetingRegistrants
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addMeetingRegistrant

addMeetingRegistrant

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.addMeetingRegistrant
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listRecordings

listRecordings

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.listRecordings
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getRecording

getRecording

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.getRecording
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteRecording

deleteRecording

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.deleteRecording
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listUsers

listUsers

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.listUsers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUser

getUser

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.getUser
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listWebinars

listWebinars

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.listWebinars
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createWebinar

createWebinar

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.createWebinar
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getMeetingParticipants

getMeetingParticipants

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.getMeetingParticipants
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendChatMessage

sendChatMessage

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.sendChatMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listChannels

listChannels

**Module:** `zoom` | **Returns:** `object` -- API response.

```robinpath
zoom.listChannels
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Zoom API error (${res.status}): ${t}` | Check the error message for details |
| `zoom.setCredentials requires accessToken.` | Check the error message for details |
| `zoom.updateMeeting requires an ID.` | Check the error message for details |
| `zoom.deleteMeeting requires an ID.` | Check the error message for details |
| `zoom.endMeeting requires an ID.` | Check the error message for details |
| `zoom.deleteRecording requires an ID.` | Check the error message for details |
| `Zoom: "..." not configured. Call zoom.setCredentials first.` | Check the error message for details |

```robinpath
set $result as zoom.listMeetings
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Meetings

Retrieve all items and loop through them.

```robinpath
zoom.setCredentials $token
set $result as zoom.listMeetings
each $item in $result
  print $item
end
```

### 2. Create a new item with createMeeting

Create a new resource and capture the result.

```robinpath
zoom.setCredentials $token
set $result as zoom.createMeeting
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
zoom.setCredentials $token
set $created as zoom.createMeeting
# Update the created item
zoom.updateMeeting
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
zoom.setCredentials $token
set $existing as zoom.listMeetings
if $existing == null
  zoom.createMeeting
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Zoom workflow

Chain multiple zoom operations together.

```robinpath
zoom.setCredentials $token
set $r_listMeetings as zoom.listMeetings
set $r_getMeeting as zoom.getMeeting
set $r_createMeeting as zoom.createMeeting
print "All operations complete"
```

### 6. Safe listMeetings with validation

Check results before proceeding.

```robinpath
zoom.setCredentials $token
set $result as zoom.listMeetings
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
