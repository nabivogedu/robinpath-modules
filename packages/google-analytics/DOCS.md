---
title: "Google Analytics"
module: "google-analytics"
package: "@robinpath/google-analytics"
description: "Google Analytics module for RobinPath."
category: "productivity"
tags: [googleanalytics, productivity]
type: "integration"
auth: "api-key"
functionCount: 15
baseUrl: "https://analyticsdata.googleapis.com"
---

# Google Analytics

> Google Analytics module for RobinPath.

**Package:** `@robinpath/google-analytics` | **Category:** Productivity | **Type:** Integration


## Authentication

```robinpath
google-analytics.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `google-analytics` module when you need to:

- **runReport** -- Use `google-analytics.runReport` to perform this operation
- **runRealtimeReport** -- Use `google-analytics.runRealtimeReport` to perform this operation
- **batchRunReports** -- Use `google-analytics.batchRunReports` to perform this operation
- **runPivotReport** -- Use `google-analytics.runPivotReport` to perform this operation
- **getMetadata** -- Use `google-analytics.getMetadata` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure google-analytics credentials. | `object` |
| [`runReport`](#runreport) | runReport | `object` |
| [`runRealtimeReport`](#runrealtimereport) | runRealtimeReport | `object` |
| [`batchRunReports`](#batchrunreports) | batchRunReports | `object` |
| [`runPivotReport`](#runpivotreport) | runPivotReport | `object` |
| [`getMetadata`](#getmetadata) | getMetadata | `object` |
| [`listProperties`](#listproperties) | listProperties | `object` |
| [`getProperty`](#getproperty) | getProperty | `object` |
| [`listAccounts`](#listaccounts) | listAccounts | `object` |
| [`getActiveUsers`](#getactiveusers) | getActiveUsers | `object` |
| [`getPageViews`](#getpageviews) | getPageViews | `object` |
| [`getTopPages`](#gettoppages) | getTopPages | `object` |
| [`getTrafficSources`](#gettrafficsources) | getTrafficSources | `object` |
| [`getUserDemographics`](#getuserdemographics) | getUserDemographics | `object` |
| [`getConversions`](#getconversions) | getConversions | `object` |


## Functions

### setCredentials

Configure google-analytics credentials.

**Module:** `google-analytics` | **Returns:** `object` -- API response.

```robinpath
google-analytics.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |
| `propertyId` | `string` | Yes | propertyId |

---

### runReport

runReport

**Module:** `google-analytics` | **Returns:** `object` -- API response.

```robinpath
google-analytics.runReport
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### runRealtimeReport

runRealtimeReport

**Module:** `google-analytics` | **Returns:** `object` -- API response.

```robinpath
google-analytics.runRealtimeReport
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### batchRunReports

batchRunReports

**Module:** `google-analytics` | **Returns:** `object` -- API response.

```robinpath
google-analytics.batchRunReports
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### runPivotReport

runPivotReport

**Module:** `google-analytics` | **Returns:** `object` -- API response.

```robinpath
google-analytics.runPivotReport
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getMetadata

getMetadata

**Module:** `google-analytics` | **Returns:** `object` -- API response.

```robinpath
google-analytics.getMetadata
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listProperties

listProperties

**Module:** `google-analytics` | **Returns:** `object` -- API response.

```robinpath
google-analytics.listProperties
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getProperty

getProperty

**Module:** `google-analytics` | **Returns:** `object` -- API response.

```robinpath
google-analytics.getProperty
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listAccounts

listAccounts

**Module:** `google-analytics` | **Returns:** `object` -- API response.

```robinpath
google-analytics.listAccounts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getActiveUsers

getActiveUsers

**Module:** `google-analytics` | **Returns:** `object` -- API response.

```robinpath
google-analytics.getActiveUsers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPageViews

getPageViews

**Module:** `google-analytics` | **Returns:** `object` -- API response.

```robinpath
google-analytics.getPageViews
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTopPages

getTopPages

**Module:** `google-analytics` | **Returns:** `object` -- API response.

```robinpath
google-analytics.getTopPages
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTrafficSources

getTrafficSources

**Module:** `google-analytics` | **Returns:** `object` -- API response.

```robinpath
google-analytics.getTrafficSources
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUserDemographics

getUserDemographics

**Module:** `google-analytics` | **Returns:** `object` -- API response.

```robinpath
google-analytics.getUserDemographics
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getConversions

getConversions

**Module:** `google-analytics` | **Returns:** `object` -- API response.

```robinpath
google-analytics.getConversions
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `GoogleAnalytics API error (${res.status}): ${t}` | Check the error message for details |
| `google-analytics.setCredentials requires accessToken, propertyId.` | Check the error message for details |
| `GoogleAnalytics: "..." not configured. Call google-analytics.setCredentials first.` | Check the error message for details |

```robinpath
set $result as google-analytics.runReport
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Metadata

Retrieve all items and loop through them.

```robinpath
google-analytics.setCredentials $token
set $result as google-analytics.getMetadata
each $item in $result
  print $item
end
```

### 2. Multi-step Google Analytics workflow

Chain multiple google-analytics operations together.

```robinpath
google-analytics.setCredentials $token
set $r_runReport as google-analytics.runReport
set $r_runRealtimeReport as google-analytics.runRealtimeReport
set $r_batchRunReports as google-analytics.batchRunReports
print "All operations complete"
```

### 3. Safe runReport with validation

Check results before proceeding.

```robinpath
google-analytics.setCredentials $token
set $result as google-analytics.runReport
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **google-sheets** -- Google Sheets module for complementary functionality
- **google-calendar** -- Google Calendar module for complementary functionality
- **google-contacts** -- Google Contacts module for complementary functionality
- **google-forms** -- Google Forms module for complementary functionality
- **gmail** -- Gmail module for complementary functionality
