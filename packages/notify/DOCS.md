---
title: "Notify"
module: "notify"
package: "@robinpath/notify"
description: "Notify module for RobinPath."
category: "messaging"
tags: [notify, messaging]
type: "integration"
auth: "none"
functionCount: 10
---

# Notify

> Notify module for RobinPath.

**Package:** `@robinpath/notify` | **Category:** Messaging | **Type:** Integration


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `notify` module when you need to:

- **send** -- Use `notify.send` to perform this operation
- **sendUrgent** -- Use `notify.sendUrgent` to perform this operation
- **sendSilent** -- Use `notify.sendSilent` to perform this operation
- **beep** -- Use `notify.beep` to perform this operation
- **say** -- Use `notify.say` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`send`](#send) | send | `object` |
| [`sendUrgent`](#sendurgent) | sendUrgent | `object` |
| [`sendSilent`](#sendsilent) | sendSilent | `object` |
| [`beep`](#beep) | beep | `object` |
| [`say`](#say) | say | `object` |
| [`alert`](#alert) | alert | `object` |
| [`confirm`](#confirm) | confirm | `object` |
| [`prompt`](#prompt) | prompt | `object` |
| [`clipboard`](#clipboard) | clipboard | `object` |
| [`getClipboard`](#getclipboard) | getClipboard | `object` |


## Functions

### send

send

**Module:** `notify` | **Returns:** `object` -- API response.

```robinpath
notify.send
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendUrgent

sendUrgent

**Module:** `notify` | **Returns:** `object` -- API response.

```robinpath
notify.sendUrgent
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendSilent

sendSilent

**Module:** `notify` | **Returns:** `object` -- API response.

```robinpath
notify.sendSilent
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### beep

beep

**Module:** `notify` | **Returns:** `object` -- API response.

```robinpath
notify.beep
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### say

say

**Module:** `notify` | **Returns:** `object` -- API response.

```robinpath
notify.say
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### alert

alert

**Module:** `notify` | **Returns:** `object` -- API response.

```robinpath
notify.alert
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### confirm

confirm

**Module:** `notify` | **Returns:** `object` -- API response.

```robinpath
notify.confirm
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### prompt

prompt

**Module:** `notify` | **Returns:** `object` -- API response.

```robinpath
notify.prompt
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### clipboard

clipboard

**Module:** `notify` | **Returns:** `object` -- API response.

```robinpath
notify.clipboard
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getClipboard

getClipboard

**Module:** `notify` | **Returns:** `object` -- API response.

```robinpath
notify.getClipboard
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Notify: "..." not configured. Call notify.setCredentials first.` | Check the error message for details |

```robinpath
set $result as notify.send
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Clipboard

Retrieve all items and loop through them.

```robinpath
set $result as notify.getClipboard
each $item in $result
  print $item
end
```

### 2. Create a new item with send

Create a new resource and capture the result.

```robinpath
set $result as notify.send
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as notify.getClipboard
if $existing == null
  notify.send
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Notify workflow

Chain multiple notify operations together.

```robinpath
set $r_send as notify.send
set $r_sendUrgent as notify.sendUrgent
set $r_sendSilent as notify.sendSilent
print "All operations complete"
```

### 5. Safe send with validation

Check results before proceeding.

```robinpath
set $result as notify.send
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **slack** -- Slack module for complementary functionality
- **discord** -- Discord module for complementary functionality
- **teams** -- Teams module for complementary functionality
- **telegram** -- Telegram module for complementary functionality
- **whatsapp** -- WhatsApp module for complementary functionality
