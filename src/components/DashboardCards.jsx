export default function DashboardCards({ projects }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-slate-800 p-4 rounded">
        <p>Total Projects</p>
        <h2 className="text-2xl">{projects.length}</h2>
      </div>
    </div>
  );
}