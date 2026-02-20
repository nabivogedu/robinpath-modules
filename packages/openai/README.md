# @robinpath/openai

> OpenAI module for RobinPath.

![Category](https://img.shields.io/badge/category-AI-blue) ![Functions](https://img.shields.io/badge/functions-25-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `openai` module lets you:

- Send a chat completion request to OpenAI
- Send a legacy completion request
- Generate images using DALL-E
- Edit an image using DALL-E with an optional mask
- Create a variation of an existing image

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/openai
```

## Quick Start

**1. Set up credentials**

```robinpath
openai.setApiKey "sk-..."
```

**2. Send a chat completion request to OpenAI**

```robinpath
openai.chat "Hello, how are you?" {"model": "gpt-4o"}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `openai.setApiKey` | Set the OpenAI API key for authentication |
| `openai.chat` | Send a chat completion request to OpenAI |
| `openai.complete` | Send a legacy completion request |
| `openai.generateImage` | Generate images using DALL-E |
| `openai.editImage` | Edit an image using DALL-E with an optional mask |
| `openai.createImageVariation` | Create a variation of an existing image |
| `openai.transcribe` | Transcribe audio to text using Whisper |
| `openai.translate` | Translate audio to English text using Whisper |
| `openai.speak` | Convert text to speech using TTS |
| `openai.createEmbedding` | Generate text embeddings |
| `openai.createModeration` | Check text for content policy violations |
| `openai.listModels` | List all available OpenAI models |
| `openai.getModel` | Get details of a specific model |
| `openai.uploadFile` | Upload a file to OpenAI |
| `openai.listFiles` | List uploaded files |
| `openai.deleteFile` | Delete an uploaded file |
| `openai.getFileContent` | Get the content of an uploaded file |
| `openai.createFineTune` | Create a fine-tuning job |
| `openai.listFineTunes` | List fine-tuning jobs |
| `openai.getFineTune` | Get details of a fine-tuning job |
| `openai.cancelFineTune` | Cancel a running fine-tuning job |
| `openai.createBatch` | Create a batch processing request |
| `openai.getBatch` | Get details of a batch request |
| `openai.listBatches` | List batch requests |
| `openai.cancelBatch` | Cancel a batch request |

## Examples

### Send a chat completion request to OpenAI

```robinpath
openai.chat "Hello, how are you?" {"model": "gpt-4o"}
```

### Send a legacy completion request

```robinpath
openai.complete "Once upon a time"
```

### Generate images using DALL-E

```robinpath
openai.generateImage "A sunset over mountains" {"model": "dall-e-3", "size": "1024x1024"}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/openai";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  openai.setApiKey "sk-..."
  openai.chat "Hello, how are you?" {"model": "gpt-4o"}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/anthropic`](../anthropic) — Anthropic module for complementary functionality
- [`@robinpath/ai`](../ai) — AI module for complementary functionality
- [`@robinpath/deepl`](../deepl) — DeepL module for complementary functionality
- [`@robinpath/translate`](../translate) — Translate module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
