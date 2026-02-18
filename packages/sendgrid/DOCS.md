---
title: "SendGrid"
module: "sendgrid"
package: "@robinpath/sendgrid"
description: "SendGrid module for RobinPath."
category: "email-marketing"
tags: [sendgrid, email marketing]
type: "integration"
auth: "api-key"
functionCount: 20
baseUrl: "https://api.sendgrid.com/v3"
---

# SendGrid

> SendGrid module for RobinPath.

**Package:** `@robinpath/sendgrid` | **Category:** Email Marketing | **Type:** Integration


## Authentication

```robinpath
sendgrid.setApiKey "SG.xxxxxxxxxxxxxxxxxxxxxxxx"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `sendgrid` module when you need to:

- **Send an email with text/html content, cc, bcc, replyTo, and attachments** -- Use `sendgrid.sendEmail` to perform this operation
- **Send an email using a SendGrid dynamic template** -- Use `sendgrid.sendTemplate` to perform this operation
- **Add or update a single contact in SendGrid Marketing** -- Use `sendgrid.addContact` to perform this operation
- **Bulk add or update contacts in SendGrid Marketing** -- Use `sendgrid.addContacts` to perform this operation
- **Delete a contact by ID from SendGrid Marketing** -- Use `sendgrid.removeContact` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setApiKey`](#setapikey) | Store the SendGrid API key for authentication | `{ok: true}` |
| [`sendEmail`](#sendemail) | Send an email with text/html content, cc, bcc, replyTo, and attachments | `{ok: true, statusCode: 202}` |
| [`sendTemplate`](#sendtemplate) | Send an email using a SendGrid dynamic template | `{ok: true, statusCode: 202}` |
| [`addContact`](#addcontact) | Add or update a single contact in SendGrid Marketing | `{job_id: string}` |
| [`addContacts`](#addcontacts) | Bulk add or update contacts in SendGrid Marketing | `{job_id: string}` |
| [`removeContact`](#removecontact) | Delete a contact by ID from SendGrid Marketing | `{job_id: string}` |
| [`searchContacts`](#searchcontacts) | Search contacts using SendGrid Segmentation Query Language (SGQL) | `{result: array of contacts, contact_count: number}` |
| [`listContacts`](#listcontacts) | List all contacts with optional pagination | `{result: array, contact_count: number, _metadata: {next?: string}}` |
| [`createList`](#createlist) | Create a new contact list in SendGrid Marketing | `{id: string, name: string, contact_count: number}` |
| [`listLists`](#listlists) | List all contact lists in SendGrid Marketing | `{result: array of lists}` |
| [`deleteList`](#deletelist) | Delete a contact list by ID | `{ok: true}` |
| [`addToList`](#addtolist) | Add contacts to a contact list by their IDs | `{job_id: string}` |
| [`removeFromList`](#removefromlist) | Remove contacts from a contact list by their IDs | `{job_id: string}` |
| [`getSingleSend`](#getsinglesend) | Get details of a Single Send campaign by ID | `Single Send object with id, name, status, send_at, etc.` |
| [`listSingleSends`](#listsinglesends) | List all Single Send campaigns | `{result: array of Single Send objects}` |
| [`createSingleSend`](#createsinglesend) | Create a new Single Send campaign | `{id: string, name: string, status: string}` |
| [`sendSingleSend`](#sendsinglesend) | Send or schedule a Single Send campaign immediately | `{status: string, send_at: string}` |
| [`getStats`](#getstats) | Get global email statistics (requests, deliveries, opens, clicks, etc.) | `Array of stats objects with date and metrics` |
| [`getTemplates`](#gettemplates) | List all email templates with optional generation filter | `{result: array of template objects}` |
| [`getTemplate`](#gettemplate) | Get details of a specific email template by ID | `Template object with id, name, versions, etc.` |


## Functions

### setApiKey

Store the SendGrid API key for authentication

**Module:** `sendgrid` | **Returns:** `object` -- {ok: true}

```robinpath
sendgrid.setApiKey "SG.xxxxxxxxxxxxxxxxxxxxxxxx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | Yes | SendGrid API key (SG.xxx) |

---

### sendEmail

Send an email with text/html content, cc, bcc, replyTo, and attachments

**Module:** `sendgrid` | **Returns:** `object` -- {ok: true, statusCode: 202}

```robinpath
sendgrid.sendEmail "bob@example.com" "noreply@myapp.com" "Welcome!" {"html": "<h1>Hello!</h1>"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | `string` | Yes | Recipient email address |
| `from` | `string` | Yes | Sender email address (must be verified) |
| `subject` | `string` | Yes | Email subject line |
| `options` | `object` | No | {text?, html?, body?, cc?, bcc?, replyTo?, attachments?} |

---

### sendTemplate

Send an email using a SendGrid dynamic template

**Module:** `sendgrid` | **Returns:** `object` -- {ok: true, statusCode: 202}

```robinpath
sendgrid.sendTemplate "bob@example.com" "noreply@myapp.com" "d-abc123" {"name": "Bob", "orderId": "12345"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | `string` | Yes | Recipient email address |
| `from` | `string` | Yes | Sender email address |
| `templateId` | `string` | Yes | Dynamic template ID (d-xxxx) |
| `dynamicData` | `object` | No | Dynamic template data (key-value pairs) |
| `options` | `object` | No | {subject?, cc?, bcc?, replyTo?} |

---

### addContact

Add or update a single contact in SendGrid Marketing

**Module:** `sendgrid` | **Returns:** `object` -- {job_id: string}

```robinpath
sendgrid.addContact "bob@example.com" {"firstName": "Bob", "lastName": "Smith"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | `string` | Yes | Contact email address |
| `options` | `object` | No | {firstName?, lastName?, city?, state?, country?, postalCode?, customFields?, listIds?} |

---

### addContacts

Bulk add or update contacts in SendGrid Marketing

**Module:** `sendgrid` | **Returns:** `object` -- {job_id: string}

```robinpath
sendgrid.addContacts [{"email": "a@b.com", "firstName": "Alice"}, {"email": "b@b.com", "firstName": "Bob"}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `contacts` | `array` | Yes | Array of contact objects [{email, firstName?, lastName?, ...}] |

---

### removeContact

Delete a contact by ID from SendGrid Marketing

**Module:** `sendgrid` | **Returns:** `object` -- {job_id: string}

```robinpath
sendgrid.removeContact "abc-123-def-456"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `contactId` | `string` | Yes | Contact ID to delete |

---

### searchContacts

Search contacts using SendGrid Segmentation Query Language (SGQL)

**Module:** `sendgrid` | **Returns:** `object` -- {result: array of contacts, contact_count: number}

```robinpath
sendgrid.searchContacts "first_name = 'Bob'"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | Yes | SGQL query (e.g. "email LIKE '%example.com'") |

---

### listContacts

List all contacts with optional pagination

**Module:** `sendgrid` | **Returns:** `object` -- {result: array, contact_count: number, _metadata: {next?: string}}

```robinpath
sendgrid.listContacts {"pageSize": 50}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {pageSize?, pageToken?} |

---

### createList

Create a new contact list in SendGrid Marketing

**Module:** `sendgrid` | **Returns:** `object` -- {id: string, name: string, contact_count: number}

```robinpath
sendgrid.createList "Newsletter Subscribers"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Name of the contact list |

---

### listLists

List all contact lists in SendGrid Marketing

**Module:** `sendgrid` | **Returns:** `object` -- {result: array of lists}

```robinpath
sendgrid.listLists
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### deleteList

Delete a contact list by ID

**Module:** `sendgrid` | **Returns:** `object` -- {ok: true}

```robinpath
sendgrid.deleteList "abc-123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | List ID to delete |

---

### addToList

Add contacts to a contact list by their IDs

**Module:** `sendgrid` | **Returns:** `object` -- {job_id: string}

```robinpath
sendgrid.addToList "list-123" ["contact-1", "contact-2"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | Contact list ID |
| `contactIds` | `array` | Yes | Array of contact IDs to add |

---

### removeFromList

Remove contacts from a contact list by their IDs

**Module:** `sendgrid` | **Returns:** `object` -- {job_id: string}

```robinpath
sendgrid.removeFromList "list-123" ["contact-1", "contact-2"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | Contact list ID |
| `contactIds` | `array` | Yes | Array of contact IDs to remove |

---

### getSingleSend

Get details of a Single Send campaign by ID

**Module:** `sendgrid` | **Returns:** `object` -- Single Send object with id, name, status, send_at, etc.

```robinpath
sendgrid.getSingleSend "abc-123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `singleSendId` | `string` | Yes | Single Send ID |

---

### listSingleSends

List all Single Send campaigns

**Module:** `sendgrid` | **Returns:** `object` -- {result: array of Single Send objects}

```robinpath
sendgrid.listSingleSends
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### createSingleSend

Create a new Single Send campaign

**Module:** `sendgrid` | **Returns:** `object` -- {id: string, name: string, status: string}

```robinpath
sendgrid.createSingleSend "February Newsletter" {"sendTo": {"list_ids": ["list-1"]}, "emailConfig": {"subject": "News", "sender_id": 123}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Campaign name |
| `options` | `object` | Yes | {sendTo?: {list_ids, all?}, emailConfig?: {subject, html_content, sender_id, ...}, sendAt?} |

---

### sendSingleSend

Send or schedule a Single Send campaign immediately

**Module:** `sendgrid` | **Returns:** `object` -- {status: string, send_at: string}

```robinpath
sendgrid.sendSingleSend "abc-123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `singleSendId` | `string` | Yes | Single Send ID to send |

---

### getStats

Get global email statistics (requests, deliveries, opens, clicks, etc.)

**Module:** `sendgrid` | **Returns:** `array` -- Array of stats objects with date and metrics

```robinpath
sendgrid.getStats {"startDate": "2026-01-01", "endDate": "2026-01-31", "aggregatedBy": "day"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {startDate?: 'YYYY-MM-DD', endDate?: 'YYYY-MM-DD', aggregatedBy?: 'day'|'week'|'month'} |

---

### getTemplates

List all email templates with optional generation filter

**Module:** `sendgrid` | **Returns:** `object` -- {result: array of template objects}

```robinpath
sendgrid.getTemplates {"generations": "dynamic"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {generations?: 'legacy'|'dynamic', pageSize?: number} |

---

### getTemplate

Get details of a specific email template by ID

**Module:** `sendgrid` | **Returns:** `object` -- Template object with id, name, versions, etc.

```robinpath
sendgrid.getTemplate "d-abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `templateId` | `string` | Yes | Template ID |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `SendGrid API key not set. Call sendgrid.setApiKey first.` | Check the error message for details |
| `SendGrid API error (${response.status}): ${errorBody}` | Check the error message for details |
| `API key is required` | Check the error message for details |
| `Recipient (to) is required` | Check the error message for details |
| `Sender (from) is required` | Check the error message for details |
| `Subject is required` | Check the error message for details |
| `Template ID is required` | Check the error message for details |
| `Email is required` | Check the error message for details |

```robinpath
set $result as sendgrid.sendEmail "bob@example.com" "noreply@myapp.com" "Welcome!" {"html": "<h1>Hello!</h1>"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Contacts

Retrieve all items and loop through them.

```robinpath
sendgrid.setApiKey $token
set $result as sendgrid.listContacts {"pageSize": 50}
each $item in $result
  print $item
end
```

### 2. Create a new item with sendEmail

Create a new resource and capture the result.

```robinpath
sendgrid.setApiKey $token
set $result as sendgrid.sendEmail "bob@example.com" "noreply@myapp.com" "Welcome!" {"html": "<h1>Hello!</h1>"}
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
sendgrid.setApiKey $token
set $existing as sendgrid.listContacts {"pageSize": 50}
if $existing == null
  sendgrid.sendEmail "bob@example.com" "noreply@myapp.com" "Welcome!" {"html": "<h1>Hello!</h1>"}
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step SendGrid workflow

Chain multiple sendgrid operations together.

```robinpath
sendgrid.setApiKey $token
set $r_sendEmail as sendgrid.sendEmail "bob@example.com" "noreply@myapp.com" "Welcome!" {"html": "<h1>Hello!</h1>"}
set $r_sendTemplate as sendgrid.sendTemplate "bob@example.com" "noreply@myapp.com" "d-abc123" {"name": "Bob", "orderId": "12345"}
set $r_addContact as sendgrid.addContact "bob@example.com" {"firstName": "Bob", "lastName": "Smith"}
print "All operations complete"
```

### 5. Safe sendEmail with validation

Check results before proceeding.

```robinpath
sendgrid.setApiKey $token
set $result as sendgrid.sendEmail "bob@example.com" "noreply@myapp.com" "Welcome!" {"html": "<h1>Hello!</h1>"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **activecampaign** -- ActiveCampaign module for complementary functionality
- **brevo** -- Brevo module for complementary functionality
- **convertkit** -- Convertkit module for complementary functionality
- **mailchimp** -- Mailchimp module for complementary functionality
- **lemlist** -- Lemlist module for complementary functionality
