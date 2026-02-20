# @robinpath/geo

> Geolocation utilities: distance, bearing, geocoding, bounding box, polygon containment, DMS conversion

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-14-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `geo` module lets you:

- Haversine distance between two points
- Bearing between two points
- Midpoint between two coordinates
- Destination point given start, bearing, and distance
- Bounding box around a point

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/geo
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
geo.bearing 40.7128 -74.0060 51.5074 -0.1278
```

## Available Functions

| Function | Description |
|----------|-------------|
| `geo.distance` | Haversine distance between two points |
| `geo.bearing` | Bearing between two points |
| `geo.midpoint` | Midpoint between two coordinates |
| `geo.destination` | Destination point given start, bearing, and distance |
| `geo.boundingBox` | Bounding box around a point |
| `geo.isInBoundingBox` | Check if point is inside bounding box |
| `geo.toRadians` | Convert degrees to radians |
| `geo.toDegrees` | Convert radians to degrees |
| `geo.toDMS` | Convert decimal degrees to DMS string |
| `geo.fromDMS` | Parse DMS string to decimal degrees |
| `geo.geocode` | Forward geocode address to coordinates |
| `geo.reverseGeocode` | Reverse geocode coordinates to address |
| `geo.polygon` | Check if point is inside polygon |
| `geo.area` | Calculate polygon area in sq km |

## Examples

### Bearing between two points

```robinpath
geo.bearing 40.7128 -74.0060 51.5074 -0.1278
```

### Midpoint between two coordinates

```robinpath
geo.midpoint 40.7128 -74.0060 51.5074 -0.1278
```

### Destination point given start, bearing, and distance

```robinpath
geo.destination 40.7128 -74.0060 45 100
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/geo";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  geo.bearing 40.7128 -74.0060 51.5074 -0.1278
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
