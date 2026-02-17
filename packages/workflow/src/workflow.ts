import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { randomBytes } from "node:crypto";

// ── Types ───────────────────────────────────────────────────────────

interface Step {
  id: string;
  name: string;
  type: "action" | "condition" | "loop" | "parallel" | "delay" | "transform" | "webhook" | "sub-workflow";
  handler?: (...args: unknown[]) => unknown;
  config: Record<string, unknown>;
  next?: string | null;
  onError?: "stop" | "continue" | "retry" | string; // string = goto step id
}

interface WorkflowDef {
  id: string;
  name: string;
  steps: Map<string, Step>;
  entryStepId: string | null;
  context: Record<string, unknown>;
  status: "idle" | "running" | "completed" | "failed" | "paused";
  currentStepId: string | null;
  history: { stepId: string; stepName: string; status: string; result: unknown; timestamp: number; duration: number }[];
  error?: string;
  createdAt: number;
  startedAt?: number;
  completedAt?: number;
}

const workflows = new Map<string, WorkflowDef>();

function genId(): string {
  return randomBytes(6).toString("hex");
}

// ── Function Handlers ───────────────────────────────────────────────

const create: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "Untitled Workflow");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const id = genId();
  const wf: WorkflowDef = {
    id,
    name,
    steps: new Map(),
    entryStepId: null,
    context: (typeof opts.context === "object" && opts.context !== null ? { ...opts.context as Record<string, unknown> } : {}),
    status: "idle",
    currentStepId: null,
    history: [],
    createdAt: Date.now(),
  };
  workflows.set(id, wf);
  return { id, name, status: "idle" };
};

const addStep: BuiltinHandler = (args) => {
  const wfId = String(args[0] ?? "");
  const stepConfig = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const wf = workflows.get(wfId);
  if (!wf) throw new Error(`Workflow "${wfId}" not found`);

  const stepId = String(stepConfig.id ?? genId());
  const step: Step = {
    id: stepId,
    name: String(stepConfig.name ?? `Step ${wf.steps.size + 1}`),
    type: (stepConfig.type as Step["type"]) ?? "action",
    handler: typeof stepConfig.handler === "function" ? stepConfig.handler as Step["handler"] : undefined,
    config: stepConfig,
    next: stepConfig.next != null ? String(stepConfig.next) : null,
    onError: stepConfig.onError ? String(stepConfig.onError) as Step["onError"] : "stop",
  };

  wf.steps.set(stepId, step);
  if (wf.entryStepId === null) wf.entryStepId = stepId;

  return { id: stepId, name: step.name, type: step.type };
};

const setEntry: BuiltinHandler = (args) => {
  const wfId = String(args[0] ?? "");
  const stepId = String(args[1] ?? "");
  const wf = workflows.get(wfId);
  if (!wf) throw new Error(`Workflow "${wfId}" not found`);
  if (!wf.steps.has(stepId)) throw new Error(`Step "${stepId}" not found in workflow`);
  wf.entryStepId = stepId;
  return { entryStep: stepId };
};

const link: BuiltinHandler = (args) => {
  const wfId = String(args[0] ?? "");
  const fromStepId = String(args[1] ?? "");
  const toStepId = String(args[2] ?? "");
  const wf = workflows.get(wfId);
  if (!wf) throw new Error(`Workflow "${wfId}" not found`);

  const step = wf.steps.get(fromStepId);
  if (!step) throw new Error(`Step "${fromStepId}" not found`);
  step.next = toStepId || null;

  return { from: fromStepId, to: toStepId };
};

