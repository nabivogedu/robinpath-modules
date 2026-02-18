---
title: "Facebook"
module: "facebook"
package: "@robinpath/facebook"
description: "Facebook module for RobinPath."
category: "social-media"
tags: [facebook, social media]
type: "integration"
auth: "api-key"
functionCount: 21
baseUrl: "https://graph.facebook.com"
---

# Facebook

> Facebook module for RobinPath.

**Package:** `@robinpath/facebook` | **Category:** Social Media | **Type:** Integration


## Authentication

```robinpath
facebook.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `facebook` module when you need to:

- **getPageInfo** -- Use `facebook.getPageInfo` to perform this operation
- **listPagePosts** -- Use `facebook.listPagePosts` to perform this operation
- **createPagePost** -- Use `facebook.createPagePost` to perform this operation
- **updatePost** -- Use `facebook.updatePost` to perform this operation
- **deletePost** -- Use `facebook.deletePost` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure facebook credentials. | `object` |
| [`getPageInfo`](#getpageinfo) | getPageInfo | `object` |
| [`listPagePosts`](#listpageposts) | listPagePosts | `object` |
| [`createPagePost`](#createpagepost) | createPagePost | `object` |
| [`updatePost`](#updatepost) | updatePost | `object` |
| [`deletePost`](#deletepost) | deletePost | `object` |
| [`getPost`](#getpost) | getPost | `object` |
| [`getPostInsights`](#getpostinsights) | getPostInsights | `object` |
| [`getPageInsights`](#getpageinsights) | getPageInsights | `object` |
| [`listComments`](#listcomments) | listComments | `object` |
| [`replyToComment`](#replytocomment) | replyToComment | `object` |
| [`deleteComment`](#deletecomment) | deleteComment | `object` |
| [`hideComment`](#hidecomment) | hideComment | `object` |
| [`listPageEvents`](#listpageevents) | listPageEvents | `object` |
| [`createPageEvent`](#createpageevent) | createPageEvent | `object` |
| [`uploadPhoto`](#uploadphoto) | uploadPhoto | `object` |
| [`uploadVideo`](#uploadvideo) | uploadVideo | `object` |
| [`getAdAccounts`](#getadaccounts) | getAdAccounts | `object` |
| [`getCampaigns`](#getcampaigns) | getCampaigns | `object` |
| [`getMe`](#getme) | getMe | `object` |
| [`searchPages`](#searchpages) | searchPages | `object` |


## Functions

### setCredentials

Configure facebook credentials.

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### getPageInfo

getPageInfo

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.getPageInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPagePosts

listPagePosts

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.listPagePosts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createPagePost

createPagePost

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.createPagePost
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updatePost

updatePost

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.updatePost
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deletePost

deletePost

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.deletePost
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPost

getPost

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.getPost
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPostInsights

getPostInsights

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.getPostInsights
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPageInsights

getPageInsights

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.getPageInsights
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listComments

listComments

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.listComments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### replyToComment

replyToComment

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.replyToComment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteComment

deleteComment

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.deleteComment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### hideComment

hideComment

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.hideComment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPageEvents

listPageEvents

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.listPageEvents
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createPageEvent

createPageEvent

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.createPageEvent
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### uploadPhoto

uploadPhoto

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.uploadPhoto
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### uploadVideo

uploadVideo

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.uploadVideo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getAdAccounts

getAdAccounts

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.getAdAccounts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCampaigns

getCampaigns

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.getCampaigns
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getMe

getMe

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.getMe
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchPages

searchPages

**Module:** `facebook` | **Returns:** `object` -- API response.

```robinpath
facebook.searchPages
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Facebook API error (${res.status}): ${t}` | Check the error message for details |
| `facebook.setCredentials requires accessToken.` | Check the error message for details |
| `facebook.updatePost requires an ID.` | Check the error message for details |
| `facebook.deletePost requires an ID.` | Check the error message for details |
| `facebook.deleteComment requires an ID.` | Check the error message for details |
| `facebook.hideComment requires an ID.` | Check the error message for details |
| `Facebook: "..." not configured. Call facebook.setCredentials first.` | Check the error message for details |

```robinpath
set $result as facebook.getPageInfo
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate PageInfo

Retrieve all items and loop through them.

```robinpath
facebook.setCredentials $token
set $result as facebook.getPageInfo
each $item in $result
  print $item
end
```

### 2. Create a new item with createPagePost

Create a new resource and capture the result.

```robinpath
facebook.setCredentials $token
set $result as facebook.createPagePost
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
facebook.setCredentials $token
set $created as facebook.createPagePost
# Update the created item
facebook.updatePost
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
facebook.setCredentials $token
set $existing as facebook.getPageInfo
if $existing == null
  facebook.createPagePost
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Facebook workflow

Chain multiple facebook operations together.

```robinpath
facebook.setCredentials $token
set $r_getPageInfo as facebook.getPageInfo
set $r_listPagePosts as facebook.listPagePosts
set $r_createPagePost as facebook.createPagePost
print "All operations complete"
```

### 6. Safe getPageInfo with validation

Check results before proceeding.

```robinpath
facebook.setCredentials $token
set $result as facebook.getPageInfo
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **instagram** -- Instagram module for complementary functionality
- **twitter** -- Twitter/X module for complementary functionality
- **linkedin** -- LinkedIn module for complementary functionality
- **tiktok** -- TikTok module for complementary functionality
- **pinterest** -- Pinterest module for complementary functionality
