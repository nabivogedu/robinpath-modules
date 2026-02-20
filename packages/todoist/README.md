# @robinpath/todoist

> Todoist module for RobinPath.

![Category](https://img.shields.io/badge/category-Project-management-blue) ![Functions](https://img.shields.io/badge/functions-18-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `todoist` module lets you:

- listProjects
- getProject
- createProject
- updateProject
- deleteProject

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/todoist
```

## Quick Start

**1. Set up credentials**

```robinpath
todoist.setCredentials "your-credentials"
```

**2. listProjects**

```robinpath
todoist.listProjects
```

## Available Functions

| Function | Description |
|----------|-------------|
| `todoist.setCredentials` | Configure todoist credentials. |
| `todoist.listProjects` | listProjects |
| `todoist.getProject` | getProject |
| `todoist.createProject` | createProject |
| `todoist.updateProject` | updateProject |
| `todoist.deleteProject` | deleteProject |
| `todoist.listTasks` | listTasks |
| `todoist.getTask` | getTask |
| `todoist.createTask` | createTask |
| `todoist.updateTask` | updateTask |
| `todoist.closeTask` | closeTask |
| `todoist.reopenTask` | reopenTask |
| `todoist.deleteTask` | deleteTask |
| `todoist.listLabels` | listLabels |
| `todoist.createLabel` | createLabel |
| `todoist.listComments` | listComments |
| `todoist.createComment` | createComment |
| `todoist.deleteComment` | deleteComment |

## Examples

### listProjects

```robinpath
todoist.listProjects
```

### getProject

```robinpath
todoist.getProject
```

### createProject

```robinpath
todoist.createProject
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/todoist";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  todoist.setCredentials "your-credentials"
  todoist.listProjects
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/asana`](../asana) — Asana module for complementary functionality
- [`@robinpath/clickup`](../clickup) — ClickUp module for complementary functionality
- [`@robinpath/jira`](../jira) — Jira module for complementary functionality
- [`@robinpath/linear`](../linear) — Linear module for complementary functionality
- [`@robinpath/monday`](../monday) — Monday.com module for complementary functionality

## License

MIT
