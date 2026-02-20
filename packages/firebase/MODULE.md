---
title: "Firebase"
module: "firebase"
package: "@robinpath/firebase"
description: "Firebase module for RobinPath."
category: "database"
tags: [firebase, database]
type: "utility"
auth: "api-key"
functionCount: 21
---

# Firebase

> Firebase module for RobinPath.

**Package:** `@robinpath/firebase` | **Category:** Database | **Type:** Utility


## Authentication

```robinpath
firebase.setCredentials "my-project-id" "AIzaSy..."
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `firebase` module when you need to:

- **Get a Firestore document by collection and document ID** -- Use `firebase.getDocument` to perform this operation
- **List Firestore documents in a collection** -- Use `firebase.listDocuments` to perform this operation
- **Create a Firestore document with auto or specified ID** -- Use `firebase.createDocument` to perform this operation
- **Update a Firestore document's fields** -- Use `firebase.updateDocument` to perform this operation
- **Delete a Firestore document** -- Use `firebase.deleteDocument` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Set Firebase project ID and API key for client-side REST operations | `{configured, projectId}` |
| [`setServiceToken`](#setservicetoken) | Set Firebase project ID and OAuth2 access token for admin operations | `{configured, projectId, hasAccessToken}` |
| [`getDocument`](#getdocument) | Get a Firestore document by collection and document ID | `Document with _id, _path, and fields` |
| [`listDocuments`](#listdocuments) | List Firestore documents in a collection | `{documents, nextPageToken}` |
| [`createDocument`](#createdocument) | Create a Firestore document with auto or specified ID | `Created document with _id and fields` |
| [`updateDocument`](#updatedocument) | Update a Firestore document's fields | `Updated document` |
| [`deleteDocument`](#deletedocument) | Delete a Firestore document | `{deleted, collection, documentId}` |
| [`queryDocuments`](#querydocuments) | Query Firestore documents with structured query (where, orderBy, limit) | `Array of matching documents` |
| [`batchGet`](#batchget) | Get multiple Firestore documents by IDs | `Array of documents (or {_missing: true} for not found)` |
| [`signUp`](#signup) | Create a new user with email and password | `{idToken, email, localId, refreshToken, expiresIn}` |
| [`signIn`](#signin) | Sign in a user with email and password | `{idToken, email, localId, refreshToken, expiresIn, registered}` |
| [`signInAnonymously`](#signinanonymously) | Sign in anonymously | `{idToken, localId, refreshToken, expiresIn}` |
| [`sendPasswordReset`](#sendpasswordreset) | Send a password reset email | `{email, sent}` |
| [`verifyEmail`](#verifyemail) | Send an email verification to the user | `{email, sent}` |
| [`getUserByToken`](#getuserbytoken) | Get user data from an ID token | `{localId, email, emailVerified, displayName, ...}` |
| [`deleteAccount`](#deleteaccount) | Delete a user account | `{deleted}` |
| [`rtdbGet`](#rtdbget) | Read data from Realtime Database at a path | `Data at the path` |
| [`rtdbSet`](#rtdbset) | Write data to Realtime Database at a path (overwrites) | `Written data` |
| [`rtdbUpdate`](#rtdbupdate) | Update data at a Realtime Database path (merge) | `Updated data` |
| [`rtdbPush`](#rtdbpush) | Push a new child to a Realtime Database path | `{name} with the generated key` |
| [`rtdbDelete`](#rtdbdelete) | Delete data at a Realtime Database path | `{deleted, path}` |


## Functions

### setCredentials

Set Firebase project ID and API key for client-side REST operations

**Module:** `firebase` | **Returns:** `object` -- {configured, projectId}

```robinpath
firebase.setCredentials "my-project-id" "AIzaSy..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | `string` | Yes | Firebase project ID |
| `apiKey` | `string` | Yes | Firebase Web API key |

---

### setServiceToken

Set Firebase project ID and OAuth2 access token for admin operations

