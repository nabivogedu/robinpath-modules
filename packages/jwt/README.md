# @robinpath/jwt

> JWT (JSON Web Token) creation, signing, verification, and decoding using HMAC (HS256, HS384, HS512)

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-7-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `jwt` module lets you:

- Create a signed JWT token from a payload object using HMAC (HS256, HS384, or HS512)
- Verify a JWT token signature and expiration, returning the decoded payload
- Decode a JWT token WITHOUT verifying its signature (unsafe — use for inspection only)
- Extract and decode the header from a JWT token (no verification)
- Extract and decode the payload from a JWT token without verification

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/jwt
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
jwt.verify "eyJhbGciOiJIUzI1NiJ9..." "my-secret"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `jwt.sign` | Create a signed JWT token from a payload object using HMAC (HS256, HS384, or HS512) |
| `jwt.verify` | Verify a JWT token signature and expiration, returning the decoded payload |
| `jwt.decode` | Decode a JWT token WITHOUT verifying its signature (unsafe — use for inspection only) |
| `jwt.getHeader` | Extract and decode the header from a JWT token (no verification) |
| `jwt.getPayload` | Extract and decode the payload from a JWT token without verification |
| `jwt.isExpired` | Check whether a JWT token has expired based on its exp claim |
| `jwt.getExpiration` | Get the expiration timestamp (exp claim) from a JWT token |

## Examples

### Verify a JWT token signature and expiration, returning the decoded payload

```robinpath
jwt.verify "eyJhbGciOiJIUzI1NiJ9..." "my-secret"
```

### Decode a JWT token WITHOUT verifying its signature (unsafe — use for inspection only)

```robinpath
jwt.decode "eyJhbGciOiJIUzI1NiJ9..."
```

### Extract and decode the header from a JWT token (no verification)

```robinpath
jwt.getHeader "eyJhbGciOiJIUzI1NiJ9..."
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/jwt";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  jwt.verify "eyJhbGciOiJIUzI1NiJ9..." "my-secret"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
