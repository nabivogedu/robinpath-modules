# @robinpath/http

> HTTP server for RobinPath scripts. Register routes with static responses (JSON, HTML, files), enable CORS, serve static directories. No callbacks needed.

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-14-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `http` module lets you:

- Create a new HTTP server instance (does not start listening yet)
- Register a GET route that returns static JSON data
- Register a POST route that returns static JSON data
- Register a PUT route that returns static JSON data
- Register a DELETE route that returns static JSON data

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/http
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
any "myapi" "/api/products" [{"id": 1}]
```

## Available Functions

| Function | Description |
|----------|-------------|
| `http.createServer` | Create a new HTTP server instance (does not start listening yet) |
| `http.get` | Register a GET route that returns static JSON data |
| `http.post` | Register a POST route that returns static JSON data |
| `http.put` | Register a PUT route that returns static JSON data |
| `http.delete` | Register a DELETE route that returns static JSON data |
| `http.html` | Register a GET route that serves an HTML string |
| `http.file` | Register a GET route that serves a file from disk |
| `http.redirect` | Register a route that redirects to another URL |
| `http.static` | Register a directory to serve static files from |
| `http.cors` | Enable CORS on the server |
| `http.listen` | Start the HTTP server listening for requests |
| `http.stop` | Stop the HTTP server gracefully |
| `http.status` | Get server status: port, routes, listening state, request count |
| `http.logs` | Get the request log for a server |

## Examples

### Register a GET route that returns static JSON data

```robinpath
any "myapi" "/api/products" [{"id": 1}]
```

### Register a POST route that returns static JSON data

```robinpath
any "myapi" "/api/products" {"created": true}
```

### Register a PUT route that returns static JSON data

```robinpath
any "myapi" "/api/products/:id" {"updated": true}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/http";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  any "myapi" "/api/products" [{"id": 1}]
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
