---
title: "Monday.com"
module: "monday"
package: "@robinpath/monday"
description: "Monday.com module for RobinPath."
category: "project-management"
tags: [monday, project management]
type: "integration"
auth: "api-key"
functionCount: 19
baseUrl: "https://api.monday.com"
---

# Monday.com

> Monday.com module for RobinPath.

**Package:** `@robinpath/monday` | **Category:** Project Management | **Type:** Integration


## Authentication

```robinpath
monday.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `monday` module when you need to:

- **listBoards** -- Use `monday.listBoards` to perform this operation
- **getBoard** -- Use `monday.getBoard` to perform this operation
- **createBoard** -- Use `monday.createBoard` to perform this operation
- **listItems** -- Use `monday.listItems` to perform this operation
- **getItem** -- Use `monday.getItem` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure monday credentials. | `object` |
| [`listBoards`](#listboards) | listBoards | `object` |
| [`getBoard`](#getboard) | getBoard | `object` |
| [`createBoard`](#createboard) | createBoard | `object` |
| [`listItems`](#listitems) | listItems | `object` |
| [`getItem`](#getitem) | getItem | `object` |
| [`createItem`](#createitem) | createItem | `object` |
| [`updateItem`](#updateitem) | updateItem | `object` |
| [`deleteItem`](#deleteitem) | deleteItem | `object` |
| [`listGroups`](#listgroups) | listGroups | `object` |
| [`createGroup`](#creategroup) | createGroup | `object` |
| [`listColumns`](#listcolumns) | listColumns | `object` |
| [`createColumn`](#createcolumn) | createColumn | `object` |
| [`addUpdate`](#addupdate) | addUpdate | `object` |
| [`listUpdates`](#listupdates) | listUpdates | `object` |
| [`listWorkspaces`](#listworkspaces) | listWorkspaces | `object` |
| [`createSubitem`](#createsubitem) | createSubitem | `object` |
| [`moveItemToGroup`](#moveitemtogroup) | moveItemToGroup | `object` |
| [`archiveItem`](#archiveitem) | archiveItem | `object` |


## Functions

### setCredentials

Configure monday credentials.

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiToken` | `string` | Yes | apiToken |

---

### listBoards

listBoards

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.listBoards
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getBoard

getBoard

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.getBoard
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createBoard

createBoard

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.createBoard
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listItems

listItems

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.listItems
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getItem

getItem

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.getItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createItem

createItem

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.createItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateItem

updateItem

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.updateItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteItem

deleteItem

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.deleteItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listGroups

listGroups

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.listGroups
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createGroup

createGroup

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.createGroup
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listColumns

listColumns

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.listColumns
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createColumn

createColumn

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.createColumn
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addUpdate

addUpdate

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.addUpdate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listUpdates

listUpdates

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.listUpdates
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listWorkspaces

listWorkspaces

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.listWorkspaces
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createSubitem

createSubitem

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.createSubitem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### moveItemToGroup

moveItemToGroup

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.moveItemToGroup
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### archiveItem

archiveItem

**Module:** `monday` | **Returns:** `object` -- API response.

```robinpath
monday.archiveItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Monday API error (${res.status}): ${t}` | Check the error message for details |
| `monday.setCredentials requires apiToken.` | Check the error message for details |
| `monday.updateItem requires an ID.` | Check the error message for details |
| `monday.deleteItem requires an ID.` | Check the error message for details |
| `monday.moveItemToGroup requires an ID.` | Check the error message for details |
| `monday.archiveItem requires an ID.` | Check the error message for details |
| `Monday: "..." not configured. Call monday.setCredentials first.` | Check the error message for details |

```robinpath
set $result as monday.listBoards
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Boards

Retrieve all items and loop through them.

```robinpath
monday.setCredentials $token
set $result as monday.listBoards
each $item in $result
  print $item
end
```

### 2. Create a new item with createBoard

Create a new resource and capture the result.

```robinpath
monday.setCredentials $token
set $result as monday.createBoard
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
monday.setCredentials $token
set $created as monday.createBoard
# Update the created item
monday.updateItem
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
monday.setCredentials $token
set $existing as monday.listBoards
if $existing == null
  monday.createBoard
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Monday.com workflow

Chain multiple monday operations together.

```robinpath
monday.setCredentials $token
set $r_listBoards as monday.listBoards
set $r_getBoard as monday.getBoard
set $r_createBoard as monday.createBoard
print "All operations complete"
```

### 6. Safe listBoards with validation

Check results before proceeding.

```robinpath
monday.setCredentials $token
set $result as monday.listBoards
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
- **todoist** -- Todoist module for complementary functionality
