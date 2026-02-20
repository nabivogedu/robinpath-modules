---
title: "Browser"
module: "browser"
package: "@robinpath/browser"
description: "Headless browser automation with Puppeteer: launch browsers, navigate pages, interact with elements, take screenshots, generate PDFs, and scrape data"
category: "web"
tags: [browser, web]
type: "utility"
auth: "none"
functionCount: 20
---

# Browser

> Headless browser automation with Puppeteer: launch browsers, navigate pages, interact with elements, take screenshots, generate PDFs, and scrape data

**Package:** `@robinpath/browser` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `browser` module when you need to:

- **Launch a headless browser instance** -- Use `browser.launch` to perform this operation
- **Open a new page in a browser instance** -- Use `browser.newPage` to perform this operation
- **Navigate a page to a URL** -- Use `browser.goto` to perform this operation
- **Click an element on the page** -- Use `browser.click` to perform this operation
- **Type text into an input element** -- Use `browser.type` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`launch`](#launch) | Launch a headless browser instance | `{id}` |
| [`newPage`](#newpage) | Open a new page in a browser instance | `{pageId}` |
| [`goto`](#goto) | Navigate a page to a URL | `{url, status}` |
| [`click`](#click) | Click an element on the page | `True` |
| [`type`](#type) | Type text into an input element | `True` |
| [`select`](#select) | Select a dropdown option by value | `{selected}` |
| [`screenshot`](#screenshot) | Take a screenshot of the page | `{path} or {base64}` |
| [`pdf`](#pdf) | Generate a PDF from the page | `{path} or {base64}` |
| [`evaluate`](#evaluate) | Execute JavaScript in the page context | `Result of the evaluated script` |
| [`content`](#content) | Get the full HTML content of the page | `HTML string` |
| [`title`](#title) | Get the page title | `Page title` |
| [`url`](#url) | Get the current URL of the page | `Current URL` |
| [`waitFor`](#waitfor) | Wait for a selector to appear on the page | `True` |
| [`querySelector`](#queryselector) | Get text content or attribute of an element | `Text content or attribute value` |
| [`querySelectorAll`](#queryselectorall) | Get text content of all matching elements | `Array of text content strings` |
| [`cookies`](#cookies) | Get all cookies for the current page | `Array of cookie objects` |
| [`setCookie`](#setcookie) | Set a cookie on the page | `True` |
| [`close`](#close) | Close a page | `True` |
| [`closeBrowser`](#closebrowser) | Close a browser instance and all its pages | `True` |
| [`scrape`](#scrape) | High-level scrape: navigate to URL and extract data by CSS selectors | `{url, data}` |


## Functions

### launch

Launch a headless browser instance

**Module:** `browser` | **Returns:** `object` -- {id}

```robinpath
browser.launch "main" {"headless": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Browser instance name |
| `options` | `object` | No | {headless, args} |

---

### newPage

Open a new page in a browser instance

**Module:** `browser` | **Returns:** `object` -- {pageId}

```robinpath
browser.newPage "main" "page1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `browserId` | `string` | Yes | Browser instance name |
| `pageId` | `string` | Yes | Page identifier |

---

### goto

Navigate a page to a URL

**Module:** `browser` | **Returns:** `object` -- {url, status}

```robinpath
browser.goto "page1" "https://example.com" {"waitUntil": "networkidle2"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page identifier |
| `url` | `string` | Yes | Target URL |
| `options` | `object` | No | {waitUntil: load|domcontentloaded|networkidle0|networkidle2} |

---

### click

Click an element on the page

**Module:** `browser` | **Returns:** `boolean` -- True

```robinpath
browser.click "page1" "#submit-btn"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page identifier |
| `selector` | `string` | Yes | CSS selector |

---

### type

Type text into an input element

**Module:** `browser` | **Returns:** `boolean` -- True

```robinpath
browser.type "page1" "#search" "hello" {"delay": 50}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page identifier |
| `selector` | `string` | Yes | CSS selector |
| `text` | `string` | Yes | Text to type |
| `options` | `object` | No | {delay: ms between keystrokes} |

---

### select

Select a dropdown option by value

**Module:** `browser` | **Returns:** `object` -- {selected}

```robinpath
browser.select "page1" "#country" "US"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page identifier |
| `selector` | `string` | Yes | CSS selector |
| `values` | `array` | Yes | Value(s) to select |

---

### screenshot

Take a screenshot of the page

**Module:** `browser` | **Returns:** `object` -- {path} or {base64}

```robinpath
browser.screenshot "page1" {"path": "./shot.png", "fullPage": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page identifier |
| `options` | `object` | No | {path, fullPage, type: png|jpeg} |

---

### pdf

Generate a PDF from the page

**Module:** `browser` | **Returns:** `object` -- {path} or {base64}

```robinpath
browser.pdf "page1" {"path": "./page.pdf", "format": "A4"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page identifier |
| `options` | `object` | No | {path, format} |

---

### evaluate

Execute JavaScript in the page context

**Module:** `browser` | **Returns:** `any` -- Result of the evaluated script

```robinpath
browser.evaluate "page1" "return document.title"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page identifier |
| `script` | `string` | Yes | JavaScript code to evaluate |

---

### content

Get the full HTML content of the page

**Module:** `browser` | **Returns:** `string` -- HTML string

```robinpath
browser.content "page1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page identifier |

---

### title

Get the page title

**Module:** `browser` | **Returns:** `string` -- Page title

```robinpath
browser.title "page1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page identifier |

---

### url

Get the current URL of the page

**Module:** `browser` | **Returns:** `string` -- Current URL

```robinpath
browser.url "page1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page identifier |

---

### waitFor

Wait for a selector to appear on the page

**Module:** `browser` | **Returns:** `boolean` -- True

```robinpath
browser.waitFor "page1" ".loaded" {"timeout": 5000}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page identifier |
| `selector` | `string` | Yes | CSS selector |
| `options` | `object` | No | {timeout: ms} |

---

### querySelector

Get text content or attribute of an element

**Module:** `browser` | **Returns:** `string` -- Text content or attribute value

```robinpath
browser.querySelector "page1" "h1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page identifier |
| `selector` | `string` | Yes | CSS selector |
| `attribute` | `string` | No | Attribute name (optional, defaults to textContent) |

---

### querySelectorAll

Get text content of all matching elements

**Module:** `browser` | **Returns:** `array` -- Array of text content strings

```robinpath
browser.querySelectorAll "page1" "li.item"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page identifier |
| `selector` | `string` | Yes | CSS selector |

---

### cookies

Get all cookies for the current page

**Module:** `browser` | **Returns:** `array` -- Array of cookie objects

```robinpath
browser.cookies "page1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page identifier |

---

### setCookie

Set a cookie on the page

**Module:** `browser` | **Returns:** `boolean` -- True

```robinpath
browser.setCookie "page1" {"name": "session", "value": "abc123", "domain": "example.com"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page identifier |
| `cookie` | `object` | Yes | {name, value, domain, path, ...} |

---

### close

Close a page

**Module:** `browser` | **Returns:** `boolean` -- True

```robinpath
browser.close "page1"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageId` | `string` | Yes | Page identifier |

---

### closeBrowser

Close a browser instance and all its pages

**Module:** `browser` | **Returns:** `boolean` -- True

```robinpath
browser.closeBrowser "main"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `browserId` | `string` | Yes | Browser instance name |

---

### scrape

High-level scrape: navigate to URL and extract data by CSS selectors

**Module:** `browser` | **Returns:** `object` -- {url, data}

```robinpath
browser.scrape "https://example.com" {"title": "h1", "links": "a"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Target URL |
| `selectors` | `object` | Yes | Map of name to CSS selector |
| `options` | `object` | No | {waitUntil, args} |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Browser "..." not found` | Check the error message for details |
| `Page "..." not found` | Check the error message for details |

```robinpath
set $result as browser.launch "main" {"headless": true}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Browser workflow

Chain multiple browser operations together.

```robinpath
set $r_launch as browser.launch "main" {"headless": true}
set $r_newPage as browser.newPage "main" "page1"
set $r_goto as browser.goto "page1" "https://example.com" {"waitUntil": "networkidle2"}
print "All operations complete"
```

### 2. Safe launch with validation

Check results before proceeding.

```robinpath
set $result as browser.launch "main" {"headless": true}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
