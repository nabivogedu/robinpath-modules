# @robinpath/s3

> S3-compatible object storage operations using AWS SDK

![Category](https://img.shields.io/badge/category-Cloud-storage-blue) ![Functions](https://img.shields.io/badge/functions-14-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `s3` module lets you:

- Upload an object to S3
- Download an object from S3
- Delete an object from S3
- List objects in an S3 bucket
- Check if an object exists in S3

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/s3
```

## Quick Start

**1. Set up credentials**

```robinpath
s3.configure "your-credentials"
```

**2. Upload an object to S3**

```robinpath
s3.upload
```

## Available Functions

| Function | Description |
|----------|-------------|
| `s3.configure` | Configure S3 client credentials and endpoint |
| `s3.upload` | Upload an object to S3 |
| `s3.download` | Download an object from S3 |
| `s3.remove` | Delete an object from S3 |
| `s3.list` | List objects in an S3 bucket |
| `s3.exists` | Check if an object exists in S3 |
| `s3.copy` | Copy an object within or between S3 buckets |
| `s3.move` | Move an object (copy then delete source) |
| `s3.presignUrl` | Generate a presigned URL for an S3 object |
| `s3.createBucket` | Create a new S3 bucket |
| `s3.deleteBucket` | Delete an S3 bucket |
| `s3.listBuckets` | List all S3 buckets |
| `s3.getMetadata` | Get metadata for an S3 object |
| `s3.setAcl` | Set the ACL for an S3 object |

## Examples

### Upload an object to S3

```robinpath
s3.upload
```

### Download an object from S3

```robinpath
s3.download
```

### Delete an object from S3

```robinpath
s3.remove
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/s3";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  s3.configure "your-credentials"
  s3.upload
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/dropbox`](../dropbox) — Dropbox module for complementary functionality
- [`@robinpath/box`](../box) — Box module for complementary functionality
- [`@robinpath/onedrive`](../onedrive) — OneDrive module for complementary functionality
- [`@robinpath/google-drive`](../google-drive) — Google Drive module for complementary functionality
- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
