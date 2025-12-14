import { describe, it, expect } from "vitest";
import type { Node, Edge } from "reactflow";
import { exportWorkflow } from "../exportJSON";

describe("exportWorkflow", () => {
  it("exports valid workflow object", () => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const workflow = exportWorkflow(nodes, edges);

    expect(workflow.name).toContain("workflow-");
    expect(workflow.nodes).toEqual([]);
    expect(workflow.edges).toEqual([]);
  });

  it("includes node data", () => {
    const nodes: Node[] = [
      {
        id: "1",
        type: "sendMessage",
        position: { x: 0, y: 0 },
        data: { message: "Hello" },
      },
    ];
    const edges: Edge[] = [];

    const workflow = exportWorkflow(nodes, edges);

    expect(workflow.nodes.length).toBe(1);
    expect(workflow.nodes[0].data).toEqual({ message: "Hello" });
  });
});
