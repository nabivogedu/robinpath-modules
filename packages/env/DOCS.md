---
title: "Env"
module: "env"
package: "@robinpath/env"
description: "Secure environment variable management with sensitive value redaction and protected system vars"
category: "other"
tags: [env, other]
type: "utility"
auth: "none"
functionCount: 7
---

# Env

> Secure environment variable management with sensitive value redaction and protected system vars

**Package:** `@robinpath/env` | **Category:** Other | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `env` module when you need to:

- **Get the value of an environment variable** -- Use `env.get` to perform this operation
- **Check if an environment variable exists** -- Use `env.has` to perform this operation
- **Get all environment variables (sensitive values are redacted by default)** -- Use `env.all` to perform this operation
- **Delete an environment variable (protected system vars cannot be deleted)** -- Use `env.delete` to perform this operation
- **Mark an environment variable as sensitive (will be redacted in env.all output)** -- Use `env.secret` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`get`](#get) | Get the value of an environment variable | `The environment variable value, the default value, or null if not set` |
| [`set`](#set) | Set an environment variable (protected system vars cannot be overwritten) | `True if the variable was set` |
| [`has`](#has) | Check if an environment variable exists | `True if the variable exists, false otherwise` |
| [`all`](#all) | Get all environment variables (sensitive values are redacted by default) | `Object with all environment variable key-value pairs (secrets shown as ***)` |
| [`delete`](#delete) | Delete an environment variable (protected system vars cannot be deleted) | `True if the variable was deleted` |
| [`secret`](#secret) | Mark an environment variable as sensitive (will be redacted in env.all output) | `True if marked` |
| [`load`](#load) | Load environment variables from a .env file (won't override existing or protected vars) | `Number of new variables loaded` |


## Functions

### get

Get the value of an environment variable

**Module:** `env` | **Returns:** `string` -- The environment variable value, the default value, or null if not set

```robinpath
env.get "NODE_ENV"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Name of the environment variable |
| `defaultValue` | `string` | No | Default value if the variable is not set |

---

### set

Set an environment variable (protected system vars cannot be overwritten)

**Module:** `env` | **Returns:** `boolean` -- True if the variable was set

```robinpath
env.set "API_URL" "https://api.example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Name of the environment variable (must match [A-Za-z_][A-Za-z0-9_]*) |
| `value` | `string` | Yes | Value to set |

---

### has

Check if an environment variable exists

**Module:** `env` | **Returns:** `boolean` -- True if the variable exists, false otherwise

```robinpath
env.has "NODE_ENV"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Name of the environment variable |

---

### all

Get all environment variables (sensitive values are redacted by default)

**Module:** `env` | **Returns:** `object` -- Object with all environment variable key-value pairs (secrets shown as ***)

```robinpath
env.all
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `showSensitive` | `boolean` | No | Pass true to show sensitive values unredacted (default: false) |

---

### delete

Delete an environment variable (protected system vars cannot be deleted)

**Module:** `env` | **Returns:** `boolean` -- True if the variable was deleted

```robinpath
env.delete "OLD_KEY"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Name of the environment variable to delete |

---

### secret

Mark an environment variable as sensitive (will be redacted in env.all output)

**Module:** `env` | **Returns:** `boolean` -- True if marked

```robinpath
env.secret "SMTP_PASS"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Name of the environment variable to mark as sensitive |

---

### load

Load environment variables from a .env file (won't override existing or protected vars)

**Module:** `env` | **Returns:** `number` -- Number of new variables loaded

```robinpath
env.load ".env"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Path to the .env file |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Environment variable name cannot be empty` | Check the error message for details |
| `Invalid environment variable name: "...". Must match /^[A-Za-z_][A-Za-z0-9_]*$/` | Check the error message for details |
| `Cannot overwrite protected system variable: "..."` | Check the error message for details |
| `Cannot delete protected system variable: "..."` | Check the error message for details |

```robinpath
set $result as env.get "NODE_ENV"
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
set $result as env.get "NODE_ENV"
each $item in $result
  print $item
end
```

### 2. Multi-step Env workflow

Chain multiple env operations together.

```robinpath
set $r_get as env.get "NODE_ENV"
set $r_has as env.has "NODE_ENV"
set $r_all as env.all
print "All operations complete"
```

### 3. Safe get with validation

Check results before proceeding.

```robinpath
set $result as env.get "NODE_ENV"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
