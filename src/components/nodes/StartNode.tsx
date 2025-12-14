import React from "react";
import BaseNode from "./BaseNode";
import type { NodeProps } from "reactflow";

interface StartNodeData {
  title: string;
}

const StartNode: React.FC<NodeProps<StartNodeData>> = () => {
  return (
    <BaseNode title="Start Trigger">
      <div className="text-xs text-gray-500">Workflow entry point</div>
    </BaseNode>
  );
};

export default StartNode;
