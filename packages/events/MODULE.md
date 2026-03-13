---
title: "Events"
module: "events"
package: "@robinpath/events"
description: "Event emitters for pub/sub, listeners, and event-driven patterns"
category: "core"
tags: [events, emitter, pubsub, core]
type: "builtin"
auth: "none"
functionCount: 10
---

# Events

> Event emitters for pub/sub, listeners, and event-driven patterns

**Package:** `@robinpath/events` | **Category:** Core | **Type:** Built-in

## Authentication

No authentication required. All functions are available immediately.

## Use Cases

Use the `events` module when you need to:

- **Create an event emitter** -- Use `events.create` to make a new emitter
- **Listen for events** -- Use `events.on` for persistent or `events.once` for one-time listeners
- **Emit events** -- Use `events.emit` to trigger all listeners for an event
- **Remove listeners** -- Use `events.off` or `events.removeAll` to clean up
- **Inspect registered events** -- Use `events.eventNames` or `events.listeners`

## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create a new event emitter | `Object` |
| [`on`](#on) | Register a persistent event listener | `Object` |
| [`once`](#once) | Register a one-time event listener | `Object` |
| [`emit`](#emit) | Emit an event to all listeners | `boolean` |
| [`off`](#off) | Remove an event listener | `boolean` |
| [`listeners`](#listeners) | Get all listeners for an event | `Array` |
| [`eventNames`](#eventnames) | Get all registered event names | `Array` |
| [`removeAll`](#removeall) | Remove all listeners for an event | `boolean` |
| [`destroy`](#destroy) | Destroy an emitter and all its listeners | `boolean` |
| [`list`](#list) | List all active emitters | `Array` |

## Functions

### create

Create a new event emitter instance

**Module:** `events` | **Returns:** `Object` -- Event emitter handle

```robinpath
events.create
```

No parameters required.

---

### on

Register a persistent listener for a named event

**Module:** `events` | **Returns:** `Object` -- The emitter (for chaining)

```robinpath
events.on $emitter "data"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `emitter` | `Object` | Yes | Event emitter handle |
| `event` | `string` | Yes | Event name to listen for |

---

### once

Register a one-time listener that auto-removes after first trigger

**Module:** `events` | **Returns:** `Object` -- The emitter (for chaining)

```robinpath
events.once $emitter "ready"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `emitter` | `Object` | Yes | Event emitter handle |
| `event` | `string` | Yes | Event name to listen for |

---

### emit

Emit an event, triggering all registered listeners

**Module:** `events` | **Returns:** `boolean` -- True if event had listeners

```robinpath
events.emit $emitter "data" "payload here"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `emitter` | `Object` | Yes | Event emitter handle |
| `event` | `string` | Yes | Event name to emit |
| `data` | `any` | No | Data to pass to listeners |

---

### off

Remove a specific listener from an event

**Module:** `events` | **Returns:** `boolean` -- True if listener was removed

```robinpath
events.off $emitter "data"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `emitter` | `Object` | Yes | Event emitter handle |
| `event` | `string` | Yes | Event name to remove listener from |

---

### listeners

Get all listeners registered for a specific event

**Module:** `events` | **Returns:** `Array` -- Array of listener objects

```robinpath
events.listeners $emitter "data"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `emitter` | `Object` | Yes | Event emitter handle |
| `event` | `string` | Yes | Event name |

---

### eventNames

Get all event names that have registered listeners

**Module:** `events` | **Returns:** `Array` -- Array of event name strings

```robinpath
events.eventNames $emitter
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `emitter` | `Object` | Yes | Event emitter handle |

---

### removeAll

Remove all listeners for a specific event or all events

**Module:** `events` | **Returns:** `boolean` -- True if listeners were removed

```robinpath
events.removeAll $emitter "data"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `emitter` | `Object` | Yes | Event emitter handle |
| `event` | `string` | No | Event name (omit to remove all) |

---

### destroy

Destroy an emitter and remove all its listeners

**Module:** `events` | **Returns:** `boolean` -- True if emitter was destroyed

```robinpath
events.destroy $emitter
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `emitter` | `Object` | Yes | Event emitter handle |

---

### list

List all active event emitters

**Module:** `events` | **Returns:** `Array` -- Array of emitter objects

```robinpath
events.list
```

No parameters required.

---

## Error Handling

| Error | Cause |
|-------|-------|
| Emitter not found | Invalid or destroyed emitter handle |
| Max listeners exceeded | Too many listeners on one event |

```robinpath
@desc "Create emitter and handle events"
do
  set $emitter as events.create
  events.on $emitter "message"
  events.emit $emitter "message" "Hello!"
  events.destroy $emitter
enddo
```

## Recipes

### 1. Simple pub/sub pattern

Create an emitter, listen, emit, and clean up.

```robinpath
@desc "Event-driven message processing"
do
  set $bus as events.create
  events.on $bus "log"
  events.on $bus "error"
  events.emit $bus "log" "Application started"
  events.emit $bus "error" "Something went wrong"
  set $names as events.eventNames $bus
  print "Active events: " + array.join $names ", "
  events.destroy $bus
enddo
```

### 2. One-time initialization event

Listen for an event that only fires once.

```robinpath
@desc "Wait for ready signal"
do
  set $app as events.create
  events.once $app "ready"
  events.emit $app "ready" "initialized"
  print "App is ready"
  events.destroy $app
enddo
```

## Related Modules

- **stream** -- Stream-based event processing
- **process** -- Process-level signals
