---
title: "UUID"
module: "uuid"
package: "@robinpath/uuid"
description: "UUID generation, parsing, and validation utilities (v4, v5, nil)"
category: "utility"
tags: [uuid, utility]
type: "utility"
auth: "none"
functionCount: 7
---

# UUID

> UUID generation, parsing, and validation utilities (v4, v5, nil)

**Package:** `@robinpath/uuid` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `uuid` module when you need to:

- **Generate a random UUID v4** -- Use `uuid.v4` to perform this operation
- **Generate a deterministic UUID v5 from a name and namespace UUID using SHA-1** -- Use `uuid.v5` to perform this operation
- **Check whether a string is a valid UUID format** -- Use `uuid.isValid` to perform this operation
- **Extract the version number from a UUID string** -- Use `uuid.version` to perform this operation
- **Parse a UUID into its component parts (version, variant, time, bytes)** -- Use `uuid.parse` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`v4`](#v4) | Generate a random UUID v4 | `A random UUID v4 string` |
| [`v5`](#v5) | Generate a deterministic UUID v5 from a name and namespace UUID using SHA-1 | `A deterministic UUID v5 string` |
| [`isValid`](#isvalid) | Check whether a string is a valid UUID format | `True if the string matches the UUID pattern` |
| [`version`](#version) | Extract the version number from a UUID string | `The UUID version number (1-5)` |
| [`parse`](#parse) | Parse a UUID into its component parts (version, variant, time, bytes) | `An object with version, variant, time (null for non-v1), and bytes (hex string of 16 bytes)` |
| [`generate`](#generate) | Generate one or more random UUID v4 strings | `An array of random UUID v4 strings` |
| [`nil`](#nil) | Return the nil UUID (all zeros) | `The nil UUID "00000000-0000-0000-0000-000000000000"` |


## Functions

### v4

Generate a random UUID v4

**Module:** `uuid` | **Returns:** `string` -- A random UUID v4 string

```robinpath
uuid.v4
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### v5

Generate a deterministic UUID v5 from a name and namespace UUID using SHA-1

**Module:** `uuid` | **Returns:** `string` -- A deterministic UUID v5 string

```robinpath
uuid.v5 "hello" "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | The name to hash into the UUID |
| `namespace` | `string` | Yes | The namespace UUID (e.g. a well-known DNS or URL namespace) |

---

### isValid

Check whether a string is a valid UUID format

**Module:** `uuid` | **Returns:** `boolean` -- True if the string matches the UUID pattern

```robinpath
uuid.isValid "550e8400-e29b-41d4-a716-446655440000"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | The string to validate |

---

### version

Extract the version number from a UUID string

**Module:** `uuid` | **Returns:** `number` -- The UUID version number (1-5)

```robinpath
uuid.version "550e8400-e29b-41d4-a716-446655440000"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uuid` | `string` | Yes | A valid UUID string |

---

### parse

Parse a UUID into its component parts (version, variant, time, bytes)

**Module:** `uuid` | **Returns:** `object` -- An object with version, variant, time (null for non-v1), and bytes (hex string of 16 bytes)

```robinpath
uuid.parse "550e8400-e29b-41d4-a716-446655440000"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uuid` | `string` | Yes | A valid UUID string |

---

### generate

Generate one or more random UUID v4 strings

**Module:** `uuid` | **Returns:** `array` -- An array of random UUID v4 strings

```robinpath
uuid.generate 5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `count` | `number` | No | The number of UUIDs to generate (default 1) |

---

### nil

Return the nil UUID (all zeros)

**Module:** `uuid` | **Returns:** `string` -- The nil UUID "00000000-0000-0000-0000-000000000000"

```robinpath
uuid.nil
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Invalid namespace UUID: ${namespace}` | Check the error message for details |
| `Invalid UUID: ${value}` | Check the error message for details |

```robinpath
set $result as uuid.v4
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step UUID workflow

Chain multiple uuid operations together.

```robinpath
set $r_v4 as uuid.v4
set $r_v5 as uuid.v5 "hello" "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
set $r_isValid as uuid.isValid "550e8400-e29b-41d4-a716-446655440000"
print "All operations complete"
```

### 2. Safe v4 with validation

Check results before proceeding.

```robinpath
set $result as uuid.v4
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
