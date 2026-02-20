---
title: "ActiveCampaign"
module: "activecampaign"
package: "@robinpath/activecampaign"
description: "ActiveCampaign -- contacts, automations, campaigns, deals, lists, and tags via the ActiveCampaign REST API v3."
category: "email-marketing"
tags: [email, marketing, automation, crm, contacts, deals, campaigns, lists, tags]
type: "integration"
auth: "api-key"
functionCount: 21
apiVersion: "v3"
baseUrl: "https://{account}.api-us1.com/api/3"
---

# ActiveCampaign

> ActiveCampaign -- contacts, automations, campaigns, deals, lists, and tags via the ActiveCampaign REST API v3.

The `activecampaign` module wraps the ActiveCampaign REST API (v3), providing full access to contact management, email campaign orchestration, marketing automations, deal pipelines, lists, and tag systems. It enables you to build marketing workflows, manage subscriber segments, and track sales deals directly from RobinPath scripts.

**Package:** `@robinpath/activecampaign` | **Category:** Email Marketing | **Type:** Integration


## Authentication

ActiveCampaign requires an account name (your subdomain) and an API token. You can find both in your ActiveCampaign account under **Settings > Developer**.

- **Account name**: The subdomain in your ActiveCampaign URL (e.g., `mycompany` from `https://mycompany.activehosted.com`)
- **API token**: Found on the same Developer settings page

```robinpath
activecampaign.setCredentials "mycompany" "your-api-token-here"
```

> Call `setCredentials` once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `activecampaign` module when you need to:

- **Manage contacts** -- create, update, delete, and list contacts in your ActiveCampaign account
- **Automate email marketing** -- add contacts to automations and trigger campaign workflows
- **Track sales deals** -- create and update deals in your CRM pipeline
- **Organize subscribers** -- manage lists, tags, and contact segmentation
- **Build lead nurturing flows** -- combine contacts, tags, lists, and automations into multi-step workflows
- **Sync CRM data** -- pull contacts, deals, and campaign data into other systems


## Quick Reference

