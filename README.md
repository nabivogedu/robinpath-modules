# RobinPath Modules

Reusable modules for [RobinPath](https://www.npmjs.com/package/@wiredwp/robinpath) — the scripting language for automation workflows.

## Packages

| Package | Description |
|---------|-------------|
| [@robinpath/ai](./packages/ai) | LLM integration: OpenAI and Anthropic chat, completion, summarize, extract, classify, translate |
| [@robinpath/archive](./packages/archive) | Create and extract .zip and .tar.gz archives |
| [@robinpath/assert](./packages/assert) | Assertion utilities for equality, type checking, and value validation |
| [@robinpath/auth](./packages/auth) | API authentication: Basic, Bearer, API key, HMAC signing, password hashing |
| [@robinpath/barcode](./packages/barcode) | QR code generation, EAN/UPC barcode validation, ISBN conversion, Luhn checksum |
| [@robinpath/browser](./packages/browser) | Headless browser automation with Puppeteer: navigate, click, type, screenshot, scrape |
| [@robinpath/buffer](./packages/buffer) | Buffer encoding/decoding: Base64, Hex, Base64URL, and byte operations |
| [@robinpath/cache](./packages/cache) | In-memory key-value cache with TTL support |
| [@robinpath/calendar](./packages/calendar) | iCal (.ics) calendar parsing, generation, event management, and date range queries |
| [@robinpath/collection](./packages/collection) | Array and collection manipulation utilities: filtering, sorting, grouping, aggregation, and set operations |
| [@robinpath/color](./packages/color) | ANSI terminal color and style utilities (red, green, bold, underline, RGB, etc.) |
| [@robinpath/config](./packages/config) | Multi-source configuration management with deep merge, dot-path access, validation |
| [@robinpath/cookie](./packages/cookie) | HTTP cookie parsing, serialization, HMAC signing, and cookie jar management |
| [@robinpath/cron](./packages/cron) | Parse, validate, and evaluate cron expressions |
| [@robinpath/crypto](./packages/crypto) | Hashing, HMAC, and encoding/decoding utilities (MD5, SHA, Base64, Hex, URL) |
| [@robinpath/csv](./packages/csv) | Parse and stringify CSV data |
| [@robinpath/database](./packages/database) | SQLite database: query, insert, update, delete, transactions, table management |
| [@robinpath/date](./packages/date) | Parse, format, manipulate, and compare dates and times |
| [@robinpath/debug](./packages/debug) | Debugging utilities: inspect, timers, counters, logging, memory, sizeof, diff |
| [@robinpath/diff](./packages/diff) | Compute diffs between strings, arrays, and objects (lines, chars, words, unified) |
| [@robinpath/dns](./packages/dns) | DNS lookups: resolve, reverse, MX, TXT, NS, SRV, SOA, CNAME records |
| [@robinpath/docker](./packages/docker) | Docker container and image management: run, stop, build, pull, exec, networks, volumes |
| [@robinpath/dotenv](./packages/dotenv) | Parse, load, and manage .env files and environment variables |
| [@robinpath/email](./packages/email) | SMTP email sending with transports, attachments, address parsing, and testing |
| [@robinpath/encode](./packages/encode) | Encoding conversions: Base64, Hex, Base32, URL, HTML, UTF-8, binary, ROT13 |
| [@robinpath/encrypt](./packages/encrypt) | AES/RSA encryption, decryption, hashing, and key derivation |
| [@robinpath/env](./packages/env) | Read, write, and manage environment variables |
| [@robinpath/event](./packages/event) | Pub/sub event system with named buses, listeners, history, and async waitFor |
| [@robinpath/excel](./packages/excel) | Read, write, and manipulate Excel spreadsheets (.xlsx) |
| [@robinpath/faker](./packages/faker) | Fake data generation: names, emails, addresses, numbers, UUIDs, lorem ipsum |
| [@robinpath/feed](./packages/feed) | RSS, Atom, and JSON Feed creation, parsing, merging, and auto-detection |
| [@robinpath/form](./packages/form) | Multipart form data builder, file uploads, URL encoding/decoding, and form submission |
| [@robinpath/fs](./packages/fs) | Read, write, copy, move, and manage files and directories |
| [@robinpath/ftp](./packages/ftp) | FTP and SFTP file transfer: upload, download, list, mkdir, rename |
| [@robinpath/geo](./packages/geo) | Geolocation: distance, bearing, midpoint, bounding box, geocode, reverse geocode |
| [@robinpath/git](./packages/git) | Git operations: clone, init, status, add, commit, push, pull, branch, merge, stash |
| [@robinpath/graph](./packages/graph) | Graph data structures with BFS, DFS, Dijkstra's shortest path, topological sort, cycle detection |
| [@robinpath/glob](./packages/glob) | Glob pattern matching and expansion utilities |
| [@robinpath/graphql](./packages/graphql) | GraphQL client: query, mutate, introspect, batch requests |
| [@robinpath/hash](./packages/hash) | Hashing utilities: MD5, SHA-256, SHA-512, HMAC, CRC32, UUID v5, random bytes |
| [@robinpath/html](./packages/html) | Extract, escape, and manipulate HTML content |
| [@robinpath/http](./packages/http) | HTTP client for GET, POST, PUT, PATCH, DELETE, and file downloads |
| [@robinpath/i18n](./packages/i18n) | Internationalization: translations, number/currency/date formatting, pluralization |
| [@robinpath/image](./packages/image) | Image processing: resize, crop, convert, rotate, blur, composite, thumbnail |
| [@robinpath/ini](./packages/ini) | Parse, stringify, and manipulate INI configuration files |
| [@robinpath/json](./packages/json) | JSON parse, stringify, query, merge, flatten, and deep clone utilities |
| [@robinpath/jwt](./packages/jwt) | Sign, verify, and decode JSON Web Tokens (HS256/HS384/HS512) |
| [@robinpath/ldap](./packages/ldap) | LDAP directory operations: search, bind, add, modify, delete, authenticate |
| [@robinpath/log](./packages/log) | Leveled logging with file output, JSON format, tables, groups, and timers |
| [@robinpath/markdown](./packages/markdown) | Extract headings, links, code blocks, frontmatter, and convert Markdown to HTML |
| [@robinpath/math](./packages/math) | Math utilities: clamp, round, random, statistics, factorial, GCD, LCM, lerp |
| [@robinpath/mime](./packages/mime) | MIME type detection from extensions and magic bytes, content type utilities |
| [@robinpath/money](./packages/money) | Currency formatting, parsing, arithmetic, conversion, tax, and discount |
| [@robinpath/mongo](./packages/mongo) | MongoDB client: find, insert, update, delete, aggregate, indexes, collections |
| [@robinpath/mqtt](./packages/mqtt) | MQTT messaging: connect, publish, subscribe, QoS, last will, topics |
| [@robinpath/mysql](./packages/mysql) | MySQL client: query, insert, update, delete, transactions, table management |
| [@robinpath/notification](./packages/notification) | Send notifications to Slack, Discord, Telegram, and Microsoft Teams |
| [@robinpath/oauth](./packages/oauth) | OAuth 2.0 flows: auth URL, code exchange, refresh, PKCE, client credentials |
| [@robinpath/os](./packages/os) | System information: hostname, platform, CPU, memory, network, and more |
| [@robinpath/pagination](./packages/pagination) | Auto-paginate APIs with offset, cursor, page-number, and Link-header strategies |
| [@robinpath/path](./packages/path) | Path manipulation utilities for joining, resolving, and parsing file paths |
| [@robinpath/pdf](./packages/pdf) | Generate and parse PDF documents, extract text, create tables |
| [@robinpath/phone](./packages/phone) | Phone number parsing, formatting, validation, and country detection |
| [@robinpath/postgres](./packages/postgres) | PostgreSQL client: query, insert, update, delete, transactions, LISTEN/NOTIFY |
| [@robinpath/process](./packages/process) | Child process management: run, exec, spawn, kill, memory, CPU usage |
| [@robinpath/promise](./packages/promise) | Async utilities: all, race, retry, parallel, waterfall, throttle, debounce, deferred |
| [@robinpath/proxy](./packages/proxy) | HTTP proxy server with URL rewriting, load balancing, header manipulation, health checks |
| [@robinpath/queue](./packages/queue) | In-memory job queue with priorities, delays, retry, dead-letter, pause/resume |
| [@robinpath/ratelimit](./packages/ratelimit) | Rate limiting: token bucket, sliding window, and fixed window algorithms |
| [@robinpath/redis](./packages/redis) | Redis client: strings, hashes, lists, sets, pub/sub, TTL, key management |
| [@robinpath/regex](./packages/regex) | Regular expression operations for pattern matching, searching, and replacing |
| [@robinpath/retry](./packages/retry) | Retry with exponential backoff and circuit breaker patterns |
| [@robinpath/router](./packages/router) | URL routing and pattern matching: params, groups, middleware, path building |
| [@robinpath/robots](./packages/robots) | robots.txt parsing, generation, URL permission checking, and crawl configuration |
| [@robinpath/rss](./packages/rss) | Parse RSS and Atom feeds, track new items |
| [@robinpath/s3](./packages/s3) | S3-compatible object storage: upload, download, copy, presign, buckets, ACLs |
| [@robinpath/sanitize](./packages/sanitize) | Input sanitization: HTML, XSS, SQL, regex, filenames, URLs, slugs |
| [@robinpath/scheduler](./packages/scheduler) | Task scheduling with cron expressions, one-time runs, pause/resume, history |
| [@robinpath/schema](./packages/schema) | Lightweight data validation with type-safe schema definitions |
| [@robinpath/semver](./packages/semver) | Parse, compare, and validate semantic version strings and ranges |
| [@robinpath/server](./packages/server) | HTTP server: create, route, static files, JSON/HTML responses, CORS |
| [@robinpath/shell](./packages/shell) | Execute shell commands and access process information |
| [@robinpath/sitemap](./packages/sitemap) | XML sitemap generation, parsing, validation, and manipulation |
| [@robinpath/sms](./packages/sms) | SMS sending via Twilio/Vonage, phone validation, GSM encoding, segment counting |
| [@robinpath/soap](./packages/soap) | SOAP web service client, XML-RPC, WSDL parsing, and envelope building |
| [@robinpath/socket](./packages/socket) | WebSocket client: connect, send, receive, message handlers |
| [@robinpath/ssh](./packages/ssh) | Remote SSH command execution and SFTP file transfer |
| [@robinpath/state](./packages/state) | Finite state machine with transitions, guards, actions, context, and history |
| [@robinpath/storage](./packages/storage) | Persistent key-value store and file storage (memory or file-backed) |
| [@robinpath/stream](./packages/stream) | Stream processing for large files: lines, transform, filter, hash, pipe |
| [@robinpath/string](./packages/string) | String utilities: case conversion, slugify, truncate, pad, reverse, and more |
| [@robinpath/table](./packages/table) | Tabular data operations: select, where, join, group, aggregate, pivot |
| [@robinpath/template](./packages/template) | Mustache-like template rendering with variables, sections, and loops |
| [@robinpath/toml](./packages/toml) | Parse, stringify, and manipulate TOML configuration files |
| [@robinpath/transform](./packages/transform) | Data transformation: pick, omit, rename, coerce, flatten, merge, pipeline |
| [@robinpath/url](./packages/url) | Parse, format, resolve, and manipulate URLs and query parameters |
| [@robinpath/uuid](./packages/uuid) | Generate and validate UUIDs (v4, v5) |
| [@robinpath/validate](./packages/validate) | Validate strings, numbers, and data formats (email, URL, IP, UUID, JSON, etc.) |
| [@robinpath/webhook](./packages/webhook) | Send webhooks with HMAC signatures, verify payloads, prevent replay attacks |
| [@robinpath/workflow](./packages/workflow) | Workflow orchestration: steps, conditions, loops, parallel execution, branching |
| [@robinpath/xml](./packages/xml) | Parse, stringify, query, and validate XML documents |
| [@robinpath/yaml](./packages/yaml) | Parse, stringify, and manipulate YAML documents |
| [@robinpath/zip](./packages/zip) | Gzip, deflate, and Brotli compression/decompression utilities |

## Usage

```ts
import { RobinPath } from "@wiredwp/robinpath";
import CsvModule from "@robinpath/csv";

const rp = new RobinPath();
rp.registerModule(CsvModule.name, CsvModule.functions);
rp.registerModuleMeta(CsvModule.name, CsvModule.functionMetadata);

await rp.executeScript('set $data = csv.parse "name,age\nAlice,30\nBob,25"');
```

## Development

```bash
npm install
cd packages/csv
npm run build
npm test
```
