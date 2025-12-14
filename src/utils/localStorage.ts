import type { Node, Edge } from "reactflow";
import type { WorkflowData } from "../types/workflow";

export const saveWorkflow = (
  name: string,
  nodes: Node<WorkflowData>[],
  edges: Edge[]
) => {
  const payload = { nodes, edges };
  localStorage.setItem("workflow_" + name, JSON.stringify(payload));
};

export const loadWorkflow = (name: string) => {
  const data = localStorage.getItem("workflow_" + name);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const listWorkflows = (): string[] => {
  return Object.keys(localStorage)
    .filter((key) => key.startsWith("workflow_"))
    .map((key) => key.replace("workflow_", ""));
};

export const deleteWorkflow = (name: string) => {
  localStorage.removeItem("workflow_" + name);
};
