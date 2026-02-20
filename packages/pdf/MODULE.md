---
title: "PDF"
module: "pdf"
package: "@robinpath/pdf"
description: "PDF generation (documents, tables, HTML-to-PDF) and parsing (text extraction, metadata, page count)"
category: "documents"
tags: [pdf, documents]
type: "integration"
auth: "none"
functionCount: 7
---

# PDF

> PDF generation (documents, tables, HTML-to-PDF) and parsing (text extraction, metadata, page count)

**Package:** `@robinpath/pdf` | **Category:** Documents | **Type:** Integration


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `pdf` module when you need to:

- **Generate a PDF document with title, content, and sections** -- Use `pdf.generate` to perform this operation
- **Parse a PDF file and extract text, metadata, and page count** -- Use `pdf.parse` to perform this operation
- **Extract all text from a PDF file** -- Use `pdf.extractText` to perform this operation
- **Get the number of pages in a PDF** -- Use `pdf.pageCount` to perform this operation
- **Get PDF metadata (author, title, creation date, etc.)** -- Use `pdf.metadata` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`generate`](#generate) | Generate a PDF document with title, content, and sections | `{path, pages}` |
| [`parse`](#parse) | Parse a PDF file and extract text, metadata, and page count | `{text, pages, info, metadata}` |
| [`extractText`](#extracttext) | Extract all text from a PDF file | `Extracted text content` |
| [`pageCount`](#pagecount) | Get the number of pages in a PDF | `Page count` |
| [`metadata`](#metadata) | Get PDF metadata (author, title, creation date, etc.) | `{info, metadata, pages}` |
| [`generateTable`](#generatetable) | Generate a PDF with a formatted table | `{path}` |
| [`generateFromHtml`](#generatefromhtml) | Generate a PDF from basic HTML content | `{path, pages}` |


## Functions

### generate

Generate a PDF document with title, content, and sections

**Module:** `pdf` | **Returns:** `object` -- {path, pages}

```robinpath
pdf.generate "./report.pdf" {"title": "Monthly Report", "content": "..."}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `outputPath` | `string` | Yes | Output file path |
| `options` | `object` | Yes | {title, author, content, sections, footer, size, margin, fontSize} |

---

### parse

Parse a PDF file and extract text, metadata, and page count

**Module:** `pdf` | **Returns:** `object` -- {text, pages, info, metadata}

```robinpath
pdf.parse "./document.pdf"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to PDF file |

---

### extractText

Extract all text from a PDF file

**Module:** `pdf` | **Returns:** `string` -- Extracted text content

```robinpath
pdf.extractText "./document.pdf"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to PDF file |

---

### pageCount

Get the number of pages in a PDF

**Module:** `pdf` | **Returns:** `number` -- Page count

```robinpath
pdf.pageCount "./document.pdf"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to PDF file |

---

### metadata

Get PDF metadata (author, title, creation date, etc.)

**Module:** `pdf` | **Returns:** `object` -- {info, metadata, pages}

```robinpath
pdf.metadata "./document.pdf"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to PDF file |

---

### generateTable

Generate a PDF with a formatted table

**Module:** `pdf` | **Returns:** `object` -- {path}

```robinpath
pdf.generateTable "./table.pdf" ["Name","Email"] $rows
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `outputPath` | `string` | Yes | Output file path |
| `headers` | `array` | Yes | Column headers |
| `rows` | `array` | Yes | Array of row arrays or objects |
| `options` | `object` | No | {title, landscape} |

---

### generateFromHtml

Generate a PDF from basic HTML content

**Module:** `pdf` | **Returns:** `object` -- {path, pages}

```robinpath
pdf.generateFromHtml "./output.pdf" "<h1>Title</h1><p>Content</p>"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `outputPath` | `string` | Yes | Output file path |
| `html` | `string` | Yes | HTML content |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as pdf.generate "./report.pdf" {"title": "Monthly Report", "content": "..."}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step PDF workflow

Chain multiple pdf operations together.

```robinpath
set $r_generate as pdf.generate "./report.pdf" {"title": "Monthly Report", "content": "..."}
set $r_parse as pdf.parse "./document.pdf"
set $r_extractText as pdf.extractText "./document.pdf"
print "All operations complete"
```

### 2. Safe generate with validation

Check results before proceeding.

```robinpath
set $result as pdf.generate "./report.pdf" {"title": "Monthly Report", "content": "..."}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **excel** -- Excel module for complementary functionality
- **office** -- Office module for complementary functionality
- **docusign** -- DocuSign module for complementary functionality
- **pandadoc** -- PandaDoc module for complementary functionality
- **hellosign** -- HelloSign module for complementary functionality
