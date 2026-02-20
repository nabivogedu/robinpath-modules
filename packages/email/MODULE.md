---
title: "Email"
module: "email"
package: "@robinpath/email"
description: "SMTP email sending with transports, attachments, address parsing, and Ethereal test accounts"
category: "utility"
tags: [email, utility]
type: "utility"
auth: "none"
functionCount: 12
---

# Email

> SMTP email sending with transports, attachments, address parsing, and Ethereal test accounts

**Package:** `@robinpath/email` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `email` module when you need to:

- **Create a named SMTP transport for sending emails** -- Use `email.createTransport` to perform this operation
- **Send an email with full options (to, subject, body, attachments, etc.)** -- Use `email.send` to perform this operation
- **Send a simple email with just to, subject, and body** -- Use `email.sendQuick` to perform this operation
- **Verify SMTP connection to the mail server** -- Use `email.verify` to perform this operation
- **Validate an email address format** -- Use `email.isValid` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`createTransport`](#createtransport) | Create a named SMTP transport for sending emails | `Transport configuration` |
| [`send`](#send) | Send an email with full options (to, subject, body, attachments, etc.) | `{messageId, accepted, rejected, response}` |
| [`sendQuick`](#sendquick) | Send a simple email with just to, subject, and body | `{messageId, accepted, rejected}` |
| [`verify`](#verify) | Verify SMTP connection to the mail server | `{connected: boolean, error?: string}` |
| [`isValid`](#isvalid) | Validate an email address format | `True if email format is valid` |
| [`parseAddress`](#parseaddress) | Parse an email address string into name and address parts | `{name, address, full}` |
| [`parseAddressList`](#parseaddresslist) | Parse a comma-separated list of email addresses | `Array of {name, address, full} objects` |
| [`extractDomain`](#extractdomain) | Extract the domain part from an email address | `Domain part (e.g. 'example.com')` |
| [`buildAddress`](#buildaddress) | Build a formatted email address from name and email | `Formatted address like '"Name" <email>'` |
| [`close`](#close) | Close a transport connection | `True if transport was closed` |
| [`createTestAccount`](#createtestaccount) | Create an Ethereal test account for development (no real emails sent) | `{name, user, pass, smtp, web}` |
| [`getTestUrl`](#gettesturl) | Get the Ethereal preview URL for a test email | `URL to preview the email or null` |


## Functions

### createTransport

Create a named SMTP transport for sending emails

**Module:** `email` | **Returns:** `object` -- Transport configuration

```robinpath
email.createTransport "gmail" {"service": "gmail", "user": "me@gmail.com", "pass": "app-password"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | No | Transport name (default: 'default') |
| `options` | `object` | Yes | {host, port, secure, service, user, pass, tls} |

---

### send

Send an email with full options (to, subject, body, attachments, etc.)

**Module:** `email` | **Returns:** `object` -- {messageId, accepted, rejected, response}

```robinpath
email.send "gmail" {"to": "bob@example.com", "subject": "Hello", "text": "Hi there"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `transport` | `string` | Yes | Transport name |
| `options` | `object` | Yes | {from, to, subject, text, html, body, cc, bcc, replyTo, attachments, priority, headers} |

---

### sendQuick

Send a simple email with just to, subject, and body

**Module:** `email` | **Returns:** `object` -- {messageId, accepted, rejected}

```robinpath
email.sendQuick "gmail" "bob@example.com" "Hello" "Hi Bob!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `transport` | `string` | Yes | Transport name |
| `to` | `string` | Yes | Recipient email |
| `subject` | `string` | Yes | Email subject |
| `body` | `string` | Yes | Email body (text or HTML) |
| `from` | `string` | No | Sender email (optional) |

---

### verify

Verify SMTP connection to the mail server

**Module:** `email` | **Returns:** `object` -- {connected: boolean, error?: string}

```robinpath
email.verify "gmail"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `transport` | `string` | Yes | Transport name |

---

### isValid

Validate an email address format

**Module:** `email` | **Returns:** `boolean` -- True if email format is valid

```robinpath
email.isValid "user@example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | `string` | Yes | Email address to validate |

---

### parseAddress

Parse an email address string into name and address parts

**Module:** `email` | **Returns:** `object` -- {name, address, full}

```robinpath
email.parseAddress "John Doe <john@example.com>"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | `string` | Yes | Email address (e.g. 'John Doe <john@example.com>') |

---

### parseAddressList

Parse a comma-separated list of email addresses

**Module:** `email` | **Returns:** `array` -- Array of {name, address, full} objects

```robinpath
email.parseAddressList "Alice <a@b.com>, Bob <b@b.com>"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `addresses` | `string` | Yes | Comma-separated email addresses |

---

### extractDomain

Extract the domain part from an email address

**Module:** `email` | **Returns:** `string` -- Domain part (e.g. 'example.com')

```robinpath
email.extractDomain "user@example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | `string` | Yes | Email address |

---

### buildAddress

Build a formatted email address from name and email

**Module:** `email` | **Returns:** `string` -- Formatted address like '"Name" <email>'

```robinpath
email.buildAddress "John Doe" "john@example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Display name |
| `email` | `string` | Yes | Email address |

---

### close

Close a transport connection

**Module:** `email` | **Returns:** `boolean` -- True if transport was closed

```robinpath
email.close "gmail"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `transport` | `string` | Yes | Transport name |

---

### createTestAccount

Create an Ethereal test account for development (no real emails sent)

**Module:** `email` | **Returns:** `object` -- {name, user, pass, smtp, web}

```robinpath
email.createTestAccount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### getTestUrl

Get the Ethereal preview URL for a test email

**Module:** `email` | **Returns:** `string` -- URL to preview the email or null

```robinpath
email.getTestUrl $messageId
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messageId` | `string` | Yes | Message ID from send result |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Transport "..." not found. Create it first with email.createTransport.` | Check the error message for details |
| `Transport "..." not found.` | Check the error message for details |

```robinpath
set $result as email.createTransport "gmail" {"service": "gmail", "user": "me@gmail.com", "pass": "app-password"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate TestUrl

Retrieve all items and loop through them.

```robinpath
set $result as email.getTestUrl $messageId
each $item in $result
  print $item
end
```

### 2. Create a new item with createTransport

Create a new resource and capture the result.

```robinpath
set $result as email.createTransport "gmail" {"service": "gmail", "user": "me@gmail.com", "pass": "app-password"}
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as email.getTestUrl $messageId
if $existing == null
  email.createTransport "gmail" {"service": "gmail", "user": "me@gmail.com", "pass": "app-password"}
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Email workflow

Chain multiple email operations together.

```robinpath
set $r_createTransport as email.createTransport "gmail" {"service": "gmail", "user": "me@gmail.com", "pass": "app-password"}
set $r_send as email.send "gmail" {"to": "bob@example.com", "subject": "Hello", "text": "Hi there"}
set $r_sendQuick as email.sendQuick "gmail" "bob@example.com" "Hello" "Hi Bob!"
print "All operations complete"
```

### 5. Safe createTransport with validation

Check results before proceeding.

```robinpath
set $result as email.createTransport "gmail" {"service": "gmail", "user": "me@gmail.com", "pass": "app-password"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
