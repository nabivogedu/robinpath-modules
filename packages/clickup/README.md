# @robinpath/clickup

> ClickUp module for RobinPath.

![Category](https://img.shields.io/badge/category-Project-management-blue) ![Functions](https://img.shields.io/badge/functions-23-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `clickup` module lets you:

- listWorkspaces
- listSpaces
- getSpace
- createSpace
- listFolders

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/clickup
```

## Quick Start

**1. Set up credentials**

```robinpath
clickup.setCredentials "your-credentials"
```

**2. listWorkspaces**

```robinpath
clickup.listWorkspaces
```

## Available Functions

| Function | Description |
|----------|-------------|
| `clickup.setCredentials` | Configure clickup credentials. |
| `clickup.listWorkspaces` | listWorkspaces |
| `clickup.listSpaces` | listSpaces |
| `clickup.getSpace` | getSpace |
| `clickup.createSpace` | createSpace |
| `clickup.listFolders` | listFolders |
| `clickup.createFolder` | createFolder |
| `clickup.listLists` | listLists |
| `clickup.createList` | createList |
| `clickup.listTasks` | listTasks |
| `clickup.getTask` | getTask |
| `clickup.createTask` | createTask |
| `clickup.updateTask` | updateTask |
| `clickup.deleteTask` | deleteTask |
| `clickup.addComment` | addComment |
| `clickup.listComments` | listComments |
| `clickup.listMembers` | listMembers |
| `clickup.getTimeEntries` | getTimeEntries |
| `clickup.createTimeEntry` | createTimeEntry |
| `clickup.listTags` | listTags |
| `clickup.addTagToTask` | addTagToTask |
| `clickup.listGoals` | listGoals |
| `clickup.createGoal` | createGoal |

## Examples

### listWorkspaces

```robinpath
clickup.listWorkspaces
```

### listSpaces

```robinpath
clickup.listSpaces
```

### getSpace

```robinpath
clickup.getSpace
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/clickup";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  clickup.setCredentials "your-credentials"
  clickup.listWorkspaces
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/asana`](../asana) — Asana module for complementary functionality
- [`@robinpath/jira`](../jira) — Jira module for complementary functionality
- [`@robinpath/linear`](../linear) — Linear module for complementary functionality
- [`@robinpath/monday`](../monday) — Monday.com module for complementary functionality
- [`@robinpath/todoist`](../todoist) — Todoist module for complementary functionality

## License

MIT
