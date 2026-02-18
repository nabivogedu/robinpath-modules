---
title: "PandaDoc"
module: "pandadoc"
package: "@robinpath/pandadoc"
description: "PandaDoc module for RobinPath."
category: "documents"
tags: [pandadoc, documents]
type: "integration"
auth: "api-key"
functionCount: 15
baseUrl: "https://api.pandadoc.com"
---

# PandaDoc

> PandaDoc module for RobinPath.

**Package:** `@robinpath/pandadoc` | **Category:** Documents | **Type:** Integration


## Authentication

```robinpath
pandadoc.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `pandadoc` module when you need to:

- **listDocuments** -- Use `pandadoc.listDocuments` to perform this operation
- **getDocument** -- Use `pandadoc.getDocument` to perform this operation
- **createDocument** -- Use `pandadoc.createDocument` to perform this operation
- **createDocumentFromTemplate** -- Use `pandadoc.createDocumentFromTemplate` to perform this operation
- **sendDocument** -- Use `pandadoc.sendDocument` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure pandadoc credentials. | `object` |
| [`listDocuments`](#listdocuments) | listDocuments | `object` |
| [`getDocument`](#getdocument) | getDocument | `object` |
| [`createDocument`](#createdocument) | createDocument | `object` |
| [`createDocumentFromTemplate`](#createdocumentfromtemplate) | createDocumentFromTemplate | `object` |
| [`sendDocument`](#senddocument) | sendDocument | `object` |
| [`getDocumentStatus`](#getdocumentstatus) | getDocumentStatus | `object` |
| [`downloadDocument`](#downloaddocument) | downloadDocument | `object` |
| [`deleteDocument`](#deletedocument) | deleteDocument | `object` |
| [`listTemplates`](#listtemplates) | listTemplates | `object` |
| [`getTemplate`](#gettemplate) | getTemplate | `object` |
| [`listContacts`](#listcontacts) | listContacts | `object` |
| [`createContact`](#createcontact) | createContact | `object` |
| [`getDocumentDetails`](#getdocumentdetails) | getDocumentDetails | `object` |
| [`listLinkedObjects`](#listlinkedobjects) | listLinkedObjects | `object` |


## Functions

### setCredentials

Configure pandadoc credentials.

**Module:** `pandadoc` | **Returns:** `object` -- API response.

```robinpath
pandadoc.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | Yes | apiKey |

---

### listDocuments

listDocuments

**Module:** `pandadoc` | **Returns:** `object` -- API response.

```robinpath
pandadoc.listDocuments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getDocument

getDocument

**Module:** `pandadoc` | **Returns:** `object` -- API response.

```robinpath
pandadoc.getDocument
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createDocument

createDocument

**Module:** `pandadoc` | **Returns:** `object` -- API response.

```robinpath
pandadoc.createDocument
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createDocumentFromTemplate

createDocumentFromTemplate

**Module:** `pandadoc` | **Returns:** `object` -- API response.

```robinpath
pandadoc.createDocumentFromTemplate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendDocument

sendDocument

**Module:** `pandadoc` | **Returns:** `object` -- API response.

```robinpath
pandadoc.sendDocument
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getDocumentStatus

getDocumentStatus

**Module:** `pandadoc` | **Returns:** `object` -- API response.

```robinpath
pandadoc.getDocumentStatus
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### downloadDocument

downloadDocument

**Module:** `pandadoc` | **Returns:** `object` -- API response.

```robinpath
pandadoc.downloadDocument
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteDocument

deleteDocument

**Module:** `pandadoc` | **Returns:** `object` -- API response.

```robinpath
pandadoc.deleteDocument
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTemplates

listTemplates

**Module:** `pandadoc` | **Returns:** `object` -- API response.

```robinpath
pandadoc.listTemplates
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTemplate

getTemplate

**Module:** `pandadoc` | **Returns:** `object` -- API response.

```robinpath
pandadoc.getTemplate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listContacts

listContacts

**Module:** `pandadoc` | **Returns:** `object` -- API response.

```robinpath
pandadoc.listContacts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createContact

createContact

**Module:** `pandadoc` | **Returns:** `object` -- API response.

```robinpath
pandadoc.createContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getDocumentDetails

getDocumentDetails

**Module:** `pandadoc` | **Returns:** `object` -- API response.

```robinpath
pandadoc.getDocumentDetails
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listLinkedObjects

listLinkedObjects

**Module:** `pandadoc` | **Returns:** `object` -- API response.

```robinpath
pandadoc.listLinkedObjects
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Pandadoc API error (${res.status}): ${t}` | Check the error message for details |
| `pandadoc.setCredentials requires apiKey.` | Check the error message for details |
| `pandadoc.deleteDocument requires an ID.` | Check the error message for details |
| `Pandadoc: "..." not configured. Call pandadoc.setCredentials first.` | Check the error message for details |

```robinpath
set $result as pandadoc.listDocuments
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Documents

Retrieve all items and loop through them.

```robinpath
pandadoc.setCredentials $token
set $result as pandadoc.listDocuments
each $item in $result
  print $item
end
```

### 2. Create a new item with createDocument

Create a new resource and capture the result.

```robinpath
pandadoc.setCredentials $token
set $result as pandadoc.createDocument
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
pandadoc.setCredentials $token
set $existing as pandadoc.listDocuments
if $existing == null
  pandadoc.createDocument
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step PandaDoc workflow

Chain multiple pandadoc operations together.

```robinpath
pandadoc.setCredentials $token
set $r_listDocuments as pandadoc.listDocuments
set $r_getDocument as pandadoc.getDocument
set $r_createDocument as pandadoc.createDocument
print "All operations complete"
```

### 5. Safe listDocuments with validation

Check results before proceeding.

```robinpath
pandadoc.setCredentials $token
set $result as pandadoc.listDocuments
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **pdf** -- PDF module for complementary functionality
- **excel** -- Excel module for complementary functionality
- **office** -- Office module for complementary functionality
- **docusign** -- DocuSign module for complementary functionality
- **hellosign** -- HelloSign module for complementary functionality
