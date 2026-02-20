# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

RobinPath Modules is an npm workspaces monorepo containing 200+ packages under `@robinpath/*`. Each package is an integration module for the RobinPath scripting language runtime (`@wiredwp/robinpath`). Modules expose functions callable in RobinPath scripts as `moduleName.functionName`.

## Build & Test Commands

```bash
# Build a single package
npm run build -w packages/csv

# Build all packages
npm run build --workspaces

# Run tests for a package (only some packages have tests)
npm run test -w packages/csv

# Tests use Node.js built-in test runner with tsx
node --import tsx --test packages/csv/tests/*.test.ts
```

## Module Architecture

Every module follows an identical structure:

```
packages/[name]/
├── src/
│   ├── index.ts       # Exports the ModuleAdapter
│   └── [name].ts      # All implementation: config, helpers, handlers, metadata
├── package.json       # @robinpath/[name], ESM, peer dep on @wiredwp/robinpath
└── tsconfig.json      # Extends root tsconfig
```

### The ModuleAdapter Contract (`index.ts`)

```typescript
import type { ModuleAdapter } from "@wiredwp/robinpath";

const Module: ModuleAdapter = {
  name: "moduleName",
  functions: ModuleFunctions,          // Record<string, BuiltinHandler>
  functionMetadata: FunctionMetadata,  // Record<string, { description, params, returns, examples }>
  moduleMetadata: ModuleMetadata,      // { description, icon, category }
  global: false,
};
export default Module;
```

### Handler Pattern (`[name].ts`)

- **Type**: `BuiltinHandler = (args: any[]) => any | Promise<any>`
- **Args by index**: `args[0]`, `args[1]`, etc. — coerced with `String(args[0] ?? "")`
- **State**: Internal `Map` for per-module configuration (credentials, base URLs)
- **API modules**: A credential-setting function comes first (e.g., `setCredentials`), followed by a shared `fetch()` helper, then CRUD handlers
- **Metadata exports**: `[Name]Functions`, `[Name]FunctionMetadata`, `[Name]ModuleMetadata`

### Creating a New Module

1. Create `packages/[name]/` with `package.json`, `tsconfig.json`, `src/index.ts`, `src/[name].ts`
2. `package.json`: scope `@robinpath/[name]`, `"type": "module"`, `"main": "dist/index.js"`, peer dep `@wiredwp/robinpath >= 0.20.0`
3. `tsconfig.json`: extend root `../../tsconfig.json`, set `outDir: dist`, `rootDir: src`
4. Follow the handler/adapter pattern from an existing module (csv for sync, google-sheets for async API)

## TypeScript Configuration

- Target: ES2022, Module: Node16, strict mode
- Root `declarations.d.ts` provides ambient types for external dependencies (archiver, sharp, better-sqlite3, etc.)
- All packages compile to `dist/` with declarations and source maps

## Testing Pattern

Tests use `node:test` + `node:assert/strict`, loaded via `tsx`:

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "../src/index.js";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript('moduleName.functionName "arg"');
assert.deepEqual(result, expected);
```

## Package Categories

- **API Integrations**: Slack, Discord, Teams, WordPress, HubSpot, Shopify, Notion, Google Suite, Trello, Jira, GitHub, etc.
- **Data Processing**: CSV, JSON, XML, YAML, TOML, Template, Markdown, HTML
- **Databases**: MongoDB, MySQL, PostgreSQL, Redis, SQLite, Firebase, Supabase
- **Auth & Crypto**: JWT, OAuth, Crypto, Encrypt, Validate
- **Networking**: API (HTTP profiles), WebSocket, DNS, FTP, SSH, SOAP, Webhook
- **File Operations**: FS, Archive, Excel, PDF, Image
- **Cloud**: AWS S3, Azure, DigitalOcean, Vercel, Netlify
- **AI**: OpenAI, Anthropic, Agent
