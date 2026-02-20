---
title: "Git"
module: "git"
package: "@robinpath/git"
description: "Git version control operations using the system git binary"
category: "devops"
tags: [git, devops]
type: "integration"
auth: "none"
functionCount: 16
---

# Git

> Git version control operations using the system git binary

**Package:** `@robinpath/git` | **Category:** Devops | **Type:** Integration


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `git` module when you need to:

- **Clone a git repository** -- Use `git.clone` to perform this operation
- **Initialize a new git repository** -- Use `git.init` to perform this operation
- **Get the working tree status** -- Use `git.status` to perform this operation
- **Stage files for commit** -- Use `git.add` to perform this operation
- **Create a commit with the staged changes** -- Use `git.commit` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`clone`](#clone) | Clone a git repository | `object` |
| [`init`](#init) | Initialize a new git repository | `object` |
| [`status`](#status) | Get the working tree status | `object` |
| [`add`](#add) | Stage files for commit | `object` |
| [`commit`](#commit) | Create a commit with the staged changes | `object` |
| [`push`](#push) | Push commits to a remote repository | `object` |
| [`pull`](#pull) | Pull changes from a remote repository | `object` |
| [`branch`](#branch) | List, create, or delete branches | `object` |
| [`checkout`](#checkout) | Switch branches or restore working tree files | `object` |
| [`log`](#log) | Show the commit log | `object` |
| [`diff`](#diff) | Show changes between commits, working tree, etc. | `object` |
| [`tag`](#tag) | Create or list tags | `object` |
| [`remote`](#remote) | List remote repositories | `object` |
| [`merge`](#merge) | Merge a branch into the current branch | `object` |
| [`stash`](#stash) | Stash or restore uncommitted changes | `object` |
| [`reset`](#reset) | Reset the current HEAD to a specified state | `object` |


## Functions

### clone

Clone a git repository

**Module:** `git` | **Returns:** `object` -- API response.

```robinpath
git.clone
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Repository URL to clone |
| `dest` | `string` | No | Destination directory |
| `cwd` | `string` | No | Working directory |

---

### init

Initialize a new git repository

**Module:** `git` | **Returns:** `object` -- API response.

```robinpath
git.init
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cwd` | `string` | No | Directory to initialize |
| `bare` | `boolean` | No | Create a bare repository |

---

### status

Get the working tree status

**Module:** `git` | **Returns:** `object` -- API response.

```robinpath
git.status
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cwd` | `string` | No | Repository path |
| `short` | `boolean` | No | Show short status |

---

### add

Stage files for commit

**Module:** `git` | **Returns:** `object` -- API response.

```robinpath
git.add
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `files` | `string | string[]` | Yes | Files to stage (path or array of paths, use '.' for all) |
| `cwd` | `string` | No | Repository path |

---

### commit

Create a commit with the staged changes

**Module:** `git` | **Returns:** `object` -- API response.

```robinpath
git.commit
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message` | `string` | Yes | Commit message |
| `cwd` | `string` | No | Repository path |
| `amend` | `boolean` | No | Amend the previous commit |

---

### push

Push commits to a remote repository

**Module:** `git` | **Returns:** `object` -- API response.

```robinpath
git.push
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cwd` | `string` | No | Repository path |
| `remote` | `string` | No | Remote name (default: origin) |
| `branch` | `string` | No | Branch to push |
| `force` | `boolean` | No | Force push |

---

### pull

Pull changes from a remote repository

**Module:** `git` | **Returns:** `object` -- API response.

```robinpath
git.pull
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cwd` | `string` | No | Repository path |
| `remote` | `string` | No | Remote name (default: origin) |
| `branch` | `string` | No | Branch to pull |
| `rebase` | `boolean` | No | Rebase instead of merge |

---

### branch

List, create, or delete branches

**Module:** `git` | **Returns:** `object` -- API response.

```robinpath
git.branch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cwd` | `string` | No | Repository path |
| `name` | `string` | No | Branch name to create (omit to list) |
| `deleteBranch` | `boolean` | No | Delete the named branch |

---

### checkout

Switch branches or restore working tree files

**Module:** `git` | **Returns:** `object` -- API response.

```robinpath
git.checkout
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `target` | `string` | Yes | Branch or commit to checkout |
| `cwd` | `string` | No | Repository path |
| `create` | `boolean` | No | Create a new branch |

---

### log

Show the commit log

**Module:** `git` | **Returns:** `object` -- API response.

```robinpath
git.log
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cwd` | `string` | No | Repository path |
| `count` | `number` | No | Number of commits to show (default: 10) |
| `oneline` | `boolean` | No | One line per commit (default: true) |

---

### diff

Show changes between commits, working tree, etc.

**Module:** `git` | **Returns:** `object` -- API response.

```robinpath
git.diff
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cwd` | `string` | No | Repository path |
| `staged` | `boolean` | No | Show staged changes |
| `ref` | `string` | No | Reference to diff against |

---

### tag

Create or list tags

**Module:** `git` | **Returns:** `object` -- API response.

```robinpath
git.tag
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cwd` | `string` | No | Repository path |
| `name` | `string` | No | Tag name (omit to list) |
| `message` | `string` | No | Tag message (creates annotated tag) |

---

### remote

List remote repositories

**Module:** `git` | **Returns:** `object` -- API response.

```robinpath
git.remote
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cwd` | `string` | No | Repository path |
| `verbose` | `boolean` | No | Show URLs (default: true) |

---

### merge

Merge a branch into the current branch

**Module:** `git` | **Returns:** `object` -- API response.

```robinpath
git.merge
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `branch` | `string` | Yes | Branch to merge |
| `cwd` | `string` | No | Repository path |
| `noFf` | `boolean` | No | Create a merge commit even for fast-forward |

---

### stash

Stash or restore uncommitted changes

**Module:** `git` | **Returns:** `object` -- API response.

```robinpath
git.stash
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cwd` | `string` | No | Repository path |
| `action` | `string` | No | Action: push, pop, list, drop, apply (default: push) |
| `message` | `string` | No | Stash message (for push) |

---

### reset

Reset the current HEAD to a specified state

**Module:** `git` | **Returns:** `object` -- API response.

```robinpath
git.reset
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cwd` | `string` | No | Repository path |
| `ref` | `string` | No | Commit reference (default: HEAD) |
| `mode` | `string` | No | Reset mode: soft, mixed, hard (default: mixed) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as git.clone
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with add

Create a new resource and capture the result.

```robinpath
set $result as git.add
print "Created: " + $result
```

### 2. Multi-step Git workflow

Chain multiple git operations together.

```robinpath
set $r_clone as git.clone
set $r_init as git.init
set $r_status as git.status
print "All operations complete"
```

### 3. Safe clone with validation

Check results before proceeding.

```robinpath
set $result as git.clone
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **docker** -- Docker module for complementary functionality
- **github** -- GitHub module for complementary functionality
- **gitlab** -- GitLab module for complementary functionality
- **vercel** -- Vercel module for complementary functionality
- **netlify** -- Netlify module for complementary functionality
