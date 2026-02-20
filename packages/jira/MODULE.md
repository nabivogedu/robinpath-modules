---
title: "Jira"
module: "jira"
package: "@robinpath/jira"
description: "Jira module for RobinPath."
category: "project-management"
tags: [jira, project management]
type: "integration"
auth: "api-key"
functionCount: 25
---

# Jira

> Jira module for RobinPath.

**Package:** `@robinpath/jira` | **Category:** Project Management | **Type:** Integration


## Authentication

```robinpath
jira.setCredentials "mycompany.atlassian.net" "user@example.com" "your-api-token"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `jira` module when you need to:

- **Create a new Jira issue.** -- Use `jira.createIssue` to perform this operation
- **Get a Jira issue by key.** -- Use `jira.getIssue` to perform this operation
- **Update fields on a Jira issue.** -- Use `jira.updateIssue` to perform this operation
- **Delete a Jira issue.** -- Use `jira.deleteIssue` to perform this operation
- **Assign a Jira issue to a user.** -- Use `jira.assignIssue` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Set Jira Cloud credentials for API access. | `Confirmation message.` |
| [`createIssue`](#createissue) | Create a new Jira issue. | `Created issue response with key and id.` |
| [`getIssue`](#getissue) | Get a Jira issue by key. | `Issue details.` |
| [`updateIssue`](#updateissue) | Update fields on a Jira issue. | `Update response.` |
| [`deleteIssue`](#deleteissue) | Delete a Jira issue. | `Deletion confirmation.` |
| [`assignIssue`](#assignissue) | Assign a Jira issue to a user. | `Assignment response.` |
| [`transitionIssue`](#transitionissue) | Transition a Jira issue to a new status. | `Transition response.` |
| [`addComment`](#addcomment) | Add a comment to a Jira issue. | `Created comment.` |
| [`getComments`](#getcomments) | List comments on a Jira issue. | `Comments list.` |
| [`searchIssues`](#searchissues) | Search Jira issues using JQL. | `Search results with issues array.` |
| [`listProjects`](#listprojects) | List all accessible Jira projects. | `Array of project objects.` |
| [`getProject`](#getproject) | Get details of a Jira project. | `Project details.` |
| [`listBoards`](#listboards) | List Jira agile boards. | `Board list with pagination.` |
| [`getBoardSprints`](#getboardsprints) | Get sprints for a Jira board. | `Sprint list with pagination.` |
| [`getSprintIssues`](#getsprintissues) | Get issues in a sprint. | `Issues in the sprint.` |
| [`addLabel`](#addlabel) | Add a label to a Jira issue. | `Update response.` |
| [`removeLabel`](#removelabel) | Remove a label from a Jira issue. | `Update response.` |
| [`getTransitions`](#gettransitions) | Get available status transitions for a Jira issue. | `Available transitions.` |
| [`addAttachment`](#addattachment) | Add a file attachment to a Jira issue. | `Attachment details.` |
| [`listUsers`](#listusers) | Search for Jira users. | `Array of user objects.` |
| [`getUser`](#getuser) | Get a Jira user by account ID. | `User details.` |
| [`addWatcher`](#addwatcher) | Add a watcher to a Jira issue. | `Confirmation message.` |
| [`removeWatcher`](#removewatcher) | Remove a watcher from a Jira issue. | `Removal confirmation.` |
| [`listPriorities`](#listpriorities) | List all available Jira priorities. | `Array of priority objects.` |
| [`listIssueTypes`](#listissuetypes) | List available issue types, optionally filtered by project. | `Array of issue type objects.` |


## Functions

### setCredentials

Set Jira Cloud credentials for API access.

**Module:** `jira` | **Returns:** `string` -- Confirmation message.

```robinpath
jira.setCredentials "mycompany.atlassian.net" "user@example.com" "your-api-token"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | `string` | Yes | Jira cloud domain (e.g. mycompany.atlassian.net) |
| `email` | `string` | Yes | Atlassian account email |
| `apiToken` | `string` | Yes | Atlassian API token |

---

### createIssue

Create a new Jira issue.

**Module:** `jira` | **Returns:** `object` -- Created issue response with key and id.

```robinpath
jira.createIssue "PROJ" "Task" "Fix login bug" {"description":"Login page returns 500","priority":"High"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectKey` | `string` | Yes | Project key (e.g. PROJ) |
| `issueType` | `string` | Yes | Issue type name (e.g. Task, Bug, Story) |
| `summary` | `string` | Yes | Issue summary/title |
| `options` | `object` | No | Optional fields: description, priority, labels, assignee, components |

---

### getIssue

Get a Jira issue by key.

**Module:** `jira` | **Returns:** `object` -- Issue details.

