---
title: "Mailchimp"
module: "mailchimp"
package: "@robinpath/mailchimp"
description: "Mailchimp module for RobinPath."
category: "email-marketing"
tags: [mailchimp, email marketing]
type: "integration"
auth: "api-key"
functionCount: 25
---

# Mailchimp

> Mailchimp module for RobinPath.

**Package:** `@robinpath/mailchimp` | **Category:** Email Marketing | **Type:** Integration


## Authentication

```robinpath
mailchimp.setCredentials "abc123-us21" "us21"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `mailchimp` module when you need to:

- **Get all audiences/lists in the account** -- Use `mailchimp.getLists` to perform this operation
- **Get details for a specific audience/list** -- Use `mailchimp.getList` to perform this operation
- **Create a new audience/list with contact info and campaign defaults** -- Use `mailchimp.createList` to perform this operation
- **Delete an audience/list** -- Use `mailchimp.deleteList` to perform this operation
- **Get members of an audience/list with optional filtering** -- Use `mailchimp.getMembers` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Store Mailchimp API key and server prefix for authentication | `{configured, serverPrefix}` |
| [`getLists`](#getlists) | Get all audiences/lists in the account | `Lists response with items and total count` |
| [`getList`](#getlist) | Get details for a specific audience/list | `List details object` |
| [`createList`](#createlist) | Create a new audience/list with contact info and campaign defaults | `Created list object` |
| [`deleteList`](#deletelist) | Delete an audience/list | `{deleted, listId}` |
| [`getMembers`](#getmembers) | Get members of an audience/list with optional filtering | `Members response with items and total count` |
| [`getMember`](#getmember) | Get a specific member by email address | `Member details object` |
| [`addMember`](#addmember) | Add a new member to an audience/list | `Created member object` |
| [`updateMember`](#updatemember) | Update an existing member's information | `Updated member object` |
| [`removeMember`](#removemember) | Archive/remove a member from an audience/list | `{archived, email}` |
| [`addTag`](#addtag) | Add tags to a member in an audience/list | `{tagged, email, tags}` |
| [`removeTag`](#removetag) | Remove tags from a member in an audience/list | `{untagged, email, tags}` |
| [`getCampaigns`](#getcampaigns) | List campaigns with optional filtering | `Campaigns response with items and total count` |
| [`getCampaign`](#getcampaign) | Get details for a specific campaign | `Campaign details object` |
| [`createCampaign`](#createcampaign) | Create a new campaign (regular, plaintext, or absplit) | `Created campaign object` |
| [`updateCampaign`](#updatecampaign) | Update campaign settings | `Updated campaign object` |
| [`deleteCampaign`](#deletecampaign) | Delete a campaign | `{deleted, campaignId}` |
| [`sendCampaign`](#sendcampaign) | Send a campaign immediately | `{sent, campaignId}` |
| [`scheduleCampaign`](#schedulecampaign) | Schedule a campaign for future delivery | `{scheduled, campaignId, scheduleTime}` |
| [`getCampaignContent`](#getcampaigncontent) | Get the content of a campaign | `Campaign content with html and plain text` |
| [`setCampaignContent`](#setcampaigncontent) | Set the content of a campaign with HTML or a template | `Updated campaign content` |
| [`getTemplates`](#gettemplates) | List available email templates | `Templates response with items and total count` |
| [`getTemplate`](#gettemplate) | Get details for a specific template | `Template details object` |
| [`searchMembers`](#searchmembers) | Search for members across all lists or a specific list | `Search results with matching members` |
| [`getListActivity`](#getlistactivity) | Get recent activity stats for an audience/list | `List activity data with daily stats` |


## Functions

### setCredentials

Store Mailchimp API key and server prefix for authentication

**Module:** `mailchimp` | **Returns:** `object` -- {configured, serverPrefix}

```robinpath
mailchimp.setCredentials "abc123-us21" "us21"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | Yes | Mailchimp API key |
| `serverPrefix` | `string` | Yes | Server prefix (e.g. 'us21') |

---

### getLists

Get all audiences/lists in the account

**Module:** `mailchimp` | **Returns:** `object` -- Lists response with items and total count

```robinpath
mailchimp.getLists
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### getList

Get details for a specific audience/list

**Module:** `mailchimp` | **Returns:** `object` -- List details object

```robinpath
mailchimp.getList "abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | The list/audience ID |

---

### createList

Create a new audience/list with contact info and campaign defaults

**Module:** `mailchimp` | **Returns:** `object` -- Created list object

