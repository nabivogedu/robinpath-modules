---
title: "FreshBooks"
module: "freshbooks"
package: "@robinpath/freshbooks"
description: "FreshBooks module for RobinPath."
category: "finance"
tags: [freshbooks, finance]
type: "integration"
auth: "api-key"
functionCount: 19
baseUrl: "https://api.freshbooks.com"
---

# FreshBooks

> FreshBooks module for RobinPath.

**Package:** `@robinpath/freshbooks` | **Category:** Finance | **Type:** Integration


## Authentication

```robinpath
freshbooks.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `freshbooks` module when you need to:

- **listClients** -- Use `freshbooks.listClients` to perform this operation
- **getClient** -- Use `freshbooks.getClient` to perform this operation
- **createClient** -- Use `freshbooks.createClient` to perform this operation
- **updateClient** -- Use `freshbooks.updateClient` to perform this operation
- **listInvoices** -- Use `freshbooks.listInvoices` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure freshbooks credentials. | `object` |
| [`listClients`](#listclients) | listClients | `object` |
| [`getClient`](#getclient) | getClient | `object` |
| [`createClient`](#createclient) | createClient | `object` |
| [`updateClient`](#updateclient) | updateClient | `object` |
| [`listInvoices`](#listinvoices) | listInvoices | `object` |
| [`getInvoice`](#getinvoice) | getInvoice | `object` |
| [`createInvoice`](#createinvoice) | createInvoice | `object` |
| [`updateInvoice`](#updateinvoice) | updateInvoice | `object` |
| [`sendInvoice`](#sendinvoice) | sendInvoice | `object` |
| [`listExpenses`](#listexpenses) | listExpenses | `object` |
| [`getExpense`](#getexpense) | getExpense | `object` |
| [`createExpense`](#createexpense) | createExpense | `object` |
| [`listTimeEntries`](#listtimeentries) | listTimeEntries | `object` |
| [`createTimeEntry`](#createtimeentry) | createTimeEntry | `object` |
| [`listPayments`](#listpayments) | listPayments | `object` |
| [`createPayment`](#createpayment) | createPayment | `object` |
| [`getUser`](#getuser) | getUser | `object` |
| [`getAccount`](#getaccount) | getAccount | `object` |


## Functions

### setCredentials

Configure freshbooks credentials.

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |
| `accountId` | `string` | Yes | accountId |

---

### listClients

listClients

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.listClients
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getClient

getClient

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.getClient
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createClient

createClient

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.createClient
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateClient

updateClient

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.updateClient
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listInvoices

listInvoices

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.listInvoices
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getInvoice

getInvoice

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.getInvoice
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createInvoice

createInvoice

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.createInvoice
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateInvoice

updateInvoice

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.updateInvoice
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendInvoice

sendInvoice

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.sendInvoice
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listExpenses

listExpenses

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.listExpenses
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getExpense

getExpense

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.getExpense
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createExpense

createExpense

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.createExpense
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTimeEntries

listTimeEntries

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.listTimeEntries
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createTimeEntry

createTimeEntry

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.createTimeEntry
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPayments

listPayments

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.listPayments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createPayment

createPayment

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.createPayment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUser

getUser

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.getUser
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getAccount

getAccount

**Module:** `freshbooks` | **Returns:** `object` -- API response.

```robinpath
freshbooks.getAccount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Freshbooks API error (${res.status}): ${t}` | Check the error message for details |
| `freshbooks.setCredentials requires accessToken, accountId.` | Check the error message for details |
| `freshbooks.updateClient requires an ID.` | Check the error message for details |
| `freshbooks.updateInvoice requires an ID.` | Check the error message for details |
| `Freshbooks: "..." not configured. Call freshbooks.setCredentials first.` | Check the error message for details |

```robinpath
set $result as freshbooks.listClients
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Clients

Retrieve all items and loop through them.

```robinpath
freshbooks.setCredentials $token
set $result as freshbooks.listClients
each $item in $result
  print $item
end
```

### 2. Create a new item with createClient

Create a new resource and capture the result.

```robinpath
freshbooks.setCredentials $token
set $result as freshbooks.createClient
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
freshbooks.setCredentials $token
set $created as freshbooks.createClient
# Update the created item
freshbooks.updateClient
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
freshbooks.setCredentials $token
set $existing as freshbooks.listClients
if $existing == null
  freshbooks.createClient
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step FreshBooks workflow

Chain multiple freshbooks operations together.

```robinpath
freshbooks.setCredentials $token
set $r_listClients as freshbooks.listClients
set $r_getClient as freshbooks.getClient
set $r_createClient as freshbooks.createClient
print "All operations complete"
```

### 6. Safe listClients with validation

Check results before proceeding.

```robinpath
freshbooks.setCredentials $token
set $result as freshbooks.listClients
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **quickbooks** -- QuickBooks module for complementary functionality
- **xero** -- Xero module for complementary functionality
- **invoice** -- Invoice module for complementary functionality
- **json** -- JSON module for complementary functionality
