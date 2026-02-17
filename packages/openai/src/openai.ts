import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { readFileSync } from "node:fs";
import { basename } from "node:path";

// ── Internal State ──────────────────────────────────────────────────

const BASE_URL = "https://api.openai.com/v1";

let apiKey = "";

function getHeaders(): Record<string, string> {
  if (!apiKey) throw new Error('OpenAI API key not set. Use openai.setApiKey first.');
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
}

function getMultipartHeaders(): Record<string, string> {
  if (!apiKey) throw new Error('OpenAI API key not set. Use openai.setApiKey first.');
  return {
    Authorization: `Bearer ${apiKey}`,
  };
}

async function apiRequest(endpoint: string, options: RequestInit = {}): Promise<Value> {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: { ...getHeaders(), ...(options.headers as Record<string, string> ?? {}) },
  });
  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) throw new Error(`OpenAI API error: ${JSON.stringify(data.error ?? data)}`);
  return data;
}

async function apiMultipartRequest(endpoint: string, formData: FormData): Promise<Value> {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    method: "POST",
    headers: getMultipartHeaders(),
    body: formData,
  });
  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) throw new Error(`OpenAI API error: ${JSON.stringify(data.error ?? data)}`);
  return data;
}

async function apiDownloadRequest(endpoint: string, options: RequestInit = {}): Promise<ArrayBuffer> {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: { ...getHeaders(), ...(options.headers as Record<string, string> ?? {}) },
  });
  if (!response.ok) {
    const data = await response.json() as Record<string, unknown>;
    throw new Error(`OpenAI API error: ${JSON.stringify(data.error ?? data)}`);
  }
  return await response.arrayBuffer();
}

// ── Function Handlers ───────────────────────────────────────────────

const setApiKey: BuiltinHandler = (args) => {
  const key = String(args[0] ?? "");
  if (!key) throw new Error("API key is required");
  apiKey = key;
  return true;
};

const chat: BuiltinHandler = async (args) => {
  const messages = args[0];
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const model = String(opts.model ?? "gpt-4o");
  const temperature = opts.temperature != null ? Number(opts.temperature) : undefined;
  const maxTokens = opts.maxTokens != null ? Number(opts.maxTokens) : undefined;
  const topP = opts.topP != null ? Number(opts.topP) : undefined;
  const tools = opts.tools != null ? opts.tools : undefined;
  const responseFormat = opts.responseFormat != null ? opts.responseFormat : undefined;

  // Normalize messages
  let msgArray: { role: string; content: string }[];
  if (typeof messages === "string") {
    msgArray = [{ role: "user", content: messages }];
  } else if (Array.isArray(messages)) {
    msgArray = messages as { role: string; content: string }[];
  } else {
    msgArray = [{ role: "user", content: String(messages) }];
  }

  const body: Record<string, unknown> = { model, messages: msgArray };
  if (temperature !== undefined) body.temperature = temperature;
  if (maxTokens !== undefined) body.max_tokens = maxTokens;
  if (topP !== undefined) body.top_p = topP;
  if (tools !== undefined) body.tools = tools;
  if (responseFormat !== undefined) body.response_format = responseFormat;

  const data = await apiRequest("/chat/completions", {
    method: "POST",
    body: JSON.stringify(body),
  }) as Record<string, unknown>;

  const choices = data.choices as { message: { content: string; role: string; tool_calls?: unknown[] } }[];
  const usage = data.usage as { prompt_tokens: number; completion_tokens: number; total_tokens: number } | undefined;

  return {
    content: choices?.[0]?.message?.content ?? "",
    role: "assistant",
    model: data.model,
    toolCalls: choices?.[0]?.message?.tool_calls ?? undefined,
    usage: usage ? {
      promptTokens: usage.prompt_tokens,
      completionTokens: usage.completion_tokens,
      totalTokens: usage.total_tokens,
    } : undefined,
  };
};

