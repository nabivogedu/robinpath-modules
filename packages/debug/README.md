# @robinpath/debug

> Debugging utilities: inspect, timing, counters, logging, memory profiling, value comparison, ASCII tables

![Category](https://img.shields.io/badge/category-Other-blue) ![Functions](https://img.shields.io/badge/functions-20-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `debug` module lets you:

- Deep inspect a value
- Get detailed type
- Start a timer
- End timer and get duration
- Pass value through with timing

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/debug
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
debug.typeOf $data
```

## Available Functions

| Function | Description |
|----------|-------------|
| `debug.inspect` | Deep inspect a value |
| `debug.typeOf` | Get detailed type |
| `debug.timeStart` | Start a timer |
| `debug.timeEnd` | End timer and get duration |
| `debug.timeit` | Pass value through with timing |
| `debug.count` | Increment counter |
| `debug.countReset` | Reset counter |
| `debug.countGet` | Get counter value |
| `debug.log` | Add debug log entry |
| `debug.getLogs` | Get debug logs |
| `debug.clearLogs` | Clear debug logs |
| `debug.assert` | Assert condition |
| `debug.trace` | Get stack trace |
| `debug.memory` | Get memory usage |
| `debug.sizeof` | Estimate value memory size |
| `debug.diff` | Compare two values |
| `debug.freeze` | Deep freeze object |
| `debug.clone` | Deep clone value |
| `debug.table` | Format as ASCII table |
| `debug.dump` | Pretty-print value |

## Examples

### Get detailed type

```robinpath
debug.typeOf $data
```

### Start a timer

```robinpath
debug.timeStart "fetch"
```

### End timer and get duration

```robinpath
debug.timeEnd "fetch"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/debug";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  debug.typeOf $data
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
