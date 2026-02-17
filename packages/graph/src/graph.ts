import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

interface Edge { from: string; to: string; weight: number; data?: unknown; }
interface Graph { directed: boolean; nodes: Map<string, unknown>; edges: Edge[]; }

const graphs = new Map<string, Graph>();

function getGraph(name: string): Graph {
  const g = graphs.get(name);
  if (!g) throw new Error(`Graph "${name}" not found`);
  return g;
}

function adjacencyList(g: Graph): Map<string, { node: string; weight: number }[]> {
  const adj = new Map<string, { node: string; weight: number }[]>();
  for (const [node] of g.nodes) adj.set(node, []);
  for (const e of g.edges) {
    adj.get(e.from)?.push({ node: e.to, weight: e.weight });
    if (!g.directed) adj.get(e.to)?.push({ node: e.from, weight: e.weight });
  }
  return adj;
}

const create: BuiltinHandler = (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const name = String(opts.name ?? "default");
  const directed = opts.directed !== false;
  const graph: Graph = { directed, nodes: new Map(), edges: [] };
  graphs.set(name, graph);
  return { name, directed };
};

const addNode: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const data = args[1] ?? null;
  const name = String(args[2] ?? "default");
  getGraph(name).nodes.set(id, data);
  return true;
};

const addEdge: BuiltinHandler = (args) => {
  const from = String(args[0] ?? "");
  const to = String(args[1] ?? "");
  const weight = Number(args[2] ?? 1);
  const name = String(args[3] ?? "default");
  const g = getGraph(name);
  if (!g.nodes.has(from)) g.nodes.set(from, null);
  if (!g.nodes.has(to)) g.nodes.set(to, null);
  g.edges.push({ from, to, weight });
  return true;
};

const removeNode: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "");
  const name = String(args[1] ?? "default");
  const g = getGraph(name);
  g.nodes.delete(id);
  g.edges = g.edges.filter((e: any) => e.from !== id && e.to !== id);
  return true;
};

const removeEdge: BuiltinHandler = (args) => {
  const from = String(args[0] ?? "");
  const to = String(args[1] ?? "");
  const name = String(args[2] ?? "default");
  const g = getGraph(name);
  g.edges = g.edges.filter((e: any) => !(e.from === from && e.to === to));
  return true;
};

const nodes: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  return Array.from(getGraph(name).nodes.keys());
};

const edges: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  return getGraph(name).edges.map((e: any) => ({ from: e.from, to: e.to, weight: e.weight }));
};

const neighbors: BuiltinHandler = (args) => {
  const node = String(args[0] ?? "");
  const name = String(args[1] ?? "default");
  const g = getGraph(name);
  const result = new Set<string>();
  for (const e of g.edges) {
    if (e.from === node) result.add(e.to);
    if (!g.directed && e.to === node) result.add(e.from);
  }
  return Array.from(result);
};

const degree: BuiltinHandler = (args) => {
  const node = String(args[0] ?? "");
  const name = String(args[1] ?? "default");
  const g = getGraph(name);
  let count = 0;
  for (const e of g.edges) {
    if (e.from === node) count++;
    if (e.to === node) count++;
  }
  return count;
};

const bfs: BuiltinHandler = (args) => {
  const start = String(args[0] ?? "");
  const name = String(args[1] ?? "default");
  const adj = adjacencyList(getGraph(name));
  const visited = new Set<string>();
  const order: string[] = [];
  const queue = [start];
  visited.add(start);
  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);
    for (const { node: neighbor } of adj.get(node) ?? []) {
      if (!visited.has(neighbor)) { visited.add(neighbor); queue.push(neighbor); }
    }
  }
  return order;
};

const dfs: BuiltinHandler = (args) => {
  const start = String(args[0] ?? "");
  const name = String(args[1] ?? "default");
  const adj = adjacencyList(getGraph(name));
  const visited = new Set<string>();
  const order: string[] = [];
  function visit(node: string) {
    if (visited.has(node)) return;
    visited.add(node);
    order.push(node);
    for (const { node: neighbor } of adj.get(node) ?? []) visit(neighbor);
  }
  visit(start);
  return order;
};

