# @robinpath/robots

> robots.txt parsing, generation, URL permission checking, and crawl configuration

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-13-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `robots` module lets you:

- Parse robots.txt content
- Generate robots.txt
- Check if URL is allowed
- Check if URL is disallowed
- Get crawl delay for agent

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/robots
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
robots.create {"rules": [{"userAgent": "*", "disallow": ["/admin"]}]}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `robots.parse` | Parse robots.txt content |
| `robots.create` | Generate robots.txt |
| `robots.isAllowed` | Check if URL is allowed |
| `robots.isDisallowed` | Check if URL is disallowed |
| `robots.getCrawlDelay` | Get crawl delay for agent |
| `robots.getSitemaps` | Get sitemap URLs |
| `robots.getRules` | Get rules for agent |
| `robots.addRule` | Add rule to robots config |
| `robots.removeRule` | Remove rule by user agent |
| `robots.addSitemap` | Add sitemap URL |
| `robots.allowAll` | Generate allow-all robots.txt |
| `robots.disallowAll` | Generate disallow-all robots.txt |
| `robots.fetch` | Fetch and parse robots.txt from URL |

## Examples

### Generate robots.txt

```robinpath
robots.create {"rules": [{"userAgent": "*", "disallow": ["/admin"]}]}
```

### Check if URL is allowed

```robinpath
robots.isAllowed $robots "/page" "Googlebot"
```

### Check if URL is disallowed

```robinpath
robots.isDisallowed $robots "/admin"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/robots";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  robots.create {"rules": [{"userAgent": "*", "disallow": ["/admin"]}]}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
