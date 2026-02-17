import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// ── Internal State ──────────────────────────────────────────────────

interface TokenBucket {
  type: "token-bucket";
  tokens: number;
  maxTokens: number;
  refillRate: number; // tokens per second
  lastRefill: number;
}

interface SlidingWindow {
  type: "sliding-window";
  maxRequests: number;
  windowMs: number;
  timestamps: number[];
}

interface FixedWindow {
  type: "fixed-window";
  maxRequests: number;
  windowMs: number;
  count: number;
  windowStart: number;
}

type Limiter = TokenBucket | SlidingWindow | FixedWindow;

const limiters = new Map<string, Limiter>();

// ── Helpers ─────────────────────────────────────────────────────────

function refillBucket(bucket: TokenBucket): void {
  const now = Date.now();
  const elapsed = (now - bucket.lastRefill) / 1000;
  bucket.tokens = Math.min(bucket.maxTokens, bucket.tokens + elapsed * bucket.refillRate);
  bucket.lastRefill = now;
}

function cleanWindow(window: SlidingWindow): void {
  const cutoff = Date.now() - window.windowMs;
  window.timestamps = window.timestamps.filter((t: any) => t > cutoff);
}

function resetFixedWindow(fw: FixedWindow): void {
  const now = Date.now();
  if (now - fw.windowStart >= fw.windowMs) {
    fw.windowStart = now;
    fw.count = 0;
  }
}

// ── Function Handlers ───────────────────────────────────────────────

const create: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const type = String(args[1] ?? "token-bucket");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (type === "token-bucket") {
    const maxTokens = Number(opts.maxTokens ?? opts.max ?? 10);
    const refillRate = Number(opts.refillRate ?? opts.rate ?? 1);
    const limiter: TokenBucket = {
      type: "token-bucket",
      tokens: maxTokens,
      maxTokens,
      refillRate,
      lastRefill: Date.now(),
    };
    limiters.set(name, limiter);
    return { name, type, maxTokens, refillRate };
  }

  if (type === "sliding-window") {
    const maxRequests = Number(opts.maxRequests ?? opts.max ?? 10);
    const windowMs = Number(opts.windowMs ?? opts.window ?? 60000);
    const limiter: SlidingWindow = {
      type: "sliding-window",
      maxRequests,
      windowMs,
      timestamps: [],
    };
    limiters.set(name, limiter);
    return { name, type, maxRequests, windowMs };
  }

  if (type === "fixed-window") {
    const maxRequests = Number(opts.maxRequests ?? opts.max ?? 10);
    const windowMs = Number(opts.windowMs ?? opts.window ?? 60000);
    const limiter: FixedWindow = {
      type: "fixed-window",
      maxRequests,
      windowMs,
      count: 0,
      windowStart: Date.now(),
    };
    limiters.set(name, limiter);
    return { name, type, maxRequests, windowMs };
  }

  throw new Error(`Unknown rate limiter type: ${type}. Use "token-bucket", "sliding-window", or "fixed-window".`);
};

const acquire: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const count = Math.max(1, parseInt(String(args[1] ?? "1"), 10));
  const limiter = limiters.get(name);
  if (!limiter) throw new Error(`Rate limiter "${name}" not found. Create it first.`);

  if (limiter.type === "token-bucket") {
    refillBucket(limiter);
    if (limiter.tokens >= count) {
      limiter.tokens -= count;
      return { allowed: true, remaining: Math.floor(limiter.tokens) };
    }
    const waitMs = Math.ceil(((count - limiter.tokens) / limiter.refillRate) * 1000);
    return { allowed: false, remaining: Math.floor(limiter.tokens), retryAfterMs: waitMs };
  }

  if (limiter.type === "sliding-window") {
    cleanWindow(limiter);
    if (limiter.timestamps.length + count <= limiter.maxRequests) {
      const now = Date.now();
      for (let i = 0; i < count; i++) limiter.timestamps.push(now);
      return { allowed: true, remaining: limiter.maxRequests - limiter.timestamps.length };
    }
    const oldest = limiter.timestamps[0] ?? Date.now();
    const retryAfterMs = oldest + limiter.windowMs - Date.now();
    return { allowed: false, remaining: 0, retryAfterMs: Math.max(0, retryAfterMs) };
  }

  if (limiter.type === "fixed-window") {
    resetFixedWindow(limiter);
    if (limiter.count + count <= limiter.maxRequests) {
      limiter.count += count;
      return { allowed: true, remaining: limiter.maxRequests - limiter.count };
    }
    const retryAfterMs = limiter.windowStart + limiter.windowMs - Date.now();
    return { allowed: false, remaining: 0, retryAfterMs: Math.max(0, retryAfterMs) };
  }

  throw new Error("Unknown limiter type");
};

const check: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const limiter = limiters.get(name);
  if (!limiter) throw new Error(`Rate limiter "${name}" not found.`);

  if (limiter.type === "token-bucket") {
    refillBucket(limiter);
    return { allowed: limiter.tokens >= 1, remaining: Math.floor(limiter.tokens) };
  }
  if (limiter.type === "sliding-window") {
    cleanWindow(limiter);
    return { allowed: limiter.timestamps.length < limiter.maxRequests, remaining: limiter.maxRequests - limiter.timestamps.length };
  }
  if (limiter.type === "fixed-window") {
    resetFixedWindow(limiter);
    return { allowed: limiter.count < limiter.maxRequests, remaining: limiter.maxRequests - limiter.count };
  }
  throw new Error("Unknown limiter type");
};