const complete: BuiltinHandler = async (args) => {
  const prompt = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const model = String(opts.model ?? "gpt-3.5-turbo-instruct");
  const temperature = opts.temperature != null ? Number(opts.temperature) : undefined;
  const maxTokens = opts.maxTokens != null ? Number(opts.maxTokens) : 256;
  const topP = opts.topP != null ? Number(opts.topP) : undefined;

  const body: Record<string, unknown> = { model, prompt, max_tokens: maxTokens };
  if (temperature !== undefined) body.temperature = temperature;
  if (topP !== undefined) body.top_p = topP;

  const data = await apiRequest("/completions", {
    method: "POST",
    body: JSON.stringify(body),
  }) as Record<string, unknown>;

  const choices = data.choices as { text: string }[];
  return {
    text: choices?.[0]?.text ?? "",
    model: data.model,
    usage: data.usage,
  };
};

const generateImage: BuiltinHandler = async (args) => {
  const prompt = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const model = String(opts.model ?? "dall-e-3");
  const size = String(opts.size ?? "1024x1024");
  const quality = String(opts.quality ?? "standard");
  const style = opts.style != null ? String(opts.style) : undefined;
  const n = opts.n != null ? Number(opts.n) : 1;

  const body: Record<string, unknown> = { model, prompt, size, quality, n };
  if (style !== undefined) body.style = style;

  const data = await apiRequest("/images/generations", {
    method: "POST",
    body: JSON.stringify(body),
  }) as Record<string, unknown>;

  const images = data.data as { url?: string; b64_json?: string; revised_prompt?: string }[];
  return {
    images: images?.map((img: any) => ({
      url: img.url,
      b64Json: img.b64_json,
      revisedPrompt: img.revised_prompt,
    })) ?? [],
  };
};

const editImage: BuiltinHandler = async (args) => {
  const imagePath = String(args[0] ?? "");
  const prompt = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  const imageBuffer = readFileSync(imagePath);
  const imageFileName = basename(imagePath);

  const formData = new FormData();
  formData.append("image", new Blob([imageBuffer]), imageFileName);
  formData.append("prompt", prompt);

  if (opts.mask) {
    const maskBuffer = readFileSync(String(opts.mask));
    const maskFileName = basename(String(opts.mask));
    formData.append("mask", new Blob([maskBuffer]), maskFileName);
  }
  if (opts.model) formData.append("model", String(opts.model));
  if (opts.n) formData.append("n", String(opts.n));
  if (opts.size) formData.append("size", String(opts.size));

  const data = await apiMultipartRequest("/images/edits", formData) as Record<string, unknown>;
  const images = data.data as { url?: string; b64_json?: string }[];
  return {
    images: images?.map((img: any) => ({
      url: img.url,
      b64Json: img.b64_json,
    })) ?? [],
  };
};

const createImageVariation: BuiltinHandler = async (args) => {
  const imagePath = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const imageBuffer = readFileSync(imagePath);
  const imageFileName = basename(imagePath);

  const formData = new FormData();
  formData.append("image", new Blob([imageBuffer]), imageFileName);
  if (opts.model) formData.append("model", String(opts.model));
  if (opts.n) formData.append("n", String(opts.n));
  if (opts.size) formData.append("size", String(opts.size));

  const data = await apiMultipartRequest("/images/variations", formData) as Record<string, unknown>;
  const images = data.data as { url?: string; b64_json?: string }[];
  return {
    images: images?.map((img: any) => ({
      url: img.url,
      b64Json: img.b64_json,
    })) ?? [],
  };
};

const transcribe: BuiltinHandler = async (args) => {
  const audioPath = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const audioBuffer = readFileSync(audioPath);
  const audioFileName = basename(audioPath);

  const formData = new FormData();
  formData.append("file", new Blob([audioBuffer]), audioFileName);
  formData.append("model", String(opts.model ?? "whisper-1"));
  if (opts.language) formData.append("language", String(opts.language));
  if (opts.responseFormat) formData.append("response_format", String(opts.responseFormat));
  if (opts.temperature != null) formData.append("temperature", String(opts.temperature));

  return await apiMultipartRequest("/audio/transcriptions", formData);
};

