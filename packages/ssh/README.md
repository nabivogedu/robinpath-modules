# @robinpath/ssh

> Remote server command execution and file management via SSH and SFTP

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-13-green) ![Auth](https://img.shields.io/badge/auth-connection-string-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `ssh` module lets you:

- Execute a command on the remote server
- Upload a local file to the remote server via SFTP
- Download a remote file to local filesystem via SFTP
- Create a directory on the remote server
- List files in a remote directory

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/ssh
```

## Quick Start

**1. Set up credentials**

```robinpath
ssh.connect "server" {"host": "example.com", "username": "admin", "password": "..."}
```

**2. Execute a command on the remote server**

```robinpath
ssh.exec "server" "ls -la /var/log"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `ssh.connect` | Connect to an SSH server |
| `ssh.exec` | Execute a command on the remote server |
| `ssh.upload` | Upload a local file to the remote server via SFTP |
| `ssh.download` | Download a remote file to local filesystem via SFTP |
| `ssh.mkdir` | Create a directory on the remote server |
| `ssh.ls` | List files in a remote directory |
| `ssh.rm` | Remove a file on the remote server |
| `ssh.rmdir` | Remove a directory on the remote server |
| `ssh.stat` | Get file or directory stats from the remote server |
| `ssh.readFile` | Read the contents of a remote file as a string |
| `ssh.writeFile` | Write string content to a remote file |
| `ssh.close` | Close an SSH connection |
| `ssh.isConnected` | Check if an SSH connection is alive |

## Examples

### Execute a command on the remote server

```robinpath
ssh.exec "server" "ls -la /var/log"
```

### Upload a local file to the remote server via SFTP

```robinpath
ssh.upload "server" "./deploy.tar.gz" "/opt/app/deploy.tar.gz"
```

### Download a remote file to local filesystem via SFTP

```robinpath
ssh.download "server" "/var/log/app.log" "./app.log"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/ssh";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  ssh.connect "server" {"host": "example.com", "username": "admin", "password": "..."}
  ssh.exec "server" "ls -la /var/log"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
