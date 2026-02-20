---
title: "Hotjar"
module: "hotjar"
package: "@robinpath/hotjar"
description: "Hotjar module for RobinPath."
category: "analytics"
tags: [hotjar, analytics]
type: "integration"
auth: "api-key"
functionCount: 13
baseUrl: "https://api.hotjar.com"
---

# Hotjar

> Hotjar module for RobinPath.

**Package:** `@robinpath/hotjar` | **Category:** Analytics | **Type:** Integration


## Authentication

```robinpath
hotjar.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `hotjar` module when you need to:

- **listSurveys** -- Use `hotjar.listSurveys` to perform this operation
- **getSurvey** -- Use `hotjar.getSurvey` to perform this operation
- **getSurveyResponses** -- Use `hotjar.getSurveyResponses` to perform this operation
- **listFeedback** -- Use `hotjar.listFeedback` to perform this operation
- **getFeedbackItem** -- Use `hotjar.getFeedbackItem` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure hotjar credentials. | `object` |
| [`listSurveys`](#listsurveys) | listSurveys | `object` |
| [`getSurvey`](#getsurvey) | getSurvey | `object` |
| [`getSurveyResponses`](#getsurveyresponses) | getSurveyResponses | `object` |
| [`listFeedback`](#listfeedback) | listFeedback | `object` |
| [`getFeedbackItem`](#getfeedbackitem) | getFeedbackItem | `object` |
| [`listHeatmaps`](#listheatmaps) | listHeatmaps | `object` |
| [`getHeatmap`](#getheatmap) | getHeatmap | `object` |
| [`listRecordings`](#listrecordings) | listRecordings | `object` |
| [`getRecording`](#getrecording) | getRecording | `object` |
| [`getSiteInfo`](#getsiteinfo) | getSiteInfo | `object` |
| [`getUserInfo`](#getuserinfo) | getUserInfo | `object` |
| [`getSessionCount`](#getsessioncount) | getSessionCount | `object` |


## Functions

### setCredentials

Configure hotjar credentials.

**Module:** `hotjar` | **Returns:** `object` -- API response.

```robinpath
hotjar.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |
| `siteId` | `string` | Yes | siteId |

---

### listSurveys

listSurveys

**Module:** `hotjar` | **Returns:** `object` -- API response.

```robinpath
hotjar.listSurveys
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSurvey

getSurvey

**Module:** `hotjar` | **Returns:** `object` -- API response.

```robinpath
hotjar.getSurvey
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSurveyResponses

getSurveyResponses

**Module:** `hotjar` | **Returns:** `object` -- API response.

```robinpath
hotjar.getSurveyResponses
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listFeedback

listFeedback

**Module:** `hotjar` | **Returns:** `object` -- API response.

```robinpath
hotjar.listFeedback
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getFeedbackItem

getFeedbackItem

**Module:** `hotjar` | **Returns:** `object` -- API response.

```robinpath
hotjar.getFeedbackItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listHeatmaps

listHeatmaps

**Module:** `hotjar` | **Returns:** `object` -- API response.

```robinpath
hotjar.listHeatmaps
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getHeatmap

getHeatmap

**Module:** `hotjar` | **Returns:** `object` -- API response.

```robinpath
hotjar.getHeatmap
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listRecordings

listRecordings

**Module:** `hotjar` | **Returns:** `object` -- API response.

```robinpath
hotjar.listRecordings
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getRecording

getRecording

**Module:** `hotjar` | **Returns:** `object` -- API response.

```robinpath
hotjar.getRecording
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSiteInfo

getSiteInfo

**Module:** `hotjar` | **Returns:** `object` -- API response.

```robinpath
hotjar.getSiteInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUserInfo

getUserInfo

**Module:** `hotjar` | **Returns:** `object` -- API response.

```robinpath
hotjar.getUserInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSessionCount

getSessionCount

**Module:** `hotjar` | **Returns:** `object` -- API response.

```robinpath
hotjar.getSessionCount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Hotjar API error (${res.status}): ${t}` | Check the error message for details |
| `hotjar.setCredentials requires accessToken, siteId.` | Check the error message for details |
| `Hotjar: "..." not configured. Call hotjar.setCredentials first.` | Check the error message for details |

```robinpath
set $result as hotjar.listSurveys
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Surveys

Retrieve all items and loop through them.

```robinpath
hotjar.setCredentials $token
set $result as hotjar.listSurveys
each $item in $result
  print $item
end
```

### 2. Multi-step Hotjar workflow

Chain multiple hotjar operations together.

```robinpath
hotjar.setCredentials $token
set $r_listSurveys as hotjar.listSurveys
set $r_getSurvey as hotjar.getSurvey
set $r_getSurveyResponses as hotjar.getSurveyResponses
print "All operations complete"
```

### 3. Safe listSurveys with validation

Check results before proceeding.

```robinpath
hotjar.setCredentials $token
set $result as hotjar.listSurveys
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
