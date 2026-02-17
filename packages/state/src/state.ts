import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

interface Transition { from: string; to: string; event: string; guard?: (ctx: unknown) => boolean; action?: (ctx: unknown) => unknown; }
interface Machine { name: string; initial: string; current: string; states: string[]; transitions: Transition[]; context: unknown; history: { from: string; to: string; event: string; timestamp: number }[]; listeners: Map<string, ((from: string, to: string, event: string) => void)[]>; }

const machines = new Map<string, Machine>();

const create: BuiltinHandler = (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const name = String(opts.name ?? "default");
  const states = (Array.isArray(opts.states) ? opts.states.map(String) : []) as string[];
  const initial = String(opts.initial ?? states[0] ?? "idle");
  const transitions = (Array.isArray(opts.transitions) ? opts.transitions : []) as Transition[];
  const machine: Machine = { name, initial, current: initial, states, transitions, context: opts.context ?? null, history: [], listeners: new Map() };
  machines.set(name, machine);
  return { name, current: machine.current, states, transitions: transitions.length };
};

const send: BuiltinHandler = (args) => {
  const event = String(args[0] ?? "");
  const name = String(args[1] ?? "default");
  const machine = machines.get(name);
  if (!machine) throw new Error(`State machine "${name}" not found`);
  const transition = machine.transitions.find((t: any) => t.from === machine.current && t.event === event);
  if (!transition) return { changed: false, current: machine.current, event };
  if (transition.guard && !transition.guard(machine.context)) return { changed: false, current: machine.current, event, guardFailed: true };
  const from = machine.current;
  machine.current = transition.to;
  if (transition.action) machine.context = transition.action(machine.context);
  machine.history.push({ from, to: transition.to, event, timestamp: Date.now() });
  const listeners = machine.listeners.get("transition") ?? [];
  for (const fn of listeners) fn(from, transition.to, event);
  return { changed: true, from, current: machine.current, event };
};

const getCurrent: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const machine = machines.get(name);
  if (!machine) throw new Error(`State machine "${name}" not found`);
  return machine.current;
};

const getContext: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const machine = machines.get(name);
  if (!machine) throw new Error(`State machine "${name}" not found`);
  return machine.context;
};

const setContext: BuiltinHandler = (args) => {
  const ctx = args[0];
  const name = String(args[1] ?? "default");
  const machine = machines.get(name);
  if (!machine) throw new Error(`State machine "${name}" not found`);
  machine.context = ctx;
  return true;
};

const canSend: BuiltinHandler = (args) => {
  const event = String(args[0] ?? "");
  const name = String(args[1] ?? "default");
  const machine = machines.get(name);
  if (!machine) return false;
  return machine.transitions.some((t: any) => t.from === machine.current && t.event === event);
};

const availableEvents: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const machine = machines.get(name);
  if (!machine) return [];
  return [...new Set(machine.transitions.filter((t: any) => t.from === machine.current).map((t: any) => t.event))];
};

const is: BuiltinHandler = (args) => {
  const state = String(args[0] ?? "");
  const name = String(args[1] ?? "default");
  const machine = machines.get(name);
  return machine?.current === state;
};

const reset: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const machine = machines.get(name);
  if (!machine) throw new Error(`State machine "${name}" not found`);
  machine.current = machine.initial;
  machine.history = [];
  return { current: machine.current };
};

const history: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const limit = args[1] ? Number(args[1]) : undefined;
  const machine = machines.get(name);
  if (!machine) return [];
  return limit ? machine.history.slice(-limit) : machine.history;
};

const addTransition: BuiltinHandler = (args) => {
  const transition = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Transition;
  const name = String(args[1] ?? "default");
  const machine = machines.get(name);
  if (!machine) throw new Error(`State machine "${name}" not found`);
  machine.transitions.push(transition);
  return true;
};

const addState: BuiltinHandler = (args) => {
  const state = String(args[0] ?? "");
  const name = String(args[1] ?? "default");
  const machine = machines.get(name);
  if (!machine) throw new Error(`State machine "${name}" not found`);
  if (!machine.states.includes(state)) machine.states.push(state);
  return true;
};

const on: BuiltinHandler = (args) => {
  const event = String(args[0] ?? "transition");
  const fn = args[1] as (from: string, to: string, event: string) => void;
  const name = String(args[2] ?? "default");
  const machine = machines.get(name);
  if (!machine) throw new Error(`State machine "${name}" not found`);
  const listeners = machine.listeners.get(event) ?? [];
  listeners.push(fn);
  machine.listeners.set(event, listeners);
  return true;
};

const serialize: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const machine = machines.get(name);
  if (!machine) throw new Error(`State machine "${name}" not found`);
  return JSON.stringify({ name: machine.name, initial: machine.initial, current: machine.current, states: machine.states, transitions: machine.transitions.map((t: any) => ({ from: t.from, to: t.to, event: t.event })), context: machine.context, history: machine.history });
};

