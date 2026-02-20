# @robinpath/deepl

> DeepL module for RobinPath.

![Category](https://img.shields.io/badge/category-AI-blue) ![Functions](https://img.shields.io/badge/functions-13-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `deepl` module lets you:

- translateText
- translateBatch
- getUsage
- listSourceLanguages
- listTargetLanguages

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/deepl
```

## Quick Start

**1. Set up credentials**

```robinpath
deepl.setCredentials "your-credentials"
```

**2. translateText**

```robinpath
deepl.translateText
```

## Available Functions

| Function | Description |
|----------|-------------|
| `deepl.setCredentials` | Configure deepl credentials. |
| `deepl.translateText` | translateText |
| `deepl.translateBatch` | translateBatch |
| `deepl.getUsage` | getUsage |
| `deepl.listSourceLanguages` | listSourceLanguages |
| `deepl.listTargetLanguages` | listTargetLanguages |
| `deepl.listGlossaryLanguagePairs` | listGlossaryLanguagePairs |
| `deepl.createGlossary` | createGlossary |
| `deepl.getGlossary` | getGlossary |
| `deepl.listGlossaries` | listGlossaries |
| `deepl.deleteGlossary` | deleteGlossary |
| `deepl.getGlossaryEntries` | getGlossaryEntries |
| `deepl.translateDocument` | translateDocument |

## Examples

### translateText

```robinpath
deepl.translateText
```

### translateBatch

```robinpath
deepl.translateBatch
```

### getUsage

```robinpath
deepl.getUsage
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/deepl";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  deepl.setCredentials "your-credentials"
  deepl.translateText
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/openai`](../openai) — OpenAI module for complementary functionality
- [`@robinpath/anthropic`](../anthropic) — Anthropic module for complementary functionality
- [`@robinpath/ai`](../ai) — AI module for complementary functionality
- [`@robinpath/translate`](../translate) — Translate module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
