# @robinpath/office

> Enterprise Microsoft Office suite — Word (.docx), Excel (.xlsx), PowerPoint (.pptx) with 57 functions: hyperlinks, TOC, footnotes, comments, sections, headers/footers, doc patching, conditional formatting, data validation, sheet protection, slide masters, and more

![Category](https://img.shields.io/badge/category-Documents-blue) ![Functions](https://img.shields.io/badge/functions-57-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `office` module lets you:

- Create a new Word document
- Read text or HTML from an existing Word document
- Add a heading with level and formatting
- Add a paragraph with rich text formatting
- Add a table with full styling (headers, borders, colors, widths)

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/office
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
office.readDoc "./contract.docx" "text" into $content
```

## Available Functions

| Function | Description |
|----------|-------------|
| `office.createDoc` | Create a new Word document |
| `office.readDoc` | Read text or HTML from an existing Word document |
| `office.addHeading` | Add a heading with level and formatting |
| `office.addParagraph` | Add a paragraph with rich text formatting |
| `office.addTable` | Add a table with full styling (headers, borders, colors, widths) |
| `office.addImage` | Add an image to the document |
| `office.addPageBreak` | Add a page break |
| `office.addList` | Add a bulleted or numbered list |
| `office.addHyperlink` | Add a clickable hyperlink to the document |
| `office.addBookmark` | Add a named bookmark for cross-references |
| `office.addTableOfContents` | Add an auto-generated table of contents from headings |
| `office.addFootnote` | Add a footnote reference in text with footnote content at bottom |
| `office.addComment` | Add a comment annotation on a text range |
| `office.addSection` | Add a new document section with separate formatting (orientation, columns, margins) |
| `office.setDocProperties` | Set document metadata properties (title, author, keywords) |
| `office.addDocStyle` | Define a reusable named paragraph or character style |
| `office.addHeader` | Add a custom header to the current section |
| `office.addFooter` | Add a custom footer with optional page numbers |
| `office.patchDoc` | Modify an existing .docx by replacing placeholders with new content |
| `office.addCheckbox` | Add a checkbox with label text |
| `office.saveDoc` | Save the Word document to a .docx file |
| `office.createSheet` | Create a new Excel workbook |
| `office.readSheet` | Read data from an existing Excel file |
| `office.addRow` | Add a row with optional styling |
| `office.writeData` | Write array of objects to sheet with auto-headers and styling |
| `office.writeCell` | Write a value to a specific cell with formatting |
| `office.styleRange` | Apply formatting to a range of cells |
| `office.addFormula` | Add a formula to a cell |
| `office.setColumnWidth` | Set column widths |
| `office.mergeCells` | Merge a range of cells |
| `office.loadSheet` | Load an existing Excel file for editing |
| `office.addWorksheet` | Add a new worksheet to an existing workbook |
| `office.freezePanes` | Freeze header rows and/or columns |
| `office.setAutoFilter` | Add filter dropdowns on header columns |
| `office.addConditionalFormat` | Add conditional formatting rules (color scales, data bars, icon sets, cell rules) |
| `office.addDataValidation` | Add data validation (dropdowns, number/date constraints) to a cell |
| `office.addCellComment` | Add a comment/note to a cell |
| `office.addSheetImage` | Embed an image in a spreadsheet |
| `office.addNamedRange` | Define a named range for formulas |
| `office.protectSheet` | Protect a worksheet with a password and permission options |
| `office.hideRowsColumns` | Hide or show rows and columns |
| `office.saveSheet` | Save the workbook to an .xlsx file |
| `office.createSlides` | Create a new PowerPoint presentation |
| `office.addSlide` | Add a slide with optional title/subtitle and background |
| `office.addSlideText` | Add a text box to a slide with full formatting |
| `office.addSlideImage` | Add an image to a slide with positioning |
| `office.addSlideTable` | Add a data table to a slide with styling |
| `office.addSlideChart` | Add a chart to a slide |
| `office.addSlideShape` | Add a shape to a slide |
| `office.addSlideNotes` | Add speaker notes to a slide |
| `office.addSlideMultiText` | Add rich text with mixed formatting (bold/italic/color) in one text box |
| `office.setSlideNumber` | Add a slide number to a slide |
| `office.defineSlideMaster` | Define a reusable slide master template with logo, background, and placeholders |
| `office.addSlideFromMaster` | Create a new slide from a defined master template |
| `office.saveSlides` | Save the presentation to a .pptx file |
| `office.setSheetPrint` | Configure print layout: paper size, orientation, print area, margins |
| `office.groupRows` | Group rows (or columns) into collapsible outline groups |

## Examples

### Read text or HTML from an existing Word document

```robinpath
office.readDoc "./contract.docx" "text" into $content
```

### Add a heading with level and formatting

```robinpath
office.addHeading $doc "Sales Report" 1 {"color": "#2196F3", "alignment": "center"}
```

### Add a paragraph with rich text formatting

```robinpath
office.addParagraph $doc "Revenue increased by 23%" {"bold": true, "fontSize": 12, "alignment": "justify", "spacing": {"after": 200}}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/office";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  office.readDoc "./contract.docx" "text" into $content
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/pdf`](../pdf) — PDF module for complementary functionality
- [`@robinpath/excel`](../excel) — Excel module for complementary functionality
- [`@robinpath/docusign`](../docusign) — DocuSign module for complementary functionality
- [`@robinpath/pandadoc`](../pandadoc) — PandaDoc module for complementary functionality
- [`@robinpath/hellosign`](../hellosign) — HelloSign module for complementary functionality

## License

MIT
