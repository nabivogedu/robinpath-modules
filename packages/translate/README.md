# @robinpath/translate

> Translate module for RobinPath.

![Category](https://img.shields.io/badge/category-AI-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `translate` module lets you:

- translateText
- translateBatch
- detectLanguage
- listLanguages
- getSupportedLanguagePairs

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/translate
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
translate.translateBatch
```

## Available Functions

| Function | Description |
|----------|-------------|
| `translate.translateText` | translateText |
| `translate.translateBatch` | translateBatch |
| `translate.detectLanguage` | detectLanguage |
| `translate.listLanguages` | listLanguages |
| `translate.getSupportedLanguagePairs` | getSupportedLanguagePairs |
| `translate.translateHtml` | translateHtml |
| `translate.suggestTranslation` | suggestTranslation |
| `translate.getTranslationMemory` | getTranslationMemory |
| `translate.autoTranslate` | autoTranslate |
| `translate.setProvider` | setProvider |

## Examples

### translateBatch

```robinpath
translate.translateBatch
```

### detectLanguage

```robinpath
translate.detectLanguage
```

### listLanguages

```robinpath
translate.listLanguages
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/translate";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  translate.translateBatch
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/openai`](../openai) — OpenAI module for complementary functionality
- [`@robinpath/anthropic`](../anthropic) — Anthropic module for complementary functionality
- [`@robinpath/ai`](../ai) — AI module for complementary functionality
- [`@robinpath/deepl`](../deepl) — DeepL module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
