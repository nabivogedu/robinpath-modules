---
title: "OneDrive"
module: "onedrive"
package: "@robinpath/onedrive"
description: "OneDrive module for RobinPath."
category: "cloud-storage"
tags: [onedrive, cloud storage]
type: "integration"
auth: "api-key"
functionCount: 19
baseUrl: "https://graph.microsoft.com"
---

# OneDrive

> OneDrive module for RobinPath.

**Package:** `@robinpath/onedrive` | **Category:** Cloud Storage | **Type:** Integration


## Authentication

```robinpath
onedrive.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `onedrive` module when you need to:

- **listChildren** -- Use `onedrive.listChildren` to perform this operation
- **getItem** -- Use `onedrive.getItem` to perform this operation
- **getItemByPath** -- Use `onedrive.getItemByPath` to perform this operation
- **createFolder** -- Use `onedrive.createFolder` to perform this operation
- **deleteItem** -- Use `onedrive.deleteItem` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure onedrive credentials. | `object` |
| [`listChildren`](#listchildren) | listChildren | `object` |
| [`getItem`](#getitem) | getItem | `object` |
| [`getItemByPath`](#getitembypath) | getItemByPath | `object` |
| [`createFolder`](#createfolder) | createFolder | `object` |
| [`deleteItem`](#deleteitem) | deleteItem | `object` |
| [`moveItem`](#moveitem) | moveItem | `object` |
| [`copyItem`](#copyitem) | copyItem | `object` |
| [`uploadFile`](#uploadfile) | uploadFile | `object` |
| [`downloadFile`](#downloadfile) | downloadFile | `object` |
| [`searchFiles`](#searchfiles) | searchFiles | `object` |
| [`createSharingLink`](#createsharinglink) | createSharingLink | `object` |
| [`listSharedWithMe`](#listsharedwithme) | listSharedWithMe | `object` |
| [`getPermissions`](#getpermissions) | getPermissions | `object` |
| [`getDriveInfo`](#getdriveinfo) | getDriveInfo | `object` |
| [`listDrives`](#listdrives) | listDrives | `object` |
| [`getRecentFiles`](#getrecentfiles) | getRecentFiles | `object` |
| [`getThumbnails`](#getthumbnails) | getThumbnails | `object` |
| [`uploadLargeFile`](#uploadlargefile) | uploadLargeFile | `object` |


## Functions

### setCredentials

Configure onedrive credentials.

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### listChildren

listChildren

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.listChildren
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getItem

getItem

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.getItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getItemByPath

getItemByPath

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.getItemByPath
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createFolder

createFolder

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.createFolder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteItem

deleteItem

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.deleteItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### moveItem

moveItem

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.moveItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### copyItem

copyItem

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.copyItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### uploadFile

uploadFile

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.uploadFile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### downloadFile

downloadFile

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.downloadFile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchFiles

searchFiles

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.searchFiles
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createSharingLink

createSharingLink

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.createSharingLink
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listSharedWithMe

listSharedWithMe

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.listSharedWithMe
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPermissions

getPermissions

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.getPermissions
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getDriveInfo

getDriveInfo

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.getDriveInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listDrives

listDrives

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.listDrives
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getRecentFiles

getRecentFiles

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.getRecentFiles
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getThumbnails

getThumbnails

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.getThumbnails
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### uploadLargeFile

uploadLargeFile

**Module:** `onedrive` | **Returns:** `object` -- API response.

```robinpath
onedrive.uploadLargeFile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Onedrive API error (${res.status}): ${t}` | Check the error message for details |
| `onedrive.setCredentials requires accessToken.` | Check the error message for details |
| `onedrive.deleteItem requires an ID.` | Check the error message for details |
| `onedrive.moveItem requires an ID.` | Check the error message for details |
| `onedrive.copyItem requires an ID.` | Check the error message for details |
| `Onedrive: "..." not configured. Call onedrive.setCredentials first.` | Check the error message for details |

```robinpath
set $result as onedrive.listChildren
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Children

Retrieve all items and loop through them.

```robinpath
onedrive.setCredentials $token
set $result as onedrive.listChildren
each $item in $result
  print $item
end
```

### 2. Create a new item with createFolder

Create a new resource and capture the result.

```robinpath
onedrive.setCredentials $token
set $result as onedrive.createFolder
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
onedrive.setCredentials $token
set $existing as onedrive.listChildren
if $existing == null
  onedrive.createFolder
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step OneDrive workflow

Chain multiple onedrive operations together.

```robinpath
onedrive.setCredentials $token
set $r_listChildren as onedrive.listChildren
set $r_getItem as onedrive.getItem
set $r_getItemByPath as onedrive.getItemByPath
print "All operations complete"
```

### 5. Safe listChildren with validation

Check results before proceeding.

```robinpath
onedrive.setCredentials $token
set $result as onedrive.listChildren
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **s3** -- Amazon S3 module for complementary functionality
- **dropbox** -- Dropbox module for complementary functionality
- **box** -- Box module for complementary functionality
- **google-drive** -- Google Drive module for complementary functionality
- **json** -- JSON module for complementary functionality