| Function | Description | Returns |
|----------|-------------|---------|
| [`setCredentials`](#setcredentials) | Configure API credentials (account name + token) | `string` |
| [`listContacts`](#listcontacts) | List all contacts, optionally filtered | `{ contacts, meta }` |
| [`getContact`](#getcontact) | Get a single contact by ID | `{ contact }` |
| [`createContact`](#createcontact) | Create a new contact | `{ contact }` |
| [`updateContact`](#updatecontact) | Update an existing contact by ID | `{ contact }` |
| [`deleteContact`](#deletecontact) | Delete a contact by ID | `{}` |
| [`listLists`](#listlists) | List all mailing lists | `{ lists, meta }` |
| [`getList`](#getlist) | Get a mailing list by ID | `{ list }` |
| [`createList`](#createlist) | Create a new mailing list | `{ list }` |
| [`addContactToList`](#addcontacttolist) | Subscribe a contact to a list | `{ contactList }` |
| [`removeContactFromList`](#removecontactfromlist) | Unsubscribe a contact from a list | `{}` |
| [`listTags`](#listtags) | List all tags | `{ tags, meta }` |
| [`createTag`](#createtag) | Create a new tag | `{ tag }` |
| [`addTagToContact`](#addtagtocontact) | Apply a tag to a contact | `{ contactTag }` |
| [`removeTagFromContact`](#removetagfromcontact) | Remove a tag from a contact | `{}` |
| [`listAutomations`](#listautomations) | List all automations | `{ automations, meta }` |
| [`addContactToAutomation`](#addcontacttoautomation) | Enroll a contact into an automation | `{ contactAutomation }` |
| [`listDeals`](#listdeals) | List all deals in the CRM | `{ deals, meta }` |
| [`createDeal`](#createdeal) | Create a new deal | `{ deal }` |
| [`updateDeal`](#updatedeal) | Update an existing deal by ID | `{ deal }` |
| [`listCampaigns`](#listcampaigns) | List all email campaigns | `{ campaigns, meta }` |


## Functions

### setCredentials

Configure ActiveCampaign API credentials. Must be called before any other function.

**Module:** `activecampaign` | **Returns:** `string` -- `"Activecampaign credentials configured."`

```robinpath
activecampaign.setCredentials "mycompany" "your-api-token"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountName` | `string` | Yes | Your ActiveCampaign account subdomain (e.g., `"mycompany"`) |
| `apiToken` | `string` | Yes | Your ActiveCampaign API token from Settings > Developer |

**Errors:**
- `"activecampaign.setCredentials requires accountName, apiToken."` -- one or both arguments missing

---

### listContacts

Retrieve a paginated list of all contacts in your account.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
set $result as activecampaign.listContacts
set $contacts as $result.contacts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments to list all contacts |

**Return shape:**
```json
{
  "contacts": [
    { "id": "1", "email": "jane@example.com", "firstName": "Jane", "lastName": "Doe", "phone": "+1234567890", "cdate": "2024-01-15T10:30:00-05:00" }
  ],
  "meta": { "total": "150" }
}
```

---

### getContact

Retrieve a single contact by their ID.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
set $result as activecampaign.getContact "42"
set $email as $result.contact.email
set $name as $result.contact.firstName
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | The contact ID to retrieve |

**Return shape:**
```json
{
  "contact": {
    "id": "42",
    "email": "jane@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "phone": "+1234567890",
    "cdate": "2024-01-15T10:30:00-05:00",
    "udate": "2024-06-20T14:00:00-05:00"
  }
}
```

---

### createContact

Create a new contact in ActiveCampaign.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
set $result as activecampaign.createContact {"email": "jane@example.com", "firstName": "Jane", "lastName": "Doe", "phone": "+1234567890"}
set $newId as $result.contact.id
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | Yes | Contact fields: `email` (required), `firstName`, `lastName`, `phone` |

**Accepted fields in data object:**

| Field | Type | Description |
|-------|------|-------------|
| `email` | `string` | Contact email address (required) |
| `firstName` | `string` | First name |
| `lastName` | `string` | Last name |
| `phone` | `string` | Phone number |

**Return shape:**
```json
{
  "contact": {
    "id": "55",
    "email": "jane@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "phone": "+1234567890",
    "cdate": "2024-06-20T14:00:00-05:00"
  }
}
```

---

### updateContact

Update an existing contact's fields by their ID.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
set $result as activecampaign.updateContact "42" {"firstName": "Janet", "phone": "+9876543210"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | The contact ID to update |
| `data` | `object` | Yes | Fields to update (same fields as `createContact`) |

**Return shape:**
```json
{
  "contact": {
    "id": "42",
    "email": "jane@example.com",
    "firstName": "Janet",
    "lastName": "Doe",
    "phone": "+9876543210"
  }
}
```

**Errors:**
- `"activecampaign.updateContact requires an ID."` -- called without an ID argument

---

### deleteContact

Permanently delete a contact by ID.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
activecampaign.deleteContact "42"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | The contact ID to delete |

**Return shape:** empty object `{}` on success.

**Errors:**
- `"activecampaign.deleteContact requires an ID."` -- called without an ID argument

---

### listLists

Retrieve all mailing lists in the account.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
set $result as activecampaign.listLists
set $lists as $result.lists
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments to list all mailing lists |

**Return shape:**
```json
{
  "lists": [
    { "id": "1", "name": "Newsletter Subscribers", "stringid": "newsletter", "cdate": "2024-01-10T08:00:00-05:00", "subscriber_count": 1200 }
  ],
  "meta": { "total": "5" }
}
```

---

### getList

Get a specific mailing list by ID.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
set $result as activecampaign.getList "1"
set $name as $result.list.name
set $count as $result.list.subscriber_count
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | The list ID to retrieve |

**Return shape:**
```json
{
  "list": {
    "id": "1",
    "name": "Newsletter Subscribers",
    "stringid": "newsletter",
    "cdate": "2024-01-10T08:00:00-05:00",
    "subscriber_count": 1200
  }
}
```

---

### createList

Create a new mailing list.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
set $result as activecampaign.createList {"name": "VIP Customers", "stringid": "vip-customers"}
set $listId as $result.list.id
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | Yes | List fields: `name` (required), `stringid` (required) |

**Accepted fields in data object:**

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Display name of the list (required) |
| `stringid` | `string` | URL-safe identifier (required) |

**Return shape:**
```json
{
  "list": {
    "id": "6",
    "name": "VIP Customers",
    "stringid": "vip-customers"
  }
}
```

---

### addContactToList

Subscribe a contact to a mailing list.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
activecampaign.addContactToList {"list": "1", "contact": "42", "status": "1"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | Yes | Association object with `list`, `contact`, and `status` |

**Accepted fields in data object:**

| Field | Type | Description |
|-------|------|-------------|
| `list` | `string` | List ID to subscribe to (required) |
| `contact` | `string` | Contact ID to subscribe (required) |
| `status` | `string` | `"1"` = subscribed, `"2"` = unsubscribed (required) |

**Return shape:**
```json
{
  "contactList": {
    "contact": "42",
    "list": "1",
    "status": "1"
  }
}
```

---

### removeContactFromList

Unsubscribe a contact from a mailing list by the contact-list association ID.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
activecampaign.removeContactFromList "789"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | The contact-list association ID |

**Return shape:** empty object `{}` on success.

**Errors:**
- `"activecampaign.removeContactFromList requires an ID."` -- called without an ID argument

---

### listTags

List all tags in the account.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
set $result as activecampaign.listTags
set $tags as $result.tags
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments to list all tags |

**Return shape:**
```json
{
  "tags": [
    { "id": "1", "tag": "VIP", "tagType": "contact", "cdate": "2024-03-01T09:00:00-05:00" }
  ],
  "meta": { "total": "12" }
}
```

---

### createTag

Create a new tag.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
set $result as activecampaign.createTag {"tag": "VIP", "tagType": "contact"}
set $tagId as $result.tag.id
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | Yes | Tag fields: `tag` (required), `tagType` (required) |

**Accepted fields in data object:**

| Field | Type | Description |
|-------|------|-------------|
| `tag` | `string` | Tag name (required) |
| `tagType` | `string` | `"contact"` or `"deal"` (required) |

**Return shape:**
```json
{
  "tag": {
    "id": "13",
    "tag": "VIP",
    "tagType": "contact"
  }
}
```

---

### addTagToContact

Apply a tag to a contact.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
activecampaign.addTagToContact {"contact": "42", "tag": "5"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | Yes | Association object with `contact` and `tag` IDs |

**Accepted fields in data object:**

| Field | Type | Description |
|-------|------|-------------|
| `contact` | `string` | Contact ID (required) |
| `tag` | `string` | Tag ID (required) |

**Return shape:**
```json
{
  "contactTag": {
    "contact": "42",
    "tag": "5",
    "id": "201"
  }
}
```

> The returned `contactTag.id` is the association ID -- use it with `removeTagFromContact` to undo this operation.

---

### removeTagFromContact

Remove a tag from a contact by the contact-tag association ID.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
activecampaign.removeTagFromContact "201"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | The contact-tag association ID (returned by `addTagToContact`) |

**Return shape:** empty object `{}` on success.

**Errors:**
- `"activecampaign.removeTagFromContact requires an ID."` -- called without an ID argument

---

### listAutomations

List all automations in the account.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
set $result as activecampaign.listAutomations
set $automations as $result.automations
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments to list all automations |

**Return shape:**
```json
{
  "automations": [
    { "id": "1", "name": "Welcome Series", "status": "1", "cdate": "2024-02-01T12:00:00-05:00", "entered": 500, "exited": 350 }
  ],
  "meta": { "total": "8" }
}
```

---

### addContactToAutomation

Enroll a contact into an automation workflow.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
activecampaign.addContactToAutomation {"contact": "42", "automation": "1"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | Yes | Association object with `contact` and `automation` IDs |

**Accepted fields in data object:**

| Field | Type | Description |
|-------|------|-------------|
| `contact` | `string` | Contact ID (required) |
| `automation` | `string` | Automation ID (required) |

**Return shape:**
```json
{
  "contactAutomation": {
    "contact": "42",
    "automation": "1",
    "id": "305"
  }
}
```

---

### listDeals

List all deals in the CRM pipeline.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
set $result as activecampaign.listDeals
set $deals as $result.deals
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments to list all deals |

**Return shape:**
```json
{
  "deals": [
    { "id": "10", "title": "Enterprise Contract", "value": "50000", "currency": "usd", "stage": "2", "owner": "1", "cdate": "2024-04-15T10:00:00-05:00" }
  ],
  "meta": { "total": "25" }
}
```

---

### createDeal

Create a new deal in the CRM pipeline.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
set $result as activecampaign.createDeal {"title": "Enterprise Contract", "value": 50000, "currency": "usd"}
set $dealId as $result.deal.id
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `object` | Yes | Deal fields: `title` (required), plus optional `value`, `currency`, `stage`, `owner`, etc. |

**Accepted fields in data object:**

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Deal name (required) |
| `value` | `number` | Monetary value in minor unit |
| `currency` | `string` | Currency code, e.g., `"usd"`, `"eur"` |
| `stage` | `string` | Pipeline stage ID |
| `owner` | `string` | Owner user ID |
| `contact` | `string` | Associated contact ID |
| `group` | `string` | Pipeline/group ID |

**Return shape:**
```json
{
  "deal": {
    "id": "26",
    "title": "Enterprise Contract",
    "value": "50000",
    "currency": "usd",
    "stage": "1",
    "owner": "1"
  }
}
```

---

### updateDeal

Update an existing deal's fields by ID.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
set $result as activecampaign.updateDeal "10" {"value": 75000, "stage": "3"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | The deal ID to update |
| `data` | `object` | Yes | Fields to update (same fields as `createDeal`) |

**Return shape:**
```json
{
  "deal": {
    "id": "10",
    "title": "Enterprise Contract",
    "value": "75000",
    "currency": "usd",
    "stage": "3"
  }
}
```

**Errors:**
- `"activecampaign.updateDeal requires an ID."` -- called without an ID argument

---

### listCampaigns

List all email campaigns.

**Module:** `activecampaign` | **Returns:** `object`

```robinpath
set $result as activecampaign.listCampaigns
set $campaigns as $result.campaigns
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments to list all campaigns |

**Return shape:**
```json
{
  "campaigns": [
    { "id": "1", "name": "June Newsletter", "type": "single", "status": "5", "sdate": "2024-06-01T09:00:00-05:00", "send_amt": 1200 }
  ],
  "meta": { "total": "10" }
}
```


## Error Handling

All API functions throw on failure. Wrap calls in a `try/catch` or use `if` guards.

**Common errors:**

| Error | Cause | Fix |
|-------|-------|-----|
| `Activecampaign: "accountName" not configured` | Called a function before `setCredentials` | Call `setCredentials` first |
| `Activecampaign: "apiToken" not configured` | Called a function before `setCredentials` | Call `setCredentials` first |
| `Activecampaign API error (401)` | Invalid API token | Check your token in Settings > Developer |
| `Activecampaign API error (404)` | Resource not found (bad ID) | Verify the ID exists |
| `Activecampaign API error (422)` | Validation error (missing required fields) | Check required fields in the data object |

```robinpath
activecampaign.setCredentials $account $token
set $result as activecampaign.getContact "99999"
if $result.contact == null
  print "Contact not found"
end
```


## Recipes

### 1. Enroll a new subscriber into an automation

Create a contact and immediately add them to a marketing automation workflow.

```robinpath
activecampaign.setCredentials "myaccount" "tok_abc123"
set $result as activecampaign.createContact {"email": "newuser@example.com", "firstName": "Alex"}
set $contactId as $result.contact.id
activecampaign.addContactToAutomation {"contact": $contactId, "automation": "1"}
print "Enrolled contact " + $contactId + " into Welcome Series"
```

### 2. Tag and segment contacts into a list

Add a VIP tag to a contact and subscribe them to a premium mailing list.

```robinpath
activecampaign.setCredentials $account $token
set $tagResult as activecampaign.addTagToContact {"contact": "123", "tag": "5"}
activecampaign.addContactToList {"list": "2", "contact": "123", "status": "1"}
print "Contact 123 tagged as VIP and added to premium list"
```

### 3. Bulk-create contacts from a data source

Loop through a list of leads and create contacts for each one.

```robinpath
activecampaign.setCredentials $account $token
set $leads as [{"email": "a@test.com", "firstName": "Alice"}, {"email": "b@test.com", "firstName": "Bob"}, {"email": "c@test.com", "firstName": "Carol"}]
each $lead in $leads
  set $result as activecampaign.createContact $lead
  print "Created: " + $result.contact.email + " (ID: " + $result.contact.id + ")"
end
```

### 4. Create a deal linked to a contact

Create a contact and then open a sales deal tied to them.

```robinpath
activecampaign.setCredentials $account $token
set $contact as activecampaign.createContact {"email": "buyer@corp.com", "firstName": "Dana", "lastName": "Smith"}
set $deal as activecampaign.createDeal {"title": "Dana Smith - Annual Plan", "value": 12000, "currency": "usd", "contact": $contact.contact.id}
print "Deal created: " + $deal.deal.title + " ($" + $deal.deal.value + ")"
```

### 5. Move a deal through pipeline stages

Update a deal's stage and value as it progresses.

```robinpath
activecampaign.setCredentials $account $token
set $deals as activecampaign.listDeals
each $deal in $deals.deals
  if $deal.stage == "1"
    activecampaign.updateDeal $deal.id {"stage": "2", "value": 25000}
    print "Advanced deal: " + $deal.title
  end
end
```

### 6. Build a contact report with tags

List all contacts and display their information.

```robinpath
activecampaign.setCredentials $account $token
set $result as activecampaign.listContacts
each $contact in $result.contacts
  print $contact.firstName + " " + $contact.lastName + " <" + $contact.email + "> (ID: " + $contact.id + ")"
end
print "Total contacts: " + $result.meta.total
```

### 7. Create a tag, then apply it to multiple contacts

Create a new campaign tag and assign it to a list of contact IDs.

```robinpath
activecampaign.setCredentials $account $token
set $tag as activecampaign.createTag {"tag": "Summer-Sale-2024", "tagType": "contact"}
set $tagId as $tag.tag.id
set $contactIds as ["10", "22", "35", "48"]
each $id in $contactIds
  activecampaign.addTagToContact {"contact": $id, "tag": $tagId}
  print "Tagged contact " + $id
end
```

### 8. Full lead onboarding workflow

Complete workflow: create contact, add to list, apply tag, enroll in automation, and open a deal.

```robinpath
activecampaign.setCredentials $account $token

# Step 1: Create the contact
set $contact as activecampaign.createContact {"email": $leadEmail, "firstName": $leadName, "phone": $leadPhone}
set $cid as $contact.contact.id
print "Created contact: " + $cid

# Step 2: Subscribe to mailing list
activecampaign.addContactToList {"list": "1", "contact": $cid, "status": "1"}

# Step 3: Apply lead source tag
activecampaign.addTagToContact {"contact": $cid, "tag": "3"}

# Step 4: Enroll in welcome automation
activecampaign.addContactToAutomation {"contact": $cid, "automation": "1"}

# Step 5: Open a deal
activecampaign.createDeal {"title": $leadName + " - New Lead", "value": 5000, "currency": "usd", "contact": $cid}

print "Lead onboarding complete for " + $leadEmail
```


## Related Modules

- **hubspot** -- Full CRM with marketing, sales, and service hubs; alternative CRM integration
- **brevo** -- Alternative email marketing and transactional email platform
- **mailchimp** -- Email marketing with audience management and campaign analytics
- **slack** -- Send notifications to Slack channels when contacts are created or deals close
- **google-sheets** -- Export contact lists or deal pipelines to spreadsheets for reporting
- **json** -- Parse and construct the data objects required by ActiveCampaign functions
