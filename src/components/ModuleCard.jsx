export default function ModuleCard({ title, description, onClick }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md m-3">
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={onClick}>Start</button>
    </div>
  );
}
