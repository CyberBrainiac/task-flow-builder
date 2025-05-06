import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

import {
  ReactFlow,
  Controls,
  Background,
  NodeChange,
  EdgeChange,
  Connection,
  BackgroundVariant,
  Panel,
  Node,
  useNodesState,
  OnNodeDrag,
  NodeMouseHandler,
} from "@xyflow/react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { changeNodes, changeEdges, onConnect } from "../redux/flowSlice";

import "@xyflow/react/dist/style.css";

export default function TaskPage() {
  const dispatch = useAppDispatch();
  const { nodes: storedNodes, edges } = useAppSelector((state) => state.flow);
  const [currentNode, setCurrentNode] = useState<Node | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(storedNodes);

  const handleNodeDragStop: OnNodeDrag<Node> = useCallback(
    (event, node, nodes) => {
      const nodeChanges: NodeChange[] = [
        {
          id: node.id,
          type: "position",
          position: node.position,
        },
      ];

      dispatch(changeNodes(nodeChanges));
    },
    [dispatch],
  );

  const handleNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setCurrentNode(node);
  }, []);

  const handleClickPane = (event: React.MouseEvent) => {
    if (event.type !== "click") return;

    setCurrentNode(null);
  };

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      dispatch(changeEdges(changes));
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

  const handleLabelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentNode) return;

    const label = e.target.value;

    const updatedNode = {
      ...currentNode,
      data: {
        ...currentNode.data,
        label,
      },
    };

    const nodeChanges: NodeChange[] = [
      {
        id: currentNode.id,
        type: "replace",
        item: updatedNode,
      },
    ];

    setCurrentNode(updatedNode);

    if (label.length === 0) return;
    dispatch(changeNodes(nodeChanges));
  };

  useEffect(() => {
    setNodes(storedNodes);
  }, [storedNodes, setNodes]);

  return (
    <main className="h-[calc(100vh-var(--header-height))] w-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={handleEdgesChange}
        onNodeDragStop={handleNodeDragStop}
        onNodeClick={handleNodeClick}
        onConnect={handleConnect}
        onPaneClick={handleClickPane}
        fitView
      >
        <Panel
          position="top-left"
          className={clsx(
            "pointer-events-auto h-full w-48 bg-stone-200",
            "transition-all duration-300 ease-in-out",
            "absolute !m-0",
            {
              "!left-0": !!currentNode,
              "!-left-48": !currentNode,
            },
          )}
        >
          <label>Task: </label>
          {currentNode ? (
            <input
              value={currentNode?.data.label as string}
              onChange={handleLabelInput}
            />
          ) : null}
        </Panel>
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}
