# @robinpath/browser

> Headless browser automation with Puppeteer: launch browsers, navigate pages, interact with elements, take screenshots, generate PDFs, and scrape data

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-20-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `browser` module lets you:

- Launch a headless browser instance
- Open a new page in a browser instance
- Navigate a page to a URL
- Click an element on the page
- Type text into an input element

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/browser
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
browser.newPage "main" "page1"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `browser.launch` | Launch a headless browser instance |
| `browser.newPage` | Open a new page in a browser instance |
| `browser.goto` | Navigate a page to a URL |
| `browser.click` | Click an element on the page |
| `browser.type` | Type text into an input element |
| `browser.select` | Select a dropdown option by value |
| `browser.screenshot` | Take a screenshot of the page |
| `browser.pdf` | Generate a PDF from the page |
| `browser.evaluate` | Execute JavaScript in the page context |
| `browser.content` | Get the full HTML content of the page |
| `browser.title` | Get the page title |
| `browser.url` | Get the current URL of the page |
| `browser.waitFor` | Wait for a selector to appear on the page |
| `browser.querySelector` | Get text content or attribute of an element |
| `browser.querySelectorAll` | Get text content of all matching elements |
| `browser.cookies` | Get all cookies for the current page |
| `browser.setCookie` | Set a cookie on the page |
| `browser.close` | Close a page |
| `browser.closeBrowser` | Close a browser instance and all its pages |
| `browser.scrape` | High-level scrape: navigate to URL and extract data by CSS selectors |

## Examples

### Open a new page in a browser instance

```robinpath
browser.newPage "main" "page1"
```

### Navigate a page to a URL

```robinpath
browser.goto "page1" "https://example.com" {"waitUntil": "networkidle2"}
```

### Click an element on the page

```robinpath
browser.click "page1" "#submit-btn"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/browser";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  browser.newPage "main" "page1"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
