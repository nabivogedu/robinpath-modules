---
title: "Webflow"
module: "webflow"
package: "@robinpath/webflow"
description: "Webflow module for RobinPath."
category: "cms"
tags: [webflow, cms]
type: "integration"
auth: "api-key"
functionCount: 19
baseUrl: "https://api.webflow.com"
---

# Webflow

> Webflow module for RobinPath.

**Package:** `@robinpath/webflow` | **Category:** Cms | **Type:** Integration


## Authentication

```robinpath
webflow.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `webflow` module when you need to:

- **listSites** -- Use `webflow.listSites` to perform this operation
- **getSite** -- Use `webflow.getSite` to perform this operation
- **publishSite** -- Use `webflow.publishSite` to perform this operation
- **listCollections** -- Use `webflow.listCollections` to perform this operation
- **getCollection** -- Use `webflow.getCollection` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure webflow credentials. | `object` |
| [`listSites`](#listsites) | listSites | `object` |
| [`getSite`](#getsite) | getSite | `object` |
| [`publishSite`](#publishsite) | publishSite | `object` |
| [`listCollections`](#listcollections) | listCollections | `object` |
| [`getCollection`](#getcollection) | getCollection | `object` |
| [`listCollectionItems`](#listcollectionitems) | listCollectionItems | `object` |
| [`getCollectionItem`](#getcollectionitem) | getCollectionItem | `object` |
| [`createCollectionItem`](#createcollectionitem) | createCollectionItem | `object` |
| [`updateCollectionItem`](#updatecollectionitem) | updateCollectionItem | `object` |
| [`deleteCollectionItem`](#deletecollectionitem) | deleteCollectionItem | `object` |
| [`publishCollectionItems`](#publishcollectionitems) | publishCollectionItems | `object` |
| [`listFormSubmissions`](#listformsubmissions) | listFormSubmissions | `object` |
| [`listDomains`](#listdomains) | listDomains | `object` |
| [`getUser`](#getuser) | getUser | `object` |
| [`listUsers`](#listusers) | listUsers | `object` |
| [`listOrders`](#listorders) | listOrders | `object` |
| [`getOrder`](#getorder) | getOrder | `object` |
| [`updateOrder`](#updateorder) | updateOrder | `object` |


## Functions

### setCredentials

Configure webflow credentials.

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### listSites

listSites

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.listSites
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSite

getSite

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.getSite
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### publishSite

publishSite

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.publishSite
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCollections

listCollections

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.listCollections
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCollection

getCollection

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.getCollection
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCollectionItems

listCollectionItems

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.listCollectionItems
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCollectionItem

getCollectionItem

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.getCollectionItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createCollectionItem

createCollectionItem

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.createCollectionItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateCollectionItem

updateCollectionItem

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.updateCollectionItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteCollectionItem

deleteCollectionItem

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.deleteCollectionItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### publishCollectionItems

publishCollectionItems

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.publishCollectionItems
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listFormSubmissions

listFormSubmissions

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.listFormSubmissions
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listDomains

listDomains

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.listDomains
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUser

getUser

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.getUser
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listUsers

listUsers

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.listUsers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listOrders

listOrders

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.listOrders
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getOrder

getOrder

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.getOrder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateOrder

updateOrder

**Module:** `webflow` | **Returns:** `object` -- API response.

```robinpath
webflow.updateOrder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Webflow API error (${res.status}): ${t}` | Check the error message for details |
| `webflow.setCredentials requires accessToken.` | Check the error message for details |
| `webflow.publishSite requires an ID.` | Check the error message for details |
| `webflow.updateCollectionItem requires an ID.` | Check the error message for details |
| `webflow.deleteCollectionItem requires an ID.` | Check the error message for details |
| `webflow.publishCollectionItems requires an ID.` | Check the error message for details |
| `webflow.updateOrder requires an ID.` | Check the error message for details |
| `Webflow: "..." not configured. Call webflow.setCredentials first.` | Check the error message for details |

```robinpath
set $result as webflow.listSites
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Sites

Retrieve all items and loop through them.

```robinpath
webflow.setCredentials $token
set $result as webflow.listSites
each $item in $result
  print $item
end
```

### 2. Create a new item with createCollectionItem

Create a new resource and capture the result.

```robinpath
webflow.setCredentials $token
set $result as webflow.createCollectionItem
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
webflow.setCredentials $token
set $created as webflow.createCollectionItem
# Update the created item
webflow.updateCollectionItem
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
webflow.setCredentials $token
set $existing as webflow.listSites
if $existing == null
  webflow.createCollectionItem
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Webflow workflow

Chain multiple webflow operations together.

```robinpath
webflow.setCredentials $token
set $r_listSites as webflow.listSites
set $r_getSite as webflow.getSite
set $r_publishSite as webflow.publishSite
print "All operations complete"
```

### 6. Safe listSites with validation

Check results before proceeding.

```robinpath
webflow.setCredentials $token
set $result as webflow.listSites
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
