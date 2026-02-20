# @robinpath/api

> HTTP client for making requests to external APIs with profiles, auth, download/upload, and auto-JSON parsing

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `api` module lets you:

- Send a GET request to a URL and return the response body (auto-parses JSON)
- Send a POST request with a JSON body
- Send a PUT request with a JSON body
- Send a PATCH request with a partial JSON body
- Send a DELETE request

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/api
```

## Quick Start

**1. Set up credentials**

```robinpath
api.setAuth "github" "bearer" "ghp_xxxxxxxxxxxx"
```

**2. Send a POST request with a JSON body**

```robinpath
api.post "https://api.example.com/users" {"name": "Alice", "email": "alice@example.com"}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `api.get` | Send a GET request to a URL and return the response body (auto-parses JSON) |
| `api.post` | Send a POST request with a JSON body |
| `api.put` | Send a PUT request with a JSON body |
| `api.patch` | Send a PATCH request with a partial JSON body |
| `api.delete` | Send a DELETE request |
| `api.head` | Send a HEAD request and return response headers only |
| `api.download` | Download a file from a URL and save it to disk |
| `api.upload` | Upload a file as multipart/form-data |
| `api.createProfile` | Create a named API profile with base URL, default headers, and timeout |
| `api.setAuth` | Set authentication on an existing profile |
| `api.setHeaders` | Merge additional default headers into an existing profile |
| `api.request` | Send a generic HTTP request with an explicit method string |

## Examples

### Send a POST request with a JSON body

```robinpath
api.post "https://api.example.com/users" {"name": "Alice", "email": "alice@example.com"}
```

### Send a PUT request with a JSON body

```robinpath
api.put "https://api.example.com/users/1" {"name": "Bob"}
```

### Send a PATCH request with a partial JSON body

```robinpath
api.patch "https://api.example.com/users/1" {"email": "new@example.com"}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/api";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  api.setAuth "github" "bearer" "ghp_xxxxxxxxxxxx"
  api.post "https://api.example.com/users" {"name": "Alice", "email": "alice@example.com"}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