const shortestPath: BuiltinHandler = (args) => {
  const start = String(args[0] ?? "");
  const end = String(args[1] ?? "");
  const name = String(args[2] ?? "default");
  const adj = adjacencyList(getGraph(name));
  const dist = new Map<string, number>();
  const prev = new Map<string, string | null>();
  const unvisited = new Set<string>();
  for (const [node] of getGraph(name).nodes) { dist.set(node, Infinity); prev.set(node, null); unvisited.add(node); }
  dist.set(start, 0);
  while (unvisited.size > 0) {
    let minNode: string | null = null;
    let minDist = Infinity;
    for (const n of unvisited) { const d = dist.get(n)!; if (d < minDist) { minDist = d; minNode = n; } }
    if (minNode === null || minDist === Infinity) break;
    if (minNode === end) break;
    unvisited.delete(minNode);
    for (const { node: neighbor, weight } of adj.get(minNode) ?? []) {
      const alt = minDist + weight;
      if (alt < dist.get(neighbor)!) { dist.set(neighbor, alt); prev.set(neighbor, minNode); }
    }
  }
  if (dist.get(end) === Infinity) return { path: null, distance: Infinity };
  const path: string[] = [];
  let current: string | null = end;
  while (current !== null) { path.unshift(current); current = prev.get(current) ?? null; }
  return { path, distance: dist.get(end) };
};

const topologicalSort: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const g = getGraph(name);
  if (!g.directed) throw new Error("Topological sort requires a directed graph");
  const inDegree = new Map<string, number>();
  for (const [node] of g.nodes) inDegree.set(node, 0);
  for (const e of g.edges) inDegree.set(e.to, (inDegree.get(e.to) ?? 0) + 1);
  const queue = Array.from(inDegree.entries()).filter(([, d]) => d === 0).map(([n]) => n);
  const order: string[] = [];
  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);
    for (const e of g.edges) {
      if (e.from === node) {
        inDegree.set(e.to, inDegree.get(e.to)! - 1);
        if (inDegree.get(e.to) === 0) queue.push(e.to);
      }
    }
  }
  if (order.length !== g.nodes.size) throw new Error("Graph has a cycle");
  return order;
};

const hasCycle: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const g = getGraph(name);
  const visited = new Set<string>();
  const stack = new Set<string>();
  const adj = adjacencyList(g);
  function visit(node: string): boolean {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;
    visited.add(node);
    stack.add(node);
    for (const { node: neighbor } of adj.get(node) ?? []) if (visit(neighbor)) return true;
    stack.delete(node);
    return false;
  }
  for (const [node] of g.nodes) if (visit(node)) return true;
  return false;
};

const isConnected: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const g = getGraph(name);
  if (g.nodes.size === 0) return true;
  const start = g.nodes.keys().next().value as string;
  const visited = new Set((bfs([start, name]) as string[]));
  return visited.size === g.nodes.size;
};

const hasPath: BuiltinHandler = (args) => {
  const from = String(args[0] ?? "");
  const to = String(args[1] ?? "");
  const name = String(args[2] ?? "default");
  const visited = new Set((bfs([from, name]) as string[]));
  return visited.has(to);
};

const size: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const g = getGraph(name);
  return { nodes: g.nodes.size, edges: g.edges.length };
};

const destroy: BuiltinHandler = (args) => { graphs.delete(String(args[0] ?? "default")); return true; };
const list: BuiltinHandler = () => Array.from(graphs.keys());

export const GraphFunctions: Record<string, BuiltinHandler> = { create, addNode, addEdge, removeNode, removeEdge, nodes, edges, neighbors, degree, bfs, dfs, shortestPath, topologicalSort, hasCycle, isConnected, hasPath, size, destroy, list };

