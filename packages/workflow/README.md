# @robinpath/workflow

> Workflow orchestration engine with steps, conditions, loops, parallel execution, branching, and context management

![Category](https://img.shields.io/badge/category-Infrastructure-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `workflow` module lets you:

- Create a new workflow
- Add a step to a workflow (action, condition, loop, parallel, delay, transform)
- Link one step to the next (set execution order)
- Execute a workflow with optional input data
- Pause a running workflow

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/workflow
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
workflow.addStep $wfId {"name": "Fetch User", "type": "action", "handler": $fn}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `workflow.create` | Create a new workflow |
| `workflow.addStep` | Add a step to a workflow (action, condition, loop, parallel, delay, transform) |
| `workflow.setEntry` | Set the entry (first) step of a workflow |
| `workflow.link` | Link one step to the next (set execution order) |
| `workflow.run` | Execute a workflow with optional input data |
| `workflow.pause` | Pause a running workflow |
| `workflow.getStatus` | Get the current status and metadata of a workflow |
| `workflow.getContext` | Get workflow context data (all or by key) |
| `workflow.setContext` | Set a value in the workflow context |
| `workflow.getHistory` | Get the execution history of a workflow run |
| `workflow.listSteps` | List all steps in a workflow |
| `workflow.removeStep` | Remove a step from a workflow |
| `workflow.destroy` | Destroy a workflow and free resources |
| `workflow.list` | List all workflows |
| `workflow.clone` | Clone an existing workflow |

## Examples

### Add a step to a workflow (action, condition, loop, parallel, delay, transform)

```robinpath
workflow.addStep $wfId {"name": "Fetch User", "type": "action", "handler": $fn}
```

### Set the entry (first) step of a workflow

```robinpath
workflow.setEntry $wfId $stepId
```

### Link one step to the next (set execution order)

```robinpath
workflow.link $wfId $step1 $step2
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/workflow";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  workflow.addStep $wfId {"name": "Fetch User", "type": "action", "handler": $fn}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
