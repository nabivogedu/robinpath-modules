# @robinpath/wordpress

> WordPress module for RobinPath.

![Category](https://img.shields.io/badge/category-CMS-blue) ![Functions](https://img.shields.io/badge/functions-53-green) ![Auth](https://img.shields.io/badge/auth-API%20Key-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `wordpress` module lets you:

- List posts with optional filters.
- Get a single post by ID.
- Create a new post.
- Update an existing post.
- Delete a post (trash or force-delete).

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/wordpress
```

## Quick Start

**1. Set up credentials**

```robinpath
wordpress.setCredentials "https://mysite.com" "admin" "xxxx xxxx xxxx xxxx"
```

**2. List posts with optional filters.**

```robinpath
wordpress.listPosts {"per_page":5,"status":"publish"}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `wordpress.setCredentials` | Set WordPress site URL and Application Password credentials. |
| `wordpress.listPosts` | List posts with optional filters. |
| `wordpress.getPost` | Get a single post by ID. |
| `wordpress.createPost` | Create a new post. |
| `wordpress.updatePost` | Update an existing post. |
| `wordpress.deletePost` | Delete a post (trash or force-delete). |
| `wordpress.listPages` | List pages with optional filters. |
| `wordpress.createPage` | Create a new page. |
| `wordpress.updatePage` | Update an existing page. |
| `wordpress.deletePage` | Delete a page (trash or force-delete). |
| `wordpress.listCategories` | List post categories. |
| `wordpress.createCategory` | Create a new category. |
| `wordpress.deleteCategory` | Permanently delete a category. |
| `wordpress.listTags` | List post tags. |
| `wordpress.createTag` | Create a new tag. |
| `wordpress.deleteTag` | Permanently delete a tag. |
| `wordpress.listComments` | List comments with optional filters. |
| `wordpress.getComment` | Get a single comment by ID. |
| `wordpress.createComment` | Create a new comment. |
| `wordpress.updateComment` | Update an existing comment. |
| `wordpress.deleteComment` | Delete a comment (trash or force-delete). |
| `wordpress.moderateComment` | Change a comment's moderation status. |
| `wordpress.listMedia` | List media library items. |
| `wordpress.getMedia` | Get a media item by ID. |
| `wordpress.uploadMedia` | Upload a media file. |
| `wordpress.updateMedia` | Update media metadata (title, alt_text, caption, description). |
| `wordpress.deleteMedia` | Permanently delete a media item. |
| `wordpress.listUsers` | List users on the site. |
| `wordpress.getUser` | Get a user by ID. |
| `wordpress.createUser` | Create a new user. |
| `wordpress.updateUser` | Update a user's profile. |
| `wordpress.deleteUser` | Delete a user and reassign their content. |
| `wordpress.getMeta` | Get custom fields/meta for a post or page. |
| `wordpress.updateMeta` | Update custom fields/meta on a post or page. |
| `wordpress.deleteMeta` | Remove a custom field/meta key from a post or page. |
| `wordpress.listRevisions` | List revisions for a post or page. |
| `wordpress.getRevision` | Get a specific revision. |
| `wordpress.deleteRevision` | Permanently delete a revision. |
| `wordpress.listTaxonomies` | List all registered taxonomies. |
| `wordpress.listTerms` | List terms for any taxonomy. |
| `wordpress.createTerm` | Create a term in any taxonomy. |
| `wordpress.listPlugins` | List all installed plugins with status. |
| `wordpress.activatePlugin` | Activate a plugin. |
| `wordpress.deactivatePlugin` | Deactivate a plugin. |
| `wordpress.installPlugin` | Install a plugin from the WordPress.org marketplace. |
| `wordpress.deletePlugin` | Delete (uninstall) a plugin. Plugin must be deactivated first. |
| `wordpress.listThemes` | List all installed themes. |
| `wordpress.activateTheme` | Activate a theme. |
| `wordpress.getSettings` | Get site settings (title, description, timezone, etc.). |
| `wordpress.updateSettings` | Update site settings. |
| `wordpress.search` | Global search across all content types. |
| `wordpress.bulkUpdatePosts` | Update multiple posts at once with the same changes. |
| `wordpress.bulkDeletePosts` | Delete multiple posts at once. |

## Examples

### List posts with optional filters.

```robinpath
wordpress.listPosts {"per_page":5,"status":"publish"}
```

### Get a single post by ID.

```robinpath
wordpress.getPost "123"
```

### Create a new post.

```robinpath
wordpress.createPost {"title":"My Post","content":"<p>Hello</p>","status":"draft"}
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/wordpress";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  wordpress.setCredentials "https://mysite.com" "admin" "xxxx xxxx xxxx xxxx"
  wordpress.listPosts {"per_page":5,"status":"publish"}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
