---
title: "Basecamp"
module: "basecamp"
package: "@robinpath/basecamp"
description: "Basecamp module for RobinPath."
category: "project-management"
tags: [basecamp, project management]
type: "integration"
auth: "api-key"
functionCount: 19
baseUrl: "https://3.basecampapi.com"
---

# Basecamp

> Basecamp module for RobinPath.

**Package:** `@robinpath/basecamp` | **Category:** Project Management | **Type:** Integration


## Authentication

```robinpath
basecamp.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `basecamp` module when you need to:

- **listProjects** -- Use `basecamp.listProjects` to perform this operation
- **getProject** -- Use `basecamp.getProject` to perform this operation
- **createProject** -- Use `basecamp.createProject` to perform this operation
- **updateProject** -- Use `basecamp.updateProject` to perform this operation
- **listTodoLists** -- Use `basecamp.listTodoLists` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure basecamp credentials. | `object` |
| [`listProjects`](#listprojects) | listProjects | `object` |
| [`getProject`](#getproject) | getProject | `object` |
| [`createProject`](#createproject) | createProject | `object` |
| [`updateProject`](#updateproject) | updateProject | `object` |
| [`listTodoLists`](#listtodolists) | listTodoLists | `object` |
| [`createTodoList`](#createtodolist) | createTodoList | `object` |
| [`listTodos`](#listtodos) | listTodos | `object` |
| [`createTodo`](#createtodo) | createTodo | `object` |
| [`updateTodo`](#updatetodo) | updateTodo | `object` |
| [`completeTodo`](#completetodo) | completeTodo | `object` |
| [`listMessages`](#listmessages) | listMessages | `object` |
| [`createMessage`](#createmessage) | createMessage | `object` |
| [`listCampfireMessages`](#listcampfiremessages) | listCampfireMessages | `object` |
| [`sendCampfireMessage`](#sendcampfiremessage) | sendCampfireMessage | `object` |
| [`listPeople`](#listpeople) | listPeople | `object` |
| [`getPerson`](#getperson) | getPerson | `object` |
| [`listComments`](#listcomments) | listComments | `object` |
| [`createComment`](#createcomment) | createComment | `object` |


## Functions

### setCredentials

Configure basecamp credentials.

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | accountId |
| `accessToken` | `string` | Yes | accessToken |

---

### listProjects

listProjects

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.listProjects
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getProject

getProject

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.getProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createProject

createProject

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.createProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateProject

updateProject

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.updateProject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTodoLists

listTodoLists

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.listTodoLists
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createTodoList

createTodoList

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.createTodoList
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTodos

listTodos

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.listTodos
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createTodo

createTodo

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.createTodo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateTodo

updateTodo

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.updateTodo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### completeTodo

completeTodo

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.completeTodo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listMessages

listMessages

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.listMessages
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createMessage

createMessage

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.createMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCampfireMessages

listCampfireMessages

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.listCampfireMessages
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendCampfireMessage

sendCampfireMessage

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.sendCampfireMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPeople

listPeople

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.listPeople
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPerson

getPerson

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.getPerson
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listComments

listComments

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.listComments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createComment

createComment

**Module:** `basecamp` | **Returns:** `object` -- API response.

```robinpath
basecamp.createComment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Basecamp API error (${res.status}): ${t}` | Check the error message for details |
| `basecamp.setCredentials requires accountId, accessToken.` | Check the error message for details |
| `basecamp.updateProject requires an ID.` | Check the error message for details |
| `basecamp.updateTodo requires an ID.` | Check the error message for details |
| `basecamp.completeTodo requires an ID.` | Check the error message for details |
| `Basecamp: "..." not configured. Call basecamp.setCredentials first.` | Check the error message for details |

```robinpath
set $result as basecamp.listProjects
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
basecamp.setCredentials $token
set $result as basecamp.listProjects
each $item in $result
  print $item
end
```

### 2. Create a new item with createProject

Create a new resource and capture the result.

```robinpath
basecamp.setCredentials $token
set $result as basecamp.createProject
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
basecamp.setCredentials $token
set $created as basecamp.createProject
# Update the created item
basecamp.updateProject
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
basecamp.setCredentials $token
set $existing as basecamp.listProjects
if $existing == null
  basecamp.createProject
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Basecamp workflow

Chain multiple basecamp operations together.

```robinpath
basecamp.setCredentials $token
set $r_listProjects as basecamp.listProjects
set $r_getProject as basecamp.getProject
set $r_createProject as basecamp.createProject
print "All operations complete"
```

### 6. Safe listProjects with validation

Check results before proceeding.

```robinpath
basecamp.setCredentials $token
set $result as basecamp.listProjects
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
