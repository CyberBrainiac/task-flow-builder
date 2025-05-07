import { memo } from "react";
import {
  Position,
  Handle,
  useReactFlow,
  type NodeProps,
  type Node,
  useNodeConnections,
  NodeChange,
} from "@xyflow/react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { changeNodes, selectNodeById } from "../../redux/flowSlice";
import { useSearchParams } from "react-router-dom";

function TextNode({ id, data }: NodeProps<Node<{ text: string }>>) {
  const dispatch = useAppDispatch();
  const connections = useNodeConnections({
    handleType: "target",
  });
  const currentNode = useAppSelector(selectNodeById(id));
  const [searchParams, setSearchParams] = useSearchParams();

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
        id: id,
        type: "replace",
        item: updatedNode,
      },
    ];

    dispatch(changeNodes(nodeChanges));
  };

  const handleClick = () => {
    if (searchParams.get("nodeId") !== id) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("nodeId", id);
        return newParams;
      });
    }
  };

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-4 shadow-md">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={connections.length <= 2}
        className="!h-3 !w-3 !bg-blue-300"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      />
      <div>
        <input
          onChange={handleInput}
          onClick={handleClick}
          value={data.text}
          className="w-full rounded border-none px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter task"
          max={20}
        />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !bg-green-300"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      />
    </div>
  );
}

export default memo(TextNode);
