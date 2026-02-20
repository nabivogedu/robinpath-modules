# @robinpath/money

> Currency formatting, safe arithmetic, conversion, tax, discount, and exchange rates

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-16-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `money` module lets you:

- Format number as currency
- Parse currency string to number
- Safe addition
- Safe subtraction
- Safe multiplication

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/money
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
money.parse "$1,234.56"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `money.format` | Format number as currency |
| `money.parse` | Parse currency string to number |
| `money.add` | Safe addition |
| `money.subtract` | Safe subtraction |
| `money.multiply` | Safe multiplication |
| `money.divide` | Safe division |
| `money.round` | Round to currency precision |
| `money.convert` | Convert between currencies |
| `money.fetchRate` | Fetch live exchange rate |
| `money.split` | Split amount evenly |
| `money.percentage` | Calculate percentage |
| `money.discount` | Apply discount |
| `money.tax` | Add tax |
| `money.currencyInfo` | Get currency info |
| `money.listCurrencies` | List all currency codes |
| `money.isValidCode` | Check if currency code is valid |

## Examples

### Parse currency string to number

```robinpath
money.parse "$1,234.56"
```

### Safe addition

```robinpath
money.add 0.1 0.2
```

### Safe subtraction

```robinpath
money.subtract 10.50 3.25
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/money";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  money.parse "$1,234.56"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
