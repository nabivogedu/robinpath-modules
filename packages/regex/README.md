# @robinpath/regex

> Regular expression operations for pattern matching, searching, and replacing

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-7-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `regex` module lets you:

- Test if a string matches a regular expression pattern
- Find the first match of a pattern in a string
- Find all matches of a pattern in a string
- Replace matches of a pattern in a string
- Split a string by a regular expression pattern

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/regex
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
regex.match "abc 123 def 456" "\d+"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `regex.test` | Test if a string matches a regular expression pattern |
| `regex.match` | Find the first match of a pattern in a string |
| `regex.matchAll` | Find all matches of a pattern in a string |
| `regex.replace` | Replace matches of a pattern in a string |
| `regex.split` | Split a string by a regular expression pattern |
| `regex.capture` | Extract capture groups from the first match of a pattern |
| `regex.escape` | Escape special regular expression characters in a string |

## Examples

### Find the first match of a pattern in a string

```robinpath
regex.match "abc 123 def 456" "\d+"
```

### Find all matches of a pattern in a string

```robinpath
regex.matchAll "abc 123 def 456" "\d+"
```

### Replace matches of a pattern in a string

```robinpath
regex.replace "abc 123 def 456" "\d+" "X"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/regex";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  regex.match "abc 123 def 456" "\d+"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
