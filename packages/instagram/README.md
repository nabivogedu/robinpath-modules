# @robinpath/instagram

> Instagram module for RobinPath.

![Category](https://img.shields.io/badge/category-Social-media-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-Bearer%20Token-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `instagram` module lets you:

- Get authenticated user's Instagram profile (id, username, biography, followers, media count, etc.)
- Get details of a specific media item by ID
- List the authenticated user's media posts with pagination
- Create a media container for an image post (returns container ID for publishing)
- Create a media container for a video or Reel post

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/instagram
```

## Quick Start

**1. Set up credentials**

```robinpath
instagram.setToken "EAAG..."
```

**2. Store access token and IG Business Account ID for full API access**

```robinpath
instagram.setBusinessAccount "EAAG..." "17841400123456"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `instagram.setToken` | Store a long-lived Instagram access token for API calls |
| `instagram.setBusinessAccount` | Store access token and IG Business Account ID for full API access |
| `instagram.getProfile` | Get authenticated user's Instagram profile (id, username, biography, followers, media count, etc.) |
| `instagram.getMedia` | Get details of a specific media item by ID |
| `instagram.listMedia` | List the authenticated user's media posts with pagination |
| `instagram.createMediaContainer` | Create a media container for an image post (returns container ID for publishing) |
| `instagram.createVideoContainer` | Create a media container for a video or Reel post |
| `instagram.createCarouselContainer` | Create a carousel container from multiple child container IDs |
| `instagram.publishMedia` | Publish a previously created media container (image, video, or carousel) |
| `instagram.getMediaInsights` | Get insights/analytics for a specific media item |
| `instagram.getAccountInsights` | Get account-level insights (impressions, reach, follower_count, etc.) |
| `instagram.getComments` | List comments on a media post |
| `instagram.replyToComment` | Reply to a specific comment on a media post |
| `instagram.deleteComment` | Delete or hide a comment by ID |
| `instagram.getStories` | Get the authenticated user's currently active stories |
| `instagram.getHashtag` | Search for a hashtag ID by name |
| `instagram.getHashtagMedia` | Get top or recent media for a hashtag |
| `instagram.getMentions` | Get media posts where the authenticated user is tagged/mentioned |
| `instagram.sendMessage` | Send a direct message to a user via Instagram Messaging API |
| `instagram.getConversations` | List DM conversations for the authenticated account |
| `instagram.getMessages` | Get messages within a specific DM conversation |

## Examples

### Store access token and IG Business Account ID for full API access

```robinpath
instagram.setBusinessAccount "EAAG..." "17841400123456"
```

### Get authenticated user's Instagram profile (id, username, biography, followers, media count, etc.)

```robinpath
instagram.getProfile
```

### Get details of a specific media item by ID

```robinpath
instagram.getMedia "17895695668004550"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/instagram";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  instagram.setToken "EAAG..."
  instagram.setBusinessAccount "EAAG..." "17841400123456"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/facebook`](../facebook) — Facebook module for complementary functionality
- [`@robinpath/twitter`](../twitter) — Twitter/X module for complementary functionality
- [`@robinpath/linkedin`](../linkedin) — LinkedIn module for complementary functionality
- [`@robinpath/tiktok`](../tiktok) — TikTok module for complementary functionality
- [`@robinpath/pinterest`](../pinterest) — Pinterest module for complementary functionality

## License

MIT
