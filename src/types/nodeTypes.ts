import { type Node } from "@xyflow/react";
import { Dispatch, SetStateAction } from "react";

export type TextNode = Node<{ text: string }, "text">;
export interface CustomPanelProps {
  currentNode: Node;
  setCurrentNode: Dispatch<SetStateAction<Node | null>>;
}
