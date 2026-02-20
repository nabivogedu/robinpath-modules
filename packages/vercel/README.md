# @robinpath/vercel

> Vercel module for RobinPath.

![Category](https://img.shields.io/badge/category-DevOps-blue) ![Functions](https://img.shields.io/badge/functions-30-green) ![Auth](https://img.shields.io/badge/auth-Bearer%20Token-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `vercel` module lets you:

- List all projects in the authenticated account
- Get details of a project by ID or name
- Create a new Vercel project
- Update settings of an existing project
- Delete a Vercel project

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/vercel
```

## Quick Start

**1. Set up credentials**

```robinpath
vercel.setToken "my-vercel-token"
```

**2. List all projects in the authenticated account**

```robinpath
vercel.listProjects {"limit": 20, "search": "my-app"}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `vercel.setToken` | Set the Vercel API bearer token for authentication |
| `vercel.listProjects` | List all projects in the authenticated account |
| `vercel.getProject` | Get details of a project by ID or name |
| `vercel.createProject` | Create a new Vercel project |
| `vercel.updateProject` | Update settings of an existing project |
| `vercel.deleteProject` | Delete a Vercel project |
| `vercel.listDeployments` | List deployments, optionally filtered by project, state, or target |
| `vercel.getDeployment` | Get details of a specific deployment |
| `vercel.createDeployment` | Create a new deployment with files |
| `vercel.cancelDeployment` | Cancel an in-progress deployment |
| `vercel.deleteDeployment` | Delete a deployment |
| `vercel.redeployDeployment` | Redeploy an existing deployment (create from existing) |
| `vercel.listDomains` | List all domains in the authenticated account |
| `vercel.getDomain` | Get information about a specific domain |
| `vercel.addDomain` | Register a new domain to the account |
| `vercel.removeDomain` | Remove a domain from the account |
| `vercel.listProjectDomains` | List all domains assigned to a project |
| `vercel.addProjectDomain` | Add a domain to a project |
| `vercel.removeProjectDomain` | Remove a domain from a project |
| `vercel.getDomainConfig` | Get DNS configuration for a domain |
| `vercel.verifyDomain` | Verify a domain attached to a project |
| `vercel.listEnvVars` | List all environment variables for a project |
| `vercel.getEnvVar` | Get details of a specific environment variable |
| `vercel.createEnvVar` | Create a new environment variable for a project |
| `vercel.updateEnvVar` | Update an existing environment variable |
| `vercel.deleteEnvVar` | Delete an environment variable from a project |
| `vercel.getUser` | Get the authenticated user's profile |
| `vercel.listTeams` | List all teams the authenticated user belongs to |
| `vercel.getTeam` | Get details of a specific team |
| `vercel.getDeploymentLogs` | Get build logs for a deployment |

## Examples

### List all projects in the authenticated account

```robinpath
vercel.listProjects {"limit": 20, "search": "my-app"}
```

### Get details of a project by ID or name

```robinpath
vercel.getProject "my-project"
```

### Create a new Vercel project

```robinpath
vercel.createProject "my-app" {"framework": "nextjs"}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/vercel";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  vercel.setToken "my-vercel-token"
  vercel.listProjects {"limit": 20, "search": "my-app"}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/docker`](../docker) — Docker module for complementary functionality
- [`@robinpath/git`](../git) — Git module for complementary functionality
- [`@robinpath/github`](../github) — GitHub module for complementary functionality
- [`@robinpath/gitlab`](../gitlab) — GitLab module for complementary functionality
- [`@robinpath/netlify`](../netlify) — Netlify module for complementary functionality

## License

MIT
