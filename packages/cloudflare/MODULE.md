---
title: "Cloudflare"
module: "cloudflare"
package: "@robinpath/cloudflare"
description: "Cloudflare module for RobinPath."
category: "devops"
tags: [cloudflare, devops]
type: "integration"
auth: "api-key"
functionCount: 29
baseUrl: "https://api.cloudflare.com/client/v4"
---

# Cloudflare

> Cloudflare module for RobinPath.

**Package:** `@robinpath/cloudflare` | **Category:** Devops | **Type:** Integration


## Authentication

```robinpath
cloudflare.setCredentials "user@example.com" "your-global-api-key"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `cloudflare` module when you need to:

- **List Cloudflare zones** -- Use `cloudflare.listZones` to perform this operation
- **Get details of a specific zone** -- Use `cloudflare.getZone` to perform this operation
- **Create a new Cloudflare zone** -- Use `cloudflare.createZone` to perform this operation
- **Delete a Cloudflare zone** -- Use `cloudflare.deleteZone` to perform this operation
- **Purge cache for a zone (all or selective by URLs/tags/hosts/prefixes)** -- Use `cloudflare.purgeCache` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setToken`](#settoken) | Set Cloudflare API token for authentication | `{ success, method }` |
| [`setCredentials`](#setcredentials) | Set Cloudflare global API key credentials | `{ success, method }` |
| [`listZones`](#listzones) | List Cloudflare zones | `Array of zone objects` |
| [`getZone`](#getzone) | Get details of a specific zone | `Zone details object` |
| [`createZone`](#createzone) | Create a new Cloudflare zone | `Created zone object` |
| [`deleteZone`](#deletezone) | Delete a Cloudflare zone | `{ success, zoneId }` |
| [`purgeCache`](#purgecache) | Purge cache for a zone (all or selective by URLs/tags/hosts/prefixes) | `Purge result object` |
| [`listDnsRecords`](#listdnsrecords) | List DNS records for a zone | `Array of DNS record objects` |
| [`getDnsRecord`](#getdnsrecord) | Get a specific DNS record | `DNS record object` |
| [`createDnsRecord`](#creatednsrecord) | Create a DNS record in a zone | `Created DNS record object` |
| [`updateDnsRecord`](#updatednsrecord) | Update an existing DNS record | `Updated DNS record object` |
| [`deleteDnsRecord`](#deletednsrecord) | Delete a DNS record from a zone | `{ success, zoneId, recordId }` |
| [`listWorkers`](#listworkers) | List Workers scripts for an account | `Array of Worker script objects` |
| [`getWorkerScript`](#getworkerscript) | Get the content of a Worker script | `Worker script source code` |
| [`deployWorker`](#deployworker) | Deploy a Worker script | `Deployed Worker result object` |
| [`deleteWorker`](#deleteworker) | Delete a Worker script | `{ success, accountId, scriptName }` |
| [`listKvNamespaces`](#listkvnamespaces) | List KV namespaces for an account | `Array of KV namespace objects` |
| [`createKvNamespace`](#createkvnamespace) | Create a KV namespace | `Created KV namespace object` |
| [`deleteKvNamespace`](#deletekvnamespace) | Delete a KV namespace | `{ success, accountId, namespaceId }` |
| [`kvGet`](#kvget) | Read a value from KV storage | `Value stored at the key, or null if not found` |
| [`kvPut`](#kvput) | Write a value to KV storage | `{ success, key }` |
| [`kvDelete`](#kvdelete) | Delete a key from KV storage | `{ success, key }` |
| [`kvListKeys`](#kvlistkeys) | List keys in a KV namespace | `Array of key objects` |
| [`listR2Buckets`](#listr2buckets) | List R2 buckets for an account | `Array of R2 bucket objects` |
| [`createR2Bucket`](#creater2bucket) | Create an R2 bucket | `Created R2 bucket object` |
| [`deleteR2Bucket`](#deleter2bucket) | Delete an R2 bucket | `{ success, accountId, bucketName }` |
| [`listPages`](#listpages) | List Cloudflare Pages projects | `Array of Pages project objects` |
| [`getPageProject`](#getpageproject) | Get details of a Cloudflare Pages project | `Pages project details object` |
| [`getZoneAnalytics`](#getzoneanalytics) | Get analytics data for a zone | `Zone analytics dashboard data` |


## Functions

### setToken

Set Cloudflare API token for authentication

**Module:** `cloudflare` | **Returns:** `object` -- { success, method }

```robinpath
cloudflare.setToken "your-api-token"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiToken` | `string` | Yes | Cloudflare API token |

---

### setCredentials

Set Cloudflare global API key credentials

**Module:** `cloudflare` | **Returns:** `object` -- { success, method }

```robinpath
cloudflare.setCredentials "user@example.com" "your-global-api-key"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | `string` | Yes | Cloudflare account email |
| `apiKey` | `string` | Yes | Cloudflare global API key |

---

### listZones

List Cloudflare zones

**Module:** `cloudflare` | **Returns:** `array` -- Array of zone objects

```robinpath
cloudflare.listZones {"name": "example.com"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Filter options: name, status, page, perPage |

---

### getZone

Get details of a specific zone

**Module:** `cloudflare` | **Returns:** `object` -- Zone details object

```robinpath
cloudflare.getZone "zone-id-here"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `zoneId` | `string` | Yes | Zone ID |

---

### createZone

Create a new Cloudflare zone

**Module:** `cloudflare` | **Returns:** `object` -- Created zone object

```robinpath
cloudflare.createZone "example.com" {"accountId": "abc123"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Domain name for the zone |
| `options` | `object` | No | Options: accountId, jumpStart, type |

---

### deleteZone

Delete a Cloudflare zone

**Module:** `cloudflare` | **Returns:** `object` -- { success, zoneId }

```robinpath
cloudflare.deleteZone "zone-id-here"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `zoneId` | `string` | Yes | Zone ID |

---

### purgeCache

Purge cache for a zone (all or selective by URLs/tags/hosts/prefixes)

**Module:** `cloudflare` | **Returns:** `object` -- Purge result object

```robinpath
cloudflare.purgeCache "zone-id" {"purgeEverything": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `zoneId` | `string` | Yes | Zone ID |
| `options` | `object` | No | Options: purgeEverything, files, tags, hosts, prefixes |

---

### listDnsRecords

List DNS records for a zone

**Module:** `cloudflare` | **Returns:** `array` -- Array of DNS record objects

```robinpath
cloudflare.listDnsRecords "zone-id" {"type": "A"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `zoneId` | `string` | Yes | Zone ID |
| `options` | `object` | No | Filter options: type, name, content, page, perPage |

---

### getDnsRecord

Get a specific DNS record

**Module:** `cloudflare` | **Returns:** `object` -- DNS record object

```robinpath
cloudflare.getDnsRecord "zone-id" "record-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `zoneId` | `string` | Yes | Zone ID |
| `recordId` | `string` | Yes | DNS record ID |

---

### createDnsRecord

Create a DNS record in a zone

**Module:** `cloudflare` | **Returns:** `object` -- Created DNS record object

```robinpath
cloudflare.createDnsRecord "zone-id" "A" "example.com" "1.2.3.4" {"proxied": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `zoneId` | `string` | Yes | Zone ID |
| `type` | `string` | Yes | Record type (A, AAAA, CNAME, MX, TXT, etc.) |
| `name` | `string` | Yes | DNS record name |
| `content` | `string` | Yes | DNS record content/value |
| `options` | `object` | No | Options: ttl, proxied, priority |

---

### updateDnsRecord

Update an existing DNS record

**Module:** `cloudflare` | **Returns:** `object` -- Updated DNS record object

```robinpath
cloudflare.updateDnsRecord "zone-id" "record-id" "A" "example.com" "5.6.7.8" {"proxied": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `zoneId` | `string` | Yes | Zone ID |
| `recordId` | `string` | Yes | DNS record ID |
| `type` | `string` | Yes | Record type (A, AAAA, CNAME, MX, TXT, etc.) |
| `name` | `string` | Yes | DNS record name |
| `content` | `string` | Yes | DNS record content/value |
| `options` | `object` | No | Options: ttl, proxied, priority |

---

### deleteDnsRecord

Delete a DNS record from a zone

**Module:** `cloudflare` | **Returns:** `object` -- { success, zoneId, recordId }

```robinpath
cloudflare.deleteDnsRecord "zone-id" "record-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `zoneId` | `string` | Yes | Zone ID |
| `recordId` | `string` | Yes | DNS record ID |

---

### listWorkers

List Workers scripts for an account

**Module:** `cloudflare` | **Returns:** `array` -- Array of Worker script objects

```robinpath
cloudflare.listWorkers "account-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Cloudflare account ID |

---

### getWorkerScript

Get the content of a Worker script

**Module:** `cloudflare` | **Returns:** `string` -- Worker script source code

```robinpath
cloudflare.getWorkerScript "account-id" "my-worker"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Cloudflare account ID |
| `scriptName` | `string` | Yes | Worker script name |

---

### deployWorker

Deploy a Worker script

**Module:** `cloudflare` | **Returns:** `object` -- Deployed Worker result object

```robinpath
cloudflare.deployWorker "account-id" "my-worker" "export default { fetch() { return new Response('Hello') } }"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Cloudflare account ID |
| `scriptName` | `string` | Yes | Worker script name |
| `script` | `string` | Yes | Worker script source code |
| `options` | `object` | No | Options: mainModule, compatibilityDate, bindings |

---

### deleteWorker

Delete a Worker script

**Module:** `cloudflare` | **Returns:** `object` -- { success, accountId, scriptName }

```robinpath
cloudflare.deleteWorker "account-id" "my-worker"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Cloudflare account ID |
| `scriptName` | `string` | Yes | Worker script name |

---

### listKvNamespaces

List KV namespaces for an account

**Module:** `cloudflare` | **Returns:** `array` -- Array of KV namespace objects

```robinpath
cloudflare.listKvNamespaces "account-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Cloudflare account ID |
| `options` | `object` | No | Options: page, perPage |

---

### createKvNamespace

Create a KV namespace

**Module:** `cloudflare` | **Returns:** `object` -- Created KV namespace object

```robinpath
cloudflare.createKvNamespace "account-id" "my-kv-store"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Cloudflare account ID |
| `title` | `string` | Yes | Namespace title |

---

### deleteKvNamespace

Delete a KV namespace

**Module:** `cloudflare` | **Returns:** `object` -- { success, accountId, namespaceId }

```robinpath
cloudflare.deleteKvNamespace "account-id" "namespace-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Cloudflare account ID |
| `namespaceId` | `string` | Yes | KV namespace ID |

---

### kvGet

Read a value from KV storage

**Module:** `cloudflare` | **Returns:** `any` -- Value stored at the key, or null if not found

```robinpath
cloudflare.kvGet "account-id" "namespace-id" "my-key"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Cloudflare account ID |
| `namespaceId` | `string` | Yes | KV namespace ID |
| `key` | `string` | Yes | Key to read |

---

### kvPut

Write a value to KV storage

**Module:** `cloudflare` | **Returns:** `object` -- { success, key }

```robinpath
cloudflare.kvPut "account-id" "namespace-id" "my-key" "my-value" {"expirationTtl": 3600}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Cloudflare account ID |
| `namespaceId` | `string` | Yes | KV namespace ID |
| `key` | `string` | Yes | Key to write |
| `value` | `any` | Yes | Value to store |
| `options` | `object` | No | Options: expiration (unix timestamp), expirationTtl (seconds) |

---

### kvDelete

Delete a key from KV storage

**Module:** `cloudflare` | **Returns:** `object` -- { success, key }

```robinpath
cloudflare.kvDelete "account-id" "namespace-id" "my-key"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Cloudflare account ID |
| `namespaceId` | `string` | Yes | KV namespace ID |
| `key` | `string` | Yes | Key to delete |

---

### kvListKeys

List keys in a KV namespace

**Module:** `cloudflare` | **Returns:** `array` -- Array of key objects

```robinpath
cloudflare.kvListKeys "account-id" "namespace-id" {"prefix": "user:"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Cloudflare account ID |
| `namespaceId` | `string` | Yes | KV namespace ID |
| `options` | `object` | No | Options: prefix, limit, cursor |

---

### listR2Buckets

List R2 buckets for an account

**Module:** `cloudflare` | **Returns:** `array` -- Array of R2 bucket objects

```robinpath
cloudflare.listR2Buckets "account-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Cloudflare account ID |

---

### createR2Bucket

Create an R2 bucket

**Module:** `cloudflare` | **Returns:** `object` -- Created R2 bucket object

```robinpath
cloudflare.createR2Bucket "account-id" "my-bucket"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Cloudflare account ID |
| `name` | `string` | Yes | Bucket name |

---

### deleteR2Bucket

Delete an R2 bucket

**Module:** `cloudflare` | **Returns:** `object` -- { success, accountId, bucketName }

```robinpath
cloudflare.deleteR2Bucket "account-id" "my-bucket"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Cloudflare account ID |
| `bucketName` | `string` | Yes | Bucket name |

---

### listPages

List Cloudflare Pages projects

**Module:** `cloudflare` | **Returns:** `array` -- Array of Pages project objects

```robinpath
cloudflare.listPages "account-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Cloudflare account ID |

---

### getPageProject

Get details of a Cloudflare Pages project

**Module:** `cloudflare` | **Returns:** `object` -- Pages project details object

```robinpath
cloudflare.getPageProject "account-id" "my-site"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountId` | `string` | Yes | Cloudflare account ID |
| `projectName` | `string` | Yes | Pages project name |

---

### getZoneAnalytics

Get analytics data for a zone

**Module:** `cloudflare` | **Returns:** `object` -- Zone analytics dashboard data

```robinpath
cloudflare.getZoneAnalytics "zone-id" {"since": "-10080", "until": "0"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `zoneId` | `string` | Yes | Zone ID |
| `options` | `object` | No | Options: since (ISO date or negative minutes), until (ISO date or negative minutes) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Cloudflare not authenticated. Call cloudflare.setToken or cloudflare.setCredentials first.` | Check the error message for details |
| `Cloudflare API error: ${msg}` | Check the error message for details |
| `Cloudflare API error: ${response.status} ${response.statusText}` | Check the error message for details |
| `API token is required` | Check the error message for details |
| `Both email and API key are required` | Check the error message for details |
| `zoneId is required` | Check the error message for details |
| `Zone name is required` | Check the error message for details |
| `zoneId and recordId are required` | Check the error message for details |

```robinpath
set $result as cloudflare.listZones {"name": "example.com"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Zones

Retrieve all items and loop through them.

```robinpath
cloudflare.setToken $token
set $result as cloudflare.listZones {"name": "example.com"}
each $item in $result
  print $item
end
```

### 2. Create a new item with createZone

Create a new resource and capture the result.

```robinpath
cloudflare.setToken $token
set $result as cloudflare.createZone "example.com" {"accountId": "abc123"}
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
cloudflare.setToken $token
set $created as cloudflare.createZone "example.com" {"accountId": "abc123"}
# Update the created item
cloudflare.updateDnsRecord "zone-id" "record-id" "A" "example.com" "5.6.7.8" {"proxied": true}
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
cloudflare.setToken $token
set $existing as cloudflare.listZones {"name": "example.com"}
if $existing == null
  cloudflare.createZone "example.com" {"accountId": "abc123"}
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Cloudflare workflow

Chain multiple cloudflare operations together.

```robinpath
cloudflare.setToken $token
set $r_listZones as cloudflare.listZones {"name": "example.com"}
set $r_getZone as cloudflare.getZone "zone-id-here"
set $r_createZone as cloudflare.createZone "example.com" {"accountId": "abc123"}
print "All operations complete"
```

### 6. Safe listZones with validation

Check results before proceeding.

```robinpath
cloudflare.setToken $token
set $result as cloudflare.listZones {"name": "example.com"}
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
