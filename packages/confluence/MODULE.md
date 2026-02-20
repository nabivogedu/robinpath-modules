---
title: "Confluence"
module: "confluence"
package: "@robinpath/confluence"
description: "Confluence module for RobinPath."
category: "productivity"
tags: [confluence, productivity]
type: "integration"
auth: "api-key"
functionCount: 19
---

# Confluence

> Confluence module for RobinPath.

**Package:** `@robinpath/confluence` | **Category:** Productivity | **Type:** Integration


## Authentication

```robinpath
confluence.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `confluence` module when you need to:

- **listSpaces** -- Use `confluence.listSpaces` to perform this operation
- **getSpace** -- Use `confluence.getSpace` to perform this operation
- **createSpace** -- Use `confluence.createSpace` to perform this operation
- **listPages** -- Use `confluence.listPages` to perform this operation
- **getPage** -- Use `confluence.getPage` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure confluence credentials. | `object` |
| [`listSpaces`](#listspaces) | listSpaces | `object` |
| [`getSpace`](#getspace) | getSpace | `object` |
| [`createSpace`](#createspace) | createSpace | `object` |
| [`listPages`](#listpages) | listPages | `object` |
| [`getPage`](#getpage) | getPage | `object` |
| [`createPage`](#createpage) | createPage | `object` |
| [`updatePage`](#updatepage) | updatePage | `object` |
| [`deletePage`](#deletepage) | deletePage | `object` |
| [`listPageChildren`](#listpagechildren) | listPageChildren | `object` |
| [`getPageByTitle`](#getpagebytitle) | getPageByTitle | `object` |
| [`searchContent`](#searchcontent) | searchContent | `object` |
| [`listComments`](#listcomments) | listComments | `object` |
| [`addComment`](#addcomment) | addComment | `object` |
| [`listAttachments`](#listattachments) | listAttachments | `object` |
| [`getLabels`](#getlabels) | getLabels | `object` |
| [`addLabel`](#addlabel) | addLabel | `object` |
| [`removeLabel`](#removelabel) | removeLabel | `object` |
| [`getPageHistory`](#getpagehistory) | getPageHistory | `object` |


## Functions

### setCredentials

Configure confluence credentials.

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | `string` | Yes | domain |
| `email` | `string` | Yes | email |
| `apiToken` | `string` | Yes | apiToken |

---

### listSpaces

listSpaces

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.listSpaces
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSpace

getSpace

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.getSpace
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createSpace

createSpace

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.createSpace
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPages

listPages

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.listPages
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPage

getPage

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.getPage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createPage

createPage

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.createPage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updatePage

updatePage

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.updatePage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deletePage

deletePage

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.deletePage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPageChildren

listPageChildren

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.listPageChildren
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPageByTitle

getPageByTitle

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.getPageByTitle
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchContent

searchContent

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.searchContent
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listComments

listComments

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.listComments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addComment

addComment

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.addComment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listAttachments

listAttachments

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.listAttachments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getLabels

getLabels

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.getLabels
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addLabel

addLabel

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.addLabel
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### removeLabel

removeLabel

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.removeLabel
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPageHistory

getPageHistory

**Module:** `confluence` | **Returns:** `object` -- API response.

```robinpath
confluence.getPageHistory
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Confluence API error (${res.status}): ${t}` | Check the error message for details |
| `confluence.setCredentials requires domain, email, apiToken.` | Check the error message for details |
| `confluence.updatePage requires an ID.` | Check the error message for details |
| `confluence.deletePage requires an ID.` | Check the error message for details |
| `confluence.removeLabel requires an ID.` | Check the error message for details |
| `Confluence: "..." not configured. Call confluence.setCredentials first.` | Check the error message for details |

```robinpath
set $result as confluence.listSpaces
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Spaces

Retrieve all items and loop through them.

```robinpath
confluence.setCredentials $token
set $result as confluence.listSpaces
each $item in $result
  print $item
end
```

### 2. Create a new item with createSpace

Create a new resource and capture the result.

```robinpath
confluence.setCredentials $token
set $result as confluence.createSpace
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
confluence.setCredentials $token
set $created as confluence.createSpace
# Update the created item
confluence.updatePage
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
confluence.setCredentials $token
set $existing as confluence.listSpaces
if $existing == null
  confluence.createSpace
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Confluence workflow

Chain multiple confluence operations together.

```robinpath
confluence.setCredentials $token
set $r_listSpaces as confluence.listSpaces
set $r_getSpace as confluence.getSpace
set $r_createSpace as confluence.createSpace
print "All operations complete"
```

### 6. Safe listSpaces with validation

Check results before proceeding.

```robinpath
confluence.setCredentials $token
set $result as confluence.listSpaces
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **google-sheets** -- Google Sheets module for complementary functionality
- **google-calendar** -- Google Calendar module for complementary functionality
- **google-contacts** -- Google Contacts module for complementary functionality
- **google-forms** -- Google Forms module for complementary functionality
- **gmail** -- Gmail module for complementary functionality
