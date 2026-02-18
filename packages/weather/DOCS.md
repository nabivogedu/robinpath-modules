---
title: "Weather"
module: "weather"
package: "@robinpath/weather"
description: "Weather module for RobinPath."
category: "other"
tags: [weather, other]
type: "utility"
auth: "api-key"
functionCount: 13
baseUrl: "https://api.openweathermap.org"
---

# Weather

> Weather module for RobinPath.

**Package:** `@robinpath/weather` | **Category:** Other | **Type:** Utility


## Authentication

```robinpath
weather.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `weather` module when you need to:

- **getCurrentWeather** -- Use `weather.getCurrentWeather` to perform this operation
- **getForecast** -- Use `weather.getForecast` to perform this operation
- **get5DayForecast** -- Use `weather.get5DayForecast` to perform this operation
- **getHourlyForecast** -- Use `weather.getHourlyForecast` to perform this operation
- **getAirQuality** -- Use `weather.getAirQuality` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure weather credentials. | `object` |
| [`getCurrentWeather`](#getcurrentweather) | getCurrentWeather | `object` |
| [`getForecast`](#getforecast) | getForecast | `object` |
| [`get5DayForecast`](#get5dayforecast) | get5DayForecast | `object` |
| [`getHourlyForecast`](#gethourlyforecast) | getHourlyForecast | `object` |
| [`getAirQuality`](#getairquality) | getAirQuality | `object` |
| [`getUVIndex`](#getuvindex) | getUVIndex | `object` |
| [`getWeatherByZip`](#getweatherbyzip) | getWeatherByZip | `object` |
| [`getHistoricalWeather`](#gethistoricalweather) | getHistoricalWeather | `object` |
| [`getWeatherAlerts`](#getweatheralerts) | getWeatherAlerts | `object` |
| [`geocodeCity`](#geocodecity) | geocodeCity | `object` |
| [`reverseGeocode`](#reversegeocode) | reverseGeocode | `object` |
| [`getWeatherMap`](#getweathermap) | getWeatherMap | `object` |


## Functions

### setCredentials

Configure weather credentials.

**Module:** `weather` | **Returns:** `object` -- API response.

```robinpath
weather.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | Yes | apiKey |

---

### getCurrentWeather

getCurrentWeather

**Module:** `weather` | **Returns:** `object` -- API response.

```robinpath
weather.getCurrentWeather
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getForecast

getForecast

**Module:** `weather` | **Returns:** `object` -- API response.

```robinpath
weather.getForecast
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### get5DayForecast

get5DayForecast

**Module:** `weather` | **Returns:** `object` -- API response.

```robinpath
weather.get5DayForecast
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getHourlyForecast

getHourlyForecast

**Module:** `weather` | **Returns:** `object` -- API response.

```robinpath
weather.getHourlyForecast
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getAirQuality

getAirQuality

**Module:** `weather` | **Returns:** `object` -- API response.

```robinpath
weather.getAirQuality
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUVIndex

getUVIndex

**Module:** `weather` | **Returns:** `object` -- API response.

```robinpath
weather.getUVIndex
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getWeatherByZip

getWeatherByZip

**Module:** `weather` | **Returns:** `object` -- API response.

```robinpath
weather.getWeatherByZip
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getHistoricalWeather

getHistoricalWeather

**Module:** `weather` | **Returns:** `object` -- API response.

```robinpath
weather.getHistoricalWeather
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getWeatherAlerts

getWeatherAlerts

**Module:** `weather` | **Returns:** `object` -- API response.

```robinpath
weather.getWeatherAlerts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### geocodeCity

geocodeCity

**Module:** `weather` | **Returns:** `object` -- API response.

```robinpath
weather.geocodeCity
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### reverseGeocode

reverseGeocode

**Module:** `weather` | **Returns:** `object` -- API response.

```robinpath
weather.reverseGeocode
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getWeatherMap

getWeatherMap

**Module:** `weather` | **Returns:** `object` -- API response.

```robinpath
weather.getWeatherMap
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Weather API error (${res.status}): ${t}` | Check the error message for details |
| `weather.setCredentials requires apiKey.` | Check the error message for details |
| `Weather: "..." not configured. Call weather.setCredentials first.` | Check the error message for details |

```robinpath
set $result as weather.getCurrentWeather
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate CurrentWeather

Retrieve all items and loop through them.

```robinpath
weather.setCredentials $token
set $result as weather.getCurrentWeather
each $item in $result
  print $item
end
```

### 2. Multi-step Weather workflow

Chain multiple weather operations together.

```robinpath
weather.setCredentials $token
set $r_getCurrentWeather as weather.getCurrentWeather
set $r_getForecast as weather.getForecast
set $r_get5DayForecast as weather.get5DayForecast
print "All operations complete"
```

### 3. Safe getCurrentWeather with validation

Check results before proceeding.

```robinpath
weather.setCredentials $token
set $result as weather.getCurrentWeather
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
