# @robinpath/mixpanel

> Mixpanel module for RobinPath.

![Category](https://img.shields.io/badge/category-Analytics-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `mixpanel` module lets you:

- trackEvent
- trackBatch
- identifyUser
- deleteUserProfile
- exportEvents

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/mixpanel
```

## Quick Start

**1. Set up credentials**

```robinpath
mixpanel.setCredentials "your-credentials"
```

**2. trackEvent**

```robinpath
mixpanel.trackEvent
```

## Available Functions

| Function | Description |
|----------|-------------|
| `mixpanel.setCredentials` | Configure mixpanel credentials. |
| `mixpanel.trackEvent` | trackEvent |
| `mixpanel.trackBatch` | trackBatch |
| `mixpanel.identifyUser` | identifyUser |
| `mixpanel.setUserProfile` | setUserProfile |
| `mixpanel.deleteUserProfile` | deleteUserProfile |
| `mixpanel.exportEvents` | exportEvents |
| `mixpanel.getTopEvents` | getTopEvents |
| `mixpanel.getEventStats` | getEventStats |
| `mixpanel.getFunnelReport` | getFunnelReport |
| `mixpanel.getRetention` | getRetention |
| `mixpanel.getSegmentation` | getSegmentation |
| `mixpanel.listCohorts` | listCohorts |
| `mixpanel.getInsights` | getInsights |
| `mixpanel.queryJql` | queryJql |

## Examples

### trackEvent

```robinpath
mixpanel.trackEvent
```

### trackBatch

```robinpath
mixpanel.trackBatch
```

### identifyUser

```robinpath
mixpanel.identifyUser
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/mixpanel";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  mixpanel.setCredentials "your-credentials"
  mixpanel.trackEvent
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
