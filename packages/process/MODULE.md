---
title: "Process"
module: "process"
package: "@robinpath/process"
description: "Child process management: run commands, spawn long-running processes, get system info"
category: "infrastructure"
tags: [process, infrastructure]
type: "utility"
auth: "none"
functionCount: 15
---

# Process

> Child process management: run commands, spawn long-running processes, get system info

**Package:** `@robinpath/process` | **Category:** Infrastructure | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `process` module when you need to:

- **Run command and wait for result** -- Use `process.run` to perform this operation
- **Execute command in shell** -- Use `process.exec` to perform this operation
- **Spawn long-running process** -- Use `process.spawn` to perform this operation
- **Kill a spawned process** -- Use `process.kill` to perform this operation
- **Check if process is running** -- Use `process.isAlive` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`run`](#run) | Run command and wait for result | `{stdout, stderr, code}` |
| [`exec`](#exec) | Execute command in shell | `{stdout, stderr}` |
| [`spawn`](#spawn) | Spawn long-running process | `Process id` |
| [`kill`](#kill) | Kill a spawned process | `true` |
| [`isAlive`](#isalive) | Check if process is running | `true if running` |
| [`list`](#list) | List all managed processes | `Array of {id, pid, running}` |
| [`signal`](#signal) | Send signal to process | `true` |
| [`pid`](#pid) | Get current process PID | `PID` |
| [`uptime`](#uptime) | Get process uptime in seconds | `Uptime seconds` |
| [`memoryUsage`](#memoryusage) | Get memory usage in MB | `{rss, heapTotal, heapUsed, external}` |
| [`cpuUsage`](#cpuusage) | Get CPU usage in ms | `{user, system}` |
| [`cwd`](#cwd) | Get working directory | `Current directory path` |
| [`argv`](#argv) | Get process arguments | `Argument strings` |
| [`env`](#env) | Get environment variables | `All env vars` |
| [`exit`](#exit) | Request process exit (safe, does not actually exit) | `{exitCode, note}` |


## Functions

### run

Run command and wait for result

**Module:** `process` | **Returns:** `object` -- {stdout, stderr, code}

```robinpath
process.run "ls -la"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | Yes | Shell command |
| `options` | `object` | No | {cwd, env, timeout, shell} |

---

### exec

Execute command in shell

**Module:** `process` | **Returns:** `object` -- {stdout, stderr}

```robinpath
process.exec "echo hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | Yes | Shell command |
| `options` | `object` | No | {cwd, env, timeout, maxBuffer} |

---

### spawn

Spawn long-running process

**Module:** `process` | **Returns:** `string` -- Process id

```robinpath
process.spawn "server" "node" ["app.js"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Process identifier |
| `command` | `string` | Yes | Command to run |
| `args` | `array` | No | Command arguments |
| `options` | `object` | No | {cwd, env, shell, detached} |

---

### kill

Kill a spawned process

**Module:** `process` | **Returns:** `boolean` -- true

```robinpath
process.kill "server"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Process id |
| `signal` | `string` | No | Signal (default SIGTERM) |

---

### isAlive

Check if process is running

**Module:** `process` | **Returns:** `boolean` -- true if running

```robinpath
process.isAlive "server"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Process id |

---

### list

List all managed processes

**Module:** `process` | **Returns:** `array` -- Array of {id, pid, running}

```robinpath
process.list
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### signal

Send signal to process

**Module:** `process` | **Returns:** `boolean` -- true

```robinpath
process.signal "server" "SIGUSR1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Process id |
| `signal` | `string` | Yes | Signal name |

---

### pid

Get current process PID

**Module:** `process` | **Returns:** `number` -- PID

```robinpath
process.pid
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### uptime

Get process uptime in seconds

**Module:** `process` | **Returns:** `number` -- Uptime seconds

```robinpath
process.uptime
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### memoryUsage

Get memory usage in MB

**Module:** `process` | **Returns:** `object` -- {rss, heapTotal, heapUsed, external}

```robinpath
process.memoryUsage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### cpuUsage

Get CPU usage in ms

**Module:** `process` | **Returns:** `object` -- {user, system}

```robinpath
process.cpuUsage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### cwd

Get working directory

**Module:** `process` | **Returns:** `string` -- Current directory path

```robinpath
process.cwd
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### argv

Get process arguments

**Module:** `process` | **Returns:** `array` -- Argument strings

```robinpath
process.argv
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### env

Get environment variables

**Module:** `process` | **Returns:** `object` -- All env vars

```robinpath
process.env
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### exit

Request process exit (safe, does not actually exit)

**Module:** `process` | **Returns:** `object` -- {exitCode, note}

```robinpath
process.exit 0
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | `number` | No | Exit code (default 0) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Process "..." already exists` | Check the error message for details |
| `Process "..." not found` | Check the error message for details |

```robinpath
set $result as process.run "ls -la"
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
set $result as process.list
each $item in $result
  print $item
end
```

### 2. Multi-step Process workflow

Chain multiple process operations together.

```robinpath
set $r_run as process.run "ls -la"
set $r_exec as process.exec "echo hello"
set $r_spawn as process.spawn "server" "node" ["app.js"]
print "All operations complete"
```

### 3. Safe run with validation

Check results before proceeding.

```robinpath
set $result as process.run "ls -la"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
