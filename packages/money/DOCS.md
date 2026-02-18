---
title: "Money"
module: "money"
package: "@robinpath/money"
description: "Currency formatting, safe arithmetic, conversion, tax, discount, and exchange rates"
category: "utility"
tags: [money, utility]
type: "utility"
auth: "none"
functionCount: 16
baseUrl: "https://open.er-api.com"
---

# Money

> Currency formatting, safe arithmetic, conversion, tax, discount, and exchange rates

**Package:** `@robinpath/money` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `money` module when you need to:

- **Format number as currency** -- Use `money.format` to perform this operation
- **Parse currency string to number** -- Use `money.parse` to perform this operation
- **Safe addition** -- Use `money.add` to perform this operation
- **Safe subtraction** -- Use `money.subtract` to perform this operation
- **Safe multiplication** -- Use `money.multiply` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`format`](#format) | Format number as currency | `Formatted string` |
| [`parse`](#parse) | Parse currency string to number | `Numeric value` |
| [`add`](#add) | Safe addition | `Sum` |
| [`subtract`](#subtract) | Safe subtraction | `Difference` |
| [`multiply`](#multiply) | Safe multiplication | `Product` |
| [`divide`](#divide) | Safe division | `Quotient` |
| [`round`](#round) | Round to currency precision | `Rounded value` |
| [`convert`](#convert) | Convert between currencies | `{amount, currency, rate}` |
| [`fetchRate`](#fetchrate) | Fetch live exchange rate | `{rate, from, to, timestamp}` |
| [`split`](#split) | Split amount evenly | `Array of amounts summing to total` |
| [`percentage`](#percentage) | Calculate percentage | `Result` |
| [`discount`](#discount) | Apply discount | `{original, discount, final}` |
| [`tax`](#tax) | Add tax | `{subtotal, tax, total}` |
| [`currencyInfo`](#currencyinfo) | Get currency info | `{symbol, name, decimals, code}` |
| [`listCurrencies`](#listcurrencies) | List all currency codes | `Currency codes` |
| [`isValidCode`](#isvalidcode) | Check if currency code is valid | `true if valid` |


## Functions

### format

Format number as currency

**Module:** `money` | **Returns:** `string` -- Formatted string

```robinpath
money.format 1234.56 "USD"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | `number` | Yes | Amount |
| `currency` | `string` | No | Currency code (default USD) |
| `locale` | `string` | No | Locale (default en-US) |

---

### parse

Parse currency string to number

**Module:** `money` | **Returns:** `number` -- Numeric value

```robinpath
money.parse "$1,234.56"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | Currency string |

---

### add

Safe addition

**Module:** `money` | **Returns:** `number` -- Sum

```robinpath
money.add 0.1 0.2
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `a` | `number` | Yes | First value |
| `b` | `number` | Yes | Second value |
| `decimals` | `number` | No | Decimal places (default 2) |

---

### subtract

Safe subtraction

**Module:** `money` | **Returns:** `number` -- Difference

```robinpath
money.subtract 10.50 3.25
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `a` | `number` | Yes | First value |
| `b` | `number` | Yes | Second value |
| `decimals` | `number` | No | Decimal places |

---

### multiply

Safe multiplication

**Module:** `money` | **Returns:** `number` -- Product

```robinpath
money.multiply 19.99 3
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | `number` | Yes | Amount |
| `multiplier` | `number` | Yes | Multiplier |

---

### divide

Safe division

**Module:** `money` | **Returns:** `number` -- Quotient

```robinpath
money.divide 100 3
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | `number` | Yes | Amount |
| `divisor` | `number` | Yes | Divisor |

---

### round

Round to currency precision

**Module:** `money` | **Returns:** `number` -- Rounded value

```robinpath
money.round 10.456
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | `number` | Yes | Amount |
| `decimals` | `number` | No | Decimal places (default 2) |

---

### convert

Convert between currencies

**Module:** `money` | **Returns:** `object` -- {amount, currency, rate}

```robinpath
money.convert 100 "USD" "EUR" 0.85
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | `number` | Yes | Amount |
| `from` | `string` | Yes | Source currency |
| `to` | `string` | Yes | Target currency |
| `rate` | `number` | Yes | Exchange rate |

---

### fetchRate

Fetch live exchange rate

**Module:** `money` | **Returns:** `object` -- {rate, from, to, timestamp}

```robinpath
money.fetchRate "USD" "EUR"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `from` | `string` | Yes | Source currency |
| `to` | `string` | Yes | Target currency |

---

### split

Split amount evenly

**Module:** `money` | **Returns:** `array` -- Array of amounts summing to total

```robinpath
money.split 100 3
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | `number` | Yes | Total amount |
| `ways` | `number` | Yes | Number of splits |

---

### percentage

Calculate percentage

**Module:** `money` | **Returns:** `number` -- Result

```robinpath
money.percentage 200 15
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | `number` | Yes | Amount |
| `percent` | `number` | Yes | Percentage |

---

### discount

Apply discount

**Module:** `money` | **Returns:** `object` -- {original, discount, final}

```robinpath
money.discount 99.99 20
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | `number` | Yes | Original amount |
| `percent` | `number` | Yes | Discount % |

---

### tax

Add tax

**Module:** `money` | **Returns:** `object` -- {subtotal, tax, total}

```robinpath
money.tax 100 8.25
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | `number` | Yes | Subtotal |
| `rate` | `number` | Yes | Tax rate % |

---

### currencyInfo

Get currency info

**Module:** `money` | **Returns:** `object` -- {symbol, name, decimals, code}

```robinpath
money.currencyInfo "EUR"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | `string` | Yes | Currency code |

---

### listCurrencies

List all currency codes

**Module:** `money` | **Returns:** `array` -- Currency codes

```robinpath
money.listCurrencies
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### isValidCode

Check if currency code is valid

**Module:** `money` | **Returns:** `boolean` -- true if valid

```robinpath
money.isValidCode "USD"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | `string` | Yes | Currency code |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Division by zero` | Check the error message for details |
| `Rate not found for ${from} -> ${to}` | Check the error message for details |

```robinpath
set $result as money.format 1234.56 "USD"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Currencies

Retrieve all items and loop through them.

```robinpath
set $result as money.listCurrencies
each $item in $result
  print $item
end
```

### 2. Create a new item with add

Create a new resource and capture the result.

```robinpath
set $result as money.add 0.1 0.2
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as money.listCurrencies
if $existing == null
  money.add 0.1 0.2
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Money workflow

Chain multiple money operations together.

```robinpath
set $r_format as money.format 1234.56 "USD"
set $r_parse as money.parse "$1,234.56"
set $r_add as money.add 0.1 0.2
print "All operations complete"
```

### 5. Safe format with validation

Check results before proceeding.

```robinpath
set $result as money.format 1234.56 "USD"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
