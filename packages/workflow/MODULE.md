---
title: "Workflow"
module: "workflow"
package: "@robinpath/workflow"
description: "Workflow orchestration engine with steps, conditions, loops, parallel execution, branching, and context management"
category: "infrastructure"
tags: [workflow, infrastructure]
type: "utility"
auth: "none"
functionCount: 15
---

# Workflow

> Workflow orchestration engine with steps, conditions, loops, parallel execution, branching, and context management

**Package:** `@robinpath/workflow` | **Category:** Infrastructure | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `workflow` module when you need to:

- **Create a new workflow** -- Use `workflow.create` to perform this operation
- **Add a step to a workflow (action, condition, loop, parallel, delay, transform)** -- Use `workflow.addStep` to perform this operation
- **Link one step to the next (set execution order)** -- Use `workflow.link` to perform this operation
- **Execute a workflow with optional input data** -- Use `workflow.run` to perform this operation
- **Pause a running workflow** -- Use `workflow.pause` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create a new workflow | `{id, name, status}` |
| [`addStep`](#addstep) | Add a step to a workflow (action, condition, loop, parallel, delay, transform) | `{id, name, type}` |
| [`setEntry`](#setentry) | Set the entry (first) step of a workflow | `{entryStep}` |
| [`link`](#link) | Link one step to the next (set execution order) | `{from, to}` |
| [`run`](#run) | Execute a workflow with optional input data | `{id, status, stepsExecuted, duration, result, error}` |
| [`pause`](#pause) | Pause a running workflow | `{id, status: paused}` |
| [`getStatus`](#getstatus) | Get the current status and metadata of a workflow | `Workflow status details` |
| [`getContext`](#getcontext) | Get workflow context data (all or by key) | `Context value or full context object` |
| [`setContext`](#setcontext) | Set a value in the workflow context | `True` |
| [`getHistory`](#gethistory) | Get the execution history of a workflow run | `Array of step execution records` |
| [`listSteps`](#liststeps) | List all steps in a workflow | `Array of step definitions` |
| [`removeStep`](#removestep) | Remove a step from a workflow | `True if removed` |
| [`destroy`](#destroy) | Destroy a workflow and free resources | `True if destroyed` |
| [`list`](#list) | List all workflows | `Array of workflow summaries` |
| [`clone`](#clone) | Clone an existing workflow | `{id, name}` |


## Functions

### create

Create a new workflow

**Module:** `workflow` | **Returns:** `object` -- {id, name, status}

```robinpath
workflow.create "Send Welcome Email"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Workflow name |
| `options` | `object` | No | {context: initial context data} |

---

### addStep

Add a step to a workflow (action, condition, loop, parallel, delay, transform)

**Module:** `workflow` | **Returns:** `object` -- {id, name, type}

```robinpath
workflow.addStep $wfId {"name": "Fetch User", "type": "action", "handler": $fn}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workflowId` | `string` | Yes | Workflow ID |
| `step` | `object` | Yes | {name, type, handler, config, next, onError} |

---

### setEntry

Set the entry (first) step of a workflow

**Module:** `workflow` | **Returns:** `object` -- {entryStep}

```robinpath
workflow.setEntry $wfId $stepId
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workflowId` | `string` | Yes | Workflow ID |
| `stepId` | `string` | Yes | Step ID |

---

### link

Link one step to the next (set execution order)

**Module:** `workflow` | **Returns:** `object` -- {from, to}

```robinpath
workflow.link $wfId $step1 $step2
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workflowId` | `string` | Yes | Workflow ID |
| `fromStepId` | `string` | Yes | Source step |
| `toStepId` | `string` | Yes | Target step |

---

### run

Execute a workflow with optional input data

**Module:** `workflow` | **Returns:** `object` -- {id, status, stepsExecuted, duration, result, error}

```robinpath
workflow.run $wfId {"userId": 123}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workflowId` | `string` | Yes | Workflow ID |
| `input` | `object` | No | Input data for the workflow context |

---

### pause

Pause a running workflow

**Module:** `workflow` | **Returns:** `object` -- {id, status: paused}

```robinpath
workflow.pause $wfId
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workflowId` | `string` | Yes | Workflow ID |

---

### getStatus

Get the current status and metadata of a workflow

**Module:** `workflow` | **Returns:** `object` -- Workflow status details

```robinpath
workflow.getStatus $wfId
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workflowId` | `string` | Yes | Workflow ID |

---

### getContext

Get workflow context data (all or by key)

**Module:** `workflow` | **Returns:** `any` -- Context value or full context object

```robinpath
workflow.getContext $wfId "userId"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workflowId` | `string` | Yes | Workflow ID |
| `key` | `string` | No | Optional context key |

---

### setContext

Set a value in the workflow context

**Module:** `workflow` | **Returns:** `boolean` -- True

```robinpath
workflow.setContext $wfId "status" "active"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workflowId` | `string` | Yes | Workflow ID |
| `key` | `string` | Yes | Context key |
| `value` | `any` | Yes | Value to set |

---

### getHistory

Get the execution history of a workflow run

**Module:** `workflow` | **Returns:** `array` -- Array of step execution records

```robinpath
workflow.getHistory $wfId
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workflowId` | `string` | Yes | Workflow ID |

---

### listSteps

List all steps in a workflow

**Module:** `workflow` | **Returns:** `array` -- Array of step definitions

```robinpath
workflow.listSteps $wfId
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workflowId` | `string` | Yes | Workflow ID |

---

### removeStep

Remove a step from a workflow

**Module:** `workflow` | **Returns:** `boolean` -- True if removed

```robinpath
workflow.removeStep $wfId $stepId
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workflowId` | `string` | Yes | Workflow ID |
| `stepId` | `string` | Yes | Step ID |

---

### destroy

Destroy a workflow and free resources

**Module:** `workflow` | **Returns:** `boolean` -- True if destroyed

```robinpath
workflow.destroy $wfId
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workflowId` | `string` | Yes | Workflow ID |

---

### list

List all workflows

**Module:** `workflow` | **Returns:** `array` -- Array of workflow summaries

```robinpath
workflow.list
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### clone

Clone an existing workflow

**Module:** `workflow` | **Returns:** `object` -- {id, name}

```robinpath
workflow.clone $wfId "My Copy"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workflowId` | `string` | Yes | Source workflow ID |
| `name` | `string` | No | New workflow name |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Workflow has no steps` | Check the error message for details |
| `No entry step defined` | Check the error message for details |
| `Workflow "..." not found` | Check the error message for details |
| `Step "..." not found in workflow` | Check the error message for details |
| `Step "..." not found` | Check the error message for details |

```robinpath
set $result as workflow.create "Send Welcome Email"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Status

Retrieve all items and loop through them.

```robinpath
set $result as workflow.getStatus $wfId
each $item in $result
  print $item
end
```

### 2. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as workflow.create "Send Welcome Email"
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as workflow.getStatus $wfId
if $existing == null
  workflow.create "Send Welcome Email"
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Workflow workflow

Chain multiple workflow operations together.

```robinpath
set $r_create as workflow.create "Send Welcome Email"
set $r_addStep as workflow.addStep $wfId {"name": "Fetch User", "type": "action", "handler": $fn}
set $r_link as workflow.link $wfId $step1 $step2
print "All operations complete"
```

### 5. Safe create with validation

Check results before proceeding.

```robinpath
set $result as workflow.create "Send Welcome Email"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
