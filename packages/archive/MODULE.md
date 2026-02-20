---
title: "Archive"
module: "archive"
package: "@robinpath/archive"
description: "Create, extract, and manipulate .zip and .any archives"
category: "other"
tags: [archive, other]
type: "utility"
auth: "none"
functionCount: 8
---

# Archive

> Create, extract, and manipulate .zip and .any archives

**Package:** `@robinpath/archive` | **Category:** Other | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `archive` module when you need to:

- **Create a .zip archive from files and directories** -- Use `archive.createZip` to perform this operation
- **Extract a .zip archive** -- Use `archive.extractZip` to perform this operation
- **List entries in a .zip file** -- Use `archive.listZip` to perform this operation
- **Read a file from inside a .zip without extracting** -- Use `archive.readFromZip` to perform this operation
- **Create a .any archive** -- Use `archive.createTarGz` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`createZip`](#createzip) | Create a .zip archive from files and directories | `{path, size, files}` |
| [`extractZip`](#extractzip) | Extract a .zip archive | `{path, files, entries}` |
| [`listZip`](#listzip) | List entries in a .zip file | `Array of entry info` |
| [`readFromZip`](#readfromzip) | Read a file from inside a .zip without extracting | `File contents as string` |
| [`createTarGz`](#createtargz) | Create a .any archive | `{path}` |
| [`extractTarGz`](#extracttargz) | Extract a .any archive | `{path}` |
| [`addToZip`](#addtozip) | Add a file or directory to an existing .zip | `{path, added}` |
| [`removeFromZip`](#removefromzip) | Remove an entry from a .zip | `True` |


## Functions

### createZip

Create a .zip archive from files and directories

**Module:** `archive` | **Returns:** `object` -- {path, size, files}

```robinpath
archive.createZip "./backup.zip" ["./src", "./package.json"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `output` | `string` | Yes | Output .zip path |
| `sources` | `array` | Yes | Files/dirs to archive |
| `options` | `object` | No | {level: 1-9} |

---

### extractZip

Extract a .zip archive

**Module:** `archive` | **Returns:** `object` -- {path, files, entries}

```robinpath
archive.extractZip "./backup.zip" "./restored"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `zipPath` | `string` | Yes | .zip file path |
| `outputDir` | `string` | Yes | Extraction directory |

---

### listZip

List entries in a .zip file

**Module:** `archive` | **Returns:** `array` -- Array of entry info

```robinpath
archive.listZip "./backup.zip"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `zipPath` | `string` | Yes | .zip file path |

---

### readFromZip

Read a file from inside a .zip without extracting

**Module:** `archive` | **Returns:** `string` -- File contents as string

```robinpath
archive.readFromZip "./backup.zip" "config.json"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `zipPath` | `string` | Yes | .zip file path |
| `entry` | `string` | Yes | Entry name |

---

### createTarGz

Create a .any archive

**Module:** `archive` | **Returns:** `object` -- {path}

```robinpath
archive.createTarGz "./backup.any" "./src"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `output` | `string` | Yes | Output path |
| `source` | `string` | Yes | Source dir/file |

---

### extractTarGz

Extract a .any archive

**Module:** `archive` | **Returns:** `object` -- {path}

```robinpath
archive.extractTarGz "./backup.any" "./restored"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tarPath` | `string` | Yes | .any path |
| `outputDir` | `string` | Yes | Extraction directory |

---

### addToZip

Add a file or directory to an existing .zip

**Module:** `archive` | **Returns:** `object` -- {path, added}

```robinpath
archive.addToZip "./backup.zip" "./newfile.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `zipPath` | `string` | Yes | .zip file path |
| `filePath` | `string` | Yes | File to add |
| `entryName` | `string` | No | Name inside zip |

---

### removeFromZip

Remove an entry from a .zip

**Module:** `archive` | **Returns:** `boolean` -- True

```robinpath
archive.removeFromZip "./backup.zip" "old.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `zipPath` | `string` | Yes | .zip file path |
| `entry` | `string` | Yes | Entry name to remove |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as archive.createZip "./backup.zip" ["./src", "./package.json"]
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Zip

Retrieve all items and loop through them.

```robinpath
set $result as archive.listZip "./backup.zip"
each $item in $result
  print $item
end
```

### 2. Create a new item with createZip

Create a new resource and capture the result.

```robinpath
set $result as archive.createZip "./backup.zip" ["./src", "./package.json"]
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as archive.listZip "./backup.zip"
if $existing == null
  archive.createZip "./backup.zip" ["./src", "./package.json"]
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Archive workflow

Chain multiple archive operations together.

```robinpath
set $r_createZip as archive.createZip "./backup.zip" ["./src", "./package.json"]
set $r_extractZip as archive.extractZip "./backup.zip" "./restored"
set $r_listZip as archive.listZip "./backup.zip"
print "All operations complete"
```

### 5. Safe createZip with validation

Check results before proceeding.

```robinpath
set $result as archive.createZip "./backup.zip" ["./src", "./package.json"]
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
