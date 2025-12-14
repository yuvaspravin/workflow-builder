import { describe, it, expect, beforeEach } from "vitest";

import type { Node } from "reactflow";
import { useWorkflowStore } from "./workflowStore";

describe("workflowStore", () => {
  beforeEach(() => {
    useWorkflowStore.setState({
      nodes: [
        {
          id: "1",
          type: "sendMessage",
          position: { x: 0, y: 0 },
          data: { title: "Send Message", message: "" },
        },
      ] as Node[],
      edges: [],
    });
  });

  it("updates node data", () => {
    const { updateNode } = useWorkflowStore.getState();

    updateNode("1", { message: "Hello" });

    const node = useWorkflowStore.getState().nodes.find((n) => n.id === "1");

    expect(node?.data.message).toBe("Hello");
  });

  it("removes node", () => {
    const { removeNode } = useWorkflowStore.getState();

    removeNode("1");

    expect(useWorkflowStore.getState().nodes.length).toBe(0);
  });
});
