# @robinpath/sanitize

> Input sanitization utilities for security: HTML escaping, XSS prevention, SQL escaping, filename and path sanitization, URL cleaning, and more

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `sanitize` module lets you:

- Strip or escape HTML tags from input
- Remove XSS attack vectors from input
- Escape SQL special characters to prevent injection
- Escape special regex characters in a string
- Sanitize a string for safe use as a filename

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/sanitize
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
sanitize.xss
```

## Available Functions

| Function | Description |
|----------|-------------|
| `sanitize.html` | Strip or escape HTML tags from input |
| `sanitize.xss` | Remove XSS attack vectors from input |
| `sanitize.sql` | Escape SQL special characters to prevent injection |
| `sanitize.regex` | Escape special regex characters in a string |
| `sanitize.filename` | Sanitize a string for safe use as a filename |
| `sanitize.path` | Prevent path traversal attacks by sanitizing a file path |
| `sanitize.url` | Sanitize a URL, stripping dangerous protocols like javascript: |
| `sanitize.email` | Normalize an email address (lowercase, remove dots/plus aliases for Gmail) |
| `sanitize.stripTags` | Remove all HTML tags from a string, optionally allowing specific tags |
| `sanitize.escapeHtml` | Escape HTML special characters: & < > " ' |
| `sanitize.unescapeHtml` | Unescape HTML entities back to their original characters |
| `sanitize.trim` | Deep trim all string values within an object, array, or string |
| `sanitize.truncate` | Truncate a string to a maximum length with a suffix |
| `sanitize.alphanumeric` | Strip all non-alphanumeric characters from a string |
| `sanitize.slug` | Sanitize a string into a URL-safe slug |

## Examples

### Remove XSS attack vectors from input

```robinpath
sanitize.xss
```

### Escape SQL special characters to prevent injection

```robinpath
sanitize.sql
```

### Escape special regex characters in a string

```robinpath
sanitize.regex
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/sanitize";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  sanitize.xss
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
