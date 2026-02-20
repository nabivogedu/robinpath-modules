# @robinpath/queue

> In-memory job queue with priorities, delayed execution, retry, dead-letter, pause/resume

![Category](https://img.shields.io/badge/category-Infrastructure-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `queue` module lets you:

- Create a named job queue
- Add a job to a queue with optional priority and delay
- Get the next pending job from a queue (highest priority, oldest first)
- Mark a job as completed with an optional result
- Mark a job as failed; auto-retries if under maxAttempts, otherwise moves to dead-letter

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/queue
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
queue.push "emails" $emailData {"priority": 10}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `queue.create` | Create a named job queue |
| `queue.push` | Add a job to a queue with optional priority and delay |
| `queue.pop` | Get the next pending job from a queue (highest priority, oldest first) |
| `queue.complete` | Mark a job as completed with an optional result |
| `queue.fail` | Mark a job as failed; auto-retries if under maxAttempts, otherwise moves to dead-letter |
| `queue.retry` | Re-queue a failed or dead-letter job for processing |
| `queue.remove` | Remove a job from a queue |
| `queue.size` | Get the number of jobs in a queue, optionally filtered by status |
| `queue.status` | Get detailed status and metrics for a queue |
| `queue.pause` | Pause a queue (pop will return null) |
| `queue.resume` | Resume a paused queue |
| `queue.clear` | Remove all jobs from a queue |
| `queue.deadLetter` | List jobs in the dead-letter queue |
| `queue.getJob` | Get details for a specific job by ID |
| `queue.destroy` | Destroy a queue and free all resources |

## Examples

### Add a job to a queue with optional priority and delay

```robinpath
queue.push "emails" $emailData {"priority": 10}
```

### Get the next pending job from a queue (highest priority, oldest first)

```robinpath
queue.pop "emails"
```

### Mark a job as completed with an optional result

```robinpath
queue.complete "emails" $jobId "sent"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/queue";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  queue.push "emails" $emailData {"priority": 10}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
