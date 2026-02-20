---
title: "TikTok"
module: "tiktok"
package: "@robinpath/tiktok"
description: "TikTok module for RobinPath."
category: "social-media"
tags: [tiktok, social media]
type: "integration"
auth: "api-key"
functionCount: 17
baseUrl: "https://open.tiktokapis.com"
---

# TikTok

> TikTok module for RobinPath.

**Package:** `@robinpath/tiktok` | **Category:** Social Media | **Type:** Integration


## Authentication

```robinpath
tiktok.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `tiktok` module when you need to:

- **getUserInfo** -- Use `tiktok.getUserInfo` to perform this operation
- **listVideos** -- Use `tiktok.listVideos` to perform this operation
- **getVideoById** -- Use `tiktok.getVideoById` to perform this operation
- **initVideoPublish** -- Use `tiktok.initVideoPublish` to perform this operation
- **queryCreatorInfo** -- Use `tiktok.queryCreatorInfo` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure tiktok credentials. | `object` |
| [`getUserInfo`](#getuserinfo) | getUserInfo | `object` |
| [`listVideos`](#listvideos) | listVideos | `object` |
| [`getVideoById`](#getvideobyid) | getVideoById | `object` |
| [`initVideoPublish`](#initvideopublish) | initVideoPublish | `object` |
| [`queryCreatorInfo`](#querycreatorinfo) | queryCreatorInfo | `object` |
| [`getVideoComments`](#getvideocomments) | getVideoComments | `object` |
| [`replyToComment`](#replytocomment) | replyToComment | `object` |
| [`getVideoInsights`](#getvideoinsights) | getVideoInsights | `object` |
| [`searchVideos`](#searchvideos) | searchVideos | `object` |
| [`getTrendingHashtags`](#gettrendinghashtags) | getTrendingHashtags | `object` |
| [`getHashtagInfo`](#gethashtaginfo) | getHashtagInfo | `object` |
| [`getUserFollowers`](#getuserfollowers) | getUserFollowers | `object` |
| [`getUserFollowing`](#getuserfollowing) | getUserFollowing | `object` |
| [`likeVideo`](#likevideo) | likeVideo | `object` |
| [`unlikeVideo`](#unlikevideo) | unlikeVideo | `object` |
| [`getAccountStats`](#getaccountstats) | getAccountStats | `object` |


## Functions

### setCredentials

Configure tiktok credentials.

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### getUserInfo

getUserInfo

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.getUserInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listVideos

listVideos

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.listVideos
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getVideoById

getVideoById

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.getVideoById
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### initVideoPublish

initVideoPublish

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.initVideoPublish
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### queryCreatorInfo

queryCreatorInfo

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.queryCreatorInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getVideoComments

getVideoComments

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.getVideoComments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### replyToComment

replyToComment

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.replyToComment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getVideoInsights

getVideoInsights

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.getVideoInsights
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchVideos

searchVideos

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.searchVideos
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTrendingHashtags

getTrendingHashtags

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.getTrendingHashtags
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getHashtagInfo

getHashtagInfo

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.getHashtagInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUserFollowers

getUserFollowers

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.getUserFollowers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUserFollowing

getUserFollowing

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.getUserFollowing
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### likeVideo

likeVideo

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.likeVideo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### unlikeVideo

unlikeVideo

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.unlikeVideo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getAccountStats

getAccountStats

**Module:** `tiktok` | **Returns:** `object` -- API response.

```robinpath
tiktok.getAccountStats
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Tiktok API error (${res.status}): ${t}` | Check the error message for details |
| `tiktok.setCredentials requires accessToken.` | Check the error message for details |
| `tiktok.unlikeVideo requires an ID.` | Check the error message for details |
| `Tiktok: "..." not configured. Call tiktok.setCredentials first.` | Check the error message for details |

```robinpath
set $result as tiktok.getUserInfo
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate UserInfo

Retrieve all items and loop through them.

```robinpath
tiktok.setCredentials $token
set $result as tiktok.getUserInfo
each $item in $result
  print $item
end
```

### 2. Multi-step TikTok workflow

Chain multiple tiktok operations together.

```robinpath
tiktok.setCredentials $token
set $r_getUserInfo as tiktok.getUserInfo
set $r_listVideos as tiktok.listVideos
set $r_getVideoById as tiktok.getVideoById
print "All operations complete"
```

### 3. Safe getUserInfo with validation

Check results before proceeding.

```robinpath
tiktok.setCredentials $token
set $result as tiktok.getUserInfo
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **facebook** -- Facebook module for complementary functionality
- **instagram** -- Instagram module for complementary functionality
- **twitter** -- Twitter/X module for complementary functionality
- **linkedin** -- LinkedIn module for complementary functionality
- **pinterest** -- Pinterest module for complementary functionality
