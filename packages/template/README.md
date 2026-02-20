# @robinpath/template

> Mustache-like template engine with variable substitution, conditional sections, loops, and simple string interpolation

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-6-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `template` module lets you:

- Render a Mustache-like template string with variable substitution, sections, and loops
- Read a template from a file and render it with the provided data object
- HTML-escape a string, converting &, <, >, ", and ' to their HTML entity equivalents
- Validate template syntax, checking for unclosed tags, mismatched sections, and other structural errors
- Extract all unique variable and section names used in a template

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/template
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
template.renderFile "/tmp/greeting.mustache" { "name": "World" }
```

## Available Functions

| Function | Description |
|----------|-------------|
| `template.render` | Render a Mustache-like template string with variable substitution, sections, and loops |
| `template.renderFile` | Read a template from a file and render it with the provided data object |
| `template.escape` | HTML-escape a string, converting &, <, >, ", and ' to their HTML entity equivalents |
| `template.compile` | Validate template syntax, checking for unclosed tags, mismatched sections, and other structural errors |
| `template.extractVariables` | Extract all unique variable and section names used in a template |
| `template.renderString` | Simple string interpolation using ${key} placeholders (no sections or loops) |

## Examples

### Read a template from a file and render it with the provided data object

```robinpath
template.renderFile "/tmp/greeting.mustache" { "name": "World" }
```

### HTML-escape a string, converting &, <, >, ", and ' to their HTML entity equivalents

```robinpath
template.escape "<script>alert(1)</script>"
```

### Validate template syntax, checking for unclosed tags, mismatched sections, and other structural errors

```robinpath
template.compile "{{#items}}{{name}}{{/items}}"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/template";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  template.renderFile "/tmp/greeting.mustache" { "name": "World" }
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
