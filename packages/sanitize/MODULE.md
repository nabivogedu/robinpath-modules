---
title: "Sanitize"
module: "sanitize"
package: "@robinpath/sanitize"
description: "Input sanitization utilities for security: HTML escaping, XSS prevention, SQL escaping, filename and path sanitization, URL cleaning, and more"
category: "utility"
tags: [sanitize, utility, api]
type: "utility"
auth: "none"
functionCount: 15
---

# Sanitize

> Input sanitization utilities for security: HTML escaping, XSS prevention, SQL escaping, filename and path sanitization, URL cleaning, and more

**Package:** `@robinpath/sanitize` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `sanitize` module when you need to:

- **Strip or escape HTML tags from input** -- Use `sanitize.html` to perform this operation
- **Remove XSS attack vectors from input** -- Use `sanitize.xss` to perform this operation
- **Escape SQL special characters to prevent injection** -- Use `sanitize.sql` to perform this operation
- **Escape special regex characters in a string** -- Use `sanitize.regex` to perform this operation
- **Sanitize a string for safe use as a filename** -- Use `sanitize.filename` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`html`](#html) | Strip or escape HTML tags from input | `object` |
| [`xss`](#xss) | Remove XSS attack vectors from input | `object` |
| [`sql`](#sql) | Escape SQL special characters to prevent injection | `object` |
| [`regex`](#regex) | Escape special regex characters in a string | `object` |
| [`filename`](#filename) | Sanitize a string for safe use as a filename | `object` |
| [`path`](#path) | Prevent path traversal attacks by sanitizing a file path | `object` |
| [`url`](#url) | Sanitize a URL, stripping dangerous protocols like javascript: | `object` |
| [`email`](#email) | Normalize an email address (lowercase, remove dots/plus aliases for Gmail) | `object` |
| [`stripTags`](#striptags) | Remove all HTML tags from a string, optionally allowing specific tags | `object` |
| [`escapeHtml`](#escapehtml) | Escape HTML special characters: & < > " ' | `object` |
| [`unescapeHtml`](#unescapehtml) | Unescape HTML entities back to their original characters | `object` |
| [`trim`](#trim) | Deep trim all string values within an object, array, or string | `object` |
| [`truncate`](#truncate) | Truncate a string to a maximum length with a suffix | `object` |
| [`alphanumeric`](#alphanumeric) | Strip all non-alphanumeric characters from a string | `object` |
| [`slug`](#slug) | Sanitize a string into a URL-safe slug | `object` |


## Functions

### html

Strip or escape HTML tags from input

**Module:** `sanitize` | **Returns:** `object` -- API response.

```robinpath
sanitize.html
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to sanitize |
| `mode` | `string` | No | Mode: 'escape' (default) or 'strip' |

---

### xss

Remove XSS attack vectors from input

**Module:** `sanitize` | **Returns:** `object` -- API response.

```robinpath
sanitize.xss
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to sanitize |

---

### sql

Escape SQL special characters to prevent injection

**Module:** `sanitize` | **Returns:** `object` -- API response.

```robinpath
sanitize.sql
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to escape |

---

### regex

Escape special regex characters in a string

**Module:** `sanitize` | **Returns:** `object` -- API response.

```robinpath
sanitize.regex
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to escape |

---

### filename

Sanitize a string for safe use as a filename

**Module:** `sanitize` | **Returns:** `object` -- API response.

```robinpath
sanitize.filename
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The filename to sanitize |
| `replacement` | `string` | No | Replacement character for invalid chars (default: '_') |

---

### path

Prevent path traversal attacks by sanitizing a file path

**Module:** `sanitize` | **Returns:** `object` -- API response.

```robinpath
sanitize.path
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The path to sanitize |

---

### url

Sanitize a URL, stripping dangerous protocols like javascript:

**Module:** `sanitize` | **Returns:** `object` -- API response.

```robinpath
sanitize.url
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The URL to sanitize |

---

### email

Normalize an email address (lowercase, remove dots/plus aliases for Gmail)

**Module:** `sanitize` | **Returns:** `object` -- API response.

```robinpath
sanitize.email
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The email to normalize |

---

### stripTags

Remove all HTML tags from a string, optionally allowing specific tags

**Module:** `sanitize` | **Returns:** `object` -- API response.

```robinpath
sanitize.stripTags
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to strip tags from |
| `allowed` | `string` | No | Allowed tags, e.g. '<b><i><a>' |

---

### escapeHtml

Escape HTML special characters: & < > " '

**Module:** `sanitize` | **Returns:** `object` -- API response.

```robinpath
sanitize.escapeHtml
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to escape |

---

### unescapeHtml

Unescape HTML entities back to their original characters

**Module:** `sanitize` | **Returns:** `object` -- API response.

```robinpath
sanitize.unescapeHtml
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to unescape |

---

### trim

Deep trim all string values within an object, array, or string

**Module:** `sanitize` | **Returns:** `object` -- API response.

```robinpath
sanitize.trim
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | The value to deep-trim |

---

### truncate

Truncate a string to a maximum length with a suffix

**Module:** `sanitize` | **Returns:** `object` -- API response.

```robinpath
sanitize.truncate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to truncate |
| `maxLength` | `number` | No | Maximum length (default: 100) |
| `suffix` | `string` | No | Suffix to append when truncated (default: '...') |

---

### alphanumeric

Strip all non-alphanumeric characters from a string

**Module:** `sanitize` | **Returns:** `object` -- API response.

```robinpath
sanitize.alphanumeric
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to sanitize |
| `allowSpaces` | `boolean` | No | Whether to allow spaces (default: false) |

---

### slug

Sanitize a string into a URL-safe slug

**Module:** `sanitize` | **Returns:** `object` -- API response.

```robinpath
sanitize.slug
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | Yes | The string to slugify |
| `separator` | `string` | No | Separator character (default: '-') |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as sanitize.html
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Sanitize workflow

Chain multiple sanitize operations together.

```robinpath
set $r_html as sanitize.html
set $r_xss as sanitize.xss
set $r_sql as sanitize.sql
print "All operations complete"
```

### 2. Safe html with validation

Check results before proceeding.

```robinpath
set $result as sanitize.html
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
