---
title: "Path"
module: "path"
package: "@robinpath/path"
description: "Path manipulation utilities for joining, resolving, and parsing file paths"
category: "utility"
tags: [path, utility]
type: "utility"
auth: "none"
functionCount: 10
---

# Path

> Path manipulation utilities for joining, resolving, and parsing file paths

**Package:** `@robinpath/path` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `path` module when you need to:

- **Join path segments into a single path** -- Use `path.join` to perform this operation
- **Resolve a sequence of paths into an absolute path** -- Use `path.resolve` to perform this operation
- **Get the directory name of a path** -- Use `path.dirname` to perform this operation
- **Get the last portion of a path (filename)** -- Use `path.basename` to perform this operation
- **Get the file extension of a path** -- Use `path.extname` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`join`](#join) | Join path segments into a single path | `The joined path string` |
| [`resolve`](#resolve) | Resolve a sequence of paths into an absolute path | `The resolved absolute path` |
| [`dirname`](#dirname) | Get the directory name of a path | `The directory portion of the path` |
| [`basename`](#basename) | Get the last portion of a path (filename) | `The last portion of the path` |
| [`extname`](#extname) | Get the file extension of a path | `The extension of the file including the dot` |
| [`normalize`](#normalize) | Normalize a path, resolving '..' and '.' segments | `The normalized path` |
| [`isAbsolute`](#isabsolute) | Check whether a path is absolute | `True if the path is absolute, false otherwise` |
| [`relative`](#relative) | Compute the relative path from one path to another | `The relative path from 'from' to 'to'` |
| [`parse`](#parse) | Parse a path into an object with root, dir, base, ext, and name | `An object with root, dir, base, ext, and name properties` |
| [`separator`](#separator) | Get the platform-specific path segment separator | `The OS path separator (/ on POSIX, \ on Windows)` |


## Functions

### join

Join path segments into a single path

**Module:** `path` | **Returns:** `string` -- The joined path string

```robinpath
path.join "/usr" "local" "bin"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `segments` | `string` | Yes | Path segments to join |

---

### resolve

Resolve a sequence of paths into an absolute path

**Module:** `path` | **Returns:** `string` -- The resolved absolute path

```robinpath
path.resolve "src" "index.ts"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `segments` | `string` | Yes | Path segments to resolve |

---

### dirname

Get the directory name of a path

**Module:** `path` | **Returns:** `string` -- The directory portion of the path

```robinpath
path.dirname "/usr/local/bin/node"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | The file path |

---

### basename

Get the last portion of a path (filename)

**Module:** `path` | **Returns:** `string` -- The last portion of the path

```robinpath
path.basename "/usr/local/bin/node"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | The file path |
| `ext` | `string` | No | Optional extension to remove from the result |

---

### extname

Get the file extension of a path

**Module:** `path` | **Returns:** `string` -- The extension of the file including the dot

```robinpath
path.extname "index.html"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | The file path |

---

### normalize

Normalize a path, resolving '..' and '.' segments

**Module:** `path` | **Returns:** `string` -- The normalized path

```robinpath
path.normalize "/usr/local/../bin"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | The path to normalize |

---

### isAbsolute

Check whether a path is absolute

**Module:** `path` | **Returns:** `boolean` -- True if the path is absolute, false otherwise

```robinpath
path.isAbsolute "/usr/local"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | The path to check |

---

### relative

Compute the relative path from one path to another

**Module:** `path` | **Returns:** `string` -- The relative path from 'from' to 'to'

```robinpath
path.relative "/usr/local" "/usr/local/bin/node"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `from` | `string` | Yes | The base path |
| `to` | `string` | Yes | The target path |

---

### parse

Parse a path into an object with root, dir, base, ext, and name

**Module:** `path` | **Returns:** `object` -- An object with root, dir, base, ext, and name properties

```robinpath
path.parse "/home/user/file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | The path to parse |

---

### separator

Get the platform-specific path segment separator

**Module:** `path` | **Returns:** `string` -- The OS path separator (/ on POSIX, \ on Windows)

```robinpath
path.separator
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
set $result as path.join "/usr" "local" "bin"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Path workflow

Chain multiple path operations together.

```robinpath
set $r_join as path.join "/usr" "local" "bin"
set $r_resolve as path.resolve "src" "index.ts"
set $r_dirname as path.dirname "/usr/local/bin/node"
print "All operations complete"
```

### 2. Safe join with validation

Check results before proceeding.

```robinpath
set $result as path.join "/usr" "local" "bin"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
