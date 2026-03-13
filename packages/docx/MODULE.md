---
title: "Docx"
module: "docx"
package: "@robinpath/docx"
description: "Word document (.docx) creation and reading — headings, paragraphs, tables, images, lists, hyperlinks, bookmarks, TOC, footnotes, comments, sections, headers/footers, styles, checkboxes, and document patching"
category: "document"
tags: [docx, word, document, office]
type: "external"
auth: "none"
functionCount: 21
---

# Docx

> Word document (.docx) creation and reading — headings, paragraphs, tables, images, lists, hyperlinks, bookmarks, TOC, footnotes, comments, sections, headers/footers, styles, checkboxes, and document patching. Zero npm dependencies.

**Package:** `@robinpath/docx` | **Category:** Document | **Type:** External

## Authentication

No authentication required. All functions are available immediately.

## Use Cases

Use the `docx` module when you need to:

- **Create a new Word document** -- Use `docx.createDoc` to start a new document
- **Read an existing Word document** -- Use `docx.readDoc` to extract text or HTML
- **Add headings and paragraphs** -- Use `docx.addHeading` and `docx.addParagraph` for text content
- **Add tables with styling** -- Use `docx.addTable` for data tables with headers, borders, and colors
- **Add images** -- Use `docx.addImage` to embed images with sizing and alignment
- **Add lists** -- Use `docx.addList` for bulleted or numbered lists
- **Add hyperlinks and bookmarks** -- Use `docx.addHyperlink` and `docx.addBookmark` for navigation
- **Add table of contents** -- Use `docx.addTableOfContents` for auto-generated TOC
- **Add footnotes and comments** -- Use `docx.addFootnote` and `docx.addComment` for annotations
- **Patch existing documents** -- Use `docx.patchDoc` to replace placeholders in templates
- **Save the document** -- Use `docx.saveDoc` to write the .docx file

## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`createDoc`](#createdoc) | Create a new Word document | `string` |
| [`readDoc`](#readdoc) | Read text or HTML from an existing .docx | `string` |
| [`addHeading`](#addheading) | Add a heading with level and formatting | `boolean` |
| [`addParagraph`](#addparagraph) | Add a paragraph with rich text formatting | `boolean` |
| [`addTable`](#addtable) | Add a table with full styling | `boolean` |
| [`addImage`](#addimage) | Add an image to the document | `boolean` |
| [`addPageBreak`](#addpagebreak) | Add a page break | `boolean` |
| [`addList`](#addlist) | Add a bulleted or numbered list | `boolean` |
| [`addHyperlink`](#addhyperlink) | Add a clickable hyperlink | `boolean` |
| [`addBookmark`](#addbookmark) | Add a named bookmark | `boolean` |
| [`addTableOfContents`](#addtableofcontents) | Add an auto-generated table of contents | `boolean` |
| [`addFootnote`](#addfootnote) | Add a footnote reference and content | `number` |
| [`addComment`](#addcomment) | Add a comment annotation | `number` |
| [`addSection`](#addsection) | Add a new section with separate formatting | `number` |
| [`setDocProperties`](#setdocproperties) | Set document metadata properties | `boolean` |
| [`addDocStyle`](#adddocstyle) | Define a reusable named style | `boolean` |
| [`addHeader`](#addheader) | Add a custom header | `boolean` |
| [`addFooter`](#addfooter) | Add a custom footer with optional page numbers | `boolean` |
| [`patchDoc`](#patchdoc) | Replace placeholders in an existing .docx | `Object` |
| [`addCheckbox`](#addcheckbox) | Add a checkbox with label | `boolean` |
| [`saveDoc`](#savedoc) | Save the document to a .docx file | `Object` |

## Functions

### createDoc

Create a new Word document

**Module:** `docx` | **Returns:** `string` -- Document ID

```robinpath
docx.createDoc "report" { "margins": { "top": 1, "bottom": 1 } }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Document ID |
| `options` | `object` | No | {margins: {top, bottom, left, right}} |

---

### readDoc

Read text or HTML from an existing Word document

**Module:** `docx` | **Returns:** `string` -- Document content as text or HTML

```robinpath
docx.readDoc "./contract.docx" "text"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to .docx file |
| `format` | `string` | No | 'text' (default) or 'html' |

---

### addHeading

Add a heading with level and formatting

**Module:** `docx` | **Returns:** `boolean` -- true

```robinpath
docx.addHeading $doc "Sales Report" 1 { "color": "#2196F3", "alignment": "center" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `text` | `string` | Yes | Heading text |
| `level` | `number` | No | Heading level 1-6 |
| `options` | `object` | No | {bold, italic, fontSize, font, color, alignment, spacing} |

---

### addParagraph

Add a paragraph with rich text formatting

**Module:** `docx` | **Returns:** `boolean` -- true

```robinpath
docx.addParagraph $doc "Revenue increased by 23%" { "bold": true, "fontSize": 12, "alignment": "justify" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `text` | `string` | Yes | Paragraph text |
| `options` | `object` | No | {bold, italic, underline, fontSize, font, color, alignment, spacing, indent, runs} |

---

### addTable

Add a table with full styling (headers, borders, colors, widths)

**Module:** `docx` | **Returns:** `boolean` -- true

```robinpath
docx.addTable $doc $data { "headerStyle": { "fillColor": "#2196F3", "fontColor": "#FFFFFF" }, "alternateRows": true }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `data` | `array` | Yes | Array of objects or array of arrays |
| `options` | `object` | No | {headerStyle, cellStyle, columnWidths, borders, alternateRows} |

---

### addImage

Add an image to the document

**Module:** `docx` | **Returns:** `boolean` -- true

```robinpath
docx.addImage $doc "./chart.png" { "width": 500, "height": 300, "alignment": "center" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `imagePath` | `string` | Yes | Path to image file |
| `options` | `object` | No | {width, height, alignment} |

---

### addPageBreak

Add a page break

**Module:** `docx` | **Returns:** `boolean` -- true

```robinpath
docx.addPageBreak $doc
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |

---

### addList

Add a bulleted or numbered list

**Module:** `docx` | **Returns:** `boolean` -- true

```robinpath
docx.addList $doc ["Item 1", "Item 2", "Item 3"] { "ordered": true, "fontSize": 11 }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `items` | `array` | Yes | Array of strings |
| `options` | `object` | No | {ordered: bool, bold, fontSize, font, color} |

---

### addHyperlink

Add a clickable hyperlink to the document

**Module:** `docx` | **Returns:** `boolean` -- true

```robinpath
docx.addHyperlink $doc "Visit our site" "https://example.com" { "bold": true }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `text` | `string` | Yes | Display text |
| `url` | `string` | Yes | Target URL |
| `options` | `object` | No | {color, bold, fontSize, font, underline, alignment} |

---

### addBookmark

Add a named bookmark for cross-references

**Module:** `docx` | **Returns:** `boolean` -- true

```robinpath
docx.addBookmark $doc "section1" "Introduction" { "bold": true }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `name` | `string` | Yes | Bookmark name |
| `text` | `string` | Yes | Bookmark text |
| `options` | `object` | No | {bold, fontSize, font, color} |

---

### addTableOfContents

Add an auto-generated table of contents from headings

**Module:** `docx` | **Returns:** `boolean` -- true

```robinpath
docx.addTableOfContents $doc { "heading": "Contents", "headingRange": "1-3" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `options` | `object` | No | {heading, hyperlink, headingRange} |

---

### addFootnote

Add a footnote reference in text with footnote content at bottom

**Module:** `docx` | **Returns:** `number` -- Footnote ID

```robinpath
docx.addFootnote $doc "See reference" "Source: IEEE 2024 paper" {}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `text` | `string` | Yes | Paragraph text |
| `footnoteText` | `string` | Yes | Footnote content |
| `options` | `object` | No | {bold, fontSize, font, color, alignment} |

---

### addComment

Add a comment annotation on a text range

**Module:** `docx` | **Returns:** `number` -- Comment ID

```robinpath
docx.addComment $doc "This needs review" "Please verify the figures" { "author": "Editor" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `text` | `string` | Yes | Commented text |
| `commentText` | `string` | Yes | Comment content |
| `options` | `object` | No | {author, bold, fontSize} |

---

### addSection

Add a new document section with separate formatting (orientation, columns, margins)

**Module:** `docx` | **Returns:** `number` -- Section index

```robinpath
docx.addSection $doc { "orientation": "landscape", "type": "nextPage" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `options` | `object` | No | {type: nextPage/continuous/evenPage/oddPage, orientation, columns, margins} |

---

### setDocProperties

Set document metadata properties (title, author, keywords)

**Module:** `docx` | **Returns:** `boolean` -- true

```robinpath
docx.setDocProperties $doc { "title": "Annual Report", "author": "Finance Dept" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `options` | `object` | Yes | {title, author, subject, keywords, description} |

---

### addDocStyle

Define a reusable named paragraph or character style

**Module:** `docx` | **Returns:** `boolean` -- true

```robinpath
docx.addDocStyle $doc "Code Block" { "font": "Courier New", "fontSize": 10, "color": "333333" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `styleName` | `string` | Yes | Style name |
| `options` | `object` | No | {type, font, fontSize, bold, italic, color, alignment, spacing, basedOn} |

---

### addHeader

Add a custom header to the current section

**Module:** `docx` | **Returns:** `boolean` -- true

```robinpath
docx.addHeader $doc "Company Report 2026" { "alignment": "right", "fontSize": 9 }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `text` | `string` | Yes | Header text |
| `options` | `object` | No | {type: default/first/even, alignment, bold, fontSize, font, color} |

---

### addFooter

Add a custom footer with optional page numbers

**Module:** `docx` | **Returns:** `boolean` -- true

```robinpath
docx.addFooter $doc "Confidential" { "pageNumbers": true, "alignment": "center" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `text` | `string` | Yes | Footer text |
| `options` | `object` | No | {type: default/first/even, alignment, pageNumbers, pageNumberAlignment} |

---

### patchDoc

Modify an existing .docx by replacing placeholders with new content

**Module:** `docx` | **Returns:** `Object` -- {path}

```robinpath
docx.patchDoc "./template.docx" "./output.docx" { "{{NAME}}": "John", "{{DATE}}": "2026-01-15" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `inputPath` | `string` | Yes | Path to existing .docx |
| `outputPath` | `string` | Yes | Output .docx path |
| `patches` | `object` | Yes | {"{{PLACEHOLDER}}": "replacement text"} |
| `options` | `object` | No | {keepStyles} |

---

### addCheckbox

Add a checkbox with label text

**Module:** `docx` | **Returns:** `boolean` -- true

```robinpath
docx.addCheckbox $doc "I agree to the terms" { "checked": false }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `label` | `string` | Yes | Checkbox label |
| `options` | `object` | No | {checked: bool, bold, fontSize, font, color} |

---

### saveDoc

Save the Word document to a .docx file

**Module:** `docx` | **Returns:** `Object` -- {path, size}

```robinpath
docx.saveDoc $doc "./report.docx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `filePath` | `string` | Yes | Output .docx path |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| Document not found | Invalid document ID |
| File not found | .docx file does not exist at path |
| Invalid format | Corrupted or non-OOXML file |

```robinpath
@desc "Create document with error handling"
do
  set $doc as docx.createDoc "report"
  if $doc != null
    docx.addHeading $doc "My Report" 1
    docx.saveDoc $doc "./report.docx"
    print "Document saved"
  else
    print "Failed to create document"
  end
enddo
```

## Recipes

### 1. Create a full business report

Build a complete Word document with headings, paragraphs, table, and formatting.

```robinpath
@desc "Generate a quarterly sales report"
do
  set $doc as docx.createDoc "q4-report" { "margins": { "top": 1, "bottom": 1, "left": 1.25, "right": 1.25 } }
  docx.setDocProperties $doc { "title": "Q4 Sales Report", "author": "Sales Team" }
  docx.addHeader $doc "Q4 2026 Sales Report" { "alignment": "right", "fontSize": 9 }
  docx.addFooter $doc "Confidential" { "pageNumbers": true, "alignment": "center" }
  docx.addHeading $doc "Quarterly Sales Report" 1 { "color": "#2196F3", "alignment": "center" }
  docx.addParagraph $doc "This report covers sales performance for Q4 2026." { "fontSize": 12, "spacing": { "after": 200 } }
  docx.addHeading $doc "Revenue Summary" 2
  set $data as [
    { "Region": "North", "Revenue": "$1.2M", "Growth": "+15%" },
    { "Region": "South", "Revenue": "$890K", "Growth": "+8%" },
    { "Region": "West", "Revenue": "$1.5M", "Growth": "+22%" }
  ]
  docx.addTable $doc $data { "headerStyle": { "fillColor": "#2196F3", "fontColor": "#FFFFFF" }, "alternateRows": true }
  docx.addPageBreak $doc
  docx.addHeading $doc "Key Takeaways" 2
  docx.addList $doc ["West region leads with 22% growth", "Overall revenue up 15% YoY", "New product line contributed 30% of growth"] { "ordered": false }
  docx.saveDoc $doc "./q4-report.docx"
  print "Report saved to q4-report.docx"
enddo
```

### 2. Read and extract text from a document

Read an existing .docx and process its content.

```robinpath
@desc "Extract text from a contract"
do
  set $content as docx.readDoc "./contract.docx" "text"
  set $lines as string.split $content "\n"
  print "Document has " + array.length $lines + " lines"
  each $line in $lines
    if string.contains $line "Term"
      print "Found: " + $line
    end
  endeach
enddo
```

### 3. Template-based document generation

Use patchDoc to fill in a template with dynamic data.

```robinpath
@desc "Generate contract from template"
do
  set $patches as {
    "{{CLIENT_NAME}}": "Acme Corp",
    "{{DATE}}": "2026-03-13",
    "{{AMOUNT}}": "$50,000",
    "{{TERMS}}": "Net 30"
  }
  set $result as docx.patchDoc "./contract-template.docx" "./contract-acme.docx" $patches
  print "Contract generated at: " + $result.path
enddo
```

### 4. Document with images and styles

Create a styled document with custom formatting and images.

```robinpath
@desc "Create a product catalog page"
do
  set $doc as docx.createDoc "catalog"
  docx.addDocStyle $doc "ProductTitle" { "font": "Arial", "fontSize": 16, "bold": true, "color": "#333333" }
  docx.addDocStyle $doc "Price" { "font": "Arial", "fontSize": 14, "color": "#27ae60", "bold": true }
  docx.addHeading $doc "Product Catalog 2026" 1 { "alignment": "center" }
  docx.addImage $doc "./product-photo.jpg" { "width": 400, "height": 300, "alignment": "center" }
  docx.addParagraph $doc "Premium Widget Pro" { "bold": true, "fontSize": 16 }
  docx.addParagraph $doc "$99.99" { "color": "#27ae60", "bold": true, "fontSize": 14 }
  docx.addParagraph $doc "Our flagship product with advanced features and premium build quality."
  docx.addCheckbox $doc "In Stock" { "checked": true }
  docx.saveDoc $doc "./catalog.docx"
  print "Catalog saved"
enddo
```

## Related Modules

- **pptx** -- PowerPoint presentation creation
- **pdf** -- PDF document generation
- **excel** -- Excel spreadsheet creation
- **file** -- File system operations
