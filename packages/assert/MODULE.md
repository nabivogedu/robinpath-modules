---
title: "Assert"
module: "assert"
package: "@robinpath/assert"
description: "Testing assertions: equal, deepEqual, truthy, falsy, type checks, includes, matches, throws, and more"
category: "utility"
tags: [assert, utility]
type: "utility"
auth: "none"
functionCount: 15
---

# Assert

> Testing assertions: equal, deepEqual, truthy, falsy, type checks, includes, matches, throws, and more

**Package:** `@robinpath/assert` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `assert` module when you need to:

- **Assert two values are strictly equal (===)** -- Use `assert.equal` to perform this operation
- **Assert two values are not equal** -- Use `assert.notEqual` to perform this operation
- **Assert deep equality of two values** -- Use `assert.deepEqual` to perform this operation
- **Assert value is truthy** -- Use `assert.truthy` to perform this operation
- **Assert value is falsy** -- Use `assert.falsy` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`equal`](#equal) | Assert two values are strictly equal (===) | `True if equal, throws otherwise` |
| [`notEqual`](#notequal) | Assert two values are not equal | `True if not equal` |
| [`deepEqual`](#deepequal) | Assert deep equality of two values | `True if deeply equal` |
| [`truthy`](#truthy) | Assert value is truthy | `True if truthy` |
| [`falsy`](#falsy) | Assert value is falsy | `True if falsy` |
| [`isNull`](#isnull) | Assert value is null or undefined | `True if null/undefined` |
| [`isNotNull`](#isnotnull) | Assert value is not null/undefined | `True if not null` |
| [`isType`](#istype) | Assert typeof value matches expected type | `True if type matches` |
| [`includes`](#includes) | Assert array/string includes a value | `True if includes` |
| [`matches`](#matches) | Assert string matches a regex pattern | `True if matches` |
| [`throws`](#throws) | Assert that a function throws | `True if throws` |
| [`lengthOf`](#lengthof) | Assert array/string has specific length | `True if length matches` |
| [`hasProperty`](#hasproperty) | Assert object has a specific property | `True if has property` |
| [`isAbove`](#isabove) | Assert number is above threshold | `True if above` |
| [`isBelow`](#isbelow) | Assert number is below threshold | `True if below` |


## Functions

### equal

Assert two values are strictly equal (===)

**Module:** `assert` | **Returns:** `boolean` -- True if equal, throws otherwise

```robinpath
assert.equal $a $b
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `actual` | `any` | Yes | Actual value |
| `expected` | `any` | Yes | Expected value |

---

### notEqual

Assert two values are not equal

**Module:** `assert` | **Returns:** `boolean` -- True if not equal

```robinpath
assert.notEqual $a $b
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `actual` | `any` | Yes | Actual value |
| `expected` | `any` | Yes | Value to not match |

---

### deepEqual

Assert deep equality of two values

**Module:** `assert` | **Returns:** `boolean` -- True if deeply equal

```robinpath
assert.deepEqual $obj1 $obj2
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `actual` | `any` | Yes | Actual value |
| `expected` | `any` | Yes | Expected value |

---

### truthy

Assert value is truthy

**Module:** `assert` | **Returns:** `boolean` -- True if truthy

```robinpath
assert.truthy $val
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### falsy

Assert value is falsy

**Module:** `assert` | **Returns:** `boolean` -- True if falsy

```robinpath
assert.falsy $val
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isNull

Assert value is null or undefined

**Module:** `assert` | **Returns:** `boolean` -- True if null/undefined

```robinpath
assert.isNull $val
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isNotNull

Assert value is not null/undefined

**Module:** `assert` | **Returns:** `boolean` -- True if not null

```robinpath
assert.isNotNull $val
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isType

Assert typeof value matches expected type

**Module:** `assert` | **Returns:** `boolean` -- True if type matches

```robinpath
assert.isType $val "string"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |
| `type` | `string` | Yes | Expected type string |

---

### includes

Assert array/string includes a value

**Module:** `assert` | **Returns:** `boolean` -- True if includes

```robinpath
assert.includes "hello" "ell"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `haystack` | `any` | Yes | Array or string to search |
| `needle` | `any` | Yes | Value to find |

---

### matches

Assert string matches a regex pattern

**Module:** `assert` | **Returns:** `boolean` -- True if matches

```robinpath
assert.matches "hello" "^h"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | String to test |
| `pattern` | `string` | Yes | Regex pattern |

---

### throws

Assert that a function throws

**Module:** `assert` | **Returns:** `boolean` -- True if throws

```robinpath
assert.throws $fn
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fn` | `string` | Yes | Function to call |

---

### lengthOf

Assert array/string has specific length

**Module:** `assert` | **Returns:** `boolean` -- True if length matches

```robinpath
assert.lengthOf $arr 3
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Array or string |
| `length` | `number` | Yes | Expected length |

---

### hasProperty

Assert object has a specific property

**Module:** `assert` | **Returns:** `boolean` -- True if has property

```robinpath
assert.hasProperty $obj "name"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `obj` | `object` | Yes | Object to check |
| `property` | `string` | Yes | Property name |

---

### isAbove

Assert number is above threshold

**Module:** `assert` | **Returns:** `boolean` -- True if above

```robinpath
assert.isAbove 5 3
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `number` | Yes | Number to check |
| `threshold` | `number` | Yes | Threshold |

---

### isBelow

Assert number is below threshold

**Module:** `assert` | **Returns:** `boolean` -- True if below

```robinpath
assert.isBelow 3 5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `number` | Yes | Number to check |
| `threshold` | `number` | Yes | Threshold |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Expected ${JSON.stringify(args[0])} to equal ${JSON.stringify(args[1])}` | Check the error message for details |
| `Expected values to not be equal: ${JSON.stringify(args[0])}` | Check the error message for details |
| `Expected deep equality.\nActual: ${JSON.stringify(args[0])}\nExpected: ${JSON.stringify(args[1])}` | Check the error message for details |
| `Expected truthy value, got: ${JSON.stringify(args[0])}` | Check the error message for details |
| `Expected falsy value, got: ${JSON.stringify(args[0])}` | Check the error message for details |
| `Expected null/undefined, got: ${JSON.stringify(args[0])}` | Check the error message for details |
| `Expected non-null value, got null/undefined` | Check the error message for details |
| `Expected array to include ${JSON.stringify(needle)}` | Check the error message for details |

```robinpath
set $result as assert.equal $a $b
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Assert workflow

Chain multiple assert operations together.

```robinpath
set $r_equal as assert.equal $a $b
set $r_notEqual as assert.notEqual $a $b
set $r_deepEqual as assert.deepEqual $obj1 $obj2
print "All operations complete"
```

### 2. Safe equal with validation

Check results before proceeding.

```robinpath
set $result as assert.equal $a $b
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
