import React from "react";
import BaseNode from "./BaseNode";
import type { NodeProps } from "reactflow";
import type { WorkflowData } from "../../types/workflow";

const FollowUserNode: React.FC<NodeProps<WorkflowData>> = ({ data }) => {
  return (
    <BaseNode title="Follow User">
      <div className="text-xs text-gray-600">
        User: {data.userId || "Not selected"}
      </div>
    </BaseNode>
  );
};

export default FollowUserNode;
