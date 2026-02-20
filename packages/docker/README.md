# @robinpath/docker

> Docker container and image management using the system docker binary

![Category](https://img.shields.io/badge/category-DevOps-blue) ![Functions](https://img.shields.io/badge/functions-16-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `docker` module lets you:

- List Docker containers
- List Docker images
- Run a new container from an image
- Stop a running container
- Start a stopped container

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/docker
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
docker.images
```

## Available Functions

| Function | Description |
|----------|-------------|
| `docker.ps` | List Docker containers |
| `docker.images` | List Docker images |
| `docker.run` | Run a new container from an image |
| `docker.stop` | Stop a running container |
| `docker.start` | Start a stopped container |
| `docker.rm` | Remove a container |
| `docker.rmi` | Remove a Docker image |
| `docker.logs` | Fetch logs from a container |
| `docker.exec` | Execute a command inside a running container |
| `docker.build` | Build a Docker image from a Dockerfile |
| `docker.pull` | Pull a Docker image from a registry |
| `docker.push` | Push a Docker image to a registry |
| `docker.inspect` | Return low-level information on a container or image |
| `docker.stats` | Display container resource usage statistics |
| `docker.network` | Manage Docker networks |
| `docker.volume` | Manage Docker volumes |

## Examples

### List Docker images

```robinpath
docker.images
```

### Run a new container from an image

```robinpath
docker.run
```

### Stop a running container

```robinpath
docker.stop
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/docker";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  docker.images
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/git`](../git) — Git module for complementary functionality
- [`@robinpath/github`](../github) — GitHub module for complementary functionality
- [`@robinpath/gitlab`](../gitlab) — GitLab module for complementary functionality
- [`@robinpath/vercel`](../vercel) — Vercel module for complementary functionality
- [`@robinpath/netlify`](../netlify) — Netlify module for complementary functionality

## License

MIT
