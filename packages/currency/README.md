# @robinpath/currency

> Currency module for RobinPath.

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `currency` module lets you:

- getLatestRates
- convert
- convertBatch
- getHistoricalRates
- listCurrencies

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/currency
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
currency.convert
```

## Available Functions

| Function | Description |
|----------|-------------|
| `currency.getLatestRates` | getLatestRates |
| `currency.convert` | convert |
| `currency.convertBatch` | convertBatch |
| `currency.getHistoricalRates` | getHistoricalRates |
| `currency.listCurrencies` | listCurrencies |
| `currency.getRate` | getRate |
| `currency.getSupportedCodes` | getSupportedCodes |
| `currency.getTimeSeriesRates` | getTimeSeriesRates |
| `currency.formatCurrency` | formatCurrency |
| `currency.getPopularRates` | getPopularRates |

## Examples

### convert

```robinpath
currency.convert
```

### convertBatch

```robinpath
currency.convertBatch
```

### getHistoricalRates

```robinpath
currency.getHistoricalRates
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/currency";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  currency.convert
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