const run: BuiltinHandler = async (args) => {
  const wfId = String(args[0] ?? "");
  const inputData = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const wf = workflows.get(wfId);
  if (!wf) throw new Error(`Workflow "${wfId}" not found`);
  if (wf.steps.size === 0) throw new Error("Workflow has no steps");
  if (!wf.entryStepId) throw new Error("No entry step defined");

  wf.status = "running";
  wf.startedAt = Date.now();
  wf.context = { ...wf.context, ...inputData, $input: inputData };
  wf.history = [];
  wf.error = undefined;

  let currentStepId: string | null = wf.entryStepId;

  while (currentStepId && wf.status === "running") {
    const step = wf.steps.get(currentStepId);
    if (!step) {
      wf.status = "failed";
      wf.error = `Step "${currentStepId}" not found`;
      break;
    }

    wf.currentStepId = currentStepId;
    const stepStart = Date.now();
    let result: unknown;
    let stepStatus = "completed";

    try {
      result = await executeStep(step, wf);
      wf.context.$lastResult = result;
      wf.context[`$${step.name.replace(/\s+/g, "_")}`] = result;
    } catch (err: unknown) {
      stepStatus = "failed";
      const errMsg = err instanceof Error ? err.message : String(err);

      if (step.onError === "continue") {
        wf.context.$lastError = errMsg;
        result = { error: errMsg };
      } else if (step.onError === "retry") {
        // Simple retry: try once more
        try {
          result = await executeStep(step, wf);
          stepStatus = "completed";
          wf.context.$lastResult = result;
        } catch (retryErr: unknown) {
          wf.status = "failed";
          wf.error = retryErr instanceof Error ? retryErr.message : String(retryErr);
        }
      } else if (step.onError && step.onError !== "stop" && wf.steps.has(step.onError)) {
        // Jump to error handler step
        currentStepId = step.onError;
        wf.history.push({ stepId: step.id, stepName: step.name, status: "failed", result: errMsg, timestamp: stepStart, duration: Date.now() - stepStart });
        continue;
      } else {
        wf.status = "failed";
        wf.error = errMsg;
      }
    }

    wf.history.push({
      stepId: step.id,
      stepName: step.name,
      status: stepStatus,
      result,
      timestamp: stepStart,
      duration: Date.now() - stepStart,
    });

    if (wf.status !== "running") break;

    // Determine next step
    if (step.type === "condition") {
      const condResult = result as { branch?: string; next?: string };
      currentStepId = condResult?.next ?? condResult?.branch ?? step.next ?? null;
    } else {
      currentStepId = step.next ?? null;
    }
  }

  if (wf.status === "running") {
    wf.status = "completed";
  }
  wf.completedAt = Date.now();
  wf.currentStepId = null;

  return {
    id: wf.id,
    status: wf.status,
    stepsExecuted: wf.history.length,
    duration: wf.completedAt - (wf.startedAt ?? wf.completedAt),
    result: wf.context.$lastResult,
    error: wf.error,
  };
};

async function executeStep(step: Step, wf: WorkflowDef): Promise<Value> {
  switch (step.type) {
    case "action": {
      if (step.handler) {
        return await step.handler(wf.context);
      }
      return step.config.result ?? null;
    }

    case "condition": {
      const field = String(step.config.field ?? "");
      const operator = String(step.config.operator ?? "equals");
      const compareValue = step.config.value;
      const actual = field.startsWith("$") ? wf.context[field] ?? wf.context[field.substring(1)] : step.config.field;

      let matches = false;
      switch (operator) {
        case "equals": case "==": matches = actual === compareValue; break;
        case "notEquals": case "!=": matches = actual !== compareValue; break;
        case "gt": case ">": matches = Number(actual) > Number(compareValue); break;
        case "lt": case "<": matches = Number(actual) < Number(compareValue); break;
        case "gte": case ">=": matches = Number(actual) >= Number(compareValue); break;
        case "lte": case "<=": matches = Number(actual) <= Number(compareValue); break;
        case "contains": matches = String(actual).includes(String(compareValue)); break;
        case "exists": matches = actual != null; break;
        case "truthy": matches = Boolean(actual); break;
        case "falsy": matches = !actual; break;
        default: matches = actual === compareValue;
      }

      return {
        matched: matches,
        next: matches ? String(step.config.onTrue ?? step.next ?? "") : String(step.config.onFalse ?? ""),
        branch: matches ? "true" : "false",
      };
    }

    case "loop": {
      const items = (step.config.items as unknown[]) ?? wf.context[String(step.config.collection ?? "$items")] as unknown[] ?? [];
      const results: unknown[] = [];

      for (let i = 0; i < items.length; i++) {
        wf.context.$item = items[i];
        wf.context.$index = i;
        if (step.handler) {
          results.push(await step.handler(wf.context));
        } else {
          results.push(items[i]);
        }
      }
      return results;
    }

    case "parallel": {
      const subStepIds = (step.config.steps as string[]) ?? [];
      const promises = subStepIds.map(async (sid: any) => {
        const subStep = wf.steps.get(sid);
        if (!subStep) return { id: sid, error: "Step not found" };
        try {
          const r = await executeStep(subStep, wf);
          return { id: sid, result: r };
        } catch (e: unknown) {
          return { id: sid, error: e instanceof Error ? e.message : String(e) };
        }
      });
      return await Promise.all(promises);
    }

    case "delay": {
      const ms = Number(step.config.ms ?? step.config.delay ?? 1000);
      await new Promise((resolve: any) => setTimeout(resolve, ms));
      return { delayed: ms };
    }

    case "transform": {
      const data = wf.context.$lastResult ?? wf.context;
      if (step.handler) {
        return await step.handler(data);
      }
      return data;
    }

    default:
      if (step.handler) return await step.handler(wf.context);
      return step.config.result ?? null;
  }
}

