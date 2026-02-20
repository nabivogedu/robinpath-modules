# @robinpath/twitter

> Twitter/X module for RobinPath.

![Category](https://img.shields.io/badge/category-Social-media-blue) ![Functions](https://img.shields.io/badge/functions-31-green) ![Auth](https://img.shields.io/badge/auth-Bearer%20Token-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `twitter` module lets you:

- Create a new tweet
- Delete a tweet by ID
- Get a single tweet by ID with optional expansions and fields
- Get multiple tweets by IDs
- Get tweets from a user's timeline

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/twitter
```

## Quick Start

**1. Set up credentials**

```robinpath
twitter.setToken "AAAA...your-bearer-token"
```

**2. Create a new tweet**

```robinpath
twitter.createTweet "Hello from RobinPath!"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `twitter.setToken` | Store a Bearer token for X/Twitter API v2 authentication |
| `twitter.createTweet` | Create a new tweet |
| `twitter.deleteTweet` | Delete a tweet by ID |
| `twitter.getTweet` | Get a single tweet by ID with optional expansions and fields |
| `twitter.getTweets` | Get multiple tweets by IDs |
| `twitter.getUserTimeline` | Get tweets from a user's timeline |
| `twitter.getMentions` | Get tweets mentioning a user |
| `twitter.searchRecent` | Search recent tweets (last 7 days) with a query |
| `twitter.getUser` | Get a user by username |
| `twitter.getUserById` | Get a user by their ID |
| `twitter.getMe` | Get the authenticated user's profile |
| `twitter.getFollowers` | Get followers of a user |
| `twitter.getFollowing` | Get users that a user is following |
| `twitter.follow` | Follow a user (uses authenticated user as source) |
| `twitter.unfollow` | Unfollow a user |
| `twitter.like` | Like a tweet (uses authenticated user) |
| `twitter.unlike` | Unlike a tweet (uses authenticated user) |
| `twitter.getLikedTweets` | Get tweets liked by a user |
| `twitter.retweet` | Retweet a tweet (uses authenticated user) |
| `twitter.unretweet` | Undo a retweet (uses authenticated user) |
| `twitter.getRetweeters` | Get users who retweeted a tweet |
| `twitter.bookmark` | Bookmark a tweet (uses authenticated user) |
| `twitter.removeBookmark` | Remove a bookmarked tweet (uses authenticated user) |
| `twitter.getBookmarks` | Get the authenticated user's bookmarked tweets |
| `twitter.createList` | Create a new list |
| `twitter.deleteList` | Delete a list |
| `twitter.addListMember` | Add a user to a list |
| `twitter.removeListMember` | Remove a user from a list |
| `twitter.getListTweets` | Get tweets from a list |
| `twitter.sendDm` | Send a direct message to a user |
| `twitter.getDmEvents` | Get direct message events |

## Examples

### Create a new tweet

```robinpath
twitter.createTweet "Hello from RobinPath!"
```

### Delete a tweet by ID

```robinpath
twitter.deleteTweet "1234567890"
```

### Get a single tweet by ID with optional expansions and fields

```robinpath
twitter.getTweet "1234567890" {"tweet.fields": "created_at,public_metrics"}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/twitter";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  twitter.setToken "AAAA...your-bearer-token"
  twitter.createTweet "Hello from RobinPath!"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/facebook`](../facebook) — Facebook module for complementary functionality
- [`@robinpath/instagram`](../instagram) — Instagram module for complementary functionality
- [`@robinpath/linkedin`](../linkedin) — LinkedIn module for complementary functionality
- [`@robinpath/tiktok`](../tiktok) — TikTok module for complementary functionality
- [`@robinpath/pinterest`](../pinterest) — Pinterest module for complementary functionality

## License

MIT
