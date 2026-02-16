import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

// ── Internal State ──────────────────────────────────────────────────

type Listener = (...args: unknown[]) => void;

interface EventBus {
  listeners: Map<string, { fn: Listener; once: boolean }[]>;
  maxListeners: number;
  history: { event: string; timestamp: number; data: unknown }[];
  historyLimit: number;
}

const buses = new Map<string, EventBus>();

function getBus(name: string): EventBus {
  let bus = buses.get(name);
  if (!bus) {
    bus = { listeners: new Map(), maxListeners: 100, history: [], historyLimit: 1000 };
    buses.set(name, bus);
  }
  return bus;
}

// ── Function Handlers ───────────────────────────────────────────────

const create: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const maxListeners = parseInt(String(args[1] ?? "100"), 10);
  const bus = getBus(name);
  bus.maxListeners = maxListeners;
  return { name, maxListeners };
};

const on: BuiltinHandler = (args) => {
  const busName = String(args[0] ?? "default");
  const event = String(args[1] ?? "");
  const fn = args[2];
  if (!event) throw new Error("Event name is required");
  if (typeof fn !== "function") throw new Error("Listener must be a function");

  const bus = getBus(busName);
  const list = bus.listeners.get(event) || [];
  if (list.length >= bus.maxListeners) {
    throw new Error(`Max listeners (${bus.maxListeners}) reached for event "${event}"`);
  }
  list.push({ fn: fn as Listener, once: false });
  bus.listeners.set(event, list);
  return { event, listenerCount: list.length };
};

const once: BuiltinHandler = (args) => {
  const busName = String(args[0] ?? "default");
  const event = String(args[1] ?? "");
  const fn = args[2];
  if (!event) throw new Error("Event name is required");
  if (typeof fn !== "function") throw new Error("Listener must be a function");

  const bus = getBus(busName);
  const list = bus.listeners.get(event) || [];
  list.push({ fn: fn as Listener, once: true });
  bus.listeners.set(event, list);
  return { event, listenerCount: list.length };
};

const off: BuiltinHandler = (args) => {
  const busName = String(args[0] ?? "default");
  const event = String(args[1] ?? "");
  const fn = args[2];

  const bus = getBus(busName);
  if (!event) {
    // Remove all listeners for all events
    bus.listeners.clear();
    return { removed: "all" };
  }

  const list = bus.listeners.get(event);
  if (!list) return { event, removed: 0 };

  if (typeof fn === "function") {
    const before = list.length;
    const filtered = list.filter((l) => l.fn !== fn);
    bus.listeners.set(event, filtered);
    return { event, removed: before - filtered.length };
  }

  // Remove all listeners for this event
  bus.listeners.delete(event);
  return { event, removed: list.length };
};

const emit: BuiltinHandler = (args) => {
  const busName = String(args[0] ?? "default");
  const event = String(args[1] ?? "");
  const data = args.slice(2);
  if (!event) throw new Error("Event name is required");

  const bus = getBus(busName);
  const list = bus.listeners.get(event);

  // Record in history
  bus.history.push({ event, timestamp: Date.now(), data: data.length === 1 ? data[0] : data });
  if (bus.history.length > bus.historyLimit) {
    bus.history.shift();
  }

  if (!list || list.length === 0) return { event, delivered: 0 };

  let delivered = 0;
  const remaining: typeof list = [];

  for (const listener of list) {
    try {
      listener.fn(...data);
      delivered++;
    } catch {
      // Swallow listener errors to not break emission
    }
    if (!listener.once) {
      remaining.push(listener);
    }
  }

  bus.listeners.set(event, remaining);
  return { event, delivered };
};

const listenerCount: BuiltinHandler = (args) => {
  const busName = String(args[0] ?? "default");
  const event = args[1] != null ? String(args[1]) : undefined;
  const bus = getBus(busName);

  if (event) {
    return (bus.listeners.get(event) || []).length;
  }

  let total = 0;
  for (const list of bus.listeners.values()) {
    total += list.length;
  }
  return total;
};

const eventNames: BuiltinHandler = (args) => {
  const busName = String(args[0] ?? "default");
  const bus = getBus(busName);
  return [...bus.listeners.keys()];
};

const removeAll: BuiltinHandler = (args) => {
  const busName = String(args[0] ?? "default");
  const bus = getBus(busName);
  const count = bus.listeners.size;
  bus.listeners.clear();
  return { removed: count };
};

const history: BuiltinHandler = (args) => {
  const busName = String(args[0] ?? "default");
  const event = args[1] != null ? String(args[1]) : undefined;
  const limit = parseInt(String(args[2] ?? "50"), 10);
  const bus = getBus(busName);

  let items = bus.history;
  if (event) {
    items = items.filter((h) => h.event === event);
  }
  return items.slice(-limit);
};

const waitFor: BuiltinHandler = async (args) => {
  const busName = String(args[0] ?? "default");
  const event = String(args[1] ?? "");
  const timeoutMs = parseInt(String(args[2] ?? "30000"), 10);
  if (!event) throw new Error("Event name is required");

  const bus = getBus(busName);

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      // Remove the listener
      const list = bus.listeners.get(event);
      if (list) {
        bus.listeners.set(event, list.filter((l) => l.fn !== handler));
      }
      reject(new Error(`Timeout waiting for event "${event}" after ${timeoutMs}ms`));
    }, timeoutMs);

    const handler: Listener = (...data) => {
      clearTimeout(timer);
      resolve(data.length === 1 ? data[0] : data);
    };

    const list = bus.listeners.get(event) || [];
    list.push({ fn: handler, once: true });
    bus.listeners.set(event, list);
  });
};