const pause: BuiltinHandler = (args) => {
  const wfId = String(args[0] ?? "");
  const wf = workflows.get(wfId);
  if (!wf) throw new Error(`Workflow "${wfId}" not found`);
  wf.status = "paused";
  return { id: wfId, status: "paused" };
};

const getStatus: BuiltinHandler = (args) => {
  const wfId = String(args[0] ?? "");
  const wf = workflows.get(wfId);
  if (!wf) throw new Error(`Workflow "${wfId}" not found`);

  return {
    id: wf.id,
    name: wf.name,
    status: wf.status,
    currentStep: wf.currentStepId,
    stepsTotal: wf.steps.size,
    stepsExecuted: wf.history.length,
    error: wf.error,
    createdAt: new Date(wf.createdAt).toISOString(),
    startedAt: wf.startedAt ? new Date(wf.startedAt).toISOString() : null,
    completedAt: wf.completedAt ? new Date(wf.completedAt).toISOString() : null,
  };
};

const getContext: BuiltinHandler = (args) => {
  const wfId = String(args[0] ?? "");
  const key = args[1] != null ? String(args[1]) : undefined;
  const wf = workflows.get(wfId);
  if (!wf) throw new Error(`Workflow "${wfId}" not found`);
  if (key) return wf.context[key] ?? null;
  return { ...wf.context };
};

const setContext: BuiltinHandler = (args) => {
  const wfId = String(args[0] ?? "");
  const key = String(args[1] ?? "");
  const value = args[2];
  const wf = workflows.get(wfId);
  if (!wf) throw new Error(`Workflow "${wfId}" not found`);
  wf.context[key] = value;
  return true;
};

const getHistory: BuiltinHandler = (args) => {
  const wfId = String(args[0] ?? "");
  const wf = workflows.get(wfId);
  if (!wf) throw new Error(`Workflow "${wfId}" not found`);
  return wf.history.map((h: any) => ({
    ...h,
    timestamp: new Date(h.timestamp).toISOString(),
  }));
};

const listSteps: BuiltinHandler = (args) => {
  const wfId = String(args[0] ?? "");
  const wf = workflows.get(wfId);
  if (!wf) throw new Error(`Workflow "${wfId}" not found`);
  return [...wf.steps.values()].map((s: any) => ({
    id: s.id,
    name: s.name,
    type: s.type,
    next: s.next,
    onError: s.onError,
    isEntry: s.id === wf.entryStepId,
  }));
};

const removeStep: BuiltinHandler = (args) => {
  const wfId = String(args[0] ?? "");
  const stepId = String(args[1] ?? "");
  const wf = workflows.get(wfId);
  if (!wf) throw new Error(`Workflow "${wfId}" not found`);
  return wf.steps.delete(stepId);
};

const destroy: BuiltinHandler = (args) => {
  const wfId = String(args[0] ?? "");
  return workflows.delete(wfId);
};

const list: BuiltinHandler = () => {
  return [...workflows.values()].map((wf: any) => ({
    id: wf.id,
    name: wf.name,
    status: wf.status,
    steps: wf.steps.size,
    createdAt: new Date(wf.createdAt).toISOString(),
  }));
};

const clone: BuiltinHandler = (args) => {
  const wfId = String(args[0] ?? "");
  const newName = args[1] != null ? String(args[1]) : undefined;
  const wf = workflows.get(wfId);
  if (!wf) throw new Error(`Workflow "${wfId}" not found`);

  const newId = genId();
  const newWf: WorkflowDef = {
    id: newId,
    name: newName ?? `${wf.name} (copy)`,
    steps: new Map(wf.steps),
    entryStepId: wf.entryStepId,
    context: {},
    status: "idle",
    currentStepId: null,
    history: [],
    createdAt: Date.now(),
  };
  workflows.set(newId, newWf);
  return { id: newId, name: newWf.name };
};

// ── Exports ─────────────────────────────────────────────────────────

export const WorkflowFunctions: Record<string, BuiltinHandler> = {
  create, addStep, setEntry, link, run, pause, getStatus, getContext, setContext, getHistory, listSteps, removeStep, destroy, list, clone,
};

