---
title: "OS"
module: "os"
package: "@robinpath/os"
description: "System information: hostname, platform, architecture, CPU, memory, network, and more"
category: "other"
tags: [os, other]
type: "utility"
auth: "none"
functionCount: 15
---

# OS

> System information: hostname, platform, architecture, CPU, memory, network, and more

**Package:** `@robinpath/os` | **Category:** Other | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `os` module when you need to:

- **Get the system hostname** -- Use `os.hostname` to perform this operation
- **Get the OS platform (linux, darwin, win32)** -- Use `os.platform` to perform this operation
- **Get the CPU architecture** -- Use `os.arch` to perform this operation
- **Get CPU information** -- Use `os.cpus` to perform this operation
- **Get the number of CPU cores** -- Use `os.cpuCount` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`hostname`](#hostname) | Get the system hostname | `Hostname` |
| [`platform`](#platform) | Get the OS platform (linux, darwin, win32) | `Platform string` |
| [`arch`](#arch) | Get the CPU architecture | `Architecture (x64, arm64, etc.)` |
| [`cpus`](#cpus) | Get CPU information | `Array of {model, speed} objects` |
| [`cpuCount`](#cpucount) | Get the number of CPU cores | `Number of CPUs` |
| [`totalMemory`](#totalmemory) | Get total system memory in bytes | `Total memory in bytes` |
| [`freeMemory`](#freememory) | Get free system memory in bytes | `Free memory in bytes` |
| [`uptime`](#uptime) | Get system uptime in seconds | `Uptime in seconds` |
| [`homeDir`](#homedir) | Get the user home directory | `Home directory path` |
| [`tempDir`](#tempdir) | Get the OS temp directory | `Temp directory path` |
| [`userInfo`](#userinfo) | Get current user information | `{username, homedir, shell}` |
| [`networkInterfaces`](#networkinterfaces) | Get network interface information | `Object of interface arrays` |
| [`type`](#type) | Get the OS type (Linux, Darwin, Windows_NT) | `OS type string` |
| [`release`](#release) | Get the OS release version | `OS release string` |
| [`eol`](#eol) | Get the OS end-of-line marker | `EOL string (\n or \r\n)` |


## Functions

### hostname

Get the system hostname

**Module:** `os` | **Returns:** `string` -- Hostname

```robinpath
os.hostname
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### platform

Get the OS platform (linux, darwin, win32)

**Module:** `os` | **Returns:** `string` -- Platform string

```robinpath
os.platform
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### arch

Get the CPU architecture

**Module:** `os` | **Returns:** `string` -- Architecture (x64, arm64, etc.)

```robinpath
os.arch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### cpus

Get CPU information

**Module:** `os` | **Returns:** `array` -- Array of {model, speed} objects

```robinpath
os.cpus
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### cpuCount

Get the number of CPU cores

**Module:** `os` | **Returns:** `number` -- Number of CPUs

```robinpath
os.cpuCount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### totalMemory

Get total system memory in bytes

**Module:** `os` | **Returns:** `number` -- Total memory in bytes

```robinpath
os.totalMemory
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### freeMemory

Get free system memory in bytes

**Module:** `os` | **Returns:** `number` -- Free memory in bytes

```robinpath
os.freeMemory
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### uptime

Get system uptime in seconds

**Module:** `os` | **Returns:** `number` -- Uptime in seconds

```robinpath
os.uptime
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### homeDir

Get the user home directory

**Module:** `os` | **Returns:** `string` -- Home directory path

```robinpath
os.homeDir
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### tempDir

Get the OS temp directory

**Module:** `os` | **Returns:** `string` -- Temp directory path

```robinpath
os.tempDir
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### userInfo

Get current user information

**Module:** `os` | **Returns:** `object` -- {username, homedir, shell}

```robinpath
os.userInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### networkInterfaces

Get network interface information

**Module:** `os` | **Returns:** `object` -- Object of interface arrays

```robinpath
os.networkInterfaces
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### type

Get the OS type (Linux, Darwin, Windows_NT)

**Module:** `os` | **Returns:** `string` -- OS type string

```robinpath
os.type
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### release

Get the OS release version

**Module:** `os` | **Returns:** `string` -- OS release string

```robinpath
os.release
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### eol

Get the OS end-of-line marker

**Module:** `os` | **Returns:** `string` -- EOL string (\n or \r\n)

```robinpath
os.eol
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
set $result as os.hostname
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step OS workflow

Chain multiple os operations together.

```robinpath
set $r_hostname as os.hostname
set $r_platform as os.platform
set $r_arch as os.arch
print "All operations complete"
```

### 2. Safe hostname with validation

Check results before proceeding.

```robinpath
set $result as os.hostname
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
