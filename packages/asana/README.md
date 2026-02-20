# @robinpath/asana

> Asana module for RobinPath.

![Category](https://img.shields.io/badge/category-Project-management-blue) ![Functions](https://img.shields.io/badge/functions-23-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `asana` module lets you:

- listWorkspaces
- listProjects
- getProject
- createProject
- updateProject

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/asana
```

## Quick Start

**1. Set up credentials**

```robinpath
asana.setCredentials "your-credentials"
```

**2. listWorkspaces**

```robinpath
asana.listWorkspaces
```

## Available Functions

| Function | Description |
|----------|-------------|
| `asana.setCredentials` | Configure asana credentials. |
| `asana.listWorkspaces` | listWorkspaces |
| `asana.listProjects` | listProjects |
| `asana.getProject` | getProject |
| `asana.createProject` | createProject |
| `asana.updateProject` | updateProject |
| `asana.deleteProject` | deleteProject |
| `asana.listTasks` | listTasks |
| `asana.getTask` | getTask |
| `asana.createTask` | createTask |
| `asana.updateTask` | updateTask |
| `asana.deleteTask` | deleteTask |
| `asana.addComment` | addComment |
| `asana.listSections` | listSections |
| `asana.createSection` | createSection |
| `asana.addTaskToSection` | addTaskToSection |
| `asana.listTags` | listTags |
| `asana.createTag` | createTag |
| `asana.addTagToTask` | addTagToTask |
| `asana.getUser` | getUser |
| `asana.listTeams` | listTeams |
| `asana.searchTasks` | searchTasks |
| `asana.listSubtasks` | listSubtasks |

## Examples

### listWorkspaces

```robinpath
asana.listWorkspaces
```

### listProjects

```robinpath
asana.listProjects
```

### getProject

```robinpath
asana.getProject
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/asana";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  asana.setCredentials "your-credentials"
  asana.listWorkspaces
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/clickup`](../clickup) — ClickUp module for complementary functionality
- [`@robinpath/jira`](../jira) — Jira module for complementary functionality
- [`@robinpath/linear`](../linear) — Linear module for complementary functionality
- [`@robinpath/monday`](../monday) — Monday.com module for complementary functionality
- [`@robinpath/todoist`](../todoist) — Todoist module for complementary functionality

## License

MIT
