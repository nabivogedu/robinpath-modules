---
title: "Amazon S3"
module: "s3"
package: "@robinpath/s3"
description: "S3-compatible object storage operations using AWS SDK"
category: "cloud-storage"
tags: [s3, cloud storage]
type: "integration"
auth: "api-key"
functionCount: 14
---

# Amazon S3

> S3-compatible object storage operations using AWS SDK

**Package:** `@robinpath/s3` | **Category:** Cloud Storage | **Type:** Integration


## Authentication

```robinpath
s3.configure "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `s3` module when you need to:

- **Upload an object to S3** -- Use `s3.upload` to perform this operation
- **Download an object from S3** -- Use `s3.download` to perform this operation
- **Delete an object from S3** -- Use `s3.remove` to perform this operation
- **List objects in an S3 bucket** -- Use `s3.list` to perform this operation
- **Check if an object exists in S3** -- Use `s3.exists` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`configure`](#configure) | Configure S3 client credentials and endpoint | `object` |
| [`upload`](#upload) | Upload an object to S3 | `object` |
| [`download`](#download) | Download an object from S3 | `object` |
| [`remove`](#remove) | Delete an object from S3 | `object` |
| [`list`](#list) | List objects in an S3 bucket | `object` |
| [`exists`](#exists) | Check if an object exists in S3 | `object` |
| [`copy`](#copy) | Copy an object within or between S3 buckets | `object` |
| [`move`](#move) | Move an object (copy then delete source) | `object` |
| [`presignUrl`](#presignurl) | Generate a presigned URL for an S3 object | `object` |
| [`createBucket`](#createbucket) | Create a new S3 bucket | `object` |
| [`deleteBucket`](#deletebucket) | Delete an S3 bucket | `object` |
| [`listBuckets`](#listbuckets) | List all S3 buckets | `object` |
| [`getMetadata`](#getmetadata) | Get metadata for an S3 object | `object` |
| [`setAcl`](#setacl) | Set the ACL for an S3 object | `object` |


## Functions

### configure

Configure S3 client credentials and endpoint

**Module:** `s3` | **Returns:** `object` -- API response.

```robinpath
s3.configure
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | Yes | Configuration: region, endpoint, accessKeyId, secretAccessKey, sessionToken, forcePathStyle, profile |

---

### upload

Upload an object to S3

**Module:** `s3` | **Returns:** `object` -- API response.

```robinpath
s3.upload
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucket` | `string` | Yes | Bucket name |
| `key` | `string` | Yes | Object key |
| `body` | `string | Buffer` | Yes | Object content |
| `options` | `object` | No | Options: contentType, metadata, profile |

---

### download

Download an object from S3

**Module:** `s3` | **Returns:** `object` -- API response.

```robinpath
s3.download
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucket` | `string` | Yes | Bucket name |
| `key` | `string` | Yes | Object key |
| `options` | `object` | No | Options: encoding, profile |

---

### remove

Delete an object from S3

**Module:** `s3` | **Returns:** `object` -- API response.

```robinpath
s3.remove
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucket` | `string` | Yes | Bucket name |
| `key` | `string` | Yes | Object key |
| `options` | `object` | No | Options: profile |

---

### list

List objects in an S3 bucket

**Module:** `s3` | **Returns:** `object` -- API response.

```robinpath
s3.list
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucket` | `string` | Yes | Bucket name |
| `options` | `object` | No | Options: prefix, delimiter, maxKeys, continuationToken, profile |

---

### exists

Check if an object exists in S3

**Module:** `s3` | **Returns:** `object` -- API response.

```robinpath
s3.exists
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucket` | `string` | Yes | Bucket name |
| `key` | `string` | Yes | Object key |
| `options` | `object` | No | Options: profile |

---

### copy

Copy an object within or between S3 buckets

**Module:** `s3` | **Returns:** `object` -- API response.

```robinpath
s3.copy
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sourceBucket` | `string` | Yes | Source bucket name |
| `sourceKey` | `string` | Yes | Source object key |
| `destBucket` | `string` | Yes | Destination bucket name |
| `destKey` | `string` | Yes | Destination object key |
| `options` | `object` | No | Options: profile |

---

### move

Move an object (copy then delete source)

**Module:** `s3` | **Returns:** `object` -- API response.

```robinpath
s3.move
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sourceBucket` | `string` | Yes | Source bucket name |
| `sourceKey` | `string` | Yes | Source object key |
| `destBucket` | `string` | Yes | Destination bucket name |
| `destKey` | `string` | Yes | Destination object key |
| `options` | `object` | No | Options: profile |

---

### presignUrl

Generate a presigned URL for an S3 object

**Module:** `s3` | **Returns:** `object` -- API response.

```robinpath
s3.presignUrl
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucket` | `string` | Yes | Bucket name |
| `key` | `string` | Yes | Object key |
| `options` | `object` | No | Options: expiresIn (seconds, default 3600), method (GET/PUT), contentType, profile |

---

### createBucket

Create a new S3 bucket

**Module:** `s3` | **Returns:** `object` -- API response.

```robinpath
s3.createBucket
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucket` | `string` | Yes | Bucket name |
| `options` | `object` | No | Options: profile |

---

### deleteBucket

Delete an S3 bucket

**Module:** `s3` | **Returns:** `object` -- API response.

```robinpath
s3.deleteBucket
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucket` | `string` | Yes | Bucket name |
| `options` | `object` | No | Options: profile |

---

### listBuckets

List all S3 buckets

**Module:** `s3` | **Returns:** `object` -- API response.

```robinpath
s3.listBuckets
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: profile |

---

### getMetadata

Get metadata for an S3 object

**Module:** `s3` | **Returns:** `object` -- API response.

```robinpath
s3.getMetadata
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucket` | `string` | Yes | Bucket name |
| `key` | `string` | Yes | Object key |
| `options` | `object` | No | Options: profile |

---

### setAcl

Set the ACL for an S3 object

**Module:** `s3` | **Returns:** `object` -- API response.

```robinpath
s3.setAcl
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucket` | `string` | Yes | Bucket name |
| `key` | `string` | Yes | Object key |
| `acl` | `string` | Yes | ACL value: private, public-read, public-read-write, authenticated-read |
| `options` | `object` | No | Options: profile |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as s3.configure
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
set $result as s3.list
each $item in $result
  print $item
end
```

### 2. Create a new item with createBucket

Create a new resource and capture the result.

```robinpath
set $result as s3.createBucket
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as s3.list
if $existing == null
  s3.createBucket
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Amazon S3 workflow

Chain multiple s3 operations together.

```robinpath
set $r_configure as s3.configure
set $r_upload as s3.upload
set $r_download as s3.download
print "All operations complete"
```

### 5. Safe configure with validation

Check results before proceeding.

```robinpath
set $result as s3.configure
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **dropbox** -- Dropbox module for complementary functionality
- **box** -- Box module for complementary functionality
- **onedrive** -- OneDrive module for complementary functionality
- **google-drive** -- Google Drive module for complementary functionality
- **json** -- JSON module for complementary functionality
