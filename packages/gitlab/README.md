# @robinpath/gitlab

> GitLab module for RobinPath.

![Category](https://img.shields.io/badge/category-DevOps-blue) ![Functions](https://img.shields.io/badge/functions-29-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `gitlab` module lets you:

- listProjects
- getProject
- createProject
- deleteProject
- listIssues

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/gitlab
```

## Quick Start

**1. Set up credentials**

```robinpath
gitlab.setCredentials "your-credentials"
```

**2. listProjects**

```robinpath
gitlab.listProjects
```

## Available Functions

| Function | Description |
|----------|-------------|
| `gitlab.setCredentials` | Configure gitlab credentials. |
| `gitlab.listProjects` | listProjects |
| `gitlab.getProject` | getProject |
| `gitlab.createProject` | createProject |
| `gitlab.deleteProject` | deleteProject |
| `gitlab.listIssues` | listIssues |
| `gitlab.getIssue` | getIssue |
| `gitlab.createIssue` | createIssue |
| `gitlab.updateIssue` | updateIssue |
| `gitlab.listMergeRequests` | listMergeRequests |
| `gitlab.getMergeRequest` | getMergeRequest |
| `gitlab.createMergeRequest` | createMergeRequest |
| `gitlab.updateMergeRequest` | updateMergeRequest |
| `gitlab.mergeMergeRequest` | mergeMergeRequest |
| `gitlab.listBranches` | listBranches |
| `gitlab.createBranch` | createBranch |
| `gitlab.deleteBranch` | deleteBranch |
| `gitlab.listPipelines` | listPipelines |
| `gitlab.getPipeline` | getPipeline |
| `gitlab.retryPipeline` | retryPipeline |
| `gitlab.cancelPipeline` | cancelPipeline |
| `gitlab.listCommits` | listCommits |
| `gitlab.listTags` | listTags |
| `gitlab.createTag` | createTag |
| `gitlab.listMembers` | listMembers |
| `gitlab.addMember` | addMember |
| `gitlab.getUser` | getUser |
| `gitlab.searchProjects` | searchProjects |
| `gitlab.listEnvironments` | listEnvironments |

## Examples

### listProjects

```robinpath
gitlab.listProjects
```

### getProject

```robinpath
gitlab.getProject
```

### createProject

```robinpath
gitlab.createProject
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/gitlab";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  gitlab.setCredentials "your-credentials"
  gitlab.listProjects
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/docker`](../docker) — Docker module for complementary functionality
- [`@robinpath/git`](../git) — Git module for complementary functionality
- [`@robinpath/github`](../github) — GitHub module for complementary functionality
- [`@robinpath/vercel`](../vercel) — Vercel module for complementary functionality
- [`@robinpath/netlify`](../netlify) — Netlify module for complementary functionality

## License

MIT
