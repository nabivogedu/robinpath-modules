# @robinpath/string

> String manipulation utilities: case conversion, slugify, truncate, pad, reverse, and more

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `string` module lets you:

- Capitalize the first letter of a string
- Convert a string to camelCase
- Convert a string to snake_case
- Convert a string to kebab-case
- Convert a string to PascalCase

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/string
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
string.camelCase "hello world"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `string.capitalize` | Capitalize the first letter of a string |
| `string.camelCase` | Convert a string to camelCase |
| `string.snakeCase` | Convert a string to snake_case |
| `string.kebabCase` | Convert a string to kebab-case |
| `string.pascalCase` | Convert a string to PascalCase |
| `string.titleCase` | Capitalize the first letter of each word |
| `string.slugify` | Convert a string to a URL-friendly slug |
| `string.truncate` | Truncate a string to a maximum length with a suffix |
| `string.padStart` | Pad the start of a string to a target length |
| `string.padEnd` | Pad the end of a string to a target length |
| `string.reverse` | Reverse a string |
| `string.wordCount` | Count the number of words in a string |
| `string.contains` | Check if a string contains a substring |
| `string.repeat` | Repeat a string N times |
| `string.replaceAll` | Replace all occurrences of a search string with a replacement |

## Examples

### Convert a string to camelCase

```robinpath
string.camelCase "hello world"
```

### Convert a string to snake_case

```robinpath
string.snakeCase "helloWorld"
```

### Convert a string to kebab-case

```robinpath
string.kebabCase "helloWorld"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/string";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  string.camelCase "hello world"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
