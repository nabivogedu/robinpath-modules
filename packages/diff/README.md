# @robinpath/diff

> Text and data diffing: line, word, character, object, and array diffs with unified output

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-9-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `diff` module lets you:

- Diff two strings line by line
- Diff two strings character by character
- Diff two strings word by word
- Diff two objects
- Diff two arrays

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/diff
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
diff.chars "cat" "car"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `diff.lines` | Diff two strings line by line |
| `diff.chars` | Diff two strings character by character |
| `diff.words` | Diff two strings word by word |
| `diff.objects` | Diff two objects |
| `diff.arrays` | Diff two arrays |
| `diff.patch` | Apply a line diff to produce the new string |
| `diff.unified` | Generate unified diff format (like git diff) |
| `diff.isEqual` | Deep equality check |
| `diff.stats` | Get diff statistics from a diff result |

## Examples

### Diff two strings character by character

```robinpath
diff.chars "cat" "car"
```

### Diff two strings word by word

```robinpath
diff.words $old $new
```

### Diff two objects

```robinpath
diff.objects $obj1 $obj2
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/diff";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  diff.chars "cat" "car"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
