---
title: "Invoice"
module: "invoice"
package: "@robinpath/invoice"
description: "Invoice module for RobinPath."
category: "finance"
tags: [invoice, finance]
type: "integration"
auth: "none"
functionCount: 14
---

# Invoice

> Invoice module for RobinPath.

**Package:** `@robinpath/invoice` | **Category:** Finance | **Type:** Integration


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `invoice` module when you need to:

- **createInvoice** -- Use `invoice.createInvoice` to perform this operation
- **addLineItem** -- Use `invoice.addLineItem` to perform this operation
- **removeLineItem** -- Use `invoice.removeLineItem` to perform this operation
- **calculateTotals** -- Use `invoice.calculateTotals` to perform this operation
- **addDiscount** -- Use `invoice.addDiscount` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`createInvoice`](#createinvoice) | createInvoice | `object` |
| [`addLineItem`](#addlineitem) | addLineItem | `object` |
| [`removeLineItem`](#removelineitem) | removeLineItem | `object` |
| [`setCompanyInfo`](#setcompanyinfo) | setCompanyInfo | `object` |
| [`setClientInfo`](#setclientinfo) | setClientInfo | `object` |
| [`calculateTotals`](#calculatetotals) | calculateTotals | `object` |
| [`addDiscount`](#adddiscount) | addDiscount | `object` |
| [`addNote`](#addnote) | addNote | `object` |
| [`setPaymentTerms`](#setpaymentterms) | setPaymentTerms | `object` |
| [`setCurrency`](#setcurrency) | setCurrency | `object` |
| [`formatInvoice`](#formatinvoice) | formatInvoice | `object` |
| [`duplicateInvoice`](#duplicateinvoice) | duplicateInvoice | `object` |
| [`markAsPaid`](#markaspaid) | markAsPaid | `object` |
| [`generateInvoiceNumber`](#generateinvoicenumber) | generateInvoiceNumber | `object` |


## Functions

### createInvoice

createInvoice

**Module:** `invoice` | **Returns:** `object` -- API response.

```robinpath
invoice.createInvoice
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addLineItem

addLineItem

**Module:** `invoice` | **Returns:** `object` -- API response.

```robinpath
invoice.addLineItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### removeLineItem

removeLineItem

**Module:** `invoice` | **Returns:** `object` -- API response.

```robinpath
invoice.removeLineItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### setCompanyInfo

setCompanyInfo

**Module:** `invoice` | **Returns:** `object` -- API response.

```robinpath
invoice.setCompanyInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### setClientInfo

setClientInfo

**Module:** `invoice` | **Returns:** `object` -- API response.

```robinpath
invoice.setClientInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### calculateTotals

calculateTotals

**Module:** `invoice` | **Returns:** `object` -- API response.

```robinpath
invoice.calculateTotals
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addDiscount

addDiscount

**Module:** `invoice` | **Returns:** `object` -- API response.

```robinpath
invoice.addDiscount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### addNote

addNote

**Module:** `invoice` | **Returns:** `object` -- API response.

```robinpath
invoice.addNote
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### setPaymentTerms

setPaymentTerms

**Module:** `invoice` | **Returns:** `object` -- API response.

```robinpath
invoice.setPaymentTerms
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### setCurrency

setCurrency

**Module:** `invoice` | **Returns:** `object` -- API response.

```robinpath
invoice.setCurrency
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### formatInvoice

formatInvoice

**Module:** `invoice` | **Returns:** `object` -- API response.

```robinpath
invoice.formatInvoice
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### duplicateInvoice

duplicateInvoice

**Module:** `invoice` | **Returns:** `object` -- API response.

```robinpath
invoice.duplicateInvoice
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### markAsPaid

markAsPaid

**Module:** `invoice` | **Returns:** `object` -- API response.

```robinpath
invoice.markAsPaid
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### generateInvoiceNumber

generateInvoiceNumber

**Module:** `invoice` | **Returns:** `object` -- API response.

```robinpath
invoice.generateInvoiceNumber
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Invoice: "..." not configured. Call invoice.setCredentials first.` | Check the error message for details |

```robinpath
set $result as invoice.createInvoice
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with createInvoice

Create a new resource and capture the result.

```robinpath
set $result as invoice.createInvoice
print "Created: " + $result
```

### 2. Multi-step Invoice workflow

Chain multiple invoice operations together.

```robinpath
set $r_createInvoice as invoice.createInvoice
set $r_addLineItem as invoice.addLineItem
set $r_removeLineItem as invoice.removeLineItem
print "All operations complete"
```

### 3. Safe createInvoice with validation

Check results before proceeding.

```robinpath
set $result as invoice.createInvoice
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **quickbooks** -- QuickBooks module for complementary functionality
- **xero** -- Xero module for complementary functionality
- **freshbooks** -- FreshBooks module for complementary functionality
- **json** -- JSON module for complementary functionality
