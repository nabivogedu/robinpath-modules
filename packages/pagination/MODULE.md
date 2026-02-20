---
title: "Pagination"
module: "pagination"
package: "@robinpath/pagination"
description: "Auto-paginate APIs with offset, cursor, page-number, and Link-header strategies"
category: "other"
tags: [pagination, other, api]
type: "utility"
auth: "none"
functionCount: 4
---

# Pagination

> Auto-paginate APIs with offset, cursor, page-number, and Link-header strategies

**Package:** `@robinpath/pagination` | **Category:** Other | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `pagination` module when you need to:

- **Auto-paginate an API and collect all items** -- Use `pagination.fetchAll` to perform this operation
- **Fetch a single page of results** -- Use `pagination.fetchPage` to perform this operation
- **Parse a Link header into rel-url pairs** -- Use `pagination.parseLinkHeader` to perform this operation
- **Build a paginated URL with page/limit parameters** -- Use `pagination.buildPageUrl` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`fetchAll`](#fetchall) | Auto-paginate an API and collect all items | `{items, total}` |
| [`fetchPage`](#fetchpage) | Fetch a single page of results | `{items, page, pageSize, hasMore, total}` |
| [`parseLinkHeader`](#parselinkheader) | Parse a Link header into rel-url pairs | `{next, prev, first, last} URLs` |
| [`buildPageUrl`](#buildpageurl) | Build a paginated URL with page/limit parameters | `Complete URL with pagination params` |


## Functions

### fetchAll

Auto-paginate an API and collect all items

**Module:** `pagination` | **Returns:** `object` -- {items, total}

```robinpath
pagination.fetchAll "https://api.example.com/users" {"strategy": "offset", "pageSize": 100}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | API base URL |
| `options` | `object` | Yes | {strategy: offset|cursor|page|link, headers, maxPages, pageSize, itemsKey, ...} |

---

### fetchPage

Fetch a single page of results

**Module:** `pagination` | **Returns:** `object` -- {items, page, pageSize, hasMore, total}

```robinpath
pagination.fetchPage "https://api.example.com/users" 2 {"pageSize": 20}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | API URL |
| `page` | `number` | Yes | Page number |
| `options` | `object` | No | {pageSize, headers, itemsKey} |

---

### parseLinkHeader

Parse a Link header into rel-url pairs

**Module:** `pagination` | **Returns:** `object` -- {next, prev, first, last} URLs

```robinpath
pagination.parseLinkHeader $linkHeader
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `header` | `string` | Yes | Link header value |

---

### buildPageUrl

Build a paginated URL with page/limit parameters

**Module:** `pagination` | **Returns:** `string` -- Complete URL with pagination params

```robinpath
pagination.buildPageUrl "https://api.example.com/users" 3 {"limit": 50}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `baseUrl` | `string` | Yes | Base URL |
| `page` | `number` | Yes | Page number |
| `options` | `object` | No | {limit, pageParam, limitParam} |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as pagination.fetchAll "https://api.example.com/users" {"strategy": "offset", "pageSize": 100}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Pagination workflow

Chain multiple pagination operations together.

```robinpath
set $r_fetchAll as pagination.fetchAll "https://api.example.com/users" {"strategy": "offset", "pageSize": 100}
set $r_fetchPage as pagination.fetchPage "https://api.example.com/users" 2 {"pageSize": 20}
set $r_parseLinkHeader as pagination.parseLinkHeader $linkHeader
print "All operations complete"
```

### 2. Safe fetchAll with validation

Check results before proceeding.

```robinpath
set $result as pagination.fetchAll "https://api.example.com/users" {"strategy": "offset", "pageSize": 100}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
