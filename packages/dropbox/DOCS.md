---
title: "Dropbox"
module: "dropbox"
package: "@robinpath/dropbox"
description: "Dropbox module for RobinPath."
category: "cloud-storage"
tags: [dropbox, cloud storage]
type: "integration"
auth: "api-key"
functionCount: 19
baseUrl: "https://api.dropboxapi.com"
---

# Dropbox

> Dropbox module for RobinPath.

**Package:** `@robinpath/dropbox` | **Category:** Cloud Storage | **Type:** Integration


## Authentication

```robinpath
dropbox.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `dropbox` module when you need to:

- **listFolder** -- Use `dropbox.listFolder` to perform this operation
- **getMetadata** -- Use `dropbox.getMetadata` to perform this operation
- **createFolder** -- Use `dropbox.createFolder` to perform this operation
- **deleteEntry** -- Use `dropbox.deleteEntry` to perform this operation
- **moveEntry** -- Use `dropbox.moveEntry` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure dropbox credentials. | `object` |
| [`listFolder`](#listfolder) | listFolder | `object` |
| [`getMetadata`](#getmetadata) | getMetadata | `object` |
| [`createFolder`](#createfolder) | createFolder | `object` |
| [`deleteEntry`](#deleteentry) | deleteEntry | `object` |
| [`moveEntry`](#moveentry) | moveEntry | `object` |
| [`copyEntry`](#copyentry) | copyEntry | `object` |
| [`uploadFile`](#uploadfile) | uploadFile | `object` |
| [`downloadFile`](#downloadfile) | downloadFile | `object` |
| [`getTemporaryLink`](#gettemporarylink) | getTemporaryLink | `object` |
| [`searchFiles`](#searchfiles) | searchFiles | `object` |
| [`listRevisions`](#listrevisions) | listRevisions | `object` |
| [`restoreFile`](#restorefile) | restoreFile | `object` |
| [`createSharedLink`](#createsharedlink) | createSharedLink | `object` |
| [`listSharedLinks`](#listsharedlinks) | listSharedLinks | `object` |
| [`revokeSharedLink`](#revokesharedlink) | revokeSharedLink | `object` |
| [`getSpaceUsage`](#getspaceusage) | getSpaceUsage | `object` |
| [`getCurrentAccount`](#getcurrentaccount) | getCurrentAccount | `object` |
| [`getPreview`](#getpreview) | getPreview | `object` |


## Functions

### setCredentials

Configure dropbox credentials.

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### listFolder

listFolder

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.listFolder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getMetadata

getMetadata

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.getMetadata
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createFolder

createFolder

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.createFolder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteEntry

deleteEntry

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.deleteEntry
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### moveEntry

moveEntry

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.moveEntry
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### copyEntry

copyEntry

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.copyEntry
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### uploadFile

uploadFile

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.uploadFile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### downloadFile

downloadFile

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.downloadFile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTemporaryLink

getTemporaryLink

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.getTemporaryLink
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchFiles

searchFiles

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.searchFiles
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listRevisions

listRevisions

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.listRevisions
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### restoreFile

restoreFile

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.restoreFile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createSharedLink

createSharedLink

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.createSharedLink
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listSharedLinks

listSharedLinks

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.listSharedLinks
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### revokeSharedLink

revokeSharedLink

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.revokeSharedLink
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSpaceUsage

getSpaceUsage

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.getSpaceUsage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCurrentAccount

getCurrentAccount

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.getCurrentAccount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPreview

getPreview

**Module:** `dropbox` | **Returns:** `object` -- API response.

```robinpath
dropbox.getPreview
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Dropbox API error (${res.status}): ${t}` | Check the error message for details |
| `dropbox.setCredentials requires accessToken.` | Check the error message for details |
| `dropbox.deleteEntry requires an ID.` | Check the error message for details |
| `dropbox.moveEntry requires an ID.` | Check the error message for details |
| `dropbox.copyEntry requires an ID.` | Check the error message for details |
| `dropbox.restoreFile requires an ID.` | Check the error message for details |
| `dropbox.revokeSharedLink requires an ID.` | Check the error message for details |
| `Dropbox: "..." not configured. Call dropbox.setCredentials first.` | Check the error message for details |

```robinpath
set $result as dropbox.listFolder
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Folder

Retrieve all items and loop through them.

```robinpath
dropbox.setCredentials $token
set $result as dropbox.listFolder
each $item in $result
  print $item
end
```

### 2. Create a new item with createFolder

Create a new resource and capture the result.

```robinpath
dropbox.setCredentials $token
set $result as dropbox.createFolder
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
dropbox.setCredentials $token
set $existing as dropbox.listFolder
if $existing == null
  dropbox.createFolder
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Dropbox workflow

Chain multiple dropbox operations together.

```robinpath
dropbox.setCredentials $token
set $r_listFolder as dropbox.listFolder
set $r_getMetadata as dropbox.getMetadata
set $r_createFolder as dropbox.createFolder
print "All operations complete"
```

### 5. Safe listFolder with validation

Check results before proceeding.

```robinpath
dropbox.setCredentials $token
set $result as dropbox.listFolder
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **s3** -- Amazon S3 module for complementary functionality
- **box** -- Box module for complementary functionality
- **onedrive** -- OneDrive module for complementary functionality
- **google-drive** -- Google Drive module for complementary functionality
- **json** -- JSON module for complementary functionality
