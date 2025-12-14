import type { NodeProps } from "reactflow";

export function createMockNodeProps<T>(
  data: T,
  type = "default"
): NodeProps<T> {
  return {
    id: "node-1",
    data,
    type,
    selected: false,
    dragging: false,
    zIndex: 0,
    isConnectable: true,
    xPos: 0,
    yPos: 0,
  };
}
