import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import mqtt from "mqtt";

const clients: Map<string, mqtt.MqttClient> = new Map();
const messageHandlers: Map<string, Map<string, (topic: string, message: Buffer) => void>> = new Map();
const lastMessages: Map<string, Map<string, string>> = new Map();
const subscribedTopics: Map<string, Set<string>> = new Map();
const defaultQos: Map<string, number> = new Map();

function getClient(id: string): mqtt.MqttClient {
  const client = clients.get(id);
  if (!client) {
    throw new Error(`MQTT client "${id}" not found. Call connect() first.`);
  }
  return client;
}

const connect: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const brokerUrl = String(args[1] ?? "mqtt://localhost:1883");
  const options = (args[2] ?? {}) as mqtt.IClientOptions;

  if (clients.has(id)) {
    throw new Error(`MQTT client "${id}" already exists. Disconnect first or use a different id.`);
  }

  const client = mqtt.connect(brokerUrl, options);

  clients.set(id, client);
  messageHandlers.set(id, new Map());
  lastMessages.set(id, new Map());
  subscribedTopics.set(id, new Set());
  defaultQos.set(id, 0);

  client.on("message", (topic: string, message: Buffer) => {
    const msgs = lastMessages.get(id);
    if (msgs) {
      msgs.set(topic, message.toString());
    }

    const handlers = messageHandlers.get(id);
    if (handlers) {
      for (const handler of handlers.values()) {
        handler(topic, message);
      }
    }
  });

  return { id, brokerUrl, status: "connecting" };
};

const publish: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const topic = String(args[1]);
  const message = String(args[2]);
  const opts = (args[3] ?? {}) as mqtt.IClientPublishOptions;

  if (!topic) throw new Error("Topic is required.");
  const client = getClient(id);

  const qos = opts.qos ?? (defaultQos.get(id) as 0 | 1 | 2 | undefined) ?? 0;

  return new Promise<unknown>((resolve, reject) => {
    client.publish(topic, message, { ...opts, qos }, (err) => {
      if (err) reject(err);
      else resolve({ id, topic, message, qos });
    });
  });
};

const subscribe: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const topic = String(args[1]);
  const opts = (args[2] ?? {}) as mqtt.IClientSubscribeOptions;

  if (!topic) throw new Error("Topic is required.");
  const client = getClient(id);

  const qos = opts.qos ?? (defaultQos.get(id) as 0 | 1 | 2 | undefined) ?? 0;

  return new Promise<unknown>((resolve, reject) => {
    client.subscribe(topic, { ...opts, qos }, (err, granted) => {
      if (err) reject(err);
      else {
        const topics = subscribedTopics.get(id);
        if (topics) topics.add(topic);
        resolve({ id, topic, granted });
      }
    });
  });
};

const unsubscribe: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const topic = String(args[1]);

  if (!topic) throw new Error("Topic is required.");
  const client = getClient(id);

  return new Promise<unknown>((resolve, reject) => {
    client.unsubscribe(topic, (err) => {
      if (err) reject(err);
      else {
        const topics = subscribedTopics.get(id);
        if (topics) topics.delete(topic);
        resolve({ id, topic, status: "unsubscribed" });
      }
    });
  });
};

const on: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const handlerId = String(args[1] ?? `handler_${Date.now()}`);
  const callback = args[2] as ((topic: string, message: Buffer) => void) | undefined;

  if (!callback || typeof callback !== "function") {
    throw new Error("A callback function is required.");
  }

  getClient(id);

  const handlers = messageHandlers.get(id);
  if (handlers) {
    handlers.set(handlerId, callback);
  }

  return { id, handlerId, status: "registered" };
};

const disconnect: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const client = getClient(id);

  return new Promise<unknown>((resolve, reject) => {
    client.end(false, {}, (err) => {
      clients.delete(id);
      messageHandlers.delete(id);
      lastMessages.delete(id);
      subscribedTopics.delete(id);
      defaultQos.delete(id);

      if (err) reject(err);
      else resolve({ id, status: "disconnected" });
    });
  });
};

const isConnected: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const client = clients.get(id);
  return { id, connected: client ? client.connected : false };
};

const reconnect: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const client = getClient(id);
  client.reconnect();
  return { id, status: "reconnecting" };
};

const topics: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  getClient(id);
  const t = subscribedTopics.get(id);
  return { id, topics: t ? Array.from(t) : [] };
};

const lastMessage: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const topic = String(args[1]);

  if (!topic) throw new Error("Topic is required.");
  getClient(id);

  const msgs = lastMessages.get(id);
  const msg = msgs ? msgs.get(topic) ?? null : null;

  return { id, topic, message: msg };
};

