import React from "react";

const TestTailwind: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="mx-auto flex max-w-sm items-center space-x-4 rounded-xl bg-white p-6 shadow-md">
        <div>
          <div className="text-xl font-medium text-black">Tailwind Test</div>
          <p className="text-blue-500">
            If you see this styled correctly, Tailwind is working!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestTailwind;
