---
title: "Table"
module: "table"
package: "@robinpath/table"
description: "Tabular data operations: filter, sort, join, group, aggregate, pivot — like a lightweight DataFrame"
category: "analytics"
tags: [table, analytics]
type: "integration"
auth: "none"
functionCount: 24
---

# Table

> Tabular data operations: filter, sort, join, group, aggregate, pivot — like a lightweight DataFrame

**Package:** `@robinpath/table` | **Category:** Analytics | **Type:** Integration


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `table` module when you need to:

- **Create a table from array of objects or columns+rows** -- Use `table.create` to perform this operation
- **Select specific columns** -- Use `table.select` to perform this operation
- **Filter rows by condition** -- Use `table.where` to perform this operation
- **Sort rows by a field** -- Use `table.orderBy` to perform this operation
- **Group rows by a field** -- Use `table.groupBy` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create a table from array of objects or columns+rows | `Array of row objects` |
| [`select`](#select) | Select specific columns | `Table with selected columns` |
| [`where`](#where) | Filter rows by condition | `Filtered rows` |
| [`orderBy`](#orderby) | Sort rows by a field | `Sorted table` |
| [`groupBy`](#groupby) | Group rows by a field | `Grouped rows keyed by field value` |
| [`aggregate`](#aggregate) | Aggregate grouped data | `Aggregated results` |
| [`join`](#join) | Join two tables | `Joined table` |
| [`distinct`](#distinct) | Remove duplicate rows | `Deduplicated table` |
| [`limit`](#limit) | Take first N rows | `First N rows` |
| [`offset`](#offset) | Skip first N rows | `Remaining rows` |
| [`addColumn`](#addcolumn) | Add a column with a default value | `Table with new column` |
| [`removeColumn`](#removecolumn) | Remove column(s) | `Table without specified columns` |
| [`renameColumn`](#renamecolumn) | Rename a column | `Table with renamed column` |
| [`pivot`](#pivot) | Pivot table | `Pivoted table` |
| [`unpivot`](#unpivot) | Unpivot/melt table | `Unpivoted table with key/value columns` |
| [`count`](#count) | Count rows | `Row count` |
| [`sum`](#sum) | Sum a numeric column | `Sum` |
| [`avg`](#avg) | Average a numeric column | `Average` |
| [`min`](#min) | Minimum of a column | `Minimum value` |
| [`max`](#max) | Maximum of a column | `Maximum value` |
| [`head`](#head) | First N rows | `First N rows` |
| [`tail`](#tail) | Last N rows | `Last N rows` |
| [`columns`](#columns) | Get column names | `Column name strings` |
| [`shape`](#shape) | Get row and column counts | `{rows, columns}` |


## Functions

### create

Create a table from array of objects or columns+rows

**Module:** `table` | **Returns:** `array` -- Array of row objects

```robinpath
table.create [{"name": "Alice", "age": 30}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | Yes | Array of objects or {columns, rows} |

---

### select

Select specific columns

**Module:** `table` | **Returns:** `array` -- Table with selected columns

```robinpath
table.select $data ["name", "age"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `columns` | `array` | Yes | Column names to keep |

---

### where

Filter rows by condition

**Module:** `table` | **Returns:** `array` -- Filtered rows

```robinpath
table.where $data "age" "gt" 25
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `field` | `string` | Yes | Column name |
| `operator` | `string` | Yes | eq|neq|gt|lt|gte|lte|contains|startsWith|endsWith|in|notIn|isNull|notNull |
| `value` | `any` | No | Comparison value |

---

### orderBy

Sort rows by a field

**Module:** `table` | **Returns:** `array` -- Sorted table

```robinpath
table.orderBy $data "age" "desc"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `field` | `string` | Yes | Column to sort by |
| `direction` | `string` | No | asc or desc |

---

### groupBy

Group rows by a field

**Module:** `table` | **Returns:** `object` -- Grouped rows keyed by field value

```robinpath
table.groupBy $data "department"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `field` | `string` | Yes | Column to group by |

---

### aggregate

Aggregate grouped data

**Module:** `table` | **Returns:** `array` -- Aggregated results

```robinpath
table.aggregate $data "dept" [{"field": "salary", "op": "avg"}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `groupField` | `string` | Yes | Column to group by |
| `aggregations` | `array` | Yes | Array of {field, op: sum|avg|min|max|count|first|last} |

---

### join

Join two tables

**Module:** `table` | **Returns:** `array` -- Joined table

```robinpath
table.join $users $orders "id" "userId" "left"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `left` | `array` | Yes | Left table |
| `right` | `array` | Yes | Right table |
| `leftKey` | `string` | Yes | Left join key |
| `rightKey` | `string` | Yes | Right join key |
| `type` | `string` | No | inner|left|right|full |

---

### distinct

Remove duplicate rows

**Module:** `table` | **Returns:** `array` -- Deduplicated table

```robinpath
table.distinct $data ["name"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `columns` | `array` | No | Columns for uniqueness check |

---

### limit

Take first N rows

**Module:** `table` | **Returns:** `array` -- First N rows

```robinpath
table.limit $data 10
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `n` | `number` | Yes | Number of rows |

---

### offset

Skip first N rows

**Module:** `table` | **Returns:** `array` -- Remaining rows

```robinpath
table.offset $data 5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `n` | `number` | Yes | Rows to skip |

---

### addColumn

Add a column with a default value

**Module:** `table` | **Returns:** `array` -- Table with new column

```robinpath
table.addColumn $data "status" "active"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `columnName` | `string` | Yes | New column name |
| `value` | `any` | Yes | Default value |

---

### removeColumn

Remove column(s)

**Module:** `table` | **Returns:** `array` -- Table without specified columns

```robinpath
table.removeColumn $data "temp"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `columns` | `any` | Yes | Column name or array of names |

---

### renameColumn

Rename a column

**Module:** `table` | **Returns:** `array` -- Table with renamed column

```robinpath
table.renameColumn $data "fname" "firstName"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `oldName` | `string` | Yes | Current name |
| `newName` | `string` | Yes | New name |

---

### pivot

Pivot table

**Module:** `table` | **Returns:** `array` -- Pivoted table

```robinpath
table.pivot $data "product" "month" "sales" "sum"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `rowField` | `string` | Yes | Row grouping field |
| `columnField` | `string` | Yes | Column pivot field |
| `valueField` | `string` | Yes | Value field |
| `aggOp` | `string` | No | sum|count|avg|first |

---

### unpivot

Unpivot/melt table

**Module:** `table` | **Returns:** `array` -- Unpivoted table with key/value columns

```robinpath
table.unpivot $data ["name"] ["jan", "feb", "mar"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `idColumns` | `array` | Yes | Columns to keep |
| `valueColumns` | `array` | Yes | Columns to melt |

---

### count

Count rows

**Module:** `table` | **Returns:** `number` -- Row count

```robinpath
table.count $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |

---

### sum

Sum a numeric column

**Module:** `table` | **Returns:** `number` -- Sum

```robinpath
table.sum $data "amount"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `field` | `string` | Yes | Column name |

---

### avg

Average a numeric column

**Module:** `table` | **Returns:** `number` -- Average

```robinpath
table.avg $data "score"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `field` | `string` | Yes | Column name |

---

### min

Minimum of a column

**Module:** `table` | **Returns:** `number` -- Minimum value

```robinpath
table.min $data "price"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `field` | `string` | Yes | Column name |

---

### max

Maximum of a column

**Module:** `table` | **Returns:** `number` -- Maximum value

```robinpath
table.max $data "price"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `field` | `string` | Yes | Column name |

---

### head

First N rows

**Module:** `table` | **Returns:** `array` -- First N rows

```robinpath
table.head $data 5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `n` | `number` | No | Number of rows (default 5) |

---

### tail

Last N rows

**Module:** `table` | **Returns:** `array` -- Last N rows

```robinpath
table.tail $data 5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |
| `n` | `number` | No | Number of rows (default 5) |

---

### columns

Get column names

**Module:** `table` | **Returns:** `array` -- Column name strings

```robinpath
table.columns $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |

---

### shape

Get row and column counts

**Module:** `table` | **Returns:** `object` -- {rows, columns}

```robinpath
table.shape $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `array` | Yes | Table data |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as table.create [{"name": "Alice", "age": 30}]
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as table.create [{"name": "Alice", "age": 30}]
print "Created: " + $result
```

### 2. Multi-step Table workflow

Chain multiple table operations together.

```robinpath
set $r_create as table.create [{"name": "Alice", "age": 30}]
set $r_select as table.select $data ["name", "age"]
set $r_where as table.where $data "age" "gt" 25
print "All operations complete"
```

### 3. Safe create with validation

Check results before proceeding.

```robinpath
set $result as table.create [{"name": "Alice", "age": 30}]
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
