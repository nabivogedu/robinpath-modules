# @robinpath/url

> URL parsing, formatting, and query parameter manipulation utilities using the built-in URL API

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-14-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `url` module lets you:

- Parse a URL string into its component parts
- Format URL component parts into a URL string
- Resolve a relative URL against a base URL
- Get the value of a single query parameter from a URL
- Remove a query parameter from a URL

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/url
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
url.format { protocol: "https:", hostname: "example.com", pathname: "/path" }
```

## Available Functions

| Function | Description |
|----------|-------------|
| `url.parse` | Parse a URL string into its component parts |
| `url.format` | Format URL component parts into a URL string |
| `url.resolve` | Resolve a relative URL against a base URL |
| `url.getParam` | Get the value of a single query parameter from a URL |
| `url.setParam` | Set a query parameter on a URL, replacing any existing value |
| `url.removeParam` | Remove a query parameter from a URL |
| `url.getParams` | Get all query parameters from a URL as a plain object |
| `url.setParams` | Set multiple query parameters on a URL at once |
| `url.getHostname` | Extract the hostname from a URL |
| `url.getPathname` | Extract the pathname from a URL |
| `url.getProtocol` | Extract the protocol from a URL |
| `url.isValid` | Check whether a string is a valid URL |
| `url.encode` | Encode a string for safe use in a URL component |
| `url.decode` | Decode a URI-encoded string |

## Examples

### Format URL component parts into a URL string

```robinpath
url.format { protocol: "https:", hostname: "example.com", pathname: "/path" }
```

### Resolve a relative URL against a base URL

```robinpath
url.resolve "https://example.com/a/b" "../c"
```

### Get the value of a single query parameter from a URL

```robinpath
url.getParam "https://example.com?foo=bar" "foo"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/url";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  url.format { protocol: "https:", hostname: "example.com", pathname: "/path" }
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
