# @robinpath/basecamp

> Basecamp module for RobinPath.

![Category](https://img.shields.io/badge/category-Project-management-blue) ![Functions](https://img.shields.io/badge/functions-19-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `basecamp` module lets you:

- listProjects
- getProject
- createProject
- updateProject
- listTodoLists

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/basecamp
```

## Quick Start

**1. Set up credentials**

```robinpath
basecamp.setCredentials "your-credentials"
```

**2. listProjects**

```robinpath
basecamp.listProjects
```

## Available Functions

| Function | Description |
|----------|-------------|
| `basecamp.setCredentials` | Configure basecamp credentials. |
| `basecamp.listProjects` | listProjects |
| `basecamp.getProject` | getProject |
| `basecamp.createProject` | createProject |
| `basecamp.updateProject` | updateProject |
| `basecamp.listTodoLists` | listTodoLists |
| `basecamp.createTodoList` | createTodoList |
| `basecamp.listTodos` | listTodos |
| `basecamp.createTodo` | createTodo |
| `basecamp.updateTodo` | updateTodo |
| `basecamp.completeTodo` | completeTodo |
| `basecamp.listMessages` | listMessages |
| `basecamp.createMessage` | createMessage |
| `basecamp.listCampfireMessages` | listCampfireMessages |
| `basecamp.sendCampfireMessage` | sendCampfireMessage |
| `basecamp.listPeople` | listPeople |
| `basecamp.getPerson` | getPerson |
| `basecamp.listComments` | listComments |
| `basecamp.createComment` | createComment |

## Examples

### listProjects

```robinpath
basecamp.listProjects
```

### getProject

```robinpath
basecamp.getProject
```

### createProject

```robinpath
basecamp.createProject
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/basecamp";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  basecamp.setCredentials "your-credentials"
  basecamp.listProjects
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