const translate: BuiltinHandler = async (args) => {
  const audioPath = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const audioBuffer = readFileSync(audioPath);
  const audioFileName = basename(audioPath);

  const formData = new FormData();
  formData.append("file", new Blob([audioBuffer]), audioFileName);
  formData.append("model", String(opts.model ?? "whisper-1"));
  if (opts.responseFormat) formData.append("response_format", String(opts.responseFormat));
  if (opts.temperature != null) formData.append("temperature", String(opts.temperature));

  return await apiMultipartRequest("/audio/translations", formData);
};

const speak: BuiltinHandler = async (args) => {
  const text = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const model = String(opts.model ?? "tts-1");
  const voice = String(opts.voice ?? "alloy");
  const speed = opts.speed != null ? Number(opts.speed) : undefined;
  const responseFormat = opts.responseFormat != null ? String(opts.responseFormat) : undefined;

  const body: Record<string, unknown> = { model, input: text, voice };
  if (speed !== undefined) body.speed = speed;
  if (responseFormat !== undefined) body.response_format = responseFormat;

  const buffer = await apiDownloadRequest("/audio/speech", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return {
    audio: Buffer.from(buffer),
    format: responseFormat ?? "mp3",
    size: buffer.byteLength,
  };
};

const createEmbedding: BuiltinHandler = async (args) => {
  const input = args[0];
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const model = String(opts.model ?? "text-embedding-3-small");
  const dimensions = opts.dimensions != null ? Number(opts.dimensions) : undefined;

  const texts = Array.isArray(input) ? input.map(String) : [String(input)];
  const body: Record<string, unknown> = { model, input: texts };
  if (dimensions !== undefined) body.dimensions = dimensions;

  const data = await apiRequest("/embeddings", {
    method: "POST",
    body: JSON.stringify(body),
  }) as Record<string, unknown>;

  const embeddings = (data.data as { embedding: number[]; index: number }[])?.map((d: any) => d.embedding) ?? [];
  return {
    embeddings: texts.length === 1 ? embeddings[0] : embeddings,
    model: data.model,
    usage: data.usage,
  };
};

const createModeration: BuiltinHandler = async (args) => {
  const input = args[0];
  const texts = Array.isArray(input) ? input.map(String) : [String(input)];

  const data = await apiRequest("/moderations", {
    method: "POST",
    body: JSON.stringify({ input: texts }),
  }) as Record<string, unknown>;

  const results = data.results as { flagged: boolean; categories: Record<string, boolean>; category_scores: Record<string, number> }[];
  return {
    id: data.id,
    model: data.model,
    results: results?.map((r: any) => ({
      flagged: r.flagged,
      categories: r.categories,
      categoryScores: r.category_scores,
    })) ?? [],
  };
};

const listModels: BuiltinHandler = async () => {
  const data = await apiRequest("/models") as Record<string, unknown>;
  const models = data.data as { id: string; object: string; created: number; owned_by: string }[];
  return models?.map((m: any) => ({
    id: m.id,
    created: m.created,
    ownedBy: m.owned_by,
  })) ?? [];
};

const getModel: BuiltinHandler = async (args) => {
  const modelId = String(args[0] ?? "");
  if (!modelId) throw new Error("Model ID is required");

  const data = await apiRequest(`/models/${encodeURIComponent(modelId)}`) as Record<string, unknown>;
  return data;
};

const uploadFile: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const purpose = String(args[1] ?? "fine-tune");

  const fileBuffer = readFileSync(filePath);
  const fileName = basename(filePath);

  const formData = new FormData();
  formData.append("file", new Blob([fileBuffer]), fileName);
  formData.append("purpose", purpose);

  return await apiMultipartRequest("/files", formData);
};

const listFiles: BuiltinHandler = async (args) => {
  const purpose = args[0] != null ? String(args[0]) : undefined;
  const query = purpose ? `?purpose=${encodeURIComponent(purpose)}` : "";

  const data = await apiRequest(`/files${query}`) as Record<string, unknown>;
  return data.data;
};

const deleteFile: BuiltinHandler = async (args) => {
  const fileId = String(args[0] ?? "");
  if (!fileId) throw new Error("File ID is required");

  return await apiRequest(`/files/${encodeURIComponent(fileId)}`, { method: "DELETE" });
};

