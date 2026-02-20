---
title: "DocuSign"
module: "docusign"
package: "@robinpath/docusign"
description: "DocuSign module for RobinPath."
category: "documents"
tags: [docusign, documents]
type: "integration"
auth: "api-key"
functionCount: 15
baseUrl: "https://demo.docusign.net"
---

# DocuSign

> DocuSign module for RobinPath.

**Package:** `@robinpath/docusign` | **Category:** Documents | **Type:** Integration


## Authentication

```robinpath
docusign.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `docusign` module when you need to:

- **listEnvelopes** -- Use `docusign.listEnvelopes` to perform this operation
- **getEnvelope** -- Use `docusign.getEnvelope` to perform this operation
- **createEnvelope** -- Use `docusign.createEnvelope` to perform this operation
- **sendEnvelope** -- Use `docusign.sendEnvelope` to perform this operation
- **voidEnvelope** -- Use `docusign.voidEnvelope` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure docusign credentials. | `object` |
| [`listEnvelopes`](#listenvelopes) | listEnvelopes | `object` |
| [`getEnvelope`](#getenvelope) | getEnvelope | `object` |
| [`createEnvelope`](#createenvelope) | createEnvelope | `object` |
| [`sendEnvelope`](#sendenvelope) | sendEnvelope | `object` |
| [`voidEnvelope`](#voidenvelope) | voidEnvelope | `object` |
| [`getEnvelopeDocuments`](#getenvelopedocuments) | getEnvelopeDocuments | `object` |
| [`downloadDocument`](#downloaddocument) | downloadDocument | `object` |
| [`listRecipients`](#listrecipients) | listRecipients | `object` |
| [`getRecipientStatus`](#getrecipientstatus) | getRecipientStatus | `object` |
| [`listTemplates`](#listtemplates) | listTemplates | `object` |
| [`getTemplate`](#gettemplate) | getTemplate | `object` |
| [`createEnvelopeFromTemplate`](#createenvelopefromtemplate) | createEnvelopeFromTemplate | `object` |
| [`getUserInfo`](#getuserinfo) | getUserInfo | `object` |
| [`getAccount`](#getaccount) | getAccount | `object` |


## Functions

### setCredentials

Configure docusign credentials.

**Module:** `docusign` | **Returns:** `object` -- API response.

```robinpath
docusign.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |
| `accountId` | `string` | Yes | accountId |

---

### listEnvelopes

listEnvelopes

**Module:** `docusign` | **Returns:** `object` -- API response.

```robinpath
docusign.listEnvelopes
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getEnvelope

getEnvelope

**Module:** `docusign` | **Returns:** `object` -- API response.

```robinpath
docusign.getEnvelope
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createEnvelope

createEnvelope

**Module:** `docusign` | **Returns:** `object` -- API response.

```robinpath
docusign.createEnvelope
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendEnvelope

sendEnvelope

**Module:** `docusign` | **Returns:** `object` -- API response.

```robinpath
docusign.sendEnvelope
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### voidEnvelope

voidEnvelope

**Module:** `docusign` | **Returns:** `object` -- API response.

```robinpath
docusign.voidEnvelope
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getEnvelopeDocuments

getEnvelopeDocuments

**Module:** `docusign` | **Returns:** `object` -- API response.

```robinpath
docusign.getEnvelopeDocuments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### downloadDocument

downloadDocument

**Module:** `docusign` | **Returns:** `object` -- API response.

```robinpath
docusign.downloadDocument
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listRecipients

listRecipients

**Module:** `docusign` | **Returns:** `object` -- API response.

```robinpath
docusign.listRecipients
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getRecipientStatus

getRecipientStatus

**Module:** `docusign` | **Returns:** `object` -- API response.

```robinpath
docusign.getRecipientStatus
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTemplates

listTemplates

**Module:** `docusign` | **Returns:** `object` -- API response.

```robinpath
docusign.listTemplates
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTemplate

getTemplate

**Module:** `docusign` | **Returns:** `object` -- API response.

```robinpath
docusign.getTemplate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createEnvelopeFromTemplate

createEnvelopeFromTemplate

**Module:** `docusign` | **Returns:** `object` -- API response.

```robinpath
docusign.createEnvelopeFromTemplate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUserInfo

getUserInfo

**Module:** `docusign` | **Returns:** `object` -- API response.

```robinpath
docusign.getUserInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getAccount

getAccount

**Module:** `docusign` | **Returns:** `object` -- API response.

```robinpath
docusign.getAccount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Docusign API error (${res.status}): ${t}` | Check the error message for details |
| `docusign.setCredentials requires accessToken, accountId.` | Check the error message for details |
| `docusign.voidEnvelope requires an ID.` | Check the error message for details |
| `Docusign: "..." not configured. Call docusign.setCredentials first.` | Check the error message for details |

```robinpath
set $result as docusign.listEnvelopes
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Envelopes

Retrieve all items and loop through them.

```robinpath
docusign.setCredentials $token
set $result as docusign.listEnvelopes
each $item in $result
  print $item
end
```

### 2. Create a new item with createEnvelope

Create a new resource and capture the result.

```robinpath
docusign.setCredentials $token
set $result as docusign.createEnvelope
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
docusign.setCredentials $token
set $existing as docusign.listEnvelopes
if $existing == null
  docusign.createEnvelope
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step DocuSign workflow

Chain multiple docusign operations together.

```robinpath
docusign.setCredentials $token
set $r_listEnvelopes as docusign.listEnvelopes
set $r_getEnvelope as docusign.getEnvelope
set $r_createEnvelope as docusign.createEnvelope
print "All operations complete"
```

### 5. Safe listEnvelopes with validation

Check results before proceeding.

```robinpath
docusign.setCredentials $token
set $result as docusign.listEnvelopes
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
- **pandadoc** -- PandaDoc module for complementary functionality
- **hellosign** -- HelloSign module for complementary functionality
