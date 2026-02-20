# @robinpath/retry

> Retry with exponential backoff and circuit breaker patterns for resilient automation workflows

![Category](https://img.shields.io/badge/category-Infrastructure-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `retry` module lets you:

- Execute a function with automatic retry and exponential backoff
- Calculate the delay for a given retry attempt using exponential backoff
- Check if an HTTP status code is retryable (408, 429, 500, 502, 503, 504)
- Wait for a specified number of milliseconds
- Preview the delay schedule for a series of retry attempts

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/retry
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
retry.withBackoff 3 1000 2 30000
```

## Available Functions

| Function | Description |
|----------|-------------|
| `retry.execute` | Execute a function with automatic retry and exponential backoff |
| `retry.withBackoff` | Calculate the delay for a given retry attempt using exponential backoff |
| `retry.isRetryable` | Check if an HTTP status code is retryable (408, 429, 500, 502, 503, 504) |
| `retry.delay` | Wait for a specified number of milliseconds |
| `retry.attempts` | Preview the delay schedule for a series of retry attempts |
| `retry.createBreaker` | Create a named circuit breaker with a failure threshold and reset timeout |
| `retry.breakerState` | Get the current state of a named circuit breaker |
| `retry.breakerRecord` | Record a success or failure in a circuit breaker |
| `retry.breakerAllow` | Check if a circuit breaker allows requests through |
| `retry.breakerReset` | Reset a circuit breaker to closed state |

## Examples

### Calculate the delay for a given retry attempt using exponential backoff

```robinpath
retry.withBackoff 3 1000 2 30000
```

### Check if an HTTP status code is retryable (408, 429, 500, 502, 503, 504)

```robinpath
retry.isRetryable 503
```

### Wait for a specified number of milliseconds

```robinpath
retry.delay 2000
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/retry";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  retry.withBackoff 3 1000 2 30000
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
