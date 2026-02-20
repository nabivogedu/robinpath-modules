---
title: "Netlify"
module: "netlify"
package: "@robinpath/netlify"
description: "Netlify module for RobinPath."
category: "devops"
tags: [netlify, devops]
type: "integration"
auth: "api-key"
functionCount: 21
baseUrl: "https://api.netlify.com"
---

# Netlify

> Netlify module for RobinPath.

**Package:** `@robinpath/netlify` | **Category:** Devops | **Type:** Integration


## Authentication

```robinpath
netlify.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `netlify` module when you need to:

- **listSites** -- Use `netlify.listSites` to perform this operation
- **getSite** -- Use `netlify.getSite` to perform this operation
- **createSite** -- Use `netlify.createSite` to perform this operation
- **updateSite** -- Use `netlify.updateSite` to perform this operation
- **deleteSite** -- Use `netlify.deleteSite` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure netlify credentials. | `object` |
| [`listSites`](#listsites) | listSites | `object` |
| [`getSite`](#getsite) | getSite | `object` |
| [`createSite`](#createsite) | createSite | `object` |
| [`updateSite`](#updatesite) | updateSite | `object` |
| [`deleteSite`](#deletesite) | deleteSite | `object` |
| [`listDeploys`](#listdeploys) | listDeploys | `object` |
| [`getDeploy`](#getdeploy) | getDeploy | `object` |
| [`lockDeploy`](#lockdeploy) | lockDeploy | `object` |
| [`unlockDeploy`](#unlockdeploy) | unlockDeploy | `object` |
| [`restoreDeploy`](#restoredeploy) | restoreDeploy | `object` |
| [`cancelDeploy`](#canceldeploy) | cancelDeploy | `object` |
| [`listForms`](#listforms) | listForms | `object` |
| [`listFormSubmissions`](#listformsubmissions) | listFormSubmissions | `object` |
| [`deleteFormSubmission`](#deleteformsubmission) | deleteFormSubmission | `object` |
| [`listDnsZones`](#listdnszones) | listDnsZones | `object` |
| [`getDnsZone`](#getdnszone) | getDnsZone | `object` |
| [`createDnsRecord`](#creatednsrecord) | createDnsRecord | `object` |
| [`listBuildHooks`](#listbuildhooks) | listBuildHooks | `object` |
| [`triggerBuild`](#triggerbuild) | triggerBuild | `object` |
| [`listSiteDomains`](#listsitedomains) | listSiteDomains | `object` |


## Functions

### setCredentials

Configure netlify credentials.

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### listSites

listSites

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.listSites
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSite

getSite

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.getSite
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createSite

createSite

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.createSite
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateSite

updateSite

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.updateSite
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteSite

deleteSite

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.deleteSite
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listDeploys

listDeploys

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.listDeploys
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getDeploy

getDeploy

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.getDeploy
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### lockDeploy

lockDeploy

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.lockDeploy
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### unlockDeploy

unlockDeploy

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.unlockDeploy
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### restoreDeploy

restoreDeploy

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.restoreDeploy
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### cancelDeploy

cancelDeploy

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.cancelDeploy
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listForms

listForms

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.listForms
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listFormSubmissions

listFormSubmissions

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.listFormSubmissions
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteFormSubmission

deleteFormSubmission

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.deleteFormSubmission
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listDnsZones

listDnsZones

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.listDnsZones
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getDnsZone

getDnsZone

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.getDnsZone
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createDnsRecord

createDnsRecord

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.createDnsRecord
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listBuildHooks

listBuildHooks

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.listBuildHooks
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### triggerBuild

triggerBuild

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.triggerBuild
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listSiteDomains

listSiteDomains

**Module:** `netlify` | **Returns:** `object` -- API response.

```robinpath
netlify.listSiteDomains
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Netlify API error (${res.status}): ${t}` | Check the error message for details |
| `netlify.setCredentials requires accessToken.` | Check the error message for details |
| `netlify.updateSite requires an ID.` | Check the error message for details |
| `netlify.deleteSite requires an ID.` | Check the error message for details |
| `netlify.lockDeploy requires an ID.` | Check the error message for details |
| `netlify.unlockDeploy requires an ID.` | Check the error message for details |
| `netlify.restoreDeploy requires an ID.` | Check the error message for details |
| `netlify.cancelDeploy requires an ID.` | Check the error message for details |

```robinpath
set $result as netlify.listSites
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Sites

Retrieve all items and loop through them.

```robinpath
netlify.setCredentials $token
set $result as netlify.listSites
each $item in $result
  print $item
end
```

### 2. Create a new item with createSite

Create a new resource and capture the result.

```robinpath
netlify.setCredentials $token
set $result as netlify.createSite
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
netlify.setCredentials $token
set $created as netlify.createSite
# Update the created item
netlify.updateSite
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
netlify.setCredentials $token
set $existing as netlify.listSites
if $existing == null
  netlify.createSite
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Netlify workflow

Chain multiple netlify operations together.

```robinpath
netlify.setCredentials $token
set $r_listSites as netlify.listSites
set $r_getSite as netlify.getSite
set $r_createSite as netlify.createSite
print "All operations complete"
```

### 6. Safe listSites with validation

Check results before proceeding.

```robinpath
netlify.setCredentials $token
set $result as netlify.listSites
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
