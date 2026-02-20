---
title: "Shell"
module: "shell"
package: "@robinpath/shell"
description: "Execute shell commands, inspect the process environment, and query system information"
category: "other"
tags: [shell, other]
type: "utility"
auth: "none"
functionCount: 10
---

# Shell

> Execute shell commands, inspect the process environment, and query system information

**Package:** `@robinpath/shell` | **Category:** Other | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `shell` module when you need to:

- **Execute a command string in the system shell and return stdout, stderr, and exitCode** -- Use `shell.exec` to perform this operation
- **Execute a command string in the system shell and return trimmed stdout. Throws on non-zero exit** -- Use `shell.run` to perform this operation
- **Execute a file directly without a shell and return stdout, stderr, and exitCode** -- Use `shell.execFile` to perform this operation
- **Find the full path of a command using which (or where on Windows)** -- Use `shell.which` to perform this operation
- **Get a copy of all current environment variables** -- Use `shell.env` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`exec`](#exec) | Execute a command string in the system shell and return stdout, stderr, and exitCode | `Object with stdout, stderr, and exitCode properties` |
| [`run`](#run) | Execute a command string in the system shell and return trimmed stdout. Throws on non-zero exit | `The trimmed stdout output of the command` |
| [`execFile`](#execfile) | Execute a file directly without a shell and return stdout, stderr, and exitCode | `Object with stdout, stderr, and exitCode properties` |
| [`which`](#which) | Find the full path of a command using which (or where on Windows) | `The absolute path to the executable, or null if not found` |
| [`env`](#env) | Get a copy of all current environment variables | `A plain object containing all environment variable key-value pairs` |
| [`cwd`](#cwd) | Get the current working directory | `The absolute path of the current working directory` |
| [`exit`](#exit) | Exit the current process with a given exit code | `Does not return; the process exits immediately` |
| [`pid`](#pid) | Get the process ID of the current process | `The numeric process ID` |
| [`platform`](#platform) | Get the operating system platform identifier | `The platform string (e.g. 'win32', 'linux', 'darwin')` |
| [`uptime`](#uptime) | Get the number of seconds the current process has been running | `Process uptime in seconds` |


## Functions

### exec

Execute a command string in the system shell and return stdout, stderr, and exitCode

**Module:** `shell` | **Returns:** `object` -- Object with stdout, stderr, and exitCode properties

```robinpath
shell.exec "ls -la"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | Yes | The shell command to execute |

---

### run

Execute a command string in the system shell and return trimmed stdout. Throws on non-zero exit

**Module:** `shell` | **Returns:** `string` -- The trimmed stdout output of the command

```robinpath
shell.run "echo hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | Yes | The shell command to execute |

---

### execFile

Execute a file directly without a shell and return stdout, stderr, and exitCode

**Module:** `shell` | **Returns:** `object` -- Object with stdout, stderr, and exitCode properties

```robinpath
shell.execFile "/usr/bin/node" ["--version"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | `string` | Yes | Path to the executable file |
| `args` | `array` | No | Array of string arguments to pass to the executable |

---

### which

Find the full path of a command using which (or where on Windows)

**Module:** `shell` | **Returns:** `string` -- The absolute path to the executable, or null if not found

```robinpath
shell.which "node"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | `string` | Yes | Name of the command to locate |

---

### env

Get a copy of all current environment variables

**Module:** `shell` | **Returns:** `object` -- A plain object containing all environment variable key-value pairs

```robinpath
shell.env
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### cwd

Get the current working directory

**Module:** `shell` | **Returns:** `string` -- The absolute path of the current working directory

```robinpath
shell.cwd
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### exit

Exit the current process with a given exit code

**Module:** `shell` | **Returns:** `string` -- Does not return; the process exits immediately

```robinpath
shell.exit 0
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | `number` | No | Exit code (default: 0) |

---

### pid

Get the process ID of the current process

**Module:** `shell` | **Returns:** `number` -- The numeric process ID

```robinpath
shell.pid
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### platform

Get the operating system platform identifier

**Module:** `shell` | **Returns:** `string` -- The platform string (e.g. 'win32', 'linux', 'darwin')

```robinpath
shell.platform
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### uptime

Get the number of seconds the current process has been running

**Module:** `shell` | **Returns:** `number` -- Process uptime in seconds

```robinpath
shell.uptime
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as shell.exec "ls -la"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Shell workflow

Chain multiple shell operations together.

```robinpath
set $r_exec as shell.exec "ls -la"
set $r_run as shell.run "echo hello"
set $r_execFile as shell.execFile "/usr/bin/node" ["--version"]
print "All operations complete"
```

### 2. Safe exec with validation

Check results before proceeding.

```robinpath
set $result as shell.exec "ls -la"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
