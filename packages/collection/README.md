# @robinpath/collection

> Array and collection manipulation utilities: filtering, sorting, grouping, aggregation, and set operations

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-30-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `collection` module lets you:

- Extract a single property value from each object in an array
- Filter array to items where a property equals a given value
- Filter array to items where a numeric property is greater than a value
- Filter array to items where a numeric property is less than a value
- Filter array to items where a numeric property is greater than or equal to a value

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/collection
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
collection.where $arr "age" 25
```

## Available Functions

| Function | Description |
|----------|-------------|
| `collection.pluck` | Extract a single property value from each object in an array |
| `collection.where` | Filter array to items where a property equals a given value |
| `collection.whereGt` | Filter array to items where a numeric property is greater than a value |
| `collection.whereLt` | Filter array to items where a numeric property is less than a value |
| `collection.whereGte` | Filter array to items where a numeric property is greater than or equal to a value |
| `collection.whereLte` | Filter array to items where a numeric property is less than or equal to a value |
| `collection.whereNot` | Filter array to items where a property does not equal a given value |
| `collection.sortBy` | Sort an array of objects by a property in ascending order |
| `collection.sortByDesc` | Sort an array of objects by a property in descending order |
| `collection.unique` | Remove duplicate values from an array |
| `collection.flatten` | Flatten nested arrays by one level |
| `collection.reverse` | Reverse the order of elements in an array |
| `collection.chunk` | Split an array into chunks of a given size |
| `collection.first` | Get the first element of an array |
| `collection.last` | Get the last element of an array |
| `collection.count` | Count the number of elements in an array |
| `collection.sum` | Sum numeric values in an array, optionally by a property name |
| `collection.avg` | Calculate the average of numeric values in an array, optionally by a property name |
| `collection.min` | Find the minimum numeric value in an array, optionally by a property name |
| `collection.max` | Find the maximum numeric value in an array, optionally by a property name |
| `collection.groupBy` | Group array items by a property value |
| `collection.compact` | Remove all falsy values (null, undefined, false, 0, empty string) from an array |
| `collection.zip` | Zip two arrays together into an array of pairs |
| `collection.difference` | Get elements that are in the first array but not in the second |
| `collection.intersection` | Get elements that exist in both arrays |
| `collection.union` | Combine two arrays into one with unique elements |
| `collection.take` | Take the first N elements from an array |
| `collection.skip` | Skip the first N elements of an array |
| `collection.contains` | Check if an array contains a specific value |
| `collection.indexOf` | Find the index of a value in an array |

## Examples

### Filter array to items where a property equals a given value

```robinpath
collection.where $arr "age" 25
```

### Filter array to items where a numeric property is greater than a value

```robinpath
collection.whereGt $arr "age" 25
```

### Filter array to items where a numeric property is less than a value

```robinpath
collection.whereLt $arr "age" 25
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/collection";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  collection.where $arr "age" 25
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
