# @robinpath/shell

> Execute shell commands, inspect the process environment, and query system information

![Category](https://img.shields.io/badge/category-Other-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `shell` module lets you:

- Execute a command string in the system shell and return stdout, stderr, and exitCode
- Execute a command string in the system shell and return trimmed stdout. Throws on non-zero exit
- Execute a file directly without a shell and return stdout, stderr, and exitCode
- Find the full path of a command using which (or where on Windows)
- Get a copy of all current environment variables

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/shell
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
shell.run "echo hello"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `shell.exec` | Execute a command string in the system shell and return stdout, stderr, and exitCode |
| `shell.run` | Execute a command string in the system shell and return trimmed stdout. Throws on non-zero exit |
| `shell.execFile` | Execute a file directly without a shell and return stdout, stderr, and exitCode |
| `shell.which` | Find the full path of a command using which (or where on Windows) |
| `shell.env` | Get a copy of all current environment variables |
| `shell.cwd` | Get the current working directory |
| `shell.exit` | Exit the current process with a given exit code |
| `shell.pid` | Get the process ID of the current process |
| `shell.platform` | Get the operating system platform identifier |
| `shell.uptime` | Get the number of seconds the current process has been running |

## Examples

### Execute a command string in the system shell and return trimmed stdout. Throws on non-zero exit

```robinpath
shell.run "echo hello"
```

### Execute a file directly without a shell and return stdout, stderr, and exitCode

```robinpath
shell.execFile "/usr/bin/node" ["--version"]
```

### Find the full path of a command using which (or where on Windows)

```robinpath
shell.which "node"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/shell";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  shell.run "echo hello"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
