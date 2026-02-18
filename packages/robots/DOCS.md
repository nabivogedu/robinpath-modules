---
title: "Robots"
module: "robots"
package: "@robinpath/robots"
description: "robots.txt parsing, generation, URL permission checking, and crawl configuration"
category: "web"
tags: [robots, web]
type: "utility"
auth: "none"
functionCount: 13
---

# Robots

> robots.txt parsing, generation, URL permission checking, and crawl configuration

**Package:** `@robinpath/robots` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `robots` module when you need to:

- **Parse robots.txt content** -- Use `robots.parse` to perform this operation
- **Generate robots.txt** -- Use `robots.create` to perform this operation
- **Check if URL is allowed** -- Use `robots.isAllowed` to perform this operation
- **Check if URL is disallowed** -- Use `robots.isDisallowed` to perform this operation
- **Get crawl delay for agent** -- Use `robots.getCrawlDelay` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`parse`](#parse) | Parse robots.txt content | `{rules[], sitemaps[], host}` |
| [`create`](#create) | Generate robots.txt | `robots.txt content` |
| [`isAllowed`](#isallowed) | Check if URL is allowed | `true if allowed` |
| [`isDisallowed`](#isdisallowed) | Check if URL is disallowed | `true if disallowed` |
| [`getCrawlDelay`](#getcrawldelay) | Get crawl delay for agent | `Delay in seconds or null` |
| [`getSitemaps`](#getsitemaps) | Get sitemap URLs | `Sitemap URLs` |
| [`getRules`](#getrules) | Get rules for agent | `Matching rules` |
| [`addRule`](#addrule) | Add rule to robots config | `Updated config` |
| [`removeRule`](#removerule) | Remove rule by user agent | `Updated config` |
| [`addSitemap`](#addsitemap) | Add sitemap URL | `Updated config` |
| [`allowAll`](#allowall) | Generate allow-all robots.txt | `robots.txt` |
| [`disallowAll`](#disallowall) | Generate disallow-all robots.txt | `robots.txt` |
| [`fetch`](#fetch) | Fetch and parse robots.txt from URL | `{found, status, parsed, raw}` |


## Functions

### parse

Parse robots.txt content

**Module:** `robots` | **Returns:** `object` -- {rules[], sitemaps[], host}

```robinpath
robots.parse $text
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | robots.txt content |

---

### create

Generate robots.txt

**Module:** `robots` | **Returns:** `string` -- robots.txt content

```robinpath
robots.create {"rules": [{"userAgent": "*", "disallow": ["/admin"]}]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `config` | `object` | Yes | {rules[], sitemaps[], host} |

---

### isAllowed

Check if URL is allowed

**Module:** `robots` | **Returns:** `boolean` -- true if allowed

```robinpath
robots.isAllowed $robots "/page" "Googlebot"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `robots` | `object` | Yes | Parsed robots or raw text |
| `url` | `string` | Yes | URL or path |
| `userAgent` | `string` | No | Bot name (default *) |

---

### isDisallowed

Check if URL is disallowed

**Module:** `robots` | **Returns:** `boolean` -- true if disallowed

```robinpath
robots.isDisallowed $robots "/admin"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `robots` | `object` | Yes | Parsed robots or raw text |
| `url` | `string` | Yes | URL or path |
| `userAgent` | `string` | No | Bot name |

---

### getCrawlDelay

Get crawl delay for agent

**Module:** `robots` | **Returns:** `number` -- Delay in seconds or null

```robinpath
robots.getCrawlDelay $robots "Googlebot"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `robots` | `object` | Yes | Parsed robots |
| `userAgent` | `string` | No | Bot name |

---

### getSitemaps

Get sitemap URLs

**Module:** `robots` | **Returns:** `array` -- Sitemap URLs

```robinpath
robots.getSitemaps $robots
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `robots` | `object` | Yes | Parsed robots |

---

### getRules

Get rules for agent

**Module:** `robots` | **Returns:** `array` -- Matching rules

```robinpath
robots.getRules $robots "Googlebot"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `robots` | `object` | Yes | Parsed robots |
| `userAgent` | `string` | No | Bot name (all if omitted) |

---

### addRule

Add rule to robots config

**Module:** `robots` | **Returns:** `object` -- Updated config

```robinpath
robots.addRule $robots {"userAgent": "BadBot", "disallow": ["/"]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `robots` | `object` | Yes | Parsed robots |
| `rule` | `object` | Yes | {userAgent, allow[], disallow[], crawlDelay} |

---

### removeRule

Remove rule by user agent

**Module:** `robots` | **Returns:** `object` -- Updated config

```robinpath
robots.removeRule $robots "BadBot"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `robots` | `object` | Yes | Parsed robots |
| `userAgent` | `string` | Yes | Bot name |

---

### addSitemap

Add sitemap URL

**Module:** `robots` | **Returns:** `object` -- Updated config

```robinpath
robots.addSitemap $robots "https://example.com/sitemap.xml"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `robots` | `object` | Yes | Parsed robots |
| `url` | `string` | Yes | Sitemap URL |

---

### allowAll

Generate allow-all robots.txt

**Module:** `robots` | **Returns:** `string` -- robots.txt

```robinpath
robots.allowAll
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userAgent` | `string` | No | Bot name (default *) |

---

### disallowAll

Generate disallow-all robots.txt

**Module:** `robots` | **Returns:** `string` -- robots.txt

```robinpath
robots.disallowAll
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userAgent` | `string` | No | Bot name (default *) |

---

### fetch

Fetch and parse robots.txt from URL

**Module:** `robots` | **Returns:** `object` -- {found, status, parsed, raw}

```robinpath
robots.fetch "https://example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Site URL |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as robots.parse $text
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate CrawlDelay

Retrieve all items and loop through them.

```robinpath
set $result as robots.getCrawlDelay $robots "Googlebot"
each $item in $result
  print $item
end
```

### 2. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as robots.create {"rules": [{"userAgent": "*", "disallow": ["/admin"]}]}
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as robots.getCrawlDelay $robots "Googlebot"
if $existing == null
  robots.create {"rules": [{"userAgent": "*", "disallow": ["/admin"]}]}
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Robots workflow

Chain multiple robots operations together.

```robinpath
set $r_parse as robots.parse $text
set $r_create as robots.create {"rules": [{"userAgent": "*", "disallow": ["/admin"]}]}
set $r_isAllowed as robots.isAllowed $robots "/page" "Googlebot"
print "All operations complete"
```

### 5. Safe parse with validation

Check results before proceeding.

```robinpath
set $result as robots.parse $text
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
