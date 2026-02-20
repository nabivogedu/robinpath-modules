# @robinpath/hotjar

> Hotjar module for RobinPath.

![Category](https://img.shields.io/badge/category-Analytics-blue) ![Functions](https://img.shields.io/badge/functions-13-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `hotjar` module lets you:

- listSurveys
- getSurvey
- getSurveyResponses
- listFeedback
- getFeedbackItem

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/hotjar
```

## Quick Start

**1. Set up credentials**

```robinpath
hotjar.setCredentials "your-credentials"
```

**2. listSurveys**

```robinpath
hotjar.listSurveys
```

## Available Functions

| Function | Description |
|----------|-------------|
| `hotjar.setCredentials` | Configure hotjar credentials. |
| `hotjar.listSurveys` | listSurveys |
| `hotjar.getSurvey` | getSurvey |
| `hotjar.getSurveyResponses` | getSurveyResponses |
| `hotjar.listFeedback` | listFeedback |
| `hotjar.getFeedbackItem` | getFeedbackItem |
| `hotjar.listHeatmaps` | listHeatmaps |
| `hotjar.getHeatmap` | getHeatmap |
| `hotjar.listRecordings` | listRecordings |
| `hotjar.getRecording` | getRecording |
| `hotjar.getSiteInfo` | getSiteInfo |
| `hotjar.getUserInfo` | getUserInfo |
| `hotjar.getSessionCount` | getSessionCount |

## Examples

### listSurveys

```robinpath
hotjar.listSurveys
```

### getSurvey

```robinpath
hotjar.getSurvey
```

### getSurveyResponses

```robinpath
hotjar.getSurveyResponses
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/hotjar";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  hotjar.setCredentials "your-credentials"
  hotjar.listSurveys
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
