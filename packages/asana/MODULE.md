---
title: "Asana"
module: "asana"
package: "@robinpath/asana"
description: "Asana module for RobinPath."
category: "project-management"
tags: [asana, project management]
type: "integration"
auth: "api-key"
functionCount: 23
baseUrl: "https://app.asana.com"
---

# Asana

> Asana module for RobinPath.

**Package:** `@robinpath/asana` | **Category:** Project Management | **Type:** Integration


## Authentication

```robinpath
asana.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `asana` module when you need to:

- **listWorkspaces** -- Use `asana.listWorkspaces` to perform this operation
- **listProjects** -- Use `asana.listProjects` to perform this operation
- **getProject** -- Use `asana.getProject` to perform this operation
- **createProject** -- Use `asana.createProject` to perform this operation
- **updateProject** -- Use `asana.updateProject` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure asana credentials. | `object` |
| [`listWorkspaces`](#listworkspaces) | listWorkspaces | `object` |
| [`listProjects`](#listprojects) | listProjects | `object` |
| [`getProject`](#getproject) | getProject | `object` |
| [`createProject`](#createproject) | createProject | `object` |
| [`updateProject`](#updateproject) | updateProject | `object` |
| [`deleteProject`](#deleteproject) | deleteProject | `object` |
| [`listTasks`](#listtasks) | listTasks | `object` |
| [`getTask`](#gettask) | getTask | `object` |
| [`createTask`](#createtask) | createTask | `object` |
| [`updateTask`](#updatetask) | updateTask | `object` |
| [`deleteTask`](#deletetask) | deleteTask | `object` |
| [`addComment`](#addcomment) | addComment | `object` |
| [`listSections`](#listsections) | listSections | `object` |
| [`createSection`](#createsection) | createSection | `object` |
| [`addTaskToSection`](#addtasktosection) | addTaskToSection | `object` |
| [`listTags`](#listtags) | listTags | `object` |
| [`createTag`](#createtag) | createTag | `object` |
| [`addTagToTask`](#addtagtotask) | addTagToTask | `object` |
| [`getUser`](#getuser) | getUser | `object` |
| [`listTeams`](#listteams) | listTeams | `object` |
| [`searchTasks`](#searchtasks) | searchTasks | `object` |
| [`listSubtasks`](#listsubtasks) | listSubtasks | `object` |


## Functions

### setCredentials

Configure asana credentials.

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### listWorkspaces

listWorkspaces

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.listWorkspaces
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listProjects

listProjects

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.listProjects
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getProject

getProject

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.getProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createProject

createProject

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.createProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateProject

updateProject

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.updateProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteProject

deleteProject

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.deleteProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTasks

listTasks

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.listTasks
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTask

getTask

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.getTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createTask

createTask

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.createTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateTask

updateTask

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.updateTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteTask

deleteTask

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.deleteTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addComment

addComment

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.addComment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listSections

listSections

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.listSections
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createSection

createSection

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.createSection
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addTaskToSection

addTaskToSection

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.addTaskToSection
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTags

listTags

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.listTags
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createTag

createTag

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.createTag
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addTagToTask

addTagToTask

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.addTagToTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUser

getUser

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.getUser
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTeams

listTeams

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.listTeams
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchTasks

searchTasks

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.searchTasks
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listSubtasks

listSubtasks

**Module:** `asana` | **Returns:** `object` -- API response.

```robinpath
asana.listSubtasks
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Asana API error (${res.status}): ${t}` | Check the error message for details |
| `asana.setCredentials requires accessToken.` | Check the error message for details |
| `asana.updateProject requires an ID.` | Check the error message for details |
| `asana.deleteProject requires an ID.` | Check the error message for details |
| `asana.updateTask requires an ID.` | Check the error message for details |
| `asana.deleteTask requires an ID.` | Check the error message for details |
| `Asana: "..." not configured. Call asana.setCredentials first.` | Check the error message for details |

```robinpath
set $result as asana.listWorkspaces
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Workspaces

Retrieve all items and loop through them.

```robinpath
asana.setCredentials $token
set $result as asana.listWorkspaces
each $item in $result
  print $item
end
```

### 2. Create a new item with createProject

Create a new resource and capture the result.

```robinpath
asana.setCredentials $token
set $result as asana.createProject
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
asana.setCredentials $token
set $created as asana.createProject
# Update the created item
asana.updateProject
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
asana.setCredentials $token
set $existing as asana.listWorkspaces
if $existing == null
  asana.createProject
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Asana workflow

Chain multiple asana operations together.

```robinpath
asana.setCredentials $token
set $r_listWorkspaces as asana.listWorkspaces
set $r_listProjects as asana.listProjects
set $r_getProject as asana.getProject
print "All operations complete"
```

### 6. Safe listWorkspaces with validation

Check results before proceeding.

```robinpath
asana.setCredentials $token
set $result as asana.listWorkspaces
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **clickup** -- ClickUp module for complementary functionality
- **jira** -- Jira module for complementary functionality
- **linear** -- Linear module for complementary functionality
- **monday** -- Monday.com module for complementary functionality
- **todoist** -- Todoist module for complementary functionality
