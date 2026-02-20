---
title: "Trello"
module: "trello"
package: "@robinpath/trello"
description: "Trello module for RobinPath."
category: "project-management"
tags: [trello, project management]
type: "integration"
auth: "api-key"
functionCount: 12
---

# Trello

> Trello module for RobinPath.

**Package:** `@robinpath/trello` | **Category:** Project Management | **Type:** Integration


## Authentication

```robinpath
trello.setCredentials "api_key" "token"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `trello` module when you need to:

- **List all boards for the authenticated user.** -- Use `trello.listBoards` to perform this operation
- **Get a board by ID.** -- Use `trello.getBoard` to perform this operation
- **List all lists in a board.** -- Use `trello.listLists` to perform this operation
- **Create a new list in a board.** -- Use `trello.createList` to perform this operation
- **List all cards in a list.** -- Use `trello.listCards` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Set Trello API key and token. | `Confirmation message.` |
| [`listBoards`](#listboards) | List all boards for the authenticated user. | `Array of board objects.` |
| [`getBoard`](#getboard) | Get a board by ID. | `Board object.` |
| [`listLists`](#listlists) | List all lists in a board. | `Array of list objects.` |
| [`createList`](#createlist) | Create a new list in a board. | `Created list object.` |
| [`listCards`](#listcards) | List all cards in a list. | `Array of card objects.` |
| [`getCard`](#getcard) | Get a card by ID. | `Card object.` |
| [`createCard`](#createcard) | Create a new card in a list. | `Created card object.` |
| [`updateCard`](#updatecard) | Update a card's properties. | `Updated card object.` |
| [`moveCard`](#movecard) | Move a card to a different list. | `Updated card object.` |
| [`deleteCard`](#deletecard) | Delete a card permanently. | `Confirmation message.` |
| [`addComment`](#addcomment) | Add a comment to a card. | `Created comment action.` |


## Functions

### setCredentials

Set Trello API key and token.

**Module:** `trello` | **Returns:** `string` -- Confirmation message.

```robinpath
trello.setCredentials "api_key" "token"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | Yes | Trello API key |
| `token` | `string` | Yes | Trello API token |

---

### listBoards

List all boards for the authenticated user.

**Module:** `trello` | **Returns:** `array` -- Array of board objects.

```robinpath
trello.listBoards
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### getBoard

Get a board by ID.

**Module:** `trello` | **Returns:** `object` -- Board object.

```robinpath
trello.getBoard "board-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `boardId` | `string` | Yes | Board ID |

---

### listLists

List all lists in a board.

**Module:** `trello` | **Returns:** `array` -- Array of list objects.

```robinpath
trello.listLists "board-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `boardId` | `string` | Yes | Board ID |

---

### createList

Create a new list in a board.

**Module:** `trello` | **Returns:** `object` -- Created list object.

```robinpath
trello.createList "board-id" "Done"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `boardId` | `string` | Yes | Board ID |
| `name` | `string` | Yes | List name |

---

### listCards

List all cards in a list.

**Module:** `trello` | **Returns:** `array` -- Array of card objects.

```robinpath
trello.listCards "list-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | List ID |

---

### getCard

Get a card by ID.

**Module:** `trello` | **Returns:** `object` -- Card object.

```robinpath
trello.getCard "card-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cardId` | `string` | Yes | Card ID |

---

### createCard

Create a new card in a list.

**Module:** `trello` | **Returns:** `object` -- Created card object.

```robinpath
trello.createCard "list-id" "Fix login bug" {"desc":"Users cannot log in","due":"2025-12-31"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listId` | `string` | Yes | List ID to add the card to |
| `name` | `string` | Yes | Card title |
| `options` | `object` | No | Options: desc, due, idMembers, idLabels, pos |

---

### updateCard

Update a card's properties.

**Module:** `trello` | **Returns:** `object` -- Updated card object.

```robinpath
trello.updateCard "card-id" {"name":"Updated Title","closed":false}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cardId` | `string` | Yes | Card ID |
| `updates` | `object` | Yes | Fields to update (name, desc, due, closed, etc.) |

---

### moveCard

Move a card to a different list.

**Module:** `trello` | **Returns:** `object` -- Updated card object.

```robinpath
trello.moveCard "card-id" "done-list-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cardId` | `string` | Yes | Card ID |
| `listId` | `string` | Yes | Target list ID |

---

### deleteCard

Delete a card permanently.

**Module:** `trello` | **Returns:** `string` -- Confirmation message.

```robinpath
trello.deleteCard "card-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cardId` | `string` | Yes | Card ID to delete |

---

### addComment

Add a comment to a card.

**Module:** `trello` | **Returns:** `object` -- Created comment action.

```robinpath
trello.addComment "card-id" "This is done!"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cardId` | `string` | Yes | Card ID |
| `text` | `string` | Yes | Comment text |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Trello API error (${res.status}): ${text}` | Check the error message for details |
| `trello.setCredentials requires apiKey and token.` | Check the error message for details |
| `trello.getBoard requires a boardId.` | Check the error message for details |
| `trello.listLists requires a boardId.` | Check the error message for details |
| `trello.createList requires boardId and name.` | Check the error message for details |
| `trello.listCards requires a listId.` | Check the error message for details |
| `trello.getCard requires a cardId.` | Check the error message for details |
| `trello.createCard requires listId and name.` | Check the error message for details |

```robinpath
set $result as trello.listBoards
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
trello.setCredentials $token
set $result as trello.listBoards
each $item in $result
  print $item
end
```

### 2. Create a new item with createList

Create a new resource and capture the result.

```robinpath
trello.setCredentials $token
set $result as trello.createList "board-id" "Done"
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
trello.setCredentials $token
set $created as trello.createList "board-id" "Done"
# Update the created item
trello.updateCard "card-id" {"name":"Updated Title","closed":false}
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
trello.setCredentials $token
set $existing as trello.listBoards
if $existing == null
  trello.createList "board-id" "Done"
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Trello workflow

Chain multiple trello operations together.

```robinpath
trello.setCredentials $token
set $r_listBoards as trello.listBoards
set $r_getBoard as trello.getBoard "board-id"
set $r_listLists as trello.listLists "board-id"
print "All operations complete"
```

### 6. Safe listBoards with validation

Check results before proceeding.

```robinpath
trello.setCredentials $token
set $result as trello.listBoards
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **asana** -- Asana module for complementary functionality
- **clickup** -- ClickUp module for complementary functionality
- **jira** -- Jira module for complementary functionality
- **linear** -- Linear module for complementary functionality
- **monday** -- Monday.com module for complementary functionality
