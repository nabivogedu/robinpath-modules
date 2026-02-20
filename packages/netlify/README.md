# @robinpath/netlify

> Netlify module for RobinPath.

![Category](https://img.shields.io/badge/category-DevOps-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `netlify` module lets you:

- listSites
- getSite
- createSite
- updateSite
- deleteSite

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/netlify
```

## Quick Start

**1. Set up credentials**

```robinpath
netlify.setCredentials "your-credentials"
```

**2. listSites**

```robinpath
netlify.listSites
```

## Available Functions

| Function | Description |
|----------|-------------|
| `netlify.setCredentials` | Configure netlify credentials. |
| `netlify.listSites` | listSites |
| `netlify.getSite` | getSite |
| `netlify.createSite` | createSite |
| `netlify.updateSite` | updateSite |
| `netlify.deleteSite` | deleteSite |
| `netlify.listDeploys` | listDeploys |
| `netlify.getDeploy` | getDeploy |
| `netlify.lockDeploy` | lockDeploy |
| `netlify.unlockDeploy` | unlockDeploy |
| `netlify.restoreDeploy` | restoreDeploy |
| `netlify.cancelDeploy` | cancelDeploy |
| `netlify.listForms` | listForms |
| `netlify.listFormSubmissions` | listFormSubmissions |
| `netlify.deleteFormSubmission` | deleteFormSubmission |
| `netlify.listDnsZones` | listDnsZones |
| `netlify.getDnsZone` | getDnsZone |
| `netlify.createDnsRecord` | createDnsRecord |
| `netlify.listBuildHooks` | listBuildHooks |
| `netlify.triggerBuild` | triggerBuild |
| `netlify.listSiteDomains` | listSiteDomains |

## Examples

### listSites

```robinpath
netlify.listSites
```

### getSite

```robinpath
netlify.getSite
```

### createSite

```robinpath
netlify.createSite
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/netlify";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  netlify.setCredentials "your-credentials"
  netlify.listSites
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