const getFileContent: BuiltinHandler = async (args) => {
  const fileId = String(args[0] ?? "");
  if (!fileId) throw new Error("File ID is required");

  const buffer = await apiDownloadRequest(`/files/${encodeURIComponent(fileId)}/content`);
  return Buffer.from(buffer).toString("utf-8");
};

const createFineTune: BuiltinHandler = async (args) => {
  const trainingFile = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const model = String(opts.model ?? "gpt-4o-mini-2024-07-18");
  const suffix = opts.suffix != null ? String(opts.suffix) : undefined;
  const hyperparameters = opts.hyperparameters != null ? opts.hyperparameters : undefined;

  const body: Record<string, unknown> = { training_file: trainingFile, model };
  if (suffix !== undefined) body.suffix = suffix;
  if (hyperparameters !== undefined) body.hyperparameters = hyperparameters;
  if (opts.validationFile) body.validation_file = String(opts.validationFile);

  return await apiRequest("/fine_tuning/jobs", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

const listFineTunes: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const params = new URLSearchParams();
  if (opts.after) params.set("after", String(opts.after));
  if (opts.limit) params.set("limit", String(opts.limit));
  const query = params.toString() ? `?${params.toString()}` : "";

  const data = await apiRequest(`/fine_tuning/jobs${query}`) as Record<string, unknown>;
  return data.data;
};

const getFineTune: BuiltinHandler = async (args) => {
  const fineTuneId = String(args[0] ?? "");
  if (!fineTuneId) throw new Error("Fine-tune job ID is required");

  return await apiRequest(`/fine_tuning/jobs/${encodeURIComponent(fineTuneId)}`);
};

const cancelFineTune: BuiltinHandler = async (args) => {
  const fineTuneId = String(args[0] ?? "");
  if (!fineTuneId) throw new Error("Fine-tune job ID is required");

  return await apiRequest(`/fine_tuning/jobs/${encodeURIComponent(fineTuneId)}/cancel`, {
    method: "POST",
  });
};

const createBatch: BuiltinHandler = async (args) => {
  const inputFileId = String(args[0] ?? "");
  const endpoint = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (!inputFileId) throw new Error("Input file ID is required");
  if (!endpoint) throw new Error("Endpoint is required");

  const body: Record<string, unknown> = {
    input_file_id: inputFileId,
    endpoint,
    completion_window: String(opts.completionWindow ?? "24h"),
  };
  if (opts.metadata) body.metadata = opts.metadata;

  return await apiRequest("/batches", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

const getBatch: BuiltinHandler = async (args) => {
  const batchId = String(args[0] ?? "");
  if (!batchId) throw new Error("Batch ID is required");

  return await apiRequest(`/batches/${encodeURIComponent(batchId)}`);
};

const listBatches: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const params = new URLSearchParams();
  if (opts.after) params.set("after", String(opts.after));
  if (opts.limit) params.set("limit", String(opts.limit));
  const query = params.toString() ? `?${params.toString()}` : "";

  const data = await apiRequest(`/batches${query}`) as Record<string, unknown>;
  return data.data;
};

const cancelBatch: BuiltinHandler = async (args) => {
  const batchId = String(args[0] ?? "");
  if (!batchId) throw new Error("Batch ID is required");

  return await apiRequest(`/batches/${encodeURIComponent(batchId)}/cancel`, {
    method: "POST",
  });
};

// ── Exports ─────────────────────────────────────────────────────────

export const OpenaiFunctions: Record<string, BuiltinHandler> = {
  setApiKey,
  chat,
  complete,
  generateImage,
  editImage,
  createImageVariation,
  transcribe,
  translate,
  speak,
  createEmbedding,
  createModeration,
  listModels,
  getModel,
  uploadFile,
  listFiles,
  deleteFile,
  getFileContent,
  createFineTune,
  listFineTunes,
  getFineTune,
  cancelFineTune,
  createBatch,
  getBatch,
  listBatches,
  cancelBatch,
};

export const OpenaiFunctionMetadata = {
  setApiKey: {
    description: "Set the OpenAI API key for authentication",
    parameters: [
      { name: "apiKey", dataType: "string", description: "Your OpenAI API key", formInputType: "text", required: true },
    ],
    returnType: "boolean",
    returnDescription: "true if key was set",
    example: 'openai.setApiKey "sk-..."',
  },
  chat: {
    description: "Send a chat completion request to OpenAI",
    parameters: [
      { name: "messages", dataType: "any", description: "String or array of {role, content} message objects", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{model, temperature, maxTokens, topP, tools, responseFormat}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{content, role, model, toolCalls, usage}",
    example: 'openai.chat "Hello, how are you?" {"model": "gpt-4o"}',
  },
  complete: {
    description: "Send a legacy completion request",
    parameters: [
      { name: "prompt", dataType: "string", description: "Text prompt for completion", formInputType: "textarea", required: true },
      { name: "options", dataType: "object", description: "{model, temperature, maxTokens, topP}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{text, model, usage}",
    example: 'openai.complete "Once upon a time"',
  },
  generateImage: {
    description: "Generate images using DALL-E",
    parameters: [
      { name: "prompt", dataType: "string", description: "Image description prompt", formInputType: "textarea", required: true },
      { name: "options", dataType: "object", description: "{model, size, quality, style, n}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{images: [{url, b64Json, revisedPrompt}]}",
    example: 'openai.generateImage "A sunset over mountains" {"model": "dall-e-3", "size": "1024x1024"}',
  },
  editImage: {
    description: "Edit an image using DALL-E with an optional mask",
    parameters: [
      { name: "imagePath", dataType: "string", description: "Path to the source image file", formInputType: "text", required: true },
      { name: "prompt", dataType: "string", description: "Description of the edit to make", formInputType: "textarea", required: true },
      { name: "options", dataType: "object", description: "{mask, model, n, size}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{images: [{url, b64Json}]}",
    example: 'openai.editImage "/path/to/image.png" "Add a hat to the person"',
  },
  createImageVariation: {
    description: "Create a variation of an existing image",
    parameters: [
      { name: "imagePath", dataType: "string", description: "Path to the source image file", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{model, n, size}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{images: [{url, b64Json}]}",
    example: 'openai.createImageVariation "/path/to/image.png" {"n": 2}',
  },
  transcribe: {
    description: "Transcribe audio to text using Whisper",
    parameters: [
      { name: "audioPath", dataType: "string", description: "Path to the audio file", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{model, language, responseFormat, temperature}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Transcription result with text",
    example: 'openai.transcribe "/path/to/audio.mp3" {"language": "en"}',
  },
  translate: {
    description: "Translate audio to English text using Whisper",
    parameters: [
      { name: "audioPath", dataType: "string", description: "Path to the audio file", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{model, responseFormat, temperature}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Translation result with English text",
    example: 'openai.translate "/path/to/french-audio.mp3"',
  },
  speak: {
    description: "Convert text to speech using TTS",
    parameters: [
      { name: "text", dataType: "string", description: "Text to convert to speech", formInputType: "textarea", required: true },
      { name: "options", dataType: "object", description: "{model, voice, speed, responseFormat}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{audio, format, size}",
    example: 'openai.speak "Hello world" {"voice": "nova", "model": "tts-1-hd"}',
  },
  createEmbedding: {
    description: "Generate text embeddings",
    parameters: [
      { name: "input", dataType: "any", description: "String or array of strings to embed", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{model, dimensions}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{embeddings, model, usage}",
    example: 'openai.createEmbedding "Hello world" {"model": "text-embedding-3-small"}',
  },
  createModeration: {
    description: "Check text for content policy violations",
    parameters: [
      { name: "input", dataType: "any", description: "String or array of strings to moderate", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{id, model, results: [{flagged, categories, categoryScores}]}",
    example: 'openai.createModeration "Some text to check"',
  },
  listModels: {
    description: "List all available OpenAI models",
    parameters: [],
    returnType: "array",
    returnDescription: "Array of {id, created, ownedBy}",
    example: "openai.listModels",
  },
  getModel: {
    description: "Get details of a specific model",
    parameters: [
      { name: "modelId", dataType: "string", description: "Model ID to look up", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Model details object",
    example: 'openai.getModel "gpt-4o"',
  },
  uploadFile: {
    description: "Upload a file to OpenAI",
    parameters: [
      { name: "filePath", dataType: "string", description: "Path to the file to upload", formInputType: "text", required: true },
      { name: "purpose", dataType: "string", description: "Purpose: fine-tune, assistants, or batch", formInputType: "select", required: true },
    ],
    returnType: "object",
    returnDescription: "Uploaded file object with id, filename, purpose",
    example: 'openai.uploadFile "/path/to/data.jsonl" "fine-tune"',
  },
  listFiles: {
    description: "List uploaded files",
    parameters: [
      { name: "purpose", dataType: "string", description: "Filter by purpose", formInputType: "text", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of file objects",
    example: 'openai.listFiles "fine-tune"',
  },
  deleteFile: {
    description: "Delete an uploaded file",
    parameters: [
      { name: "fileId", dataType: "string", description: "ID of the file to delete", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Deletion confirmation",
    example: 'openai.deleteFile "file-abc123"',
  },
  getFileContent: {
    description: "Get the content of an uploaded file",
    parameters: [
      { name: "fileId", dataType: "string", description: "ID of the file to retrieve", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "File content as text",
    example: 'openai.getFileContent "file-abc123"',
  },
  createFineTune: {
    description: "Create a fine-tuning job",
    parameters: [
      { name: "trainingFile", dataType: "string", description: "File ID of the training data", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{model, hyperparameters, suffix, validationFile}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Fine-tuning job object",
    example: 'openai.createFineTune "file-abc123" {"model": "gpt-4o-mini-2024-07-18", "suffix": "my-model"}',
  },
  listFineTunes: {
    description: "List fine-tuning jobs",
    parameters: [
      { name: "options", dataType: "object", description: "{after, limit}", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of fine-tuning job objects",
    example: 'openai.listFineTunes {"limit": 10}',
  },
  getFineTune: {
    description: "Get details of a fine-tuning job",
    parameters: [
      { name: "fineTuneId", dataType: "string", description: "Fine-tuning job ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Fine-tuning job details",
    example: 'openai.getFineTune "ftjob-abc123"',
  },
  cancelFineTune: {
    description: "Cancel a running fine-tuning job",
    parameters: [
      { name: "fineTuneId", dataType: "string", description: "Fine-tuning job ID to cancel", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Cancelled job details",
    example: 'openai.cancelFineTune "ftjob-abc123"',
  },
  createBatch: {
    description: "Create a batch processing request",
    parameters: [
      { name: "inputFileId", dataType: "string", description: "File ID containing batch requests", formInputType: "text", required: true },
      { name: "endpoint", dataType: "string", description: "API endpoint for batch (e.g. /v1/chat/completions)", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{completionWindow, metadata}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Batch object with id, status",
    example: 'openai.createBatch "file-abc123" "/v1/chat/completions"',
  },
  getBatch: {
    description: "Get details of a batch request",
    parameters: [
      { name: "batchId", dataType: "string", description: "Batch ID to look up", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Batch details object",
    example: 'openai.getBatch "batch_abc123"',
  },
  listBatches: {
    description: "List batch requests",
    parameters: [
      { name: "options", dataType: "object", description: "{after, limit}", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of batch objects",
    example: 'openai.listBatches {"limit": 10}',
  },
  cancelBatch: {
    description: "Cancel a batch request",
    parameters: [
      { name: "batchId", dataType: "string", description: "Batch ID to cancel", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Cancelled batch details",
    example: 'openai.cancelBatch "batch_abc123"',
  },
};

export const OpenaiModuleMetadata = {
  description: "OpenAI API client for chat completions, image generation, audio transcription/TTS, embeddings, moderation, fine-tuning, and batch processing",
  methods: Object.keys(OpenaiFunctions),
  category: "ai",
};
