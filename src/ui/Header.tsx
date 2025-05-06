import { useState } from "react";
import { addNode, selectLastNodeId } from "../redux/flowSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export default function Header() {
  const dispatch = useAppDispatch();
  const lastId = useAppSelector(selectLastNodeId);
  const [xPosition, setXPosition] = useState(0);

  const handleCreateTask = () => {
    const newId = String(+lastId + 1);

    const newNode = {
      id: newId,
      position: { x: xPosition, y: 0 },
      data: { label: "New Task" },
    };
    dispatch(addNode(newNode));
    setXPosition((prevPosition) => prevPosition + 83);
  };

  return (
    <header className="flex h-[var(--header-height)] items-center justify-between bg-gray-100 px-6 shadow">
      <button
        onClick={handleCreateTask}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
      >
        Create task
      </button>
      <h1 className="text-xl font-bold">Task Flow Builder</h1>
    </header>
  );
}
