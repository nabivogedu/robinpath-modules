# @robinpath/state

> Finite state machine with transitions, guards, actions, context, history, and event listeners

![Category](https://img.shields.io/badge/category-Infrastructure-blue) ![Functions](https://img.shields.io/badge/functions-17-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `state` module lets you:

- Create state machine
- Send event to trigger transition
- Get current state
- Get machine context
- Check if event can be sent

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/state
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
state.send "next" "light"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `state.create` | Create state machine |
| `state.send` | Send event to trigger transition |
| `state.current` | Get current state |
| `state.context` | Get machine context |
| `state.setContext` | Set machine context |
| `state.can` | Check if event can be sent |
| `state.events` | Get available events from current state |
| `state.is` | Check if in specific state |
| `state.reset` | Reset to initial state |
| `state.history` | Get transition history |
| `state.addTransition` | Add transition at runtime |
| `state.addState` | Add state at runtime |
| `state.on` | Listen for transitions |
| `state.serialize` | Serialize machine to JSON |
| `state.matches` | Check if current state matches any |
| `state.destroy` | Destroy machine |
| `state.list` | List all machines |

## Examples

### Send event to trigger transition

```robinpath
state.send "next" "light"
```

### Get current state

```robinpath
state.current "light"
```

### Get machine context

```robinpath
state.context "light"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/state";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  state.send "next" "light"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