export const GraphFunctionMetadata = {
  create: { description: "Create graph", parameters: [{ name: "options", dataType: "object", description: "{name, directed}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{name, directed}", example: 'graph.create {"name": "deps", "directed": true}' },
  addNode: { description: "Add node", parameters: [{ name: "id", dataType: "string", description: "Node ID", formInputType: "text", required: true }, { name: "data", dataType: "any", description: "Node data", formInputType: "text", required: false }, { name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'graph.addNode "A" {"label": "Start"}' },
  addEdge: { description: "Add edge", parameters: [{ name: "from", dataType: "string", description: "From node", formInputType: "text", required: true }, { name: "to", dataType: "string", description: "To node", formInputType: "text", required: true }, { name: "weight", dataType: "number", description: "Edge weight", formInputType: "text", required: false }, { name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'graph.addEdge "A" "B" 5' },
  removeNode: { description: "Remove node and its edges", parameters: [{ name: "id", dataType: "string", description: "Node ID", formInputType: "text", required: true }, { name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'graph.removeNode "A"' },
  removeEdge: { description: "Remove edge", parameters: [{ name: "from", dataType: "string", description: "From node", formInputType: "text", required: true }, { name: "to", dataType: "string", description: "To node", formInputType: "text", required: true }, { name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'graph.removeEdge "A" "B"' },
  nodes: { description: "List all nodes", parameters: [{ name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Node IDs", example: 'graph.nodes' },
  edges: { description: "List all edges", parameters: [{ name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Edge objects", example: 'graph.edges' },
  neighbors: { description: "Get node neighbors", parameters: [{ name: "node", dataType: "string", description: "Node ID", formInputType: "text", required: true }, { name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Neighbor IDs", example: 'graph.neighbors "A"' },
  degree: { description: "Get node degree", parameters: [{ name: "node", dataType: "string", description: "Node ID", formInputType: "text", required: true }, { name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "number", returnDescription: "Degree count", example: 'graph.degree "A"' },
  bfs: { description: "Breadth-first search", parameters: [{ name: "start", dataType: "string", description: "Start node", formInputType: "text", required: true }, { name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Visit order", example: 'graph.bfs "A"' },
  dfs: { description: "Depth-first search", parameters: [{ name: "start", dataType: "string", description: "Start node", formInputType: "text", required: true }, { name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Visit order", example: 'graph.dfs "A"' },
  shortestPath: { description: "Dijkstra's shortest path", parameters: [{ name: "start", dataType: "string", description: "Start node", formInputType: "text", required: true }, { name: "end", dataType: "string", description: "End node", formInputType: "text", required: true }, { name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{path, distance}", example: 'graph.shortestPath "A" "D"' },
  topologicalSort: { description: "Topological sort (DAG only)", parameters: [{ name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "array", returnDescription: "Sorted node IDs", example: 'graph.topologicalSort "deps"' },
  hasCycle: { description: "Check for cycles", parameters: [{ name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if has cycle", example: 'graph.hasCycle "deps"' },
  isConnected: { description: "Check if graph is connected", parameters: [{ name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if connected", example: 'graph.isConnected' },
  hasPath: { description: "Check if path exists between nodes", parameters: [{ name: "from", dataType: "string", description: "From node", formInputType: "text", required: true }, { name: "to", dataType: "string", description: "To node", formInputType: "text", required: true }, { name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true if path exists", example: 'graph.hasPath "A" "D"' },
  size: { description: "Get graph size", parameters: [{ name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "object", returnDescription: "{nodes, edges}", example: 'graph.size' },
  destroy: { description: "Destroy graph", parameters: [{ name: "graph", dataType: "string", description: "Graph name", formInputType: "text", required: false }], returnType: "boolean", returnDescription: "true", example: 'graph.destroy' },
  list: { description: "List all graphs", parameters: [], returnType: "array", returnDescription: "Graph names", example: 'graph.list' },
};

export const GraphModuleMetadata = {
  description: "Graph data structures with BFS, DFS, Dijkstra's shortest path, topological sort, cycle detection, and connectivity",
  methods: ["create", "addNode", "addEdge", "removeNode", "removeEdge", "nodes", "edges", "neighbors", "degree", "bfs", "dfs", "shortestPath", "topologicalSort", "hasCycle", "isConnected", "hasPath", "size", "destroy", "list"],
};
