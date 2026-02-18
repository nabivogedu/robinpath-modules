---
title: "Mixpanel"
module: "mixpanel"
package: "@robinpath/mixpanel"
description: "Mixpanel module for RobinPath."
category: "analytics"
tags: [mixpanel, analytics]
type: "integration"
auth: "api-key"
functionCount: 15
baseUrl: "https://api.mixpanel.com"
---

# Mixpanel

> Mixpanel module for RobinPath.

**Package:** `@robinpath/mixpanel` | **Category:** Analytics | **Type:** Integration


## Authentication

```robinpath
mixpanel.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `mixpanel` module when you need to:

- **trackEvent** -- Use `mixpanel.trackEvent` to perform this operation
- **trackBatch** -- Use `mixpanel.trackBatch` to perform this operation
- **identifyUser** -- Use `mixpanel.identifyUser` to perform this operation
- **deleteUserProfile** -- Use `mixpanel.deleteUserProfile` to perform this operation
- **exportEvents** -- Use `mixpanel.exportEvents` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure mixpanel credentials. | `object` |
| [`trackEvent`](#trackevent) | trackEvent | `object` |
| [`trackBatch`](#trackbatch) | trackBatch | `object` |
| [`identifyUser`](#identifyuser) | identifyUser | `object` |
| [`setUserProfile`](#setuserprofile) | setUserProfile | `object` |
| [`deleteUserProfile`](#deleteuserprofile) | deleteUserProfile | `object` |
| [`exportEvents`](#exportevents) | exportEvents | `object` |
| [`getTopEvents`](#gettopevents) | getTopEvents | `object` |
| [`getEventStats`](#geteventstats) | getEventStats | `object` |
| [`getFunnelReport`](#getfunnelreport) | getFunnelReport | `object` |
| [`getRetention`](#getretention) | getRetention | `object` |
| [`getSegmentation`](#getsegmentation) | getSegmentation | `object` |
| [`listCohorts`](#listcohorts) | listCohorts | `object` |
| [`getInsights`](#getinsights) | getInsights | `object` |
| [`queryJql`](#queryjql) | queryJql | `object` |


## Functions

### setCredentials

Configure mixpanel credentials.

**Module:** `mixpanel` | **Returns:** `object` -- API response.

```robinpath
mixpanel.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectToken` | `string` | Yes | projectToken |
| `apiSecret` | `string` | Yes | apiSecret |

---

### trackEvent

trackEvent

**Module:** `mixpanel` | **Returns:** `object` -- API response.

```robinpath
mixpanel.trackEvent
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### trackBatch

trackBatch

**Module:** `mixpanel` | **Returns:** `object` -- API response.

```robinpath
mixpanel.trackBatch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### identifyUser

identifyUser

**Module:** `mixpanel` | **Returns:** `object` -- API response.

```robinpath
mixpanel.identifyUser
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### setUserProfile

setUserProfile

**Module:** `mixpanel` | **Returns:** `object` -- API response.

```robinpath
mixpanel.setUserProfile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteUserProfile

deleteUserProfile

**Module:** `mixpanel` | **Returns:** `object` -- API response.

```robinpath
mixpanel.deleteUserProfile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### exportEvents

exportEvents

**Module:** `mixpanel` | **Returns:** `object` -- API response.

```robinpath
mixpanel.exportEvents
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTopEvents

getTopEvents

**Module:** `mixpanel` | **Returns:** `object` -- API response.

```robinpath
mixpanel.getTopEvents
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getEventStats

getEventStats

**Module:** `mixpanel` | **Returns:** `object` -- API response.

```robinpath
mixpanel.getEventStats
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getFunnelReport

getFunnelReport

**Module:** `mixpanel` | **Returns:** `object` -- API response.

```robinpath
mixpanel.getFunnelReport
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getRetention

getRetention

**Module:** `mixpanel` | **Returns:** `object` -- API response.

```robinpath
mixpanel.getRetention
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSegmentation

getSegmentation

**Module:** `mixpanel` | **Returns:** `object` -- API response.

```robinpath
mixpanel.getSegmentation
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCohorts

listCohorts

**Module:** `mixpanel` | **Returns:** `object` -- API response.

```robinpath
mixpanel.listCohorts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getInsights

getInsights

**Module:** `mixpanel` | **Returns:** `object` -- API response.

```robinpath
mixpanel.getInsights
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### queryJql

queryJql

**Module:** `mixpanel` | **Returns:** `object` -- API response.

```robinpath
mixpanel.queryJql
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Mixpanel API error (${res.status}): ${t}` | Check the error message for details |
| `mixpanel.setCredentials requires projectToken, apiSecret.` | Check the error message for details |
| `mixpanel.deleteUserProfile requires an ID.` | Check the error message for details |
| `Mixpanel: "..." not configured. Call mixpanel.setCredentials first.` | Check the error message for details |

```robinpath
set $result as mixpanel.trackEvent
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate TopEvents

Retrieve all items and loop through them.

```robinpath
mixpanel.setCredentials $token
set $result as mixpanel.getTopEvents
each $item in $result
  print $item
end
```

### 2. Multi-step Mixpanel workflow

Chain multiple mixpanel operations together.

```robinpath
mixpanel.setCredentials $token
set $r_trackEvent as mixpanel.trackEvent
set $r_trackBatch as mixpanel.trackBatch
set $r_identifyUser as mixpanel.identifyUser
print "All operations complete"
```

### 3. Safe trackEvent with validation

Check results before proceeding.

```robinpath
mixpanel.setCredentials $token
set $result as mixpanel.trackEvent
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
