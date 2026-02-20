# @robinpath/cache

> In-memory key-value cache with optional TTL expiration for temporary data storage

![Category](https://img.shields.io/badge/category-Infrastructure-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `cache` module lets you:

- Retrieve a value from the cache by key
- Check if a non-expired key exists in the cache
- Remove a key from the cache
- Remove all entries from the cache
- Get all non-expired keys in the cache

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/cache
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
cache.get "user:1" "unknown"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `cache.set` | Store a value in the cache with an optional TTL |
| `cache.get` | Retrieve a value from the cache by key |
| `cache.has` | Check if a non-expired key exists in the cache |
| `cache.delete` | Remove a key from the cache |
| `cache.clear` | Remove all entries from the cache |
| `cache.keys` | Get all non-expired keys in the cache |
| `cache.values` | Get all non-expired values in the cache |
| `cache.size` | Get the number of non-expired entries in the cache |
| `cache.ttl` | Get the remaining time-to-live for a cache key |
| `cache.setMany` | Store multiple key-value pairs in the cache at once |
| `cache.getMany` | Retrieve multiple values from the cache by keys |
| `cache.deleteMany` | Remove multiple keys from the cache at once |

## Examples

### Retrieve a value from the cache by key

```robinpath
cache.get "user:1" "unknown"
```

### Check if a non-expired key exists in the cache

```robinpath
cache.has "user:1"
```

### Remove a key from the cache

```robinpath
cache.delete "user:1"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/cache";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  cache.get "user:1" "unknown"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
