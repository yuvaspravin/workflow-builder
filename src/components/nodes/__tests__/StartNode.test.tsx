import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ReactFlowProvider } from "reactflow";
import StartNode from "../StartNode";
import { createMockNodeProps } from "../../../test-utils/mockNodeProps";

describe("StartNode", () => {
  it("renders start node", () => {
    const props = createMockNodeProps({ title: "Start Trigger" }, "start");

    render(
      <ReactFlowProvider>
        <StartNode {...props} />
      </ReactFlowProvider>
    );

    expect(screen.getByText(/start trigger/i)).toBeInTheDocument();
    expect(screen.getByText(/workflow entry point/i)).toBeInTheDocument();
  });
});
