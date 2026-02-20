# @robinpath/linear

> Linear module for RobinPath.

![Category](https://img.shields.io/badge/category-Project-management-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `linear` module lets you:

- listIssues
- getIssue
- createIssue
- updateIssue
- deleteIssue

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/linear
```

## Quick Start

**1. Set up credentials**

```robinpath
linear.setCredentials "your-credentials"
```

**2. listIssues**

```robinpath
linear.listIssues
```

## Available Functions

| Function | Description |
|----------|-------------|
| `linear.setCredentials` | Configure linear credentials. |
| `linear.listIssues` | listIssues |
| `linear.getIssue` | getIssue |
| `linear.createIssue` | createIssue |
| `linear.updateIssue` | updateIssue |
| `linear.deleteIssue` | deleteIssue |
| `linear.listProjects` | listProjects |
| `linear.getProject` | getProject |
| `linear.createProject` | createProject |
| `linear.updateProject` | updateProject |
| `linear.listTeams` | listTeams |
| `linear.getTeam` | getTeam |
| `linear.listCycles` | listCycles |
| `linear.getCycle` | getCycle |
| `linear.addIssueToCycle` | addIssueToCycle |
| `linear.listLabels` | listLabels |
| `linear.createLabel` | createLabel |
| `linear.listComments` | listComments |
| `linear.createComment` | createComment |
| `linear.searchIssues` | searchIssues |
| `linear.listUsers` | listUsers |

## Examples

### listIssues

```robinpath
linear.listIssues
```

### getIssue

```robinpath
linear.getIssue
```

### createIssue

```robinpath
linear.createIssue
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/linear";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  linear.setCredentials "your-credentials"
  linear.listIssues
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/asana`](../asana) — Asana module for complementary functionality
- [`@robinpath/clickup`](../clickup) — ClickUp module for complementary functionality
- [`@robinpath/jira`](../jira) — Jira module for complementary functionality
- [`@robinpath/monday`](../monday) — Monday.com module for complementary functionality
- [`@robinpath/todoist`](../todoist) — Todoist module for complementary functionality

## License

MIT
