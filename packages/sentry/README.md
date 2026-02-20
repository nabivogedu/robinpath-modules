# @robinpath/sentry

> Sentry module for RobinPath.

![Category](https://img.shields.io/badge/category-DevOps-blue) ![Functions](https://img.shields.io/badge/functions-19-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `sentry` module lets you:

- listProjects
- getProject
- listIssues
- getIssue
- updateIssue

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/sentry
```

## Quick Start

**1. Set up credentials**

```robinpath
sentry.setCredentials "your-credentials"
```

**2. listProjects**

```robinpath
sentry.listProjects
```

## Available Functions

| Function | Description |
|----------|-------------|
| `sentry.setCredentials` | Configure sentry credentials. |
| `sentry.listProjects` | listProjects |
| `sentry.getProject` | getProject |
| `sentry.listIssues` | listIssues |
| `sentry.getIssue` | getIssue |
| `sentry.updateIssue` | updateIssue |
| `sentry.deleteIssue` | deleteIssue |
| `sentry.listIssueEvents` | listIssueEvents |
| `sentry.getLatestEvent` | getLatestEvent |
| `sentry.listReleases` | listReleases |
| `sentry.createRelease` | createRelease |
| `sentry.listAlertRules` | listAlertRules |
| `sentry.createAlertRule` | createAlertRule |
| `sentry.resolveIssue` | resolveIssue |
| `sentry.ignoreIssue` | ignoreIssue |
| `sentry.assignIssue` | assignIssue |
| `sentry.listTeams` | listTeams |
| `sentry.getOrganization` | getOrganization |
| `sentry.listProjectKeys` | listProjectKeys |

## Examples

### listProjects

```robinpath
sentry.listProjects
```

### getProject

```robinpath
sentry.getProject
```

### listIssues

```robinpath
sentry.listIssues
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/sentry";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  sentry.setCredentials "your-credentials"
  sentry.listProjects
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
