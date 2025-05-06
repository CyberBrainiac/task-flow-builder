import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from "@xyflow/react";
import { RootState } from "./store";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
}

const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  { id: "3", position: { x: 0, y: 200 }, data: { label: "3" } },
];

const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

const initialState: FlowState = {
  nodes: initialNodes,
  edges: initialEdges,
};

export const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes = [...state.nodes, action.payload];
    },
    onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    addEdge: (state, action: PayloadAction<Edge>) => {
      state.edges = [...state.edges, action.payload];
    },
    onConnect: (
      state,
      action: PayloadAction<{ source: string; target: string }>,
    ) => {
      const newEdge: Edge = {
        id: `e${action.payload.source}-${action.payload.target}`,
        source: action.payload.source,
        target: action.payload.target,
      };
      state.edges = [...state.edges, newEdge];
    },
  },
});

const selectNodes = (state: RootState) => state.flow.nodes;

export const selectLastNodeId = createSelector([selectNodes], (nodes) => {
  return nodes.reduce((acc, node) => {
    if (!node.id || +node.id < +acc) {
      return acc;
    }
    return node.id;
  }, "-1");
});

export const {
  setNodes,
  addNode,
  onNodesChange,
  setEdges,
  onEdgesChange,
  addEdge,
  onConnect,
} = flowSlice.actions;

export default flowSlice.reducer;
