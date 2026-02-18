---
title: "Transform"
module: "transform"
package: "@robinpath/transform"
description: "Data transformation and mapping utilities: pick, omit, rename, coerce, flatten, merge, pipeline, and more"
category: "other"
tags: [transform, other]
type: "utility"
auth: "none"
functionCount: 15
---

# Transform

> Data transformation and mapping utilities: pick, omit, rename, coerce, flatten, merge, pipeline, and more

**Package:** `@robinpath/transform` | **Category:** Other | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `transform` module when you need to:

- **Pick specific keys from an object (supports nested paths with dot notation)** -- Use `transform.pick` to perform this operation
- **Create a copy of an object with specific keys removed** -- Use `transform.omit` to perform this operation
- **Rename keys in an object** -- Use `transform.rename` to perform this operation
- **Apply transformations to specific values in an object** -- Use `transform.mapValues` to perform this operation
- **Coerce a value to a target type** -- Use `transform.coerce` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`pick`](#pick) | Pick specific keys from an object (supports nested paths with dot notation) | `New object with only the specified keys` |
| [`omit`](#omit) | Create a copy of an object with specific keys removed | `New object without the specified keys` |
| [`rename`](#rename) | Rename keys in an object | `Object with renamed keys` |
| [`mapValues`](#mapvalues) | Apply transformations to specific values in an object | `Object with transformed values` |
| [`coerce`](#coerce) | Coerce a value to a target type | `The coerced value` |
| [`flatten`](#flatten) | Flatten a nested object into a single level with dot-notation keys | `Flat object with concatenated key paths` |
| [`unflatten`](#unflatten) | Unflatten a dot-notation object back into a nested structure | `Nested object` |
| [`merge`](#merge) | Deep merge multiple objects (later objects override earlier ones) | `Deep-merged result` |
| [`defaults`](#defaults) | Fill in missing/null/undefined keys from default values | `Object with defaults applied for missing keys` |
| [`template`](#template) | Render a template string with {{key}} placeholders replaced by data values | `Rendered string with placeholders replaced` |
| [`group`](#group) | Group an array of objects by a key value | `Object where keys are group values and values are arrays of matching items` |
| [`pipeline`](#pipeline) | Apply a series of transformation steps to data | `The transformed data after all steps` |
| [`mapArray`](#maparray) | Map an array of objects to a new shape by specifying target-to-source key mapping | `Array of reshaped objects` |
| [`filter`](#filter) | Filter an array of objects by matching key-value conditions | `Filtered array of matching objects` |
| [`sort`](#sort) | Sort an array of objects by a key | `Sorted array` |


## Functions

### pick

Pick specific keys from an object (supports nested paths with dot notation)

**Module:** `transform` | **Returns:** `object` -- New object with only the specified keys

```robinpath
transform.pick $data ["name", "email", "address.city"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `object` | `object` | Yes | Source object |
| `keys` | `array` | Yes | Array of key names or comma-separated string |

---

### omit

Create a copy of an object with specific keys removed

**Module:** `transform` | **Returns:** `object` -- New object without the specified keys

```robinpath
transform.omit $data ["password", "secret"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `object` | `object` | Yes | Source object |
| `keys` | `array` | Yes | Array of key names to remove |

---

### rename

Rename keys in an object

**Module:** `transform` | **Returns:** `object` -- Object with renamed keys

```robinpath
transform.rename $data {"firstName": "first_name", "lastName": "last_name"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `object` | `object` | Yes | Source object |
| `mapping` | `object` | Yes | Old-to-new key name mapping |

---

### mapValues

Apply transformations to specific values in an object

**Module:** `transform` | **Returns:** `object` -- Object with transformed values

```robinpath
transform.mapValues $data {"age": "toNumber", "name": "trim"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `object` | `object` | Yes | Source object |
| `mapping` | `object` | Yes | Key-to-transform mapping (toString, toNumber, toBoolean, toUpperCase, toLowerCase, trim, toArray, toJSON, fromJSON) |

---

### coerce

Coerce a value to a target type

**Module:** `transform` | **Returns:** `any` -- The coerced value

```robinpath
transform.coerce "42" "number"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to coerce |
| `type` | `string` | Yes | Target type: string, number, boolean, integer, float, array, json, object |

---

### flatten

Flatten a nested object into a single level with dot-notation keys

**Module:** `transform` | **Returns:** `object` -- Flat object with concatenated key paths

```robinpath
transform.flatten $nestedData "."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `object` | `object` | Yes | Nested object |
| `separator` | `string` | No | Key separator (default '.') |

---

### unflatten

Unflatten a dot-notation object back into a nested structure

**Module:** `transform` | **Returns:** `object` -- Nested object

```robinpath
transform.unflatten {"user.name": "Alice", "user.age": 30}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `object` | `object` | Yes | Flat object with dot-notation keys |
| `separator` | `string` | No | Key separator (default '.') |

---

### merge

Deep merge multiple objects (later objects override earlier ones)

**Module:** `transform` | **Returns:** `object` -- Deep-merged result

```robinpath
transform.merge $defaults $userConfig $overrides
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `objects` | `any` | Yes | Two or more objects to merge |

---

### defaults

Fill in missing/null/undefined keys from default values

**Module:** `transform` | **Returns:** `object` -- Object with defaults applied for missing keys

```robinpath
transform.defaults $config {"port": 3000, "host": "localhost"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `object` | `object` | Yes | Source object |
| `defaults` | `object` | Yes | Default values to fill in |

---

### template

Render a template string with {{key}} placeholders replaced by data values

**Module:** `transform` | **Returns:** `string` -- Rendered string with placeholders replaced

```robinpath
transform.template "Hello {{name}}, you have {{count}} items" $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `template` | `string` | Yes | Template with {{key}} placeholders |
| `data` | `object` | Yes | Data object for placeholder values |

---

### group

Group an array of objects by a key value

**Module:** `transform` | **Returns:** `object` -- Object where keys are group values and values are arrays of matching items

```robinpath
transform.group $users "role"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of objects |
| `key` | `string` | Yes | Key to group by |

---

### pipeline

Apply a series of transformation steps to data

**Module:** `transform` | **Returns:** `any` -- The transformed data after all steps

```robinpath
transform.pipeline $data [{"action": "pick", "params": ["name","email"]}, {"action": "rename", "params": {"name": "fullName"}}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `any` | Yes | Input data |
| `steps` | `array` | Yes | Array of {action, params} step objects |

---

### mapArray

Map an array of objects to a new shape by specifying target-to-source key mapping

**Module:** `transform` | **Returns:** `array` -- Array of reshaped objects

```robinpath
transform.mapArray $users {"fullName": "name", "mail": "email"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of source objects |
| `mapping` | `object` | Yes | Target key to source key mapping |

---

### filter

Filter an array of objects by matching key-value conditions

**Module:** `transform` | **Returns:** `array` -- Filtered array of matching objects

```robinpath
transform.filter $users {"role": "admin", "active": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of objects |
| `conditions` | `object` | Yes | Key-value pairs that must match |

---

### sort

Sort an array of objects by a key

**Module:** `transform` | **Returns:** `array` -- Sorted array

```robinpath
transform.sort $users "name" "asc"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | `array` | Yes | Array of objects |
| `key` | `string` | Yes | Key to sort by |
| `order` | `string` | No | 'asc' or 'desc' (default 'asc') |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Unknown target type: ${targetType}` | Check the error message for details |
| `Cannot coerce "..." to number` | Check the error message for details |
| `Cannot coerce "..." to integer` | Check the error message for details |
| `Cannot coerce "..." to float` | Check the error message for details |

```robinpath
set $result as transform.pick $data ["name", "email", "address.city"]
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Transform workflow

Chain multiple transform operations together.

```robinpath
set $r_pick as transform.pick $data ["name", "email", "address.city"]
set $r_omit as transform.omit $data ["password", "secret"]
set $r_rename as transform.rename $data {"firstName": "first_name", "lastName": "last_name"}
print "All operations complete"
```

### 2. Safe pick with validation

Check results before proceeding.

```robinpath
set $result as transform.pick $data ["name", "email", "address.city"]
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
