---
title: "Scheduler"
module: "scheduler"
package: "@robinpath/scheduler"
description: "Schedule and run recurring or one-time tasks with cron expressions, pause/resume support, and execution history"
category: "infrastructure"
tags: [scheduler, infrastructure]
type: "utility"
auth: "none"
functionCount: 11
---

# Scheduler

> Schedule and run recurring or one-time tasks with cron expressions, pause/resume support, and execution history

**Package:** `@robinpath/scheduler` | **Category:** Infrastructure | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `scheduler` module when you need to:

- **Schedule a recurring task using a cron expression** -- Use `scheduler.schedule` to perform this operation
- **Schedule a one-time task at a specific date/time or after a delay in ms** -- Use `scheduler.once` to perform this operation
- **Cancel a scheduled task by id** -- Use `scheduler.cancel` to perform this operation
- **Cancel all scheduled tasks** -- Use `scheduler.cancelAll` to perform this operation
- **List all scheduled tasks with their next run times** -- Use `scheduler.list` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`schedule`](#schedule) | Schedule a recurring task using a cron expression | `{ id, nextRun, type, cron }` |
| [`once`](#once) | Schedule a one-time task at a specific date/time or after a delay in ms | `{ id, nextRun, type }` |
| [`cancel`](#cancel) | Cancel a scheduled task by id | `{ cancelled, id } or { cancelled: false, reason }` |
| [`cancelAll`](#cancelall) | Cancel all scheduled tasks | `{ cancelled: <count> }` |
| [`list`](#list) | List all scheduled tasks with their next run times | `Array of { id, type, cron, nextRun, paused }` |
| [`get`](#get) | Get info about a specific scheduled task | `Task details or null if not found` |
| [`pause`](#pause) | Pause a scheduled task (keeps it but stops execution) | `{ id, paused: true }` |
| [`resume`](#resume) | Resume a paused task | `{ id, paused: false, nextRun }` |
| [`isRunning`](#isrunning) | Check if a task is currently active (not paused and scheduled) | `True if the task is active` |
| [`nextRun`](#nextrun) | Get the next run time for a scheduled task | `ISO date string of the next run` |
| [`history`](#history) | Get execution history for a task | `Array of { ran, status } entries` |


## Functions

### schedule

Schedule a recurring task using a cron expression

**Module:** `scheduler` | **Returns:** `object` -- { id, nextRun, type, cron }

```robinpath
scheduler.schedule "cleanup" "*/5 * * * *" { action: "runCleanup" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Unique task identifier |
| `cronExpression` | `string` | Yes | Standard 5-field cron expression |
| `action` | `object` | Yes | Callback info object with action name |

---

### once

Schedule a one-time task at a specific date/time or after a delay in ms

**Module:** `scheduler` | **Returns:** `object` -- { id, nextRun, type }

```robinpath
scheduler.once "sendEmail" "2025-12-31T23:59:00Z" { action: "sendNewYearEmail" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Unique task identifier |
| `dateOrDelay` | `string` | Yes | ISO date string or delay in milliseconds |
| `action` | `object` | No | Callback info object with action name |

---

### cancel

Cancel a scheduled task by id

**Module:** `scheduler` | **Returns:** `object` -- { cancelled, id } or { cancelled: false, reason }

```robinpath
scheduler.cancel "cleanup"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Task identifier to cancel |

---

### cancelAll

Cancel all scheduled tasks

**Module:** `scheduler` | **Returns:** `object` -- { cancelled: <count> }

```robinpath
scheduler.cancelAll
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### list

List all scheduled tasks with their next run times

**Module:** `scheduler` | **Returns:** `array` -- Array of { id, type, cron, nextRun, paused }

```robinpath
scheduler.list
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### get

Get info about a specific scheduled task

**Module:** `scheduler` | **Returns:** `object` -- Task details or null if not found

```robinpath
scheduler.get "cleanup"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Task identifier |

---

### pause

Pause a scheduled task (keeps it but stops execution)

**Module:** `scheduler` | **Returns:** `object` -- { id, paused: true }

```robinpath
scheduler.pause "cleanup"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Task identifier to pause |

---

### resume

Resume a paused task

**Module:** `scheduler` | **Returns:** `object` -- { id, paused: false, nextRun }

```robinpath
scheduler.resume "cleanup"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Task identifier to resume |

---

### isRunning

Check if a task is currently active (not paused and scheduled)

**Module:** `scheduler` | **Returns:** `boolean` -- True if the task is active

```robinpath
scheduler.isRunning "cleanup"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Task identifier |

---

### nextRun

Get the next run time for a scheduled task

**Module:** `scheduler` | **Returns:** `string` -- ISO date string of the next run

```robinpath
scheduler.nextRun "cleanup"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Task identifier |

---

### history

Get execution history for a task

**Module:** `scheduler` | **Returns:** `array` -- Array of { ran, status } entries

```robinpath
scheduler.history "cleanup"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Task identifier |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `No matching cron date found within 1 year` | Check the error message for details |
| `Task id is required` | Check the error message for details |
| `dateOrDelay is required (ISO string or milliseconds)` | Check the error message for details |

```robinpath
set $result as scheduler.schedule "cleanup" "*/5 * * * *" { action: "runCleanup" }
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate 

Retrieve all items and loop through them.

```robinpath
set $result as scheduler.list
each $item in $result
  print $item
end
```

### 2. Multi-step Scheduler workflow

Chain multiple scheduler operations together.

```robinpath
set $r_schedule as scheduler.schedule "cleanup" "*/5 * * * *" { action: "runCleanup" }
set $r_once as scheduler.once "sendEmail" "2025-12-31T23:59:00Z" { action: "sendNewYearEmail" }
set $r_cancel as scheduler.cancel "cleanup"
print "All operations complete"
```

### 3. Safe schedule with validation

Check results before proceeding.

```robinpath
set $result as scheduler.schedule "cleanup" "*/5 * * * *" { action: "runCleanup" }
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
