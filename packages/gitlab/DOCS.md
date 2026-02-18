---
title: "GitLab"
module: "gitlab"
package: "@robinpath/gitlab"
description: "GitLab module for RobinPath."
category: "devops"
tags: [gitlab, devops]
type: "integration"
auth: "api-key"
functionCount: 29
baseUrl: "https://gitlab.com"
---

# GitLab

> GitLab module for RobinPath.

**Package:** `@robinpath/gitlab` | **Category:** Devops | **Type:** Integration


## Authentication

```robinpath
gitlab.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `gitlab` module when you need to:

- **listProjects** -- Use `gitlab.listProjects` to perform this operation
- **getProject** -- Use `gitlab.getProject` to perform this operation
- **createProject** -- Use `gitlab.createProject` to perform this operation
- **deleteProject** -- Use `gitlab.deleteProject` to perform this operation
- **listIssues** -- Use `gitlab.listIssues` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure gitlab credentials. | `object` |
| [`listProjects`](#listprojects) | listProjects | `object` |
| [`getProject`](#getproject) | getProject | `object` |
| [`createProject`](#createproject) | createProject | `object` |
| [`deleteProject`](#deleteproject) | deleteProject | `object` |
| [`listIssues`](#listissues) | listIssues | `object` |
| [`getIssue`](#getissue) | getIssue | `object` |
| [`createIssue`](#createissue) | createIssue | `object` |
| [`updateIssue`](#updateissue) | updateIssue | `object` |
| [`listMergeRequests`](#listmergerequests) | listMergeRequests | `object` |
| [`getMergeRequest`](#getmergerequest) | getMergeRequest | `object` |
| [`createMergeRequest`](#createmergerequest) | createMergeRequest | `object` |
| [`updateMergeRequest`](#updatemergerequest) | updateMergeRequest | `object` |
| [`mergeMergeRequest`](#mergemergerequest) | mergeMergeRequest | `object` |
| [`listBranches`](#listbranches) | listBranches | `object` |
| [`createBranch`](#createbranch) | createBranch | `object` |
| [`deleteBranch`](#deletebranch) | deleteBranch | `object` |
| [`listPipelines`](#listpipelines) | listPipelines | `object` |
| [`getPipeline`](#getpipeline) | getPipeline | `object` |
| [`retryPipeline`](#retrypipeline) | retryPipeline | `object` |
| [`cancelPipeline`](#cancelpipeline) | cancelPipeline | `object` |
| [`listCommits`](#listcommits) | listCommits | `object` |
| [`listTags`](#listtags) | listTags | `object` |
| [`createTag`](#createtag) | createTag | `object` |
| [`listMembers`](#listmembers) | listMembers | `object` |
| [`addMember`](#addmember) | addMember | `object` |
| [`getUser`](#getuser) | getUser | `object` |
| [`searchProjects`](#searchprojects) | searchProjects | `object` |
| [`listEnvironments`](#listenvironments) | listEnvironments | `object` |


## Functions

### setCredentials

Configure gitlab credentials.

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `host` | `string` | Yes | host |
| `privateToken` | `string` | Yes | privateToken |

---

### listProjects

listProjects

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.listProjects
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getProject

getProject

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.getProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createProject

createProject

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.createProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteProject

deleteProject

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.deleteProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listIssues

listIssues

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.listIssues
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getIssue

getIssue

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.getIssue
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createIssue

createIssue

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.createIssue
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateIssue

updateIssue

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.updateIssue
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listMergeRequests

listMergeRequests

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.listMergeRequests
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getMergeRequest

getMergeRequest

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.getMergeRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createMergeRequest

createMergeRequest

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.createMergeRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateMergeRequest

updateMergeRequest

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.updateMergeRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### mergeMergeRequest

mergeMergeRequest

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.mergeMergeRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listBranches

listBranches

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.listBranches
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createBranch

createBranch

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.createBranch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteBranch

deleteBranch

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.deleteBranch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPipelines

listPipelines

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.listPipelines
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPipeline

getPipeline

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.getPipeline
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### retryPipeline

retryPipeline

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.retryPipeline
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### cancelPipeline

cancelPipeline

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.cancelPipeline
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCommits

listCommits

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.listCommits
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTags

listTags

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.listTags
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createTag

createTag

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.createTag
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listMembers

listMembers

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.listMembers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addMember

addMember

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.addMember
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUser

getUser

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.getUser
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchProjects

searchProjects

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.searchProjects
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listEnvironments

listEnvironments

**Module:** `gitlab` | **Returns:** `object` -- API response.

```robinpath
gitlab.listEnvironments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Gitlab API error (${res.status}): ${t}` | Check the error message for details |
| `gitlab.setCredentials requires host, privateToken.` | Check the error message for details |
| `gitlab.deleteProject requires an ID.` | Check the error message for details |
| `gitlab.updateIssue requires an ID.` | Check the error message for details |
| `gitlab.updateMergeRequest requires an ID.` | Check the error message for details |
| `gitlab.mergeMergeRequest requires an ID.` | Check the error message for details |
| `gitlab.deleteBranch requires an ID.` | Check the error message for details |
| `gitlab.retryPipeline requires an ID.` | Check the error message for details |

```robinpath
set $result as gitlab.listProjects
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
gitlab.setCredentials $token
set $result as gitlab.listProjects
each $item in $result
  print $item
end
```

### 2. Create a new item with createProject

Create a new resource and capture the result.

```robinpath
gitlab.setCredentials $token
set $result as gitlab.createProject
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
gitlab.setCredentials $token
set $created as gitlab.createProject
# Update the created item
gitlab.updateIssue
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
gitlab.setCredentials $token
set $existing as gitlab.listProjects
if $existing == null
  gitlab.createProject
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step GitLab workflow

Chain multiple gitlab operations together.

```robinpath
gitlab.setCredentials $token
set $r_listProjects as gitlab.listProjects
set $r_getProject as gitlab.getProject
set $r_createProject as gitlab.createProject
print "All operations complete"
```

### 6. Safe listProjects with validation

Check results before proceeding.

```robinpath
gitlab.setCredentials $token
set $result as gitlab.listProjects
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
- **vercel** -- Vercel module for complementary functionality
- **netlify** -- Netlify module for complementary functionality
