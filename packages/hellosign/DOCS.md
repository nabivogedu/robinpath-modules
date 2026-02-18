---
title: "HelloSign"
module: "hellosign"
package: "@robinpath/hellosign"
description: "HelloSign module for RobinPath."
category: "documents"
tags: [hellosign, documents]
type: "integration"
auth: "api-key"
functionCount: 15
baseUrl: "https://api.hellosign.com"
---

# HelloSign

> HelloSign module for RobinPath.

**Package:** `@robinpath/hellosign` | **Category:** Documents | **Type:** Integration


## Authentication

```robinpath
hellosign.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `hellosign` module when you need to:

- **getSignatureRequest** -- Use `hellosign.getSignatureRequest` to perform this operation
- **listSignatureRequests** -- Use `hellosign.listSignatureRequests` to perform this operation
- **sendSignatureRequest** -- Use `hellosign.sendSignatureRequest` to perform this operation
- **sendWithTemplate** -- Use `hellosign.sendWithTemplate` to perform this operation
- **cancelSignatureRequest** -- Use `hellosign.cancelSignatureRequest` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure hellosign credentials. | `object` |
| [`getSignatureRequest`](#getsignaturerequest) | getSignatureRequest | `object` |
| [`listSignatureRequests`](#listsignaturerequests) | listSignatureRequests | `object` |
| [`sendSignatureRequest`](#sendsignaturerequest) | sendSignatureRequest | `object` |
| [`sendWithTemplate`](#sendwithtemplate) | sendWithTemplate | `object` |
| [`cancelSignatureRequest`](#cancelsignaturerequest) | cancelSignatureRequest | `object` |
| [`downloadSignatureRequest`](#downloadsignaturerequest) | downloadSignatureRequest | `object` |
| [`remindSignatureRequest`](#remindsignaturerequest) | remindSignatureRequest | `object` |
| [`listTemplates`](#listtemplates) | listTemplates | `object` |
| [`getTemplate`](#gettemplate) | getTemplate | `object` |
| [`deleteTemplate`](#deletetemplate) | deleteTemplate | `object` |
| [`createEmbeddedSignatureRequest`](#createembeddedsignaturerequest) | createEmbeddedSignatureRequest | `object` |
| [`getAccount`](#getaccount) | getAccount | `object` |
| [`updateAccount`](#updateaccount) | updateAccount | `object` |
| [`listTeamMembers`](#listteammembers) | listTeamMembers | `object` |


## Functions

### setCredentials

Configure hellosign credentials.

**Module:** `hellosign` | **Returns:** `object` -- API response.

```robinpath
hellosign.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | Yes | apiKey |

---

### getSignatureRequest

getSignatureRequest

**Module:** `hellosign` | **Returns:** `object` -- API response.

```robinpath
hellosign.getSignatureRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listSignatureRequests

listSignatureRequests

**Module:** `hellosign` | **Returns:** `object` -- API response.

```robinpath
hellosign.listSignatureRequests
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendSignatureRequest

sendSignatureRequest

**Module:** `hellosign` | **Returns:** `object` -- API response.

```robinpath
hellosign.sendSignatureRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendWithTemplate

sendWithTemplate

**Module:** `hellosign` | **Returns:** `object` -- API response.

```robinpath
hellosign.sendWithTemplate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### cancelSignatureRequest

cancelSignatureRequest

**Module:** `hellosign` | **Returns:** `object` -- API response.

```robinpath
hellosign.cancelSignatureRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### downloadSignatureRequest

downloadSignatureRequest

**Module:** `hellosign` | **Returns:** `object` -- API response.

```robinpath
hellosign.downloadSignatureRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### remindSignatureRequest

remindSignatureRequest

**Module:** `hellosign` | **Returns:** `object` -- API response.

```robinpath
hellosign.remindSignatureRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTemplates

listTemplates

**Module:** `hellosign` | **Returns:** `object` -- API response.

```robinpath
hellosign.listTemplates
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTemplate

getTemplate

**Module:** `hellosign` | **Returns:** `object` -- API response.

```robinpath
hellosign.getTemplate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteTemplate

deleteTemplate

**Module:** `hellosign` | **Returns:** `object` -- API response.

```robinpath
hellosign.deleteTemplate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createEmbeddedSignatureRequest

createEmbeddedSignatureRequest

**Module:** `hellosign` | **Returns:** `object` -- API response.

```robinpath
hellosign.createEmbeddedSignatureRequest
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getAccount

getAccount

**Module:** `hellosign` | **Returns:** `object` -- API response.

```robinpath
hellosign.getAccount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateAccount

updateAccount

**Module:** `hellosign` | **Returns:** `object` -- API response.

```robinpath
hellosign.updateAccount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTeamMembers

listTeamMembers

**Module:** `hellosign` | **Returns:** `object` -- API response.

```robinpath
hellosign.listTeamMembers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Hellosign API error (${res.status}): ${t}` | Check the error message for details |
| `hellosign.setCredentials requires apiKey.` | Check the error message for details |
| `hellosign.cancelSignatureRequest requires an ID.` | Check the error message for details |
| `hellosign.remindSignatureRequest requires an ID.` | Check the error message for details |
| `hellosign.deleteTemplate requires an ID.` | Check the error message for details |
| `hellosign.updateAccount requires an ID.` | Check the error message for details |
| `Hellosign: "..." not configured. Call hellosign.setCredentials first.` | Check the error message for details |

```robinpath
set $result as hellosign.getSignatureRequest
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate SignatureRequest

Retrieve all items and loop through them.

```robinpath
hellosign.setCredentials $token
set $result as hellosign.getSignatureRequest
each $item in $result
  print $item
end
```

### 2. Create a new item with sendSignatureRequest

Create a new resource and capture the result.

```robinpath
hellosign.setCredentials $token
set $result as hellosign.sendSignatureRequest
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
hellosign.setCredentials $token
set $created as hellosign.sendSignatureRequest
# Update the created item
hellosign.updateAccount
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
hellosign.setCredentials $token
set $existing as hellosign.getSignatureRequest
if $existing == null
  hellosign.sendSignatureRequest
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step HelloSign workflow

Chain multiple hellosign operations together.

```robinpath
hellosign.setCredentials $token
set $r_getSignatureRequest as hellosign.getSignatureRequest
set $r_listSignatureRequests as hellosign.listSignatureRequests
set $r_sendSignatureRequest as hellosign.sendSignatureRequest
print "All operations complete"
```

### 6. Safe getSignatureRequest with validation

Check results before proceeding.

```robinpath
hellosign.setCredentials $token
set $result as hellosign.getSignatureRequest
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **pdf** -- PDF module for complementary functionality
- **excel** -- Excel module for complementary functionality
- **office** -- Office module for complementary functionality
- **docusign** -- DocuSign module for complementary functionality
- **pandadoc** -- PandaDoc module for complementary functionality
