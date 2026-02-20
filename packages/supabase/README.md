# @robinpath/supabase

> Supabase module for RobinPath.

![Category](https://img.shields.io/badge/category-Database-blue) ![Functions](https://img.shields.io/badge/functions-27-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `supabase` module lets you:

- Select rows from a table with optional filters, ordering, and pagination
- Insert one or more rows into a table
- Update rows matching filters
- Insert or update rows (merge on conflict)
- Delete rows matching filters

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/supabase
```

## Quick Start

**1. Set up credentials**

```robinpath
supabase.setCredentials "https://xyz.supabase.co" "eyJhbGc..."
```

**2. Store a service role key for admin operations (Auth admin, etc.)**

```robinpath
supabase.setServiceKey "https://xyz.supabase.co" "eyJhbGc..."
```

## Available Functions

| Function | Description |
|----------|-------------|
| `supabase.setCredentials` | Store Supabase project URL and anon/service API key |
| `supabase.setServiceKey` | Store a service role key for admin operations (Auth admin, etc.) |
| `supabase.select` | Select rows from a table with optional filters, ordering, and pagination |
| `supabase.insert` | Insert one or more rows into a table |
| `supabase.update` | Update rows matching filters |
| `supabase.upsert` | Insert or update rows (merge on conflict) |
| `supabase.delete` | Delete rows matching filters |
| `supabase.rpc` | Call a Postgres function via RPC |
| `supabase.signUp` | Sign up a new user with email and password |
| `supabase.signIn` | Sign in a user with email and password |
| `supabase.signInWithOtp` | Send a magic link to the user's email for passwordless sign in |
| `supabase.signOut` | Sign out a user by invalidating their access token |
| `supabase.getUser` | Get the user object from a JWT access token |
| `supabase.updateUser` | Update user attributes (email, password, metadata) |
| `supabase.listUsers` | Admin: List all users (requires service role key) |
| `supabase.deleteUser` | Admin: Delete a user by ID (requires service role key) |
| `supabase.inviteUser` | Admin: Invite a user by email (requires service role key) |
| `supabase.listBuckets` | List all storage buckets |
| `supabase.createBucket` | Create a new storage bucket |
| `supabase.deleteBucket` | Delete a storage bucket (must be empty first) |
| `supabase.emptyBucket` | Remove all files from a storage bucket |
| `supabase.listFiles` | List files in a storage bucket/folder |
| `supabase.uploadFile` | Upload a file to a storage bucket |
| `supabase.downloadFile` | Download a file from a storage bucket |
| `supabase.deleteFile` | Delete one or more files from a storage bucket |
| `supabase.getPublicUrl` | Get the public URL for a file in a public bucket |
| `supabase.createSignedUrl` | Create a signed URL for temporary access to a private file |

## Examples

### Store a service role key for admin operations (Auth admin, etc.)

```robinpath
supabase.setServiceKey "https://xyz.supabase.co" "eyJhbGc..."
```

### Select rows from a table with optional filters, ordering, and pagination

```robinpath
supabase.select "users" "*" {"eq": {"status": "active"}, "limit": 10}
```

### Insert one or more rows into a table

```robinpath
supabase.insert "users" {"name": "Alice", "email": "alice@example.com"}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/supabase";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  supabase.setCredentials "https://xyz.supabase.co" "eyJhbGc..."
  supabase.setServiceKey "https://xyz.supabase.co" "eyJhbGc..."
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/mysql`](../mysql) — MySQL module for complementary functionality
- [`@robinpath/postgres`](../postgres) — PostgreSQL module for complementary functionality
- [`@robinpath/mongo`](../mongo) — Mongo module for complementary functionality
- [`@robinpath/redis`](../redis) — Redis module for complementary functionality
- [`@robinpath/firebase`](../firebase) — Firebase module for complementary functionality

## License

MIT
