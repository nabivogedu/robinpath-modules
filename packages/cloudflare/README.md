# @robinpath/cloudflare

> Cloudflare module for RobinPath.

![Category](https://img.shields.io/badge/category-DevOps-blue) ![Functions](https://img.shields.io/badge/functions-29-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `cloudflare` module lets you:

- List Cloudflare zones
- Get details of a specific zone
- Create a new Cloudflare zone
- Delete a Cloudflare zone
- Purge cache for a zone (all or selective by URLs/tags/hosts/prefixes)

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/cloudflare
```

## Quick Start

**1. Set up credentials**

```robinpath
cloudflare.setCredentials "user@example.com" "your-global-api-key"
```

**2. List Cloudflare zones**

```robinpath
cloudflare.listZones {"name": "example.com"}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `cloudflare.setToken` | Set Cloudflare API token for authentication |
| `cloudflare.setCredentials` | Set Cloudflare global API key credentials |
| `cloudflare.listZones` | List Cloudflare zones |
| `cloudflare.getZone` | Get details of a specific zone |
| `cloudflare.createZone` | Create a new Cloudflare zone |
| `cloudflare.deleteZone` | Delete a Cloudflare zone |
| `cloudflare.purgeCache` | Purge cache for a zone (all or selective by URLs/tags/hosts/prefixes) |
| `cloudflare.listDnsRecords` | List DNS records for a zone |
| `cloudflare.getDnsRecord` | Get a specific DNS record |
| `cloudflare.createDnsRecord` | Create a DNS record in a zone |
| `cloudflare.updateDnsRecord` | Update an existing DNS record |
| `cloudflare.deleteDnsRecord` | Delete a DNS record from a zone |
| `cloudflare.listWorkers` | List Workers scripts for an account |
| `cloudflare.getWorkerScript` | Get the content of a Worker script |
| `cloudflare.deployWorker` | Deploy a Worker script |
| `cloudflare.deleteWorker` | Delete a Worker script |
| `cloudflare.listKvNamespaces` | List KV namespaces for an account |
| `cloudflare.createKvNamespace` | Create a KV namespace |
| `cloudflare.deleteKvNamespace` | Delete a KV namespace |
| `cloudflare.kvGet` | Read a value from KV storage |
| `cloudflare.kvPut` | Write a value to KV storage |
| `cloudflare.kvDelete` | Delete a key from KV storage |
| `cloudflare.kvListKeys` | List keys in a KV namespace |
| `cloudflare.listR2Buckets` | List R2 buckets for an account |
| `cloudflare.createR2Bucket` | Create an R2 bucket |
| `cloudflare.deleteR2Bucket` | Delete an R2 bucket |
| `cloudflare.listPages` | List Cloudflare Pages projects |
| `cloudflare.getPageProject` | Get details of a Cloudflare Pages project |
| `cloudflare.getZoneAnalytics` | Get analytics data for a zone |

## Examples

### List Cloudflare zones

```robinpath
cloudflare.listZones {"name": "example.com"}
```

### Get details of a specific zone

```robinpath
cloudflare.getZone "zone-id-here"
```

### Create a new Cloudflare zone

```robinpath
cloudflare.createZone "example.com" {"accountId": "abc123"}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/cloudflare";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  cloudflare.setCredentials "user@example.com" "your-global-api-key"
  cloudflare.listZones {"name": "example.com"}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/docker`](../docker) — Docker module for complementary functionality
- [`@robinpath/git`](../git) — Git module for complementary functionality
- [`@robinpath/github`](../github) — GitHub module for complementary functionality
- [`@robinpath/gitlab`](../gitlab) — GitLab module for complementary functionality
- [`@robinpath/vercel`](../vercel) — Vercel module for complementary functionality

## License

MIT
