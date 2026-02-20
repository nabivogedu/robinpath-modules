---
title: "Template"
module: "template"
package: "@robinpath/template"
description: "Mustache-like template engine with variable substitution, conditional sections, loops, and simple string interpolation"
category: "utility"
tags: [template, utility]
type: "utility"
auth: "none"
functionCount: 6
---

# Template

> Mustache-like template engine with variable substitution, conditional sections, loops, and simple string interpolation

**Package:** `@robinpath/template` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `template` module when you need to:

- **Render a Mustache-like template string with variable substitution, sections, and loops** -- Use `template.render` to perform this operation
- **Read a template from a file and render it with the provided data object** -- Use `template.renderFile` to perform this operation
- **HTML-escape a string, converting &, <, >, ", and ' to their HTML entity equivalents** -- Use `template.escape` to perform this operation
- **Validate template syntax, checking for unclosed tags, mismatched sections, and other structural errors** -- Use `template.compile` to perform this operation
- **Extract all unique variable and section names used in a template** -- Use `template.extractVariables` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`render`](#render) | Render a Mustache-like template string with variable substitution, sections, and loops | `The rendered template string with all tags resolved` |
| [`renderFile`](#renderfile) | Read a template from a file and render it with the provided data object | `The rendered template string with all tags resolved` |
| [`escape`](#escape) | HTML-escape a string, converting &, <, >, ", and ' to their HTML entity equivalents | `The HTML-escaped string` |
| [`compile`](#compile) | Validate template syntax, checking for unclosed tags, mismatched sections, and other structural errors | `True if the template syntax is valid. Throws an error with details if invalid.` |
| [`extractVariables`](#extractvariables) | Extract all unique variable and section names used in a template | `Deduplicated array of all variable and section names found in the template` |
| [`renderString`](#renderstring) | Simple string interpolation using ${key} placeholders (no sections or loops) | `The string with all ${key} placeholders replaced by their values` |


## Functions

### render

Render a Mustache-like template string with variable substitution, sections, and loops

**Module:** `template` | **Returns:** `string` -- The rendered template string with all tags resolved

```robinpath
template.render "Hello, {{name}}!" { "name": "World" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `template` | `string` | Yes | The template string containing {{variable}}, {{{unescaped}}}, {{#section}}...{{/section}}, {{^inverted}}...{{/inverted}}, and {{! comment }} tags |
| `data` | `object` | Yes | Key-value data object for variable substitution. Supports nested objects via dot notation. |

---

### renderFile

Read a template from a file and render it with the provided data object

**Module:** `template` | **Returns:** `string` -- The rendered template string with all tags resolved

```robinpath
template.renderFile "/tmp/greeting.mustache" { "name": "World" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `templateFilePath` | `string` | Yes | Absolute or relative path to the template file |
| `data` | `object` | Yes | Key-value data object for variable substitution. Supports nested objects via dot notation. |

---

### escape

HTML-escape a string, converting &, <, >, ", and ' to their HTML entity equivalents

**Module:** `template` | **Returns:** `string` -- The HTML-escaped string

```robinpath
template.escape "<script>alert(1)</script>"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `string` | `string` | Yes | The string to HTML-escape |

---

### compile

Validate template syntax, checking for unclosed tags, mismatched sections, and other structural errors

**Module:** `template` | **Returns:** `boolean` -- True if the template syntax is valid. Throws an error with details if invalid.

```robinpath
template.compile "{{#items}}{{name}}{{/items}}"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `template` | `string` | Yes | The template string to validate |

---

### extractVariables

Extract all unique variable and section names used in a template

**Module:** `template` | **Returns:** `array` -- Deduplicated array of all variable and section names found in the template

```robinpath
template.extractVariables "{{greeting}}, {{name}}! {{#show}}Visible{{/show}}"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `template` | `string` | Yes | The template string to analyze |

---

### renderString

Simple string interpolation using ${key} placeholders (no sections or loops)

**Module:** `template` | **Returns:** `string` -- The string with all ${key} placeholders replaced by their values

```robinpath
template.renderString "Hello, ${name}!" { "name": "World" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `string` | `string` | Yes | The string containing ${key} placeholders for substitution |
| `data` | `object` | Yes | Key-value data object for placeholder substitution. Supports dot notation. |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Unclosed unescaped tag starting at position ${openIdx}` | Check the error message for details |
| `Unclosed tag starting at position ${openIdx}` | Check the error message for details |
| `Unexpected closing tag {{/${tag.slice(1).trim()}}} at position ${openIdx}` | Check the error message for details |
| `Unclosed tag starting at position ${nextOpen}` | Check the error message for details |
| `Empty section name at position ${openIdx}` | Check the error message for details |
| `Empty closing tag at position ${openIdx}` | Check the error message for details |
| `Unclosed section "{{#...}}": no matching "{{/...}}" found` | Check the error message for details |
| `Unclosed unescaped tag "{{{" at position ...` | Check the error message for details |

```robinpath
set $result as template.render "Hello, {{name}}!" { "name": "World" }
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Template workflow

Chain multiple template operations together.

```robinpath
set $r_render as template.render "Hello, {{name}}!" { "name": "World" }
set $r_renderFile as template.renderFile "/tmp/greeting.mustache" { "name": "World" }
set $r_escape as template.escape "<script>alert(1)</script>"
print "All operations complete"
```

### 2. Safe render with validation

Check results before proceeding.

```robinpath
set $result as template.render "Hello, {{name}}!" { "name": "World" }
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
