import type { Node } from "reactflow";

interface WorkflowNodeData {
  message?: string;
  userId?: string;
  conditionType?: string;
  conditionValue?: string;
}

type WorkflowNode = Node<WorkflowNodeData>;

export function validateWorkflow(nodes: WorkflowNode[]): string[] {
  const errors: string[] = [];

  nodes.forEach((node) => {
    switch (node.type) {
      case "condition":
        if (!node.data?.conditionType?.trim()) {
          errors.push(`Condition node (${node.id}) is incomplete.`);
        }
        break;

      case "sendMessage":
        if (!node.data?.message?.trim()) {
          errors.push(`SendMessage node (${node.id}) has an empty message.`);
        }
        break;

      case "followUser":
        if (!node.data?.userId?.trim()) {
          errors.push(`FollowUser node (${node.id}) has no userId.`);
        }
        break;
    }
  });

  return errors;
}
