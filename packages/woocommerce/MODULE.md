---
title: "WooCommerce"
module: "woocommerce"
package: "@robinpath/woocommerce"
description: "WooCommerce module for RobinPath."
category: "ecommerce"
tags: [woocommerce, ecommerce]
type: "integration"
auth: "api-key"
functionCount: 23
---

# WooCommerce

> WooCommerce module for RobinPath.

**Package:** `@robinpath/woocommerce` | **Category:** Ecommerce | **Type:** Integration


## Authentication

```robinpath
woocommerce.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `woocommerce` module when you need to:

- **listProducts** -- Use `woocommerce.listProducts` to perform this operation
- **getProduct** -- Use `woocommerce.getProduct` to perform this operation
- **createProduct** -- Use `woocommerce.createProduct` to perform this operation
- **updateProduct** -- Use `woocommerce.updateProduct` to perform this operation
- **deleteProduct** -- Use `woocommerce.deleteProduct` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure woocommerce credentials. | `object` |
| [`listProducts`](#listproducts) | listProducts | `object` |
| [`getProduct`](#getproduct) | getProduct | `object` |
| [`createProduct`](#createproduct) | createProduct | `object` |
| [`updateProduct`](#updateproduct) | updateProduct | `object` |
| [`deleteProduct`](#deleteproduct) | deleteProduct | `object` |
| [`listOrders`](#listorders) | listOrders | `object` |
| [`getOrder`](#getorder) | getOrder | `object` |
| [`createOrder`](#createorder) | createOrder | `object` |
| [`updateOrder`](#updateorder) | updateOrder | `object` |
| [`deleteOrder`](#deleteorder) | deleteOrder | `object` |
| [`listCustomers`](#listcustomers) | listCustomers | `object` |
| [`getCustomer`](#getcustomer) | getCustomer | `object` |
| [`createCustomer`](#createcustomer) | createCustomer | `object` |
| [`updateCustomer`](#updatecustomer) | updateCustomer | `object` |
| [`listCategories`](#listcategories) | listCategories | `object` |
| [`createCategory`](#createcategory) | createCategory | `object` |
| [`listCoupons`](#listcoupons) | listCoupons | `object` |
| [`createCoupon`](#createcoupon) | createCoupon | `object` |
| [`getOrderNotes`](#getordernotes) | getOrderNotes | `object` |
| [`createOrderNote`](#createordernote) | createOrderNote | `object` |
| [`getReport`](#getreport) | getReport | `object` |
| [`listShipping`](#listshipping) | listShipping | `object` |


## Functions

### setCredentials

Configure woocommerce credentials.

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `siteUrl` | `string` | Yes | siteUrl |
| `consumerKey` | `string` | Yes | consumerKey |
| `consumerSecret` | `string` | Yes | consumerSecret |

---

### listProducts

listProducts

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.listProducts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getProduct

getProduct

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.getProduct
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createProduct

createProduct

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.createProduct
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateProduct

updateProduct

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.updateProduct
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteProduct

deleteProduct

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.deleteProduct
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listOrders

listOrders

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.listOrders
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getOrder

getOrder

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.getOrder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createOrder

createOrder

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.createOrder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateOrder

updateOrder

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.updateOrder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteOrder

deleteOrder

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.deleteOrder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCustomers

listCustomers

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.listCustomers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCustomer

getCustomer

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.getCustomer
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createCustomer

createCustomer

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.createCustomer
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateCustomer

updateCustomer

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.updateCustomer
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCategories

listCategories

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.listCategories
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createCategory

createCategory

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.createCategory
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCoupons

listCoupons

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.listCoupons
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createCoupon

createCoupon

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.createCoupon
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getOrderNotes

getOrderNotes

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.getOrderNotes
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createOrderNote

createOrderNote

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.createOrderNote
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getReport

getReport

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.getReport
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listShipping

listShipping

**Module:** `woocommerce` | **Returns:** `object` -- API response.

```robinpath
woocommerce.listShipping
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Woocommerce API error (${res.status}): ${t}` | Check the error message for details |
| `woocommerce.setCredentials requires siteUrl, consumerKey, consumerSecret.` | Check the error message for details |
| `woocommerce.updateProduct requires an ID.` | Check the error message for details |
| `woocommerce.deleteProduct requires an ID.` | Check the error message for details |
| `woocommerce.updateOrder requires an ID.` | Check the error message for details |
| `woocommerce.deleteOrder requires an ID.` | Check the error message for details |
| `woocommerce.updateCustomer requires an ID.` | Check the error message for details |
| `Woocommerce: "..." not configured. Call woocommerce.setCredentials first.` | Check the error message for details |

```robinpath
set $result as woocommerce.listProducts
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Products

Retrieve all items and loop through them.

```robinpath
woocommerce.setCredentials $token
set $result as woocommerce.listProducts
each $item in $result
  print $item
end
```

### 2. Create a new item with createProduct

Create a new resource and capture the result.

```robinpath
woocommerce.setCredentials $token
set $result as woocommerce.createProduct
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
woocommerce.setCredentials $token
set $created as woocommerce.createProduct
# Update the created item
woocommerce.updateProduct
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
woocommerce.setCredentials $token
set $existing as woocommerce.listProducts
if $existing == null
  woocommerce.createProduct
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step WooCommerce workflow

Chain multiple woocommerce operations together.

```robinpath
woocommerce.setCredentials $token
set $r_listProducts as woocommerce.listProducts
set $r_getProduct as woocommerce.getProduct
set $r_createProduct as woocommerce.createProduct
print "All operations complete"
```

### 6. Safe listProducts with validation

Check results before proceeding.

```robinpath
woocommerce.setCredentials $token
set $result as woocommerce.listProducts
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **shopify** -- Shopify module for complementary functionality
- **bigcommerce** -- BigCommerce module for complementary functionality
- **square** -- Square module for complementary functionality
- **json** -- JSON module for complementary functionality
