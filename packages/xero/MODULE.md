---
title: "Xero"
module: "xero"
package: "@robinpath/xero"
description: "Xero module for RobinPath."
category: "finance"
tags: [xero, finance]
type: "integration"
auth: "api-key"
functionCount: 21
baseUrl: "https://api.xero.com"
---

# Xero

> Xero module for RobinPath.

**Package:** `@robinpath/xero` | **Category:** Finance | **Type:** Integration


## Authentication

```robinpath
xero.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `xero` module when you need to:

- **listInvoices** -- Use `xero.listInvoices` to perform this operation
- **getInvoice** -- Use `xero.getInvoice` to perform this operation
- **createInvoice** -- Use `xero.createInvoice` to perform this operation
- **updateInvoice** -- Use `xero.updateInvoice` to perform this operation
- **sendInvoice** -- Use `xero.sendInvoice` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure xero credentials. | `object` |
| [`listInvoices`](#listinvoices) | listInvoices | `object` |
| [`getInvoice`](#getinvoice) | getInvoice | `object` |
| [`createInvoice`](#createinvoice) | createInvoice | `object` |
| [`updateInvoice`](#updateinvoice) | updateInvoice | `object` |
| [`sendInvoice`](#sendinvoice) | sendInvoice | `object` |
| [`voidInvoice`](#voidinvoice) | voidInvoice | `object` |
| [`listContacts`](#listcontacts) | listContacts | `object` |
| [`getContact`](#getcontact) | getContact | `object` |
| [`createContact`](#createcontact) | createContact | `object` |
| [`updateContact`](#updatecontact) | updateContact | `object` |
| [`listAccounts`](#listaccounts) | listAccounts | `object` |
| [`getAccount`](#getaccount) | getAccount | `object` |
| [`listBankTransactions`](#listbanktransactions) | listBankTransactions | `object` |
| [`createBankTransaction`](#createbanktransaction) | createBankTransaction | `object` |
| [`listPayments`](#listpayments) | listPayments | `object` |
| [`createPayment`](#createpayment) | createPayment | `object` |
| [`listItems`](#listitems) | listItems | `object` |
| [`createItem`](#createitem) | createItem | `object` |
| [`getOrganization`](#getorganization) | getOrganization | `object` |
| [`getReport`](#getreport) | getReport | `object` |


## Functions

### setCredentials

Configure xero credentials.

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |
| `tenantId` | `string` | Yes | tenantId |

---

### listInvoices

listInvoices

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.listInvoices
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getInvoice

getInvoice

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.getInvoice
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createInvoice

createInvoice

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.createInvoice
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateInvoice

updateInvoice

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.updateInvoice
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendInvoice

sendInvoice

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.sendInvoice
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### voidInvoice

voidInvoice

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.voidInvoice
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listContacts

listContacts

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.listContacts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getContact

getContact

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.getContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createContact

createContact

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.createContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateContact

updateContact

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.updateContact
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listAccounts

listAccounts

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.listAccounts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getAccount

getAccount

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.getAccount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listBankTransactions

listBankTransactions

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.listBankTransactions
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createBankTransaction

createBankTransaction

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.createBankTransaction
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPayments

listPayments

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.listPayments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createPayment

createPayment

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.createPayment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listItems

listItems

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.listItems
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createItem

createItem

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.createItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getOrganization

getOrganization

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.getOrganization
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getReport

getReport

**Module:** `xero` | **Returns:** `object` -- API response.

```robinpath
xero.getReport
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Xero API error (${res.status}): ${t}` | Check the error message for details |
| `xero.setCredentials requires accessToken, tenantId.` | Check the error message for details |
| `xero.updateInvoice requires an ID.` | Check the error message for details |
| `xero.voidInvoice requires an ID.` | Check the error message for details |
| `xero.updateContact requires an ID.` | Check the error message for details |
| `Xero: "..." not configured. Call xero.setCredentials first.` | Check the error message for details |

```robinpath
set $result as xero.listInvoices
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Invoices

Retrieve all items and loop through them.

```robinpath
xero.setCredentials $token
set $result as xero.listInvoices
each $item in $result
  print $item
end
```

### 2. Create a new item with createInvoice

Create a new resource and capture the result.

```robinpath
xero.setCredentials $token
set $result as xero.createInvoice
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
xero.setCredentials $token
set $created as xero.createInvoice
# Update the created item
xero.updateInvoice
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
xero.setCredentials $token
set $existing as xero.listInvoices
if $existing == null
  xero.createInvoice
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Xero workflow

Chain multiple xero operations together.

```robinpath
xero.setCredentials $token
set $r_listInvoices as xero.listInvoices
set $r_getInvoice as xero.getInvoice
set $r_createInvoice as xero.createInvoice
print "All operations complete"
```

### 6. Safe listInvoices with validation

Check results before proceeding.

```robinpath
xero.setCredentials $token
set $result as xero.listInvoices
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **quickbooks** -- QuickBooks module for complementary functionality
- **freshbooks** -- FreshBooks module for complementary functionality
- **invoice** -- Invoice module for complementary functionality
- **json** -- JSON module for complementary functionality
