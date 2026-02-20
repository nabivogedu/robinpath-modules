---
title: "Collection"
module: "collection"
package: "@robinpath/collection"
description: "Array and collection manipulation utilities: filtering, sorting, grouping, aggregation, and set operations"
category: "utility"
tags: [collection, utility]
type: "utility"
auth: "none"
functionCount: 30
---

# Collection

> Array and collection manipulation utilities: filtering, sorting, grouping, aggregation, and set operations

**Package:** `@robinpath/collection` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `collection` module when you need to:

- **Extract a single property value from each object in an array** -- Use `collection.pluck` to perform this operation
- **Filter array to items where a property equals a given value** -- Use `collection.where` to perform this operation
- **Filter array to items where a numeric property is greater than a value** -- Use `collection.whereGt` to perform this operation
- **Filter array to items where a numeric property is less than a value** -- Use `collection.whereLt` to perform this operation
- **Filter array to items where a numeric property is greater than or equal to a value** -- Use `collection.whereGte` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`pluck`](#pluck) | Extract a single property value from each object in an array | `Array of extracted property values` |
| [`where`](#where) | Filter array to items where a property equals a given value | `Filtered array of matching objects` |
| [`whereGt`](#wheregt) | Filter array to items where a numeric property is greater than a value | `Filtered array where property > value` |
| [`whereLt`](#wherelt) | Filter array to items where a numeric property is less than a value | `Filtered array where property < value` |
| [`whereGte`](#wheregte) | Filter array to items where a numeric property is greater than or equal to a value | `Filtered array where property >= value` |
| [`whereLte`](#wherelte) | Filter array to items where a numeric property is less than or equal to a value | `Filtered array where property <= value` |
| [`whereNot`](#wherenot) | Filter array to items where a property does not equal a given value | `Filtered array of non-matching objects` |
| [`sortBy`](#sortby) | Sort an array of objects by a property in ascending order | `New array sorted in ascending order by the property` |
| [`sortByDesc`](#sortbydesc) | Sort an array of objects by a property in descending order | `New array sorted in descending order by the property` |
| [`unique`](#unique) | Remove duplicate values from an array | `New array with duplicates removed` |
| [`flatten`](#flatten) | Flatten nested arrays by one level | `New flattened array (one level deep)` |
| [`reverse`](#reverse) | Reverse the order of elements in an array | `New array with elements in reverse order` |
| [`chunk`](#chunk) | Split an array into chunks of a given size | `Array of arrays, each containing up to size elements` |
| [`first`](#first) | Get the first element of an array | `First element of the array, or null if empty` |
| [`last`](#last) | Get the last element of an array | `Last element of the array, or null if empty` |
| [`count`](#count) | Count the number of elements in an array | `Number of elements in the array` |
| [`sum`](#sum) | Sum numeric values in an array, optionally by a property name | `Sum of the numeric values` |
| [`avg`](#avg) | Calculate the average of numeric values in an array, optionally by a property name | `Average of the numeric values` |
| [`min`](#min) | Find the minimum numeric value in an array, optionally by a property name | `Minimum numeric value` |
| [`max`](#max) | Find the maximum numeric value in an array, optionally by a property name | `Maximum numeric value` |
| [`groupBy`](#groupby) | Group array items by a property value | `Object with group values as keys and arrays of items as values` |
| [`compact`](#compact) | Remove all falsy values (null, undefined, false, 0, empty string) from an array | `New array with falsy values removed` |
| [`zip`](#zip) | Zip two arrays together into an array of pairs | `Array of [a, b] pairs from the two arrays` |
| [`difference`](#difference) | Get elements that are in the first array but not in the second | `Elements present in array1 but not in array2` |
| [`intersection`](#intersection) | Get elements that exist in both arrays | `Elements present in both arrays` |
| [`union`](#union) | Combine two arrays into one with unique elements | `Combined array with duplicates removed` |
| [`take`](#take) | Take the first N elements from an array | `New array with the first N elements` |
| [`skip`](#skip) | Skip the first N elements of an array | `New array with the first N elements removed` |
| [`contains`](#contains) | Check if an array contains a specific value | `True if the value exists in the array` |
| [`indexOf`](#indexof) | Find the index of a value in an array | `Index of the value, or -1 if not found` |


## Functions

### pluck

Extract a single property value from each object in an array

**Module:** `collection` | **Returns:** `array` -- Array of extracted property values

```robinpath
collection.pluck $arr "name"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of objects to pluck from |
| `key` | `string` | Yes | Property name to extract |

---

### where

Filter array to items where a property equals a given value

**Module:** `collection` | **Returns:** `array` -- Filtered array of matching objects

```robinpath
collection.where $arr "age" 25
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of objects to filter |
| `key` | `string` | Yes | Property name to compare |
| `value` | `any` | Yes | Value to match against |

---

### whereGt

Filter array to items where a numeric property is greater than a value

**Module:** `collection` | **Returns:** `array` -- Filtered array where property > value

```robinpath
collection.whereGt $arr "age" 25
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of objects to filter |
| `key` | `string` | Yes | Property name to compare |
| `value` | `number` | Yes | Threshold value (exclusive) |

---

### whereLt

Filter array to items where a numeric property is less than a value

**Module:** `collection` | **Returns:** `array` -- Filtered array where property < value

```robinpath
collection.whereLt $arr "age" 25
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of objects to filter |
| `key` | `string` | Yes | Property name to compare |
| `value` | `number` | Yes | Threshold value (exclusive) |

---

### whereGte

Filter array to items where a numeric property is greater than or equal to a value

**Module:** `collection` | **Returns:** `array` -- Filtered array where property >= value

```robinpath
collection.whereGte $arr "age" 25
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of objects to filter |
| `key` | `string` | Yes | Property name to compare |
| `value` | `number` | Yes | Threshold value (inclusive) |

---

### whereLte

Filter array to items where a numeric property is less than or equal to a value

**Module:** `collection` | **Returns:** `array` -- Filtered array where property <= value

```robinpath
collection.whereLte $arr "age" 25
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of objects to filter |
| `key` | `string` | Yes | Property name to compare |
| `value` | `number` | Yes | Threshold value (inclusive) |

---

### whereNot

Filter array to items where a property does not equal a given value

**Module:** `collection` | **Returns:** `array` -- Filtered array of non-matching objects

```robinpath
collection.whereNot $arr "role" "admin"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of objects to filter |
| `key` | `string` | Yes | Property name to compare |
| `value` | `any` | Yes | Value to exclude |

---

### sortBy

Sort an array of objects by a property in ascending order

**Module:** `collection` | **Returns:** `array` -- New array sorted in ascending order by the property

```robinpath
collection.sortBy $arr "name"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of objects to sort |
| `key` | `string` | Yes | Property name to sort by |

---

### sortByDesc

Sort an array of objects by a property in descending order

**Module:** `collection` | **Returns:** `array` -- New array sorted in descending order by the property

```robinpath
collection.sortByDesc $arr "age"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of objects to sort |
| `key` | `string` | Yes | Property name to sort by |

---

### unique

Remove duplicate values from an array

**Module:** `collection` | **Returns:** `array` -- New array with duplicates removed

```robinpath
collection.unique $arr
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array to deduplicate |

---

### flatten

Flatten nested arrays by one level

**Module:** `collection` | **Returns:** `array` -- New flattened array (one level deep)

```robinpath
collection.flatten $arr
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array with nested arrays to flatten |

---

### reverse

Reverse the order of elements in an array

**Module:** `collection` | **Returns:** `array` -- New array with elements in reverse order

```robinpath
collection.reverse $arr
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array to reverse |

---

### chunk

Split an array into chunks of a given size

**Module:** `collection` | **Returns:** `array` -- Array of arrays, each containing up to size elements

```robinpath
collection.chunk $arr 3
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array to split into chunks |
| `size` | `number` | Yes | Number of elements per chunk |

---

### first

Get the first element of an array

**Module:** `collection` | **Returns:** `any` -- First element of the array, or null if empty

```robinpath
collection.first $arr
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array to get first element from |

---

### last

Get the last element of an array

**Module:** `collection` | **Returns:** `any` -- Last element of the array, or null if empty

```robinpath
collection.last $arr
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array to get last element from |

---

### count

Count the number of elements in an array

**Module:** `collection` | **Returns:** `number` -- Number of elements in the array

```robinpath
collection.count $arr
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array to count |

---

### sum

Sum numeric values in an array, optionally by a property name

**Module:** `collection` | **Returns:** `number` -- Sum of the numeric values

```robinpath
collection.sum $arr "price"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of numbers or objects |
| `key` | `string` | No | Property name to sum (omit to sum array values directly) |

---

### avg

Calculate the average of numeric values in an array, optionally by a property name

**Module:** `collection` | **Returns:** `number` -- Average of the numeric values

```robinpath
collection.avg $arr "price"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of numbers or objects |
| `key` | `string` | No | Property name to average (omit to average array values directly) |

---

### min

Find the minimum numeric value in an array, optionally by a property name

**Module:** `collection` | **Returns:** `number` -- Minimum numeric value

```robinpath
collection.min $arr "price"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of numbers or objects |
| `key` | `string` | No | Property name to find minimum of (omit for array values directly) |

---

### max

Find the maximum numeric value in an array, optionally by a property name

**Module:** `collection` | **Returns:** `number` -- Maximum numeric value

```robinpath
collection.max $arr "price"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of numbers or objects |
| `key` | `string` | No | Property name to find maximum of (omit for array values directly) |

---

### groupBy

Group array items by a property value

**Module:** `collection` | **Returns:** `object` -- Object with group values as keys and arrays of items as values

```robinpath
collection.groupBy $arr "category"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of objects to group |
| `key` | `string` | Yes | Property name to group by |

---

### compact

Remove all falsy values (null, undefined, false, 0, empty string) from an array

**Module:** `collection` | **Returns:** `array` -- New array with falsy values removed

```robinpath
collection.compact $arr
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array to compact |

---

### zip

Zip two arrays together into an array of pairs

**Module:** `collection` | **Returns:** `array` -- Array of [a, b] pairs from the two arrays

```robinpath
collection.zip $a $b
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array1` | `array` | Yes | First array |
| `array2` | `array` | Yes | Second array |

---

### difference

Get elements that are in the first array but not in the second

**Module:** `collection` | **Returns:** `array` -- Elements present in array1 but not in array2

```robinpath
collection.difference $a $b
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array1` | `array` | Yes | Source array |
| `array2` | `array` | Yes | Array of elements to exclude |

---

### intersection

Get elements that exist in both arrays

**Module:** `collection` | **Returns:** `array` -- Elements present in both arrays

```robinpath
collection.intersection $a $b
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array1` | `array` | Yes | First array |
| `array2` | `array` | Yes | Second array |

---

### union

Combine two arrays into one with unique elements

**Module:** `collection` | **Returns:** `array` -- Combined array with duplicates removed

```robinpath
collection.union $a $b
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array1` | `array` | Yes | First array |
| `array2` | `array` | Yes | Second array |

---

### take

Take the first N elements from an array

**Module:** `collection` | **Returns:** `array` -- New array with the first N elements

```robinpath
collection.take $arr 5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Source array |
| `n` | `number` | Yes | Number of elements to take |

---

### skip

Skip the first N elements of an array

**Module:** `collection` | **Returns:** `array` -- New array with the first N elements removed

```robinpath
collection.skip $arr 5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Source array |
| `n` | `number` | Yes | Number of elements to skip |

---

### contains

Check if an array contains a specific value

**Module:** `collection` | **Returns:** `boolean` -- True if the value exists in the array

```robinpath
collection.contains $arr "value"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array to search in |
| `value` | `any` | Yes | Value to search for |

---

### indexOf

Find the index of a value in an array

**Module:** `collection` | **Returns:** `number` -- Index of the value, or -1 if not found

```robinpath
collection.indexOf $arr "value"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array to search in |
| `value` | `any` | Yes | Value to find |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as collection.pluck $arr "name"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Collection workflow

Chain multiple collection operations together.

```robinpath
set $r_pluck as collection.pluck $arr "name"
set $r_where as collection.where $arr "age" 25
set $r_whereGt as collection.whereGt $arr "age" 25
print "All operations complete"
```

### 2. Safe pluck with validation

Check results before proceeding.

```robinpath
set $result as collection.pluck $arr "name"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
