# @robinpath/router

> URL routing and pattern matching with support for path parameters (:param), wildcards (*), route groups, and middleware. No external dependencies.

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `router` module lets you:

- Create a new router instance
- Add a route with method, path pattern, and handler
- Match a URL against registered routes and return the matching route
- Extract path parameters from a URL using a pattern
- Parse a URL into pathname, segments, and query parameters

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/router
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
router.add
```

## Available Functions

| Function | Description |
|----------|-------------|
| `router.create` | Create a new router instance |
| `router.add` | Add a route with method, path pattern, and handler |
| `router.match` | Match a URL against registered routes and return the matching route |
| `router.params` | Extract path parameters from a URL using a pattern |
| `router.parse` | Parse a URL into pathname, segments, and query parameters |
| `router.build` | Build a URL from a pattern and parameter values |
| `router.normalize` | Normalize a URL path (collapse slashes, ensure leading slash, strip trailing slash) |
| `router.isMatch` | Test if a URL path matches a route pattern |
| `router.group` | Create a route group with a shared prefix |
| `router.list` | List all routes registered in a router |
| `router.remove` | Remove routes by method and/or path |
| `router.middleware` | Add a middleware function to the router |

## Examples

### Add a route with method, path pattern, and handler

```robinpath
router.add
```

### Match a URL against registered routes and return the matching route

```robinpath
router.match
```

### Extract path parameters from a URL using a pattern

```robinpath
router.params
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/router";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  router.add
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
