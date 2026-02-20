# @robinpath/auth

> API authentication helpers: Basic, Bearer, API key, HMAC signing, and password hashing

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `auth` module lets you:

- Create a Basic authentication header from username and password
- Parse a Basic auth header to extract username and password
- Create a Bearer authentication header from a token
- Extract the token from a Bearer auth header
- Create an API key configuration for header or query parameter placement

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/auth
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
auth.parseBasic "Basic dXNlcjpwYXNz"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `auth.basic` | Create a Basic authentication header from username and password |
| `auth.parseBasic` | Parse a Basic auth header to extract username and password |
| `auth.bearer` | Create a Bearer authentication header from a token |
| `auth.parseBearer` | Extract the token from a Bearer auth header |
| `auth.apiKey` | Create an API key configuration for header or query parameter placement |
| `auth.hmacSign` | Create an HMAC signature for a payload |
| `auth.hmacVerify` | Verify an HMAC signature using timing-safe comparison |
| `auth.generateApiKey` | Generate a cryptographically secure random API key |
| `auth.hashPassword` | Hash a password using PBKDF2 with a random salt |
| `auth.verifyPassword` | Verify a password against a PBKDF2 hash (timing-safe) |
| `auth.buildAuthHeader` | Build an Authorization header from a type and credentials |
| `auth.parseAuthHeader` | Parse any Authorization header into its scheme and credentials |

## Examples

### Parse a Basic auth header to extract username and password

```robinpath
auth.parseBasic "Basic dXNlcjpwYXNz"
```

### Create a Bearer authentication header from a token

```robinpath
auth.bearer "eyJhbGciOi..."
```

### Extract the token from a Bearer auth header

```robinpath
auth.parseBearer "Bearer eyJhbGciOi..."
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/auth";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  auth.parseBasic "Basic dXNlcjpwYXNz"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
