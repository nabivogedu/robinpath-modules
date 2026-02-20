---
title: "Square"
module: "square"
package: "@robinpath/square"
description: "Square module for RobinPath."
category: "ecommerce"
tags: [square, ecommerce]
type: "integration"
auth: "api-key"
functionCount: 21
baseUrl: "https://connect.squareup.com"
---

# Square

> Square module for RobinPath.

**Package:** `@robinpath/square` | **Category:** Ecommerce | **Type:** Integration


## Authentication

```robinpath
square.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `square` module when you need to:

- **listCatalogItems** -- Use `square.listCatalogItems` to perform this operation
- **getCatalogItem** -- Use `square.getCatalogItem` to perform this operation
- **upsertCatalogObject** -- Use `square.upsertCatalogObject` to perform this operation
- **deleteCatalogObject** -- Use `square.deleteCatalogObject` to perform this operation
- **searchCatalog** -- Use `square.searchCatalog` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure square credentials. | `object` |
| [`listCatalogItems`](#listcatalogitems) | listCatalogItems | `object` |
| [`getCatalogItem`](#getcatalogitem) | getCatalogItem | `object` |
| [`upsertCatalogObject`](#upsertcatalogobject) | upsertCatalogObject | `object` |
| [`deleteCatalogObject`](#deletecatalogobject) | deleteCatalogObject | `object` |
| [`searchCatalog`](#searchcatalog) | searchCatalog | `object` |
| [`listCustomers`](#listcustomers) | listCustomers | `object` |
| [`getCustomer`](#getcustomer) | getCustomer | `object` |
| [`createCustomer`](#createcustomer) | createCustomer | `object` |
| [`updateCustomer`](#updatecustomer) | updateCustomer | `object` |
| [`deleteCustomer`](#deletecustomer) | deleteCustomer | `object` |
| [`listOrders`](#listorders) | listOrders | `object` |
| [`getOrder`](#getorder) | getOrder | `object` |
| [`createOrder`](#createorder) | createOrder | `object` |
| [`listLocations`](#listlocations) | listLocations | `object` |
| [`getLocation`](#getlocation) | getLocation | `object` |
| [`listInventory`](#listinventory) | listInventory | `object` |
| [`adjustInventory`](#adjustinventory) | adjustInventory | `object` |
| [`retrieveInventoryCount`](#retrieveinventorycount) | retrieveInventoryCount | `object` |
| [`getMerchant`](#getmerchant) | getMerchant | `object` |
| [`listPayments`](#listpayments) | listPayments | `object` |


## Functions

### setCredentials

Configure square credentials.

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### listCatalogItems

listCatalogItems

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.listCatalogItems
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCatalogItem

getCatalogItem

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.getCatalogItem
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### upsertCatalogObject

upsertCatalogObject

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.upsertCatalogObject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteCatalogObject

deleteCatalogObject

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.deleteCatalogObject
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchCatalog

searchCatalog

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.searchCatalog
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listCustomers

listCustomers

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.listCustomers
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCustomer

getCustomer

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.getCustomer
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createCustomer

createCustomer

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.createCustomer
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateCustomer

updateCustomer

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.updateCustomer
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteCustomer

deleteCustomer

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.deleteCustomer
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listOrders

listOrders

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.listOrders
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getOrder

getOrder

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.getOrder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createOrder

createOrder

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.createOrder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listLocations

listLocations

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.listLocations
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getLocation

getLocation

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.getLocation
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listInventory

listInventory

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.listInventory
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### adjustInventory

adjustInventory

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.adjustInventory
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### retrieveInventoryCount

retrieveInventoryCount

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.retrieveInventoryCount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getMerchant

getMerchant

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.getMerchant
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPayments

listPayments

**Module:** `square` | **Returns:** `object` -- API response.

```robinpath
square.listPayments
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Square API error (${res.status}): ${t}` | Check the error message for details |
| `square.setCredentials requires accessToken.` | Check the error message for details |
| `square.deleteCatalogObject requires an ID.` | Check the error message for details |
| `square.updateCustomer requires an ID.` | Check the error message for details |
| `square.deleteCustomer requires an ID.` | Check the error message for details |
| `square.adjustInventory requires an ID.` | Check the error message for details |
| `Square: "..." not configured. Call square.setCredentials first.` | Check the error message for details |

```robinpath
set $result as square.listCatalogItems
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate CatalogItems

Retrieve all items and loop through them.

```robinpath
square.setCredentials $token
set $result as square.listCatalogItems
each $item in $result
  print $item
end
```

### 2. Create a new item with createCustomer

Create a new resource and capture the result.

```robinpath
square.setCredentials $token
set $result as square.createCustomer
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
square.setCredentials $token
set $created as square.createCustomer
# Update the created item
square.updateCustomer
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
square.setCredentials $token
set $existing as square.listCatalogItems
if $existing == null
  square.createCustomer
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Square workflow

Chain multiple square operations together.

```robinpath
square.setCredentials $token
set $r_listCatalogItems as square.listCatalogItems
set $r_getCatalogItem as square.getCatalogItem
set $r_upsertCatalogObject as square.upsertCatalogObject
print "All operations complete"
```

### 6. Safe listCatalogItems with validation

Check results before proceeding.

```robinpath
square.setCredentials $token
set $result as square.listCatalogItems
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **shopify** -- Shopify module for complementary functionality
- **woocommerce** -- WooCommerce module for complementary functionality
- **bigcommerce** -- BigCommerce module for complementary functionality
- **json** -- JSON module for complementary functionality
