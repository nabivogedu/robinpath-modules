# @robinpath/oauth

> OAuth 2.0 authorization flows: auth URL, code exchange, refresh, client credentials, PKCE, token management

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-11-green) ![Auth](https://img.shields.io/badge/auth-OAuth-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `oauth` module lets you:

- Build an OAuth 2.0 authorization URL with required parameters
- Exchange an authorization code for access and refresh tokens
- Refresh an expired access token using a refresh token
- Get an access token using the client credentials grant (machine-to-machine)
- Generate a cryptographically random PKCE code verifier

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/oauth
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
oauth.exchangeCode "https://oauth2.googleapis.com/token" {"code": "...", "clientId": "..."}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `oauth.authUrl` | Build an OAuth 2.0 authorization URL with required parameters |
| `oauth.exchangeCode` | Exchange an authorization code for access and refresh tokens |
| `oauth.refreshToken` | Refresh an expired access token using a refresh token |
| `oauth.clientCredentials` | Get an access token using the client credentials grant (machine-to-machine) |
| `oauth.pkceVerifier` | Generate a cryptographically random PKCE code verifier |
| `oauth.pkceChallenge` | Generate a PKCE code challenge from a verifier |
| `oauth.getToken` | Retrieve a stored OAuth token by name |
| `oauth.isExpired` | Check if a stored token is expired (with buffer time) |
| `oauth.generateState` | Generate a cryptographically random state parameter for CSRF protection |
| `oauth.revokeToken` | Revoke an OAuth token at the provider's revocation endpoint |
| `oauth.clearTokens` | Clear stored tokens by name or all tokens |

## Examples

### Exchange an authorization code for access and refresh tokens

```robinpath
oauth.exchangeCode "https://oauth2.googleapis.com/token" {"code": "...", "clientId": "..."}
```

### Refresh an expired access token using a refresh token

```robinpath
oauth.refreshToken "https://oauth2.googleapis.com/token" {"name": "google", "clientId": "..."}
```

### Get an access token using the client credentials grant (machine-to-machine)

```robinpath
oauth.clientCredentials "https://api.example.com/oauth/token" {"clientId": "...", "clientSecret": "..."}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/oauth";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  oauth.exchangeCode "https://oauth2.googleapis.com/token" {"code": "...", "clientId": "..."}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
