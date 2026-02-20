# @robinpath/semver

> Parse, compare, validate, and manipulate semantic version strings (semver 2.0.0 compliant)

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `semver` module lets you:

- Parse a semver version string into its components (major, minor, patch, prerelease, build)
- Check whether a string is a valid semver version
- Compare two semver versions, returning -1 (v1 < v2), 0 (equal), or 1 (v1 > v2)
- Check if the first version is greater than the second
- Check if the first version is less than the second

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/semver
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
semver.isValid "1.2.3"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `semver.parse` | Parse a semver version string into its components (major, minor, patch, prerelease, build) |
| `semver.isValid` | Check whether a string is a valid semver version |
| `semver.compare` | Compare two semver versions, returning -1 (v1 < v2), 0 (equal), or 1 (v1 > v2) |
| `semver.gt` | Check if the first version is greater than the second |
| `semver.lt` | Check if the first version is less than the second |
| `semver.eq` | Check if two versions are equal (ignoring build metadata) |
| `semver.gte` | Check if the first version is greater than or equal to the second |
| `semver.lte` | Check if the first version is less than or equal to the second |
| `semver.satisfies` | Check if a version satisfies a semver range (supports ^, ~, >=, <=, >, <, =, x wildcard, |
| `semver.inc` | Increment a version by the specified release type (major, minor, patch, or prerelease) |
| `semver.major` | Extract the major version number from a semver string |
| `semver.minor` | Extract the minor version number from a semver string |
| `semver.patch` | Extract the patch version number from a semver string |
| `semver.coerce` | Coerce a loose version string into a clean semver string (e.g. "v1" becomes "1.0.0") |
| `semver.diff` | Determine the type of difference between two versions (major, minor, patch, prerelease, or null) |

## Examples

### Check whether a string is a valid semver version

```robinpath
semver.isValid "1.2.3"
```

### Compare two semver versions, returning -1 (v1 < v2), 0 (equal), or 1 (v1 > v2)

```robinpath
semver.compare "1.2.3" "1.3.0"
```

### Check if the first version is greater than the second

```robinpath
semver.gt "2.0.0" "1.9.9"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/semver";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  semver.isValid "1.2.3"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
