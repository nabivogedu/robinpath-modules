---
title: "Clearbit"
module: "clearbit"
package: "@robinpath/clearbit"
description: "Clearbit module for RobinPath."
category: "utility"
tags: [clearbit, utility]
type: "utility"
auth: "api-key"
functionCount: 15
baseUrl: "https://person-stream.clearbit.com"
---

# Clearbit

> Clearbit module for RobinPath.

**Package:** `@robinpath/clearbit` | **Category:** Utility | **Type:** Utility


## Authentication

```robinpath
clearbit.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `clearbit` module when you need to:

- **enrichPerson** -- Use `clearbit.enrichPerson` to perform this operation
- **enrichCompany** -- Use `clearbit.enrichCompany` to perform this operation
- **findPerson** -- Use `clearbit.findPerson` to perform this operation
- **findCompany** -- Use `clearbit.findCompany` to perform this operation
- **revealVisitor** -- Use `clearbit.revealVisitor` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure clearbit credentials. | `object` |
| [`enrichPerson`](#enrichperson) | enrichPerson | `object` |
| [`enrichCompany`](#enrichcompany) | enrichCompany | `object` |
| [`findPerson`](#findperson) | findPerson | `object` |
| [`findCompany`](#findcompany) | findCompany | `object` |
| [`revealVisitor`](#revealvisitor) | revealVisitor | `object` |
| [`lookupEmail`](#lookupemail) | lookupEmail | `object` |
| [`lookupDomain`](#lookupdomain) | lookupDomain | `object` |
| [`autocompleteCompany`](#autocompletecompany) | autocompleteCompany | `object` |
| [`getPersonFlag`](#getpersonflag) | getPersonFlag | `object` |
| [`getCompanyFlag`](#getcompanyflag) | getCompanyFlag | `object` |
| [`prospectorSearch`](#prospectorsearch) | prospectorSearch | `object` |
| [`nameToEmail`](#nametoemail) | nameToEmail | `object` |
| [`listTags`](#listtags) | listTags | `object` |
| [`combined`](#combined) | combined | `object` |


## Functions

### setCredentials

Configure clearbit credentials.

**Module:** `clearbit` | **Returns:** `object` -- API response.

```robinpath
clearbit.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | Yes | apiKey |

---

### enrichPerson

enrichPerson

**Module:** `clearbit` | **Returns:** `object` -- API response.

```robinpath
clearbit.enrichPerson
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### enrichCompany

enrichCompany

**Module:** `clearbit` | **Returns:** `object` -- API response.

```robinpath
clearbit.enrichCompany
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### findPerson

findPerson

**Module:** `clearbit` | **Returns:** `object` -- API response.

```robinpath
clearbit.findPerson
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### findCompany

findCompany

**Module:** `clearbit` | **Returns:** `object` -- API response.

```robinpath
clearbit.findCompany
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### revealVisitor

revealVisitor

**Module:** `clearbit` | **Returns:** `object` -- API response.

```robinpath
clearbit.revealVisitor
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### lookupEmail

lookupEmail

**Module:** `clearbit` | **Returns:** `object` -- API response.

```robinpath
clearbit.lookupEmail
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### lookupDomain

lookupDomain

**Module:** `clearbit` | **Returns:** `object` -- API response.

```robinpath
clearbit.lookupDomain
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### autocompleteCompany

autocompleteCompany

**Module:** `clearbit` | **Returns:** `object` -- API response.

```robinpath
clearbit.autocompleteCompany
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPersonFlag

getPersonFlag

**Module:** `clearbit` | **Returns:** `object` -- API response.

```robinpath
clearbit.getPersonFlag
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getCompanyFlag

getCompanyFlag

**Module:** `clearbit` | **Returns:** `object` -- API response.

```robinpath
clearbit.getCompanyFlag
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### prospectorSearch

prospectorSearch

**Module:** `clearbit` | **Returns:** `object` -- API response.

```robinpath
clearbit.prospectorSearch
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### nameToEmail

nameToEmail

**Module:** `clearbit` | **Returns:** `object` -- API response.

```robinpath
clearbit.nameToEmail
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listTags

listTags

**Module:** `clearbit` | **Returns:** `object` -- API response.

```robinpath
clearbit.listTags
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### combined

combined

**Module:** `clearbit` | **Returns:** `object` -- API response.

```robinpath
clearbit.combined
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Clearbit API error (${res.status}): ${t}` | Check the error message for details |
| `clearbit.setCredentials requires apiKey.` | Check the error message for details |
| `Clearbit: "..." not configured. Call clearbit.setCredentials first.` | Check the error message for details |

```robinpath
set $result as clearbit.enrichPerson
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate PersonFlag

Retrieve all items and loop through them.

```robinpath
clearbit.setCredentials $token
set $result as clearbit.getPersonFlag
each $item in $result
  print $item
end
```

### 2. Multi-step Clearbit workflow

Chain multiple clearbit operations together.

```robinpath
clearbit.setCredentials $token
set $r_enrichPerson as clearbit.enrichPerson
set $r_enrichCompany as clearbit.enrichCompany
set $r_findPerson as clearbit.findPerson
print "All operations complete"
```

### 3. Safe enrichPerson with validation

Check results before proceeding.

```robinpath
clearbit.setCredentials $token
set $result as clearbit.enrichPerson
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
