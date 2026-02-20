---
title: "RSS"
module: "rss"
package: "@robinpath/rss"
description: "Parse RSS and Atom feeds, detect new entries, and get feed metadata"
category: "web"
tags: [rss, web]
type: "utility"
auth: "none"
functionCount: 6
---

# RSS

> Parse RSS and Atom feeds, detect new entries, and get feed metadata

**Package:** `@robinpath/rss` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `rss` module when you need to:

- **Parse an RSS/Atom feed from a URL** -- Use `rss.parse` to perform this operation
- **Parse RSS/Atom XML from a string** -- Use `rss.parseString` to perform this operation
- **Get feed items with a limit** -- Use `rss.getItems` to perform this operation
- **Get only new items since last check or since a date** -- Use `rss.getNew` to perform this operation
- **Get the most recent item from a feed** -- Use `rss.getLatest` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`parse`](#parse) | Parse an RSS/Atom feed from a URL | `{title, description, link, items}` |
| [`parseString`](#parsestring) | Parse RSS/Atom XML from a string | `{title, items}` |
| [`getItems`](#getitems) | Get feed items with a limit | `Array of items` |
| [`getNew`](#getnew) | Get only new items since last check or since a date | `Array of new items` |
| [`getLatest`](#getlatest) | Get the most recent item from a feed | `Latest item or null` |
| [`feedInfo`](#feedinfo) | Get feed metadata without items | `{title, description, link, itemCount}` |


## Functions

### parse

Parse an RSS/Atom feed from a URL

**Module:** `rss` | **Returns:** `object` -- {title, description, link, items}

```robinpath
rss.parse "https://blog.example.com/feed"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Feed URL |

---

### parseString

Parse RSS/Atom XML from a string

**Module:** `rss` | **Returns:** `object` -- {title, items}

```robinpath
rss.parseString $xmlContent
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xml` | `string` | Yes | XML content |

---

### getItems

Get feed items with a limit

**Module:** `rss` | **Returns:** `array` -- Array of items

```robinpath
rss.getItems "https://blog.example.com/feed" 5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Feed URL |
| `limit` | `number` | No | Max items (default 10) |

---

### getNew

Get only new items since last check or since a date

**Module:** `rss` | **Returns:** `array` -- Array of new items

```robinpath
rss.getNew "https://blog.example.com/feed" "2025-01-01"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Feed URL |
| `since` | `string` | No | ISO date (optional, uses cache if omitted) |

---

### getLatest

Get the most recent item from a feed

**Module:** `rss` | **Returns:** `object` -- Latest item or null

```robinpath
rss.getLatest "https://blog.example.com/feed"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Feed URL |

---

### feedInfo

Get feed metadata without items

**Module:** `rss` | **Returns:** `object` -- {title, description, link, itemCount}

```robinpath
rss.feedInfo "https://blog.example.com/feed"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Feed URL |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as rss.parse "https://blog.example.com/feed"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Items

Retrieve all items and loop through them.

```robinpath
set $result as rss.getItems "https://blog.example.com/feed" 5
each $item in $result
  print $item
end
```

### 2. Multi-step RSS workflow

Chain multiple rss operations together.

```robinpath
set $r_parse as rss.parse "https://blog.example.com/feed"
set $r_parseString as rss.parseString $xmlContent
set $r_getItems as rss.getItems "https://blog.example.com/feed" 5
print "All operations complete"
```

### 3. Safe parse with validation

Check results before proceeding.

```robinpath
set $result as rss.parse "https://blog.example.com/feed"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