export const WorkflowFunctionMetadata = {
  create: { description: "Create a new workflow", parameters: [{ name: "name", dataType: "string", description: "Workflow name", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{context: initial context data}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{id, name, status}", example: 'workflow.create "Send Welcome Email"' },
  addStep: { description: "Add a step to a workflow (action, condition, loop, parallel, delay, transform)", parameters: [{ name: "workflowId", dataType: "string", description: "Workflow ID", formInputType: "text", required: true }, { name: "step", dataType: "object", description: "{name, type, handler, config, next, onError}", formInputType: "text", required: true }], returnType: "object", returnDescription: "{id, name, type}", example: 'workflow.addStep $wfId {"name": "Fetch User", "type": "action", "handler": $fn}' },
  setEntry: { description: "Set the entry (first) step of a workflow", parameters: [{ name: "workflowId", dataType: "string", description: "Workflow ID", formInputType: "text", required: true }, { name: "stepId", dataType: "string", description: "Step ID", formInputType: "text", required: true }], returnType: "object", returnDescription: "{entryStep}", example: 'workflow.setEntry $wfId $stepId' },
  link: { description: "Link one step to the next (set execution order)", parameters: [{ name: "workflowId", dataType: "string", description: "Workflow ID", formInputType: "text", required: true }, { name: "fromStepId", dataType: "string", description: "Source step", formInputType: "text", required: true }, { name: "toStepId", dataType: "string", description: "Target step", formInputType: "text", required: true }], returnType: "object", returnDescription: "{from, to}", example: 'workflow.link $wfId $step1 $step2' },
  run: { description: "Execute a workflow with optional input data", parameters: [{ name: "workflowId", dataType: "string", description: "Workflow ID", formInputType: "text", required: true }, { name: "input", dataType: "object", description: "Input data for the workflow context", formInputType: "text", required: false }], returnType: "object", returnDescription: "{id, status, stepsExecuted, duration, result, error}", example: 'workflow.run $wfId {"userId": 123}' },
  pause: { description: "Pause a running workflow", parameters: [{ name: "workflowId", dataType: "string", description: "Workflow ID", formInputType: "text", required: true }], returnType: "object", returnDescription: "{id, status: paused}", example: 'workflow.pause $wfId' },
  getStatus: { description: "Get the current status and metadata of a workflow", parameters: [{ name: "workflowId", dataType: "string", description: "Workflow ID", formInputType: "text", required: true }], returnType: "object", returnDescription: "Workflow status details", example: 'workflow.getStatus $wfId' },
  getContext: { description: "Get workflow context data (all or by key)", parameters: [{ name: "workflowId", dataType: "string", description: "Workflow ID", formInputType: "text", required: true }, { name: "key", dataType: "string", description: "Optional context key", formInputType: "text", required: false }], returnType: "any", returnDescription: "Context value or full context object", example: 'workflow.getContext $wfId "userId"' },
  setContext: { description: "Set a value in the workflow context", parameters: [{ name: "workflowId", dataType: "string", description: "Workflow ID", formInputType: "text", required: true }, { name: "key", dataType: "string", description: "Context key", formInputType: "text", required: true }, { name: "value", dataType: "any", description: "Value to set", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True", example: 'workflow.setContext $wfId "status" "active"' },
  getHistory: { description: "Get the execution history of a workflow run", parameters: [{ name: "workflowId", dataType: "string", description: "Workflow ID", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of step execution records", example: 'workflow.getHistory $wfId' },
  listSteps: { description: "List all steps in a workflow", parameters: [{ name: "workflowId", dataType: "string", description: "Workflow ID", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of step definitions", example: 'workflow.listSteps $wfId' },
  removeStep: { description: "Remove a step from a workflow", parameters: [{ name: "workflowId", dataType: "string", description: "Workflow ID", formInputType: "text", required: true }, { name: "stepId", dataType: "string", description: "Step ID", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if removed", example: 'workflow.removeStep $wfId $stepId' },
  destroy: { description: "Destroy a workflow and free resources", parameters: [{ name: "workflowId", dataType: "string", description: "Workflow ID", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if destroyed", example: 'workflow.destroy $wfId' },
  list: { description: "List all workflows", parameters: [], returnType: "array", returnDescription: "Array of workflow summaries", example: "workflow.list" },
  clone: { description: "Clone an existing workflow", parameters: [{ name: "workflowId", dataType: "string", description: "Source workflow ID", formInputType: "text", required: true }, { name: "name", dataType: "string", description: "New workflow name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{id, name}", example: 'workflow.clone $wfId "My Copy"' },
};

export const WorkflowModuleMetadata = {
  description: "Workflow orchestration engine with steps, conditions, loops, parallel execution, branching, and context management",
  methods: ["create", "addStep", "setEntry", "link", "run", "pause", "getStatus", "getContext", "setContext", "getHistory", "listSteps", "removeStep", "destroy", "list", "clone"],
};
