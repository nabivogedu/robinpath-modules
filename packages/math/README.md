# @robinpath/math

> Math utilities: clamp, round, random, statistics, factorial, GCD, LCM, prime check, and linear interpolation

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `math` module lets you:

- Clamp a number between a minimum and maximum value
- Round a number to N decimal places
- Generate a random integer between min and max (inclusive)
- Generate a random float between min and max
- Calculate the sum of an array of numbers

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/math
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
math.round 3.14159 2
```

## Available Functions

| Function | Description |
|----------|-------------|
| `math.clamp` | Clamp a number between a minimum and maximum value |
| `math.round` | Round a number to N decimal places |
| `math.randomInt` | Generate a random integer between min and max (inclusive) |
| `math.randomFloat` | Generate a random float between min and max |
| `math.sum` | Calculate the sum of an array of numbers |
| `math.avg` | Calculate the average of an array of numbers |
| `math.median` | Calculate the median of an array of numbers |
| `math.min` | Find the minimum value in an array |
| `math.max` | Find the maximum value in an array |
| `math.percentage` | Calculate what percentage a value is of a total |
| `math.factorial` | Calculate the factorial of a number |
| `math.gcd` | Calculate the greatest common divisor of two numbers |
| `math.lcm` | Calculate the least common multiple of two numbers |
| `math.isPrime` | Check if a number is prime |
| `math.lerp` | Linear interpolation between two values |

## Examples

### Round a number to N decimal places

```robinpath
math.round 3.14159 2
```

### Generate a random integer between min and max (inclusive)

```robinpath
math.randomInt 1 100
```

### Generate a random float between min and max

```robinpath
math.randomFloat 0 1
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/math";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  math.round 3.14159 2
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
