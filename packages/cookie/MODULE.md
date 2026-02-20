---
title: "Cookie"
module: "cookie"
package: "@robinpath/cookie"
description: "HTTP cookie parsing, serialization, signing/verification, Set-Cookie handling, and cookie jar management"
category: "web"
tags: [cookie, web]
type: "utility"
auth: "none"
functionCount: 12
---

# Cookie

> HTTP cookie parsing, serialization, signing/verification, Set-Cookie handling, and cookie jar management

**Package:** `@robinpath/cookie` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `cookie` module when you need to:

- **Parse Cookie header string** -- Use `cookie.parse` to perform this operation
- **Serialize Set-Cookie header** -- Use `cookie.serialize` to perform this operation
- **Sign cookie value with HMAC** -- Use `cookie.sign` to perform this operation
- **Verify and unsign cookie** -- Use `cookie.unsign` to perform this operation
- **Get single cookie from header** -- Use `cookie.get` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`parse`](#parse) | Parse Cookie header string | `Name-value pairs` |
| [`serialize`](#serialize) | Serialize Set-Cookie header | `Set-Cookie header value` |
| [`sign`](#sign) | Sign cookie value with HMAC | `Signed value` |
| [`unsign`](#unsign) | Verify and unsign cookie | `Original value or null` |
| [`get`](#get) | Get single cookie from header | `Value or null` |
| [`remove`](#remove) | Generate removal Set-Cookie | `Set-Cookie header` |
| [`parseSetCookie`](#parsesetcookie) | Parse Set-Cookie header | `Cookie object with attributes` |
| [`isExpired`](#isexpired) | Check if cookie is expired | `true if expired` |
| [`jar`](#jar) | Create cookie jar | `Cookie jar object` |
| [`toHeader`](#toheader) | Build Cookie header from pairs | `Cookie header string` |
| [`encode`](#encode) | URL-encode cookie value | `Encoded value` |
| [`decode`](#decode) | URL-decode cookie value | `Decoded value` |


## Functions

### parse

Parse Cookie header string

**Module:** `cookie` | **Returns:** `object` -- Name-value pairs

```robinpath
cookie.parse "session=abc; theme=dark"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `header` | `string` | Yes | Cookie header value |

---

### serialize

Serialize Set-Cookie header

**Module:** `cookie` | **Returns:** `string` -- Set-Cookie header value

```robinpath
cookie.serialize "session" "abc123" {"httpOnly": true, "maxAge": 3600}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Cookie name |
| `value` | `string` | Yes | Cookie value |
| `options` | `object` | No | {domain, path, expires, maxAge, secure, httpOnly, sameSite} |

---

### sign

Sign cookie value with HMAC

**Module:** `cookie` | **Returns:** `string` -- Signed value

```robinpath
cookie.sign "userId=123" "my-secret"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | Value to sign |
| `secret` | `string` | Yes | Signing secret |

---

### unsign

Verify and unsign cookie

**Module:** `cookie` | **Returns:** `string` -- Original value or null

```robinpath
cookie.unsign $signed "my-secret"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `signed` | `string` | Yes | Signed value |
| `secret` | `string` | Yes | Signing secret |

---

### get

Get single cookie from header

**Module:** `cookie` | **Returns:** `string` -- Value or null

```robinpath
cookie.get $header "session"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `header` | `string` | Yes | Cookie header |
| `name` | `string` | Yes | Cookie name |

---

### remove

Generate removal Set-Cookie

**Module:** `cookie` | **Returns:** `string` -- Set-Cookie header

```robinpath
cookie.remove "session"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Cookie name |
| `options` | `object` | No | {domain, path} |

---

### parseSetCookie

Parse Set-Cookie header

**Module:** `cookie` | **Returns:** `object` -- Cookie object with attributes

```robinpath
cookie.parseSetCookie "session=abc; HttpOnly; Max-Age=3600"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `header` | `string` | Yes | Set-Cookie header |

---

### isExpired

Check if cookie is expired

**Module:** `cookie` | **Returns:** `boolean` -- true if expired

```robinpath
cookie.isExpired $cookie
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cookie` | `object` | Yes | Cookie object |

---

### jar

Create cookie jar

**Module:** `cookie` | **Returns:** `object` -- Cookie jar object

```robinpath
cookie.jar
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### toHeader

Build Cookie header from pairs

**Module:** `cookie` | **Returns:** `string` -- Cookie header string

```robinpath
cookie.toHeader {"session": "abc", "theme": "dark"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cookies` | `object` | Yes | Name-value pairs |

---

### encode

URL-encode cookie value

**Module:** `cookie` | **Returns:** `string` -- Encoded value

```robinpath
cookie.encode "hello world"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | Value |

---

### decode

URL-decode cookie value

**Module:** `cookie` | **Returns:** `string` -- Decoded value

```robinpath
cookie.decode "hello%20world"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `string` | Yes | Encoded value |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as cookie.parse "session=abc; theme=dark"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate 

Retrieve all items and loop through them.

```robinpath
set $result as cookie.get $header "session"
each $item in $result
  print $item
end
```

### 2. Multi-step Cookie workflow

Chain multiple cookie operations together.

```robinpath
set $r_parse as cookie.parse "session=abc; theme=dark"
set $r_serialize as cookie.serialize "session" "abc123" {"httpOnly": true, "maxAge": 3600}
set $r_sign as cookie.sign "userId=123" "my-secret"
print "All operations complete"
```

### 3. Safe parse with validation

Check results before proceeding.

```robinpath
set $result as cookie.parse "session=abc; theme=dark"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
