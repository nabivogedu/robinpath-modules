# @robinpath/monday

> Monday.com module for RobinPath.

![Category](https://img.shields.io/badge/category-Project-management-blue) ![Functions](https://img.shields.io/badge/functions-19-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `monday` module lets you:

- listBoards
- getBoard
- createBoard
- listItems
- getItem

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/monday
```

## Quick Start

**1. Set up credentials**

```robinpath
monday.setCredentials "your-credentials"
```

**2. listBoards**

```robinpath
monday.listBoards
```

## Available Functions

| Function | Description |
|----------|-------------|
| `monday.setCredentials` | Configure monday credentials. |
| `monday.listBoards` | listBoards |
| `monday.getBoard` | getBoard |
| `monday.createBoard` | createBoard |
| `monday.listItems` | listItems |
| `monday.getItem` | getItem |
| `monday.createItem` | createItem |
| `monday.updateItem` | updateItem |
| `monday.deleteItem` | deleteItem |
| `monday.listGroups` | listGroups |
| `monday.createGroup` | createGroup |
| `monday.listColumns` | listColumns |
| `monday.createColumn` | createColumn |
| `monday.addUpdate` | addUpdate |
| `monday.listUpdates` | listUpdates |
| `monday.listWorkspaces` | listWorkspaces |
| `monday.createSubitem` | createSubitem |
| `monday.moveItemToGroup` | moveItemToGroup |
| `monday.archiveItem` | archiveItem |

## Examples

### listBoards

```robinpath
monday.listBoards
```

### getBoard

```robinpath
monday.getBoard
```

### createBoard

```robinpath
monday.createBoard
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/monday";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  monday.setCredentials "your-credentials"
  monday.listBoards
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/asana`](../asana) — Asana module for complementary functionality
- [`@robinpath/clickup`](../clickup) — ClickUp module for complementary functionality
- [`@robinpath/jira`](../jira) — Jira module for complementary functionality
- [`@robinpath/linear`](../linear) — Linear module for complementary functionality
- [`@robinpath/todoist`](../todoist) — Todoist module for complementary functionality

## License

MIT
