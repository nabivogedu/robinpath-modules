# @robinpath/github

> GitHub module for RobinPath.

![Category](https://img.shields.io/badge/category-DevOps-blue) ![Functions](https://img.shields.io/badge/functions-32-green) ![Auth](https://img.shields.io/badge/auth-Bearer%20Token-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `github` module lets you:

- Get repository information
- List repositories for a user or the authenticated user
- Create a new repository for the authenticated user
- Delete a repository (requires delete_repo scope)
- List branches in a repository

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/github
```

## Quick Start

**1. Set up credentials**

```robinpath
github.setToken "ghp_xxxxxxxxxxxx"
```

**2. Get repository information**

```robinpath
github.getRepo "octocat" "Hello-World"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `github.setToken` | Store a GitHub personal access token for authentication |
| `github.getRepo` | Get repository information |
| `github.listRepos` | List repositories for a user or the authenticated user |
| `github.createRepo` | Create a new repository for the authenticated user |
| `github.deleteRepo` | Delete a repository (requires delete_repo scope) |
| `github.listBranches` | List branches in a repository |
| `github.getBranch` | Get details for a specific branch |
| `github.createBranch` | Create a new branch from an existing branch ref |
| `github.listCommits` | List commits in a repository |
| `github.getCommit` | Get a single commit by SHA |
| `github.listIssues` | List issues in a repository |
| `github.createIssue` | Create a new issue in a repository |
| `github.updateIssue` | Update an existing issue |
| `github.closeIssue` | Close an issue |
| `github.addIssueComment` | Add a comment to an issue or pull request |
| `github.listIssueComments` | List comments on an issue or pull request |
| `github.listPullRequests` | List pull requests in a repository |
| `github.createPullRequest` | Create a new pull request |
| `github.mergePullRequest` | Merge a pull request |
| `github.listReleases` | List releases in a repository |
| `github.createRelease` | Create a new release from a tag |
| `github.listWorkflows` | List GitHub Actions workflows in a repository |
| `github.triggerWorkflow` | Trigger a GitHub Actions workflow dispatch event |
| `github.listWorkflowRuns` | List workflow runs for a repository or specific workflow |
| `github.getUser` | Get a user profile or the authenticated user |
| `github.searchRepos` | Search GitHub repositories |
| `github.searchCode` | Search code across GitHub repositories |
| `github.listLabels` | List labels in a repository |
| `github.createLabel` | Create a new label in a repository |
| `github.addLabels` | Add labels to an issue or pull request |
| `github.listMilestones` | List milestones in a repository |
| `github.createMilestone` | Create a new milestone in a repository |

## Examples

### Get repository information

```robinpath
github.getRepo "octocat" "Hello-World"
```

### List repositories for a user or the authenticated user

```robinpath
github.listRepos "octocat"
```

### Create a new repository for the authenticated user

```robinpath
github.createRepo "my-project" {"description": "A new project", "private": true, "autoInit": true}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/github";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  github.setToken "ghp_xxxxxxxxxxxx"
  github.getRepo "octocat" "Hello-World"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/docker`](../docker) — Docker module for complementary functionality
- [`@robinpath/git`](../git) — Git module for complementary functionality
- [`@robinpath/gitlab`](../gitlab) — GitLab module for complementary functionality
- [`@robinpath/vercel`](../vercel) — Vercel module for complementary functionality
- [`@robinpath/netlify`](../netlify) — Netlify module for complementary functionality

## License

MIT
