# @robinpath/anthropic

> Anthropic module for RobinPath.

![Category](https://img.shields.io/badge/category-AI-blue) ![Functions](https://img.shields.io/badge/functions-17-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `anthropic` module lets you:

- createMessage
- chat
- summarize
- translate
- extract

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/anthropic
```

## Quick Start

**1. Set up credentials**

```robinpath
anthropic.setCredentials "your-credentials"
```

**2. createMessage**

```robinpath
anthropic.createMessage
```

## Available Functions

| Function | Description |
|----------|-------------|
| `anthropic.setCredentials` | Configure anthropic credentials. |
| `anthropic.createMessage` | createMessage |
| `anthropic.chat` | chat |
| `anthropic.summarize` | summarize |
| `anthropic.translate` | translate |
| `anthropic.extract` | extract |
| `anthropic.classify` | classify |
| `anthropic.analyzeImage` | analyzeImage |
| `anthropic.countTokens` | countTokens |
| `anthropic.listModels` | listModels |
| `anthropic.createBatch` | createBatch |
| `anthropic.getBatch` | getBatch |
| `anthropic.listBatches` | listBatches |
| `anthropic.cancelBatch` | cancelBatch |
| `anthropic.getBatchResults` | getBatchResults |
| `anthropic.complete` | complete |
| `anthropic.generateCode` | generateCode |

## Examples

### createMessage

```robinpath
anthropic.createMessage
```

### chat

```robinpath
anthropic.chat
```

### summarize

```robinpath
anthropic.summarize
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/anthropic";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  anthropic.setCredentials "your-credentials"
  anthropic.createMessage
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/openai`](../openai) — OpenAI module for complementary functionality
- [`@robinpath/ai`](../ai) — AI module for complementary functionality
- [`@robinpath/deepl`](../deepl) — DeepL module for complementary functionality
- [`@robinpath/translate`](../translate) — Translate module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
