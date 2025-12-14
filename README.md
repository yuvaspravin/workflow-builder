# Workflow Builder

A React + TypeScript project that allows users to visually create, manage, and export workflows using **React Flow** for interactive canvas and custom nodes.

---

## Author

**Yuvas Pravin**

---

## Project Explanation

This project allows users to visually create and manage workflows using **React Flow** for canvas interactions and nodes.

### Components

- **Sidebar** → drag nodes onto the canvas
- **Inspector** → configure selected node properties
- **Panel** → container for Inspector and Saved Workflows
- **Toast** → shows notifications
- **Custom nodes** → sendMessage, condition, followUser, wait, start

### Store

- **workflowStore** → manages nodes, edges, selected node
- **toastStore** → manages toast notifications

### Utils

- **createNodePayload** → creates a new node with default data
- **validateWorkflow** → validates nodes before save/export
- **exportJSON** → exports workflow as a JSON file
- Local storage utilities → save/load/delete workflows

### Pages

- **BuilderPage** → main workflow editor page

### Tech Stack

- React 18
- TypeScript
- Vite
- React Flow
- Zustand
- Tailwind CSS
- Heroicons

---

## Workflow Validation Rules

### Condition Node

- `conditionType` must be selected (equals, contains)
- `conditionValue` must not be empty

### Send Message Node

- `message` must not be empty

### Follow User Node

- `userId` must be selected from available users

> If a workflow fails validation, it cannot be saved or exported, and a toast notification will alert the user.

---

## Usage

1. Drag nodes from the sidebar to the canvas.
2. Click a node to configure it in the Inspector panel.
3. Connect nodes to define workflow paths.
4. Save your workflow locally or export it as a JSON file.
5. Load or delete saved workflows using the Saved Workflows panel.

---

## JSON Export Structure

Exported workflow JSON contains:

```json
{
  "name": "workflow-<timestamp>",
  "nodes": [
    {
      "id": "<node-id>",
      "type": "sendMessage",
      "position": { "x": 100, "y": 200 },
      "data": { "title": "Send Message", "username": "", "message": "Hello" }
    }
  ],
  "edges": [
    {
      "id": "<edge-id>",
      "source": "<source-node-id>",
      "target": "<target-node-id>"
    }
  ]
}
```
