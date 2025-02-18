export default function ModuleCard({ title, description, onClick }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-fit min-w-[300px]">
      <h1 className="text-lg font-semibold mb-3">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <button
        onClick={onClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        Start
      </button>
    </div>
  );
}
