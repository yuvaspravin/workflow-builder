import { render, screen } from "@testing-library/react";
import { ReactFlowProvider } from "reactflow";
import BuilderPage from "./BuilderPage";
import { describe, expect, it } from "vitest";

describe("BuilderPage", () => {
  it("renders workflow canvas", () => {
    render(
      <ReactFlowProvider>
        <BuilderPage />
      </ReactFlowProvider>
    );

    expect(screen.getByTestId("workflow-canvas")).toBeInTheDocument();
  });
});
