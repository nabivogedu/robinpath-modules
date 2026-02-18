---
title: "HTML"
module: "html"
package: "@robinpath/html"
description: "Parse, extract, escape, and manipulate HTML content using regex-based processing"
category: "utility"
tags: [html, utility]
type: "utility"
auth: "none"
functionCount: 12
---

# HTML

> Parse, extract, escape, and manipulate HTML content using regex-based processing

**Package:** `@robinpath/html` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `html` module when you need to:

- **Remove all HTML tags from a string, returning plain text** -- Use `html.stripTags` to perform this operation
- **Extract the text content of all matching tags by tag name** -- Use `html.extractText` to perform this operation
- **Extract all links (href and text) from anchor tags** -- Use `html.extractLinks` to perform this operation
- **Extract all image sources and alt text from img tags** -- Use `html.extractImages` to perform this operation
- **Extract attribute values from all matching tags** -- Use `html.getAttribute` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`stripTags`](#striptags) | Remove all HTML tags from a string, returning plain text | `Plain text with all HTML tags removed` |
| [`extractText`](#extracttext) | Extract the text content of all matching tags by tag name | `Array of text contents from all matching tags` |
| [`extractLinks`](#extractlinks) | Extract all links (href and text) from anchor tags | `Array of objects with href and text properties` |
| [`extractImages`](#extractimages) | Extract all image sources and alt text from img tags | `Array of objects with src and alt properties` |
| [`getAttribute`](#getattribute) | Extract attribute values from all matching tags | `Array of attribute values from matching tags` |
| [`escape`](#escape) | HTML-escape special characters (&, <, >, ", ') | `The escaped string safe for use in HTML` |
| [`unescape`](#unescape) | Reverse HTML escaping (&amp; &lt; &gt; &quot; &#39;) | `The unescaped string with HTML entities converted back` |
| [`extractMeta`](#extractmeta) | Extract meta tag name-content pairs from HTML | `Object mapping meta tag names to their content values` |
| [`getTitle`](#gettitle) | Extract the text content of the <title> tag | `The title text, or null if no <title> tag is found` |
| [`extractTables`](#extracttables) | Extract HTML tables as arrays of rows and cells | `Array of tables, each as an array of rows, each row as an array of cell strings` |
| [`wrap`](#wrap) | Wrap text in an HTML tag with optional attributes | `The HTML string with text wrapped in the specified tag` |
| [`minify`](#minify) | Minify HTML by removing extra whitespace and newlines between tags | `The minified HTML string` |


## Functions

### stripTags

Remove all HTML tags from a string, returning plain text

**Module:** `html` | **Returns:** `string` -- Plain text with all HTML tags removed

```robinpath
html.stripTags "<p>Hello <b>world</b></p>"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `htmlString` | `string` | Yes | The HTML string to strip tags from |

---

### extractText

Extract the text content of all matching tags by tag name

**Module:** `html` | **Returns:** `array` -- Array of text contents from all matching tags

```robinpath
html.extractText "<p>One</p><p>Two</p>" "p"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `htmlString` | `string` | Yes | The HTML string to search |
| `tagName` | `string` | Yes | The tag name to match (e.g. "p", "h1", "span") |

---

### extractLinks

Extract all links (href and text) from anchor tags

**Module:** `html` | **Returns:** `array` -- Array of objects with href and text properties

```robinpath
html.extractLinks "<a href=\"https://example.com\">Example</a>"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `htmlString` | `string` | Yes | The HTML string to extract links from |

---

### extractImages

Extract all image sources and alt text from img tags

**Module:** `html` | **Returns:** `array` -- Array of objects with src and alt properties

```robinpath
html.extractImages "<img src=\"photo.jpg\" alt=\"A photo\">"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `htmlString` | `string` | Yes | The HTML string to extract images from |

---

### getAttribute

Extract attribute values from all matching tags

**Module:** `html` | **Returns:** `array` -- Array of attribute values from matching tags

```robinpath
html.getAttribute "<div class=\"a\"></div><div class=\"b\"></div>" "div" "class"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `htmlString` | `string` | Yes | The HTML string to search |
| `tagName` | `string` | Yes | The tag name to match (e.g. "div", "input") |
| `attributeName` | `string` | Yes | The attribute name to extract (e.g. "class", "id") |

---

### escape

HTML-escape special characters (&, <, >, ", ')

**Module:** `html` | **Returns:** `string` -- The escaped string safe for use in HTML

```robinpath
html.escape "<script>alert(1)</script>"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `string` | `string` | Yes | The string to HTML-escape |

---

### unescape

Reverse HTML escaping (&amp; &lt; &gt; &quot; &#39;)

**Module:** `html` | **Returns:** `string` -- The unescaped string with HTML entities converted back

```robinpath
html.unescape "&lt;p&gt;Hello&lt;/p&gt;"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `string` | `string` | Yes | The HTML-escaped string to unescape |

---

### extractMeta

Extract meta tag name-content pairs from HTML

**Module:** `html` | **Returns:** `object` -- Object mapping meta tag names to their content values

```robinpath
html.extractMeta "<meta name=\"description\" content=\"A page\">"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `htmlString` | `string` | Yes | The HTML string to extract meta tags from |

---

### getTitle

Extract the text content of the <title> tag

**Module:** `html` | **Returns:** `string` -- The title text, or null if no <title> tag is found

```robinpath
html.getTitle "<html><head><title>My Page</title></head></html>"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `htmlString` | `string` | Yes | The HTML string to extract the title from |

---

### extractTables

Extract HTML tables as arrays of rows and cells

**Module:** `html` | **Returns:** `array` -- Array of tables, each as an array of rows, each row as an array of cell strings

```robinpath
html.extractTables "<table><tr><td>A</td><td>B</td></tr></table>"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `htmlString` | `string` | Yes | The HTML string containing table(s) |

---

### wrap

Wrap text in an HTML tag with optional attributes

**Module:** `html` | **Returns:** `string` -- The HTML string with text wrapped in the specified tag

```robinpath
html.wrap "Hello" "p" {"class": "greeting"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | The text content to wrap |
| `tagName` | `string` | Yes | The tag name to wrap with (e.g. "div", "span") |
| `attributes` | `object` | No | Optional object of attribute key-value pairs |

---

### minify

Minify HTML by removing extra whitespace and newlines between tags

**Module:** `html` | **Returns:** `string` -- The minified HTML string

```robinpath
html.minify "<div>\n  <p> Hello </p>\n</div>"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `htmlString` | `string` | Yes | The HTML string to minify |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as html.stripTags "<p>Hello <b>world</b></p>"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Attribute

Retrieve all items and loop through them.

```robinpath
set $result as html.getAttribute "<div class=\"a\"></div><div class=\"b\"></div>" "div" "class"
each $item in $result
  print $item
end
```

### 2. Multi-step HTML workflow

Chain multiple html operations together.

```robinpath
set $r_stripTags as html.stripTags "<p>Hello <b>world</b></p>"
set $r_extractText as html.extractText "<p>One</p><p>Two</p>" "p"
set $r_extractLinks as html.extractLinks "<a href=\"https://example.com\">Example</a>"
print "All operations complete"
```

### 3. Safe stripTags with validation

Check results before proceeding.

```robinpath
set $result as html.stripTags "<p>Hello <b>world</b></p>"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
