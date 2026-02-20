# @robinpath/ip

> IP module for RobinPath.

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `ip` module lets you:

- getMyIp
- geolocate
- geolocateBatch
- isPrivate
- isValid

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/ip
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
ip.geolocate
```

## Available Functions

| Function | Description |
|----------|-------------|
| `ip.getMyIp` | getMyIp |
| `ip.geolocate` | geolocate |
| `ip.geolocateBatch` | geolocateBatch |
| `ip.isPrivate` | isPrivate |
| `ip.isValid` | isValid |
| `ip.isIpv4` | isIpv4 |
| `ip.isIpv6` | isIpv6 |
| `ip.cidrContains` | cidrContains |
| `ip.cidrRange` | cidrRange |
| `ip.subnetInfo` | subnetInfo |
| `ip.reverseDns` | reverseDns |
| `ip.checkBlacklist` | checkBlacklist |

## Examples

### geolocate

```robinpath
ip.geolocate
```

### geolocateBatch

```robinpath
ip.geolocateBatch
```

### isPrivate

```robinpath
ip.isPrivate
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/ip";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  ip.geolocate
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
