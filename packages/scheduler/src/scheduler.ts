import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// ---------------------------------------------------------------------------
// Internal cron parser (5-field: minute hour day-of-month month day-of-week)
// ---------------------------------------------------------------------------

function expandField(field: string, min: number, max: number): number[] {
  const values = new Set<number>();
  for (const part of field.split(",")) {
    const stepMatch = part.match(/^(.+)\/(\d+)$/);
    let range: string, step: number;
    if (stepMatch) { range = stepMatch[1]!; step = Number(stepMatch[2]); }
    else { range = part; step = 1; }

    if (range === "*") {
      for (let i = min; i <= max; i += step) values.add(i);
    } else if (range.includes("-")) {
      const [start, end] = range.split("-").map(Number);
      for (let i = start!; i <= end!; i += step) values.add(i);
    } else {
      values.add(Number(range));
    }
  }
  return [...values].sort((a, b) => a - b);
}

interface ParsedCron {
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[];
  dayOfWeek: number[];
}

function parseCron(expr: string): ParsedCron | null {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  try {
    return {
      minute: expandField(parts[0]!, 0, 59),
      hour: expandField(parts[1]!, 0, 23),
      dayOfMonth: expandField(parts[2]!, 1, 31),
      month: expandField(parts[3]!, 1, 12),
      dayOfWeek: expandField(parts[4]!, 0, 6),
    };
  } catch { return null; }
}

function matchesCron(parsed: ParsedCron, date: Date): boolean {
  return parsed.minute.includes(date.getMinutes()) &&
    parsed.hour.includes(date.getHours()) &&
    parsed.dayOfMonth.includes(date.getDate()) &&
    parsed.month.includes(date.getMonth() + 1) &&
    parsed.dayOfWeek.includes(date.getDay());
}

function findNextCronDate(parsed: ParsedCron, from: Date): Date {
  const d = new Date(from);
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);
  for (let i = 0; i < 525960; i++) { // up to ~1 year of minutes
    if (matchesCron(parsed, d)) return d;
    d.setMinutes(d.getMinutes() + 1);
  }
  throw new Error("No matching cron date found within 1 year");
}

// ---------------------------------------------------------------------------
// Job state
// ---------------------------------------------------------------------------

interface JobEntry {
  id: string;
  cron: string | null;
  nextRun: Date;
  interval: ReturnType<typeof setTimeout> | null;
  paused: boolean;
  type: "recurring" | "once";
  action: unknown;
  history: { ran: string; status: string }[];
}

const jobs = new Map<string, JobEntry>();

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function scheduleNextTick(job: JobEntry): void {
  if (job.interval !== null) { clearTimeout(job.interval); job.interval = null; }
  if (job.paused) return;

  const now = new Date();
  const delay = Math.max(job.nextRun.getTime() - now.getTime(), 0);

  job.interval = setTimeout(() => {
    // Record execution
    job.history.push({ ran: new Date().toISOString(), status: "executed" });
    // Keep history bounded
    if (job.history.length > 200) job.history.splice(0, job.history.length - 200);

    if (job.type === "recurring" && job.cron) {
      const parsed = parseCron(job.cron);
      if (parsed) {
        job.nextRun = findNextCronDate(parsed, new Date());
        scheduleNextTick(job);
      }
    } else {
      // one-time job: clean up after execution
      job.interval = null;
      jobs.delete(job.id);
    }
  }, delay);
}

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

const schedule: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const cronExpression = String(args[1] ?? "");
  const action = args[2] ?? null;

  if (!id) throw new Error("Task id is required");
  const parsed = parseCron(cronExpression);
  if (!parsed) throw new Error("Invalid cron expression: " + cronExpression);

  // Cancel existing job with same id if present
  if (jobs.has(id)) {
    const existing = jobs.get(id)!;
    if (existing.interval !== null) clearTimeout(existing.interval);
  }

  const nextRun = findNextCronDate(parsed, new Date());
  const job: JobEntry = { id, cron: cronExpression, nextRun, interval: null, paused: false, type: "recurring", action, history: [] };
  jobs.set(id, job);
  scheduleNextTick(job);

  return { id, nextRun: nextRun.toISOString(), type: "recurring", cron: cronExpression };
};

const once: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const dateOrDelay = args[1];
  const action = args[2] ?? null;

  if (!id) throw new Error("Task id is required");
  if (dateOrDelay === undefined || dateOrDelay === null) throw new Error("dateOrDelay is required (ISO string or milliseconds)");

  // Cancel existing job with same id if present
  if (jobs.has(id)) {
    const existing = jobs.get(id)!;
    if (existing.interval !== null) clearTimeout(existing.interval);
  }

  let nextRun: Date;
  if (typeof dateOrDelay === "number") {
    nextRun = new Date(Date.now() + dateOrDelay);
  } else {
    nextRun = new Date(String(dateOrDelay));
    if (isNaN(nextRun.getTime())) throw new Error("Invalid date: " + String(dateOrDelay));
  }

  const job: JobEntry = { id, cron: null, nextRun, interval: null, paused: false, type: "once", action, history: [] };
  jobs.set(id, job);
  scheduleNextTick(job);

  return { id, nextRun: nextRun.toISOString(), type: "once" };
};

const cancel: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const job = jobs.get(id);
  if (!job) return { cancelled: false, reason: "Task not found" };
  if (job.interval !== null) clearTimeout(job.interval);
  jobs.delete(id);
  return { cancelled: true, id };
};

const cancelAll: BuiltinHandler = () => {
  let count = 0;
  for (const [, job] of jobs) {
    if (job.interval !== null) clearTimeout(job.interval);
    count++;
  }
  jobs.clear();
  return { cancelled: count };
};

