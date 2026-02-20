# @robinpath/fs

> Read, write, copy, move, and manage files and directories

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-14-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `fs` module lets you:

- Read the contents of a file as a string
- Write content to a file, creating or overwriting it
- Append content to the end of a file
- Check whether a file or directory exists at the given path
- Delete a file

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/fs
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
any "/tmp/file.txt" "hello world"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `fs.read` | Read the contents of a file as a string |
| `fs.write` | Write content to a file, creating or overwriting it |
| `fs.append` | Append content to the end of a file |
| `fs.exists` | Check whether a file or directory exists at the given path |
| `fs.delete` | Delete a file |
| `fs.copy` | Copy a file from source to destination |
| `fs.move` | Move or rename a file from source to destination |
| `fs.rename` | Rename a file (alias for move) |
| `fs.list` | List the contents of a directory |
| `fs.mkdir` | Create a directory (recursively creates parent directories) |
| `fs.rmdir` | Remove a directory and its contents |
| `fs.stat` | Get file or directory statistics |
| `fs.isFile` | Check whether a path points to a regular file |
| `fs.isDir` | Check whether a path points to a directory |

## Examples

### Write content to a file, creating or overwriting it

```robinpath
any "/tmp/file.txt" "hello world"
```

### Append content to the end of a file

```robinpath
any "/tmp/file.txt" "more text"
```

### Check whether a file or directory exists at the given path

```robinpath
any "/tmp/file.txt"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/fs";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  any "/tmp/file.txt" "hello world"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
