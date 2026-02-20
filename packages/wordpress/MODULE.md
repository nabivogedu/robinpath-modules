---
title: "WordPress"
module: "wordpress"
package: "@robinpath/wordpress"
description: "WordPress module for RobinPath."
category: "cms"
tags: [wordpress, cms]
type: "integration"
auth: "api-key"
functionCount: 53
---

# WordPress

> WordPress module for RobinPath.

**Package:** `@robinpath/wordpress` | **Category:** Cms | **Type:** Integration


## Authentication

```robinpath
wordpress.setCredentials "https://mysite.com" "admin" "xxxx xxxx xxxx xxxx"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `wordpress` module when you need to:

- **List posts with optional filters.** -- Use `wordpress.listPosts` to perform this operation
- **Get a single post by ID.** -- Use `wordpress.getPost` to perform this operation
- **Create a new post.** -- Use `wordpress.createPost` to perform this operation
- **Update an existing post.** -- Use `wordpress.updatePost` to perform this operation
- **Delete a post (trash or force-delete).** -- Use `wordpress.deletePost` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setCredentials`](#setcredentials) | Set WordPress site URL and Application Password credentials. | `Confirmation message.` |
| [`listPosts`](#listposts) | List posts with optional filters. | `Array of post objects.` |
| [`getPost`](#getpost) | Get a single post by ID. | `Post object.` |
| [`createPost`](#createpost) | Create a new post. | `Created post object.` |
| [`updatePost`](#updatepost) | Update an existing post. | `Updated post object.` |
| [`deletePost`](#deletepost) | Delete a post (trash or force-delete). | `Deleted/trashed post object.` |
| [`listPages`](#listpages) | List pages with optional filters. | `Array of page objects.` |
| [`createPage`](#createpage) | Create a new page. | `Created page object.` |
| [`updatePage`](#updatepage) | Update an existing page. | `Updated page object.` |
| [`deletePage`](#deletepage) | Delete a page (trash or force-delete). | `Deleted/trashed page object.` |
| [`listCategories`](#listcategories) | List post categories. | `Array of category objects.` |
| [`createCategory`](#createcategory) | Create a new category. | `Created category object.` |
| [`deleteCategory`](#deletecategory) | Permanently delete a category. | `Deletion confirmation.` |
| [`listTags`](#listtags) | List post tags. | `Array of tag objects.` |
| [`createTag`](#createtag) | Create a new tag. | `Created tag object.` |
| [`deleteTag`](#deletetag) | Permanently delete a tag. | `Deletion confirmation.` |
| [`listComments`](#listcomments) | List comments with optional filters. | `Array of comment objects.` |
| [`getComment`](#getcomment) | Get a single comment by ID. | `Comment object.` |
| [`createComment`](#createcomment) | Create a new comment. | `Created comment object.` |
| [`updateComment`](#updatecomment) | Update an existing comment. | `Updated comment object.` |
| [`deleteComment`](#deletecomment) | Delete a comment (trash or force-delete). | `Deleted/trashed comment.` |
| [`moderateComment`](#moderatecomment) | Change a comment's moderation status. | `Updated comment object.` |
| [`listMedia`](#listmedia) | List media library items. | `Array of media objects.` |
| [`getMedia`](#getmedia) | Get a media item by ID. | `Media object with source_url, dimensions, etc.` |
| [`uploadMedia`](#uploadmedia) | Upload a media file. | `Uploaded media object with source_url.` |
| [`updateMedia`](#updatemedia) | Update media metadata (title, alt_text, caption, description). | `Updated media object.` |
| [`deleteMedia`](#deletemedia) | Permanently delete a media item. | `Deletion confirmation.` |
| [`listUsers`](#listusers) | List users on the site. | `Array of user objects.` |
| [`getUser`](#getuser) | Get a user by ID. | `User object.` |
| [`createUser`](#createuser) | Create a new user. | `Created user object.` |
| [`updateUser`](#updateuser) | Update a user's profile. | `Updated user object.` |
| [`deleteUser`](#deleteuser) | Delete a user and reassign their content. | `Deletion confirmation.` |
| [`getMeta`](#getmeta) | Get custom fields/meta for a post or page. | `Object containing meta fields.` |
| [`updateMeta`](#updatemeta) | Update custom fields/meta on a post or page. | `Updated post/page object.` |
| [`deleteMeta`](#deletemeta) | Remove a custom field/meta key from a post or page. | `Updated post/page object.` |
| [`listRevisions`](#listrevisions) | List revisions for a post or page. | `Array of revision objects.` |
| [`getRevision`](#getrevision) | Get a specific revision. | `Revision object with content diff.` |
| [`deleteRevision`](#deleterevision) | Permanently delete a revision. | `Deletion confirmation.` |
| [`listTaxonomies`](#listtaxonomies) | List all registered taxonomies. | `Object of taxonomy definitions.` |
| [`listTerms`](#listterms) | List terms for any taxonomy. | `Array of term objects.` |
| [`createTerm`](#createterm) | Create a term in any taxonomy. | `Created term object.` |
| [`listPlugins`](#listplugins) | List all installed plugins with status. | `Array of plugin objects with name, status, version.` |
| [`activatePlugin`](#activateplugin) | Activate a plugin. | `Updated plugin object.` |
| [`deactivatePlugin`](#deactivateplugin) | Deactivate a plugin. | `Updated plugin object.` |
| [`installPlugin`](#installplugin) | Install a plugin from the WordPress.org marketplace. | `Installed plugin object with name, version, status.` |
| [`deletePlugin`](#deleteplugin) | Delete (uninstall) a plugin. Plugin must be deactivated first. | `Deletion confirmation.` |
| [`listThemes`](#listthemes) | List all installed themes. | `Array of theme objects.` |
| [`activateTheme`](#activatetheme) | Activate a theme. | `Updated theme object.` |
| [`getSettings`](#getsettings) | Get site settings (title, description, timezone, etc.). | `Site settings object.` |
| [`updateSettings`](#updatesettings) | Update site settings. | `Updated settings object.` |
| [`search`](#search) | Global search across all content types. | `Array of search result objects with title, url, type.` |
| [`bulkUpdatePosts`](#bulkupdateposts) | Update multiple posts at once with the same changes. | `Array of updated post objects.` |
| [`bulkDeletePosts`](#bulkdeleteposts) | Delete multiple posts at once. | `Array of deletion results.` |


## Functions

### setCredentials

Set WordPress site URL and Application Password credentials.

**Module:** `wordpress` | **Returns:** `string` -- Confirmation message.

```robinpath
wordpress.setCredentials "https://mysite.com" "admin" "xxxx xxxx xxxx xxxx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `siteUrl` | `string` | Yes | WordPress site URL (e.g. https://mysite.com) |
| `username` | `string` | Yes | WordPress username |
| `appPassword` | `string` | Yes | Application Password (WP Admin > Users > Application Passwords) |

---

### listPosts

List posts with optional filters.

**Module:** `wordpress` | **Returns:** `array` -- Array of post objects.

```robinpath
wordpress.listPosts {"per_page":5,"status":"publish"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: per_page, page, status, search, categories, tags, orderby, order, author |

---

### getPost

Get a single post by ID.

**Module:** `wordpress` | **Returns:** `object` -- Post object.

```robinpath
wordpress.getPost "123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postId` | `string` | Yes | Post ID |

---

### createPost

Create a new post.

**Module:** `wordpress` | **Returns:** `object` -- Created post object.

```robinpath
wordpress.createPost {"title":"My Post","content":"<p>Hello</p>","status":"draft"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `post` | `object` | Yes | Post object (title, content, status, categories, tags, featured_media, etc.) |

---

### updatePost

Update an existing post.

**Module:** `wordpress` | **Returns:** `object` -- Updated post object.

```robinpath
wordpress.updatePost "123" {"title":"Updated","status":"publish"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postId` | `string` | Yes | Post ID |
| `post` | `object` | Yes | Fields to update |

---

### deletePost

Delete a post (trash or force-delete).

**Module:** `wordpress` | **Returns:** `object` -- Deleted/trashed post object.

```robinpath
wordpress.deletePost "123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postId` | `string` | Yes | Post ID |
| `force` | `boolean` | No | Permanently delete (default: false = trash) |

---

### listPages

List pages with optional filters.

**Module:** `wordpress` | **Returns:** `array` -- Array of page objects.

```robinpath
wordpress.listPages {"per_page":10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: per_page, page, status, search, parent, orderby, order |

---

### createPage

Create a new page.

**Module:** `wordpress` | **Returns:** `object` -- Created page object.

```robinpath
wordpress.createPage {"title":"About","content":"<p>About us</p>","status":"publish"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | `object` | Yes | Page object (title, content, status, parent, etc.) |

---

### updatePage

Update an existing page.

**Module:** `wordpress` | **Returns:** `object` -- Updated page object.

```robinpath
wordpress.updatePage "456" {"content":"<p>Updated</p>"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page ID |
| `page` | `object` | Yes | Fields to update |

---

### deletePage

Delete a page (trash or force-delete).

**Module:** `wordpress` | **Returns:** `object` -- Deleted/trashed page object.

```robinpath
wordpress.deletePage "456" true
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page ID |
| `force` | `boolean` | No | Permanently delete (default: false = trash) |

---

### listCategories

List post categories.

**Module:** `wordpress` | **Returns:** `array` -- Array of category objects.

```robinpath
wordpress.listCategories
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: per_page, page, search, parent, orderby, order |

---

### createCategory

Create a new category.

**Module:** `wordpress` | **Returns:** `object` -- Created category object.

```robinpath
wordpress.createCategory "Technology"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Category name |
| `options` | `object` | No | Options: description, parent, slug |

---

### deleteCategory

Permanently delete a category.

**Module:** `wordpress` | **Returns:** `object` -- Deletion confirmation.

```robinpath
wordpress.deleteCategory "12"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `categoryId` | `string` | Yes | Category ID |

---

### listTags

List post tags.

**Module:** `wordpress` | **Returns:** `array` -- Array of tag objects.

```robinpath
wordpress.listTags {"search":"javascript"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: per_page, page, search, orderby, order |

---

### createTag

Create a new tag.

**Module:** `wordpress` | **Returns:** `object` -- Created tag object.

```robinpath
wordpress.createTag "react"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Tag name |
| `options` | `object` | No | Options: description, slug |

---

### deleteTag

Permanently delete a tag.

**Module:** `wordpress` | **Returns:** `object` -- Deletion confirmation.

```robinpath
wordpress.deleteTag "34"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tagId` | `string` | Yes | Tag ID |

---

### listComments

List comments with optional filters.

**Module:** `wordpress` | **Returns:** `array` -- Array of comment objects.

```robinpath
wordpress.listComments {"post":"123","status":"approved"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: per_page, page, post, status (approved, hold, spam, trash), search, author, orderby, order |

---

### getComment

Get a single comment by ID.

**Module:** `wordpress` | **Returns:** `object` -- Comment object.

```robinpath
wordpress.getComment "456"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `commentId` | `string` | Yes | Comment ID |

---

### createComment

Create a new comment.

**Module:** `wordpress` | **Returns:** `object` -- Created comment object.

```robinpath
wordpress.createComment {"post":123,"content":"Great article!","author_name":"John"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `comment` | `object` | Yes | Comment object (post, content, author_name, author_email, parent, status) |

---

### updateComment

Update an existing comment.

**Module:** `wordpress` | **Returns:** `object` -- Updated comment object.

```robinpath
wordpress.updateComment "456" {"content":"Edited comment"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `commentId` | `string` | Yes | Comment ID |
| `updates` | `object` | Yes | Fields to update (content, status, etc.) |

---

### deleteComment

Delete a comment (trash or force-delete).

**Module:** `wordpress` | **Returns:** `object` -- Deleted/trashed comment.

```robinpath
wordpress.deleteComment "456"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `commentId` | `string` | Yes | Comment ID |
| `force` | `boolean` | No | Permanently delete (default: false = trash) |

---

### moderateComment

Change a comment's moderation status.

**Module:** `wordpress` | **Returns:** `object` -- Updated comment object.

```robinpath
wordpress.moderateComment "456" "approved"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `commentId` | `string` | Yes | Comment ID |
| `status` | `string` | Yes | New status: approved, hold, spam, trash |

---

### listMedia

List media library items.

**Module:** `wordpress` | **Returns:** `array` -- Array of media objects.

```robinpath
wordpress.listMedia {"media_type":"image","per_page":20}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: per_page, page, search, media_type (image, video, audio, application), mime_type, orderby, order |

---

### getMedia

Get a media item by ID.

**Module:** `wordpress` | **Returns:** `object` -- Media object with source_url, dimensions, etc.

```robinpath
wordpress.getMedia "789"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mediaId` | `string` | Yes | Media ID |

---

### uploadMedia

Upload a media file.

**Module:** `wordpress` | **Returns:** `object` -- Uploaded media object with source_url.

```robinpath
wordpress.uploadMedia "photo.png" content "image/png"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filename` | `string` | Yes | File name |
| `content` | `string` | Yes | File content |
| `mimeType` | `string` | No | MIME type (default: image/png) |

---

### updateMedia

Update media metadata (title, alt_text, caption, description).

**Module:** `wordpress` | **Returns:** `object` -- Updated media object.

```robinpath
wordpress.updateMedia "789" {"alt_text":"Hero image","caption":"Homepage banner"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mediaId` | `string` | Yes | Media ID |
| `updates` | `object` | Yes | Fields: title, alt_text, caption, description |

---

### deleteMedia

Permanently delete a media item.

**Module:** `wordpress` | **Returns:** `object` -- Deletion confirmation.

```robinpath
wordpress.deleteMedia "789"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mediaId` | `string` | Yes | Media ID |
| `force` | `boolean` | No | Force permanent deletion (default: true) |

---

### listUsers

List users on the site.

**Module:** `wordpress` | **Returns:** `array` -- Array of user objects.

```robinpath
wordpress.listUsers {"roles":"administrator"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | Options: per_page, page, search, roles, orderby, order |

---

### getUser

Get a user by ID.

**Module:** `wordpress` | **Returns:** `object` -- User object.

```robinpath
wordpress.getUser "1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | `string` | Yes | User ID |

---

### createUser

Create a new user.

**Module:** `wordpress` | **Returns:** `object` -- Created user object.

```robinpath
wordpress.createUser {"username":"john","email":"john@example.com","password":"SecureP@ss","roles":["editor"]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `user` | `object` | Yes | User object (username, email, password required; also: first_name, last_name, roles, description) |

---

### updateUser

Update a user's profile.

**Module:** `wordpress` | **Returns:** `object` -- Updated user object.

```robinpath
wordpress.updateUser "2" {"roles":["administrator"],"first_name":"John"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | `string` | Yes | User ID |
| `updates` | `object` | Yes | Fields to update (first_name, last_name, email, roles, description, etc.) |

---

### deleteUser

Delete a user and reassign their content.

**Module:** `wordpress` | **Returns:** `object` -- Deletion confirmation.

```robinpath
wordpress.deleteUser "5" "1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | `string` | Yes | User ID to delete |
| `reassignTo` | `string` | Yes | User ID to reassign content to (required by WordPress) |

---

### getMeta

Get custom fields/meta for a post or page.

**Module:** `wordpress` | **Returns:** `object` -- Object containing meta fields.

```robinpath
wordpress.getMeta "posts" "123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postType` | `string` | No | Post type endpoint: 'posts' or 'pages' (default: posts) |
| `postId` | `string` | Yes | Post/Page ID |

---

### updateMeta

Update custom fields/meta on a post or page.

**Module:** `wordpress` | **Returns:** `object` -- Updated post/page object.

```robinpath
wordpress.updateMeta "posts" "123" {"custom_field":"value","price":"29.99"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postType` | `string` | No | Post type endpoint: 'posts' or 'pages' (default: posts) |
| `postId` | `string` | Yes | Post/Page ID |
| `meta` | `object` | Yes | Meta key-value pairs to set |

---

### deleteMeta

Remove a custom field/meta key from a post or page.

**Module:** `wordpress` | **Returns:** `object` -- Updated post/page object.

```robinpath
wordpress.deleteMeta "posts" "123" "custom_field"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postType` | `string` | No | Post type endpoint: 'posts' or 'pages' (default: posts) |
| `postId` | `string` | Yes | Post/Page ID |
| `metaKey` | `string` | Yes | Meta key to remove |

---

### listRevisions

List revisions for a post or page.

**Module:** `wordpress` | **Returns:** `array` -- Array of revision objects.

```robinpath
wordpress.listRevisions "posts" "123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postType` | `string` | No | Post type endpoint: 'posts' or 'pages' (default: posts) |
| `postId` | `string` | Yes | Post/Page ID |

---

### getRevision

Get a specific revision.

**Module:** `wordpress` | **Returns:** `object` -- Revision object with content diff.

```robinpath
wordpress.getRevision "posts" "123" "456"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postType` | `string` | No | Post type endpoint (default: posts) |
| `postId` | `string` | Yes | Post/Page ID |
| `revisionId` | `string` | Yes | Revision ID |

---

### deleteRevision

Permanently delete a revision.

**Module:** `wordpress` | **Returns:** `object` -- Deletion confirmation.

```robinpath
wordpress.deleteRevision "posts" "123" "456"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postType` | `string` | No | Post type endpoint (default: posts) |
| `postId` | `string` | Yes | Post/Page ID |
| `revisionId` | `string` | Yes | Revision ID |

---

### listTaxonomies

List all registered taxonomies.

**Module:** `wordpress` | **Returns:** `object` -- Object of taxonomy definitions.

```robinpath
wordpress.listTaxonomies
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### listTerms

List terms for any taxonomy.

**Module:** `wordpress` | **Returns:** `array` -- Array of term objects.

```robinpath
wordpress.listTerms "categories" {"search":"tech"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `taxonomy` | `string` | Yes | Taxonomy REST slug (e.g. 'categories', 'tags', or custom) |
| `options` | `object` | No | Options: per_page, page, search, parent, orderby, order |

---

### createTerm

Create a term in any taxonomy.

**Module:** `wordpress` | **Returns:** `object` -- Created term object.

```robinpath
wordpress.createTerm "categories" "DevOps" {"slug":"devops"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `taxonomy` | `string` | Yes | Taxonomy REST slug |
| `name` | `string` | Yes | Term name |
| `options` | `object` | No | Options: description, parent, slug |

---

### listPlugins

List all installed plugins with status.

**Module:** `wordpress` | **Returns:** `array` -- Array of plugin objects with name, status, version.

```robinpath
wordpress.listPlugins
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### activatePlugin

Activate a plugin.

**Module:** `wordpress` | **Returns:** `object` -- Updated plugin object.

```robinpath
wordpress.activatePlugin "akismet/akismet"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `plugin` | `string` | Yes | Plugin slug (e.g. 'akismet/akismet') |

---

### deactivatePlugin

Deactivate a plugin.

**Module:** `wordpress` | **Returns:** `object` -- Updated plugin object.

```robinpath
wordpress.deactivatePlugin "akismet/akismet"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `plugin` | `string` | Yes | Plugin slug (e.g. 'akismet/akismet') |

---

### installPlugin

Install a plugin from the WordPress.org marketplace.

**Module:** `wordpress` | **Returns:** `object` -- Installed plugin object with name, version, status.

```robinpath
wordpress.installPlugin "plugin-slug" true
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `slug` | `string` | Yes | Plugin slug from wordpress.org |
| `activate` | `boolean` | No | Activate immediately after install (default: false) |

---

### deletePlugin

Delete (uninstall) a plugin. Plugin must be deactivated first.

**Module:** `wordpress` | **Returns:** `object` -- Deletion confirmation.

```robinpath
wordpress.deletePlugin "folder/plugin-file"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `plugin` | `string` | Yes | Plugin slug with folder (e.g. 'folder/plugin-file') |

---

### listThemes

List all installed themes.

**Module:** `wordpress` | **Returns:** `array` -- Array of theme objects.

```robinpath
wordpress.listThemes
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### activateTheme

Activate a theme.

**Module:** `wordpress` | **Returns:** `object` -- Updated theme object.

```robinpath
wordpress.activateTheme "twentytwentyfour"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `theme` | `string` | Yes | Theme stylesheet slug (e.g. 'twentytwentyfour') |

---

### getSettings

Get site settings (title, description, timezone, etc.).

**Module:** `wordpress` | **Returns:** `object` -- Site settings object.

```robinpath
wordpress.getSettings
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### updateSettings

Update site settings.

**Module:** `wordpress` | **Returns:** `object` -- Updated settings object.

```robinpath
wordpress.updateSettings {"title":"My Enterprise Site","description":"The best site"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `settings` | `object` | Yes | Settings to update (title, description, timezone_string, date_format, etc.) |

---

### search

Global search across all content types.

**Module:** `wordpress` | **Returns:** `array` -- Array of search result objects with title, url, type.

```robinpath
wordpress.search "migration guide"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | Yes | Search query |
| `options` | `object` | No | Options: per_page, page, type (post, term, post-format), subtype |

---

### bulkUpdatePosts

Update multiple posts at once with the same changes.

**Module:** `wordpress` | **Returns:** `array` -- Array of updated post objects.

```robinpath
wordpress.bulkUpdatePosts ["1","2","3"] {"status":"publish","categories":[5]}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postIds` | `array` | Yes | Array of post IDs to update |
| `updates` | `object` | Yes | Fields to apply to all posts |

---

### bulkDeletePosts

Delete multiple posts at once.

**Module:** `wordpress` | **Returns:** `array` -- Array of deletion results.

```robinpath
wordpress.bulkDeletePosts ["10","11","12"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `postIds` | `array` | Yes | Array of post IDs to delete |
| `force` | `boolean` | No | Permanently delete (default: false = trash) |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `WordPress API error (${res.status}): ${text}` | Check the error message for details |
| `wordpress.setCredentials requires siteUrl, username, and appPassword.` | Check the error message for details |
| `wordpress.getPost requires a postId.` | Check the error message for details |
| `wordpress.createPost requires a post object.` | Check the error message for details |
| `wordpress.updatePost requires postId and post object.` | Check the error message for details |
| `wordpress.deletePost requires a postId.` | Check the error message for details |
| `wordpress.createPage requires a page object.` | Check the error message for details |
| `wordpress.updatePage requires pageId and page object.` | Check the error message for details |

```robinpath
set $result as wordpress.listPosts {"per_page":5,"status":"publish"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Posts

Retrieve all items and loop through them.

```robinpath
wordpress.setCredentials $token
set $result as wordpress.listPosts {"per_page":5,"status":"publish"}
each $item in $result
  print $item
end
```

### 2. Create a new item with createPost

Create a new resource and capture the result.

```robinpath
wordpress.setCredentials $token
set $result as wordpress.createPost {"title":"My Post","content":"<p>Hello</p>","status":"draft"}
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
wordpress.setCredentials $token
set $created as wordpress.createPost {"title":"My Post","content":"<p>Hello</p>","status":"draft"}
# Update the created item
wordpress.updatePost "123" {"title":"Updated","status":"publish"}
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
wordpress.setCredentials $token
set $existing as wordpress.listPosts {"per_page":5,"status":"publish"}
if $existing == null
  wordpress.createPost {"title":"My Post","content":"<p>Hello</p>","status":"draft"}
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step WordPress workflow

Chain multiple wordpress operations together.

```robinpath
wordpress.setCredentials $token
set $r_listPosts as wordpress.listPosts {"per_page":5,"status":"publish"}
set $r_getPost as wordpress.getPost "123"
set $r_createPost as wordpress.createPost {"title":"My Post","content":"<p>Hello</p>","status":"draft"}
print "All operations complete"
```

### 6. Safe listPosts with validation

Check results before proceeding.

```robinpath
wordpress.setCredentials $token
set $result as wordpress.listPosts {"per_page":5,"status":"publish"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
