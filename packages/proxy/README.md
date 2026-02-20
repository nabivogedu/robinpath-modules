# @robinpath/proxy

> HTTP proxy and request forwarding module using Node.js built-in http module. Supports creating proxy servers, URL rewriting, header manipulation, request and response interception, round-robin load balancing, and health checking. No external dependencies required.

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-13-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `proxy` module lets you:

- Forward a single HTTP request to a target server and return the response
- Create a new HTTP proxy server instance
- Start a proxy server and begin listening for requests
- Stop a running proxy server and clean up resources
- Add a URL rewrite rule to transform incoming request paths

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/proxy
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
proxy.create
```

## Available Functions

| Function | Description |
|----------|-------------|
| `proxy.forward` | Forward a single HTTP request to a target server and return the response |
| `proxy.create` | Create a new HTTP proxy server instance |
| `proxy.start` | Start a proxy server and begin listening for requests |
| `proxy.stop` | Stop a running proxy server and clean up resources |
| `proxy.rewrite` | Add a URL rewrite rule to transform incoming request paths |
| `proxy.addHeader` | Add a header to all proxied responses |
| `proxy.removeHeader` | Remove a header from all proxied responses |
| `proxy.onRequest` | Register an interceptor function for incoming requests |
| `proxy.onResponse` | Register an interceptor function for proxy responses |
| `proxy.balance` | Configure round-robin load balancing across multiple target servers |
| `proxy.health` | Check the health of a target server by sending a HEAD request |
| `proxy.list` | List all active proxy server instances and their configurations |
| `proxy.stats` | Get statistics for a proxy server including request count, errors, and uptime |

## Examples

### Create a new HTTP proxy server instance

```robinpath
proxy.create
```

### Start a proxy server and begin listening for requests

```robinpath
proxy.start
```

### Stop a running proxy server and clean up resources

```robinpath
proxy.stop
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/proxy";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  proxy.create
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
