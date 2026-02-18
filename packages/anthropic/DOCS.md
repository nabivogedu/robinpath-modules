---
title: "Anthropic"
module: "anthropic"
package: "@robinpath/anthropic"
description: "Anthropic module for RobinPath."
category: "ai"
tags: [anthropic, ai]
type: "integration"
auth: "api-key"
functionCount: 17
baseUrl: "https://api.anthropic.com"
---

# Anthropic

> Anthropic module for RobinPath.

**Package:** `@robinpath/anthropic` | **Category:** Ai | **Type:** Integration


## Authentication

```robinpath
anthropic.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `anthropic` module when you need to:

- **createMessage** -- Use `anthropic.createMessage` to perform this operation
- **chat** -- Use `anthropic.chat` to perform this operation
- **summarize** -- Use `anthropic.summarize` to perform this operation
- **translate** -- Use `anthropic.translate` to perform this operation
- **extract** -- Use `anthropic.extract` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure anthropic credentials. | `object` |
| [`createMessage`](#createmessage) | createMessage | `object` |
| [`chat`](#chat) | chat | `object` |
| [`summarize`](#summarize) | summarize | `object` |
| [`translate`](#translate) | translate | `object` |
| [`extract`](#extract) | extract | `object` |
| [`classify`](#classify) | classify | `object` |
| [`analyzeImage`](#analyzeimage) | analyzeImage | `object` |
| [`countTokens`](#counttokens) | countTokens | `object` |
| [`listModels`](#listmodels) | listModels | `object` |
| [`createBatch`](#createbatch) | createBatch | `object` |
| [`getBatch`](#getbatch) | getBatch | `object` |
| [`listBatches`](#listbatches) | listBatches | `object` |
| [`cancelBatch`](#cancelbatch) | cancelBatch | `object` |
| [`getBatchResults`](#getbatchresults) | getBatchResults | `object` |
| [`complete`](#complete) | complete | `object` |
| [`generateCode`](#generatecode) | generateCode | `object` |


## Functions

### setCredentials

Configure anthropic credentials.

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | Yes | apiKey |

---

### createMessage

createMessage

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.createMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### chat

chat

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.chat
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### summarize

summarize

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.summarize
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### translate

translate

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.translate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### extract

extract

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.extract
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### classify

classify

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.classify
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### analyzeImage

analyzeImage

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.analyzeImage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### countTokens

countTokens

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.countTokens
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listModels

listModels

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.listModels
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createBatch

createBatch

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.createBatch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getBatch

getBatch

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.getBatch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listBatches

listBatches

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.listBatches
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### cancelBatch

cancelBatch

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.cancelBatch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getBatchResults

getBatchResults

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.getBatchResults
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### complete

complete

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.complete
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### generateCode

generateCode

**Module:** `anthropic` | **Returns:** `object` -- API response.

```robinpath
anthropic.generateCode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Anthropic API error (${res.status}): ${t}` | Check the error message for details |
| `anthropic.setCredentials requires apiKey.` | Check the error message for details |
| `anthropic.cancelBatch requires an ID.` | Check the error message for details |
| `anthropic.complete requires an ID.` | Check the error message for details |
| `Anthropic: "..." not configured. Call anthropic.setCredentials first.` | Check the error message for details |

```robinpath
set $result as anthropic.createMessage
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Models

Retrieve all items and loop through them.

```robinpath
anthropic.setCredentials $token
set $result as anthropic.listModels
each $item in $result
  print $item
end
```

### 2. Create a new item with createMessage

Create a new resource and capture the result.

```robinpath
anthropic.setCredentials $token
set $result as anthropic.createMessage
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
anthropic.setCredentials $token
set $existing as anthropic.listModels
if $existing == null
  anthropic.createMessage
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Anthropic workflow

Chain multiple anthropic operations together.

```robinpath
anthropic.setCredentials $token
set $r_createMessage as anthropic.createMessage
set $r_chat as anthropic.chat
set $r_summarize as anthropic.summarize
print "All operations complete"
```

### 5. Safe createMessage with validation

Check results before proceeding.

```robinpath
anthropic.setCredentials $token
set $result as anthropic.createMessage
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **openai** -- OpenAI module for complementary functionality
- **ai** -- AI module for complementary functionality
- **deepl** -- DeepL module for complementary functionality
- **translate** -- Translate module for complementary functionality
- **json** -- JSON module for complementary functionality
