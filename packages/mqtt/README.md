# @robinpath/mqtt

> MQTT client module for connecting to MQTT brokers, publishing messages, subscribing to topics, and handling incoming messages. Supports multiple concurrent client connections, QoS levels, last will messages, and message history tracking.

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-connection-string-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `mqtt` module lets you:

- Publish a message to an MQTT topic
- Subscribe to an MQTT topic
- Unsubscribe from an MQTT topic
- Register a message handler for incoming MQTT messages
- Disconnect from an MQTT broker and clean up resources

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/mqtt
```

## Quick Start

**1. Set up credentials**

```robinpath
mqtt.connect "your-credentials"
```

**2. Publish a message to an MQTT topic**

```robinpath
mqtt.publish
```

## Available Functions

| Function | Description |
|----------|-------------|
| `mqtt.connect` | Connect to an MQTT broker |
| `mqtt.publish` | Publish a message to an MQTT topic |
| `mqtt.subscribe` | Subscribe to an MQTT topic |
| `mqtt.unsubscribe` | Unsubscribe from an MQTT topic |
| `mqtt.on` | Register a message handler for incoming MQTT messages |
| `mqtt.disconnect` | Disconnect from an MQTT broker and clean up resources |
| `mqtt.isConnected` | Check if an MQTT client is currently connected |
| `mqtt.reconnect` | Reconnect an existing MQTT client to its broker |
| `mqtt.topics` | List all topics the client is currently subscribed to |
| `mqtt.lastMessage` | Get the last received message on a specific topic |
| `mqtt.qos` | Set the default Quality of Service level for the client |
| `mqtt.will` | Set the last will and testament message for the client |

## Examples

### Publish a message to an MQTT topic

```robinpath
mqtt.publish
```

### Subscribe to an MQTT topic

```robinpath
mqtt.subscribe
```

### Unsubscribe from an MQTT topic

```robinpath
mqtt.unsubscribe
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/mqtt";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  mqtt.connect "your-credentials"
  mqtt.publish
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
