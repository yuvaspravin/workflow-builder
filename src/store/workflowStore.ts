import { create } from "zustand";
import type { Node, Edge } from "reactflow";
import type { WorkflowData } from "../types/workflow";

export interface WorkflowState {
  nodes: Node<WorkflowData>[];
  edges: Edge[];
  selectedNodeId: string | null;

  setNodes: (
    updater: (n: Node<WorkflowData>[]) => Node<WorkflowData>[]
  ) => void;
  setEdges: (updater: (e: Edge[]) => Edge[]) => void;

  addNode: (node: Node<WorkflowData>) => void;
  updateNode: (id: string, data: Partial<WorkflowData>) => void;
  removeNode: (id: string) => void;

  addEdge: (edge: Edge) => void;
  removeEdge: (id: string) => void;

  setSelectedNode: (id: string | null) => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,

  setNodes: (updater) => set({ nodes: updater(get().nodes) }),
  setEdges: (updater) => set({ edges: updater(get().edges) }),

  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),

  updateNode: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...data } } : n
      ),
    })),

  removeNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
      selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
    })),

  addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),
  removeEdge: (id) =>
    set((state) => ({ edges: state.edges.filter((e) => e.id !== id) })),

  setSelectedNode: (id) => set({ selectedNodeId: id }),
}));
