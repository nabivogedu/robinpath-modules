---
title: "Shopify"
module: "shopify"
package: "@robinpath/shopify"
description: "Shopify module for RobinPath."
category: "ecommerce"
tags: [shopify, ecommerce]
type: "integration"
auth: "api-key"
functionCount: 12
---

# Shopify

> Shopify module for RobinPath.

**Package:** `@robinpath/shopify` | **Category:** Ecommerce | **Type:** Integration


## Authentication

```robinpath
shopify.setCredentials "my-store" "shpat_xxx"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `shopify` module when you need to:

- **List products in the store.** -- Use `shopify.listProducts` to perform this operation
- **Get a product by ID.** -- Use `shopify.getProduct` to perform this operation
- **Create a new product.** -- Use `shopify.createProduct` to perform this operation
- **Update an existing product.** -- Use `shopify.updateProduct` to perform this operation
- **List orders with optional filters.** -- Use `shopify.listOrders` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Set Shopify store credentials. | `Confirmation message.` |
| [`listProducts`](#listproducts) | List products in the store. | `Array of product objects.` |
| [`getProduct`](#getproduct) | Get a product by ID. | `Product object.` |
| [`createProduct`](#createproduct) | Create a new product. | `Created product object.` |
| [`updateProduct`](#updateproduct) | Update an existing product. | `Updated product object.` |
| [`listOrders`](#listorders) | List orders with optional filters. | `Array of order objects.` |
| [`getOrder`](#getorder) | Get an order by ID. | `Order object.` |
| [`listCustomers`](#listcustomers) | List customers. | `Array of customer objects.` |
| [`getCustomer`](#getcustomer) | Get a customer by ID. | `Customer object.` |
| [`getInventory`](#getinventory) | Get inventory levels for an item. | `Array of inventory level objects.` |
| [`countProducts`](#countproducts) | Get total product count. | `Number of products.` |
| [`countOrders`](#countorders) | Get total order count with optional status filter. | `Number of orders.` |


## Functions

### setCredentials

Set Shopify store credentials.

**Module:** `shopify` | **Returns:** `string` -- Confirmation message.

```robinpath
shopify.setCredentials "my-store" "shpat_xxx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `shop` | `string` | Yes | Shopify store name (e.g. 'my-store' from my-store.myshopify.com) |
| `accessToken` | `string` | Yes | Admin API access token |

---

### listProducts

List products in the store.

**Module:** `shopify` | **Returns:** `array` -- Array of product objects.

```robinpath
shopify.listProducts {"limit":10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: limit, page_info, collection_id, status |

---

### getProduct

Get a product by ID.

**Module:** `shopify` | **Returns:** `object` -- Product object.

```robinpath
shopify.getProduct "123456789"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productId` | `string` | Yes | Product ID |

---

### createProduct

Create a new product.

**Module:** `shopify` | **Returns:** `object` -- Created product object.

```robinpath
shopify.createProduct {"title":"New Product","body_html":"<p>Description</p>","vendor":"My Brand"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `product` | `object` | Yes | Product object (title, body_html, vendor, product_type, variants, etc.) |

---

### updateProduct

Update an existing product.

**Module:** `shopify` | **Returns:** `object` -- Updated product object.

```robinpath
shopify.updateProduct "123456789" {"title":"Updated Title"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productId` | `string` | Yes | Product ID |
| `product` | `object` | Yes | Fields to update |

---

### listOrders

List orders with optional filters.

**Module:** `shopify` | **Returns:** `array` -- Array of order objects.

```robinpath
shopify.listOrders {"status":"open","limit":25}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: limit, status, financial_status, fulfillment_status, since_id |

---

### getOrder

Get an order by ID.

**Module:** `shopify` | **Returns:** `object` -- Order object.

```robinpath
shopify.getOrder "987654321"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | `string` | Yes | Order ID |

---

### listCustomers

List customers.

**Module:** `shopify` | **Returns:** `array` -- Array of customer objects.

```robinpath
shopify.listCustomers {"limit":10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: limit, since_id |

---

### getCustomer

Get a customer by ID.

**Module:** `shopify` | **Returns:** `object` -- Customer object.

```robinpath
shopify.getCustomer "111222333"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `customerId` | `string` | Yes | Customer ID |

---

### getInventory

Get inventory levels for an item.

**Module:** `shopify` | **Returns:** `array` -- Array of inventory level objects.

```robinpath
shopify.getInventory "444555666"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `inventoryItemId` | `string` | Yes | Inventory item ID |

---

### countProducts

Get total product count.

**Module:** `shopify` | **Returns:** `number` -- Number of products.

```robinpath
shopify.countProducts
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### countOrders

Get total order count with optional status filter.

**Module:** `shopify` | **Returns:** `number` -- Number of orders.

```robinpath
shopify.countOrders {"status":"open"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: status (open, closed, any) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Shopify API error (${res.status}): ${text}` | Check the error message for details |
| `shopify.setCredentials requires shop name and access token.` | Check the error message for details |
| `shopify.getProduct requires a productId.` | Check the error message for details |
| `shopify.createProduct requires a product object.` | Check the error message for details |
| `shopify.updateProduct requires productId and product object.` | Check the error message for details |
| `shopify.getOrder requires an orderId.` | Check the error message for details |
| `shopify.getCustomer requires a customerId.` | Check the error message for details |
| `shopify.getInventory requires an inventoryItemId.` | Check the error message for details |

```robinpath
set $result as shopify.listProducts {"limit":10}
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
shopify.setCredentials $token
set $result as shopify.listProducts {"limit":10}
each $item in $result
  print $item
end
```

### 2. Create a new item with createProduct

Create a new resource and capture the result.

```robinpath
shopify.setCredentials $token
set $result as shopify.createProduct {"title":"New Product","body_html":"<p>Description</p>","vendor":"My Brand"}
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
shopify.setCredentials $token
set $created as shopify.createProduct {"title":"New Product","body_html":"<p>Description</p>","vendor":"My Brand"}
# Update the created item
shopify.updateProduct "123456789" {"title":"Updated Title"}
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
shopify.setCredentials $token
set $existing as shopify.listProducts {"limit":10}
if $existing == null
  shopify.createProduct {"title":"New Product","body_html":"<p>Description</p>","vendor":"My Brand"}
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Shopify workflow

Chain multiple shopify operations together.

```robinpath
shopify.setCredentials $token
set $r_listProducts as shopify.listProducts {"limit":10}
set $r_getProduct as shopify.getProduct "123456789"
set $r_createProduct as shopify.createProduct {"title":"New Product","body_html":"<p>Description</p>","vendor":"My Brand"}
print "All operations complete"
```

### 6. Safe listProducts with validation

Check results before proceeding.

```robinpath
shopify.setCredentials $token
set $result as shopify.listProducts {"limit":10}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **woocommerce** -- WooCommerce module for complementary functionality
- **bigcommerce** -- BigCommerce module for complementary functionality
- **square** -- Square module for complementary functionality
- **json** -- JSON module for complementary functionality
