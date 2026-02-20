---
title: "Google Forms"
module: "google-forms"
package: "@robinpath/google-forms"
description: "Google Forms module for RobinPath."
category: "productivity"
tags: [googleforms, productivity]
type: "integration"
auth: "api-key"
functionCount: 13
baseUrl: "https://forms.googleapis.com"
---

# Google Forms

> Google Forms module for RobinPath.

**Package:** `@robinpath/google-forms` | **Category:** Productivity | **Type:** Integration


## Authentication

```robinpath
google-forms.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `google-forms` module when you need to:

- **getForm** -- Use `google-forms.getForm` to perform this operation
- **createForm** -- Use `google-forms.createForm` to perform this operation
- **updateForm** -- Use `google-forms.updateForm` to perform this operation
- **listResponses** -- Use `google-forms.listResponses` to perform this operation
- **getResponse** -- Use `google-forms.getResponse` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure google-forms credentials. | `object` |
| [`getForm`](#getform) | getForm | `object` |
| [`createForm`](#createform) | createForm | `object` |
| [`updateForm`](#updateform) | updateForm | `object` |
| [`listResponses`](#listresponses) | listResponses | `object` |
| [`getResponse`](#getresponse) | getResponse | `object` |
| [`addQuestion`](#addquestion) | addQuestion | `object` |
| [`updateQuestion`](#updatequestion) | updateQuestion | `object` |
| [`deleteQuestion`](#deletequestion) | deleteQuestion | `object` |
| [`addSection`](#addsection) | addSection | `object` |
| [`getFormInfo`](#getforminfo) | getFormInfo | `object` |
| [`batchUpdate`](#batchupdate) | batchUpdate | `object` |
| [`convertToQuiz`](#converttoquiz) | convertToQuiz | `object` |


## Functions

### setCredentials

Configure google-forms credentials.

**Module:** `google-forms` | **Returns:** `object` -- API response.

```robinpath
google-forms.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### getForm

getForm

**Module:** `google-forms` | **Returns:** `object` -- API response.

```robinpath
google-forms.getForm
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createForm

createForm

**Module:** `google-forms` | **Returns:** `object` -- API response.

```robinpath
google-forms.createForm
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateForm

updateForm

**Module:** `google-forms` | **Returns:** `object` -- API response.

```robinpath
google-forms.updateForm
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listResponses

listResponses

**Module:** `google-forms` | **Returns:** `object` -- API response.

```robinpath
google-forms.listResponses
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getResponse

getResponse

**Module:** `google-forms` | **Returns:** `object` -- API response.

```robinpath
google-forms.getResponse
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addQuestion

addQuestion

**Module:** `google-forms` | **Returns:** `object` -- API response.

```robinpath
google-forms.addQuestion
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateQuestion

updateQuestion

**Module:** `google-forms` | **Returns:** `object` -- API response.

```robinpath
google-forms.updateQuestion
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteQuestion

deleteQuestion

**Module:** `google-forms` | **Returns:** `object` -- API response.

```robinpath
google-forms.deleteQuestion
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addSection

addSection

**Module:** `google-forms` | **Returns:** `object` -- API response.

```robinpath
google-forms.addSection
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getFormInfo

getFormInfo

**Module:** `google-forms` | **Returns:** `object` -- API response.

```robinpath
google-forms.getFormInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### batchUpdate

batchUpdate

**Module:** `google-forms` | **Returns:** `object` -- API response.

```robinpath
google-forms.batchUpdate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### convertToQuiz

convertToQuiz

**Module:** `google-forms` | **Returns:** `object` -- API response.

```robinpath
google-forms.convertToQuiz
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `GoogleForms API error (${res.status}): ${t}` | Check the error message for details |
| `google-forms.setCredentials requires accessToken.` | Check the error message for details |
| `google-forms.updateForm requires an ID.` | Check the error message for details |
| `google-forms.updateQuestion requires an ID.` | Check the error message for details |
| `google-forms.deleteQuestion requires an ID.` | Check the error message for details |
| `GoogleForms: "..." not configured. Call google-forms.setCredentials first.` | Check the error message for details |

```robinpath
set $result as google-forms.getForm
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Form

Retrieve all items and loop through them.

```robinpath
google-forms.setCredentials $token
set $result as google-forms.getForm
each $item in $result
  print $item
end
```

### 2. Create a new item with createForm

Create a new resource and capture the result.

```robinpath
google-forms.setCredentials $token
set $result as google-forms.createForm
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
google-forms.setCredentials $token
set $created as google-forms.createForm
# Update the created item
google-forms.updateForm
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
google-forms.setCredentials $token
set $existing as google-forms.getForm
if $existing == null
  google-forms.createForm
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Google Forms workflow

Chain multiple google-forms operations together.

```robinpath
google-forms.setCredentials $token
set $r_getForm as google-forms.getForm
set $r_createForm as google-forms.createForm
set $r_updateForm as google-forms.updateForm
print "All operations complete"
```

### 6. Safe getForm with validation

Check results before proceeding.

```robinpath
google-forms.setCredentials $token
set $result as google-forms.getForm
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
- **gmail** -- Gmail module for complementary functionality
- **outlook** -- Outlook module for complementary functionality
