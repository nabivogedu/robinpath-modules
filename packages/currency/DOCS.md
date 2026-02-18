---
title: "Currency"
module: "currency"
package: "@robinpath/currency"
description: "Currency module for RobinPath."
category: "utility"
tags: [currency, utility]
type: "utility"
auth: "none"
functionCount: 10
baseUrl: "https://open.er-api.com"
---

# Currency

> Currency module for RobinPath.

**Package:** `@robinpath/currency` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `currency` module when you need to:

- **getLatestRates** -- Use `currency.getLatestRates` to perform this operation
- **convert** -- Use `currency.convert` to perform this operation
- **convertBatch** -- Use `currency.convertBatch` to perform this operation
- **getHistoricalRates** -- Use `currency.getHistoricalRates` to perform this operation
- **listCurrencies** -- Use `currency.listCurrencies` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`getLatestRates`](#getlatestrates) | getLatestRates | `object` |
| [`convert`](#convert) | convert | `object` |
| [`convertBatch`](#convertbatch) | convertBatch | `object` |
| [`getHistoricalRates`](#gethistoricalrates) | getHistoricalRates | `object` |
| [`listCurrencies`](#listcurrencies) | listCurrencies | `object` |
| [`getRate`](#getrate) | getRate | `object` |
| [`getSupportedCodes`](#getsupportedcodes) | getSupportedCodes | `object` |
| [`getTimeSeriesRates`](#gettimeseriesrates) | getTimeSeriesRates | `object` |
| [`formatCurrency`](#formatcurrency) | formatCurrency | `object` |
| [`getPopularRates`](#getpopularrates) | getPopularRates | `object` |


## Functions

### getLatestRates

getLatestRates

**Module:** `currency` | **Returns:** `object` -- API response.

```robinpath
currency.getLatestRates
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### convert

convert

**Module:** `currency` | **Returns:** `object` -- API response.

```robinpath
currency.convert
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### convertBatch

convertBatch

**Module:** `currency` | **Returns:** `object` -- API response.

```robinpath
currency.convertBatch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getHistoricalRates

getHistoricalRates

**Module:** `currency` | **Returns:** `object` -- API response.

```robinpath
currency.getHistoricalRates
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCurrencies

listCurrencies

**Module:** `currency` | **Returns:** `object` -- API response.

```robinpath
currency.listCurrencies
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getRate

getRate

**Module:** `currency` | **Returns:** `object` -- API response.

```robinpath
currency.getRate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSupportedCodes

getSupportedCodes

**Module:** `currency` | **Returns:** `object` -- API response.

```robinpath
currency.getSupportedCodes
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTimeSeriesRates

getTimeSeriesRates

**Module:** `currency` | **Returns:** `object` -- API response.

```robinpath
currency.getTimeSeriesRates
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### formatCurrency

formatCurrency

**Module:** `currency` | **Returns:** `object` -- API response.

```robinpath
currency.formatCurrency
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPopularRates

getPopularRates

**Module:** `currency` | **Returns:** `object` -- API response.

```robinpath
currency.getPopularRates
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Currency API error (${res.status}): ${t}` | Check the error message for details |
| `Currency: "..." not configured. Call currency.setCredentials first.` | Check the error message for details |

```robinpath
set $result as currency.getLatestRates
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate LatestRates

Retrieve all items and loop through them.

```robinpath
set $result as currency.getLatestRates
each $item in $result
  print $item
end
```

### 2. Multi-step Currency workflow

Chain multiple currency operations together.

```robinpath
set $r_getLatestRates as currency.getLatestRates
set $r_convert as currency.convert
set $r_convertBatch as currency.convertBatch
print "All operations complete"
```

### 3. Safe getLatestRates with validation

Check results before proceeding.

```robinpath
set $result as currency.getLatestRates
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
