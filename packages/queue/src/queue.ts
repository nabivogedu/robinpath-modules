import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { randomBytes } from "node:crypto";

// ── Internal State ──────────────────────────────────────────────────

interface Job {
  id: string;
  data: unknown;
  priority: number;
  status: "pending" | "active" | "completed" | "failed" | "delayed";
  attempts: number;
  maxAttempts: number;
  createdAt: number;
  scheduledFor: number;
  startedAt?: number;
  completedAt?: number;
  failedAt?: number;
  error?: string;
  result?: unknown;
}

interface Queue {
  name: string;
  jobs: Map<string, Job>;
  deadLetter: Job[];
  maxDeadLetter: number;
  paused: boolean;
  processed: number;
  failed: number;
}

const queues = new Map<string, Queue>();

function getQueue(name: string): Queue {
  let q = queues.get(name);
  if (!q) {
    q = { name, jobs: new Map(), deadLetter: [], maxDeadLetter: 1000, paused: false, processed: 0, failed: 0 };
    queues.set(name, q);
  }
  return q;
}

function generateId(): string {
  return randomBytes(8).toString("hex");
}

function getNextPending(q: Queue): Job | undefined {
  const now = Date.now();
  let best: Job | undefined;

  for (const job of q.jobs.values()) {
    if (job.status === "delayed" && job.scheduledFor <= now) {
      job.status = "pending";
    }
    if (job.status !== "pending") continue;
    if (!best || job.priority > best.priority || (job.priority === best.priority && job.createdAt < best.createdAt)) {
      best = job;
    }
  }
  return best;
}

// ── Function Handlers ───────────────────────────────────────────────

const create: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const q = getQueue(name);
  if (opts.maxDeadLetter != null) q.maxDeadLetter = Number(opts.maxDeadLetter);
  return { name: q.name, paused: q.paused, maxDeadLetter: q.maxDeadLetter };
};

const push: BuiltinHandler = (args) => {
  const queueName = String(args[0] ?? "default");
  const data = args[1];
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  const q = getQueue(queueName);
  const id = generateId();
  const now = Date.now();
  const delayMs = Number(opts.delay ?? 0);

  const job: Job = {
    id,
    data,
    priority: Number(opts.priority ?? 0),
    status: delayMs > 0 ? "delayed" : "pending",
    attempts: 0,
    maxAttempts: Number(opts.maxAttempts ?? 3),
    createdAt: now,
    scheduledFor: now + delayMs,
  };

  q.jobs.set(id, job);
  return { id: job.id, status: job.status, priority: job.priority, scheduledFor: delayMs > 0 ? new Date(job.scheduledFor).toISOString() : undefined };
};

const pop: BuiltinHandler = (args) => {
  const queueName = String(args[0] ?? "default");
  const q = getQueue(queueName);
  if (q.paused) return null;

  const job = getNextPending(q);
  if (!job) return null;

  job.status = "active";
  job.attempts++;
  job.startedAt = Date.now();

  return { id: job.id, data: job.data, priority: job.priority, attempts: job.attempts, maxAttempts: job.maxAttempts };
};

const complete: BuiltinHandler = (args) => {
  const queueName = String(args[0] ?? "default");
  const jobId = String(args[1] ?? "");
  const result = args[2];

  const q = getQueue(queueName);
  const job = q.jobs.get(jobId);
  if (!job) throw new Error(`Job "${jobId}" not found in queue "${queueName}"`);

  job.status = "completed";
  job.completedAt = Date.now();
  job.result = result;
  q.processed++;

  return { id: job.id, status: "completed", duration: job.completedAt - (job.startedAt ?? job.createdAt) };
};

const fail: BuiltinHandler = (args) => {
  const queueName = String(args[0] ?? "default");
  const jobId = String(args[1] ?? "");
  const error = String(args[2] ?? "Unknown error");

  const q = getQueue(queueName);
  const job = q.jobs.get(jobId);
  if (!job) throw new Error(`Job "${jobId}" not found in queue "${queueName}"`);

  job.error = error;
  job.failedAt = Date.now();

  if (job.attempts < job.maxAttempts) {
    // Re-queue for retry
    job.status = "pending";
    return { id: job.id, status: "retry", attempts: job.attempts, maxAttempts: job.maxAttempts };
  }

  // Move to dead letter
  job.status = "failed";
  q.failed++;
  q.deadLetter.push({ ...job });
  q.jobs.delete(jobId);
  if (q.deadLetter.length > q.maxDeadLetter) {
    q.deadLetter.shift();
  }

  return { id: job.id, status: "dead-letter", attempts: job.attempts, error };
};

