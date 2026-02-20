# @robinpath/i18n

> Internationalization: translations, number/currency/date formatting, relative time, pluralization, RTL detection

![Category](https://img.shields.io/badge/category-Other-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `i18n` module lets you:

- Get current locale
- Load translations for a locale
- Translate a key
- Format number for locale
- Format currency

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/i18n
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
i18n.getLocale
```

## Available Functions

| Function | Description |
|----------|-------------|
| `i18n.setLocale` | Set default locale |
| `i18n.getLocale` | Get current locale |
| `i18n.loadTranslations` | Load translations for a locale |
| `i18n.t` | Translate a key |
| `i18n.formatNumber` | Format number for locale |
| `i18n.formatCurrency` | Format currency |
| `i18n.formatDate` | Format date for locale |
| `i18n.formatRelativeTime` | Format relative time |
| `i18n.formatList` | Format list (A, B, and C) |
| `i18n.pluralize` | Simple pluralization |
| `i18n.direction` | Get text direction for locale |
| `i18n.listLocales` | List loaded translation locales |
| `i18n.hasTranslation` | Check if key exists |
| `i18n.languageName` | Get language display name |
| `i18n.regionName` | Get region display name |

## Examples

### Get current locale

```robinpath
i18n.getLocale
```

### Load translations for a locale

```robinpath
i18n.loadTranslations "es" {"hello": "Hola", "bye": "Adiós"}
```

### Translate a key

```robinpath
i18n.t "hello" "es"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/i18n";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  i18n.getLocale
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
