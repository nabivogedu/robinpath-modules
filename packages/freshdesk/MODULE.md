---
title: "Freshdesk"
module: "freshdesk"
package: "@robinpath/freshdesk"
description: "Freshdesk module for RobinPath."
category: "crm"
tags: [freshdesk, crm]
type: "integration"
auth: "api-key"
functionCount: 21
---

# Freshdesk

> Freshdesk module for RobinPath.

**Package:** `@robinpath/freshdesk` | **Category:** Crm | **Type:** Integration


## Authentication

```robinpath
freshdesk.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `freshdesk` module when you need to:

- **listTickets** -- Use `freshdesk.listTickets` to perform this operation
- **getTicket** -- Use `freshdesk.getTicket` to perform this operation
- **createTicket** -- Use `freshdesk.createTicket` to perform this operation
- **updateTicket** -- Use `freshdesk.updateTicket` to perform this operation
- **deleteTicket** -- Use `freshdesk.deleteTicket` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure freshdesk credentials. | `object` |
| [`listTickets`](#listtickets) | listTickets | `object` |
| [`getTicket`](#getticket) | getTicket | `object` |
| [`createTicket`](#createticket) | createTicket | `object` |
| [`updateTicket`](#updateticket) | updateTicket | `object` |
| [`deleteTicket`](#deleteticket) | deleteTicket | `object` |
| [`listTicketConversations`](#listticketconversations) | listTicketConversations | `object` |
| [`replyToTicket`](#replytoticket) | replyToTicket | `object` |
| [`addNoteToTicket`](#addnotetoticket) | addNoteToTicket | `object` |
| [`listContacts`](#listcontacts) | listContacts | `object` |
| [`getContact`](#getcontact) | getContact | `object` |
| [`createContact`](#createcontact) | createContact | `object` |
| [`updateContact`](#updatecontact) | updateContact | `object` |
| [`deleteContact`](#deletecontact) | deleteContact | `object` |
| [`listAgents`](#listagents) | listAgents | `object` |
| [`getAgent`](#getagent) | getAgent | `object` |
| [`listGroups`](#listgroups) | listGroups | `object` |
| [`listCompanies`](#listcompanies) | listCompanies | `object` |
| [`createCompany`](#createcompany) | createCompany | `object` |
| [`searchTickets`](#searchtickets) | searchTickets | `object` |
| [`filterTickets`](#filtertickets) | filterTickets | `object` |


## Functions

### setCredentials

Configure freshdesk credentials.

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | `string` | Yes | domain |
| `apiKey` | `string` | Yes | apiKey |

---

### listTickets

listTickets

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.listTickets
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTicket

getTicket

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.getTicket
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createTicket

createTicket

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.createTicket
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateTicket

updateTicket

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.updateTicket
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteTicket

deleteTicket

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.deleteTicket
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTicketConversations

listTicketConversations

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.listTicketConversations
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### replyToTicket

replyToTicket

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.replyToTicket
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addNoteToTicket

addNoteToTicket

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.addNoteToTicket
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listContacts

listContacts

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.listContacts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getContact

getContact

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.getContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createContact

createContact

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.createContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateContact

updateContact

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.updateContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteContact

deleteContact

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.deleteContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listAgents

listAgents

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.listAgents
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getAgent

getAgent

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.getAgent
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listGroups

listGroups

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.listGroups
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCompanies

listCompanies

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.listCompanies
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createCompany

createCompany

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.createCompany
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchTickets

searchTickets

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.searchTickets
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### filterTickets

filterTickets

**Module:** `freshdesk` | **Returns:** `object` -- API response.

```robinpath
freshdesk.filterTickets
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Freshdesk API error (${res.status}): ${t}` | Check the error message for details |
| `freshdesk.setCredentials requires domain, apiKey.` | Check the error message for details |
| `freshdesk.updateTicket requires an ID.` | Check the error message for details |
| `freshdesk.deleteTicket requires an ID.` | Check the error message for details |
| `freshdesk.updateContact requires an ID.` | Check the error message for details |
| `freshdesk.deleteContact requires an ID.` | Check the error message for details |
| `Freshdesk: "..." not configured. Call freshdesk.setCredentials first.` | Check the error message for details |

```robinpath
set $result as freshdesk.listTickets
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Tickets

Retrieve all items and loop through them.

```robinpath
freshdesk.setCredentials $token
set $result as freshdesk.listTickets
each $item in $result
  print $item
end
```

### 2. Create a new item with createTicket

Create a new resource and capture the result.

```robinpath
freshdesk.setCredentials $token
set $result as freshdesk.createTicket
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
freshdesk.setCredentials $token
set $created as freshdesk.createTicket
# Update the created item
freshdesk.updateTicket
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
freshdesk.setCredentials $token
set $existing as freshdesk.listTickets
if $existing == null
  freshdesk.createTicket
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Freshdesk workflow

Chain multiple freshdesk operations together.

```robinpath
freshdesk.setCredentials $token
set $r_listTickets as freshdesk.listTickets
set $r_getTicket as freshdesk.getTicket
set $r_createTicket as freshdesk.createTicket
print "All operations complete"
```

### 6. Safe listTickets with validation

Check results before proceeding.

```robinpath
freshdesk.setCredentials $token
set $result as freshdesk.listTickets
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **hubspot** -- HubSpot module for complementary functionality
- **salesforce** -- Salesforce module for complementary functionality
- **pipedrive** -- Pipedrive module for complementary functionality
- **intercom** -- Intercom module for complementary functionality
- **zoho** -- Zoho module for complementary functionality
