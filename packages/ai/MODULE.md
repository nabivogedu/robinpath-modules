---
title: "AI"
module: "ai"
package: "@robinpath/ai"
description: "LLM integration: chat, complete, summarize, extract, classify, translate, sentiment analysis, and embeddings"
category: "ai"
tags: [ai]
type: "integration"
auth: "api-key"
functionCount: 10
---

# AI

> LLM integration: chat, complete, summarize, extract, classify, translate, sentiment analysis, and embeddings

**Package:** `@robinpath/ai` | **Category:** Ai | **Type:** Integration


## Authentication

```robinpath
ai.configure "openai" {"provider": "openai", "apiKey": $key}
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `ai` module when you need to:

- **Send a chat message and get a response** -- Use `ai.chat` to perform this operation
- **Get a simple text completion (returns just the text)** -- Use `ai.complete` to perform this operation
- **Summarize text using AI** -- Use `ai.summarize` to perform this operation
- **Extract structured data from text using AI** -- Use `ai.extract` to perform this operation
- **Classify text into one of given categories** -- Use `ai.classify` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`configure`](#configure) | Configure an AI provider (OpenAI, Anthropic, or custom) | `{name, provider, model}` |
| [`chat`](#chat) | Send a chat message and get a response | `{content, role, model, usage}` |
| [`complete`](#complete) | Get a simple text completion (returns just the text) | `Generated text` |
| [`summarize`](#summarize) | Summarize text using AI | `Summary text` |
| [`extract`](#extract) | Extract structured data from text using AI | `Extracted key-value object` |
| [`classify`](#classify) | Classify text into one of given categories | `Selected category` |
| [`translate`](#translate) | Translate text to a target language | `Translated text` |
| [`sentiment`](#sentiment) | Analyze the sentiment of text | `{sentiment, score, confidence}` |
| [`generateJson`](#generatejson) | Generate structured JSON from a prompt | `Generated JSON object` |
| [`embedding`](#embedding) | Generate text embeddings (OpenAI only) | `Embedding vector(s)` |


## Functions

### configure

Configure an AI provider (OpenAI, Anthropic, or custom)

**Module:** `ai` | **Returns:** `object` -- {name, provider, model}

```robinpath
ai.configure "openai" {"provider": "openai", "apiKey": $key}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Provider name |
| `options` | `object` | Yes | {provider, apiKey, baseUrl, model, maxTokens} |

---

### chat

Send a chat message and get a response

**Module:** `ai` | **Returns:** `object` -- {content, role, model, usage}

```robinpath
ai.chat "openai" "Explain quantum computing" {"system": "You are a teacher"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `provider` | `string` | Yes | Provider name |
| `messages` | `any` | Yes | String or array of {role, content} |
| `options` | `object` | No | {model, maxTokens, temperature, system} |

---

### complete

Get a simple text completion (returns just the text)

**Module:** `ai` | **Returns:** `string` -- Generated text

```robinpath
ai.complete "openai" "Write a haiku about automation"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `provider` | `string` | Yes | Provider name |
| `prompt` | `string` | Yes | Prompt text |
| `options` | `object` | No | {model, maxTokens, temperature} |

---

### summarize

Summarize text using AI

**Module:** `ai` | **Returns:** `string` -- Summary text

```robinpath
ai.summarize "openai" $longText {"maxLength": 100}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `provider` | `string` | Yes | Provider name |
| `text` | `string` | Yes | Text to summarize |
| `options` | `object` | No | {maxLength} |

---

### extract

Extract structured data from text using AI

**Module:** `ai` | **Returns:** `object` -- Extracted key-value object

```robinpath
ai.extract "openai" "John Smith, age 30, from NYC" ["name", "age", "city"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `provider` | `string` | Yes | Provider name |
| `text` | `string` | Yes | Source text |
| `fields` | `array` | Yes | Fields to extract |

---

### classify

Classify text into one of given categories

**Module:** `ai` | **Returns:** `string` -- Selected category

```robinpath
ai.classify "openai" "I love this product!" ["positive", "negative", "neutral"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `provider` | `string` | Yes | Provider name |
| `text` | `string` | Yes | Text to classify |
| `categories` | `array` | Yes | Possible categories |

---

### translate

Translate text to a target language

**Module:** `ai` | **Returns:** `string` -- Translated text

```robinpath
ai.translate "openai" "Hello world" "Spanish"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `provider` | `string` | Yes | Provider name |
| `text` | `string` | Yes | Text to translate |
| `targetLang` | `string` | Yes | Target language |

---

### sentiment

Analyze the sentiment of text

**Module:** `ai` | **Returns:** `object` -- {sentiment, score, confidence}

```robinpath
ai.sentiment "openai" "This product is amazing!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `provider` | `string` | Yes | Provider name |
| `text` | `string` | Yes | Text to analyze |

---

### generateJson

Generate structured JSON from a prompt

**Module:** `ai` | **Returns:** `object` -- Generated JSON object

```robinpath
ai.generateJson "openai" "Generate 3 fake users" {"name": "string", "email": "string"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `provider` | `string` | Yes | Provider name |
| `prompt` | `string` | Yes | Prompt describing what to generate |
| `schema` | `object` | No | Optional JSON schema/structure |

---

### embedding

Generate text embeddings (OpenAI only)

**Module:** `ai` | **Returns:** `array` -- Embedding vector(s)

```robinpath
ai.embedding "openai" "Hello world"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `provider` | `string` | Yes | Provider name |
| `input` | `any` | Yes | String or array of strings |
| `options` | `object` | No | {model} |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `OpenAI API error: ${JSON.stringify(data.error ?? data)}` | Check the error message for details |
| `Anthropic API error: ${JSON.stringify(data.error ?? data)}` | Check the error message for details |
| `Embeddings error: ${JSON.stringify(data.error ?? data)}` | Check the error message for details |
| `AI provider "..." not configured. Use ai.configure first.` | Check the error message for details |
| `AI provider "..." not configured.` | Check the error message for details |

```robinpath
set $result as ai.configure "openai" {"provider": "openai", "apiKey": $key}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step AI workflow

Chain multiple ai operations together.

```robinpath
set $r_configure as ai.configure "openai" {"provider": "openai", "apiKey": $key}
set $r_chat as ai.chat "openai" "Explain quantum computing" {"system": "You are a teacher"}
set $r_complete as ai.complete "openai" "Write a haiku about automation"
print "All operations complete"
```

### 2. Safe configure with validation

Check results before proceeding.

```robinpath
set $result as ai.configure "openai" {"provider": "openai", "apiKey": $key}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **openai** -- OpenAI module for complementary functionality
- **anthropic** -- Anthropic module for complementary functionality
- **deepl** -- DeepL module for complementary functionality
- **translate** -- Translate module for complementary functionality
- **json** -- JSON module for complementary functionality
