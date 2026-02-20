---
title: "Box"
module: "box"
package: "@robinpath/box"
description: "Box module for RobinPath."
category: "cloud-storage"
tags: [box, cloud storage]
type: "integration"
auth: "api-key"
functionCount: 19
baseUrl: "https://api.box.com"
---

# Box

> Box module for RobinPath.

**Package:** `@robinpath/box` | **Category:** Cloud Storage | **Type:** Integration


## Authentication

```robinpath
box.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `box` module when you need to:

- **listFolderItems** -- Use `box.listFolderItems` to perform this operation
- **getFolderInfo** -- Use `box.getFolderInfo` to perform this operation
- **createFolder** -- Use `box.createFolder` to perform this operation
- **deleteFolder** -- Use `box.deleteFolder` to perform this operation
- **getFileInfo** -- Use `box.getFileInfo` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure box credentials. | `object` |
| [`listFolderItems`](#listfolderitems) | listFolderItems | `object` |
| [`getFolderInfo`](#getfolderinfo) | getFolderInfo | `object` |
| [`createFolder`](#createfolder) | createFolder | `object` |
| [`deleteFolder`](#deletefolder) | deleteFolder | `object` |
| [`getFileInfo`](#getfileinfo) | getFileInfo | `object` |
| [`downloadFile`](#downloadfile) | downloadFile | `object` |
| [`deleteFile`](#deletefile) | deleteFile | `object` |
| [`copyFile`](#copyfile) | copyFile | `object` |
| [`moveFile`](#movefile) | moveFile | `object` |
| [`uploadFile`](#uploadfile) | uploadFile | `object` |
| [`searchContent`](#searchcontent) | searchContent | `object` |
| [`createSharedLink`](#createsharedlink) | createSharedLink | `object` |
| [`getSharedLink`](#getsharedlink) | getSharedLink | `object` |
| [`listCollaborations`](#listcollaborations) | listCollaborations | `object` |
| [`addCollaboration`](#addcollaboration) | addCollaboration | `object` |
| [`getUser`](#getuser) | getUser | `object` |
| [`updateFileInfo`](#updatefileinfo) | updateFileInfo | `object` |
| [`lockFile`](#lockfile) | lockFile | `object` |


## Functions

### setCredentials

Configure box credentials.

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### listFolderItems

listFolderItems

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.listFolderItems
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getFolderInfo

getFolderInfo

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.getFolderInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createFolder

createFolder

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.createFolder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteFolder

deleteFolder

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.deleteFolder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getFileInfo

getFileInfo

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.getFileInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### downloadFile

downloadFile

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.downloadFile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteFile

deleteFile

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.deleteFile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### copyFile

copyFile

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.copyFile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### moveFile

moveFile

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.moveFile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### uploadFile

uploadFile

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.uploadFile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchContent

searchContent

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.searchContent
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createSharedLink

createSharedLink

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.createSharedLink
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSharedLink

getSharedLink

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.getSharedLink
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCollaborations

listCollaborations

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.listCollaborations
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addCollaboration

addCollaboration

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.addCollaboration
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUser

getUser

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.getUser
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateFileInfo

updateFileInfo

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.updateFileInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### lockFile

lockFile

**Module:** `box` | **Returns:** `object` -- API response.

```robinpath
box.lockFile
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Box API error (${res.status}): ${t}` | Check the error message for details |
| `box.setCredentials requires accessToken.` | Check the error message for details |
| `box.deleteFolder requires an ID.` | Check the error message for details |
| `box.deleteFile requires an ID.` | Check the error message for details |
| `box.copyFile requires an ID.` | Check the error message for details |
| `box.moveFile requires an ID.` | Check the error message for details |
| `box.updateFileInfo requires an ID.` | Check the error message for details |
| `box.lockFile requires an ID.` | Check the error message for details |

```robinpath
set $result as box.listFolderItems
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate FolderItems

Retrieve all items and loop through them.

```robinpath
box.setCredentials $token
set $result as box.listFolderItems
each $item in $result
  print $item
end
```

### 2. Create a new item with createFolder

Create a new resource and capture the result.

```robinpath
box.setCredentials $token
set $result as box.createFolder
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
box.setCredentials $token
set $created as box.createFolder
# Update the created item
box.updateFileInfo
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
box.setCredentials $token
set $existing as box.listFolderItems
if $existing == null
  box.createFolder
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Box workflow

Chain multiple box operations together.

```robinpath
box.setCredentials $token
set $r_listFolderItems as box.listFolderItems
set $r_getFolderInfo as box.getFolderInfo
set $r_createFolder as box.createFolder
print "All operations complete"
```

### 6. Safe listFolderItems with validation

Check results before proceeding.

```robinpath
box.setCredentials $token
set $result as box.listFolderItems
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **s3** -- Amazon S3 module for complementary functionality
- **dropbox** -- Dropbox module for complementary functionality
- **onedrive** -- OneDrive module for complementary functionality
- **google-drive** -- Google Drive module for complementary functionality
- **json** -- JSON module for complementary functionality
