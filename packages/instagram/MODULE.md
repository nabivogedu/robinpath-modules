---
title: "Instagram"
module: "instagram"
package: "@robinpath/instagram"
description: "Instagram module for RobinPath."
category: "social-media"
tags: [instagram, social media]
type: "integration"
auth: "bearer-token"
functionCount: 21
baseUrl: "https://graph.facebook.com/v22.0"
---

# Instagram

> Instagram module for RobinPath.

**Package:** `@robinpath/instagram` | **Category:** Social Media | **Type:** Integration


## Authentication

```robinpath
instagram.setToken "EAAG..."
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `instagram` module when you need to:

- **Get authenticated user's Instagram profile (id, username, biography, followers, media count, etc.)** -- Use `instagram.getProfile` to perform this operation
- **Get details of a specific media item by ID** -- Use `instagram.getMedia` to perform this operation
- **List the authenticated user's media posts with pagination** -- Use `instagram.listMedia` to perform this operation
- **Create a media container for an image post (returns container ID for publishing)** -- Use `instagram.createMediaContainer` to perform this operation
- **Create a media container for a video or Reel post** -- Use `instagram.createVideoContainer` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setToken`](#settoken) | Store a long-lived Instagram access token for API calls | `{ok, accountId}` |
| [`setBusinessAccount`](#setbusinessaccount) | Store access token and IG Business Account ID for full API access | `{ok, accountId, igBusinessAccountId}` |
| [`getProfile`](#getprofile) | Get authenticated user's Instagram profile (id, username, biography, followers, media count, etc.) | `{id, name, username, biography, followers_count, follows_count, media_count, ...}` |
| [`getMedia`](#getmedia) | Get details of a specific media item by ID | `{id, caption, media_type, media_url, timestamp, permalink, like_count, comments_count, ...}` |
| [`listMedia`](#listmedia) | List the authenticated user's media posts with pagination | `{data: [...media], paging: {cursors, next, previous}}` |
| [`createMediaContainer`](#createmediacontainer) | Create a media container for an image post (returns container ID for publishing) | `{id} - container ID for use with publishMedia` |
| [`createVideoContainer`](#createvideocontainer) | Create a media container for a video or Reel post | `{id} - container ID for use with publishMedia` |
| [`createCarouselContainer`](#createcarouselcontainer) | Create a carousel container from multiple child container IDs | `{id} - carousel container ID for use with publishMedia` |
| [`publishMedia`](#publishmedia) | Publish a previously created media container (image, video, or carousel) | `{id} - published media ID` |
| [`getMediaInsights`](#getmediainsights) | Get insights/analytics for a specific media item | `{data: [{name, period, values, title, description, id}]}` |
| [`getAccountInsights`](#getaccountinsights) | Get account-level insights (impressions, reach, follower_count, etc.) | `{data: [{name, period, values, title, description}]}` |
| [`getComments`](#getcomments) | List comments on a media post | `{data: [{id, text, timestamp, username, like_count}], paging}` |
| [`replyToComment`](#replytocomment) | Reply to a specific comment on a media post | `{id} - reply comment ID` |
| [`deleteComment`](#deletecomment) | Delete or hide a comment by ID | `{ok, commentId}` |
| [`getStories`](#getstories) | Get the authenticated user's currently active stories | `{data: [{id, media_type, media_url, timestamp, permalink}]}` |
| [`getHashtag`](#gethashtag) | Search for a hashtag ID by name | `{data: [{id}]}` |
| [`getHashtagMedia`](#gethashtagmedia) | Get top or recent media for a hashtag | `{data: [...media], paging}` |
| [`getMentions`](#getmentions) | Get media posts where the authenticated user is tagged/mentioned | `{data: [...media], paging}` |
| [`sendMessage`](#sendmessage) | Send a direct message to a user via Instagram Messaging API | `{recipient_id, message_id}` |
| [`getConversations`](#getconversations) | List DM conversations for the authenticated account | `{data: [{id, updated_time, participants, messages}], paging}` |
| [`getMessages`](#getmessages) | Get messages within a specific DM conversation | `{data: [{id, message, from, to, created_time}], paging}` |


## Functions

### setToken

Store a long-lived Instagram access token for API calls

**Module:** `instagram` | **Returns:** `object` -- {ok, accountId}

```robinpath
instagram.setToken "EAAG..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | Long-lived access token from Meta/Facebook |

---

### setBusinessAccount

Store access token and IG Business Account ID for full API access

**Module:** `instagram` | **Returns:** `object` -- {ok, accountId, igBusinessAccountId}

```robinpath
instagram.setBusinessAccount "EAAG..." "17841400123456"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | Long-lived access token from Meta/Facebook |
| `igBusinessAccountId` | `string` | Yes | Instagram Business Account ID (numeric) |

---

### getProfile

Get authenticated user's Instagram profile (id, username, biography, followers, media count, etc.)

**Module:** `instagram` | **Returns:** `object` -- {id, name, username, biography, followers_count, follows_count, media_count, ...}

```robinpath
instagram.getProfile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {fields?: string} - comma-separated fields to retrieve |

---

### getMedia

Get details of a specific media item by ID

**Module:** `instagram` | **Returns:** `object` -- {id, caption, media_type, media_url, timestamp, permalink, like_count, comments_count, ...}

```robinpath
instagram.getMedia "17895695668004550"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mediaId` | `string` | Yes | Media ID to retrieve |
| `fields` | `string` | No | Comma-separated fields (default: id,caption,media_type,media_url,timestamp,permalink,like_count,comments_count) |

---

### listMedia

List the authenticated user's media posts with pagination

**Module:** `instagram` | **Returns:** `object` -- {data: [...media], paging: {cursors, next, previous}}

```robinpath
instagram.listMedia {"limit": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {limit?, after?, before?, fields?} |

---

### createMediaContainer

Create a media container for an image post (returns container ID for publishing)

**Module:** `instagram` | **Returns:** `object` -- {id} - container ID for use with publishMedia

```robinpath
instagram.createMediaContainer "https://example.com/photo.jpg" "Beautiful sunset! #nature"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `imageUrl` | `string` | Yes | Public URL of the image to post |
| `caption` | `string` | No | Post caption text |
| `options` | `object` | No | {locationId?, userTags?, isCarouselItem?} |

---

### createVideoContainer

Create a media container for a video or Reel post

**Module:** `instagram` | **Returns:** `object` -- {id} - container ID for use with publishMedia

```robinpath
instagram.createVideoContainer "https://example.com/video.mp4" "Check this out!" {"mediaType": "REELS"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `videoUrl` | `string` | Yes | Public URL of the video |
| `caption` | `string` | No | Post caption text |
| `options` | `object` | No | {mediaType?: 'REELS'|'VIDEO', coverUrl?, thumbOffset?, locationId?, isCarouselItem?, shareToFeed?} |

---

### createCarouselContainer

Create a carousel container from multiple child container IDs

**Module:** `instagram` | **Returns:** `object` -- {id} - carousel container ID for use with publishMedia

```robinpath
instagram.createCarouselContainer ["17889615691123456", "17889615691123457"] "Photo dump!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `children` | `array` | Yes | Array of child container IDs (minimum 2) |
| `caption` | `string` | No | Carousel caption text |

---

### publishMedia

Publish a previously created media container (image, video, or carousel)

**Module:** `instagram` | **Returns:** `object` -- {id} - published media ID

```robinpath
instagram.publishMedia "17889615691123456"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `containerId` | `string` | Yes | Container ID from createMediaContainer, createVideoContainer, or createCarouselContainer |

---

### getMediaInsights

Get insights/analytics for a specific media item

**Module:** `instagram` | **Returns:** `object` -- {data: [{name, period, values, title, description, id}]}

```robinpath
instagram.getMediaInsights "17895695668004550" "impressions,reach,engagement,saved"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mediaId` | `string` | Yes | Media ID to get insights for |
| `metrics` | `string` | No | Comma-separated metrics (default: impressions,reach,engagement,saved) |

---

### getAccountInsights

Get account-level insights (impressions, reach, follower_count, etc.)

**Module:** `instagram` | **Returns:** `object` -- {data: [{name, period, values, title, description}]}

```robinpath
instagram.getAccountInsights "impressions,reach,follower_count" "day"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `metrics` | `string` | Yes | Comma-separated metrics (e.g. impressions,reach,follower_count) |
| `period` | `string` | Yes | Time period: day, week, days_28, month, lifetime |
| `options` | `object` | No | {since?: unix_timestamp, until?: unix_timestamp} |

---

### getComments

List comments on a media post

**Module:** `instagram` | **Returns:** `object` -- {data: [{id, text, timestamp, username, like_count}], paging}

```robinpath
instagram.getComments "17895695668004550" {"limit": 25}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mediaId` | `string` | Yes | Media ID to list comments for |
| `options` | `object` | No | {limit?, after?, fields?} |

---

### replyToComment

Reply to a specific comment on a media post

**Module:** `instagram` | **Returns:** `object` -- {id} - reply comment ID

```robinpath
instagram.replyToComment "17858893269123456" "Thank you!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `commentId` | `string` | Yes | Comment ID to reply to |
| `message` | `string` | Yes | Reply text |

---

### deleteComment

Delete or hide a comment by ID

**Module:** `instagram` | **Returns:** `object` -- {ok, commentId}

```robinpath
instagram.deleteComment "17858893269123456"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `commentId` | `string` | Yes | Comment ID to delete |

---

### getStories

Get the authenticated user's currently active stories

**Module:** `instagram` | **Returns:** `object` -- {data: [{id, media_type, media_url, timestamp, permalink}]}

```robinpath
instagram.getStories
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {fields?: string} |

---

### getHashtag

Search for a hashtag ID by name

**Module:** `instagram` | **Returns:** `object` -- {data: [{id}]}

```robinpath
instagram.getHashtag "travel"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hashtagName` | `string` | Yes | Hashtag name without # (e.g. 'travel') |

---

### getHashtagMedia

Get top or recent media for a hashtag

**Module:** `instagram` | **Returns:** `object` -- {data: [...media], paging}

```robinpath
instagram.getHashtagMedia "17843853986012965" "top_media" {"limit": 20}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hashtagId` | `string` | Yes | Hashtag ID from getHashtag |
| `type` | `string` | No | 'top_media' or 'recent_media' (default: top_media) |
| `options` | `object` | No | {limit?, after?, fields?} |

---

### getMentions

Get media posts where the authenticated user is tagged/mentioned

**Module:** `instagram` | **Returns:** `object` -- {data: [...media], paging}

```robinpath
instagram.getMentions {"limit": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {limit?, after?, fields?} |

---

### sendMessage

Send a direct message to a user via Instagram Messaging API

**Module:** `instagram` | **Returns:** `object` -- {recipient_id, message_id}

```robinpath
instagram.sendMessage "17841400123456" "Hello from RobinPath!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recipientId` | `string` | Yes | Instagram-scoped ID of the recipient |
| `message` | `string` | Yes | Message text to send |

---

### getConversations

List DM conversations for the authenticated account

**Module:** `instagram` | **Returns:** `object` -- {data: [{id, updated_time, participants, messages}], paging}

```robinpath
instagram.getConversations {"limit": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {limit?, after?, fields?} |

---

### getMessages

Get messages within a specific DM conversation

**Module:** `instagram` | **Returns:** `object` -- {data: [{id, message, from, to, created_time}], paging}

```robinpath
instagram.getMessages "t_1234567890" {"limit": 20}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `conversationId` | `string` | Yes | Conversation ID from getConversations |
| `options` | `object` | No | {limit?, after?, fields?} |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Access token is required.` | Check the error message for details |
| `IG Business Account ID is required.` | Check the error message for details |
| `IG Business Account ID is required. Call instagram.setBusinessAccount first.` | Check the error message for details |
| `Media ID is required.` | Check the error message for details |
| `Image URL is required.` | Check the error message for details |
| `Video URL is required.` | Check the error message for details |
| `At least 2 child container IDs are required for a carousel.` | Check the error message for details |
| `Container ID is required.` | Check the error message for details |

```robinpath
set $result as instagram.getProfile
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Profile

Retrieve all items and loop through them.

```robinpath
instagram.setToken $token
set $result as instagram.getProfile
each $item in $result
  print $item
end
```

### 2. Create a new item with createMediaContainer

Create a new resource and capture the result.

```robinpath
instagram.setToken $token
set $result as instagram.createMediaContainer "https://example.com/photo.jpg" "Beautiful sunset! #nature"
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
instagram.setToken $token
set $existing as instagram.getProfile
if $existing == null
  instagram.createMediaContainer "https://example.com/photo.jpg" "Beautiful sunset! #nature"
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Instagram workflow

Chain multiple instagram operations together.

```robinpath
instagram.setToken $token
set $r_getProfile as instagram.getProfile
set $r_getMedia as instagram.getMedia "17895695668004550"
set $r_listMedia as instagram.listMedia {"limit": 10}
print "All operations complete"
```

### 5. Safe getProfile with validation

Check results before proceeding.

```robinpath
instagram.setToken $token
set $result as instagram.getProfile
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **facebook** -- Facebook module for complementary functionality
- **twitter** -- Twitter/X module for complementary functionality
- **linkedin** -- LinkedIn module for complementary functionality
- **tiktok** -- TikTok module for complementary functionality
- **pinterest** -- Pinterest module for complementary functionality
