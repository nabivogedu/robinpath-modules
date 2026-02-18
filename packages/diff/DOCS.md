---
title: "Diff"
module: "diff"
package: "@robinpath/diff"
description: "Text and data diffing: line, word, character, object, and array diffs with unified output"
category: "utility"
tags: [diff, utility]
type: "utility"
auth: "none"
functionCount: 9
---

# Diff

> Text and data diffing: line, word, character, object, and array diffs with unified output

**Package:** `@robinpath/diff` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `diff` module when you need to:

- **Diff two strings line by line** -- Use `diff.lines` to perform this operation
- **Diff two strings character by character** -- Use `diff.chars` to perform this operation
- **Diff two strings word by word** -- Use `diff.words` to perform this operation
- **Diff two objects** -- Use `diff.objects` to perform this operation
- **Diff two arrays** -- Use `diff.arrays` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`lines`](#lines) | Diff two strings line by line | `Array of {type, value}` |
| [`chars`](#chars) | Diff two strings character by character | `Array of {type, value}` |
| [`words`](#words) | Diff two strings word by word | `Array of {type, value}` |
| [`objects`](#objects) | Diff two objects | `Array of {path, type, oldValue?, newValue?}` |
| [`arrays`](#arrays) | Diff two arrays | `{added, removed, common}` |
| [`patch`](#patch) | Apply a line diff to produce the new string | `Patched string` |
| [`unified`](#unified) | Generate unified diff format (like git diff) | `Unified diff string` |
| [`isEqual`](#isequal) | Deep equality check | `True if deeply equal` |
| [`stats`](#stats) | Get diff statistics from a diff result | `{additions, deletions, unchanged}` |


## Functions

### lines

Diff two strings line by line

**Module:** `diff` | **Returns:** `array` -- Array of {type, value}

```robinpath
diff.lines $old $new
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `a` | `string` | Yes | Original text |
| `b` | `string` | Yes | Modified text |

---

### chars

Diff two strings character by character

**Module:** `diff` | **Returns:** `array` -- Array of {type, value}

```robinpath
diff.chars "cat" "car"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `a` | `string` | Yes | Original |
| `b` | `string` | Yes | Modified |

---

### words

Diff two strings word by word

**Module:** `diff` | **Returns:** `array` -- Array of {type, value}

```robinpath
diff.words $old $new
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `a` | `string` | Yes | Original |
| `b` | `string` | Yes | Modified |

---

### objects

Diff two objects

**Module:** `diff` | **Returns:** `array` -- Array of {path, type, oldValue?, newValue?}

```robinpath
diff.objects $obj1 $obj2
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `a` | `object` | Yes | Original object |
| `b` | `object` | Yes | Modified object |

---

### arrays

Diff two arrays

**Module:** `diff` | **Returns:** `object` -- {added, removed, common}

```robinpath
diff.arrays $arr1 $arr2
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `a` | `array` | Yes | Original array |
| `b` | `array` | Yes | Modified array |

---

### patch

Apply a line diff to produce the new string

**Module:** `diff` | **Returns:** `string` -- Patched string

```robinpath
diff.patch $lineDiff
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `diff` | `array` | Yes | Diff result from lines() |

---

### unified

Generate unified diff format (like git diff)

**Module:** `diff` | **Returns:** `string` -- Unified diff string

```robinpath
diff.unified $old $new
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `a` | `string` | Yes | Original text |
| `b` | `string` | Yes | Modified text |

---

### isEqual

Deep equality check

**Module:** `diff` | **Returns:** `boolean` -- True if deeply equal

```robinpath
diff.isEqual $a $b
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `a` | `any` | Yes | First value |
| `b` | `any` | Yes | Second value |

---

### stats

Get diff statistics from a diff result

**Module:** `diff` | **Returns:** `object` -- {additions, deletions, unchanged}

```robinpath
diff.stats $lineDiff
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `diff` | `array` | Yes | Diff result |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as diff.lines $old $new
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Diff workflow

Chain multiple diff operations together.

```robinpath
set $r_lines as diff.lines $old $new
set $r_chars as diff.chars "cat" "car"
set $r_words as diff.words $old $new
print "All operations complete"
```

### 2. Safe lines with validation

Check results before proceeding.

```robinpath
set $result as diff.lines $old $new
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
