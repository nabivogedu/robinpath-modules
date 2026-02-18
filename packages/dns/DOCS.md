---
title: "DNS"
module: "dns"
package: "@robinpath/dns"
description: "DNS lookups: resolve, reverse, MX, TXT, NS, SRV, SOA, CNAME records"
category: "utility"
tags: [dns, utility]
type: "utility"
auth: "none"
functionCount: 12
---

# DNS

> DNS lookups: resolve, reverse, MX, TXT, NS, SRV, SOA, CNAME records

**Package:** `@robinpath/dns` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `dns` module when you need to:

- **Resolve hostname to records by type** -- Use `dns.resolve` to perform this operation
- **Resolve hostname to IPv4 addresses** -- Use `dns.resolve4` to perform this operation
- **Resolve hostname to IPv6 addresses** -- Use `dns.resolve6` to perform this operation
- **Reverse DNS lookup** -- Use `dns.reverse` to perform this operation
- **OS-level DNS lookup** -- Use `dns.lookup` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`resolve`](#resolve) | Resolve hostname to records by type | `Array of DNS records` |
| [`resolve4`](#resolve4) | Resolve hostname to IPv4 addresses | `IPv4 addresses` |
| [`resolve6`](#resolve6) | Resolve hostname to IPv6 addresses | `IPv6 addresses` |
| [`reverse`](#reverse) | Reverse DNS lookup | `Hostnames` |
| [`lookup`](#lookup) | OS-level DNS lookup | `{address, family}` |
| [`mx`](#mx) | Get MX records sorted by priority | `Array of {priority, exchange}` |
| [`txt`](#txt) | Get TXT records | `TXT record arrays` |
| [`ns`](#ns) | Get nameserver records | `Nameserver hostnames` |
| [`srv`](#srv) | Get SRV records | `Array of {priority, weight, port, name}` |
| [`soa`](#soa) | Get SOA record | `{nsname, hostmaster, serial, refresh, retry, expire, minttl}` |
| [`cname`](#cname) | Get CNAME records | `Canonical names` |
| [`isResolvable`](#isresolvable) | Check if hostname resolves | `true if resolvable` |


## Functions

### resolve

Resolve hostname to records by type

**Module:** `dns` | **Returns:** `array` -- Array of DNS records

```robinpath
dns.resolve "example.com" "A"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hostname` | `string` | Yes | Hostname to resolve |
| `rrtype` | `string` | No | Record type: A|AAAA|MX|TXT|SRV|NS|CNAME|SOA|PTR |

---

### resolve4

Resolve hostname to IPv4 addresses

**Module:** `dns` | **Returns:** `array` -- IPv4 addresses

```robinpath
dns.resolve4 "example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hostname` | `string` | Yes | Hostname |

---

### resolve6

Resolve hostname to IPv6 addresses

**Module:** `dns` | **Returns:** `array` -- IPv6 addresses

```robinpath
dns.resolve6 "example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hostname` | `string` | Yes | Hostname |

---

### reverse

Reverse DNS lookup

**Module:** `dns` | **Returns:** `array` -- Hostnames

```robinpath
dns.reverse "8.8.8.8"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ip` | `string` | Yes | IP address |

---

### lookup

OS-level DNS lookup

**Module:** `dns` | **Returns:** `object` -- {address, family}

```robinpath
dns.lookup "example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hostname` | `string` | Yes | Hostname |
| `options` | `object` | No | {family: 4|6|0} |

---

### mx

Get MX records sorted by priority

**Module:** `dns` | **Returns:** `array` -- Array of {priority, exchange}

```robinpath
dns.mx "example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hostname` | `string` | Yes | Domain |

---

### txt

Get TXT records

**Module:** `dns` | **Returns:** `array` -- TXT record arrays

```robinpath
dns.txt "example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hostname` | `string` | Yes | Domain |

---

### ns

Get nameserver records

**Module:** `dns` | **Returns:** `array` -- Nameserver hostnames

```robinpath
dns.ns "example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hostname` | `string` | Yes | Domain |

---

### srv

Get SRV records

**Module:** `dns` | **Returns:** `array` -- Array of {priority, weight, port, name}

```robinpath
dns.srv "_http._tcp.example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hostname` | `string` | Yes | Service hostname |

---

### soa

Get SOA record

**Module:** `dns` | **Returns:** `object` -- {nsname, hostmaster, serial, refresh, retry, expire, minttl}

```robinpath
dns.soa "example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hostname` | `string` | Yes | Domain |

---

### cname

Get CNAME records

**Module:** `dns` | **Returns:** `array` -- Canonical names

```robinpath
dns.cname "www.example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hostname` | `string` | Yes | Hostname |

---

### isResolvable

Check if hostname resolves

**Module:** `dns` | **Returns:** `boolean` -- true if resolvable

```robinpath
dns.isResolvable "example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hostname` | `string` | Yes | Hostname |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as dns.resolve "example.com" "A"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step DNS workflow

Chain multiple dns operations together.

```robinpath
set $r_resolve as dns.resolve "example.com" "A"
set $r_resolve4 as dns.resolve4 "example.com"
set $r_resolve6 as dns.resolve6 "example.com"
print "All operations complete"
```

### 2. Safe resolve with validation

Check results before proceeding.

```robinpath
set $result as dns.resolve "example.com" "A"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
