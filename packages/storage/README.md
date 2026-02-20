# @robinpath/storage

> Persistent key-value storage (memory or file-backed) with TTL, counters, and file operations

![Category](https://img.shields.io/badge/category-Infrastructure-blue) ![Functions](https://img.shields.io/badge/functions-18-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `storage` module lets you:

- Create a named key-value store (memory or file-backed)
- Get a value by key
- Check if a key exists
- Remove a key
- List all keys, optionally filtered by pattern

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/storage
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
storage.set "state" "lastRun" $timestamp
```

## Available Functions

| Function | Description |
|----------|-------------|
| `storage.create` | Create a named key-value store (memory or file-backed) |
| `storage.set` | Set a key-value pair with optional TTL |
| `storage.get` | Get a value by key |
| `storage.has` | Check if a key exists |
| `storage.remove` | Remove a key |
| `storage.keys` | List all keys, optionally filtered by pattern |
| `storage.values` | Get all key-value pairs |
| `storage.size` | Get number of entries |
| `storage.clear` | Remove all entries |
| `storage.increment` | Increment a numeric value |
| `storage.decrement` | Decrement a numeric value |
| `storage.getAll` | Get all data as a plain object |
| `storage.setMany` | Set multiple key-value pairs at once |
| `storage.destroy` | Destroy a store and delete its file if file-backed |
| `storage.saveFile` | Save content to a file on disk |
| `storage.loadFile` | Load a file from disk |
| `storage.listFiles` | List files in a directory |
| `storage.deleteFile` | Delete a file from disk |

## Examples

### Set a key-value pair with optional TTL

```robinpath
storage.set "state" "lastRun" $timestamp
```

### Get a value by key

```robinpath
storage.get "state" "lastRun"
```

### Check if a key exists

```robinpath
storage.has "state" "lastRun"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/storage";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  storage.set "state" "lastRun" $timestamp
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
