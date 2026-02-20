---
title: "Invoice Parser"
module: "invoice-parser"
package: "@robinpath/invoice-parser"
description: "Invoice Parser module for RobinPath."
category: "finance"
tags: [invoiceparser, finance]
type: "integration"
auth: "none"
functionCount: 12
---

# Invoice Parser

> Invoice Parser module for RobinPath.

**Package:** `@robinpath/invoice-parser` | **Category:** Finance | **Type:** Integration


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `invoice-parser` module when you need to:

- **parseInvoiceText** -- Use `invoice-parser.parseInvoiceText` to perform this operation
- **extractTotal** -- Use `invoice-parser.extractTotal` to perform this operation
- **extractDate** -- Use `invoice-parser.extractDate` to perform this operation
- **extractInvoiceNumber** -- Use `invoice-parser.extractInvoiceNumber` to perform this operation
- **extractLineItems** -- Use `invoice-parser.extractLineItems` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`parseInvoiceText`](#parseinvoicetext) | parseInvoiceText | `object` |
| [`extractTotal`](#extracttotal) | extractTotal | `object` |
| [`extractDate`](#extractdate) | extractDate | `object` |
| [`extractInvoiceNumber`](#extractinvoicenumber) | extractInvoiceNumber | `object` |
| [`extractLineItems`](#extractlineitems) | extractLineItems | `object` |
| [`extractVendorInfo`](#extractvendorinfo) | extractVendorInfo | `object` |
| [`extractTaxAmount`](#extracttaxamount) | extractTaxAmount | `object` |
| [`extractCurrency`](#extractcurrency) | extractCurrency | `object` |
| [`extractEmails`](#extractemails) | extractEmails | `object` |
| [`extractPhoneNumbers`](#extractphonenumbers) | extractPhoneNumbers | `object` |
| [`extractAddresses`](#extractaddresses) | extractAddresses | `object` |
| [`categorizeExpense`](#categorizeexpense) | categorizeExpense | `object` |


## Functions

### parseInvoiceText

parseInvoiceText

**Module:** `invoice-parser` | **Returns:** `object` -- API response.

```robinpath
invoice-parser.parseInvoiceText
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### extractTotal

extractTotal

**Module:** `invoice-parser` | **Returns:** `object` -- API response.

```robinpath
invoice-parser.extractTotal
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### extractDate

extractDate

**Module:** `invoice-parser` | **Returns:** `object` -- API response.

```robinpath
invoice-parser.extractDate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### extractInvoiceNumber

extractInvoiceNumber

**Module:** `invoice-parser` | **Returns:** `object` -- API response.

```robinpath
invoice-parser.extractInvoiceNumber
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### extractLineItems

extractLineItems

**Module:** `invoice-parser` | **Returns:** `object` -- API response.

```robinpath
invoice-parser.extractLineItems
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### extractVendorInfo

extractVendorInfo

**Module:** `invoice-parser` | **Returns:** `object` -- API response.

```robinpath
invoice-parser.extractVendorInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### extractTaxAmount

extractTaxAmount

**Module:** `invoice-parser` | **Returns:** `object` -- API response.

```robinpath
invoice-parser.extractTaxAmount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### extractCurrency

extractCurrency

**Module:** `invoice-parser` | **Returns:** `object` -- API response.

```robinpath
invoice-parser.extractCurrency
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### extractEmails

extractEmails

**Module:** `invoice-parser` | **Returns:** `object` -- API response.

```robinpath
invoice-parser.extractEmails
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### extractPhoneNumbers

extractPhoneNumbers

**Module:** `invoice-parser` | **Returns:** `object` -- API response.

```robinpath
invoice-parser.extractPhoneNumbers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### extractAddresses

extractAddresses

**Module:** `invoice-parser` | **Returns:** `object` -- API response.

```robinpath
invoice-parser.extractAddresses
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### categorizeExpense

categorizeExpense

**Module:** `invoice-parser` | **Returns:** `object` -- API response.

```robinpath
invoice-parser.categorizeExpense
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `InvoiceParser: "..." not configured. Call invoice-parser.setCredentials first.` | Check the error message for details |

```robinpath
set $result as invoice-parser.parseInvoiceText
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Invoice Parser workflow

Chain multiple invoice-parser operations together.

```robinpath
set $r_parseInvoiceText as invoice-parser.parseInvoiceText
set $r_extractTotal as invoice-parser.extractTotal
set $r_extractDate as invoice-parser.extractDate
print "All operations complete"
```

### 2. Safe parseInvoiceText with validation

Check results before proceeding.

```robinpath
set $result as invoice-parser.parseInvoiceText
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
- **invoice** -- Invoice module for complementary functionality
- **json** -- JSON module for complementary functionality
