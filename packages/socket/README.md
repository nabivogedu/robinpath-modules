# @robinpath/socket

> WebSocket client for real-time communication with message history, handlers, and connection management

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-8-green) ![Auth](https://img.shields.io/badge/auth-connection-string-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `socket` module lets you:

- Send a message through a WebSocket connection
- Wait for and receive the next message
- Get recent message history
- Check if a WebSocket is connected
- Close a WebSocket connection

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/socket
```

## Quick Start

**1. Set up credentials**

```robinpath
socket.connect "slack" "wss://wss.slack.com/link"
```

**2. Send a message through a WebSocket connection**

```robinpath
socket.send "slack" {"type": "message", "text": "Hello"}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `socket.connect` | Connect to a WebSocket server |
| `socket.send` | Send a message through a WebSocket connection |
| `socket.receive` | Wait for and receive the next message |
| `socket.messages` | Get recent message history |
| `socket.isConnected` | Check if a WebSocket is connected |
| `socket.close` | Close a WebSocket connection |
| `socket.onMessage` | Register a handler for incoming messages |
| `socket.ping` | Send a ping to keep the connection alive |

## Examples

### Send a message through a WebSocket connection

```robinpath
socket.send "slack" {"type": "message", "text": "Hello"}
```

### Wait for and receive the next message

```robinpath
socket.receive "slack" 5000
```

### Get recent message history

```robinpath
socket.messages "slack" 10
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/socket";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  socket.connect "slack" "wss://wss.slack.com/link"
  socket.send "slack" {"type": "message", "text": "Hello"}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
