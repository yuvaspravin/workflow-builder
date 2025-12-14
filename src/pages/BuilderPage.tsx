import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  MiniMap,
  type Connection,
  type Edge,
  type Node,
  type NodeChange,
  type EdgeChange,
  type OnConnect,
  type ReactFlowInstance,
  type NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "../components/sidebar/Sidebar";
import Panel from "../ui/Panel";
import Inspector from "../components/Inspector/Inspector";
import Toast from "../ui/Toast";
import { useWorkflowStore } from "../store/workflowStore";
import { createNodePayload } from "../utils/nodeFactory";
import { nodeTypes as customNodeTypes } from "../components/nodes/nodeType";
import { useToast } from "../store/toastStore";
import type { NodeType } from "../types/workflow";
import {
  deleteWorkflow,
  listWorkflows,
  loadWorkflow,
  saveWorkflow,
} from "../utils/localStorage";

import {
  ArrowDownTrayIcon,
  BookmarkSquareIcon,
  FolderArrowDownIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { validateWorkflow } from "../utils/validateConnection";
import { exportJSON } from "../utils/exportJSON";

const BuilderPage: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const rfInstance = useRef<ReactFlowInstance | null>(null);

  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);
  const setNodes = useWorkflowStore((s) => s.setNodes);
  const setEdges = useWorkflowStore((s) => s.setEdges);
  const addNode = useWorkflowStore((s) => s.addNode);
  const setSelectedNode = useWorkflowStore((s) => s.setSelectedNode);

  const toastNotify = useToast((t) => t.notify);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [workflowToDelete, setWorkflowToDelete] = useState<string | null>(null);
  const [workflows, setWorkflows] = useState<string[]>(listWorkflows());

  useEffect(() => {
    const handleStorage = () => setWorkflows(listWorkflows());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    rfInstance.current = instance;
  }, []);

  const onConnect: OnConnect = useCallback(
    (params: Connection | Edge) => {
      if (!params.source || !params.target) return;

      setEdges((prev) => addEdge(params as Edge, prev));
    },
    [setEdges]
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((prev) => applyNodeChanges(changes, prev)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((prev) => applyEdgeChanges(changes, prev)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => setSelectedNode(node.id),
    [setSelectedNode]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData(
        "application/node-type"
      ) as NodeType;
      if (!type) return;

      const bounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!bounds || !rfInstance.current) return;

      const position = rfInstance.current.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      addNode(createNodePayload(type, position));
    },
    [addNode]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const handleSave = useCallback(() => {
    const errors = validateWorkflow(nodes);
    if (errors.length > 0) {
      toastNotify("Cannot save workflow: " + errors.join(", "));
      return;
    }

    const name = prompt("Enter workflow name", `MyWorkflow`);
    if (!name) return;

    saveWorkflow(name, nodes, edges);
    setWorkflows(listWorkflows());
    toastNotify("Workflow saved: " + name);
  }, [nodes, edges, toastNotify]);

  const handleExport = useCallback(() => {
    const errors = validateWorkflow(nodes);
    if (errors.length > 0) {
      toastNotify("Cannot export workflow: " + errors.join(", "));
      return;
    }

    exportJSON(`workflow-${Date.now()}`, nodes, edges);
    toastNotify("Export started");
  }, [nodes, edges, toastNotify]);

  const handleLoad = useCallback(
    (key: string) => {
      const wf = loadWorkflow(key);
      if (wf) {
        setNodes(() => wf.nodes as Node[]);
        setEdges(() => wf.edges as Edge[]);
        toastNotify("Workflow loaded: " + key.replace("workflow_", ""));
      }
    },
    [setNodes, setEdges, toastNotify]
  );

  const handleDelete = useCallback(() => {
    if (!workflowToDelete) return;
    deleteWorkflow(workflowToDelete);
    toastNotify("Deleted: " + workflowToDelete.replace("workflow_", ""));
    setWorkflows(listWorkflows());
    setWorkflowToDelete(null);
    setShowDeleteModal(false);

    setNodes(() => []);
    setEdges(() => []);
    setSelectedNode(null);
  }, [workflowToDelete, toastNotify, setNodes, setEdges, setSelectedNode]);

  const handleNew = useCallback(() => {
    setNodes(() => []);
    setEdges(() => []);
    setSelectedNode(null);
    toastNotify("Started new workflow");
  }, [setNodes, setEdges, setSelectedNode, toastNotify]);

  return (
    <ReactFlowProvider>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-4">
          <div data-testid="workflow-canvas" className="flex gap-4 h-full">
            <div
              ref={reactFlowWrapper}
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="flex-1 border rounded bg-gray-50 relative overflow-hidden"
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onInit={onInit}
                onConnect={onConnect}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                nodeTypes={customNodeTypes as NodeTypes}
                fitView
              >
                <Controls />
                <MiniMap />
                <Background gap={16} />
              </ReactFlow>
            </div>

            <aside style={{ width: 360 }}>
              <Panel>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Inspector</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleNew}
                      className="btn px-2 py-2 text-xs bg-blue-500 rounded-md text-white flex items-center gap-1"
                    >
                      New <PlusIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleSave}
                      className="btn px-2 py-2 text-xs bg-green-600 rounded-md text-white flex items-center gap-1"
                    >
                      Save <BookmarkSquareIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleExport}
                      className="btn px-2 py-2 text-xs bg-amber-500 rounded-md text-white flex items-center gap-1"
                    >
                      Export <ArrowDownTrayIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <Inspector />

                <div className="mt-4">
                  <h4 className="font-semibold mb-1">Saved Workflows</h4>
                  <ul className="space-y-1 max-h-40 overflow-auto">
                    {workflows.map((w) => (
                      <li
                        key={w}
                        className="flex justify-between items-center border rounded p-1"
                      >
                        <span className="truncate">
                          {w.replace("workflow_", "")}
                        </span>
                        <div className="flex gap-1 cursor-pointer">
                          <button
                            onClick={() => handleLoad(w)}
                            className="btn px-2 py-2 text-xs bg-blue-500 rounded-md text-white flex items-center gap-1"
                          >
                            Load <FolderArrowDownIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setWorkflowToDelete(w);
                              setShowDeleteModal(true);
                            }}
                            className="btn px-2 py-2 text-xs bg-red-600 rounded-md text-white flex items-center gap-1"
                          >
                            Delete <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Panel>
            </aside>
          </div>

          <Toast />

          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="bg-white rounded p-4 shadow-md w-80">
                <h3 className="font-semibold mb-2">Confirm Delete</h3>
                <p>
                  Are you sure you want to delete workflow: {workflowToDelete}?
                </p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="btn bg-gray-300 text-black"
                  >
                    Cancel
                  </button>
                  <button onClick={handleDelete} className="btn bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </ReactFlowProvider>
  );
};

export default BuilderPage;
