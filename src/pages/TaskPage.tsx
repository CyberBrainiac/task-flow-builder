import React, { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  NodeChange,
  EdgeChange,
  Connection,
  BackgroundVariant,
} from "@xyflow/react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { onNodesChange, onEdgesChange, onConnect } from "../redux/flowSlice";

import "@xyflow/react/dist/style.css";

export default function TaskPage() {
  const dispatch = useAppDispatch();
  const { nodes, edges } = useAppSelector((state) => state.flow);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      dispatch(onNodesChange(changes));
    },
    [dispatch],
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      dispatch(onEdgesChange(changes));
    },
    [dispatch],
  );

  const handleConnect = useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        dispatch(
          onConnect({
            source: connection.source,
            target: connection.target,
          }),
        );
      }
    },
    [dispatch],
  );

  return (
    <main className="h-[calc(100vh-var(--header-height))] w-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
      >
        <Panel position="top-left" style={{ width: 200 }}>
          <label className="xy-theme__label">Label: </label>
          <input
            value={nodeName}
            onChange={(evt) => setNodeName(evt.target.value)}
            className="xy-theme__input"
          />

          <label className="xy-theme__label">Background: </label>
          <input
            value={nodeBg}
            onChange={(evt) => setNodeBg(evt.target.value)}
            className="xy-theme__input"
          />

          <label className="xy-theme__label">Hidden:</label>
          <input
            type="checkbox"
            checked={nodeHidden}
            onChange={(evt) => setNodeHidden(evt.target.checked)}
            className="xy-theme__checkbox"
          />
        </Panel>
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}
