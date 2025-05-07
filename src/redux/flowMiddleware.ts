import { Middleware } from '@reduxjs/toolkit';
import { Edge, Node } from '@xyflow/react';

const NODES_STORAGE_KEY = 'flow_nodes';
const EDGES_STORAGE_KEY = 'flow_edges';

const ACTIONS_TO_TRACK = [
  'flow/changeNodes', 
  'flow/changeEdges', 
  'flow/onConnect', 
  'flow/deleteNode',
  'flow/addNode'
];

interface StateWithFlow {
  flow: StoreState;
}

interface StoreState {
  nodes: Node[];
  edges: Edge[];
}

export const flowStorageMiddleware: Middleware<object, StateWithFlow> = store => next => action => {
  const result = next(action);

  if (typeof action === 'object' && action !== null && 'type' in action) {
    if (typeof action.type === 'string' && ACTIONS_TO_TRACK.includes(action.type)) {
      const state = store.getState();
      try {
        localStorage.setItem(NODES_STORAGE_KEY, JSON.stringify(state.flow.nodes));
        localStorage.setItem(EDGES_STORAGE_KEY, JSON.stringify(state.flow.edges));
      } catch (error) {
        console.error('Failed to save data to localStorage:', error);
      }
    }
  }

  return result;
};

export const loadDataFromStorage = () => {
  try {
    const nodesJson = localStorage.getItem(NODES_STORAGE_KEY);
    const edgesJson = localStorage.getItem(EDGES_STORAGE_KEY);
    
    return {
      nodes: nodesJson ? JSON.parse(nodesJson) : null,
      edges: edgesJson ? JSON.parse(edgesJson) : null,
    };
  } catch (error) {
    console.error('Failed to load data from localStorage:', error);
    return { nodes: null, edges: null };
  }
};