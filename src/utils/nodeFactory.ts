import type { Node, XYPosition } from "reactflow";
import type { WorkflowData } from "../types/workflow";

export const createNodePayload = (
  type: string,
  position: XYPosition = { x: 100, y: 100 }
): Node<WorkflowData> => {
  const base: Node<WorkflowData> = {
    id: crypto.randomUUID(),
    type,
    position,
    data: { title: type },
  };

  switch (type) {
    case "sendMessage":
      base.data = { title: "Send Message", username: "", message: "" };
      break;
    case "condition":
      base.data = {
        title: "Condition",
        conditionType: "equals",
        conditionValue: "value",
      };
      break;
    case "wait":
      base.data = { title: "Wait Timer", hours: 0, minutes: 0 };
      break;
    case "followUser":
      base.data = { title: "Follow User", userId: "" };
      break;
    case "start":
      base.data = { title: "Start Trigger" };
      break;
  }

  return base;
};
