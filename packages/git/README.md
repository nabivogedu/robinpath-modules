# @robinpath/git

> Git version control operations using the system git binary

![Category](https://img.shields.io/badge/category-DevOps-blue) ![Functions](https://img.shields.io/badge/functions-16-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `git` module lets you:

- Clone a git repository
- Initialize a new git repository
- Get the working tree status
- Stage files for commit
- Create a commit with the staged changes

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/git
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
git.init
```

## Available Functions

| Function | Description |
|----------|-------------|
| `git.clone` | Clone a git repository |
| `git.init` | Initialize a new git repository |
| `git.status` | Get the working tree status |
| `git.add` | Stage files for commit |
| `git.commit` | Create a commit with the staged changes |
| `git.push` | Push commits to a remote repository |
| `git.pull` | Pull changes from a remote repository |
| `git.branch` | List, create, or delete branches |
| `git.checkout` | Switch branches or restore working tree files |
| `git.log` | Show the commit log |
| `git.diff` | Show changes between commits, working tree, etc. |
| `git.tag` | Create or list tags |
| `git.remote` | List remote repositories |
| `git.merge` | Merge a branch into the current branch |
| `git.stash` | Stash or restore uncommitted changes |
| `git.reset` | Reset the current HEAD to a specified state |

## Examples

### Initialize a new git repository

```robinpath
git.init
```

### Get the working tree status

```robinpath
git.status
```

### Stage files for commit

```robinpath
git.add
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/git";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  git.init
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/docker`](../docker) — Docker module for complementary functionality
- [`@robinpath/github`](../github) — GitHub module for complementary functionality
- [`@robinpath/gitlab`](../gitlab) — GitLab module for complementary functionality
- [`@robinpath/vercel`](../vercel) — Vercel module for complementary functionality
- [`@robinpath/netlify`](../netlify) — Netlify module for complementary functionality

## License

MIT
