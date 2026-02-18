---
title: "Google Drive"
module: "google-drive"
package: "@robinpath/google-drive"
description: "Google Drive module for RobinPath."
category: "cloud-storage"
tags: [googledrive, cloud storage]
type: "integration"
auth: "api-key"
functionCount: 10
baseUrl: "https://www.googleapis.com"
---

# Google Drive

> Google Drive module for RobinPath.

**Package:** `@robinpath/google-drive` | **Category:** Cloud Storage | **Type:** Integration


## Authentication

```robinpath
googleDrive.setCredentials "ya29.xxx"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `google-drive` module when you need to:

- **List files in Google Drive with optional query filter.** -- Use `google-drive.listFiles` to perform this operation
- **Get file metadata by ID.** -- Use `google-drive.getFile` to perform this operation
- **Download file content as text.** -- Use `google-drive.downloadFile` to perform this operation
- **Upload a file to Google Drive.** -- Use `google-drive.uploadFile` to perform this operation
- **Create a new folder in Google Drive.** -- Use `google-drive.createFolder` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Set the OAuth2 access token for Google Drive API. | `Confirmation message.` |
| [`listFiles`](#listfiles) | List files in Google Drive with optional query filter. | `Object with files array and nextPageToken.` |
| [`getFile`](#getfile) | Get file metadata by ID. | `File metadata object.` |
| [`downloadFile`](#downloadfile) | Download file content as text. | `File content as text.` |
| [`uploadFile`](#uploadfile) | Upload a file to Google Drive. | `Uploaded file metadata.` |
| [`createFolder`](#createfolder) | Create a new folder in Google Drive. | `Created folder metadata.` |
| [`deleteFile`](#deletefile) | Permanently delete a file or folder. | `Confirmation message.` |
| [`moveFile`](#movefile) | Move a file to a different folder. | `Updated file metadata.` |
| [`copyFile`](#copyfile) | Copy a file, optionally with a new name or destination. | `Copied file metadata.` |
| [`shareFile`](#sharefile) | Share a file with a user by email. | `Permission object.` |


## Functions

### setCredentials

Set the OAuth2 access token for Google Drive API.

**Module:** `google-drive` | **Returns:** `string` -- Confirmation message.

```robinpath
googleDrive.setCredentials "ya29.xxx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | OAuth2 access token |

---

### listFiles

List files in Google Drive with optional query filter.

**Module:** `google-drive` | **Returns:** `object` -- Object with files array and nextPageToken.

```robinpath
googleDrive.listFiles {"q":"mimeType='application/pdf'","pageSize":10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: q (query), pageSize, pageToken, orderBy |

---

### getFile

Get file metadata by ID.

**Module:** `google-drive` | **Returns:** `object` -- File metadata object.

```robinpath
googleDrive.getFile "file-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileId` | `string` | Yes | The file ID |

---

### downloadFile

Download file content as text.

**Module:** `google-drive` | **Returns:** `string` -- File content as text.

```robinpath
googleDrive.downloadFile "file-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileId` | `string` | Yes | The file ID to download |

---

### uploadFile

Upload a file to Google Drive.

**Module:** `google-drive` | **Returns:** `object` -- Uploaded file metadata.

```robinpath
googleDrive.uploadFile "report.txt" "Hello world" {"folderId":"folder-id"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | File name |
| `content` | `string` | Yes | File content |
| `options` | `object` | No | Options: mimeType, folderId |

---

### createFolder

Create a new folder in Google Drive.

**Module:** `google-drive` | **Returns:** `object` -- Created folder metadata.

```robinpath
googleDrive.createFolder "My Folder"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Folder name |
| `parentId` | `string` | No | Parent folder ID (optional) |

---

### deleteFile

Permanently delete a file or folder.

**Module:** `google-drive` | **Returns:** `string` -- Confirmation message.

```robinpath
googleDrive.deleteFile "file-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileId` | `string` | Yes | The file/folder ID to delete |

---

### moveFile

Move a file to a different folder.

**Module:** `google-drive` | **Returns:** `object` -- Updated file metadata.

```robinpath
googleDrive.moveFile "file-id" "folder-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileId` | `string` | Yes | The file ID to move |
| `newFolderId` | `string` | Yes | Destination folder ID |

---

### copyFile

Copy a file, optionally with a new name or destination.

**Module:** `google-drive` | **Returns:** `object` -- Copied file metadata.

```robinpath
googleDrive.copyFile "file-id" {"name":"Copy of Report"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileId` | `string` | Yes | The file ID to copy |
| `options` | `object` | No | Options: name, folderId |

---

### shareFile

Share a file with a user by email.

**Module:** `google-drive` | **Returns:** `object` -- Permission object.

```robinpath
googleDrive.shareFile "file-id" "user@example.com" "writer"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileId` | `string` | Yes | The file ID to share |
| `email` | `string` | Yes | Email of the user to share with |
| `role` | `string` | No | Permission role: reader, writer, commenter (default: reader) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Google Drive: token not configured. Call googleDrive.setCredentials first.` | Check the error message for details |
| `Google Drive API error (${res.status}): ${text}` | Check the error message for details |
| `googleDrive.setCredentials requires an access token.` | Check the error message for details |
| `googleDrive.getFile requires a fileId.` | Check the error message for details |
| `googleDrive.downloadFile requires a fileId.` | Check the error message for details |
| `Google Drive download error (${res.status}): ${text}` | Check the error message for details |
| `googleDrive.uploadFile requires name and content.` | Check the error message for details |
| `Google Drive upload error (${res.status}): ${text}` | Check the error message for details |

```robinpath
set $result as googleDrive.listFiles {"q":"mimeType='application/pdf'","pageSize":10}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Files

Retrieve all items and loop through them.

```robinpath
google-drive.setCredentials $token
set $result as googleDrive.listFiles {"q":"mimeType='application/pdf'","pageSize":10}
each $item in $result
  print $item
end
```

### 2. Create a new item with createFolder

Create a new resource and capture the result.

```robinpath
google-drive.setCredentials $token
set $result as googleDrive.createFolder "My Folder"
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
google-drive.setCredentials $token
set $existing as googleDrive.listFiles {"q":"mimeType='application/pdf'","pageSize":10}
if $existing == null
  googleDrive.createFolder "My Folder"
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Google Drive workflow

Chain multiple google-drive operations together.

```robinpath
google-drive.setCredentials $token
set $r_listFiles as googleDrive.listFiles {"q":"mimeType='application/pdf'","pageSize":10}
set $r_getFile as googleDrive.getFile "file-id"
set $r_downloadFile as googleDrive.downloadFile "file-id"
print "All operations complete"
```

### 5. Safe listFiles with validation

Check results before proceeding.

```robinpath
google-drive.setCredentials $token
set $result as googleDrive.listFiles {"q":"mimeType='application/pdf'","pageSize":10}
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
- **onedrive** -- OneDrive module for complementary functionality
- **json** -- JSON module for complementary functionality
