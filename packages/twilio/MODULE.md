---
title: "Twilio"
module: "twilio"
package: "@robinpath/twilio"
description: "Twilio module for RobinPath."
category: "utility"
tags: [twilio, utility]
type: "utility"
auth: "api-key"
functionCount: 19
baseUrl: "https://api.twilio.com"
---

# Twilio

> Twilio module for RobinPath.

**Package:** `@robinpath/twilio` | **Category:** Utility | **Type:** Utility


## Authentication

```robinpath
twilio.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `twilio` module when you need to:

- **sendSms** -- Use `twilio.sendSms` to perform this operation
- **sendMms** -- Use `twilio.sendMms` to perform this operation
- **listMessages** -- Use `twilio.listMessages` to perform this operation
- **getMessage** -- Use `twilio.getMessage` to perform this operation
- **makeCall** -- Use `twilio.makeCall` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure twilio credentials. | `object` |
| [`sendSms`](#sendsms) | sendSms | `object` |
| [`sendMms`](#sendmms) | sendMms | `object` |
| [`listMessages`](#listmessages) | listMessages | `object` |
| [`getMessage`](#getmessage) | getMessage | `object` |
| [`makeCall`](#makecall) | makeCall | `object` |
| [`listCalls`](#listcalls) | listCalls | `object` |
| [`getCall`](#getcall) | getCall | `object` |
| [`listPhoneNumbers`](#listphonenumbers) | listPhoneNumbers | `object` |
| [`lookupPhoneNumber`](#lookupphonenumber) | lookupPhoneNumber | `object` |
| [`createVerifyService`](#createverifyservice) | createVerifyService | `object` |
| [`sendVerification`](#sendverification) | sendVerification | `object` |
| [`checkVerification`](#checkverification) | checkVerification | `object` |
| [`listConversations`](#listconversations) | listConversations | `object` |
| [`createConversation`](#createconversation) | createConversation | `object` |
| [`addParticipant`](#addparticipant) | addParticipant | `object` |
| [`sendConversationMessage`](#sendconversationmessage) | sendConversationMessage | `object` |
| [`getAccountInfo`](#getaccountinfo) | getAccountInfo | `object` |
| [`deleteMessage`](#deletemessage) | deleteMessage | `object` |


## Functions

### setCredentials

Configure twilio credentials.

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountSid` | `string` | Yes | accountSid |
| `authToken` | `string` | Yes | authToken |

---

### sendSms

sendSms

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.sendSms
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendMms

sendMms

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.sendMms
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listMessages

listMessages

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.listMessages
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getMessage

getMessage

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.getMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### makeCall

makeCall

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.makeCall
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCalls

listCalls

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.listCalls
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCall

getCall

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.getCall
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPhoneNumbers

listPhoneNumbers

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.listPhoneNumbers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### lookupPhoneNumber

lookupPhoneNumber

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.lookupPhoneNumber
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createVerifyService

createVerifyService

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.createVerifyService
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendVerification

sendVerification

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.sendVerification
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### checkVerification

checkVerification

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.checkVerification
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listConversations

listConversations

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.listConversations
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createConversation

createConversation

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.createConversation
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addParticipant

addParticipant

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.addParticipant
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendConversationMessage

sendConversationMessage

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.sendConversationMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getAccountInfo

getAccountInfo

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.getAccountInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteMessage

deleteMessage

**Module:** `twilio` | **Returns:** `object` -- API response.

```robinpath
twilio.deleteMessage
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Twilio API error (${res.status}): ${t}` | Check the error message for details |
| `twilio.setCredentials requires accountSid, authToken.` | Check the error message for details |
| `twilio.deleteMessage requires an ID.` | Check the error message for details |
| `Twilio: "..." not configured. Call twilio.setCredentials first.` | Check the error message for details |

```robinpath
set $result as twilio.sendSms
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Messages

Retrieve all items and loop through them.

```robinpath
twilio.setCredentials $token
set $result as twilio.listMessages
each $item in $result
  print $item
end
```

### 2. Create a new item with sendSms

Create a new resource and capture the result.

```robinpath
twilio.setCredentials $token
set $result as twilio.sendSms
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
twilio.setCredentials $token
set $existing as twilio.listMessages
if $existing == null
  twilio.sendSms
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Twilio workflow

Chain multiple twilio operations together.

```robinpath
twilio.setCredentials $token
set $r_sendSms as twilio.sendSms
set $r_sendMms as twilio.sendMms
set $r_listMessages as twilio.listMessages
print "All operations complete"
```

### 5. Safe sendSms with validation

Check results before proceeding.

```robinpath
twilio.setCredentials $token
set $result as twilio.sendSms
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