const qos: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const level = Number(args[1] ?? 0);

  if (level < 0 || level > 2) {
    throw new Error("QoS level must be 0, 1, or 2.");
  }

  getClient(id);
  defaultQos.set(id, level);

  return { id, qos: level };
};

const will: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const topic = String(args[1]);
  const payload = String(args[2] ?? "");
  const willQos = Number(args[3] ?? 0) as 0 | 1 | 2;
  const retain = Boolean(args[4] ?? false);

  if (!topic) throw new Error("Topic is required for last will.");

  const client = getClient(id);
  const options = client.options;

  options.will = { topic, payload: Buffer.from(payload), qos: willQos, retain };

  return { id, will: { topic, payload, qos: willQos, retain } };
};

export const MqttFunctions: Record<string, BuiltinHandler> = {
  connect,
  publish,
  subscribe,
  unsubscribe,
  on,
  disconnect,
  isConnected,
  reconnect,
  topics,
  lastMessage,
  qos,
  will,
};

export const MqttFunctionMetadata: Record<string, FunctionMetadata> = {
  connect: {
    description: "Connect to an MQTT broker",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "brokerUrl", type: "string", description: "Broker URL (e.g. mqtt://localhost:1883)", optional: true },
      { name: "options", type: "object", description: "MQTT connection options", optional: true },
    ],
    returns: { type: "object", description: "Connection status with id and brokerUrl" },
  },
  publish: {
    description: "Publish a message to an MQTT topic",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "topic", type: "string", description: "Topic to publish to", optional: false },
      { name: "message", type: "string", description: "Message payload", optional: false },
      { name: "options", type: "object", description: "Publish options (qos, retain, etc.)", optional: true },
    ],
    returns: { type: "object", description: "Publish confirmation with topic and qos" },
  },
  subscribe: {
    description: "Subscribe to an MQTT topic",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "topic", type: "string", description: "Topic to subscribe to", optional: false },
      { name: "options", type: "object", description: "Subscribe options (qos, etc.)", optional: true },
    ],
    returns: { type: "object", description: "Subscription confirmation with granted QoS" },
  },
  unsubscribe: {
    description: "Unsubscribe from an MQTT topic",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "topic", type: "string", description: "Topic to unsubscribe from", optional: false },
    ],
    returns: { type: "object", description: "Unsubscribe confirmation" },
  },
  on: {
    description: "Register a message handler for incoming MQTT messages",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "handlerId", type: "string", description: "Unique handler identifier", optional: true },
      { name: "callback", type: "function", description: "Handler function receiving (topic, message)", optional: false },
    ],
    returns: { type: "object", description: "Handler registration confirmation" },
  },
  disconnect: {
    description: "Disconnect from an MQTT broker and clean up resources",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
    ],
    returns: { type: "object", description: "Disconnect confirmation" },
  },
  isConnected: {
    description: "Check if an MQTT client is currently connected",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
    ],
    returns: { type: "object", description: "Connection status with boolean connected field" },
  },
  reconnect: {
    description: "Reconnect an existing MQTT client to its broker",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
    ],
    returns: { type: "object", description: "Reconnection status" },
  },
  topics: {
    description: "List all topics the client is currently subscribed to",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
    ],
    returns: { type: "object", description: "Object containing array of subscribed topics" },
  },
  lastMessage: {
    description: "Get the last received message on a specific topic",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "topic", type: "string", description: "Topic to get last message for", optional: false },
    ],
    returns: { type: "object", description: "Object with topic and last message (null if none)" },
  },
  qos: {
    description: "Set the default Quality of Service level for the client",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "level", type: "number", description: "QoS level: 0 (at most once), 1 (at least once), 2 (exactly once)", optional: false },
    ],
    returns: { type: "object", description: "QoS confirmation with new level" },
  },
  will: {
    description: "Set the last will and testament message for the client",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "topic", type: "string", description: "Will topic", optional: false },
      { name: "payload", type: "string", description: "Will message payload", optional: true },
      { name: "qos", type: "number", description: "Will QoS level (0, 1, or 2)", optional: true },
      { name: "retain", type: "boolean", description: "Whether to retain the will message", optional: true },
    ],
    returns: { type: "object", description: "Will configuration confirmation" },
  },
};

export const MqttModuleMetadata: ModuleMetadata = {
  name: "mqtt",
  description: "MQTT client module for connecting to MQTT brokers, publishing messages, subscribing to topics, and handling incoming messages. Supports multiple concurrent client connections, QoS levels, last will messages, and message history tracking.",
  version: "1.0.0",
};