const remaining: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const limiter = limiters.get(name);
  if (!limiter) throw new Error(`Rate limiter "${name}" not found.`);

  if (limiter.type === "token-bucket") {
    refillBucket(limiter);
    return Math.floor(limiter.tokens);
  }
  if (limiter.type === "sliding-window") {
    cleanWindow(limiter);
    return limiter.maxRequests - limiter.timestamps.length;
  }
  if (limiter.type === "fixed-window") {
    resetFixedWindow(limiter);
    return limiter.maxRequests - limiter.count;
  }
  return 0;
};

const wait: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "default");
  const maxWait = parseInt(String(args[1] ?? "30000"), 10);
  const start = Date.now();

  while (Date.now() - start < maxWait) {
    const result = acquire([name]) as { allowed: boolean; remaining: number; retryAfterMs?: number };
    if (result.allowed) return result;
    const waitTime = Math.min(result.retryAfterMs ?? 100, maxWait - (Date.now() - start));
    if (waitTime <= 0) break;
    await new Promise((resolve: any) => setTimeout(resolve, waitTime));
  }

  throw new Error(`Rate limit wait timeout after ${maxWait}ms for "${name}"`);
};

const reset: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const limiter = limiters.get(name);
  if (!limiter) return false;

  if (limiter.type === "token-bucket") {
    limiter.tokens = limiter.maxTokens;
    limiter.lastRefill = Date.now();
  } else if (limiter.type === "sliding-window") {
    limiter.timestamps = [];
  } else if (limiter.type === "fixed-window") {
    limiter.count = 0;
    limiter.windowStart = Date.now();
  }
  return true;
};

const status: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const limiter = limiters.get(name);
  if (!limiter) return null;

  if (limiter.type === "token-bucket") {
    refillBucket(limiter);
    return { name, type: limiter.type, tokens: Math.floor(limiter.tokens), maxTokens: limiter.maxTokens, refillRate: limiter.refillRate };
  }
  if (limiter.type === "sliding-window") {
    cleanWindow(limiter);
    return { name, type: limiter.type, used: limiter.timestamps.length, maxRequests: limiter.maxRequests, windowMs: limiter.windowMs };
  }
  if (limiter.type === "fixed-window") {
    resetFixedWindow(limiter);
    return { name, type: limiter.type, count: limiter.count, maxRequests: limiter.maxRequests, windowMs: limiter.windowMs };
  }
  return null;
};

const destroy: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  return limiters.delete(name);
};

// ── Exports ─────────────────────────────────────────────────────────

export const RatelimitFunctions: Record<string, BuiltinHandler> = {
  create, acquire, check, remaining, wait, reset, status, destroy,
};

export const RatelimitFunctionMetadata = {
  create: {
    description: "Create a named rate limiter (token-bucket, sliding-window, or fixed-window)",
    parameters: [
      { name: "name", dataType: "string", description: "Limiter name", formInputType: "text", required: true },
      { name: "type", dataType: "string", description: "Algorithm: token-bucket, sliding-window, or fixed-window", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Config: {maxTokens/max, refillRate/rate} or {maxRequests/max, windowMs/window}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "The limiter configuration",
    example: 'ratelimit.create "api" "token-bucket" {"maxTokens": 100, "refillRate": 10}',
  },
  acquire: {
    description: "Try to acquire tokens/slots from a rate limiter",
    parameters: [
      { name: "name", dataType: "string", description: "Limiter name", formInputType: "text", required: true },
      { name: "count", dataType: "number", description: "Number of tokens to acquire (default 1)", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{allowed: boolean, remaining: number, retryAfterMs?: number}",
    example: 'ratelimit.acquire "api"',
  },
  check: {
    description: "Check if a request would be allowed without consuming a token",
    parameters: [
      { name: "name", dataType: "string", description: "Limiter name", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{allowed: boolean, remaining: number}",
    example: 'ratelimit.check "api"',
  },
  remaining: {
    description: "Get the number of remaining tokens/slots",
    parameters: [
      { name: "name", dataType: "string", description: "Limiter name", formInputType: "text", required: true },
    ],
    returnType: "number",
    returnDescription: "Number of remaining tokens or request slots",
    example: 'ratelimit.remaining "api"',
  },
  wait: {
    description: "Wait until a token is available, then acquire it",
    parameters: [
      { name: "name", dataType: "string", description: "Limiter name", formInputType: "text", required: true },
      { name: "maxWait", dataType: "number", description: "Max wait time in ms (default 30000)", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{allowed: true, remaining: number} when token is acquired",
    example: 'ratelimit.wait "api" 5000',
  },
  reset: {
    description: "Reset a rate limiter to its initial state",
    parameters: [
      { name: "name", dataType: "string", description: "Limiter name", formInputType: "text", required: true },
    ],
    returnType: "boolean",
    returnDescription: "True if reset successfully",
    example: 'ratelimit.reset "api"',
  },
  status: {
    description: "Get detailed status information for a rate limiter",
    parameters: [
      { name: "name", dataType: "string", description: "Limiter name", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Object with type-specific status details",
    example: 'ratelimit.status "api"',
  },
  destroy: {
    description: "Remove a rate limiter and free its resources",
    parameters: [
      { name: "name", dataType: "string", description: "Limiter name", formInputType: "text", required: true },
    ],
    returnType: "boolean",
    returnDescription: "True if the limiter existed and was destroyed",
    example: 'ratelimit.destroy "api"',
  },
};

export const RatelimitModuleMetadata = {
  description: "Rate limiting with token bucket, sliding window, and fixed window algorithms",
  methods: ["create", "acquire", "check", "remaining", "wait", "reset", "status", "destroy"],
};
