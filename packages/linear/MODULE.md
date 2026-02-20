---
title: "Linear"
module: "linear"
package: "@robinpath/linear"
description: "Linear module for RobinPath."
category: "project-management"
tags: [linear, project management]
type: "integration"
auth: "api-key"
functionCount: 21
baseUrl: "https://api.linear.app"
---

# Linear

> Linear module for RobinPath.

**Package:** `@robinpath/linear` | **Category:** Project Management | **Type:** Integration


## Authentication

```robinpath
linear.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `linear` module when you need to:

- **listIssues** -- Use `linear.listIssues` to perform this operation
- **getIssue** -- Use `linear.getIssue` to perform this operation
- **createIssue** -- Use `linear.createIssue` to perform this operation
- **updateIssue** -- Use `linear.updateIssue` to perform this operation
- **deleteIssue** -- Use `linear.deleteIssue` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure linear credentials. | `object` |
| [`listIssues`](#listissues) | listIssues | `object` |
| [`getIssue`](#getissue) | getIssue | `object` |
| [`createIssue`](#createissue) | createIssue | `object` |
| [`updateIssue`](#updateissue) | updateIssue | `object` |
| [`deleteIssue`](#deleteissue) | deleteIssue | `object` |
| [`listProjects`](#listprojects) | listProjects | `object` |
| [`getProject`](#getproject) | getProject | `object` |
| [`createProject`](#createproject) | createProject | `object` |
| [`updateProject`](#updateproject) | updateProject | `object` |
| [`listTeams`](#listteams) | listTeams | `object` |
| [`getTeam`](#getteam) | getTeam | `object` |
| [`listCycles`](#listcycles) | listCycles | `object` |
| [`getCycle`](#getcycle) | getCycle | `object` |
| [`addIssueToCycle`](#addissuetocycle) | addIssueToCycle | `object` |
| [`listLabels`](#listlabels) | listLabels | `object` |
| [`createLabel`](#createlabel) | createLabel | `object` |
| [`listComments`](#listcomments) | listComments | `object` |
| [`createComment`](#createcomment) | createComment | `object` |
| [`searchIssues`](#searchissues) | searchIssues | `object` |
| [`listUsers`](#listusers) | listUsers | `object` |


## Functions

### setCredentials

Configure linear credentials.

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | Yes | apiKey |

---

### listIssues

listIssues

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.listIssues
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getIssue

getIssue

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.getIssue
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createIssue

createIssue

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.createIssue
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateIssue

updateIssue

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.updateIssue
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteIssue

deleteIssue

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.deleteIssue
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listProjects

listProjects

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.listProjects
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getProject

getProject

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.getProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createProject

createProject

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.createProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateProject

updateProject

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.updateProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTeams

listTeams

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.listTeams
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTeam

getTeam

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.getTeam
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCycles

listCycles

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.listCycles
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCycle

getCycle

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.getCycle
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addIssueToCycle

addIssueToCycle

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.addIssueToCycle
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listLabels

listLabels

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.listLabels
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createLabel

createLabel

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.createLabel
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listComments

listComments

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.listComments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createComment

createComment

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.createComment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchIssues

searchIssues

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.searchIssues
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listUsers

listUsers

**Module:** `linear` | **Returns:** `object` -- API response.

```robinpath
linear.listUsers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Linear API error (${res.status}): ${t}` | Check the error message for details |
| `linear.setCredentials requires apiKey.` | Check the error message for details |
| `linear.updateIssue requires an ID.` | Check the error message for details |
| `linear.deleteIssue requires an ID.` | Check the error message for details |
| `linear.updateProject requires an ID.` | Check the error message for details |
| `Linear: "..." not configured. Call linear.setCredentials first.` | Check the error message for details |

```robinpath
set $result as linear.listIssues
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Issues

Retrieve all items and loop through them.

```robinpath
linear.setCredentials $token
set $result as linear.listIssues
each $item in $result
  print $item
end
```

### 2. Create a new item with createIssue

Create a new resource and capture the result.

```robinpath
linear.setCredentials $token
set $result as linear.createIssue
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
linear.setCredentials $token
set $created as linear.createIssue
# Update the created item
linear.updateIssue
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
linear.setCredentials $token
set $existing as linear.listIssues
if $existing == null
  linear.createIssue
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Linear workflow

Chain multiple linear operations together.

```robinpath
linear.setCredentials $token
set $r_listIssues as linear.listIssues
set $r_getIssue as linear.getIssue
set $r_createIssue as linear.createIssue
print "All operations complete"
```

### 6. Safe listIssues with validation

Check results before proceeding.

```robinpath
linear.setCredentials $token
set $result as linear.listIssues
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **asana** -- Asana module for complementary functionality
- **clickup** -- ClickUp module for complementary functionality
- **jira** -- Jira module for complementary functionality
- **monday** -- Monday.com module for complementary functionality
- **todoist** -- Todoist module for complementary functionality