const list: BuiltinHandler = () => {
  const entries: { id: string; type: string; cron: string | null; nextRun: string; paused: boolean }[] = [];
  for (const [, job] of jobs) {
    entries.push({ id: job.id, type: job.type, cron: job.cron, nextRun: job.nextRun.toISOString(), paused: job.paused });
  }
  return entries;
};

const get: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const job = jobs.get(id);
  if (!job) return null;
  return { id: job.id, type: job.type, cron: job.cron, nextRun: job.nextRun.toISOString(), paused: job.paused, action: job.action, historyCount: job.history.length };
};

const pause: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const job = jobs.get(id);
  if (!job) throw new Error("Task not found: " + id);
  if (job.paused) return { id, paused: true, message: "Already paused" };
  job.paused = true;
  if (job.interval !== null) { clearTimeout(job.interval); job.interval = null; }
  return { id, paused: true };
};

const resume: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const job = jobs.get(id);
  if (!job) throw new Error("Task not found: " + id);
  if (!job.paused) return { id, paused: false, message: "Already running" };
  job.paused = false;

  // Recalculate next run for recurring tasks in case time has passed
  if (job.type === "recurring" && job.cron) {
    const parsed = parseCron(job.cron);
    if (parsed) {
      job.nextRun = findNextCronDate(parsed, new Date());
    }
  }
  scheduleNextTick(job);
  return { id, paused: false, nextRun: job.nextRun.toISOString() };
};

const isRunning: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const job = jobs.get(id);
  if (!job) return false;
  return !job.paused && job.interval !== null;
};

const nextRun: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const job = jobs.get(id);
  if (!job) throw new Error("Task not found: " + id);
  return job.nextRun.toISOString();
};

const history: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const job = jobs.get(id);
  if (!job) throw new Error("Task not found: " + id);
  return [...job.history];
};

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const SchedulerFunctions: Record<string, BuiltinHandler> = {
  schedule, once, cancel, cancelAll, list, get, pause, resume, isRunning, nextRun, history,
};

export const SchedulerFunctionMetadata = {
  schedule: {
    description: "Schedule a recurring task using a cron expression",
    parameters: [
      { name: "id", dataType: "string", description: "Unique task identifier", formInputType: "text", required: true },
      { name: "cronExpression", dataType: "string", description: "Standard 5-field cron expression", formInputType: "text", required: true },
      { name: "action", dataType: "object", description: "Callback info object with action name", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ id, nextRun, type, cron }",
    example: 'scheduler.schedule "cleanup" "*/5 * * * *" { action: "runCleanup" }',
  },
  once: {
    description: "Schedule a one-time task at a specific date/time or after a delay in ms",
    parameters: [
      { name: "id", dataType: "string", description: "Unique task identifier", formInputType: "text", required: true },
      { name: "dateOrDelay", dataType: "string", description: "ISO date string or delay in milliseconds", formInputType: "text", required: true },
      { name: "action", dataType: "object", description: "Callback info object with action name", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{ id, nextRun, type }",
    example: 'scheduler.once "sendEmail" "2025-12-31T23:59:00Z" { action: "sendNewYearEmail" }',
  },
  cancel: {
    description: "Cancel a scheduled task by id",
    parameters: [
      { name: "id", dataType: "string", description: "Task identifier to cancel", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ cancelled, id } or { cancelled: false, reason }",
    example: 'scheduler.cancel "cleanup"',
  },
  cancelAll: {
    description: "Cancel all scheduled tasks",
    parameters: [],
    returnType: "object",
    returnDescription: "{ cancelled: <count> }",
    example: "scheduler.cancelAll",
  },
  list: {
    description: "List all scheduled tasks with their next run times",
    parameters: [],
    returnType: "array",
    returnDescription: "Array of { id, type, cron, nextRun, paused }",
    example: "scheduler.list",
  },
  get: {
    description: "Get info about a specific scheduled task",
    parameters: [
      { name: "id", dataType: "string", description: "Task identifier", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Task details or null if not found",
    example: 'scheduler.get "cleanup"',
  },
  pause: {
    description: "Pause a scheduled task (keeps it but stops execution)",
    parameters: [
      { name: "id", dataType: "string", description: "Task identifier to pause", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ id, paused: true }",
    example: 'scheduler.pause "cleanup"',
  },
  resume: {
    description: "Resume a paused task",
    parameters: [
      { name: "id", dataType: "string", description: "Task identifier to resume", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ id, paused: false, nextRun }",
    example: 'scheduler.resume "cleanup"',
  },
  isRunning: {
    description: "Check if a task is currently active (not paused and scheduled)",
    parameters: [
      { name: "id", dataType: "string", description: "Task identifier", formInputType: "text", required: true },
    ],
    returnType: "boolean",
    returnDescription: "True if the task is active",
    example: 'scheduler.isRunning "cleanup"',
  },
  nextRun: {
    description: "Get the next run time for a scheduled task",
    parameters: [
      { name: "id", dataType: "string", description: "Task identifier", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "ISO date string of the next run",
    example: 'scheduler.nextRun "cleanup"',
  },
  history: {
    description: "Get execution history for a task",
    parameters: [
      { name: "id", dataType: "string", description: "Task identifier", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of { ran, status } entries",
    example: 'scheduler.history "cleanup"',
  },
};

export const SchedulerModuleMetadata = {
  description: "Schedule and run recurring or one-time tasks with cron expressions, pause/resume support, and execution history",
  methods: ["schedule", "once", "cancel", "cancelAll", "list", "get", "pause", "resume", "isRunning", "nextRun", "history"],
};
