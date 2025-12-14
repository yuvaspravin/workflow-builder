import React, { type PropsWithChildren } from "react";

export const ReactFlowProvider = ({ children }: PropsWithChildren) => (
  <div>{children}</div>
);

const ReactFlow = ({ children }: PropsWithChildren) => (
  <div data-testid="reactflow">{children}</div>
);

export const Handle = () => <div />;
export const Controls = () => <div />;
export const MiniMap = () => <div />;
export const Background = () => <div />;

export default ReactFlow;