const retry: BuiltinHandler = (args) => {
  const queueName = String(args[0] ?? "default");
  const jobId = String(args[1] ?? "");

  const q = getQueue(queueName);

  // Check dead letter queue first
  const dlIndex = q.deadLetter.findIndex((j: any) => j.id === jobId);
  if (dlIndex >= 0) {
    const job = q.deadLetter.splice(dlIndex, 1)[0]!;
    job.status = "pending";
    job.attempts = 0;
    job.error = undefined;
    job.failedAt = undefined;
    q.jobs.set(job.id, job);
    return { id: job.id, status: "pending", source: "dead-letter" };
  }

  const job = q.jobs.get(jobId);
  if (!job) throw new Error(`Job "${jobId}" not found`);

  job.status = "pending";
  job.error = undefined;
  return { id: job.id, status: "pending", source: "queue" };
};

const remove: BuiltinHandler = (args) => {
  const queueName = String(args[0] ?? "default");
  const jobId = String(args[1] ?? "");
  const q = getQueue(queueName);
  return q.jobs.delete(jobId);
};

const size: BuiltinHandler = (args) => {
  const queueName = String(args[0] ?? "default");
  const status = args[1] != null ? String(args[1]) : undefined;
  const q = getQueue(queueName);

  if (!status) return q.jobs.size;

  let count = 0;
  const now = Date.now();
  for (const job of q.jobs.values()) {
    if (job.status === "delayed" && job.scheduledFor <= now) job.status = "pending";
    if (job.status === status) count++;
  }
  return count;
};

const status: BuiltinHandler = (args) => {
  const queueName = String(args[0] ?? "default");
  const q = getQueue(queueName);

  const counts = { pending: 0, active: 0, completed: 0, failed: 0, delayed: 0 };
  const now = Date.now();
  for (const job of q.jobs.values()) {
    if (job.status === "delayed" && job.scheduledFor <= now) job.status = "pending";
    counts[job.status]++;
  }

  return {
    name: q.name,
    paused: q.paused,
    total: q.jobs.size,
    ...counts,
    deadLetter: q.deadLetter.length,
    totalProcessed: q.processed,
    totalFailed: q.failed,
  };
};

const pause: BuiltinHandler = (args) => {
  const queueName = String(args[0] ?? "default");
  const q = getQueue(queueName);
  q.paused = true;
  return { name: q.name, paused: true };
};

const resume: BuiltinHandler = (args) => {
  const queueName = String(args[0] ?? "default");
  const q = getQueue(queueName);
  q.paused = false;
  return { name: q.name, paused: false };
};

const clear: BuiltinHandler = (args) => {
  const queueName = String(args[0] ?? "default");
  const q = getQueue(queueName);
  const count = q.jobs.size;
  q.jobs.clear();
  return { cleared: count };
};

const deadLetter: BuiltinHandler = (args) => {
  const queueName = String(args[0] ?? "default");
  const limit = parseInt(String(args[1] ?? "50"), 10);
  const q = getQueue(queueName);
  return q.deadLetter.slice(-limit).map((j: any) => ({
    id: j.id,
    data: j.data,
    error: j.error,
    attempts: j.attempts,
    failedAt: j.failedAt ? new Date(j.failedAt).toISOString() : null,
  }));
};

const getJob: BuiltinHandler = (args) => {
  const queueName = String(args[0] ?? "default");
  const jobId = String(args[1] ?? "");
  const q = getQueue(queueName);
  const job = q.jobs.get(jobId);
  if (!job) return null;
  return {
    id: job.id,
    data: job.data,
    status: job.status,
    priority: job.priority,
    attempts: job.attempts,
    maxAttempts: job.maxAttempts,
    createdAt: new Date(job.createdAt).toISOString(),
    error: job.error,
  };
};

const destroy: BuiltinHandler = (args) => {
  const queueName = String(args[0] ?? "default");
  return queues.delete(queueName);
};

// ── Exports ─────────────────────────────────────────────────────────

export const QueueFunctions: Record<string, BuiltinHandler> = {
  create, push, pop, complete, fail, retry, remove, size, status, pause, resume, clear, deadLetter, getJob, destroy,
};

