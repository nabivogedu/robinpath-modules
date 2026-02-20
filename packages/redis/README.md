# @robinpath/redis

> Redis client with strings, hashes, lists, sets, pub/sub, TTL, and connection management

![Category](https://img.shields.io/badge/category-Database-blue) ![Functions](https://img.shields.io/badge/functions-28-green) ![Auth](https://img.shields.io/badge/auth-connection-string-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `redis` module lets you:

- Get value by key
- Delete key(s)
- Check key exists
- Find keys by pattern
- Get key TTL

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/redis
```

## Quick Start

**1. Set up credentials**

```robinpath
redis.connect {"host": "localhost"}
```

**2. Get value by key**

```robinpath
redis.get "user:1"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `redis.connect` | Connect to Redis |
| `redis.get` | Get value by key |
| `redis.set` | Set key-value |
| `redis.del` | Delete key(s) |
| `redis.exists` | Check key exists |
| `redis.keys` | Find keys by pattern |
| `redis.ttl` | Get key TTL |
| `redis.expire` | Set key expiration |
| `redis.incr` | Increment value |
| `redis.decr` | Decrement value |
| `redis.hget` | Get hash field |
| `redis.hset` | Set hash fields |
| `redis.hgetall` | Get all hash fields |
| `redis.hdel` | Delete hash fields |
| `redis.lpush` | Push to list head |
| `redis.rpush` | Push to list tail |
| `redis.lpop` | Pop from list head |
| `redis.rpop` | Pop from list tail |
| `redis.lrange` | Get list range |
| `redis.llen` | Get list length |
| `redis.sadd` | Add to set |
| `redis.smembers` | Get set members |
| `redis.sismember` | Check set membership |
| `redis.srem` | Remove from set |
| `redis.publish` | Publish message to channel |
| `redis.flushdb` | Flush current database |
| `redis.close` | Close connection |
| `redis.closeAll` | Close all connections |

## Examples

### Get value by key

```robinpath
redis.get "user:1"
```

### Set key-value

```robinpath
redis.set "user:1" {"name": "Alice"} 3600
```

### Delete key(s)

```robinpath
redis.del "user:1"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/redis";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  redis.connect {"host": "localhost"}
  redis.get "user:1"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/mysql`](../mysql) — MySQL module for complementary functionality
- [`@robinpath/postgres`](../postgres) — PostgreSQL module for complementary functionality
- [`@robinpath/mongo`](../mongo) — Mongo module for complementary functionality
- [`@robinpath/supabase`](../supabase) — Supabase module for complementary functionality
- [`@robinpath/firebase`](../firebase) — Firebase module for complementary functionality

## License

MIT
