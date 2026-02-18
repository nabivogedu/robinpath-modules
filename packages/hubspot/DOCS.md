---
title: "HubSpot"
module: "hubspot"
package: "@robinpath/hubspot"
description: "HubSpot module for RobinPath."
category: "crm"
tags: [hubspot, crm]
type: "integration"
auth: "bearer-token"
functionCount: 12
baseUrl: "https://api.hubapi.com"
---

# HubSpot

> HubSpot module for RobinPath.

**Package:** `@robinpath/hubspot` | **Category:** Crm | **Type:** Integration


## Authentication

```robinpath
hubspot.setToken "pat-xxx"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `hubspot` module when you need to:

- **Create a new contact in HubSpot.** -- Use `hubspot.createContact` to perform this operation
- **Get a contact by ID.** -- Use `hubspot.getContact` to perform this operation
- **Update a contact's properties.** -- Use `hubspot.updateContact` to perform this operation
- **List contacts with pagination.** -- Use `hubspot.listContacts` to perform this operation
- **Search contacts by query string.** -- Use `hubspot.searchContacts` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setToken`](#settoken) | Set the HubSpot private app access token. | `Confirmation message.` |
| [`createContact`](#createcontact) | Create a new contact in HubSpot. | `Created contact object.` |
| [`getContact`](#getcontact) | Get a contact by ID. | `Contact object.` |
| [`updateContact`](#updatecontact) | Update a contact's properties. | `Updated contact object.` |
| [`listContacts`](#listcontacts) | List contacts with pagination. | `Contacts list with paging.` |
| [`searchContacts`](#searchcontacts) | Search contacts by query string. | `Search results.` |
| [`createDeal`](#createdeal) | Create a new deal in HubSpot. | `Created deal object.` |
| [`getDeal`](#getdeal) | Get a deal by ID. | `Deal object.` |
| [`updateDeal`](#updatedeal) | Update a deal's properties. | `Updated deal object.` |
| [`listDeals`](#listdeals) | List deals with pagination. | `Deals list with paging.` |
| [`createCompany`](#createcompany) | Create a new company in HubSpot. | `Created company object.` |
| [`getCompany`](#getcompany) | Get a company by ID. | `Company object.` |


## Functions

### setToken

Set the HubSpot private app access token.

**Module:** `hubspot` | **Returns:** `string` -- Confirmation message.

```robinpath
hubspot.setToken "pat-xxx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | `string` | Yes | HubSpot access token |

---

### createContact

Create a new contact in HubSpot.

**Module:** `hubspot` | **Returns:** `object` -- Created contact object.

```robinpath
hubspot.createContact {"email":"john@example.com","firstname":"John","lastname":"Doe"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `properties` | `object` | Yes | Contact properties (email, firstname, lastname, etc.) |

---

### getContact

Get a contact by ID.

**Module:** `hubspot` | **Returns:** `object` -- Contact object.

```robinpath
hubspot.getContact "123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `contactId` | `string` | Yes | Contact ID |
| `properties` | `array` | No | Properties to return |

---

### updateContact

Update a contact's properties.

**Module:** `hubspot` | **Returns:** `object` -- Updated contact object.

```robinpath
hubspot.updateContact "123" {"phone":"+1234567890"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `contactId` | `string` | Yes | Contact ID |
| `properties` | `object` | Yes | Properties to update |

---

### listContacts

List contacts with pagination.

**Module:** `hubspot` | **Returns:** `object` -- Contacts list with paging.

```robinpath
hubspot.listContacts {"limit":10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: limit, after, properties |

---

### searchContacts

Search contacts by query string.

**Module:** `hubspot` | **Returns:** `object` -- Search results.

```robinpath
hubspot.searchContacts "john@example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | Yes | Search query |
| `options` | `object` | No | Options: limit, properties, filterGroups |

---

### createDeal

Create a new deal in HubSpot.

**Module:** `hubspot` | **Returns:** `object` -- Created deal object.

```robinpath
hubspot.createDeal {"dealname":"Big Deal","amount":"10000","dealstage":"appointmentscheduled"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `properties` | `object` | Yes | Deal properties (dealname, amount, dealstage, etc.) |

---

### getDeal

Get a deal by ID.

**Module:** `hubspot` | **Returns:** `object` -- Deal object.

```robinpath
hubspot.getDeal "456"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dealId` | `string` | Yes | Deal ID |
| `properties` | `array` | No | Properties to return |

---

### updateDeal

Update a deal's properties.

**Module:** `hubspot` | **Returns:** `object` -- Updated deal object.

```robinpath
hubspot.updateDeal "456" {"amount":"20000"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dealId` | `string` | Yes | Deal ID |
| `properties` | `object` | Yes | Properties to update |

---

### listDeals

List deals with pagination.

**Module:** `hubspot` | **Returns:** `object` -- Deals list with paging.

```robinpath
hubspot.listDeals {"limit":10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: limit, after, properties |

---

### createCompany

Create a new company in HubSpot.

**Module:** `hubspot` | **Returns:** `object` -- Created company object.

```robinpath
hubspot.createCompany {"name":"Acme Inc","domain":"acme.com"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `properties` | `object` | Yes | Company properties (name, domain, industry, etc.) |

---

### getCompany

Get a company by ID.

**Module:** `hubspot` | **Returns:** `object` -- Company object.

```robinpath
hubspot.getCompany "789"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `companyId` | `string` | Yes | Company ID |
| `properties` | `array` | No | Properties to return |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `HubSpot: token not configured. Call hubspot.setToken first.` | Check the error message for details |
| `HubSpot API error (${res.status}): ${text}` | Check the error message for details |
| `hubspot.setToken requires a token.` | Check the error message for details |
| `hubspot.createContact requires properties.` | Check the error message for details |
| `hubspot.getContact requires a contactId.` | Check the error message for details |
| `hubspot.updateContact requires contactId and properties.` | Check the error message for details |
| `hubspot.searchContacts requires a query.` | Check the error message for details |
| `hubspot.createDeal requires properties.` | Check the error message for details |

```robinpath
set $result as hubspot.createContact {"email":"john@example.com","firstname":"John","lastname":"Doe"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Contact

Retrieve all items and loop through them.

```robinpath
hubspot.setToken $token
set $result as hubspot.getContact "123"
each $item in $result
  print $item
end
```

### 2. Create a new item with createContact

Create a new resource and capture the result.

```robinpath
hubspot.setToken $token
set $result as hubspot.createContact {"email":"john@example.com","firstname":"John","lastname":"Doe"}
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
hubspot.setToken $token
set $created as hubspot.createContact {"email":"john@example.com","firstname":"John","lastname":"Doe"}
# Update the created item
hubspot.updateContact "123" {"phone":"+1234567890"}
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
hubspot.setToken $token
set $existing as hubspot.getContact "123"
if $existing == null
  hubspot.createContact {"email":"john@example.com","firstname":"John","lastname":"Doe"}
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step HubSpot workflow

Chain multiple hubspot operations together.

```robinpath
hubspot.setToken $token
set $r_createContact as hubspot.createContact {"email":"john@example.com","firstname":"John","lastname":"Doe"}
set $r_getContact as hubspot.getContact "123"
set $r_updateContact as hubspot.updateContact "123" {"phone":"+1234567890"}
print "All operations complete"
```

### 6. Safe createContact with validation

Check results before proceeding.

```robinpath
hubspot.setToken $token
set $result as hubspot.createContact {"email":"john@example.com","firstname":"John","lastname":"Doe"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **salesforce** -- Salesforce module for complementary functionality
- **pipedrive** -- Pipedrive module for complementary functionality
- **freshdesk** -- Freshdesk module for complementary functionality
- **intercom** -- Intercom module for complementary functionality
- **zoho** -- Zoho module for complementary functionality
