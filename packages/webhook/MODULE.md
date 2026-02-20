---
title: "Webhook"
module: "webhook"
package: "@robinpath/webhook"
description: "Send webhooks with HMAC signatures, verify incoming webhook payloads, and prevent replay attacks"
category: "web"
tags: [webhook, web]
type: "utility"
auth: "none"
functionCount: 8
---

# Webhook

> Send webhooks with HMAC signatures, verify incoming webhook payloads, and prevent replay attacks

**Package:** `@robinpath/webhook` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `webhook` module when you need to:

- **Send a webhook POST request with optional HMAC signature** -- Use `webhook.send` to perform this operation
- **Create an HMAC signature for a webhook payload** -- Use `webhook.sign` to perform this operation
- **Verify a webhook HMAC signature using timing-safe comparison** -- Use `webhook.verify` to perform this operation
- **Verify a webhook timestamp is within acceptable tolerance to prevent replay attacks** -- Use `webhook.verifyTimestamp` to perform this operation
- **Parse a raw webhook body based on content type** -- Use `webhook.parsePayload` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`send`](#send) | Send a webhook POST request with optional HMAC signature | `{status, statusText, ok, headers, body}` |
| [`sign`](#sign) | Create an HMAC signature for a webhook payload | `Signature in format 'algorithm=hex'` |
| [`verify`](#verify) | Verify a webhook HMAC signature using timing-safe comparison | `True if signature is valid` |
| [`verifyTimestamp`](#verifytimestamp) | Verify a webhook timestamp is within acceptable tolerance to prevent replay attacks | `{valid, ageMs, toleranceMs}` |
| [`parsePayload`](#parsepayload) | Parse a raw webhook body based on content type | `Parsed payload` |
| [`buildPayload`](#buildpayload) | Build a standardized webhook payload with event name, data, timestamp, and ID | `{event, data, timestamp, id}` |
| [`headers`](#headers) | Build webhook headers including signature and timestamp | `Headers object ready for HTTP request` |
| [`isValidUrl`](#isvalidurl) | Check if a string is a valid HTTP/HTTPS webhook URL | `True if valid HTTP(S) URL` |


## Functions

### send

Send a webhook POST request with optional HMAC signature

**Module:** `webhook` | **Returns:** `object` -- {status, statusText, ok, headers, body}

```robinpath
webhook.send "https://example.com/hook" $data {"secret": "whsec_abc"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Target webhook URL |
| `payload` | `any` | Yes | Data to send |
| `options` | `object` | No | {secret, method, contentType, headers, algorithm, signatureHeader, event} |

---

### sign

Create an HMAC signature for a webhook payload

**Module:** `webhook` | **Returns:** `string` -- Signature in format 'algorithm=hex'

```robinpath
webhook.sign $payload "whsec_abc"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `payload` | `any` | Yes | The payload to sign (string or object) |
| `secret` | `string` | Yes | The webhook secret |
| `algorithm` | `string` | No | Hash algorithm (default: sha256) |

---

### verify

Verify a webhook HMAC signature using timing-safe comparison

**Module:** `webhook` | **Returns:** `boolean` -- True if signature is valid

```robinpath
webhook.verify $body "whsec_abc" $signatureHeader
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `payload` | `any` | Yes | The received payload |
| `secret` | `string` | Yes | The webhook secret |
| `signature` | `string` | Yes | The received signature |
| `algorithm` | `string` | No | Hash algorithm (default: sha256) |

---

### verifyTimestamp

Verify a webhook timestamp is within acceptable tolerance to prevent replay attacks

**Module:** `webhook` | **Returns:** `object` -- {valid, ageMs, toleranceMs}

```robinpath
webhook.verifyTimestamp $timestamp 60000
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `timestamp` | `number` | Yes | Timestamp in milliseconds |
| `toleranceMs` | `number` | No | Tolerance in ms (default 300000 = 5min) |

---

### parsePayload

Parse a raw webhook body based on content type

**Module:** `webhook` | **Returns:** `any` -- Parsed payload

```robinpath
webhook.parsePayload $rawBody "application/json"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `body` | `any` | Yes | Raw request body |
| `contentType` | `string` | No | Content-Type header (default: application/json) |

---

### buildPayload

Build a standardized webhook payload with event name, data, timestamp, and ID

**Module:** `webhook` | **Returns:** `object` -- {event, data, timestamp, id}

```robinpath
webhook.buildPayload "order.created" $orderData
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `event` | `string` | Yes | Event type name |
| `data` | `any` | Yes | Event data |
| `options` | `object` | No | {id, metadata} |

---

### headers

Build webhook headers including signature and timestamp

**Module:** `webhook` | **Returns:** `object` -- Headers object ready for HTTP request

```robinpath
webhook.headers "whsec_abc" $payload "order.created"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `secret` | `string` | Yes | Webhook secret for signing |
| `payload` | `any` | Yes | The payload being sent |
| `event` | `string` | No | Event type header (optional) |

---

### isValidUrl

Check if a string is a valid HTTP/HTTPS webhook URL

**Module:** `webhook` | **Returns:** `boolean` -- True if valid HTTP(S) URL

```robinpath
webhook.isValidUrl "https://example.com/hook"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | URL to validate |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `URL is required` | Check the error message for details |

```robinpath
set $result as webhook.send "https://example.com/hook" $data {"secret": "whsec_abc"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with send

Create a new resource and capture the result.

```robinpath
set $result as webhook.send "https://example.com/hook" $data {"secret": "whsec_abc"}
print "Created: " + $result
```

### 2. Multi-step Webhook workflow

Chain multiple webhook operations together.

```robinpath
set $r_send as webhook.send "https://example.com/hook" $data {"secret": "whsec_abc"}
set $r_sign as webhook.sign $payload "whsec_abc"
set $r_verify as webhook.verify $body "whsec_abc" $signatureHeader
print "All operations complete"
```

### 3. Safe send with validation

Check results before proceeding.

```robinpath
set $result as webhook.send "https://example.com/hook" $data {"secret": "whsec_abc"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
