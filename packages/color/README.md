# @robinpath/color

> Terminal ANSI color utilities: red, green, blue, bold, underline, RGB, and more.

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-18-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

Use the `color` module to integrate utility capabilities into your RobinPath scripts.

## Installation

```bash
npm install @robinpath/color
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
set $msg as color.green "success"
print $msg
```

## Available Functions

| Function | Description |
|----------|-------------|
| `color.red` | Wrap text in red |
| `color.green` | Wrap text in green |
| `color.blue` | Wrap text in blue |
| `color.yellow` | Wrap text in yellow |
| `color.cyan` | Wrap text in cyan |
| `color.magenta` | Wrap text in magenta |
| `color.white` | Wrap text in white |
| `color.gray` | Wrap text in gray |
| `color.bold` | Wrap text in bold |
| `color.dim` | Wrap text in dim |
| `color.italic` | Wrap text in italic |
| `color.underline` | Wrap text with underline |
| `color.strikethrough` | Wrap text with strikethrough |
| `color.bgRed` | Wrap text with red background |
| `color.bgGreen` | Wrap text with green background |
| `color.bgBlue` | Wrap text with blue background |
| `color.strip` | Strip all ANSI escape codes from text |
| `color.rgb` | Wrap text with custom RGB foreground color |

## Examples

### Wrap text in green foreground color.

```robinpath
set $msg as color.green "success"
print $msg
```

### Wrap text in blue foreground color.

```robinpath
set $msg as color.blue "info"
print $msg
```

### Wrap text in yellow foreground color.

```robinpath
set $msg as color.yellow "warning"
print $msg
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/color";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  set $msg as color.green "success"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/log`](../log) — Structured logging that can use color for formatted output
- [`@robinpath/string`](../string) — String manipulation utilities for text processing
- [`@robinpath/debug`](../debug) — Debug output utilities complemented by color formatting
- [`@robinpath/template`](../template) — Template rendering that can include colored placeholders

## License

MIT
