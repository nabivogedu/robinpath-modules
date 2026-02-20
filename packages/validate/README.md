# @robinpath/validate

> Validate strings, numbers, and data formats (email, URL, IP, UUID, JSON, etc.)

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-14-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `validate` module lets you:

- Validate email format
- Validate URL format
- Validate IPv4 address format
- Validate UUID format
- Check if a string is a valid date

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/validate
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
validate.isUrl "https://example.com"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `validate.isEmail` | Validate email format |
| `validate.isUrl` | Validate URL format |
| `validate.isIP` | Validate IPv4 address format |
| `validate.isUUID` | Validate UUID format |
| `validate.isDate` | Check if a string is a valid date |
| `validate.isNumeric` | Check if a string is numeric |
| `validate.isAlpha` | Check if a string contains only letters |
| `validate.isAlphanumeric` | Check if a string contains only letters and digits |
| `validate.matches` | Test a string against a regular expression pattern |
| `validate.minLength` | Check if a string meets a minimum length |
| `validate.maxLength` | Check if a string does not exceed a maximum length |
| `validate.inRange` | Check if a number is within a range (inclusive) |
| `validate.isJSON` | Check if a string is valid JSON |
| `validate.isEmpty` | Check if a value is empty (null, undefined, empty string, empty array, or empty object) |

## Examples

### Validate URL format

```robinpath
validate.isUrl "https://example.com"
```

### Validate IPv4 address format

```robinpath
validate.isIP "192.168.1.1"
```

### Validate UUID format

```robinpath
validate.isUUID "550e8400-e29b-41d4-a716-446655440000"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/validate";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  validate.isUrl "https://example.com"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
