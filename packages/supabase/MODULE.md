---
title: "Supabase"
module: "supabase"
package: "@robinpath/supabase"
description: "Supabase module for RobinPath."
category: "database"
tags: [supabase, database]
type: "utility"
auth: "api-key"
functionCount: 27
---

# Supabase

> Supabase module for RobinPath.

**Package:** `@robinpath/supabase` | **Category:** Database | **Type:** Utility


## Authentication

```robinpath
supabase.setCredentials "https://xyz.supabase.co" "eyJhbGc..."
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `supabase` module when you need to:

- **Select rows from a table with optional filters, ordering, and pagination** -- Use `supabase.select` to perform this operation
- **Insert one or more rows into a table** -- Use `supabase.insert` to perform this operation
- **Update rows matching filters** -- Use `supabase.update` to perform this operation
- **Insert or update rows (merge on conflict)** -- Use `supabase.upsert` to perform this operation
- **Delete rows matching filters** -- Use `supabase.delete` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Store Supabase project URL and anon/service API key | `{ success, profile }` |
| [`setServiceKey`](#setservicekey) | Store a service role key for admin operations (Auth admin, etc.) | `{ success, profile }` |
| [`select`](#select) | Select rows from a table with optional filters, ordering, and pagination | `Array of matching rows` |
| [`insert`](#insert) | Insert one or more rows into a table | `Array of inserted rows (if returning enabled)` |
| [`update`](#update) | Update rows matching filters | `Array of updated rows` |
| [`upsert`](#upsert) | Insert or update rows (merge on conflict) | `Array of upserted rows` |
| [`delete`](#delete) | Delete rows matching filters | `Array of deleted rows` |
| [`rpc`](#rpc) | Call a Postgres function via RPC | `Function return value` |
| [`signUp`](#signup) | Sign up a new user with email and password | `Sign up response with user and session` |
| [`signIn`](#signin) | Sign in a user with email and password | `Auth token response with access_token, refresh_token, user` |
| [`signInWithOtp`](#signinwithotp) | Send a magic link to the user's email for passwordless sign in | `OTP send confirmation` |
| [`signOut`](#signout) | Sign out a user by invalidating their access token | `Sign out confirmation` |
| [`getUser`](#getuser) | Get the user object from a JWT access token | `User object with id, email, metadata, etc.` |
| [`updateUser`](#updateuser) | Update user attributes (email, password, metadata) | `Updated user object` |
| [`listUsers`](#listusers) | Admin: List all users (requires service role key) | `Paginated list of users` |
| [`deleteUser`](#deleteuser) | Admin: Delete a user by ID (requires service role key) | `Deletion confirmation` |
| [`inviteUser`](#inviteuser) | Admin: Invite a user by email (requires service role key) | `Invite confirmation` |
| [`listBuckets`](#listbuckets) | List all storage buckets | `Array of bucket objects` |
| [`createBucket`](#createbucket) | Create a new storage bucket | `Created bucket info` |
| [`deleteBucket`](#deletebucket) | Delete a storage bucket (must be empty first) | `Deletion confirmation` |
| [`emptyBucket`](#emptybucket) | Remove all files from a storage bucket | `Empty confirmation` |
| [`listFiles`](#listfiles) | List files in a storage bucket/folder | `Array of file/folder objects` |
| [`uploadFile`](#uploadfile) | Upload a file to a storage bucket | `Upload result with key` |
| [`downloadFile`](#downloadfile) | Download a file from a storage bucket | `File content as string` |
| [`deleteFile`](#deletefile) | Delete one or more files from a storage bucket | `Deletion result` |
| [`getPublicUrl`](#getpublicurl) | Get the public URL for a file in a public bucket | `{ publicUrl }` |
| [`createSignedUrl`](#createsignedurl) | Create a signed URL for temporary access to a private file | `{ signedUrl, expiresIn }` |


## Functions

### setCredentials

Store Supabase project URL and anon/service API key

**Module:** `supabase` | **Returns:** `object` -- { success, profile }

```robinpath
supabase.setCredentials "https://xyz.supabase.co" "eyJhbGc..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectUrl` | `string` | Yes | Supabase project URL (e.g. https://xyz.supabase.co) |
| `apiKey` | `string` | Yes | Supabase anon or service_role key |
| `profile` | `string` | No | Optional credential profile name |

---

### setServiceKey

Store a service role key for admin operations (Auth admin, etc.)

**Module:** `supabase` | **Returns:** `object` -- { success, profile }

```robinpath
supabase.setServiceKey "https://xyz.supabase.co" "eyJhbGc..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectUrl` | `string` | Yes | Supabase project URL |
| `serviceKey` | `string` | Yes | Supabase service_role key |
| `profile` | `string` | No | Optional credential profile name |

---

### select

Select rows from a table with optional filters, ordering, and pagination

**Module:** `supabase` | **Returns:** `array` -- Array of matching rows

