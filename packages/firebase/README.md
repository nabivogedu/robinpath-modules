# @robinpath/firebase

> Firebase module for RobinPath.

![Category](https://img.shields.io/badge/category-Database-blue) ![Functions](https://img.shields.io/badge/functions-21-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `firebase` module lets you:

- Get a Firestore document by collection and document ID
- List Firestore documents in a collection
- Create a Firestore document with auto or specified ID
- Update a Firestore document's fields
- Delete a Firestore document

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/firebase
```

## Quick Start

**1. Set up credentials**

```robinpath
firebase.setCredentials "my-project-id" "AIzaSy..."
```

**2. Get a Firestore document by collection and document ID**

```robinpath
firebase.getDocument "users" "user123"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `firebase.setCredentials` | Set Firebase project ID and API key for client-side REST operations |
| `firebase.setServiceToken` | Set Firebase project ID and OAuth2 access token for admin operations |
| `firebase.getDocument` | Get a Firestore document by collection and document ID |
| `firebase.listDocuments` | List Firestore documents in a collection |
| `firebase.createDocument` | Create a Firestore document with auto or specified ID |
| `firebase.updateDocument` | Update a Firestore document's fields |
| `firebase.deleteDocument` | Delete a Firestore document |
| `firebase.queryDocuments` | Query Firestore documents with structured query (where, orderBy, limit) |
| `firebase.batchGet` | Get multiple Firestore documents by IDs |
| `firebase.signUp` | Create a new user with email and password |
| `firebase.signIn` | Sign in a user with email and password |
| `firebase.signInAnonymously` | Sign in anonymously |
| `firebase.sendPasswordReset` | Send a password reset email |
| `firebase.verifyEmail` | Send an email verification to the user |
| `firebase.getUserByToken` | Get user data from an ID token |
| `firebase.deleteAccount` | Delete a user account |
| `firebase.rtdbGet` | Read data from Realtime Database at a path |
| `firebase.rtdbSet` | Write data to Realtime Database at a path (overwrites) |
| `firebase.rtdbUpdate` | Update data at a Realtime Database path (merge) |
| `firebase.rtdbPush` | Push a new child to a Realtime Database path |
| `firebase.rtdbDelete` | Delete data at a Realtime Database path |

## Examples

### Get a Firestore document by collection and document ID

```robinpath
firebase.getDocument "users" "user123"
```

### List Firestore documents in a collection

```robinpath
firebase.listDocuments "users" {"pageSize": 10}
```

### Create a Firestore document with auto or specified ID

```robinpath
firebase.createDocument "users" {"name": "Alice", "age": 30}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/firebase";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  firebase.setCredentials "my-project-id" "AIzaSy..."
  firebase.getDocument "users" "user123"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/mysql`](../mysql) — MySQL module for complementary functionality
- [`@robinpath/postgres`](../postgres) — PostgreSQL module for complementary functionality
- [`@robinpath/mongo`](../mongo) — Mongo module for complementary functionality
- [`@robinpath/redis`](../redis) — Redis module for complementary functionality
- [`@robinpath/supabase`](../supabase) — Supabase module for complementary functionality

## License

MIT
