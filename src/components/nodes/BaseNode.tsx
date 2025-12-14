import React, { type ReactNode } from "react";
import { Handle, Position } from "reactflow";

interface BaseNodeProps {
  title: string;
  children?: ReactNode;
}

const BaseNode: React.FC<BaseNodeProps> = ({ title, children }) => {
  return (
    <div className="bg-white border shadow-sm rounded p-2 min-w-[140px]">
      <div className="font-semibold text-sm mb-2">{title}</div>

      <div
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default BaseNode;
