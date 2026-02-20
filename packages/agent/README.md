# @robinpath/agent

> AI agent integration for Claude Code and OpenAI Codex — prompts, parsing, caching, retries, batch processing, classification, extraction, guards, and context management

![Category](https://img.shields.io/badge/category-AI-blue) ![Functions](https://img.shields.io/badge/functions-14-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `agent` module lets you:

- Configure pipeline settings for AI agent execution
- Send a prompt to Claude Code CLI and parse the structured response
- Send a prompt to OpenAI Codex CLI and parse the structured response
- Set global debug verbosity level (0=off, 1=info, 2=verbose, 3=trace)
- Set the log file path for debug output

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/agent
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
agent.claude "analyze" {"question": "What is 2+2?", "expectedOutput": "NUMBER"} into $answer
```

## Available Functions

| Function | Description |
|----------|-------------|
| `agent.pipeline` | Configure pipeline settings for AI agent execution |
| `agent.claude` | Send a prompt to Claude Code CLI and parse the structured response |
| `agent.codex` | Send a prompt to OpenAI Codex CLI and parse the structured response |
| `agent.debug` | Set global debug verbosity level (0=off, 1=info, 2=verbose, 3=trace) |
| `agent.log` | Set the log file path for debug output |
| `agent.cost` | Get pipeline cost and timing report for all executed steps |
| `agent.notify` | Configure notification settings for pipeline events |
| `agent.model` | Set or get the default AI model for all subsequent steps |
| `agent.prompt` | Load a prompt template from a file with {{variable}} substitution |
| `agent.context` | Manage conversation contexts for multi-turn AI interactions |
| `agent.batch` | Process an array of items through an AI prompt with concurrency control |
| `agent.classify` | Classify text into one of the given categories (sugar for common AI task) |
| `agent.extract` | Extract structured fields from unstructured text as a JSON object |
| `agent.guard` | Validate AI output against rules before passing it forward in the pipeline |

## Examples

### Send a prompt to Claude Code CLI and parse the structured response

```robinpath
agent.claude "analyze" {"question": "What is 2+2?", "expectedOutput": "NUMBER"} into $answer
```

### Send a prompt to OpenAI Codex CLI and parse the structured response

```robinpath
agent.codex "generate" {"question": "Write a hello world in Python", "expectedOutput": "CODE"} into $code
```

### Set global debug verbosity level (0=off, 1=info, 2=verbose, 3=trace)

```robinpath
agent.debug 1
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/agent";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  agent.claude "analyze" {"question": "What is 2+2?", "expectedOutput": "NUMBER"} into $answer
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/openai`](../openai) — OpenAI module for complementary functionality
- [`@robinpath/anthropic`](../anthropic) — Anthropic module for complementary functionality
- [`@robinpath/ai`](../ai) — AI module for complementary functionality
- [`@robinpath/deepl`](../deepl) — DeepL module for complementary functionality
- [`@robinpath/translate`](../translate) — Translate module for complementary functionality

## License

MIT
