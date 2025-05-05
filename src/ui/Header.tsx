export default function Header() {
  return (
    <header className="h-[var(--header-height)] bg-gray-100 flex items-center justify-between px-6 shadow">
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Create task
      </button>
      <h1 className="text-xl font-bold">Task Flow Builder</h1>
    </header>
  );
}