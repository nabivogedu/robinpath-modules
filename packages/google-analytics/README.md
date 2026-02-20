# @robinpath/google-analytics

> Google Analytics module for RobinPath.

![Category](https://img.shields.io/badge/category-Productivity-blue) ![Functions](https://img.shields.io/badge/functions-15-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `google-analytics` module lets you:

- runReport
- runRealtimeReport
- batchRunReports
- runPivotReport
- getMetadata

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/google-analytics
```

## Quick Start

**1. Set up credentials**

```robinpath
google-analytics.setCredentials "your-credentials"
```

**2. runReport**

```robinpath
google-analytics.runReport
```

## Available Functions

| Function | Description |
|----------|-------------|
| `google-analytics.setCredentials` | Configure google-analytics credentials. |
| `google-analytics.runReport` | runReport |
| `google-analytics.runRealtimeReport` | runRealtimeReport |
| `google-analytics.batchRunReports` | batchRunReports |
| `google-analytics.runPivotReport` | runPivotReport |
| `google-analytics.getMetadata` | getMetadata |
| `google-analytics.listProperties` | listProperties |
| `google-analytics.getProperty` | getProperty |
| `google-analytics.listAccounts` | listAccounts |
| `google-analytics.getActiveUsers` | getActiveUsers |
| `google-analytics.getPageViews` | getPageViews |
| `google-analytics.getTopPages` | getTopPages |
| `google-analytics.getTrafficSources` | getTrafficSources |
| `google-analytics.getUserDemographics` | getUserDemographics |
| `google-analytics.getConversions` | getConversions |

## Examples

### runReport

```robinpath
google-analytics.runReport
```

### runRealtimeReport

```robinpath
google-analytics.runRealtimeReport
```

### batchRunReports

```robinpath
google-analytics.batchRunReports
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/google-analytics";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  google-analytics.setCredentials "your-credentials"
  google-analytics.runReport
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/google-sheets`](../google-sheets) — Google Sheets module for complementary functionality
- [`@robinpath/google-calendar`](../google-calendar) — Google Calendar module for complementary functionality
- [`@robinpath/google-contacts`](../google-contacts) — Google Contacts module for complementary functionality
- [`@robinpath/google-forms`](../google-forms) — Google Forms module for complementary functionality
- [`@robinpath/gmail`](../gmail) — Gmail module for complementary functionality

## License

MIT
