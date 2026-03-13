---
title: "Util"
module: "util"
package: "@robinpath/util"
description: "Type checking, deep clone/merge, inspection, formatting, and utility helpers"
category: "core"
tags: [util, utility, type, inspect, core]
type: "builtin"
auth: "none"
functionCount: 32
---

# Util

> Type checking, deep clone/merge, inspection, formatting, and utility helpers

**Package:** `@robinpath/util` | **Category:** Core | **Type:** Built-in

## Authentication

No authentication required. All functions are available immediately.

## Use Cases

Use the `util` module when you need to:

- **Check the type of a value** -- Use `util.typeOf`, `util.isString`, `util.isNumber`, etc.
- **Deep clone objects** -- Use `util.deepClone` to create independent copies
- **Deep merge objects** -- Use `util.deepMerge` to combine nested objects
- **Compare objects deeply** -- Use `util.deepEqual` for structural comparison
- **Inspect values** -- Use `util.inspect` to get a human-readable representation
- **Format strings** -- Use `util.format` for printf-style formatting
- **Encode/decode text** -- Use `util.textEncode` and `util.textDecode`
- **Get memory size** -- Use `util.sizeof` to estimate object memory usage

## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`inspect`](#inspect) | Get a human-readable string of any value | `string` |
| [`format`](#format) | Format a string with substitutions | `string` |
| [`formatWithOptions`](#formatwithoptions) | Format with custom inspect options | `string` |
| [`isArray`](#isarray) | Check if value is an array | `boolean` |
| [`isBoolean`](#isboolean) | Check if value is a boolean | `boolean` |
| [`isNull`](#isnull) | Check if value is null | `boolean` |
| [`isUndefined`](#isundefined) | Check if value is undefined | `boolean` |
| [`isNullOrUndefined`](#isnullorundefined) | Check if value is null or undefined | `boolean` |
| [`isNumber`](#isnumber) | Check if value is a number | `boolean` |
| [`isString`](#isstring) | Check if value is a string | `boolean` |
| [`isObject`](#isobject) | Check if value is an object | `boolean` |
| [`isFunction`](#isfunction) | Check if value is a function | `boolean` |
| [`isRegExp`](#isregexp) | Check if value is a RegExp | `boolean` |
| [`isDate`](#isdate) | Check if value is a Date | `boolean` |
| [`isError`](#iserror) | Check if value is an Error | `boolean` |
| [`isPrimitive`](#isprimitive) | Check if value is a primitive type | `boolean` |
| [`isPromise`](#ispromise) | Check if value is a Promise | `boolean` |
| [`isMap`](#ismap) | Check if value is a Map | `boolean` |
| [`isSet`](#isset) | Check if value is a Set | `boolean` |
| [`isTypedArray`](#istypedarray) | Check if value is a TypedArray | `boolean` |
| [`isArrayBuffer`](#isarraybuffer) | Check if value is an ArrayBuffer | `boolean` |
| [`typeOf`](#typeof) | Get the type name of a value | `string` |
| [`textEncode`](#textencode) | Encode a string to UTF-8 bytes | `Buffer` |
| [`textDecode`](#textdecode) | Decode UTF-8 bytes to a string | `string` |
| [`deepClone`](#deepclone) | Create a deep copy of an object | `any` |
| [`deepEqual`](#deepequal) | Deep structural equality comparison | `boolean` |
| [`merge`](#merge) | Shallow merge objects | `Object` |
| [`deepMerge`](#deepmerge) | Deep merge nested objects | `Object` |
| [`inherits`](#inherits) | Set up prototype inheritance | `void` |
| [`deprecate`](#deprecate) | Mark a value as deprecated | `any` |
| [`callbackify`](#callbackify) | Convert a promise to callback style | `Function` |
| [`sizeof`](#sizeof) | Estimate memory size of a value in bytes | `number` |

## Functions

### inspect

Get a human-readable string representation of any value

**Module:** `util` | **Returns:** `string` -- Formatted string representation

```robinpath
util.inspect $myObject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | The value to inspect |

---

### format

Format a string using printf-style substitutions (%s, %d, %j)

**Module:** `util` | **Returns:** `string` -- Formatted string

```robinpath
util.format "Hello %s, you have %d items" "Alice" 5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `template` | `string` | Yes | Format string with %s, %d, %j placeholders |
| `args` | `any` | No | Values to substitute |

---

### formatWithOptions

Format a string with custom inspection options

**Module:** `util` | **Returns:** `string` -- Formatted string

```robinpath
util.formatWithOptions $options "Value: %s" $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `Object` | Yes | Inspect options (depth, colors, etc.) |
| `template` | `string` | Yes | Format string |
| `args` | `any` | No | Values to substitute |

---

### isArray

Check if a value is an array

**Module:** `util` | **Returns:** `boolean` -- True if value is an array

```robinpath
util.isArray $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isBoolean

Check if a value is a boolean

**Module:** `util` | **Returns:** `boolean` -- True if value is a boolean

```robinpath
util.isBoolean $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isNull

Check if a value is null

**Module:** `util` | **Returns:** `boolean` -- True if value is null

```robinpath
util.isNull $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isUndefined

Check if a value is undefined

**Module:** `util` | **Returns:** `boolean` -- True if value is undefined

```robinpath
util.isUndefined $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isNullOrUndefined

Check if a value is null or undefined

**Module:** `util` | **Returns:** `boolean` -- True if value is null or undefined

```robinpath
util.isNullOrUndefined $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isNumber

Check if a value is a number

**Module:** `util` | **Returns:** `boolean` -- True if value is a number

```robinpath
util.isNumber $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isString

Check if a value is a string

**Module:** `util` | **Returns:** `boolean` -- True if value is a string

```robinpath
util.isString $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isObject

Check if a value is an object (not null, not array)

**Module:** `util` | **Returns:** `boolean` -- True if value is an object

```robinpath
util.isObject $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isFunction

Check if a value is a function

**Module:** `util` | **Returns:** `boolean` -- True if value is a function

```robinpath
util.isFunction $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isRegExp

Check if a value is a regular expression

**Module:** `util` | **Returns:** `boolean` -- True if value is a RegExp

```robinpath
util.isRegExp $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isDate

Check if a value is a Date object

**Module:** `util` | **Returns:** `boolean` -- True if value is a Date

```robinpath
util.isDate $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isError

Check if a value is an Error object

**Module:** `util` | **Returns:** `boolean` -- True if value is an Error

```robinpath
util.isError $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isPrimitive

Check if a value is a primitive type (string, number, boolean, null, undefined)

**Module:** `util` | **Returns:** `boolean` -- True if value is primitive

```robinpath
util.isPrimitive $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isPromise

Check if a value is a Promise

**Module:** `util` | **Returns:** `boolean` -- True if value is a Promise

```robinpath
util.isPromise $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isMap

Check if a value is a Map

**Module:** `util` | **Returns:** `boolean` -- True if value is a Map

```robinpath
util.isMap $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isSet

Check if a value is a Set

**Module:** `util` | **Returns:** `boolean` -- True if value is a Set

```robinpath
util.isSet $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isTypedArray

Check if a value is a TypedArray

**Module:** `util` | **Returns:** `boolean` -- True if value is a TypedArray

```robinpath
util.isTypedArray $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### isArrayBuffer

Check if a value is an ArrayBuffer

**Module:** `util` | **Returns:** `boolean` -- True if value is an ArrayBuffer

```robinpath
util.isArrayBuffer $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### typeOf

Get the type name of a value as a string

**Module:** `util` | **Returns:** `string` -- Type name (e.g., "string", "number", "array", "object")

```robinpath
util.typeOf $value
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to check |

---

### textEncode

Encode a string to UTF-8 bytes

**Module:** `util` | **Returns:** `Buffer` -- UTF-8 encoded bytes

```robinpath
util.textEncode "Hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | String to encode |

---

### textDecode

Decode UTF-8 bytes to a string

**Module:** `util` | **Returns:** `string` -- Decoded string

```robinpath
util.textDecode $bytes
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `Buffer` | Yes | UTF-8 bytes to decode |

---

### deepClone

Create a deep copy of any value (objects, arrays, nested structures)

**Module:** `util` | **Returns:** `any` -- Deep copy of the input

```robinpath
util.deepClone $myObject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to clone |

---

### deepEqual

Perform deep structural equality comparison between two values

**Module:** `util` | **Returns:** `boolean` -- True if structurally equal

```robinpath
util.deepEqual $obj1 $obj2
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `a` | `any` | Yes | First value |
| `b` | `any` | Yes | Second value |

---

### merge

Shallow merge of two or more objects

**Module:** `util` | **Returns:** `Object` -- Merged object

```robinpath
util.merge $defaults $overrides
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `target` | `Object` | Yes | Target object |
| `source` | `Object` | Yes | Source object to merge in |

---

### deepMerge

Deep merge of nested objects (recursively merges child objects)

**Module:** `util` | **Returns:** `Object` -- Deep merged object

```robinpath
util.deepMerge $defaults $overrides
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `target` | `Object` | Yes | Target object |
| `source` | `Object` | Yes | Source object to deep merge |

---

### inherits

Set up prototype chain inheritance between two constructors

**Module:** `util` | **Returns:** `void`

```robinpath
util.inherits $Child $Parent
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `constructor` | `Function` | Yes | Child constructor |
| `superConstructor` | `Function` | Yes | Parent constructor |

---

### deprecate

Mark a value or function as deprecated with a warning message

**Module:** `util` | **Returns:** `any` -- The wrapped value

```robinpath
util.deprecate $oldFunction "Use newFunction instead"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to deprecate |
| `message` | `string` | Yes | Deprecation message |

---

### callbackify

Convert a promise-returning function to callback style

**Module:** `util` | **Returns:** `Function` -- Callback-style function

```robinpath
util.callbackify $asyncFn
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fn` | `Function` | Yes | Promise-returning function |

---

### sizeof

Estimate the memory size of a value in bytes

**Module:** `util` | **Returns:** `number` -- Estimated size in bytes

```robinpath
util.sizeof $myData
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | Value to measure |

---

## Error Handling

| Error | Cause |
|-------|-------|
| Invalid argument | Wrong type passed to a type-checking function |

```robinpath
@desc "Safe type checking"
do
  set $value as "hello"
  set $type as util.typeOf $value
  print "Type: " + $type
  if util.isString $value
    print "It's a string with length " + string.length $value
  end
enddo
```

## Recipes

### 1. Deep clone and modify

Clone an object before making changes.

```robinpath
@desc "Clone config and customize"
do
  set $defaults as { "theme": "light", "lang": "en", "debug": false }
  set $custom as util.deepClone $defaults
  set $custom.theme as "dark"
  set $custom.debug as true
  print "Original theme: " + $defaults.theme
  print "Custom theme: " + $custom.theme
enddo
```

### 2. Merge configurations

Combine default and user settings.

```robinpath
@desc "Merge default and user config"
do
  set $defaults as { "port": 3000, "host": "localhost", "debug": false }
  set $userConfig as { "port": 8080, "debug": true }
  set $final as util.deepMerge $defaults $userConfig
  print "Port: " + $final.port
  print "Debug: " + $final.debug
enddo
```

### 3. Validate input types

Check types before processing.

```robinpath
@desc "Validate API response shape"
do
  set $data as http.get "https://api.example.com/user"
  set $body as $data.body
  if util.isObject $body
    if util.isString $body.name
      print "User: " + $body.name
    else
      print "Invalid name field"
    end
  else
    print "Expected object response"
  end
enddo
```

## Related Modules

- **assert** -- Testing assertions
- **json** -- JSON parsing and serialization
