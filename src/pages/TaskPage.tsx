import { useCallback, useEffect } from "react";

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
  ConnectionLineType,
} from "@xyflow/react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import {
  changeNodes,
  changeEdges,
  onConnect,
  deleteNode,
} from "../redux/flowSlice";

import "@xyflow/react/dist/style.css";
import TextNode from "../ui/nodes/TextNode";
import clsx from "clsx";
import { useSearchParams } from "react-router-dom";

export default function TaskPage() {
  const dispatch = useAppDispatch();
  const { nodes: storedNodes, edges: storedEdges } = useAppSelector(
    (state) => state.flow,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const currentNodeId = searchParams.get("nodeId");
  const currentNode = storedNodes.find((node) => node.id === currentNodeId);

  const [nodes, setNodes, onNodesChange] = useNodesState(storedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storedEdges);

  const nodeTypes = {
    text: TextNode,
  };

  console.log("render main page");

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
    if (text.length > 20) return;

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

    dispatch(changeNodes(nodeChanges));
  };

  const handleNodeClick: NodeMouseHandler = useCallback(
    (event, node) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("nodeId", node.id);
        return newParams;
      });
    },
    [setSearchParams],
  );

  const handleClickPane = (event: React.MouseEvent) => {
    if (event.type !== "click") return;

    const newParams = new URLSearchParams(searchParams);
    newParams.delete("nodeId");
    setSearchParams(newParams);
  };

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      dispatch(changeEdges(changes));
    },
    [dispatch],
  );

  const handleDeleteNode = useCallback(() => {
    if (!currentNodeId) return;
    dispatch(deleteNode(currentNodeId));

    const newParams = new URLSearchParams(searchParams);
    newParams.delete("nodeId");
    setSearchParams(newParams);
  }, [currentNodeId, dispatch, searchParams, setSearchParams]);

  const handleConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        eds.concat({
          ...params,
          id: `e-${params.source}-${params.target}`,
          type: "straight",
          style: { stroke: "#90aac1", strokeWidth: 2 },
          animated: false,
          markerEnd: {
            type: "arrowclosed",
            color: "#90aac1",
            width: 10,
            height: 10,
          },
        } as Edge),
      );
      dispatch(
        onConnect({
          source: params.source,
          target: params.target,
        }),
      );
    },

    [dispatch, setEdges],
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
        connectionLineType={ConnectionLineType.Straight}
        defaultEdgeOptions={{
          animated: false,
          style: { stroke: "#90aac1", strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#90aac1",
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
              value={(currentNode?.data.text as string) || ""}
              onChange={handleInput}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              placeholder="Enter task name..."
            />
          </div>
          <div className="mt-4">
            <button
              onClick={handleDeleteNode}
              className="w-full rounded bg-red-400 px-3 py-2 text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
            >
              Delete Task
            </button>
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
