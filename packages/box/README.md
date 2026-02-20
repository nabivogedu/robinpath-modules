# @robinpath/box

> Box module for RobinPath.

![Category](https://img.shields.io/badge/category-Cloud-storage-blue) ![Functions](https://img.shields.io/badge/functions-19-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `box` module lets you:

- listFolderItems
- getFolderInfo
- createFolder
- deleteFolder
- getFileInfo

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/box
```

## Quick Start

**1. Set up credentials**

```robinpath
box.setCredentials "your-credentials"
```

**2. listFolderItems**

```robinpath
box.listFolderItems
```

## Available Functions

| Function | Description |
|----------|-------------|
| `box.setCredentials` | Configure box credentials. |
| `box.listFolderItems` | listFolderItems |
| `box.getFolderInfo` | getFolderInfo |
| `box.createFolder` | createFolder |
| `box.deleteFolder` | deleteFolder |
| `box.getFileInfo` | getFileInfo |
| `box.downloadFile` | downloadFile |
| `box.deleteFile` | deleteFile |
| `box.copyFile` | copyFile |
| `box.moveFile` | moveFile |
| `box.uploadFile` | uploadFile |
| `box.searchContent` | searchContent |
| `box.createSharedLink` | createSharedLink |
| `box.getSharedLink` | getSharedLink |
| `box.listCollaborations` | listCollaborations |
| `box.addCollaboration` | addCollaboration |
| `box.getUser` | getUser |
| `box.updateFileInfo` | updateFileInfo |
| `box.lockFile` | lockFile |

## Examples

### listFolderItems

```robinpath
box.listFolderItems
```

### getFolderInfo

```robinpath
box.getFolderInfo
```

### createFolder

```robinpath
box.createFolder
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/box";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  box.setCredentials "your-credentials"
  box.listFolderItems
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/s3`](../s3) — Amazon S3 module for complementary functionality
- [`@robinpath/dropbox`](../dropbox) — Dropbox module for complementary functionality
- [`@robinpath/onedrive`](../onedrive) — OneDrive module for complementary functionality
- [`@robinpath/google-drive`](../google-drive) — Google Drive module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