const destroy: BuiltinHandler = (args) => {
  const busName = String(args[0] ?? "default");
  const existed = buses.has(busName);
  buses.delete(busName);
  return existed;
};

// ── Exports ─────────────────────────────────────────────────────────

export const EventFunctions: Record<string, BuiltinHandler> = {
  create,
  on,
  once,
  off,
  emit,
  listenerCount,
  eventNames,
  removeAll,
  history,
  waitFor,
  destroy,
};

export const EventFunctionMetadata: Record<string, FunctionMetadata> = {
  create: {
    description: "Create a named event bus with an optional max listener limit",
    parameters: [
      { name: "name", dataType: "string", description: "Event bus name (default: 'default')", formInputType: "text", required: false },
      { name: "maxListeners", dataType: "number", description: "Maximum listeners per event (default 100)", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "The event bus configuration",
    example: 'event.create "workflow" 50',
  },
  on: {
    description: "Subscribe a listener to an event on a named bus",
    parameters: [
      { name: "bus", dataType: "string", description: "Event bus name", formInputType: "text", required: true },
      { name: "event", dataType: "string", description: "Event name to listen for", formInputType: "text", required: true },
      { name: "listener", dataType: "function", description: "Callback function", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Object with event name and listener count",
    example: 'event.on "workflow" "task.completed" $handler',
  },
  once: {
    description: "Subscribe a one-time listener that automatically removes itself after firing",
    parameters: [
      { name: "bus", dataType: "string", description: "Event bus name", formInputType: "text", required: true },
      { name: "event", dataType: "string", description: "Event name", formInputType: "text", required: true },
      { name: "listener", dataType: "function", description: "Callback function", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Object with event name and listener count",
    example: 'event.once "workflow" "done" $handler',
  },
  off: {
    description: "Remove a listener, all listeners for an event, or all listeners on the bus",
    parameters: [
      { name: "bus", dataType: "string", description: "Event bus name", formInputType: "text", required: true },
      { name: "event", dataType: "string", description: "Event name (omit to remove all)", formInputType: "text", required: false },
      { name: "listener", dataType: "function", description: "Specific listener to remove (omit to remove all for event)", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Object with event name and number removed",
    example: 'event.off "workflow" "task.completed"',
  },
  emit: {
    description: "Emit an event with optional data, notifying all subscribed listeners",
    parameters: [
      { name: "bus", dataType: "string", description: "Event bus name", formInputType: "text", required: true },
      { name: "event", dataType: "string", description: "Event name to emit", formInputType: "text", required: true },
      { name: "data", dataType: "any", description: "Data to pass to listeners", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Object with event name and number of listeners notified",
    example: 'event.emit "workflow" "task.completed" $taskData',
  },
  listenerCount: {
    description: "Get the number of listeners for a specific event or all events on a bus",
    parameters: [
      { name: "bus", dataType: "string", description: "Event bus name", formInputType: "text", required: true },
      { name: "event", dataType: "string", description: "Event name (omit for total count)", formInputType: "text", required: false },
    ],
    returnType: "number",
    returnDescription: "Number of registered listeners",
    example: 'event.listenerCount "workflow" "task.completed"',
  },
  eventNames: {
    description: "List all event names that have listeners on a bus",
    parameters: [
      { name: "bus", dataType: "string", description: "Event bus name", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of event name strings",
    example: 'event.eventNames "workflow"',
  },
  removeAll: {
    description: "Remove all listeners from all events on a bus",
    parameters: [
      { name: "bus", dataType: "string", description: "Event bus name", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Object with count of event types removed",
    example: 'event.removeAll "workflow"',
  },
  history: {
    description: "Get the emission history for a bus, optionally filtered by event name",
    parameters: [
      { name: "bus", dataType: "string", description: "Event bus name", formInputType: "text", required: true },
      { name: "event", dataType: "string", description: "Filter by event name (optional)", formInputType: "text", required: false },
      { name: "limit", dataType: "number", description: "Max entries to return (default 50)", formInputType: "text", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of {event, timestamp, data} objects",
    example: 'event.history "workflow" "task.completed" 10',
  },
  waitFor: {
    description: "Wait for a specific event to be emitted, with a timeout",
    parameters: [
      { name: "bus", dataType: "string", description: "Event bus name", formInputType: "text", required: true },
      { name: "event", dataType: "string", description: "Event name to wait for", formInputType: "text", required: true },
      { name: "timeout", dataType: "number", description: "Timeout in ms (default 30000)", formInputType: "text", required: false },
    ],
    returnType: "any",
    returnDescription: "The data emitted with the event",
    example: 'event.waitFor "workflow" "task.completed" 5000',
  },
  destroy: {
    description: "Destroy a named event bus and free all resources",
    parameters: [
      { name: "bus", dataType: "string", description: "Event bus name", formInputType: "text", required: true },
    ],
    returnType: "boolean",
    returnDescription: "True if the bus existed and was destroyed",
    example: 'event.destroy "workflow"',
  },
};

export const EventModuleMetadata: ModuleMetadata = {
  description: "Pub/sub event system with named buses, listener management, history, and async waitFor",
  methods: ["create", "on", "once", "off", "emit", "listenerCount", "eventNames", "removeAll", "history", "waitFor", "destroy"],
};
