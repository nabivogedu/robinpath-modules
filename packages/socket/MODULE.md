---
title: "Socket"
module: "socket"
package: "@robinpath/socket"
description: "WebSocket client for real-time communication with message history, handlers, and connection management"
category: "web"
tags: [socket, web, messaging]
type: "utility"
auth: "connection-string"
functionCount: 8
---

# Socket

> WebSocket client for real-time communication with message history, handlers, and connection management

**Package:** `@robinpath/socket` | **Category:** Web | **Type:** Utility


## Authentication

```robinpath
socket.connect "slack" "wss://wss.slack.com/link"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `socket` module when you need to:

- **Send a message through a WebSocket connection** -- Use `socket.send` to perform this operation
- **Wait for and receive the next message** -- Use `socket.receive` to perform this operation
- **Get recent message history** -- Use `socket.messages` to perform this operation
- **Check if a WebSocket is connected** -- Use `socket.isConnected` to perform this operation
- **Close a WebSocket connection** -- Use `socket.close` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`connect`](#connect) | Connect to a WebSocket server | `{name, url, connected}` |
| [`send`](#send) | Send a message through a WebSocket connection | `True if sent` |
| [`receive`](#receive) | Wait for and receive the next message | `Received message` |
| [`messages`](#messages) | Get recent message history | `Array of recent messages` |
| [`isConnected`](#isconnected) | Check if a WebSocket is connected | `True if open` |
| [`close`](#close) | Close a WebSocket connection | `True if closed` |
| [`onMessage`](#onmessage) | Register a handler for incoming messages | `True` |
| [`ping`](#ping) | Send a ping to keep the connection alive | `True if sent` |


## Functions

### connect

Connect to a WebSocket server

**Module:** `socket` | **Returns:** `object` -- {name, url, connected}

```robinpath
socket.connect "slack" "wss://wss.slack.com/link"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `url` | `string` | Yes | WebSocket URL (ws:// or wss://) |
| `options` | `object` | No | {headers, timeout, maxHistory} |

---

### send

Send a message through a WebSocket connection

**Module:** `socket` | **Returns:** `boolean` -- True if sent

```robinpath
socket.send "slack" {"type": "message", "text": "Hello"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `data` | `any` | Yes | Message (string or JSON) |

---

### receive

Wait for and receive the next message

**Module:** `socket` | **Returns:** `any` -- Received message

```robinpath
socket.receive "slack" 5000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `timeout` | `number` | No | Timeout in ms (default 10000) |

---

### messages

Get recent message history

**Module:** `socket` | **Returns:** `array` -- Array of recent messages

```robinpath
socket.messages "slack" 10
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `limit` | `number` | No | Max messages (default 50) |

---

### isConnected

Check if a WebSocket is connected

**Module:** `socket` | **Returns:** `boolean` -- True if open

```robinpath
socket.isConnected "slack"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |

---

### close

Close a WebSocket connection

**Module:** `socket` | **Returns:** `boolean` -- True if closed

```robinpath
socket.close "slack"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |

---

### onMessage

Register a handler for incoming messages

**Module:** `socket` | **Returns:** `boolean` -- True

```robinpath
socket.onMessage "slack" $handler
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `handler` | `string` | Yes | Callback function |

---

### ping

Send a ping to keep the connection alive

**Module:** `socket` | **Returns:** `boolean` -- True if sent

```robinpath
socket.ping "slack"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `WebSocket URL is required` | Check the error message for details |
| `Handler must be a function` | Check the error message for details |
| `Connection "..." not found` | Check the error message for details |
| `Connection "..." is not open` | Check the error message for details |

```robinpath
set $result as socket.send "slack" {"type": "message", "text": "Hello"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with send

Create a new resource and capture the result.

```robinpath
set $result as socket.send "slack" {"type": "message", "text": "Hello"}
print "Created: " + $result
```

### 2. Multi-step Socket workflow

Chain multiple socket operations together.

```robinpath
set $r_connect as socket.connect "slack" "wss://wss.slack.com/link"
set $r_send as socket.send "slack" {"type": "message", "text": "Hello"}
set $r_receive as socket.receive "slack" 5000
print "All operations complete"
```

### 3. Safe connect with validation

Check results before proceeding.

```robinpath
set $result as socket.connect "slack" "wss://wss.slack.com/link"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
