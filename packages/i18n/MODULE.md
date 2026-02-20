---
title: "i18n"
module: "i18n"
package: "@robinpath/i18n"
description: "Internationalization: translations, number/currency/date formatting, relative time, pluralization, RTL detection"
category: "other"
tags: [i18n, other]
type: "utility"
auth: "none"
functionCount: 15
---

# i18n

> Internationalization: translations, number/currency/date formatting, relative time, pluralization, RTL detection

**Package:** `@robinpath/i18n` | **Category:** Other | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `i18n` module when you need to:

- **Get current locale** -- Use `i18n.getLocale` to perform this operation
- **Load translations for a locale** -- Use `i18n.loadTranslations` to perform this operation
- **Translate a key** -- Use `i18n.t` to perform this operation
- **Format number for locale** -- Use `i18n.formatNumber` to perform this operation
- **Format currency** -- Use `i18n.formatCurrency` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setLocale`](#setlocale) | Set default locale | `Locale` |
| [`getLocale`](#getlocale) | Get current locale | `Current locale` |
| [`loadTranslations`](#loadtranslations) | Load translations for a locale | `{locale, keys}` |
| [`t`](#t) | Translate a key | `Translated string` |
| [`formatNumber`](#formatnumber) | Format number for locale | `Formatted number` |
| [`formatCurrency`](#formatcurrency) | Format currency | `Formatted currency` |
| [`formatDate`](#formatdate) | Format date for locale | `Formatted date` |
| [`formatRelativeTime`](#formatrelativetime) | Format relative time | `Relative time string` |
| [`formatList`](#formatlist) | Format list (A, B, and C) | `Formatted list` |
| [`pluralize`](#pluralize) | Simple pluralization | `Correct form` |
| [`direction`](#direction) | Get text direction for locale | `ltr or rtl` |
| [`listLocales`](#listlocales) | List loaded translation locales | `Locale codes` |
| [`hasTranslation`](#hastranslation) | Check if key exists | `true if exists` |
| [`languageName`](#languagename) | Get language display name | `Language name` |
| [`regionName`](#regionname) | Get region display name | `Region name` |


## Functions

### setLocale

Set default locale

**Module:** `i18n` | **Returns:** `string` -- Locale

```robinpath
i18n.setLocale "de-DE"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `locale` | `string` | Yes | Locale code |

---

### getLocale

Get current locale

**Module:** `i18n` | **Returns:** `string` -- Current locale

```robinpath
i18n.getLocale
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### loadTranslations

Load translations for a locale

**Module:** `i18n` | **Returns:** `object` -- {locale, keys}

```robinpath
i18n.loadTranslations "es" {"hello": "Hola", "bye": "Adiós"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `locale` | `string` | Yes | Locale code |
| `strings` | `object` | Yes | Key-value translations |

---

### t

Translate a key

**Module:** `i18n` | **Returns:** `string` -- Translated string

```robinpath
i18n.t "hello" "es"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Translation key |
| `locale` | `string` | No | Override locale |
| `interpolation` | `object` | No | Variables for {{var}} |

---

### formatNumber

Format number for locale

**Module:** `i18n` | **Returns:** `string` -- Formatted number

```robinpath
i18n.formatNumber 1234567.89 "de-DE"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `number` | `number` | Yes | Number |
| `locale` | `string` | No | Locale |
| `options` | `object` | No | Intl.NumberFormat options |

---

### formatCurrency

Format currency

**Module:** `i18n` | **Returns:** `string` -- Formatted currency

```robinpath
i18n.formatCurrency 99.99 "EUR" "de-DE"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | `number` | Yes | Amount |
| `currency` | `string` | Yes | Currency code |
| `locale` | `string` | No | Locale |

---

### formatDate

Format date for locale

**Module:** `i18n` | **Returns:** `string` -- Formatted date

```robinpath
i18n.formatDate "2024-01-15" "ja-JP"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `string` | Yes | ISO date string |
| `locale` | `string` | No | Locale |
| `options` | `object` | No | {dateStyle, timeStyle} |

---

### formatRelativeTime

Format relative time

**Module:** `i18n` | **Returns:** `string` -- Relative time string

```robinpath
i18n.formatRelativeTime -3 "day"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `number` | Yes | Value (negative=past) |
| `unit` | `string` | Yes | second|minute|hour|day|week|month|year |
| `locale` | `string` | No | Locale |

---

### formatList

Format list (A, B, and C)

**Module:** `i18n` | **Returns:** `string` -- Formatted list

```robinpath
i18n.formatList ["Alice", "Bob", "Charlie"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `items` | `array` | Yes | Items |
| `locale` | `string` | No | Locale |
| `options` | `object` | No | {type: conjunction|disjunction|unit} |

---

### pluralize

Simple pluralization

**Module:** `i18n` | **Returns:** `string` -- Correct form

```robinpath
i18n.pluralize 5 "item" "items"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `count` | `number` | Yes | Count |
| `singular` | `string` | Yes | Singular form |
| `plural` | `string` | No | Plural form |

---

### direction

Get text direction for locale

**Module:** `i18n` | **Returns:** `string` -- ltr or rtl

```robinpath
i18n.direction "ar"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `locale` | `string` | Yes | Locale |

---

### listLocales

List loaded translation locales

**Module:** `i18n` | **Returns:** `array` -- Locale codes

```robinpath
i18n.listLocales
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### hasTranslation

Check if key exists

**Module:** `i18n` | **Returns:** `boolean` -- true if exists

```robinpath
i18n.hasTranslation "hello" "es"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` | Yes | Key |
| `locale` | `string` | No | Locale |

---

### languageName

Get language display name

**Module:** `i18n` | **Returns:** `string` -- Language name

```robinpath
i18n.languageName "de" "en"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `locale` | `string` | Yes | Language locale |
| `displayLocale` | `string` | No | Display in this locale |

---

### regionName

Get region display name

**Module:** `i18n` | **Returns:** `string` -- Region name

```robinpath
i18n.regionName "JP" "en"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `regionCode` | `string` | Yes | Region code (US, GB, etc) |
| `locale` | `string` | No | Display locale |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as i18n.getLocale
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Locale

Retrieve all items and loop through them.

```robinpath
set $result as i18n.getLocale
each $item in $result
  print $item
end
```

### 2. Multi-step i18n workflow

Chain multiple i18n operations together.

```robinpath
set $r_getLocale as i18n.getLocale
set $r_loadTranslations as i18n.loadTranslations "es" {"hello": "Hola", "bye": "Adiós"}
set $r_t as i18n.t "hello" "es"
print "All operations complete"
```

### 3. Safe getLocale with validation

Check results before proceeding.

```robinpath
set $result as i18n.getLocale
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
