# @robinpath/graph

> Graph data structures with BFS, DFS, Dijkstra's shortest path, topological sort, cycle detection, and connectivity

![Category](https://img.shields.io/badge/category-Analytics-blue) ![Functions](https://img.shields.io/badge/functions-19-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `graph` module lets you:

- Create graph
- Add node
- Add edge
- Remove node and its edges
- Remove edge

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/graph
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
graph.addNode "A" {"label": "Start"}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `graph.create` | Create graph |
| `graph.addNode` | Add node |
| `graph.addEdge` | Add edge |
| `graph.removeNode` | Remove node and its edges |
| `graph.removeEdge` | Remove edge |
| `graph.nodes` | List all nodes |
| `graph.edges` | List all edges |
| `graph.neighbors` | Get node neighbors |
| `graph.degree` | Get node degree |
| `graph.bfs` | Breadth-first search |
| `graph.dfs` | Depth-first search |
| `graph.shortestPath` | Dijkstra's shortest path |
| `graph.topologicalSort` | Topological sort (DAG only) |
| `graph.hasCycle` | Check for cycles |
| `graph.isConnected` | Check if graph is connected |
| `graph.hasPath` | Check if path exists between nodes |
| `graph.size` | Get graph size |
| `graph.destroy` | Destroy graph |
| `graph.list` | List all graphs |

## Examples

### Add node

```robinpath
graph.addNode "A" {"label": "Start"}
```

### Add edge

```robinpath
graph.addEdge "A" "B" 5
```

### Remove node and its edges

```robinpath
graph.removeNode "A"
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/graph";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  graph.addNode "A" {"label": "Start"}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