export const QueueFunctionMetadata = {
  create: {
    description: "Create a named job queue",
    parameters: [
      { name: "name", dataType: "string", description: "Queue name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{maxDeadLetter: number}", formInputType: "text", required: false },
    ],
    returnType: "object", returnDescription: "Queue configuration", example: 'queue.create "emails"',
  },
  push: {
    description: "Add a job to a queue with optional priority and delay",
    parameters: [
      { name: "queue", dataType: "string", description: "Queue name", formInputType: "text", required: true },
      { name: "data", dataType: "any", description: "Job data/payload", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{priority, delay, maxAttempts}", formInputType: "text", required: false },
    ],
    returnType: "object", returnDescription: "{id, status, priority}", example: 'queue.push "emails" $emailData {"priority": 10}',
  },
  pop: {
    description: "Get the next pending job from a queue (highest priority, oldest first)",
    parameters: [
      { name: "queue", dataType: "string", description: "Queue name", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Job object or null if queue is empty/paused", example: 'queue.pop "emails"',
  },
  complete: {
    description: "Mark a job as completed with an optional result",
    parameters: [
      { name: "queue", dataType: "string", description: "Queue name", formInputType: "text", required: true },
      { name: "jobId", dataType: "string", description: "Job ID", formInputType: "text", required: true },
      { name: "result", dataType: "any", description: "Optional result data", formInputType: "text", required: false },
    ],
    returnType: "object", returnDescription: "{id, status, duration}", example: 'queue.complete "emails" $jobId "sent"',
  },
  fail: {
    description: "Mark a job as failed; auto-retries if under maxAttempts, otherwise moves to dead-letter",
    parameters: [
      { name: "queue", dataType: "string", description: "Queue name", formInputType: "text", required: true },
      { name: "jobId", dataType: "string", description: "Job ID", formInputType: "text", required: true },
      { name: "error", dataType: "string", description: "Error message", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{id, status: 'retry' or 'dead-letter', attempts}", example: 'queue.fail "emails" $jobId "SMTP timeout"',
  },
  retry: {
    description: "Re-queue a failed or dead-letter job for processing",
    parameters: [
      { name: "queue", dataType: "string", description: "Queue name", formInputType: "text", required: true },
      { name: "jobId", dataType: "string", description: "Job ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{id, status, source}", example: 'queue.retry "emails" $jobId',
  },
  remove: {
    description: "Remove a job from a queue", parameters: [
      { name: "queue", dataType: "string", description: "Queue name", formInputType: "text", required: true },
      { name: "jobId", dataType: "string", description: "Job ID", formInputType: "text", required: true },
    ],
    returnType: "boolean", returnDescription: "True if job was removed", example: 'queue.remove "emails" $jobId',
  },
  size: {
    description: "Get the number of jobs in a queue, optionally filtered by status",
    parameters: [
      { name: "queue", dataType: "string", description: "Queue name", formInputType: "text", required: true },
      { name: "status", dataType: "string", description: "Filter: pending, active, completed, failed, delayed", formInputType: "text", required: false },
    ],
    returnType: "number", returnDescription: "Number of jobs", example: 'queue.size "emails" "pending"',
  },
  status: {
    description: "Get detailed status and metrics for a queue",
    parameters: [
      { name: "queue", dataType: "string", description: "Queue name", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Queue status with counts by job status", example: 'queue.status "emails"',
  },
  pause: {
    description: "Pause a queue (pop will return null)",
    parameters: [{ name: "queue", dataType: "string", description: "Queue name", formInputType: "text", required: true }],
    returnType: "object", returnDescription: "{name, paused: true}", example: 'queue.pause "emails"',
  },
  resume: {
    description: "Resume a paused queue",
    parameters: [{ name: "queue", dataType: "string", description: "Queue name", formInputType: "text", required: true }],
    returnType: "object", returnDescription: "{name, paused: false}", example: 'queue.resume "emails"',
  },
  clear: {
    description: "Remove all jobs from a queue",
    parameters: [{ name: "queue", dataType: "string", description: "Queue name", formInputType: "text", required: true }],
    returnType: "object", returnDescription: "{cleared: number}", example: 'queue.clear "emails"',
  },
  deadLetter: {
    description: "List jobs in the dead-letter queue",
    parameters: [
      { name: "queue", dataType: "string", description: "Queue name", formInputType: "text", required: true },
      { name: "limit", dataType: "number", description: "Max entries (default 50)", formInputType: "text", required: false },
    ],
    returnType: "array", returnDescription: "Array of failed jobs", example: 'queue.deadLetter "emails" 10',
  },
  getJob: {
    description: "Get details for a specific job by ID",
    parameters: [
      { name: "queue", dataType: "string", description: "Queue name", formInputType: "text", required: true },
      { name: "jobId", dataType: "string", description: "Job ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Job details or null", example: 'queue.getJob "emails" $jobId',
  },
  destroy: {
    description: "Destroy a queue and free all resources",
    parameters: [{ name: "queue", dataType: "string", description: "Queue name", formInputType: "text", required: true }],
    returnType: "boolean", returnDescription: "True if queue existed", example: 'queue.destroy "emails"',
  },
};

export const QueueModuleMetadata = {
  description: "In-memory job queue with priorities, delayed execution, retry, dead-letter, pause/resume",
  methods: ["create", "push", "pop", "complete", "fail", "retry", "remove", "size", "status", "pause", "resume", "clear", "deadLetter", "getJob", "destroy"],
};
