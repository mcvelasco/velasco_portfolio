export default function ProjectTable({ projects, deleteProject }) {
  return (
    <table className="w-full text-left">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.status}</td>
            <td>
              <button onClick={() => deleteProject(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}