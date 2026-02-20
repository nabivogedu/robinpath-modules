---
title: "MQTT"
module: "mqtt"
package: "@robinpath/mqtt"
description: "MQTT client module for connecting to MQTT brokers, publishing messages, subscribing to topics, and handling incoming messages. Supports multiple concurrent client connections, QoS levels, last will messages, and message history tracking."
category: "web"
tags: [mqtt, web, messaging]
type: "utility"
auth: "connection-string"
functionCount: 12
---

# MQTT

> MQTT client module for connecting to MQTT brokers, publishing messages, subscribing to topics, and handling incoming messages. Supports multiple concurrent client connections, QoS levels, last will messages, and message history tracking.

**Package:** `@robinpath/mqtt` | **Category:** Web | **Type:** Utility


## Authentication

```robinpath
mqtt.connect "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `mqtt` module when you need to:

- **Publish a message to an MQTT topic** -- Use `mqtt.publish` to perform this operation
- **Subscribe to an MQTT topic** -- Use `mqtt.subscribe` to perform this operation
- **Unsubscribe from an MQTT topic** -- Use `mqtt.unsubscribe` to perform this operation
- **Register a message handler for incoming MQTT messages** -- Use `mqtt.on` to perform this operation
- **Disconnect from an MQTT broker and clean up resources** -- Use `mqtt.disconnect` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`connect`](#connect) | Connect to an MQTT broker | `object` |
| [`publish`](#publish) | Publish a message to an MQTT topic | `object` |
| [`subscribe`](#subscribe) | Subscribe to an MQTT topic | `object` |
| [`unsubscribe`](#unsubscribe) | Unsubscribe from an MQTT topic | `object` |
| [`on`](#on) | Register a message handler for incoming MQTT messages | `object` |
| [`disconnect`](#disconnect) | Disconnect from an MQTT broker and clean up resources | `object` |
| [`isConnected`](#isconnected) | Check if an MQTT client is currently connected | `object` |
| [`reconnect`](#reconnect) | Reconnect an existing MQTT client to its broker | `object` |
| [`topics`](#topics) | List all topics the client is currently subscribed to | `object` |
| [`lastMessage`](#lastmessage) | Get the last received message on a specific topic | `object` |
| [`qos`](#qos) | Set the default Quality of Service level for the client | `object` |
| [`will`](#will) | Set the last will and testament message for the client | `object` |


## Functions

### connect

Connect to an MQTT broker

**Module:** `mqtt` | **Returns:** `object` -- API response.

```robinpath
mqtt.connect
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `brokerUrl` | `string` | No | Broker URL (e.g. mqtt://localhost:1883) |
| `options` | `object` | No | MQTT connection options |

---

### publish

Publish a message to an MQTT topic

**Module:** `mqtt` | **Returns:** `object` -- API response.

```robinpath
mqtt.publish
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `topic` | `string` | No | Topic to publish to |
| `message` | `string` | No | Message payload |
| `options` | `object` | No | Publish options (qos, retain, etc.) |

---

### subscribe

Subscribe to an MQTT topic

**Module:** `mqtt` | **Returns:** `object` -- API response.

```robinpath
mqtt.subscribe
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `topic` | `string` | No | Topic to subscribe to |
| `options` | `object` | No | Subscribe options (qos, etc.) |

---

### unsubscribe

Unsubscribe from an MQTT topic

**Module:** `mqtt` | **Returns:** `object` -- API response.

```robinpath
mqtt.unsubscribe
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `topic` | `string` | No | Topic to unsubscribe from |

---

### on

Register a message handler for incoming MQTT messages

**Module:** `mqtt` | **Returns:** `object` -- API response.

```robinpath
mqtt.on
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `handlerId` | `string` | No | Unique handler identifier |
| `callback` | `string` | No | Handler function receiving (topic, message) |

---

### disconnect

Disconnect from an MQTT broker and clean up resources

**Module:** `mqtt` | **Returns:** `object` -- API response.

```robinpath
mqtt.disconnect
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |

---

### isConnected

Check if an MQTT client is currently connected

**Module:** `mqtt` | **Returns:** `object` -- API response.

```robinpath
mqtt.isConnected
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |

---

### reconnect

Reconnect an existing MQTT client to its broker

**Module:** `mqtt` | **Returns:** `object` -- API response.

```robinpath
mqtt.reconnect
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |

---

### topics

List all topics the client is currently subscribed to

**Module:** `mqtt` | **Returns:** `object` -- API response.

```robinpath
mqtt.topics
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |

---

### lastMessage

Get the last received message on a specific topic

**Module:** `mqtt` | **Returns:** `object` -- API response.

```robinpath
mqtt.lastMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `topic` | `string` | No | Topic to get last message for |

---

### qos

Set the default Quality of Service level for the client

**Module:** `mqtt` | **Returns:** `object` -- API response.

```robinpath
mqtt.qos
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `level` | `number` | No | QoS level: 0 (at most once), 1 (at least once), 2 (exactly once) |

---

### will

Set the last will and testament message for the client

**Module:** `mqtt` | **Returns:** `object` -- API response.

```robinpath
mqtt.will
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `topic` | `string` | No | Will topic |
| `payload` | `string` | No | Will message payload |
| `qos` | `number` | No | Will QoS level (0, 1, or 2) |
| `retain` | `boolean` | No | Whether to retain the will message |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Topic is required.` | Check the error message for details |
| `A callback function is required.` | Check the error message for details |
| `QoS level must be 0, 1, or 2.` | Check the error message for details |
| `Topic is required for last will.` | Check the error message for details |
| `MQTT client "..." not found. Call connect() first.` | Check the error message for details |
| `MQTT client "..." already exists. Disconnect first or use a different id.` | Check the error message for details |

```robinpath
set $result as mqtt.publish
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step MQTT workflow

Chain multiple mqtt operations together.

```robinpath
set $r_connect as mqtt.connect
set $r_publish as mqtt.publish
set $r_subscribe as mqtt.subscribe
print "All operations complete"
```

### 2. Safe connect with validation

Check results before proceeding.

```robinpath
set $result as mqtt.connect
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
