# @robinpath/linkedin

> LinkedIn module for RobinPath.

![Category](https://img.shields.io/badge/category-Social-media-blue) ![Functions](https://img.shields.io/badge/functions-20-green) ![Auth](https://img.shields.io/badge/auth-Bearer%20Token-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `linkedin` module lets you:

- Get the authenticated user's profile using /v2/userinfo
- Get organization/company page information
- Create a text post (share on feed)
- Share an article with URL, title, and description
- Share an image post with text

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/linkedin
```

## Quick Start

**1. Set up credentials**

```robinpath
linkedin.setToken "your-access-token"
```

**2. Get the authenticated user's profile using /v2/userinfo**

```robinpath
linkedin.getProfile
```

## Available Functions

| Function | Description |
|----------|-------------|
| `linkedin.setToken` | Store an OAuth2 access token for LinkedIn API requests |
| `linkedin.getProfile` | Get the authenticated user's profile using /v2/userinfo |
| `linkedin.getOrganization` | Get organization/company page information |
| `linkedin.createPost` | Create a text post (share on feed) |
| `linkedin.createArticlePost` | Share an article with URL, title, and description |
| `linkedin.createImagePost` | Share an image post with text |
| `linkedin.deletePost` | Delete a post by its URN |
| `linkedin.getPost` | Get post details by URN |
| `linkedin.registerImageUpload` | Register an image upload and get the upload URL and image URN |
| `linkedin.uploadImage` | Upload an image binary to the URL from registerImageUpload |
| `linkedin.addComment` | Add a comment on a post |
| `linkedin.getComments` | List comments on a post |
| `linkedin.deleteComment` | Delete a comment by its URN |
| `linkedin.addReaction` | React to a post (LIKE, PRAISE, EMPATHY, INTEREST, APPRECIATION) |
| `linkedin.removeReaction` | Remove a reaction from a post |
| `linkedin.getReactions` | Get all reactions on a post |
| `linkedin.getFollowerCount` | Get the follower count for an organization |
| `linkedin.getShareStatistics` | Get post/share analytics for an organization |
| `linkedin.searchPeople` | Search for people on LinkedIn (limited access, requires special permissions) |
| `linkedin.getConnections` | Get first-degree connections of the authenticated user |

## Examples

### Get the authenticated user's profile using /v2/userinfo

```robinpath
linkedin.getProfile
```

### Get organization/company page information

```robinpath
linkedin.getOrganization "12345678"
```

### Create a text post (share on feed)

```robinpath
linkedin.createPost "urn:li:person:abc123" "Hello LinkedIn!" {"visibility": "PUBLIC"}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/linkedin";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  linkedin.setToken "your-access-token"
  linkedin.getProfile
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/facebook`](../facebook) — Facebook module for complementary functionality
- [`@robinpath/instagram`](../instagram) — Instagram module for complementary functionality
- [`@robinpath/twitter`](../twitter) — Twitter/X module for complementary functionality
- [`@robinpath/tiktok`](../tiktok) — TikTok module for complementary functionality
- [`@robinpath/pinterest`](../pinterest) — Pinterest module for complementary functionality

## License

MIT
