# @robinpath/digitalocean

> DigitalOcean module for RobinPath.

![Category](https://img.shields.io/badge/category-DevOps-blue) ![Functions](https://img.shields.io/badge/functions-25-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `digitalocean` module lets you:

- listDroplets
- getDroplet
- createDroplet
- deleteDroplet
- dropletAction

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/digitalocean
```

## Quick Start

**1. Set up credentials**

```robinpath
digitalocean.setCredentials "your-credentials"
```

**2. listDroplets**

```robinpath
digitalocean.listDroplets
```

## Available Functions

| Function | Description |
|----------|-------------|
| `digitalocean.setCredentials` | Configure digitalocean credentials. |
| `digitalocean.listDroplets` | listDroplets |
| `digitalocean.getDroplet` | getDroplet |
| `digitalocean.createDroplet` | createDroplet |
| `digitalocean.deleteDroplet` | deleteDroplet |
| `digitalocean.dropletAction` | dropletAction |
| `digitalocean.listImages` | listImages |
| `digitalocean.listRegions` | listRegions |
| `digitalocean.listSizes` | listSizes |
| `digitalocean.listDomains` | listDomains |
| `digitalocean.getDomain` | getDomain |
| `digitalocean.createDomain` | createDomain |
| `digitalocean.listDomainRecords` | listDomainRecords |
| `digitalocean.createDomainRecord` | createDomainRecord |
| `digitalocean.deleteDomainRecord` | deleteDomainRecord |
| `digitalocean.listDatabases` | listDatabases |
| `digitalocean.getDatabase` | getDatabase |
| `digitalocean.listFirewalls` | listFirewalls |
| `digitalocean.createFirewall` | createFirewall |
| `digitalocean.listLoadBalancers` | listLoadBalancers |
| `digitalocean.listVolumes` | listVolumes |
| `digitalocean.createVolume` | createVolume |
| `digitalocean.deleteVolume` | deleteVolume |
| `digitalocean.getAccount` | getAccount |
| `digitalocean.listSnapshots` | listSnapshots |

## Examples

### listDroplets

```robinpath
digitalocean.listDroplets
```

### getDroplet

```robinpath
digitalocean.getDroplet
```

### createDroplet

```robinpath
digitalocean.createDroplet
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/digitalocean";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  digitalocean.setCredentials "your-credentials"
  digitalocean.listDroplets
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
