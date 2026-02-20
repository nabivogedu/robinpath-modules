---
title: "ClickUp"
module: "clickup"
package: "@robinpath/clickup"
description: "ClickUp module for RobinPath."
category: "project-management"
tags: [clickup, project management]
type: "integration"
auth: "api-key"
functionCount: 23
baseUrl: "https://api.clickup.com"
---

# ClickUp

> ClickUp module for RobinPath.

**Package:** `@robinpath/clickup` | **Category:** Project Management | **Type:** Integration


## Authentication

```robinpath
clickup.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `clickup` module when you need to:

- **listWorkspaces** -- Use `clickup.listWorkspaces` to perform this operation
- **listSpaces** -- Use `clickup.listSpaces` to perform this operation
- **getSpace** -- Use `clickup.getSpace` to perform this operation
- **createSpace** -- Use `clickup.createSpace` to perform this operation
- **listFolders** -- Use `clickup.listFolders` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure clickup credentials. | `object` |
| [`listWorkspaces`](#listworkspaces) | listWorkspaces | `object` |
| [`listSpaces`](#listspaces) | listSpaces | `object` |
| [`getSpace`](#getspace) | getSpace | `object` |
| [`createSpace`](#createspace) | createSpace | `object` |
| [`listFolders`](#listfolders) | listFolders | `object` |
| [`createFolder`](#createfolder) | createFolder | `object` |
| [`listLists`](#listlists) | listLists | `object` |
| [`createList`](#createlist) | createList | `object` |
| [`listTasks`](#listtasks) | listTasks | `object` |
| [`getTask`](#gettask) | getTask | `object` |
| [`createTask`](#createtask) | createTask | `object` |
| [`updateTask`](#updatetask) | updateTask | `object` |
| [`deleteTask`](#deletetask) | deleteTask | `object` |
| [`addComment`](#addcomment) | addComment | `object` |
| [`listComments`](#listcomments) | listComments | `object` |
| [`listMembers`](#listmembers) | listMembers | `object` |
| [`getTimeEntries`](#gettimeentries) | getTimeEntries | `object` |
| [`createTimeEntry`](#createtimeentry) | createTimeEntry | `object` |
| [`listTags`](#listtags) | listTags | `object` |
| [`addTagToTask`](#addtagtotask) | addTagToTask | `object` |
| [`listGoals`](#listgoals) | listGoals | `object` |
| [`createGoal`](#creategoal) | createGoal | `object` |


## Functions

### setCredentials

Configure clickup credentials.

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiToken` | `string` | Yes | apiToken |

---

### listWorkspaces

listWorkspaces

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.listWorkspaces
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listSpaces

listSpaces

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.listSpaces
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSpace

getSpace

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.getSpace
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createSpace

createSpace

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.createSpace
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listFolders

listFolders

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.listFolders
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createFolder

createFolder

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.createFolder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listLists

listLists

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.listLists
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createList

createList

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.createList
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTasks

listTasks

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.listTasks
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTask

getTask

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.getTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createTask

createTask

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.createTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateTask

updateTask

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.updateTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteTask

deleteTask

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.deleteTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addComment

addComment

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.addComment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listComments

listComments

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.listComments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listMembers

listMembers

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.listMembers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTimeEntries

getTimeEntries

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.getTimeEntries
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createTimeEntry

createTimeEntry

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.createTimeEntry
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTags

listTags

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.listTags
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addTagToTask

addTagToTask

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.addTagToTask
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listGoals

listGoals

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.listGoals
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createGoal

createGoal

**Module:** `clickup` | **Returns:** `object` -- API response.

```robinpath
clickup.createGoal
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Clickup API error (${res.status}): ${t}` | Check the error message for details |
| `clickup.setCredentials requires apiToken.` | Check the error message for details |
| `clickup.updateTask requires an ID.` | Check the error message for details |
| `clickup.deleteTask requires an ID.` | Check the error message for details |
| `Clickup: "..." not configured. Call clickup.setCredentials first.` | Check the error message for details |

```robinpath
set $result as clickup.listWorkspaces
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
clickup.setCredentials $token
set $result as clickup.listWorkspaces
each $item in $result
  print $item
end
```

### 2. Create a new item with createSpace

Create a new resource and capture the result.

```robinpath
clickup.setCredentials $token
set $result as clickup.createSpace
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
clickup.setCredentials $token
set $created as clickup.createSpace
# Update the created item
clickup.updateTask
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
clickup.setCredentials $token
set $existing as clickup.listWorkspaces
if $existing == null
  clickup.createSpace
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step ClickUp workflow

Chain multiple clickup operations together.

```robinpath
clickup.setCredentials $token
set $r_listWorkspaces as clickup.listWorkspaces
set $r_listSpaces as clickup.listSpaces
set $r_getSpace as clickup.getSpace
print "All operations complete"
```

### 6. Safe listWorkspaces with validation

Check results before proceeding.

```robinpath
clickup.setCredentials $token
set $result as clickup.listWorkspaces
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **asana** -- Asana module for complementary functionality
- **jira** -- Jira module for complementary functionality
- **linear** -- Linear module for complementary functionality
- **monday** -- Monday.com module for complementary functionality
- **todoist** -- Todoist module for complementary functionality
