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
import { useAppSelector, useAppDispatch } from '../redux/store';
import { onNodesChange, onEdgesChange, onConnect } from '../redux/flowSlice';

import "@xyflow/react/dist/style.css";

export default function TaskPage() {
  const dispatch = useAppDispatch();
  const { nodes, edges } = useAppSelector((state) => state.flow);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      dispatch(onNodesChange(changes));
    },
    [dispatch]
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      dispatch(onEdgesChange(changes));
    },
    [dispatch]
  );

  const handleConnect = useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        dispatch(onConnect({
          source: connection.source,
          target: connection.target
        }));
      }
    },
    [dispatch]
  );

  return (
    <main className="w-screen h-[calc(100vh-var(--header-height))]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}