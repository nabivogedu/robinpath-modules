# @robinpath/google-drive

> Google Drive module for RobinPath.

![Category](https://img.shields.io/badge/category-Cloud-storage-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `google-drive` module lets you:

- List files in Google Drive with optional query filter.
- Get file metadata by ID.
- Download file content as text.
- Upload a file to Google Drive.
- Create a new folder in Google Drive.

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/google-drive
```

## Quick Start

**1. Set up credentials**

```robinpath
googleDrive.setCredentials "ya29.xxx"
```

**2. List files in Google Drive with optional query filter.**

```robinpath
googleDrive.listFiles {"q":"mimeType='application/pdf'","pageSize":10}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `google-drive.setCredentials` | Set the OAuth2 access token for Google Drive API. |
| `google-drive.listFiles` | List files in Google Drive with optional query filter. |
| `google-drive.getFile` | Get file metadata by ID. |
| `google-drive.downloadFile` | Download file content as text. |
| `google-drive.uploadFile` | Upload a file to Google Drive. |
| `google-drive.createFolder` | Create a new folder in Google Drive. |
| `google-drive.deleteFile` | Permanently delete a file or folder. |
| `google-drive.moveFile` | Move a file to a different folder. |
| `google-drive.copyFile` | Copy a file, optionally with a new name or destination. |
| `google-drive.shareFile` | Share a file with a user by email. |

## Examples

### List files in Google Drive with optional query filter.

```robinpath
googleDrive.listFiles {"q":"mimeType='application/pdf'","pageSize":10}
```

### Get file metadata by ID.

```robinpath
googleDrive.getFile "file-id"
```

### Download file content as text.

```robinpath
googleDrive.downloadFile "file-id"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/google-drive";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  googleDrive.setCredentials "ya29.xxx"
  googleDrive.listFiles {"q":"mimeType='application/pdf'","pageSize":10}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/s3`](../s3) — Amazon S3 module for complementary functionality
- [`@robinpath/dropbox`](../dropbox) — Dropbox module for complementary functionality
- [`@robinpath/box`](../box) — Box module for complementary functionality
- [`@robinpath/onedrive`](../onedrive) — OneDrive module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
