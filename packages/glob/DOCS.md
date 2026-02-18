---
title: "Glob"
module: "glob"
package: "@robinpath/glob"
description: "File pattern matching: find files by glob patterns, test matches, expand braces"
category: "utility"
tags: [glob, utility]
type: "utility"
auth: "none"
functionCount: 6
---

# Glob

> File pattern matching: find files by glob patterns, test matches, expand braces

**Package:** `@robinpath/glob` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `glob` module when you need to:

- **Find files matching a glob pattern** -- Use `glob.match` to perform this operation
- **Test if a path matches a glob pattern** -- Use `glob.isMatch` to perform this operation
- **Convert a glob pattern to a regex string** -- Use `glob.toRegex` to perform this operation
- **Expand brace pattern into array** -- Use `glob.expand` to perform this operation
- **Extract non-glob base directory from pattern** -- Use `glob.base` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`match`](#match) | Find files matching a glob pattern | `Array of matching file paths` |
| [`isMatch`](#ismatch) | Test if a path matches a glob pattern | `True if matches` |
| [`toRegex`](#toregex) | Convert a glob pattern to a regex string | `Regex source string` |
| [`expand`](#expand) | Expand brace pattern into array | `Array of expanded strings` |
| [`base`](#base) | Extract non-glob base directory from pattern | `Base directory path` |
| [`hasMagic`](#hasmagic) | Check if string contains glob characters | `True if contains glob chars` |


## Functions

### match

Find files matching a glob pattern

**Module:** `glob` | **Returns:** `array` -- Array of matching file paths

```robinpath
glob.match "src/**/*.ts"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pattern` | `string` | Yes | Glob pattern (e.g. **/*.ts) |
| `cwd` | `string` | No | Working directory (default: .) |

---

### isMatch

Test if a path matches a glob pattern

**Module:** `glob` | **Returns:** `boolean` -- True if matches

```robinpath
glob.isMatch "src/index.ts" "**/*.ts"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | File path to test |
| `pattern` | `string` | Yes | Glob pattern |

---

### toRegex

Convert a glob pattern to a regex string

**Module:** `glob` | **Returns:** `string` -- Regex source string

```robinpath
glob.toRegex "*.ts"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pattern` | `string` | Yes | Glob pattern |

---

### expand

Expand brace pattern into array

**Module:** `glob` | **Returns:** `array` -- Array of expanded strings

```robinpath
glob.expand "file.{ts,js}"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pattern` | `string` | Yes | Pattern with braces (e.g. {a,b,c}) |

---

### base

Extract non-glob base directory from pattern

**Module:** `glob` | **Returns:** `string` -- Base directory path

```robinpath
glob.base "src/**/*.ts"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pattern` | `string` | Yes | Glob pattern |

---

### hasMagic

Check if string contains glob characters

**Module:** `glob` | **Returns:** `boolean` -- True if contains glob chars

```robinpath
glob.hasMagic "*.ts"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | `string` | Yes | String to check |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as glob.match "src/**/*.ts"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Glob workflow

Chain multiple glob operations together.

```robinpath
set $r_match as glob.match "src/**/*.ts"
set $r_isMatch as glob.isMatch "src/index.ts" "**/*.ts"
set $r_toRegex as glob.toRegex "*.ts"
print "All operations complete"
```

### 2. Safe match with validation

Check results before proceeding.

```robinpath
set $result as glob.match "src/**/*.ts"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
