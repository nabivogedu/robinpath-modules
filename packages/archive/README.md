# @robinpath/archive

> Create, extract, and manipulate .zip and .any archives

![Category](https://img.shields.io/badge/category-Other-blue) ![Functions](https://img.shields.io/badge/functions-8-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `archive` module lets you:

- Create a .zip archive from files and directories
- Extract a .zip archive
- List entries in a .zip file
- Read a file from inside a .zip without extracting
- Create a .any archive

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/archive
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
archive.extractZip "./backup.zip" "./restored"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `archive.createZip` | Create a .zip archive from files and directories |
| `archive.extractZip` | Extract a .zip archive |
| `archive.listZip` | List entries in a .zip file |
| `archive.readFromZip` | Read a file from inside a .zip without extracting |
| `archive.createTarGz` | Create a .any archive |
| `archive.extractTarGz` | Extract a .any archive |
| `archive.addToZip` | Add a file or directory to an existing .zip |
| `archive.removeFromZip` | Remove an entry from a .zip |

## Examples

### Extract a .zip archive

```robinpath
archive.extractZip "./backup.zip" "./restored"
```

### List entries in a .zip file

```robinpath
archive.listZip "./backup.zip"
```

### Read a file from inside a .zip without extracting

```robinpath
archive.readFromZip "./backup.zip" "config.json"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/archive";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  archive.extractZip "./backup.zip" "./restored"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
