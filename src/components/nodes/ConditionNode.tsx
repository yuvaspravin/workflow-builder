import React from "react";
import BaseNode from "./BaseNode";
import type { NodeProps } from "reactflow";
import type { WorkflowData } from "../../types/workflow";

const ConditionNode: React.FC<NodeProps<WorkflowData>> = ({ data }) => {
  return (
    <BaseNode title="Condition">
      <div className="text-xs text-gray-600">
        {data.conditionType} <strong>{data.conditionValue || "…"}</strong>
      </div>
    </BaseNode>
  );
};

export default ConditionNode;
