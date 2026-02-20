# @robinpath/cookie

> HTTP cookie parsing, serialization, signing/verification, Set-Cookie handling, and cookie jar management

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `cookie` module lets you:

- Parse Cookie header string
- Serialize Set-Cookie header
- Sign cookie value with HMAC
- Verify and unsign cookie
- Get single cookie from header

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/cookie
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
cookie.serialize "session" "abc123" {"httpOnly": true, "maxAge": 3600}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `cookie.parse` | Parse Cookie header string |
| `cookie.serialize` | Serialize Set-Cookie header |
| `cookie.sign` | Sign cookie value with HMAC |
| `cookie.unsign` | Verify and unsign cookie |
| `cookie.get` | Get single cookie from header |
| `cookie.remove` | Generate removal Set-Cookie |
| `cookie.parseSetCookie` | Parse Set-Cookie header |
| `cookie.isExpired` | Check if cookie is expired |
| `cookie.jar` | Create cookie jar |
| `cookie.toHeader` | Build Cookie header from pairs |
| `cookie.encode` | URL-encode cookie value |
| `cookie.decode` | URL-decode cookie value |

## Examples

### Serialize Set-Cookie header

```robinpath
cookie.serialize "session" "abc123" {"httpOnly": true, "maxAge": 3600}
```

### Sign cookie value with HMAC

```robinpath
cookie.sign "userId=123" "my-secret"
```

### Verify and unsign cookie

```robinpath
cookie.unsign $signed "my-secret"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/cookie";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  cookie.serialize "session" "abc123" {"httpOnly": true, "maxAge": 3600}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
