---
title: "Pipedrive"
module: "pipedrive"
package: "@robinpath/pipedrive"
description: "Pipedrive module for RobinPath."
category: "crm"
tags: [pipedrive, crm]
type: "integration"
auth: "api-key"
functionCount: 21
baseUrl: "https://api.pipedrive.com"
---

# Pipedrive

> Pipedrive module for RobinPath.

**Package:** `@robinpath/pipedrive` | **Category:** Crm | **Type:** Integration


## Authentication

```robinpath
pipedrive.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `pipedrive` module when you need to:

- **listDeals** -- Use `pipedrive.listDeals` to perform this operation
- **getDeal** -- Use `pipedrive.getDeal` to perform this operation
- **createDeal** -- Use `pipedrive.createDeal` to perform this operation
- **updateDeal** -- Use `pipedrive.updateDeal` to perform this operation
- **deleteDeal** -- Use `pipedrive.deleteDeal` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure pipedrive credentials. | `object` |
| [`listDeals`](#listdeals) | listDeals | `object` |
| [`getDeal`](#getdeal) | getDeal | `object` |
| [`createDeal`](#createdeal) | createDeal | `object` |
| [`updateDeal`](#updatedeal) | updateDeal | `object` |
| [`deleteDeal`](#deletedeal) | deleteDeal | `object` |
| [`listPersons`](#listpersons) | listPersons | `object` |
| [`getPerson`](#getperson) | getPerson | `object` |
| [`createPerson`](#createperson) | createPerson | `object` |
| [`updatePerson`](#updateperson) | updatePerson | `object` |
| [`deletePerson`](#deleteperson) | deletePerson | `object` |
| [`listOrganizations`](#listorganizations) | listOrganizations | `object` |
| [`getOrganization`](#getorganization) | getOrganization | `object` |
| [`createOrganization`](#createorganization) | createOrganization | `object` |
| [`updateOrganization`](#updateorganization) | updateOrganization | `object` |
| [`listActivities`](#listactivities) | listActivities | `object` |
| [`createActivity`](#createactivity) | createActivity | `object` |
| [`updateActivity`](#updateactivity) | updateActivity | `object` |
| [`listPipelines`](#listpipelines) | listPipelines | `object` |
| [`listStages`](#liststages) | listStages | `object` |
| [`searchDeals`](#searchdeals) | searchDeals | `object` |


## Functions

### setCredentials

Configure pipedrive credentials.

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiToken` | `string` | Yes | apiToken |

---

### listDeals

listDeals

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.listDeals
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getDeal

getDeal

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.getDeal
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createDeal

createDeal

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.createDeal
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateDeal

updateDeal

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.updateDeal
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteDeal

deleteDeal

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.deleteDeal
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPersons

listPersons

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.listPersons
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPerson

getPerson

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.getPerson
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createPerson

createPerson

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.createPerson
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updatePerson

updatePerson

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.updatePerson
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deletePerson

deletePerson

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.deletePerson
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listOrganizations

listOrganizations

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.listOrganizations
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getOrganization

getOrganization

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.getOrganization
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createOrganization

createOrganization

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.createOrganization
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateOrganization

updateOrganization

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.updateOrganization
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listActivities

listActivities

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.listActivities
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createActivity

createActivity

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.createActivity
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateActivity

updateActivity

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.updateActivity
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPipelines

listPipelines

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.listPipelines
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listStages

listStages

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.listStages
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### searchDeals

searchDeals

**Module:** `pipedrive` | **Returns:** `object` -- API response.

```robinpath
pipedrive.searchDeals
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Pipedrive API error (${res.status}): ${t}` | Check the error message for details |
| `pipedrive.setCredentials requires apiToken.` | Check the error message for details |
| `pipedrive.updateDeal requires an ID.` | Check the error message for details |
| `pipedrive.deleteDeal requires an ID.` | Check the error message for details |
| `pipedrive.updatePerson requires an ID.` | Check the error message for details |
| `pipedrive.deletePerson requires an ID.` | Check the error message for details |
| `pipedrive.updateOrganization requires an ID.` | Check the error message for details |
| `pipedrive.updateActivity requires an ID.` | Check the error message for details |

```robinpath
set $result as pipedrive.listDeals
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Deals

Retrieve all items and loop through them.

```robinpath
pipedrive.setCredentials $token
set $result as pipedrive.listDeals
each $item in $result
  print $item
end
```

### 2. Create a new item with createDeal

Create a new resource and capture the result.

```robinpath
pipedrive.setCredentials $token
set $result as pipedrive.createDeal
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
pipedrive.setCredentials $token
set $created as pipedrive.createDeal
# Update the created item
pipedrive.updateDeal
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
pipedrive.setCredentials $token
set $existing as pipedrive.listDeals
if $existing == null
  pipedrive.createDeal
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Pipedrive workflow

Chain multiple pipedrive operations together.

```robinpath
pipedrive.setCredentials $token
set $r_listDeals as pipedrive.listDeals
set $r_getDeal as pipedrive.getDeal
set $r_createDeal as pipedrive.createDeal
print "All operations complete"
```

### 6. Safe listDeals with validation

Check results before proceeding.

```robinpath
pipedrive.setCredentials $token
set $result as pipedrive.listDeals
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **hubspot** -- HubSpot module for complementary functionality
- **salesforce** -- Salesforce module for complementary functionality
- **freshdesk** -- Freshdesk module for complementary functionality
- **intercom** -- Intercom module for complementary functionality
- **zoho** -- Zoho module for complementary functionality
