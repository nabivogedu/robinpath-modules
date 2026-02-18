---
title: "Office"
module: "office"
package: "@robinpath/office"
description: "Enterprise Microsoft Office suite — Word (.docx), Excel (.xlsx), PowerPoint (.pptx) with 57 functions: hyperlinks, TOC, footnotes, comments, sections, headers/footers, doc patching, conditional formatting, data validation, sheet protection, slide masters, and more"
category: "documents"
tags: [office, documents]
type: "integration"
auth: "none"
functionCount: 57
---

# Office

> Enterprise Microsoft Office suite — Word (.docx), Excel (.xlsx), PowerPoint (.pptx) with 57 functions: hyperlinks, TOC, footnotes, comments, sections, headers/footers, doc patching, conditional formatting, data validation, sheet protection, slide masters, and more

**Package:** `@robinpath/office` | **Category:** Documents | **Type:** Integration


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `office` module when you need to:

- **Create a new Word document** -- Use `office.createDoc` to perform this operation
- **Read text or HTML from an existing Word document** -- Use `office.readDoc` to perform this operation
- **Add a heading with level and formatting** -- Use `office.addHeading` to perform this operation
- **Add a paragraph with rich text formatting** -- Use `office.addParagraph` to perform this operation
- **Add a table with full styling (headers, borders, colors, widths)** -- Use `office.addTable` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`createDoc`](#createdoc) | Create a new Word document | `Document ID` |
| [`readDoc`](#readdoc) | Read text or HTML from an existing Word document | `Document content as text or HTML` |
| [`addHeading`](#addheading) | Add a heading with level and formatting | `true` |
| [`addParagraph`](#addparagraph) | Add a paragraph with rich text formatting | `true` |
| [`addTable`](#addtable) | Add a table with full styling (headers, borders, colors, widths) | `true` |
| [`addImage`](#addimage) | Add an image to the document | `true` |
| [`addPageBreak`](#addpagebreak) | Add a page break | `true` |
| [`addList`](#addlist) | Add a bulleted or numbered list | `true` |
| [`addHyperlink`](#addhyperlink) | Add a clickable hyperlink to the document | `true` |
| [`addBookmark`](#addbookmark) | Add a named bookmark for cross-references | `true` |
| [`addTableOfContents`](#addtableofcontents) | Add an auto-generated table of contents from headings | `true` |
| [`addFootnote`](#addfootnote) | Add a footnote reference in text with footnote content at bottom | `Footnote ID` |
| [`addComment`](#addcomment) | Add a comment annotation on a text range | `Comment ID` |
| [`addSection`](#addsection) | Add a new document section with separate formatting (orientation, columns, margins) | `Section index` |
| [`setDocProperties`](#setdocproperties) | Set document metadata properties (title, author, keywords) | `true` |
| [`addDocStyle`](#adddocstyle) | Define a reusable named paragraph or character style | `true` |
| [`addHeader`](#addheader) | Add a custom header to the current section | `true` |
| [`addFooter`](#addfooter) | Add a custom footer with optional page numbers | `true` |
| [`patchDoc`](#patchdoc) | Modify an existing .docx by replacing placeholders with new content | `{path}` |
| [`addCheckbox`](#addcheckbox) | Add a checkbox with label text | `true` |
| [`saveDoc`](#savedoc) | Save the Word document to a .docx file | `{path, size}` |
| [`createSheet`](#createsheet) | Create a new Excel workbook | `Workbook ID` |
| [`readSheet`](#readsheet) | Read data from an existing Excel file | `Array of row objects (header row becomes keys)` |
| [`addRow`](#addrow) | Add a row with optional styling | `Row number` |
| [`writeData`](#writedata) | Write array of objects to sheet with auto-headers and styling | `Number of rows written` |
| [`writeCell`](#writecell) | Write a value to a specific cell with formatting | `true` |
| [`styleRange`](#stylerange) | Apply formatting to a range of cells | `true` |
| [`addFormula`](#addformula) | Add a formula to a cell | `true` |
| [`setColumnWidth`](#setcolumnwidth) | Set column widths | `true` |
| [`mergeCells`](#mergecells) | Merge a range of cells | `true` |
| [`loadSheet`](#loadsheet) | Load an existing Excel file for editing | `Workbook ID` |
| [`addWorksheet`](#addworksheet) | Add a new worksheet to an existing workbook | `Sheet name` |
| [`freezePanes`](#freezepanes) | Freeze header rows and/or columns | `true` |
| [`setAutoFilter`](#setautofilter) | Add filter dropdowns on header columns | `true` |
| [`addConditionalFormat`](#addconditionalformat) | Add conditional formatting rules (color scales, data bars, icon sets, cell rules) | `true` |
| [`addDataValidation`](#adddatavalidation) | Add data validation (dropdowns, number/date constraints) to a cell | `true` |
| [`addCellComment`](#addcellcomment) | Add a comment/note to a cell | `true` |
| [`addSheetImage`](#addsheetimage) | Embed an image in a spreadsheet | `true` |
| [`addNamedRange`](#addnamedrange) | Define a named range for formulas | `true` |
| [`protectSheet`](#protectsheet) | Protect a worksheet with a password and permission options | `true` |
| [`hideRowsColumns`](#hiderowscolumns) | Hide or show rows and columns | `true` |
| [`saveSheet`](#savesheet) | Save the workbook to an .xlsx file | `{path}` |
| [`createSlides`](#createslides) | Create a new PowerPoint presentation | `Presentation ID` |
| [`addSlide`](#addslide) | Add a slide with optional title/subtitle and background | `Slide index` |
| [`addSlideText`](#addslidetext) | Add a text box to a slide with full formatting | `true` |
| [`addSlideImage`](#addslideimage) | Add an image to a slide with positioning | `true` |
| [`addSlideTable`](#addslidetable) | Add a data table to a slide with styling | `true` |
| [`addSlideChart`](#addslidechart) | Add a chart to a slide | `true` |
| [`addSlideShape`](#addslideshape) | Add a shape to a slide | `true` |
| [`addSlideNotes`](#addslidenotes) | Add speaker notes to a slide | `true` |
| [`addSlideMultiText`](#addslidemultitext) | Add rich text with mixed formatting (bold/italic/color) in one text box | `true` |
| [`setSlideNumber`](#setslidenumber) | Add a slide number to a slide | `true` |
| [`defineSlideMaster`](#defineslidemaster) | Define a reusable slide master template with logo, background, and placeholders | `true` |
| [`addSlideFromMaster`](#addslidefrommaster) | Create a new slide from a defined master template | `Slide index` |
| [`saveSlides`](#saveslides) | Save the presentation to a .pptx file | `{path}` |
| [`setSheetPrint`](#setsheetprint) | Configure print layout: paper size, orientation, print area, margins | `true` |
| [`groupRows`](#grouprows) | Group rows (or columns) into collapsible outline groups | `true` |


## Functions

### createDoc

Create a new Word document

**Module:** `office` | **Returns:** `string` -- Document ID

```robinpath
office.createDoc "report" {"margins": {"top": 1, "bottom": 1}} into $doc
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Document ID |
| `options` | `object` | No | {margins: {top, bottom, left, right}} |

---

### readDoc

Read text or HTML from an existing Word document

**Module:** `office` | **Returns:** `string` -- Document content as text or HTML

```robinpath
office.readDoc "./contract.docx" "text" into $content
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to .docx file |
| `format` | `string` | No | 'text' (default) or 'html' |

---

### addHeading

Add a heading with level and formatting

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addHeading $doc "Sales Report" 1 {"color": "#2196F3", "alignment": "center"}
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

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addParagraph $doc "Revenue increased by 23%" {"bold": true, "fontSize": 12, "alignment": "justify", "spacing": {"after": 200}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `text` | `string` | Yes | Paragraph text |
| `options` | `object` | No | {bold, italic, underline, fontSize, font, color, alignment, spacing, indent, runs: [{text, bold, color}]} |

---

### addTable

Add a table with full styling (headers, borders, colors, widths)

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addTable $doc $data {"headerStyle": {"fillColor": "#2196F3", "fontColor": "#FFFFFF"}, "alternateRows": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `data` | `array` | Yes | Array of objects or array of arrays |
| `options` | `object` | No | {headerStyle: {bold, fillColor, fontColor}, cellStyle, columnWidths, borders, alternateRows} |

---

### addImage

Add an image to the document

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addImage $doc "./chart.png" {"width": 500, "height": 300, "alignment": "center"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `imagePath` | `string` | Yes | Path to image file |
| `options` | `object` | No | {width, height, alignment} |

---

### addPageBreak

Add a page break

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addPageBreak $doc
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |

---

### addList

Add a bulleted or numbered list

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addList $doc ["Item 1", "Item 2", "Item 3"] {"ordered": true, "fontSize": 11}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `items` | `array` | Yes | Array of strings |
| `options` | `object` | No | {ordered: bool, bold, fontSize, font, color} |

---

### addHyperlink

Add a clickable hyperlink to the document

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addHyperlink $doc "Visit our site" "https://example.com" {"bold": true}
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

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addBookmark $doc "section1" "Introduction" {"bold": true}
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

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addTableOfContents $doc {"heading": "Contents", "headingRange": "1-3"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `options` | `object` | No | {heading, hyperlink, headingRange: '1-5'} |

---

### addFootnote

Add a footnote reference in text with footnote content at bottom

**Module:** `office` | **Returns:** `number` -- Footnote ID

```robinpath
office.addFootnote $doc "See reference" "Source: IEEE 2024 paper" {}
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

**Module:** `office` | **Returns:** `number` -- Comment ID

```robinpath
office.addComment $doc "This needs review" "Please verify the figures" {"author": "Editor"}
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

**Module:** `office` | **Returns:** `number` -- Section index

```robinpath
office.addSection $doc {"orientation": "landscape", "type": "nextPage"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `options` | `object` | No | {type: nextPage|continuous|evenPage|oddPage, orientation: portrait|landscape, columns, margins} |

---

### setDocProperties

Set document metadata properties (title, author, keywords)

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.setDocProperties $doc {"title": "Annual Report", "author": "Finance Dept"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `options` | `object` | Yes | {title, author, subject, keywords, description} |

---

### addDocStyle

Define a reusable named paragraph or character style

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addDocStyle $doc "Code Block" {"font": "Courier New", "fontSize": 10, "color": "333333"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `styleName` | `string` | Yes | Style name |
| `options` | `object` | No | {type: paragraph|character, font, fontSize, bold, italic, color, alignment, spacing, basedOn} |

---

### addHeader

Add a custom header to the current section

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addHeader $doc "Company Report 2026" {"alignment": "right", "fontSize": 9}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `text` | `string` | Yes | Header text |
| `options` | `object` | No | {type: default|first|even, alignment, bold, fontSize, font, color} |

---

### addFooter

Add a custom footer with optional page numbers

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addFooter $doc "Confidential" {"pageNumbers": true, "alignment": "center"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `text` | `string` | Yes | Footer text |
| `options` | `object` | No | {type: default|first|even, alignment, pageNumbers: bool, pageNumberAlignment} |

---

### patchDoc

Modify an existing .docx by replacing placeholders with new content

**Module:** `office` | **Returns:** `object` -- {path}

```robinpath
office.patchDoc "./template.docx" "./output.docx" {"{{NAME}}": "John", "{{DATE}}": "2026-01-15"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `inputPath` | `string` | Yes | Path to existing .docx |
| `outputPath` | `string` | Yes | Output .docx path |
| `patches` | `object` | Yes | {"{{PLACEHOLDER}}": "replacement text"} or {"{{KEY}}": {runs: [{text, bold, color}]}} |
| `options` | `object` | No | {keepStyles} |

---

### addCheckbox

Add a checkbox with label text

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addCheckbox $doc "I agree to the terms" {"checked": false}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `label` | `string` | Yes | Checkbox label |
| `options` | `object` | No | {checked: bool, bold, fontSize, font, color} |

---

### saveDoc

Save the Word document to a .docx file

**Module:** `office` | **Returns:** `object` -- {path, size}

```robinpath
office.saveDoc $doc "./report.docx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `docId` | `string` | Yes | Document ID |
| `filePath` | `string` | Yes | Output .docx path |

---

### createSheet

Create a new Excel workbook

**Module:** `office` | **Returns:** `string` -- Workbook ID

```robinpath
office.createSheet "data" {"sheetName": "Products"} into $wb
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Workbook ID |
| `options` | `object` | No | {creator, title, sheetName} |

---

### readSheet

Read data from an existing Excel file

**Module:** `office` | **Returns:** `array` -- Array of row objects (header row becomes keys)

```robinpath
office.readSheet "./data.xlsx" "Sheet1" into $rows
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to .xlsx file |
| `sheetName` | `string` | No | Sheet name (optional, defaults to first) |

---

### addRow

Add a row with optional styling

**Module:** `office` | **Returns:** `number` -- Row number

```robinpath
office.addRow $wb "Sheet1" ["Name", "Price"] {"bold": true, "fillColor": "#2196F3", "color": "#FFFFFF"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `sheet` | `string` | Yes | Sheet name |
| `values` | `array` | Yes | Row values |
| `options` | `object` | No | {bold, fontSize, color, fillColor, alignment, borders} |

---

### writeData

Write array of objects to sheet with auto-headers and styling

**Module:** `office` | **Returns:** `number` -- Number of rows written

```robinpath
office.writeData $wb "Sheet1" $products {"headerStyle": {"fillColor": "#FF5722", "bold": true}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `sheet` | `string` | Yes | Sheet name |
| `data` | `array` | Yes | Array of objects |
| `options` | `object` | No | {headerStyle, cellStyle, columnWidths, autoWidth} |

---

### writeCell

Write a value to a specific cell with formatting

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.writeCell $wb "A1" "Total:" {"bold": true, "fontSize": 14}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `cell` | `string` | Yes | Cell reference (e.g. A1) |
| `value` | `any` | Yes | Cell value |
| `options` | `object` | No | {sheet, bold, fontSize, color, fillColor, alignment, borders, numberFormat} |

---

### styleRange

Apply formatting to a range of cells

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.styleRange $wb "A1:D1" {"bold": true, "fillColor": "#2196F3", "color": "#FFFFFF"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `range` | `string` | Yes | Cell range (e.g. A1:D10) |
| `options` | `object` | Yes | {sheet, bold, fontSize, color, fillColor, alignment, borders} |

---

### addFormula

Add a formula to a cell

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addFormula $wb "B11" "SUM(B2:B10)" {"bold": true, "numberFormat": "#,##0.00"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `cell` | `string` | Yes | Cell reference |
| `formula` | `string` | Yes | Excel formula (e.g. SUM(A1:A10)) |
| `options` | `object` | No | {sheet, bold, numberFormat} |

---

### setColumnWidth

Set column widths

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.setColumnWidth $wb {"A": 25, "B": 15, "C": 40}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `columns` | `object` | Yes | Column widths object {A: 20, B: 30} |
| `options` | `object` | No | {sheet} |

---

### mergeCells

Merge a range of cells

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.mergeCells $wb "A1:D1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `range` | `string` | Yes | Cell range (e.g. A1:D1) |
| `options` | `object` | No | {sheet} |

---

### loadSheet

Load an existing Excel file for editing

**Module:** `office` | **Returns:** `string` -- Workbook ID

```robinpath
office.loadSheet "./data.xlsx" "wb1" into $wb
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to .xlsx file |
| `id` | `string` | No | Workbook ID |

---

### addWorksheet

Add a new worksheet to an existing workbook

**Module:** `office` | **Returns:** `string` -- Sheet name

```robinpath
office.addWorksheet $wb "Revenue" {"tabColor": "#FF5722"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `name` | `string` | Yes | Sheet name |
| `options` | `object` | No | {tabColor} |

---

### freezePanes

Freeze header rows and/or columns

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.freezePanes $wb 1 0 {"sheet": "Sheet1"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `rows` | `number` | Yes | Number of rows to freeze |
| `cols` | `number` | No | Number of columns to freeze |
| `options` | `object` | No | {sheet} |

---

### setAutoFilter

Add filter dropdowns on header columns

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.setAutoFilter $wb "A1:D1" {"sheet": "Products"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `range` | `string` | Yes | Range for filter (e.g. A1:D1) |
| `options` | `object` | No | {sheet} |

---

### addConditionalFormat

Add conditional formatting rules (color scales, data bars, icon sets, cell rules)

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addConditionalFormat $wb "B2:B20" [{"type": "cellIs", "operator": "greaterThan", "value": 100, "fillColor": "#00FF00"}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `range` | `string` | Yes | Cell range |
| `rules` | `array` | Yes | Rules: [{type: cellIs|colorScale|dataBar|iconSet, operator, value, fillColor}] |
| `options` | `object` | No | {sheet} |

---

### addDataValidation

Add data validation (dropdowns, number/date constraints) to a cell

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addDataValidation $wb "C2" {"type": "list", "values": ["Active", "Inactive", "Pending"], "sheet": "Sheet1"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `cellRef` | `string` | Yes | Cell reference |
| `options` | `object` | Yes | {sheet, type: list|whole|decimal|date, values: [...], min, max, operator, error, prompt} |

---

### addCellComment

Add a comment/note to a cell

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addCellComment $wb "A1" "This value needs verification" {"author": "Reviewer"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `cellRef` | `string` | Yes | Cell reference |
| `text` | `string` | Yes | Comment text |
| `options` | `object` | No | {sheet, author} |

---

### addSheetImage

Embed an image in a spreadsheet

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addSheetImage $wb "./chart.png" "E1:H10" {"sheet": "Sheet1"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `imagePath` | `string` | Yes | Path to image file |
| `range` | `string` | No | Cell range (e.g. A1:D10) or empty for position |
| `options` | `object` | No | {sheet, col, row, width, height} |

---

### addNamedRange

Define a named range for formulas

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addNamedRange $wb "Prices" "$B$2:$B$100" {"sheet": "Products"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `name` | `string` | Yes | Range name |
| `range` | `string` | Yes | Cell range (e.g. $A$1:$A$10) |
| `options` | `object` | No | {sheet} |

---

### protectSheet

Protect a worksheet with a password and permission options

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.protectSheet $wb "secret123" {"sheet": "Sheet1", "selectLockedCells": true, "sort": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `password` | `string` | Yes | Protection password |
| `options` | `object` | No | {sheet, selectLockedCells, formatCells, insertRows, deleteRows, sort, autoFilter} |

---

### hideRowsColumns

Hide or show rows and columns

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.hideRowsColumns $wb {"rows": [5, 6], "columns": ["D"]} {"sheet": "Sheet1"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `targets` | `object` | Yes | {rows: [1,2,3], columns: ['C','D']} |
| `options` | `object` | No | {sheet, hidden: bool} |

---

### saveSheet

Save the workbook to an .xlsx file

**Module:** `office` | **Returns:** `object` -- {path}

```robinpath
office.saveSheet $wb "./data.xlsx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `filePath` | `string` | Yes | Output .xlsx path |

---

### createSlides

Create a new PowerPoint presentation

**Module:** `office` | **Returns:** `string` -- Presentation ID

```robinpath
office.createSlides "deck" {"title": "Q4 Report"} into $ppt
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Presentation ID |
| `options` | `object` | No | {title, author, layout} |

---

### addSlide

Add a slide with optional title/subtitle and background

**Module:** `office` | **Returns:** `number` -- Slide index

```robinpath
office.addSlide $ppt {"title": "Overview", "subtitle": "Q4 2026", "backgroundColor": "#1a1a2e"} into $slideIdx
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `options` | `object` | No | {title, subtitle, titleSize, backgroundColor} |

---

### addSlideText

Add a text box to a slide with full formatting

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addSlideText $ppt 0 "Revenue: +23%" {"x": 1, "y": 3, "fontSize": 24, "bold": true, "color": "#27ae60"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `slideIndex` | `number` | Yes | Slide index |
| `text` | `string` | Yes | Text content |
| `options` | `object` | No | {x, y, w, h, fontSize, font, bold, italic, color, alignment, fillColor, bullet, lineSpacing} |

---

### addSlideImage

Add an image to a slide with positioning

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addSlideImage $ppt 0 "./chart.png" {"x": 1, "y": 2, "w": 6, "h": 4}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `slideIndex` | `number` | Yes | Slide index |
| `imagePath` | `string` | Yes | Path to image |
| `options` | `object` | No | {x, y, w, h, rounding, hyperlink} |

---

### addSlideTable

Add a data table to a slide with styling

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addSlideTable $ppt 1 $data {"headerStyle": {"fillColor": "#2196F3"}, "alternateRows": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `slideIndex` | `number` | Yes | Slide index |
| `data` | `array` | Yes | Array of objects or arrays |
| `options` | `object` | No | {x, y, w, headerStyle, cellStyle, columnWidths, alternateRows, borders} |

---

### addSlideChart

Add a chart to a slide

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addSlideChart $ppt 2 $chartData {"type": "bar", "title": "Sales by Region"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `slideIndex` | `number` | Yes | Slide index |
| `chartData` | `array` | Yes | Chart data series [{name, labels, values}] |
| `options` | `object` | No | {type: bar|line|pie|doughnut|area, x, y, w, h, title, legend, showValues} |

---

### addSlideShape

Add a shape to a slide

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addSlideShape $ppt 0 {"shape": "rect", "x": 0, "y": 0, "w": 10, "h": 0.5, "fillColor": "#2196F3"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `slideIndex` | `number` | Yes | Slide index |
| `options` | `object` | No | {shape: rect|ellipse|roundRect|line|triangle, x, y, w, h, fillColor, lineColor, lineWidth} |

---

### addSlideNotes

Add speaker notes to a slide

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addSlideNotes $ppt 0 "Remember to mention Q4 targets"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `slideIndex` | `number` | Yes | Slide index |
| `text` | `string` | Yes | Speaker notes text |

---

### addSlideMultiText

Add rich text with mixed formatting (bold/italic/color) in one text box

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.addSlideMultiText $ppt 0 [{"text": "Revenue: ", "bold": true}, {"text": "+23%", "color": "#27ae60", "bold": true}] {"x": 1, "y": 3}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `slideIndex` | `number` | Yes | Slide index |
| `runs` | `array` | Yes | Array of text runs [{text, bold, italic, color, fontSize, font, hyperlink}] |
| `options` | `object` | No | {x, y, w, h, alignment, fillColor, lineSpacing, margin} |

---

### setSlideNumber

Add a slide number to a slide

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.setSlideNumber $ppt 0 {"x": 9.5, "y": "95%", "color": "#888888", "fontSize": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `slideIndex` | `number` | Yes | Slide index |
| `options` | `object` | No | {x, y, color, fontSize} |

---

### defineSlideMaster

Define a reusable slide master template with logo, background, and placeholders

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.defineSlideMaster $ppt "BRAND" {"bgColor": "#FFFFFF", "objects": [{"rect": {"x": 0, "y": 0, "w": "100%", "h": 0.5, "fillColor": "#003366"}}]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `name` | `string` | Yes | Master template name |
| `options` | `object` | No | {background, bgColor, margin, slideNumber, objects: [{rect: {...}}, {text: {...}}, {image: {...}}]} |

---

### addSlideFromMaster

Create a new slide from a defined master template

**Module:** `office` | **Returns:** `number` -- Slide index

```robinpath
office.addSlideFromMaster $ppt "BRAND" {} into $slideIdx
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `masterName` | `string` | Yes | Master template name |
| `options` | `object` | No | {backgroundColor} |

---

### saveSlides

Save the presentation to a .pptx file

**Module:** `office` | **Returns:** `object` -- {path}

```robinpath
office.saveSlides $ppt "./presentation.pptx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `filePath` | `string` | Yes | Output .pptx path |

---

### setSheetPrint

Configure print layout: paper size, orientation, print area, margins

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.setSheetPrint $wb {"sheet": "Sheet1", "paperSize": 9, "orientation": "landscape", "printArea": "A1:F20"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `options` | `object` | Yes | {sheet, paperSize: 9=A4, orientation, fitToPage, fitToWidth, fitToHeight, printArea, margins: {left, right, top, bottom, header, footer}, printTitlesRow} |

---

### groupRows

Group rows (or columns) into collapsible outline groups

**Module:** `office` | **Returns:** `boolean` -- true

```robinpath
office.groupRows $wb 2 10 {"sheet": "Sheet1", "collapsed": false}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `start` | `number` | Yes | Start row number |
| `end` | `number` | Yes | End row number |
| `options` | `object` | No | {sheet, level, collapsed, columns: {start, end, level}} |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Table data must be a non-empty array` | Check the error message for details |
| `List items must be an array` | Check the error message for details |
| `Worksheet not found` | Check the error message for details |
| `Slide ${slideIdx} not found` | Check the error message for details |
| `Table data required` | Check the error message for details |
| `runs must be an array of text run objects` | Check the error message for details |
| `Document "..." not found` | Check the error message for details |
| `Workbook "..." not found` | Check the error message for details |

```robinpath
set $result as office.createDoc "report" {"margins": {"top": 1, "bottom": 1}} into $doc
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with createDoc

Create a new resource and capture the result.

```robinpath
set $result as office.createDoc "report" {"margins": {"top": 1, "bottom": 1}} into $doc
print "Created: " + $result
```

### 2. Multi-step Office workflow

Chain multiple office operations together.

```robinpath
set $r_createDoc as office.createDoc "report" {"margins": {"top": 1, "bottom": 1}} into $doc
set $r_readDoc as office.readDoc "./contract.docx" "text" into $content
set $r_addHeading as office.addHeading $doc "Sales Report" 1 {"color": "#2196F3", "alignment": "center"}
print "All operations complete"
```

### 3. Safe createDoc with validation

Check results before proceeding.

```robinpath
set $result as office.createDoc "report" {"margins": {"top": 1, "bottom": 1}} into $doc
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **pdf** -- PDF module for complementary functionality
- **excel** -- Excel module for complementary functionality
- **docusign** -- DocuSign module for complementary functionality
- **pandadoc** -- PandaDoc module for complementary functionality
- **hellosign** -- HelloSign module for complementary functionality
