---
title: "SMS"
module: "sms"
package: "@robinpath/sms"
description: "SMS sending via Twilio and Vonage with validation, formatting, lookup, and cost estimation"
category: "messaging"
tags: [sms, messaging]
type: "integration"
auth: "api-key"
functionCount: 10
baseUrl: "https://api.twilio.com"
---

# SMS

> SMS sending via Twilio and Vonage with validation, formatting, lookup, and cost estimation

**Package:** `@robinpath/sms` | **Category:** Messaging | **Type:** Integration


## Authentication

```robinpath
sms.configure "main" {"provider": "twilio", "accountSid": "AC...", "authToken": "..."}
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `sms` module when you need to:

- **Send an SMS message** -- Use `sms.send` to perform this operation
- **Send SMS to multiple recipients** -- Use `sms.sendBulk` to perform this operation
- **Validate E.164 phone format** -- Use `sms.validate` to perform this operation
- **Format phone to E.164** -- Use `sms.format` to perform this operation
- **Lookup phone info via Twilio** -- Use `sms.lookup` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`configure`](#configure) | Configure SMS provider (Twilio or Vonage) | `{id, provider}` |
| [`send`](#send) | Send an SMS message | `{success, messageId, provider}` |
| [`sendBulk`](#sendbulk) | Send SMS to multiple recipients | `Array of results` |
| [`validate`](#validate) | Validate E.164 phone format | `true if valid E.164` |
| [`format`](#format) | Format phone to E.164 | `E.164 formatted` |
| [`lookup`](#lookup) | Lookup phone info via Twilio | `{valid, countryCode, carrier, type}` |
| [`status`](#status) | Check message delivery status | `{status, errorCode, errorMessage}` |
| [`estimateCost`](#estimatecost) | Estimate SMS cost | `{segments, estimatedCost}` |
| [`isGsm`](#isgsm) | Check if message uses GSM-7 encoding | `true if GSM-7` |
| [`segmentCount`](#segmentcount) | Count SMS segments | `Segment count` |


## Functions

### configure

Configure SMS provider (Twilio or Vonage)

**Module:** `sms` | **Returns:** `object` -- {id, provider}

```robinpath
sms.configure "main" {"provider": "twilio", "accountSid": "AC...", "authToken": "..."}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Config name |
| `options` | `object` | Yes | {provider, accountSid, authToken, apiKey, apiSecret, from} |

---

### send

Send an SMS message

**Module:** `sms` | **Returns:** `object` -- {success, messageId, provider}

```robinpath
sms.send "main" "+15559876543" "Your code is 1234"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `configId` | `string` | Yes | Config name |
| `to` | `string` | Yes | Recipient phone (E.164) |
| `body` | `string` | Yes | Message text |
| `options` | `object` | No | {from} |

---

### sendBulk

Send SMS to multiple recipients

**Module:** `sms` | **Returns:** `array` -- Array of results

```robinpath
sms.sendBulk "main" ["+155511111", "+155522222"] "Hello!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `configId` | `string` | Yes | Config name |
| `recipients` | `array` | Yes | Phone numbers |
| `body` | `string` | Yes | Message text |

---

### validate

Validate E.164 phone format

**Module:** `sms` | **Returns:** `boolean` -- true if valid E.164

```robinpath
sms.validate "+15551234567"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `phone` | `string` | Yes | Phone number |

---

### format

Format phone to E.164

**Module:** `sms` | **Returns:** `string` -- E.164 formatted

```robinpath
sms.format "(555) 123-4567"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `phone` | `string` | Yes | Phone number |
| `countryCode` | `string` | No | Country code (default 1) |

---

### lookup

Lookup phone info via Twilio

**Module:** `sms` | **Returns:** `object` -- {valid, countryCode, carrier, type}

```robinpath
sms.lookup "main" "+15551234567"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `configId` | `string` | Yes | Config name |
| `phone` | `string` | Yes | Phone number |

---

### status

Check message delivery status

**Module:** `sms` | **Returns:** `object` -- {status, errorCode, errorMessage}

```robinpath
sms.status "main" "SM123..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `configId` | `string` | Yes | Config name |
| `messageId` | `string` | Yes | Message SID |

---

### estimateCost

Estimate SMS cost

**Module:** `sms` | **Returns:** `object` -- {segments, estimatedCost}

```robinpath
sms.estimateCost "Hello world"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `body` | `string` | Yes | Message text |

---

### isGsm

Check if message uses GSM-7 encoding

**Module:** `sms` | **Returns:** `boolean` -- true if GSM-7

```robinpath
sms.isGsm "Hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `body` | `string` | Yes | Message text |

---

### segmentCount

Count SMS segments

**Module:** `sms` | **Returns:** `number` -- Segment count

```robinpath
sms.segmentCount "Hello world"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `body` | `string` | Yes | Message text |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Recipient phone number is required.` | Check the error message for details |
| `Message body is required.` | Check the error message for details |
| `Twilio requires accountSid and authToken.` | Check the error message for details |
| `Sender (from) is required for Twilio.` | Check the error message for details |
| `Twilio error ${response.status}: ${data.message ?? JSON.stringify(data)}` | Check the error message for details |
| `Vonage requires apiKey and apiSecret.` | Check the error message for details |
| `Sender (from) is required for Vonage.` | Check the error message for details |
| `Lookup is only supported with Twilio.` | Check the error message for details |

```robinpath
set $result as sms.configure "main" {"provider": "twilio", "accountSid": "AC...", "authToken": "..."}
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
set $result as sms.send "main" "+15559876543" "Your code is 1234"
print "Created: " + $result
```

### 2. Multi-step SMS workflow

Chain multiple sms operations together.

```robinpath
set $r_configure as sms.configure "main" {"provider": "twilio", "accountSid": "AC...", "authToken": "..."}
set $r_send as sms.send "main" "+15559876543" "Your code is 1234"
set $r_sendBulk as sms.sendBulk "main" ["+155511111", "+155522222"] "Hello!"
print "All operations complete"
```

### 3. Safe configure with validation

Check results before proceeding.

```robinpath
set $result as sms.configure "main" {"provider": "twilio", "accountSid": "AC...", "authToken": "..."}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **slack** -- Slack module for complementary functionality
- **discord** -- Discord module for complementary functionality
- **teams** -- Teams module for complementary functionality
- **telegram** -- Telegram module for complementary functionality
- **whatsapp** -- WhatsApp module for complementary functionality
