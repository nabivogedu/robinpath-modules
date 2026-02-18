---
title: "Stream"
module: "stream"
package: "@robinpath/stream"
description: "Stream processing for large files: read, write, transform, filter, split, concat, hash without loading into memory"
category: "infrastructure"
tags: [stream, infrastructure]
type: "utility"
auth: "none"
functionCount: 13
---

# Stream

> Stream processing for large files: read, write, transform, filter, split, concat, hash without loading into memory

**Package:** `@robinpath/stream` | **Category:** Infrastructure | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `stream` module when you need to:

- **Read entire file content** -- Use `stream.readFile` to perform this operation
- **Write data to file** -- Use `stream.writeFile` to perform this operation
- **Stream-copy a file** -- Use `stream.copyFile` to perform this operation
- **Read file line by line into array** -- Use `stream.lines` to perform this operation
- **Transform file line by line** -- Use `stream.transform` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`readFile`](#readfile) | Read entire file content | `File content` |
| [`writeFile`](#writefile) | Write data to file | `{path, size}` |
| [`copyFile`](#copyfile) | Stream-copy a file | `{src, dest, size}` |
| [`lines`](#lines) | Read file line by line into array | `Array of lines` |
| [`transform`](#transform) | Transform file line by line | `{inputPath, outputPath, linesProcessed}` |
| [`filter`](#filter) | Filter file lines by regex pattern | `{totalLines, matchedLines}` |
| [`concat`](#concat) | Concatenate multiple files | `{outputPath, filesConcatenated, size}` |
| [`split`](#split) | Split file into chunks | `{outputFiles, totalLines, chunks}` |
| [`count`](#count) | Count lines in file | `Line count` |
| [`head`](#head) | Read first N lines | `First N lines` |
| [`tail`](#tail) | Read last N lines | `Last N lines` |
| [`pipe`](#pipe) | Download URL to file via stream | `{path, size}` |
| [`hash`](#hash) | Stream-hash a file | `Hex hash string` |


## Functions

### readFile

Read entire file content

**Module:** `stream` | **Returns:** `string` -- File content

```robinpath
stream.readFile "./data.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | File path |
| `options` | `object` | No | {encoding} |

---

### writeFile

Write data to file

**Module:** `stream` | **Returns:** `object` -- {path, size}

```robinpath
stream.writeFile "./out.txt" "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | File path |
| `data` | `string` | Yes | Content to write |

---

### copyFile

Stream-copy a file

**Module:** `stream` | **Returns:** `object` -- {src, dest, size}

```robinpath
stream.copyFile "./a.txt" "./b.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `src` | `string` | Yes | Source path |
| `dest` | `string` | Yes | Destination path |

---

### lines

Read file line by line into array

**Module:** `stream` | **Returns:** `array` -- Array of lines

```robinpath
stream.lines "./data.csv"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | File path |

---

### transform

Transform file line by line

**Module:** `stream` | **Returns:** `object` -- {inputPath, outputPath, linesProcessed}

```robinpath
stream.transform "./in.txt" "./out.txt" "uppercase"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `inputPath` | `string` | Yes | Input file |
| `outputPath` | `string` | Yes | Output file |
| `type` | `string` | Yes | uppercase|lowercase|trim|prefix|suffix|replace |
| `args` | `object` | No | {prefix, suffix, search, replace} |

---

### filter

Filter file lines by regex pattern

**Module:** `stream` | **Returns:** `object` -- {totalLines, matchedLines}

```robinpath
stream.filter "./log.txt" "./errors.txt" "ERROR"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `inputPath` | `string` | Yes | Input file |
| `outputPath` | `string` | Yes | Output file |
| `pattern` | `string` | Yes | Regex pattern |

---

### concat

Concatenate multiple files

**Module:** `stream` | **Returns:** `object` -- {outputPath, filesConcatenated, size}

```robinpath
stream.concat ["a.txt", "b.txt"] "merged.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `inputPaths` | `array` | Yes | Array of file paths |
| `outputPath` | `string` | Yes | Output file |

---

### split

Split file into chunks

**Module:** `stream` | **Returns:** `object` -- {outputFiles, totalLines, chunks}

```robinpath
stream.split "./big.csv" "./chunks" 1000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `inputPath` | `string` | Yes | Input file |
| `outputDir` | `string` | Yes | Output directory |
| `linesPerChunk` | `number` | No | Lines per chunk |

---

### count

Count lines in file

**Module:** `stream` | **Returns:** `number` -- Line count

```robinpath
stream.count "./data.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | File path |

---

### head

Read first N lines

**Module:** `stream` | **Returns:** `string` -- First N lines

```robinpath
stream.head "./data.txt" 20
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | File path |
| `n` | `number` | No | Number of lines (default 10) |

---

### tail

Read last N lines

**Module:** `stream` | **Returns:** `string` -- Last N lines

```robinpath
stream.tail "./log.txt" 50
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | File path |
| `n` | `number` | No | Number of lines (default 10) |

---

### pipe

Download URL to file via stream

**Module:** `stream` | **Returns:** `object` -- {path, size}

```robinpath
stream.pipe "https://example.com/file.zip" "./file.zip"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | URL to download |
| `outputPath` | `string` | Yes | Output file path |
| `options` | `object` | No | {headers} |

---

### hash

Stream-hash a file

**Module:** `stream` | **Returns:** `string` -- Hex hash string

```robinpath
stream.hash "./data.bin" "sha256"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | File path |
| `algorithm` | `string` | No | Hash algorithm (default sha256) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `HTTP ${response.status}: ${response.statusText}` | Check the error message for details |

```robinpath
set $result as stream.readFile "./data.txt"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Stream workflow

Chain multiple stream operations together.

```robinpath
set $r_readFile as stream.readFile "./data.txt"
set $r_writeFile as stream.writeFile "./out.txt" "hello"
set $r_copyFile as stream.copyFile "./a.txt" "./b.txt"
print "All operations complete"
```

### 2. Safe readFile with validation

Check results before proceeding.

```robinpath
set $result as stream.readFile "./data.txt"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
