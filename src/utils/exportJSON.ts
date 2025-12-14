import type { Node, Edge } from "reactflow";

// Types for exported workflow nodes
export type ExportedNodeData = Record<string, unknown>;

export type ExportedNode = {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: ExportedNodeData;
};

export type ExportedWorkflow = {
  name: string;
  nodes: ExportedNode[];
  edges: Edge[];
};

/**
 * Export workflow nodes and edges as a JSON-compatible object
 */
export function exportWorkflow(nodes: Node[], edges: Edge[]): ExportedWorkflow {
  const cleanedNodes: ExportedNode[] = nodes.map((node) => ({
    id: node.id,
    type: node.type ?? "unknown",
    position: node.position,
    data: node.data ?? {},
  }));

  return {
    name: `workflow-${Date.now()}`,
    nodes: cleanedNodes,
    edges,
  };
}

/**
 * Optional helper: download JSON file
 */
export function exportJSON(filename: string, nodes: Node[], edges: Edge[]) {
  const data = exportWorkflow(nodes, edges);
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.json`;
  a.click();

  URL.revokeObjectURL(url);
}
