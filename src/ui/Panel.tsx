import React, { type ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  className?: string;
}

const Panel: React.FC<PanelProps> = ({ children, className = "" }) => (
  <div className={`bg-white shadow rounded p-3 ${className}`}>{children}</div>
);

export default Panel;
