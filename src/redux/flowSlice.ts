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
import { loadDataFromStorage } from "./flowMiddleware";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
}

const defaultNodes: Node[] = [];
const defaultEdges: Edge[] = [];
const storedData = loadDataFromStorage();

const initialState: FlowState = {
  nodes: storedData.nodes || defaultNodes,
  edges: storedData.edges || defaultEdges,
};

export const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes = [...state.nodes, action.payload];
    },
    changeNodes: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    changeEdges: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
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
    deleteNode: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;
      state.nodes = state.nodes.filter((node) => node.id !== nodeId);
      state.edges = state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId,
      );
    },
  },
});

const selectNodes = (state: RootState) => state.flow.nodes;

export const selectNodeById = (id: string) =>
  createSelector([selectNodes], (nodes) =>
    nodes.find((node) => node.id === id),
  );

export const selectLastNodeId = createSelector([selectNodes], (nodes) => {
  return nodes.reduce((acc, node) => {
    if (!node.id || +node.id < +acc) {
      return acc;
    }
    return node.id;
  }, "-1");
});

export const { addNode, changeNodes, changeEdges, onConnect, deleteNode } =
  flowSlice.actions;

export default flowSlice.reducer;
