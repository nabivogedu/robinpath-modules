---
title: "Convertkit"
module: "convertkit"
package: "@robinpath/convertkit"
description: "Convertkit module for RobinPath."
category: "email-marketing"
tags: [convertkit, email marketing]
type: "integration"
auth: "api-key"
functionCount: 17
baseUrl: "https://api.convertkit.com"
---

# Convertkit

> Convertkit module for RobinPath.

**Package:** `@robinpath/convertkit` | **Category:** Email Marketing | **Type:** Integration


## Authentication

```robinpath
convertkit.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `convertkit` module when you need to:

- **listSubscribers** -- Use `convertkit.listSubscribers` to perform this operation
- **getSubscriber** -- Use `convertkit.getSubscriber` to perform this operation
- **createSubscriber** -- Use `convertkit.createSubscriber` to perform this operation
- **updateSubscriber** -- Use `convertkit.updateSubscriber` to perform this operation
- **unsubscribeSubscriber** -- Use `convertkit.unsubscribeSubscriber` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure convertkit credentials. | `object` |
| [`listSubscribers`](#listsubscribers) | listSubscribers | `object` |
| [`getSubscriber`](#getsubscriber) | getSubscriber | `object` |
| [`createSubscriber`](#createsubscriber) | createSubscriber | `object` |
| [`updateSubscriber`](#updatesubscriber) | updateSubscriber | `object` |
| [`unsubscribeSubscriber`](#unsubscribesubscriber) | unsubscribeSubscriber | `object` |
| [`listTags`](#listtags) | listTags | `object` |
| [`createTag`](#createtag) | createTag | `object` |
| [`tagSubscriber`](#tagsubscriber) | tagSubscriber | `object` |
| [`removeTagFromSubscriber`](#removetagfromsubscriber) | removeTagFromSubscriber | `object` |
| [`listSequences`](#listsequences) | listSequences | `object` |
| [`addSubscriberToSequence`](#addsubscribertosequence) | addSubscriberToSequence | `object` |
| [`listForms`](#listforms) | listForms | `object` |
| [`listBroadcasts`](#listbroadcasts) | listBroadcasts | `object` |
| [`createBroadcast`](#createbroadcast) | createBroadcast | `object` |
| [`getAccount`](#getaccount) | getAccount | `object` |
| [`listPurchases`](#listpurchases) | listPurchases | `object` |


## Functions

### setCredentials

Configure convertkit credentials.

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiSecret` | `string` | Yes | apiSecret |

---

### listSubscribers

listSubscribers

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.listSubscribers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSubscriber

getSubscriber

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.getSubscriber
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createSubscriber

createSubscriber

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.createSubscriber
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateSubscriber

updateSubscriber

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.updateSubscriber
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### unsubscribeSubscriber

unsubscribeSubscriber

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.unsubscribeSubscriber
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTags

listTags

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.listTags
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createTag

createTag

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.createTag
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### tagSubscriber

tagSubscriber

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.tagSubscriber
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### removeTagFromSubscriber

removeTagFromSubscriber

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.removeTagFromSubscriber
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listSequences

listSequences

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.listSequences
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addSubscriberToSequence

addSubscriberToSequence

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.addSubscriberToSequence
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listForms

listForms

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.listForms
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listBroadcasts

listBroadcasts

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.listBroadcasts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createBroadcast

createBroadcast

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.createBroadcast
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getAccount

getAccount

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.getAccount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPurchases

listPurchases

**Module:** `convertkit` | **Returns:** `object` -- API response.

```robinpath
convertkit.listPurchases
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Convertkit API error (${res.status}): ${t}` | Check the error message for details |
| `convertkit.setCredentials requires apiSecret.` | Check the error message for details |
| `convertkit.updateSubscriber requires an ID.` | Check the error message for details |
| `convertkit.unsubscribeSubscriber requires an ID.` | Check the error message for details |
| `convertkit.removeTagFromSubscriber requires an ID.` | Check the error message for details |
| `Convertkit: "..." not configured. Call convertkit.setCredentials first.` | Check the error message for details |

```robinpath
set $result as convertkit.listSubscribers
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Subscribers

Retrieve all items and loop through them.

```robinpath
convertkit.setCredentials $token
set $result as convertkit.listSubscribers
each $item in $result
  print $item
end
```

### 2. Create a new item with createSubscriber

Create a new resource and capture the result.

```robinpath
convertkit.setCredentials $token
set $result as convertkit.createSubscriber
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
convertkit.setCredentials $token
set $created as convertkit.createSubscriber
# Update the created item
convertkit.updateSubscriber
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
convertkit.setCredentials $token
set $existing as convertkit.listSubscribers
if $existing == null
  convertkit.createSubscriber
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Convertkit workflow

Chain multiple convertkit operations together.

```robinpath
convertkit.setCredentials $token
set $r_listSubscribers as convertkit.listSubscribers
set $r_getSubscriber as convertkit.getSubscriber
set $r_createSubscriber as convertkit.createSubscriber
print "All operations complete"
```

### 6. Safe listSubscribers with validation

Check results before proceeding.

```robinpath
convertkit.setCredentials $token
set $result as convertkit.listSubscribers
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **activecampaign** -- ActiveCampaign module for complementary functionality
- **brevo** -- Brevo module for complementary functionality
- **mailchimp** -- Mailchimp module for complementary functionality
- **sendgrid** -- SendGrid module for complementary functionality
- **lemlist** -- Lemlist module for complementary functionality
