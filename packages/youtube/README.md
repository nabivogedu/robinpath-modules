# @robinpath/youtube

> YouTube module for RobinPath.

![Category](https://img.shields.io/badge/category-Social-media-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `youtube` module lets you:

- searchVideos
- getVideo
- listMyVideos
- updateVideo
- deleteVideo

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/youtube
```

## Quick Start

**1. Set up credentials**

```robinpath
youtube.setCredentials "your-credentials"
```

**2. searchVideos**

```robinpath
youtube.searchVideos
```

## Available Functions

| Function | Description |
|----------|-------------|
| `youtube.setCredentials` | Configure youtube credentials. |
| `youtube.searchVideos` | searchVideos |
| `youtube.getVideo` | getVideo |
| `youtube.listMyVideos` | listMyVideos |
| `youtube.updateVideo` | updateVideo |
| `youtube.deleteVideo` | deleteVideo |
| `youtube.listChannels` | listChannels |
| `youtube.getChannelStats` | getChannelStats |
| `youtube.listPlaylists` | listPlaylists |
| `youtube.getPlaylist` | getPlaylist |
| `youtube.createPlaylist` | createPlaylist |
| `youtube.deletePlaylist` | deletePlaylist |
| `youtube.listPlaylistItems` | listPlaylistItems |
| `youtube.addVideoToPlaylist` | addVideoToPlaylist |
| `youtube.removeFromPlaylist` | removeFromPlaylist |
| `youtube.listComments` | listComments |
| `youtube.addComment` | addComment |
| `youtube.replyToComment` | replyToComment |
| `youtube.setThumbnail` | setThumbnail |
| `youtube.getVideoCategories` | getVideoCategories |
| `youtube.listSubscriptions` | listSubscriptions |

## Examples

### searchVideos

```robinpath
youtube.searchVideos
```

### getVideo

```robinpath
youtube.getVideo
```

### listMyVideos

```robinpath
youtube.listMyVideos
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/youtube";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  youtube.setCredentials "your-credentials"
  youtube.searchVideos
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/facebook`](../facebook) — Facebook module for complementary functionality
- [`@robinpath/instagram`](../instagram) — Instagram module for complementary functionality
- [`@robinpath/twitter`](../twitter) — Twitter/X module for complementary functionality
- [`@robinpath/linkedin`](../linkedin) — LinkedIn module for complementary functionality
- [`@robinpath/tiktok`](../tiktok) — TikTok module for complementary functionality

## License

MIT
