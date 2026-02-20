---
title: "Sanity"
module: "sanity"
package: "@robinpath/sanity"
description: "Sanity module for RobinPath."
category: "cms"
tags: [sanity, cms]
type: "integration"
auth: "api-key"
functionCount: 17
---

# Sanity

> Sanity module for RobinPath.

**Package:** `@robinpath/sanity` | **Category:** Cms | **Type:** Integration


## Authentication

```robinpath
sanity.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `sanity` module when you need to:

- **query** -- Use `sanity.query` to perform this operation
- **getDocument** -- Use `sanity.getDocument` to perform this operation
- **createDocument** -- Use `sanity.createDocument` to perform this operation
- **createOrReplace** -- Use `sanity.createOrReplace` to perform this operation
- **patch** -- Use `sanity.patch` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure sanity credentials. | `object` |
| [`query`](#query) | query | `object` |
| [`getDocument`](#getdocument) | getDocument | `object` |
| [`createDocument`](#createdocument) | createDocument | `object` |
| [`createOrReplace`](#createorreplace) | createOrReplace | `object` |
| [`patch`](#patch) | patch | `object` |
| [`deleteDocument`](#deletedocument) | deleteDocument | `object` |
| [`uploadAsset`](#uploadasset) | uploadAsset | `object` |
| [`getAsset`](#getasset) | getAsset | `object` |
| [`listDatasets`](#listdatasets) | listDatasets | `object` |
| [`createDataset`](#createdataset) | createDataset | `object` |
| [`deleteDataset`](#deletedataset) | deleteDataset | `object` |
| [`mutate`](#mutate) | mutate | `object` |
| [`listDocumentsByType`](#listdocumentsbytype) | listDocumentsByType | `object` |
| [`getProject`](#getproject) | getProject | `object` |
| [`exportDataset`](#exportdataset) | exportDataset | `object` |
| [`importDataset`](#importdataset) | importDataset | `object` |


## Functions

### setCredentials

Configure sanity credentials.

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | `string` | Yes | projectId |
| `dataset` | `string` | Yes | dataset |
| `token` | `string` | Yes | token |

---

### query

query

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.query
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getDocument

getDocument

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.getDocument
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createDocument

createDocument

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.createDocument
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createOrReplace

createOrReplace

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.createOrReplace
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### patch

patch

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.patch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteDocument

deleteDocument

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.deleteDocument
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### uploadAsset

uploadAsset

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.uploadAsset
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getAsset

getAsset

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.getAsset
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listDatasets

listDatasets

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.listDatasets
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createDataset

createDataset

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.createDataset
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteDataset

deleteDataset

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.deleteDataset
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### mutate

mutate

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.mutate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listDocumentsByType

listDocumentsByType

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.listDocumentsByType
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getProject

getProject

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.getProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### exportDataset

exportDataset

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.exportDataset
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### importDataset

importDataset

**Module:** `sanity` | **Returns:** `object` -- API response.

```robinpath
sanity.importDataset
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Sanity API error (${res.status}): ${t}` | Check the error message for details |
| `sanity.setCredentials requires projectId, dataset, token.` | Check the error message for details |
| `sanity.patch requires an ID.` | Check the error message for details |
| `sanity.deleteDocument requires an ID.` | Check the error message for details |
| `sanity.deleteDataset requires an ID.` | Check the error message for details |
| `Sanity: "..." not configured. Call sanity.setCredentials first.` | Check the error message for details |

```robinpath
set $result as sanity.query
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Document

Retrieve all items and loop through them.

```robinpath
sanity.setCredentials $token
set $result as sanity.getDocument
each $item in $result
  print $item
end
```

### 2. Create a new item with createDocument

Create a new resource and capture the result.

```robinpath
sanity.setCredentials $token
set $result as sanity.createDocument
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
sanity.setCredentials $token
set $existing as sanity.getDocument
if $existing == null
  sanity.createDocument
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Sanity workflow

Chain multiple sanity operations together.

```robinpath
sanity.setCredentials $token
set $r_query as sanity.query
set $r_getDocument as sanity.getDocument
set $r_createDocument as sanity.createDocument
print "All operations complete"
```

### 5. Safe query with validation

Check results before proceeding.

```robinpath
sanity.setCredentials $token
set $result as sanity.query
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
