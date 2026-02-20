---
title: "Contentful"
module: "contentful"
package: "@robinpath/contentful"
description: "Contentful module for RobinPath."
category: "cms"
tags: [contentful, cms]
type: "integration"
auth: "api-key"
functionCount: 21
baseUrl: "https://api.contentful.com"
---

# Contentful

> Contentful module for RobinPath.

**Package:** `@robinpath/contentful` | **Category:** Cms | **Type:** Integration


## Authentication

```robinpath
contentful.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `contentful` module when you need to:

- **listEntries** -- Use `contentful.listEntries` to perform this operation
- **getEntry** -- Use `contentful.getEntry` to perform this operation
- **createEntry** -- Use `contentful.createEntry` to perform this operation
- **updateEntry** -- Use `contentful.updateEntry` to perform this operation
- **deleteEntry** -- Use `contentful.deleteEntry` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure contentful credentials. | `object` |
| [`listEntries`](#listentries) | listEntries | `object` |
| [`getEntry`](#getentry) | getEntry | `object` |
| [`createEntry`](#createentry) | createEntry | `object` |
| [`updateEntry`](#updateentry) | updateEntry | `object` |
| [`deleteEntry`](#deleteentry) | deleteEntry | `object` |
| [`publishEntry`](#publishentry) | publishEntry | `object` |
| [`unpublishEntry`](#unpublishentry) | unpublishEntry | `object` |
| [`listAssets`](#listassets) | listAssets | `object` |
| [`getAsset`](#getasset) | getAsset | `object` |
| [`createAsset`](#createasset) | createAsset | `object` |
| [`publishAsset`](#publishasset) | publishAsset | `object` |
| [`listContentTypes`](#listcontenttypes) | listContentTypes | `object` |
| [`getContentType`](#getcontenttype) | getContentType | `object` |
| [`createContentType`](#createcontenttype) | createContentType | `object` |
| [`listEnvironments`](#listenvironments) | listEnvironments | `object` |
| [`getSpace`](#getspace) | getSpace | `object` |
| [`searchEntries`](#searchentries) | searchEntries | `object` |
| [`listLocales`](#listlocales) | listLocales | `object` |
| [`getWebhooks`](#getwebhooks) | getWebhooks | `object` |
| [`archiveEntry`](#archiveentry) | archiveEntry | `object` |


## Functions

### setCredentials

Configure contentful credentials.

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |
| `spaceId` | `string` | Yes | spaceId |

---

### listEntries

listEntries

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.listEntries
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getEntry

getEntry

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.getEntry
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createEntry

createEntry

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.createEntry
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateEntry

updateEntry

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.updateEntry
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteEntry

deleteEntry

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.deleteEntry
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### publishEntry

publishEntry

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.publishEntry
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### unpublishEntry

unpublishEntry

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.unpublishEntry
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listAssets

listAssets

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.listAssets
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getAsset

getAsset

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.getAsset
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createAsset

createAsset

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.createAsset
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### publishAsset

publishAsset

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.publishAsset
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listContentTypes

listContentTypes

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.listContentTypes
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getContentType

getContentType

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.getContentType
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createContentType

createContentType

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.createContentType
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listEnvironments

listEnvironments

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.listEnvironments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSpace

getSpace

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.getSpace
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchEntries

searchEntries

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.searchEntries
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listLocales

listLocales

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.listLocales
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getWebhooks

getWebhooks

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.getWebhooks
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### archiveEntry

archiveEntry

**Module:** `contentful` | **Returns:** `object` -- API response.

```robinpath
contentful.archiveEntry
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Contentful API error (${res.status}): ${t}` | Check the error message for details |
| `contentful.setCredentials requires accessToken, spaceId.` | Check the error message for details |
| `contentful.updateEntry requires an ID.` | Check the error message for details |
| `contentful.deleteEntry requires an ID.` | Check the error message for details |
| `contentful.publishEntry requires an ID.` | Check the error message for details |
| `contentful.unpublishEntry requires an ID.` | Check the error message for details |
| `contentful.publishAsset requires an ID.` | Check the error message for details |
| `contentful.archiveEntry requires an ID.` | Check the error message for details |

```robinpath
set $result as contentful.listEntries
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Entries

Retrieve all items and loop through them.

```robinpath
contentful.setCredentials $token
set $result as contentful.listEntries
each $item in $result
  print $item
end
```

### 2. Create a new item with createEntry

Create a new resource and capture the result.

```robinpath
contentful.setCredentials $token
set $result as contentful.createEntry
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
contentful.setCredentials $token
set $created as contentful.createEntry
# Update the created item
contentful.updateEntry
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
contentful.setCredentials $token
set $existing as contentful.listEntries
if $existing == null
  contentful.createEntry
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Contentful workflow

Chain multiple contentful operations together.

```robinpath
contentful.setCredentials $token
set $r_listEntries as contentful.listEntries
set $r_getEntry as contentful.getEntry
set $r_createEntry as contentful.createEntry
print "All operations complete"
```

### 6. Safe listEntries with validation

Check results before proceeding.

```robinpath
contentful.setCredentials $token
set $result as contentful.listEntries
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