**Module:** `firebase` | **Returns:** `object` -- {configured, projectId, hasAccessToken}

```robinpath
firebase.setServiceToken "my-project-id" "ya29.a0..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | `string` | Yes | Firebase project ID |
| `accessToken` | `string` | Yes | OAuth2 access token |

---

### getDocument

Get a Firestore document by collection and document ID

**Module:** `firebase` | **Returns:** `object` -- Document with _id, _path, and fields

```robinpath
firebase.getDocument "users" "user123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection name |
| `documentId` | `string` | Yes | Document ID |

---

### listDocuments

List Firestore documents in a collection

**Module:** `firebase` | **Returns:** `object` -- {documents, nextPageToken}

```robinpath
firebase.listDocuments "users" {"pageSize": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection name |
| `options` | `object` | No | {pageSize, pageToken, orderBy} |

---

### createDocument

Create a Firestore document with auto or specified ID

**Module:** `firebase` | **Returns:** `object` -- Created document with _id and fields

```robinpath
firebase.createDocument "users" {"name": "Alice", "age": 30}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection name |
| `fields` | `object` | Yes | Document fields |
| `documentId` | `string` | No | Optional document ID (auto-generated if omitted) |

---

### updateDocument

Update a Firestore document's fields

**Module:** `firebase` | **Returns:** `object` -- Updated document

```robinpath
firebase.updateDocument "users" "user123" {"name": "Bob"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection name |
| `documentId` | `string` | Yes | Document ID |
| `fields` | `object` | Yes | Fields to update |
| `updateMask` | `array` | No | Specific field paths to update (optional) |

---

### deleteDocument

Delete a Firestore document

**Module:** `firebase` | **Returns:** `object` -- {deleted, collection, documentId}

```robinpath
firebase.deleteDocument "users" "user123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection name |
| `documentId` | `string` | Yes | Document ID |

---

### queryDocuments

Query Firestore documents with structured query (where, orderBy, limit)

**Module:** `firebase` | **Returns:** `array` -- Array of matching documents

