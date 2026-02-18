---
title: "Translate"
module: "translate"
package: "@robinpath/translate"
description: "Translate module for RobinPath."
category: "ai"
tags: [translate, ai]
type: "integration"
auth: "none"
functionCount: 10
baseUrl: "https://api.mymemory.translated.net"
---

# Translate

> Translate module for RobinPath.

**Package:** `@robinpath/translate` | **Category:** Ai | **Type:** Integration


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `translate` module when you need to:

- **translateText** -- Use `translate.translateText` to perform this operation
- **translateBatch** -- Use `translate.translateBatch` to perform this operation
- **detectLanguage** -- Use `translate.detectLanguage` to perform this operation
- **listLanguages** -- Use `translate.listLanguages` to perform this operation
- **getSupportedLanguagePairs** -- Use `translate.getSupportedLanguagePairs` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`translateText`](#translatetext) | translateText | `object` |
| [`translateBatch`](#translatebatch) | translateBatch | `object` |
| [`detectLanguage`](#detectlanguage) | detectLanguage | `object` |
| [`listLanguages`](#listlanguages) | listLanguages | `object` |
| [`getSupportedLanguagePairs`](#getsupportedlanguagepairs) | getSupportedLanguagePairs | `object` |
| [`translateHtml`](#translatehtml) | translateHtml | `object` |
| [`suggestTranslation`](#suggesttranslation) | suggestTranslation | `object` |
| [`getTranslationMemory`](#gettranslationmemory) | getTranslationMemory | `object` |
| [`autoTranslate`](#autotranslate) | autoTranslate | `object` |
| [`setProvider`](#setprovider) | setProvider | `object` |


## Functions

### translateText

translateText

**Module:** `translate` | **Returns:** `object` -- API response.

```robinpath
translate.translateText
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### translateBatch

translateBatch

**Module:** `translate` | **Returns:** `object` -- API response.

```robinpath
translate.translateBatch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### detectLanguage

detectLanguage

**Module:** `translate` | **Returns:** `object` -- API response.

```robinpath
translate.detectLanguage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listLanguages

listLanguages

**Module:** `translate` | **Returns:** `object` -- API response.

```robinpath
translate.listLanguages
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSupportedLanguagePairs

getSupportedLanguagePairs

**Module:** `translate` | **Returns:** `object` -- API response.

```robinpath
translate.getSupportedLanguagePairs
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### translateHtml

translateHtml

**Module:** `translate` | **Returns:** `object` -- API response.

```robinpath
translate.translateHtml
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### suggestTranslation

suggestTranslation

**Module:** `translate` | **Returns:** `object` -- API response.

```robinpath
translate.suggestTranslation
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTranslationMemory

getTranslationMemory

**Module:** `translate` | **Returns:** `object` -- API response.

```robinpath
translate.getTranslationMemory
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### autoTranslate

autoTranslate

**Module:** `translate` | **Returns:** `object` -- API response.

```robinpath
translate.autoTranslate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### setProvider

setProvider

**Module:** `translate` | **Returns:** `object` -- API response.

```robinpath
translate.setProvider
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Translate API error (${res.status}): ${t}` | Check the error message for details |
| `Translate: "..." not configured. Call translate.setCredentials first.` | Check the error message for details |

```robinpath
set $result as translate.translateText
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Languages

Retrieve all items and loop through them.

```robinpath
set $result as translate.listLanguages
each $item in $result
  print $item
end
```

### 2. Multi-step Translate workflow

Chain multiple translate operations together.

```robinpath
set $r_translateText as translate.translateText
set $r_translateBatch as translate.translateBatch
set $r_detectLanguage as translate.detectLanguage
print "All operations complete"
```

### 3. Safe translateText with validation

Check results before proceeding.

```robinpath
set $result as translate.translateText
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **openai** -- OpenAI module for complementary functionality
- **anthropic** -- Anthropic module for complementary functionality
- **ai** -- AI module for complementary functionality
- **deepl** -- DeepL module for complementary functionality
- **json** -- JSON module for complementary functionality
