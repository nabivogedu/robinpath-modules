---
title: "DeepL"
module: "deepl"
package: "@robinpath/deepl"
description: "DeepL module for RobinPath."
category: "ai"
tags: [deepl, ai]
type: "integration"
auth: "api-key"
functionCount: 13
baseUrl: "https://api-free.deepl.com"
---

# DeepL

> DeepL module for RobinPath.

**Package:** `@robinpath/deepl` | **Category:** Ai | **Type:** Integration


## Authentication

```robinpath
deepl.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `deepl` module when you need to:

- **translateText** -- Use `deepl.translateText` to perform this operation
- **translateBatch** -- Use `deepl.translateBatch` to perform this operation
- **getUsage** -- Use `deepl.getUsage` to perform this operation
- **listSourceLanguages** -- Use `deepl.listSourceLanguages` to perform this operation
- **listTargetLanguages** -- Use `deepl.listTargetLanguages` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure deepl credentials. | `object` |
| [`translateText`](#translatetext) | translateText | `object` |
| [`translateBatch`](#translatebatch) | translateBatch | `object` |
| [`getUsage`](#getusage) | getUsage | `object` |
| [`listSourceLanguages`](#listsourcelanguages) | listSourceLanguages | `object` |
| [`listTargetLanguages`](#listtargetlanguages) | listTargetLanguages | `object` |
| [`listGlossaryLanguagePairs`](#listglossarylanguagepairs) | listGlossaryLanguagePairs | `object` |
| [`createGlossary`](#createglossary) | createGlossary | `object` |
| [`getGlossary`](#getglossary) | getGlossary | `object` |
| [`listGlossaries`](#listglossaries) | listGlossaries | `object` |
| [`deleteGlossary`](#deleteglossary) | deleteGlossary | `object` |
| [`getGlossaryEntries`](#getglossaryentries) | getGlossaryEntries | `object` |
| [`translateDocument`](#translatedocument) | translateDocument | `object` |


## Functions

### setCredentials

Configure deepl credentials.

**Module:** `deepl` | **Returns:** `object` -- API response.

```robinpath
deepl.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `authKey` | `string` | Yes | authKey |

---

### translateText

translateText

**Module:** `deepl` | **Returns:** `object` -- API response.

```robinpath
deepl.translateText
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### translateBatch

translateBatch

**Module:** `deepl` | **Returns:** `object` -- API response.

```robinpath
deepl.translateBatch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUsage

getUsage

**Module:** `deepl` | **Returns:** `object` -- API response.

```robinpath
deepl.getUsage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listSourceLanguages

listSourceLanguages

**Module:** `deepl` | **Returns:** `object` -- API response.

```robinpath
deepl.listSourceLanguages
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTargetLanguages

listTargetLanguages

**Module:** `deepl` | **Returns:** `object` -- API response.

```robinpath
deepl.listTargetLanguages
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listGlossaryLanguagePairs

listGlossaryLanguagePairs

**Module:** `deepl` | **Returns:** `object` -- API response.

```robinpath
deepl.listGlossaryLanguagePairs
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createGlossary

createGlossary

**Module:** `deepl` | **Returns:** `object` -- API response.

```robinpath
deepl.createGlossary
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getGlossary

getGlossary

**Module:** `deepl` | **Returns:** `object` -- API response.

```robinpath
deepl.getGlossary
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listGlossaries

listGlossaries

**Module:** `deepl` | **Returns:** `object` -- API response.

```robinpath
deepl.listGlossaries
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteGlossary

deleteGlossary

**Module:** `deepl` | **Returns:** `object` -- API response.

```robinpath
deepl.deleteGlossary
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getGlossaryEntries

getGlossaryEntries

**Module:** `deepl` | **Returns:** `object` -- API response.

```robinpath
deepl.getGlossaryEntries
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### translateDocument

translateDocument

**Module:** `deepl` | **Returns:** `object` -- API response.

```robinpath
deepl.translateDocument
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Deepl API error (${res.status}): ${t}` | Check the error message for details |
| `deepl.setCredentials requires authKey.` | Check the error message for details |
| `deepl.deleteGlossary requires an ID.` | Check the error message for details |
| `Deepl: "..." not configured. Call deepl.setCredentials first.` | Check the error message for details |

```robinpath
set $result as deepl.translateText
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Usage

Retrieve all items and loop through them.

```robinpath
deepl.setCredentials $token
set $result as deepl.getUsage
each $item in $result
  print $item
end
```

### 2. Create a new item with createGlossary

Create a new resource and capture the result.

```robinpath
deepl.setCredentials $token
set $result as deepl.createGlossary
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
deepl.setCredentials $token
set $existing as deepl.getUsage
if $existing == null
  deepl.createGlossary
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step DeepL workflow

Chain multiple deepl operations together.

```robinpath
deepl.setCredentials $token
set $r_translateText as deepl.translateText
set $r_translateBatch as deepl.translateBatch
set $r_getUsage as deepl.getUsage
print "All operations complete"
```

### 5. Safe translateText with validation

Check results before proceeding.

```robinpath
deepl.setCredentials $token
set $result as deepl.translateText
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
- **translate** -- Translate module for complementary functionality
- **json** -- JSON module for complementary functionality
