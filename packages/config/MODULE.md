---
title: "Config"
module: "config"
package: "@robinpath/config"
description: "Multi-source configuration management with deep merge, dot-path access, env loading, and validation"
category: "other"
tags: [config, other]
type: "utility"
auth: "none"
functionCount: 14
---

# Config

> Multi-source configuration management with deep merge, dot-path access, env loading, and validation

**Package:** `@robinpath/config` | **Category:** Other | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `config` module when you need to:

- **Create config with defaults** -- Use `config.create` to perform this operation
- **Load config from file (.json, .env)** -- Use `config.load` to perform this operation
- **Load from environment variables** -- Use `config.loadEnv` to perform this operation
- **Get config value by dot path** -- Use `config.get` to perform this operation
- **Get entire config** -- Use `config.getAll` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create config with defaults | `Config object` |
| [`load`](#load) | Load config from file (.json, .env) | `Merged config` |
| [`loadEnv`](#loadenv) | Load from environment variables | `Merged config` |
| [`get`](#get) | Get config value by dot path | `Config value` |
| [`set`](#set) | Set config value by dot path | `true` |
| [`getAll`](#getall) | Get entire config | `Full config` |
| [`merge`](#merge) | Deep merge into config | `Merged config` |
| [`has`](#has) | Check if path exists | `true if exists` |
| [`remove`](#remove) | Remove config key | `true if removed` |
| [`clear`](#clear) | Clear entire config | `true` |
| [`list`](#list) | List all config names | `Config names` |
| [`validate`](#validate) | Validate required keys exist | `{valid, missing}` |
| [`freeze`](#freeze) | Freeze config (immutable) | `true` |
| [`toEnv`](#toenv) | Convert config to env format | `Env-format string` |


## Functions

### create

Create config with defaults

**Module:** `config` | **Returns:** `object` -- Config object

```robinpath
config.create "app" {"port": 3000, "debug": false}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | No | Config name |
| `defaults` | `object` | No | Default values |

---

### load

Load config from file (.json, .env)

**Module:** `config` | **Returns:** `object` -- Merged config

```robinpath
config.load "./config.json"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Config file path |
| `name` | `string` | No | Config name |

---

### loadEnv

Load from environment variables

**Module:** `config` | **Returns:** `object` -- Merged config

```robinpath
config.loadEnv "APP_"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prefix` | `string` | No | Env var prefix filter |
| `name` | `string` | No | Config name |

---

### get

Get config value by dot path

**Module:** `config` | **Returns:** `any` -- Config value

```robinpath
config.get "database.host" "localhost"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Dot-separated path |
| `default` | `any` | No | Default value |
| `name` | `string` | No | Config name |

---

### set

Set config value by dot path

**Module:** `config` | **Returns:** `boolean` -- true

```robinpath
config.set "database.port" 5432
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Dot-separated path |
| `value` | `any` | Yes | Value |
| `name` | `string` | No | Config name |

---

### getAll

Get entire config

**Module:** `config` | **Returns:** `object` -- Full config

```robinpath
config.getAll
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | No | Config name |

---

### merge

Deep merge into config

**Module:** `config` | **Returns:** `object` -- Merged config

```robinpath
config.merge {"database": {"port": 5432}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | Yes | Data to merge |
| `name` | `string` | No | Config name |

---

### has

Check if path exists

**Module:** `config` | **Returns:** `boolean` -- true if exists

```robinpath
config.has "database.host"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Dot-separated path |
| `name` | `string` | No | Config name |

---

### remove

Remove config key

**Module:** `config` | **Returns:** `boolean` -- true if removed

```robinpath
config.remove "debug"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Dot-separated path |
| `name` | `string` | No | Config name |

---

### clear

Clear entire config

**Module:** `config` | **Returns:** `boolean` -- true

```robinpath
config.clear
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | No | Config name |

---

### list

List all config names

**Module:** `config` | **Returns:** `array` -- Config names

```robinpath
config.list
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### validate

Validate required keys exist

**Module:** `config` | **Returns:** `object` -- {valid, missing}

```robinpath
config.validate ["database.host", "database.port"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `required` | `array` | Yes | Required dot paths |
| `name` | `string` | No | Config name |

---

### freeze

Freeze config (immutable)

**Module:** `config` | **Returns:** `boolean` -- true

```robinpath
config.freeze
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | No | Config name |

---

### toEnv

Convert config to env format

**Module:** `config` | **Returns:** `string` -- Env-format string

```robinpath
config.toEnv "app" "APP_"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | No | Config name |
| `prefix` | `string` | No | Key prefix |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as config.create "app" {"port": 3000, "debug": false}
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
set $result as config.get "database.host" "localhost"
each $item in $result
  print $item
end
```

### 2. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as config.create "app" {"port": 3000, "debug": false}
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as config.get "database.host" "localhost"
if $existing == null
  config.create "app" {"port": 3000, "debug": false}
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Config workflow

Chain multiple config operations together.

```robinpath
set $r_create as config.create "app" {"port": 3000, "debug": false}
set $r_load as config.load "./config.json"
set $r_loadEnv as config.loadEnv "APP_"
print "All operations complete"
```

### 5. Safe create with validation

Check results before proceeding.

```robinpath
set $result as config.create "app" {"port": 3000, "debug": false}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
