---
title: "Pinterest"
module: "pinterest"
package: "@robinpath/pinterest"
description: "Pinterest module for RobinPath."
category: "social-media"
tags: [pinterest, social media]
type: "integration"
auth: "api-key"
functionCount: 17
baseUrl: "https://api.pinterest.com"
---

# Pinterest

> Pinterest module for RobinPath.

**Package:** `@robinpath/pinterest` | **Category:** Social Media | **Type:** Integration


## Authentication

```robinpath
pinterest.setCredentials "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `pinterest` module when you need to:

- **listBoards** -- Use `pinterest.listBoards` to perform this operation
- **getBoard** -- Use `pinterest.getBoard` to perform this operation
- **createBoard** -- Use `pinterest.createBoard` to perform this operation
- **updateBoard** -- Use `pinterest.updateBoard` to perform this operation
- **deleteBoard** -- Use `pinterest.deleteBoard` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Configure pinterest credentials. | `object` |
| [`listBoards`](#listboards) | listBoards | `object` |
| [`getBoard`](#getboard) | getBoard | `object` |
| [`createBoard`](#createboard) | createBoard | `object` |
| [`updateBoard`](#updateboard) | updateBoard | `object` |
| [`deleteBoard`](#deleteboard) | deleteBoard | `object` |
| [`listBoardPins`](#listboardpins) | listBoardPins | `object` |
| [`listPins`](#listpins) | listPins | `object` |
| [`getPin`](#getpin) | getPin | `object` |
| [`createPin`](#createpin) | createPin | `object` |
| [`updatePin`](#updatepin) | updatePin | `object` |
| [`deletePin`](#deletepin) | deletePin | `object` |
| [`listBoardSections`](#listboardsections) | listBoardSections | `object` |
| [`createBoardSection`](#createboardsection) | createBoardSection | `object` |
| [`getUserAccount`](#getuseraccount) | getUserAccount | `object` |
| [`getPinAnalytics`](#getpinanalytics) | getPinAnalytics | `object` |
| [`getBoardAnalytics`](#getboardanalytics) | getBoardAnalytics | `object` |


## Functions

### setCredentials

Configure pinterest credentials.

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.setCredentials
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | accessToken |

---

### listBoards

listBoards

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.listBoards
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getBoard

getBoard

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.getBoard
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createBoard

createBoard

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.createBoard
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updateBoard

updateBoard

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.updateBoard
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deleteBoard

deleteBoard

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.deleteBoard
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listBoardPins

listBoardPins

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.listBoardPins
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listPins

listPins

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.listPins
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPin

getPin

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.getPin
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createPin

createPin

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.createPin
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### updatePin

updatePin

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.updatePin
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### deletePin

deletePin

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.deletePin
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### listBoardSections

listBoardSections

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.listBoardSections
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### createBoardSection

createBoardSection

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.createBoardSection
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getUserAccount

getUserAccount

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.getUserAccount
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getPinAnalytics

getPinAnalytics

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.getPinAnalytics
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### getBoardAnalytics

getBoardAnalytics

**Module:** `pinterest` | **Returns:** `object` -- API response.

```robinpath
pinterest.getBoardAnalytics
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Pinterest API error (${res.status}): ${t}` | Check the error message for details |
| `pinterest.setCredentials requires accessToken.` | Check the error message for details |
| `pinterest.updateBoard requires an ID.` | Check the error message for details |
| `pinterest.deleteBoard requires an ID.` | Check the error message for details |
| `pinterest.updatePin requires an ID.` | Check the error message for details |
| `pinterest.deletePin requires an ID.` | Check the error message for details |
| `Pinterest: "..." not configured. Call pinterest.setCredentials first.` | Check the error message for details |

```robinpath
set $result as pinterest.listBoards
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Boards

Retrieve all items and loop through them.

```robinpath
pinterest.setCredentials $token
set $result as pinterest.listBoards
each $item in $result
  print $item
end
```

### 2. Create a new item with createBoard

Create a new resource and capture the result.

```robinpath
pinterest.setCredentials $token
set $result as pinterest.createBoard
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
pinterest.setCredentials $token
set $created as pinterest.createBoard
# Update the created item
pinterest.updateBoard
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
pinterest.setCredentials $token
set $existing as pinterest.listBoards
if $existing == null
  pinterest.createBoard
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Pinterest workflow

Chain multiple pinterest operations together.

```robinpath
pinterest.setCredentials $token
set $r_listBoards as pinterest.listBoards
set $r_getBoard as pinterest.getBoard
set $r_createBoard as pinterest.createBoard
print "All operations complete"
```

### 6. Safe listBoards with validation

Check results before proceeding.

```robinpath
pinterest.setCredentials $token
set $result as pinterest.listBoards
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **facebook** -- Facebook module for complementary functionality
- **instagram** -- Instagram module for complementary functionality
- **twitter** -- Twitter/X module for complementary functionality
- **linkedin** -- LinkedIn module for complementary functionality
- **tiktok** -- TikTok module for complementary functionality
