---
title: "Phone"
module: "phone"
package: "@robinpath/phone"
description: "Phone number parsing, formatting, validation, country detection, and comparison"
category: "utility"
tags: [phone, utility]
type: "utility"
auth: "none"
functionCount: 13
---

# Phone

> Phone number parsing, formatting, validation, country detection, and comparison

**Package:** `@robinpath/phone` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `phone` module when you need to:

- **Parse phone number** -- Use `phone.parse` to perform this operation
- **Format phone in national format** -- Use `phone.format` to perform this operation
- **Format to E.164** -- Use `phone.formatE164` to perform this operation
- **Format as international** -- Use `phone.formatInternational` to perform this operation
- **Validate phone number** -- Use `phone.validate` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`parse`](#parse) | Parse phone number | `{countryCode, dialCode, nationalNumber, e164, isValid}` |
| [`format`](#format) | Format phone in national format | `Formatted string` |
| [`formatE164`](#formate164) | Format to E.164 | `E.164 string` |
| [`formatInternational`](#formatinternational) | Format as international | `International format` |
| [`validate`](#validate) | Validate phone number | `true if valid` |
| [`getCountry`](#getcountry) | Detect country from phone | `Country code or null` |
| [`getType`](#gettype) | Guess phone type | `mobile|landline|unknown` |
| [`normalize`](#normalize) | Strip non-digits | `Digits only` |
| [`mask`](#mask) | Mask phone for display | `Masked string` |
| [`dialCode`](#dialcode) | Get dial code for country | `Dial code` |
| [`countryInfo`](#countryinfo) | Get country phone info | `Country info` |
| [`listCountries`](#listcountries) | List supported countries | `Country codes` |
| [`compare`](#compare) | Compare two phone numbers | `true if same` |


## Functions

### parse

Parse phone number

**Module:** `phone` | **Returns:** `object` -- {countryCode, dialCode, nationalNumber, e164, isValid}

```robinpath
phone.parse "+15551234567"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `phone` | `string` | Yes | Phone number |
| `country` | `string` | No | Default country code |

---

### format

Format phone in national format

**Module:** `phone` | **Returns:** `string` -- Formatted string

```robinpath
phone.format "5551234567" "US"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `phone` | `string` | Yes | Phone |
| `country` | `string` | No | Country code |

---

### formatE164

Format to E.164

**Module:** `phone` | **Returns:** `string` -- E.164 string

```robinpath
phone.formatE164 "5551234567"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `phone` | `string` | Yes | Phone |
| `country` | `string` | No | Country code |

---

### formatInternational

Format as international

**Module:** `phone` | **Returns:** `string` -- International format

```robinpath
phone.formatInternational "5551234567"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `phone` | `string` | Yes | Phone |
| `country` | `string` | No | Country code |

---

### validate

Validate phone number

**Module:** `phone` | **Returns:** `boolean` -- true if valid

```robinpath
phone.validate "+15551234567"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `phone` | `string` | Yes | Phone |
| `country` | `string` | No | Country code |

---

### getCountry

Detect country from phone

**Module:** `phone` | **Returns:** `string` -- Country code or null

```robinpath
phone.getCountry "+44123456789"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `phone` | `string` | Yes | Phone with + prefix |

---

### getType

Guess phone type

**Module:** `phone` | **Returns:** `string` -- mobile|landline|unknown

```robinpath
phone.getType "5551234567"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `phone` | `string` | Yes | Phone |
| `country` | `string` | No | Country |

---

### normalize

Strip non-digits

**Module:** `phone` | **Returns:** `string` -- Digits only

```robinpath
phone.normalize "(555) 123-4567"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `phone` | `string` | Yes | Phone |

---

### mask

Mask phone for display

**Module:** `phone` | **Returns:** `string` -- Masked string

```robinpath
phone.mask "5551234567"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `phone` | `string` | Yes | Phone |
| `visibleDigits` | `number` | No | Visible digits (default 4) |

---

### dialCode

Get dial code for country

**Module:** `phone` | **Returns:** `string` -- Dial code

```robinpath
phone.dialCode "GB"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `country` | `string` | Yes | Country code |

---

### countryInfo

Get country phone info

**Module:** `phone` | **Returns:** `object` -- Country info

```robinpath
phone.countryInfo "US"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `country` | `string` | Yes | Country code |

---

### listCountries

List supported countries

**Module:** `phone` | **Returns:** `array` -- Country codes

```robinpath
phone.listCountries
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### compare

Compare two phone numbers

**Module:** `phone` | **Returns:** `boolean` -- true if same

```robinpath
phone.compare "(555) 123-4567" "+15551234567"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `phone1` | `string` | Yes | First phone |
| `phone2` | `string` | Yes | Second phone |
| `country` | `string` | No | Default country |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as phone.parse "+15551234567"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Country

Retrieve all items and loop through them.

```robinpath
set $result as phone.getCountry "+44123456789"
each $item in $result
  print $item
end
```

### 2. Multi-step Phone workflow

Chain multiple phone operations together.

```robinpath
set $r_parse as phone.parse "+15551234567"
set $r_format as phone.format "5551234567" "US"
set $r_formatE164 as phone.formatE164 "5551234567"
print "All operations complete"
```

### 3. Safe parse with validation

Check results before proceeding.

```robinpath
set $result as phone.parse "+15551234567"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
