# @robinpath/bitbucket

> Bitbucket module for RobinPath.

![Category](https://img.shields.io/badge/category-DevOps-blue) ![Functions](https://img.shields.io/badge/functions-25-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `bitbucket` module lets you:

- listRepositories
- getRepository
- createRepository
- deleteRepository
- listBranches

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/bitbucket
```

## Quick Start

**1. Set up credentials**

```robinpath
bitbucket.setCredentials "your-credentials"
```

**2. listRepositories**

```robinpath
bitbucket.listRepositories
```

## Available Functions

| Function | Description |
|----------|-------------|
| `bitbucket.setCredentials` | Configure bitbucket credentials. |
| `bitbucket.listRepositories` | listRepositories |
| `bitbucket.getRepository` | getRepository |
| `bitbucket.createRepository` | createRepository |
| `bitbucket.deleteRepository` | deleteRepository |
| `bitbucket.listBranches` | listBranches |
| `bitbucket.createBranch` | createBranch |
| `bitbucket.deleteBranch` | deleteBranch |
| `bitbucket.listPullRequests` | listPullRequests |
| `bitbucket.getPullRequest` | getPullRequest |
| `bitbucket.createPullRequest` | createPullRequest |
| `bitbucket.updatePullRequest` | updatePullRequest |
| `bitbucket.mergePullRequest` | mergePullRequest |
| `bitbucket.declinePullRequest` | declinePullRequest |
| `bitbucket.listCommits` | listCommits |
| `bitbucket.listPipelines` | listPipelines |
| `bitbucket.getPipeline` | getPipeline |
| `bitbucket.triggerPipeline` | triggerPipeline |
| `bitbucket.listIssues` | listIssues |
| `bitbucket.createIssue` | createIssue |
| `bitbucket.listWorkspaces` | listWorkspaces |
| `bitbucket.getWorkspace` | getWorkspace |
| `bitbucket.listWebhooks` | listWebhooks |
| `bitbucket.getUser` | getUser |
| `bitbucket.listDeployments` | listDeployments |

## Examples

### listRepositories

```robinpath
bitbucket.listRepositories
```

### getRepository

```robinpath
bitbucket.getRepository
```

### createRepository

```robinpath
bitbucket.createRepository
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/bitbucket";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  bitbucket.setCredentials "your-credentials"
  bitbucket.listRepositories
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
