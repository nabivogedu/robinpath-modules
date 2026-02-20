# @robinpath/promise

> Async utilities: parallel, race, waterfall, map, retry, throttle, debounce, timeout, and concurrency control

![Category](https://img.shields.io/badge/category-Infrastructure-blue) ![Functions](https://img.shields.io/badge/functions-17-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `promise` module lets you:

- Wait for all promises
- Wait for all promises (no throw)
- First promise to settle
- First promise to fulfill
- Add timeout to promise

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/promise
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
promise.allSettled [$p1, $p2]
```

## Available Functions

| Function | Description |
|----------|-------------|
| `promise.all` | Wait for all promises |
| `promise.allSettled` | Wait for all promises (no throw) |
| `promise.race` | First promise to settle |
| `promise.any` | First promise to fulfill |
| `promise.timeout` | Add timeout to promise |
| `promise.delay` | Resolve after delay |
| `promise.retry` | Retry function with backoff |
| `promise.parallel` | Run functions with concurrency limit |
| `promise.waterfall` | Run functions in sequence, passing results |
| `promise.map` | Map items with async function |
| `promise.filter` | Filter items with async predicate |
| `promise.each` | Iterate with async function |
| `promise.reduce` | Reduce with async function |
| `promise.throttle` | Throttle function calls |
| `promise.debounce` | Debounce function calls |
| `promise.deferred` | Create deferred promise |
| `promise.sleep` | Sleep for milliseconds |

## Examples

### Wait for all promises (no throw)

```robinpath
promise.allSettled [$p1, $p2]
```

### First promise to settle

```robinpath
promise.race [$p1, $p2]
```

### First promise to fulfill

```robinpath
promise.any [$p1, $p2]
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/promise";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  promise.allSettled [$p1, $p2]
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
