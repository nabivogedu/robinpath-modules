---
title: "Notion"
module: "notion"
package: "@robinpath/notion"
description: "Notion module for RobinPath."
category: "productivity"
tags: [notion, productivity]
type: "integration"
auth: "bearer-token"
functionCount: 11
baseUrl: "https://api.notion.com"
---

# Notion

> Notion module for RobinPath.

**Package:** `@robinpath/notion` | **Category:** Productivity | **Type:** Integration


## Authentication

```robinpath
notion.setToken "ntn_xxx"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `notion` module when you need to:

- **Retrieve a Notion page by ID.** -- Use `notion.getPage` to perform this operation
- **Create a new page in a database or as a child of another page.** -- Use `notion.createPage` to perform this operation
- **Update properties of an existing page.** -- Use `notion.updatePage` to perform this operation
- **Archive (soft-delete) a Notion page.** -- Use `notion.archivePage` to perform this operation
- **Query a Notion database with optional filters and sorts.** -- Use `notion.queryDatabase` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setToken`](#settoken) | Set the Notion integration token. | `Confirmation message.` |
| [`getPage`](#getpage) | Retrieve a Notion page by ID. | `Page object with properties.` |
| [`createPage`](#createpage) | Create a new page in a database or as a child of another page. | `Created page object.` |
| [`updatePage`](#updatepage) | Update properties of an existing page. | `Updated page object.` |
| [`archivePage`](#archivepage) | Archive (soft-delete) a Notion page. | `Archived page object.` |
| [`queryDatabase`](#querydatabase) | Query a Notion database with optional filters and sorts. | `Query results with results array.` |
| [`getDatabase`](#getdatabase) | Retrieve a Notion database schema. | `Database object with properties schema.` |
| [`getBlocks`](#getblocks) | Get child blocks of a page or block. | `List of child block objects.` |
| [`appendBlocks`](#appendblocks) | Append child blocks to a page or block. | `Appended blocks response.` |
| [`deleteBlock`](#deleteblock) | Delete a block by ID. | `Deleted block object.` |
| [`search`](#search) | Search across all pages and databases the integration has access to. | `Search results.` |


## Functions

### setToken

Set the Notion integration token.

**Module:** `notion` | **Returns:** `string` -- Confirmation message.

```robinpath
notion.setToken "ntn_xxx"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | `string` | Yes | Notion internal integration token |

---

### getPage

Retrieve a Notion page by ID.

**Module:** `notion` | **Returns:** `object` -- Page object with properties.

```robinpath
notion.getPage "page-id-here"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | The page ID |

---

### createPage

Create a new page in a database or as a child of another page.

**Module:** `notion` | **Returns:** `object` -- Created page object.

```robinpath
notion.createPage "db-id" {"Name":{"title":[{"text":{"content":"New Page"}}]}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `parentId` | `string` | Yes | Parent database or page ID |
| `properties` | `object` | Yes | Page properties object |
| `options` | `object` | No | Options: parentType ('database'|'page'), children (block array) |

---

### updatePage

Update properties of an existing page.

**Module:** `notion` | **Returns:** `object` -- Updated page object.

```robinpath
notion.updatePage "page-id" {"Status":{"select":{"name":"Done"}}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | The page ID |
| `properties` | `object` | Yes | Properties to update |

---

### archivePage

Archive (soft-delete) a Notion page.

**Module:** `notion` | **Returns:** `object` -- Archived page object.

```robinpath
notion.archivePage "page-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | The page ID to archive |

---

### queryDatabase

Query a Notion database with optional filters and sorts.

**Module:** `notion` | **Returns:** `object` -- Query results with results array.

```robinpath
notion.queryDatabase "db-id" {"filter":{"property":"Status","select":{"equals":"Active"}}}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `databaseId` | `string` | Yes | The database ID |
| `options` | `object` | No | Query options: filter, sorts, start_cursor, page_size |

---

### getDatabase

Retrieve a Notion database schema.

**Module:** `notion` | **Returns:** `object` -- Database object with properties schema.

```robinpath
notion.getDatabase "db-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `databaseId` | `string` | Yes | The database ID |

---

### getBlocks

Get child blocks of a page or block.

**Module:** `notion` | **Returns:** `object` -- List of child block objects.

```robinpath
notion.getBlocks "page-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `blockId` | `string` | Yes | Page or block ID |

---

### appendBlocks

Append child blocks to a page or block.

**Module:** `notion` | **Returns:** `object` -- Appended blocks response.

```robinpath
notion.appendBlocks "page-id" [{"type":"paragraph","paragraph":{"rich_text":[{"text":{"content":"Hello"}}]}}]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `blockId` | `string` | Yes | Page or block ID |
| `children` | `array` | Yes | Array of block objects to append |

---

### deleteBlock

Delete a block by ID.

**Module:** `notion` | **Returns:** `object` -- Deleted block object.

```robinpath
notion.deleteBlock "block-id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `blockId` | `string` | Yes | The block ID to delete |

---

### search

Search across all pages and databases the integration has access to.

**Module:** `notion` | **Returns:** `object` -- Search results.

```robinpath
notion.search "meeting notes"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | No | Search query text |
| `options` | `object` | No | Options: filter, sort, start_cursor, page_size |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Notion: token not configured. Call notion.setToken first.` | Check the error message for details |
| `Notion API error (${res.status}): ${text}` | Check the error message for details |
| `notion.setToken requires a token.` | Check the error message for details |
| `notion.getPage requires a pageId.` | Check the error message for details |
| `notion.createPage requires parentId and properties.` | Check the error message for details |
| `notion.updatePage requires pageId and properties.` | Check the error message for details |
| `notion.archivePage requires a pageId.` | Check the error message for details |
| `notion.queryDatabase requires a databaseId.` | Check the error message for details |

```robinpath
set $result as notion.getPage "page-id-here"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Page

Retrieve all items and loop through them.

```robinpath
notion.setToken $token
set $result as notion.getPage "page-id-here"
each $item in $result
  print $item
end
```

### 2. Create a new item with createPage

Create a new resource and capture the result.

```robinpath
notion.setToken $token
set $result as notion.createPage "db-id" {"Name":{"title":[{"text":{"content":"New Page"}}]}}
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
notion.setToken $token
set $created as notion.createPage "db-id" {"Name":{"title":[{"text":{"content":"New Page"}}]}}
# Update the created item
notion.updatePage "page-id" {"Status":{"select":{"name":"Done"}}}
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
notion.setToken $token
set $existing as notion.getPage "page-id-here"
if $existing == null
  notion.createPage "db-id" {"Name":{"title":[{"text":{"content":"New Page"}}]}}
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step Notion workflow

Chain multiple notion operations together.

```robinpath
notion.setToken $token
set $r_getPage as notion.getPage "page-id-here"
set $r_createPage as notion.createPage "db-id" {"Name":{"title":[{"text":{"content":"New Page"}}]}}
set $r_updatePage as notion.updatePage "page-id" {"Status":{"select":{"name":"Done"}}}
print "All operations complete"
```

### 6. Safe getPage with validation

Check results before proceeding.

```robinpath
notion.setToken $token
set $result as notion.getPage "page-id-here"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **google-sheets** -- Google Sheets module for complementary functionality
- **google-calendar** -- Google Calendar module for complementary functionality
- **google-contacts** -- Google Contacts module for complementary functionality
- **google-forms** -- Google Forms module for complementary functionality
- **gmail** -- Gmail module for complementary functionality
