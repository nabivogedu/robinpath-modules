# @robinpath/table

> Tabular data operations: filter, sort, join, group, aggregate, pivot — like a lightweight DataFrame

![Category](https://img.shields.io/badge/category-Analytics-blue) ![Functions](https://img.shields.io/badge/functions-24-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `table` module lets you:

- Create a table from array of objects or columns+rows
- Select specific columns
- Filter rows by condition
- Sort rows by a field
- Group rows by a field

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/table
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
table.select $data ["name", "age"]
```

## Available Functions

| Function | Description |
|----------|-------------|
| `table.create` | Create a table from array of objects or columns+rows |
| `table.select` | Select specific columns |
| `table.where` | Filter rows by condition |
| `table.orderBy` | Sort rows by a field |
| `table.groupBy` | Group rows by a field |
| `table.aggregate` | Aggregate grouped data |
| `table.join` | Join two tables |
| `table.distinct` | Remove duplicate rows |
| `table.limit` | Take first N rows |
| `table.offset` | Skip first N rows |
| `table.addColumn` | Add a column with a default value |
| `table.removeColumn` | Remove column(s) |
| `table.renameColumn` | Rename a column |
| `table.pivot` | Pivot table |
| `table.unpivot` | Unpivot/melt table |
| `table.count` | Count rows |
| `table.sum` | Sum a numeric column |
| `table.avg` | Average a numeric column |
| `table.min` | Minimum of a column |
| `table.max` | Maximum of a column |
| `table.head` | First N rows |
| `table.tail` | Last N rows |
| `table.columns` | Get column names |
| `table.shape` | Get row and column counts |

## Examples

### Select specific columns

```robinpath
table.select $data ["name", "age"]
```

### Filter rows by condition

```robinpath
table.where $data "age" "gt" 25
```

### Sort rows by a field

```robinpath
table.orderBy $data "age" "desc"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/table";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  table.select $data ["name", "age"]
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
