---
title: "LinkedIn"
module: "linkedin"
package: "@robinpath/linkedin"
description: "LinkedIn module for RobinPath."
category: "social-media"
tags: [linkedin, social media]
type: "integration"
auth: "bearer-token"
functionCount: 20
baseUrl: "https://api.linkedin.com"
---

# LinkedIn

> LinkedIn module for RobinPath.

**Package:** `@robinpath/linkedin` | **Category:** Social Media | **Type:** Integration


## Authentication

```robinpath
linkedin.setToken "your-access-token"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `linkedin` module when you need to:

- **Get the authenticated user's profile using /v2/userinfo** -- Use `linkedin.getProfile` to perform this operation
- **Get organization/company page information** -- Use `linkedin.getOrganization` to perform this operation
- **Create a text post (share on feed)** -- Use `linkedin.createPost` to perform this operation
- **Share an article with URL, title, and description** -- Use `linkedin.createArticlePost` to perform this operation
- **Share an image post with text** -- Use `linkedin.createImagePost` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setToken`](#settoken) | Store an OAuth2 access token for LinkedIn API requests | `{ok: true}` |
| [`getProfile`](#getprofile) | Get the authenticated user's profile using /v2/userinfo | `User profile object with sub, name, email, picture, etc.` |
| [`getOrganization`](#getorganization) | Get organization/company page information | `Organization object with name, description, website, etc.` |
| [`createPost`](#createpost) | Create a text post (share on feed) | `Created post object with id` |
| [`createArticlePost`](#createarticlepost) | Share an article with URL, title, and description | `Created post object with id` |
| [`createImagePost`](#createimagepost) | Share an image post with text | `Created post object with id` |
| [`deletePost`](#deletepost) | Delete a post by its URN | `{ok: true, status}` |
| [`getPost`](#getpost) | Get post details by URN | `Post object with author, text, visibility, etc.` |
| [`registerImageUpload`](#registerimageupload) | Register an image upload and get the upload URL and image URN | `{uploadUrl, imageUrn, mediaArtifact}` |
| [`uploadImage`](#uploadimage) | Upload an image binary to the URL from registerImageUpload | `{ok: true, status}` |
| [`addComment`](#addcomment) | Add a comment on a post | `Created comment object` |
| [`getComments`](#getcomments) | List comments on a post | `Object with elements array of comments` |
| [`deleteComment`](#deletecomment) | Delete a comment by its URN | `{ok: true, status}` |
| [`addReaction`](#addreaction) | React to a post (LIKE, PRAISE, EMPATHY, INTEREST, APPRECIATION) | `Reaction result object` |
| [`removeReaction`](#removereaction) | Remove a reaction from a post | `{ok: true, status}` |
| [`getReactions`](#getreactions) | Get all reactions on a post | `Object with elements array of reactions` |
| [`getFollowerCount`](#getfollowercount) | Get the follower count for an organization | `{organizationId, followerCount}` |
| [`getShareStatistics`](#getsharestatistics) | Get post/share analytics for an organization | `Share statistics with impressions, clicks, engagement, etc.` |
| [`searchPeople`](#searchpeople) | Search for people on LinkedIn (limited access, requires special permissions) | `Search results object with people array` |
| [`getConnections`](#getconnections) | Get first-degree connections of the authenticated user | `Connections list with elements array` |


## Functions

### setToken

Store an OAuth2 access token for LinkedIn API requests

**Module:** `linkedin` | **Returns:** `object` -- {ok: true}

```robinpath
linkedin.setToken "your-access-token"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | OAuth2 access token |

---

### getProfile

Get the authenticated user's profile using /v2/userinfo

**Module:** `linkedin` | **Returns:** `object` -- User profile object with sub, name, email, picture, etc.

```robinpath
linkedin.getProfile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### getOrganization

Get organization/company page information

**Module:** `linkedin` | **Returns:** `object` -- Organization object with name, description, website, etc.

```robinpath
linkedin.getOrganization "12345678"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `organizationId` | `string` | Yes | Organization numeric ID |

---

### createPost

Create a text post (share on feed)

**Module:** `linkedin` | **Returns:** `object` -- Created post object with id

```robinpath
linkedin.createPost "urn:li:person:abc123" "Hello LinkedIn!" {"visibility": "PUBLIC"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `authorUrn` | `string` | Yes | Author URN (e.g. urn:li:person:{id} or urn:li:organization:{id}) |
| `text` | `string` | Yes | Post text content |
| `options` | `object` | No | {visibility?: 'PUBLIC'|'CONNECTIONS', mediaCategory?: string} |

---

### createArticlePost

Share an article with URL, title, and description

**Module:** `linkedin` | **Returns:** `object` -- Created post object with id

```robinpath
linkedin.createArticlePost "urn:li:person:abc123" "Great read!" "https://example.com/article" {"title": "Article Title"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `authorUrn` | `string` | Yes | Author URN |
| `text` | `string` | Yes | Post commentary text |
| `articleUrl` | `string` | Yes | URL of the article to share |
| `options` | `object` | No | {visibility?, title?, description?} |

---

### createImagePost

Share an image post with text

**Module:** `linkedin` | **Returns:** `object` -- Created post object with id

```robinpath
linkedin.createImagePost "urn:li:person:abc123" "Check this out!" "urn:li:digitalmediaAsset:abc" {"title": "Photo"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `authorUrn` | `string` | Yes | Author URN |
| `text` | `string` | Yes | Post text content |
| `imageUrn` | `string` | Yes | Image URN from registerImageUpload |
| `options` | `object` | No | {visibility?, title?, description?} |

---

### deletePost

Delete a post by its URN

**Module:** `linkedin` | **Returns:** `object` -- {ok: true, status}

```robinpath
linkedin.deletePost "urn:li:ugcPost:123456"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postUrn` | `string` | Yes | URN of the post to delete |

---

### getPost

Get post details by URN

**Module:** `linkedin` | **Returns:** `object` -- Post object with author, text, visibility, etc.

```robinpath
linkedin.getPost "urn:li:ugcPost:123456"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postUrn` | `string` | Yes | URN of the post |

---

### registerImageUpload

Register an image upload and get the upload URL and image URN

**Module:** `linkedin` | **Returns:** `object` -- {uploadUrl, imageUrn, mediaArtifact}

```robinpath
linkedin.registerImageUpload "urn:li:person:abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ownerUrn` | `string` | Yes | Owner URN (e.g. urn:li:person:{id}) |

---

### uploadImage

Upload an image binary to the URL from registerImageUpload

**Module:** `linkedin` | **Returns:** `object` -- {ok: true, status}

```robinpath
linkedin.uploadImage "https://api.linkedin.com/mediaUpload/..." "./photo.jpg"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uploadUrl` | `string` | Yes | Upload URL from registerImageUpload |
| `imagePath` | `string` | Yes | Local path to the image file |

---

### addComment

Add a comment on a post

**Module:** `linkedin` | **Returns:** `object` -- Created comment object

```robinpath
linkedin.addComment "urn:li:ugcPost:123456" "Great post!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postUrn` | `string` | Yes | URN of the post to comment on |
| `text` | `string` | Yes | Comment text |

---

### getComments

List comments on a post

**Module:** `linkedin` | **Returns:** `object` -- Object with elements array of comments

```robinpath
linkedin.getComments "urn:li:ugcPost:123456" {"count": 20}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postUrn` | `string` | Yes | URN of the post |
| `options` | `object` | No | {start?: number, count?: number} |

---

### deleteComment

Delete a comment by its URN

**Module:** `linkedin` | **Returns:** `object` -- {ok: true, status}

```robinpath
linkedin.deleteComment "urn:li:comment:(ugcPost:123,456)"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `commentUrn` | `string` | Yes | URN of the comment to delete |

---

### addReaction

React to a post (LIKE, PRAISE, EMPATHY, INTEREST, APPRECIATION)

**Module:** `linkedin` | **Returns:** `object` -- Reaction result object

```robinpath
linkedin.addReaction "urn:li:ugcPost:123456" "LIKE"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postUrn` | `string` | Yes | URN of the post to react to |
| `reactionType` | `string` | Yes | Reaction type: LIKE, PRAISE, EMPATHY, INTEREST, APPRECIATION |

---

### removeReaction

Remove a reaction from a post

**Module:** `linkedin` | **Returns:** `object` -- {ok: true, status}

```robinpath
linkedin.removeReaction "urn:li:ugcPost:123456" "LIKE"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postUrn` | `string` | Yes | URN of the post |
| `reactionType` | `string` | Yes | Reaction type to remove: LIKE, PRAISE, EMPATHY, INTEREST, APPRECIATION |

---

### getReactions

Get all reactions on a post

**Module:** `linkedin` | **Returns:** `object` -- Object with elements array of reactions

```robinpath
linkedin.getReactions "urn:li:ugcPost:123456"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postUrn` | `string` | Yes | URN of the post |

---

### getFollowerCount

Get the follower count for an organization

**Module:** `linkedin` | **Returns:** `object` -- {organizationId, followerCount}

```robinpath
linkedin.getFollowerCount "urn:li:organization:12345678"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `organizationUrn` | `string` | Yes | Organization URN or numeric ID |

---

### getShareStatistics

Get post/share analytics for an organization

**Module:** `linkedin` | **Returns:** `object` -- Share statistics with impressions, clicks, engagement, etc.

```robinpath
linkedin.getShareStatistics "urn:li:organization:12345678"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ownerUrn` | `string` | Yes | Owner URN (organizational entity) |
| `shareUrns` | `array` | No | Optional array of share URNs to filter |

---

### searchPeople

Search for people on LinkedIn (limited access, requires special permissions)

**Module:** `linkedin` | **Returns:** `object` -- Search results object with people array

```robinpath
linkedin.searchPeople "software engineer" {"count": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | Yes | Search keywords |
| `options` | `object` | No | {start?: number, count?: number} |

---

### getConnections

Get first-degree connections of the authenticated user

**Module:** `linkedin` | **Returns:** `object` -- Connections list with elements array

```robinpath
linkedin.getConnections {"count": 20}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {start?: number, count?: number} |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Access token not set. Call linkedin.setToken first.` | Check the error message for details |
| `LinkedIn API GET ${path} failed (${response.status}): ${errText}` | Check the error message for details |
| `LinkedIn API POST ${path} failed (${response.status}): ${errText}` | Check the error message for details |
| `LinkedIn API DELETE ${path} failed (${response.status}): ${errText}` | Check the error message for details |
| `Access token is required` | Check the error message for details |
| `Organization ID is required` | Check the error message for details |
| `Author URN is required (e.g. urn:li:person:{id})` | Check the error message for details |
| `Post text is required` | Check the error message for details |

```robinpath
set $result as linkedin.getProfile
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
linkedin.setToken $token
set $result as linkedin.getProfile
each $item in $result
  print $item
end
```

### 2. Create a new item with createPost

Create a new resource and capture the result.

```robinpath
linkedin.setToken $token
set $result as linkedin.createPost "urn:li:person:abc123" "Hello LinkedIn!" {"visibility": "PUBLIC"}
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
linkedin.setToken $token
set $existing as linkedin.getProfile
if $existing == null
  linkedin.createPost "urn:li:person:abc123" "Hello LinkedIn!" {"visibility": "PUBLIC"}
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step LinkedIn workflow

Chain multiple linkedin operations together.

```robinpath
linkedin.setToken $token
set $r_getProfile as linkedin.getProfile
set $r_getOrganization as linkedin.getOrganization "12345678"
set $r_createPost as linkedin.createPost "urn:li:person:abc123" "Hello LinkedIn!" {"visibility": "PUBLIC"}
print "All operations complete"
```

### 5. Safe getProfile with validation

Check results before proceeding.

```robinpath
linkedin.setToken $token
set $result as linkedin.getProfile
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
- **tiktok** -- TikTok module for complementary functionality
- **pinterest** -- Pinterest module for complementary functionality
