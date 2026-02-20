---
title: "Schema"
module: "schema"
package: "@robinpath/schema"
description: "Lightweight schema validation: validate data against type schemas with constraints"
category: "utility"
tags: [schema, utility]
type: "utility"
auth: "none"
functionCount: 10
---

# Schema

> Lightweight schema validation: validate data against type schemas with constraints

**Package:** `@robinpath/schema` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `schema` module when you need to:

- **Validate data against a schema** -- Use `schema.validate` to perform this operation
- **Check if data matches schema (boolean)** -- Use `schema.isValid` to perform this operation
- **Create a string schema** -- Use `schema.string` to perform this operation
- **Create a number schema** -- Use `schema.number` to perform this operation
- **Create a boolean schema** -- Use `schema.boolean` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`validate`](#validate) | Validate data against a schema | `{valid: boolean, errors: string[]}` |
| [`isValid`](#isvalid) | Check if data matches schema (boolean) | `True if valid` |
| [`string`](#string) | Create a string schema | `String schema object` |
| [`number`](#number) | Create a number schema | `Number schema object` |
| [`boolean`](#boolean) | Create a boolean schema | `Boolean schema object` |
| [`array`](#array) | Create an array schema | `Array schema object` |
| [`object`](#object) | Create an object schema | `Object schema object` |
| [`nullable`](#nullable) | Make a schema also accept null | `Nullable schema` |
| [`oneOf`](#oneof) | Create a schema matching one of several schemas | `OneOf schema` |
| [`getErrors`](#geterrors) | Validate and return only the errors array | `Array of error strings` |


## Functions

### validate

Validate data against a schema

**Module:** `schema` | **Returns:** `object` -- {valid: boolean, errors: string[]}

```robinpath
schema.validate $data $schema
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `any` | Yes | Data to validate |
| `schema` | `object` | Yes | Schema object |

---

### isValid

Check if data matches schema (boolean)

**Module:** `schema` | **Returns:** `boolean` -- True if valid

```robinpath
schema.isValid $data $schema
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `any` | Yes | Data to validate |
| `schema` | `object` | Yes | Schema object |

---

### string

Create a string schema

**Module:** `schema` | **Returns:** `object` -- String schema object

```robinpath
schema.string {"minLength": 1}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: {minLength, maxLength, pattern, enum} |

---

### number

Create a number schema

**Module:** `schema` | **Returns:** `object` -- Number schema object

```robinpath
schema.number {"min": 0, "max": 100}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: {min, max, integer} |

---

### boolean

Create a boolean schema

**Module:** `schema` | **Returns:** `object` -- Boolean schema object

```robinpath
schema.boolean
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### array

Create an array schema

**Module:** `schema` | **Returns:** `object` -- Array schema object

```robinpath
schema.array {"items": {"type": "string"}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: {items} |

---

### object

Create an object schema

**Module:** `schema` | **Returns:** `object` -- Object schema object

```robinpath
schema.object $opts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | Yes | Options: {properties, required} |

---

### nullable

Make a schema also accept null

**Module:** `schema` | **Returns:** `object` -- Nullable schema

```robinpath
schema.nullable $stringSchema
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `schema` | `object` | Yes | Schema to wrap |

---

### oneOf

Create a schema matching one of several schemas

**Module:** `schema` | **Returns:** `object` -- OneOf schema

```robinpath
schema.oneOf $schema1 $schema2
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `schemas` | `object` | Yes | Schemas (pass as multiple args) |

---

### getErrors

Validate and return only the errors array

**Module:** `schema` | **Returns:** `array` -- Array of error strings

```robinpath
schema.getErrors $data $schema
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `any` | Yes | Data to validate |
| `schema` | `object` | Yes | Schema object |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as schema.validate $data $schema
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Errors

Retrieve all items and loop through them.

```robinpath
set $result as schema.getErrors $data $schema
each $item in $result
  print $item
end
```

### 2. Multi-step Schema workflow

Chain multiple schema operations together.

```robinpath
set $r_validate as schema.validate $data $schema
set $r_isValid as schema.isValid $data $schema
set $r_string as schema.string {"minLength": 1}
print "All operations complete"
```

### 3. Safe validate with validation

Check results before proceeding.

```robinpath
set $result as schema.validate $data $schema
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
