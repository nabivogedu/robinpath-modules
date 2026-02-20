---
title: "GitHub"
module: "github"
package: "@robinpath/github"
description: "GitHub module for RobinPath."
category: "devops"
tags: [github, devops]
type: "integration"
auth: "bearer-token"
functionCount: 32
baseUrl: "https://api.github.com"
---

# GitHub

> GitHub module for RobinPath.

**Package:** `@robinpath/github` | **Category:** Devops | **Type:** Integration


## Authentication

```robinpath
github.setToken "ghp_xxxxxxxxxxxx"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `github` module when you need to:

- **Get repository information** -- Use `github.getRepo` to perform this operation
- **List repositories for a user or the authenticated user** -- Use `github.listRepos` to perform this operation
- **Create a new repository for the authenticated user** -- Use `github.createRepo` to perform this operation
- **Delete a repository (requires delete_repo scope)** -- Use `github.deleteRepo` to perform this operation
- **List branches in a repository** -- Use `github.listBranches` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setToken`](#settoken) | Store a GitHub personal access token for authentication | `{ok, message}` |
| [`getRepo`](#getrepo) | Get repository information | `Repository object with name, description, stars, forks, etc.` |
| [`listRepos`](#listrepos) | List repositories for a user or the authenticated user | `Array of repository objects` |
| [`createRepo`](#createrepo) | Create a new repository for the authenticated user | `Created repository object` |
| [`deleteRepo`](#deleterepo) | Delete a repository (requires delete_repo scope) | `{ok, status}` |
| [`listBranches`](#listbranches) | List branches in a repository | `Array of branch objects with name and commit info` |
| [`getBranch`](#getbranch) | Get details for a specific branch | `Branch object with name, commit, and protection status` |
| [`createBranch`](#createbranch) | Create a new branch from an existing branch ref | `Git reference object for the new branch` |
| [`listCommits`](#listcommits) | List commits in a repository | `Array of commit objects` |
| [`getCommit`](#getcommit) | Get a single commit by SHA | `Commit object with files, stats, and metadata` |
| [`listIssues`](#listissues) | List issues in a repository | `Array of issue objects` |
| [`createIssue`](#createissue) | Create a new issue in a repository | `Created issue object` |
| [`updateIssue`](#updateissue) | Update an existing issue | `Updated issue object` |
| [`closeIssue`](#closeissue) | Close an issue | `Updated issue object with state 'closed'` |
| [`addIssueComment`](#addissuecomment) | Add a comment to an issue or pull request | `Created comment object` |
| [`listIssueComments`](#listissuecomments) | List comments on an issue or pull request | `Array of comment objects` |
| [`listPullRequests`](#listpullrequests) | List pull requests in a repository | `Array of pull request objects` |
| [`createPullRequest`](#createpullrequest) | Create a new pull request | `Created pull request object` |
| [`mergePullRequest`](#mergepullrequest) | Merge a pull request | `Merge result with SHA and message` |
| [`listReleases`](#listreleases) | List releases in a repository | `Array of release objects` |
| [`createRelease`](#createrelease) | Create a new release from a tag | `Created release object` |
| [`listWorkflows`](#listworkflows) | List GitHub Actions workflows in a repository | `Workflows object with total_count and workflows array` |
| [`triggerWorkflow`](#triggerworkflow) | Trigger a GitHub Actions workflow dispatch event | `{ok, status}` |
| [`listWorkflowRuns`](#listworkflowruns) | List workflow runs for a repository or specific workflow | `Workflow runs object with total_count and workflow_runs array` |
| [`getUser`](#getuser) | Get a user profile or the authenticated user | `User profile object` |
| [`searchRepos`](#searchrepos) | Search GitHub repositories | `Search results with total_count and items array` |
| [`searchCode`](#searchcode) | Search code across GitHub repositories | `Search results with total_count and items array` |
| [`listLabels`](#listlabels) | List labels in a repository | `Array of label objects with name, color, and description` |
| [`createLabel`](#createlabel) | Create a new label in a repository | `Created label object` |
| [`addLabels`](#addlabels) | Add labels to an issue or pull request | `Array of label objects now on the issue` |
| [`listMilestones`](#listmilestones) | List milestones in a repository | `Array of milestone objects` |
| [`createMilestone`](#createmilestone) | Create a new milestone in a repository | `Created milestone object` |


## Functions

### setToken

Store a GitHub personal access token for authentication

**Module:** `github` | **Returns:** `object` -- {ok, message}

```robinpath
github.setToken "ghp_xxxxxxxxxxxx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | `string` | Yes | GitHub personal access token (ghp_... or fine-grained token) |

---

### getRepo

Get repository information

**Module:** `github` | **Returns:** `object` -- Repository object with name, description, stars, forks, etc.

```robinpath
github.getRepo "octocat" "Hello-World"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner (user or org) |
| `repo` | `string` | Yes | Repository name |

---

### listRepos

List repositories for a user or the authenticated user

**Module:** `github` | **Returns:** `array` -- Array of repository objects

```robinpath
github.listRepos "octocat"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | No | Username (omit for authenticated user) |
| `options` | `object` | No | {type?, sort?, direction?, perPage?, page?} |

---

### createRepo

Create a new repository for the authenticated user

**Module:** `github` | **Returns:** `object` -- Created repository object

```robinpath
github.createRepo "my-project" {"description": "A new project", "private": true, "autoInit": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Repository name |
| `options` | `object` | No | {description?, private?, autoInit?} |

---

### deleteRepo

Delete a repository (requires delete_repo scope)

**Module:** `github` | **Returns:** `object` -- {ok, status}

```robinpath
github.deleteRepo "myuser" "old-repo"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |

---

### listBranches

List branches in a repository

**Module:** `github` | **Returns:** `array` -- Array of branch objects with name and commit info

```robinpath
github.listBranches "octocat" "Hello-World"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |

---

### getBranch

Get details for a specific branch

**Module:** `github` | **Returns:** `object` -- Branch object with name, commit, and protection status

```robinpath
github.getBranch "octocat" "Hello-World" "main"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `branch` | `string` | Yes | Branch name |

---

### createBranch

Create a new branch from an existing branch ref

**Module:** `github` | **Returns:** `object` -- Git reference object for the new branch

```robinpath
github.createBranch "myuser" "my-repo" "feature-x" "main"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `branchName` | `string` | Yes | Name for the new branch |
| `fromBranch` | `string` | No | Source branch (default: main) |

---

### listCommits

List commits in a repository

**Module:** `github` | **Returns:** `array` -- Array of commit objects

```robinpath
github.listCommits "octocat" "Hello-World" {"sha": "main", "perPage": 5}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `options` | `object` | No | {sha?, path?, since?, until?, perPage?, page?} |

---

### getCommit

Get a single commit by SHA

**Module:** `github` | **Returns:** `object` -- Commit object with files, stats, and metadata

```robinpath
github.getCommit "octocat" "Hello-World" "abc1234"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `sha` | `string` | Yes | Commit SHA |

---

### listIssues

List issues in a repository

**Module:** `github` | **Returns:** `array` -- Array of issue objects

```robinpath
github.listIssues "octocat" "Hello-World" {"state": "open", "labels": "bug"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `options` | `object` | No | {state?, labels?, assignee?, sort?, direction?, perPage?, page?} |

---

### createIssue

Create a new issue in a repository

**Module:** `github` | **Returns:** `object` -- Created issue object

```robinpath
github.createIssue "myuser" "my-repo" "Bug report" {"body": "Steps to reproduce...", "labels": ["bug"]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `title` | `string` | Yes | Issue title |
| `options` | `object` | No | {body?, labels?, assignees?, milestone?} |

---

### updateIssue

Update an existing issue

**Module:** `github` | **Returns:** `object` -- Updated issue object

```robinpath
github.updateIssue "myuser" "my-repo" 42 {"title": "Updated title", "labels": ["bug", "priority"]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `issueNumber` | `number` | Yes | Issue number |
| `fields` | `object` | Yes | Fields to update: {title?, body?, state?, labels?, assignees?, milestone?} |

---

### closeIssue

Close an issue

**Module:** `github` | **Returns:** `object` -- Updated issue object with state 'closed'

```robinpath
github.closeIssue "myuser" "my-repo" 42
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `issueNumber` | `number` | Yes | Issue number |

---

### addIssueComment

Add a comment to an issue or pull request

**Module:** `github` | **Returns:** `object` -- Created comment object

```robinpath
github.addIssueComment "myuser" "my-repo" 42 "This is fixed in v2.0"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `issueNumber` | `number` | Yes | Issue or PR number |
| `body` | `string` | Yes | Comment body (Markdown supported) |

---

### listIssueComments

List comments on an issue or pull request

**Module:** `github` | **Returns:** `array` -- Array of comment objects

```robinpath
github.listIssueComments "octocat" "Hello-World" 1
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `issueNumber` | `number` | Yes | Issue or PR number |

---

### listPullRequests

List pull requests in a repository

**Module:** `github` | **Returns:** `array` -- Array of pull request objects

```robinpath
github.listPullRequests "octocat" "Hello-World" {"state": "open"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `options` | `object` | No | {state?, head?, base?, sort?, direction?, perPage?, page?} |

---

### createPullRequest

Create a new pull request

**Module:** `github` | **Returns:** `object` -- Created pull request object

```robinpath
github.createPullRequest "myuser" "my-repo" "Add feature X" "feature-x" "main" {"body": "Description here", "draft": false}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `title` | `string` | Yes | PR title |
| `head` | `string` | Yes | Branch containing changes |
| `base` | `string` | Yes | Branch to merge into |
| `options` | `object` | No | {body?, draft?} |

---

### mergePullRequest

Merge a pull request

**Module:** `github` | **Returns:** `object` -- Merge result with SHA and message

```robinpath
github.mergePullRequest "myuser" "my-repo" 10 {"method": "squash"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `prNumber` | `number` | Yes | Pull request number |
| `options` | `object` | No | {commitTitle?, commitMessage?, method?} method: merge|squash|rebase |

---

### listReleases

List releases in a repository

**Module:** `github` | **Returns:** `array` -- Array of release objects

```robinpath
github.listReleases "octocat" "Hello-World"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |

---

### createRelease

Create a new release from a tag

**Module:** `github` | **Returns:** `object` -- Created release object

```robinpath
github.createRelease "myuser" "my-repo" "v1.0.0" {"name": "Version 1.0", "body": "Release notes", "prerelease": false}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `tagName` | `string` | Yes | Tag name for the release (e.g. v1.0.0) |
| `options` | `object` | No | {name?, body?, draft?, prerelease?, targetCommitish?} |

---

### listWorkflows

List GitHub Actions workflows in a repository

**Module:** `github` | **Returns:** `object` -- Workflows object with total_count and workflows array

```robinpath
github.listWorkflows "myuser" "my-repo"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |

---

### triggerWorkflow

Trigger a GitHub Actions workflow dispatch event

**Module:** `github` | **Returns:** `object` -- {ok, status}

```robinpath
github.triggerWorkflow "myuser" "my-repo" "deploy.yml" "main" {"environment": "production"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `workflowId` | `string` | Yes | Workflow ID or filename (e.g. deploy.yml) |
| `ref` | `string` | Yes | Branch or tag ref to run on |
| `inputs` | `object` | No | Workflow input parameters |

---

### listWorkflowRuns

List workflow runs for a repository or specific workflow

**Module:** `github` | **Returns:** `object` -- Workflow runs object with total_count and workflow_runs array

```robinpath
github.listWorkflowRuns "myuser" "my-repo" "ci.yml" {"status": "completed"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `workflowId` | `string` | No | Workflow ID or filename (omit for all workflows) |
| `options` | `object` | No | {status?, branch?, event?, perPage?, page?} |

---

### getUser

Get a user profile or the authenticated user

**Module:** `github` | **Returns:** `object` -- User profile object

```robinpath
github.getUser "octocat"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | `string` | No | GitHub username (omit for authenticated user) |

---

### searchRepos

Search GitHub repositories

**Module:** `github` | **Returns:** `object` -- Search results with total_count and items array

```robinpath
github.searchRepos "language:typescript stars:>1000" {"sort": "stars"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | Yes | Search query (GitHub search syntax) |
| `options` | `object` | No | {sort?, order?, perPage?, page?} |

---

### searchCode

Search code across GitHub repositories

**Module:** `github` | **Returns:** `object` -- Search results with total_count and items array

```robinpath
github.searchCode "addClass repo:jquery/jquery" {"sort": "indexed"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | Yes | Search query (GitHub code search syntax) |
| `options` | `object` | No | {sort?, order?, perPage?, page?} |

---

### listLabels

List labels in a repository

**Module:** `github` | **Returns:** `array` -- Array of label objects with name, color, and description

```robinpath
github.listLabels "octocat" "Hello-World"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |

---

### createLabel

Create a new label in a repository

**Module:** `github` | **Returns:** `object` -- Created label object

```robinpath
github.createLabel "myuser" "my-repo" "priority:high" "ff0000" "High priority issues"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `name` | `string` | Yes | Label name |
| `color` | `string` | Yes | Label color hex (e.g. 'ff0000' or '#ff0000') |
| `description` | `string` | No | Label description |

---

### addLabels

Add labels to an issue or pull request

**Module:** `github` | **Returns:** `array` -- Array of label objects now on the issue

```robinpath
github.addLabels "myuser" "my-repo" 42 ["bug", "priority:high"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `issueNumber` | `number` | Yes | Issue or PR number |
| `labels` | `array` | Yes | Array of label names to add |

---

### listMilestones

List milestones in a repository

**Module:** `github` | **Returns:** `array` -- Array of milestone objects

```robinpath
github.listMilestones "octocat" "Hello-World"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |

---

### createMilestone

Create a new milestone in a repository

**Module:** `github` | **Returns:** `object` -- Created milestone object

```robinpath
github.createMilestone "myuser" "my-repo" "v2.0" {"description": "Version 2.0 release", "dueOn": "2025-06-01T00:00:00Z"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `owner` | `string` | Yes | Repository owner |
| `repo` | `string` | Yes | Repository name |
| `title` | `string` | Yes | Milestone title |
| `options` | `object` | No | {description?, state?, dueOn?} dueOn is ISO 8601 date |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `GitHub token not set. Call github.setToken first.` | Check the error message for details |
| `GitHub API ${method} ${path} failed (${response.status}): ${String(msg)}` | Check the error message for details |
| `Token is required` | Check the error message for details |
| `owner and repo are required` | Check the error message for details |
| `Repository name is required` | Check the error message for details |
| `owner, repo, and branch are required` | Check the error message for details |
| `owner, repo, and branchName are required` | Check the error message for details |
| `owner, repo, and sha are required` | Check the error message for details |

```robinpath
set $result as github.getRepo "octocat" "Hello-World"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Repo

Retrieve all items and loop through them.

```robinpath
github.setToken $token
set $result as github.getRepo "octocat" "Hello-World"
each $item in $result
  print $item
end
```

### 2. Create a new item with createRepo

Create a new resource and capture the result.

```robinpath
github.setToken $token
set $result as github.createRepo "my-project" {"description": "A new project", "private": true, "autoInit": true}
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
github.setToken $token
set $created as github.createRepo "my-project" {"description": "A new project", "private": true, "autoInit": true}
# Update the created item
github.updateIssue "myuser" "my-repo" 42 {"title": "Updated title", "labels": ["bug", "priority"]}
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
github.setToken $token
set $existing as github.getRepo "octocat" "Hello-World"
if $existing == null
  github.createRepo "my-project" {"description": "A new project", "private": true, "autoInit": true}
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step GitHub workflow

Chain multiple github operations together.

```robinpath
github.setToken $token
set $r_getRepo as github.getRepo "octocat" "Hello-World"
set $r_listRepos as github.listRepos "octocat"
set $r_createRepo as github.createRepo "my-project" {"description": "A new project", "private": true, "autoInit": true}
print "All operations complete"
```

### 6. Safe getRepo with validation

Check results before proceeding.

```robinpath
github.setToken $token
set $result as github.getRepo "octocat" "Hello-World"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **docker** -- Docker module for complementary functionality
- **git** -- Git module for complementary functionality
- **gitlab** -- GitLab module for complementary functionality
- **vercel** -- Vercel module for complementary functionality
- **netlify** -- Netlify module for complementary functionality
