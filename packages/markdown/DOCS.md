---
title: "Markdown"
module: "markdown"
package: "@robinpath/markdown"
description: "Markdown processing: convert to HTML, extract headings, links, images, code blocks, frontmatter, and tables"
category: "utility"
tags: [markdown, utility]
type: "utility"
auth: "none"
functionCount: 10
---

# Markdown

> Markdown processing: convert to HTML, extract headings, links, images, code blocks, frontmatter, and tables

**Package:** `@robinpath/markdown` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `markdown` module when you need to:

- **Convert markdown to basic HTML** -- Use `markdown.toHtml` to perform this operation
- **Extract all headings with their levels** -- Use `markdown.extractHeadings` to perform this operation
- **Extract all links** -- Use `markdown.extractLinks` to perform this operation
- **Extract all images** -- Use `markdown.extractImages` to perform this operation
- **Extract fenced code blocks** -- Use `markdown.extractCodeBlocks` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`toHtml`](#tohtml) | Convert markdown to basic HTML | `HTML string` |
| [`extractHeadings`](#extractheadings) | Extract all headings with their levels | `Array of {level, text}` |
| [`extractLinks`](#extractlinks) | Extract all links | `Array of {text, url}` |
| [`extractImages`](#extractimages) | Extract all images | `Array of {alt, src}` |
| [`extractCodeBlocks`](#extractcodeblocks) | Extract fenced code blocks | `Array of {language, code}` |
| [`stripMarkdown`](#stripmarkdown) | Strip all markdown formatting to plain text | `Plain text` |
| [`extractFrontmatter`](#extractfrontmatter) | Parse YAML frontmatter from markdown | `Key-value object or null` |
| [`extractTodos`](#extracttodos) | Extract task list items | `Array of {text, checked}` |
| [`tableToArray`](#tabletoarray) | Parse a markdown table into array of objects | `Array of row objects` |
| [`wordCount`](#wordcount) | Count words in markdown (stripping formatting) | `Word count` |


## Functions

### toHtml

Convert markdown to basic HTML

**Module:** `markdown` | **Returns:** `string` -- HTML string

```robinpath
markdown.toHtml "# Hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `markdown` | `string` | Yes | Markdown string |

---

### extractHeadings

Extract all headings with their levels

**Module:** `markdown` | **Returns:** `array` -- Array of {level, text}

```robinpath
markdown.extractHeadings $md
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `markdown` | `string` | Yes | Markdown string |

---

### extractLinks

Extract all links

**Module:** `markdown` | **Returns:** `array` -- Array of {text, url}

```robinpath
markdown.extractLinks $md
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `markdown` | `string` | Yes | Markdown string |

---

### extractImages

Extract all images

**Module:** `markdown` | **Returns:** `array` -- Array of {alt, src}

```robinpath
markdown.extractImages $md
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `markdown` | `string` | Yes | Markdown string |

---

### extractCodeBlocks

Extract fenced code blocks

**Module:** `markdown` | **Returns:** `array` -- Array of {language, code}

```robinpath
markdown.extractCodeBlocks $md
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `markdown` | `string` | Yes | Markdown string |

---

### stripMarkdown

Strip all markdown formatting to plain text

**Module:** `markdown` | **Returns:** `string` -- Plain text

```robinpath
markdown.stripMarkdown $md
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `markdown` | `string` | Yes | Markdown string |

---

### extractFrontmatter

Parse YAML frontmatter from markdown

**Module:** `markdown` | **Returns:** `object` -- Key-value object or null

```robinpath
markdown.extractFrontmatter $md
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `markdown` | `string` | Yes | Markdown with frontmatter |

---

### extractTodos

Extract task list items

**Module:** `markdown` | **Returns:** `array` -- Array of {text, checked}

```robinpath
markdown.extractTodos $md
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `markdown` | `string` | Yes | Markdown string |

---

### tableToArray

Parse a markdown table into array of objects

**Module:** `markdown` | **Returns:** `array` -- Array of row objects

```robinpath
markdown.tableToArray $table
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `markdown` | `string` | Yes | Markdown table |

---

### wordCount

Count words in markdown (stripping formatting)

**Module:** `markdown` | **Returns:** `number` -- Word count

```robinpath
markdown.wordCount $md
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `markdown` | `string` | Yes | Markdown string |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as markdown.toHtml "# Hello"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Markdown workflow

Chain multiple markdown operations together.

```robinpath
set $r_toHtml as markdown.toHtml "# Hello"
set $r_extractHeadings as markdown.extractHeadings $md
set $r_extractLinks as markdown.extractLinks $md
print "All operations complete"
```

### 2. Safe toHtml with validation

Check results before proceeding.

```robinpath
set $result as markdown.toHtml "# Hello"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
