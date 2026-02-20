---
title: "Queue"
module: "queue"
package: "@robinpath/queue"
description: "In-memory job queue with priorities, delayed execution, retry, dead-letter, pause/resume"
category: "infrastructure"
tags: [queue, infrastructure]
type: "utility"
auth: "none"
functionCount: 15
---

# Queue

> In-memory job queue with priorities, delayed execution, retry, dead-letter, pause/resume

**Package:** `@robinpath/queue` | **Category:** Infrastructure | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `queue` module when you need to:

- **Create a named job queue** -- Use `queue.create` to perform this operation
- **Add a job to a queue with optional priority and delay** -- Use `queue.push` to perform this operation
- **Get the next pending job from a queue (highest priority, oldest first)** -- Use `queue.pop` to perform this operation
- **Mark a job as completed with an optional result** -- Use `queue.complete` to perform this operation
- **Mark a job as failed; auto-retries if under maxAttempts, otherwise moves to dead-letter** -- Use `queue.fail` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create a named job queue | `Queue configuration` |
| [`push`](#push) | Add a job to a queue with optional priority and delay | `{id, status, priority}` |
| [`pop`](#pop) | Get the next pending job from a queue (highest priority, oldest first) | `Job object or null if queue is empty/paused` |
| [`complete`](#complete) | Mark a job as completed with an optional result | `{id, status, duration}` |
| [`fail`](#fail) | Mark a job as failed; auto-retries if under maxAttempts, otherwise moves to dead-letter | `{id, status: 'retry' or 'dead-letter', attempts}` |
| [`retry`](#retry) | Re-queue a failed or dead-letter job for processing | `{id, status, source}` |
| [`remove`](#remove) | Remove a job from a queue | `True if job was removed` |
| [`size`](#size) | Get the number of jobs in a queue, optionally filtered by status | `Number of jobs` |
| [`status`](#status) | Get detailed status and metrics for a queue | `Queue status with counts by job status` |
| [`pause`](#pause) | Pause a queue (pop will return null) | `{name, paused: true}` |
| [`resume`](#resume) | Resume a paused queue | `{name, paused: false}` |
| [`clear`](#clear) | Remove all jobs from a queue | `{cleared: number}` |
| [`deadLetter`](#deadletter) | List jobs in the dead-letter queue | `Array of failed jobs` |
| [`getJob`](#getjob) | Get details for a specific job by ID | `Job details or null` |
| [`destroy`](#destroy) | Destroy a queue and free all resources | `True if queue existed` |


## Functions

### create

Create a named job queue

**Module:** `queue` | **Returns:** `object` -- Queue configuration

```robinpath
queue.create "emails"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Queue name |
| `options` | `object` | No | {maxDeadLetter: number} |

---

### push

Add a job to a queue with optional priority and delay

**Module:** `queue` | **Returns:** `object` -- {id, status, priority}

```robinpath
queue.push "emails" $emailData {"priority": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `queue` | `string` | Yes | Queue name |
| `data` | `any` | Yes | Job data/payload |
| `options` | `object` | No | {priority, delay, maxAttempts} |

---

### pop

Get the next pending job from a queue (highest priority, oldest first)

**Module:** `queue` | **Returns:** `object` -- Job object or null if queue is empty/paused

```robinpath
queue.pop "emails"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `queue` | `string` | Yes | Queue name |

---

### complete

Mark a job as completed with an optional result

**Module:** `queue` | **Returns:** `object` -- {id, status, duration}

```robinpath
queue.complete "emails" $jobId "sent"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `queue` | `string` | Yes | Queue name |
| `jobId` | `string` | Yes | Job ID |
| `result` | `any` | No | Optional result data |

---

### fail

Mark a job as failed; auto-retries if under maxAttempts, otherwise moves to dead-letter

**Module:** `queue` | **Returns:** `object` -- {id, status: 'retry' or 'dead-letter', attempts}

```robinpath
queue.fail "emails" $jobId "SMTP timeout"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `queue` | `string` | Yes | Queue name |
| `jobId` | `string` | Yes | Job ID |
| `error` | `string` | Yes | Error message |

---

### retry

Re-queue a failed or dead-letter job for processing

**Module:** `queue` | **Returns:** `object` -- {id, status, source}

```robinpath
queue.retry "emails" $jobId
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `queue` | `string` | Yes | Queue name |
| `jobId` | `string` | Yes | Job ID |

---

### remove

Remove a job from a queue

**Module:** `queue` | **Returns:** `boolean` -- True if job was removed

```robinpath
queue.remove "emails" $jobId
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `queue` | `string` | Yes | Queue name |
| `jobId` | `string` | Yes | Job ID |

---

### size

Get the number of jobs in a queue, optionally filtered by status

**Module:** `queue` | **Returns:** `number` -- Number of jobs

```robinpath
queue.size "emails" "pending"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `queue` | `string` | Yes | Queue name |
| `status` | `string` | No | Filter: pending, active, completed, failed, delayed |

---

### status

Get detailed status and metrics for a queue

**Module:** `queue` | **Returns:** `object` -- Queue status with counts by job status

```robinpath
queue.status "emails"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `queue` | `string` | Yes | Queue name |

---

### pause

Pause a queue (pop will return null)

**Module:** `queue` | **Returns:** `object` -- {name, paused: true}

```robinpath
queue.pause "emails"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `queue` | `string` | Yes | Queue name |

---

### resume

Resume a paused queue

**Module:** `queue` | **Returns:** `object` -- {name, paused: false}

```robinpath
queue.resume "emails"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `queue` | `string` | Yes | Queue name |

---

### clear

Remove all jobs from a queue

**Module:** `queue` | **Returns:** `object` -- {cleared: number}

```robinpath
queue.clear "emails"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `queue` | `string` | Yes | Queue name |

---

### deadLetter

List jobs in the dead-letter queue

**Module:** `queue` | **Returns:** `array` -- Array of failed jobs

```robinpath
queue.deadLetter "emails" 10
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `queue` | `string` | Yes | Queue name |
| `limit` | `number` | No | Max entries (default 50) |

---

### getJob

Get details for a specific job by ID

**Module:** `queue` | **Returns:** `object` -- Job details or null

```robinpath
queue.getJob "emails" $jobId
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `queue` | `string` | Yes | Queue name |
| `jobId` | `string` | Yes | Job ID |

---

### destroy

Destroy a queue and free all resources

**Module:** `queue` | **Returns:** `boolean` -- True if queue existed

```robinpath
queue.destroy "emails"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `queue` | `string` | Yes | Queue name |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Job "..." not found in queue "..."` | Check the error message for details |
| `Job "..." not found` | Check the error message for details |

```robinpath
set $result as queue.create "emails"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Job

Retrieve all items and loop through them.

```robinpath
set $result as queue.getJob "emails" $jobId
each $item in $result
  print $item
end
```

### 2. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as queue.create "emails"
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as queue.getJob "emails" $jobId
if $existing == null
  queue.create "emails"
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Queue workflow

Chain multiple queue operations together.

```robinpath
set $r_create as queue.create "emails"
set $r_push as queue.push "emails" $emailData {"priority": 10}
set $r_pop as queue.pop "emails"
print "All operations complete"
```

### 5. Safe create with validation

Check results before proceeding.

```robinpath
set $result as queue.create "emails"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
