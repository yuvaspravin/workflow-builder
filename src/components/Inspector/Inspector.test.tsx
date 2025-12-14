import { render, screen } from "@testing-library/react";
import Inspector from "./Inspector";
import { describe, expect, it } from "vitest";
import { useWorkflowStore } from "../../store/workflowStore";

// Define Node and WorkflowState types according to your store
interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { title: string };
}

interface WorkflowState {
  nodes: Node[];
  selectedNodeId: string | null;
}

describe("Inspector", () => {
  it("shows empty message when no node selected", () => {
    // Reset state before rendering
    useWorkflowStore.setState({
      selectedNodeId: null,
      nodes: [],
    } as WorkflowState);

    render(<Inspector />);
    expect(
      screen.getByText("Select a node to configure it.")
    ).toBeInTheDocument();
  });

  it("shows selected node title", () => {
    // Set the state with a selected node
    useWorkflowStore.setState({
      selectedNodeId: "1",
      nodes: [
        {
          id: "1",
          type: "sendMessage",
          position: { x: 0, y: 0 },
          data: { title: "Send Message" },
        },
      ],
    } as WorkflowState);

    render(<Inspector />);
    expect(screen.getByText("Send Message")).toBeInTheDocument();
  });
});
