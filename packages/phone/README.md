# @robinpath/phone

> Phone number parsing, formatting, validation, country detection, and comparison

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-13-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `phone` module lets you:

- Parse phone number
- Format phone in national format
- Format to E.164
- Format as international
- Validate phone number

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/phone
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
phone.format "5551234567" "US"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `phone.parse` | Parse phone number |
| `phone.format` | Format phone in national format |
| `phone.formatE164` | Format to E.164 |
| `phone.formatInternational` | Format as international |
| `phone.validate` | Validate phone number |
| `phone.getCountry` | Detect country from phone |
| `phone.getType` | Guess phone type |
| `phone.normalize` | Strip non-digits |
| `phone.mask` | Mask phone for display |
| `phone.dialCode` | Get dial code for country |
| `phone.countryInfo` | Get country phone info |
| `phone.listCountries` | List supported countries |
| `phone.compare` | Compare two phone numbers |

## Examples

### Format phone in national format

```robinpath
phone.format "5551234567" "US"
```

### Format to E.164

```robinpath
phone.formatE164 "5551234567"
```

### Format as international

```robinpath
phone.formatInternational "5551234567"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/phone";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  phone.format "5551234567" "US"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
