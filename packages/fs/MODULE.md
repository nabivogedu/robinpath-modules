---
title: "Fs"
module: "fs"
package: "@robinpath/fs"
description: "Read, write, copy, move, and manage files and directories"
category: "utility"
tags: [fs, utility]
type: "utility"
auth: "none"
functionCount: 14
---

# Fs

> Read, write, copy, move, and manage files and directories

**Package:** `@robinpath/fs` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `fs` module when you need to:

- **Read the contents of a file as a string** -- Use `fs.read` to perform this operation
- **Write content to a file, creating or overwriting it** -- Use `fs.write` to perform this operation
- **Append content to the end of a file** -- Use `fs.append` to perform this operation
- **Check whether a file or directory exists at the given path** -- Use `fs.exists` to perform this operation
- **Delete a file** -- Use `fs.delete` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`read`](#read) | Read the contents of a file as a string | `The file contents as a string` |
| [`write`](#write) | Write content to a file, creating or overwriting it | `True if the write succeeded` |
| [`append`](#append) | Append content to the end of a file | `True if the append succeeded` |
| [`exists`](#exists) | Check whether a file or directory exists at the given path | `True if the path exists, false otherwise` |
| [`delete`](#delete) | Delete a file | `True if the file was deleted` |
| [`copy`](#copy) | Copy a file from source to destination | `True if the copy succeeded` |
| [`move`](#move) | Move or rename a file from source to destination | `True if the move succeeded` |
| [`rename`](#rename) | Rename a file (alias for move) | `True if the rename succeeded` |
| [`list`](#list) | List the contents of a directory | `Array of filenames in the directory` |
| [`mkdir`](#mkdir) | Create a directory (recursively creates parent directories) | `True if the directory was created` |
| [`rmdir`](#rmdir) | Remove a directory and its contents | `True if the directory was removed` |
| [`stat`](#stat) | Get file or directory statistics | `Object with size, isFile, isDirectory, created, and modified properties` |
| [`isFile`](#isfile) | Check whether a path points to a regular file | `True if the path is a regular file, false otherwise` |
| [`isDir`](#isdir) | Check whether a path points to a directory | `True if the path is a directory, false otherwise` |


## Functions

### read

Read the contents of a file as a string

**Module:** `fs` | **Returns:** `string` -- The file contents as a string

```robinpath
any "/tmp/file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Absolute or relative path to the file |
| `encoding` | `string` | No | Character encoding (default: utf-8) |

---

### write

Write content to a file, creating or overwriting it

**Module:** `fs` | **Returns:** `boolean` -- True if the write succeeded

```robinpath
any "/tmp/file.txt" "hello world"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Absolute or relative path to the file |
| `content` | `string` | Yes | The content to write |

---

### append

Append content to the end of a file

**Module:** `fs` | **Returns:** `boolean` -- True if the append succeeded

```robinpath
any "/tmp/file.txt" "more text"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Absolute or relative path to the file |
| `content` | `string` | Yes | The content to append |

---

### exists

Check whether a file or directory exists at the given path

**Module:** `fs` | **Returns:** `boolean` -- True if the path exists, false otherwise

```robinpath
any "/tmp/file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Absolute or relative path to check |

---

### delete

Delete a file

**Module:** `fs` | **Returns:** `boolean` -- True if the file was deleted

```robinpath
any "/tmp/file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Absolute or relative path to the file to delete |

---

### copy

Copy a file from source to destination

**Module:** `fs` | **Returns:** `boolean` -- True if the copy succeeded

```robinpath
any "/tmp/a.txt" "/tmp/b.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `src` | `string` | Yes | Path to the source file |
| `dest` | `string` | Yes | Path to the destination file |

---

### move

Move or rename a file from source to destination

**Module:** `fs` | **Returns:** `boolean` -- True if the move succeeded

```robinpath
any "/tmp/old.txt" "/tmp/new.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `src` | `string` | Yes | Path to the source file |
| `dest` | `string` | Yes | Path to the destination file |

---

### rename

Rename a file (alias for move)

**Module:** `fs` | **Returns:** `boolean` -- True if the rename succeeded

```robinpath
any "/tmp/old.txt" "/tmp/new.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `oldPath` | `string` | Yes | Current file path |
| `newPath` | `string` | Yes | New file path |

---

### list

List the contents of a directory

**Module:** `fs` | **Returns:** `array` -- Array of filenames in the directory

```robinpath
any "/tmp"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dir` | `string` | Yes | Path to the directory to list |

---

### mkdir

Create a directory (recursively creates parent directories)

**Module:** `fs` | **Returns:** `boolean` -- True if the directory was created

```robinpath
any "/tmp/my/nested/dir"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path of the directory to create |

---

### rmdir

Remove a directory and its contents

**Module:** `fs` | **Returns:** `boolean` -- True if the directory was removed

```robinpath
any "/tmp/my/dir"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path of the directory to remove |

---

### stat

Get file or directory statistics

**Module:** `fs` | **Returns:** `object` -- Object with size, isFile, isDirectory, created, and modified properties

```robinpath
any "/tmp/file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to the file or directory |

---

### isFile

Check whether a path points to a regular file

**Module:** `fs` | **Returns:** `boolean` -- True if the path is a regular file, false otherwise

```robinpath
any "/tmp/file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to check |

---

### isDir

Check whether a path points to a directory

**Module:** `fs` | **Returns:** `boolean` -- True if the path is a directory, false otherwise

```robinpath
any "/tmp"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to check |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as any "/tmp/file.txt"
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
set $result as any "/tmp"
each $item in $result
  print $item
end
```

### 2. Multi-step Fs workflow

Chain multiple fs operations together.

```robinpath
set $r_read as any "/tmp/file.txt"
set $r_write as any "/tmp/file.txt" "hello world"
set $r_append as any "/tmp/file.txt" "more text"
print "All operations complete"
```

### 3. Safe read with validation

Check results before proceeding.

```robinpath
set $result as any "/tmp/file.txt"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
