import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// ── Internal State ──────────────────────────────────────────────────

interface RetryOptions {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  backoffFactor: number;
  retryOn: string[];
  jitter: boolean;
}

interface CircuitBreakerState {
  failures: number;
  threshold: number;
  resetTimeout: number;
  state: "closed" | "open" | "half-open";
  lastFailure: number;
  successesInHalfOpen: number;
  halfOpenThreshold: number;
}

const breakers = new Map<string, CircuitBreakerState>();

const DEFAULT_OPTIONS: RetryOptions = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 30000,
  backoffFactor: 2,
  retryOn: [],
  jitter: true,
};

// ── Helpers ─────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve: any) => setTimeout(resolve, ms));
}

function calculateDelay(attempt: number, options: RetryOptions): number {
  let delay = options.initialDelay * Math.pow(options.backoffFactor, attempt);
  delay = Math.min(delay, options.maxDelay);
  if (options.jitter) {
    delay = delay * (0.5 + Math.random() * 0.5);
  }
  return Math.round(delay);
}

function parseOptions(args: Value[]): RetryOptions {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Partial<RetryOptions>;
  return { ...DEFAULT_OPTIONS, ...opts };
}

// ── Function Handlers ───────────────────────────────────────────────

const execute: BuiltinHandler = async (args) => {
  const fn = args[0];
  const opts = parseOptions(args.slice(1));

  if (typeof fn !== "function") {
    throw new Error("First argument must be a callable function");
  }

  let lastError: unknown;
  for (let attempt = 0; attempt < opts.maxAttempts; attempt++) {
    try {
      const result = await fn();
      return result;
    } catch (err: unknown) {
      lastError = err;
      const message = err instanceof Error ? err.message : String(err);

      if (opts.retryOn.length > 0 && !opts.retryOn.some((s: any) => message.includes(s))) {
        throw err;
      }

      if (attempt < opts.maxAttempts - 1) {
        const delay = calculateDelay(attempt, opts);
        await sleep(delay);
      }
    }
  }

  throw lastError;
};

const withBackoff: BuiltinHandler = (args) => {
  const attempt = parseInt(String(args[0] ?? "0"), 10);
  const initialDelay = parseInt(String(args[1] ?? "1000"), 10);
  const factor = parseFloat(String(args[2] ?? "2"));
  const maxDelay = parseInt(String(args[3] ?? "30000"), 10);
  const jitter = args[4] !== false && args[4] !== "false";

  let delay = initialDelay * Math.pow(factor, attempt);
  delay = Math.min(delay, maxDelay);
  if (jitter) {
    delay = delay * (0.5 + Math.random() * 0.5);
  }
  return Math.round(delay);
};

const isRetryable: BuiltinHandler = (args) => {
  const statusCode = parseInt(String(args[0] ?? "0"), 10);
  // Retryable HTTP status codes: 408 (timeout), 429 (too many), 500, 502, 503, 504
  const retryableCodes = [408, 429, 500, 502, 503, 504];
  return retryableCodes.includes(statusCode);
};

const delay: BuiltinHandler = async (args) => {
  const ms = parseInt(String(args[0] ?? "1000"), 10);
  await sleep(ms);
  return true;
};

const attempts: BuiltinHandler = (args) => {
  const maxAttempts = parseInt(String(args[0] ?? "3"), 10);
  const initialDelay = parseInt(String(args[1] ?? "1000"), 10);
  const factor = parseFloat(String(args[2] ?? "2"));

  const result: { attempt: number; delay: number; totalWait: number }[] = [];
  let totalWait = 0;
  for (let i = 0; i < maxAttempts; i++) {
    const d = i === 0 ? 0 : Math.round(initialDelay * Math.pow(factor, i - 1));
    totalWait += d;
    result.push({ attempt: i + 1, delay: d, totalWait });
  }
  return result;
};

// ── Circuit Breaker ─────────────────────────────────────────────────

const createBreaker: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const threshold = parseInt(String(args[1] ?? "5"), 10);
  const resetTimeout = parseInt(String(args[2] ?? "60000"), 10);

  const state: CircuitBreakerState = {
    failures: 0,
    threshold,
    resetTimeout,
    state: "closed",
    lastFailure: 0,
    successesInHalfOpen: 0,
    halfOpenThreshold: 1,
  };
  breakers.set(name, state);
  return { name, state: state.state, threshold, resetTimeout };
};

const breakerState: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const b = breakers.get(name);
  if (!b) return { name, state: "unknown" };

  // Check if open breaker should transition to half-open
  if (b.state === "open" && Date.now() - b.lastFailure >= b.resetTimeout) {
    b.state = "half-open";
    b.successesInHalfOpen = 0;
  }

  return {
    name,
    state: b.state,
    failures: b.failures,
    threshold: b.threshold,
    resetTimeout: b.resetTimeout,
  };
};

const breakerRecord: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const success = args[1] !== false && args[1] !== "false" && args[1] !== "failure";
  const b = breakers.get(name);
  if (!b) throw new Error(`Circuit breaker "${name}" not found. Create it first.`);

  // Check transition from open → half-open
  if (b.state === "open" && Date.now() - b.lastFailure >= b.resetTimeout) {
    b.state = "half-open";
    b.successesInHalfOpen = 0;
  }

  if (success) {
    if (b.state === "half-open") {
      b.successesInHalfOpen++;
      if (b.successesInHalfOpen >= b.halfOpenThreshold) {
        b.state = "closed";
        b.failures = 0;
      }
    } else {
      b.failures = 0;
    }
  } else {
    b.failures++;
    b.lastFailure = Date.now();
    if (b.failures >= b.threshold) {
      b.state = "open";
    }
  }

  return { name, state: b.state, failures: b.failures };
};

