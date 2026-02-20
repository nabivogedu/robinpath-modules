# @robinpath/dropbox

> Dropbox module for RobinPath.

![Category](https://img.shields.io/badge/category-Cloud-storage-blue) ![Functions](https://img.shields.io/badge/functions-19-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `dropbox` module lets you:

- listFolder
- getMetadata
- createFolder
- deleteEntry
- moveEntry

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/dropbox
```

## Quick Start

**1. Set up credentials**

```robinpath
dropbox.setCredentials "your-credentials"
```

**2. listFolder**

```robinpath
dropbox.listFolder
```

## Available Functions

| Function | Description |
|----------|-------------|
| `dropbox.setCredentials` | Configure dropbox credentials. |
| `dropbox.listFolder` | listFolder |
| `dropbox.getMetadata` | getMetadata |
| `dropbox.createFolder` | createFolder |
| `dropbox.deleteEntry` | deleteEntry |
| `dropbox.moveEntry` | moveEntry |
| `dropbox.copyEntry` | copyEntry |
| `dropbox.uploadFile` | uploadFile |
| `dropbox.downloadFile` | downloadFile |
| `dropbox.getTemporaryLink` | getTemporaryLink |
| `dropbox.searchFiles` | searchFiles |
| `dropbox.listRevisions` | listRevisions |
| `dropbox.restoreFile` | restoreFile |
| `dropbox.createSharedLink` | createSharedLink |
| `dropbox.listSharedLinks` | listSharedLinks |
| `dropbox.revokeSharedLink` | revokeSharedLink |
| `dropbox.getSpaceUsage` | getSpaceUsage |
| `dropbox.getCurrentAccount` | getCurrentAccount |
| `dropbox.getPreview` | getPreview |

## Examples

### listFolder

```robinpath
dropbox.listFolder
```

### getMetadata

```robinpath
dropbox.getMetadata
```

### createFolder

```robinpath
dropbox.createFolder
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/dropbox";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  dropbox.setCredentials "your-credentials"
  dropbox.listFolder
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/s3`](../s3) — Amazon S3 module for complementary functionality
- [`@robinpath/box`](../box) — Box module for complementary functionality
- [`@robinpath/onedrive`](../onedrive) — OneDrive module for complementary functionality
- [`@robinpath/google-drive`](../google-drive) — Google Drive module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
