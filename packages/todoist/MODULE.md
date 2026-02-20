---
title: "Todoist"
module: "todoist"
package: "@robinpath/todoist"
description: "Todoist module for RobinPath."
category: "project-management"
tags: [todoist, project management]
type: "integration"
auth: "api-key"
functionCount: 18
baseUrl: "https://api.todoist.com"
---

# Todoist

> Todoist module for RobinPath.

**Package:** `@robinpath/todoist` | **Category:** Project Management | **Type:** Integration


## Authentication

```robinpath
todoist.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `todoist` module when you need to:

- **listProjects** -- Use `todoist.listProjects` to perform this operation
- **getProject** -- Use `todoist.getProject` to perform this operation
- **createProject** -- Use `todoist.createProject` to perform this operation
- **updateProject** -- Use `todoist.updateProject` to perform this operation
- **deleteProject** -- Use `todoist.deleteProject` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure todoist credentials. | `object` |
| [`listProjects`](#listprojects) | listProjects | `object` |
| [`getProject`](#getproject) | getProject | `object` |
| [`createProject`](#createproject) | createProject | `object` |
| [`updateProject`](#updateproject) | updateProject | `object` |
| [`deleteProject`](#deleteproject) | deleteProject | `object` |
| [`listTasks`](#listtasks) | listTasks | `object` |
| [`getTask`](#gettask) | getTask | `object` |
| [`createTask`](#createtask) | createTask | `object` |
| [`updateTask`](#updatetask) | updateTask | `object` |
| [`closeTask`](#closetask) | closeTask | `object` |
| [`reopenTask`](#reopentask) | reopenTask | `object` |
| [`deleteTask`](#deletetask) | deleteTask | `object` |
| [`listLabels`](#listlabels) | listLabels | `object` |
| [`createLabel`](#createlabel) | createLabel | `object` |
| [`listComments`](#listcomments) | listComments | `object` |
| [`createComment`](#createcomment) | createComment | `object` |
| [`deleteComment`](#deletecomment) | deleteComment | `object` |


## Functions

### setCredentials

Configure todoist credentials.

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiToken` | `string` | Yes | apiToken |

---

### listProjects

listProjects

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.listProjects
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getProject

getProject

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.getProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createProject

createProject

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.createProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateProject

updateProject

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.updateProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteProject

deleteProject

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.deleteProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTasks

listTasks

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.listTasks
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTask

getTask

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.getTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createTask

createTask

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.createTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateTask

updateTask

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.updateTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### closeTask

closeTask

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.closeTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### reopenTask

reopenTask

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.reopenTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteTask

deleteTask

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.deleteTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listLabels

listLabels

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.listLabels
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createLabel

createLabel

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.createLabel
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listComments

listComments

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.listComments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createComment

createComment

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.createComment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteComment

deleteComment

**Module:** `todoist` | **Returns:** `object` -- API response.

```robinpath
todoist.deleteComment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Todoist API error (${res.status}): ${t}` | Check the error message for details |
| `todoist.setCredentials requires apiToken.` | Check the error message for details |
| `todoist.updateProject requires an ID.` | Check the error message for details |
| `todoist.deleteProject requires an ID.` | Check the error message for details |
| `todoist.updateTask requires an ID.` | Check the error message for details |
| `todoist.closeTask requires an ID.` | Check the error message for details |
| `todoist.reopenTask requires an ID.` | Check the error message for details |
| `todoist.deleteTask requires an ID.` | Check the error message for details |

```robinpath
set $result as todoist.listProjects
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
todoist.setCredentials $token
set $result as todoist.listProjects
each $item in $result
  print $item
end
```

### 2. Create a new item with createProject

Create a new resource and capture the result.

```robinpath
todoist.setCredentials $token
set $result as todoist.createProject
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
todoist.setCredentials $token
set $created as todoist.createProject
# Update the created item
todoist.updateProject
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
todoist.setCredentials $token
set $existing as todoist.listProjects
if $existing == null
  todoist.createProject
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Todoist workflow

Chain multiple todoist operations together.

```robinpath
todoist.setCredentials $token
set $r_listProjects as todoist.listProjects
set $r_getProject as todoist.getProject
set $r_createProject as todoist.createProject
print "All operations complete"
```

### 6. Safe listProjects with validation

Check results before proceeding.

```robinpath
todoist.setCredentials $token
set $result as todoist.listProjects
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
- **linear** -- Linear module for complementary functionality
- **monday** -- Monday.com module for complementary functionality
