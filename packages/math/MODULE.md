---
title: "Math"
module: "math"
package: "@robinpath/math"
description: "Math utilities: clamp, round, random, statistics, factorial, GCD, LCM, prime check, and linear interpolation"
category: "utility"
tags: [math, utility]
type: "utility"
auth: "none"
functionCount: 15
---

# Math

> Math utilities: clamp, round, random, statistics, factorial, GCD, LCM, prime check, and linear interpolation

**Package:** `@robinpath/math` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `math` module when you need to:

- **Clamp a number between a minimum and maximum value** -- Use `math.clamp` to perform this operation
- **Round a number to N decimal places** -- Use `math.round` to perform this operation
- **Generate a random integer between min and max (inclusive)** -- Use `math.randomInt` to perform this operation
- **Generate a random float between min and max** -- Use `math.randomFloat` to perform this operation
- **Calculate the sum of an array of numbers** -- Use `math.sum` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`clamp`](#clamp) | Clamp a number between a minimum and maximum value | `Clamped number` |
| [`round`](#round) | Round a number to N decimal places | `Rounded number` |
| [`randomInt`](#randomint) | Generate a random integer between min and max (inclusive) | `Random integer` |
| [`randomFloat`](#randomfloat) | Generate a random float between min and max | `Random float` |
| [`sum`](#sum) | Calculate the sum of an array of numbers | `Sum of all numbers` |
| [`avg`](#avg) | Calculate the average of an array of numbers | `Average value` |
| [`median`](#median) | Calculate the median of an array of numbers | `Median value` |
| [`min`](#min) | Find the minimum value in an array | `Minimum value` |
| [`max`](#max) | Find the maximum value in an array | `Maximum value` |
| [`percentage`](#percentage) | Calculate what percentage a value is of a total | `Percentage value` |
| [`factorial`](#factorial) | Calculate the factorial of a number | `Factorial result` |
| [`gcd`](#gcd) | Calculate the greatest common divisor of two numbers | `Greatest common divisor` |
| [`lcm`](#lcm) | Calculate the least common multiple of two numbers | `Least common multiple` |
| [`isPrime`](#isprime) | Check if a number is prime | `True if the number is prime` |
| [`lerp`](#lerp) | Linear interpolation between two values | `Interpolated value` |


## Functions

### clamp

Clamp a number between a minimum and maximum value

**Module:** `math` | **Returns:** `number` -- Clamped number

```robinpath
math.clamp 15 0 10
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `number` | Yes | The number to clamp |
| `min` | `number` | Yes | Minimum value |
| `max` | `number` | Yes | Maximum value |

---

### round

Round a number to N decimal places

**Module:** `math` | **Returns:** `number` -- Rounded number

```robinpath
math.round 3.14159 2
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `number` | Yes | The number to round |
| `decimals` | `number` | No | Number of decimal places (default: 0) |

---

### randomInt

Generate a random integer between min and max (inclusive)

**Module:** `math` | **Returns:** `number` -- Random integer

```robinpath
math.randomInt 1 100
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `min` | `number` | Yes | Minimum value (inclusive) |
| `max` | `number` | Yes | Maximum value (inclusive) |

---

### randomFloat

Generate a random float between min and max

**Module:** `math` | **Returns:** `number` -- Random float

```robinpath
math.randomFloat 0 1
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `min` | `number` | Yes | Minimum value |
| `max` | `number` | Yes | Maximum value |

---

### sum

Calculate the sum of an array of numbers

**Module:** `math` | **Returns:** `number` -- Sum of all numbers

```robinpath
math.sum [1, 2, 3, 4, 5]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `numbers` | `array` | Yes | Array of numbers |

---

### avg

Calculate the average of an array of numbers

**Module:** `math` | **Returns:** `number` -- Average value

```robinpath
math.avg [10, 20, 30]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `numbers` | `array` | Yes | Array of numbers |

---

### median

Calculate the median of an array of numbers

**Module:** `math` | **Returns:** `number` -- Median value

```robinpath
math.median [1, 3, 5, 7, 9]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `numbers` | `array` | Yes | Array of numbers |

---

### min

Find the minimum value in an array

**Module:** `math` | **Returns:** `number` -- Minimum value

```robinpath
math.min [5, 2, 8, 1]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `numbers` | `array` | Yes | Array of numbers |

---

### max

Find the maximum value in an array

**Module:** `math` | **Returns:** `number` -- Maximum value

```robinpath
math.max [5, 2, 8, 1]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `numbers` | `array` | Yes | Array of numbers |

---

### percentage

Calculate what percentage a value is of a total

**Module:** `math` | **Returns:** `number` -- Percentage value

```robinpath
math.percentage 25 200
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `number` | Yes | The value |
| `total` | `number` | Yes | The total |

---

### factorial

Calculate the factorial of a number

**Module:** `math` | **Returns:** `number` -- Factorial result

```robinpath
math.factorial 5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `n` | `number` | Yes | Non-negative integer |

---

### gcd

Calculate the greatest common divisor of two numbers

**Module:** `math` | **Returns:** `number` -- Greatest common divisor

```robinpath
math.gcd 12 8
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `a` | `number` | Yes | First number |
| `b` | `number` | Yes | Second number |

---

### lcm

Calculate the least common multiple of two numbers

**Module:** `math` | **Returns:** `number` -- Least common multiple

```robinpath
math.lcm 4 6
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `a` | `number` | Yes | First number |
| `b` | `number` | Yes | Second number |

---

### isPrime

Check if a number is prime

**Module:** `math` | **Returns:** `boolean` -- True if the number is prime

```robinpath
math.isPrime 17
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `n` | `number` | Yes | The number to check |

---

### lerp

Linear interpolation between two values

**Module:** `math` | **Returns:** `number` -- Interpolated value

```robinpath
math.lerp 0 100 0.5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `start` | `number` | Yes | Start value |
| `end` | `number` | Yes | End value |
| `t` | `number` | Yes | Interpolation factor (0-1) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Factorial is not defined for negative numbers` | Check the error message for details |

```robinpath
set $result as math.clamp 15 0 10
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Math workflow

Chain multiple math operations together.

```robinpath
set $r_clamp as math.clamp 15 0 10
set $r_round as math.round 3.14159 2
set $r_randomInt as math.randomInt 1 100
print "All operations complete"
```

### 2. Safe clamp with validation

Check results before proceeding.

```robinpath
set $result as math.clamp 15 0 10
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
