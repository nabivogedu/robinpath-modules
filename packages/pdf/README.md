# @robinpath/pdf

> PDF generation (documents, tables, HTML-to-PDF) and parsing (text extraction, metadata, page count)

![Category](https://img.shields.io/badge/category-Documents-blue) ![Functions](https://img.shields.io/badge/functions-7-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `pdf` module lets you:

- Generate a PDF document with title, content, and sections
- Parse a PDF file and extract text, metadata, and page count
- Extract all text from a PDF file
- Get the number of pages in a PDF
- Get PDF metadata (author, title, creation date, etc.)

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/pdf
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
pdf.parse "./document.pdf"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `pdf.generate` | Generate a PDF document with title, content, and sections |
| `pdf.parse` | Parse a PDF file and extract text, metadata, and page count |
| `pdf.extractText` | Extract all text from a PDF file |
| `pdf.pageCount` | Get the number of pages in a PDF |
| `pdf.metadata` | Get PDF metadata (author, title, creation date, etc.) |
| `pdf.generateTable` | Generate a PDF with a formatted table |
| `pdf.generateFromHtml` | Generate a PDF from basic HTML content |

## Examples

### Parse a PDF file and extract text, metadata, and page count

```robinpath
pdf.parse "./document.pdf"
```

### Extract all text from a PDF file

```robinpath
pdf.extractText "./document.pdf"
```

### Get the number of pages in a PDF

```robinpath
pdf.pageCount "./document.pdf"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/pdf";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  pdf.parse "./document.pdf"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/excel`](../excel) — Excel module for complementary functionality
- [`@robinpath/office`](../office) — Office module for complementary functionality
- [`@robinpath/docusign`](../docusign) — DocuSign module for complementary functionality
- [`@robinpath/pandadoc`](../pandadoc) — PandaDoc module for complementary functionality
- [`@robinpath/hellosign`](../hellosign) — HelloSign module for complementary functionality

## License

MIT
