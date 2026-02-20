---
title: "Vercel"
module: "vercel"
package: "@robinpath/vercel"
description: "Vercel module for RobinPath."
category: "devops"
tags: [vercel, devops]
type: "integration"
auth: "bearer-token"
functionCount: 30
baseUrl: "https://api.vercel.com"
---

# Vercel

> Vercel module for RobinPath.

**Package:** `@robinpath/vercel` | **Category:** Devops | **Type:** Integration


## Authentication

```robinpath
vercel.setToken "my-vercel-token"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `vercel` module when you need to:

- **List all projects in the authenticated account** -- Use `vercel.listProjects` to perform this operation
- **Get details of a project by ID or name** -- Use `vercel.getProject` to perform this operation
- **Create a new Vercel project** -- Use `vercel.createProject` to perform this operation
- **Update settings of an existing project** -- Use `vercel.updateProject` to perform this operation
- **Delete a Vercel project** -- Use `vercel.deleteProject` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setToken`](#settoken) | Set the Vercel API bearer token for authentication | `{configured}` |
| [`listProjects`](#listprojects) | List all projects in the authenticated account | `{projects[], pagination}` |
| [`getProject`](#getproject) | Get details of a project by ID or name | `Project object with id, name, framework, targets, etc.` |
| [`createProject`](#createproject) | Create a new Vercel project | `Created project object` |
| [`updateProject`](#updateproject) | Update settings of an existing project | `Updated project object` |
| [`deleteProject`](#deleteproject) | Delete a Vercel project | `{deleted, projectId}` |
| [`listDeployments`](#listdeployments) | List deployments, optionally filtered by project, state, or target | `{deployments[], pagination}` |
| [`getDeployment`](#getdeployment) | Get details of a specific deployment | `Deployment object with id, url, state, meta, etc.` |
| [`createDeployment`](#createdeployment) | Create a new deployment with files | `Created deployment object` |
| [`cancelDeployment`](#canceldeployment) | Cancel an in-progress deployment | `Cancelled deployment object` |
| [`deleteDeployment`](#deletedeployment) | Delete a deployment | `{deleted, deploymentId}` |
| [`redeployDeployment`](#redeploydeployment) | Redeploy an existing deployment (create from existing) | `New deployment object` |
| [`listDomains`](#listdomains) | List all domains in the authenticated account | `{domains[], pagination}` |
| [`getDomain`](#getdomain) | Get information about a specific domain | `Domain object with name, serviceType, verified, etc.` |
| [`addDomain`](#adddomain) | Register a new domain to the account | `Created domain object` |
| [`removeDomain`](#removedomain) | Remove a domain from the account | `{deleted, domain}` |
| [`listProjectDomains`](#listprojectdomains) | List all domains assigned to a project | `{domains[]}` |
| [`addProjectDomain`](#addprojectdomain) | Add a domain to a project | `Domain configuration object` |
| [`removeProjectDomain`](#removeprojectdomain) | Remove a domain from a project | `{deleted, projectId, domain}` |
| [`getDomainConfig`](#getdomainconfig) | Get DNS configuration for a domain | `Domain DNS config with misconfigured, cnames, aValues, etc.` |
| [`verifyDomain`](#verifydomain) | Verify a domain attached to a project | `Verification result object` |
| [`listEnvVars`](#listenvvars) | List all environment variables for a project | `{envs[]} with key, value, target, type, id` |
| [`getEnvVar`](#getenvvar) | Get details of a specific environment variable | `Env var object with key, value, target, type` |
| [`createEnvVar`](#createenvvar) | Create a new environment variable for a project | `Created env var object` |
| [`updateEnvVar`](#updateenvvar) | Update an existing environment variable | `Updated env var object` |
| [`deleteEnvVar`](#deleteenvvar) | Delete an environment variable from a project | `{deleted, projectId, envId}` |
| [`getUser`](#getuser) | Get the authenticated user's profile | `User object with id, email, name, username, etc.` |
| [`listTeams`](#listteams) | List all teams the authenticated user belongs to | `{teams[], pagination}` |
| [`getTeam`](#getteam) | Get details of a specific team | `Team object with id, slug, name, etc.` |
| [`getDeploymentLogs`](#getdeploymentlogs) | Get build logs for a deployment | `Array of log event objects` |


## Functions

### setToken

Set the Vercel API bearer token for authentication

**Module:** `vercel` | **Returns:** `object` -- {configured}

```robinpath
vercel.setToken "my-vercel-token"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | `string` | Yes | Vercel API token |

---

### listProjects

List all projects in the authenticated account

**Module:** `vercel` | **Returns:** `object` -- {projects[], pagination}

```robinpath
vercel.listProjects {"limit": 20, "search": "my-app"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {limit, from, search} |

---

### getProject

Get details of a project by ID or name

**Module:** `vercel` | **Returns:** `object` -- Project object with id, name, framework, targets, etc.

```robinpath
vercel.getProject "my-project"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | `string` | Yes | Project ID or name |

---

### createProject

Create a new Vercel project

**Module:** `vercel` | **Returns:** `object` -- Created project object

```robinpath
vercel.createProject "my-app" {"framework": "nextjs"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Project name |
| `options` | `object` | No | {framework, gitRepository, buildCommand, rootDirectory} |

---

### updateProject

Update settings of an existing project

**Module:** `vercel` | **Returns:** `object` -- Updated project object

```robinpath
vercel.updateProject "my-project" {"buildCommand": "npm run build"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | `string` | Yes | Project ID or name |
| `options` | `object` | Yes | Fields to update (name, framework, buildCommand, etc.) |

---

### deleteProject

Delete a Vercel project

**Module:** `vercel` | **Returns:** `object` -- {deleted, projectId}

```robinpath
vercel.deleteProject "my-project"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | `string` | Yes | Project ID or name |

---

### listDeployments

List deployments, optionally filtered by project, state, or target

**Module:** `vercel` | **Returns:** `object` -- {deployments[], pagination}

```robinpath
vercel.listDeployments {"projectId": "prj_abc123", "limit": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {projectId, limit, state, target} |

---

### getDeployment

Get details of a specific deployment

**Module:** `vercel` | **Returns:** `object` -- Deployment object with id, url, state, meta, etc.

```robinpath
vercel.getDeployment "dpl_abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `deploymentId` | `string` | Yes | Deployment ID or URL |

---

### createDeployment

Create a new deployment with files

**Module:** `vercel` | **Returns:** `object` -- Created deployment object

```robinpath
vercel.createDeployment "my-app" [{"file": "index.html", "data": "<h1>Hello</h1>"}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Project name for the deployment |
| `files` | `array` | Yes | Array of file objects [{file, data}] |
| `options` | `object` | No | {target, gitSource} |

---

### cancelDeployment

Cancel an in-progress deployment

**Module:** `vercel` | **Returns:** `object` -- Cancelled deployment object

```robinpath
vercel.cancelDeployment "dpl_abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `deploymentId` | `string` | Yes | Deployment ID |

---

### deleteDeployment

Delete a deployment

**Module:** `vercel` | **Returns:** `object` -- {deleted, deploymentId}

```robinpath
vercel.deleteDeployment "dpl_abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `deploymentId` | `string` | Yes | Deployment ID or URL |

---

### redeployDeployment

Redeploy an existing deployment (create from existing)

**Module:** `vercel` | **Returns:** `object` -- New deployment object

```robinpath
vercel.redeployDeployment "dpl_abc123" {"target": "production"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `deploymentId` | `string` | Yes | Source deployment ID to redeploy |
| `options` | `object` | No | {target, name} |

---

### listDomains

List all domains in the authenticated account

**Module:** `vercel` | **Returns:** `object` -- {domains[], pagination}

```robinpath
vercel.listDomains
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {limit, since, until} |

---

### getDomain

Get information about a specific domain

**Module:** `vercel` | **Returns:** `object` -- Domain object with name, serviceType, verified, etc.

```robinpath
vercel.getDomain "example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | `string` | Yes | Domain name |

---

### addDomain

Register a new domain to the account

**Module:** `vercel` | **Returns:** `object` -- Created domain object

```robinpath
vercel.addDomain "example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | `string` | Yes | Domain name to add |
| `options` | `object` | No | {cdnEnabled} |

---

### removeDomain

Remove a domain from the account

**Module:** `vercel` | **Returns:** `object` -- {deleted, domain}

```robinpath
vercel.removeDomain "example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | `string` | Yes | Domain name to remove |

---

### listProjectDomains

List all domains assigned to a project

**Module:** `vercel` | **Returns:** `object` -- {domains[]}

```robinpath
vercel.listProjectDomains "my-project"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | `string` | Yes | Project ID or name |

---

### addProjectDomain

Add a domain to a project

**Module:** `vercel` | **Returns:** `object` -- Domain configuration object

```robinpath
vercel.addProjectDomain "my-project" "example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | `string` | Yes | Project ID or name |
| `domain` | `string` | Yes | Domain name to add |

---

### removeProjectDomain

Remove a domain from a project

**Module:** `vercel` | **Returns:** `object` -- {deleted, projectId, domain}

```robinpath
vercel.removeProjectDomain "my-project" "example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | `string` | Yes | Project ID or name |
| `domain` | `string` | Yes | Domain name to remove |

---

### getDomainConfig

Get DNS configuration for a domain

**Module:** `vercel` | **Returns:** `object` -- Domain DNS config with misconfigured, cnames, aValues, etc.

```robinpath
vercel.getDomainConfig "example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | `string` | Yes | Domain name |

---

### verifyDomain

Verify a domain attached to a project

**Module:** `vercel` | **Returns:** `object` -- Verification result object

```robinpath
vercel.verifyDomain "my-project" "example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | `string` | Yes | Project ID or name |
| `domain` | `string` | Yes | Domain name to verify |

---

### listEnvVars

List all environment variables for a project

**Module:** `vercel` | **Returns:** `object` -- {envs[]} with key, value, target, type, id

```robinpath
vercel.listEnvVars "my-project"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | `string` | Yes | Project ID or name |

---

### getEnvVar

Get details of a specific environment variable

**Module:** `vercel` | **Returns:** `object` -- Env var object with key, value, target, type

```robinpath
vercel.getEnvVar "my-project" "env_abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | `string` | Yes | Project ID or name |
| `envId` | `string` | Yes | Environment variable ID |

---

### createEnvVar

Create a new environment variable for a project

**Module:** `vercel` | **Returns:** `object` -- Created env var object

```robinpath
vercel.createEnvVar "my-project" "API_KEY" "secret123" ["production", "preview"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | `string` | Yes | Project ID or name |
| `key` | `string` | Yes | Environment variable name |
| `value` | `string` | Yes | Environment variable value |
| `targets` | `array` | Yes | Deployment targets: production, preview, development |
| `options` | `object` | No | {type, gitBranch} type: encrypted|plain|sensitive |

---

### updateEnvVar

Update an existing environment variable

**Module:** `vercel` | **Returns:** `object` -- Updated env var object

```robinpath
vercel.updateEnvVar "my-project" "env_abc123" "newValue"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | `string` | Yes | Project ID or name |
| `envId` | `string` | Yes | Environment variable ID |
| `value` | `string` | Yes | New value |
| `options` | `object` | No | {target, type, gitBranch} |

---

### deleteEnvVar

Delete an environment variable from a project

**Module:** `vercel` | **Returns:** `object` -- {deleted, projectId, envId}

```robinpath
vercel.deleteEnvVar "my-project" "env_abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | `string` | Yes | Project ID or name |
| `envId` | `string` | Yes | Environment variable ID |

---

### getUser

Get the authenticated user's profile

**Module:** `vercel` | **Returns:** `object` -- User object with id, email, name, username, etc.

```robinpath
vercel.getUser
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### listTeams

List all teams the authenticated user belongs to

**Module:** `vercel` | **Returns:** `object` -- {teams[], pagination}

```robinpath
vercel.listTeams
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {limit, since, until} |

---

### getTeam

Get details of a specific team

**Module:** `vercel` | **Returns:** `object` -- Team object with id, slug, name, etc.

```robinpath
vercel.getTeam "team_abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `teamId` | `string` | Yes | Team ID |

---

### getDeploymentLogs

Get build logs for a deployment

**Module:** `vercel` | **Returns:** `array` -- Array of log event objects

```robinpath
vercel.getDeploymentLogs "dpl_abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `deploymentId` | `string` | Yes | Deployment ID |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Vercel API token not set. Call vercel.setToken first.` | Check the error message for details |
| `Vercel API error (${response.status}): ${errMsg}` | Check the error message for details |
| `token is required` | Check the error message for details |
| `projectId is required` | Check the error message for details |
| `name is required` | Check the error message for details |
| `deploymentId is required` | Check the error message for details |
| `files must be an array` | Check the error message for details |
| `domain is required` | Check the error message for details |

```robinpath
set $result as vercel.listProjects {"limit": 20, "search": "my-app"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Projects

Retrieve all items and loop through them.

```robinpath
vercel.setToken $token
set $result as vercel.listProjects {"limit": 20, "search": "my-app"}
each $item in $result
  print $item
end
```

### 2. Create a new item with createProject

Create a new resource and capture the result.

```robinpath
vercel.setToken $token
set $result as vercel.createProject "my-app" {"framework": "nextjs"}
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
vercel.setToken $token
set $created as vercel.createProject "my-app" {"framework": "nextjs"}
# Update the created item
vercel.updateProject "my-project" {"buildCommand": "npm run build"}
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
vercel.setToken $token
set $existing as vercel.listProjects {"limit": 20, "search": "my-app"}
if $existing == null
  vercel.createProject "my-app" {"framework": "nextjs"}
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Vercel workflow

Chain multiple vercel operations together.

```robinpath
vercel.setToken $token
set $r_listProjects as vercel.listProjects {"limit": 20, "search": "my-app"}
set $r_getProject as vercel.getProject "my-project"
set $r_createProject as vercel.createProject "my-app" {"framework": "nextjs"}
print "All operations complete"
```

### 6. Safe listProjects with validation

Check results before proceeding.

```robinpath
vercel.setToken $token
set $result as vercel.listProjects {"limit": 20, "search": "my-app"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **docker** -- Docker module for complementary functionality
- **git** -- Git module for complementary functionality
- **github** -- GitHub module for complementary functionality
- **gitlab** -- GitLab module for complementary functionality
- **netlify** -- Netlify module for complementary functionality
