---
title: "File"
module: "file"
package: "@robinpath/file"
description: "Read, write, copy, move, delete, and manage files and directories"
category: "core"
tags: [file, filesystem, io, core]
type: "builtin"
auth: "none"
functionCount: 22
---

# File

> Read, write, copy, move, delete, and manage files and directories

**Package:** `@robinpath/file` | **Category:** Core | **Type:** Built-in

## Authentication

No authentication required. All functions are available immediately.

## Use Cases

Use the `file` module when you need to:

- **Read text from a file** -- Use `file.read` to load file contents as a string
- **Write text to a file** -- Use `file.write` to create or overwrite a file
- **Append text to an existing file** -- Use `file.append` to add content without overwriting
- **Delete a file** -- Use `file.delete` to remove a file from disk
- **List files in a directory** -- Use `file.list` to get directory contents
- **Copy or move files** -- Use `file.copy` or `file.move` to relocate files
- **Read/write JSON files** -- Use `file.readJSON` and `file.writeJSON` for structured data
- **Check if a file or directory exists** -- Use `file.exists`, `file.isFile`, `file.isDir`
- **Get file metadata** -- Use `file.stat` or `file.size` for file information

## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`read`](#read) | Read file contents as a string | `string` |
| [`readBinary`](#readbinary) | Read file contents as binary data | `Buffer` |
| [`write`](#write) | Write text to a file (creates or overwrites) | `boolean` |
| [`writeBinary`](#writebinary) | Write binary data to a file | `boolean` |
| [`append`](#append) | Append text to end of file | `boolean` |
| [`delete`](#delete) | Delete a file | `boolean` |
| [`exists`](#exists) | Check if a file or directory exists | `boolean` |
| [`copy`](#copy) | Copy a file to a new location | `boolean` |
| [`move`](#move) | Move a file to a new location | `boolean` |
| [`rename`](#rename) | Rename a file | `boolean` |
| [`list`](#list) | List files and directories in a path | `Array` |
| [`stat`](#stat) | Get file metadata (size, dates, type) | `Object` |
| [`mkdir`](#mkdir) | Create a directory (recursive) | `boolean` |
| [`readJSON`](#readjson) | Read and parse a JSON file | `Object` |
| [`writeJSON`](#writejson) | Write an object as JSON to a file | `boolean` |
| [`size`](#size) | Get file size in bytes | `number` |
| [`isFile`](#isfile) | Check if path is a file | `boolean` |
| [`isDir`](#isdir) | Check if path is a directory | `boolean` |
| [`lines`](#lines) | Read file as an array of lines | `Array` |
| [`lineCount`](#linecount) | Count lines in a file | `number` |
| [`temp`](#temp) | Get the system temp directory path | `string` |
| [`cwd`](#cwd) | Get the current working directory | `string` |

## Functions

### read

Read file contents as a string

**Module:** `file` | **Returns:** `string` -- The file contents as text

```robinpath
file.read "/path/to/file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to the file to read |

---

### readBinary

Read file contents as binary data

**Module:** `file` | **Returns:** `Buffer` -- The file contents as binary

```robinpath
file.readBinary "/path/to/image.png"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to the file to read |

---

### write

Write text to a file, creating it if it does not exist or overwriting if it does

**Module:** `file` | **Returns:** `boolean` -- True if write succeeded

```robinpath
file.write "/path/to/file.txt" "Hello, world!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to the file to write |
| `content` | `string` | Yes | The text content to write |

---

### writeBinary

Write binary data to a file

**Module:** `file` | **Returns:** `boolean` -- True if write succeeded

```robinpath
file.writeBinary "/path/to/output.bin" $binaryData
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to the file to write |
| `data` | `Buffer` | Yes | The binary data to write |

---

### append

Append text to the end of a file

**Module:** `file` | **Returns:** `boolean` -- True if append succeeded

```robinpath
file.append "/path/to/log.txt" "New log entry\n"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to the file to append to |
| `content` | `string` | Yes | The text content to append |

---

### delete

Delete a file from disk

**Module:** `file` | **Returns:** `boolean` -- True if file was deleted

```robinpath
file.delete "/path/to/old-file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to the file to delete |

---

### exists

Check if a file or directory exists at the given path

**Module:** `file` | **Returns:** `boolean` -- True if path exists

```robinpath
file.exists "/path/to/check"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to check |

---

### copy

Copy a file to a new location

**Module:** `file` | **Returns:** `boolean` -- True if copy succeeded

```robinpath
file.copy "/source/file.txt" "/dest/file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `source` | `string` | Yes | Source file path |
| `destination` | `string` | Yes | Destination file path |

---

### move

Move a file to a new location

**Module:** `file` | **Returns:** `boolean` -- True if move succeeded

```robinpath
file.move "/old/location.txt" "/new/location.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `source` | `string` | Yes | Source file path |
| `destination` | `string` | Yes | Destination file path |

---

### rename

Rename a file

**Module:** `file` | **Returns:** `boolean` -- True if rename succeeded

```robinpath
file.rename "/path/to/old-name.txt" "new-name.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Current file path |
| `newName` | `string` | Yes | New file name |

---

### list

List files and directories in a directory

**Module:** `file` | **Returns:** `Array` -- Array of file and directory names

```robinpath
file.list "/path/to/directory"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Directory path to list |

---

### stat

Get file metadata including size, creation date, and modification date

**Module:** `file` | **Returns:** `Object` -- Object with size, created, modified, isFile, isDir

```robinpath
file.stat "/path/to/file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to the file |

---

### mkdir

Create a directory, including any necessary parent directories

**Module:** `file` | **Returns:** `boolean` -- True if directory was created

```robinpath
file.mkdir "/path/to/new/directory"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Directory path to create |

---

### readJSON

Read a JSON file and parse it into an object

**Module:** `file` | **Returns:** `Object` -- The parsed JSON object

```robinpath
file.readJSON "/path/to/config.json"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to the JSON file |

---

### writeJSON

Write an object as formatted JSON to a file

**Module:** `file` | **Returns:** `boolean` -- True if write succeeded

```robinpath
file.writeJSON "/path/to/config.json" $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to write the JSON file |
| `data` | `Object` | Yes | The object to serialize as JSON |

---

### size

Get the size of a file in bytes

**Module:** `file` | **Returns:** `number` -- File size in bytes

```robinpath
file.size "/path/to/file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to the file |

---

### isFile

Check if a path points to a file (not a directory)

**Module:** `file` | **Returns:** `boolean` -- True if path is a file

```robinpath
file.isFile "/path/to/check"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to check |

---

### isDir

Check if a path points to a directory

**Module:** `file` | **Returns:** `boolean` -- True if path is a directory

```robinpath
file.isDir "/path/to/check"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to check |

---

### lines

Read a file and return its contents as an array of lines

**Module:** `file` | **Returns:** `Array` -- Array of strings, one per line

```robinpath
file.lines "/path/to/file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to the file |

---

### lineCount

Count the number of lines in a file

**Module:** `file` | **Returns:** `number` -- Number of lines

```robinpath
file.lineCount "/path/to/file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to the file |

---

### temp

Get the system temporary directory path

**Module:** `file` | **Returns:** `string` -- Path to the temp directory

```robinpath
file.temp
```

No parameters required.

---

### cwd

Get the current working directory

**Module:** `file` | **Returns:** `string` -- Current working directory path

```robinpath
file.cwd
```

No parameters required.

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| File not found | The specified path does not exist |
| Permission denied | Insufficient permissions to access the file |
| Directory not empty | Trying to delete a non-empty directory |

```robinpath
@desc "Read a file safely"
do
  set $content as file.read "/path/to/file.txt"
  if $content != null
    print "File has " + file.lineCount "/path/to/file.txt" + " lines"
  else
    print "Could not read file"
  end
enddo
```

## Recipes

### 1. Read, process, and write a file

Read a file, transform its contents, and write the result to a new file.

```robinpath
@desc "Convert a text file to uppercase"
do
  set $content as file.read "/input/data.txt"
  set $upper as string.toUpperCase $content
  file.write "/output/data-upper.txt" $upper
  print "File converted successfully"
enddo
```

### 2. List and filter files

List directory contents and process matching files.

```robinpath
@desc "Find and count all .txt files"
do
  set $files as file.list "/documents"
  set $count as 0
  each $f in $files
    if string.endsWith $f ".txt"
      set $count as $count + 1
      print "Found: " + $f
    end
  endeach
  print "Total .txt files: " + $count
enddo
```

### 3. Copy files with backup

Create a backup before overwriting.

```robinpath
@desc "Backup and update config"
do
  set $src as "/app/config.json"
  set $backup as "/app/config.backup.json"
  if file.exists $src
    file.copy $src $backup
    print "Backup created"
  end
  file.writeJSON $src { "version": 2, "debug": false }
  print "Config updated"
enddo
```

### 4. Read and write JSON config

Load a JSON config, modify it, and save it back.

```robinpath
@desc "Update application settings"
do
  set $config as file.readJSON "/app/settings.json"
  set $config.theme as "dark"
  set $config.language as "en"
  file.writeJSON "/app/settings.json" $config
  print "Settings updated"
enddo
```

### 5. Process file line by line

Read lines and filter specific content.

```robinpath
@desc "Extract error lines from a log file"
do
  set $allLines as file.lines "/var/log/app.log"
  set $errors as []
  each $line in $allLines
    if string.contains $line "ERROR"
      array.push $errors $line
    end
  endeach
  print "Found " + array.length $errors + " errors"
  file.write "/var/log/errors-only.log" array.join $errors "\n"
enddo
```

### 6. Create directory structure

Set up a project directory tree.

```robinpath
@desc "Initialize project directories"
do
  set $base as "/projects/my-app"
  file.mkdir $base + "/src"
  file.mkdir $base + "/tests"
  file.mkdir $base + "/docs"
  file.mkdir $base + "/config"
  file.write $base + "/README.md" "# My App\n\nA new project."
  file.writeJSON $base + "/config/default.json" { "name": "my-app", "version": "1.0.0" }
  print "Project initialized at " + $base
enddo
```

## Related Modules

- **path** -- Path manipulation and joining
- **stream** -- Stream-based file processing
- **crypto** -- Hash file contents
