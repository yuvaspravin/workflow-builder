import type { PropsWithChildren } from "react";

export const ReactFlowProvider: React.FC<PropsWithChildren> = ({
  children,
}) => <div>{children}</div>;

const ReactFlow: React.FC<PropsWithChildren> = ({ children }) => (
  <div data-testid="reactflow">{children}</div>
);

export const Handle: React.FC = () => <div />;
export const Controls: React.FC = () => <div />;
export const MiniMap: React.FC = () => <div />;
export const Background: React.FC = () => <div />;

export default ReactFlow;
