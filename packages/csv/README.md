# @robinpath/csv

> Parse and stringify CSV data

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-5-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `csv` module lets you:

- Parse a CSV string into an array of objects (first row = headers)
- Convert an array of objects into a CSV string
- Extract header names from a CSV string
- Extract all values from a specific column
- Parse a CSV string into an array of arrays (raw, no header mapping)

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/csv
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
csv.stringify $data
```

## Available Functions

| Function | Description |
|----------|-------------|
| `csv.parse` | Parse a CSV string into an array of objects (first row = headers) |
| `csv.stringify` | Convert an array of objects into a CSV string |
| `csv.headers` | Extract header names from a CSV string |
| `csv.column` | Extract all values from a specific column |
| `csv.rows` | Parse a CSV string into an array of arrays (raw, no header mapping) |

## Examples

### Convert an array of objects into a CSV string

```robinpath
csv.stringify $data
```

### Extract header names from a CSV string

```robinpath
csv.headers "name,age\nAlice,30"
```

### Extract all values from a specific column

```robinpath
csv.column "name,age\nAlice,30" "name"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/csv";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  csv.stringify $data
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
