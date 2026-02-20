# @robinpath/chart

> Generate chart images (PNG/JPEG) using Chart.js. Supports bar, line, pie, doughnut, scatter, radar, polarArea, and bubble charts with auto-coloring and customizable titles, legends, and dimensions.

![Category](https://img.shields.io/badge/category-Analytics-blue) ![Functions](https://img.shields.io/badge/functions-7-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `chart` module lets you:

- Create a new chart (bar, line, pie, doughnut, scatter, radar, polarArea, bubble)
- Add a dataset to an existing chart
- Update chart options (title, size, legend, type, labels)
- Render chart and save to PNG or JPEG file
- Render chart and return as base64 data URL string

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/chart
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
chart.addDataset "c1" {"label": "Costs", "data": [50, 80]}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `chart.create` | Create a new chart (bar, line, pie, doughnut, scatter, radar, polarArea, bubble) |
| `chart.addDataset` | Add a dataset to an existing chart |
| `chart.update` | Update chart options (title, size, legend, type, labels) |
| `chart.save` | Render chart and save to PNG or JPEG file |
| `chart.toBase64` | Render chart and return as base64 data URL string |
| `chart.toBuffer` | Render chart and return as raw Buffer |
| `chart.destroy` | Remove chart from memory |

## Examples

### Add a dataset to an existing chart

```robinpath
chart.addDataset "c1" {"label": "Costs", "data": [50, 80]}
```

### Update chart options (title, size, legend, type, labels)

```robinpath
chart.update "c1" {"title": "Updated Title", "width": 1200}
```

### Render chart and save to PNG or JPEG file

```robinpath
chart.save "c1" "./output/chart.png"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/chart";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  chart.addDataset "c1" {"label": "Costs", "data": [50, 80]}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
