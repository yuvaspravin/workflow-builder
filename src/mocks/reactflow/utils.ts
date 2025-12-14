export const Position = {
  Left: "left",
  Right: "right",
};

export const addEdge = (edge: unknown, edges: unknown[]) => [...edges, edge];

export const applyNodeChanges = (_: unknown, nodes: unknown[]) => nodes;
export const applyEdgeChanges = (_: unknown, edges: unknown[]) => edges;
