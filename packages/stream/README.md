# @robinpath/stream

> Stream processing for large files: read, write, transform, filter, split, concat, hash without loading into memory

![Category](https://img.shields.io/badge/category-Infrastructure-blue) ![Functions](https://img.shields.io/badge/functions-13-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `stream` module lets you:

- Read entire file content
- Write data to file
- Stream-copy a file
- Read file line by line into array
- Transform file line by line

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/stream
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
stream.writeFile "./out.txt" "hello"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `stream.readFile` | Read entire file content |
| `stream.writeFile` | Write data to file |
| `stream.copyFile` | Stream-copy a file |
| `stream.lines` | Read file line by line into array |
| `stream.transform` | Transform file line by line |
| `stream.filter` | Filter file lines by regex pattern |
| `stream.concat` | Concatenate multiple files |
| `stream.split` | Split file into chunks |
| `stream.count` | Count lines in file |
| `stream.head` | Read first N lines |
| `stream.tail` | Read last N lines |
| `stream.pipe` | Download URL to file via stream |
| `stream.hash` | Stream-hash a file |

## Examples

### Write data to file

```robinpath
stream.writeFile "./out.txt" "hello"
```

### Stream-copy a file

```robinpath
stream.copyFile "./a.txt" "./b.txt"
```

### Read file line by line into array

```robinpath
stream.lines "./data.csv"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/stream";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  stream.writeFile "./out.txt" "hello"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
