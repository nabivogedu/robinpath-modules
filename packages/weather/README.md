# @robinpath/weather

> Weather module for RobinPath.

![Category](https://img.shields.io/badge/category-Other-blue) ![Functions](https://img.shields.io/badge/functions-13-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `weather` module lets you:

- getCurrentWeather
- getForecast
- get5DayForecast
- getHourlyForecast
- getAirQuality

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/weather
```

## Quick Start

**1. Set up credentials**

```robinpath
weather.setCredentials "your-credentials"
```

**2. getCurrentWeather**

```robinpath
weather.getCurrentWeather
```

## Available Functions

| Function | Description |
|----------|-------------|
| `weather.setCredentials` | Configure weather credentials. |
| `weather.getCurrentWeather` | getCurrentWeather |
| `weather.getForecast` | getForecast |
| `weather.get5DayForecast` | get5DayForecast |
| `weather.getHourlyForecast` | getHourlyForecast |
| `weather.getAirQuality` | getAirQuality |
| `weather.getUVIndex` | getUVIndex |
| `weather.getWeatherByZip` | getWeatherByZip |
| `weather.getHistoricalWeather` | getHistoricalWeather |
| `weather.getWeatherAlerts` | getWeatherAlerts |
| `weather.geocodeCity` | geocodeCity |
| `weather.reverseGeocode` | reverseGeocode |
| `weather.getWeatherMap` | getWeatherMap |

## Examples

### getCurrentWeather

```robinpath
weather.getCurrentWeather
```

### getForecast

```robinpath
weather.getForecast
```

### get5DayForecast

```robinpath
weather.get5DayForecast
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/weather";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  weather.setCredentials "your-credentials"
  weather.getCurrentWeather
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
