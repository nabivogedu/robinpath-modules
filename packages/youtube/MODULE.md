---
title: "YouTube"
module: "youtube"
package: "@robinpath/youtube"
description: "YouTube module for RobinPath."
category: "social-media"
tags: [youtube, social media]
type: "integration"
auth: "api-key"
functionCount: 21
baseUrl: "https://www.googleapis.com"
---

# YouTube

> YouTube module for RobinPath.

**Package:** `@robinpath/youtube` | **Category:** Social Media | **Type:** Integration


## Authentication

```robinpath
youtube.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `youtube` module when you need to:

- **searchVideos** -- Use `youtube.searchVideos` to perform this operation
- **getVideo** -- Use `youtube.getVideo` to perform this operation
- **listMyVideos** -- Use `youtube.listMyVideos` to perform this operation
- **updateVideo** -- Use `youtube.updateVideo` to perform this operation
- **deleteVideo** -- Use `youtube.deleteVideo` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure youtube credentials. | `object` |
| [`searchVideos`](#searchvideos) | searchVideos | `object` |
| [`getVideo`](#getvideo) | getVideo | `object` |
| [`listMyVideos`](#listmyvideos) | listMyVideos | `object` |
| [`updateVideo`](#updatevideo) | updateVideo | `object` |
| [`deleteVideo`](#deletevideo) | deleteVideo | `object` |
| [`listChannels`](#listchannels) | listChannels | `object` |
| [`getChannelStats`](#getchannelstats) | getChannelStats | `object` |
| [`listPlaylists`](#listplaylists) | listPlaylists | `object` |
| [`getPlaylist`](#getplaylist) | getPlaylist | `object` |
| [`createPlaylist`](#createplaylist) | createPlaylist | `object` |
| [`deletePlaylist`](#deleteplaylist) | deletePlaylist | `object` |
| [`listPlaylistItems`](#listplaylistitems) | listPlaylistItems | `object` |
| [`addVideoToPlaylist`](#addvideotoplaylist) | addVideoToPlaylist | `object` |
| [`removeFromPlaylist`](#removefromplaylist) | removeFromPlaylist | `object` |
| [`listComments`](#listcomments) | listComments | `object` |
| [`addComment`](#addcomment) | addComment | `object` |
| [`replyToComment`](#replytocomment) | replyToComment | `object` |
| [`setThumbnail`](#setthumbnail) | setThumbnail | `object` |
| [`getVideoCategories`](#getvideocategories) | getVideoCategories | `object` |
| [`listSubscriptions`](#listsubscriptions) | listSubscriptions | `object` |


## Functions

### setCredentials

Configure youtube credentials.

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### searchVideos

searchVideos

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.searchVideos
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getVideo

getVideo

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.getVideo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listMyVideos

listMyVideos

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.listMyVideos
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateVideo

updateVideo

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.updateVideo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteVideo

deleteVideo

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.deleteVideo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listChannels

listChannels

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.listChannels
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getChannelStats

getChannelStats

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.getChannelStats
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPlaylists

listPlaylists

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.listPlaylists
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPlaylist

getPlaylist

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.getPlaylist
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createPlaylist

createPlaylist

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.createPlaylist
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deletePlaylist

deletePlaylist

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.deletePlaylist
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPlaylistItems

listPlaylistItems

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.listPlaylistItems
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addVideoToPlaylist

addVideoToPlaylist

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.addVideoToPlaylist
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### removeFromPlaylist

removeFromPlaylist

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.removeFromPlaylist
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listComments

listComments

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.listComments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addComment

addComment

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.addComment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### replyToComment

replyToComment

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.replyToComment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### setThumbnail

setThumbnail

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.setThumbnail
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getVideoCategories

getVideoCategories

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.getVideoCategories
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listSubscriptions

listSubscriptions

**Module:** `youtube` | **Returns:** `object` -- API response.

```robinpath
youtube.listSubscriptions
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Youtube API error (${res.status}): ${t}` | Check the error message for details |
| `youtube.setCredentials requires accessToken.` | Check the error message for details |
| `youtube.updateVideo requires an ID.` | Check the error message for details |
| `youtube.deleteVideo requires an ID.` | Check the error message for details |
| `youtube.deletePlaylist requires an ID.` | Check the error message for details |
| `youtube.removeFromPlaylist requires an ID.` | Check the error message for details |
| `Youtube: "..." not configured. Call youtube.setCredentials first.` | Check the error message for details |

```robinpath
set $result as youtube.searchVideos
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Video

Retrieve all items and loop through them.

```robinpath
youtube.setCredentials $token
set $result as youtube.getVideo
each $item in $result
  print $item
end
```

### 2. Create a new item with createPlaylist

Create a new resource and capture the result.

```robinpath
youtube.setCredentials $token
set $result as youtube.createPlaylist
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
youtube.setCredentials $token
set $created as youtube.createPlaylist
# Update the created item
youtube.updateVideo
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
youtube.setCredentials $token
set $existing as youtube.getVideo
if $existing == null
  youtube.createPlaylist
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step YouTube workflow

Chain multiple youtube operations together.

```robinpath
youtube.setCredentials $token
set $r_searchVideos as youtube.searchVideos
set $r_getVideo as youtube.getVideo
set $r_listMyVideos as youtube.listMyVideos
print "All operations complete"
```

### 6. Safe searchVideos with validation

Check results before proceeding.

```robinpath
youtube.setCredentials $token
set $result as youtube.searchVideos
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
- **tiktok** -- TikTok module for complementary functionality
