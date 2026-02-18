---
title: "Calendly"
module: "calendly"
package: "@robinpath/calendly"
description: "Calendly module for RobinPath."
category: "utility"
tags: [calendly, utility]
type: "utility"
auth: "api-key"
functionCount: 13
baseUrl: "https://api.calendly.com"
---

# Calendly

> Calendly module for RobinPath.

**Package:** `@robinpath/calendly` | **Category:** Utility | **Type:** Utility


## Authentication

```robinpath
calendly.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `calendly` module when you need to:

- **getCurrentUser** -- Use `calendly.getCurrentUser` to perform this operation
- **listEventTypes** -- Use `calendly.listEventTypes` to perform this operation
- **getEventType** -- Use `calendly.getEventType` to perform this operation
- **listScheduledEvents** -- Use `calendly.listScheduledEvents` to perform this operation
- **getScheduledEvent** -- Use `calendly.getScheduledEvent` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure calendly credentials. | `object` |
| [`getCurrentUser`](#getcurrentuser) | getCurrentUser | `object` |
| [`listEventTypes`](#listeventtypes) | listEventTypes | `object` |
| [`getEventType`](#geteventtype) | getEventType | `object` |
| [`listScheduledEvents`](#listscheduledevents) | listScheduledEvents | `object` |
| [`getScheduledEvent`](#getscheduledevent) | getScheduledEvent | `object` |
| [`listEventInvitees`](#listeventinvitees) | listEventInvitees | `object` |
| [`getEventInvitee`](#geteventinvitee) | getEventInvitee | `object` |
| [`cancelEvent`](#cancelevent) | cancelEvent | `object` |
| [`listWebhooks`](#listwebhooks) | listWebhooks | `object` |
| [`createWebhook`](#createwebhook) | createWebhook | `object` |
| [`deleteWebhook`](#deletewebhook) | deleteWebhook | `object` |
| [`getOrganization`](#getorganization) | getOrganization | `object` |


## Functions

### setCredentials

Configure calendly credentials.

**Module:** `calendly` | **Returns:** `object` -- API response.

```robinpath
calendly.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### getCurrentUser

getCurrentUser

**Module:** `calendly` | **Returns:** `object` -- API response.

```robinpath
calendly.getCurrentUser
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listEventTypes

listEventTypes

**Module:** `calendly` | **Returns:** `object` -- API response.

```robinpath
calendly.listEventTypes
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getEventType

getEventType

**Module:** `calendly` | **Returns:** `object` -- API response.

```robinpath
calendly.getEventType
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listScheduledEvents

listScheduledEvents

**Module:** `calendly` | **Returns:** `object` -- API response.

```robinpath
calendly.listScheduledEvents
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getScheduledEvent

getScheduledEvent

**Module:** `calendly` | **Returns:** `object` -- API response.

```robinpath
calendly.getScheduledEvent
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listEventInvitees

listEventInvitees

**Module:** `calendly` | **Returns:** `object` -- API response.

```robinpath
calendly.listEventInvitees
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getEventInvitee

getEventInvitee

**Module:** `calendly` | **Returns:** `object` -- API response.

```robinpath
calendly.getEventInvitee
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### cancelEvent

cancelEvent

**Module:** `calendly` | **Returns:** `object` -- API response.

```robinpath
calendly.cancelEvent
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listWebhooks

listWebhooks

**Module:** `calendly` | **Returns:** `object` -- API response.

```robinpath
calendly.listWebhooks
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createWebhook

createWebhook

**Module:** `calendly` | **Returns:** `object` -- API response.

```robinpath
calendly.createWebhook
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteWebhook

deleteWebhook

**Module:** `calendly` | **Returns:** `object` -- API response.

```robinpath
calendly.deleteWebhook
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getOrganization

getOrganization

**Module:** `calendly` | **Returns:** `object` -- API response.

```robinpath
calendly.getOrganization
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Calendly API error (${res.status}): ${t}` | Check the error message for details |
| `calendly.setCredentials requires accessToken.` | Check the error message for details |
| `calendly.cancelEvent requires an ID.` | Check the error message for details |
| `calendly.deleteWebhook requires an ID.` | Check the error message for details |
| `Calendly: "..." not configured. Call calendly.setCredentials first.` | Check the error message for details |

```robinpath
set $result as calendly.getCurrentUser
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate CurrentUser

Retrieve all items and loop through them.

```robinpath
calendly.setCredentials $token
set $result as calendly.getCurrentUser
each $item in $result
  print $item
end
```

### 2. Create a new item with createWebhook

Create a new resource and capture the result.

```robinpath
calendly.setCredentials $token
set $result as calendly.createWebhook
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
calendly.setCredentials $token
set $existing as calendly.getCurrentUser
if $existing == null
  calendly.createWebhook
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Calendly workflow

Chain multiple calendly operations together.

```robinpath
calendly.setCredentials $token
set $r_getCurrentUser as calendly.getCurrentUser
set $r_listEventTypes as calendly.listEventTypes
set $r_getEventType as calendly.getEventType
print "All operations complete"
```

### 5. Safe getCurrentUser with validation

Check results before proceeding.

```robinpath
calendly.setCredentials $token
set $result as calendly.getCurrentUser
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
