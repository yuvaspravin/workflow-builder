import React from "react";

import type { NodeProps } from "reactflow";
import BaseNode from "./nodes/BaseNode";

interface FollowUserData {
  title: string;
  userId?: string;
}

const FollowUserNode: React.FC<NodeProps<FollowUserData>> = ({ data }) => (
  <BaseNode title="Follow User">
    <div className="text-xs text-gray-600">
      User: {data.userId || "Not selected"}
    </div>
  </BaseNode>
);

export default FollowUserNode;
