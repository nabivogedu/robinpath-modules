# @robinpath/assert

> Testing assertions: equal, deepEqual, truthy, falsy, type checks, includes, matches, throws, and more

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `assert` module lets you:

- Assert two values are strictly equal (===)
- Assert two values are not equal
- Assert deep equality of two values
- Assert value is truthy
- Assert value is falsy

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/assert
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
assert.notEqual $a $b
```

## Available Functions

| Function | Description |
|----------|-------------|
| `assert.equal` | Assert two values are strictly equal (===) |
| `assert.notEqual` | Assert two values are not equal |
| `assert.deepEqual` | Assert deep equality of two values |
| `assert.truthy` | Assert value is truthy |
| `assert.falsy` | Assert value is falsy |
| `assert.isNull` | Assert value is null or undefined |
| `assert.isNotNull` | Assert value is not null/undefined |
| `assert.isType` | Assert typeof value matches expected type |
| `assert.includes` | Assert array/string includes a value |
| `assert.matches` | Assert string matches a regex pattern |
| `assert.throws` | Assert that a function throws |
| `assert.lengthOf` | Assert array/string has specific length |
| `assert.hasProperty` | Assert object has a specific property |
| `assert.isAbove` | Assert number is above threshold |
| `assert.isBelow` | Assert number is below threshold |

## Examples

### Assert two values are not equal

```robinpath
assert.notEqual $a $b
```

### Assert deep equality of two values

```robinpath
assert.deepEqual $obj1 $obj2
```

### Assert value is truthy

```robinpath
assert.truthy $val
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/assert";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  assert.notEqual $a $b
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
