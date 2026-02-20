---
title: "QuickBooks"
module: "quickbooks"
package: "@robinpath/quickbooks"
description: "QuickBooks module for RobinPath."
category: "finance"
tags: [quickbooks, finance]
type: "integration"
auth: "api-key"
functionCount: 21
baseUrl: "https://quickbooks.api.intuit.com"
---

# QuickBooks

> QuickBooks module for RobinPath.

**Package:** `@robinpath/quickbooks` | **Category:** Finance | **Type:** Integration


## Authentication

```robinpath
quickbooks.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `quickbooks` module when you need to:

- **query** -- Use `quickbooks.query` to perform this operation
- **getInvoice** -- Use `quickbooks.getInvoice` to perform this operation
- **createInvoice** -- Use `quickbooks.createInvoice` to perform this operation
- **sendInvoice** -- Use `quickbooks.sendInvoice` to perform this operation
- **voidInvoice** -- Use `quickbooks.voidInvoice` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure quickbooks credentials. | `object` |
| [`query`](#query) | query | `object` |
| [`getInvoice`](#getinvoice) | getInvoice | `object` |
| [`createInvoice`](#createinvoice) | createInvoice | `object` |
| [`sendInvoice`](#sendinvoice) | sendInvoice | `object` |
| [`voidInvoice`](#voidinvoice) | voidInvoice | `object` |
| [`getCustomer`](#getcustomer) | getCustomer | `object` |
| [`createCustomer`](#createcustomer) | createCustomer | `object` |
| [`updateCustomer`](#updatecustomer) | updateCustomer | `object` |
| [`listCustomers`](#listcustomers) | listCustomers | `object` |
| [`getPayment`](#getpayment) | getPayment | `object` |
| [`createPayment`](#createpayment) | createPayment | `object` |
| [`getExpense`](#getexpense) | getExpense | `object` |
| [`createExpense`](#createexpense) | createExpense | `object` |
| [`getItem`](#getitem) | getItem | `object` |
| [`createItem`](#createitem) | createItem | `object` |
| [`listItems`](#listitems) | listItems | `object` |
| [`getCompanyInfo`](#getcompanyinfo) | getCompanyInfo | `object` |
| [`getReport`](#getreport) | getReport | `object` |
| [`listAccounts`](#listaccounts) | listAccounts | `object` |
| [`createBill`](#createbill) | createBill | `object` |


## Functions

### setCredentials

Configure quickbooks credentials.

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `realmId` | `string` | Yes | realmId |
| `accessToken` | `string` | Yes | accessToken |

---

### query

query

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.query
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getInvoice

getInvoice

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.getInvoice
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createInvoice

createInvoice

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.createInvoice
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### sendInvoice

sendInvoice

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.sendInvoice
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### voidInvoice

voidInvoice

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.voidInvoice
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCustomer

getCustomer

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.getCustomer
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createCustomer

createCustomer

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.createCustomer
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateCustomer

updateCustomer

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.updateCustomer
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCustomers

listCustomers

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.listCustomers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPayment

getPayment

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.getPayment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createPayment

createPayment

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.createPayment
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getExpense

getExpense

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.getExpense
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createExpense

createExpense

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.createExpense
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getItem

getItem

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.getItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createItem

createItem

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.createItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listItems

listItems

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.listItems
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCompanyInfo

getCompanyInfo

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.getCompanyInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getReport

getReport

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.getReport
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listAccounts

listAccounts

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.listAccounts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createBill

createBill

**Module:** `quickbooks` | **Returns:** `object` -- API response.

```robinpath
quickbooks.createBill
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Quickbooks API error (${res.status}): ${t}` | Check the error message for details |
| `quickbooks.setCredentials requires realmId, accessToken.` | Check the error message for details |
| `quickbooks.voidInvoice requires an ID.` | Check the error message for details |
| `quickbooks.updateCustomer requires an ID.` | Check the error message for details |
| `Quickbooks: "..." not configured. Call quickbooks.setCredentials first.` | Check the error message for details |

```robinpath
set $result as quickbooks.query
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Invoice

Retrieve all items and loop through them.

```robinpath
quickbooks.setCredentials $token
set $result as quickbooks.getInvoice
each $item in $result
  print $item
end
```

### 2. Create a new item with createInvoice

Create a new resource and capture the result.

```robinpath
quickbooks.setCredentials $token
set $result as quickbooks.createInvoice
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
quickbooks.setCredentials $token
set $created as quickbooks.createInvoice
# Update the created item
quickbooks.updateCustomer
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
quickbooks.setCredentials $token
set $existing as quickbooks.getInvoice
if $existing == null
  quickbooks.createInvoice
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step QuickBooks workflow

Chain multiple quickbooks operations together.

```robinpath
quickbooks.setCredentials $token
set $r_query as quickbooks.query
set $r_getInvoice as quickbooks.getInvoice
set $r_createInvoice as quickbooks.createInvoice
print "All operations complete"
```

### 6. Safe query with validation

Check results before proceeding.

```robinpath
quickbooks.setCredentials $token
set $result as quickbooks.query
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **xero** -- Xero module for complementary functionality
- **freshbooks** -- FreshBooks module for complementary functionality
- **invoice** -- Invoice module for complementary functionality
- **json** -- JSON module for complementary functionality
