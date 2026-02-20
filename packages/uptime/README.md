# @robinpath/uptime

> Uptime module for RobinPath.

![Category](https://img.shields.io/badge/category-DevOps-blue) ![Functions](https://img.shields.io/badge/functions-14-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `uptime` module lets you:

- checkHttp
- checkHttps
- checkTcp
- checkDns
- checkSslCertificate

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/uptime
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
uptime.checkHttps
```

## Available Functions

| Function | Description |
|----------|-------------|
| `uptime.checkHttp` | checkHttp |
| `uptime.checkHttps` | checkHttps |
| `uptime.checkTcp` | checkTcp |
| `uptime.checkDns` | checkDns |
| `uptime.checkSslCertificate` | checkSslCertificate |
| `uptime.batchCheck` | batchCheck |
| `uptime.getResponseTime` | getResponseTime |
| `uptime.checkContentMatch` | checkContentMatch |
| `uptime.checkRedirect` | checkRedirect |
| `uptime.getHeaders` | getHeaders |
| `uptime.checkPort` | checkPort |
| `uptime.formatReport` | formatReport |
| `uptime.comparePerformance` | comparePerformance |
| `uptime.checkHealth` | checkHealth |

## Examples

### checkHttps

```robinpath
uptime.checkHttps
```

### checkTcp

```robinpath
uptime.checkTcp
```

### checkDns

```robinpath
uptime.checkDns
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/uptime";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  uptime.checkHttps
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
