import React from "react";
import BaseNode from "./BaseNode";
import type { NodeProps } from "reactflow";
import type { WorkflowData } from "../../types/workflow";

const WaitNode: React.FC<NodeProps<WorkflowData>> = ({ data }) => {
  const timeStr = `${data.hours ?? 0}h ${data.minutes ?? 0}m`;
  return (
    <BaseNode title="Wait Timer">
      <div className="text-xs text-gray-600">{timeStr}</div>
    </BaseNode>
  );
};

export default WaitNode;
