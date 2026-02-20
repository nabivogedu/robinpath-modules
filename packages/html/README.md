# @robinpath/html

> Parse, extract, escape, and manipulate HTML content using regex-based processing

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `html` module lets you:

- Remove all HTML tags from a string, returning plain text
- Extract the text content of all matching tags by tag name
- Extract all links (href and text) from anchor tags
- Extract all image sources and alt text from img tags
- Extract attribute values from all matching tags

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/html
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
html.extractText "<p>One</p><p>Two</p>" "p"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `html.stripTags` | Remove all HTML tags from a string, returning plain text |
| `html.extractText` | Extract the text content of all matching tags by tag name |
| `html.extractLinks` | Extract all links (href and text) from anchor tags |
| `html.extractImages` | Extract all image sources and alt text from img tags |
| `html.getAttribute` | Extract attribute values from all matching tags |
| `html.escape` | HTML-escape special characters (&, <, >, ", ') |
| `html.unescape` | Reverse HTML escaping (&amp; &lt; &gt; &quot; &#39;) |
| `html.extractMeta` | Extract meta tag name-content pairs from HTML |
| `html.getTitle` | Extract the text content of the <title> tag |
| `html.extractTables` | Extract HTML tables as arrays of rows and cells |
| `html.wrap` | Wrap text in an HTML tag with optional attributes |
| `html.minify` | Minify HTML by removing extra whitespace and newlines between tags |

## Examples

### Extract the text content of all matching tags by tag name

```robinpath
html.extractText "<p>One</p><p>Two</p>" "p"
```

### Extract all links (href and text) from anchor tags

```robinpath
html.extractLinks "<a href=\"https://example.com\">Example</a>"
```

### Extract all image sources and alt text from img tags

```robinpath
html.extractImages "<img src=\"photo.jpg\" alt=\"A photo\">"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/html";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  html.extractText "<p>One</p><p>Two</p>" "p"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
