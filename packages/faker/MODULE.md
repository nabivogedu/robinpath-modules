---
title: "Faker"
module: "faker"
package: "@robinpath/faker"
description: "Fake data generation with seedable PRNG. Generates names, emails, addresses, lorem ipsum, numbers, dates, UUIDs, colors, IPs, and more. No external dependencies."
category: "utility"
tags: [faker, utility, email]
type: "utility"
auth: "none"
functionCount: 26
---

# Faker

> Fake data generation with seedable PRNG. Generates names, emails, addresses, lorem ipsum, numbers, dates, UUIDs, colors, IPs, and more. No external dependencies.

**Package:** `@robinpath/faker` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `faker` module when you need to:

- **Set the random seed for reproducible fake data generation** -- Use `faker.seed` to perform this operation
- **Generate a random full name** -- Use `faker.name` to perform this operation
- **Generate a random first name** -- Use `faker.firstName` to perform this operation
- **Generate a random last name** -- Use `faker.lastName` to perform this operation
- **Generate a random email address** -- Use `faker.email` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`seed`](#seed) | Set the random seed for reproducible fake data generation | `object` |
| [`name`](#name) | Generate a random full name | `object` |
| [`firstName`](#firstname) | Generate a random first name | `object` |
| [`lastName`](#lastname) | Generate a random last name | `object` |
| [`email`](#email) | Generate a random email address | `object` |
| [`phone`](#phone) | Generate a random phone number | `object` |
| [`address`](#address) | Generate a random street address | `object` |
| [`city`](#city) | Generate a random city name | `object` |
| [`country`](#country) | Generate a random country name | `object` |
| [`zipCode`](#zipcode) | Generate a random zip code | `object` |
| [`company`](#company) | Generate a random company name | `object` |
| [`lorem`](#lorem) | Generate lorem ipsum text as words, sentences, or paragraphs | `object` |
| [`number`](#number) | Generate a random integer within a range | `object` |
| [`float`](#float) | Generate a random floating-point number within a range | `object` |
| [`boolean`](#boolean) | Generate a random boolean value | `object` |
| [`date`](#date) | Generate a random date within a range | `object` |
| [`uuid`](#uuid) | Generate a random UUID v4 | `object` |
| [`pick`](#pick) | Pick a random element from an array | `object` |
| [`shuffle`](#shuffle) | Randomly shuffle an array using Fisher-Yates algorithm | `object` |
| [`paragraph`](#paragraph) | Generate a single random paragraph of lorem ipsum | `object` |
| [`sentence`](#sentence) | Generate a single random sentence of lorem ipsum | `object` |
| [`word`](#word) | Generate a single random lorem ipsum word | `object` |
| [`color`](#color) | Generate a random color in hex, rgb, or name format | `object` |
| [`ip`](#ip) | Generate a random IP address | `object` |
| [`url`](#url) | Generate a random URL | `object` |
| [`avatar`](#avatar) | Generate a random avatar image URL | `object` |


## Functions

### seed

Set the random seed for reproducible fake data generation

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.seed
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `seed` | `number` | No | Seed value for the PRNG |

---

### name

Generate a random full name

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.name
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### firstName

Generate a random first name

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.firstName
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### lastName

Generate a random last name

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.lastName
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### email

Generate a random email address

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.email
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### phone

Generate a random phone number

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.phone
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### address

Generate a random street address

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.address
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### city

Generate a random city name

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.city
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### country

Generate a random country name

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.country
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### zipCode

Generate a random zip code

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.zipCode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `format` | `string` | No | Zip code format where # is a digit (default #####) |

---

### company

Generate a random company name

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.company
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### lorem

Generate lorem ipsum text as words, sentences, or paragraphs

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.lorem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `string` | No | Type of lorem text: words, sentences, or paragraphs (default words) |
| `count` | `number` | No | Number of items to generate (default 5) |

---

### number

Generate a random integer within a range

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.number
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `min` | `number` | No | Minimum value (default 0) |
| `max` | `number` | No | Maximum value (default 1000) |

---

### float

Generate a random floating-point number within a range

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.float
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `min` | `number` | No | Minimum value (default 0) |
| `max` | `number` | No | Maximum value (default 1) |
| `precision` | `number` | No | Decimal places (default 2) |

---

### boolean

Generate a random boolean value

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.boolean
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### date

Generate a random date within a range

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.date
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `from` | `string` | No | Start date ISO string (default 2000-01-01) |
| `to` | `string` | No | End date ISO string (default now) |

---

### uuid

Generate a random UUID v4

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.uuid
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### pick

Pick a random element from an array

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.pick
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | No | Array to pick from |

---

### shuffle

Randomly shuffle an array using Fisher-Yates algorithm

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.shuffle
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | No | Array to shuffle |

---

### paragraph

Generate a single random paragraph of lorem ipsum

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.paragraph
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### sentence

Generate a single random sentence of lorem ipsum

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.sentence
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### word

Generate a single random lorem ipsum word

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.word
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### color

Generate a random color in hex, rgb, or name format

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.color
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `format` | `string` | No | Color format: hex, rgb, or name (default hex) |

---

### ip

Generate a random IP address

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.ip
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `version` | `string` | No | IP version: v4 or v6 (default v4) |

---

### url

Generate a random URL

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.url
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### avatar

Generate a random avatar image URL

**Module:** `faker` | **Returns:** `object` -- API response.

```robinpath
faker.avatar
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `size` | `number` | No | Avatar size in pixels (default 200) |
| `name` | `string` | No | Name for the avatar initials |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `seed must be a number` | Check the error message for details |
| `array must be a non-empty array` | Check the error message for details |
| `array must be an array` | Check the error message for details |

```robinpath
set $result as faker.seed
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with address

Create a new resource and capture the result.

```robinpath
set $result as faker.address
print "Created: " + $result
```

### 2. Multi-step Faker workflow

Chain multiple faker operations together.

```robinpath
set $r_seed as faker.seed
set $r_name as faker.name
set $r_firstName as faker.firstName
print "All operations complete"
```

### 3. Safe seed with validation

Check results before proceeding.

```robinpath
set $result as faker.seed
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
