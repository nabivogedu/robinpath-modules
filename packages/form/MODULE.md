---
title: "Form"
module: "form"
package: "@robinpath/form"
description: "Multipart form data builder, file uploads, URL encoding/decoding, and form submission"
category: "web"
tags: [form, web]
type: "utility"
auth: "none"
functionCount: 8
---

# Form

> Multipart form data builder, file uploads, URL encoding/decoding, and form submission

**Package:** `@robinpath/form` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `form` module when you need to:

- **Create a FormData object from key-value pairs** -- Use `form.create` to perform this operation
- **Add a text field to a FormData** -- Use `form.addField` to perform this operation
- **Add a file to a FormData** -- Use `form.addFile` to perform this operation
- **Submit a FormData to a URL** -- Use `form.submit` to perform this operation
- **URL-encode an object as application/x-www-form-urlencoded** -- Use `form.encode` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create a FormData object from key-value pairs | `FormData object` |
| [`addField`](#addfield) | Add a text field to a FormData | `Updated FormData` |
| [`addFile`](#addfile) | Add a file to a FormData | `Updated FormData` |
| [`submit`](#submit) | Submit a FormData to a URL | `{status, ok, body}` |
| [`encode`](#encode) | URL-encode an object as application/x-www-form-urlencoded | `URL-encoded string` |
| [`decode`](#decode) | Decode a URL-encoded form body | `Decoded key-value pairs` |
| [`uploadFile`](#uploadfile) | Upload a file to a URL as multipart form | `{status, ok, body, fileName, size}` |
| [`parseMultipart`](#parsemultipart) | Parse a multipart form body | `Array of {name, filename, contentType, value}` |


## Functions

### create

Create a FormData object from key-value pairs

**Module:** `form` | **Returns:** `object` -- FormData object

```robinpath
form.create {"name": "Alice", "email": "alice@example.com"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | No | Key-value pairs |

---

### addField

Add a text field to a FormData

**Module:** `form` | **Returns:** `object` -- Updated FormData

```robinpath
form.addField $form "name" "Alice"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `form` | `object` | Yes | FormData |
| `name` | `string` | Yes | Field name |
| `value` | `string` | Yes | Field value |

---

### addFile

Add a file to a FormData

**Module:** `form` | **Returns:** `object` -- Updated FormData

```robinpath
form.addFile $form "avatar" "./photo.jpg"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `form` | `object` | Yes | FormData |
| `fieldName` | `string` | Yes | Form field name |
| `filePath` | `string` | Yes | File path |
| `fileName` | `string` | No | Override filename |

---

### submit

Submit a FormData to a URL

**Module:** `form` | **Returns:** `object` -- {status, ok, body}

```robinpath
form.submit "https://api.example.com/upload" $form
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Target URL |
| `form` | `object` | Yes | FormData or key-value object |
| `options` | `object` | No | {method, headers} |

---

### encode

URL-encode an object as application/x-www-form-urlencoded

**Module:** `form` | **Returns:** `string` -- URL-encoded string

```robinpath
form.encode {"name": "Alice", "age": "30"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | Yes | Key-value pairs |

---

### decode

Decode a URL-encoded form body

**Module:** `form` | **Returns:** `object` -- Decoded key-value pairs

```robinpath
form.decode "name=Alice&age=30"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `body` | `string` | Yes | URL-encoded string |

---

### uploadFile

Upload a file to a URL as multipart form

**Module:** `form` | **Returns:** `object` -- {status, ok, body, fileName, size}

```robinpath
form.uploadFile "https://api.example.com/upload" "./report.pdf"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Upload URL |
| `filePath` | `string` | Yes | Local file path |
| `options` | `object` | No | {fieldName, fileName, headers, fields} |

---

### parseMultipart

Parse a multipart form body

**Module:** `form` | **Returns:** `array` -- Array of {name, filename, contentType, value}

```robinpath
form.parseMultipart $rawBody $boundary
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `body` | `string` | Yes | Raw multipart body |
| `boundary` | `string` | Yes | Multipart boundary string |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `First argument must be a FormData object` | Check the error message for details |
| `URL is required` | Check the error message for details |
| `Boundary is required` | Check the error message for details |

```robinpath
set $result as form.create {"name": "Alice", "email": "alice@example.com"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as form.create {"name": "Alice", "email": "alice@example.com"}
print "Created: " + $result
```

### 2. Multi-step Form workflow

Chain multiple form operations together.

```robinpath
set $r_create as form.create {"name": "Alice", "email": "alice@example.com"}
set $r_addField as form.addField $form "name" "Alice"
set $r_addFile as form.addFile $form "avatar" "./photo.jpg"
print "All operations complete"
```

### 3. Safe create with validation

Check results before proceeding.

```robinpath
set $result as form.create {"name": "Alice", "email": "alice@example.com"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
