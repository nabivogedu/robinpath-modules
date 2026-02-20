---
title: "Bitbucket"
module: "bitbucket"
package: "@robinpath/bitbucket"
description: "Bitbucket module for RobinPath."
category: "devops"
tags: [bitbucket, devops]
type: "integration"
auth: "api-key"
functionCount: 25
baseUrl: "https://api.bitbucket.org"
---

# Bitbucket

> Bitbucket module for RobinPath.

**Package:** `@robinpath/bitbucket` | **Category:** Devops | **Type:** Integration


## Authentication

```robinpath
bitbucket.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `bitbucket` module when you need to:

- **listRepositories** -- Use `bitbucket.listRepositories` to perform this operation
- **getRepository** -- Use `bitbucket.getRepository` to perform this operation
- **createRepository** -- Use `bitbucket.createRepository` to perform this operation
- **deleteRepository** -- Use `bitbucket.deleteRepository` to perform this operation
- **listBranches** -- Use `bitbucket.listBranches` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure bitbucket credentials. | `object` |
| [`listRepositories`](#listrepositories) | listRepositories | `object` |
| [`getRepository`](#getrepository) | getRepository | `object` |
| [`createRepository`](#createrepository) | createRepository | `object` |
| [`deleteRepository`](#deleterepository) | deleteRepository | `object` |
| [`listBranches`](#listbranches) | listBranches | `object` |
| [`createBranch`](#createbranch) | createBranch | `object` |
| [`deleteBranch`](#deletebranch) | deleteBranch | `object` |
| [`listPullRequests`](#listpullrequests) | listPullRequests | `object` |
| [`getPullRequest`](#getpullrequest) | getPullRequest | `object` |
| [`createPullRequest`](#createpullrequest) | createPullRequest | `object` |
| [`updatePullRequest`](#updatepullrequest) | updatePullRequest | `object` |
| [`mergePullRequest`](#mergepullrequest) | mergePullRequest | `object` |
| [`declinePullRequest`](#declinepullrequest) | declinePullRequest | `object` |
| [`listCommits`](#listcommits) | listCommits | `object` |
| [`listPipelines`](#listpipelines) | listPipelines | `object` |
| [`getPipeline`](#getpipeline) | getPipeline | `object` |
| [`triggerPipeline`](#triggerpipeline) | triggerPipeline | `object` |
| [`listIssues`](#listissues) | listIssues | `object` |
| [`createIssue`](#createissue) | createIssue | `object` |
| [`listWorkspaces`](#listworkspaces) | listWorkspaces | `object` |
| [`getWorkspace`](#getworkspace) | getWorkspace | `object` |
| [`listWebhooks`](#listwebhooks) | listWebhooks | `object` |
| [`getUser`](#getuser) | getUser | `object` |
| [`listDeployments`](#listdeployments) | listDeployments | `object` |


## Functions

### setCredentials

Configure bitbucket credentials.

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | `string` | Yes | username |
| `appPassword` | `string` | Yes | appPassword |

---

### listRepositories

listRepositories

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.listRepositories
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getRepository

getRepository

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.getRepository
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createRepository

createRepository

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.createRepository
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteRepository

deleteRepository

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.deleteRepository
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listBranches

listBranches

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.listBranches
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createBranch

createBranch

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.createBranch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteBranch

deleteBranch

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.deleteBranch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPullRequests

listPullRequests

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.listPullRequests
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPullRequest

getPullRequest

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.getPullRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createPullRequest

createPullRequest

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.createPullRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updatePullRequest

updatePullRequest

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.updatePullRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### mergePullRequest

mergePullRequest

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.mergePullRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### declinePullRequest

declinePullRequest

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.declinePullRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCommits

listCommits

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.listCommits
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPipelines

listPipelines

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.listPipelines
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPipeline

getPipeline

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.getPipeline
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### triggerPipeline

triggerPipeline

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.triggerPipeline
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listIssues

listIssues

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.listIssues
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createIssue

createIssue

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.createIssue
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listWorkspaces

listWorkspaces

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.listWorkspaces
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getWorkspace

getWorkspace

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.getWorkspace
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listWebhooks

listWebhooks

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.listWebhooks
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUser

getUser

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.getUser
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listDeployments

listDeployments

**Module:** `bitbucket` | **Returns:** `object` -- API response.

```robinpath
bitbucket.listDeployments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Bitbucket API error (${res.status}): ${t}` | Check the error message for details |
| `bitbucket.setCredentials requires username, appPassword.` | Check the error message for details |
| `bitbucket.deleteRepository requires an ID.` | Check the error message for details |
| `bitbucket.deleteBranch requires an ID.` | Check the error message for details |
| `bitbucket.updatePullRequest requires an ID.` | Check the error message for details |
| `bitbucket.mergePullRequest requires an ID.` | Check the error message for details |
| `bitbucket.declinePullRequest requires an ID.` | Check the error message for details |
| `Bitbucket: "..." not configured. Call bitbucket.setCredentials first.` | Check the error message for details |

```robinpath
set $result as bitbucket.listRepositories
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Repositories

Retrieve all items and loop through them.

```robinpath
bitbucket.setCredentials $token
set $result as bitbucket.listRepositories
each $item in $result
  print $item
end
```

### 2. Create a new item with createRepository

Create a new resource and capture the result.

```robinpath
bitbucket.setCredentials $token
set $result as bitbucket.createRepository
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
bitbucket.setCredentials $token
set $created as bitbucket.createRepository
# Update the created item
bitbucket.updatePullRequest
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
bitbucket.setCredentials $token
set $existing as bitbucket.listRepositories
if $existing == null
  bitbucket.createRepository
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Bitbucket workflow

Chain multiple bitbucket operations together.

```robinpath
bitbucket.setCredentials $token
set $r_listRepositories as bitbucket.listRepositories
set $r_getRepository as bitbucket.getRepository
set $r_createRepository as bitbucket.createRepository
print "All operations complete"
```

### 6. Safe listRepositories with validation

Check results before proceeding.

```robinpath
bitbucket.setCredentials $token
set $result as bitbucket.listRepositories
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
- **vercel** -- Vercel module for complementary functionality
