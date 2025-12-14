import React from "react";
import BaseNode from "./BaseNode";
import type { NodeProps } from "reactflow";
import type { WorkflowData } from "../../types/workflow";

const SendMessageNode: React.FC<NodeProps<WorkflowData>> = ({ data }) => {
  return (
    <BaseNode title="Send Message">
      <div className="text-xs text-gray-600">
        {data.username ? `@${data.username}` : "No username"}
      </div>
    </BaseNode>
  );
};

export default SendMessageNode;