```robinpath
supabase.select "users" "*" {"eq": {"status": "active"}, "limit": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table name |
| `columns` | `string` | No | Comma-separated column names or * (default *) |
| `options` | `object` | No | Filters (eq, neq, gt, lt, gte, lte, like, ilike, in, is), order, limit, offset, range, profile |

---

### insert

Insert one or more rows into a table

**Module:** `supabase` | **Returns:** `array` -- Array of inserted rows (if returning enabled)

```robinpath
supabase.insert "users" {"name": "Alice", "email": "alice@example.com"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table name |
| `data` | `object` | Yes | Row object or array of row objects |
| `options` | `object` | No | Options: returning, onConflict (for upsert), columns, profile |

---

### update

Update rows matching filters

**Module:** `supabase` | **Returns:** `array` -- Array of updated rows

```robinpath
supabase.update "users" {"status": "inactive"} {"id": 42}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table name |
| `data` | `object` | Yes | Fields to update |
| `match` | `object` | Yes | Filter conditions to match rows (eq filters) |
| `options` | `object` | No | Options: profile |

---

### upsert

Insert or update rows (merge on conflict)

**Module:** `supabase` | **Returns:** `array` -- Array of upserted rows

```robinpath
supabase.upsert "users" {"id": 1, "name": "Alice"} {"onConflict": "id"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table name |
| `data` | `object` | Yes | Row object or array of row objects |
| `options` | `object` | No | Options: onConflict (conflict column), profile |

---

### delete

Delete rows matching filters

**Module:** `supabase` | **Returns:** `array` -- Array of deleted rows

```robinpath
supabase.delete "users" {"id": 42}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `table` | `string` | Yes | Table name |
| `match` | `object` | Yes | Filter conditions to match rows for deletion |
| `options` | `object` | No | Options: profile |

---

### rpc

Call a Postgres function via RPC

**Module:** `supabase` | **Returns:** `any` -- Function return value

```robinpath
supabase.rpc "get_total_users" {"status": "active"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `functionName` | `string` | Yes | Name of the Postgres function |
| `params` | `object` | No | Parameters to pass to the function |
| `options` | `object` | No | Options: profile |

---

### signUp

Sign up a new user with email and password

**Module:** `supabase` | **Returns:** `object` -- Sign up response with user and session

```robinpath
supabase.signUp "user@example.com" "securePassword123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | `string` | Yes | User email address |
| `password` | `string` | Yes | User password |
| `options` | `object` | No | Options: data (user metadata), profile |

---

### signIn

Sign in a user with email and password

**Module:** `supabase` | **Returns:** `object` -- Auth token response with access_token, refresh_token, user

```robinpath
supabase.signIn "user@example.com" "securePassword123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | `string` | Yes | User email address |
| `password` | `string` | Yes | User password |
| `options` | `object` | No | Options: profile |

---

### signInWithOtp

Send a magic link to the user's email for passwordless sign in

**Module:** `supabase` | **Returns:** `object` -- OTP send confirmation

```robinpath
supabase.signInWithOtp "user@example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | `string` | Yes | User email address |
| `options` | `object` | No | Options: profile |

---

### signOut

Sign out a user by invalidating their access token

**Module:** `supabase` | **Returns:** `object` -- Sign out confirmation

```robinpath
supabase.signOut "eyJhbGc..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | User's access token |
| `options` | `object` | No | Options: profile |

---

### getUser

Get the user object from a JWT access token

**Module:** `supabase` | **Returns:** `object` -- User object with id, email, metadata, etc.

```robinpath
supabase.getUser "eyJhbGc..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | User's access token |
| `options` | `object` | No | Options: profile |

---

### updateUser

Update user attributes (email, password, metadata)

**Module:** `supabase` | **Returns:** `object` -- Updated user object

```robinpath
supabase.updateUser "eyJhbGc..." {"data": {"name": "New Name"}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessToken` | `string` | Yes | User's access token |
| `attributes` | `object` | Yes | Attributes to update: email, password, data (metadata) |
| `options` | `object` | No | Options: profile |

---

### listUsers

Admin: List all users (requires service role key)

**Module:** `supabase` | **Returns:** `object` -- Paginated list of users

```robinpath
supabase.listUsers {"page": 1, "perPage": 50}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: page, perPage, profile |

---

### deleteUser

Admin: Delete a user by ID (requires service role key)

**Module:** `supabase` | **Returns:** `object` -- Deletion confirmation

```robinpath
supabase.deleteUser "uuid-of-user"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | `string` | Yes | UUID of the user to delete |
| `options` | `object` | No | Options: profile |

---

### inviteUser

Admin: Invite a user by email (requires service role key)

**Module:** `supabase` | **Returns:** `object` -- Invite confirmation

```robinpath
supabase.inviteUser "newuser@example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | `string` | Yes | Email address to invite |
| `options` | `object` | No | Options: profile |

---

### listBuckets

List all storage buckets

**Module:** `supabase` | **Returns:** `array` -- Array of bucket objects

```robinpath
supabase.listBuckets
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: profile |

---

### createBucket

Create a new storage bucket

**Module:** `supabase` | **Returns:** `object` -- Created bucket info

```robinpath
supabase.createBucket "avatars" {"public": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Bucket name |
| `options` | `object` | No | Options: public, fileSizeLimit, allowedMimeTypes, profile |

---

### deleteBucket

Delete a storage bucket (must be empty first)

**Module:** `supabase` | **Returns:** `object` -- Deletion confirmation

```robinpath
supabase.deleteBucket "avatars"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucketId` | `string` | Yes | Bucket ID/name |
| `options` | `object` | No | Options: profile |

---

### emptyBucket

Remove all files from a storage bucket

**Module:** `supabase` | **Returns:** `object` -- Empty confirmation

```robinpath
supabase.emptyBucket "avatars"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucketId` | `string` | Yes | Bucket ID/name |
| `options` | `object` | No | Options: profile |

---

### listFiles

List files in a storage bucket/folder

**Module:** `supabase` | **Returns:** `array` -- Array of file/folder objects

```robinpath
supabase.listFiles "avatars" "users/"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucketId` | `string` | Yes | Bucket ID/name |
| `path` | `string` | No | Folder path within bucket (default root) |
| `options` | `object` | No | Options: limit, offset, sortBy, search, profile |

---

### uploadFile

Upload a file to a storage bucket

**Module:** `supabase` | **Returns:** `object` -- Upload result with key

```robinpath
supabase.uploadFile "avatars" "user1.png" $fileContent {"contentType": "image/png"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucketId` | `string` | Yes | Bucket ID/name |
| `path` | `string` | Yes | File path within bucket |
| `content` | `string` | Yes | File content (string or Buffer) |
| `options` | `object` | No | Options: contentType, upsert, profile |

---

### downloadFile

Download a file from a storage bucket

**Module:** `supabase` | **Returns:** `string` -- File content as string

```robinpath
supabase.downloadFile "documents" "report.txt"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucketId` | `string` | Yes | Bucket ID/name |
| `path` | `string` | Yes | File path within bucket |
| `options` | `object` | No | Options: profile |

---

### deleteFile

Delete one or more files from a storage bucket

**Module:** `supabase` | **Returns:** `object` -- Deletion result

```robinpath
supabase.deleteFile "avatars" ["user1.png", "user2.png"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucketId` | `string` | Yes | Bucket ID/name |
| `paths` | `array` | Yes | Array of file paths to delete |
| `options` | `object` | No | Options: profile |

---

### getPublicUrl

Get the public URL for a file in a public bucket

**Module:** `supabase` | **Returns:** `object` -- { publicUrl }

```robinpath
supabase.getPublicUrl "avatars" "user1.png"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucketId` | `string` | Yes | Bucket ID/name |
| `path` | `string` | Yes | File path within bucket |
| `options` | `object` | No | Options: profile |

---

### createSignedUrl

Create a signed URL for temporary access to a private file

**Module:** `supabase` | **Returns:** `object` -- { signedUrl, expiresIn }

```robinpath
supabase.createSignedUrl "documents" "report.pdf" 3600
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bucketId` | `string` | Yes | Bucket ID/name |
| `path` | `string` | Yes | File path within bucket |
| `expiresIn` | `number` | Yes | Expiry time in seconds |
| `options` | `object` | No | Options: profile |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Supabase ${res.status}: ${msg}` | Check the error message for details |
| `Supabase ${res.status}: ${text}` | Check the error message for details |

```robinpath
set $result as supabase.select "users" "*" {"eq": {"status": "active"}, "limit": 10}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate User

Retrieve all items and loop through them.

```robinpath
supabase.setCredentials $token
set $result as supabase.getUser "eyJhbGc..."
each $item in $result
  print $item
end
```

### 2. Create a new item with createBucket

Create a new resource and capture the result.

```robinpath
supabase.setCredentials $token
set $result as supabase.createBucket "avatars" {"public": true}
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
supabase.setCredentials $token
set $created as supabase.createBucket "avatars" {"public": true}
# Update the created item
supabase.update "users" {"status": "inactive"} {"id": 42}
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
supabase.setCredentials $token
set $existing as supabase.getUser "eyJhbGc..."
if $existing == null
  supabase.createBucket "avatars" {"public": true}
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Supabase workflow

Chain multiple supabase operations together.

```robinpath
supabase.setCredentials $token
set $r_select as supabase.select "users" "*" {"eq": {"status": "active"}, "limit": 10}
set $r_insert as supabase.insert "users" {"name": "Alice", "email": "alice@example.com"}
set $r_update as supabase.update "users" {"status": "inactive"} {"id": 42}
print "All operations complete"
```

### 6. Safe select with validation

Check results before proceeding.

```robinpath
supabase.setCredentials $token
set $result as supabase.select "users" "*" {"eq": {"status": "active"}, "limit": 10}
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
- **firebase** -- Firebase module for complementary functionality
