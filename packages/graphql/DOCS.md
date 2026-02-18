---
title: "GraphQL"
module: "graphql"
package: "@robinpath/graphql"
description: "GraphQL client with queries, mutations, variables, introspection, batch requests, and query builder"
category: "web"
tags: [graphql, web]
type: "utility"
auth: "none"
functionCount: 9
---

# GraphQL

> GraphQL client with queries, mutations, variables, introspection, batch requests, and query builder

**Package:** `@robinpath/graphql` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `graphql` module when you need to:

- **Create a named GraphQL client** -- Use `graphql.create` to perform this operation
- **Execute a GraphQL query** -- Use `graphql.query` to perform this operation
- **Execute a GraphQL mutation** -- Use `graphql.mutate` to perform this operation
- **Send a one-off GraphQL request without creating a client** -- Use `graphql.rawRequest` to perform this operation
- **Run an introspection query to discover the schema** -- Use `graphql.introspect` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create a named GraphQL client | `{name, endpoint}` |
| [`query`](#query) | Execute a GraphQL query | `Query data` |
| [`mutate`](#mutate) | Execute a GraphQL mutation | `Mutation result` |
| [`rawRequest`](#rawrequest) | Send a one-off GraphQL request without creating a client | `Full response {data, errors}` |
| [`introspect`](#introspect) | Run an introspection query to discover the schema | `Schema introspection result` |
| [`listTypes`](#listtypes) | List all types in the GraphQL schema | `Array of {name, kind, description}` |
| [`buildQuery`](#buildquery) | Build a simple GraphQL query string from parts | `GraphQL query string` |
| [`batchQuery`](#batchquery) | Execute multiple queries sequentially | `Array of {data, error}` |
| [`destroy`](#destroy) | Remove a GraphQL client | `True if removed` |


## Functions

### create

Create a named GraphQL client

**Module:** `graphql` | **Returns:** `object` -- {name, endpoint}

```robinpath
graphql.create "github" "https://api.github.com/graphql" {"token": $ghToken}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Client name |
| `endpoint` | `string` | Yes | GraphQL endpoint URL |
| `options` | `object` | No | {token, apiKey, headers} |

---

### query

Execute a GraphQL query

**Module:** `graphql` | **Returns:** `object` -- Query data

```robinpath
graphql.query "github" "{ viewer { login name } }"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `client` | `string` | Yes | Client name |
| `query` | `string` | Yes | GraphQL query string |
| `variables` | `object` | No | Query variables |
| `options` | `object` | No | {operationName, ignoreErrors, raw, headers} |

---

### mutate

Execute a GraphQL mutation

**Module:** `graphql` | **Returns:** `object` -- Mutation result

```robinpath
graphql.mutate "api" "mutation { createUser(name: $name) { id } }" {"name": "Alice"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `client` | `string` | Yes | Client name |
| `mutation` | `string` | Yes | GraphQL mutation string |
| `variables` | `object` | No | Mutation variables |

---

### rawRequest

Send a one-off GraphQL request without creating a client

**Module:** `graphql` | **Returns:** `object` -- Full response {data, errors}

```robinpath
graphql.rawRequest "https://api.example.com/graphql" "{ users { id } }"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `endpoint` | `string` | Yes | GraphQL URL |
| `query` | `string` | Yes | Query string |
| `variables` | `object` | No | Variables |
| `headers` | `object` | No | Custom headers |

---

### introspect

Run an introspection query to discover the schema

**Module:** `graphql` | **Returns:** `object` -- Schema introspection result

```robinpath
graphql.introspect "github"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `client` | `string` | Yes | Client name |

---

### listTypes

List all types in the GraphQL schema

**Module:** `graphql` | **Returns:** `array` -- Array of {name, kind, description}

```robinpath
graphql.listTypes "github"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `client` | `string` | Yes | Client name |

---

### buildQuery

Build a simple GraphQL query string from parts

**Module:** `graphql` | **Returns:** `string` -- GraphQL query string

```robinpath
graphql.buildQuery "query" "getUser" ["id", "name", "email"] {"id": "ID!"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `string` | Yes | 'query' or 'mutation' |
| `name` | `string` | Yes | Operation name |
| `fields` | `array` | Yes | Fields to select |
| `variables` | `object` | No | {varName: 'Type'} |

---

### batchQuery

Execute multiple queries sequentially

**Module:** `graphql` | **Returns:** `array` -- Array of {data, error}

```robinpath
graphql.batchQuery "api" $queries
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `client` | `string` | Yes | Client name |
| `queries` | `array` | Yes | Array of {query, variables} |

---

### destroy

Remove a GraphQL client

**Module:** `graphql` | **Returns:** `boolean` -- True if removed

```robinpath
graphql.destroy "github"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `client` | `string` | Yes | Client name |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `GraphQL endpoint URL is required` | Check the error message for details |
| `GraphQL error: ${firstError.message}` | Check the error message for details |
| `GraphQL client "..." not found. Create it first.` | Check the error message for details |

```robinpath
set $result as graphql.create "github" "https://api.github.com/graphql" {"token": $ghToken}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Types

Retrieve all items and loop through them.

```robinpath
set $result as graphql.listTypes "github"
each $item in $result
  print $item
end
```

### 2. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as graphql.create "github" "https://api.github.com/graphql" {"token": $ghToken}
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as graphql.listTypes "github"
if $existing == null
  graphql.create "github" "https://api.github.com/graphql" {"token": $ghToken}
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step GraphQL workflow

Chain multiple graphql operations together.

```robinpath
set $r_create as graphql.create "github" "https://api.github.com/graphql" {"token": $ghToken}
set $r_query as graphql.query "github" "{ viewer { login name } }"
set $r_mutate as graphql.mutate "api" "mutation { createUser(name: $name) { id } }" {"name": "Alice"}
print "All operations complete"
```

### 5. Safe create with validation

Check results before proceeding.

```robinpath
set $result as graphql.create "github" "https://api.github.com/graphql" {"token": $ghToken}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
