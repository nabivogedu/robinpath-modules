---
title: "Uptime"
module: "uptime"
package: "@robinpath/uptime"
description: "Uptime module for RobinPath."
category: "devops"
tags: [uptime, devops]
type: "integration"
auth: "none"
functionCount: 14
---

# Uptime

> Uptime module for RobinPath.

**Package:** `@robinpath/uptime` | **Category:** Devops | **Type:** Integration


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `uptime` module when you need to:

- **checkHttp** -- Use `uptime.checkHttp` to perform this operation
- **checkHttps** -- Use `uptime.checkHttps` to perform this operation
- **checkTcp** -- Use `uptime.checkTcp` to perform this operation
- **checkDns** -- Use `uptime.checkDns` to perform this operation
- **checkSslCertificate** -- Use `uptime.checkSslCertificate` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`checkHttp`](#checkhttp) | checkHttp | `object` |
| [`checkHttps`](#checkhttps) | checkHttps | `object` |
| [`checkTcp`](#checktcp) | checkTcp | `object` |
| [`checkDns`](#checkdns) | checkDns | `object` |
| [`checkSslCertificate`](#checksslcertificate) | checkSslCertificate | `object` |
| [`batchCheck`](#batchcheck) | batchCheck | `object` |
| [`getResponseTime`](#getresponsetime) | getResponseTime | `object` |
| [`checkContentMatch`](#checkcontentmatch) | checkContentMatch | `object` |
| [`checkRedirect`](#checkredirect) | checkRedirect | `object` |
| [`getHeaders`](#getheaders) | getHeaders | `object` |
| [`checkPort`](#checkport) | checkPort | `object` |
| [`formatReport`](#formatreport) | formatReport | `object` |
| [`comparePerformance`](#compareperformance) | comparePerformance | `object` |
| [`checkHealth`](#checkhealth) | checkHealth | `object` |


## Functions

### checkHttp

checkHttp

**Module:** `uptime` | **Returns:** `object` -- API response.

```robinpath
uptime.checkHttp
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### checkHttps

checkHttps

**Module:** `uptime` | **Returns:** `object` -- API response.

```robinpath
uptime.checkHttps
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### checkTcp

checkTcp

**Module:** `uptime` | **Returns:** `object` -- API response.

```robinpath
uptime.checkTcp
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### checkDns

checkDns

**Module:** `uptime` | **Returns:** `object` -- API response.

```robinpath
uptime.checkDns
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### checkSslCertificate

checkSslCertificate

**Module:** `uptime` | **Returns:** `object` -- API response.

```robinpath
uptime.checkSslCertificate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### batchCheck

batchCheck

**Module:** `uptime` | **Returns:** `object` -- API response.

```robinpath
uptime.batchCheck
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getResponseTime

getResponseTime

**Module:** `uptime` | **Returns:** `object` -- API response.

```robinpath
uptime.getResponseTime
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### checkContentMatch

checkContentMatch

**Module:** `uptime` | **Returns:** `object` -- API response.

```robinpath
uptime.checkContentMatch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### checkRedirect

checkRedirect

**Module:** `uptime` | **Returns:** `object` -- API response.

```robinpath
uptime.checkRedirect
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getHeaders

getHeaders

**Module:** `uptime` | **Returns:** `object` -- API response.

```robinpath
uptime.getHeaders
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### checkPort

checkPort

**Module:** `uptime` | **Returns:** `object` -- API response.

```robinpath
uptime.checkPort
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### formatReport

formatReport

**Module:** `uptime` | **Returns:** `object` -- API response.

```robinpath
uptime.formatReport
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### comparePerformance

comparePerformance

**Module:** `uptime` | **Returns:** `object` -- API response.

```robinpath
uptime.comparePerformance
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### checkHealth

checkHealth

**Module:** `uptime` | **Returns:** `object` -- API response.

```robinpath
uptime.checkHealth
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Uptime: "..." not configured. Call uptime.setCredentials first.` | Check the error message for details |

```robinpath
set $result as uptime.checkHttp
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate ResponseTime

Retrieve all items and loop through them.

```robinpath
set $result as uptime.getResponseTime
each $item in $result
  print $item
end
```

### 2. Multi-step Uptime workflow

Chain multiple uptime operations together.

```robinpath
set $r_checkHttp as uptime.checkHttp
set $r_checkHttps as uptime.checkHttps
set $r_checkTcp as uptime.checkTcp
print "All operations complete"
```

### 3. Safe checkHttp with validation

Check results before proceeding.

```robinpath
set $result as uptime.checkHttp
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **docker** -- Docker module for complementary functionality
- **git** -- Git module for complementary functionality
- **github** -- GitHub module for complementary functionality
- **gitlab** -- GitLab module for complementary functionality
- **vercel** -- Vercel module for complementary functionality
