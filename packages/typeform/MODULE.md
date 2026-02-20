---
title: "Typeform"
module: "typeform"
package: "@robinpath/typeform"
description: "Typeform module for RobinPath."
category: "utility"
tags: [typeform, utility]
type: "utility"
auth: "api-key"
functionCount: 15
baseUrl: "https://api.typeform.com"
---

# Typeform

> Typeform module for RobinPath.

**Package:** `@robinpath/typeform` | **Category:** Utility | **Type:** Utility


## Authentication

```robinpath
typeform.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `typeform` module when you need to:

- **listForms** -- Use `typeform.listForms` to perform this operation
- **getForm** -- Use `typeform.getForm` to perform this operation
- **createForm** -- Use `typeform.createForm` to perform this operation
- **updateForm** -- Use `typeform.updateForm` to perform this operation
- **deleteForm** -- Use `typeform.deleteForm` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure typeform credentials. | `object` |
| [`listForms`](#listforms) | listForms | `object` |
| [`getForm`](#getform) | getForm | `object` |
| [`createForm`](#createform) | createForm | `object` |
| [`updateForm`](#updateform) | updateForm | `object` |
| [`deleteForm`](#deleteform) | deleteForm | `object` |
| [`listResponses`](#listresponses) | listResponses | `object` |
| [`getResponse`](#getresponse) | getResponse | `object` |
| [`deleteResponse`](#deleteresponse) | deleteResponse | `object` |
| [`listWorkspaces`](#listworkspaces) | listWorkspaces | `object` |
| [`getWorkspace`](#getworkspace) | getWorkspace | `object` |
| [`createWorkspace`](#createworkspace) | createWorkspace | `object` |
| [`listThemes`](#listthemes) | listThemes | `object` |
| [`getInsights`](#getinsights) | getInsights | `object` |
| [`getFormAnalytics`](#getformanalytics) | getFormAnalytics | `object` |


## Functions

### setCredentials

Configure typeform credentials.

**Module:** `typeform` | **Returns:** `object` -- API response.

```robinpath
typeform.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### listForms

listForms

**Module:** `typeform` | **Returns:** `object` -- API response.

```robinpath
typeform.listForms
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getForm

getForm

**Module:** `typeform` | **Returns:** `object` -- API response.

```robinpath
typeform.getForm
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createForm

createForm

**Module:** `typeform` | **Returns:** `object` -- API response.

```robinpath
typeform.createForm
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateForm

updateForm

**Module:** `typeform` | **Returns:** `object` -- API response.

```robinpath
typeform.updateForm
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteForm

deleteForm

**Module:** `typeform` | **Returns:** `object` -- API response.

```robinpath
typeform.deleteForm
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listResponses

listResponses

**Module:** `typeform` | **Returns:** `object` -- API response.

```robinpath
typeform.listResponses
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getResponse

getResponse

**Module:** `typeform` | **Returns:** `object` -- API response.

```robinpath
typeform.getResponse
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteResponse

deleteResponse

**Module:** `typeform` | **Returns:** `object` -- API response.

```robinpath
typeform.deleteResponse
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listWorkspaces

listWorkspaces

**Module:** `typeform` | **Returns:** `object` -- API response.

```robinpath
typeform.listWorkspaces
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getWorkspace

getWorkspace

**Module:** `typeform` | **Returns:** `object` -- API response.

```robinpath
typeform.getWorkspace
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createWorkspace

createWorkspace

**Module:** `typeform` | **Returns:** `object` -- API response.

```robinpath
typeform.createWorkspace
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listThemes

listThemes

**Module:** `typeform` | **Returns:** `object` -- API response.

```robinpath
typeform.listThemes
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getInsights

getInsights

**Module:** `typeform` | **Returns:** `object` -- API response.

```robinpath
typeform.getInsights
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getFormAnalytics

getFormAnalytics

**Module:** `typeform` | **Returns:** `object` -- API response.

```robinpath
typeform.getFormAnalytics
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Typeform API error (${res.status}): ${t}` | Check the error message for details |
| `typeform.setCredentials requires accessToken.` | Check the error message for details |
| `typeform.updateForm requires an ID.` | Check the error message for details |
| `typeform.deleteForm requires an ID.` | Check the error message for details |
| `typeform.deleteResponse requires an ID.` | Check the error message for details |
| `Typeform: "..." not configured. Call typeform.setCredentials first.` | Check the error message for details |

```robinpath
set $result as typeform.listForms
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Forms

Retrieve all items and loop through them.

```robinpath
typeform.setCredentials $token
set $result as typeform.listForms
each $item in $result
  print $item
end
```

### 2. Create a new item with createForm

Create a new resource and capture the result.

```robinpath
typeform.setCredentials $token
set $result as typeform.createForm
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
typeform.setCredentials $token
set $created as typeform.createForm
# Update the created item
typeform.updateForm
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
typeform.setCredentials $token
set $existing as typeform.listForms
if $existing == null
  typeform.createForm
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Typeform workflow

Chain multiple typeform operations together.

```robinpath
typeform.setCredentials $token
set $r_listForms as typeform.listForms
set $r_getForm as typeform.getForm
set $r_createForm as typeform.createForm
print "All operations complete"
```

### 6. Safe listForms with validation

Check results before proceeding.

```robinpath
typeform.setCredentials $token
set $result as typeform.listForms
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
