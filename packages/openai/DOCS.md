---
title: "OpenAI"
module: "openai"
package: "@robinpath/openai"
description: "OpenAI module for RobinPath."
category: "ai"
tags: [openai, ai]
type: "integration"
auth: "api-key"
functionCount: 25
baseUrl: "https://api.openai.com/v1"
---

# OpenAI

> OpenAI module for RobinPath.

**Package:** `@robinpath/openai` | **Category:** Ai | **Type:** Integration


## Authentication

```robinpath
openai.setApiKey "sk-..."
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `openai` module when you need to:

- **Send a chat completion request to OpenAI** -- Use `openai.chat` to perform this operation
- **Send a legacy completion request** -- Use `openai.complete` to perform this operation
- **Generate images using DALL-E** -- Use `openai.generateImage` to perform this operation
- **Edit an image using DALL-E with an optional mask** -- Use `openai.editImage` to perform this operation
- **Create a variation of an existing image** -- Use `openai.createImageVariation` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`setApiKey`](#setapikey) | Set the OpenAI API key for authentication | `true if key was set` |
| [`chat`](#chat) | Send a chat completion request to OpenAI | `{content, role, model, toolCalls, usage}` |
| [`complete`](#complete) | Send a legacy completion request | `{text, model, usage}` |
| [`generateImage`](#generateimage) | Generate images using DALL-E | `{images: [{url, b64Json, revisedPrompt}]}` |
| [`editImage`](#editimage) | Edit an image using DALL-E with an optional mask | `{images: [{url, b64Json}]}` |
| [`createImageVariation`](#createimagevariation) | Create a variation of an existing image | `{images: [{url, b64Json}]}` |
| [`transcribe`](#transcribe) | Transcribe audio to text using Whisper | `Transcription result with text` |
| [`translate`](#translate) | Translate audio to English text using Whisper | `Translation result with English text` |
| [`speak`](#speak) | Convert text to speech using TTS | `{audio, format, size}` |
| [`createEmbedding`](#createembedding) | Generate text embeddings | `{embeddings, model, usage}` |
| [`createModeration`](#createmoderation) | Check text for content policy violations | `{id, model, results: [{flagged, categories, categoryScores}]}` |
| [`listModels`](#listmodels) | List all available OpenAI models | `Array of {id, created, ownedBy}` |
| [`getModel`](#getmodel) | Get details of a specific model | `Model details object` |
| [`uploadFile`](#uploadfile) | Upload a file to OpenAI | `Uploaded file object with id, filename, purpose` |
| [`listFiles`](#listfiles) | List uploaded files | `Array of file objects` |
| [`deleteFile`](#deletefile) | Delete an uploaded file | `Deletion confirmation` |
| [`getFileContent`](#getfilecontent) | Get the content of an uploaded file | `File content as text` |
| [`createFineTune`](#createfinetune) | Create a fine-tuning job | `Fine-tuning job object` |
| [`listFineTunes`](#listfinetunes) | List fine-tuning jobs | `Array of fine-tuning job objects` |
| [`getFineTune`](#getfinetune) | Get details of a fine-tuning job | `Fine-tuning job details` |
| [`cancelFineTune`](#cancelfinetune) | Cancel a running fine-tuning job | `Cancelled job details` |
| [`createBatch`](#createbatch) | Create a batch processing request | `Batch object with id, status` |
| [`getBatch`](#getbatch) | Get details of a batch request | `Batch details object` |
| [`listBatches`](#listbatches) | List batch requests | `Array of batch objects` |
| [`cancelBatch`](#cancelbatch) | Cancel a batch request | `Cancelled batch details` |


## Functions

### setApiKey

Set the OpenAI API key for authentication

**Module:** `openai` | **Returns:** `boolean` -- true if key was set

```robinpath
openai.setApiKey "sk-..."
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | `string` | Yes | Your OpenAI API key |

---

### chat

Send a chat completion request to OpenAI

**Module:** `openai` | **Returns:** `object` -- {content, role, model, toolCalls, usage}

```robinpath
openai.chat "Hello, how are you?" {"model": "gpt-4o"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messages` | `any` | Yes | String or array of {role, content} message objects |
| `options` | `object` | No | {model, temperature, maxTokens, topP, tools, responseFormat} |

---

### complete

Send a legacy completion request

**Module:** `openai` | **Returns:** `object` -- {text, model, usage}

