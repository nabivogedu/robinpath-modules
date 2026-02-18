---
title: "BigCommerce"
module: "bigcommerce"
package: "@robinpath/bigcommerce"
description: "BigCommerce module for RobinPath."
category: "ecommerce"
tags: [bigcommerce, ecommerce]
type: "integration"
auth: "api-key"
functionCount: 21
baseUrl: "https://api.bigcommerce.com"
---

# BigCommerce

> BigCommerce module for RobinPath.

**Package:** `@robinpath/bigcommerce` | **Category:** Ecommerce | **Type:** Integration


## Authentication

```robinpath
bigcommerce.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `bigcommerce` module when you need to:

- **listProducts** -- Use `bigcommerce.listProducts` to perform this operation
- **getProduct** -- Use `bigcommerce.getProduct` to perform this operation
- **createProduct** -- Use `bigcommerce.createProduct` to perform this operation
- **updateProduct** -- Use `bigcommerce.updateProduct` to perform this operation
- **deleteProduct** -- Use `bigcommerce.deleteProduct` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure bigcommerce credentials. | `object` |
| [`listProducts`](#listproducts) | listProducts | `object` |
| [`getProduct`](#getproduct) | getProduct | `object` |
| [`createProduct`](#createproduct) | createProduct | `object` |
| [`updateProduct`](#updateproduct) | updateProduct | `object` |
| [`deleteProduct`](#deleteproduct) | deleteProduct | `object` |
| [`listOrders`](#listorders) | listOrders | `object` |
| [`getOrder`](#getorder) | getOrder | `object` |
| [`updateOrder`](#updateorder) | updateOrder | `object` |
| [`listCustomers`](#listcustomers) | listCustomers | `object` |
| [`getCustomer`](#getcustomer) | getCustomer | `object` |
| [`createCustomer`](#createcustomer) | createCustomer | `object` |
| [`updateCustomer`](#updatecustomer) | updateCustomer | `object` |
| [`listCategories`](#listcategories) | listCategories | `object` |
| [`createCategory`](#createcategory) | createCategory | `object` |
| [`listBrands`](#listbrands) | listBrands | `object` |
| [`createBrand`](#createbrand) | createBrand | `object` |
| [`getOrderProducts`](#getorderproducts) | getOrderProducts | `object` |
| [`getStoreInfo`](#getstoreinfo) | getStoreInfo | `object` |
| [`listChannels`](#listchannels) | listChannels | `object` |
| [`getOrderShipments`](#getordershipments) | getOrderShipments | `object` |


## Functions

### setCredentials

Configure bigcommerce credentials.

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `storeHash` | `string` | Yes | storeHash |
| `accessToken` | `string` | Yes | accessToken |

---

### listProducts

listProducts

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.listProducts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getProduct

getProduct

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.getProduct
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createProduct

createProduct

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.createProduct
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateProduct

updateProduct

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.updateProduct
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteProduct

deleteProduct

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.deleteProduct
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listOrders

listOrders

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.listOrders
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getOrder

getOrder

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.getOrder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateOrder

updateOrder

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.updateOrder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCustomers

listCustomers

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.listCustomers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCustomer

getCustomer

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.getCustomer
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createCustomer

createCustomer

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.createCustomer
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateCustomer

updateCustomer

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.updateCustomer
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCategories

listCategories

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.listCategories
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createCategory

createCategory

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.createCategory
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listBrands

listBrands

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.listBrands
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createBrand

createBrand

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.createBrand
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getOrderProducts

getOrderProducts

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.getOrderProducts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getStoreInfo

getStoreInfo

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.getStoreInfo
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listChannels

listChannels

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.listChannels
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getOrderShipments

getOrderShipments

**Module:** `bigcommerce` | **Returns:** `object` -- API response.

```robinpath
bigcommerce.getOrderShipments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Bigcommerce API error (${res.status}): ${t}` | Check the error message for details |
| `bigcommerce.setCredentials requires storeHash, accessToken.` | Check the error message for details |
| `bigcommerce.updateProduct requires an ID.` | Check the error message for details |
| `bigcommerce.deleteProduct requires an ID.` | Check the error message for details |
| `bigcommerce.updateOrder requires an ID.` | Check the error message for details |
| `bigcommerce.updateCustomer requires an ID.` | Check the error message for details |
| `Bigcommerce: "..." not configured. Call bigcommerce.setCredentials first.` | Check the error message for details |

```robinpath
set $result as bigcommerce.listProducts
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
bigcommerce.setCredentials $token
set $result as bigcommerce.listProducts
each $item in $result
  print $item
end
```

### 2. Create a new item with createProduct

Create a new resource and capture the result.

```robinpath
bigcommerce.setCredentials $token
set $result as bigcommerce.createProduct
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
bigcommerce.setCredentials $token
set $created as bigcommerce.createProduct
# Update the created item
bigcommerce.updateProduct
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
bigcommerce.setCredentials $token
set $existing as bigcommerce.listProducts
if $existing == null
  bigcommerce.createProduct
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step BigCommerce workflow

Chain multiple bigcommerce operations together.

```robinpath
bigcommerce.setCredentials $token
set $r_listProducts as bigcommerce.listProducts
set $r_getProduct as bigcommerce.getProduct
set $r_createProduct as bigcommerce.createProduct
print "All operations complete"
```

### 6. Safe listProducts with validation

Check results before proceeding.

```robinpath
bigcommerce.setCredentials $token
set $result as bigcommerce.listProducts
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **shopify** -- Shopify module for complementary functionality
- **woocommerce** -- WooCommerce module for complementary functionality
- **square** -- Square module for complementary functionality
- **json** -- JSON module for complementary functionality
