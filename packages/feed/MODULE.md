---
title: "Feed"
module: "feed"
package: "@robinpath/feed"
description: "RSS, Atom, and JSON Feed creation, parsing, manipulation, and auto-detection"
category: "web"
tags: [feed, web]
type: "utility"
auth: "none"
functionCount: 14
---

# Feed

> RSS, Atom, and JSON Feed creation, parsing, manipulation, and auto-detection

**Package:** `@robinpath/feed` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `feed` module when you need to:

- **Create RSS 2.0 feed** -- Use `feed.createRss` to perform this operation
- **Create Atom feed** -- Use `feed.createAtom` to perform this operation
- **Create JSON Feed** -- Use `feed.createJson` to perform this operation
- **Parse RSS feed** -- Use `feed.parseRss` to perform this operation
- **Parse Atom feed** -- Use `feed.parseAtom` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`createRss`](#createrss) | Create RSS 2.0 feed | `RSS XML` |
| [`createAtom`](#createatom) | Create Atom feed | `Atom XML` |
| [`createJson`](#createjson) | Create JSON Feed | `JSON Feed string` |
| [`parseRss`](#parserss) | Parse RSS feed | `{type, title, link, items[]}` |
| [`parseAtom`](#parseatom) | Parse Atom feed | `{type, title, link, items[]}` |
| [`parseJson`](#parsejson) | Parse JSON Feed | `{type, title, link, items[]}` |
| [`detect`](#detect) | Detect feed format | `rss | atom | json | unknown` |
| [`parse`](#parse) | Auto-detect and parse any feed | `{type, title, link, items[]}` |
| [`addItem`](#additem) | Add item to feed config | `Updated config` |
| [`removeItem`](#removeitem) | Remove item by guid | `Updated config` |
| [`sortItems`](#sortitems) | Sort items by date | `Sorted items` |
| [`filterItems`](#filteritems) | Filter items by field regex | `Matching items` |
| [`mergeFeeds`](#mergefeeds) | Merge multiple feeds | `Merged feed config` |
| [`fetch`](#fetch) | Fetch and parse feed from URL | `{ok, status, feed}` |


## Functions

### createRss

Create RSS 2.0 feed

**Module:** `feed` | **Returns:** `string` -- RSS XML

```robinpath
feed.createRss {"title": "My Blog", "link": "https://example.com", "items": [...]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `config` | `object` | Yes | {title, link, description, language, items[]} |

---

### createAtom

Create Atom feed

**Module:** `feed` | **Returns:** `string` -- Atom XML

```robinpath
feed.createAtom {"title": "My Blog", "link": "https://example.com", "items": [...]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `config` | `object` | Yes | {title, link, description, items[]} |

---

### createJson

Create JSON Feed

**Module:** `feed` | **Returns:** `string` -- JSON Feed string

```robinpath
feed.createJson {"title": "My Blog", "items": [...]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `config` | `object` | Yes | {title, link, description, items[]} |

---

### parseRss

Parse RSS feed

**Module:** `feed` | **Returns:** `object` -- {type, title, link, items[]}

```robinpath
feed.parseRss $xml
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xml` | `string` | Yes | RSS XML |

---

### parseAtom

Parse Atom feed

**Module:** `feed` | **Returns:** `object` -- {type, title, link, items[]}

```robinpath
feed.parseAtom $xml
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xml` | `string` | Yes | Atom XML |

---

### parseJson

Parse JSON Feed

**Module:** `feed` | **Returns:** `object` -- {type, title, link, items[]}

```robinpath
feed.parseJson $json
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `json` | `string` | Yes | JSON Feed |

---

### detect

Detect feed format

**Module:** `feed` | **Returns:** `string` -- rss | atom | json | unknown

```robinpath
feed.detect $content
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `content` | `string` | Yes | Feed content |

---

### parse

Auto-detect and parse any feed

**Module:** `feed` | **Returns:** `object` -- {type, title, link, items[]}

```robinpath
feed.parse $content
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `content` | `string` | Yes | Feed content |

---

### addItem

Add item to feed config

**Module:** `feed` | **Returns:** `object` -- Updated config

```robinpath
feed.addItem $config {"title": "New Post", "link": "..."}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `config` | `object` | Yes | Feed config |
| `item` | `object` | Yes | {title, link, description, pubDate, ...} |

---

### removeItem

Remove item by guid

**Module:** `feed` | **Returns:** `object` -- Updated config

```robinpath
feed.removeItem $config "https://example.com/old-post"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `config` | `object` | Yes | Feed config |
| `guid` | `string` | Yes | Item GUID or link |

---

### sortItems

Sort items by date

**Module:** `feed` | **Returns:** `array` -- Sorted items

```robinpath
feed.sortItems $items
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `items` | `array` | Yes | Feed items |
| `descending` | `boolean` | No | Newest first (default true) |

---

### filterItems

Filter items by field regex

**Module:** `feed` | **Returns:** `array` -- Matching items

```robinpath
feed.filterItems $items "title" "javascript"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `items` | `array` | Yes | Feed items |
| `field` | `string` | Yes | Field name |
| `pattern` | `string` | Yes | Regex pattern |

---

### mergeFeeds

Merge multiple feeds

**Module:** `feed` | **Returns:** `object` -- Merged feed config

```robinpath
feed.mergeFeeds [$feed1, $feed2]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `feeds` | `array` | Yes | Array of feed configs |

---

### fetch

Fetch and parse feed from URL

**Module:** `feed` | **Returns:** `object` -- {ok, status, feed}

```robinpath
feed.fetch "https://example.com/feed.xml"
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
set $result as feed.createRss {"title": "My Blog", "link": "https://example.com", "items": [...]}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with createRss

Create a new resource and capture the result.

```robinpath
set $result as feed.createRss {"title": "My Blog", "link": "https://example.com", "items": [...]}
print "Created: " + $result
```

### 2. Multi-step Feed workflow

Chain multiple feed operations together.

```robinpath
set $r_createRss as feed.createRss {"title": "My Blog", "link": "https://example.com", "items": [...]}
set $r_createAtom as feed.createAtom {"title": "My Blog", "link": "https://example.com", "items": [...]}
set $r_createJson as feed.createJson {"title": "My Blog", "items": [...]}
print "All operations complete"
```

### 3. Safe createRss with validation

Check results before proceeding.

```robinpath
set $result as feed.createRss {"title": "My Blog", "link": "https://example.com", "items": [...]}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