```robinpath
jira.getIssue "PROJ-123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueKey` | `string` | Yes | Issue key (e.g. PROJ-123) |

---

### updateIssue

Update fields on a Jira issue.

**Module:** `jira` | **Returns:** `object` -- Update response.

```robinpath
jira.updateIssue "PROJ-123" {"summary":"Updated summary","priority":{"name":"High"}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueKey` | `string` | Yes | Issue key (e.g. PROJ-123) |
| `fields` | `object` | Yes | Fields to update |

---

### deleteIssue

Delete a Jira issue.

**Module:** `jira` | **Returns:** `string` -- Deletion confirmation.

```robinpath
jira.deleteIssue "PROJ-123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueKey` | `string` | Yes | Issue key (e.g. PROJ-123) |

---

### assignIssue

Assign a Jira issue to a user.

**Module:** `jira` | **Returns:** `object` -- Assignment response.

```robinpath
jira.assignIssue "PROJ-123" "5b10ac8d82e05b22cc7d4ef5"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueKey` | `string` | Yes | Issue key (e.g. PROJ-123) |
| `accountId` | `string` | Yes | Atlassian account ID of the assignee |

---

### transitionIssue

Transition a Jira issue to a new status.

**Module:** `jira` | **Returns:** `object` -- Transition response.

```robinpath
jira.transitionIssue "PROJ-123" "31"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueKey` | `string` | Yes | Issue key (e.g. PROJ-123) |
| `transitionId` | `string` | Yes | Transition ID (use getTransitions to find available IDs) |
| `options` | `object` | No | Optional: fields, update |

---

### addComment

Add a comment to a Jira issue.

**Module:** `jira` | **Returns:** `object` -- Created comment.

```robinpath
jira.addComment "PROJ-123" "This issue needs further investigation."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueKey` | `string` | Yes | Issue key (e.g. PROJ-123) |
| `body` | `string` | Yes | Comment text |

---

### getComments

List comments on a Jira issue.

**Module:** `jira` | **Returns:** `object` -- Comments list.

```robinpath
jira.getComments "PROJ-123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueKey` | `string` | Yes | Issue key (e.g. PROJ-123) |

---

### searchIssues

Search Jira issues using JQL.

**Module:** `jira` | **Returns:** `object` -- Search results with issues array.

```robinpath
jira.searchIssues "project = PROJ AND status = Open" {"maxResults":10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `jql` | `string` | Yes | JQL query string |
| `options` | `object` | No | Options: maxResults, startAt, fields |

---

### listProjects

List all accessible Jira projects.

**Module:** `jira` | **Returns:** `array` -- Array of project objects.

```robinpath
jira.listProjects
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### getProject

Get details of a Jira project.

**Module:** `jira` | **Returns:** `object` -- Project details.

```robinpath
jira.getProject "PROJ"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectKey` | `string` | Yes | Project key (e.g. PROJ) |

---

### listBoards

List Jira agile boards.

**Module:** `jira` | **Returns:** `object` -- Board list with pagination.

