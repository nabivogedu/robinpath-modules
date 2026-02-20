---
title: "Geo"
module: "geo"
package: "@robinpath/geo"
description: "Geolocation utilities: distance, bearing, geocoding, bounding box, polygon containment, DMS conversion"
category: "utility"
tags: [geo, utility]
type: "utility"
auth: "none"
functionCount: 14
baseUrl: "https://nominatim.openstreetmap.org"
---

# Geo

> Geolocation utilities: distance, bearing, geocoding, bounding box, polygon containment, DMS conversion

**Package:** `@robinpath/geo` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `geo` module when you need to:

- **Haversine distance between two points** -- Use `geo.distance` to perform this operation
- **Bearing between two points** -- Use `geo.bearing` to perform this operation
- **Midpoint between two coordinates** -- Use `geo.midpoint` to perform this operation
- **Destination point given start, bearing, and distance** -- Use `geo.destination` to perform this operation
- **Bounding box around a point** -- Use `geo.boundingBox` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`distance`](#distance) | Haversine distance between two points | `Distance` |
| [`bearing`](#bearing) | Bearing between two points | `Bearing in degrees (0-360)` |
| [`midpoint`](#midpoint) | Midpoint between two coordinates | `{lat, lon}` |
| [`destination`](#destination) | Destination point given start, bearing, and distance | `{lat, lon}` |
| [`boundingBox`](#boundingbox) | Bounding box around a point | `{north, south, east, west}` |
| [`isInBoundingBox`](#isinboundingbox) | Check if point is inside bounding box | `true if inside` |
| [`toRadians`](#toradians) | Convert degrees to radians | `Radians` |
| [`toDegrees`](#todegrees) | Convert radians to degrees | `Degrees` |
| [`toDMS`](#todms) | Convert decimal degrees to DMS string | `DMS string` |
| [`fromDMS`](#fromdms) | Parse DMS string to decimal degrees | `Decimal degrees` |
| [`geocode`](#geocode) | Forward geocode address to coordinates | `{lat, lon, displayName}` |
| [`reverseGeocode`](#reversegeocode) | Reverse geocode coordinates to address | `{address, displayName}` |
| [`polygon`](#polygon) | Check if point is inside polygon | `true if inside` |
| [`area`](#area) | Calculate polygon area in sq km | `Area in square km` |


## Functions

### distance

Haversine distance between two points

**Module:** `geo` | **Returns:** `number` -- Distance

```robinpath
geo.distance 40.7128 -74.0060 51.5074 -0.1278
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `lat1` | `number` | Yes | Latitude 1 |
| `lon1` | `number` | Yes | Longitude 1 |
| `lat2` | `number` | Yes | Latitude 2 |
| `lon2` | `number` | Yes | Longitude 2 |
| `unit` | `string` | No | km|mi|m|nm |

---

### bearing

Bearing between two points

**Module:** `geo` | **Returns:** `number` -- Bearing in degrees (0-360)

```robinpath
geo.bearing 40.7128 -74.0060 51.5074 -0.1278
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `lat1` | `number` | Yes | Latitude 1 |
| `lon1` | `number` | Yes | Longitude 1 |
| `lat2` | `number` | Yes | Latitude 2 |
| `lon2` | `number` | Yes | Longitude 2 |

---

### midpoint

Midpoint between two coordinates

**Module:** `geo` | **Returns:** `object` -- {lat, lon}

```robinpath
geo.midpoint 40.7128 -74.0060 51.5074 -0.1278
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `lat1` | `number` | Yes | Latitude 1 |
| `lon1` | `number` | Yes | Longitude 1 |
| `lat2` | `number` | Yes | Latitude 2 |
| `lon2` | `number` | Yes | Longitude 2 |

---

### destination

Destination point given start, bearing, and distance

**Module:** `geo` | **Returns:** `object` -- {lat, lon}

```robinpath
geo.destination 40.7128 -74.0060 45 100
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `lat` | `number` | Yes | Start latitude |
| `lon` | `number` | Yes | Start longitude |
| `bearing` | `number` | Yes | Bearing in degrees |
| `distance` | `number` | Yes | Distance |
| `unit` | `string` | No | km|mi|m|nm |

---

### boundingBox

Bounding box around a point

**Module:** `geo` | **Returns:** `object` -- {north, south, east, west}

```robinpath
geo.boundingBox 40.7128 -74.0060 10
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `lat` | `number` | Yes | Center latitude |
| `lon` | `number` | Yes | Center longitude |
| `radius` | `number` | Yes | Radius |
| `unit` | `string` | No | km|mi|m|nm |

---

### isInBoundingBox

Check if point is inside bounding box

**Module:** `geo` | **Returns:** `boolean` -- true if inside

```robinpath
geo.isInBoundingBox 40.7128 -74.0060 $bbox
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `lat` | `number` | Yes | Latitude |
| `lon` | `number` | Yes | Longitude |
| `bbox` | `object` | Yes | {north, south, east, west} |

---

### toRadians

Convert degrees to radians

**Module:** `geo` | **Returns:** `number` -- Radians

```robinpath
geo.toRadians 180
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `degrees` | `number` | Yes | Degrees |

---

### toDegrees

Convert radians to degrees

**Module:** `geo` | **Returns:** `number` -- Degrees

```robinpath
geo.toDegrees 3.14159
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `radians` | `number` | Yes | Radians |

---

### toDMS

Convert decimal degrees to DMS string

**Module:** `geo` | **Returns:** `string` -- DMS string

```robinpath
geo.toDMS 40.7128 "lat"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `decimal` | `number` | Yes | Decimal degrees |
| `type` | `string` | No | lat or lon |

---

### fromDMS

Parse DMS string to decimal degrees

**Module:** `geo` | **Returns:** `number` -- Decimal degrees

```robinpath
geo.fromDMS "40° 42' 46\" N"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dms` | `string` | Yes | DMS string |

---

### geocode

Forward geocode address to coordinates

**Module:** `geo` | **Returns:** `object` -- {lat, lon, displayName}

```robinpath
geo.geocode "New York, NY"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | `string` | Yes | Address string |

---

### reverseGeocode

Reverse geocode coordinates to address

**Module:** `geo` | **Returns:** `object` -- {address, displayName}

```robinpath
geo.reverseGeocode 40.7128 -74.0060
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `lat` | `number` | Yes | Latitude |
| `lon` | `number` | Yes | Longitude |

---

### polygon

Check if point is inside polygon

**Module:** `geo` | **Returns:** `boolean` -- true if inside

```robinpath
geo.polygon 40.7 -74.0 [[40.6,-74.1],[40.8,-74.1],[40.8,-73.9],[40.6,-73.9]]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `lat` | `number` | Yes | Latitude |
| `lon` | `number` | Yes | Longitude |
| `polygon` | `array` | Yes | Array of [lat, lon] vertices |

---

### area

Calculate polygon area in sq km

**Module:** `geo` | **Returns:** `number` -- Area in square km

```robinpath
geo.area [[40.6,-74.1],[40.8,-74.1],[40.8,-73.9],[40.6,-73.9]]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `polygon` | `array` | Yes | Array of [lat, lon] vertices |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as geo.distance 40.7128 -74.0060 51.5074 -0.1278
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Geo workflow

Chain multiple geo operations together.

```robinpath
set $r_distance as geo.distance 40.7128 -74.0060 51.5074 -0.1278
set $r_bearing as geo.bearing 40.7128 -74.0060 51.5074 -0.1278
set $r_midpoint as geo.midpoint 40.7128 -74.0060 51.5074 -0.1278
print "All operations complete"
```

### 2. Safe distance with validation

Check results before proceeding.

```robinpath
set $result as geo.distance 40.7128 -74.0060 51.5074 -0.1278
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
