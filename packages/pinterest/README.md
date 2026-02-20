# @robinpath/pinterest

> Pinterest module for RobinPath.

![Category](https://img.shields.io/badge/category-Social-media-blue) ![Functions](https://img.shields.io/badge/functions-17-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `pinterest` module lets you:

- listBoards
- getBoard
- createBoard
- updateBoard
- deleteBoard

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/pinterest
```

## Quick Start

**1. Set up credentials**

```robinpath
pinterest.setCredentials "your-credentials"
```

**2. listBoards**

```robinpath
pinterest.listBoards
```

## Available Functions

| Function | Description |
|----------|-------------|
| `pinterest.setCredentials` | Configure pinterest credentials. |
| `pinterest.listBoards` | listBoards |
| `pinterest.getBoard` | getBoard |
| `pinterest.createBoard` | createBoard |
| `pinterest.updateBoard` | updateBoard |
| `pinterest.deleteBoard` | deleteBoard |
| `pinterest.listBoardPins` | listBoardPins |
| `pinterest.listPins` | listPins |
| `pinterest.getPin` | getPin |
| `pinterest.createPin` | createPin |
| `pinterest.updatePin` | updatePin |
| `pinterest.deletePin` | deletePin |
| `pinterest.listBoardSections` | listBoardSections |
| `pinterest.createBoardSection` | createBoardSection |
| `pinterest.getUserAccount` | getUserAccount |
| `pinterest.getPinAnalytics` | getPinAnalytics |
| `pinterest.getBoardAnalytics` | getBoardAnalytics |

## Examples

### listBoards

```robinpath
pinterest.listBoards
```

### getBoard

```robinpath
pinterest.getBoard
```

### createBoard

```robinpath
pinterest.createBoard
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/pinterest";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  pinterest.setCredentials "your-credentials"
  pinterest.listBoards
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
