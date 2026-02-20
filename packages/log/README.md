# @robinpath/log

> Structured logging with levels, file output, JSON format, timers, and grouping

![Category](https://img.shields.io/badge/category-Other-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `log` module lets you:

- Log a message at DEBUG level to stdout
- Log a message at INFO level to stdout
- Log a message at WARN level to stderr
- Log a message at ERROR level to stderr
- Log a message at FATAL level to stderr

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/log
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
log.info "Server started on port" $port
```

## Available Functions

| Function | Description |
|----------|-------------|
| `log.debug` | Log a message at DEBUG level to stdout |
| `log.info` | Log a message at INFO level to stdout |
| `log.warn` | Log a message at WARN level to stderr |
| `log.error` | Log a message at ERROR level to stderr |
| `log.fatal` | Log a message at FATAL level to stderr |
| `log.setLevel` | Set the minimum log level; messages below this level are suppressed |
| `log.getLevel` | Get the current minimum log level as a string |
| `log.setFile` | Set a file path to append log output to in addition to stdout/stderr |
| `log.setFormat` | Set the output format for log messages |
| `log.clear` | Reset all log settings to defaults (info level, no file, text format) |
| `log.table` | Pretty-print an array of objects as a table to stdout |
| `log.group` | Print a group header and increase indentation for subsequent log messages |
| `log.groupEnd` | End the current group and decrease indentation |
| `log.time` | Start a named timer |
| `log.timeEnd` | Stop a named timer and log the elapsed time in milliseconds |

## Examples

### Log a message at INFO level to stdout

```robinpath
log.info "Server started on port" $port
```

### Log a message at WARN level to stderr

```robinpath
log.warn "Deprecated function called"
```

### Log a message at ERROR level to stderr

```robinpath
log.error "Failed to connect:" $err
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/log";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  log.info "Server started on port" $port
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
