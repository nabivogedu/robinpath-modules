---
title: "Child"
module: "child"
package: "@robinpath/child"
description: "Execute shell commands, spawn processes, and manage child processes"
category: "core"
tags: [child, process, exec, shell, core]
type: "builtin"
auth: "none"
functionCount: 6
---

# Child

> Execute shell commands, spawn processes, and manage child processes

**Package:** `@robinpath/child` | **Category:** Core | **Type:** Built-in

## Authentication

No authentication required. All functions are available immediately.

## Use Cases

Use the `child` module when you need to:

- **Run a shell command and get its output** -- Use `child.exec` to execute a command asynchronously
- **Run a command and wait for its result** -- Use `child.execSync` for synchronous execution
- **Start a long-running process** -- Use `child.spawn` to launch a background process
- **Wait for a spawned process to finish** -- Use `child.wait` to block until completion
- **Stop a running process** -- Use `child.kill` to terminate a child process
- **Check if a process is still running** -- Use `child.running` to get process status

## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`exec`](#exec) | Execute a shell command asynchronously | `Object` |
| [`execSync`](#execsync) | Execute a shell command and wait for result | `string` |
| [`spawn`](#spawn) | Spawn a child process | `Object` |
| [`wait`](#wait) | Wait for a spawned process to complete | `Object` |
| [`kill`](#kill) | Kill a running child process | `boolean` |
| [`running`](#running) | Check if a child process is still running | `boolean` |

## Functions

### exec

Execute a shell command asynchronously and return stdout, stderr, and exit code

**Module:** `child` | **Returns:** `Object` -- Object with stdout, stderr, exitCode

```robinpath
child.exec "ls -la /tmp"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | Yes | The shell command to execute |

---

### execSync

Execute a shell command synchronously and return the output as a string

**Module:** `child` | **Returns:** `string` -- The command stdout output

```robinpath
child.execSync "date +%Y-%m-%d"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | Yes | The shell command to execute |

---

### spawn

Spawn a child process that runs in the background

**Module:** `child` | **Returns:** `Object` -- Process handle with pid

```robinpath
child.spawn "node" "server.js"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | Yes | The executable to run |
| `args` | `string` | No | Arguments to pass to the command |

---

### wait

Wait for a spawned process to complete and return its result

**Module:** `child` | **Returns:** `Object` -- Object with exitCode, stdout, stderr

```robinpath
child.wait $process
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `process` | `Object` | Yes | The process handle from spawn |

---

### kill

Kill a running child process

**Module:** `child` | **Returns:** `boolean` -- True if process was killed

```robinpath
child.kill $process
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `process` | `Object` | Yes | The process handle to kill |

---

### running

Check if a child process is still running

**Module:** `child` | **Returns:** `boolean` -- True if process is running

```robinpath
child.running $process
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `process` | `Object` | Yes | The process handle to check |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| Command not found | The specified command does not exist |
| Permission denied | Insufficient permissions to execute |
| Process exited with non-zero | Command failed with error code |

```robinpath
@desc "Run a command safely"
do
  set $result as child.exec "git status"
  if $result.exitCode == 0
    print $result.stdout
  else
    print "Error: " + $result.stderr
  end
enddo
```

## Recipes

### 1. Run a command and process output

Execute a command and work with its output.

```robinpath
@desc "Get disk usage info"
do
  set $result as child.exec "df -h /"
  set $lines as string.split $result.stdout "\n"
  each $line in $lines
    print $line
  endeach
enddo
```

### 2. Spawn a background process and wait

Start a process, do other work, then wait for it.

```robinpath
@desc "Run build in background"
do
  set $build as child.spawn "npm" "run build"
  print "Build started with PID: " + $build.pid
  print "Doing other work while build runs..."
  set $result as child.wait $build
  if $result.exitCode == 0
    print "Build completed successfully"
  else
    print "Build failed: " + $result.stderr
  end
enddo
```

### 3. Chain multiple commands

Run commands sequentially using their outputs.

```robinpath
@desc "Git commit workflow"
do
  set $status as child.execSync "git status --porcelain"
  if string.length $status > 0
    child.execSync "git add -A"
    child.execSync "git commit -m 'Auto commit'"
    print "Changes committed"
  else
    print "No changes to commit"
  end
enddo
```

## Related Modules

- **process** -- Current process info and environment
- **file** -- File system operations
