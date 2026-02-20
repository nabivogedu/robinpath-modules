# @robinpath/graphql

> GraphQL client with queries, mutations, variables, introspection, batch requests, and query builder

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-9-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `graphql` module lets you:

- Create a named GraphQL client
- Execute a GraphQL query
- Execute a GraphQL mutation
- Send a one-off GraphQL request without creating a client
- Run an introspection query to discover the schema

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/graphql
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
graphql.query "github" "{ viewer { login name } }"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `graphql.create` | Create a named GraphQL client |
| `graphql.query` | Execute a GraphQL query |
| `graphql.mutate` | Execute a GraphQL mutation |
| `graphql.rawRequest` | Send a one-off GraphQL request without creating a client |
| `graphql.introspect` | Run an introspection query to discover the schema |
| `graphql.listTypes` | List all types in the GraphQL schema |
| `graphql.buildQuery` | Build a simple GraphQL query string from parts |
| `graphql.batchQuery` | Execute multiple queries sequentially |
| `graphql.destroy` | Remove a GraphQL client |

## Examples

### Execute a GraphQL query

```robinpath
graphql.query "github" "{ viewer { login name } }"
```

### Execute a GraphQL mutation

```robinpath
graphql.mutate "api" "mutation { createUser(name: $name) { id } }" {"name": "Alice"}
```

### Send a one-off GraphQL request without creating a client

```robinpath
graphql.rawRequest "https://api.example.com/graphql" "{ users { id } }"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/graphql";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  graphql.query "github" "{ viewer { login name } }"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
