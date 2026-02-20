# @robinpath/onedrive

> OneDrive module for RobinPath.

![Category](https://img.shields.io/badge/category-Cloud-storage-blue) ![Functions](https://img.shields.io/badge/functions-19-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `onedrive` module lets you:

- listChildren
- getItem
- getItemByPath
- createFolder
- deleteItem

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/onedrive
```

## Quick Start

**1. Set up credentials**

```robinpath
onedrive.setCredentials "your-credentials"
```

**2. listChildren**

```robinpath
onedrive.listChildren
```

## Available Functions

| Function | Description |
|----------|-------------|
| `onedrive.setCredentials` | Configure onedrive credentials. |
| `onedrive.listChildren` | listChildren |
| `onedrive.getItem` | getItem |
| `onedrive.getItemByPath` | getItemByPath |
| `onedrive.createFolder` | createFolder |
| `onedrive.deleteItem` | deleteItem |
| `onedrive.moveItem` | moveItem |
| `onedrive.copyItem` | copyItem |
| `onedrive.uploadFile` | uploadFile |
| `onedrive.downloadFile` | downloadFile |
| `onedrive.searchFiles` | searchFiles |
| `onedrive.createSharingLink` | createSharingLink |
| `onedrive.listSharedWithMe` | listSharedWithMe |
| `onedrive.getPermissions` | getPermissions |
| `onedrive.getDriveInfo` | getDriveInfo |
| `onedrive.listDrives` | listDrives |
| `onedrive.getRecentFiles` | getRecentFiles |
| `onedrive.getThumbnails` | getThumbnails |
| `onedrive.uploadLargeFile` | uploadLargeFile |

## Examples

### listChildren

```robinpath
onedrive.listChildren
```

### getItem

```robinpath
onedrive.getItem
```

### getItemByPath

```robinpath
onedrive.getItemByPath
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/onedrive";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  onedrive.setCredentials "your-credentials"
  onedrive.listChildren
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/s3`](../s3) — Amazon S3 module for complementary functionality
- [`@robinpath/dropbox`](../dropbox) — Dropbox module for complementary functionality
- [`@robinpath/box`](../box) — Box module for complementary functionality
- [`@robinpath/google-drive`](../google-drive) — Google Drive module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
