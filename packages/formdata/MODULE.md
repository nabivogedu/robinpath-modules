---
title: "FormData"
module: "formdata"
package: "@robinpath/formdata"
description: "Multipart form data builder, file uploads, URL encoding/decoding, and form submission"
category: "web"
tags: [formdata, web, multipart, upload]
type: "utility"
auth: "none"
functionCount: 8
---

# FormData

> Multipart form data builder, file uploads, URL encoding/decoding, and form submission

**Package:** `@robinpath/formdata` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `formdata` module when you need to:

- **Create a FormData object from key-value pairs** -- Use `formdata.create` to perform this operation
- **Add a text field to a FormData** -- Use `formdata.addField` to perform this operation
- **Add a file to a FormData** -- Use `formdata.addFile` to perform this operation
- **Submit a FormData to a URL** -- Use `formdata.submit` to perform this operation
- **URL-encode an object as application/x-www-form-urlencoded** -- Use `formdata.encode` to perform this operation


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

**Module:** `formdata` | **Returns:** `object` -- FormData object

```robinpath
formdata.create {"name": "Alice", "email": "alice@example.com"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | No | Key-value pairs |

---

### addField

Add a text field to a FormData

**Module:** `formdata` | **Returns:** `object` -- Updated FormData

```robinpath
formdata.addField $form "name" "Alice"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `form` | `object` | Yes | FormData |
| `name` | `string` | Yes | Field name |
| `value` | `string` | Yes | Field value |

---

### addFile

Add a file to a FormData

**Module:** `formdata` | **Returns:** `object` -- Updated FormData

```robinpath
formdata.addFile $form "avatar" "./photo.jpg"
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

**Module:** `formdata` | **Returns:** `object` -- {status, ok, body}

```robinpath
formdata.submit "https://api.example.com/upload" $form
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Target URL |
| `form` | `object` | Yes | FormData or key-value object |
| `options` | `object` | No | {method, headers} |

---

### encode

URL-encode an object as application/x-www-form-urlencoded

**Module:** `formdata` | **Returns:** `string` -- URL-encoded string

```robinpath
formdata.encode {"name": "Alice", "age": "30"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | Yes | Key-value pairs |

---

### decode

Decode a URL-encoded form body

**Module:** `formdata` | **Returns:** `object` -- Decoded key-value pairs

```robinpath
formdata.decode "name=Alice&age=30"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `body` | `string` | Yes | URL-encoded string |

---

### uploadFile

Upload a file to a URL as multipart form

**Module:** `formdata` | **Returns:** `object` -- {status, ok, body, fileName, size}

```robinpath
formdata.uploadFile "https://api.example.com/upload" "./report.pdf"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Upload URL |
| `filePath` | `string` | Yes | Local file path |
| `options` | `object` | No | {fieldName, fileName, headers, fields} |

---

### parseMultipart

Parse a multipart form body

**Module:** `formdata` | **Returns:** `array` -- Array of {name, filename, contentType, value}

```robinpath
formdata.parseMultipart $rawBody $boundary
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
| `First argument must be a FormData object` | Passed a non-FormData value to addField/addFile |
| `URL is required` | Missing URL in submit call |
| `Boundary is required` | Missing boundary in parseMultipart call |


## Related Modules

- **form** -- Declarative form builder for defining form fields inline
- **json** -- JSON module for complementary functionality