```robinpath
jira.listBoards {"projectKeyOrId":"PROJ"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: projectKeyOrId, type, startAt, maxResults |

---

### getBoardSprints

Get sprints for a Jira board.

**Module:** `jira` | **Returns:** `object` -- Sprint list with pagination.

```robinpath
jira.getBoardSprints 42 {"state":"active"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `boardId` | `number` | Yes | Board ID |
| `options` | `object` | No | Options: state (future, active, closed), startAt, maxResults |

---

### getSprintIssues

Get issues in a sprint.

**Module:** `jira` | **Returns:** `object` -- Issues in the sprint.

```robinpath
jira.getSprintIssues 100 {"maxResults":25}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sprintId` | `number` | Yes | Sprint ID |
| `options` | `object` | No | Options: startAt, maxResults, fields |

---

### addLabel

Add a label to a Jira issue.

**Module:** `jira` | **Returns:** `object` -- Update response.

```robinpath
jira.addLabel "PROJ-123" "urgent"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueKey` | `string` | Yes | Issue key (e.g. PROJ-123) |
| `label` | `string` | Yes | Label to add |

---

### removeLabel

Remove a label from a Jira issue.

**Module:** `jira` | **Returns:** `object` -- Update response.

```robinpath
jira.removeLabel "PROJ-123" "urgent"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueKey` | `string` | Yes | Issue key (e.g. PROJ-123) |
| `label` | `string` | Yes | Label to remove |

---

### getTransitions

Get available status transitions for a Jira issue.

**Module:** `jira` | **Returns:** `object` -- Available transitions.

```robinpath
jira.getTransitions "PROJ-123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueKey` | `string` | Yes | Issue key (e.g. PROJ-123) |

---

### addAttachment

Add a file attachment to a Jira issue.

**Module:** `jira` | **Returns:** `object` -- Attachment details.

```robinpath
jira.addAttachment "PROJ-123" "/path/to/report.pdf"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueKey` | `string` | Yes | Issue key (e.g. PROJ-123) |
| `filePath` | `string` | Yes | Local file path to attach |

---

### listUsers

Search for Jira users.

**Module:** `jira` | **Returns:** `array` -- Array of user objects.

```robinpath
jira.listUsers "john"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | No | Search query (name or email) |

---

### getUser

Get a Jira user by account ID.

**Module:** `jira` | **Returns:** `object` -- User details.

```robinpath
jira.getUser "5b10ac8d82e05b22cc7d4ef5"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Atlassian account ID |

---

### addWatcher

Add a watcher to a Jira issue.

**Module:** `jira` | **Returns:** `string` -- Confirmation message.

```robinpath
jira.addWatcher "PROJ-123" "5b10ac8d82e05b22cc7d4ef5"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueKey` | `string` | Yes | Issue key (e.g. PROJ-123) |
| `accountId` | `string` | Yes | Atlassian account ID of the watcher |

---

### removeWatcher

Remove a watcher from a Jira issue.

**Module:** `jira` | **Returns:** `string` -- Removal confirmation.

```robinpath
jira.removeWatcher "PROJ-123" "5b10ac8d82e05b22cc7d4ef5"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueKey` | `string` | Yes | Issue key (e.g. PROJ-123) |
| `accountId` | `string` | Yes | Atlassian account ID of the watcher |

---

### listPriorities

List all available Jira priorities.

**Module:** `jira` | **Returns:** `array` -- Array of priority objects.

```robinpath
jira.listPriorities
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### listIssueTypes

List available issue types, optionally filtered by project.

**Module:** `jira` | **Returns:** `array` -- Array of issue type objects.

```robinpath
jira.listIssueTypes "PROJ"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectKey` | `string` | No | Optional project key to filter issue types |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Jira API error (${res.status}): ${text}` | Check the error message for details |
| `Jira Agile API error (${res.status}): ${text}` | Check the error message for details |
| `jira.setCredentials requires domain, email, and apiToken.` | Check the error message for details |
| `jira.createIssue requires projectKey, issueType, and summary.` | Check the error message for details |
| `jira.getIssue requires an issueKey.` | Check the error message for details |
| `jira.updateIssue requires issueKey and fields.` | Check the error message for details |
| `jira.deleteIssue requires an issueKey.` | Check the error message for details |
| `jira.assignIssue requires issueKey and accountId.` | Check the error message for details |

```robinpath
set $result as jira.createIssue "PROJ" "Task" "Fix login bug" {"description":"Login page returns 500","priority":"High"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Issue

Retrieve all items and loop through them.

```robinpath
jira.setCredentials $token
set $result as jira.getIssue "PROJ-123"
each $item in $result
  print $item
end
```

### 2. Create a new item with createIssue

Create a new resource and capture the result.

```robinpath
jira.setCredentials $token
set $result as jira.createIssue "PROJ" "Task" "Fix login bug" {"description":"Login page returns 500","priority":"High"}
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
jira.setCredentials $token
set $created as jira.createIssue "PROJ" "Task" "Fix login bug" {"description":"Login page returns 500","priority":"High"}
# Update the created item
jira.updateIssue "PROJ-123" {"summary":"Updated summary","priority":{"name":"High"}}
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
jira.setCredentials $token
set $existing as jira.getIssue "PROJ-123"
if $existing == null
  jira.createIssue "PROJ" "Task" "Fix login bug" {"description":"Login page returns 500","priority":"High"}
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Jira workflow

Chain multiple jira operations together.

```robinpath
jira.setCredentials $token
set $r_createIssue as jira.createIssue "PROJ" "Task" "Fix login bug" {"description":"Login page returns 500","priority":"High"}
set $r_getIssue as jira.getIssue "PROJ-123"
set $r_updateIssue as jira.updateIssue "PROJ-123" {"summary":"Updated summary","priority":{"name":"High"}}
print "All operations complete"
```

### 6. Safe createIssue with validation

Check results before proceeding.

```robinpath
jira.setCredentials $token
set $result as jira.createIssue "PROJ" "Task" "Fix login bug" {"description":"Login page returns 500","priority":"High"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **asana** -- Asana module for complementary functionality
- **clickup** -- ClickUp module for complementary functionality
- **linear** -- Linear module for complementary functionality
- **monday** -- Monday.com module for complementary functionality
- **todoist** -- Todoist module for complementary functionality
