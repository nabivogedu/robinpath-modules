# @robinpath/glob

> File pattern matching: find files by glob patterns, test matches, expand braces

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-6-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `glob` module lets you:

- Find files matching a glob pattern
- Test if a path matches a glob pattern
- Convert a glob pattern to a regex string
- Expand brace pattern into array
- Extract non-glob base directory from pattern

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/glob
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
glob.isMatch "src/index.ts" "**/*.ts"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `glob.match` | Find files matching a glob pattern |
| `glob.isMatch` | Test if a path matches a glob pattern |
| `glob.toRegex` | Convert a glob pattern to a regex string |
| `glob.expand` | Expand brace pattern into array |
| `glob.base` | Extract non-glob base directory from pattern |
| `glob.hasMagic` | Check if string contains glob characters |

## Examples

### Test if a path matches a glob pattern

```robinpath
glob.isMatch "src/index.ts" "**/*.ts"
```

### Convert a glob pattern to a regex string

```robinpath
glob.toRegex "*.ts"
```

### Expand brace pattern into array

```robinpath
glob.expand "file.{ts,js}"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/glob";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  glob.isMatch "src/index.ts" "**/*.ts"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
