---
title: "Docker"
module: "docker"
package: "@robinpath/docker"
description: "Docker container and image management using the system docker binary"
category: "devops"
tags: [docker, devops]
type: "integration"
auth: "none"
functionCount: 16
---

# Docker

> Docker container and image management using the system docker binary

**Package:** `@robinpath/docker` | **Category:** Devops | **Type:** Integration


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `docker` module when you need to:

- **List Docker containers** -- Use `docker.ps` to perform this operation
- **List Docker images** -- Use `docker.images` to perform this operation
- **Run a new container from an image** -- Use `docker.run` to perform this operation
- **Stop a running container** -- Use `docker.stop` to perform this operation
- **Start a stopped container** -- Use `docker.start` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`ps`](#ps) | List Docker containers | `object` |
| [`images`](#images) | List Docker images | `object` |
| [`run`](#run) | Run a new container from an image | `object` |
| [`stop`](#stop) | Stop a running container | `object` |
| [`start`](#start) | Start a stopped container | `object` |
| [`rm`](#rm) | Remove a container | `object` |
| [`rmi`](#rmi) | Remove a Docker image | `object` |
| [`logs`](#logs) | Fetch logs from a container | `object` |
| [`exec`](#exec) | Execute a command inside a running container | `object` |
| [`build`](#build) | Build a Docker image from a Dockerfile | `object` |
| [`pull`](#pull) | Pull a Docker image from a registry | `object` |
| [`push`](#push) | Push a Docker image to a registry | `object` |
| [`inspect`](#inspect) | Return low-level information on a container or image | `object` |
| [`stats`](#stats) | Display container resource usage statistics | `object` |
| [`network`](#network) | Manage Docker networks | `object` |
| [`volume`](#volume) | Manage Docker volumes | `object` |


## Functions

### ps

List Docker containers

**Module:** `docker` | **Returns:** `object` -- API response.

```robinpath
docker.ps
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `all` | `boolean` | No | Show all containers including stopped (default: true) |
| `format` | `string` | No | Output format: json or table (default: json) |

---

### images

List Docker images

**Module:** `docker` | **Returns:** `object` -- API response.

```robinpath
docker.images
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `format` | `string` | No | Output format: json or table (default: json) |

---

### run

Run a new container from an image

**Module:** `docker` | **Returns:** `object` -- API response.

```robinpath
docker.run
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `image` | `string` | Yes | Image name to run |
| `options` | `object` | No | Run options: detach, rm, name, ports[], env{}, volumes[], network, command |

---

### stop

Stop a running container

**Module:** `docker` | **Returns:** `object` -- API response.

```robinpath
docker.stop
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `container` | `string` | Yes | Container ID or name |
| `timeout` | `number` | No | Seconds to wait before killing |

---

### start

Start a stopped container

**Module:** `docker` | **Returns:** `object` -- API response.

```robinpath
docker.start
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `container` | `string` | Yes | Container ID or name |

---

### rm

Remove a container

**Module:** `docker` | **Returns:** `object` -- API response.

```robinpath
docker.rm
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `container` | `string` | Yes | Container ID or name |
| `force` | `boolean` | No | Force remove running container |
| `volumes` | `boolean` | No | Remove associated volumes |

---

### rmi

Remove a Docker image

**Module:** `docker` | **Returns:** `object` -- API response.

```robinpath
docker.rmi
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `image` | `string` | Yes | Image ID or name |
| `force` | `boolean` | No | Force remove |

---

### logs

Fetch logs from a container

**Module:** `docker` | **Returns:** `object` -- API response.

```robinpath
docker.logs
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `container` | `string` | Yes | Container ID or name |
| `tail` | `number` | No | Number of lines from the end |
| `follow` | `boolean` | No | Follow log output |

---

### exec

Execute a command inside a running container

**Module:** `docker` | **Returns:** `object` -- API response.

```robinpath
docker.exec
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `container` | `string` | Yes | Container ID or name |
| `command` | `string` | Yes | Command to execute |
| `interactive` | `boolean` | No | Interactive mode with TTY |
| `workdir` | `string` | No | Working directory inside container |

---

### build

Build a Docker image from a Dockerfile

**Module:** `docker` | **Returns:** `object` -- API response.

```robinpath
docker.build
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `context` | `string` | Yes | Build context path |
| `options` | `object` | No | Build options: tag, file, noCache, buildArgs{} |

---

### pull

Pull a Docker image from a registry

**Module:** `docker` | **Returns:** `object` -- API response.

```robinpath
docker.pull
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `image` | `string` | Yes | Image name with optional tag |

---

### push

Push a Docker image to a registry

**Module:** `docker` | **Returns:** `object` -- API response.

```robinpath
docker.push
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `image` | `string` | Yes | Image name with optional tag |

---

### inspect

Return low-level information on a container or image

**Module:** `docker` | **Returns:** `object` -- API response.

```robinpath
docker.inspect
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `target` | `string` | Yes | Container or image ID/name |
| `format` | `string` | No | Go template format string |

---

### stats

Display container resource usage statistics

**Module:** `docker` | **Returns:** `object` -- API response.

```robinpath
docker.stats
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `container` | `string` | No | Container ID or name (omit for all) |

---

### network

Manage Docker networks

**Module:** `docker` | **Returns:** `object` -- API response.

```robinpath
docker.network
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `action` | `string` | No | Action: ls, create, rm, inspect (default: ls) |
| `name` | `string` | No | Network name |
| `driver` | `string` | No | Network driver (for create) |

---

### volume

Manage Docker volumes

**Module:** `docker` | **Returns:** `object` -- API response.

```robinpath
docker.volume
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `action` | `string` | No | Action: ls, create, rm, inspect (default: ls) |
| `name` | `string` | No | Volume name |
| `driver` | `string` | No | Volume driver (for create) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as docker.ps
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Docker workflow

Chain multiple docker operations together.

```robinpath
set $r_ps as docker.ps
set $r_images as docker.images
set $r_run as docker.run
print "All operations complete"
```

### 2. Safe ps with validation

Check results before proceeding.

```robinpath
set $result as docker.ps
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **git** -- Git module for complementary functionality
- **github** -- GitHub module for complementary functionality
- **gitlab** -- GitLab module for complementary functionality
- **vercel** -- Vercel module for complementary functionality
- **netlify** -- Netlify module for complementary functionality
