---
title: "State"
module: "state"
package: "@robinpath/state"
description: "Finite state machine with transitions, guards, actions, context, history, and event listeners"
category: "infrastructure"
tags: [state, infrastructure]
type: "utility"
auth: "none"
functionCount: 17
---

# State

> Finite state machine with transitions, guards, actions, context, history, and event listeners

**Package:** `@robinpath/state` | **Category:** Infrastructure | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `state` module when you need to:

- **Create state machine** -- Use `state.create` to perform this operation
- **Send event to trigger transition** -- Use `state.send` to perform this operation
- **Get current state** -- Use `state.current` to perform this operation
- **Get machine context** -- Use `state.context` to perform this operation
- **Check if event can be sent** -- Use `state.can` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create state machine | `{name, current, states, transitions}` |
| [`send`](#send) | Send event to trigger transition | `{changed, from, current, event}` |
| [`current`](#current) | Get current state | `Current state` |
| [`context`](#context) | Get machine context | `Context data` |
| [`setContext`](#setcontext) | Set machine context | `true` |
| [`can`](#can) | Check if event can be sent | `true if transition exists` |
| [`events`](#events) | Get available events from current state | `Event names` |
| [`is`](#is) | Check if in specific state | `true if matches` |
| [`reset`](#reset) | Reset to initial state | `{current}` |
| [`history`](#history) | Get transition history | `History entries` |
| [`addTransition`](#addtransition) | Add transition at runtime | `true` |
| [`addState`](#addstate) | Add state at runtime | `true` |
| [`on`](#on) | Listen for transitions | `true` |
| [`serialize`](#serialize) | Serialize machine to JSON | `JSON string` |
| [`matches`](#matches) | Check if current state matches any | `true if matches` |
| [`destroy`](#destroy) | Destroy machine | `true` |
| [`list`](#list) | List all machines | `Machine names` |


## Functions

### create

Create state machine

**Module:** `state` | **Returns:** `object` -- {name, current, states, transitions}

```robinpath
state.create {"name": "light", "states": ["red", "green", "yellow"], "initial": "red", "transitions": [{"from": "red", "to": "green", "event": "next"}]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | Yes | {name, states[], initial, transitions[{from, to, event}], context} |

---

### send

Send event to trigger transition

**Module:** `state` | **Returns:** `object` -- {changed, from, current, event}

```robinpath
state.send "next" "light"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `event` | `string` | Yes | Event name |
| `machine` | `string` | No | Machine name |

---

### current

Get current state

**Module:** `state` | **Returns:** `string` -- Current state

```robinpath
state.current "light"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `machine` | `string` | No | Machine name |

---

### context

Get machine context

**Module:** `state` | **Returns:** `any` -- Context data

```robinpath
state.context "light"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `machine` | `string` | No | Machine name |

---

### setContext

Set machine context

**Module:** `state` | **Returns:** `boolean` -- true

```robinpath
state.setContext {"count": 0} "light"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `context` | `any` | Yes | New context |
| `machine` | `string` | No | Machine name |

---

### can

Check if event can be sent

**Module:** `state` | **Returns:** `boolean` -- true if transition exists

```robinpath
state.can "next" "light"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `event` | `string` | Yes | Event name |
| `machine` | `string` | No | Machine name |

---

### events

Get available events from current state

**Module:** `state` | **Returns:** `array` -- Event names

```robinpath
state.events "light"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `machine` | `string` | No | Machine name |

---

### is

Check if in specific state

**Module:** `state` | **Returns:** `boolean` -- true if matches

```robinpath
state.is "red" "light"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `state` | `string` | Yes | State name |
| `machine` | `string` | No | Machine name |

---

### reset

Reset to initial state

**Module:** `state` | **Returns:** `object` -- {current}

```robinpath
state.reset "light"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `machine` | `string` | No | Machine name |

---

### history

Get transition history

**Module:** `state` | **Returns:** `array` -- History entries

```robinpath
state.history "light" 10
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `machine` | `string` | No | Machine name |
| `limit` | `number` | No | Max entries |

---

### addTransition

Add transition at runtime

**Module:** `state` | **Returns:** `boolean` -- true

```robinpath
state.addTransition {"from": "yellow", "to": "red", "event": "next"} "light"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `transition` | `object` | Yes | {from, to, event} |
| `machine` | `string` | No | Machine name |

---

### addState

Add state at runtime

**Module:** `state` | **Returns:** `boolean` -- true

```robinpath
state.addState "flashing" "light"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `state` | `string` | Yes | State name |
| `machine` | `string` | No | Machine name |

---

### on

Listen for transitions

**Module:** `state` | **Returns:** `boolean` -- true

```robinpath
state.on "transition" $handler "light"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `event` | `string` | Yes | Event type (transition) |
| `handler` | `string` | Yes | Callback (from, to, event) |
| `machine` | `string` | No | Machine name |

---

### serialize

Serialize machine to JSON

**Module:** `state` | **Returns:** `string` -- JSON string

```robinpath
state.serialize "light"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `machine` | `string` | No | Machine name |

---

### matches

Check if current state matches any

**Module:** `state` | **Returns:** `boolean` -- true if matches

```robinpath
state.matches ["red", "yellow"] "light"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `states` | `array` | Yes | State names |
| `machine` | `string` | No | Machine name |

---

### destroy

Destroy machine

**Module:** `state` | **Returns:** `boolean` -- true

```robinpath
state.destroy "light"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `machine` | `string` | No | Machine name |

---

### list

List all machines

**Module:** `state` | **Returns:** `array` -- Machine names

```robinpath
state.list
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `State machine "..." not found` | Check the error message for details |

```robinpath
set $result as state.create {"name": "light", "states": ["red", "green", "yellow"], "initial": "red", "transitions": [{"from": "red", "to": "green", "event": "next"}]}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate 

Retrieve all items and loop through them.

```robinpath
set $result as state.list
each $item in $result
  print $item
end
```

### 2. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as state.create {"name": "light", "states": ["red", "green", "yellow"], "initial": "red", "transitions": [{"from": "red", "to": "green", "event": "next"}]}
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as state.list
if $existing == null
  state.create {"name": "light", "states": ["red", "green", "yellow"], "initial": "red", "transitions": [{"from": "red", "to": "green", "event": "next"}]}
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step State workflow

Chain multiple state operations together.

```robinpath
set $r_create as state.create {"name": "light", "states": ["red", "green", "yellow"], "initial": "red", "transitions": [{"from": "red", "to": "green", "event": "next"}]}
set $r_send as state.send "next" "light"
set $r_current as state.current "light"
print "All operations complete"
```

### 5. Safe create with validation

Check results before proceeding.

```robinpath
set $result as state.create {"name": "light", "states": ["red", "green", "yellow"], "initial": "red", "transitions": [{"from": "red", "to": "green", "event": "next"}]}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
