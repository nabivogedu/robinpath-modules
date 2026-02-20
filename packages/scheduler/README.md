# @robinpath/scheduler

> Schedule and run recurring or one-time tasks with cron expressions, pause/resume support, and execution history

![Category](https://img.shields.io/badge/category-Infrastructure-blue) ![Functions](https://img.shields.io/badge/functions-11-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `scheduler` module lets you:

- Schedule a recurring task using a cron expression
- Schedule a one-time task at a specific date/time or after a delay in ms
- Cancel a scheduled task by id
- Cancel all scheduled tasks
- List all scheduled tasks with their next run times

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/scheduler
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
scheduler.once "sendEmail" "2025-12-31T23:59:00Z" { action: "sendNewYearEmail" }
```

## Available Functions

| Function | Description |
|----------|-------------|
| `scheduler.schedule` | Schedule a recurring task using a cron expression |
| `scheduler.once` | Schedule a one-time task at a specific date/time or after a delay in ms |
| `scheduler.cancel` | Cancel a scheduled task by id |
| `scheduler.cancelAll` | Cancel all scheduled tasks |
| `scheduler.list` | List all scheduled tasks with their next run times |
| `scheduler.get` | Get info about a specific scheduled task |
| `scheduler.pause` | Pause a scheduled task (keeps it but stops execution) |
| `scheduler.resume` | Resume a paused task |
| `scheduler.isRunning` | Check if a task is currently active (not paused and scheduled) |
| `scheduler.nextRun` | Get the next run time for a scheduled task |
| `scheduler.history` | Get execution history for a task |

## Examples

### Schedule a one-time task at a specific date/time or after a delay in ms

```robinpath
scheduler.once "sendEmail" "2025-12-31T23:59:00Z" { action: "sendNewYearEmail" }
```

### Cancel a scheduled task by id

```robinpath
scheduler.cancel "cleanup"
```

### Cancel all scheduled tasks

```robinpath
scheduler.cancelAll
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/scheduler";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  scheduler.once "sendEmail" "2025-12-31T23:59:00Z" { action: "sendNewYearEmail" }
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