const matches: BuiltinHandler = (args) => {
  const states = (Array.isArray(args[0]) ? args[0] : [String(args[0] ?? "")]) as string[];
  const name = String(args[1] ?? "default");
  const machine = machines.get(name);
  return machine ? states.includes(machine.current) : false;
};

const destroy: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  machines.delete(name);
  return true;
};

const list: BuiltinHandler = () => Array.from(machines.keys());

export const StateFunctions: Record<string, BuiltinHandler> = { create, send, current: getCurrent, context: getContext, setContext, can: canSend, events: availableEvents, is, reset, history, addTransition, addState, on, serialize, matches, destroy, list };

export const StateFunctionMetadata = {
  create: { description: "Create state machine", parameters: [{ name: "options", dataType: "object", description: "{name, states[], initial, transitions[{from, to, event}], context}", formInputType: "text", required: true }], returnType: "object", returnDescription: "{name, current, states, transitions}", example: 'state.create {"name": "light", "states": ["red", "green", "yellow"], "initial": "red", "transitions": [{"from": "red", "to": "green", "event": "next"}]}' },
  send: { description: "Send event to trigger transition", parameters: [{ name: "event", dataType: "string", description: "Event name", formInputType: "text", required: true }, { name: "machine", dataType: "string", description: "Machine name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{changed, from, current, event}", example: 'state.send "next" "light"' },
  current: { description: "Get current state", parameters: [{ name: "machine", dataType: "string", description: "Machine name", formInputType: "text", required: false }], returnType: "string", returnDescription: "Current state", example: 'state.current "light"' },
  context: { description: "Get machine context", parameters: [{ name: "machine", dataType: "string", description: "Machine name", formInputType: "text", required: false }], returnType: "any", returnDescription: "Context data", example: 'state.context "light"' },
  setContext: { description: "Set machine context", parameters: [{ name: "context", dataType: "any", description: "New context", formInputType: "text", required: true }, { name: "machine", dataType: "string", description: "Machine name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'state.setContext {"count": 0} "light"' },
  can: { description: "Check if event can be sent", parameters: [{ name: "event", dataType: "string", description: "Event name", formInputType: "text", required: true }, { name: "machine", dataType: "string", description: "Machine name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if transition exists", example: 'state.can "next" "light"' },
  events: { description: "Get available events from current state", parameters: [{ name: "machine", dataType: "string", description: "Machine name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Event names", example: 'state.events "light"' },
  is: { description: "Check if in specific state", parameters: [{ name: "state", dataType: "string", description: "State name", formInputType: "text", required: true }, { name: "machine", dataType: "string", description: "Machine name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if matches", example: 'state.is "red" "light"' },
  reset: { description: "Reset to initial state", parameters: [{ name: "machine", dataType: "string", description: "Machine name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{current}", example: 'state.reset "light"' },
  history: { description: "Get transition history", parameters: [{ name: "machine", dataType: "string", description: "Machine name", formInputType: "text", required: false }, { name: "limit", dataType: "number", description: "Max entries", formInputType: "text", required: false }], returnType: "array", returnDescription: "History entries", example: 'state.history "light" 10' },
  addTransition: { description: "Add transition at runtime", parameters: [{ name: "transition", dataType: "object", description: "{from, to, event}", formInputType: "text", required: true }, { name: "machine", dataType: "string", description: "Machine name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'state.addTransition {"from": "yellow", "to": "red", "event": "next"} "light"' },
  addState: { description: "Add state at runtime", parameters: [{ name: "state", dataType: "string", description: "State name", formInputType: "text", required: true }, { name: "machine", dataType: "string", description: "Machine name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'state.addState "flashing" "light"' },
  on: { description: "Listen for transitions", parameters: [{ name: "event", dataType: "string", description: "Event type (transition)", formInputType: "text", required: true }, { name: "handler", dataType: "string", description: "Callback (from, to, event)", formInputType: "text", required: true }, { name: "machine", dataType: "string", description: "Machine name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'state.on "transition" $handler "light"' },
  serialize: { description: "Serialize machine to JSON", parameters: [{ name: "machine", dataType: "string", description: "Machine name", formInputType: "text", required: false }], returnType: "string", returnDescription: "JSON string", example: 'state.serialize "light"' },
  matches: { description: "Check if current state matches any", parameters: [{ name: "states", dataType: "array", description: "State names", formInputType: "text", required: true }, { name: "machine", dataType: "string", description: "Machine name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if matches", example: 'state.matches ["red", "yellow"] "light"' },
  destroy: { description: "Destroy machine", parameters: [{ name: "machine", dataType: "string", description: "Machine name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'state.destroy "light"' },
  list: { description: "List all machines", parameters: [], returnType: "array", returnDescription: "Machine names", example: 'state.list' },
};

export const StateModuleMetadata = {
  description: "Finite state machine with transitions, guards, actions, context, history, and event listeners",
  methods: ["create", "send", "current", "context", "setContext", "can", "events", "is", "reset", "history", "addTransition", "addState", "on", "serialize", "matches", "destroy", "list"],
};