const breakerAllow: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const b = breakers.get(name);
  if (!b) return true;

  if (b.state === "open") {
    if (Date.now() - b.lastFailure >= b.resetTimeout) {
      b.state = "half-open";
      b.successesInHalfOpen = 0;
      return true;
    }
    return false;
  }
  return true;
};

const breakerReset: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const b = breakers.get(name);
  if (!b) return false;
  b.failures = 0;
  b.state = "closed";
  b.lastFailure = 0;
  b.successesInHalfOpen = 0;
  return true;
};

// ── Exports ─────────────────────────────────────────────────────────

export const RetryFunctions: Record<string, BuiltinHandler> = {
  execute,
  withBackoff,
  isRetryable,
  delay,
  attempts,
  createBreaker,
  breakerState,
  breakerRecord,
  breakerAllow,
  breakerReset,
};

export const RetryFunctionMetadata = {
  execute: {
    description: "Execute a function with automatic retry and exponential backoff",
    parameters: [
      { name: "fn", dataType: "string", description: "The async function to execute", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Retry options: maxAttempts, initialDelay, maxDelay, backoffFactor, retryOn, jitter", formInputType: "text", required: false },
    ],
    returnType: "any",
    returnDescription: "The result of the function if it succeeds within the retry limit",
    example: 'retry.execute $myFunction {"maxAttempts": 5, "initialDelay": 2000}',
  },
  withBackoff: {
    description: "Calculate the delay for a given retry attempt using exponential backoff",
    parameters: [
      { name: "attempt", dataType: "number", description: "The current attempt number (0-based)", formInputType: "text", required: true },
      { name: "initialDelay", dataType: "number", description: "Base delay in ms (default 1000)", formInputType: "text", required: false },
      { name: "factor", dataType: "number", description: "Backoff multiplier (default 2)", formInputType: "text", required: false },
      { name: "maxDelay", dataType: "number", description: "Maximum delay in ms (default 30000)", formInputType: "text", required: false },
      { name: "jitter", dataType: "boolean", description: "Add random jitter (default true)", formInputType: "text", required: false },
    ],
    returnType: "number",
    returnDescription: "The delay in milliseconds for the given attempt",
    example: "retry.withBackoff 3 1000 2 30000",
  },
  isRetryable: {
    description: "Check if an HTTP status code is retryable (408, 429, 500, 502, 503, 504)",
    parameters: [
      { name: "statusCode", dataType: "number", description: "The HTTP status code to check", formInputType: "text", required: true },
    ],
    returnType: "boolean",
    returnDescription: "True if the status code is typically retryable",
    example: "retry.isRetryable 503",
  },
  delay: {
    description: "Wait for a specified number of milliseconds",
    parameters: [
      { name: "ms", dataType: "number", description: "Milliseconds to wait", formInputType: "text", required: true },
    ],
    returnType: "boolean",
    returnDescription: "True when the delay completes",
    example: "retry.delay 2000",
  },
  attempts: {
    description: "Preview the delay schedule for a series of retry attempts",
    parameters: [
      { name: "maxAttempts", dataType: "number", description: "Number of attempts (default 3)", formInputType: "text", required: false },
      { name: "initialDelay", dataType: "number", description: "Base delay in ms (default 1000)", formInputType: "text", required: false },
      { name: "factor", dataType: "number", description: "Backoff multiplier (default 2)", formInputType: "text", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of {attempt, delay, totalWait} objects",
    example: "retry.attempts 5 1000 2",
  },
  createBreaker: {
    description: "Create a named circuit breaker with a failure threshold and reset timeout",
    parameters: [
      { name: "name", dataType: "string", description: "Circuit breaker name", formInputType: "text", required: true },
      { name: "threshold", dataType: "number", description: "Number of failures before opening (default 5)", formInputType: "text", required: false },
      { name: "resetTimeout", dataType: "number", description: "Time in ms before transitioning to half-open (default 60000)", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "The circuit breaker configuration",
    example: 'retry.createBreaker "api-service" 3 30000',
  },
  breakerState: {
    description: "Get the current state of a named circuit breaker",
    parameters: [
      { name: "name", dataType: "string", description: "Circuit breaker name", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Object with state (closed/open/half-open), failures, threshold",
    example: 'retry.breakerState "api-service"',
  },
  breakerRecord: {
    description: "Record a success or failure in a circuit breaker",
    parameters: [
      { name: "name", dataType: "string", description: "Circuit breaker name", formInputType: "text", required: true },
      { name: "success", dataType: "boolean", description: "True for success, false or 'failure' for failure", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated circuit breaker state",
    example: 'retry.breakerRecord "api-service" false',
  },
  breakerAllow: {
    description: "Check if a circuit breaker allows requests through",
    parameters: [
      { name: "name", dataType: "string", description: "Circuit breaker name", formInputType: "text", required: true },
    ],
    returnType: "boolean",
    returnDescription: "True if requests are allowed, false if circuit is open",
    example: 'retry.breakerAllow "api-service"',
  },
  breakerReset: {
    description: "Reset a circuit breaker to closed state",
    parameters: [
      { name: "name", dataType: "string", description: "Circuit breaker name", formInputType: "text", required: true },
    ],
    returnType: "boolean",
    returnDescription: "True if reset successfully",
    example: 'retry.breakerReset "api-service"',
  },
};

export const RetryModuleMetadata = {
  description: "Retry with exponential backoff and circuit breaker patterns for resilient automation workflows",
  methods: ["execute", "withBackoff", "isRetryable", "delay", "attempts", "createBreaker", "breakerState", "breakerRecord", "breakerAllow", "breakerReset"],
};