```robinpath
mailchimp.createList "My Newsletter" {"company": "Acme", "fromEmail": "news@acme.com", "fromName": "Acme News"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | List name |
| `options` | `object` | Yes | {contact, campaignDefaults, permissionReminder, emailTypeOption} |

---

### deleteList

Delete an audience/list

**Module:** `mailchimp` | **Returns:** `object` -- {deleted, listId}

```robinpath
mailchimp.deleteList "abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | The list/audience ID to delete |

---

### getMembers

Get members of an audience/list with optional filtering

**Module:** `mailchimp` | **Returns:** `object` -- Members response with items and total count

```robinpath
mailchimp.getMembers "abc123" {"status": "subscribed", "count": 50}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | The list/audience ID |
| `options` | `object` | No | {status, count, offset} |

---

### getMember

Get a specific member by email address

**Module:** `mailchimp` | **Returns:** `object` -- Member details object

```robinpath
mailchimp.getMember "abc123" "user@example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | The list/audience ID |
| `email` | `string` | Yes | Member email address |

---

### addMember

Add a new member to an audience/list

**Module:** `mailchimp` | **Returns:** `object` -- Created member object

```robinpath
mailchimp.addMember "abc123" "user@example.com" {"status": "subscribed", "mergeFields": {"FNAME": "John"}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | The list/audience ID |
| `email` | `string` | Yes | Member email address |
| `options` | `object` | No | {status, mergeFields, tags, language, vip} |

---

### updateMember

Update an existing member's information

**Module:** `mailchimp` | **Returns:** `object` -- Updated member object

```robinpath
mailchimp.updateMember "abc123" "user@example.com" {"mergeFields": {"FNAME": "Jane"}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | The list/audience ID |
| `email` | `string` | Yes | Member email address |
| `fields` | `object` | Yes | {status, mergeFields, language, vip, emailAddress} |

---

### removeMember

Archive/remove a member from an audience/list

**Module:** `mailchimp` | **Returns:** `object` -- {archived, email}

```robinpath
mailchimp.removeMember "abc123" "user@example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | The list/audience ID |
| `email` | `string` | Yes | Member email address to remove |

---

### addTag

Add tags to a member in an audience/list

**Module:** `mailchimp` | **Returns:** `object` -- {tagged, email, tags}

```robinpath
mailchimp.addTag "abc123" "user@example.com" ["vip", "newsletter"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | The list/audience ID |
| `email` | `string` | Yes | Member email address |
| `tags` | `array` | Yes | Tag names to add |

---

### removeTag

Remove tags from a member in an audience/list

**Module:** `mailchimp` | **Returns:** `object` -- {untagged, email, tags}

```robinpath
mailchimp.removeTag "abc123" "user@example.com" ["old-tag"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | The list/audience ID |
| `email` | `string` | Yes | Member email address |
| `tags` | `array` | Yes | Tag names to remove |

---

### getCampaigns

List campaigns with optional filtering

**Module:** `mailchimp` | **Returns:** `object` -- Campaigns response with items and total count

```robinpath
mailchimp.getCampaigns {"status": "sent", "count": 20}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {status, type, count, offset} |

---

### getCampaign

Get details for a specific campaign

**Module:** `mailchimp` | **Returns:** `object` -- Campaign details object

```robinpath
mailchimp.getCampaign "cam123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `campaignId` | `string` | Yes | The campaign ID |

---

### createCampaign

Create a new campaign (regular, plaintext, or absplit)

**Module:** `mailchimp` | **Returns:** `object` -- Created campaign object

```robinpath
mailchimp.createCampaign "regular" {"recipients": {"list_id": "abc123"}, "settings": {"subject_line": "Hello", "from_name": "Acme", "reply_to": "news@acme.com"}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `string` | Yes | Campaign type: regular, plaintext, absplit |
| `options` | `object` | Yes | {recipients, settings, tracking} |

---

### updateCampaign

Update campaign settings

**Module:** `mailchimp` | **Returns:** `object` -- Updated campaign object

```robinpath
mailchimp.updateCampaign "cam123" {"settings": {"subject_line": "Updated Subject"}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `campaignId` | `string` | Yes | The campaign ID |
| `options` | `object` | Yes | {recipients, settings, tracking} |

---

### deleteCampaign

Delete a campaign

**Module:** `mailchimp` | **Returns:** `object` -- {deleted, campaignId}

```robinpath
mailchimp.deleteCampaign "cam123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `campaignId` | `string` | Yes | The campaign ID to delete |

---

### sendCampaign

Send a campaign immediately

**Module:** `mailchimp` | **Returns:** `object` -- {sent, campaignId}

```robinpath
mailchimp.sendCampaign "cam123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `campaignId` | `string` | Yes | The campaign ID to send |

---

### scheduleCampaign

Schedule a campaign for future delivery

**Module:** `mailchimp` | **Returns:** `object` -- {scheduled, campaignId, scheduleTime}

```robinpath
mailchimp.scheduleCampaign "cam123" "2025-12-25T10:00:00Z"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `campaignId` | `string` | Yes | The campaign ID to schedule |
| `scheduleTime` | `string` | Yes | ISO 8601 datetime for sending |

---

### getCampaignContent

Get the content of a campaign

**Module:** `mailchimp` | **Returns:** `object` -- Campaign content with html and plain text

```robinpath
mailchimp.getCampaignContent "cam123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `campaignId` | `string` | Yes | The campaign ID |

---

### setCampaignContent

Set the content of a campaign with HTML or a template

**Module:** `mailchimp` | **Returns:** `object` -- Updated campaign content

```robinpath
mailchimp.setCampaignContent "cam123" {"html": "<h1>Hello</h1><p>Welcome!</p>"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `campaignId` | `string` | Yes | The campaign ID |
| `options` | `object` | Yes | {html, plainText, template} |

---

### getTemplates

List available email templates

**Module:** `mailchimp` | **Returns:** `object` -- Templates response with items and total count

```robinpath
mailchimp.getTemplates {"count": 20}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {count, offset, type} |

---

### getTemplate

Get details for a specific template

**Module:** `mailchimp` | **Returns:** `object` -- Template details object

```robinpath
mailchimp.getTemplate "tmpl123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `templateId` | `string` | Yes | The template ID |

---

### searchMembers

Search for members across all lists or a specific list

**Module:** `mailchimp` | **Returns:** `object` -- Search results with matching members

```robinpath
mailchimp.searchMembers "john@example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | Yes | Search query string |
| `listId` | `string` | No | Optional list ID to limit search |

---

### getListActivity

Get recent activity stats for an audience/list

**Module:** `mailchimp` | **Returns:** `object` -- List activity data with daily stats

```robinpath
mailchimp.getListActivity "abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | The list/audience ID |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Mailchimp server prefix not set. Call mailchimp.setCredentials first.` | Check the error message for details |
| `Mailchimp API key not set. Call mailchimp.setCredentials first.` | Check the error message for details |
| `Mailchimp API error ${res.status}: ${detail}` | Check the error message for details |
| `API key is required.` | Check the error message for details |
| `listId is required.` | Check the error message for details |
| `List name is required.` | Check the error message for details |
| `email is required.` | Check the error message for details |
| `tags are required.` | Check the error message for details |

```robinpath
set $result as mailchimp.getLists
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Lists

Retrieve all items and loop through them.

```robinpath
mailchimp.setCredentials $token
set $result as mailchimp.getLists
each $item in $result
  print $item
end
```

### 2. Create a new item with createList

Create a new resource and capture the result.

```robinpath
mailchimp.setCredentials $token
set $result as mailchimp.createList "My Newsletter" {"company": "Acme", "fromEmail": "news@acme.com", "fromName": "Acme News"}
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
mailchimp.setCredentials $token
set $created as mailchimp.createList "My Newsletter" {"company": "Acme", "fromEmail": "news@acme.com", "fromName": "Acme News"}
# Update the created item
mailchimp.updateMember "abc123" "user@example.com" {"mergeFields": {"FNAME": "Jane"}}
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
mailchimp.setCredentials $token
set $existing as mailchimp.getLists
if $existing == null
  mailchimp.createList "My Newsletter" {"company": "Acme", "fromEmail": "news@acme.com", "fromName": "Acme News"}
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Mailchimp workflow

Chain multiple mailchimp operations together.

```robinpath
mailchimp.setCredentials $token
set $r_getLists as mailchimp.getLists
set $r_getList as mailchimp.getList "abc123"
set $r_createList as mailchimp.createList "My Newsletter" {"company": "Acme", "fromEmail": "news@acme.com", "fromName": "Acme News"}
print "All operations complete"
```

### 6. Safe getLists with validation

Check results before proceeding.

```robinpath
mailchimp.setCredentials $token
set $result as mailchimp.getLists
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
- **sendgrid** -- SendGrid module for complementary functionality
- **lemlist** -- Lemlist module for complementary functionality
