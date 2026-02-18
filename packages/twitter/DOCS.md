---
title: "Twitter/X"
module: "twitter"
package: "@robinpath/twitter"
description: "Twitter/X module for RobinPath."
category: "social-media"
tags: [twitter, social media]
type: "integration"
auth: "bearer-token"
functionCount: 31
---

# Twitter/X

> Twitter/X module for RobinPath.

**Package:** `@robinpath/twitter` | **Category:** Social Media | **Type:** Integration


## Authentication

```robinpath
twitter.setToken "AAAA...your-bearer-token"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `twitter` module when you need to:

- **Create a new tweet** -- Use `twitter.createTweet` to perform this operation
- **Delete a tweet by ID** -- Use `twitter.deleteTweet` to perform this operation
- **Get a single tweet by ID with optional expansions and fields** -- Use `twitter.getTweet` to perform this operation
- **Get multiple tweets by IDs** -- Use `twitter.getTweets` to perform this operation
- **Get tweets from a user's timeline** -- Use `twitter.getUserTimeline` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setToken`](#settoken) | Store a Bearer token for X/Twitter API v2 authentication | `{ok: true}` |
| [`createTweet`](#createtweet) | Create a new tweet | `{data: {id, text}}` |
| [`deleteTweet`](#deletetweet) | Delete a tweet by ID | `{data: {deleted: true}}` |
| [`getTweet`](#gettweet) | Get a single tweet by ID with optional expansions and fields | `{data: {id, text, ...}, includes?: {...}}` |
| [`getTweets`](#gettweets) | Get multiple tweets by IDs | `{data: [{id, text, ...}]}` |
| [`getUserTimeline`](#getusertimeline) | Get tweets from a user's timeline | `{data: [{id, text}], meta: {next_token?, result_count}}` |
| [`getMentions`](#getmentions) | Get tweets mentioning a user | `{data: [{id, text}], meta: {next_token?, result_count}}` |
| [`searchRecent`](#searchrecent) | Search recent tweets (last 7 days) with a query | `{data: [{id, text}], meta: {newest_id, oldest_id, result_count, next_token?}}` |
| [`getUser`](#getuser) | Get a user by username | `{data: {id, name, username}}` |
| [`getUserById`](#getuserbyid) | Get a user by their ID | `{data: {id, name, username}}` |
| [`getMe`](#getme) | Get the authenticated user's profile | `{data: {id, name, username, description, profile_image_url, public_metrics}}` |
| [`getFollowers`](#getfollowers) | Get followers of a user | `{data: [{id, name, username}], meta: {next_token?, result_count}}` |
| [`getFollowing`](#getfollowing) | Get users that a user is following | `{data: [{id, name, username}], meta: {next_token?, result_count}}` |
| [`follow`](#follow) | Follow a user (uses authenticated user as source) | `{data: {following: true, pending_follow: false}}` |
| [`unfollow`](#unfollow) | Unfollow a user | `{data: {following: false}}` |
| [`like`](#like) | Like a tweet (uses authenticated user) | `{data: {liked: true}}` |
| [`unlike`](#unlike) | Unlike a tweet (uses authenticated user) | `{data: {liked: false}}` |
| [`getLikedTweets`](#getlikedtweets) | Get tweets liked by a user | `{data: [{id, text}], meta: {next_token?, result_count}}` |
| [`retweet`](#retweet) | Retweet a tweet (uses authenticated user) | `{data: {retweeted: true}}` |
| [`unretweet`](#unretweet) | Undo a retweet (uses authenticated user) | `{data: {retweeted: false}}` |
| [`getRetweeters`](#getretweeters) | Get users who retweeted a tweet | `{data: [{id, name, username}], meta: {next_token?, result_count}}` |
| [`bookmark`](#bookmark) | Bookmark a tweet (uses authenticated user) | `{data: {bookmarked: true}}` |
| [`removeBookmark`](#removebookmark) | Remove a bookmarked tweet (uses authenticated user) | `{data: {bookmarked: false}}` |
| [`getBookmarks`](#getbookmarks) | Get the authenticated user's bookmarked tweets | `{data: [{id, text}], meta: {next_token?, result_count}}` |
| [`createList`](#createlist) | Create a new list | `{data: {id, name}}` |
| [`deleteList`](#deletelist) | Delete a list | `{data: {deleted: true}}` |
| [`addListMember`](#addlistmember) | Add a user to a list | `{data: {is_member: true}}` |
| [`removeListMember`](#removelistmember) | Remove a user from a list | `{data: {is_member: false}}` |
| [`getListTweets`](#getlisttweets) | Get tweets from a list | `{data: [{id, text}], meta: {next_token?, result_count}}` |
| [`sendDm`](#senddm) | Send a direct message to a user | `{data: {dm_conversation_id, dm_event_id}}` |
| [`getDmEvents`](#getdmevents) | Get direct message events | `{data: [{id, text, event_type, ...}], meta: {next_token?, result_count}}` |


## Functions

### setToken

Store a Bearer token for X/Twitter API v2 authentication

**Module:** `twitter` | **Returns:** `object` -- {ok: true}

```robinpath
twitter.setToken "AAAA...your-bearer-token"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bearerToken` | `string` | Yes | Bearer token (app-only or OAuth 2.0 user token) |

---

### createTweet

Create a new tweet

**Module:** `twitter` | **Returns:** `object` -- {data: {id, text}}

```robinpath
twitter.createTweet "Hello from RobinPath!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Tweet text (up to 280 characters) |
| `options` | `object` | No | {reply_settings?, quote_tweet_id?, reply?: {in_reply_to_tweet_id}, poll?: {options, duration_minutes}, media?: {media_ids}} |

---

### deleteTweet

Delete a tweet by ID

**Module:** `twitter` | **Returns:** `object` -- {data: {deleted: true}}

```robinpath
twitter.deleteTweet "1234567890"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tweetId` | `string` | Yes | ID of the tweet to delete |

---

### getTweet

Get a single tweet by ID with optional expansions and fields

**Module:** `twitter` | **Returns:** `object` -- {data: {id, text, ...}, includes?: {...}}

```robinpath
twitter.getTweet "1234567890" {"tweet.fields": "created_at,public_metrics"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tweetId` | `string` | Yes | Tweet ID |
| `options` | `object` | No | {expansions?, tweet.fields?, user.fields?} |

---

### getTweets

Get multiple tweets by IDs

**Module:** `twitter` | **Returns:** `object` -- {data: [{id, text, ...}]}

```robinpath
twitter.getTweets ["1234567890", "0987654321"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tweetIds` | `array` | Yes | Array of tweet IDs (or comma-separated string) |
| `options` | `object` | No | {expansions?, tweet.fields?, user.fields?} |

---

### getUserTimeline

Get tweets from a user's timeline

**Module:** `twitter` | **Returns:** `object` -- {data: [{id, text}], meta: {next_token?, result_count}}

```robinpath
twitter.getUserTimeline "123456" {"max_results": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | `string` | Yes | User ID |
| `options` | `object` | No | {max_results?, pagination_token?, exclude?, tweet.fields?} |

---

### getMentions

Get tweets mentioning a user

**Module:** `twitter` | **Returns:** `object` -- {data: [{id, text}], meta: {next_token?, result_count}}

```robinpath
twitter.getMentions "123456" {"max_results": 5}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | `string` | Yes | User ID |
| `options` | `object` | No | {max_results?, pagination_token?, start_time?, end_time?} |

---

### searchRecent

Search recent tweets (last 7 days) with a query

**Module:** `twitter` | **Returns:** `object` -- {data: [{id, text}], meta: {newest_id, oldest_id, result_count, next_token?}}

```robinpath
twitter.searchRecent "robinpath lang:en" {"max_results": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | Yes | Search query (Twitter search syntax) |
| `options` | `object` | No | {max_results?, start_time?, end_time?, next_token?, tweet.fields?, expansions?} |

---

### getUser

Get a user by username

**Module:** `twitter` | **Returns:** `object` -- {data: {id, name, username}}

```robinpath
twitter.getUser "elonmusk"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | `string` | Yes | Twitter/X username (without @) |

---

### getUserById

Get a user by their ID

**Module:** `twitter` | **Returns:** `object` -- {data: {id, name, username}}

```robinpath
twitter.getUserById "44196397"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | `string` | Yes | User ID |

---

### getMe

Get the authenticated user's profile

**Module:** `twitter` | **Returns:** `object` -- {data: {id, name, username, description, profile_image_url, public_metrics}}

```robinpath
twitter.getMe
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### getFollowers

Get followers of a user

**Module:** `twitter` | **Returns:** `object` -- {data: [{id, name, username}], meta: {next_token?, result_count}}

```robinpath
twitter.getFollowers "123456" {"max_results": 100}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | `string` | Yes | User ID |
| `options` | `object` | No | {max_results?, pagination_token?, user.fields?} |

---

### getFollowing

Get users that a user is following

**Module:** `twitter` | **Returns:** `object` -- {data: [{id, name, username}], meta: {next_token?, result_count}}

```robinpath
twitter.getFollowing "123456" {"max_results": 100}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | `string` | Yes | User ID |
| `options` | `object` | No | {max_results?, pagination_token?, user.fields?} |

---

### follow

Follow a user (uses authenticated user as source)

**Module:** `twitter` | **Returns:** `object` -- {data: {following: true, pending_follow: false}}

```robinpath
twitter.follow "44196397"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `targetUserId` | `string` | Yes | ID of the user to follow |

---

### unfollow

Unfollow a user

**Module:** `twitter` | **Returns:** `object` -- {data: {following: false}}

```robinpath
twitter.unfollow "123456" "44196397"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sourceUserId` | `string` | Yes | ID of the authenticated user |
| `targetUserId` | `string` | Yes | ID of the user to unfollow |

---

### like

Like a tweet (uses authenticated user)

**Module:** `twitter` | **Returns:** `object` -- {data: {liked: true}}

```robinpath
twitter.like "1234567890"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tweetId` | `string` | Yes | ID of the tweet to like |

---

### unlike

Unlike a tweet (uses authenticated user)

**Module:** `twitter` | **Returns:** `object` -- {data: {liked: false}}

```robinpath
twitter.unlike "1234567890"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tweetId` | `string` | Yes | ID of the tweet to unlike |

---

### getLikedTweets

Get tweets liked by a user

**Module:** `twitter` | **Returns:** `object` -- {data: [{id, text}], meta: {next_token?, result_count}}

```robinpath
twitter.getLikedTweets "123456" {"max_results": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | `string` | Yes | User ID |
| `options` | `object` | No | {max_results?, pagination_token?, tweet.fields?} |

---

### retweet

Retweet a tweet (uses authenticated user)

**Module:** `twitter` | **Returns:** `object` -- {data: {retweeted: true}}

```robinpath
twitter.retweet "1234567890"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tweetId` | `string` | Yes | ID of the tweet to retweet |

---

### unretweet

Undo a retweet (uses authenticated user)

**Module:** `twitter` | **Returns:** `object` -- {data: {retweeted: false}}

```robinpath
twitter.unretweet "1234567890"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tweetId` | `string` | Yes | ID of the tweet to unretweet |

---

### getRetweeters

Get users who retweeted a tweet

**Module:** `twitter` | **Returns:** `object` -- {data: [{id, name, username}], meta: {next_token?, result_count}}

```robinpath
twitter.getRetweeters "1234567890" {"max_results": 100}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tweetId` | `string` | Yes | Tweet ID |
| `options` | `object` | No | {max_results?, pagination_token?, user.fields?} |

---

### bookmark

Bookmark a tweet (uses authenticated user)

**Module:** `twitter` | **Returns:** `object` -- {data: {bookmarked: true}}

```robinpath
twitter.bookmark "1234567890"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tweetId` | `string` | Yes | ID of the tweet to bookmark |

---

### removeBookmark

Remove a bookmarked tweet (uses authenticated user)

**Module:** `twitter` | **Returns:** `object` -- {data: {bookmarked: false}}

```robinpath
twitter.removeBookmark "1234567890"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tweetId` | `string` | Yes | ID of the tweet to remove from bookmarks |

---

### getBookmarks

Get the authenticated user's bookmarked tweets

**Module:** `twitter` | **Returns:** `object` -- {data: [{id, text}], meta: {next_token?, result_count}}

```robinpath
twitter.getBookmarks {"max_results": 20}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {max_results?, pagination_token?, tweet.fields?, expansions?} |

---

### createList

Create a new list

**Module:** `twitter` | **Returns:** `object` -- {data: {id, name}}

```robinpath
twitter.createList "My List" "A curated list" true
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Name of the list |
| `description` | `string` | No | Description of the list |
| `private` | `boolean` | No | Whether the list is private (default: false) |

---

### deleteList

Delete a list

**Module:** `twitter` | **Returns:** `object` -- {data: {deleted: true}}

```robinpath
twitter.deleteList "1234567890"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | List ID |

---

### addListMember

Add a user to a list

**Module:** `twitter` | **Returns:** `object` -- {data: {is_member: true}}

```robinpath
twitter.addListMember "1234567890" "44196397"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | List ID |
| `userId` | `string` | Yes | User ID to add |

---

### removeListMember

Remove a user from a list

**Module:** `twitter` | **Returns:** `object` -- {data: {is_member: false}}

```robinpath
twitter.removeListMember "1234567890" "44196397"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | List ID |
| `userId` | `string` | Yes | User ID to remove |

---

### getListTweets

Get tweets from a list

**Module:** `twitter` | **Returns:** `object` -- {data: [{id, text}], meta: {next_token?, result_count}}

```robinpath
twitter.getListTweets "1234567890" {"max_results": 25}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | List ID |
| `options` | `object` | No | {max_results?, pagination_token?, tweet.fields?, expansions?} |

---

### sendDm

Send a direct message to a user

**Module:** `twitter` | **Returns:** `object` -- {data: {dm_conversation_id, dm_event_id}}

```robinpath
twitter.sendDm "44196397" "Hello from RobinPath!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `participantId` | `string` | Yes | User ID of the recipient |
| `text` | `string` | Yes | Message text |

---

### getDmEvents

Get direct message events

**Module:** `twitter` | **Returns:** `object` -- {data: [{id, text, event_type, ...}], meta: {next_token?, result_count}}

```robinpath
twitter.getDmEvents {"max_results": 20}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {max_results?, pagination_token?, dm_event.fields?, event_types?} |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Bearer token not set. Call twitter.setToken first.` | Check the error message for details |
| `Twitter API ${method} ${endpoint} failed (${response.status}): ${String(detail)}` | Check the error message for details |
| `Bearer token is required.` | Check the error message for details |
| `Tweet text is required.` | Check the error message for details |
| `Tweet ID is required.` | Check the error message for details |
| `Tweet IDs are required.` | Check the error message for details |
| `User ID is required.` | Check the error message for details |
| `Search query is required.` | Check the error message for details |

```robinpath
set $result as twitter.createTweet "Hello from RobinPath!"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Tweet

Retrieve all items and loop through them.

```robinpath
twitter.setToken $token
set $result as twitter.getTweet "1234567890" {"tweet.fields": "created_at,public_metrics"}
each $item in $result
  print $item
end
```

### 2. Create a new item with createTweet

Create a new resource and capture the result.

```robinpath
twitter.setToken $token
set $result as twitter.createTweet "Hello from RobinPath!"
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
twitter.setToken $token
set $existing as twitter.getTweet "1234567890" {"tweet.fields": "created_at,public_metrics"}
if $existing == null
  twitter.createTweet "Hello from RobinPath!"
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Twitter/X workflow

Chain multiple twitter operations together.

```robinpath
twitter.setToken $token
set $r_createTweet as twitter.createTweet "Hello from RobinPath!"
set $r_deleteTweet as twitter.deleteTweet "1234567890"
set $r_getTweet as twitter.getTweet "1234567890" {"tweet.fields": "created_at,public_metrics"}
print "All operations complete"
```

### 5. Safe createTweet with validation

Check results before proceeding.

```robinpath
twitter.setToken $token
set $result as twitter.createTweet "Hello from RobinPath!"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **facebook** -- Facebook module for complementary functionality
- **instagram** -- Instagram module for complementary functionality
- **linkedin** -- LinkedIn module for complementary functionality
- **tiktok** -- TikTok module for complementary functionality
- **pinterest** -- Pinterest module for complementary functionality
