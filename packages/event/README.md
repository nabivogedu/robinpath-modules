# @robinpath/event

> Pub/sub event system with named buses, listener management, history, and async waitFor

![Category](https://img.shields.io/badge/category-Infrastructure-blue) ![Functions](https://img.shields.io/badge/functions-11-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `event` module lets you:

- Create a named event bus with an optional max listener limit
- Subscribe a listener to an event on a named bus
- Subscribe a one-time listener that automatically removes itself after firing
- Remove a listener, all listeners for an event, or all listeners on the bus
- Emit an event with optional data, notifying all subscribed listeners

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/event
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
event.on "workflow" "task.completed" $handler
```

## Available Functions

| Function | Description |
|----------|-------------|
| `event.create` | Create a named event bus with an optional max listener limit |
| `event.on` | Subscribe a listener to an event on a named bus |
| `event.once` | Subscribe a one-time listener that automatically removes itself after firing |
| `event.off` | Remove a listener, all listeners for an event, or all listeners on the bus |
| `event.emit` | Emit an event with optional data, notifying all subscribed listeners |
| `event.listenerCount` | Get the number of listeners for a specific event or all events on a bus |
| `event.eventNames` | List all event names that have listeners on a bus |
| `event.removeAll` | Remove all listeners from all events on a bus |
| `event.history` | Get the emission history for a bus, optionally filtered by event name |
| `event.waitFor` | Wait for a specific event to be emitted, with a timeout |
| `event.destroy` | Destroy a named event bus and free all resources |

## Examples

### Subscribe a listener to an event on a named bus

```robinpath
event.on "workflow" "task.completed" $handler
```

### Subscribe a one-time listener that automatically removes itself after firing

```robinpath
event.once "workflow" "done" $handler
```

### Remove a listener, all listeners for an event, or all listeners on the bus

```robinpath
event.off "workflow" "task.completed"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/event";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  event.on "workflow" "task.completed" $handler
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
