# @robinpath/trello

> Trello module for RobinPath.

![Category](https://img.shields.io/badge/category-Project-management-blue) ![Functions](https://img.shields.io/badge/functions-12-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `trello` module lets you:

- List all boards for the authenticated user.
- Get a board by ID.
- List all lists in a board.
- Create a new list in a board.
- List all cards in a list.

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/trello
```

## Quick Start

**1. Set up credentials**

```robinpath
trello.setCredentials "api_key" "token"
```

**2. List all boards for the authenticated user.**

```robinpath
trello.listBoards
```

## Available Functions

| Function | Description |
|----------|-------------|
| `trello.setCredentials` | Set Trello API key and token. |
| `trello.listBoards` | List all boards for the authenticated user. |
| `trello.getBoard` | Get a board by ID. |
| `trello.listLists` | List all lists in a board. |
| `trello.createList` | Create a new list in a board. |
| `trello.listCards` | List all cards in a list. |
| `trello.getCard` | Get a card by ID. |
| `trello.createCard` | Create a new card in a list. |
| `trello.updateCard` | Update a card's properties. |
| `trello.moveCard` | Move a card to a different list. |
| `trello.deleteCard` | Delete a card permanently. |
| `trello.addComment` | Add a comment to a card. |

## Examples

### List all boards for the authenticated user.

```robinpath
trello.listBoards
```

### Get a board by ID.

```robinpath
trello.getBoard "board-id"
```

### List all lists in a board.

```robinpath
trello.listLists "board-id"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/trello";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  trello.setCredentials "api_key" "token"
  trello.listBoards
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/asana`](../asana) — Asana module for complementary functionality
- [`@robinpath/clickup`](../clickup) — ClickUp module for complementary functionality
- [`@robinpath/jira`](../jira) — Jira module for complementary functionality
- [`@robinpath/linear`](../linear) — Linear module for complementary functionality
- [`@robinpath/monday`](../monday) — Monday.com module for complementary functionality

## License

MIT
