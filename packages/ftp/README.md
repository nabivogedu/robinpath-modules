# @robinpath/ftp

> FTP and SFTP file transfer: connect, upload, download, list, mkdir, rename, and delete

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-8-green) ![Auth](https://img.shields.io/badge/auth-connection-string-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `ftp` module lets you:

- Upload a local file to remote server
- Download a remote file
- List files in a remote directory
- Create a remote directory
- Delete a remote file

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/ftp
```

## Quick Start

**1. Set up credentials**

```robinpath
any "server" {"protocol": "sftp", "host": "example.com", "user": "admin", "pass": "..."}
```

**2. Upload a local file to remote server**

```robinpath
any "server" "./file.txt" "/remote/file.txt"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `ftp.connect` | Connect to an FTP or SFTP server |
| `ftp.upload` | Upload a local file to remote server |
| `ftp.download` | Download a remote file |
| `ftp.list` | List files in a remote directory |
| `ftp.mkdir` | Create a remote directory |
| `ftp.remove` | Delete a remote file |
| `ftp.rename` | Rename/move a remote file |
| `ftp.close` | Close an FTP/SFTP connection |

## Examples

### Upload a local file to remote server

```robinpath
any "server" "./file.txt" "/remote/file.txt"
```

### Download a remote file

```robinpath
any "server" "/remote/file.txt" "./file.txt"
```

### List files in a remote directory

```robinpath
any "server" "/uploads"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/ftp";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  any "server" {"protocol": "sftp", "host": "example.com", "user": "admin", "pass": "..."}
  any "server" "./file.txt" "/remote/file.txt"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
