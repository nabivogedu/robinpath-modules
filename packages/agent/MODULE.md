---
title: "Agent"
module: "agent"
package: "@robinpath/agent"
description: "AI agent integration for Claude Code and OpenAI Codex — prompts, parsing, caching, retries, batch processing, classification, extraction, guards, and context management"
category: "ai"
tags: [agent, ai]
type: "integration"
auth: "none"
functionCount: 14
---

# Agent

> AI agent integration for Claude Code and OpenAI Codex — prompts, parsing, caching, retries, batch processing, classification, extraction, guards, and context management

**Package:** `@robinpath/agent` | **Category:** Ai | **Type:** Integration


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `agent` module when you need to:

- **Configure pipeline settings for AI agent execution** -- Use `agent.pipeline` to perform this operation
- **Send a prompt to Claude Code CLI and parse the structured response** -- Use `agent.claude` to perform this operation
- **Send a prompt to OpenAI Codex CLI and parse the structured response** -- Use `agent.codex` to perform this operation
- **Set global debug verbosity level (0=off, 1=info, 2=verbose, 3=trace)** -- Use `agent.debug` to perform this operation
- **Set the log file path for debug output** -- Use `agent.log` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`pipeline`](#pipeline) | Configure pipeline settings for AI agent execution | `Current pipeline configuration` |
| [`claude`](#claude) | Send a prompt to Claude Code CLI and parse the structured response | `Parsed response in the requested format` |
| [`codex`](#codex) | Send a prompt to OpenAI Codex CLI and parse the structured response | `Parsed response in the requested format` |
| [`debug`](#debug) | Set global debug verbosity level (0=off, 1=info, 2=verbose, 3=trace) | `Current debug level` |
| [`log`](#log) | Set the log file path for debug output | `Log file path` |
| [`cost`](#cost) | Get pipeline cost and timing report for all executed steps | `{steps, totalMs, totalRetries, cacheHits, errors, history}` |
| [`notify`](#notify) | Configure notification settings for pipeline events | `Current notification configuration` |
| [`model`](#model) | Set or get the default AI model for all subsequent steps | `Current model name` |
| [`prompt`](#prompt) | Load a prompt template from a file with {{variable}} substitution | `Rendered prompt string` |
| [`context`](#context) | Manage conversation contexts for multi-turn AI interactions | `Context ID (create), boolean (clear/delete), object (get), or list (list)` |
| [`batch`](#batch) | Process an array of items through an AI prompt with concurrency control | `Array of parsed results, one per item` |
| [`classify`](#classify) | Classify text into one of the given categories (sugar for common AI task) | `The matching category name` |
| [`extract`](#extract) | Extract structured fields from unstructured text as a JSON object | `JSON object with extracted field values (null if not found)` |
| [`guard`](#guard) | Validate AI output against rules before passing it forward in the pipeline | `The original value if valid, or default/null based on onFail mode` |


## Functions

### pipeline

Configure pipeline settings for AI agent execution

**Module:** `agent` | **Returns:** `object` -- Current pipeline configuration

```robinpath
agent.pipeline {"retries": 3, "cache": true, "model": "claude-haiku-4-5-20251001"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | Yes | {debug, retries, budget, session, cache, timeout, rateLimit, fallback, onError, dryRun, keepTemp, model} |

---

### claude

Send a prompt to Claude Code CLI and parse the structured response

**Module:** `agent` | **Returns:** `any` -- Parsed response in the requested format

```robinpath
agent.claude "analyze" {"question": "What is 2+2?", "expectedOutput": "NUMBER"} into $answer
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `step` | `string` | Yes | Step name for tracking |
| `options` | `object` | Yes | {question, expectedOutput, model, attachments, condition, retries, onError, context} |

---

### codex

Send a prompt to OpenAI Codex CLI and parse the structured response

**Module:** `agent` | **Returns:** `any` -- Parsed response in the requested format

```robinpath
agent.codex "generate" {"question": "Write a hello world in Python", "expectedOutput": "CODE"} into $code
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `step` | `string` | Yes | Step name for tracking |
| `options` | `object` | Yes | {question, expectedOutput, model, attachments, condition, retries, onError, context} |

---

### debug

Set global debug verbosity level (0=off, 1=info, 2=verbose, 3=trace)

**Module:** `agent` | **Returns:** `number` -- Current debug level

```robinpath
agent.debug 1
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `level` | `number` | Yes | Debug level 0-3 |

---

### log

Set the log file path for debug output

**Module:** `agent` | **Returns:** `string` -- Log file path

```robinpath
agent.log "pipeline.log"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | File path for log output |

---

### cost

Get pipeline cost and timing report for all executed steps

**Module:** `agent` | **Returns:** `object` -- {steps, totalMs, totalRetries, cacheHits, errors, history}

```robinpath
agent.cost into $report
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### notify

Configure notification settings for pipeline events

**Module:** `agent` | **Returns:** `object` -- Current notification configuration

```robinpath
agent.notify {"enabled": true, "onError": true, "transport": "gmail", "to": "admin@example.com"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | Yes | {enabled, onError, onComplete, transport, to} |

---

### model

Set or get the default AI model for all subsequent steps

**Module:** `agent` | **Returns:** `string` -- Current model name

```robinpath
agent.model "claude-haiku-4-5-20251001"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `modelName` | `string` | No | Model identifier (e.g. claude-haiku-4-5-20251001, claude-sonnet-4-5-20250929) |

---

### prompt

Load a prompt template from a file with {{variable}} substitution

**Module:** `agent` | **Returns:** `string` -- Rendered prompt string

```robinpath
agent.prompt "./prompts/analyze.md" {"data": $csvData, "format": "table"} into $q
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to prompt template file |
| `variables` | `object` | No | Variables to substitute in the template |

---

### context

Manage conversation contexts for multi-turn AI interactions

**Module:** `agent` | **Returns:** `any` -- Context ID (create), boolean (clear/delete), object (get), or list (list)

```robinpath
agent.context "create" {"system": "You are a data analyst"} into $ctx
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `action` | `string` | Yes | Action: create, clear, delete, get, list |
| `options` | `object` | No | {id, system} — id for naming, system for system prompt |

---

### batch

Process an array of items through an AI prompt with concurrency control

**Module:** `agent` | **Returns:** `array` -- Array of parsed results, one per item

```robinpath
agent.batch "classify-tickets" {"items": $tickets, "question": "Classify: {{item}}", "expectedOutput": "JSON", "concurrency": 3} into $results
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `step` | `string` | Yes | Batch step name |
| `options` | `object` | Yes | {items, question (with {{item}}/{{index}} placeholders), expectedOutput, concurrency, provider, model, retries, onError} |

---

### classify

Classify text into one of the given categories (sugar for common AI task)

**Module:** `agent` | **Returns:** `string` -- The matching category name

```robinpath
agent.classify "route" {"text": $email, "categories": ["billing", "support", "sales", "spam"]} into $category
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `step` | `string` | Yes | Step name |
| `options` | `object` | Yes | {text, categories (array of strings), provider, model, context} |

---

### extract

Extract structured fields from unstructured text as a JSON object

**Module:** `agent` | **Returns:** `object` -- JSON object with extracted field values (null if not found)

```robinpath
agent.extract "parse-resume" {"text": $resume, "fields": ["name", "email", "experience_years"]} into $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `step` | `string` | Yes | Step name |
| `options` | `object` | Yes | {text, fields (array of field names), provider, model, context} |

---

### guard

Validate AI output against rules before passing it forward in the pipeline

**Module:** `agent` | **Returns:** `any` -- The original value if valid, or default/null based on onFail mode

```robinpath
agent.guard $score {"type": "number", "min": 0, "max": 100}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | `any` | Yes | The value to validate |
| `rules` | `object` | Yes | {type, min, max, minLength, maxLength, pattern, enum, required, notEmpty, onFail (throw|default|null), defaultValue} |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Parsed value is not an array` | Check the error message for details |
| `agent.prompt: file path is required` | Check the error message for details |
| `Could not parse NUMBER from response: "..."` | Check the error message for details |
| `Could not parse BOOLEAN from response: "..."` | Check the error message for details |
| `Could not parse JSON from response: "..."` | Check the error message for details |
| `Could not parse ARRAY from response: "..."` | Check the error message for details |
| `agent....: "question" is required` | Check the error message for details |
| `agent.... step "..." failed after ... attempts: ...` | Check the error message for details |

```robinpath
set $result as agent.pipeline {"retries": 3, "cache": true, "model": "claude-haiku-4-5-20251001"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Agent workflow

Chain multiple agent operations together.

```robinpath
set $r_pipeline as agent.pipeline {"retries": 3, "cache": true, "model": "claude-haiku-4-5-20251001"}
set $r_claude as agent.claude "analyze" {"question": "What is 2+2?", "expectedOutput": "NUMBER"} into $answer
set $r_codex as agent.codex "generate" {"question": "Write a hello world in Python", "expectedOutput": "CODE"} into $code
print "All operations complete"
```

### 2. Safe pipeline with validation

Check results before proceeding.

```robinpath
set $result as agent.pipeline {"retries": 3, "cache": true, "model": "claude-haiku-4-5-20251001"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **openai** -- OpenAI module for complementary functionality
- **anthropic** -- Anthropic module for complementary functionality
- **ai** -- AI module for complementary functionality
- **deepl** -- DeepL module for complementary functionality
- **translate** -- Translate module for complementary functionality
