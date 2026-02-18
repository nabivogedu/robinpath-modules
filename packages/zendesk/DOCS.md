---
title: "Zendesk"
module: "zendesk"
package: "@robinpath/zendesk"
description: "Zendesk module for RobinPath."
category: "utility"
tags: [zendesk, utility]
type: "utility"
auth: "api-key"
functionCount: 23
---

# Zendesk

> Zendesk module for RobinPath.

**Package:** `@robinpath/zendesk` | **Category:** Utility | **Type:** Utility


## Authentication

```robinpath
zendesk.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `zendesk` module when you need to:

- **listTickets** -- Use `zendesk.listTickets` to perform this operation
- **getTicket** -- Use `zendesk.getTicket` to perform this operation
- **createTicket** -- Use `zendesk.createTicket` to perform this operation
- **updateTicket** -- Use `zendesk.updateTicket` to perform this operation
- **deleteTicket** -- Use `zendesk.deleteTicket` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure zendesk credentials. | `object` |
| [`listTickets`](#listtickets) | listTickets | `object` |
| [`getTicket`](#getticket) | getTicket | `object` |
| [`createTicket`](#createticket) | createTicket | `object` |
| [`updateTicket`](#updateticket) | updateTicket | `object` |
| [`deleteTicket`](#deleteticket) | deleteTicket | `object` |
| [`listTicketComments`](#listticketcomments) | listTicketComments | `object` |
| [`addTicketComment`](#addticketcomment) | addTicketComment | `object` |
| [`listUsers`](#listusers) | listUsers | `object` |
| [`getUser`](#getuser) | getUser | `object` |
| [`createUser`](#createuser) | createUser | `object` |
| [`updateUser`](#updateuser) | updateUser | `object` |
| [`searchTickets`](#searchtickets) | searchTickets | `object` |
| [`listOrganizations`](#listorganizations) | listOrganizations | `object` |
| [`getOrganization`](#getorganization) | getOrganization | `object` |
| [`createOrganization`](#createorganization) | createOrganization | `object` |
| [`listGroups`](#listgroups) | listGroups | `object` |
| [`assignTicket`](#assignticket) | assignTicket | `object` |
| [`listViews`](#listviews) | listViews | `object` |
| [`listMacros`](#listmacros) | listMacros | `object` |
| [`getSatisfactionRatings`](#getsatisfactionratings) | getSatisfactionRatings | `object` |
| [`getTicketMetrics`](#getticketmetrics) | getTicketMetrics | `object` |
| [`mergeTickets`](#mergetickets) | mergeTickets | `object` |


## Functions

### setCredentials

Configure zendesk credentials.

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `subdomain` | `string` | Yes | subdomain |
| `email` | `string` | Yes | email |
| `apiToken` | `string` | Yes | apiToken |

---

### listTickets

listTickets

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.listTickets
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTicket

getTicket

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.getTicket
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createTicket

createTicket

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.createTicket
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateTicket

updateTicket

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.updateTicket
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteTicket

deleteTicket

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.deleteTicket
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTicketComments

listTicketComments

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.listTicketComments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addTicketComment

addTicketComment

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.addTicketComment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listUsers

listUsers

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.listUsers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUser

getUser

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.getUser
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createUser

createUser

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.createUser
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateUser

updateUser

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.updateUser
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchTickets

searchTickets

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.searchTickets
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listOrganizations

listOrganizations

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.listOrganizations
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getOrganization

getOrganization

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.getOrganization
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createOrganization

createOrganization

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.createOrganization
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listGroups

listGroups

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.listGroups
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### assignTicket

assignTicket

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.assignTicket
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listViews

listViews

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.listViews
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listMacros

listMacros

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.listMacros
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getSatisfactionRatings

getSatisfactionRatings

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.getSatisfactionRatings
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getTicketMetrics

getTicketMetrics

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.getTicketMetrics
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### mergeTickets

mergeTickets

**Module:** `zendesk` | **Returns:** `object` -- API response.

```robinpath
zendesk.mergeTickets
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Zendesk API error (${res.status}): ${t}` | Check the error message for details |
| `zendesk.setCredentials requires subdomain, email, apiToken.` | Check the error message for details |
| `zendesk.updateTicket requires an ID.` | Check the error message for details |
| `zendesk.deleteTicket requires an ID.` | Check the error message for details |
| `zendesk.updateUser requires an ID.` | Check the error message for details |
| `zendesk.mergeTickets requires an ID.` | Check the error message for details |
| `Zendesk: "..." not configured. Call zendesk.setCredentials first.` | Check the error message for details |

```robinpath
set $result as zendesk.listTickets
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
zendesk.setCredentials $token
set $result as zendesk.listTickets
each $item in $result
  print $item
end
```

### 2. Create a new item with createTicket

Create a new resource and capture the result.

```robinpath
zendesk.setCredentials $token
set $result as zendesk.createTicket
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
zendesk.setCredentials $token
set $created as zendesk.createTicket
# Update the created item
zendesk.updateTicket
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
zendesk.setCredentials $token
set $existing as zendesk.listTickets
if $existing == null
  zendesk.createTicket
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Zendesk workflow

Chain multiple zendesk operations together.

```robinpath
zendesk.setCredentials $token
set $r_listTickets as zendesk.listTickets
set $r_getTicket as zendesk.getTicket
set $r_createTicket as zendesk.createTicket
print "All operations complete"
```

### 6. Safe listTickets with validation

Check results before proceeding.

```robinpath
zendesk.setCredentials $token
set $result as zendesk.listTickets
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
