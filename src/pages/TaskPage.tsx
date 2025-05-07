import { useCallback, useEffect, useState } from "react";

import {
  ReactFlow,
  Controls,
  Background,
  NodeChange,
  EdgeChange,
  Connection,
  BackgroundVariant,
  Node,
  useNodesState,
  OnNodeDrag,
  NodeMouseHandler,
  Panel,
  MarkerType,
  useEdgesState,
  Edge,
} from "@xyflow/react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { changeNodes, changeEdges } from "../redux/flowSlice";

import "@xyflow/react/dist/style.css";
import TextNode from "../ui/nodes/TextNode";
import clsx from "clsx";

export default function TaskPage() {
  const dispatch = useAppDispatch();
  const { nodes: storedNodes, edges: storedEdges } = useAppSelector(
    (state) => state.flow,
  );

  const [currentNode, setCurrentNode] = useState<Node | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(storedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storedEdges);

  const nodeTypes = {
    text: TextNode,
  };

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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentNode) return;
    const text = e.target.value;

    const updatedNode = {
      ...currentNode,
      data: {
        ...currentNode.data,
        text,
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
    dispatch(changeNodes(nodeChanges));
  };

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
    (params: Connection) => {
      // Add custom edge properties here
      setEdges((eds) =>
        eds.concat({
          ...params,
          id: `e-${params.source}-${params.target}`,
          type: "straight", // Using straight line type
          style: { stroke: "#6366f1", strokeWidth: 2 },
          animated: false,
          markerEnd: {
            type: "arrowclosed",
            color: "#6366f1",
            width: 20,
            height: 20,
          },
        } as Edge),
      );
    },
    // (connection: Connection) => {
    //   if (connection.source && connection.target) {
    //     dispatch(
    //       onConnect({
    //         source: connection.source,
    //         target: connection.target,
    //       }),
    //     );
    //   }
    // },
    [dispatch],
  );

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
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.6,
          minZoom: 1,
          maxZoom: 4,
        }}
        className="bg-gray-50"
        defaultEdgeOptions={{
          animated: false,
          style: { stroke: "#6366f1", strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#6366f1",
            width: 10,
            height: 10,
          },
          type: "straight",
        }}
      >
        <Panel
          position="top-left"
          className={clsx(
            "pointer-events-auto h-auto w-64 rounded-r-lg bg-white p-4 shadow-lg",
            "transition-all duration-300 ease-in-out",
            "absolute !m-0 border-b border-r border-t border-gray-200",
            {
              "!left-0": !!currentNode,
              "!-left-64": !currentNode,
            },
          )}
        >
          <div className="mb-2 font-semibold text-gray-700">
            Edit task {currentNode?.id}
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Description</label>
            <input
              value={currentNode?.data.text as string}
              onChange={handleInput}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              placeholder="Enter task name..."
            />
          </div>
        </Panel>
        <Controls className="!rounded !border !border-gray-200 !bg-white !shadow-md" />
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          color="#e5e7eb"
        />
      </ReactFlow>
    </main>
  );
}
