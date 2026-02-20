# @robinpath/jira

> Jira module for RobinPath.

![Category](https://img.shields.io/badge/category-Project-management-blue) ![Functions](https://img.shields.io/badge/functions-25-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `jira` module lets you:

- Create a new Jira issue.
- Get a Jira issue by key.
- Update fields on a Jira issue.
- Delete a Jira issue.
- Assign a Jira issue to a user.

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/jira
```

## Quick Start

**1. Set up credentials**

```robinpath
jira.setCredentials "mycompany.atlassian.net" "user@example.com" "your-api-token"
```

**2. Create a new Jira issue.**

```robinpath
jira.createIssue "PROJ" "Task" "Fix login bug" {"description":"Login page returns 500","priority":"High"}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `jira.setCredentials` | Set Jira Cloud credentials for API access. |
| `jira.createIssue` | Create a new Jira issue. |
| `jira.getIssue` | Get a Jira issue by key. |
| `jira.updateIssue` | Update fields on a Jira issue. |
| `jira.deleteIssue` | Delete a Jira issue. |
| `jira.assignIssue` | Assign a Jira issue to a user. |
| `jira.transitionIssue` | Transition a Jira issue to a new status. |
| `jira.addComment` | Add a comment to a Jira issue. |
| `jira.getComments` | List comments on a Jira issue. |
| `jira.searchIssues` | Search Jira issues using JQL. |
| `jira.listProjects` | List all accessible Jira projects. |
| `jira.getProject` | Get details of a Jira project. |
| `jira.listBoards` | List Jira agile boards. |
| `jira.getBoardSprints` | Get sprints for a Jira board. |
| `jira.getSprintIssues` | Get issues in a sprint. |
| `jira.addLabel` | Add a label to a Jira issue. |
| `jira.removeLabel` | Remove a label from a Jira issue. |
| `jira.getTransitions` | Get available status transitions for a Jira issue. |
| `jira.addAttachment` | Add a file attachment to a Jira issue. |
| `jira.listUsers` | Search for Jira users. |
| `jira.getUser` | Get a Jira user by account ID. |
| `jira.addWatcher` | Add a watcher to a Jira issue. |
| `jira.removeWatcher` | Remove a watcher from a Jira issue. |
| `jira.listPriorities` | List all available Jira priorities. |
| `jira.listIssueTypes` | List available issue types, optionally filtered by project. |

## Examples

### Create a new Jira issue.

```robinpath
jira.createIssue "PROJ" "Task" "Fix login bug" {"description":"Login page returns 500","priority":"High"}
```

### Get a Jira issue by key.

```robinpath
jira.getIssue "PROJ-123"
```

### Update fields on a Jira issue.

```robinpath
jira.updateIssue "PROJ-123" {"summary":"Updated summary","priority":{"name":"High"}}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/jira";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  jira.setCredentials "mycompany.atlassian.net" "user@example.com" "your-api-token"
  jira.createIssue "PROJ" "Task" "Fix login bug" {"description":"Login page returns 500","priority":"High"}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/asana`](../asana) — Asana module for complementary functionality
- [`@robinpath/clickup`](../clickup) — ClickUp module for complementary functionality
- [`@robinpath/linear`](../linear) — Linear module for complementary functionality
- [`@robinpath/monday`](../monday) — Monday.com module for complementary functionality
- [`@robinpath/todoist`](../todoist) — Todoist module for complementary functionality

## License

MIT
