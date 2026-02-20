# @robinpath/path

> Path manipulation utilities for joining, resolving, and parsing file paths

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `path` module lets you:

- Join path segments into a single path
- Resolve a sequence of paths into an absolute path
- Get the directory name of a path
- Get the last portion of a path (filename)
- Get the file extension of a path

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/path
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
path.resolve "src" "index.ts"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `path.join` | Join path segments into a single path |
| `path.resolve` | Resolve a sequence of paths into an absolute path |
| `path.dirname` | Get the directory name of a path |
| `path.basename` | Get the last portion of a path (filename) |
| `path.extname` | Get the file extension of a path |
| `path.normalize` | Normalize a path, resolving '..' and '.' segments |
| `path.isAbsolute` | Check whether a path is absolute |
| `path.relative` | Compute the relative path from one path to another |
| `path.parse` | Parse a path into an object with root, dir, base, ext, and name |
| `path.separator` | Get the platform-specific path segment separator |

## Examples

### Resolve a sequence of paths into an absolute path

```robinpath
path.resolve "src" "index.ts"
```

### Get the directory name of a path

```robinpath
path.dirname "/usr/local/bin/node"
```

### Get the last portion of a path (filename)

```robinpath
path.basename "/usr/local/bin/node"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/path";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  path.resolve "src" "index.ts"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
