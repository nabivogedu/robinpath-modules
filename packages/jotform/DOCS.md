---
title: "JotForm"
module: "jotform"
package: "@robinpath/jotform"
description: "JotForm module for RobinPath."
category: "utility"
tags: [jotform, utility]
type: "utility"
auth: "api-key"
functionCount: 15
baseUrl: "https://api.jotform.com"
---

# JotForm

> JotForm module for RobinPath.

**Package:** `@robinpath/jotform` | **Category:** Utility | **Type:** Utility


## Authentication

```robinpath
jotform.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `jotform` module when you need to:

- **listForms** -- Use `jotform.listForms` to perform this operation
- **getForm** -- Use `jotform.getForm` to perform this operation
- **getFormQuestions** -- Use `jotform.getFormQuestions` to perform this operation
- **listSubmissions** -- Use `jotform.listSubmissions` to perform this operation
- **getSubmission** -- Use `jotform.getSubmission` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure jotform credentials. | `object` |
| [`listForms`](#listforms) | listForms | `object` |
| [`getForm`](#getform) | getForm | `object` |
| [`getFormQuestions`](#getformquestions) | getFormQuestions | `object` |
| [`listSubmissions`](#listsubmissions) | listSubmissions | `object` |
| [`getSubmission`](#getsubmission) | getSubmission | `object` |
| [`createSubmission`](#createsubmission) | createSubmission | `object` |
| [`deleteSubmission`](#deletesubmission) | deleteSubmission | `object` |
| [`getFormReports`](#getformreports) | getFormReports | `object` |
| [`getFormFiles`](#getformfiles) | getFormFiles | `object` |
| [`listFolders`](#listfolders) | listFolders | `object` |
| [`getUser`](#getuser) | getUser | `object` |
| [`getUsage`](#getusage) | getUsage | `object` |
| [`getFormWebhooks`](#getformwebhooks) | getFormWebhooks | `object` |
| [`createFormWebhook`](#createformwebhook) | createFormWebhook | `object` |


## Functions

### setCredentials

Configure jotform credentials.

**Module:** `jotform` | **Returns:** `object` -- API response.

```robinpath
jotform.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | Yes | apiKey |

---

### listForms

listForms

**Module:** `jotform` | **Returns:** `object` -- API response.

```robinpath
jotform.listForms
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getForm

getForm

**Module:** `jotform` | **Returns:** `object` -- API response.

```robinpath
jotform.getForm
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getFormQuestions

getFormQuestions

**Module:** `jotform` | **Returns:** `object` -- API response.

```robinpath
jotform.getFormQuestions
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listSubmissions

listSubmissions

**Module:** `jotform` | **Returns:** `object` -- API response.

```robinpath
jotform.listSubmissions
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSubmission

getSubmission

**Module:** `jotform` | **Returns:** `object` -- API response.

```robinpath
jotform.getSubmission
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createSubmission

createSubmission

**Module:** `jotform` | **Returns:** `object` -- API response.

```robinpath
jotform.createSubmission
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteSubmission

deleteSubmission

**Module:** `jotform` | **Returns:** `object` -- API response.

```robinpath
jotform.deleteSubmission
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getFormReports

getFormReports

**Module:** `jotform` | **Returns:** `object` -- API response.

```robinpath
jotform.getFormReports
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getFormFiles

getFormFiles

**Module:** `jotform` | **Returns:** `object` -- API response.

```robinpath
jotform.getFormFiles
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listFolders

listFolders

**Module:** `jotform` | **Returns:** `object` -- API response.

```robinpath
jotform.listFolders
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUser

getUser

**Module:** `jotform` | **Returns:** `object` -- API response.

```robinpath
jotform.getUser
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUsage

getUsage

**Module:** `jotform` | **Returns:** `object` -- API response.

```robinpath
jotform.getUsage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getFormWebhooks

getFormWebhooks

**Module:** `jotform` | **Returns:** `object` -- API response.

```robinpath
jotform.getFormWebhooks
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createFormWebhook

createFormWebhook

**Module:** `jotform` | **Returns:** `object` -- API response.

```robinpath
jotform.createFormWebhook
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Jotform API error (${res.status}): ${t}` | Check the error message for details |
| `jotform.setCredentials requires apiKey.` | Check the error message for details |
| `jotform.deleteSubmission requires an ID.` | Check the error message for details |
| `Jotform: "..." not configured. Call jotform.setCredentials first.` | Check the error message for details |

```robinpath
set $result as jotform.listForms
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
jotform.setCredentials $token
set $result as jotform.listForms
each $item in $result
  print $item
end
```

### 2. Create a new item with createSubmission

Create a new resource and capture the result.

```robinpath
jotform.setCredentials $token
set $result as jotform.createSubmission
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
jotform.setCredentials $token
set $existing as jotform.listForms
if $existing == null
  jotform.createSubmission
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step JotForm workflow

Chain multiple jotform operations together.

```robinpath
jotform.setCredentials $token
set $r_listForms as jotform.listForms
set $r_getForm as jotform.getForm
set $r_getFormQuestions as jotform.getFormQuestions
print "All operations complete"
```

### 5. Safe listForms with validation

Check results before proceeding.

```robinpath
jotform.setCredentials $token
set $result as jotform.listForms
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
