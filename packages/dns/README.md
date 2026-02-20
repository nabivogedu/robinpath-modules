# @robinpath/dns

> DNS lookups: resolve, reverse, MX, TXT, NS, SRV, SOA, CNAME records

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `dns` module lets you:

- Resolve hostname to records by type
- Resolve hostname to IPv4 addresses
- Resolve hostname to IPv6 addresses
- Reverse DNS lookup
- OS-level DNS lookup

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/dns
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
dns.resolve4 "example.com"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `dns.resolve` | Resolve hostname to records by type |
| `dns.resolve4` | Resolve hostname to IPv4 addresses |
| `dns.resolve6` | Resolve hostname to IPv6 addresses |
| `dns.reverse` | Reverse DNS lookup |
| `dns.lookup` | OS-level DNS lookup |
| `dns.mx` | Get MX records sorted by priority |
| `dns.txt` | Get TXT records |
| `dns.ns` | Get nameserver records |
| `dns.srv` | Get SRV records |
| `dns.soa` | Get SOA record |
| `dns.cname` | Get CNAME records |
| `dns.isResolvable` | Check if hostname resolves |

## Examples

### Resolve hostname to IPv4 addresses

```robinpath
dns.resolve4 "example.com"
```

### Resolve hostname to IPv6 addresses

```robinpath
dns.resolve6 "example.com"
```

### Reverse DNS lookup

```robinpath
dns.reverse "8.8.8.8"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/dns";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  dns.resolve4 "example.com"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
