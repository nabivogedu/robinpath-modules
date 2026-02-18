---
title: "Url"
module: "url"
package: "@robinpath/url"
description: "URL parsing, formatting, and query parameter manipulation utilities using the built-in URL API"
category: "utility"
tags: [url, utility, api]
type: "utility"
auth: "none"
functionCount: 14
---

# Url

> URL parsing, formatting, and query parameter manipulation utilities using the built-in URL API

**Package:** `@robinpath/url` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `url` module when you need to:

- **Parse a URL string into its component parts** -- Use `url.parse` to perform this operation
- **Format URL component parts into a URL string** -- Use `url.format` to perform this operation
- **Resolve a relative URL against a base URL** -- Use `url.resolve` to perform this operation
- **Get the value of a single query parameter from a URL** -- Use `url.getParam` to perform this operation
- **Remove a query parameter from a URL** -- Use `url.removeParam` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`parse`](#parse) | Parse a URL string into its component parts | `An object with protocol, hostname, port, pathname, search, hash, origin, and href` |
| [`format`](#format) | Format URL component parts into a URL string | `The formatted URL string` |
| [`resolve`](#resolve) | Resolve a relative URL against a base URL | `The resolved absolute URL string` |
| [`getParam`](#getparam) | Get the value of a single query parameter from a URL | `The value of the query parameter, or null if not found` |
| [`setParam`](#setparam) | Set a query parameter on a URL, replacing any existing value | `The URL string with the parameter set` |
| [`removeParam`](#removeparam) | Remove a query parameter from a URL | `The URL string without the specified parameter` |
| [`getParams`](#getparams) | Get all query parameters from a URL as a plain object | `An object containing all query parameter key-value pairs` |
| [`setParams`](#setparams) | Set multiple query parameters on a URL at once | `The URL string with all specified parameters set` |
| [`getHostname`](#gethostname) | Extract the hostname from a URL | `The hostname portion of the URL` |
| [`getPathname`](#getpathname) | Extract the pathname from a URL | `The pathname portion of the URL` |
| [`getProtocol`](#getprotocol) | Extract the protocol from a URL | `The protocol of the URL including the trailing colon (e.g. "https:")` |
| [`isValid`](#isvalid) | Check whether a string is a valid URL | `True if the string is a valid URL, false otherwise` |
| [`encode`](#encode) | Encode a string for safe use in a URL component | `The URI-encoded string` |
| [`decode`](#decode) | Decode a URI-encoded string | `The decoded string` |


## Functions

### parse

Parse a URL string into its component parts

**Module:** `url` | **Returns:** `object` -- An object with protocol, hostname, port, pathname, search, hash, origin, and href

```robinpath
url.parse "https://example.com:8080/path?q=1#frag"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urlString` | `string` | Yes | The URL string to parse |

---

### format

Format URL component parts into a URL string

**Module:** `url` | **Returns:** `string` -- The formatted URL string

```robinpath
url.format { protocol: "https:", hostname: "example.com", pathname: "/path" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `parts` | `object` | Yes | An object with protocol, hostname, port, pathname, search, and hash properties |

---

### resolve

Resolve a relative URL against a base URL

**Module:** `url` | **Returns:** `string` -- The resolved absolute URL string

```robinpath
url.resolve "https://example.com/a/b" "../c"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `base` | `string` | Yes | The base URL |
| `relative` | `string` | Yes | The relative URL to resolve |

---

### getParam

Get the value of a single query parameter from a URL

**Module:** `url` | **Returns:** `string` -- The value of the query parameter, or null if not found

```robinpath
url.getParam "https://example.com?foo=bar" "foo"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urlString` | `string` | Yes | The URL string |
| `paramName` | `string` | Yes | The name of the query parameter to retrieve |

---

### setParam

Set a query parameter on a URL, replacing any existing value

**Module:** `url` | **Returns:** `string` -- The URL string with the parameter set

```robinpath
url.setParam "https://example.com" "page" "2"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urlString` | `string` | Yes | The URL string |
| `paramName` | `string` | Yes | The name of the query parameter to set |
| `value` | `string` | Yes | The value to set for the query parameter |

---

### removeParam

Remove a query parameter from a URL

**Module:** `url` | **Returns:** `string` -- The URL string without the specified parameter

```robinpath
url.removeParam "https://example.com?foo=bar&baz=1" "foo"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urlString` | `string` | Yes | The URL string |
| `paramName` | `string` | Yes | The name of the query parameter to remove |

---

### getParams

Get all query parameters from a URL as a plain object

**Module:** `url` | **Returns:** `object` -- An object containing all query parameter key-value pairs

```robinpath
url.getParams "https://example.com?foo=bar&baz=1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urlString` | `string` | Yes | The URL string |

---

### setParams

Set multiple query parameters on a URL at once

**Module:** `url` | **Returns:** `string` -- The URL string with all specified parameters set

```robinpath
url.setParams "https://example.com" { page: "2", limit: "10" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urlString` | `string` | Yes | The URL string |
| `params` | `object` | Yes | An object of key-value pairs to set as query parameters |

---

### getHostname

Extract the hostname from a URL

**Module:** `url` | **Returns:** `string` -- The hostname portion of the URL

```robinpath
url.getHostname "https://example.com:8080/path"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urlString` | `string` | Yes | The URL string |

---

### getPathname

Extract the pathname from a URL

**Module:** `url` | **Returns:** `string` -- The pathname portion of the URL

```robinpath
url.getPathname "https://example.com/a/b/c"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urlString` | `string` | Yes | The URL string |

---

### getProtocol

Extract the protocol from a URL

**Module:** `url` | **Returns:** `string` -- The protocol of the URL including the trailing colon (e.g. "https:")

```robinpath
url.getProtocol "https://example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urlString` | `string` | Yes | The URL string |

---

### isValid

Check whether a string is a valid URL

**Module:** `url` | **Returns:** `boolean` -- True if the string is a valid URL, false otherwise

```robinpath
url.isValid "https://example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `urlString` | `string` | Yes | The string to validate as a URL |

---

### encode

Encode a string for safe use in a URL component

**Module:** `url` | **Returns:** `string` -- The URI-encoded string

```robinpath
url.encode "hello world&foo=bar"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | The string to encode |

---

### decode

Decode a URI-encoded string

**Module:** `url` | **Returns:** `string` -- The decoded string

```robinpath
url.decode "hello%20world%26foo%3Dbar"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | The URI-encoded string to decode |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `format requires an object argument with URL components` | Check the error message for details |

```robinpath
set $result as url.parse "https://example.com:8080/path?q=1#frag"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Param

Retrieve all items and loop through them.

```robinpath
set $result as url.getParam "https://example.com?foo=bar" "foo"
each $item in $result
  print $item
end
```

### 2. Multi-step Url workflow

Chain multiple url operations together.

```robinpath
set $r_parse as url.parse "https://example.com:8080/path?q=1#frag"
set $r_format as url.format { protocol: "https:", hostname: "example.com", pathname: "/path" }
set $r_resolve as url.resolve "https://example.com/a/b" "../c"
print "All operations complete"
```

### 3. Safe parse with validation

Check results before proceeding.

```robinpath
set $result as url.parse "https://example.com:8080/path?q=1#frag"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
