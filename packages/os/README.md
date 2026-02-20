# @robinpath/os

> System information: hostname, platform, architecture, CPU, memory, network, and more

![Category](https://img.shields.io/badge/category-Other-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `os` module lets you:

- Get the system hostname
- Get the OS platform (linux, darwin, win32)
- Get the CPU architecture
- Get CPU information
- Get the number of CPU cores

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/os
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
os.platform
```

## Available Functions

| Function | Description |
|----------|-------------|
| `os.hostname` | Get the system hostname |
| `os.platform` | Get the OS platform (linux, darwin, win32) |
| `os.arch` | Get the CPU architecture |
| `os.cpus` | Get CPU information |
| `os.cpuCount` | Get the number of CPU cores |
| `os.totalMemory` | Get total system memory in bytes |
| `os.freeMemory` | Get free system memory in bytes |
| `os.uptime` | Get system uptime in seconds |
| `os.homeDir` | Get the user home directory |
| `os.tempDir` | Get the OS temp directory |
| `os.userInfo` | Get current user information |
| `os.networkInterfaces` | Get network interface information |
| `os.type` | Get the OS type (Linux, Darwin, Windows_NT) |
| `os.release` | Get the OS release version |
| `os.eol` | Get the OS end-of-line marker |

## Examples

### Get the OS platform (linux, darwin, win32)

```robinpath
os.platform
```

### Get the CPU architecture

```robinpath
os.arch
```

### Get CPU information

```robinpath
os.cpus
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/os";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  os.platform
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
