---
title: "SSH"
module: "ssh"
package: "@robinpath/ssh"
description: "Remote server command execution and file management via SSH and SFTP"
category: "web"
tags: [ssh, web]
type: "utility"
auth: "connection-string"
functionCount: 13
---

# SSH

> Remote server command execution and file management via SSH and SFTP

**Package:** `@robinpath/ssh` | **Category:** Web | **Type:** Utility


## Authentication

```robinpath
ssh.connect "server" {"host": "example.com", "username": "admin", "password": "..."}
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `ssh` module when you need to:

- **Execute a command on the remote server** -- Use `ssh.exec` to perform this operation
- **Upload a local file to the remote server via SFTP** -- Use `ssh.upload` to perform this operation
- **Download a remote file to local filesystem via SFTP** -- Use `ssh.download` to perform this operation
- **Create a directory on the remote server** -- Use `ssh.mkdir` to perform this operation
- **List files in a remote directory** -- Use `ssh.ls` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`connect`](#connect) | Connect to an SSH server | `Connection id` |
| [`exec`](#exec) | Execute a command on the remote server | `{stdout, stderr, code}` |
| [`upload`](#upload) | Upload a local file to the remote server via SFTP | `{uploaded}` |
| [`download`](#download) | Download a remote file to local filesystem via SFTP | `{downloaded}` |
| [`mkdir`](#mkdir) | Create a directory on the remote server | `True on success` |
| [`ls`](#ls) | List files in a remote directory | `Array of {name, size, modifyTime, isDirectory}` |
| [`rm`](#rm) | Remove a file on the remote server | `True on success` |
| [`rmdir`](#rmdir) | Remove a directory on the remote server | `True on success` |
| [`stat`](#stat) | Get file or directory stats from the remote server | `{size, modifyTime, accessTime, isDirectory, isFile}` |
| [`readFile`](#readfile) | Read the contents of a remote file as a string | `File content as UTF-8 string` |
| [`writeFile`](#writefile) | Write string content to a remote file | `True on success` |
| [`close`](#close) | Close an SSH connection | `True if closed, false if not found` |
| [`isConnected`](#isconnected) | Check if an SSH connection is alive | `True if connected` |


## Functions

### connect

Connect to an SSH server

**Module:** `ssh` | **Returns:** `string` -- Connection id

```robinpath
ssh.connect "server" {"host": "example.com", "username": "admin", "password": "..."}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Connection identifier |
| `options` | `object` | Yes | {host, port, username, password, privateKey, privateKeyPath, passphrase} |

---

### exec

Execute a command on the remote server

**Module:** `ssh` | **Returns:** `object` -- {stdout, stderr, code}

```robinpath
ssh.exec "server" "ls -la /var/log"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connectionId` | `string` | Yes | Connection identifier |
| `command` | `string` | Yes | Shell command to execute |

---

### upload

Upload a local file to the remote server via SFTP

**Module:** `ssh` | **Returns:** `object` -- {uploaded}

```robinpath
ssh.upload "server" "./deploy.tar.gz" "/opt/app/deploy.tar.gz"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connectionId` | `string` | Yes | Connection identifier |
| `localPath` | `string` | Yes | Local file path |
| `remotePath` | `string` | Yes | Remote destination path |

---

### download

Download a remote file to local filesystem via SFTP

**Module:** `ssh` | **Returns:** `object` -- {downloaded}

```robinpath
ssh.download "server" "/var/log/app.log" "./app.log"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connectionId` | `string` | Yes | Connection identifier |
| `remotePath` | `string` | Yes | Remote file path |
| `localPath` | `string` | Yes | Local destination path |

---

### mkdir

Create a directory on the remote server

**Module:** `ssh` | **Returns:** `boolean` -- True on success

```robinpath
ssh.mkdir "server" "/opt/app/logs"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connectionId` | `string` | Yes | Connection identifier |
| `remotePath` | `string` | Yes | Remote directory path |

---

### ls

List files in a remote directory

**Module:** `ssh` | **Returns:** `array` -- Array of {name, size, modifyTime, isDirectory}

```robinpath
ssh.ls "server" "/var/log"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connectionId` | `string` | Yes | Connection identifier |
| `remotePath` | `string` | No | Remote directory path (default /) |

---

### rm

Remove a file on the remote server

**Module:** `ssh` | **Returns:** `boolean` -- True on success

```robinpath
ssh.rm "server" "/tmp/old-file.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connectionId` | `string` | Yes | Connection identifier |
| `remotePath` | `string` | Yes | Remote file path |

---

### rmdir

Remove a directory on the remote server

**Module:** `ssh` | **Returns:** `boolean` -- True on success

```robinpath
ssh.rmdir "server" "/tmp/old-dir"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connectionId` | `string` | Yes | Connection identifier |
| `remotePath` | `string` | Yes | Remote directory path |

---

### stat

Get file or directory stats from the remote server

**Module:** `ssh` | **Returns:** `object` -- {size, modifyTime, accessTime, isDirectory, isFile}

```robinpath
ssh.stat "server" "/var/log/app.log"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connectionId` | `string` | Yes | Connection identifier |
| `remotePath` | `string` | Yes | Remote path |

---

### readFile

Read the contents of a remote file as a string

**Module:** `ssh` | **Returns:** `string` -- File content as UTF-8 string

```robinpath
ssh.readFile "server" "/etc/hostname"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connectionId` | `string` | Yes | Connection identifier |
| `remotePath` | `string` | Yes | Remote file path |

---

### writeFile

Write string content to a remote file

**Module:** `ssh` | **Returns:** `boolean` -- True on success

```robinpath
ssh.writeFile "server" "/tmp/config.txt" "key=value"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connectionId` | `string` | Yes | Connection identifier |
| `remotePath` | `string` | Yes | Remote file path |
| `content` | `string` | Yes | Content to write |

---

### close

Close an SSH connection

**Module:** `ssh` | **Returns:** `boolean` -- True if closed, false if not found

```robinpath
ssh.close "server"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connectionId` | `string` | Yes | Connection identifier |

---

### isConnected

Check if an SSH connection is alive

**Module:** `ssh` | **Returns:** `boolean` -- True if connected

```robinpath
ssh.isConnected "server"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `connectionId` | `string` | Yes | Connection identifier |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `SSH connection "..." not found` | Check the error message for details |

```robinpath
set $result as ssh.exec "server" "ls -la /var/log"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step SSH workflow

Chain multiple ssh operations together.

```robinpath
set $r_connect as ssh.connect "server" {"host": "example.com", "username": "admin", "password": "..."}
set $r_exec as ssh.exec "server" "ls -la /var/log"
set $r_upload as ssh.upload "server" "./deploy.tar.gz" "/opt/app/deploy.tar.gz"
print "All operations complete"
```

### 2. Safe connect with validation

Check results before proceeding.

```robinpath
set $result as ssh.connect "server" {"host": "example.com", "username": "admin", "password": "..."}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
