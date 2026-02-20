---
title: "DigitalOcean"
module: "digitalocean"
package: "@robinpath/digitalocean"
description: "DigitalOcean module for RobinPath."
category: "devops"
tags: [digitalocean, devops]
type: "integration"
auth: "api-key"
functionCount: 25
baseUrl: "https://api.digitalocean.com"
---

# DigitalOcean

> DigitalOcean module for RobinPath.

**Package:** `@robinpath/digitalocean` | **Category:** Devops | **Type:** Integration


## Authentication

```robinpath
digitalocean.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `digitalocean` module when you need to:

- **listDroplets** -- Use `digitalocean.listDroplets` to perform this operation
- **getDroplet** -- Use `digitalocean.getDroplet` to perform this operation
- **createDroplet** -- Use `digitalocean.createDroplet` to perform this operation
- **deleteDroplet** -- Use `digitalocean.deleteDroplet` to perform this operation
- **dropletAction** -- Use `digitalocean.dropletAction` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure digitalocean credentials. | `object` |
| [`listDroplets`](#listdroplets) | listDroplets | `object` |
| [`getDroplet`](#getdroplet) | getDroplet | `object` |
| [`createDroplet`](#createdroplet) | createDroplet | `object` |
| [`deleteDroplet`](#deletedroplet) | deleteDroplet | `object` |
| [`dropletAction`](#dropletaction) | dropletAction | `object` |
| [`listImages`](#listimages) | listImages | `object` |
| [`listRegions`](#listregions) | listRegions | `object` |
| [`listSizes`](#listsizes) | listSizes | `object` |
| [`listDomains`](#listdomains) | listDomains | `object` |
| [`getDomain`](#getdomain) | getDomain | `object` |
| [`createDomain`](#createdomain) | createDomain | `object` |
| [`listDomainRecords`](#listdomainrecords) | listDomainRecords | `object` |
| [`createDomainRecord`](#createdomainrecord) | createDomainRecord | `object` |
| [`deleteDomainRecord`](#deletedomainrecord) | deleteDomainRecord | `object` |
| [`listDatabases`](#listdatabases) | listDatabases | `object` |
| [`getDatabase`](#getdatabase) | getDatabase | `object` |
| [`listFirewalls`](#listfirewalls) | listFirewalls | `object` |
| [`createFirewall`](#createfirewall) | createFirewall | `object` |
| [`listLoadBalancers`](#listloadbalancers) | listLoadBalancers | `object` |
| [`listVolumes`](#listvolumes) | listVolumes | `object` |
| [`createVolume`](#createvolume) | createVolume | `object` |
| [`deleteVolume`](#deletevolume) | deleteVolume | `object` |
| [`getAccount`](#getaccount) | getAccount | `object` |
| [`listSnapshots`](#listsnapshots) | listSnapshots | `object` |


## Functions

### setCredentials

Configure digitalocean credentials.

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### listDroplets

listDroplets

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.listDroplets
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getDroplet

getDroplet

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.getDroplet
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createDroplet

createDroplet

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.createDroplet
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteDroplet

deleteDroplet

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.deleteDroplet
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### dropletAction

dropletAction

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.dropletAction
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listImages

listImages

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.listImages
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listRegions

listRegions

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.listRegions
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listSizes

listSizes

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.listSizes
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listDomains

listDomains

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.listDomains
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getDomain

getDomain

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.getDomain
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createDomain

createDomain

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.createDomain
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listDomainRecords

listDomainRecords

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.listDomainRecords
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createDomainRecord

createDomainRecord

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.createDomainRecord
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteDomainRecord

deleteDomainRecord

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.deleteDomainRecord
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listDatabases

listDatabases

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.listDatabases
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getDatabase

getDatabase

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.getDatabase
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listFirewalls

listFirewalls

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.listFirewalls
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createFirewall

createFirewall

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.createFirewall
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listLoadBalancers

listLoadBalancers

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.listLoadBalancers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listVolumes

listVolumes

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.listVolumes
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createVolume

createVolume

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.createVolume
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteVolume

deleteVolume

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.deleteVolume
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getAccount

getAccount

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.getAccount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listSnapshots

listSnapshots

**Module:** `digitalocean` | **Returns:** `object` -- API response.

```robinpath
digitalocean.listSnapshots
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Digitalocean API error (${res.status}): ${t}` | Check the error message for details |
| `digitalocean.setCredentials requires accessToken.` | Check the error message for details |
| `digitalocean.deleteDroplet requires an ID.` | Check the error message for details |
| `digitalocean.deleteDomainRecord requires an ID.` | Check the error message for details |
| `digitalocean.deleteVolume requires an ID.` | Check the error message for details |
| `Digitalocean: "..." not configured. Call digitalocean.setCredentials first.` | Check the error message for details |

```robinpath
set $result as digitalocean.listDroplets
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Droplets

Retrieve all items and loop through them.

```robinpath
digitalocean.setCredentials $token
set $result as digitalocean.listDroplets
each $item in $result
  print $item
end
```

### 2. Create a new item with createDroplet

Create a new resource and capture the result.

```robinpath
digitalocean.setCredentials $token
set $result as digitalocean.createDroplet
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
digitalocean.setCredentials $token
set $existing as digitalocean.listDroplets
if $existing == null
  digitalocean.createDroplet
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step DigitalOcean workflow

Chain multiple digitalocean operations together.

```robinpath
digitalocean.setCredentials $token
set $r_listDroplets as digitalocean.listDroplets
set $r_getDroplet as digitalocean.getDroplet
set $r_createDroplet as digitalocean.createDroplet
print "All operations complete"
```

### 5. Safe listDroplets with validation

Check results before proceeding.

```robinpath
digitalocean.setCredentials $token
set $result as digitalocean.listDroplets
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
