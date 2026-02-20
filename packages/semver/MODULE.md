---
title: "Semver"
module: "semver"
package: "@robinpath/semver"
description: "Parse, compare, validate, and manipulate semantic version strings (semver 2.0.0 compliant)"
category: "utility"
tags: [semver, utility]
type: "utility"
auth: "none"
functionCount: 15
---

# Semver

> Parse, compare, validate, and manipulate semantic version strings (semver 2.0.0 compliant)

**Package:** `@robinpath/semver` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `semver` module when you need to:

- **Parse a semver version string into its components (major, minor, patch, prerelease, build)** -- Use `semver.parse` to perform this operation
- **Check whether a string is a valid semver version** -- Use `semver.isValid` to perform this operation
- **Compare two semver versions, returning -1 (v1 < v2), 0 (equal), or 1 (v1 > v2)** -- Use `semver.compare` to perform this operation
- **Check if the first version is greater than the second** -- Use `semver.gt` to perform this operation
- **Check if the first version is less than the second** -- Use `semver.lt` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`parse`](#parse) | Parse a semver version string into its components (major, minor, patch, prerelease, build) | `An object with major, minor, patch (numbers), prerelease and build (string or null)` |
| [`isValid`](#isvalid) | Check whether a string is a valid semver version | `True if the string is a valid semver version` |
| [`compare`](#compare) | Compare two semver versions, returning -1 (v1 < v2), 0 (equal), or 1 (v1 > v2) | `-1 if v1 < v2, 0 if equal, 1 if v1 > v2` |
| [`gt`](#gt) | Check if the first version is greater than the second | `True if v1 is greater than v2` |
| [`lt`](#lt) | Check if the first version is less than the second | `True if v1 is less than v2` |
| [`eq`](#eq) | Check if two versions are equal (ignoring build metadata) | `True if v1 equals v2 (build metadata is ignored)` |
| [`gte`](#gte) | Check if the first version is greater than or equal to the second | `True if v1 is greater than or equal to v2` |
| [`lte`](#lte) | Check if the first version is less than or equal to the second | `True if v1 is less than or equal to v2` |
| [`satisfies`](#satisfies) | Check if a version satisfies a semver range (supports ^, ~, >=, <=, >, <, =, x wildcard, ||) | `True if the version satisfies the range` |
| [`inc`](#inc) | Increment a version by the specified release type (major, minor, patch, or prerelease) | `The incremented version string` |
| [`major`](#major) | Extract the major version number from a semver string | `The major version number` |
| [`minor`](#minor) | Extract the minor version number from a semver string | `The minor version number` |
| [`patch`](#patch) | Extract the patch version number from a semver string | `The patch version number` |
| [`coerce`](#coerce) | Coerce a loose version string into a clean semver string (e.g. "v1" becomes "1.0.0") | `A clean semver version string (e.g. "1.0.0", "1.2.0", "42.0.0")` |
| [`diff`](#diff) | Determine the type of difference between two versions (major, minor, patch, prerelease, or null) | `The difference type: "major", "minor", "patch", "prerelease", or null if equal` |


## Functions

### parse

Parse a semver version string into its components (major, minor, patch, prerelease, build)

**Module:** `semver` | **Returns:** `object` -- An object with major, minor, patch (numbers), prerelease and build (string or null)

```robinpath
semver.parse "1.2.3-beta.1+build.42"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `version` | `string` | Yes | The semver version string to parse (e.g. "1.2.3-beta.1+build.42") |

---

### isValid

Check whether a string is a valid semver version

**Module:** `semver` | **Returns:** `boolean` -- True if the string is a valid semver version

```robinpath
semver.isValid "1.2.3"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `version` | `string` | Yes | The version string to validate |

---

### compare

Compare two semver versions, returning -1 (v1 < v2), 0 (equal), or 1 (v1 > v2)

**Module:** `semver` | **Returns:** `number` -- -1 if v1 < v2, 0 if equal, 1 if v1 > v2

```robinpath
semver.compare "1.2.3" "1.3.0"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `v1` | `string` | Yes | The first version string |
| `v2` | `string` | Yes | The second version string |

---

### gt

Check if the first version is greater than the second

**Module:** `semver` | **Returns:** `boolean` -- True if v1 is greater than v2

```robinpath
semver.gt "2.0.0" "1.9.9"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `v1` | `string` | Yes | The first version string |
| `v2` | `string` | Yes | The second version string |

---

### lt

Check if the first version is less than the second

**Module:** `semver` | **Returns:** `boolean` -- True if v1 is less than v2

```robinpath
semver.lt "1.0.0" "2.0.0"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `v1` | `string` | Yes | The first version string |
| `v2` | `string` | Yes | The second version string |

---

### eq

Check if two versions are equal (ignoring build metadata)

**Module:** `semver` | **Returns:** `boolean` -- True if v1 equals v2 (build metadata is ignored)

```robinpath
semver.eq "1.2.3" "1.2.3+build.1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `v1` | `string` | Yes | The first version string |
| `v2` | `string` | Yes | The second version string |

---

### gte

Check if the first version is greater than or equal to the second

**Module:** `semver` | **Returns:** `boolean` -- True if v1 is greater than or equal to v2

```robinpath
semver.gte "1.2.3" "1.2.3"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `v1` | `string` | Yes | The first version string |
| `v2` | `string` | Yes | The second version string |

---

### lte

Check if the first version is less than or equal to the second

**Module:** `semver` | **Returns:** `boolean` -- True if v1 is less than or equal to v2

```robinpath
semver.lte "1.2.3" "1.3.0"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `v1` | `string` | Yes | The first version string |
| `v2` | `string` | Yes | The second version string |

---

### satisfies

Check if a version satisfies a semver range (supports ^, ~, >=, <=, >, <, =, x wildcard, ||)

**Module:** `semver` | **Returns:** `boolean` -- True if the version satisfies the range

```robinpath
semver.satisfies "1.2.3" "^1.0.0"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `version` | `string` | Yes | The version string to test |
| `range` | `string` | Yes | The semver range expression (e.g. "^1.2.0", ">=1.0.0 <2.0.0", "1.x || 2.x") |

---

### inc

Increment a version by the specified release type (major, minor, patch, or prerelease)

**Module:** `semver` | **Returns:** `string` -- The incremented version string

```robinpath
semver.inc "1.2.3" "minor"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `version` | `string` | Yes | The version string to increment |
| `release` | `string` | Yes | The release type: "major", "minor", "patch", or "prerelease" |

---

### major

Extract the major version number from a semver string

**Module:** `semver` | **Returns:** `number` -- The major version number

```robinpath
semver.major "1.2.3"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `version` | `string` | Yes | The version string |

---

### minor

Extract the minor version number from a semver string

**Module:** `semver` | **Returns:** `number` -- The minor version number

```robinpath
semver.minor "1.2.3"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `version` | `string` | Yes | The version string |

---

### patch

Extract the patch version number from a semver string

**Module:** `semver` | **Returns:** `number` -- The patch version number

```robinpath
semver.patch "1.2.3"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `version` | `string` | Yes | The version string |

---

### coerce

Coerce a loose version string into a clean semver string (e.g. "v1" becomes "1.0.0")

**Module:** `semver` | **Returns:** `string` -- A clean semver version string (e.g. "1.0.0", "1.2.0", "42.0.0")

```robinpath
semver.coerce "v1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `version` | `string` | Yes | A loose version string (e.g. "v1", "1.2", "42") |

---

### diff

Determine the type of difference between two versions (major, minor, patch, prerelease, or null)

**Module:** `semver` | **Returns:** `string` -- The difference type: "major", "minor", "patch", "prerelease", or null if equal

```robinpath
semver.diff "1.0.0" "2.0.0"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `v1` | `string` | Yes | The first version string |
| `v2` | `string` | Yes | The second version string |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Invalid semver version: ${raw}` | Check the error message for details |
| `Cannot coerce to semver: ${raw}` | Check the error message for details |
| `Invalid release type: ${release}. Must be one of: major, minor, patch, prerelease` | Check the error message for details |

```robinpath
set $result as semver.parse "1.2.3-beta.1+build.42"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Semver workflow

Chain multiple semver operations together.

```robinpath
set $r_parse as semver.parse "1.2.3-beta.1+build.42"
set $r_isValid as semver.isValid "1.2.3"
set $r_compare as semver.compare "1.2.3" "1.3.0"
print "All operations complete"
```

### 2. Safe parse with validation

Check results before proceeding.

```robinpath
set $result as semver.parse "1.2.3-beta.1+build.42"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
