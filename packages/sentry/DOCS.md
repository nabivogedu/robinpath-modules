---
title: "Sentry"
module: "sentry"
package: "@robinpath/sentry"
description: "Sentry module for RobinPath."
category: "devops"
tags: [sentry, devops]
type: "integration"
auth: "api-key"
functionCount: 19
baseUrl: "https://sentry.io"
---

# Sentry

> Sentry module for RobinPath.

**Package:** `@robinpath/sentry` | **Category:** Devops | **Type:** Integration


## Authentication

```robinpath
sentry.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `sentry` module when you need to:

- **listProjects** -- Use `sentry.listProjects` to perform this operation
- **getProject** -- Use `sentry.getProject` to perform this operation
- **listIssues** -- Use `sentry.listIssues` to perform this operation
- **getIssue** -- Use `sentry.getIssue` to perform this operation
- **updateIssue** -- Use `sentry.updateIssue` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure sentry credentials. | `object` |
| [`listProjects`](#listprojects) | listProjects | `object` |
| [`getProject`](#getproject) | getProject | `object` |
| [`listIssues`](#listissues) | listIssues | `object` |
| [`getIssue`](#getissue) | getIssue | `object` |
| [`updateIssue`](#updateissue) | updateIssue | `object` |
| [`deleteIssue`](#deleteissue) | deleteIssue | `object` |
| [`listIssueEvents`](#listissueevents) | listIssueEvents | `object` |
| [`getLatestEvent`](#getlatestevent) | getLatestEvent | `object` |
| [`listReleases`](#listreleases) | listReleases | `object` |
| [`createRelease`](#createrelease) | createRelease | `object` |
| [`listAlertRules`](#listalertrules) | listAlertRules | `object` |
| [`createAlertRule`](#createalertrule) | createAlertRule | `object` |
| [`resolveIssue`](#resolveissue) | resolveIssue | `object` |
| [`ignoreIssue`](#ignoreissue) | ignoreIssue | `object` |
| [`assignIssue`](#assignissue) | assignIssue | `object` |
| [`listTeams`](#listteams) | listTeams | `object` |
| [`getOrganization`](#getorganization) | getOrganization | `object` |
| [`listProjectKeys`](#listprojectkeys) | listProjectKeys | `object` |


## Functions

### setCredentials

Configure sentry credentials.

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `authToken` | `string` | Yes | authToken |

---

### listProjects

listProjects

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.listProjects
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getProject

getProject

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.getProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listIssues

listIssues

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.listIssues
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getIssue

getIssue

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.getIssue
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateIssue

updateIssue

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.updateIssue
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteIssue

deleteIssue

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.deleteIssue
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listIssueEvents

listIssueEvents

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.listIssueEvents
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getLatestEvent

getLatestEvent

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.getLatestEvent
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listReleases

listReleases

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.listReleases
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createRelease

createRelease

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.createRelease
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listAlertRules

listAlertRules

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.listAlertRules
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createAlertRule

createAlertRule

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.createAlertRule
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### resolveIssue

resolveIssue

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.resolveIssue
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### ignoreIssue

ignoreIssue

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.ignoreIssue
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### assignIssue

assignIssue

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.assignIssue
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTeams

listTeams

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.listTeams
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getOrganization

getOrganization

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.getOrganization
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listProjectKeys

listProjectKeys

**Module:** `sentry` | **Returns:** `object` -- API response.

```robinpath
sentry.listProjectKeys
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Sentry API error (${res.status}): ${t}` | Check the error message for details |
| `sentry.setCredentials requires authToken.` | Check the error message for details |
| `sentry.updateIssue requires an ID.` | Check the error message for details |
| `sentry.deleteIssue requires an ID.` | Check the error message for details |
| `sentry.resolveIssue requires an ID.` | Check the error message for details |
| `sentry.ignoreIssue requires an ID.` | Check the error message for details |
| `Sentry: "..." not configured. Call sentry.setCredentials first.` | Check the error message for details |

```robinpath
set $result as sentry.listProjects
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
sentry.setCredentials $token
set $result as sentry.listProjects
each $item in $result
  print $item
end
```

### 2. Create a new item with createRelease

Create a new resource and capture the result.

```robinpath
sentry.setCredentials $token
set $result as sentry.createRelease
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
sentry.setCredentials $token
set $created as sentry.createRelease
# Update the created item
sentry.updateIssue
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
sentry.setCredentials $token
set $existing as sentry.listProjects
if $existing == null
  sentry.createRelease
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Sentry workflow

Chain multiple sentry operations together.

```robinpath
sentry.setCredentials $token
set $r_listProjects as sentry.listProjects
set $r_getProject as sentry.getProject
set $r_listIssues as sentry.listIssues
print "All operations complete"
```

### 6. Safe listProjects with validation

Check results before proceeding.

```robinpath
sentry.setCredentials $token
set $result as sentry.listProjects
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
