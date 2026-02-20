---
title: "Sitemap"
module: "sitemap"
package: "@robinpath/sitemap"
description: "XML sitemap generation, parsing, validation, and manipulation with image/video/alternate support"
category: "web"
tags: [sitemap, web]
type: "utility"
auth: "none"
functionCount: 13
---

# Sitemap

> XML sitemap generation, parsing, validation, and manipulation with image/video/alternate support

**Package:** `@robinpath/sitemap` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `sitemap` module when you need to:

- **Create XML sitemap** -- Use `sitemap.create` to perform this operation
- **Create sitemap index** -- Use `sitemap.createIndex` to perform this operation
- **Parse XML sitemap** -- Use `sitemap.parse` to perform this operation
- **Parse sitemap index** -- Use `sitemap.parseIndex` to perform this operation
- **Add URL to sitemap XML** -- Use `sitemap.addUrl` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create XML sitemap | `XML sitemap` |
| [`createIndex`](#createindex) | Create sitemap index | `XML sitemap index` |
| [`parse`](#parse) | Parse XML sitemap | `Array of URL objects` |
| [`parseIndex`](#parseindex) | Parse sitemap index | `Array of {loc, lastmod}` |
| [`addUrl`](#addurl) | Add URL to sitemap XML | `Updated XML` |
| [`removeUrl`](#removeurl) | Remove URL from sitemap XML | `Updated XML` |
| [`filterByChangefreq`](#filterbychangefreq) | Filter URLs by change frequency | `Filtered URLs` |
| [`filterByPriority`](#filterbypriority) | Filter URLs by priority range | `Filtered URLs` |
| [`sortByPriority`](#sortbypriority) | Sort URLs by priority | `Sorted URLs` |
| [`sortByLastmod`](#sortbylastmod) | Sort URLs by last modified | `Sorted URLs` |
| [`count`](#count) | Count URLs in sitemap | `URL count` |
| [`extractLocs`](#extractlocs) | Extract all loc URLs | `Array of URL strings` |
| [`validate`](#validate) | Validate sitemap XML | `{valid, errors[], urlCount}` |


## Functions

### create

Create XML sitemap

**Module:** `sitemap` | **Returns:** `string` -- XML sitemap

```robinpath
sitemap.create [{"loc": "https://example.com/", "priority": 1.0}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urls` | `array` | Yes | Array of {loc, lastmod, changefreq, priority, images, videos, alternates} |
| `options` | `object` | No | {pretty} |

---

### createIndex

Create sitemap index

**Module:** `sitemap` | **Returns:** `string` -- XML sitemap index

```robinpath
sitemap.createIndex [{"loc": "https://example.com/sitemap1.xml"}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sitemaps` | `array` | Yes | Array of {loc, lastmod} |

---

### parse

Parse XML sitemap

**Module:** `sitemap` | **Returns:** `array` -- Array of URL objects

```robinpath
sitemap.parse $xml
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xml` | `string` | Yes | XML sitemap content |

---

### parseIndex

Parse sitemap index

**Module:** `sitemap` | **Returns:** `array` -- Array of {loc, lastmod}

```robinpath
sitemap.parseIndex $xml
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xml` | `string` | Yes | XML sitemap index |

---

### addUrl

Add URL to sitemap XML

**Module:** `sitemap` | **Returns:** `string` -- Updated XML

```robinpath
sitemap.addUrl $xml {"loc": "https://example.com/new"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xml` | `string` | Yes | Existing sitemap XML |
| `url` | `object` | Yes | URL object |

---

### removeUrl

Remove URL from sitemap XML

**Module:** `sitemap` | **Returns:** `string` -- Updated XML

```robinpath
sitemap.removeUrl $xml "https://example.com/old"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xml` | `string` | Yes | Sitemap XML |
| `loc` | `string` | Yes | URL to remove |

---

### filterByChangefreq

Filter URLs by change frequency

**Module:** `sitemap` | **Returns:** `array` -- Filtered URLs

```robinpath
sitemap.filterByChangefreq $urls "daily"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urls` | `array` | Yes | Parsed URLs |
| `changefreq` | `string` | Yes | Frequency |

---

### filterByPriority

Filter URLs by priority range

**Module:** `sitemap` | **Returns:** `array` -- Filtered URLs

```robinpath
sitemap.filterByPriority $urls 0.8 1.0
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urls` | `array` | Yes | Parsed URLs |
| `min` | `number` | Yes | Min priority |
| `max` | `number` | No | Max priority |

---

### sortByPriority

Sort URLs by priority

**Module:** `sitemap` | **Returns:** `array` -- Sorted URLs

```robinpath
sitemap.sortByPriority $urls
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urls` | `array` | Yes | Parsed URLs |
| `descending` | `boolean` | No | Descending (default true) |

---

### sortByLastmod

Sort URLs by last modified

**Module:** `sitemap` | **Returns:** `array` -- Sorted URLs

```robinpath
sitemap.sortByLastmod $urls
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urls` | `array` | Yes | Parsed URLs |
| `descending` | `boolean` | No | Descending (default true) |

---

### count

Count URLs in sitemap

**Module:** `sitemap` | **Returns:** `number` -- URL count

```robinpath
sitemap.count $urls
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urls` | `array` | Yes | Parsed URLs |

---

### extractLocs

Extract all loc URLs

**Module:** `sitemap` | **Returns:** `array` -- Array of URL strings

```robinpath
sitemap.extractLocs $urls
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urls` | `array` | Yes | Parsed URLs |

---

### validate

Validate sitemap XML

**Module:** `sitemap` | **Returns:** `object` -- {valid, errors[], urlCount}

```robinpath
sitemap.validate $xml
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xml` | `string` | Yes | Sitemap XML |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as sitemap.create [{"loc": "https://example.com/", "priority": 1.0}]
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as sitemap.create [{"loc": "https://example.com/", "priority": 1.0}]
print "Created: " + $result
```

### 2. Multi-step Sitemap workflow

Chain multiple sitemap operations together.

```robinpath
set $r_create as sitemap.create [{"loc": "https://example.com/", "priority": 1.0}]
set $r_createIndex as sitemap.createIndex [{"loc": "https://example.com/sitemap1.xml"}]
set $r_parse as sitemap.parse $xml
print "All operations complete"
```

### 3. Safe create with validation

Check results before proceeding.

```robinpath
set $result as sitemap.create [{"loc": "https://example.com/", "priority": 1.0}]
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
