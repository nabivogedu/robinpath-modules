---
title: "Event"
module: "event"
package: "@robinpath/event"
description: "Pub/sub event system with named buses, listener management, history, and async waitFor"
category: "infrastructure"
tags: [event, infrastructure]
type: "utility"
auth: "none"
functionCount: 11
---

# Event

> Pub/sub event system with named buses, listener management, history, and async waitFor

**Package:** `@robinpath/event` | **Category:** Infrastructure | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `event` module when you need to:

- **Create a named event bus with an optional max listener limit** -- Use `event.create` to perform this operation
- **Subscribe a listener to an event on a named bus** -- Use `event.on` to perform this operation
- **Subscribe a one-time listener that automatically removes itself after firing** -- Use `event.once` to perform this operation
- **Remove a listener, all listeners for an event, or all listeners on the bus** -- Use `event.off` to perform this operation
- **Emit an event with optional data, notifying all subscribed listeners** -- Use `event.emit` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create a named event bus with an optional max listener limit | `The event bus configuration` |
| [`on`](#on) | Subscribe a listener to an event on a named bus | `Object with event name and listener count` |
| [`once`](#once) | Subscribe a one-time listener that automatically removes itself after firing | `Object with event name and listener count` |
| [`off`](#off) | Remove a listener, all listeners for an event, or all listeners on the bus | `Object with event name and number removed` |
| [`emit`](#emit) | Emit an event with optional data, notifying all subscribed listeners | `Object with event name and number of listeners notified` |
| [`listenerCount`](#listenercount) | Get the number of listeners for a specific event or all events on a bus | `Number of registered listeners` |
| [`eventNames`](#eventnames) | List all event names that have listeners on a bus | `Array of event name strings` |
| [`removeAll`](#removeall) | Remove all listeners from all events on a bus | `Object with count of event types removed` |
| [`history`](#history) | Get the emission history for a bus, optionally filtered by event name | `Array of {event, timestamp, data} objects` |
| [`waitFor`](#waitfor) | Wait for a specific event to be emitted, with a timeout | `The data emitted with the event` |
| [`destroy`](#destroy) | Destroy a named event bus and free all resources | `True if the bus existed and was destroyed` |


## Functions

### create

Create a named event bus with an optional max listener limit

**Module:** `event` | **Returns:** `object` -- The event bus configuration

```robinpath
event.create "workflow" 50
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | No | Event bus name (default: 'default') |
| `maxListeners` | `number` | No | Maximum listeners per event (default 100) |

---

### on

Subscribe a listener to an event on a named bus

**Module:** `event` | **Returns:** `object` -- Object with event name and listener count

```robinpath
event.on "workflow" "task.completed" $handler
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bus` | `string` | Yes | Event bus name |
| `event` | `string` | Yes | Event name to listen for |
| `listener` | `string` | Yes | Callback function |

---

### once

Subscribe a one-time listener that automatically removes itself after firing

**Module:** `event` | **Returns:** `object` -- Object with event name and listener count

```robinpath
event.once "workflow" "done" $handler
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bus` | `string` | Yes | Event bus name |
| `event` | `string` | Yes | Event name |
| `listener` | `string` | Yes | Callback function |

---

### off

Remove a listener, all listeners for an event, or all listeners on the bus

**Module:** `event` | **Returns:** `object` -- Object with event name and number removed

```robinpath
event.off "workflow" "task.completed"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bus` | `string` | Yes | Event bus name |
| `event` | `string` | No | Event name (omit to remove all) |
| `listener` | `string` | No | Specific listener to remove (omit to remove all for event) |

---

### emit

Emit an event with optional data, notifying all subscribed listeners

**Module:** `event` | **Returns:** `object` -- Object with event name and number of listeners notified

```robinpath
event.emit "workflow" "task.completed" $taskData
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bus` | `string` | Yes | Event bus name |
| `event` | `string` | Yes | Event name to emit |
| `data` | `any` | No | Data to pass to listeners |

---

### listenerCount

Get the number of listeners for a specific event or all events on a bus

**Module:** `event` | **Returns:** `number` -- Number of registered listeners

```robinpath
event.listenerCount "workflow" "task.completed"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bus` | `string` | Yes | Event bus name |
| `event` | `string` | No | Event name (omit for total count) |

---

### eventNames

List all event names that have listeners on a bus

**Module:** `event` | **Returns:** `array` -- Array of event name strings

```robinpath
event.eventNames "workflow"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bus` | `string` | Yes | Event bus name |

---

### removeAll

Remove all listeners from all events on a bus

**Module:** `event` | **Returns:** `object` -- Object with count of event types removed

```robinpath
event.removeAll "workflow"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bus` | `string` | Yes | Event bus name |

---

### history

Get the emission history for a bus, optionally filtered by event name

**Module:** `event` | **Returns:** `array` -- Array of {event, timestamp, data} objects

```robinpath
event.history "workflow" "task.completed" 10
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bus` | `string` | Yes | Event bus name |
| `event` | `string` | No | Filter by event name (optional) |
| `limit` | `number` | No | Max entries to return (default 50) |

---

### waitFor

Wait for a specific event to be emitted, with a timeout

**Module:** `event` | **Returns:** `any` -- The data emitted with the event

```robinpath
event.waitFor "workflow" "task.completed" 5000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bus` | `string` | Yes | Event bus name |
| `event` | `string` | Yes | Event name to wait for |
| `timeout` | `number` | No | Timeout in ms (default 30000) |

---

### destroy

Destroy a named event bus and free all resources

**Module:** `event` | **Returns:** `boolean` -- True if the bus existed and was destroyed

```robinpath
event.destroy "workflow"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bus` | `string` | Yes | Event bus name |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Event name is required` | Check the error message for details |
| `Listener must be a function` | Check the error message for details |
| `Max listeners (...) reached for event "..."` | Check the error message for details |

```robinpath
set $result as event.create "workflow" 50
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate enerCount

Retrieve all items and loop through them.

```robinpath
set $result as event.listenerCount "workflow" "task.completed"
each $item in $result
  print $item
end
```

### 2. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as event.create "workflow" 50
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as event.listenerCount "workflow" "task.completed"
if $existing == null
  event.create "workflow" 50
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Event workflow

Chain multiple event operations together.

```robinpath
set $r_create as event.create "workflow" 50
set $r_on as event.on "workflow" "task.completed" $handler
set $r_once as event.once "workflow" "done" $handler
print "All operations complete"
```

### 5. Safe create with validation

Check results before proceeding.

```robinpath
set $result as event.create "workflow" 50
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