```robinpath
openai.complete "Once upon a time"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | `string` | Yes | Text prompt for completion |
| `options` | `object` | No | {model, temperature, maxTokens, topP} |

---

### generateImage

Generate images using DALL-E

**Module:** `openai` | **Returns:** `object` -- {images: [{url, b64Json, revisedPrompt}]}

```robinpath
openai.generateImage "A sunset over mountains" {"model": "dall-e-3", "size": "1024x1024"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | `string` | Yes | Image description prompt |
| `options` | `object` | No | {model, size, quality, style, n} |

---

### editImage

Edit an image using DALL-E with an optional mask

**Module:** `openai` | **Returns:** `object` -- {images: [{url, b64Json}]}

```robinpath
openai.editImage "/path/to/image.png" "Add a hat to the person"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `imagePath` | `string` | Yes | Path to the source image file |
| `prompt` | `string` | Yes | Description of the edit to make |
| `options` | `object` | No | {mask, model, n, size} |

---

### createImageVariation

Create a variation of an existing image

**Module:** `openai` | **Returns:** `object` -- {images: [{url, b64Json}]}

```robinpath
openai.createImageVariation "/path/to/image.png" {"n": 2}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `imagePath` | `string` | Yes | Path to the source image file |
| `options` | `object` | No | {model, n, size} |

---

### transcribe

Transcribe audio to text using Whisper

**Module:** `openai` | **Returns:** `object` -- Transcription result with text

```robinpath
openai.transcribe "/path/to/audio.mp3" {"language": "en"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioPath` | `string` | Yes | Path to the audio file |
| `options` | `object` | No | {model, language, responseFormat, temperature} |

---

### translate

Translate audio to English text using Whisper

**Module:** `openai` | **Returns:** `object` -- Translation result with English text

```robinpath
openai.translate "/path/to/french-audio.mp3"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `audioPath` | `string` | Yes | Path to the audio file |
| `options` | `object` | No | {model, responseFormat, temperature} |

---

### speak

Convert text to speech using TTS

**Module:** `openai` | **Returns:** `object` -- {audio, format, size}

```robinpath
openai.speak "Hello world" {"voice": "nova", "model": "tts-1-hd"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to convert to speech |
| `options` | `object` | No | {model, voice, speed, responseFormat} |

---

### createEmbedding

Generate text embeddings

**Module:** `openai` | **Returns:** `object` -- {embeddings, model, usage}

```robinpath
openai.createEmbedding "Hello world" {"model": "text-embedding-3-small"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `any` | Yes | String or array of strings to embed |
| `options` | `object` | No | {model, dimensions} |

---

### createModeration

Check text for content policy violations

**Module:** `openai` | **Returns:** `object` -- {id, model, results: [{flagged, categories, categoryScores}]}

```robinpath
openai.createModeration "Some text to check"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `any` | Yes | String or array of strings to moderate |

---

### listModels

List all available OpenAI models

**Module:** `openai` | **Returns:** `array` -- Array of {id, created, ownedBy}

```robinpath
openai.listModels
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

### getModel

Get details of a specific model

**Module:** `openai` | **Returns:** `object` -- Model details object

```robinpath
openai.getModel "gpt-4o"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `modelId` | `string` | Yes | Model ID to look up |

---

### uploadFile

Upload a file to OpenAI

**Module:** `openai` | **Returns:** `object` -- Uploaded file object with id, filename, purpose

```robinpath
openai.uploadFile "/path/to/data.jsonl" "fine-tune"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Path to the file to upload |
| `purpose` | `string` | Yes | Purpose: fine-tune, assistants, or batch |

---

### listFiles

List uploaded files

**Module:** `openai` | **Returns:** `array` -- Array of file objects

```robinpath
openai.listFiles "fine-tune"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `purpose` | `string` | No | Filter by purpose |

---

### deleteFile

Delete an uploaded file

**Module:** `openai` | **Returns:** `object` -- Deletion confirmation

```robinpath
openai.deleteFile "file-abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileId` | `string` | Yes | ID of the file to delete |

---

### getFileContent

Get the content of an uploaded file

**Module:** `openai` | **Returns:** `string` -- File content as text

```robinpath
openai.getFileContent "file-abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileId` | `string` | Yes | ID of the file to retrieve |

---

### createFineTune

Create a fine-tuning job

**Module:** `openai` | **Returns:** `object` -- Fine-tuning job object

```robinpath
openai.createFineTune "file-abc123" {"model": "gpt-4o-mini-2024-07-18", "suffix": "my-model"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `trainingFile` | `string` | Yes | File ID of the training data |
| `options` | `object` | No | {model, hyperparameters, suffix, validationFile} |

---

### listFineTunes

List fine-tuning jobs

**Module:** `openai` | **Returns:** `array` -- Array of fine-tuning job objects

```robinpath
openai.listFineTunes {"limit": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {after, limit} |

---

### getFineTune

Get details of a fine-tuning job

**Module:** `openai` | **Returns:** `object` -- Fine-tuning job details

```robinpath
openai.getFineTune "ftjob-abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fineTuneId` | `string` | Yes | Fine-tuning job ID |

---

### cancelFineTune

Cancel a running fine-tuning job

**Module:** `openai` | **Returns:** `object` -- Cancelled job details

```robinpath
openai.cancelFineTune "ftjob-abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fineTuneId` | `string` | Yes | Fine-tuning job ID to cancel |

---

### createBatch

Create a batch processing request

**Module:** `openai` | **Returns:** `object` -- Batch object with id, status

```robinpath
openai.createBatch "file-abc123" "/v1/chat/completions"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `inputFileId` | `string` | Yes | File ID containing batch requests |
| `endpoint` | `string` | Yes | API endpoint for batch (e.g. /v1/chat/completions) |
| `options` | `object` | No | {completionWindow, metadata} |

---

### getBatch

Get details of a batch request

**Module:** `openai` | **Returns:** `object` -- Batch details object

```robinpath
openai.getBatch "batch_abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `batchId` | `string` | Yes | Batch ID to look up |

---

### listBatches

List batch requests

**Module:** `openai` | **Returns:** `array` -- Array of batch objects

```robinpath
openai.listBatches {"limit": 10}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {after, limit} |

---

### cancelBatch

Cancel a batch request

**Module:** `openai` | **Returns:** `object` -- Cancelled batch details

```robinpath
openai.cancelBatch "batch_abc123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `batchId` | `string` | Yes | Batch ID to cancel |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `OpenAI API key not set. Use openai.setApiKey first.` | Check the error message for details |
| `OpenAI API error: ${JSON.stringify(data.error ?? data)}` | Check the error message for details |
| `API key is required` | Check the error message for details |
| `Model ID is required` | Check the error message for details |
| `File ID is required` | Check the error message for details |
| `Fine-tune job ID is required` | Check the error message for details |
| `Input file ID is required` | Check the error message for details |
| `Endpoint is required` | Check the error message for details |

```robinpath
set $result as openai.chat "Hello, how are you?" {"model": "gpt-4o"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Models

Retrieve all items and loop through them.

```robinpath
openai.setApiKey $token
set $result as openai.listModels
each $item in $result
  print $item
end
```

### 2. Create a new item with createImageVariation

Create a new resource and capture the result.

```robinpath
openai.setApiKey $token
set $result as openai.createImageVariation "/path/to/image.png" {"n": 2}
print "Created: " + $result
```

### 3. Create and update workflow

Create an item and then update it.

```robinpath
openai.setApiKey $token
set $created as openai.createImageVariation "/path/to/image.png" {"n": 2}
# Update the created item
openai.editImage "/path/to/image.png" "Add a hat to the person"
```

### 4. Check before creating

List existing items and only create if needed.

```robinpath
openai.setApiKey $token
set $existing as openai.listModels
if $existing == null
  openai.createImageVariation "/path/to/image.png" {"n": 2}
  print "Item created"
else
  print "Item already exists"
end
```

### 5. Multi-step OpenAI workflow

Chain multiple openai operations together.

```robinpath
openai.setApiKey $token
set $r_chat as openai.chat "Hello, how are you?" {"model": "gpt-4o"}
set $r_complete as openai.complete "Once upon a time"
set $r_generateImage as openai.generateImage "A sunset over mountains" {"model": "dall-e-3", "size": "1024x1024"}
print "All operations complete"
```

### 6. Safe chat with validation

Check results before proceeding.

```robinpath
openai.setApiKey $token
set $result as openai.chat "Hello, how are you?" {"model": "gpt-4o"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **anthropic** -- Anthropic module for complementary functionality
- **ai** -- AI module for complementary functionality
- **deepl** -- DeepL module for complementary functionality
- **translate** -- Translate module for complementary functionality
- **json** -- JSON module for complementary functionality
