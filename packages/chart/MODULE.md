---
title: "Chart"
module: "chart"
package: "@robinpath/chart"
description: "Generate chart images (PNG/JPEG) using Chart.js. Supports bar, line, pie, doughnut, scatter, radar, polarArea, and bubble charts with auto-coloring and customizable titles, legends, and dimensions."
category: "analytics"
tags: [chart, analytics]
type: "integration"
auth: "none"
functionCount: 7
---

# Chart

> Generate chart images (PNG/JPEG) using Chart.js. Supports bar, line, pie, doughnut, scatter, radar, polarArea, and bubble charts with auto-coloring and customizable titles, legends, and dimensions.

**Package:** `@robinpath/chart` | **Category:** Analytics | **Type:** Integration


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `chart` module when you need to:

- **Create a new chart (bar, line, pie, doughnut, scatter, radar, polarArea, bubble)** -- Use `chart.create` to perform this operation
- **Add a dataset to an existing chart** -- Use `chart.addDataset` to perform this operation
- **Update chart options (title, size, legend, type, labels)** -- Use `chart.update` to perform this operation
- **Render chart and save to PNG or JPEG file** -- Use `chart.save` to perform this operation
- **Render chart and return as base64 data URL string** -- Use `chart.toBase64` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create a new chart (bar, line, pie, doughnut, scatter, radar, polarArea, bubble) | `Chart creation info` |
| [`addDataset`](#adddataset) | Add a dataset to an existing chart | `Updated dataset count` |
| [`update`](#update) | Update chart options (title, size, legend, type, labels) | `Update confirmation` |
| [`save`](#save) | Render chart and save to PNG or JPEG file | `Save result with file size` |
| [`toBase64`](#tobase64) | Render chart and return as base64 data URL string | `Base64 data URL (data:image/png;base64,...)` |
| [`toBuffer`](#tobuffer) | Render chart and return as raw Buffer | `PNG buffer` |
| [`destroy`](#destroy) | Remove chart from memory | `Destroy confirmation` |


## Functions

### create

Create a new chart (bar, line, pie, doughnut, scatter, radar, polarArea, bubble)

**Module:** `chart` | **Returns:** `object` -- Chart creation info

```robinpath
chart.create "c1" "bar" {"labels": ["Q1","Q2"], "datasets": [{"label": "Sales", "data": [100,200]}]} {"title": "Revenue"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Unique chart identifier |
| `type` | `string` | Yes | Chart type: bar, line, pie, doughnut, scatter, radar, polarArea, bubble |
| `data` | `object` | Yes | {labels: string[], datasets: [{label, data, backgroundColor?, borderColor?}]} |
| `opts` | `object` | No | {width?, height?, title?, backgroundColor?, indexAxis?, legendPosition?, showLegend?} |

---

### addDataset

Add a dataset to an existing chart

**Module:** `chart` | **Returns:** `object` -- Updated dataset count

```robinpath
chart.addDataset "c1" {"label": "Costs", "data": [50, 80]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Chart ID |
| `dataset` | `object` | Yes | {label, data, backgroundColor?, borderColor?, borderWidth?} |

---

### update

Update chart options (title, size, legend, type, labels)

**Module:** `chart` | **Returns:** `object` -- Update confirmation

```robinpath
chart.update "c1" {"title": "Updated Title", "width": 1200}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Chart ID |
| `opts` | `object` | Yes | {title?, width?, height?, backgroundColor?, type?, legendPosition?, showLegend?, labels?} |

---

### save

Render chart and save to PNG or JPEG file

**Module:** `chart` | **Returns:** `object` -- Save result with file size

```robinpath
chart.save "c1" "./output/chart.png"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Chart ID |
| `filePath` | `string` | Yes | Output file path |
| `opts` | `object` | No | {format?: 'png'|'jpeg'} |

---

### toBase64

Render chart and return as base64 data URL string

**Module:** `chart` | **Returns:** `string` -- Base64 data URL (data:image/png;base64,...)

```robinpath
chart.toBase64 "c1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Chart ID |
| `opts` | `object` | No | {format?: 'png'|'jpeg'} |

---

### toBuffer

Render chart and return as raw Buffer

**Module:** `chart` | **Returns:** `object` -- PNG buffer

```robinpath
chart.toBuffer "c1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Chart ID |

---

### destroy

Remove chart from memory

**Module:** `chart` | **Returns:** `object` -- Destroy confirmation

```robinpath
chart.destroy "c1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Chart ID |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Chart "..." not found` | Check the error message for details |
| `Chart "..." already exists` | Check the error message for details |

```robinpath
set $result as chart.create "c1" "bar" {"labels": ["Q1","Q2"], "datasets": [{"label": "Sales", "data": [100,200]}]} {"title": "Revenue"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as chart.create "c1" "bar" {"labels": ["Q1","Q2"], "datasets": [{"label": "Sales", "data": [100,200]}]} {"title": "Revenue"}
print "Created: " + $result
```

### 2. Create and update workflow

Create an item and then update it.

```robinpath
set $created as chart.create "c1" "bar" {"labels": ["Q1","Q2"], "datasets": [{"label": "Sales", "data": [100,200]}]} {"title": "Revenue"}
# Update the created item
chart.update "c1" {"title": "Updated Title", "width": 1200}
```

### 3. Multi-step Chart workflow

Chain multiple chart operations together.

```robinpath
set $r_create as chart.create "c1" "bar" {"labels": ["Q1","Q2"], "datasets": [{"label": "Sales", "data": [100,200]}]} {"title": "Revenue"}
set $r_addDataset as chart.addDataset "c1" {"label": "Costs", "data": [50, 80]}
set $r_update as chart.update "c1" {"title": "Updated Title", "width": 1200}
print "All operations complete"
```

### 4. Safe create with validation

Check results before proceeding.

```robinpath
set $result as chart.create "c1" "bar" {"labels": ["Q1","Q2"], "datasets": [{"label": "Sales", "data": [100,200]}]} {"title": "Revenue"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