```robinpath
firebase.queryDocuments "users" {"where": {"age": {">=": 18}}, "limit": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection name |
| `query` | `object` | Yes | {where, orderBy, limit, offset} |

---

### batchGet

Get multiple Firestore documents by IDs

**Module:** `firebase` | **Returns:** `array` -- Array of documents (or {_missing: true} for not found)

```robinpath
firebase.batchGet "users" ["user1", "user2", "user3"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | `string` | Yes | Collection name |
| `documentIds` | `array` | Yes | Array of document IDs |

---

### signUp

Create a new user with email and password

**Module:** `firebase` | **Returns:** `object` -- {idToken, email, localId, refreshToken, expiresIn}

```robinpath
firebase.signUp "user@example.com" "securePass123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | `string` | Yes | User email |
| `password` | `string` | Yes | User password |

---

### signIn

Sign in a user with email and password

**Module:** `firebase` | **Returns:** `object` -- {idToken, email, localId, refreshToken, expiresIn, registered}

```robinpath
firebase.signIn "user@example.com" "securePass123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | `string` | Yes | User email |
| `password` | `string` | Yes | User password |

---

### signInAnonymously

Sign in anonymously

**Module:** `firebase` | **Returns:** `object` -- {idToken, localId, refreshToken, expiresIn}

```robinpath
firebase.signInAnonymously
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### sendPasswordReset

Send a password reset email

**Module:** `firebase` | **Returns:** `object` -- {email, sent}

```robinpath
firebase.sendPasswordReset "user@example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | `string` | Yes | User email |

---

### verifyEmail

Send an email verification to the user

**Module:** `firebase` | **Returns:** `object` -- {email, sent}

```robinpath
firebase.verifyEmail "eyJhbGciOi..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `idToken` | `string` | Yes | User ID token from sign in |

---

### getUserByToken

Get user data from an ID token

**Module:** `firebase` | **Returns:** `object` -- {localId, email, emailVerified, displayName, ...}

```robinpath
firebase.getUserByToken "eyJhbGciOi..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `idToken` | `string` | Yes | User ID token from sign in |

---

### deleteAccount

Delete a user account

**Module:** `firebase` | **Returns:** `object` -- {deleted}

```robinpath
firebase.deleteAccount "eyJhbGciOi..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `idToken` | `string` | Yes | User ID token from sign in |

---

### rtdbGet

Read data from Realtime Database at a path

**Module:** `firebase` | **Returns:** `any` -- Data at the path

```robinpath
firebase.rtdbGet "users/user123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Database path |

---

### rtdbSet

Write data to Realtime Database at a path (overwrites)

**Module:** `firebase` | **Returns:** `any` -- Written data

```robinpath
firebase.rtdbSet "users/user123" {"name": "Alice", "age": 30}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Database path |
| `data` | `any` | Yes | Data to write |

---

### rtdbUpdate

Update data at a Realtime Database path (merge)

**Module:** `firebase` | **Returns:** `any` -- Updated data

```robinpath
firebase.rtdbUpdate "users/user123" {"age": 31}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Database path |
| `data` | `object` | Yes | Fields to update |

---

### rtdbPush

Push a new child to a Realtime Database path

**Module:** `firebase` | **Returns:** `object` -- {name} with the generated key

```robinpath
firebase.rtdbPush "messages" {"text": "Hello", "sender": "Alice"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Database path |
| `data` | `any` | Yes | Data for the new child |

---

### rtdbDelete

Delete data at a Realtime Database path

**Module:** `firebase` | **Returns:** `object` -- {deleted, path}

```robinpath
firebase.rtdbDelete "users/user123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Database path |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Firebase not configured. Call firebase.setCredentials or firebase.setServiceToken first.` | Check the error message for details |
| `API key not set. Call firebase.setCredentials with projectId and apiKey.` | Check the error message for details |
| `Access token not set. Call firebase.setServiceToken with projectId and accessToken.` | Check the error message for details |
| `Firebase API error (${response.status}): ${errMsg}` | Check the error message for details |
| `projectId is required` | Check the error message for details |
| `apiKey is required` | Check the error message for details |
| `accessToken is required` | Check the error message for details |
| `collection and documentId are required` | Check the error message for details |

```robinpath
set $result as firebase.getDocument "users" "user123"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Document

Retrieve all items and loop through them.

```robinpath
firebase.setCredentials $token
set $result as firebase.getDocument "users" "user123"
each $item in $result
  print $item
end
```

### 2. Create a new item with createDocument

Create a new resource and capture the result.

```robinpath
firebase.setCredentials $token
set $result as firebase.createDocument "users" {"name": "Alice", "age": 30}
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
firebase.setCredentials $token
set $created as firebase.createDocument "users" {"name": "Alice", "age": 30}
# Update the created item
firebase.updateDocument "users" "user123" {"name": "Bob"}
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
firebase.setCredentials $token
set $existing as firebase.getDocument "users" "user123"
if $existing == null
  firebase.createDocument "users" {"name": "Alice", "age": 30}
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Firebase workflow

Chain multiple firebase operations together.

```robinpath
firebase.setCredentials $token
set $r_getDocument as firebase.getDocument "users" "user123"
set $r_listDocuments as firebase.listDocuments "users" {"pageSize": 10}
set $r_createDocument as firebase.createDocument "users" {"name": "Alice", "age": 30}
print "All operations complete"
```

### 6. Safe getDocument with validation

Check results before proceeding.

```robinpath
firebase.setCredentials $token
set $result as firebase.getDocument "users" "user123"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **mysql** -- MySQL module for complementary functionality
- **postgres** -- PostgreSQL module for complementary functionality
- **mongo** -- Mongo module for complementary functionality
- **redis** -- Redis module for complementary functionality
- **supabase** -- Supabase module for complementary functionality
