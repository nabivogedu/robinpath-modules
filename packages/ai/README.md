# @robinpath/ai

> LLM integration: chat, complete, summarize, extract, classify, translate, sentiment analysis, and embeddings

![Category](https://img.shields.io/badge/category-AI-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `ai` module lets you:

- Send a chat message and get a response
- Get a simple text completion (returns just the text)
- Summarize text using AI
- Extract structured data from text using AI
- Classify text into one of given categories

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/ai
```

## Quick Start

**1. Set up credentials**

```robinpath
ai.configure "openai" {"provider": "openai", "apiKey": $key}
```

**2. Send a chat message and get a response**

```robinpath
ai.chat "openai" "Explain quantum computing" {"system": "You are a teacher"}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `ai.configure` | Configure an AI provider (OpenAI, Anthropic, or custom) |
| `ai.chat` | Send a chat message and get a response |
| `ai.complete` | Get a simple text completion (returns just the text) |
| `ai.summarize` | Summarize text using AI |
| `ai.extract` | Extract structured data from text using AI |
| `ai.classify` | Classify text into one of given categories |
| `ai.translate` | Translate text to a target language |
| `ai.sentiment` | Analyze the sentiment of text |
| `ai.generateJson` | Generate structured JSON from a prompt |
| `ai.embedding` | Generate text embeddings (OpenAI only) |

## Examples

### Send a chat message and get a response

```robinpath
ai.chat "openai" "Explain quantum computing" {"system": "You are a teacher"}
```

### Get a simple text completion (returns just the text)

```robinpath
ai.complete "openai" "Write a haiku about automation"
```

### Summarize text using AI

```robinpath
ai.summarize "openai" $longText {"maxLength": 100}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/ai";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  ai.configure "openai" {"provider": "openai", "apiKey": $key}
  ai.chat "openai" "Explain quantum computing" {"system": "You are a teacher"}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/openai`](../openai) — OpenAI module for complementary functionality
- [`@robinpath/anthropic`](../anthropic) — Anthropic module for complementary functionality
- [`@robinpath/deepl`](../deepl) — DeepL module for complementary functionality
- [`@robinpath/translate`](../translate) — Translate module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
