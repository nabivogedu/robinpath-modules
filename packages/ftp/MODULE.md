---
title: "FTP"
module: "ftp"
package: "@robinpath/ftp"
description: "FTP and SFTP file transfer: connect, upload, download, list, mkdir, rename, and delete"
category: "web"
tags: [ftp, web]
type: "utility"
auth: "connection-string"
functionCount: 8
---

# FTP

> FTP and SFTP file transfer: connect, upload, download, list, mkdir, rename, and delete

**Package:** `@robinpath/ftp` | **Category:** Web | **Type:** Utility


## Authentication

```robinpath
any "server" {"protocol": "sftp", "host": "example.com", "user": "admin", "pass": "..."}
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `ftp` module when you need to:

- **Upload a local file to remote server** -- Use `ftp.upload` to perform this operation
- **Download a remote file** -- Use `ftp.download` to perform this operation
- **List files in a remote directory** -- Use `ftp.list` to perform this operation
- **Create a remote directory** -- Use `ftp.mkdir` to perform this operation
- **Delete a remote file** -- Use `ftp.remove` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`connect`](#connect) | Connect to an FTP or SFTP server | `{name, protocol, connected}` |
| [`upload`](#upload) | Upload a local file to remote server | `{uploaded}` |
| [`download`](#download) | Download a remote file | `{downloaded}` |
| [`list`](#list) | List files in a remote directory | `Array of file info` |
| [`mkdir`](#mkdir) | Create a remote directory | `True` |
| [`remove`](#remove) | Delete a remote file | `True` |
| [`rename`](#rename) | Rename/move a remote file | `True` |
| [`close`](#close) | Close an FTP/SFTP connection | `True` |


## Functions

### connect

Connect to an FTP or SFTP server

**Module:** `ftp` | **Returns:** `object` -- {name, protocol, connected}

```robinpath
any "server" {"protocol": "sftp", "host": "example.com", "user": "admin", "pass": "..."}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection name |
| `options` | `object` | Yes | {protocol, host, port, user, pass, secure, privateKey} |

---

### upload

Upload a local file to remote server

**Module:** `ftp` | **Returns:** `object` -- {uploaded}

```robinpath
any "server" "./file.txt" "/remote/file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection |
| `localPath` | `string` | Yes | Local file |
| `remotePath` | `string` | Yes | Remote path |

---

### download

Download a remote file

**Module:** `ftp` | **Returns:** `object` -- {downloaded}

```robinpath
any "server" "/remote/file.txt" "./file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection |
| `remotePath` | `string` | Yes | Remote path |
| `localPath` | `string` | Yes | Local path |

---

### list

List files in a remote directory

**Module:** `ftp` | **Returns:** `array` -- Array of file info

```robinpath
any "server" "/uploads"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection |
| `path` | `string` | No | Remote path (default /) |

---

### mkdir

Create a remote directory

**Module:** `ftp` | **Returns:** `boolean` -- True

```robinpath
any "server" "/uploads/new"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection |
| `path` | `string` | Yes | Remote path |

---

### remove

Delete a remote file

**Module:** `ftp` | **Returns:** `boolean` -- True

```robinpath
any "server" "/old/file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection |
| `path` | `string` | Yes | Remote path |

---

### rename

Rename/move a remote file

**Module:** `ftp` | **Returns:** `boolean` -- True

```robinpath
any "server" "/old.txt" "/new.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection |
| `from` | `string` | Yes | Current path |
| `to` | `string` | Yes | New path |

---

### close

Close an FTP/SFTP connection

**Module:** `ftp` | **Returns:** `boolean` -- True

```robinpath
any "server"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Connection |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Connection "..." not found` | Check the error message for details |

```robinpath
set $result as any "server" "./file.txt" "/remote/file.txt"
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
set $result as any "server" "/uploads"
each $item in $result
  print $item
end
```

### 2. Multi-step FTP workflow

Chain multiple ftp operations together.

```robinpath
set $r_connect as any "server" {"protocol": "sftp", "host": "example.com", "user": "admin", "pass": "..."}
set $r_upload as any "server" "./file.txt" "/remote/file.txt"
set $r_download as any "server" "/remote/file.txt" "./file.txt"
print "All operations complete"
```

### 3. Safe connect with validation

Check results before proceeding.

```robinpath
set $result as any "server" {"protocol": "sftp", "host": "example.com", "user": "admin", "pass": "..."}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
