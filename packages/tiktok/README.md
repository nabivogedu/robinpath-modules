# @robinpath/tiktok

> TikTok module for RobinPath.

![Category](https://img.shields.io/badge/category-Social-media-blue) ![Functions](https://img.shields.io/badge/functions-17-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `tiktok` module lets you:

- getUserInfo
- listVideos
- getVideoById
- initVideoPublish
- queryCreatorInfo

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/tiktok
```

## Quick Start

**1. Set up credentials**

```robinpath
tiktok.setCredentials "your-credentials"
```

**2. getUserInfo**

```robinpath
tiktok.getUserInfo
```

## Available Functions

| Function | Description |
|----------|-------------|
| `tiktok.setCredentials` | Configure tiktok credentials. |
| `tiktok.getUserInfo` | getUserInfo |
| `tiktok.listVideos` | listVideos |
| `tiktok.getVideoById` | getVideoById |
| `tiktok.initVideoPublish` | initVideoPublish |
| `tiktok.queryCreatorInfo` | queryCreatorInfo |
| `tiktok.getVideoComments` | getVideoComments |
| `tiktok.replyToComment` | replyToComment |
| `tiktok.getVideoInsights` | getVideoInsights |
| `tiktok.searchVideos` | searchVideos |
| `tiktok.getTrendingHashtags` | getTrendingHashtags |
| `tiktok.getHashtagInfo` | getHashtagInfo |
| `tiktok.getUserFollowers` | getUserFollowers |
| `tiktok.getUserFollowing` | getUserFollowing |
| `tiktok.likeVideo` | likeVideo |
| `tiktok.unlikeVideo` | unlikeVideo |
| `tiktok.getAccountStats` | getAccountStats |

## Examples

### getUserInfo

```robinpath
tiktok.getUserInfo
```

### listVideos

```robinpath
tiktok.listVideos
```

### getVideoById

```robinpath
tiktok.getVideoById
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/tiktok";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  tiktok.setCredentials "your-credentials"
  tiktok.getUserInfo
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/facebook`](../facebook) — Facebook module for complementary functionality
- [`@robinpath/instagram`](../instagram) — Instagram module for complementary functionality
- [`@robinpath/twitter`](../twitter) — Twitter/X module for complementary functionality
- [`@robinpath/linkedin`](../linkedin) — LinkedIn module for complementary functionality
- [`@robinpath/pinterest`](../pinterest) — Pinterest module for complementary functionality

## License

MIT
