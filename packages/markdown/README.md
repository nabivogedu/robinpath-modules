# @robinpath/markdown

> Markdown processing: convert to HTML, extract headings, links, images, code blocks, frontmatter, and tables

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `markdown` module lets you:

- Convert markdown to basic HTML
- Extract all headings with their levels
- Extract all links
- Extract all images
- Extract fenced code blocks

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/markdown
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
markdown.extractHeadings $md
```

## Available Functions

| Function | Description |
|----------|-------------|
| `markdown.toHtml` | Convert markdown to basic HTML |
| `markdown.extractHeadings` | Extract all headings with their levels |
| `markdown.extractLinks` | Extract all links |
| `markdown.extractImages` | Extract all images |
| `markdown.extractCodeBlocks` | Extract fenced code blocks |
| `markdown.stripMarkdown` | Strip all markdown formatting to plain text |
| `markdown.extractFrontmatter` | Parse YAML frontmatter from markdown |
| `markdown.extractTodos` | Extract task list items |
| `markdown.tableToArray` | Parse a markdown table into array of objects |
| `markdown.wordCount` | Count words in markdown (stripping formatting) |

## Examples

### Extract all headings with their levels

```robinpath
markdown.extractHeadings $md
```

### Extract all links

```robinpath
markdown.extractLinks $md
```

### Extract all images

```robinpath
markdown.extractImages $md
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/markdown";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  markdown.extractHeadings $md
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
