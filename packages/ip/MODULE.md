---
title: "IP"
module: "ip"
package: "@robinpath/ip"
description: "IP module for RobinPath."
category: "utility"
tags: [ip, utility]
type: "utility"
auth: "none"
functionCount: 12
baseUrl: "https://ip-api.com"
---

# IP

> IP module for RobinPath.

**Package:** `@robinpath/ip` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `ip` module when you need to:

- **getMyIp** -- Use `ip.getMyIp` to perform this operation
- **geolocate** -- Use `ip.geolocate` to perform this operation
- **geolocateBatch** -- Use `ip.geolocateBatch` to perform this operation
- **isPrivate** -- Use `ip.isPrivate` to perform this operation
- **isValid** -- Use `ip.isValid` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`getMyIp`](#getmyip) | getMyIp | `object` |
| [`geolocate`](#geolocate) | geolocate | `object` |
| [`geolocateBatch`](#geolocatebatch) | geolocateBatch | `object` |
| [`isPrivate`](#isprivate) | isPrivate | `object` |
| [`isValid`](#isvalid) | isValid | `object` |
| [`isIpv4`](#isipv4) | isIpv4 | `object` |
| [`isIpv6`](#isipv6) | isIpv6 | `object` |
| [`cidrContains`](#cidrcontains) | cidrContains | `object` |
| [`cidrRange`](#cidrrange) | cidrRange | `object` |
| [`subnetInfo`](#subnetinfo) | subnetInfo | `object` |
| [`reverseDns`](#reversedns) | reverseDns | `object` |
| [`checkBlacklist`](#checkblacklist) | checkBlacklist | `object` |


## Functions

### getMyIp

getMyIp

**Module:** `ip` | **Returns:** `object` -- API response.

```robinpath
ip.getMyIp
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### geolocate

geolocate

**Module:** `ip` | **Returns:** `object` -- API response.

```robinpath
ip.geolocate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### geolocateBatch

geolocateBatch

**Module:** `ip` | **Returns:** `object` -- API response.

```robinpath
ip.geolocateBatch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### isPrivate

isPrivate

**Module:** `ip` | **Returns:** `object` -- API response.

```robinpath
ip.isPrivate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### isValid

isValid

**Module:** `ip` | **Returns:** `object` -- API response.

```robinpath
ip.isValid
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### isIpv4

isIpv4

**Module:** `ip` | **Returns:** `object` -- API response.

```robinpath
ip.isIpv4
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### isIpv6

isIpv6

**Module:** `ip` | **Returns:** `object` -- API response.

```robinpath
ip.isIpv6
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### cidrContains

cidrContains

**Module:** `ip` | **Returns:** `object` -- API response.

```robinpath
ip.cidrContains
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### cidrRange

cidrRange

**Module:** `ip` | **Returns:** `object` -- API response.

```robinpath
ip.cidrRange
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### subnetInfo

subnetInfo

**Module:** `ip` | **Returns:** `object` -- API response.

```robinpath
ip.subnetInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### reverseDns

reverseDns

**Module:** `ip` | **Returns:** `object` -- API response.

```robinpath
ip.reverseDns
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### checkBlacklist

checkBlacklist

**Module:** `ip` | **Returns:** `object` -- API response.

```robinpath
ip.checkBlacklist
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Ip API error (${res.status}): ${t}` | Check the error message for details |
| `Ip: "..." not configured. Call ip.setCredentials first.` | Check the error message for details |

```robinpath
set $result as ip.getMyIp
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate MyIp

Retrieve all items and loop through them.

```robinpath
set $result as ip.getMyIp
each $item in $result
  print $item
end
```

### 2. Multi-step IP workflow

Chain multiple ip operations together.

```robinpath
set $r_getMyIp as ip.getMyIp
set $r_geolocate as ip.geolocate
set $r_geolocateBatch as ip.geolocateBatch
print "All operations complete"
```

### 3. Safe getMyIp with validation

Check results before proceeding.

```robinpath
set $result as ip.getMyIp
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
