# @robinpath/server

> HTTP server creation and management using Node.js built-in http module. Supports routing, static file serving, CORS, and common response helpers.

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `server` module lets you:

- Create a new HTTP server instance
- Start listening for incoming connections
- Stop the server and close all connections
- Register a handler for all incoming requests
- Register an error handler for the server

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/server
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
server.start
```

## Available Functions

| Function | Description |
|----------|-------------|
| `server.create` | Create a new HTTP server instance |
| `server.start` | Start listening for incoming connections |
| `server.stop` | Stop the server and close all connections |
| `server.onRequest` | Register a handler for all incoming requests |
| `server.onError` | Register an error handler for the server |
| `server.route` | Add a route with method, path pattern, and handler |
| `server.static` | Serve static files from a directory |
| `server.sendJson` | Send a JSON response |
| `server.sendHtml` | Send an HTML response |
| `server.sendFile` | Send a file as the response |
| `server.sendRedirect` | Send an HTTP redirect response |
| `server.status` | Send a response with a specific status code |
| `server.cors` | Enable and configure CORS headers for a server |
| `server.getServers` | List all active server instances |
| `server.getRoutes` | List all routes registered on a server |

## Examples

### Start listening for incoming connections

```robinpath
server.start
```

### Stop the server and close all connections

```robinpath
server.stop
```

### Register a handler for all incoming requests

```robinpath
server.onRequest
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/server";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  server.start
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
