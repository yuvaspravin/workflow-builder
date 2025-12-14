import { Node, Edge } from "reactflow";
import type { PrimitiveValue } from "./common";

export type NodeType =
  | "start"
  | "condition"
  | "sendMessage"
  | "followUser"
  | "wait";

export interface WorkflowData {
  title?: string;
  username?: string;
  message?: string;
  conditionType?: string;
  conditionValue?: string;
  hours?: number;
  minutes?: number;
  userId?: string;
  [key: string]: PrimitiveValue;
}

export interface WorkflowNode extends Node<WorkflowData> {
  type: NodeType;
  data: WorkflowData;
}

export type WorkflowEdge = Edge;
