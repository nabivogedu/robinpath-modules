---
title: "Graph"
module: "graph"
package: "@robinpath/graph"
description: "Graph data structures with BFS, DFS, Dijkstra's shortest path, topological sort, cycle detection, and connectivity"
category: "analytics"
tags: [graph, analytics]
type: "integration"
auth: "none"
functionCount: 19
---

# Graph

> Graph data structures with BFS, DFS, Dijkstra's shortest path, topological sort, cycle detection, and connectivity

**Package:** `@robinpath/graph` | **Category:** Analytics | **Type:** Integration


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `graph` module when you need to:

- **Create graph** -- Use `graph.create` to perform this operation
- **Add node** -- Use `graph.addNode` to perform this operation
- **Add edge** -- Use `graph.addEdge` to perform this operation
- **Remove node and its edges** -- Use `graph.removeNode` to perform this operation
- **Remove edge** -- Use `graph.removeEdge` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create graph | `{name, directed}` |
| [`addNode`](#addnode) | Add node | `true` |
| [`addEdge`](#addedge) | Add edge | `true` |
| [`removeNode`](#removenode) | Remove node and its edges | `true` |
| [`removeEdge`](#removeedge) | Remove edge | `true` |
| [`nodes`](#nodes) | List all nodes | `Node IDs` |
| [`edges`](#edges) | List all edges | `Edge objects` |
| [`neighbors`](#neighbors) | Get node neighbors | `Neighbor IDs` |
| [`degree`](#degree) | Get node degree | `Degree count` |
| [`bfs`](#bfs) | Breadth-first search | `Visit order` |
| [`dfs`](#dfs) | Depth-first search | `Visit order` |
| [`shortestPath`](#shortestpath) | Dijkstra's shortest path | `{path, distance}` |
| [`topologicalSort`](#topologicalsort) | Topological sort (DAG only) | `Sorted node IDs` |
| [`hasCycle`](#hascycle) | Check for cycles | `true if has cycle` |
| [`isConnected`](#isconnected) | Check if graph is connected | `true if connected` |
| [`hasPath`](#haspath) | Check if path exists between nodes | `true if path exists` |
| [`size`](#size) | Get graph size | `{nodes, edges}` |
| [`destroy`](#destroy) | Destroy graph | `true` |
| [`list`](#list) | List all graphs | `Graph names` |


## Functions

### create

Create graph

**Module:** `graph` | **Returns:** `object` -- {name, directed}

```robinpath
graph.create {"name": "deps", "directed": true}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `object` | No | {name, directed} |

---

### addNode

Add node

**Module:** `graph` | **Returns:** `boolean` -- true

```robinpath
graph.addNode "A" {"label": "Start"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Node ID |
| `data` | `any` | No | Node data |
| `graph` | `string` | No | Graph name |

---

### addEdge

Add edge

**Module:** `graph` | **Returns:** `boolean` -- true

```robinpath
graph.addEdge "A" "B" 5
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `from` | `string` | Yes | From node |
| `to` | `string` | Yes | To node |
| `weight` | `number` | No | Edge weight |
| `graph` | `string` | No | Graph name |

---

### removeNode

Remove node and its edges

**Module:** `graph` | **Returns:** `boolean` -- true

```robinpath
graph.removeNode "A"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Node ID |
| `graph` | `string` | No | Graph name |

---

### removeEdge

Remove edge

**Module:** `graph` | **Returns:** `boolean` -- true

```robinpath
graph.removeEdge "A" "B"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `from` | `string` | Yes | From node |
| `to` | `string` | Yes | To node |
| `graph` | `string` | No | Graph name |

---

### nodes

List all nodes

**Module:** `graph` | **Returns:** `array` -- Node IDs

```robinpath
graph.nodes
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `graph` | `string` | No | Graph name |

---

### edges

List all edges

**Module:** `graph` | **Returns:** `array` -- Edge objects

```robinpath
graph.edges
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `graph` | `string` | No | Graph name |

---

### neighbors

Get node neighbors

**Module:** `graph` | **Returns:** `array` -- Neighbor IDs

```robinpath
graph.neighbors "A"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `node` | `string` | Yes | Node ID |
| `graph` | `string` | No | Graph name |

---

### degree

Get node degree

**Module:** `graph` | **Returns:** `number` -- Degree count

```robinpath
graph.degree "A"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `node` | `string` | Yes | Node ID |
| `graph` | `string` | No | Graph name |

---

### bfs

Breadth-first search

**Module:** `graph` | **Returns:** `array` -- Visit order

```robinpath
graph.bfs "A"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `start` | `string` | Yes | Start node |
| `graph` | `string` | No | Graph name |

---

### dfs

Depth-first search

**Module:** `graph` | **Returns:** `array` -- Visit order

```robinpath
graph.dfs "A"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `start` | `string` | Yes | Start node |
| `graph` | `string` | No | Graph name |

---

### shortestPath

Dijkstra's shortest path

**Module:** `graph` | **Returns:** `object` -- {path, distance}

```robinpath
graph.shortestPath "A" "D"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `start` | `string` | Yes | Start node |
| `end` | `string` | Yes | End node |
| `graph` | `string` | No | Graph name |

---

### topologicalSort

Topological sort (DAG only)

**Module:** `graph` | **Returns:** `array` -- Sorted node IDs

```robinpath
graph.topologicalSort "deps"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `graph` | `string` | No | Graph name |

---

### hasCycle

Check for cycles

**Module:** `graph` | **Returns:** `boolean` -- true if has cycle

```robinpath
graph.hasCycle "deps"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `graph` | `string` | No | Graph name |

---

### isConnected

Check if graph is connected

**Module:** `graph` | **Returns:** `boolean` -- true if connected

```robinpath
graph.isConnected
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `graph` | `string` | No | Graph name |

---

### hasPath

Check if path exists between nodes

**Module:** `graph` | **Returns:** `boolean` -- true if path exists

```robinpath
graph.hasPath "A" "D"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `from` | `string` | Yes | From node |
| `to` | `string` | Yes | To node |
| `graph` | `string` | No | Graph name |

---

### size

Get graph size

**Module:** `graph` | **Returns:** `object` -- {nodes, edges}

```robinpath
graph.size
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `graph` | `string` | No | Graph name |

---

### destroy

Destroy graph

**Module:** `graph` | **Returns:** `boolean` -- true

```robinpath
graph.destroy
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `graph` | `string` | No | Graph name |

---

### list

List all graphs

**Module:** `graph` | **Returns:** `array` -- Graph names

```robinpath
graph.list
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _(none)_ | | No | Call with no arguments |


---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Topological sort requires a directed graph` | Check the error message for details |
| `Graph has a cycle` | Check the error message for details |
| `Graph "..." not found` | Check the error message for details |

```robinpath
set $result as graph.create {"name": "deps", "directed": true}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate 

Retrieve all items and loop through them.

```robinpath
set $result as graph.list
each $item in $result
  print $item
end
```

### 2. Create a new item with create

Create a new resource and capture the result.

```robinpath
set $result as graph.create {"name": "deps", "directed": true}
print "Created: " + $result
```

### 3. Check before creating

List existing items and only create if needed.

```robinpath
set $existing as graph.list
if $existing == null
  graph.create {"name": "deps", "directed": true}
  print "Item created"
else
  print "Item already exists"
end
```

### 4. Multi-step Graph workflow

Chain multiple graph operations together.

```robinpath
set $r_create as graph.create {"name": "deps", "directed": true}
set $r_addNode as graph.addNode "A" {"label": "Start"}
set $r_addEdge as graph.addEdge "A" "B" 5
print "All operations complete"
```

### 5. Safe create with validation

Check results before proceeding.

```robinpath
set $result as graph.create {"name": "deps", "directed": true}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
