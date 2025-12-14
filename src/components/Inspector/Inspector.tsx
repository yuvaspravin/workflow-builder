import React from "react";
import { useWorkflowStore } from "../../store/workflowStore";
import type { PrimitiveValue } from "../../types/common";
import type { WorkflowData } from "../../types/workflow";
import { USERS } from "../../constants/users";
import { TrashIcon } from "@heroicons/react/24/solid";

const Inspector: React.FC = () => {
  const selected = useWorkflowStore((s) => s.selectedNodeId);
  const nodes = useWorkflowStore((s) => s.nodes);
  const updateNode = useWorkflowStore((s) => s.updateNode);
  const removeNode = useWorkflowStore((s) => s.removeNode);

  const node = nodes.find((n) => n.id === selected);

  if (!node)
    return (
      <div className="text-sm text-gray-500">
        Select a node to configure it.
      </div>
    );

  const update = (field: string, value: PrimitiveValue) =>
    updateNode(node.id, { [field]: value } as WorkflowData);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{node.data.title}</h3>
        <button
          onClick={() => removeNode(node.id)}
          className="text-sm text-red-500"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>

      {node.type === "sendMessage" && (
        <>
          <input
            className="input"
            placeholder="Username"
            value={node.data.username ?? ""}
            onChange={(e) => update("username", e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
          />
          <textarea
            className="input"
            placeholder="Message"
            value={node.data.message ?? ""}
            onChange={(e) => update("message", e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
          />
        </>
      )}

      {node.type === "condition" && (
        <>
          <select
            className="input"
            value={node.data.conditionType ?? "equals"}
            onChange={(e) => update("conditionType", e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <option value="equals">Equals</option>
            <option value="contains">Contains</option>
          </select>
          <input
            className="input"
            value={node.data.conditionValue ?? ""}
            onChange={(e) => update("conditionValue", e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
          />
        </>
      )}

      {node.type === "wait" && (
        <div className="flex gap-2">
          <input
            className="input"
            type="number"
            value={node.data.hours ?? 0}
            onChange={(e) => update("hours", Number(e.target.value))}
            onMouseDown={(e) => e.stopPropagation()}
          />
          <input
            className="input"
            type="number"
            value={node.data.minutes ?? 0}
            onChange={(e) => update("minutes", Number(e.target.value))}
            onMouseDown={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {node.type === "followUser" && (
        <>
          <label className="text-xs text-gray-600">Select User</label>
          <select
            className="input"
            value={node.data.userId || ""}
            onChange={(e) => update("userId", e.target.value)}
          >
            <option value="">Select User</option>
            {USERS.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default Inspector;
