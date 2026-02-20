# @robinpath/process

> Child process management: run commands, spawn long-running processes, get system info

![Category](https://img.shields.io/badge/category-Infrastructure-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `process` module lets you:

- Run command and wait for result
- Execute command in shell
- Spawn long-running process
- Kill a spawned process
- Check if process is running

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/process
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
process.exec "echo hello"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `process.run` | Run command and wait for result |
| `process.exec` | Execute command in shell |
| `process.spawn` | Spawn long-running process |
| `process.kill` | Kill a spawned process |
| `process.isAlive` | Check if process is running |
| `process.list` | List all managed processes |
| `process.signal` | Send signal to process |
| `process.pid` | Get current process PID |
| `process.uptime` | Get process uptime in seconds |
| `process.memoryUsage` | Get memory usage in MB |
| `process.cpuUsage` | Get CPU usage in ms |
| `process.cwd` | Get working directory |
| `process.argv` | Get process arguments |
| `process.env` | Get environment variables |
| `process.exit` | Request process exit (safe, does not actually exit) |

## Examples

### Execute command in shell

```robinpath
process.exec "echo hello"
```

### Spawn long-running process

```robinpath
process.spawn "server" "node" ["app.js"]
```

### Kill a spawned process

```robinpath
process.kill "server"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/process";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  process.exec "echo hello"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
