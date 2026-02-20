# @robinpath/facebook

> Facebook module for RobinPath.

![Category](https://img.shields.io/badge/category-Social-media-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `facebook` module lets you:

- getPageInfo
- listPagePosts
- createPagePost
- updatePost
- deletePost

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/facebook
```

## Quick Start

**1. Set up credentials**

```robinpath
facebook.setCredentials "your-credentials"
```

**2. getPageInfo**

```robinpath
facebook.getPageInfo
```

## Available Functions

| Function | Description |
|----------|-------------|
| `facebook.setCredentials` | Configure facebook credentials. |
| `facebook.getPageInfo` | getPageInfo |
| `facebook.listPagePosts` | listPagePosts |
| `facebook.createPagePost` | createPagePost |
| `facebook.updatePost` | updatePost |
| `facebook.deletePost` | deletePost |
| `facebook.getPost` | getPost |
| `facebook.getPostInsights` | getPostInsights |
| `facebook.getPageInsights` | getPageInsights |
| `facebook.listComments` | listComments |
| `facebook.replyToComment` | replyToComment |
| `facebook.deleteComment` | deleteComment |
| `facebook.hideComment` | hideComment |
| `facebook.listPageEvents` | listPageEvents |
| `facebook.createPageEvent` | createPageEvent |
| `facebook.uploadPhoto` | uploadPhoto |
| `facebook.uploadVideo` | uploadVideo |
| `facebook.getAdAccounts` | getAdAccounts |
| `facebook.getCampaigns` | getCampaigns |
| `facebook.getMe` | getMe |
| `facebook.searchPages` | searchPages |

## Examples

### getPageInfo

```robinpath
facebook.getPageInfo
```

### listPagePosts

```robinpath
facebook.listPagePosts
```

### createPagePost

```robinpath
facebook.createPagePost
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/facebook";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  facebook.setCredentials "your-credentials"
  facebook.getPageInfo
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/instagram`](../instagram) — Instagram module for complementary functionality
- [`@robinpath/twitter`](../twitter) — Twitter/X module for complementary functionality
- [`@robinpath/linkedin`](../linkedin) — LinkedIn module for complementary functionality
- [`@robinpath/tiktok`](../tiktok) — TikTok module for complementary functionality
- [`@robinpath/pinterest`](../pinterest) — Pinterest module for complementary functionality

## License

MIT
