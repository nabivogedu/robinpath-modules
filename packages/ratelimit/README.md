# @robinpath/ratelimit

> Rate limiting with token bucket, sliding window, and fixed window algorithms

![Category](https://img.shields.io/badge/category-Infrastructure-blue) ![Functions](https://img.shields.io/badge/functions-8-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `ratelimit` module lets you:

- Create a named rate limiter (token-bucket, sliding-window, or fixed-window)
- Try to acquire tokens/slots from a rate limiter
- Check if a request would be allowed without consuming a token
- Get the number of remaining tokens/slots
- Wait until a token is available, then acquire it

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/ratelimit
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
ratelimit.acquire "api"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `ratelimit.create` | Create a named rate limiter (token-bucket, sliding-window, or fixed-window) |
| `ratelimit.acquire` | Try to acquire tokens/slots from a rate limiter |
| `ratelimit.check` | Check if a request would be allowed without consuming a token |
| `ratelimit.remaining` | Get the number of remaining tokens/slots |
| `ratelimit.wait` | Wait until a token is available, then acquire it |
| `ratelimit.reset` | Reset a rate limiter to its initial state |
| `ratelimit.status` | Get detailed status information for a rate limiter |
| `ratelimit.destroy` | Remove a rate limiter and free its resources |

## Examples

### Try to acquire tokens/slots from a rate limiter

```robinpath
ratelimit.acquire "api"
```

### Check if a request would be allowed without consuming a token

```robinpath
ratelimit.check "api"
```

### Get the number of remaining tokens/slots

```robinpath
ratelimit.remaining "api"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/ratelimit";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  ratelimit.acquire "api"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
