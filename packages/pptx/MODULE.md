---
title: "Pptx"
module: "pptx"
package: "@robinpath/pptx"
description: "PowerPoint presentation (.pptx) creation — slides, text boxes, images, tables, charts, shapes, speaker notes, slide masters, and more"
category: "document"
tags: [pptx, powerpoint, presentation, slides, office]
type: "external"
auth: "none"
functionCount: 15
---

# Pptx

> PowerPoint presentation (.pptx) creation — slides, text boxes, images, tables, charts, shapes, speaker notes, slide masters, and more. Zero npm dependencies.

**Package:** `@robinpath/pptx` | **Category:** Document | **Type:** External

## Authentication

No authentication required. All functions are available immediately.

## Use Cases

Use the `pptx` module when you need to:

- **Create a new presentation** -- Use `pptx.createSlides` to start a new PowerPoint
- **Add slides** -- Use `pptx.addSlide` to add slides with titles and backgrounds
- **Add text** -- Use `pptx.addSlideText` or `pptx.addSlideMultiText` for text boxes
- **Add images** -- Use `pptx.addSlideImage` to embed images on slides
- **Add tables** -- Use `pptx.addSlideTable` for data tables with styling
- **Add charts** -- Use `pptx.addSlideChart` for bar, line, pie, and area charts
- **Add shapes** -- Use `pptx.addSlideShape` for rectangles, ellipses, lines
- **Add speaker notes** -- Use `pptx.addSlideNotes` for presenter notes
- **Define master templates** -- Use `pptx.defineSlideMaster` for reusable layouts
- **Save the presentation** -- Use `pptx.saveSlides` to write the .pptx file

## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`createSlides`](#createslides) | Create a new PowerPoint presentation | `string` |
| [`addSlide`](#addslide) | Add a slide with optional title/subtitle | `number` |
| [`addSlideText`](#addslidetext) | Add a text box to a slide | `boolean` |
| [`addSlideImage`](#addslideimage) | Add an image to a slide | `boolean` |
| [`addSlideTable`](#addslidetable) | Add a data table to a slide | `boolean` |
| [`addSlideChart`](#addslidechart) | Add a chart to a slide | `boolean` |
| [`addSlideShape`](#addslideshape) | Add a shape to a slide | `boolean` |
| [`addSlideNotes`](#addslidenotes) | Add speaker notes to a slide | `boolean` |
| [`addSlideMultiText`](#addslidemultitext) | Add rich text with mixed formatting | `boolean` |
| [`setSlideNumber`](#setslidenumber) | Add a slide number | `boolean` |
| [`defineSlideMaster`](#defineslidemaster) | Define a reusable slide master template | `boolean` |
| [`addSlideFromMaster`](#addslidefrommaster) | Create a slide from a master template | `number` |
| [`saveSlides`](#saveslides) | Save the presentation to a .pptx file | `Object` |
| [`setSheetPrint`](#setsheetprint) | Configure print layout settings | `boolean` |
| [`groupRows`](#grouprows) | Group rows into collapsible outline groups | `boolean` |

## Functions

### createSlides

Create a new PowerPoint presentation

**Module:** `pptx` | **Returns:** `string` -- Presentation ID

```robinpath
pptx.createSlides "deck" { "title": "Q4 Report" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Presentation ID |
| `options` | `object` | No | {title, author, layout} |

---

### addSlide

Add a slide with optional title/subtitle and background

**Module:** `pptx` | **Returns:** `number` -- Slide index

```robinpath
pptx.addSlide $ppt { "title": "Overview", "subtitle": "Q4 2026", "backgroundColor": "#1a1a2e" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `options` | `object` | No | {title, subtitle, titleSize, backgroundColor} |

---

### addSlideText

Add a text box to a slide with full formatting

**Module:** `pptx` | **Returns:** `boolean` -- true

```robinpath
pptx.addSlideText $ppt 0 "Revenue: +23%" { "x": 1, "y": 3, "fontSize": 24, "bold": true, "color": "#27ae60" }
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

**Module:** `pptx` | **Returns:** `boolean` -- true

```robinpath
pptx.addSlideImage $ppt 0 "./chart.png" { "x": 1, "y": 2, "w": 6, "h": 4 }
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

**Module:** `pptx` | **Returns:** `boolean` -- true

```robinpath
pptx.addSlideTable $ppt 1 $data { "headerStyle": { "fillColor": "#2196F3" }, "alternateRows": true }
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

**Module:** `pptx` | **Returns:** `boolean` -- true

```robinpath
pptx.addSlideChart $ppt 2 $chartData { "type": "bar", "title": "Sales by Region" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `slideIndex` | `number` | Yes | Slide index |
| `chartData` | `array` | Yes | Chart data series [{name, labels, values}] |
| `options` | `object` | No | {type: bar/line/pie/doughnut/area, x, y, w, h, title, legend, showValues} |

---

### addSlideShape

Add a shape to a slide

**Module:** `pptx` | **Returns:** `boolean` -- true

```robinpath
pptx.addSlideShape $ppt 0 { "shape": "rect", "x": 0, "y": 0, "w": 10, "h": 0.5, "fillColor": "#2196F3" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `slideIndex` | `number` | Yes | Slide index |
| `options` | `object` | No | {shape: rect/ellipse/roundRect/line/triangle, x, y, w, h, fillColor, lineColor, lineWidth} |

---

### addSlideNotes

Add speaker notes to a slide

**Module:** `pptx` | **Returns:** `boolean` -- true

```robinpath
pptx.addSlideNotes $ppt 0 "Remember to mention Q4 targets"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `slideIndex` | `number` | Yes | Slide index |
| `text` | `string` | Yes | Speaker notes text |

---

### addSlideMultiText

Add rich text with mixed formatting (bold/italic/color) in one text box

**Module:** `pptx` | **Returns:** `boolean` -- true

```robinpath
pptx.addSlideMultiText $ppt 0 [{ "text": "Revenue: ", "bold": true }, { "text": "+23%", "color": "#27ae60", "bold": true }] { "x": 1, "y": 3 }
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

**Module:** `pptx` | **Returns:** `boolean` -- true

```robinpath
pptx.setSlideNumber $ppt 0 { "x": 9.5, "y": "95%", "color": "#888888", "fontSize": 10 }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `slideIndex` | `number` | Yes | Slide index |
| `options` | `object` | No | {x, y, color, fontSize} |

---

### defineSlideMaster

Define a reusable slide master template with logo, background, and placeholders

**Module:** `pptx` | **Returns:** `boolean` -- true

```robinpath
pptx.defineSlideMaster $ppt "BRAND" { "bgColor": "#FFFFFF", "objects": [{ "rect": { "x": 0, "y": 0, "w": "100%", "h": 0.5, "fillColor": "#003366" } }] }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `name` | `string` | Yes | Master template name |
| `options` | `object` | No | {background, bgColor, margin, slideNumber, objects} |

---

### addSlideFromMaster

Create a new slide from a defined master template

**Module:** `pptx` | **Returns:** `number` -- Slide index

```robinpath
pptx.addSlideFromMaster $ppt "BRAND" {}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `masterName` | `string` | Yes | Master template name |
| `options` | `object` | No | {backgroundColor} |

---

### saveSlides

Save the presentation to a .pptx file

**Module:** `pptx` | **Returns:** `Object` -- {path}

```robinpath
pptx.saveSlides $ppt "./presentation.pptx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pptId` | `string` | Yes | Presentation ID |
| `filePath` | `string` | Yes | Output .pptx path |

---

### setSheetPrint

Configure print layout: paper size, orientation, print area, margins

**Module:** `pptx` | **Returns:** `boolean` -- true

```robinpath
pptx.setSheetPrint $wb { "sheet": "Sheet1", "paperSize": 9, "orientation": "landscape", "printArea": "A1:F20" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wbId` | `string` | Yes | Workbook ID |
| `options` | `object` | Yes | {sheet, paperSize, orientation, fitToPage, fitToWidth, fitToHeight, printArea, margins, printTitlesRow} |

---

### groupRows

Group rows (or columns) into collapsible outline groups

**Module:** `pptx` | **Returns:** `boolean` -- true

```robinpath
pptx.groupRows $wb 2 10 { "sheet": "Sheet1", "collapsed": false }
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
| Presentation not found | Invalid presentation ID |
| Invalid slide index | Slide index out of range |
| Image not found | Image file does not exist at path |

```robinpath
@desc "Create presentation safely"
do
  set $ppt as pptx.createSlides "demo"
  if $ppt != null
    pptx.addSlide $ppt { "title": "Hello" }
    pptx.saveSlides $ppt "./demo.pptx"
    print "Saved"
  end
enddo
```

## Recipes

### 1. Create a full business presentation

Build a complete deck with title slide, content, chart, and table.

```robinpath
@desc "Generate Q4 sales presentation"
do
  set $ppt as pptx.createSlides "q4-deck" { "title": "Q4 Sales Review", "author": "Sales Team" }

  set $s0 as pptx.addSlide $ppt { "title": "Q4 Sales Review", "subtitle": "October - December 2026", "backgroundColor": "#1a1a2e" }

  set $s1 as pptx.addSlide $ppt { "title": "Revenue Summary" }
  set $data as [
    { "Region": "North", "Revenue": "$1.2M", "Growth": "+15%" },
    { "Region": "South", "Revenue": "$890K", "Growth": "+8%" },
    { "Region": "West", "Revenue": "$1.5M", "Growth": "+22%" }
  ]
  pptx.addSlideTable $ppt $s1 $data { "x": 0.5, "y": 1.5, "w": 9, "headerStyle": { "fillColor": "#2196F3", "fontColor": "#FFFFFF" }, "alternateRows": true }

  set $s2 as pptx.addSlide $ppt { "title": "Growth Chart" }
  set $chartData as [{ "name": "Revenue", "labels": ["Q1", "Q2", "Q3", "Q4"], "values": [800, 950, 1100, 1500] }]
  pptx.addSlideChart $ppt $s2 $chartData { "type": "bar", "x": 1, "y": 1.5, "w": 8, "h": 5, "title": "Quarterly Revenue ($K)" }

  pptx.addSlideNotes $ppt $s2 "Highlight the Q4 spike driven by new product launch"

  pptx.saveSlides $ppt "./q4-sales.pptx"
  print "Presentation saved to q4-sales.pptx"
enddo
```

### 2. Branded presentation with master template

Define a master layout and create consistent slides.

```robinpath
@desc "Create branded company deck"
do
  set $ppt as pptx.createSlides "branded"

  pptx.defineSlideMaster $ppt "CORP" {
    "bgColor": "#FFFFFF",
    "objects": [
      { "rect": { "x": 0, "y": 0, "w": "100%", "h": 0.5, "fillColor": "#003366" } },
      { "rect": { "x": 0, "y": 7, "w": "100%", "h": 0.5, "fillColor": "#003366" } }
    ]
  }

  set $s1 as pptx.addSlideFromMaster $ppt "CORP" {}
  pptx.addSlideText $ppt $s1 "Company Overview" { "x": 1, "y": 1, "fontSize": 28, "bold": true, "color": "#003366" }
  pptx.addSlideText $ppt $s1 "Building the future of automation" { "x": 1, "y": 2, "fontSize": 16, "color": "#666666" }
  pptx.setSlideNumber $ppt $s1 { "x": 9.5, "y": "95%", "fontSize": 10, "color": "#888888" }

  set $s2 as pptx.addSlideFromMaster $ppt "CORP" {}
  pptx.addSlideText $ppt $s2 "Our Mission" { "x": 1, "y": 1, "fontSize": 24, "bold": true }
  pptx.addSlideMultiText $ppt $s2 [
    { "text": "We believe in ", "fontSize": 14 },
    { "text": "simplicity", "bold": true, "color": "#2196F3", "fontSize": 14 },
    { "text": " and ", "fontSize": 14 },
    { "text": "power", "bold": true, "color": "#27ae60", "fontSize": 14 }
  ] { "x": 1, "y": 2.5, "w": 8 }

  pptx.saveSlides $ppt "./branded-deck.pptx"
  print "Branded presentation saved"
enddo
```

### 3. Slide with shapes and visuals

Add shapes for visual design elements.

```robinpath
@desc "Create a visually styled slide"
do
  set $ppt as pptx.createSlides "visual"
  set $s as pptx.addSlide $ppt { "backgroundColor": "#f5f5f5" }

  pptx.addSlideShape $ppt $s { "shape": "rect", "x": 0.5, "y": 0.5, "w": 4, "h": 3, "fillColor": "#2196F3" }
  pptx.addSlideText $ppt $s "Feature 1" { "x": 0.8, "y": 1.5, "fontSize": 20, "bold": true, "color": "#FFFFFF" }

  pptx.addSlideShape $ppt $s { "shape": "roundRect", "x": 5.5, "y": 0.5, "w": 4, "h": 3, "fillColor": "#27ae60" }
  pptx.addSlideText $ppt $s "Feature 2" { "x": 5.8, "y": 1.5, "fontSize": 20, "bold": true, "color": "#FFFFFF" }

  pptx.addSlideShape $ppt $s { "shape": "ellipse", "x": 3, "y": 4, "w": 4, "h": 2.5, "fillColor": "#FF9800" }
  pptx.addSlideText $ppt $s "Feature 3" { "x": 3.3, "y": 4.8, "fontSize": 20, "bold": true, "color": "#FFFFFF" }

  pptx.saveSlides $ppt "./visual-deck.pptx"
  print "Visual deck saved"
enddo
```

## Related Modules

- **docx** -- Word document creation
- **excel** -- Excel spreadsheet creation
- **pdf** -- PDF document generation
- **chart** -- Chart data generation
